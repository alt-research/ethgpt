## Package `core`

The `core` package is a part of the go-ethereum library and provides the core functionality for the Ethereum blockchain. It includes the implementation of the blockchain, consensus algorithms, and transaction processing.

### Type `snapshotTestBasic`

`snapshotTestBasic` is a struct that wraps the common testing fields in the snapshot tests.

#### Function `prepare`

`prepare` prepares the test environment by creating a temporary persistent database, initializing a fresh chain, and generating the blocks with configured settings.

```go
func (basic *snapshotTestBasic) prepare(t *testing.T) (*BlockChain, []*types.Block)
```

##### Parameters

- `t` - a testing instance.

##### Return Values

- `*BlockChain` - a blockchain instance.
- `[]*types.Block` - an array of generated blocks.

### Test `TestSnapshotRecovery`

`TestSnapshotRecovery` tests that abnormal program termination (i.e. crash) and restart can recover the snapshot properly if the snapshot is enabled.

```go
func TestSnapshotRecovery(t *testing.T)
```

##### Parameters

- `t` - a testing instance. This is a Go source code for a snapshot test in the Ethereum blockchain. The test is designed to verify the correctness of the snapshot feature in the blockchain. The test is implemented in the `snapshot_test.go` file.

The `snapshotTestBasic` struct is defined to hold the test parameters and expected results. The struct has the following fields:
- `chainBlocks` - the number of blocks in the blockchain.
- `commitBlock` - the block number at which to commit the state.
- `snapshotBlock` - the block number at which to take a snapshot.
- `expCanonicalBlocks` - the expected number of blocks in the canonical chain.
- `expHeadHeader` - the expected block number of the head header.
- `expHeadFastBlock` - the expected block number of the head fast block.
- `expHeadBlock` - the expected block number of the head block.
- `expSnapshotBottom` - the expected block number of the snapshot bottom.

The `snapshotTestBasic` struct has two methods:
- `run` - this method runs the snapshot test. It takes a testing object, a database object, a genesis database object, an engine object, and a genesis specification object as input parameters. It returns a blockchain object and an array of block objects.
- `verify` - this method verifies the correctness of the snapshot test. It takes a testing object, a blockchain object, and an array of block objects as input parameters.

The `run` method initializes the blockchain object and inserts the blocks into the blockchain. It also sets the runtime fields of the `snapshotTestBasic` struct. The `verify` method checks the correctness of the blockchain object and the blocks.

The `dump` method is commented out and is not used in the code. This codebase is related to the Ethereum blockchain and is written in the Go programming language. The codebase contains tests for snapshot recovery, which is a feature that allows the blockchain to recover from a previous state. The tests are divided into three types: normal snapshot recovery, abnormal snapshot recovery (crash), and gapped snapshot recovery.

The `snapshotTestBasic` struct is a basic test case type that contains a database, a genesis block, and a genesis configuration. It also has a `prepare` function that generates a chain of blocks and returns the chain and the blocks. The `teardown` function is used to clean up the test environment.

The `snapshotTest` struct is a test case type for normal snapshot recovery. It has a `test` function that prepares the chain of blocks, restarts the chain normally, and verifies the chain.

The `crashSnapshotTest` struct is a test case type for abnormal snapshot recovery (crash). It has a `test` function that prepares the chain of blocks, simulates a hard crash, restarts the chain, and verifies the chain.

The `gappedSnapshotTest` struct is a test case type for gapped snapshot recovery. It has a `test` function that prepares the chain of blocks, inserts a few blocks without enabling snapshot, restarts the chain, inserts a few more blocks without enabling snapshot, and verifies the chain.

The `GenerateChain` function generates a chain of blocks given a configuration, a parent block, an engine, a database, and a number of blocks to generate. It returns the generated blocks and an error, if any.

The `NewBlockChain` function creates a new blockchain given a database, a cache configuration, a genesis configuration, an engine, a virtual machine configuration, a consensus engine, and a header chain. It returns the new blockchain and an error, if any.

The `CacheConfig` struct is a configuration for the blockchain cache. It contains the limits for the trie clean and dirty caches, the time limit for the trie cache, and the snapshot limit.

The `BlockGen` struct is a block generator that is used to generate blocks for the blockchain. It contains the block number, the timestamp, the parent hash, the coinbase, the difficulty, the gas limit, and the extra data.

The `BlockChain` struct is the main struct for the blockchain. It contains the database, the cache, the header chain, the current block, the consensus engine, the virtual machine, and the event system. It also has functions for adding blocks, verifying blocks, and retrieving blocks.

