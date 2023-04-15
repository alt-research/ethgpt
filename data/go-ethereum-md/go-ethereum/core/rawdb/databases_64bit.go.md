# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the raw database interface for Ethereum.

## Variables

### `PebbleEnabled`

`PebbleEnabled` is a boolean constant that is set to `true` if the `pebble` database is supported on the current architecture.

## Functions

### `NewPebbleDBDatabase`

`NewPebbleDBDatabase` creates a new persistent key-value database without a freezer moving immutable chain segments into cold storage.

```go
func NewPebbleDBDatabase(file string, cache int, handles int, namespace string, readonly bool) (ethdb.Database, error)
```

#### Parameters

- `file` - the file path of the database.
- `cache` - the size of the cache in bytes.
- `handles` - the number of handles to allocate.
- `namespace` - the namespace of the database.
- `readonly` - whether the database is read-only.

#### Return Values

- `ethdb.Database` - the new database.
- `error` - an error, if any.