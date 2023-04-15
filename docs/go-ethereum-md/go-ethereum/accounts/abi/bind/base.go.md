# Bind Package

The `bind` package provides a Go library for interacting with Ethereum smart contracts. It includes functions for calling contract methods, sending transactions, filtering events, and subscribing to events.

## Functions

### SignerFn

```go
type SignerFn func(common.Address, *types.Transaction) (*types.Transaction, error)
```

`SignerFn` is a callback function used when a contract requires a method to sign the transaction before submission.

- `common.Address`: the Ethereum account to send the transaction from.
- `*types.Transaction`: the transaction to sign.
- `(*types.Transaction, error)`: the signed transaction or an error.

### CallOpts

```go
type CallOpts struct {
    Pending     bool
    From        common.Address
    BlockNumber *big.Int
    Context     context.Context
}
```

`CallOpts` is a collection of options to fine-tune a contract call request.

- `Pending bool`: whether to operate on the pending state or the last known one.
- `From common.Address`: the sender address (optional).
- `BlockNumber *big.Int`: the block number on which the call should be performed (optional).
- `Context context.Context`: network context to support cancellation and timeouts (optional).

### TransactOpts

```go
type TransactOpts struct {
    From       common.Address
    Nonce      *big.Int
    Signer     SignerFn
    Value      *big.Int
    GasPrice   *big.Int
    GasFeeCap  *big.Int
    GasTipCap  *big.Int
    GasLimit   uint64
    Context    context.Context
    NoSend     bool
}
```

`TransactOpts` is a collection of authorization data required to create a valid Ethereum transaction.

- `From common.Address`: Ethereum account to send the transaction from.
- `Nonce *big.Int`: nonce to use for the transaction execution (optional).
- `Signer SignerFn`: method to use for signing the transaction (mandatory).
- `Value *big.Int`: funds to transfer along the transaction (optional).
- `GasPrice *big.Int`: gas price to use for the transaction execution (optional).
- `GasFeeCap *big.Int`: gas fee cap to use for the 1559 transaction execution (optional).
- `GasTipCap *big.Int`: gas priority fee cap to use for the 1559 transaction execution (optional).
- `GasLimit uint64`: gas limit to set for the transaction execution (optional).
- `Context context.Context`: network context to support cancellation and timeouts (optional).
- `NoSend bool`: do all transact steps but do not send the transaction.

### FilterOpts

```go
type FilterOpts struct {
    Start   uint64
    End     *uint64
    Context context.Context
}
```

`FilterOpts` is a collection of options to fine-tune filtering for events within a bound contract.

- `Start uint64`: start of the queried range.
- `End *uint64`: end of the range (optional).
- `Context context.Context`: network context to support cancellation and timeouts (optional).

### WatchOpts

```go
type WatchOpts struct {
    Start   *uint64
    Context context.Context
}
```

`WatchOpts` is a collection of options to fine-tune subscribing for events within a bound contract.

- `Start *uint64`: start of the queried range (optional).
- `Context context.Context`: network context to support cancellation and timeouts (optional).

### NewBoundContract

```go
func NewBoundContract(address common.Address, abi abi.ABI, backend Backend, caller Caller) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` struct with the given parameters.

- `address common.Address`: the address of the contract.
- `abi abi.ABI`: the ABI of the contract.
- `backend Backend`: the Ethereum backend to use.
- `caller Caller`: the Ethereum caller to use.

### (BoundContract) Call

```go
func (c *BoundContract) Call(opts *CallOpts, result interface{}, method string, args ...interface{}) error
```

`Call` calls the given contract method with the given arguments and stores the result in the given output variable.

- `opts *CallOpts`: the options for the call.
- `result interface{}`: the variable to store the result.
- `method string`: the name of the method to call.
- `args ...interface{}`: the arguments to pass to the method.

### (BoundContract) Transact

```go
func (c *BoundContract) Transact(opts *TransactOpts, method string, args ...interface{}) (*types.Transaction, error)
```

