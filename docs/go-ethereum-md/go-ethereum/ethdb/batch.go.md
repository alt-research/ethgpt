## Package: ethdb

The `ethdb` package provides an interface for key-value data stores that can be used to store Ethereum blockchain data. It also provides a `Batch` interface for write-only databases that buffer changes to their host database until a final write is called.

### Constants

#### IdealBatchSize

```go
const IdealBatchSize = 100 * 1024
```

`IdealBatchSize` defines the size of the data batches that should ideally be added in one write.

### Interfaces

#### Batch

```go
type Batch interface {
    KeyValueWriter

    ValueSize() int
    Write() error
    Reset()
    Replay(w KeyValueWriter) error
}
```

`Batch` is a write-only database that commits changes to its host database when `Write` is called. A batch cannot be used concurrently. It is an interface that defines the following methods:

- `KeyValueWriter`: An interface that defines the `Put` and `Delete` methods for writing key-value pairs to the batch.
- `ValueSize() int`: Retrieves the amount of data queued up for writing.
- `Write() error`: Flushes any accumulated data to disk.
- `Reset()`: Resets the batch for reuse.
- `Replay(w KeyValueWriter) error`: Replays the batch contents.

#### Batcher

```go
type Batcher interface {
    NewBatch() Batch
    NewBatchWithSize(size int) Batch
}
```

`Batcher` is an interface that wraps the `NewBatch` method of a backing data store. It defines the following methods:

- `NewBatch() Batch`: Creates a write-only database that buffers changes to its host database until a final write is called.
- `NewBatchWithSize(size int) Batch`: Creates a write-only database batch with pre-allocated buffer.

### Types

#### HookedBatch

```go
type HookedBatch struct {
    Batch

    OnPut    func(key []byte, value []byte)
    OnDelete func(key []byte)
}
```

`HookedBatch` wraps an arbitrary batch where each operation may be hooked into to monitor from black box code. It is a type that embeds the `Batch` interface and defines the following fields:

- `OnPut func(key []byte, value []byte)`: A callback function that is called if a key is inserted.
- `OnDelete func(key []byte)`: A callback function that is called if a key is deleted.

### Functions

#### Put

```go
func (b HookedBatch) Put(key []byte, value []byte) error
```

`Put` inserts the given value into the key-value data store. It is a method of the `HookedBatch` type that overrides the `Put` method of the embedded `Batch` interface. If the `OnPut` callback function is not `nil`, it is called with the `key` and `value` parameters before the `Put` method of the embedded `Batch` interface is called.

#### Delete

```go
func (b HookedBatch) Delete(key []byte) error
```

`Delete` removes the key from the key-value data store. It is a method of the `HookedBatch` type that overrides the `Delete` method of the embedded `Batch` interface. If the `OnDelete` callback function is not `nil`, it is called with the `key` parameter before the `Delete` method of the embedded `Batch` interface is called.