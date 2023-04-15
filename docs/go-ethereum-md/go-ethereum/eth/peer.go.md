## Documentation for the Ethereum Codebase

### Package: eth

The `eth` package contains the implementation of the Ethereum protocol. It provides the functionality to connect to the Ethereum network, send and receive transactions, and interact with smart contracts.

### Type: ethPeerInfo

The `ethPeerInfo` type represents a short summary of the `eth` sub-protocol metadata known about a connected peer. It contains the Ethereum protocol version negotiated with the peer.

### Type: ethPeer

The `ethPeer` type is a wrapper around `eth.Peer` to maintain a few extra metadata. It contains a reference to the `eth.Peer` instance and a reference to the satellite `snap` connection.

### Function: info

The `info` function gathers and returns some `eth` protocol metadata known about a peer. It returns an instance of `ethPeerInfo`.

### Type: snapPeerInfo

The `snapPeerInfo` type represents a short summary of the `snap` sub-protocol metadata known about a connected peer. It contains the snapshot protocol version negotiated with the peer.

### Type: snapPeer

The `snapPeer` type is a wrapper around `snap.Peer` to maintain a few extra metadata. It contains a reference to the `snap.Peer` instance.

### Function: info

The `info` function gathers and returns some `snap` protocol metadata known about a peer. It returns an instance of `snapPeerInfo`.