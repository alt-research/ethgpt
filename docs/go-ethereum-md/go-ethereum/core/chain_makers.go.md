# BlockGen

The `BlockGen` struct is used to generate blocks for testing purposes. It provides methods to set various fields of the block header, add transactions to the block, and generate the block itself.

## Type `BlockGen`

### Function `SetCoinbase`

`SetCoinbase` sets the coinbase of the generated block. It can be called at most once.

```go
func (b *BlockGen) SetCoinbase(addr common.Address)
```

##### Parameters

- `addr` - the address to set as the coinbase.

### Function `SetExtra`

`SetExtra` sets the extra data field of the generated block.

```go
func (b *BlockGen) SetExtra(data []byte)
```

##### Parameters

- `data` - the extra data to set.

### Function `SetNonce`

`SetNonce` sets the nonce field of the generated block.

```go
func (b *BlockGen) SetNonce(nonce types.BlockNonce)
```

##### Parameters

- `nonce` - the nonce to set.

### Function `SetDifficulty`

`SetDifficulty` sets the difficulty field of the generated block. This method is useful for Clique tests where the difficulty does not depend on time. For the ethash tests, please use OffsetTime, which implicitly recalculates the diff.

```go
func (b *BlockGen) SetDifficulty(diff *big.Int)
```

##### Parameters

- `diff` - the difficulty to set.

### Function `SetPoS`

`SetPoS` makes the header a PoS-header (0 difficulty).

```go
func (b *BlockGen) SetPoS()
```

### Function `addTx`

`addTx` adds a transaction to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address.

There are a few options that can be passed as well in order to run some customized rules.
- `bc`: enables the ability to query historical block hashes for BLOCKHASH
- `vmConfig`: extends the flexibility for customizing evm rules, e.g. enable extra EIPs

```go
func (b *BlockGen) addTx(bc *BlockChain, vmConfig vm.Config, tx *types.Transaction)
```

##### Parameters

- `bc` - the blockchain to use.
- `vmConfig` - the VM configuration to use.
- `tx` - the transaction to add.

### Function `AddTx`

`AddTx` adds a transaction to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address.

```go
func (b *BlockGen) AddTx(bc *BlockChain, tx *types.Transaction)
```

##### Parameters

- `bc` - the blockchain to use.
- `tx` - the transaction to add.

### Function `AddTxs`

`AddTxs` adds multiple transactions to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address.

```go
func (b *BlockGen) AddTxs(bc *BlockChain, txs []*types.Transaction)
```

##### Parameters

- `bc` - the blockchain to use.
- `txs` - the transactions to add.

### Function `AddUncle`

`AddUncle` adds an uncle header to the generated block.

```go
func (b *BlockGen) AddUncle(header *types.Header)
```

##### Parameters

- `header` - the uncle header to add.

### Function `AddWithdrawal`

`AddWithdrawal` adds a withdrawal to the generated block.

```go
func (b *BlockGen) AddWithdrawal(withdrawal *types.Withdrawal)
```

##### Parameters

- `withdrawal` - the withdrawal to add.

### Function `Generate`

`Generate` generates the block.

```go
func (b *BlockGen) Generate() *types.Block
```

##### Return Values

- `*types.Block` - the generated block. ## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain. It includes the `BlockGen` type, which is used to generate blocks for testing and simulation purposes.

### Type `BlockGen`

`BlockGen` is a type used to generate blocks for testing and simulation purposes.

#### Function `NewBlock`

`NewBlock` creates a new `BlockGen` instance with the given parent block and block number.

```go
func NewBlock(parent *types.Block, number *big.Int) *BlockGen
```

##### Parameters

- `parent` - the parent block.
- `number` - the block number.

##### Return Values

- `*BlockGen` - a new `BlockGen` instance.

#### Function `SetCoinbase`

`SetCoinbase` sets the coinbase address for the generated block.

```go
func (b *BlockGen) SetCoinbase(addr common.Address)
```

##### Parameters

- `addr` - the coinbase address.

#### Function `SetExtra`

`SetExtra` sets the extra data for the generated block.

```go
func (b *BlockGen) SetExtra(extra []byte)
```

##### Parameters

- `extra` - the extra data.

#### Function `SetGasLimit`

`SetGasLimit` sets the gas limit for the generated block.

```go
func (b *BlockGen) SetGasLimit(limit uint64)
```

##### Parameters

- `limit` - the gas limit.

#### Function `SetTime`

`SetTime` sets the timestamp for the generated block.

```go
func (b *BlockGen) SetTime(time uint64)
```

##### Parameters

- `time` - the timestamp.

#### Function `SetBaseFee`

`SetBaseFee` sets the EIP-1559 base fee for the generated block.

