## Package: ethdb

The `ethdb` package provides an interface for accessing and manipulating key-value databases. This package contains the `Iterator` and `Iteratee` interfaces.

## Interface: Iterator

The `Iterator` interface iterates over a database's key/value pairs in ascending key order. It provides methods for moving to the next key/value pair, retrieving the current key/value pair, and releasing associated resources.

### Method: Next

```go
func (it *Iterator) Next() bool
```

`Next` moves the iterator to the next key/value pair. It returns a boolean value indicating whether the iterator is exhausted.

### Method: Error

```go
func (it *Iterator) Error() error
```

`Error` returns any accumulated error. Exhausting all the key/value pairs is not considered to be an error.

### Method: Key

```go
func (it *Iterator) Key() []byte
```

`Key` returns the key of the current key/value pair, or `nil` if done. The caller should not modify the contents of the returned slice, and its contents may change on the next call to `Next`.

### Method: Value

```go
func (it *Iterator) Value() []byte
```

`Value` returns the value of the current key/value pair, or `nil` if done. The caller should not modify the contents of the returned slice, and its contents may change on the next call to `Next`.

### Method: Release

```go
func (it *Iterator) Release()
```

`Release` releases associated resources. `Release` should always succeed and can be called multiple times without causing error.

## Interface: Iteratee

The `Iteratee` interface wraps the `NewIterator` methods of a backing data store.

### Method: NewIterator

```go
func (it Iteratee) NewIterator(prefix []byte, start []byte) Iterator
```

`NewIterator` creates a binary-alphabetical iterator over a subset of database content with a particular key prefix, starting at a particular initial key (or after, if it does not exist).

Note: This method assumes that the prefix is NOT part of the start, so there's no need for the caller to prepend the prefix to the start.

### Example Usage

```go
db, _ := leveldb.OpenFile("/path/to/db", nil)
defer db.Close()

iter := db.NewIterator(nil, nil)
for iter.Next() {
    key := iter.Key()
    value := iter.Value()
    fmt.Printf("key=%s, value=%s\n", key, value)
}
iter.Release()
```