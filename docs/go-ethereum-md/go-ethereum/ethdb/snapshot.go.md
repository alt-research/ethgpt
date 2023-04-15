## Package: ethdb

The `ethdb` package provides an interface for key-value data stores that can be used to store Ethereum blockchain data. It defines the `Snapshot` and `Snapshotter` interfaces.

## Interface: Snapshot

The `Snapshot` interface represents a snapshot of a key-value data store. It defines three methods:

### Method: Has

```go
Has(key []byte) (bool, error)
```

`Has` retrieves if a key is present in the snapshot backing by a key-value data store. It takes one parameter:

- `key []byte`: The key to check for.

It returns two values:

- `bool`: A boolean indicating whether the key is present in the snapshot.
- `error`: An error if the operation failed.

### Method: Get

```go
Get(key []byte) ([]byte, error)
```

`Get` retrieves the given key if it's present in the snapshot backing by key-value data store. It takes one parameter:

- `key []byte`: The key to retrieve.

It returns two values:

- `[]byte`: The value associated with the key.
- `error`: An error if the operation failed.

### Method: Release

```go
Release()
```

`Release` releases associated resources. `Release` should always succeed and can be called multiple times without causing error.

## Interface: Snapshotter

The `Snapshotter` interface wraps the `Snapshot` method of a backing data store. It defines one method:

### Method: NewSnapshot

```go
NewSnapshot() (Snapshot, error)
```

`NewSnapshot` creates a database snapshot based on the current state. The created snapshot will not be affected by all following mutations happened on the database. Note that you should not forget to release the snapshot once it's used up, otherwise the stale data will never be cleaned up by the underlying compactor.

It returns two values:

- `Snapshot`: A new snapshot of the database.
- `error`: An error if the operation failed.