`Transact` sends a transaction to the given contract method with the given arguments.

- `opts *TransactOpts`: the options for the transaction.
- `method string`: the name of the method to call.
- `args ...interface{}`: the arguments to pass to the method.
- `(*types.Transaction, error)`: the transaction hash or an error.

### (BoundContract) FilterLogs

```go
func (c *BoundContract) FilterLogs(opts *FilterOpts, event string, args ...interface{}) ([]types.Log, error)
```

`FilterLogs` filters the contract logs for the given event and arguments.

- `opts *FilterOpts`: the options for the filter.
- `event string`: the name of the # MetaData

The `MetaData` struct represents the metadata of a contract. It contains the signature, bytecode, ABI, and an instance of the `abi.ABI` struct.

## GetAbi

```go
func (m *MetaData) GetAbi() (*abi.ABI, error)
```

`GetAbi` returns the `abi.ABI` struct of the contract. If the `abi.ABI` struct has not been initialized, it will parse the ABI string and initialize the `abi.ABI` struct.

# BoundContract

The `BoundContract` struct represents a contract on the Ethereum network. It contains the deployment address of the contract, an instance of the `abi.ABI` struct, and interfaces for reading, writing, and filtering events on the blockchain.

## NewBoundContract

```go
func NewBoundContract(address common.Address, abi abi.ABI, caller ContractCaller, transactor ContractTransactor, filterer ContractFilterer) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` struct with the given parameters.

- `address common.Address`: the deployment address of the contract.
- `abi abi.ABI`: the `abi.ABI` struct of the contract.
- `caller ContractCaller`: the interface for reading from the blockchain.
- `transactor ContractTransactor`: the interface for writing to the blockchain.
- `filterer ContractFilterer`: the interface for filtering events on the blockchain.

## DeployContract

```go
func DeployContract(opts *TransactOpts, abi abi.ABI, bytecode []byte, backend ContractBackend, params ...interface{}) (common.Address, *types.Transaction, *BoundContract, error)
```

`DeployContract` deploys a contract onto the Ethereum blockchain and returns a new `BoundContract` struct with the deployment address.

- `opts *TransactOpts`: the transaction options.
- `abi abi.ABI`: the `abi.ABI` struct of the contract.
- `bytecode []byte`: the bytecode of the contract.
- `backend ContractBackend`: the backend to use for the deployment.
- `params ...interface{}`: the constructor parameters.

## Call

```go
func (c *BoundContract) Call(opts *CallOpts, results *[]interface{}, method string, params ...interface{}) error
```

`Call` invokes a constant contract method with the given parameters and sets the output to the `results` parameter.

- `opts *CallOpts`: the call options.
- `results *[]interface{}`: the output of the method.
- `method string`: the name of the method.
- `params ...interface{}`: the input parameters of the method. ## BoundContract

The `BoundContract` struct represents a contract instance that is bound to a specific Ethereum address. It provides methods for interacting with the contract, such as calling its methods, sending transactions to it, and estimating gas costs.

### NewBoundContract

```go
func NewBoundContract(address common.Address, abi *abi.ABI, transactor Transactor) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` instance with the given Ethereum address, ABI, and transactor.

- `address common.Address`: the Ethereum address of the contract.
- `abi *abi.ABI`: the ABI of the contract.
- `transactor Transactor`: the transactor used to send transactions to the contract.

### Call

```go
func (c *BoundContract) Call(opts *CallOpts, method string, results interface{}, params ...interface{}) error
```

`Call` invokes the (unpaid) contract method with params as input values.

- `opts *CallOpts`: the options for the call.
- `method string`: the name of the method to call.
- `results interface{}`: the variable to store the results of the call.
- `params ...interface{}`: the input values of the method.

### Transact

```go
func (c *BoundContract) Transact(opts *TransactOpts, method string, params ...interface{}) (*types.Transaction, error)
```

