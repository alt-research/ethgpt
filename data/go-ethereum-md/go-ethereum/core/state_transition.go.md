## Package `core`

The `core` package is a part of the go-ethereum library. It provides the core functionality for the Ethereum blockchain, including the execution of smart contracts and the validation of transactions.

### Type `ExecutionResult`

`ExecutionResult` is a struct that includes all output after executing a given EVM message, regardless of whether the execution itself is successful or not.

#### Field `UsedGas`

`UsedGas` is the total amount of gas used during the execution, including the refunded gas.

#### Field `Err`

`Err` is any error encountered during the execution, listed in `core/vm/errors.go`.

#### Field `ReturnData`

`ReturnData` is the returned data from the EVM, which can be either the function result or data supplied with the `REVERT` opcode.

#### Function `Unwrap`

`Unwrap` returns the internal EVM error, allowing for further analysis outside of the `ExecutionResult` struct.

```go
func (result *ExecutionResult) Unwrap() error
```

##### Return Values

- `error` - the internal EVM error.

#### Function `Failed`

`Failed` returns a boolean indicating whether the execution was successful or not.

```go
func (result *ExecutionResult) Failed() bool
```

##### Return Values

- `bool` - `true` if the execution failed, `false` otherwise.

#### Function `Return`

`Return` is a helper function that helps the caller distinguish between the revert reason and function return. It returns the data after execution if no error occurs.

```go
func (result *ExecutionResult) Return() []byte
```

##### Return Values

- `[]byte` - the data after execution if no error occurs, `nil` otherwise.

#### Function `Revert`

`Revert` returns the concrete revert reason if the execution is aborted by the `REVERT` opcode. Note that the reason can be `nil` if no data is supplied with the `REVERT` opcode.

```go
func (result *ExecutionResult) Revert() []byte
```

##### Return Values

- `[]byte` - the concrete revert reason if the execution is aborted by the `REVERT` opcode, `nil` otherwise.

### Function `IntrinsicGas`

`IntrinsicGas` computes the 'intrinsic gas' for a message with the given data.

```go
func IntrinsicGas(data []byte, accessList types.AccessList, isContractCreation bool, isHomestead, isEIP2028 bool, isEIP3860 bool) (uint64, error)
```

##### Parameters

- `data` - the data to compute the intrinsic gas for.
- `accessList` - the access list for the transaction.
- `isContractCreation` - a boolean indicating whether the transaction is a contract creation.
- `isHomestead` - a boolean indicating whether the transaction is in the Homestead phase.
- `isEIP2028` - a boolean indicating whether the transaction is in the EIP-2028 phase.
- `isEIP3860` - a boolean indicating whether the transaction is in the EIP-3860 phase.

##### Return Values

- `uint64` - the intrinsic gas for the message.
- `error` - an error, if any. ## Package `core`

The `core` package contains the core functionality of the Ethereum blockchain, including the state transition model, message processing, and gas calculation.

### Function `GasEstimateTxGas`

`GasEstimateTxGas` calculates the gas required for a transaction.

```go
func GasEstimateTxGas(tx *types.Transaction, isCreate bool, chainConfig *params.ChainConfig) (uint64, error)
```

##### Parameters

- `tx` - a transaction.
- `isCreate` - a boolean indicating whether the transaction is a contract creation.
- `chainConfig` - the chain configuration.

##### Return Values

- `uint64` - the gas required for the transaction.
- `error` - an error, if any.

### Function `toWordSize`

`toWordSize` returns the ceiled word size required for init code payment calculation.

```go
func toWordSize(size uint64) uint64
```

##### Parameters

- `size` - the size of the init code.

##### Return Values

- `uint64` - the ceiled word size required for init code payment calculation.

### Type `Message`

`Message` contains the data derived from a single transaction that is relevant to state processing.

#### Fields

- `To` - the recipient of the message.
- `From` - the sender of the message.
- `Nonce` - the nonce of the message.
- `Value` - the value of the message.
- `GasLimit` - the gas limit of the message.
- `GasPrice` - the gas price of the message.
- `GasFeeCap` - the gas fee cap of the message.
- `GasTipCap` - the gas tip cap of the message.
- `Data` - the data of the message.
- `AccessList` - the access list of the message.
- `SkipAccountChecks` - a boolean indicating whether to skip account checks.

#### Function `TransactionToMessage`

`TransactionToMessage` converts a transaction into a `Message`.

