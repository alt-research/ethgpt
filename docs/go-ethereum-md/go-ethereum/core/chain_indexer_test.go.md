# Chain Indexer

The `core` package provides the `ChainIndexer` type, which is responsible for indexing the blockchain and providing a way to query it efficiently. The `ChainIndexer` type is used by the Ethereum node to keep track of the blockchain and to provide data to clients.

## Test Functions

### Function `TestChainIndexerSingle`

`TestChainIndexerSingle` runs multiple tests with randomized parameters for a single chain indexer.

```go
func TestChainIndexerSingle(t *testing.T)
```

##### Parameters

- `t` - a testing object.

### Function `TestChainIndexerWithChildren`

`TestChainIndexerWithChildren` runs multiple tests with randomized parameters and different number of chain backends.

```go
func TestChainIndexerWithChildren(t *testing.T)
```

##### Parameters

- `t` - a testing object.

### Function `testChainIndexer`

`testChainIndexer` runs a test with either a single chain indexer or a chain of multiple backends. The section size and required confirmation count parameters are randomized.

```go
func testChainIndexer(t *testing.T, count int)
```

##### Parameters

- `t` - a testing object.
- `count` - the number of chain backends.

## Type `ChainIndexer`

`ChainIndexer` is responsible for indexing the blockchain and providing a way to query it efficiently.

### Function `NewChainIndexer`

`NewChainIndexer` creates a new `ChainIndexer` object.

```go
func NewChainIndexer(db rawdb.Database, table rawdb.DatabaseTable, parent *ChainIndexer, sectionSize, confirmsReq, reorgLimit uint64, name string) *ChainIndexer
```

##### Parameters

- `db` - a database object.
- `table` - a database table object.
- `parent` - a parent `ChainIndexer` object.
- `sectionSize` - the size of a section.
- `confirmsReq` - the number of confirmations required.
- `reorgLimit` - the reorg limit.
- `name` - the name of the `ChainIndexer` object.

##### Return Values

- `*ChainIndexer` - a new `ChainIndexer` object.

### Function `AddChildIndexer`

`AddChildIndexer` adds a child `ChainIndexer` object.

```go
func (i *ChainIndexer) AddChildIndexer(child *ChainIndexer)
```

##### Parameters

- `child` - a child `ChainIndexer` object.

### Function `Close`

`Close` closes the `ChainIndexer` object.

```go
func (i *ChainIndexer) Close()
```

### Function `Sections`

`Sections` returns the number of sections.

```go
func (i *ChainIndexer) Sections() (uint64, uint64, error)
```

##### Return Values

- `uint64` - the number of sections.
- `uint64` - the number of sections with confirmations.
- `error` - an error, if any.

### Function `Section`

`Section` returns the section at the given index.

```go
func (i *ChainIndexer) Section(index uint64) (*types.ChainIndexSection, error)
```

##### Parameters

- `index` - the index of the section.

##### Return Values

- `*types.ChainIndexSection` - the section at the given index.
- `error` - an error, if any.

### Function `SectionByHash`

`SectionByHash` returns the section containing the given block hash.

```go
func (i *ChainIndexer) SectionByHash(hash common.Hash) (*types.ChainIndexSection, error)
```

##### Parameters

- `hash` - the block hash.

##### Return Values

- `*types.ChainIndexSection` - the section containing the given block hash.
- `error` - an error, if any.

### Function `SectionByNumber`

`SectionByNumber` returns the section containing the given block number.

```go
func (i *ChainIndexer) SectionByNumber(number uint64) (*types.ChainIndexSection, error)
```

##### Parameters

- `number` - the block number.

##### Return Values

- `*types.ChainIndexSection` - the section containing the given block number.
- `error` - an error, if any.

### Function `newHead`

`newHead` notifies the `ChainIndexer` object about a new head or reorg.

```go
func (i *ChainIndexer) newHead(headNum uint64, reorg bool)
```

##### Parameters

- `headNum` - the block number of the new head.
- `reorg` - a boolean indicating whether a reorg occurred.

### Function `process`

`process` processes a block.

```go
func (i *ChainIndexer) process(block *types.Block, receipts types.Receipts, td *big.Int, reorg bool) error
```

##### Parameters

- `block` - the block to process.
- `receipts` - the receipts for the block.
- `td` - the total difficulty of the block.
- `reorg` - a boolean indicating whether a reorg occurred.

##### Return Values

- `error` - an error, if any.

### Function `processSection`

`processSection` processes a section.

```go
func (i *ChainIndexer) processSection(section *types.ChainIndexSection) error
```