`Transact` invokes the (paid) contract method with params as input values.

- `opts *TransactOpts`: the options for the transaction.
- `method string`: the name of the method to call.
- `params ...interface{}`: the input values of the method.

### RawTransact

```go
func (c *BoundContract) RawTransact(opts *TransactOpts, calldata []byte) (*types.Transaction, error)
```

`RawTransact` initiates a transaction with the given raw calldata as the input. It's usually used to initiate transactions for invoking **Fallback** function.

- `opts *TransactOpts`: the options for the transaction.
- `calldata []byte`: the raw calldata to send in the transaction.

### Transfer

```go
func (c *BoundContract) Transfer(opts *TransactOpts) (*types.Transaction, error)
```

`Transfer` initiates a plain transaction to move funds to the contract, calling its default method if one is available.

- `opts *TransactOpts`: the options for the transaction.

### createDynamicTx

```go
func (c *BoundContract) createDynamicTx(opts *TransactOpts, contract *common.Address, input []byte, head *types.Header) (*types.Transaction, error)
```

`createDynamicTx` creates a new dynamic fee transaction with the given options, contract address, input data, and block header.

- `opts *TransactOpts`: the options for the transaction.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.
- `head *types.Header`: the block header to use for estimating gas costs.

### createLegacyTx

```go
func (c *BoundContract) createLegacyTx(opts *TransactOpts, contract *common.Address, input []byte) (*types.Transaction, error)
```

`createLegacyTx` creates a new legacy transaction with the given options, contract address, and input data.

- `opts *TransactOpts`: the options for the transaction.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.

## Conclusion

The `BoundContract` struct provides a convenient way to interact with a specific instance of an Ethereum smart contract. It allows calling its methods, sending transactions to it, and estimating gas costs. The `Call`, `Transact`, `RawTransact`, and `Transfer` methods provide different ways to interact with the contract depending on the use case. The `createDynamicTx` and `createLegacyTx` methods are used internally to create transactions with the appropriate fee structure. ## Documentation for BoundContract Source Code

The `BoundContract` struct is a wrapper around a `Contract` instance that provides additional functionality for interacting with the contract on the Ethereum blockchain. The following is a detailed documentation of the functions in the `BoundContract` source code.

### on

```go
func (c *BoundContract) on(opts *TransactOpts, contract *common.Address, input []byte, value *big.Int, gasLimit uint64, gasPrice *big.Int) (*types.Transaction, error)
```

`on` is a helper function that creates a new transaction with the given parameters and returns it. It is used by other functions in the `BoundContract` struct.

- `opts *TransactOpts`: the transaction options.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.
- `value *big.Int`: the value to send with the transaction.
- `gasLimit uint64`: the gas limit for the transaction.
- `gasPrice *big.Int`: the gas price for the transaction.

### estimateGasLimit

```go
func (c *BoundContract) estimateGasLimit(opts *TransactOpts, contract *common.Address, input []byte, gasPrice, gasTipCap, gasFeeCap, value *big.Int) (uint64, error)
```

`estimateGasLimit` estimates the gas limit for a transaction with the given parameters.

- `opts *TransactOpts`: the transaction options.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.
- `gasPrice *big.Int`: the gas price for the transaction.
- `gasTipCap *big.Int`: the maximum tip per gas for the transaction.
- `gasFeeCap *big.Int`: the maximum fee per gas for the transaction.
- `value *big.Int`: the value to send with the transaction.

### getNonce

```go
func (c *BoundContract) getNonce(opts *TransactOpts) (uint64, error)
```

`getNonce` gets the nonce for a transaction with the given options.

- `opts *TransactOpts`: the transaction options.

### transact

```go
func (c *BoundContract) transact(opts *TransactOpts, contract *common.Address, input []byte) (*types.Transaction, error)
```

`transact` executes a transaction with the given options.

- `opts *TransactOpts`: the transaction options.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.

### FilterLogs