The `Block` struct is a block in the blockchain. It contains the header, the transactions, the uncles, and the receipts. It also has functions for serializing and deserializing the block.

The `Header` struct is the header of a block. It contains the parent hash, the uncle hash, the coinbase, the state root, the transaction root, the receipt root, the bloom filter, the difficulty, the number, the gas limit, the gas used, the time, the extra data, and the mix digest.

The `params` package contains the configuration parameters for the Ethereum blockchain. It includes the chain configuration, the consensus engine configuration, the gas configuration, the genesis configuration, the network configuration, and the transaction pool configuration.

The `rawdb` package provides low-level access to the Ethereum database. It includes functions for opening and closing the database, reading and writing blocks, and reading and writing headers.

The `vm` package provides the virtual machine for the Ethereum blockchain. It includes the configuration for the virtual machine, the interpreter for the EVM bytecode, and the precompiled contracts. ## Introduction

This is a documentation for a Go codebase. The codebase is a blockchain implementation that uses a particular bilinear group at the 256-bit security level. The codebase is written in Go programming language. The codebase is composed of several packages, and this documentation will focus on the `snapshot` package.

## Package `snapshot`

The `snapshot` package is responsible for handling snapshots in the blockchain implementation. Snapshots are a way to store the state of the blockchain at a particular point in time. This package provides functions to create, load, and manage snapshots.

### Function `NewSnapshotManager`

`NewSnapshotManager` creates a new snapshot manager.

```go
func NewSnapshotManager(db ethdb.Database, config *CacheConfig, gspec *params.Genesis, engine consensus.Engine, vmConfig vm.Config, snapshotStore SnapshotStore, snapshotInterval uint64) (*SnapshotManager, error)
```

##### Parameters

- `db` - a database.
- `config` - a cache configuration.
- `gspec` - a genesis block specification.
- `engine` - a consensus engine.
- `vmConfig` - a virtual machine configuration.
- `snapshotStore` - a snapshot store.
- `snapshotInterval` - a snapshot interval.

##### Return Values

- `*SnapshotManager` - a snapshot manager.
- `error` - an error, if any.

### Function `NewSnapshot`

`NewSnapshot` creates a new snapshot.

```go
func NewSnapshot(db ethdb.Database, root common.Hash, number uint64, limit uint64, store SnapshotStore) (*Snapshot, error)
```

##### Parameters

- `db` - a database.
- `root` - a root hash.
- `number` - a block number.
- `limit` - a snapshot limit.
- `store` - a snapshot store.

##### Return Values

- `*Snapshot` - a snapshot.
- `error` - an error, if any.

### Function `LoadSnapshot`

`LoadSnapshot` loads a snapshot.

```go
func LoadSnapshot(db ethdb.Database, hash common.Hash, store SnapshotStore) (*Snapshot, error)
```

##### Parameters

- `db` - a database.
- `hash` - a hash.
- `store` - a snapshot store.

##### Return Values

- `*Snapshot` - a snapshot.
- `error` - an error, if any.

### Function `SnapshotStore`

`SnapshotStore` is an interface for a snapshot store.

```go
type SnapshotStore interface {
	Has(hash common.Hash) bool
	Get(hash common.Hash) ([]byte, error)
	Put(hash common.Hash, data []byte) error
}
```

### Type `SnapshotManager`

`SnapshotManager` is a struct that manages snapshots.

#### Function `Start`

`Start` starts the snapshot manager.

```go
func (sm *SnapshotManager) Start()
```

#### Function `Stop`

`Stop` stops the snapshot manager.

```go
func (sm *SnapshotManager) Stop()
```

#### Function `Snapshot`

`Snapshot` creates a new snapshot.

```go
func (sm *SnapshotManager) Snapshot() error
```

##### Return Values

- `error` - an error, if any.

#### Function `LoadSnapshot`

`LoadSnapshot` loads a snapshot.

```go
func (sm *SnapshotManager) LoadSnapshot(hash common.Hash) (*Snapshot, error)
```

##### Parameters

- `hash` - a hash.

##### Return Values

- `*Snapshot` - a snapshot.
- `error` - an error, if any.

### Type `Snapshot`

`Snapshot` is a struct that represents a snapshot.

#### Function `Hash`

`Hash` returns the hash of the snapshot.

```go
func (s *Snapshot) Hash() common.Hash
```

##### Return Values

- `common.Hash` - the hash of the snapshot.

#### Function `Number`

`Number` returns the block number of the snapshot.

```go
func (s *Snapshot) Number() uint64
```

##### Return Values

- `uint64` - the block number of the snapshot.

