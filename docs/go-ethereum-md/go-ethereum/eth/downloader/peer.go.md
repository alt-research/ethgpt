# Downloader Package

The `downloader` package contains the active peer-set of the downloader, maintaining both failures as well as reputation metrics to prioritize the block retrievals.

## Constants

- `maxLackingHashes`: Maximum number of entries allowed on the list or lacking items.

## Variables

- `errAlreadyRegistered`: An error that indicates that the peer is already registered.
- `errNotRegistered`: An error that indicates that the peer is not registered.

## Types

### `peerConnection`

`peerConnection` represents an active peer from which hashes and blocks are retrieved.

#### Fields

- `id`: Unique identifier of the peer.
- `rates`: Tracker to hone in on the number of items retrievable per second.
- `lacking`: Set of hashes not to request (didn't have previously).
- `peer`: Peer.
- `version`: Eth protocol version number to switch strategies.
- `log`: Contextual logger to add extra infos to peer logs.
- `lock`: RWMutex to synchronize access to the peer.

### `LightPeer`

`LightPeer` encapsulates the methods required to synchronize with a remote light peer.

#### Methods

- `Head() (common.Hash, *big.Int)`: Returns the head hash and total difficulty of the chain.
- `RequestHeadersByHash(common.Hash, int, int, bool, chan *eth.Response) (*eth.Request, error)`: Requests headers by hash.
- `RequestHeadersByNumber(uint64, int, int, bool, chan *eth.Response) (*eth.Request, error)`: Requests headers by number.

### `Peer`

`Peer` encapsulates the methods required to synchronize with a remote full peer.

#### Methods

- `LightPeer`: Embeds `LightPeer`.
- `RequestBodies([]common.Hash, chan *eth.Response) (*eth.Request, error)`: Requests block bodies.
- `RequestReceipts([]common.Hash, chan *eth.Response) (*eth.Request, error)`: Requests block receipts.

### `lightPeerWrapper`

`lightPeerWrapper` wraps a `LightPeer` struct, stubbing out the `Peer`-only methods.

#### Fields

- `peer`: Light peer.

#### Methods

- `Head() (common.Hash, *big.Int)`: Returns the head hash and total difficulty of the chain.
- `RequestHeadersByHash(common.Hash, int, int, bool, chan *eth.Response) (*eth.Request, error)`: Requests headers by hash.
- `RequestHeadersByNumber(uint64, int, int, bool, chan *eth.Response) (*eth.Request, error)`: Requests headers by number.
- `RequestBodies([]common.Hash, chan *eth.Response) (*eth.Request, error)`: Panics with a message that `RequestBodies` is not supported in light client mode sync.
- `RequestReceipts([]common.Hash, chan *eth.Response) (*eth.Request, error)`: Panics with a message that `RequestReceipts` is not supported in light client mode sync.

## Functions

### `newPeerConnection`

```go
func newPeerConnection(id string, version uint, peer Peer, logger log.Logger) *peerConnection
```

`newPeerConnection` creates a new downloader peer.

#### Parameters

- `id`: Unique identifier of the peer.
- `version`: Eth protocol version number to switch strategies.
- `peer`: Peer.
- `logger`: Contextual logger to add extra infos to peer logs.

#### Returns

- `*peerConnection`: A new downloader peer.

### `(*peerConnection) register`

```go
func (p *peerConnection) register() error
```

`register` registers the peer with the downloader.

#### Returns

- `error`: An error if the peer is already registered.

### `(*peerConnection) unregister`

```go
func (p *peerConnection) unregister()
```

`unregister` unregisters the peer from the downloader.

### `(*peerConnection) addLacking`

```go
func (p *peerConnection) addLacking(hashes []common.Hash)
```

`addLacking` adds a list of hashes to the set of lacking hashes.

#### Parameters

- `hashes`: A list of hashes to add.

### `(*peerConnection) removeLacking`

```go
func (p *peerConnection) removeLacking(hashes []common.Hash)
```

`removeLacking` removes a list of hashes from the set of lacking hashes.

#### Parameters

- `hashes`: A list of hashes to remove.

### `(*peerConnection) hasLacking`

```go
func (p *peerConnection) hasLacking(hash common.Hash) bool
```

`hasLacking` checks if a hash is in the set of lacking hashes.

#### Parameters

- `hash`: A hash to check.

#### Returns

- `bool`: `true` if ## Peer Connection

The `peerConnection` struct represents a connection to a peer in the Ethereum network. It contains the peer's ID, a map of lacking items, the peer itself, the peer's version, and a logger.

### `func NewPeerConnection(id string, peer p2p.Peer, version uint64, logger log.Logger) *peerConnection`

`NewPeerConnection` creates a new `peerConnection` instance with the given parameters.

- `id`: The ID of the peer.
- `peer`: The `p2p.Peer` instance representing the peer.
- `version`: The version of the peer.
- `logger`: The logger instance to use.

### `func (p *peerConnection) Reset()`

`Reset` clears the internal state of a peer entity.

### `func (p *peerConnection) UpdateHeaderRate(delivered int, elapsed time.Duration)`

`UpdateHeaderRate` updates the peer's estimated header retrieval throughput with the current measurement.

- `delivered`: The number of headers delivered.
- `elapsed`: The time elapsed during the header retrieval.

### `func (p *peerConnection) UpdateBodyRate(delivered int, elapsed time.Duration)`

`UpdateBodyRate` updates the peer's estimated body retrieval throughput with the current measurement.

- `delivered`: The number of bodies delivered.
- `elapsed`: The time elapsed during the body retrieval.

### `func (p *peerConnection) UpdateReceiptRate(delivered int, elapsed time.Duration)`

`UpdateReceiptRate` updates the peer's estimated receipt retrieval throughput with the current measurement.

- `delivered`: The number of receipts delivered.
- `elapsed`: The time elapsed during the receipt retrieval.

### `func (p *peerConnection) HeaderCapacity(targetRTT time.Duration) int`

`HeaderCapacity` retrieves the peer's header download allowance based on its previously discovered throughput.

- `targetRTT`: The target round-trip time.

### `func (p *peerConnection) BodyCapacity(targetRTT time.Duration) int`

`BodyCapacity` retrieves the peer's body download allowance based on its previously discovered throughput.

- `targetRTT`: The target round-trip time.

### `func (p *peerConnection) ReceiptCapacity(targetRTT time.Duration) int`

`ReceiptCapacity` retrieves the peers receipt download allowance based on its previously discovered throughput.

- `targetRTT`: The target round-trip time.

### `func (p *peerConnection) MarkLacking(hash common.Hash)`

`MarkLacking` appends a new entity to the set of items (blocks, receipts, states) that a peer is known not to have (i.e. have been requested before). If the set reaches its maximum allowed capacity, items are randomly dropped off.

- `hash`: The hash of the blockchain item.

### `func (p *peerConnection) Lacks(hash common.Hash) bool`

`Lacks` retrieves whether the hash of a blockchain item is on the peers lacking list (i.e. whether we know that the peer does not have it).

- `hash`: The hash of the blockchain item.

## Peer Set

The `peerSet` struct represents a collection of active peers participating in the chain download procedure. It contains a map of peers, a set of rate trackers, and a feed to publish peer lifecycle events on.

### `func newPeerSet() *peerSet`

`newPeerSet` creates a new `peerSet` instance.

### `func (ps *peerSet) SubscribeEvents(ch chan<- *peeringEvent) event.Subscription`

`SubscribeEvents` subscribes to peer arrival and departure events.

- `ch`: The channel to send the events to.

### `func (ps *peerSet) Reset()`

`Reset` iterates over the set of peers and resets their internal state. # Peer Set

The `peerSet` package provides a set of methods to manage a set of peers. It allows registering, unregistering, and retrieving peers from the set. It also provides a method to retrieve a flat list of all the peers within the set.

## Functions

### `Reset`

```go
func (ps *peerSet) Reset()
```

The `Reset` function iterates over the current peer set and resets each of the known peers to prepare for a next batch of block retrieval.

### `Register`

```go
func (ps *peerSet) Register(p *peerConnection) error
```

The `Register` function injects a new peer into the working set, or returns an error if the peer is already known. The method also sets the starting throughput values of the new peer to the average of all existing peers, to give it a realistic chance of being used for data retrievals.

### `Unregister`

```go
func (ps *peerSet) Unregister(id string) error
```

The `Unregister` function removes a remote peer from the active set, disabling any further actions to/from that particular entity.

### `Peer`

```go
func (ps *peerSet) Peer(id string) *peerConnection
```

The `Peer` function retrieves the registered peer with the given id.

### `Len`

```go
func (ps *peerSet) Len() int
```

The `Len` function returns the current number of peers in the set.

### `AllPeers`

```go
func (ps *peerSet) AllPeers() []*peerConnection
```

The `AllPeers` function retrieves a flat list of all the peers within the set.

### `peerCapacitySort`

```go
type peerCapacitySort struct {
	peers []*peerConnection
	caps  []int
}
```

The `peerCapacitySort` type implements `sort.Interface`. It sorts peer connections by capacity (descending).