```go
func (c *BoundContract) FilterLogs(opts *FilterOpts, name string, query ...[]interface{}) (chan types.Log, event.Subscription, error)
```

`FilterLogs` filters contract logs for past blocks, returning the necessary channels to construct a strongly typed bound iterator on top of them.

- `opts *FilterOpts`: the filter options.
- `name string`: the name of the event to filter.
- `query ...[]interface{}`: the query parameters for the filter.

### createLegacyTx

```go
func (c *BoundContract) createLegacyTx(opts *TransactOpts, contract *common.Address, input []byte) (*types.Transaction, error)
```

`createLegacyTx` creates a new legacy transaction with the given options.

- `opts *TransactOpts`: the transaction options.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.

### createDynamicTx

```go
func (c *BoundContract) createDynamicTx(opts *TransactOpts, contract *common.Address, input []byte, head *types.Header) (*types.Transaction, error)
```

`createDynamicTx` creates a new dynamic transaction with the given options.

- `opts *TransactOpts`: the transaction options.
- `contract *common.Address`: the address of the contract.
- `input []byte`: the input data for the transaction.
- `head *types.Header`: the header of the block.

### NewBoundContract

```go
func NewBoundContract(address common.Address, abi abi.ABI, transactor Transactor) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` instance with the given parameters.

- `address common # BoundContract

The `BoundContract` struct represents a contract instance that has been bound to a specific Ethereum address. It provides methods for interacting with the contract, including calling functions and subscribing to events.

## Methods

### Call

```go
func (c *BoundContract) Call(opts *CallOpts, method string, args ...interface{}) ([]byte, error)
```

`Call` calls the specified method on the contract with the given arguments and returns the result.

- `opts *CallOpts`: optional call options.
- `method string`: the name of the method to call.
- `args ...interface{}`: the arguments to pass to the method.

### Transact

```go
func (c *BoundContract) Transact(opts *TransactOpts, method string, args ...interface{}) (*types.Transaction, error)
```

`Transact` sends a transaction to the contract to call the specified method with the given arguments.

- `opts *TransactOpts`: optional transaction options.
- `method string`: the name of the method to call.
- `args ...interface{}`: the arguments to pass to the method.

### FilterLogs

```go
func (c *BoundContract) FilterLogs(opts *FilterOpts, name string, query ...[]interface{}) (chan types.Log, event.Subscription, error)
```

`FilterLogs` filters past contract logs and returns a channel of logs that match the given query parameters.

- `opts *FilterOpts`: optional filter options.
- `name string`: the name of the event to filter.
- `query ...[]interface{}`: the query parameters to filter by.

### WatchLogs

```go
func (c *BoundContract) WatchLogs(opts *WatchOpts, name string, query ...[]interface{}) (chan types.Log, event.Subscription, error)
```

`WatchLogs` subscribes to contract logs for future blocks, returning a subscription object that can be used to tear down the watcher.

- `opts *WatchOpts`: optional watch options.
- `name string`: the name of the event to watch.
- `query ...[]interface{}`: the query parameters to watch for.

### UnpackLog

```go
func (c *BoundContract) UnpackLog(out interface{}, event string, log types.Log) error
```

`UnpackLog` unpacks a retrieved log into the provided output structure.

- `out interface{}`: the output structure to unpack the log into.
- `event string`: the name of the event to unpack.
- `log types.Log`: the log to unpack.

### UnpackLogIntoMap

```go
func (c *BoundContract) UnpackLogIntoMap(out map[string]interface{}, event string, log types.Log) error
```

`UnpackLogIntoMap` unpacks a retrieved log into the provided map.

- `out map[string]interface{}`: the map to unpack the log into.
- `event string`: the name of the event to unpack.
- `log types.Log`: the log to unpack.

### ensureContext

```go
func ensureContext(ctx context.Context) context.Context
```

`ensureContext` is a helper method to ensure a context is not nil, even if the user specified it as such.