```go
func (b *BlockGen) SetBaseFee(baseFee *big.Int)
```

##### Parameters

- `baseFee` - the base fee.

#### Function `Commit`

`Commit` generates a new block with the transactions and receipts that have been added to the `BlockGen` instance.

```go
func (b *BlockGen) Commit() *types.Block
```

##### Return Values

- `*types.Block` - a new block.

#### Function `addTx`

`addTx` adds a transaction to the generated block.

```go
func (b *BlockGen) addTx(bc *BlockChain, config vm.Config, tx *types.Transaction)
```

##### Parameters

- `bc` - the blockchain.
- `config` - the EVM interpreter configuration.
- `tx` - the transaction.

#### Function `AddTx`

`AddTx` adds a transaction to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address.

```go
func (b *BlockGen) AddTx(tx *types.Transaction)
```

##### Parameters

- `tx` - the transaction.

#### Function `AddTxWithChain`

`AddTxWithChain` adds a transaction to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address.

```go
func (b *BlockGen) AddTxWithChain(bc *BlockChain, tx *types.Transaction)
```

##### Parameters

- `bc` - the blockchain.
- `tx` - the transaction.

#### Function `AddTxWithVMConfig`

`AddTxWithVMConfig` adds a transaction to the generated block. If no coinbase has been set, the block's coinbase is set to the zero address. The EVM interpreter can be customized with the provided vm config.

```go
func (b *BlockGen) AddTxWithVMConfig(tx *types.Transaction, config vm.Config)
```

##### Parameters

- `tx` - the transaction.
- `config` - the EVM interpreter configuration.

#### Function `GetBalance`

`GetBalance` returns the balance of the given address at the generated block.

```go
func (b *BlockGen) GetBalance(addr common.Address) *big.Int
```

##### Parameters

- `addr` - the address.

##### Return Values

- `*big.Int` - the balance.

#### Function `AddUncheckedTx`

`AddUncheckedTx` forcefully adds a transaction to the block without any validation. AddUncheckedTx will cause consensus failures when used during real chain processing. This is best used in conjunction with raw block insertion.

```go
func (b *BlockGen) AddUncheckedTx(tx *types.Transaction)
```

##### Parameters

- `tx` - the transaction.

#### Function `Number`

`Number` returns the block number of the block being generated.

```go
func (b *BlockGen) Number() *big.Int
```

##### Return Values

- `*big.Int` - the block number.

#### Function `Timestamp`

`Timestamp` returns the timestamp of the block being generated.

```go
func (b *BlockGen) Timestamp() uint64
```

##### Return Values

- `uint64` - the timestamp.

#### Function `BaseFee`

`BaseFee` returns the EIP-1559 base fee of the block being generated.

```go
func (b *BlockGen) BaseFee() *big.Int
```

##### Return Values

- `*big.Int` - the base fee.

#### Function `AddUncheckedReceipt`

`AddUncheckedReceipt` forcefully adds a receipt to the block without a backing transaction. AddUncheckedReceipt will cause consensus failures when used during real chain processing. This is best used in conjunction with raw block insertion.

```go
func (b *BlockGen) AddUncheckedReceipt(receipt *types.Receipt)
```

##### Parameters

- `receipt` - the receipt.

#### Function `TxNonce`

`TxNonce` returns the next valid transaction nonce for the account at addr. It panics if the account does not exist.

```go
func (b *BlockGen) TxNonce(addr common.Address) uint64
```

##### Parameters

- `addr` - the address.

##### Return Values

- `uint64` - the next valid transaction nonce.

#### Function `AddUncle`

`AddUncle` adds an uncle header to the generated block.

```go
func (b *BlockGen) AddUncle(h *types.Header)
```

##### Parameters

- `h` - the uncle header. ## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain. It includes the `BlockGen` type, which is used to generate blocks, and the `GenerateChain` function, which is used to generate a chain of blocks.

### Type `BlockGen`

`BlockGen` is a type used to generate blocks. It contains the header, transactions, uncles, and withdrawals for a block.

#### Function `AddTransaction`

`AddTransaction` adds a transaction to the generated block.

```go
func (b *BlockGen) AddTransaction(tx *types.Transaction)
```

##### Parameters

- `tx` - a transaction.

#### Function `AddUncle`

`AddUncle` adds an uncle to the generated block.

```go
func (b *BlockGen) AddUncle(h *types.Header)
```

##### Parameters

- `h` - a header.

#### Function `AddWithdrawal`

`AddWithdrawal` adds a withdrawal to the generated block. It returns the withdrawal index.

```go
func (b *BlockGen) AddWithdrawal(w *types.Withdrawal) uint64
```

