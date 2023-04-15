The `rawdb` package in the `go-ethereum` library provides low-level database access for Ethereum nodes. Here are the functions in this package and their descriptions:

- `ReadSnapshotDisabled(db ethdb.KeyValueReader) bool`: This function retrieves whether the snapshot maintenance is disabled or not. It takes a `KeyValueReader` as input and returns a boolean value indicating whether the snapshot maintenance is disabled or not.

- `WriteSnapshotDisabled(db ethdb.KeyValueWriter)`: This function stores the snapshot pause flag. It takes a `KeyValueWriter` as input and does not return anything.

- `DeleteSnapshotDisabled(db ethdb.KeyValueWriter)`: This function deletes the flag keeping the snapshot maintenance disabled. It takes a `KeyValueWriter` as input and does not return anything.

- `ReadSnapshotRoot(db ethdb.KeyValueReader) common.Hash`: This function retrieves the root of the block whose state is contained in the persisted snapshot. It takes a `KeyValueReader` as input and returns a `common.Hash` value representing the root of the block.

- `WriteSnapshotRoot(db ethdb.KeyValueWriter, root common.Hash)`: This function stores the root of the block whose state is contained in the persisted snapshot. It takes a `KeyValueWriter` and a `common.Hash` as inputs and does not return anything.

- `DeleteSnapshotRoot(db ethdb.KeyValueWriter)`: This function deletes the hash of the block whose state is contained in the persisted snapshot. Since snapshots are not immutable, this method can be used during updates, so a crash or failure will mark the entire snapshot invalid. It takes a `KeyValueWriter` as input and does not return anything.

- `ReadAccountSnapshot(db ethdb.KeyValueReader, hash common.Hash) []byte`: This function retrieves the snapshot entry of an account trie leaf. It takes a `KeyValueReader` and a `common.Hash This codebase contains functions related to storing and retrieving snapshot data in an Ethereum database. Here is a brief description of each function:

- `WriteStorageSnapshot`: This function stores the snapshot entry of a storage trie leaf in the database.
- `DeleteStorageSnapshot`: This function removes the snapshot entry of a storage trie leaf from the database.
- `IterateStorageSnapshots`: This function returns an iterator for walking the entire storage space of a specific account.
- `ReadSnapshotJournal`: This function retrieves the serialized in-memory diff layers saved at the last shutdown from the database.
- `WriteSnapshotJournal`: This function stores the serialized in-memory diff layers to save at shutdown in the database.
- `DeleteSnapshotJournal`: This function deletes the serialized in-memory diff layers saved at the last shutdown from the database.
- `ReadSnapshotGenerator`: This function retrieves the serialized snapshot generator saved at the last shutdown from the database.
- `WriteSnapshotGenerator`: This function stores the serialized snapshot generator to save at shutdown in the database.
- `DeleteSnapshotGenerator`: This function deletes the serialized snapshot generator saved at the last shutdown from the database.
- `ReadSnapshotRecoveryNumber`: This function retrieves the block number of the last persisted snapshot layer from the database.
- `WriteSnapshotRecoveryNumber`: This function stores the block number of the last persisted snapshot layer in the database.
- `DeleteSnapshotRecoveryNumber`: This function deletes the block number of the last persisted snapshot layer from the database.

Each function takes a `db` parameter, which is an interface that provides access to the database. The functions use this interface to read from or write to the database. If an error occurs during the database operation, the function logs a critical error message. # Snapshot Sync Status

The `snapshotSyncStatus` package contains functions for reading and writing the serialized sync status to be saved at shutdown.

## Functions

### `ReadSnapshotSyncStatus`

`ReadSnapshotSyncStatus` reads the serialized sync status from the database.

```go
func ReadSnapshotSyncStatus(db ethdb.KeyValueReader) []byte
```

#### Parameters

- `db` - the database to read from.

#### Return Values

- `[]byte` - the serialized sync status.

### `WriteSnapshotSyncStatus`

`WriteSnapshotSyncStatus` writes the serialized sync status to the database.

```go
func WriteSnapshotSyncStatus(db ethdb.KeyValueWriter, status []byte)
```

#### Parameters

- `db` - the database to write to.
- `status` - the serialized sync status to write.

#### Return Values

This function does not return any values, but it logs a critical error if the write operation fails.