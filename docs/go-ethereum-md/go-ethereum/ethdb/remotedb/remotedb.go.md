# Documentation for remotedb package

The `remotedb` package implements the key-value database layer based on a remote geth node. Under the hood, it utilizes the `debug_dbGet` method to implement a read-only database. There are no guarantees in this database since the local geth does not have exclusive access, but it can be used for basic diagnostics of a remote node.

## Database struct

The `Database` struct is a key-value lookup for a remote database via `debug_dbGet`.

### Has function

```go
func (db *Database) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the remote database. It returns a boolean value indicating whether the key exists or not, and an error if any.

### Get function

```go
func (db *Database) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the remote database. It returns the value as a byte slice and an error if any.

### HasAncient function

```go
func (db *Database) HasAncient(kind string, number uint64) (bool, error)
```

The `HasAncient` function checks if the given ancient key exists in the remote database. It returns a boolean value indicating whether the key exists or not, and an error if any.

### Ancient function

```go
func (db *Database) Ancient(kind string, number uint64) ([]byte, error)
```

The `Ancient` function retrieves the value associated with the given ancient key from the remote database. It returns the value as a byte slice and an error if any.

### AncientRange function

```go
func (db *Database) AncientRange(kind string, start, count, maxBytes uint64) ([][]byte, error)
```

The `AncientRange` function retrieves a range of values associated with the given ancient key from the remote database. It returns a slice of byte slices and an error if any.

### Ancients function

```go
func (db *Database) Ancients() (uint64, error)
```

The `Ancients` function retrieves the number of ancient keys in the remote database. It returns the number of ancient keys as an unsigned 64-bit integer and an error if any.

### Tail function

```go
func (db *Database) Tail() (uint64, error)
```

The `Tail` function retrieves the tail of the remote database. It returns the tail as an unsigned 64-bit integer and an error if any.

### AncientSize function

```go
func (db *Database) AncientSize(kind string) (uint64, error)
```

The `AncientSize` function retrieves the size of the given ancient key in the remote database. It returns the size as an unsigned 64-bit integer and an error if any.

### ReadAncients function

```go
func (db *Database) ReadAncients(fn func(op ethdb.AncientReaderOp) error) (err error)
```

The `ReadAncients` function reads all the ancient keys in the remote database. It takes a function as an argument that is called for each ancient key. The function should return an error if any.

### Put function

```go
func (db *Database) Put(key []byte, value []byte) error
```

The `Put` function adds a key-value pair to the remote database. It returns an error if any.

### Delete function

```go
func (db *Database) Delete(key []byte) error
```

The `Delete` function deletes the key-value pair associated with the given key from the remote database. It returns an error if any.

### ModifyAncients function

```go
func (db *Database) ModifyAncients(f func(ethdb.AncientWriteOp) error) (int64, error)
```

The `ModifyAncients` function modifies the ancient keys in the remote database. It takes a function as an argument that is called for each ancient key. The function should return an error if any. It returns the number of modified ancient keys as a signed 64-bit integer and an error if any.

### TruncateHead function

```go
func (db *Database) TruncateHead(n uint64) error
```

The `TruncateHead` function truncates the head of the remote database. It returns an error if any.

### TruncateTail function

```go
func (db *Database) TruncateTail(n uint64) error
```

The `TruncateTail` function truncates the tail of the remote database. It returns an error if any.

### Sync function

```go
func (db *Database) Sync() error
```

The `Sync` function synchronizes the remote database. It returns an error if any.

### MigrateTable function

```go
func (db *Database) MigrateTable(s string, f func([]byte) ([]byte, error)) error
```

The `MigrateTable` function migrates a table in the remote database. It returns an error if any.

### NewBatch function

```go
func (db *Database) NewBatch() ethdb.Batch
```

The `NewBatch` function creates a new batch for the remote database. It returns a new batch.

### NewBatchWithSize function

```go
func (db *Database) NewBatchWithSize(size int) ethdb.Batch
```

The `NewBatchWithSize` function creates a new batch with the given size for the remote database. It returns a new batch.

### NewIterator function

```go
func (db *Database) NewIterator(prefix []byte, start []byte) ethdb.Iterator
```

The `NewIterator` function creates a new iterator for the remote database. It takes a prefix and a start key as arguments and returns a new iterator.

### Stat function

```go
func (db *Database) Stat(property string) (string, error)
```

The `Stat` function retrieves the value of the given property from the remote database. It returns the value as a string and an error if any.

### AncientDatadir function

```go
func (db *Database) AncientDatadir() (string, error)
```

The `AncientDatadir` function retrieves the ancient datadir from the remote database. It returns the ancient datadir as a string and an error if any. ## Type: Database

The `Database` type is an implementation of the `ethdb.Database` interface that provides a remote database over an RPC connection.

### Methods

#### Put

```go
func (db *Database) Put(key []byte, value []byte) error
```

`Put` inserts the given value into the remote key-value data store. It takes two parameters:

- `key []byte`: The key to insert.
- `value []byte`: The value to insert.

If the remote database returns an error, it is returned by the function.

#### Get

```go
func (db *Database) Get(key []byte) ([]byte, error)