```go
func TransactionToMessage(tx *types.Transaction, s types.Signer, baseFee *big.Int) (*Message, error)
```

##### Parameters

- `tx` - a transaction.
- `s` - a signer.
- `baseFee` - the base fee.

##### Return Values

- `*Message` - the message.
- `error` - an error, if any.

### Function `ApplyMessage`

`ApplyMessage` computes the new state by applying the given message against the old state within the environment.

```go
func ApplyMessage(evm *vm.EVM, msg *Message, gp *GasPool) (*ExecutionResult, error)
```

##### Parameters

- `evm` - an EVM.
- `msg` - a message.
- `gp` - a gas pool.

##### Return Values

- `*ExecutionResult` - the bytes returned by any EVM execution (if it took place), the gas used (which includes gas refunds).
- `error` - an error, if any.

### Type `StateTransition`

`StateTransition` represents a state transition.

#### Fields

- `gp` - a gas pool.
- `msg` - a message.
- `gasRemaining` - the remaining gas.
- `initialGas` - the initial gas.
- `state` - a state database.
- `evm` - an EVM.

#### Function `NewStateTransition`

`NewStateTransition` initializes and returns a new `StateTransition` object.

```go
func NewStateTransition(evm *vm.EVM, msg *Message, gp *GasPool) *StateTransition
```

##### Parameters

- `evm` - an EVM.
- `msg` - a message.
- `gp` - a gas pool.

##### Return Values

- `*StateTransition` - a new `StateTransition` object.

#### Function `to`

`to` returns the recipient of the message.

```go
func (st *StateTransition) to() common.Address
```

##### Return Values

- `common.Address` - the recipient of the message. ## Package `core/state_transition.go`

The `core/state_transition.go` package contains the `StateTransition` struct and its associated methods. The `StateTransition` struct is responsible for transitioning the state of the Ethereum Virtual Machine (EVM) by applying the current message and returning the EVM execution result.

### Function `buyGas()`

The `buyGas()` function is a method of the `StateTransition` struct. It is responsible for checking if the sender of the current message has enough balance to cover the transaction fee (gas limit * gas price). If the sender does not have enough balance, an error is returned. If the sender has enough balance, the gas limit is subtracted from the gas pool, the gas remaining is updated, and the sender's balance is reduced by the transaction fee.

#### Parameters

None.

#### Return Values

- `error` - an error, if any.

### Function `preCheck()`

The `preCheck()` function is a method of the `StateTransition` struct. It is responsible for checking if the current message satisfies all consensus rules before applying the message. The rules include checking if the nonce of the message caller is correct, if the caller has enough balance to cover the transaction fee, and if the sender is an externally owned account (EOA). If any of these checks fail, an error is returned.

#### Parameters

None.

#### Return Values

- `error` - an error, if any.

### Function `TransitionDb()`

The `TransitionDb()` function is a method of the `StateTransition` struct. It is responsible for transitioning the state by applying the current message and returning the EVM execution result. The function first checks if the message satisfies all consensus rules before applying the message. If any consensus issue is encountered, the error is returned directly with nil EVM execution result. If the message satisfies all consensus rules, the `buyGas()` function is called to check if the sender has enough balance to cover the transaction fee. If the sender has enough balance, the EVM is executed and the execution result is returned.

#### Parameters

None.

#### Return Values

- `*ExecutionResult` - the EVM execution result.
- `error` - an error, if any. ## Function `RunStateTransition`

The `RunStateTransition` function executes a state transition for a given message. It performs a series of checks and operations to ensure that the state transition is valid and can be executed. If all checks pass, the function executes the state transition and returns an `ExecutionResult` struct containing the used gas, any errors that occurred during execution, and the return data.

### Parameters

- `st` - a pointer to a `StateTransition` struct.

### Return Values

- `*ExecutionResult` - a pointer to an `ExecutionResult` struct.
- `error` - an error, if any.

### Function `preCheck`

The `preCheck` function checks whether the message is valid and whether the caller has enough balance to cover the asset transfer for the topmost call.

### Parameters

None.

### Return Values

- `error` - an error, if any.

### Function `IntrinsicGas`

The `IntrinsicGas` function calculates the intrinsic gas for a given message. It takes into account the size of the message data, whether the message is a contract creation, and the current chain rules.

### Parameters

