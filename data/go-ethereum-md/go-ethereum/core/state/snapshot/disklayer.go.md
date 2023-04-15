## Package snapshot

The `snapshot` package provides a low-level persistent snapshot built on top of a key-value store. It contains a `diskLayer` struct that represents a snapshot layer that is stored on disk. The `diskLayer` struct has methods to retrieve accounts and account RLPs associated with a particular hash in the snapshot slim data format.

### diskLayer

The `diskLayer` struct is a low-level persistent snapshot built on top of a key-value store. It contains the following fields:

- `diskdb`: The key-value store containing the base snapshot.
- `triedb`: The trie node cache for reconstruction purposes.
- `cache`: The cache to avoid hitting the disk for direct access.
- `root`: The root hash of the base snapshot.
- `stale`: A boolean that signals that the layer became stale (state progressed).
- `genMarker`: A marker for the state that's indexed during initial layer generation.
- `genPending`: A notification channel when generation is done (test synchronicity).
- `genAbort`: A notification channel to abort generating the snapshot in this layer.
- `lock`: A read-write mutex to protect concurrent access to the struct.

The `diskLayer` struct has the following methods:

#### Root

```go
func (dl *diskLayer) Root() common.Hash
```

`Root` returns the root hash for which this snapshot was made.

#### Parent

```go
func (dl *diskLayer) Parent() snapshot
```

`Parent` always returns nil as there's no layer below the disk.

#### Stale

```go
func (dl *diskLayer) Stale() bool
```

`Stale` returns whether this layer has become stale (was flattened across) or if it's still live.

#### Account

```go
func (dl *diskLayer) Account(hash common.Hash) (*Account, error)
```

`Account` directly retrieves the account associated with a particular hash in the snapshot slim data format.

#### AccountRLP

```go
func (dl *diskLayer) AccountRLP(hash common.Hash) ([]byte, error)
```

`AccountRLP` directly retrieves the account RLP associated with a particular hash in the snapshot slim data format. ## DiskLayer

The `DiskLayer` struct is used to represent a layer of the snapshot diff tree that is stored on disk. It provides methods to retrieve account and storage data associated with a particular hash, as well as to update the layer with new data items.

### Fields

- `diskdb`: The database used to store the snapshot data on disk.
- `cache`: The cache used to store the snapshot data in memory.
- `lock`: The read-write lock used to synchronize access to the layer.
- `stale`: A flag indicating whether the layer is stale and should not be used.
- `genMarker`: A marker indicating the point up to which the layer has been generated.

### Methods

#### Account

```go
func (dl *diskLayer) Account(hash common.Hash) ([]byte, error)
```

`Account` retrieves the account data associated with a particular hash.

#### Storage

```go
func (dl *diskLayer) Storage(accountHash, storageHash common.Hash) ([]byte, error)
```

`Storage` retrieves the storage data associated with a particular hash, within a particular account.

#### Update

```go
func (dl *diskLayer) Update(blockHash common.Hash, destructs map[common.Hash]struct{}, accounts map[common.Hash][]byte, storage map[common.Hash]map[common.Hash][]byte) *diffLayer
```

`Update` creates a new layer on top of the existing snapshot diff tree with the specified data items. Note, the maps are retained by the method to avoid copying everything.