##### Parameters

- `w` - a withdrawal.

##### Return Values

- `uint64` - the withdrawal index.

#### Function `nextWithdrawalIndex`

`nextWithdrawalIndex` computes the index of the next withdrawal.

```go
func (b *BlockGen) nextWithdrawalIndex() uint64
```

##### Return Values

- `uint64` - the index of the next withdrawal.

#### Function `PrevBlock`

`PrevBlock` returns a previously generated block by number. It panics if `num` is greater or equal to the number of the block being generated. For index -1, `PrevBlock` returns the parent block given to `GenerateChain`.

```go
func (b *BlockGen) PrevBlock(index int) *types.Block
```

##### Parameters

- `index` - the index of the previously generated block.

##### Return Values

- `*types.Block` - the previously generated block.

#### Function `OffsetTime`

`OffsetTime` modifies the time instance of a block, implicitly changing its associated difficulty. It's useful to test scenarios where forking is not tied to chain length directly.

```go
func (b *BlockGen) OffsetTime(seconds int64)
```

##### Parameters

- `seconds` - the number of seconds to offset the block time.

#### Function `GenerateChain`

`GenerateChain` creates a chain of `n` blocks. The first block's parent will be the provided parent. `db` is used to store intermediate states and should contain the parent's state trie.

The generator function is called with a new block generator for every block. Any transactions and uncles added to the generator become part of the block. If `gen` is `nil`, the blocks will be empty and their coinbase will be the zero address.

Blocks created by `GenerateChain` do not contain valid proof of work values. Inserting them into `BlockChain` requires use of `FakePow` or a similar non-validating proof of work implementation.

```go
func GenerateChain(config *params.ChainConfig, parent *types.Block, engine consensus.Engine, db ethdb.Database, n int, gen func(int, *BlockGen)) ([]*types.Block, []types.Receipts)
```

##### Parameters

- `config` - the chain configuration.
- `parent` - the parent block.
- `engine` - the consensus engine.
- `db` - the database.
- `n` - the number of blocks to generate.
- `gen` - the generator function.

##### Return Values

- `[]*types.Block` - the generated blocks.
- `[]types.Receipts` - the receipts for the generated blocks. ## Function `GenerateChain`

`GenerateChain` generates a chain of blocks with the given configuration, engine, and number of blocks. It returns the generated blocks and their receipts.

```go
func GenerateChain(config *params.ChainConfig, parent *types.Block, engine consensus.Engine, db ethdb.Database, n int, gen func(int, *BlockGen)) ([]*types.Block, []types.Receipts)
```

##### Parameters

- `config` - the configuration for the chain.
- `parent` - the parent block.
- `engine` - the consensus engine.
- `db` - the database.
- `n` - the number of blocks to generate.
- `gen` - a function to modify the generated blocks.

##### Return Values

- `[]*types.Block` - the generated blocks.
- `[]types.Receipts` - the receipts for the generated blocks.

## Function `GenerateChainWithGenesis`

`GenerateChainWithGenesis` is a wrapper of `GenerateChain` which initializes the genesis block to the database first according to the provided genesis specification and then generates the chain on top. It returns the generated blocks and their receipts.

```go
func GenerateChainWithGenesis(genesis *Genesis, engine consensus.Engine, n int, gen func(int, *BlockGen)) (ethdb.Database, []*types.Block, []types.Receipts)
```

##### Parameters

- `genesis` - the genesis block specification.
- `engine` - the consensus engine.
- `n` - the number of blocks to generate.
- `gen` - a function to modify the generated blocks.

##### Return Values

- `ethdb.Database` - the database.
- `[]*types.Block` - the generated blocks.
- `[]types.Receipts` - the receipts for the generated blocks.

## Function `makeHeader`

`makeHeader` creates a new header for a block with the given parent block, state, and engine.

```go
func makeHeader(chain consensus.ChainReader, parent *types.Block, state *state.StateDB, engine consensus.Engine) *types.Header
```

##### Parameters

- `chain` - the chain reader.
- `parent` - the parent block.
- `state` - the state database.
- `engine` - the consensus engine.

##### Return Values

- `*types.Header` - the new header.

## Function `makeHeaderChain`

`makeHeaderChain` creates a deterministic chain of headers rooted at the given parent header.

```go
func makeHeaderChain(chainConfig *params.ChainConfig, parent *types.Header, n int, engine consensus.Engine, db ethdb.Database, seed int) []*types.Header
```

##### Parameters

- `chainConfig` - the configuration for the chain.
- `parent` - the parent header.
- `n` - the number of headers to generate.
- `engine` - the consensus engine.
- `db` - the database.
- `seed` - the seed for the random number generator.

##### Return Values

