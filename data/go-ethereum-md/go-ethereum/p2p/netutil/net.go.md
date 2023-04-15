# Documentation for netutil package

The `netutil` package contains extensions to the `net` package. It provides additional functionality for working with IP networks.

## Variables

### lan4, lan6, special4, special6 Netlist

These variables are lists of IP networks. They are used to identify special IP addresses and networks.

### init()

This function initializes the `lan4`, `lan6`, `special4`, and `special6` variables with lists of IP networks.

## Types

### Netlist

`Netlist` is a list of IP networks.

### Methods

#### ParseNetlist(s string) (*Netlist, error)

`ParseNetlist` parses a comma-separated list of CIDR masks. It returns a pointer to a `Netlist` and an error. Whitespace and extra commas are ignored.

#### (l Netlist) MarshalTOML() interface{}

`MarshalTOML` implements `toml.MarshalerRec`. It returns a list of strings representing the IP networks in the `Netlist`.

#### (l *Netlist) UnmarshalTOML(fn func(interface{}) error) error

`UnmarshalTOML` implements `toml.UnmarshalerRec`. It parses a list of strings representing IP networks and adds them to the `Netlist`.

#### (l *Netlist) Add(cidr string)

`Add` parses a CIDR mask and appends it to the `Netlist`. It panics for invalid masks and is intended to be used for setting up static lists.

## Functions

### func IsLAN(addr net.IP) bool

`IsLAN` returns true if the given IP address is on a local area network (LAN).

### func IsSpecial(addr net.IP) bool

`IsSpecial` returns true if the given IP address is a special IP address.

### func IsPrivate(addr net.IP) bool

`IsPrivate` returns true if the given IP address is a private IP address.

### func IsLoopback(addr net.IP) bool

`IsLoopback` returns true if the given IP address is a loopback address.

### func IsMulticast(addr net.IP) bool

`IsMulticast` returns true if the given IP address is a multicast address.

### func IsIPv4(addr net.IP) bool

`IsIPv4` returns true if the given IP address is an IPv4 address.

### func IsIPv6(addr net.IP) bool

`IsIPv6` returns true if the given IP address is an IPv6 address.

### func ParseIP(s string) net.IP

`ParseIP` parses a string representation of an IP address and returns a `net.IP` object.

### func ParseCIDR(s string) (*net.IPNet, error)

`ParseCIDR` parses a string representation of a CIDR mask and returns a `net.IPNet` object and an error.

### func CIDRMask(ones, bits int) net.IPMask

`CIDRMask` returns an IP mask with the specified number of ones and bits.

### func IPRange(start, end net.IP) ([]net.IP, error)

`IPRange` returns a slice of IP addresses between the start and end IP addresses. It returns an error if the start IP address is greater than the end IP address.

### func IPDiff(a, b net.IP) (net.IP, error)

`IPDiff` returns the absolute difference between two IP addresses. It returns an error if the IP addresses are not the same type.

### func IPAdd(a, b net.IP) (net.IP, error)

`IPAdd` returns the sum of two IP addresses. It returns an error if the IP addresses are not the same type.

### func IPSub(a, b net.IP) (net.IP, error)

`IPSub` returns the difference between two IP addresses. It returns an error if the IP addresses are not the same type.

### func IPInRange(ip, network string) bool

`IPInRange` returns true if the given IP address is in the given network. It accepts IP addresses and CIDR masks as strings.

### func IPNetContains(net *net.IPNet, ip net.IP) bool

`IPNetContains` returns true if the given IP address is in the given network. It accepts a `net.IPNet` object and a `net.IP` object.

### func IPNetOverlap(a, b *net.IPNet) bool

`IPNetOverlap` returns true if the two IP networks overlap. It accepts two `net.IPNet` objects.

### func IPNetListOverlap(a, b Netlist) bool

`IPNetListOverlap` returns true if any of the IP networks in the two `Netlist` objects overlap.

### func IPNetListContains(l Netlist, ip net.IP) bool

`IPNetListContains` returns true if the given IP address is in any of the IP networks in the `Netlist`. This codebase contains a set of functions and a struct that deal with IP addresses and network ranges. The functions are:

1. `func (l *Netlist) Add(cidr string)`: This function takes a CIDR notation string and adds the corresponding network range to a Netlist. The Netlist is a slice of net.IPNet structs. The function first parses the CIDR string using `net.ParseCIDR()`. If there is an error, it panics. Otherwise, it appends the parsed net.IPNet struct to the Netlist.

2. `func (l *Netlist) Contains(ip net.IP) bool`: This function takes an IP address and checks if it is contained in any of the network ranges in the Netlist. It returns true if the IP is contained in any of the ranges, false otherwise.

3. `func IsLAN(ip net.IP) bool`: This function takes an IP address and checks if it is a local network address. It first checks if the IP is a loopback address using `ip.IsLoopback()`. If it is, it returns true. Otherwise, it checks if the IP is an IPv4 address using `ip.To4()`. If it is, it checks if the IP is contained in a predefined IPv4 local network range called `lan4`. If it is not an IPv4 address, it checks if the IP is contained in a predefined IPv6 local network range called `lan6`. If the IP is contained in any of the local network ranges, the function returns true. Otherwise, it returns false.

