## Package snapshot

The `snapshot` package provides functionality for generating and restoring snapshots of the Ethereum state.

### Constants

- `snapAccount`: Identifier of account snapshot generation.
- `snapStorage`: Identifier of storage snapshot generation.

### Types

#### generatorStats

`generatorStats` is a collection of statistics gathered by the snapshot generator for logging purposes.

##### Fields

- `origin`: The origin prefix where generation started.
- `start`: The timestamp when generation started.
- `accounts`: The number of accounts indexed (generated or recovered).
- `slots`: The number of storage slots indexed (generated or recovered).
- `dangling`: The number of dangling storage slots.
- `storage`: The total account and storage slot size (generation or recovery).

##### Methods

###### Log

```go
func (gs *generatorStats) Log(msg string, root common.Hash, marker []byte)
```

`Log` creates a contextual log with the given message and the context pulled from the internally maintained statistics.

#### generatorContext

`generatorContext` carries a few global values to be shared by all generation functions.

##### Fields

- `stats`: Generation statistic collection.
- `db`: Key-value store containing the snapshot data.
- `account`: Iterator of account snapshot data.
- `storage`: Iterator of storage snapshot data.
- `batch`: Data batch.

### Functions

#### NewDatabase

```go
func NewDatabase() ethdb.KeyValueStore
```

`NewDatabase` creates a new in-memory database.

#### Generate

```go
func Generate(db ethdb.KeyValueStore, root common.Hash, accounts, storage *ethdb.LDBDatabase, limit common.StorageSize) (common.Hash, error)
```

`Generate` generates a snapshot of the Ethereum state.

#### Restore

```go
func Restore(db ethdb.KeyValueStore, root common.Hash, accounts, storage *ethdb.LDBDatabase) error
```

`Restore` restores a snapshot of the Ethereum state. ## Generator Context

The `generatorContext` struct is used to manage the state of the state generator. It contains the database, batch, and iterators used to generate the state.

### Fields

- `stats`: The generator statistics.
- `db`: The database used to store the state.
- `batch`: The batch used to write the state atomically.
- `account`: The account snapshot iterator.
- `storage`: The storage snapshot iterator.
- `logged`: The timestamp when the last generation progress was displayed.

### Methods

#### newGeneratorContext

```go
func newGeneratorContext(stats *generatorStats, db ethdb.KeyValueStore, accMarker []byte, storageMarker []byte) *generatorContext
```

`newGeneratorContext` initializes the context for generation.

#### openIterator

```go
func (ctx *generatorContext) openIterator(kind string, start []byte)
```

`openIterator` constructs global account and storage snapshot iterators at the interrupted position. These iterators should be reopened from time to time to avoid blocking leveldb compaction for a long time.

#### reopenIterator

```go
func (ctx *generatorContext) reopenIterator(kind string)
```

`reopenIterator` releases the specified snapshot iterator and re-open it in the next position. It's aimed for not blocking leveldb compaction.

#### close

```go
func (ctx *generatorContext) close()
```

`close` releases all the held resources.

#### iterator

```go
func (ctx *generatorContext) iterator(kind string) *holdableIterator
```

`iterator` returns the corresponding iterator specified by the kind.

#### removeStorageBefore

```go
func (ctx *generatorContext) removeStorageBefore(account common.Hash)
```

`removeStorageBefore` deletes all storage entries which are located before the specified account. When the iterator touches the storage entry which is located in or outside the given account, it stops and holds the current iterated element locally.

#### removeStorageAt

```go
func (ctx *generatorContext) removeStorageAt(account common.Hash) error
```

`removeStorageAt` deletes all storage entries which are located in the specified account. When the iterator touches the storage entry which is outside the given account, it stops and holds the current iterated element locally. An error will be returned if the initial position of iterator is not in the given account. ## Function: removeStorage

The `removeStorage` function deletes all storage entries which are located before the current iterator position. It takes a `generatorContext` as its input and returns an error.

### Parameters

- `ctx`: A `generatorContext` struct that contains the necessary information to generate a snapshot.

### Return Value

- `error`: An error that occurred during the execution of the function.

### Functionality

The `removeStorage` function iterates over the storage entries in the `generatorContext` struct and deletes all entries that are located before the current iterator position. It does this by comparing the current key with the iterator position and deleting the key if it is less than the iterator position. If the batch size exceeds the ideal batch size, the batch is written to the database and reset. The function also updates the snapshot statistics by incrementing the `snapWipedStorageMeter` and `snapStorageCleanCounter`.

### Example

```go
ctx := generatorContext{
    storage: db.NewIterator(nil),
    batch:   db.NewBatch(),
    stats:   &snapshotStats{},
}
err := removeStorage(&ctx)
if err != nil {
    log.Fatal(err)
}
```


## Function: removeStorageLeft

The `removeStorageLeft` function deletes all storage entries which are located after the current iterator position. It takes a `generatorContext` as its input and does not return anything.

### Parameters

- `ctx`: A `generatorContext` struct that contains the necessary information to generate a snapshot.

### Functionality

The `removeStorageLeft` function iterates over the storage entries in the `generatorContext` struct and deletes all entries that are located after the current iterator position. If the batch size exceeds the ideal batch size, the batch is written to the database and reset. The function also updates the snapshot statistics by incrementing the `snapDanglingStorageMeter`.

### Example

```go
ctx := generatorContext{
    storage: db.NewIterator(nil),
    batch:   db.NewBatch(),
    stats:   &snapshotStats{},
}
removeStorageLeft(&ctx)
```