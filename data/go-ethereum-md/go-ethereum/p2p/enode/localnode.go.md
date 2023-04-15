The `enode` package provides functionality for managing Ethereum nodes and their records. The `LocalNode` struct represents a local node and produces the signed node record of that node. The record can be updated by setting ENR entries via the `Set` method. A new version of the record is signed on demand when the `Node` method is called.

The `NewLocalNode` function creates a new local node with the given database and private key. The `Database` method returns the node database associated with the local node.

The `Node` method returns the current version of the local node record. If a valid record exists, it is returned. Otherwise, a new record is signed and returned. The initial sequence number is the current timestamp in milliseconds. To ensure that the initial sequence number will always be higher than any previous sequence number (assuming the clock is correct), the record is updated no faster than once per millisecond.

The `lnEndpoint` struct represents an endpoint for the local node. It contains an IP tracker, a static IP address, a fallback IP address, and a fallback UDP port.

The `iptrackMinStatements` constant represents the minimum number of statements required to track an IP address.

The `iptrackWindow` constant represents the time window for tracking IP addresses.

The `iptrackContactWindow` constant represents the time window for tracking contact with an IP address.

The `recordUpdateThrottle` constant represents the time needed to wait between two updates to the local ENR.

Example usage:

```
import (
	"crypto/ecdsa"
	"github.com/ethereum/go-ethereum/p2p/enode"
)

func main() {
	db := enode.NewDB("")
	key, _ := ecdsa.GenerateKey()
	localNode := enode.NewLocalNode(db, key)
	node := localNode.Node()
}
``` This is a Go codebase for a local node record. The code defines a `LocalNode` struct that contains a `cur` field of type `*Node`, a `seq` field of type `uint64`, an `id` field of type `ID`, and an `entries` field of type `map[string]enr.Entry`. The `LocalNode` struct also has a `mu` field of type `sync.Mutex` to synchronize access to the struct's fields.

The `Node` struct is not defined in this codebase, but it is assumed to be defined elsewhere. The `ID` and `enr.Entry` types are also assumed to be defined elsewhere.

The `LocalNode` struct has several methods defined on it:

- `Load` loads the current node record from the `cur` field.
- `Seq` returns the current sequence number of the local node record.
- `ID` returns the local node ID.
- `Set` puts the given entry into the local record, overwriting any existing value. This method is asynchronous, and any update will be queued up and published when at least one second passes from the last change.
- `Delete` removes the given entry from the local record.
- `SetStaticIP` sets the local IP to the given one unconditionally. This disables endpoint prediction.
- `SetFallbackIP` sets the last-resort IP address. This address is used if no endpoint prediction can be made and no static IP is set.
- `SetFallbackUDP` sets the last-resort UDP-on-IPv4 port. This port is used if no endpoint prediction can be made.
- `UDPEndpointStatement` should be called whenever a statement about the local node's UDP endpoint is received. It feeds the local endpoint predictor.
- `UDPContact` should be called whenever the local node has announced itself to another node via UDP. It feeds the local endpoint predictor.

The `LocalNode` struct also has several helper methods defined on it:

- `set` puts the given entry into the local record, overwriting any existing value. This method is called by `Set`.
- `delete` removes the given entry from the local record. This method is called by `Delete`.
- `endpointForIP` returns the endpoint for the given IP address.
- `updateEndpoints` updates the record with predicted endpoints.
- `get` returns the endpoint with highest precedence.

Here is an example of how to use the `LocalNode` struct:

```
package main

import (
	"fmt"
	"net"
)

func main() {
	ln := &LocalNode{}

	// Load the current node record.
	ln.Load()

	// Get the current sequence number of the local node record.
	seq := ln.Seq()
	fmt.Println("Sequence number:", seq)

	// Get the local node ID.
	id := ln.ID()
	fmt.Println("Local node ID:", id)

	// Set the local IP to the given one unconditionally.
	ip := net.ParseIP("192.168.0.1")
	ln.SetStaticIP(ip)

	// Set the last-resort IP address.
	fallbackIP := net.ParseIP("192.168.0.2")
	ln.SetFallbackIP(fallbackIP)

	// Set the last-resort UDP-on-IPv4 port.
	fallbackUDP := 1234
	ln.SetFallbackUDP(fallbackUDP)

	// Add an entry to the local record.
	entry := enr.IPv4(net.ParseIP("192.168.0.3"))
	ln.Set(entry)

	// Remove an entry from the local record.
	ln.Delete(entry)

	// Call UDPEndpointStatement whenever a statement about the local node's UDP endpoint is received.
	fromaddr := &net.UDPAddr{IP: net.ParseIP("192.168.0.4"), Port: 5678}
	endpoint := &net.UDPAddr{IP: net.ParseIP("192.168.0.5"), Port: 5678}
	ln.UDPEndpointStatement(fromaddr, endpoint)

	// Call UDPContact whenever the local node has announced itself to another node via UDP.
	toaddr := &net.UDPAddr{IP: net.ParseIP("192.168.0.6"), Port: 5678}
	ln.UDPContact(toaddr)
}
``` The codebase contains five functions: `predictIPPort`, `predictAddr`, `invalidate`, `sign`, and `nowMilliseconds`.

## predictIPPort

This function takes an `enr.Entry` and returns the IP address and port number that should be used to connect to the node represented by the entry. It first checks if the entry has a `tcp` field, and if so, returns the IP address and port number specified in the field. If the entry does not have a `tcp` field, it calls `predictAddr` to try to predict the IP address and port number based on the node's IP address and the current time.

```go
func predictIPPort(e *enr.Entry) (net.IP, uint16) {
	var newIP net.IP
	var newPort uint16

	if e.TCP != 0 {
		newIP = e.IP()
		newPort = e.TCP
	} else if ip, port := predictAddr(e.track); ip != nil {
		newIP = ip
		newPort = port
	}
	return newIP, newPort
}
```

## predictAddr

This function wraps `IPTracker.PredictEndpoint` and converts the endpoint representation returned by the method to an IP address and port number. It first calls `PredictEndpoint` to get the endpoint representation, and if it is empty, returns `nil` and `0`. Otherwise, it splits the endpoint representation into an IP address and port number, parses them, and returns them as a `net.IP` and `uint16`, respectively.

```go
func predictAddr(t *netutil.IPTracker) (net.IP, uint16) {
	ep := t.PredictEndpoint()
	if ep == "" {
		return nil, 0
	}
	ipString, portString, _ := net.SplitHostPort(ep)
	ip := net.ParseIP(ipString)
	port, err := strconv.ParseUint(portString, 10, 16)
	if err != nil {
		return nil, 0
	}
	return ip, uint16(port)
}
```

## invalidate

This function sets the current node to `nil` in the `LocalNode` struct.

```go
func (ln *LocalNode) invalidate() {
	ln.cur.Store((*Node)(nil