##### Parameters

- `section` - the section to process.

##### Return Values

- `error` - an error, if any.

### Function `processable`

`processable` returns a boolean indicating whether a section is processable.

```go
func (i *ChainIndexer) processable(section *types.ChainIndexSection) bool
```

##### Parameters

- `section` - the section to check.

##### Return Values

- `bool` - a boolean indicating whether the section is processable.

### Function `reorg`

`reorg` handles a reorg.

```go
func (i *ChainIndexer) reorg(headNum uint64) uint64
```

##### Parameters

- `headNum` - the block number of the new head.

##### Return Values

- `uint64` - the new block number.

### Function `assertBlocks`

`assertBlocks` asserts that the blocks are processed correctly.

```go
func (b *testChainIndexBackend) assertBlocks(headNum, failNum uint64) (uint64, bool)
```

##### Parameters

- `headNum` - the block number of the new head.
- `failNum` - the block number of the failed block.

##### Return Values

- `uint64` - the new block number.
- `bool` - a boolean indicating whether the blocks should be processed further.

### Function `assertSections`

`assertSections` asserts that the sections are processed correctly.

```go
func (b *testChainIndexBackend) assertSections()
``` ## Documentation for ChainIndexerBackend

The `ChainIndexerBackend` interface defines the methods that a backend for the `ChainIndexer` must implement. The `ChainIndexer` is a tool for indexing Ethereum blocks and headers. It is used to keep track of the state of the blockchain and to provide fast access to specific blocks and headers.

### Function `Reset`

`Reset` is called when the indexer needs to reset its state. It is called with the section number and the hash of the previous head block.

```go
Reset(ctx context.Context, section uint64, prevHead common.Hash) error
```

##### Parameters

- `ctx` - a context.Context object.
- `section` - the section number.
- `prevHead` - the hash of the previous head block.

##### Return Values

- `error` - an error, if any.

### Function `Process`

`Process` is called when a new block or header is received. It is called with the header of the block or header.

```go
Process(ctx context.Context, header *types.Header) error
```

##### Parameters

- `ctx` - a context.Context object.
- `header` - the header of the block or header.

##### Return Values

- `error` - an error, if any.

### Function `Commi`

`Commi` is called when the indexer has finished processing a section. It is called with the section number and the hash of the head block of the section.

```go
Commi(ctx context.Context, section uint64, head common.Hash) error
```

##### Parameters

- `ctx` - a context.Context object.
- `section` - the section number.
- `head` - the hash of the head block of the section.

##### Return Values

- `error` - an error, if any.

## Documentation for testChainIndexBackend

The `testChainIndexBackend` struct implements the `ChainIndexerBackend` interface for testing purposes.

### Function `assertSections`

`assertSections` verifies if a chain indexer has the correct number of sections. It keeps trying for 3 seconds if it does not match.

```go
assertSections()
```

##### Return Values

None.

### Function `assertBlocks`

`assertBlocks` expects processing calls after new blocks have arrived. If the failNum < headNum then we are simulating a scenario where a reorg has happened after the processing has started and the processing of a section fails.

```go
assertBlocks(headNum, failNum uint64) (uint64, bool)
```

##### Parameters

- `headNum` - the number of the head block.
- `failNum` - the number of the block where processing fails.

##### Return Values

- `uint64` - the number of the last processed block.
- `bool` - a boolean indicating whether processing calls are expected.

### Function `reorg`

`reorg` simulates a reorg by setting the stored section to the first section that has changed.

```go
reorg(headNum uint64) uint64
```

##### Parameters

- `headNum` - the number of the head block.

##### Return Values

- `uint64` - the number of the last processed block. ## Function `t() error`

The `t()` function is a method of the `testChainIndexBackend` struct. It returns an error if the number of headers processed is not equal to the section size of the indexer. If the condition is not met, the function logs an error message using the `Error()` method of the `testing.T` type associated with the `testChainIndexBackend` instance.

### Parameters

None.

### Return Values

- `error` - an error, if the number of headers processed is not equal to the section size of the indexer. Otherwise, it returns `nil`.

## Function `Prune(threshold uint64) error`

The `Prune()` function is a method of the `testChainIndexBackend` struct. It takes a `threshold` parameter of type `uint64` and returns an error. The function is responsible for pruning the indexer by removing all headers with a height less than or equal to the given `threshold`.

### Parameters

- `threshold` - a `uint64` value representing the height threshold for pruning.

### Return Values

- `error` - an error, if any. Otherwise, it returns `nil`.