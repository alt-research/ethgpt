key (%v)", err)
	}
	// Parse the IP address and port from the host portion.
	host, port, err := net.SplitHostPort(u.Host)
	if err != nil {
		return nil, fmt.Errorf("invalid host:port (%v)", err)
	}
	ip := net.ParseIP(host)
	if ip == nil {
		ips, err := lookupIPFunc(host)
		if err != nil {
			return nil, fmt.Errorf("lookup failed (%v)", err)
		}
		if len(ips) == 0 {
			return nil, errors.New("no IP addresses found")
		}
		ip = ips[0]
	}
	if tcpPort, err = strconv.ParseUint(port, 10, 16); err != nil {
		return nil, fmt.Errorf("invalid port (%v)", err)
	}
	// Parse the discovery port from the query parameters.
	if discPort := u.Query().Get("discport"); discPort != "" {
		if udpPort, err = strconv.ParseUint(discPort, 10, 16); err != nil {
			return nil, fmt.Errorf("invalid discovery port (%v)", err)
		}
	} else {
		udpPort = uint64(tcpPort)
	}
	return NewV4(id, ip, int(tcpPort), int(udpPort)), nil
}

// parsePubkey parses a hex-encoded public key.
func parsePubkey(s string) (*ecdsa.PublicKey, error) {
	b, err := hex.DecodeString(s)
	if err != nil {
		return nil, err
	}
	if len(b) != 64 {
		return nil, errors.New("invalid public key length")
	}
	return crypto.UnmarshalPubkey(b)
}

// signV4Compat signs a record with a zero-length signature.
func signV4Compat(r *enr.Record, privkey *ecdsa.PublicKey) {
	hash := r.Hash()
	sig, _ := math.PaddedBigBytes(privkey.Sign(hash[:]))
	r.Set(enr.Signature(sig))
}

// v4CompatID is a dummy ID type for nodes created by NewV4.
type v4CompatID struct{}

func (v4CompatID) String() string { return "v4Compat" }

// ID returns the node ID.
func (v4CompatID) ID(n *Node) []byte {
	var k s256raw
	if n.r.Load(&k) != nil {
		return nil
	}
	return k[:]
}

// String returns the node URL.
func (v4CompatID) String(n *Node) string {
	var (
		ip      net.IP
		tcpPort int
		udpPort int
	)
	if ip4 := n.IP(); ip4 != nil {
		ip = ip4.To4()
	}
	if tcp := n.TCP(); tcp != 0 {
		tcpPort = tcp
	}
	if udp := n.UDP(); udp != 0 {
		udpPort = udp
	}
	return fmt.Sprintf("enode://%s@%s:%d?discport=%d",
		hex.EncodeToString(n.ID()),
		ip.String(),
		tcpPort,
		udpPort,
	)
}

// Node represents a remote node participating in the Ethereum network.
type Node struct {
	id ID
	r  enr.Record
}

// New creates a new node from an ID and record.
func New(id ID, r *enr.Record) (*Node, error) {
	if r == nil {
		r = new(enr.Record)
	}
	if err := r.Verify(); err != nil {
		return nil, err
	}
	return &Node{id, *r}, nil
}

// ID returns the node ID.
func (n *Node) ID() []byte {
	return n.id.ID(n)
}

// String returns the node URL.
func (n *Node) String() string {
	return n.id.String(n)
}

// IP returns the node's IP address.
func (n *Node) IP() net.IP {
	return n.r.IP()
}

// TCP returns the node's TCP port.
func (n *Node) TCP() int {
	return n.r.TCP()
}

// UDP returns the node's UDP port.
func (n *Node) UDP() int {
	return n.r.UDP()
}

// Record returns the node's record.
func (n *Node) Record() *enr.Record {
	return &n.r
}

// Verify verifies the node's record.
func (n *Node) Verify() error {
	return n.r.Verify()
}

// Sign signs the node's record.
func (n *Node) Sign(privkey *ecdsa.PrivateKey) error {
	return n.r.Sign(privkey)
}

// Matches returns true if the node matches the given criteria.
func (n *Node) Matches(criteria *Criteria) bool {
	return criteria.Matches(n)
}

// ID represents a node ID.
type ID interface {
	// ID returns the node ID.
	ID(*Node) []byte

	// String returns the node URL.
	String(*Node) string
}

// Criteria represents a set of criteria for matching nodes.
type Criteria struct {
	ID      []byte
	IP      net.IP
	TCP, UDP int
}

// Matches returns true if the node matches the criteria.
func (c *Criteria) Matches(n *Node) bool {
	if c.ID != nil && !crypto.Equal(c.ID, n.ID()) {
		return false
	}
	if c.IP != nil && !c.IP.Equal(n.IP()) {
		return false
	}
	if c.TCP != 0 && c.TCP != n.TCP() {
		return false
	}
	if c.UDP != 0 && c.UDP != n.UDP() {
		return false
	}
	return true
} The codebase contains three functions: `parseNodeURL`, `parsePubkey`, and `URLv4`, and one method `PubkeyToIDV4` of the `Node` struct.

## parseNodeURL

This function parses an Ethereum node URL and returns a new `Node` struct. It first parses the ID from the URL, then parses the IP address and ensures it is 4 bytes long for IPv4 addresses. It then parses the port numbers and sets the UDP port to the value of the `discport` query parameter if it exists. Finally, it returns a new `Node` struct with the parsed values.

```go
func parseNodeURL(rawurl string, lookupIPFunc func(string) ([]net.IP, error)) (*Node, error) {
	// Parse the ID.
	u, err := url.Parse(rawurl)
	if err != nil {
		return nil, err
	}
	id, err := ParseV4(u.User.Username())
	if err != nil {
		return nil, fmt.Errorf("invalid node ID in URL: %v", err)
	}
	// Parse the IP address.
	ip := net.ParseIP(u.Hostname())
	if ip == nil {
		ips, err := lookupIPFunc(u.Hostname())
		if err != nil {
			return nil, err
		}
		ip = ips[0]
	}