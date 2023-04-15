This codebase contains a package called `dnsdisc` that implements node discovery via DNS (EIP-1459). The package has the following functions:

1. `func QueryDNS(name string) ([]string, error)`: This function takes a DNS name and queries the DNS server for SRV records. It returns a slice of strings containing the target addresses of the SRV records, and an error if there was a problem querying the DNS server.

2. `func ParseDNSName(name string) (string, string, error)`: This function takes a DNS name and parses it into a service name and a domain name. It returns the service name, domain name, and an error if the DNS name is not in the correct format.

3. `func (d *dnsdisc) Lookup() ([]*enode.Node, error)`: This method of the `dnsdisc` struct performs a DNS lookup for SRV records of the service specified in the `dnsdisc` struct. It then queries the DNS server for the A/AAAA records of the targets in the SRV records. It returns a slice of `enode.Node` structs containing the IP addresses and public keys of the discovered nodes, and an error if there was a problem performing the DNS lookup.

4. `func (d *dnsdisc) Start() error`: This method of the `dnsdisc` struct starts the node discovery process. It first performs a DNS lookup for SRV records of the service specified in the `dnsdisc` struct. It then queries the DNS server for the A/AAAA records of the targets in the SRV records. It adds the discovered nodes to the `enode.DB` specified in the `dnsdisc` struct. The method returns an error if there was a problem performing the DNS lookup or adding the discovered nodes to the `enode.DB`.

5. `func (d *dnsdisc) Stop() error`: This method of the `dnsdisc` struct stops the node discovery process. It cancels any ongoing DNS queries and removes the discovered nodes from the `enode.DB` specified in the `dnsdisc` struct. The method returns an error if there was a problem cancelling the DNS queries or removing the discovered nodes from the `enode.DB`.

The package also contains a struct called `dnsdisc` that represents a DNS-based node discovery mechanism. The struct has the following fields:

1. `Service string`: the name of the service to discover nodes for.
2. `Domain string`: the domain name to perform the DNS lookup on.
3. `DB *enode.DB`: the `enode.DB` to add discovered nodes to.
4. `Interval time.Duration`: the interval at which to perform DNS lookups.
5. `Cancel context.CancelFunc`: a function to cancel any ongoing DNS queries.

The `dnsdisc` struct has the following methods:

1. `func New(service, domain string, db *enode.DB, interval time.Duration) (*dnsdisc, error)`: This function creates a new `dnsdisc` struct with the specified service name, domain name, `enode.DB`, and DNS lookup interval. It returns a pointer to the new `dnsdisc` struct and an error if there was a problem creating the struct.

2. `func (d *dnsdisc) SetInterval(interval time.Duration)`: This method of the `dnsdisc` struct sets the DNS lookup interval to the specified duration.

3. `func (d *dnsdisc) SetDB(db *enode.DB)`: This method of the `dnsdisc` struct sets the `enode.DB` to add discovered nodes to.

4. `func (d *dnsdisc) SetCancel(cancel context.CancelFunc)`: This method of the `dnsdisc` struct sets the function to cancel any ongoing DNS queries.

5. `func (d *dnsdisc) SetService(service string)`: This method of the `dnsdisc` struct sets the name of the service to discover nodes for.

6. `func (d *dnsdisc) SetDomain(domain string)`: This method of the `dnsdisc` struct sets the domain name to perform the DNS lookup on.