## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain. It includes the implementation of the Ethereum Virtual Machine (EVM), transaction processing, and block validation.

### Interface `ChainContext`

`ChainContext` is an interface that supports retrieving headers and consensus parameters from the current blockchain to be used during transaction processing.

#### Function `Engine`

`Engine` retrieves the chain's consensus engine.

```go
Engine() consensus.Engine
```

##### Return Values

- `consensus.Engine` - the chain's consensus engine.

#### Function `GetHeader`

`GetHeader` returns the header corresponding to the hash/number argument pair.

```go
GetHeader(common.Hash, uint64) *types.Header
```

##### Parameters

- `common.Hash` - the hash of the header.
- `uint64` - the number of the header.

##### Return Values

- `*types.Header` - the header corresponding to the hash/number argument pair.

### Function `NewEVMBlockContext`

`NewEVMBlockContext` creates a new context for use in the EVM.

```go
func NewEVMBlockContext(header *types.Header, chain ChainContext, author *common.Address) vm.BlockContext
```

##### Parameters

- `*types.Header` - the header of the block.
- `ChainContext` - the context of the chain.
- `*common.Address` - the address of the author.

##### Return Values

- `vm.BlockContext` - the context for use in the EVM.

### Function `NewEVMTxContext`

`NewEVMTxContext` creates a new transaction context for a single transaction.

```go
func NewEVMTxContext(msg *Message) vm.TxContext
```

##### Parameters

- `*Message` - the message of the transaction.

##### Return Values

- `vm.TxContext` - the transaction context for a single transaction.

### Function `GetHashFn`

`GetHashFn` returns a `GetHashFunc` which retrieves header hashes by number.

```go
func GetHashFn(ref *types.Header, chain ChainContext) func(n uint64) common.Hash
```

##### Parameters

- `*types.Header` - the header of the block.
- `ChainContext` - the context of the chain.

##### Return Values

- `func(n uint64) common.Hash` - a `GetHashFunc` which retrieves header hashes by number. ## Documentation for Source Code

### Function `GetBlockHash`

`GetBlockHash` retrieves the hash of the block with the given number from the blockchain. If the block is not found, it returns an empty `common.Hash`.

```go
func GetBlockHash(chain ChainContext, number uint64) common.Hash
```

##### Parameters

- `chain` - a `ChainContext` interface.
- `number` - the number of the block to retrieve.

##### Return Values

- `common.Hash` - the hash of the block with the given number, or an empty `common.Hash` if the block is not found.

### Function `CanTransfer`

`CanTransfer` checks whether there are enough funds in the address' account to make a transfer. This does not take the necessary gas into account to make the transfer valid.

```go
func CanTransfer(db vm.StateDB, addr common.Address, amount *big.Int) bool
```

##### Parameters

- `db` - a `vm.StateDB` interface.
- `addr` - the address to check.
- `amount` - the amount to transfer.

##### Return Values

- `bool` - `true` if there are enough funds in the address' account to make the transfer, `false` otherwise.

### Function `Transfer`

`Transfer` subtracts `amount` from `sender` and adds `amount` to `recipient` using the given `Db`.

```go
func Transfer(db vm.StateDB, sender, recipient common.Address, amount *big.Int)
```

##### Parameters

- `db` - a `vm.StateDB` interface.
- `sender` - the address of the sender.
- `recipient` - the address of the recipient.
- `amount` - the amount to transfer.

##### Return Values

- None.