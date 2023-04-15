# Snapshot Command Documentation

The `snapshot` command provides a set of subcommands for working with Ethereum state snapshots. The subcommands include `prune-state`, `verify-state`, `check-dangling-storage`, and `inspect-account`.

## Prune-State

The `prune-state` subcommand prunes stale Ethereum state data based on the snapshot. The subcommand deletes all trie nodes and contract codes that do not belong to the specified version state from the database. After pruning, only two version states are available: genesis and the specific one.

### Usage

```
geth snapshot prune-state <state-root>
```

### Arguments

- `state-root`: The root hash of the state snapshot.

### Flags

- `--cache.trie.journal`: The directory for the trie clean cache. If you specify another directory for the trie clean cache during the use of Geth, please also specify it here for correct deletion. Otherwise, the trie clean cache with the default directory will be deleted.
- `--bloomfilter.size`: The size of the bloom filter.

### Example

```
geth snapshot prune-state 0x1234567890abcdef
```

## Verify-State

The `verify-state` subcommand recalculates the state hash based on the snapshot for verification. The subcommand traverses the whole accounts and storages set based on the specified snapshot and recalculates the root hash of state for verification. In other words, this command does the snapshot to trie conversion.

### Usage

```
geth snapshot verify-state <state-root>
```

### Arguments

- `state-root`: The root hash of the state snapshot.

### Example

```
geth snapshot verify-state 0x1234567890abcdef
```

## Check-Dangling-Storage

The `check-dangling-storage` subcommand checks that there is no 'dangling' snap storage. The subcommand traverses the snap storage data and verifies that all snapshot storage data has a corresponding account.

### Usage

```
geth snapshot check-dangling-storage <state-root>
```

### Arguments

- `state-root`: The root hash of the state snapshot.

### Example

```
geth snapshot check-dangling-storage 0x1234567890abcdef
```

## Inspect-Account

The `inspect-account` subcommand checks all snapshot layers for a specific account. The subcommand retrieves the account by address or hash and prints the account information for each snapshot layer.

### Usage

```
geth snapshot inspect-account <address | hash>
```

### Arguments

- `address | hash`: The address or hash of the account.

### Example

```
geth snapshot inspect-account 0x1234567890abcdef
``` ## Snapshot Package

The `Snapshot` package provides functions for inspecting and verifying the state of the Ethereum blockchain using snapshots. The package includes functions for traversing the state, dumping a specific block from storage, and pruning the state.

### `pruneState`

```go
func pruneState(ctx *cli.Context) error
```

The `pruneState` function prunes the state of the Ethereum blockchain using snapshots. The function takes a `cli.Context` object as input and returns an error if the pruning process fails. The function uses the `pruner` package to prune the state.

### `verifyState`

```go
func verifyState(ctx *cli.Context) error
```

The `verifyState` function verifies the state of the Ethereum blockchain using snapshots. The function takes a `cli.Context` object as input and returns an error if the verification process fails. The function uses the `snapshot` package to verify the state.

### `traverseState`

```go
func traverseState(ctx *cli.Context) error
```

The `traverseState` function traverses the state of the Ethereum blockchain using snapshots. The function takes a `cli.Context` object as input and returns an error if the traversal process fails. The function uses the `snapshot` package to traverse the state.

### `traverseRawState`

```go
func traverseRawState(ctx *cli.Context) error
```

The `traverseRawState` function traverses the state of the Ethereum blockchain using snapshots and performs detailed verification. The function takes a `cli.Context` object as input and returns an error if the traversal process fails. The function uses the `snapshot` package to traverse the state.

### `dumpState`

```go
func dumpState(ctx *cli.Context) error
```

The `dumpState` function dumps a specific block from storage using snapshots. The function takes a `cli.Context` object as input and returns an error if the dumping process fails. The function uses the `snapshot` package to dump the block.

### `pruner`

```go
type Pruner struct {
	chaindb   *ethdb.LDBDatabase
	config    Config
	snapshots *snapshot.Tree
}
```

The `Pruner` struct represents a snapshot pruner. The struct includes a `chaindb` object, a `config` object, and a `snapshots` object.

### `Config`

```go
type Config struct {
	Datadir   string
	Cachedir  string
	BloomSize uint64
}
```

The `Config` struct represents the configuration for a snapshot pruner. The struct includes a `Datadir` string, a `Cachedir` string, and a `BloomSize` uint64.

### `NewPruner`

```go
func NewPruner(chaindb *ethdb.LDBDatabase, config Config) (*Pruner, error)
```

The `NewPruner` function creates a new snapshot pruner. The function takes a `chaindb` object and a `config` object as input and returns a `Pruner` object and an error if the creation process fails.

### `Prune`

```go
func (p *Pruner) Prune(targetRoot common.Hash) error
```

The `Prune` function prunes the state of the Ethereum blockchain using snapshots. The function takes a `targetRoot` hash as input and returns an error if the pruning process fails.

### `snapshot`

```go
type Tree struct {
	db        ethdb.Database
	cache     *trie.Database
	root      common.Hash
	snapshots map[common.Hash]*Snapshot
}
```

