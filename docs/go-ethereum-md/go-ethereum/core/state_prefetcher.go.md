# Documentation for the `core` package

This package contains the core functionality of the Ethereum blockchain, including the block chain, state, transactions, and the Ethereum Virtual Machine (EVM).

## Type `statePrefetcher`

The `statePrefetcher` type is a basic Prefetcher that executes a block on top of an arbitrary state with the goal of prefetching potentially useful state data from disk before the main block processor starts executing.

### Function `newStatePrefetcher`

`newStatePrefetcher` initializes a new `statePrefetcher`.

```go
func newStatePrefetcher(config *params.ChainConfig, bc *BlockChain, engine consensus.Engine) *statePrefetcher
```

##### Parameters

- `config` - the chain configuration options.
- `bc` - the canonical block chain.
- `engine` - the consensus engine used for block rewards.

##### Return Values

- `*statePrefetcher` - a new `statePrefetcher`.

### Function `Prefetch`

`Prefetch` processes the state changes according to the Ethereum rules by running the transaction messages using the statedb, but any changes are discarded. The only goal is to pre-cache transaction signatures and state trie nodes.

```go
func (p *statePrefetcher) Prefetch(block *types.Block, statedb *state.StateDB, cfg vm.Config, interrupt *atomic.Bool)
```

##### Parameters

- `block` - the block to prefetch.
- `statedb` - the state database.
- `cfg` - the EVM configuration.
- `interrupt` - a flag indicating whether the prefetching process has been interrupted.

### Function `precacheTransaction`

`precacheTransaction` attempts to apply a transaction to the given state database and uses the input parameters for its environment. The goal is not to execute the transaction successfully, rather to warm up touched data slots.

```go
func precacheTransaction(msg *Message, config *params.ChainConfig, gaspool *GasPool, statedb *state.StateDB, header *types.Header, evm *vm.EVM) error
```

##### Parameters

- `msg` - the message to pre-cache.
- `config` - the chain configuration options.
- `gaspool` - the gas pool.
- `statedb` - the state database.
- `header` - the block header.
- `evm` - the Ethereum Virtual Machine.

##### Return Values

- `error` - an error, if any. ## Function `UpdateEVM`

The `UpdateEVM` function updates the Ethereum Virtual Machine (EVM) with a new transaction context and applies the message to the EVM. 

### Parameters

- `evm` - an instance of the EVM to be updated.
- `msg` - the message to be applied to the EVM.
- `statedb` - the state database to be used by the EVM.
- `gaspool` - the gas pool to be used by the EVM.

### Return Value

- `error` - an error, if any.

### Example Usage

```go
txContext := NewEVMTxContext(msg)
evm.Reset(txContext, statedb)
_, err := ApplyMessage(evm, msg, gaspool)
if err != nil {
    // handle error
}
```

In this example, `UpdateEVM` is used to update the EVM with a new transaction context `txContext`, and then applies the message `msg` to the EVM using the `ApplyMessage` function. If an error occurs during the application of the message, it is returned.