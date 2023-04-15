# Documentation for leveldb package

The `leveldb` package provides an implementation of the `ethdb.KeyValueStore` interface using the LevelDB key-value store.

## TestLevelDB function

```go
func TestLevelDB(t *testing.T)
```

The `TestLevelDB` function is a test function that tests the `Database` struct's implementation of the `ethdb.KeyValueStore` interface. It uses the `dbtest.TestDatabaseSuite` function to test the interface implementation.

## BenchmarkLevelDB function

```go
func BenchmarkLevelDB(b *testing.B)
```

The `BenchmarkLevelDB` function is a benchmark function that benchmarks the `Database` struct's implementation of the `ethdb.KeyValueStore` interface. It uses the `dbtest.BenchDatabaseSuite` function to benchmark the interface implementation.

## Database struct

The `Database` struct is an implementation of the `ethdb.KeyValueStore` interface using the LevelDB key-value store.

### db field

```go
db *leveldb.DB
```

The `db` field is a pointer to a `leveldb.DB` instance.

### Has function

```go
func (db *Database) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the database. It returns a boolean value indicating whether the key exists or not, and an error if any.

### Get function

```go
func (db *Database) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the database. It returns the value as a byte slice and an error if any.

### Put function

```go
func (db *Database) Put(key []byte, value []byte) error
```

The `Put` function adds a key-value pair to the database. It returns an error if any.

### Delete function

```go
func (db *Database) Delete(key []byte) error
```

The `Delete` function deletes the key-value pair associated with the given key from the database. It returns an error if any.

### NewBatch function

```go
func (db *Database) NewBatch() ethdb.Batch
```

The `NewBatch` function creates a new batch for the database. It returns a new batch.

### NewIterator function

```go
func (db *Database) NewIterator(prefix []byte, start []byte) ethdb.Iterator
```

The `NewIterator` function creates a new iterator for the database. It takes a prefix and a start key as arguments and returns a new iterator.

### Stat function

```go
func (db *Database) Stat(property string) (string, error)
```

The `Stat` function retrieves the value of the given property from the database. It returns the value as a string and an error if any.

### Compact function

```go
func (db *Database) Compact(start, limit []byte) error
```

The `Compact` function compacts the database. It takes a start and a limit key as arguments and returns an error if any.