- `data` - a byte slice containing the message data.
- `accessList` - an `AccessList` struct containing the access list for the message.
- `contractCreation` - a boolean indicating whether the message is a contract creation.
- `isHomestead` - a boolean indicating whether the current chain rules are Homestead rules.
- `isIstanbul` - a boolean indicating whether the current chain rules are Istanbul rules.
- `isShanghai` - a boolean indicating whether the current chain rules are Shanghai rules.

### Return Values

- `uint64` - the intrinsic gas for the message.
- `error` - an error, if any.

### Function `to`

The `to` function returns the recipient of the message. If the message is a contract creation, it returns `nil`.

### Parameters

None.

### Return Values

- `common.Address` - the recipient of the message, or `nil` if the message is a contract creation.

### Function `refundGas`

The `refundGas` function applies the refund counter and returns any remaining gas to the caller.

### Parameters

- `refundQuotient` - a uint64 representing the refund quotient.

### Return Values

None. # Documentation for StateTransition Package

## Function `NewStateTransition`

`NewStateTransition` creates a new instance of the `StateTransition` struct.

```go
func NewStateTransition(env Environment, msg Message) *StateTransition
```

### Parameters

- `env` - an instance of the `Environment` struct.
- `msg` - an instance of the `Message` struct.

### Return Values

- `*StateTransition` - a new instance of the `StateTransition` struct.

## Function `TransitionDb`

`TransitionDb` executes a state transition on the Ethereum Virtual Machine (EVM).

```go
func TransitionDb(st *StateTransition) (ret []byte, err error)
```

### Parameters

- `st` - an instance of the `StateTransition` struct.

### Return Values

- `[]byte` - the return value of the executed contract.
- `error` - an error, if any.

## Function `TransitionCost`

`TransitionCost` calculates the cost of executing a state transition on the Ethereum Virtual Machine (EVM).

```go
func TransitionCost(st *StateTransition) (gasCost uint64, err error)
```

### Parameters

- `st` - an instance of the `StateTransition` struct.

### Return Values

- `uint64` - the cost of executing the state transition.
- `error` - an error, if any.

## Function `ApplyMessage`

`ApplyMessage` applies a message to the state.

```go
func ApplyMessage(evm *EVM, msg Message, gp GasPool) ([]byte, error)
```

### Parameters

- `evm` - an instance of the `EVM` struct.
- `msg` - an instance of the `Message` struct.
- `gp` - an instance of the `GasPool` struct.

### Return Values

- `[]byte` - the return value of the executed contract.
- `error` - an error, if any.

## Function `Execute`

`Execute` executes a contract on the Ethereum Virtual Machine (EVM).

```go
func Execute(evm *EVM, contract *Contract, input []byte, value *big.Int) ([]byte, error)
```

### Parameters

- `evm` - an instance of the `EVM` struct.
- `contract` - an instance of the `Contract` struct.
- `input` - the input data for the contract.
- `value` - the value to be transferred to the contract.

### Return Values

- `[]byte` - the return value of the executed contract.
- `error` - an error, if any.

## Function `gas`

`gas` returns the amount of gas available for the state transition.

```go
func (st *StateTransition) gas() uint64
```

### Parameters

None.

### Return Values

- `uint64` - the amount of gas available for the state transition.

## Function `useGas`

`useGas` uses up a specified amount of gas.

```go
func (st *StateTransition) useGas(amount uint64) {
	st.gasRemaining -= amount
	if st.gasRemaining < 0 {
		st.gasRemaining = 0
	}
}

### Parameters

- `amount` - the amount of gas to use up.

### Return Values

None.

## Function `refundGas`

`refundGas` refunds a specified amount of gas.

```go
func (st *StateTransition) refundGas(amount uint64) {
	st.gasRefund += amount
	if st.gasRefund > st.gasUsed() / 2 {
		st.gasRefund = st.gasUsed() / 2
	}
}

### Parameters

- `amount` - the amount of gas to refund.

### Return Values

None.

## Function `addGas`

`addGas` adds a specified amount of gas to the block gas counter so it is available for the next transaction.

```go
func (st *StateTransition) addGas(amount uint64) {
	st.gp.AddGas(amount)
}

### Parameters

- `amount` - the amount of gas to add.

### Return Values

None.

## Function `gasUsed`

`gasUsed` returns the amount of gas used up by the state transition.

```go
func (st *StateTransition) gasUsed() uint64 {
	return st.initialGas - st.gasRemaining
}

### Parameters

None.

### Return Values

- `uint64` - the amount of gas used up by the state transition.