# Core Package

The `core` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the core functionality of the Ethereum blockchain, including the implementation of the Ethereum Virtual Machine (EVM) and the consensus algorithm.

## Variables

### `ErrKnownBlock`

`ErrKnownBlock` is an error that is returned when a block to import is already known locally.

### `ErrBannedHash`

`ErrBannedHash` is an error that is returned if a block to import is on the banned list.

### `ErrNoGenesis`

`ErrNoGenesis` is an error that is returned when there is no Genesis Block.

### `errSideChainReceipts`

`errSideChainReceipts` is an error that is returned when side blocks can't be accepted as ancient chain data.

### `ErrNonceTooLow`

`ErrNonceTooLow` is an error that is returned if the nonce of a transaction is lower than the one present in the local chain.

### `ErrNonceTooHigh`

`ErrNonceTooHigh` is an error that is returned if the nonce of a transaction is higher than the next one expected based on the local chain.

### `ErrNonceMax`

`ErrNonceMax` is an error that is returned if the nonce of a transaction sender account has maximum allowed value and would become invalid if incremented.

### `ErrGasLimitReached`

`ErrGasLimitReached` is an error that is returned by the gas pool if the amount of gas required by a transaction is higher than what's left in the block.

### `ErrInsufficientFundsForTransfer`

`ErrInsufficientFundsForTransfer` is an error that is returned if the transaction sender doesn't have enough funds for transfer (topmost call only).

### `ErrMaxInitCodeSizeExceeded`

`ErrMaxInitCodeSizeExceeded` is an error that is returned if creation transaction provides the init code bigger than init code size limit.

### `ErrInsufficientFunds`

`ErrInsufficientFunds` is an error that is returned if the total cost of executing a transaction is higher than the balance of the user's account.

### `ErrGasUintOverflow`

`ErrGasUintOverflow` is an error that is returned when calculating gas usage.

### `ErrIntrinsicGas`

`ErrIntrinsicGas` is an error that is returned if the transaction is specified to use less gas than required to start the invocation.

### `ErrTxTypeNotSupported`

`ErrTxTypeNotSupported` is an error that is returned if a transaction is not supported in the current network configuration.

### `ErrTipAboveFeeCap`

`ErrTipAboveFeeCap` is a sanity error to ensure no one is able to specify a transaction with a tip above the fee cap.

## Functions

### `NewBlockChain`

`NewBlockChain` creates a new blockchain instance with the given configuration.

```go
func NewBlockChain(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, txPool *TxPool, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `txPool` - the transaction pool.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithGenesis`

`NewBlockChainWithGenesis` creates a new blockchain instance with the given configuration and genesis block.

```go
func NewBlockChainWithGenesis(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, genesis *types.Block, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `genesis` - the genesis block.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainFromDatabase`

`NewBlockChainFromDatabase` creates a new blockchain instance from the given database.

```go
func NewBlockChainFromDatabase(db ethdb.Database, cacheConfig *CacheConfig, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithSwitch`

`NewBlockChainWithSwitch` creates a new blockchain instance with the given configuration and switch.

```go
func NewBlockChainWithSwitch(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, switcher *Switch, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `switcher` - the switch.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithHeaderValidator`

`NewBlockChainWithHeaderValidator` creates a new blockchain instance with the given configuration and header validator.

```go
func NewBlockChainWithHeaderValidator(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, headerValidator HeaderValidator, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `headerValidator` - the header validator.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithValidators`

`NewBlockChainWithValidators` creates a new blockchain instance with the given configuration and validators.

```go
func NewBlockChainWithValidators(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, validators *BlockValidator, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `validators` - the block validators.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithValidatorsAndSwitch`

`NewBlockChainWithValidatorsAndSwitch` creates a new blockchain instance with the given configuration, validators, and switch.

