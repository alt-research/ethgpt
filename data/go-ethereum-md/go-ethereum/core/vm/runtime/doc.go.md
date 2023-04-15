# Runtime Package Documentation

The `runtime` package provides a basic execution model for executing EVM (Ethereum Virtual Machine) code.

## License

The `go-ethereum` library is free software released under the GNU Lesser General Public License. You can redistribute it and/or modify it under the terms of the license.

## Package Functions

### Function: CallContext

```go
func CallContext(vm *EVM, contract *Contract, input []byte, address common.Address, gas uint64, value *big.Int) ([]byte, error)
```

The `CallContext` function executes a contract call with the given input data, address, gas limit, and value. It returns the output data and an error if any.

### Function: NewEVM

```go
func NewEVM(ctx context.Context, contract *Contract, stateDB *state.StateDB, evmConfig *params.ChainConfig, author *common.Address, origin *common.Address, gasPrice *big.Int, blockNumber *big.Int, time *big.Int) *EVM
```

The `NewEVM` function creates a new EVM instance with the given context, contract, state database, EVM configuration, author, origin, gas price, block number, and time.

### Function: NewGasPool

```go
func NewGasPool(gas uint64) *GasPool
```

The `NewGasPool` function creates a new gas pool with the given gas limit.

### Function: Run

```go
func Run(evm *EVM, contract *Contract, input []byte) ([]byte, error)
```

The `Run` function executes the given contract with the given input data. It returns the output data and an error if any.

### Function: Transfer

```go
func Transfer(db *state.StateDB, sender, recipient common.Address, amount *big.Int)
```

The `Transfer` function transfers the given amount of ether from the sender to the recipient in the given state database.

## Types

### Type: Contract

```go
type Contract struct {
	Address common.Address
	Origin  common.Address
	Caller  common.Address
	Code    []byte
	Gas     uint64
	Data    []byte
	Value   *big.Int
}
```

The `Contract` type represents an EVM contract with its address, origin, caller, code, gas limit, input data, and value.

### Type: EVM

```go
type EVM struct {
	Context    context.Context
	Contract   *Contract
	StateDB    *state.StateDB
	EVMConfig  *params.ChainConfig
	Author     *common.Address
	Origin     *common.Address
	GasPool    *GasPool
	GasPrice   *big.Int
	BlockNumber *big.Int
	Time       *big.Int
}
```

The `EVM` type represents an EVM instance with its context, contract, state database, EVM configuration, author, origin, gas pool, gas price, block number, and time.

### Type: GasPool

```go
type GasPool struct {
	limit   uint64
	account uint64
}
```

The `GasPool` type represents a gas pool with its gas limit and account.