The `Tree` struct represents a snapshot tree. The struct includes a `db` object, a `cache` object, a `root` hash, and a `snapshots` map.

### `Config`

```go
type Config struct {
	CacheSize  int
	Recovery   bool
	NoBuild    bool
	AsyncBuild bool
}
```

The `Config` struct represents the configuration for a snapshot tree. The struct includes a `CacheSize` int, a `Recovery` bool, a `NoBuild` bool, and an `AsyncBuild` bool.

### `New`

```go
func New(config Config, db ethdb.Database) (*Tree, error)
```

The `New` function creates a new snapshot tree. The function takes a `config` object and a `db` object as input and returns a `Tree` object and an error if the creation process fails.

### `Dump`

```go
func (t *Tree) Dump(blockNum uint64, excludeCode, excludeStorage bool, startKey []byte, limit uint64) error
```

The `Dump` function dumps a specific block from storage using snapshots. The function takes a `blockNum` uint64, an `excludeCode` bool, an `excludeStorage` bool, a `startKey` byte slice, and a `limit` uint64 as input and returns an error if the dumping process fails.

### `traverse`

```go
func traverse(db ethdb.Database, root common.Hash, visitFn func(common.Hash, []byte) error) error
```

The `traverse` function traverses the state of the Ethereum blockchain using snapshots. The function takes a `db` object, a `root` hash, and a `visitFn` function as input and returns an error if the traversal process fails. ## Documentation for Snapshot Package

The `Snapshot` package provides functions for verifying and checking the state of the Ethereum protocol. The package includes functions for verifying the state of the snapshot tree, checking dangling storage, and traversing the state.

### `VerifyState`

```go
func VerifyState(ctx *cli.Context) error
```

The `VerifyState` function verifies the state of the snapshot tree. The function opens the snapshot tree and retrieves the root of the head block. If a root is provided as an argument, the function uses that root instead. The function then verifies the state of the snapshot tree and checks for any dangling storage. If the verification is successful, the function logs the result and returns `nil`. If the verification fails, the function logs the error and returns the error.

### `checkDanglingStorage`

```go
func checkDanglingStorage(ctx *cli.Context) error
```

The `checkDanglingStorage` function checks for dangling storage in the snap storage data. The function iterates the snap storage data and verifies that all storage has corresponding account data. If the check is successful, the function returns `nil`. If the check fails, the function logs the error and returns the error.

### `traverseState`

```go
func traverseState(ctx *cli.Context) error
```

The `traverseState` function traverses the state of the Ethereum protocol. The function opens the trie and retrieves the root of the head block. If a root is provided as an argument, the function uses that root instead. The function then iterates the trie and ensures that all nodes and associated contract codes are present. If the traversal is successful, the function logs the result and returns `nil`. If the traversal fails, the function logs the error and returns the error.

### `makeConfigNode`

```go
func makeConfigNode(ctx *cli.Context) (*rawdb.LDBDatabase, *params.ChainConfig)
```

The `makeConfigNode` function creates a new configuration node for the Ethereum protocol. The function retrieves the chain configuration from the context and creates a new database for the configuration node. The function returns the database and the chain configuration.

### `parseRoot`

```go
func parseRoot(root string) (common.Hash, error)
```

The `parseRoot` function parses a root string and returns the corresponding hash. The function checks that the string is a valid hash and returns the hash. If the string is not a valid hash, the function returns an error.

### `CheckDanglingStorage`

```go
func CheckDanglingStorage(db ethdb.Database) error
```

The `CheckDanglingStorage` function checks for dangling storage in the given database. The function iterates the database and verifies that all storage has corresponding account data. If the check is successful, the function returns `nil`. If the check fails, the function logs the error and returns the error.

### `NewStateTrie`

```go
func NewStateTrie(id trie.TrieID, db ethdb.Database) (*trie.Trie, error)
```

The `NewStateTrie` function creates a new state trie for the given trie ID and database. The function retrieves the trie ID and database and creates a new trie. The function returns the trie and any errors that occur.

### `HasCode`

```go
func HasCode(db ethdb.Database, hash common.Hash) bool
```

The `HasCode` function checks if the given hash is present in the database. The function retrieves the hash and database and checks if the hash is present. If the hash is present, the function returns `true`. If the hash is not present, the function returns `false`.

### `ReadHeadBlock`

```go
func ReadHeadBlock(db ethdb.Database) *types.Block
```

The `ReadHeadBlock` function retrieves the head block from the given database. The function retrieves the head block and returns it. If the head block is not present, the function returns `nil`.

### `PrettyDuration`

```go
func PrettyDuration(d time.Duration) string
```

The `PrettyDuration` function formats the given duration as a human-readable string. The function retrieves the duration and formats it as a string. The function returns the formatted string. ## traverseRawState

The `traverseRawState` function is a helper function used for pruning verification. It iterates the trie and ensures all nodes and associated contract codes are present. It is similar to `traverseState`, but it checks each trie node.

### Parameters

