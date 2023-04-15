## Overview

This code is part of the `go-ethereum` library, which is a free and open-source software for building decentralized applications on the Ethereum blockchain. The `bind` package provides a set of tools for interacting with Ethereum smart contracts in Go.

The code defines two functions, `WaitMined` and `WaitDeployed`, which are used to wait for a transaction to be mined on the blockchain and for a contract deployment transaction to be mined and return the on-chain contract address, respectively.

## Functions

### WaitMined

```go
func WaitMined(ctx context.Context, b DeployBackend, tx *types.Transaction) (*types.Receipt, error)
```

`WaitMined` waits for a transaction to be mined on the blockchain. It takes three arguments:

- `ctx`: a context.Context object that can be used to cancel the operation.
- `b`: a `DeployBackend` interface that provides access to the Ethereum blockchain.
- `tx`: a pointer to a `types.Transaction` object that represents the transaction to wait for.

The function returns a pointer to a `types.Receipt` object that contains the transaction receipt, or an error if the operation fails.

### WaitDeployed

```go
func WaitDeployed(ctx context.Context, b DeployBackend, tx *types.Transaction) (common.Address, error)
```

`WaitDeployed` waits for a contract deployment transaction to be mined and returns the on-chain contract address. It takes three arguments:

- `ctx`: a context.Context object that can be used to cancel the operation.
- `b`: a `DeployBackend` interface that provides access to the Ethereum blockchain.
- `tx`: a pointer to a `types.Transaction` object that represents the contract deployment transaction to wait for.

The function returns a `common.Address` object that represents the on-chain contract address, or an error if the operation fails.

## License

The code is licensed under the GNU Lesser General Public License version 3 or later.