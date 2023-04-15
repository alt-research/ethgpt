# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the raw database operations for Ethereum.

## Functions

### `ReadSkeletonSyncStatus`

`ReadSkeletonSyncStatus` retrieves the serialized sync status saved at shutdown.

```go
func ReadSkeletonSyncStatus(db ethdb.KeyValueReader) []byte
```

###### Parameters

- `db` - the database to read from.

###### Return Values

- `[]byte` - the serialized sync status.

### `WriteSkeletonSyncStatus`

`WriteSkeletonSyncStatus` stores the serialized sync status to save at shutdown.

```go
func WriteSkeletonSyncStatus(db ethdb.KeyValueWriter, status []byte)
```

###### Parameters

- `db` - the database to write to.
- `status` - the serialized sync status.

### `DeleteSkeletonSyncStatus`

`DeleteSkeletonSyncStatus` deletes the serialized sync status saved at the last shutdown.

```go
func DeleteSkeletonSyncStatus(db ethdb.KeyValueWriter)
```

###### Parameters

- `db` - the database to delete from.

### `ReadSkeletonHeader`

`ReadSkeletonHeader` retrieves a block header from the skeleton sync store.

```go
func ReadSkeletonHeader(db ethdb.KeyValueReader, number uint64) *types.Header
```

###### Parameters

- `db` - the database to read from.
- `number` - the block number of the header to retrieve.

###### Return Values

- `*types.Header` - the block header.

### `WriteSkeletonHeader`

`WriteSkeletonHeader` stores a block header into the skeleton sync store.

```go
func WriteSkeletonHeader(db ethdb.KeyValueWriter, header *types.Header)
```

###### Parameters

- `db` - the database to write to.
- `header` - the block header to store.

### `DeleteSkeletonHeader`

`DeleteSkeletonHeader` removes all block header data associated with a block number.

```go
func DeleteSkeletonHeader(db ethdb.KeyValueWriter, number uint64)
```

###### Parameters

- `db` - the database to delete from.
- `number` - the block number of the header to delete.