- `ctx *cli.Context`: The command-line context.

### Returns

- `error`: An error if any.

### Example

```go
err := traverseRawState(ctx)
if err != nil {
    log.Error("Failed to traverse raw state", "err", err)
    return err
}
```

## traverseState

The `traverseState` function is a helper function used for pruning verification. It iterates the trie and ensures all nodes and associated contract codes are present.

### Parameters

- `ctx *cli.Context`: The command-line context.

### Returns

- `error`: An error if any.

### Example

```go
err := traverseState(ctx)
if err != nil {
    log.Error("Failed to traverse state", "err", err)
    return err
}
```

## traverseStorage

The `traverseStorage` function is a helper function used for pruning verification. It iterates the storage trie and ensures all nodes and associated contract codes are present.

### Parameters

- `ctx *cli.Context`: The command-line context.

### Returns

- `error`: An error if any.

### Example

```go
err := traverseStorage(ctx)
if err != nil {
    log.Error("Failed to traverse storage", "err", err)
    return err
}
``` ## Function Documentation

### `dumpState`

```go
func dumpState(ctx *cli.Context) error
```

The `dumpState` function is used to dump the state of the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the configuration and database information from the context object and creates a snapshot of the state. The function then iterates through the accounts in the snapshot and dumps the account information to the console in JSON format.

### `parseRoot`

```go
func parseRoot(input string) (common.Hash, error)
```

The `parseRoot` function is used to parse a string input into a `common.Hash` object. The function takes a string input as input and returns a `common.Hash` object and an error if any. The function unmarshals the input string into a `common.Hash` object and returns the object.

### `checkAccount`

```go
func checkAccount(ctx *cli.Context) error
```

The `checkAccount` function is used to check the state of an account in the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the address or hash of the account from the context object and iterates through the snapshot data layers to look up the account. The function then prints the account information to the console.

### `checkState`

```go
func checkState(ctx *cli.Context) error
```

The `checkState` function is used to check the state of the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the configuration and database information from the context object and creates a snapshot of the state. The function then iterates through the accounts in the snapshot and checks the account information against the blockchain data. The function returns an error if any discrepancies are found.

### `checkStorage`

```go
func checkStorage(ctx *cli.Context) error
```

The `checkStorage` function is used to check the storage of an account in the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the address or hash of the account from the context object and iterates through the snapshot data layers to look up the account. The function then iterates through the storage of the account and checks the storage information against the blockchain data. The function returns an error if any discrepancies are found.

### `checkCode`

```go
func checkCode(ctx *cli.Context) error
```

The `checkCode` function is used to check the code of an account in the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the address or hash of the account from the context object and iterates through the snapshot data layers to look up the account. The function then checks the code of the account against the blockchain data. The function returns an error if any discrepancies are found.

### `checkRoot`

```go
func checkRoot(ctx *cli.Context) error
```

The `checkRoot` function is used to check the root of the Ethereum blockchain. The function takes a `cli.Context` object as input and returns an error if any. The function retrieves the configuration and database information from the context object and creates a snapshot of the state. The function then checks the root of the snapshot against the blockchain data. The function returns an error if any discrepancies are found. ## Function Description: CheckJournalAccount

The `CheckJournalAccount` function is a method that checks the journalled storage of a snapshot for a given account hash. The function takes in a `chaindb` object, which is an instance of a database that stores the blockchain data, and a `hash` string that represents the hash of the account to be checked. 

The function first opens a connection to the `chaindb` object and defers its closure until the function returns. It then starts a timer to measure the execution time of the function and logs a message indicating that the journalled storage is being checked for the given `address` and `hash`.

The function then calls the `snapshot.CheckJournalAccount` method, passing in the `chaindb` object and the `hash` string. This method checks the journalled storage of the snapshot for the given account hash and returns an error if the account is not found.

If the `CheckJournalAccount` method returns an error, the function returns the error. Otherwise, the function logs a message indicating that the journalled storage has been checked and returns `nil`.

## Example Usage

```go
import (
	"github.com/ethereum/go-ethereum/core/rawdb"
	"github.com/ethereum/go-ethereum/core/snapshot"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/common"
	"time"
)

func main() {
	chaindb, _ := rawdb.NewMemoryDatabase()
	defer chaindb.Close()

	addr := common.HexToAddress("0x1234567890123456789012345678901234567890")
	hash := "0x1234567890123456789012345678901234567890123456789012345678901234"

	err := CheckJournalAccount(chaindb, addr, hash)
	if err != nil {
		log.Error("Error checking journalled storage", "error", err)
	} else {
		log.Info("Journalled storage check successful")
	}
}
``` 

In this example, the `CheckJournalAccount` function is called with a `chaindb` object that is created using the `rawdb.NewMemoryDatabase` method. The function is called with an `addr` variable that represents the address of the account to be checked and a `hash` variable that represents the hash of the account to be checked.

If the `CheckJournalAccount` method returns an error, the function logs an error message indicating that there was an error checking the journalled storage. Otherwise, the function logs a message indicating that the journalled storage check was successful.