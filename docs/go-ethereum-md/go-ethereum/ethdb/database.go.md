## Package: ethdb

The `ethdb` package defines the interfaces for an Ethereum data store.

## Interface: KeyValueReader

The `KeyValueReader` interface wraps the `Has` and `Get` methods of a backing data store.

### Method: Has

```go
Has(key []byte) (bool, error)
```

`Has` retrieves if a key is present in the key-value data store.

### Method: Get

```go
Get(key []byte) ([]byte, error)
```

`Get` retrieves the given key if it's present in the key-value data store.

## Interface: KeyValueWriter

The `KeyValueWriter` interface wraps the `Put` and `Delete` methods of a backing data store.

### Method: Put

```go
Put(key []byte, value []byte) error
```

`Put` inserts the given value into the key-value data store.

### Method: Delete

```go
Delete(key []byte) error
```

`Delete` removes the key from the key-value data store.

## Interface: KeyValueStater

The `KeyValueStater` interface wraps the `Stat` method of a backing data store.

### Method: Stat

```go
Stat(property string) (string, error)
```

`Stat` returns a particular internal stat of the database.

## Interface: Compacter

The `Compacter` interface wraps the `Compact` method of a backing data store.

### Method: Compact

```go
Compact(start []byte, limit []byte) error
```

`Compact` flattens the underlying data store for the given key range. In essence, deleted and overwritten versions are discarded, and the data is rearranged to reduce the cost of operations needed to access them.

A nil start is treated as a key before all keys in the data store; a nil limit is treated as a key after all keys in the data store. If both are nil then it will compact the entire data store.

## Interface: KeyValueStore

The `KeyValueStore` interface contains all the methods required to allow handling different key-value data stores backing the high level database.

### Methods

- `KeyValueReader`
- `KeyValueWriter`
- `KeyValueStater`
- `Batcher`
- `Iteratee`
- `Compacter`
- `Snapshotter`
- `io.Closer`

## Interface: AncientReaderOp

The `AncientReaderOp` interface contains the methods required to read from immutable ancient data.

### Methods

- `HasAncient(kind string, number uint64) (bool, error)`
- `Ancient(kind string, number uint64) ([]byte, error)`
- `AncientRange(kind string, start, count, maxBytes uint64) ([][]byte, error)`
- `Ancients() (uint64, error)`
- `Tail() (uint64, error)`
- `AncientSize(kind string) (uint64, error)`

## Interface: AncientReader

The `AncientReader` interface extends the `KeyValueReader` interface with the `Ancient` method.

### Method: Ancient

```go
Ancient(kind string, number uint64) ([]byte, error)
```

`Ancient` retrieves an ancient binary blob from the append-only immutable files.

## Interface: Batcher

The `Batcher` interface wraps the `NewBatch`, `WriteBatch`, and `ValueSize` methods of a backing data store.

### Method: NewBatch

```go ## Interface: AncientReader

The `AncientReader` interface defines the methods required to read immutable ancient data. It extends the `AncientReaderOp` interface.

### Methods

- `ReadAncients(fn func(AncientReaderOp) error) (err error)`: Runs the given read operation while ensuring that no writes take place on the underlying freezer.

## Interface: AncientWriter

The `AncientWriter` interface defines the methods required to write to immutable ancient data.

### Methods

- `ModifyAncients(func(AncientWriteOp) error) (int64, error)`: Runs a write operation on the ancient store. If the function returns an error, any changes to the underlying store are reverted. The integer return value is the total size of the written data.
- `TruncateHead(n uint64) error`: Discards all but the first n ancient data from the ancient store. After the truncation, the latest item can be accessed it item_n-1(start from 0).
- `TruncateTail(n uint64) error`: Discards the first n ancient data from the ancient store. The already deleted items are ignored. After the truncation, the earliest item can be accessed is item_n(start from 0). The deleted items may not be removed from the ancient store immediately, but only when the accumulated deleted data reach the threshold then will be removed all together.
- `Sync() error`: Flushes all in-memory ancient store data to disk.
- `MigrateTable(string, func([]byte) ([]byte, error)) error`: Processes and migrates entries of a given table to a new format. The second argument is a function that takes a raw entry and returns it in the newest format.

## Interface: AncientStater

The `AncientStater` interface wraps the `Stat` method of a backing data store.

### Methods

- `AncientDatadir() (string, error)`: Returns the path of root ancient directory. Empty string will be returned if ancient store is not enabled at all. The returned path can be used to construct the path of other freezers.

## Interface: Reader

The `Reader` interface contains the methods required to read data from both key-value as well as immutable ancient data. It extends the `KeyValueReader` and `AncientReader` interfaces.

## Interface: Writer

The `Writer` interface contains the methods required to write data to both key-value as well as immutable ancient data. It extends the `KeyValueWriter` and `AncientWriter` interfaces.

## Interface: Stater

The `Stater` interface contains the methods required to retrieve states from both key-value as well as immutable ancient data. It extends the `KeyValueStater` and `AncientStater` interfaces.

## Interface: AncientStore

The `AncientStore` interface contains all the methods required to allow handling different ancient data stores backing immutable chain data store. It extends the `AncientReader`, `AncientWriter`, and `io.Closer` interfaces.

## Interface: Database

The `Database` interface contains all the methods required by the high level database to not only access the key-value data store but also the chain freezer. It extends the `Reader`, `Writer`, `Batcher`, `Iteratee`, `Stater`, `Compacter`, `Snapshotter`, and `io.Closer` interfaces.