- `[]*types.Header` - the generated headers.

## Function `makeHeaderChainWithGenesis`

`makeHeaderChainWithGenesis` creates a deterministic chain of headers from the given genesis block.

```go
func makeHeaderChainWithGenesis(genesis *Genesis, n int, engine consensus.Engine, seed int) (ethdb.Database, []*types.Header)
```

##### Parameters

- `genesis` - the genesis block specification.
- `n` - the number of headers to generate.
- `engine` - the consensus engine.
- `seed` - the seed for the random number generator.

##### Return Values

- `ethdb.Database` - the database.
- `[]*types.Header` - the generated headers. ## Function `makeDatabaseAndChain`

`makeDatabaseAndChain` creates a new database and a deterministic chain of blocks rooted at the parent block.

```go
func makeDatabaseAndChain(chainConfig *params.ChainConfig, parent *types.Block, n int, engine consensus.Engine, seed int) (ethdb.Database, []*types.Block)
```

##### Parameters

- `chainConfig` - the chain configuration.
- `parent` - the parent block.
- `n` - the number of blocks to generate.
- `engine` - the consensus engine.
- `seed` - the seed for the random number generator.

##### Return Values

- `ethdb.Database` - a new database.
- `[]*types.Block` - a deterministic chain of blocks rooted at the parent block.

## Function `makeBlockChain`

`makeBlockChain` creates a deterministic chain of blocks rooted at the parent block.

```go
func makeBlockChain(chainConfig *params.ChainConfig, parent *types.Block, n int, engine consensus.Engine, db ethdb.Database, seed int) []*types.Block
```

##### Parameters

- `chainConfig` - the chain configuration.
- `parent` - the parent block.
- `n` - the number of blocks to generate.
- `engine` - the consensus engine.
- `db` - the database.
- `seed` - the seed for the random number generator.

##### Return Values

- `[]*types.Block` - a deterministic chain of blocks rooted at the parent block.

## Function `makeBlockChainWithGenesis`

`makeBlockChainWithGenesis` creates a deterministic chain of blocks from the genesis block.

```go
func makeBlockChainWithGenesis(genesis *Genesis, n int, engine consensus.Engine, seed int) (ethdb.Database, []*types.Block)
```

##### Parameters

- `genesis` - the genesis block.
- `n` - the number of blocks to generate.
- `engine` - the consensus engine.
- `seed` - the seed for the random number generator.

##### Return Values

- `ethdb.Database` - a new database.
- `[]*types.Block` - a deterministic chain of blocks from the genesis block.

## Type `fakeChainReader`

`fakeChainReader` is a struct that implements the `ChainReader` interface.

### Function `Config`

`Config` returns the chain configuration.

```go
func (cr *fakeChainReader) Config() *params.ChainConfig
```

##### Return Values

- `*params.ChainConfig` - the chain configuration.

### Function `CurrentHeader`

`CurrentHeader` returns the current header.

```go
func (cr *fakeChainReader) CurrentHeader() *types.Header
```

##### Return Values

- `*types.Header` - the current header.

### Function `GetHeaderByNumber`

`GetHeaderByNumber` returns the header with the given block number.

```go
func (cr *fakeChainReader) GetHeaderByNumber(number uint64) *types.Header
```

##### Parameters

- `number` - the block number.

##### Return Values

- `*types.Header` - the header with the given block number.

### Function `GetHeaderByHash`

`GetHeaderByHash` returns the header with the given block hash.

```go
func (cr *fakeChainReader) GetHeaderByHash(hash common.Hash) *types.Header
```

##### Parameters

- `hash` - the block hash.

##### Return Values

- `*types.Header` - the header with the given block hash.

### Function `GetHeader`

`GetHeader` returns the header with the given block hash and number.

```go
func (cr *fakeChainReader) GetHeader(hash common.Hash, number uint64) *types.Header
```

##### Parameters

- `hash` - the block hash.
- `number` - the block number.

##### Return Values

- `*types.Header` - the header with the given block hash and number.

### Function `GetBlock`

`GetBlock` returns the block with the given block hash and number.

```go
func (cr *fakeChainReader) GetBlock(hash common.Hash, number uint64) *types.Block
```

##### Parameters

- `hash` - the block hash.
- `number` - the block number.

##### Return Values

- `*types.Block` - the block with the given block hash and number.

### Function `GetTd`

`GetTd` returns the total difficulty of the block with the given block hash and number.

```go
func (cr *fakeChainReader) GetTd(hash common.Hash, number uint64) *big.Int
```

##### Parameters

- `hash` - the block hash.
- `number` - the block number.

##### Return Values

- `*big.Int` - the total difficulty of the block with the given block hash and number.