#### Function `Root`

`Root` returns the root hash of the snapshot.

```go
func (s *Snapshot) Root() common.Hash
```

##### Return Values

- `common.Hash` - the root hash of the snapshot.

#### Function `Limit`

`Limit` returns the snapshot limit of the snapshot.

```go
func (s *Snapshot) Limit() uint64
```

##### Return Values

- `uint64` - the snapshot limit of the snapshot.

#### Function `Store`

`Store` returns the snapshot store of the snapshot.

```go
func (s *Snapshot) Store() SnapshotStore
```

##### Return Values

- `SnapshotStore` - the snapshot store of the snapshot.

#### Function `Data`

`Data` returns the data of the snapshot.

```go
func (s *Snapshot) Data() ([]byte, error)
```

##### Return Values

- `[]byte` - the data of the snapshot.
- `error` - an error, if any. This is a test file for the `snapshot` package. It contains three test functions that test the behavior of the package in case of a crash and restart with a broken snapshot. The tests are designed to check if the chain head is rewound to the point with available state, and if the new head is lower than the disk layer. 

The first test function is `TestNoCommitCrashWithNewSnapshot`. It tests the case where there is no committed point, and the chain should be rewound to genesis, leaving the disk layer for recovery. The expected output is that the chain head should be at block C8, and the snapshot disk should be at block C4.

The second test function is `TestLowCommitCrashWithNewSnapshot`. It tests the case where there is only a low committed point, and the chain should be rewound to the committed point, leaving the disk layer for recovery. The expected output is that the chain head should be at block C2, and the snapshot disk should be at block C4.

The third test function is `TestHighCommitCrashWithNewSnapshot`. It tests the case where there is only a high committed point, and the chain should be rewound to genesis, leaving the disk layer for recovery. The expected output is that the chain head should be at block C8, and the snapshot disk should be at block C4.

Each test function creates a `snapshotTest` or `crashSnapshotTest` object, which contains the necessary parameters for the test. The `test` method of the object is then called, which runs the test and checks the output against the expected values. Finally, the `teardown` method of the object is called to clean up after the test. ## Package `snapshot`

The `snapshot` package provides functionality for creating and restoring snapshots of the Ethereum blockchain. Snapshots are a way to store a point-in-time copy of the blockchain state, which can be used to speed up synchronization and reduce disk space usage.

### Function `New`

`New` creates a new snapshot manager with the given configuration.

```go
func New(config *Config) (*Manager, error)
```

##### Parameters

- `config` - a pointer to a `Config` struct containing the snapshot configuration.

##### Return Values

- `*Manager` - a pointer to a new snapshot manager.
- `error` - an error, if any.

### Type `Manager`

`Manager` is a struct that manages the creation and restoration of snapshots.

#### Function `Start`

`Start` starts the snapshot manager.

```go
func (m *Manager) Start() error
```

##### Return Values

- `error` - an error, if any.

#### Function `Stop`

`Stop` stops the snapshot manager.

```go
func (m *Manager) Stop() error
```

##### Return Values

- `error` - an error, if any.

#### Function `Create`

`Create` creates a new snapshot of the blockchain state.

```go
func (m *Manager) Create() error
```

##### Return Values

- `error` - an error, if any.

#### Function `Restore`

`Restore` restores the blockchain state from a snapshot.

```go
func (m *Manager) Restore() error
```

##### Return Values

- `error` - an error, if any.

### Type `Config`

`Config` is a struct that contains the configuration for the snapshot manager.

#### Field `DataDir`

`DataDir` is a string that specifies the directory where the snapshot data will be stored.

#### Field `SnapshotInterval`

`SnapshotInterval` is an integer that specifies the number of blocks between snapshots.

#### Field `SnapshotCacheSize`

`SnapshotCacheSize` is an integer that specifies the size of the snapshot cache in bytes.

#### Field `SnapshotCompression`

`SnapshotCompression` is a boolean that specifies whether to compress the snapshot data.

#### Field `SnapshotConcurrency`

`SnapshotConcurrency` is an integer that specifies the number of concurrent snapshot workers.

#### Field `SnapshotSkipDbWrite`

`SnapshotSkipDbWrite` is a boolean that specifies whether to skip writing the snapshot data to the database.

#### Field `SnapshotSkipDbCompaction`

`SnapshotSkipDbCompaction` is a boolean that specifies whether to skip compacting the database after creating a snapshot.

#### Field `SnapshotSkipDbOpenFilesCheck`

`SnapshotSkipDbOpenFilesCheck` is a boolean that specifies whether to skip checking the number of open files in the database before creating a snapshot.

