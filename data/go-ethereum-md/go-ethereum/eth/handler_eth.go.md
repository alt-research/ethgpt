## Documentation for the Ethereum Codebase

### Package: eth

The `eth` package provides the implementation of the Ethereum protocol. It includes the `ethHandler` type, which implements the `eth.Backend` interface to handle the various network packets that are sent as replies or broadcasts.

### Type: ethHandler

The `ethHandler` type implements the `eth.Backend` interface and handles the various network packets that are sent as replies or broadcasts. It has the following methods:

- `Chain() *core.BlockChain`: returns the blockchain associated with the `ethHandler`.
- `TxPool() eth.TxPool`: returns the transaction pool associated with the `ethHandler`.
- `RunPeer(peer *eth.Peer, hand eth.Handler) error`: invoked when a peer joins on the `eth` protocol.
- `PeerInfo(id enode.ID) interface{}`: retrieves all known `eth` information about a peer.
- `AcceptTxs() bool`: retrieves whether transaction processing is enabled on the node or if inbound transactions should simply be dropped.
- `Handle(peer *eth.Peer, packet eth.Packet) error`: invoked from a peer's message handler when it receives a new remote message that the handler couldn't consume and serve itself.
- `handleBlockAnnounces(peer *eth.Peer, hashes []common.Hash, numbers []uint64) error`: invoked from a peer's message handler when it transmits a batch of block announcements for the local node to process.

### Function: (h *ethHandler) Chain()

```go
func (h *ethHandler) Chain() *core.BlockChain { return h.chain }
```

The `Chain()` method returns the blockchain associated with the `ethHandler`.

### Function: (h *ethHandler) TxPool()

```go
func (h *ethHandler) TxPool() eth.TxPool      { return h.txpool }
```

The `TxPool()` method returns the transaction pool associated with the `ethHandler`.

### Function: (h *ethHandler) RunPeer(peer *eth.Peer, hand eth.Handler) error

```go
func (h *ethHandler) RunPeer(peer *eth.Peer, hand eth.Handler) error {
	return (*handler)(h).runEthPeer(peer, hand)
}
```

The `RunPeer()` method is invoked when a peer joins on the `eth` protocol.

### Function: (h *ethHandler) PeerInfo(id enode.ID) interface{}

```go
func (h *ethHandler) PeerInfo(id enode.ID) interface{} {
	if p := h.peers.peer(id.String()); p != nil {
		return p.info()
	}
	return nil
}
```

The `PeerInfo()` method retrieves all known `eth` information about a peer.

### Function: (h *ethHandler) AcceptTxs() bool

```go
func (h *ethHandler) AcceptTxs() bool {
	return atomic.LoadUint32(&h.acceptTxs) == 1
}
```

The `AcceptTxs()` method retrieves whether transaction processing is enabled on the node or if inbound transactions should simply be dropped.

### Function: (h *ethHandler) Handle(peer *eth.Peer, packet eth.Packet) error

```go
func (h *ethHandler) Handle(peer *eth.Peer, packet eth.Packet) error {
	// Consume any broadcasts and announces, forwarding the rest to the downloader
	switch packet := packet.(type) {
	case *eth.NewBlockHashesPacket:
		hashes, numbers := packet.Unpack()
		return h.handleBlockAnnounces(peer, hashes, numbers)

	case *eth.NewBlockPacket:
		return h.handleBlockBroadcast(peer, packet.Block, packet.TD)

	case *eth.NewPooledTransactionHashesPacket66:
		return h.txFetcher.Notify(peer.ID(), *packet)

	case *eth.NewPooledTransactionHashesPacket68:
		return h.txFetcher.Notify(peer.ID(), packet.Hashes)

	case *eth.TransactionsPacket:
		return h.txFetcher.Enqueue(peer.ID(), *packet, false)

	case *eth.PooledTransactionsPacket:
		return h.txFetcher.Enqueue(peer.ID(), *packet, true)

	default:
		return fmt.Errorf("unexpected eth packet type: %T", packet)
	}
}
```

The `Handle()` method is invoked from a peer's message handler when it receives a new remote message that the handler couldn't consume and serve itself.

### Function: (h *ethHandler) handleBlockAnnounces(peer *eth.Peer, hashes []common.Hash, numbers []uint64) error

```go
func (h *ethHandler) handleBlockAnnounces(peer *eth.Peer, hashes []common.Hash, numbers []uint64) error {
	// Drop all incoming block announces from the p2p network if
	// the chain already entered the pos stage and disconnect the
	// remote peer.
	if h.merger.PoSFinalized() {
		// TODO (MariusVanDerWijden) drop non-updated peers after the merge
		return nil
		// return errors.New("unexpected block announces")
	}
	// Schedule all the unknown hashes for retrieval
	var (
		unknownHashes  = make([]common.Hash, 0, len(hashes))
		unknownNumbers = make([]uint64, 0, len(numbe
```

The `handleBlockAnnounces()` method is invoked from a peer's message handler when it transmits a batch of block announcements for the local node to process. ## Documentation for the Ethereum Codebase

### Function: handleBlockAnnounce

The `handleBlockAnnounce` function is responsible for handling incoming block announcements from peers. It first checks if the chain has already entered the PoS stage, and if so, it drops the incoming block and disconnects the remote peer. If the block is importable, it is scheduled for import using the `blockFetcher.Enqueue` function. The function then calculates the true head hash and total difficulty that the peer must have, and updates the peer's total difficulty if it is better than the previous. Finally, it calls the `handlePeerEvent` function of the `chainSync` object to handle the peer event.

### Function: handleBlockHeaders

The `handleBlockHeaders` function is responsible for handling incoming block headers from peers. It first checks if the chain has already entered the PoS stage, and if so, it drops the incoming headers and disconnects the remote peer. If the headers are valid, it checks if any of the headers are unknown to the local node, and if so, it notifies the `blockFetcher` object to fetch the corresponding blocks from the peer.

### Function: handleBlockBodies

The `handleBlockBodies` function is responsible for handling incoming block bodies from peers. It first checks if the chain has already entered the PoS stage, and if so, it drops the incoming bodies and disconnects the remote peer. If the bodies are valid, it checks if any of the blocks are unknown to the local node, and if so, it notifies the `blockFetcher` object to fetch the corresponding blocks from the peer.

### Function: handleNewBlockHashes

The `handleNewBlockHashes` function is responsible for handling incoming new block hashes from peers. It first checks if the chain has already entered the PoS stage, and if so, it drops the incoming hashes and disconnects the remote peer. If any of the hashes are unknown to the local node, it notifies the `blockFetcher` object to fetch the corresponding blocks from the peer.

### Function: handleBlockBroadcast

The `handleBlockBroadcast` function is responsible for handling incoming block broadcasts from peers. It first checks if the chain has already entered the PoS stage, and if so, it drops the incoming block and disconnects the remote peer. If the block is importable, it is scheduled for import using the `blockFetcher.Enqueue` function. The function then calculates the true head hash and total difficulty that the peer must have, and updates the peer's total difficulty if it is better than the previous. Finally, it calls the `handlePeerEvent` function of the `chainSync` object to handle the peer event.