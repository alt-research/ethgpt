# Documentation for bind_test.go

This file contains the test cases for the `bind` package of the Ethereum Go client library. The `bind` package provides a high-level interface for interacting with Ethereum smart contracts.

## Functions

### mockSign

```go
func mockSign(addr common.Address, tx *types.Transaction) (*types.Transaction, error)
```

`mockSign` is a mock function that returns the given transaction without signing it.

- `addr common.Address`: the address to sign the transaction with.
- `tx *types.Transaction`: the transaction to sign.

### (mockTransactor) HeaderByNumber

```go
func (mt *mockTransactor) HeaderByNumber(ctx context.Context, number *big.Int) (*types.Header, error)
```

`HeaderByNumber` returns a mock header with the given base fee.

- `ctx context.Context`: the context of the header request.
- `number *big.Int`: the block number of the header.

### (mockTransactor) PendingCodeAt

```go
func (mt *mockTransactor) PendingCodeAt(ctx context.Context, account common.Address) ([]byte, error)
```

`PendingCodeAt` returns a mock code for the given account.

- `ctx context.Context`: the context of the code request.
- `account common.Address`: the address of the account.

### (mockTransactor) PendingNonceAt

```go
func (mt *mockTransactor) PendingNonceAt(ctx context.Context, account common.Address) (uint64, error)
```

`PendingNonceAt` returns a mock nonce for the given account.

- `ctx context.Context`: the context of the nonce request.
- `account common.Address`: the address of the account.

### (mockTransactor) SuggestGasPrice

```go
func (mt *mockTransactor) SuggestGasPrice(ctx context.Context) (*big.Int, error)
```

`SuggestGasPrice` returns a mock gas price.

- `ctx context.Context`: the context of the gas price request.

### (mockTransactor) SuggestGasTipCap

```go
func (mt *mockTransactor) SuggestGasTipCap(ctx context.Context) (*big.Int, error)
```

`SuggestGasTipCap` returns a mock gas tip cap.

- `ctx context.Context`: the context of the gas tip cap request.

### (mockTransactor) EstimateGas

```go
func (mt *mockTransactor) EstimateGas(ctx context.Context, call ethereum.CallMsg) (gas uint64, err error)
```

`EstimateGas` returns a mock gas estimate.

- `ctx context.Context`: the context of the gas estimate request.
- `call ethereum.CallMsg`: the call message to estimate gas for.

### (mockTransactor) SendTransaction

```go
func (mt *mockTransactor) SendTransaction(ctx context.Context, tx *types.Transaction) error
```

`SendTransaction` sends a mock transaction.

- `ctx context.Context`: the context of the transaction.
- `tx *types.Transaction`: the transaction to send.

### (mockCaller) CodeAt

```go
func (mc *mockCaller) CodeAt(ctx context.Context, contract common.Address, blockNumber *big.Int) ([]byte, error)
```

`CodeAt` returns a mock code for the given contract.

- `ctx context.Context`: the context of the code request.
- `contract common.Address`: the address of the contract.
- `blockNumber *big.Int`: the block number of the code.

### (mockCaller) CallContract

```go
func (mc *mockCaller) CallContract(ctx context.Context, call ethereum.CallMsg, blockNumber *big.Int) ([]byte, error)
```

`CallContract` returns a mock result for the given call message.

- `ctx context.Context`: the context of the call.
- `call ethereum.CallMsg`: the call message to execute.
- `blockNumber *big.Int`: the block number of the call.

### (mockPendingCaller) PendingCodeAt

```go
func (mc *mockPendingCaller) PendingCodeAt(ctx context.Context, contract common.Address) ([]byte, error)
```

`PendingCodeAt` returns a mock code for the given contract.

- `ctx context.Context`: the context of the code request.
- `contract common.Address`: the address of the contract.

### (mockPendingCaller) PendingCallContract

```go
func (mc *mockPendingCaller) PendingCallContract(ctx context.Context, call ethereum.CallMsg) ([]byte, error)
```

`PendingCallContract` returns a mock result for the given call message.

- `ctx context.Context`: the context of the call.
- `call ethereum.CallMsg`: the call message to execute.

## Types

### mockTransactor

`mockTransactor` is a mock implementation of the `Transactor` interface.