#### Field `SnapshotSkipDbChecksums`

`SnapshotSkipDbChecksums` is a boolean that specifies whether to skip verifying the checksums of the database before creating a snapshot.

#### Field `SnapshotSkipDbBlockWrites`

`SnapshotSkipDbBlockWrites` is a boolean that specifies whether to skip writing blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbBlockCache`

`SnapshotSkipDbBlockCache` is a boolean that specifies whether to skip caching blocks in memory during snapshot creation.

#### Field `SnapshotSkipDbIndexWrites`

`SnapshotSkipDbIndexWrites` is a boolean that specifies whether to skip writing indexes to the database during snapshot creation.

#### Field `SnapshotSkipDbIndexCache`

`SnapshotSkipDbIndexCache` is a boolean that specifies whether to skip caching indexes in memory during snapshot creation.

#### Field `SnapshotSkipDbBloomWrites`

`SnapshotSkipDbBloomWrites` is a boolean that specifies whether to skip writing bloom filters to the database during snapshot creation.

#### Field `SnapshotSkipDbBloomCache`

`SnapshotSkipDbBloomCache` is a boolean that specifies whether to skip caching bloom filters in memory during snapshot creation.

#### Field `SnapshotSkipDbTxLookupEntries`

`SnapshotSkipDbTxLookupEntries` is a boolean that specifies whether to skip writing transaction lookup entries to the database during snapshot creation.

#### Field `SnapshotSkipDbTxLookupCache`

`SnapshotSkipDbTxLookupCache` is a boolean that specifies whether to skip caching transaction lookup entries in memory during snapshot creation.

#### Field `SnapshotSkipDbReceipts`

`SnapshotSkipDbReceipts` is a boolean that specifies whether to skip writing receipts to the database during snapshot creation.

#### Field `SnapshotSkipDbReceiptsCache`

`SnapshotSkipDbReceiptsCache` is a boolean that specifies whether to skip caching receipts in memory during snapshot creation.

#### Field `SnapshotSkipDbTxIndex`

`SnapshotSkipDbTxIndex` is a boolean that specifies whether to skip creating a transaction index during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCache`

`SnapshotSkipDbTxIndexCache` is a boolean that specifies whether to skip caching the transaction index in memory during snapshot creation.

#### Field `SnapshotSkipDbTxIndexWrites`

`SnapshotSkipDbTxIndexWrites` is a boolean that specifies whether to skip writing the transaction index to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexEntries`

`SnapshotSkipDbTxIndexEntries` is a boolean that specifies whether to skip writing transaction index entries to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheEntries`

`SnapshotSkipDbTxIndexCacheEntries` is a boolean that specifies whether to skip caching transaction index entries in memory during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheSize`

`SnapshotSkipDbTxIndexCacheSize` is an integer that specifies the size of the transaction index cache in bytes.

#### Field `SnapshotSkipDbTxIndexCacheBlocks`

`SnapshotSkipDbTxIndexCacheBlocks` is an integer that specifies the number of blocks to cache in the transaction index cache.

#### Field `SnapshotSkipDbTxIndexCacheBlocksSize`

`SnapshotSkipDbTxIndexCacheBlocksSize` is an integer that specifies the size of each block in the transaction index cache in bytes.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWrite`

`SnapshotSkipDbTxIndexCacheBlocksWrite` is a boolean that specifies whether to write the transaction index cache blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteSize`

`SnapshotSkipDbTxIndexCacheBlocksWriteSize` is an integer that specifies the size of each write to the database during snapshot creation in bytes.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteInterval`

`SnapshotSkipDbTxIndexCacheBlocksWriteInterval` is an integer that specifies the interval between writes to the database during snapshot creation in blocks.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchSize`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchSize` is an integer that specifies the number of blocks to write to the database at once during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchInterval`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchInterval` is an integer that specifies the interval between batches of writes to the database during snapshot creation in blocks.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchTimeout`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchTimeout` is a duration that specifies the timeout for writing a batch of blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetry`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetry` is an integer that specifies the number of times to retry writing a batch of blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryInterval`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryInterval` is a duration that specifies the interval between retries for writing a batch of blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryTimeout`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryTimeout` is a duration that specifies the timeout for retrying writing a batch of blocks to the database during snapshot creation.

#### Field `SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryBackoff`

`SnapshotSkipDbTxIndexCacheBlocksWriteBatchRetryBackoff` is a duration that specifies the backoff time between retries for writing a batch of blocks to the database during snapshot creation.

#### Field `SnapshotSkip