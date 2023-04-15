## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain. It includes the implementation of the Ethereum Virtual Machine (EVM), the consensus algorithm, and the data structures used to represent blocks and transactions.

### Function `TestInvalidCliqueConfig`

`TestInvalidCliqueConfig` tests that an error is returned when the `ExtraData` field of the genesis block is empty.

```go
func TestInvalidCliqueConfig(t *testing.T)
```

##### Parameters

- `t` - a testing object.

### Function `TestSetupGenesis`

`TestSetupGenesis` tests the `SetupGenesisBlock` function.

```go
func TestSetupGenesis(t *testing.T)
```

##### Parameters

- `t` - a testing object.

### Function `SetupGenesisBlock`

`SetupGenesisBlock` sets up the genesis block for a new blockchain.

```go
func SetupGenesisBlock(db ethdb.Database, trieDB *trie.Database, genesis *Genesis) (*params.ChainConfig, common.Hash, error)
```

##### Parameters

- `db` - a database to store the genesis block.
- `trieDB` - a database to store the trie.
- `genesis` - the genesis block.

##### Return Values

- `*params.ChainConfig` - the chain configuration.
- `common.Hash` - the hash of the genesis block.
- `error` - an error, if any.

### Type `Genesis`

`Genesis` represents the genesis block of a blockchain.

```go
type Genesis struct {
	Config *params.ChainConfig `json:"config"`
	Nonce  uint64              `json:"nonce"`
	Timestamp uint64           `json:"timestamp"`
	ExtraData []byte           `json:"extraData"`
	GasLimit uint64            `json:"gasLimit"`
	Difficulty *big.Int        `json:"difficulty"`
	MixHash common.Hash        `json:"mixHash"`
	Coinbase common.Address    `json:"coinbase"`
	Alloc GenesisAlloc         `json:"alloc"`
}
```

##### Fields

- `Config` - the chain configuration.
- `Nonce` - the nonce.
- `Timestamp` - the timestamp.
- `ExtraData` - the extra data.
- `GasLimit` - the gas limit.
- `Difficulty` - the difficulty.
- `MixHash` - the mix hash.
- `Coinbase` - the coinbase.
- `Alloc` - the allocation.

### Type `GenesisAlloc`

`GenesisAlloc` represents the allocation of ether in the genesis block.

```go
type GenesisAlloc map[common.Address]GenesisAccount
```

##### Fields

- `common.Address` - the address of the account.
- `GenesisAccount` - the account.

### Type `GenesisAccount`

`GenesisAccount` represents an account in the genesis block.

```go
type GenesisAccount struct {
	Balance  *big.Int              `json:"balance"`
	Code     []byte                `json:"code,omitempty"`
	Storage  map[common.Hash]common.Hash `json:"storage,omitempty"`
	Nonce    uint64                `json:"nonce"`
}
```

##### Fields

- `Balance` - the balance of the account.
- `Code` - the code of the account.
- `Storage` - the storage of the account.
- `Nonce` - the nonce of the account. ## Function `SetupGenesisBlock`

`SetupGenesisBlock` sets up the genesis block for a new blockchain. It creates a new block with the given genesis information and stores it in the database.

```go
func SetupGenesisBlock(db ethdb.Database, trieDB *trie.Database, genesis *Genesis) (*params.ChainConfig, common.Hash, error)
```

##### Parameters

- `db` - the database to store the genesis block in.
- `trieDB` - the trie database to use.
- `genesis` - the genesis block to create.

##### Return Values

- `*params.ChainConfig` - the chain configuration.
- `common.Hash` - the hash of the genesis block.
- `error` - an error, if any.

## Function `TestGenesisHashes`

`TestGenesisHashes` checks the congruity of default genesis data to corresponding hardcoded genesis hash values.

```go
func TestGenesisHashes(t *testing.T)
```

##### Parameters

- `t` - the testing object.

## Function `TestGenesis_Commit`

`TestGenesis_Commit` tests the `Commit` method of the `Genesis` struct.

```go
func TestGenesis_Commit(t *testing.T)
```

##### Parameters

- `t` - the testing object. ## Function `TestReadWriteGenesis`

`TestReadWriteGenesis` is a test function that tests the `WriteGenesisBlock` and `ReadGenesisBlock` functions. It creates a new memory database, generates a genesis block with a difficulty of 1, and writes it to the database using `WriteGenesisBlock`. It then reads the genesis block from the database using `ReadGenesisBlock` and compares the stored block with the original block. If the stored block is not equal to the original block, the test fails.

### Parameters

- `t` - a testing object.

### Return Values

This function does not return any values.

## Function `TestReadWriteGenesisAlloc`

`TestReadWriteGenesisAlloc` is a test function that tests the `WriteGenesisStateSpec` and `ReadGenesisStateSpec` functions. It creates a new memory database, generates a genesis allocation with two accounts, and writes it to the database using `WriteGenesisStateSpec`. It then reads the genesis allocation from the database using `ReadGenesisStateSpec` and compares the stored allocation with the original allocation. If the stored allocation is not equal to the original allocation, the test fails.

### Parameters

- `t` - a testing object.

### Return Values

This function does not return any values.

## Type `GenesisAlloc`

`GenesisAlloc` is a type that represents the initial allocation of Ether and contract storage for the genesis block. It is a map of addresses to `GenesisAccount` objects.

### Type `GenesisAccount`

`GenesisAccount` is a type that represents an account in the initial allocation of Ether and contract storage for the genesis block. It contains a balance and a map of storage keys to storage values.

### Function `deriveHash`

`deriveHash` is a function that calculates the hash of the genesis allocation.

```go
func (alloc *GenesisAlloc) deriveHash() (common.Hash, error)
```

#### Return Values

- `common.Hash` - the hash of the genesis allocation.
- `error` - an error, if any.

### Function `MarshalJSON`

`MarshalJSON` is a function that marshals the genesis allocation to JSON.

```go
func (alloc *GenesisAlloc) MarshalJSON() ([]byte, error)
```

#### Return Values

- `[]byte` - the JSON representation of the genesis allocation.
- `error` - an error, if any.

### Function `UnmarshalJSON`

`UnmarshalJSON` is a function that unmarshals the genesis allocation from JSON.

```go
func (alloc *GenesisAlloc) UnmarshalJSON(input []byte) error
```

#### Parameters

- `input` - the JSON representation of the genesis allocation.

#### Return Values

- `error` - an error, if any.