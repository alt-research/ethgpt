# Core Package

The `core` package is a part of the `go-ethereum` library, which is a free and open-source implementation of the Ethereum protocol. This package contains interfaces for block validation, pre-caching transaction signatures and state, and processing blocks using a given initial state.

## Validator Interface

The `Validator` interface defines the standard for block validation. It is only responsible for validating block contents, as the header validation is done by the specific consensus engines.

### Function `ValidateBody`

`ValidateBody` validates the given block's content.

```go
func ValidateBody(block *types.Block) error
```

##### Parameters

- `block` - a block to validate.

##### Return Values

- `error` - an error, if any.

### Function `ValidateState`

`ValidateState` validates the given statedb and optionally the receipts and gas used.

```go
func ValidateState(block *types.Block, state *state.StateDB, receipts types.Receipts, usedGas uint64) error
```

##### Parameters

- `block` - a block to validate.
- `state` - a state database.
- `receipts` - receipts of the block.
- `usedGas` - gas used in the block.

##### Return Values

- `error` - an error, if any.

## Prefetcher Interface

The `Prefetcher` interface is for pre-caching transaction signatures and state.

### Function `Prefetch`

`Prefetch` processes the state changes according to the Ethereum rules by running the transaction messages using the statedb, but any changes are discarded. The only goal is to pre-cache transaction signatures and state trie nodes.

```go
func Prefetch(block *types.Block, statedb *state.StateDB, cfg vm.Config, interrupt *atomic.Bool)
```

##### Parameters

- `block` - a block to pre-cache.
- `statedb` - a state database.
- `cfg` - a virtual machine configuration.
- `interrupt` - an atomic boolean to interrupt the process.

## Processor Interface

The `Processor` interface is for processing blocks using a given initial state.

### Function `Process`

`Process` processes the state changes according to the Ethereum rules by running the transaction messages using the statedb and applying any rewards to both the processor (coinbase) and any included uncles.

```go
func Process(block *types.Block, statedb *state.StateDB, cfg vm.Config) (types.Receipts, []*types.Log, uint64, error)
```

##### Parameters

- `block` - a block to process.
- `statedb` - a state database.
- `cfg` - a virtual machine configuration.

##### Return Values

- `types.Receipts` - receipts of the block.
- `[]*types.Log` - logs of the block.
- `uint64` - gas used in the block.
- `error` - an error, if any.