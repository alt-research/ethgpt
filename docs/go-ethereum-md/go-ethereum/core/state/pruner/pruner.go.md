# Pruner

The `pruner` package provides an offline tool to prune stale state with the help of a snapshot. The tool iterates over the snapshot, reconstructs the relevant state, and then iterates over the database, deleting all other state entries that don't belong to the target state and the genesis state. The package includes the following functions:

## type Config

```go
type Config struct {
    Datadir   string // The directory of the state database
    Cachedir  string // The directory of state clean cache
    BloomSize uint64 // The Megabytes of memory allocated to bloom-filter
}
```

The `Config` struct includes all the configurations for pruning.

## type Pruner

```go
type Pruner struct {
    config      Config
    chainHeader *types.Header
    db          ethdb.Database
    stateBloom  *stateBloom
    snaptree    *snapshot.Tree
}
```

The `Pruner` struct represents the pruner instance and includes the configuration, chain header, database, state bloom filter, and snapshot tree.

## func NewPruner

```go
func NewPruner(db ethdb.Database, config Config) (*Pruner, error)
```

The `NewPruner` function creates a new pruner instance.

### Parameters

- `db`: The database to prune.
- `config`: The configuration for pruning.

### Returns

- A new pruner instance.
- An error if the pruner instance cannot be created.

## func (p *Pruner) Prune

```go
func (p *Pruner) Prune() error
```

The `Prune` method prunes the stale state with the help of the snapshot ## Function: prune

The `prune` function is responsible for deleting all stale trie nodes in the disk. It takes a snapshot tree, a root hash, a main database, a state bloom, a bloom path, a map of middle state roots, and a start time as input parameters. The function iterates over all the keys in the main database and deletes all state entries that don't belong to a specific state and genesis. The function also flushes the target layer into the disk and drops all diff layers below the target. Finally, the function deletes the state bloom and starts compactions to remove the deleted data from the disk immediately.

### Parameters

- `snaptree`: A snapshot tree.
- `root`: A root hash.
- `maindb`: A main database.
- `stateBloom`: A state bloom.
- `bloomPath`: A bloom path.
- `middleStateRoots`: A map of middle state roots.
- `start`: A start time.

### Returns

- An error if the function fails.

### Example

```go
err := prune(snaptree, root, maindb, stateBloom, bloomPath, middleStateRoots, start)
if err != nil {
    log.Error("Failed to prune state data", "err", err)
}
``` # Pruner

The `Pruner` struct is responsible for pruning historical state nodes from the state trie. It provides methods for pruning the state trie and deleting historical state nodes.

## Function: NewPruner

```go
func NewPruner(config *params.ChainConfig, db ethdb.Database, snaptree *snapshot.Tree, chainHeader *types.Header) *Pruner
```

The `NewPruner` function creates a new `Pruner` instance.

### Parameters

- `config`: The chain configuration.
- `db`: The database used by the state.
- `snaptree`: The snapshot tree.
- `chainHeader`: The current chain header.

### Returns

- A new `Pruner` instance.

## Function: (p *Pruner) DeleteHistoricalNodes

```go
func (p *Pruner) DeleteHistoricalNodes() error
```

The `DeleteHistoricalNodes` method deletes all historical state nodes from the state trie.

### Returns

- An error if the deletion fails.

## Function: (p *Pruner) PruneState

```go
func (p *Pruner) PruneState() error
```

The `PruneState` method prunes the ## Function: PruneState

The `PruneState` function prunes the state trie by generating a bloom filter of the active state and deleting all inactive state. It takes the root of the state trie to be pruned, the database, and the path to the trie cache as input parameters. It returns an error if the pruning fails.

### Parameters

- `root`: The root of the state trie to be pruned.
- `db`: The database.
- `trieCachePath`: The path to the trie cache.

### Returns

- An error if the pruning fails.

## Function: RecoverPruning

The `RecoverPruning` function resumes the pruning procedure during system restart. It is used when the user tries to prune state data, but the system was interrupted midway because of a crash or manual-kill. In this case, if the bloom filter for filtering active state is already constructed, the pruning can be resumed. If the bloom filter is constructed, the pruning has to be resumed. Otherwise, a lot of dangling nodes may be left in the disk. It takes the datadir, database, and trie cache path as input parameters. It returns an error if the recovery fails.

### Parameters

- `datadir`: The datadir.
- `db`: The database.
- `trieCachePath`: The path to the trie cache.

### Returns

- An error if the recovery fails. ## Function: PruneState

```go
func PruneState(datadir string, headBlock *types.Block, layers []*types.Layer, db ethdb.Database) error
```

The `PruneState` function prunes the state trie by removing all state entries that are not reachable from the target state. It loads the target state from the given `headBlock` and prunes the state trie by removing all state entries that are not reachable from the target state. It returns an error if the target state is not found or if the pruning fails.

### Parameters

- `datadir`: The data directory of the node.
- `headBlock`: The head block of the blockchain.
- `layers`: The layers of the state trie.
- `db`: The database used by the node.

### Returns

- An error if the target state is not found or if the pruning fails.

## Function: extractGenesis

```go
func extractGenesis(db ethdb.Database, stateBloom *stateBloom) error
```

The `extractGenesis` function loads the genesis state and commits all the state entries into the given bloom filter.

### Parameters

- `db`: The database used by the node.
- `stateBloom`: The bloom filter used to store the state entries.

### Returns

- An error if the genesis state is missing or if the extraction fails.

## Function: bloomFilterName

```go
func bloomFilterName(datadir string, hash common.Hash