4. `func IsSpecialNetwork(ip net.IP) bool`: This function takes an IP address and checks if it is located in a special-use network range. This includes broadcast, multicast, and documentation addresses. It first checks if the IP is a multicast address using `ip.IsMulticast()`. If it is, it returns true. Otherwise, it checks if the IP is an IPv4 address using `ip.To4()`. If it is, it checks if the IP is contained in a predefined IPv4 special-use network range called `special4`. If it is not an IPv4 address, it checks if the IP is contained in a predefined IPv6 special-use network range called `special6`. If the IP is contained in any of the special-use network ranges, the function returns true. Otherwise, it returns false.

5. `func CheckRelayIP(sender, addr net.IP) error`: This function takes two IP addresses, `sender` and `addr`, and reports whether `addr` is a valid connection target relayed from `sender`. There are four rules for determining if `addr` is valid:
   - Special network addresses are never valid.
   - Loopback addresses are valid if relayed by a loopback host.
   - LAN addresses are valid if relayed by a LAN host.
   - All other addresses are always valid.

   The function returns an error if `addr` is not valid. The error can be one of the following:
   - `errInvalid`: if `addr` is not a valid IP address.
   - `errUnspecified`: if `addr` is the zero address.
   - `errSpecial`: if `addr` is a special-use network address.
   - `errLoopback`: if `addr` is a loopback address and `sender` is not a loopback host.
   - `errLAN`: if `addr` is a local network address and `sender` is not a LAN host.

6. `func SameNet(bits uint, ip, other net.IP) bool`: This function takes a bit length `bits` and two IP addresses `ip` and `other`, and reports whether the two IP addresses have an equal prefix of the given bit length. The function first checks if both IP addresses are IPv4 addresses using `ip.To4()`. If they are, it calls the `sameNet()` function with the IPv4 addresses. Otherwise, it calls the `sameNet()` function with the IPv6 addresses.

7. `func sameNet(bits uint, ip, other net.IP) bool`: This function takes a bit length `bits` and two IPv4 or IPv6 addresses `ip` and `other`, and reports whether the two addresses have an equal prefix of the given bit length. The function first calculates the number of bytes that the prefix length covers, and creates a mask for the remaining bits. It then compares the bytes covered by the prefix and the masked bits of the two addresses. If they are equal, the function returns true. Otherwise, it returns false.

The struct is:

1. `type DistinctNetSet struct`: This struct tracks IP addresses and ensures that at most N of them fall into the same network range. It has the following fields:
   - `Subnet uint`: the number of common prefix bits.
   - `Limit uint`: the maximum number of IPs in each subnet.
   - `members map[string]uint`: a map that tracks the number of IPs in each subnet.
   - `buf net.IP`: a buffer used for encoding the map key for an address.

   The struct has the following methods:
   - `func (s *DistinctNetSet) Add(ip net.IP) bool`: This method adds an IP address to the set. It returns false (and doesn't add the IP) if the number of existing IPs in the defined range exceeds the limit.
   - `func (s *DistinctNetSet) Remove(ip net.IP)`: This method removes an IP from the set.
   - `func (s DistinctNetSet) Contains(ip net.IP) bool`: This method checks whether the given IP is contained in the set.
   - `func (s DistinctNetSet) Len() int`: This method returns the number of tracked IPs.
   - `func (s *DistinctNetSet) key(ip net.IP) []byte`: This method encodes the map key for an address in the set. It first checks if the address is an IPv4 address using `ip.To4()`. If it is, it creates a byte slice with the IPv4 address and the subnet length. Otherwise, it creates a byte slice with the IPv6 address and the subnet length. The code above is a Go package that provides a "DistinctNetSet" struct for storing a set of distinct IP subnets. The struct includes a "members" map for storing the number of times each subnet has been added to the set, a "Subnet" field for specifying the number of bits to use for the subnet, and a "buf" field for storing a temporary buffer.

The "key" method is used to generate a key for a given IP address. The method takes an IP address and returns a net.IP object representing the key. The first byte of the key is '4' or '6' to distinguish IPv4/IPv6 address types. The remainder of the key is the IP, truncated to the number of bits specified by the "Subnet" field. The method encodes the prefix into the "buf" field and returns it as the key.

The "String" method implements the fmt.Stringer interface and returns a string representation of the DistinctNetSet. The method creates a buffer and writes the set of distinct subnets to it in the format "{IP×count IP×count ...}". The method sorts the keys in the "members" map and iterates over them to write each subnet and its count to the buffer.

Here is an example usage of the "DistinctNetSet" struct:

```
set := &DistinctNetSet{Subnet: 24}
ip1 := net.ParseIP("192.168.1.1")
ip2 := net.ParseIP("192.168.1.2")
ip3 := net.ParseIP("192.168.2.1")
set.Add(ip1)
set.Add(ip2)
set.Add(ip3)
fmt.Println(set) // Output: {192.168.1.0×2 192.