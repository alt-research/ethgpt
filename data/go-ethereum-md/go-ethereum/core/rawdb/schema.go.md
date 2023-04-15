# Rawdb Package

The `rawdb` package contains a collection of low-level database accessors for the `go-ethereum` library. The package provides a set of functions to interact with the database, including reading and writing data to the database.

## Variables

### `databaseVersionKey`

`databaseVersionKey` is a byte slice that tracks the current database version.

### `headHeaderKey`

`headHeaderKey` is a byte slice that tracks the latest known header's hash.

### `headBlockKey`

`headBlockKey` is a byte slice that tracks the latest known full block's hash.

### `headFastBlockKey`

`headFastBlockKey` is a byte slice that tracks the latest known incomplete block's hash during fast sync.

### `headFinalizedBlockKey`

`headFinalizedBlockKey` is a byte slice that tracks the latest known finalized block hash.

### `lastPivotKey`

`lastPivotKey` is a byte slice that tracks the last pivot block used by fast sync (to re-enable on sethead).

### `fastTrieProgressKey`

`fastTrieProgressKey` is a byte slice that tracks the number of trie entries imported during fast sync.

### `snapshotDisabledKey`

`snapshotDisabledKey` is a byte slice that flags that the snapshot should not be maintained due to initial sync.

### `SnapshotRootKey`

`SnapshotRootKey` is a byte slice that tracks the hash of the last snapshot.

### `snapshotJournalKey`

`snapshotJournalKey` is a byte slice that tracks the in-memory diff layers across restarts.

### `snapshotGeneratorKey`

`snapshotGeneratorKey` is a byte slice that tracks the snapshot generation marker across restarts.

### `snapshotRecoveryKey`

`snapshotRecoveryKey` is a byte slice that tracks the snapshot recovery marker across restarts.

### The code snippet provided contains a set of constants and functions used for encoding and decoding keys in a database. The database is used to store various data structures related to the Ethereum blockchain, such as headers, blocks, transactions, receipts, and more.

The `headerPrefix`, `headerHashSuffix`, `headerTDSuffix`, `blockBodyPrefix`, `blockReceiptsPrefix`, `txLookupPrefix`, `bloomBitsPrefix`, `SnapshotAccountPrefix`, `SnapshotStoragePrefix`, `CodePrefix`, `skeletonHeaderPrefix`, `trieNodeAccountPrefix`, `trieNodeStoragePrefix`, `PreimagePrefix`, `configPrefix`, `genesisPrefix`, `BloomBitsIndexPrefix`, `ChtPrefix`, `ChtTablePrefix`, `ChtIndexTablePrefix`, `BloomTriePrefix`, `BloomTrieTablePrefix`, `BloomTrieIndexPrefix`, and `CliqueSnapshotPrefix` are all byte slices used as prefixes for the keys in the database.

The `LegacyTxLookupEntry` struct is used to represent a legacy transaction lookup entry, which contains the block hash, block index, and transaction index.

The `encodeBlockNumber` function encodes a block number as a big-endian uint64 byte slice.

The `headerKeyPrefix` function returns the header key prefix for a given block number.

The `headerKey` function returns the header Here is the documentation for the source code functions:

### `blockReceiptsKey`

`blockReceiptsKey` is a function that generates a key for the block receipts of a given block number and hash.

#### Parameters

- `number` - the block number.
- `hash` - the block hash.

#### Return Value

- `[]byte` - the generated key.

### `txLookupKey`

`txLookupKey` is a function that generates a key for a transaction lookup based on its hash.

#### Parameters

- `hash` - the transaction hash.

#### Return Value

- `[]byte` - the generated key.

### `accountSnapshotKey`

`accountSnapshotKey` is a function that generates a key for an account snapshot based on its hash.

#### Parameters

- `hash` - the account hash.

#### Return Value

- `[]byte` - the generated key.

### `storageSnapshotKey`

`storageSnapshotKey` is a function that generates a key for a storage snapshot based on the account hash and storage hash.

#### Parameters

- `accountHash` - the account hash.
- `storageHash` - the storage hash.

#### Return Value

- `[]byte` - the generated key.

### `storageSnapshotsKey`

`storageSnapshotsKey` is a function that generates a key for all storage snapshots of an account based on its hash.

#### Parameters

- `accountHash` - the account hash.

#### Return Value

- `[]byte` - the generated key.

### `bloomBitsKey`

`bloomBitsKey` is a function that generates a key for a bloom filter based on the bit, section, and hash.

#### Parameters

- `bit` - the bit.
- `section` - the section.
- `hash` - the hash.

#### Return Value

- `[]byte` - the generated key.

### `skeletonHeaderKey`

`skeletonHeaderKey` is a function that generates a key for a skeleton header based on its block number.

#### Parameters

- `number` - the block number.

#### Return Value

- `[]byte` - the generated key.

### `preimageKey`

`preimageKey` is a function that generates a key for a preimage based on its hash.

#### Parameters

- `hash` - the preimage hash.

#### Return Value

- `[]byte` - the generated key.

### `codeKey`

`codeKey` is a function that generates a key for contract code based on its hash.

#### Parameters

- `hash` - the code hash.

#### Return Value

- `[]byte` - the generated key.

### `IsCodeKey`

`IsCodeKey` is a function that checks whether a given byte slice is the key of contract code and