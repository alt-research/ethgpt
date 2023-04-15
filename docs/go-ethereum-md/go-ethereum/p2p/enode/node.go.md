port number, and whether it has a valid secp256k1 public key. It returns an error if any of these conditions are not met.
```go
func (n *Node) ValidateComplete() error {
    if n.Incomplete() {
        return errors.New("incomplete node")
    }
    if n.Pubkey() == nil {
        return errors.New("missing public key")
    }
    return nil
}
```

// String returns the node's enode URL.
func (n *Node) String() string {
	return n.URLv4()
}

// URL returns the node's enode URL. If the node has no IP address, it returns an empty string.
func (n *Node) URL() string {
	if n.Incomplete() {
		return ""
	}
	return n.URLv4()
}

// URLv4 returns the node's enode URL using the v4 format.
func (n *Node) URLv4() string {
	var (
		ip4 enr.IPv4
		ip6 enr.IPv6
	)
	if n.Load(&ip4) == nil {
		return fmt.Sprintf("enode://%s@%s:%d", n.id, net.IP(ip4), n.UDP())
	}
	if n.Load(&ip6) == nil {
		return fmt.Sprintf("enode://%s@[%s]:%d", n.id, net.IP(ip6), n.UDP())
	}
	return ""
}

// URLv6 returns the node's enode URL using the v6 format.
func (n *Node) URLv6() string {
	var (
		ip4 enr.IPv4
		ip6 enr.IPv6
	)
	if n.Load(&ip6) == nil {
		return fmt.Sprintf("enode://[%s]:%d?discport=%d", net.IP(ip6), n.TCP(), n.UDP())
	}
	if n.Load(&ip4) == nil {
		return fmt.Sprintf("enode://%s@%s:%d?discport=%d", n.id, net.IP(ip4), n.TCP(), n.UDP())
	}
	return ""
}

// ParseV4 decodes and verifies an enode:// URL.
func ParseV4(input string) (*Node, error) {
	if !strings.HasPrefix(input, "enode://") {
		return nil, errors.New("invalid enode URL")
	}
	input = input[8:]
	var (
		id  ID
		ip  net.IP
		err error
	)
	if i := strings.IndexByte(input, '@'); i >= 0 {
		if _, err = hex.Decode(id[:], []byte(input[:i])); err != nil {
			return nil, err
		}
		input = input[i+1:]
	}
	if i := strings.IndexByte(input, '?'); i >= 0 {
		input, err = urlUnescape(input[:i])
		if err != nil {
			return nil, err
		}
	}
	if strings.HasPrefix(input, "[") {
		if j := strings.IndexByte(input, ']'); j >= 0 {
			ip = net.ParseIP(input[1:j])
			input = input[j+1:]
		}
	} else {
		if i := strings.IndexByte(input, ':'); i >= 0 {
			ip = net.ParseIP(input[:i])
			input = input[i+1:]
		}
	}
	if ip == nil {
		return nil, errors.New("missing IP address")
	}
	var (
		port enr.UDP
		dport enr.UDP
	)
	if i := strings.IndexByte(input, ':'); i >= 0 {
		if _, err = fmt.Sscan(input[:i], &port); err != nil {
			return nil, err
		}
		input = input[i+1:]
	}
	if i := strings.IndexByte(input, '?'); i >= 0 {
		input = input[i+1:]
		for _, part := range strings.Split(input, "&") {
			if strings.HasPrefix(part, "discport=") {
				if _, err = fmt.Sscan(part[9:], &dport); err != nil {
					return nil, err
				}
				break
			}
		}
	}
	r := enr.Record{}
	if err := r.Set((*enr.IPv4)(&ip)); err != nil {
		return nil, err
	}
	if err := r.Set(&port); err != nil {
		return nil, err
	}
	if dport != 0 {
		if err := r.Set(&dport); err != nil {
			return nil, err
		}
	}
	return New(ValidSchemes, &r)
}

// urlUnescape unescapes a URL-encoded string.
func urlUnescape(s string) (string, error) {
	if strings.IndexByte(s, '%') < 0 {
		return s, nil
	}
	var buf strings.Builder
	for i := 0; i < len(s); i++ {
		if s[i] == '%' {
			if i+2 >= len(s) {
				return "", errors.New("invalid URL escape")
			}
			b, err := hex.DecodeString(s[i+1 : i+3])
			if err != nil {
				return "", err
			}
			buf.Write(b)
			i += 2
		} else {
			buf.WriteByte(s[i])
		}
	}
	return buf.String(), nil
}

// ID represents the node identifier.
type ID [enr.IDSize]byte

// String returns the hex-encoded node ID.
func (id ID) String() string {
	return hex.EncodeToString(id[:])
}

// Bytes returns the raw node ID.
func (id ID) Bytes() []byte {
	return id[:]
}

// ParseID parses a hex-encoded node ID.
func ParseID(input string) (ID, error) {
	var id ID
	if _, err := hex.Decode(id[:], []byte(input)); err != nil {
		return id, err
	}
	return id, nil
}

// ValidSchemes is the list of identity schemes that are considered valid.
var ValidSchemes = enr.IdentitySchemeRegistry{
	enr.SchemeV4: enr.NewV4(),
}

// Secp256k1 is an ENR entry type for a secp256k1 public key.
type Secp256k1 ecdsa.PublicKey

// EncodeRLP implements rlp.Encoder.
func (key *Secp256k1) EncodeRLP(w io.Writer) error {
	return rlp.Encode(w, key.X.Bytes())
}

