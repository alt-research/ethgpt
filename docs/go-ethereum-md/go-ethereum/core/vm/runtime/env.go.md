# Runtime Package

The `runtime` package provides a function to create a new Ethereum Virtual Machine (EVM) environment.

## Function: NewEnv

```go
func NewEnv(cfg *Config) *vm.EVM {
	txContext := vm.TxContext{
		Origin:   cfg.Origin,
		GasPrice: cfg.GasPrice,
	}
	blockContext := vm.BlockContext{
		CanTransfer: core.CanTransfer,
		Transfer:    core.Transfer,
		GetHash:     cfg.GetHashFn,
		Coinbase:    cfg.Coinbase,
		BlockNumber: cfg.BlockNumber,
		Time:        cfg.Time,
		Difficulty:  cfg.Difficulty,
		GasLimit:    cfg.GasLimit,
		BaseFee:     cfg.BaseFee,
	}

	return vm.NewEVM(blockContext, txContext, cfg.State, cfg.ChainConfig, cfg.EVMConfig)
}
```

The `NewEnv` function creates a new EVM environment with the given configuration. It takes a `*Config` object as input and returns a pointer to a new `*vm.EVM` object.

The `*Config` object contains the following fields:

- `Origin`: the address of the transaction originator
- `GasPrice`: the gas price for the transaction
- `GetHashFn`: a function to retrieve the hash of a block by its number
- `Coinbase`: the address of the miner who mined the block
- `BlockNumber`: the number of the block being executed
- `Time`: the timestamp of the block being executed
- `Difficulty`: the difficulty of the block being executed
- `GasLimit`: the gas limit for the block being executed
- `BaseFee`: the base fee for the block being executed
- `State`: the state database for the EVM
- `ChainConfig`: the chain configuration for the EVM
- `EVMConfig`: the EVM configuration for the EVM

The `NewEnv` function creates a new `vm.TxContext` object with the `Origin` and `GasPrice` fields from the `*Config` object. It also creates a new `vm.BlockContext` object with the `CanTransfer`, `Transfer`, `GetHash`, `Coinbase`, `BlockNumber`, `Time`, `Difficulty`, `GasLimit`, and `BaseFee` fields from the `*Config` object.

Finally, the `NewEnv` function creates a new `*vm.EVM` object with the `blockContext`, `txContext`, `State`, `ChainConfig`, and `EVMConfig` fields from the `*Config` object.

Note that the `NewEnv` function is used to create a new EVM environment for executing smart contracts on the Ethereum blockchain.