```go
func NewBlockChainWithValidatorsAndSwitch(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, validators *BlockValidator, switcher *Switch, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain configuration.
- `db` - the database to use for the blockchain.
- `cacheConfig` - the cache configuration.
- `validators` - the block validators.
- `switcher` - the switch.
- `engine` - the consensus engine.
- `vmConfig` - the EVM configuration.

#### Return Values

- `*BlockChain` - the new blockchain instance.
- `error` - an error, if any.

### `NewBlockChainWithValidatorsAndHeaderValidator`

`NewBlockChainWithValidatorsAndHeaderValidator` creates a new blockchain instance with the given configuration, validators, and header validator.

```go
func NewBlockChainWithValidatorsAndHeaderValidator(config *params.ChainConfig, db ethdb.Database, cacheConfig *CacheConfig, validators *BlockValidator, headerValidator HeaderValidator, engine consensus.Engine, vmConfig vm.Config) (*BlockChain, error)
```

#### Parameters

- `config` - the chain ## Function Errors

This file contains several error variables that are used throughout the codebase to indicate specific error conditions. These errors are used to provide more detailed information about why a particular function call failed.

### Error `ErrInsufficientFunds`

`ErrInsufficientFunds` is returned when the sender of a transaction does not have enough funds to cover the cost of the transaction.

### Error `ErrIntrinsicGas`

`ErrIntrinsicGas` is returned when the intrinsic gas cost of a transaction exceeds the gas limit.

### Error `ErrGasLimit`

`ErrGasLimit` is returned when the gas limit of a transaction is too low.

### Error `ErrNegativeValue`

`ErrNegativeValue` is returned when a transaction contains a negative value.

### Error `ErrOversizedData`

`ErrOversizedData` is returned when the data field of a transaction exceeds the maximum allowed size.

### Error `ErrGasUintOverflow`

`ErrGasUintOverflow` is returned when the gas limit of a transaction exceeds the maximum allowed value.

### Error `ErrNonceTooLow`

`ErrNonceTooLow` is returned when the nonce of a transaction is less than the nonce of the sender's account.

### Error `ErrNonceTooHigh`

`ErrNonceTooHigh` is returned when the nonce of a transaction is greater than the nonce of the sender's account.

### Error `ErrInsufficientBalance`

`ErrInsufficientBalance` is returned when the sender of a transaction does not have enough balance to cover the cost of the transaction.

### Error `ErrInsufficientGas`

`ErrInsufficientGas` is returned when the gas limit of a transaction is too low to execute the transaction.

### Error `ErrInvalidSignature`

`ErrInvalidSignature` is returned when the signature of a transaction is invalid.

### Error `ErrInvalidSender`

`ErrInvalidSender` is returned when the sender of a transaction is not a valid Ethereum address.

### Error `ErrInvalidRecipient`

`ErrInvalidRecipient` is returned when the recipient of a transaction is not a valid Ethereum address.

### Error `ErrInvalidValue`

`ErrInvalidValue` is returned when the value of a transaction is not a valid Ethereum value.

### Error `ErrInvalidGasPrice`

`ErrInvalidGasPrice` is returned when the gas price of a transaction is not a valid Ethereum gas price.

### Error `ErrInvalidGasLimit`

`ErrInvalidGasLimit` is returned when the gas limit of a transaction is not a valid Ethereum gas limit.

### Error `ErrTipAboveFeeCap`

`ErrTipAboveFeeCap` is returned when the maximum priority fee per gas is higher than the maximum fee per gas.

### Error `ErrTipVeryHigh`

`ErrTipVeryHigh` is returned when the maximum priority fee per gas is higher than 2^256-1.

### Error `ErrFeeCapVeryHigh`

`ErrFeeCapVeryHigh` is returned when the maximum fee per gas is higher than 2^256-1.

### Error `ErrFeeCapTooLow`

`ErrFeeCapTooLow` is returned when the maximum fee per gas is less than the base fee of the block.

### Error `ErrSenderNoEOA`

`ErrSenderNoEOA` is returned when the sender of a transaction is not an externally owned account.