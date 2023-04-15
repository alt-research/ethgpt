# Documentation for netutil.go

This file contains utility functions for network operations.

## TestParseNetlist

This function tests the `ParseNetlist` function, which parses a comma-separated list of IP address ranges in CIDR notation and returns a `Netlist` struct containing the parsed ranges. The function tests various input strings and expected output values.

## TestNilNetListContains

This function tests the `Contains` method of a `Netlist` struct when the struct is nil. The function checks that calling the method with a nil argument returns an error.

## TestIsLAN

This function tests the `IsLAN` function, which checks whether an IP address is on a local area network (LAN). The function tests various input IP addresses that should be included or excluded from the LAN.

## TestIsSpecialNetwork

This function tests the `IsSpecialNetwork` function, which checks whether an IP address is on a special network. The function tests various input IP addresses that should be included or excluded from the special network.

## checkContains

This function is a helper function used by `TestIsLAN` and `TestIsSpecialNetwork` to check whether an IP address is included or excluded from a list of IP addresses.

## parseIP

This function is a helper function used by `checkContains` to parse an IP address string into a `net.IP` struct.

## TestCheckRelayIP

This function tests the `CheckRelayIP` function, which checks whether a relay IP address is valid. The function tests various input sender and address IP addresses and expected error values. ## Introduction

This codebase contains three functions: `CheckRelayIP`, `SameNet`, and `DistinctNetSet`. These functions are used to check and manage IP addresses.

## CheckRelayIP

The `CheckRelayIP` function takes two IP addresses as input and returns an error if they are not allowed to communicate with each other. The function checks if the two IP addresses are in the same network or if they are in different networks. If they are in different networks, the function returns an error.

```go
func CheckRelayIP(sender, addr net.IP) error {
	if SameNet(24, sender, addr) {
		return nil
	}
	if SameNet(16, sender, addr) {
		return nil
	}
	return fmt.Errorf("relay not allowed from %s to %s", sender, addr)
}
```

## SameNet

The `SameNet` function takes three arguments: the number of bits in the network mask, and two IP addresses. The function returns true if the two IP addresses are in the same network, and false otherwise.

```go
func SameNet(bits uint, ip, other net.IP) bool {
	mask := net.CIDRMask(int(bits), 32)
	ip = ip.Mask(mask)
	other = other.Mask(mask)
	return ip.Equal(other)
}
```

## DistinctNetSet

The `DistinctNetSet` type is a set of IP addresses that are in distinct networks. The `Add` method adds an IP address to the set, and the `Remove` method removes an IP address from the set. The `Len` method returns the number of IP addresses in the set.

```go
type DistinctNetSet struct {
	Subnet uint
	Limit  int
	set    map[string]bool
}

func (s *DistinctNetSet) Add(ip net.IP) bool {
	if s.set == nil {
		s.set = make(map[string]bool)
	}
	if len(s.set) >= s.Limit {
		return false
	}
	for k := range s.set {
		if SameNet(s.Subnet, ip, net.ParseIP(k)) {
			return false
		}
	}
	s.set[ip.String()] = true
	return true
}

func (s *DistinctNetSet) Remove(ip net.IP) {
	delete(s.set, ip.String())
}

func (s *DistinctNetSet) Len() int {
	return len(s.set)
}
```

## Conclusion

These functions are useful for checking and managing IP addresses. The `CheckRelayIP` function can be used to ensure that two IP addresses are allowed to communicate with each other. The `SameNet` function can be used to check if two IP addresses are in the same network. The `DistinctNetSet` type can be used to manage a set of IP addresses that are in distinct networks.