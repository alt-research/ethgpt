This codebase contains a SessionCache implementation for the Discovery v5 wire protocol in Go. Here is a brief description of each function:

1. `NewSessionCache` - This function creates a new SessionCache with a maximum number of items and a clock. It returns a pointer to the new SessionCache.

2. `generateNonce` - This function generates a nonce for encrypting a message to a session. It takes a counter as input and returns a Nonce type and an error.

3. `generateMaskingIV` - This function generates a masking IV for encrypting a message to a session. It takes a byte slice as input and returns an error.

4. `nextNonce` - This function generates a nonce for encrypting a message to a session. It takes a session as input and returns a Nonce type and an error.

5. `session` - This function returns the current session for a given node, if any. It takes an enode.ID and an address as input and returns a pointer to a session.

6. `readKey` - This function returns the current read key for a given node. It takes an enode.ID and an address as input and returns a byte slice.

7. `storeNewSession` - This function stores new encryption keys in the cache. It takes an enode.ID, an address, and a session as input.

8. `getHandshake` - This function gets the handshake challenge that was previously sent to a given remote node. It takes an enode.ID and an address as input and returns a pointer to a Whoareyou.

9. `storeSentHandshake` - This function stores the handshake challenge that was sent to a given remote node. It takes an enode.ID, an address, and a pointer to a Whoareyou as input.

The `SessionCache` type keeps negotiated encryption keys and state for in-progress handshakes in the Discovery v5 wire protocol. The `sessionID` type identifies a session or handshake. The `session` type contains session information, including the write key, read key, and nonce counter. The `keysFlipped` function returns a copy of a session with the read and write keys flipped.

This codebase also includes constants, including `handshakeTimeout`, which is set to one second. The `nonceGen`, `maskingIVGen`, and `ephemeralKeyGen` fields in the `SessionCache` type are hooks for overriding randomness. This codebase contains three functions that are used for managing a session cache in a Go program. Here is a brief description of each function:

1. `addHandshake` - This function takes a node ID and an address, and adds a new handshake challenge to the session cache for that node. The challenge includes a timestamp indicating when it was sent. The session cache is a map that maps `sessionID` structs to `handshakeChallenge` structs.

2. `deleteHandshake` - This function takes a node ID and an address, and deletes the handshake challenge for that node from the session cache.

3. `handshakeGC` - This function deletes any handshake challenges from the session cache that have timed out. A handshake challenge is considered timed out if it was sent more than `handshakeTimeout` ago. The `handshakeTimeout` constant is defined elsewhere in the codebase.

Here is an example of how these functions can be used together:

```go
import (
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth"
	"github.com/ethereum/go-ethereum/p2p"
)

func main() {
	// Create a new session cache
	sessionCache := p2p.NewSessionCache(eth.DefaultConfig.HandshakeTimeout)

	// Add a new handshake challenge for a node
	nodeID := enode.ID{0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef}
	nodeAddr := "192.168.0.1:30303"
	sessionCache.addHandshake(nodeID, nodeAddr)

	// Wait for some time to simulate a timeout
	time.Sleep(2 * eth.DefaultConfig.HandshakeTimeout)

	// Run the garbage collector to delete timed-out handshakes
	sessionCache.handshakeGC()

	// Verify that the handshake challenge has been deleted
	_, ok := sessionCache.handshakes[sessionID{nodeID, nodeAddr}]
	if ok {
		panic("Handshake challenge was not deleted")
	}
}
```

In this example, we create a new session cache using the `NewSessionCache` function, which takes a handshake timeout as an argument. We then add a new handshake challenge for a node using the `addHandshake` function. We wait for some time to simulate a timeout, and then run the garbage collector using the `handshakeGC` function to delete any timed-out handshakes. Finally, we verify that the handshake challenge has been deleted from the session cache.