- `baseFee *big.Int`: the base fee of the mock header.
- `gasTipCap *big.Int`: the gas tip cap of the mock transaction.
- `gas ## Package Description

The `bind` package provides a Go implementation of the Ethereum Contract Bindings. It allows calling functions and events of Solidity contracts in a type-safe way.

## Methods

### Call

```go
func (c *BoundContract) Call(opts *CallOpts, result interface{}, method string, params ...interface{}) error
```

`Call` calls the given method of the contract with the given parameters and stores the result in the given output variable.

- `opts *CallOpts`: the call options.
- `result interface{}`: the variable to store the result.
- `method string`: the name of the method to call.
- `params ...interface{}`: the parameters of the method.

### NewBoundContract

```go
func NewBoundContract(address common.Address, abi abi.ABI, backend ContractBackend, transactor Transactor, opts ...BoundContractOption) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` struct with the given parameters.

- `address common.Address`: the address of the contract.
- `abi abi.ABI`: the ABI of the contract.
- `backend ContractBackend`: the backend to use for contract calls.
- `transactor Transactor`: the transactor to use for contract transactions.
- `opts ...BoundContractOption`: the options to use for the contract.

### UnpackLogIntoMap

```go
func (c *BoundContract) UnpackLogIntoMap(out interface{}, event string, log types.Log) error
```

`UnpackLogIntoMap` decodes the given log according to the ABI and stores the result in the given output variable.

- `out interface{}`: the variable to store the decoded result.
- `event string`: the name of the event to decode.
- `log types.Log`: the log to decode.

### Test Functions

The `bind` package also includes several test functions to ensure the correct functionality of the package. These functions include:

- `TestPassingBlockNumber`: tests passing a block number to a contract call.
- `TestUnpackIndexedStringTyLogIntoMap`: tests unpacking an indexed string type log into a map.
- `TestUnpackAnonymousLogIntoMap`: tests unpacking an anonymous log into a map.
- `TestUnpackIndexedSliceTyLogIntoMap`: tests unpacking an indexed slice type log into a map. ## Package Description

The `bind` package provides a Go implementation of the Ethereum Contract ABI (Application Binary Interface). It allows encoding and decoding of function calls and event logs, as well as generating Go bindings for Solidity contracts.

## Methods

### newMockLog

```go
func newMockLog(topics []common.Hash, data common.Hash) types.Log
```

`newMockLog` creates a new mock `types.Log` struct with the given parameters.

- `topics []common.Hash`: the topics of the log.
- `data common.Hash`: the data of the log.

### unpackAndCheck

```go
func unpackAndCheck(t *testing.T, bc *bind.BoundContract, expected map[string]interface{}, log types.Log)
```

`unpackAndCheck` decodes the given log according to the ABI and checks if the decoded values match the expected values.

- `t *testing.T`: the testing object.
- `bc *bind.BoundContract`: the bound contract.
- `expected map[string]interface{}`: the expected values.
- `log types.Log`: the log to decode.

### Test Functions

The `bind` package also includes several test functions to ensure the correct functionality of the package. These functions include:

- `TestUnpackIndexedAddressTyLogIntoMap`: tests the decoding of an indexed address type log into a map.
- `TestUnpackIndexedArrayTyLogIntoMap`: tests the decoding of an indexed array type log into a map.
- `TestUnpackIndexedFuncTyLogIntoMap`: tests the decoding of an indexed function type log into a map.
- `TestUnpackIndexedBytesTyLogIntoMap`: tests the decoding of an indexed bytes type log into a map.

## Conclusion

The `bind` package provides a convenient way to interact with Ethereum smart contracts in Go. It allows encoding and decoding of function calls and event logs, as well as generating Go bindings for Solidity contracts. The test functions ensure the correct functionality of the package. ## Documentation for Source Code

### Function: TestTransact

This function tests the `Transact` function of the `bind.BoundContract` struct. It creates a mock transaction and checks if the received map is equal to the expected map.

### Function: TestTransactGasFee

This function tests the `Transact` function of the `bind.BoundContract` struct with regards to gas fees. It checks if the gas tip cap and gas fee cap are correctly calculated when `opts.GasTipCap` and `opts.GasFeeCap` are nil. It also checks if the latest suggested gas tip cap is used in the second call to `Transact`. It then checks if the gas price is correctly calculated when `opts.GasPrice` is nil. It also checks if the latest suggested gas price is used in the second call to `Transact`.

### Function: unpackAndCheck

This function unpacks a log according to the ABI and checks if the received map is equal to the expected map.

### Function: newMockLog

This function creates a new mock log with the given topics and transaction hash.

### Function: TestCall

This function tests the `Call` function of the `bind.BoundContract` struct. It checks if the correct error is returned when the method is not found. It also checks if the correct error is returned when `opts.Pending` is true but the contract caller is not a `PendingContractCaller`. Finally, it checks if the correct error is returned when the packer returns an error. ## Package Description

The `abi` package provides a Go implementation of the Ethereum Contract ABI (Application Binary Interface). It allows encoding and decoding of function calls and event logs, as well as generating Go bindings for Solidity contracts.

## Methods

### Call

```go
func (bc *BoundContract) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error
```

`Call` executes a contract function call and stores the result in the given output variable.

- `opts *bind.CallOpts`: the call options.
- `result interface{}`: the variable to store the result.
- `method string`: the name of the function to call.
- `params ...interface{}`: the input parameters of the function.

### NewBoundContract

```go
func NewBoundContract(address common.Address, abi abi.ABI, backend bind.ContractBackend, transactor bind.TransactOpts, opts ...bind.ContractCallOpts) *BoundContract
```

`NewBoundContract` creates a new `BoundContract` struct with the given parameters.

- `address common.Address`: the address of the contract.
- `abi abi.ABI`: the ABI of the contract.
- `backend bind.ContractBackend`: the backend to use for contract calls.
- `transactor bind.TransactOpts`: the transaction options.
- `opts ...bind.ContractCallOpts`: the call options.

### JSON

```go
func JSON(r io.Reader) (ABI, error)
```

`JSON` parses a JSON-encoded ABI and returns an `ABI` struct.

- `r io.Reader`: the reader containing the JSON-encoded ABI.

### (ABI) Pack

```go
func (a ABI) Pack(name string, args ...interface{}) ([]byte, error)
```

`Pack` encodes the given arguments according to the ABI and returns the encoded data.

- `name string`: the name of the function to encode.
- `args ...interface{}`: the arguments to encode.

### (ABI) Unpack

```go
func (a ABI) Unpack(name string, data []byte, output interface{}, inputs ...interface{}) error
```

`Unpack` decodes the given data according to the ABI and stores the result in the given output variable.

- `name string`: the name of the function to decode.
- `data []byte`: the data to decode.
- `output interface{}`: the variable to store the decoded result.
- `inputs ...interface{}`: the input arguments of the function.

### (ABI) EventByID

```go
func (a ABI) EventByID(id common.Hash) (Event, bool)
```

`EventByID` returns the event with the given ID.

- `id common.Hash`: the ID of the event.

### (ABI) Events

```go
func (a ABI) Events() map[string]Event
```

`Events` returns a map of all events in the ABI.

### (ABI) MethodByID

```go
func (a ABI) MethodByID(id common.Hash) (Method, bool)
```

`MethodByID` returns the method with the given ID.

- `id common.Hash`: the ID of the method.

### (ABI) Methods

```go
func (a ABI) Methods() map[string]Method
```

`Methods` returns a map of all methods in the ABI.

### (ABI) UnpackLog

```go
func (a ABI) UnpackLog(out interface{}, event string, log types.Log) error
```

`UnpackLog` decodes the given log according to the ABI and stores the result in the given output variable.

- `out interface{}`: the variable to store the decoded result.
- `event string`: the name of the event to decode.
- `log types.Log`: the log to decode.

### (ABI) UnpackLogIntoMap

```go
func (a ABI) UnpackLogIntoMap(event string, log types.Log) (map[string]interface{}, error)
```

`UnpackLogIntoMap` decodes the given log according to the ABI and returns a map of the decoded values.

- `event string`: the name of the event to decode.
- `log types.Log`: the log to decode.

### (ABI) UnpackLogIntoMapWithNames

```go
func (a ABI) UnpackLogIntoMapWithNames(event string, log types.Log) (map[string]interface{}, error)
```

`UnpackLogIntoMapWithNames` decodes the given log according to the ABI and returns a map of the decoded values with their names.

- `event string`: the name of the event to decode.
- `log types.Log`: the log to decode.

### (ABI) UnpackLogWithNames

```go
func (a ABI) UnpackLogWithNames(event string, log types.Log) (map[string]interface{}, error)
```

`UnpackLogWithNames` decodes the given log according to the ABI and returns a map of the decoded values with their names.

- `event string`: the name of the event to decode.
- `log types.Log`: the log to decode.

### (ABI) UnpackLogWithSignature

```go
func (a ABI) UnpackLogWithSignature(signature string, log types.Log) (map[string]interface{}, error)
```

`UnpackLogWithSignature` decodes the given log according to the ABI and returns a map of the decoded values.

- `signature string`: the signature of the event to decode.
- `log types.Log`: the log to decode.

### (ABI)