// DecodeRLP implements rlp.Decoder.
func (key *Secp256k1) DecodeRLP(s *rlp.Stream) error {
	var buf []byte
	if err := s.Decode(&buf); err != nil {
		return err
	}
	if len(buf) != 32 {
		return fmt.Errorf("invalid secp256k1 public key length %d", len(buf))
	}
	key.X = new(big.Int).SetBytes(buf)
	key.Y = new(big.Int).SetBytes(secp256k1Y(key.X))
	return nil
}

// secp256k1Y calculates the Y coordinate of a secp256k1 public key given its X coordinate.
func secp256k1Y(x *big.Int) []byte {
	p := secp256k1.Params().P
	y2 := new(big.Int).Mod(new(big.Int).Mul(x, x), p)
	y2.Add(y2, secp256k1B)
	y2.Mod(y2, p)
	y := new(big.Int).ModSqrt(y2, p)
	if y == nil {
		return nil
	}
	if y.Bit(0) != bits.LeadingZeros8(secp256k1B)%2 {
		y.Sub(p, y)
	}
	return y.Bytes()
}

// secp256k1B is the secp256k1 curve parameter.
var secp256k1B = big.NewInt(7)
``` ## Node Package Documentation

### Function: ValidateComplete()

This function validates a Node object and returns an error if it is incomplete or invalid. It checks if the IP address is missing, if the UDP port is missing, and if the IP address is multicast or unspecified. It also validates the node key on curve. 

```go
func (n *Node) ValidateComplete() error {
	if n.Incomplete() {
		return errors.New("missing IP address")
	}
	if n.UDP() == 0 {
		return errors.New("missing UDP port")
	}
	ip := n.IP()
	if ip.IsMulticast() || ip.IsUnspecified() {
		return errors.New("invalid IP (multicast/unspecified)")
	}
	// Validate the node key (on curve, etc.).
	var key Secp256k1
	return n.Load(&key)
}
```

### Function: String()

This function returns the text representation of the Node object. If the Node object is a new version 4, it returns the URLv4. Otherwise, it encodes the Node object to bytes and returns the base64-encoded string with the "enr:" prefix.

```go
func (n *Node) String() string {
	if isNewV4(n) {
		return n.URLv4() // backwards-compatibility glue for NewV4 nodes
	}
	enc, _ := rlp.EncodeToBytes(&n.r) // always succeeds because record is valid
	b64 := base64.RawURLEncoding.EncodeToString(enc)
	return "enr:" + b64
}
```

### Function: MarshalText()

This function implements the encoding.TextMarshaler interface and returns the text representation of the Node object.

```go
func (n *Node) MarshalText() ([]byte, error) {
	return []byte(n.String()), nil
}
```

### Function: UnmarshalText()

This function implements the encoding.TextUnmarshaler interface and unmarshals the text representation of the Node object.

```go
func (n *Node) UnmarshalText(text []byte) error {
	dec, err := Parse(ValidSchemes, string(text))
	if err == nil {
		*n = *dec
	}
	return err
}
```

### Type: ID

This type represents a unique identifier for each node.

### Function: Bytes()

This function returns a byte slice representation of the ID.

```go
func (n ID) Bytes() []byte {
	return n[:]
}
```

### Function: String()

This function returns the hexadecimal string representation of the ID.

```go
func (n ID) String() string {
	return fmt.Sprintf("%x", n[:])
}
```

### Function: GoString()

This function returns the Go syntax representation of the ID as a call to HexID.

```go
func (n ID) GoString() string {
	return fmt.Sprintf("enode.HexID(\"%x\")", n[:])
}
```

### Function: TerminalString()

This function returns a shortened hexadecimal string representation of the ID for terminal logging.

```go
func (n ID) TerminalString() string {
	return hex.EncodeToString(n[:8])
}
```

### Function: MarshalText()

This function implements the encoding.TextMarshaler interface and returns the text representation of the ID.

```go
func (n ID) MarshalText() ([]byte, error) {
	return []byte(hex.EncodeToString(n[:])), nil
}
```

### Function: UnmarshalText()

This function implements the encoding.TextUnmarshaler interface and unmarshals the text representation of the ID.

```go
func (n *ID) UnmarshalText(text []byte) error {
	id, err := ParseID(string(text))
	if err != nil {
		return err
	}
	*n = id
	return nil
}
```

### Function: HexID()

This function converts a hexadecimal string to an ID. It panics if the string is not a valid ID.

```go
func HexID(in string) ID {
	id, err := ParseID(in)
	if err != nil {
		panic(err)
	}
	return id
}
```

### Function: ParseID()

This function parses a hexadecimal string and returns an ID. It returns an error if the string is not a valid ID.

```go
func ParseID(in string) (ID, error) {
	var id ID
	b, err := hex.DecodeString(strings.TrimPrefix(in, "0x"))
	if err != nil {
		return id, err
	} else if len(b) != len(id) {
		return id, fmt.Errorf("wrong length, want %d hex chars", len(id)*2)
	}
	copy(id[:], b)
	return id, nil
}
```

### Function: DistCmp()

This function compares the distances between two IDs and a target ID. It returns -1 if the first ID is closer to the target ID, 1 if the second ID is closer to the target ID, and 0 if they are equal.

```go
func DistCmp(target, a, b ID) int {
	for i := range target {
		da := a[i] ^ target[i]
		db := b[i] ^ target[i]
		if da > db {
			return 1
		} else if da < db {
			return -1
		}
	}
	return 0
}
```

### Function: LogDist()

This function returns the logarithmic distance between two IDs. It calculates the bitwise XOR of the two IDs and returns the number of leading zeros in the result.

```go
func LogDist(a, b ID) int {
	lz := 0
	for i := range a {
		x := a[i] ^ b[i]
		if x == 0 {
			lz += 8
		} else {
			lz += bits.LeadingZeros8(x)
			break
		}
	}
	return len(a)*8 - lz
}
```