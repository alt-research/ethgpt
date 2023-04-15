# Documentation for go-ethereum runtime package

The `runtime` package in go-ethereum provides a virtual machine for executing Ethereum smart contracts. This package contains functions for executing EVM bytecode and returning the result.

## Function: Execute

```go
func Execute(code []byte, input []byte, config *Config) ([]byte, uint64, error)
```

The `Execute` function takes three arguments: `code`, `input`, and `config`. `code` is the bytecode of the smart contract to be executed, `input` is the input data for the contract, and `config` is an optional configuration object.

The function returns three values: `output`, `gasUsed`, and `err`. `output` is the output data from the contract, `gasUsed` is the amount of gas used during execution, and `err` is any error that occurred during execution.

## Function: Config

```go
type Config struct {
	Origin      common.Address // Provides information about the original transaction that initiated this execution
	Coinbase    common.Address // Provides information about the miner that mined this block
	BlockNumber *big.Int       // Provides information about the current block number
	Time        *big.Int       // Provides information about the current block timestamp
	Difficulty  *big.Int       // Provides information about the current block difficulty
	GasLimit    uint64         // Provides information about the current block gas limit
}
```

The `Config` type is a struct that contains configuration information for the EVM. It includes information about the origin of the transaction, the miner that mined the block, the current block number, timestamp, difficulty, and gas limit.

## Function: ExampleExecute

```go
func ExampleExecute()
```

The `ExampleExecute` function is an example of how to use the `Execute` function. It takes no arguments and returns no values. It executes a simple smart contract and prints the output to the console.