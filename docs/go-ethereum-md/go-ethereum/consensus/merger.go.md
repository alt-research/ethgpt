# Merger

The `Merger` struct is an internal help structure used to track the Ethereum 1.0 to Ethereum 2.0 transition status. It is a common structure that can be used in both full node and light client.

## Struct Fields

### db

`db` is an instance of `ethdb.KeyValueStore` which is used to store the transition status.

### status

`status` is an instance of `transitionStatus` which describes the status of the Ethereum 1.0 to Ethereum 2.0 transition.

### mu

`mu` is an instance of `sync.RWMutex` which is used to synchronize access to the `status` field.

## Functions

### NewMerger

```go
func NewMerger(db ethdb.KeyValueStore) *Merger
```

`NewMerger` creates a new `Merger` which stores its transition status in the provided `db`.

### ReachTTD

```go
func (m *Merger) ReachTTD()
```

`ReachTTD` is called whenever the first `NewHead` message is received from the consensus-layer. It sets the `LeftPoW` flag in the `status` field.

### FinalizePoS

```go
func (m *Merger) FinalizePoS()
```

`FinalizePoS` is called whenever the first `FinalisedBlock` message is received from the consensus-layer. It sets the `LeftPoW` and `EnteredPoS` flags in the `status` field.

### TDDReached

```go
func (m *Merger) TDDReached() bool
```

`TDDReached` reports whether the chain has left the PoW stage. It returns `true` if the `LeftPoW` flag is set in the `status` field.

### PoSFinalized

```go
func (m *Merger) PoSFinalized() bool
```

`PoSFinalized` reports whether the chain has entered the PoS stage. It returns `true` if the `EnteredPoS` flag is set in the `status` field.