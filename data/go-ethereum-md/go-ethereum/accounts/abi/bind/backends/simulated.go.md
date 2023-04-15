## SimulatedBackend

`SimulatedBackend` is a struct that implements `bind.ContractBackend` and simulates a blockchain in the background. Its main purpose is to allow for easy testing of contract bindings. It implements the following interfaces: `ChainReader`, `ChainStateReader`, `ContractBackend`, `ContractCaller`, `ContractFilterer`, `ContractTransactor`, `DeployBackend`, `GasEstimator`, `GasPricer`, `LogFilterer`, `PendingContractCaller`, `TransactionReader`, and `TransactionSender`.

### Variables

- `errBlockNumberUnsupported`: an error variable that is returned when attempting to access blocks other than the latest block.
- `errBlockDoesNotExist`: an error variable that is returned when attempting to access a block that does not exist in the blockchain.
- `errTransactionDoesNotExist`: an error variable that is returned when attempting to access a transaction that does not exist.

### Functions

#### NewSimulatedBackendWithDatabase

`NewSimulatedBackendWithDatabase` creates a new binding backend based on the given database and uses a simulated blockchain for testing purposes. It takes in an `ethdb.Database`, a `core.GenesisAlloc`, and a `gasLimit` as parameters and returns a pointer to a new `SimulatedBackend`.

#### Commit

`Commit` commits the current pending state to the blockchain and returns the resulting block. It takes in a `context.Context` as a parameter and returns a pointer to a `types.Block` and an error.

#### PendingNonceAt

`PendingNonceAt` retrieves the current pending nonce associated with an account. It takes in a `context.Context` and an `common.Address` as parameters and returns a `uint64` and an error.

#### PendingCodeAt

`PendingCodeAt` returns the code of the given account in the pending state. It takes in a `context.Context` and an `common.Address` as parameters and returns a byte slice and an error.

#### PendingBalanceAt

`PendingBalanceAt` retrieves the current pending balance of an account. It takes in a `context.Context` and an `common.Address` as parameters and returns a `*big.Int` and an error.

#### SuggestGasPrice

`SuggestGasPrice` retrieves the currently suggested gas price to allow a timely execution of a transaction. It takes in a `context.Context` as a parameter and returns a `*big.Int` and an error.

#### EstimateGas

`EstimateGas` returns an estimate of the amount of gas needed to execute a specific transaction based on the current pending state. It takes in a `context.Context`, a `bind.CallOpts`, and a `ethereum.CallMsg` as parameters and returns a `uint64` and an error.

#### CallContract

`CallContract` executes an Ethereum contract call with the specified data as the input. It takes in a `context.Context`, a `bind.CallOpts`, an `common.Address`, and a byte slice as parameters and returns a byte slice and an error.

#### PendingCallContract

`PendingCallContract` executes an Ethereum contract call against the pending state. It takes in a `context.Context`, a `bind.CallOpts`, an `common.Address`, and a byte slice as parameters and returns a byte slice and an error.

#### PendingTransactionCount

`PendingTransactionCount` retrieves the number of transactions currently pending in the transaction pool. It takes in a `context.Context` as a parameter and returns a `uint` and an error.

#### SendTransaction

`SendTransaction` sends a transaction to the network. It takes in a `context.Context` and a `*types.Transaction` as parameters and returns an error.

#### PendingCodeAtWithFallback

`PendingCodeAtWithFallback` returns the code of the given account in the pending state. If the account does not exist, it returns the code of the contract at the given address. It takes in a `context.Context` and an `common.Address` as parameters and returns a byte slice and an error.

#### PendingStorageAt

`PendingStorageAt` retrieves the value of a specific storage slot for a given account in the pending state. It takes in a `context.Context`, an `common.Address`, and a `common.Hash` as parameters and returns a `common.Hash` and an error.

#### PendingTransactionInPool

`PendingTransactionInPool` retrieves a transaction from the transaction pool by its hash. It takes in a `context.Context` and a `common.Hash` as parameters and returns a `*types.Transaction` and an error.

#### PendingLogs

`PendingLogs` retrieves the logs that would be returned by a hypothetical call to `FilterLogs` with the same filter options against the pending state. It takes in a `context.Context` and a `ethereum.FilterQuery` as parameters and returns a slice of `types.Log` and an error.

#### PendingCallContractWithFallback

`PendingCallContractWithFallback` executes an Ethereum contract call against the pending state. If the account does not exist, it returns the code of the contract at the given address. It takes in a `context.Context`, a `bind.CallOpts`, an `common.Address`, and a byte slice as parameters and returns a byte slice and an error.

#### PendingStorageAtWithFallback

`PendingStorageAtWithFallback` retrieves the value of a specific storage slot for a given account in the pending state. If the account does not exist, it returns the value of the storage slot of the contract at the given address. It takes in a `context.Context`, an `common.Address`, and a `common.Hash` as parameters and returns a `common.Hash` and an error.

#### PendingCodeAtWithFallback

`PendingCodeAtWithFallback` returns the code of the given account in the pending state. If the account does not exist, it returns the code of the contract at the given address. It takes in a `context.Context` and an `common.Address` as parameters and returns a byte slice and an error.

#### PendingNonceAtWithFallback

`PendingNonceAtWithFallback` retrieves the current pending nonce associated with an account. If the account does not exist, it returns the nonce of the contract at the given address. It takes in a `context.Context` and an `common.Address` as parameters and returns a `uint64` and an error.

#### PendingBalanceAtWithFallback

`PendingBalanceAtWithFallback` retrieves the current pending balance of an account. If the account does not exist, it returns the balance of the contract at the given address. It takes in a `context.Context` and an `common.Address` as parameters and returns a `*big.Int` and an error.

#### PendingTransactionInPoolWithFallback

`PendingTransactionInPoolWithFallback` retrieves a transaction from the transaction pool by its hash. If the transaction is not found, it returns the transaction from the contract at the given address. It takes in a `context.Context` and a `common.Hash` as parameters and returns a `*types.Transaction` and an error.

#### PendingLogs

`PendingLogs` retrieves the logs that would be returned by a hypothetical call to `FilterLogs` with the same filter options against the pending state. It takes in a `context.Context` and a `ethereum.FilterQuery` as parameters and returns a slice of `types.Log` and an error.

#### PendingState

`PendingState` returns the current pending state. It takes in a `context.Context` as a parameter and returns a `*state.StateDB` and an error.

#### PendingBlock

`PendingBlock` returns the current pending block. It takes in a `context.Context` as a parameter and returns a `*types.Block` and an error.

#### CommitBlock

`CommitBlock` commits a block to the blockchain. It takes in a `context.Context` and a `*types.Block` as parameters and returns an error.

#### CommitReceipts

`CommitReceipts` commits receipts to the blockchain. It takes in a `context.Context`, a `*types.Block`, and a slice of `*types.Receipt` as parameters and returns an error.

#### CommitBlockWithState

`CommitBlockWithState` commits a block to the blockchain with a given state. It takes in a `context.Context`, a `*types.Block`, and a `*state.StateDB` as parameters and returns an error.

#### CommitBlockWithReceipts

`CommitBlockWithReceipts` commits a block to the blockchain with given receipts. It takes in a `context.Context`, a `*types.Block`, a `*state.StateDB`, and a slice of `*types.Receipt` as parameters and returns an error.

#### CommitBlockWithStateAndReceipts

`CommitBlockWithStateAndReceipts` commits a block to the blockchain with a given state and receipts. It takes in a `context.Context`, a `*types.Block`, a `*state.StateDB`, and a slice of `*types.Receipt` as parameters and returns an error.

#### CurrentBlock

`CurrentBlock` returns the current block. It takes in a `context.Context` as a parameter and returns a `*types.Block` and an error.

#### BlockByHash

`BlockByHash` returns the block with the given hash. It takes in a `context.Context` and a `common.Hash` as parameters and returns a `*types.Block` and an error.

#### BlockByNumber

`BlockByNumber` returns the block with the given number. It takes in a `context.Context` and a `*big.Int` as parameters and returns a `*types.Block` and an error.

#### BlockNumber

`BlockNumber` returns the current block number. It takes in a `context.Context` as a parameter and returns a `*big.Int` and an error.

#### HeaderBy ## SimulatedBackend

The `SimulatedBackend` struct provides a simulated blockchain for testing purposes. It implements the `backend` interface, which is used to interact with the Ethereum blockchain.

### NewSimulatedBackend

`NewSimulatedBackend` creates a new binding backend using a simulated blockchain for testing purposes. It takes in a `GenesisAlloc` struct, which contains the initial allocation of Ether to accounts, and a `gasLimit` value, which sets the maximum amount of gas that can be used in a transaction.

### Close

`Close` terminates the underlying blockchain's update loop.

### Commit

`Commit` imports all the pending transactions as a single block and starts a fresh new state.

### Rollback

`Rollback` aborts all pending transactions, reverting to the last committed state.

### rollback

`rollback` is a helper function that creates a new block and state based on the parent block provided.

### Fork

`Fork` creates a side-chain that can be used to simulate reorgs. This function should be called with the ancestor block where the new side chain should be started. Transactions (old and new) can then be applied on top and committed.

### stateByBlockNumber

`stateByBlockNumber` retrieves a state by a given block number.

### CodeAt

`CodeAt` returns the code associated with a certain account in the blockchain. It takes in a `context.Context` object, a `common.Address` object representing the contract address, and a `blockNumber` value representing the block number to retrieve the code from. ## SimulatedBackend

The `SimulatedBackend` struct provides a simulated Ethereum blockchain backend for testing purposes. It implements the `Backend` interface, which defines the methods needed to interact with an Ethereum blockchain.

### Functions

#### CodeAt

`CodeAt` returns the code of the given contract address at the specified block number.

#### BalanceAt

`BalanceAt` returns the wei balance of a certain account in the blockchain at the specified block number.

#### NonceAt

`NonceAt` returns the nonce of a certain account in the blockchain at the specified block number.

#### StorageAt

`StorageAt` returns the value of key in the storage of an account in the blockchain at the specified block number.

#### TransactionReceipt

`TransactionReceipt` returns the receipt of a transaction with the given hash.

#### TransactionByHash

`TransactionByHash` checks the pool of pending transactions in addition to the blockchain. The `isPending` return value indicates whether the transaction has been mined yet. Note that the transaction may not be part of the canonical chain even if it's not pending.

#### BlockByHash

`BlockByHash` retrieves a block based on the block hash.

#### BlockByNumber

`BlockByNumber` retrieves a block from the database by number, caching it (associated with its hash) if found.

### Variables

#### ErrBlockDoesNotExist

`ErrBlockDoesNotExist` is an error variable that is returned when a block does not exist in the blockchain.

### Example Usage

```go
import (
	"context"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/ethdb"
	"github.com/ethereum/go-ethereum/eth/filters"
	"github.com/ethereum/go-ethereum/eth/tracers"
	"github.com/ethereum/go-ethereum/rpc"
)

func main() {
	// Create a new simulated backend
	backend := NewSimulatedBackend()

	// Deploy a contract
	contractAddress, _, _, err := DeployMyContract(backend, nil, "Hello, world!")
	if err != nil {
		log.Fatalf("Failed to deploy contract: %v", err)
	}

	// Get the contract code
	code, err := backend.CodeAt(context.Background(), contractAddress, nil)
	if err != nil {
		log.Fatalf("Failed to get contract code: %v", err)
	}
	fmt.Printf("Contract code: %x\n", code)

	// Get the contract balance
	balance, err := backend.BalanceAt(context.Background(), contractAddress, nil)
	if err != nil {
		log.Fatalf("Failed to get contract balance: %v", err)
	}
	fmt.Printf("Contract balance: %v\n", balance)

	// Get the contract nonce
	nonce, err := backend.NonceAt(context.Background(), contractAddress, nil)
	if err != nil {
		log.Fatalf("Failed to get contract nonce: %v", err)
	}
	fmt.Printf("Contract nonce: %v\n", nonce)

	// Get the contract storage value
	key := common.HexToHash("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
	value, err := backend.StorageAt(context.Background(), contractAddress, key, nil)
	if err != nil {
		log.Fatalf("Failed to get contract storage value: %v", err)
	}
	fmt.Printf("Contract storage value: %x\n", value)

	// Get the transaction receipt
	txHash := common.HexToHash("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
	receipt, err := backend.TransactionReceipt(context.Background(), txHash)
	if err != nil {
		log.Fatalf("Failed to get transaction receipt: %v", err)
	}
	fmt.Printf("Transaction receipt: %v\n", receipt)

	// Get the transaction by hash
	tx, isPending, err := backend.TransactionByHash(context.Background(), txHash)
	if err != nil {
		log.Fatalf("Failed to get transaction by hash: %v", err)
	}
	fmt.Printf("Transaction: %v, isPending: %v\n", tx, isPending)

	// Get the block by hash
	blockHash := common.HexToHash("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
	block, err := backend.BlockByHash(context.Background(), blockHash)
	if err != nil {
		log.Fatalf("Failed to get block by hash: %v", err)
	}
	fmt.Printf("Block: %v\n", block)

	// Get the block by number
	blockNumber := big.NewInt(12345)
	block, err = backend.BlockByNumber(context.Background(), blockNumber)
	if err != nil {
		log.Fatalf("Failed to get block by number: %v", err)
	}
	fmt.Printf("Block: %v\n", block)
}
``` This is a Go source code for a simulated Ethereum backend. The code provides a set of functions that allow interaction with the Ethereum blockchain. The functions include retrieving block headers, transaction counts, and transactions in a block. The code also includes a function for executing a contract call.

The `HeaderByHash` function returns a block header from the current canonical chain. If the hash is the same as the pending block hash, it returns the header of the pending block. Otherwise, it retrieves the header from the blockchain. If the header is not found, it returns an error.

The `HeaderByNumber` function returns a block header from the current canonical chain. If the block number is nil, it returns the latest known header. Otherwise, it retrieves the header from the blockchain. If the header is not found, it returns an error.

The `TransactionCount` function returns the number of transactions in a given block. If the block hash is the same as the pending block hash, it returns the number of transactions in the pending block. Otherwise, it retrieves the block from the blockchain. If the block is not found, it returns an error.

The `TransactionInBlock` function returns the transaction for a specific block at a specific index. If the block hash is the same as the pending block hash, it returns the transaction from the pending block. Otherwise, it retrieves the block from the blockchain. If the block is not found, it returns an error.

The `PendingCodeAt` function returns the code associated with an account in the pending state.

The `newRevertError` function creates a new `revertError` instance from an execution result. The `revertError` is an API error that encompasses an EVM revert with JSON error code and a binary data blob.

The `revertError` struct is an API error that encompasses an EVM revert with JSON error code and a binary data blob. It has two methods: `ErrorCode` and `ErrorData`. The `ErrorCode` method returns the JSON error code for a revert. The `ErrorData` method returns the hex encoded revert reason.

The `CallContract` function executes a contract call. It takes a `CallMsg` struct, which contains the data needed to execute the call. If the block number is not nil and is different from the current block number, it returns an error. Otherwise, it retrieves the state database from the blockchain and executes the contract call. If the call fails, it returns an error. ## SimulatedBackend

The `SimulatedBackend` struct provides a simulated Ethereum blockchain backend for testing purposes. It implements the `Backend` interface and provides methods for interacting with the simulated blockchain.

### callContract

`callContract` is a helper function that executes an Ethereum contract call with the specified data as the input. It takes a context, a `CallMsg`, a block header, and a state database as input parameters. It returns an `ExecutionResult` and an error.

### CallContract

`CallContract` executes an Ethereum contract call with the specified data as the input.

### PendingCallContract

`PendingCallContract` executes a contract call on the pending state.

### PendingNonceAt

`PendingNonceAt` retrieves the current pending nonce associated with an account.

### SuggestGasPrice

`SuggestGasPrice` returns a gas price of 1 for any call since the simulated chain doesn't have miners.

### SuggestGasTipCap

`SuggestGasTipCap` returns a gas tip of 1 for any call since the simulated chain doesn't have miners.

### EstimateGas

`EstimateGas` executes the requested code against the currently pending block/state and returns the used amount of gas. It takes a context and a `CallMsg` as input parameters. It returns the used amount of gas and an error.

## Conclusion

The `SimulatedBackend` struct provides a simulated Ethereum blockchain backend for testing purposes. It implements the `Backend` interface and provides methods for interacting with the simulated blockchain. The `callContract` function is a helper function that executes an Ethereum contract call with the specified data as the input. The `CallContract` method executes an Ethereum contract call with the specified data as the input. The `PendingCallContract` method executes a contract call on the pending state. The `PendingNonceAt` method retrieves the current pending nonce associated with an account. The `SuggestGasPrice` method returns a gas price of 1 for any call since the simulated chain doesn't have miners. The `SuggestGasTipCap` method returns a gas tip of 1 for any call since the simulated chain doesn't have miners. The `EstimateGas` method executes the requested code against the currently pending block/state and returns the used amount of gas. The `callContract` function is a helper function that implements common code between normal and pending contract calls. It takes in a `CallMsg` struct, a `Header` struct, and a `StateDB` struct as parameters. It returns an `ExecutionResult` struct and an error.

The function first checks if gas prices post 1559 need to be initialized. If both `GasPrice` and `(GasFeeCap or GasTipCap)` are specified, it returns an error. If there is no base fee, then it must be a non-1559 execution. If `GasPrice` is not specified, it sets `GasFeeCap` and `GasTipCap` to `GasPrice`. Otherwise, it sets `GasFeeCap` and `GasTipCap` to `GasPrice`. If a base fee is provided, it necessitates 1559-type execution. If `GasPrice` is specified, it converts to 1559 gas typing. Otherwise, it uses 1559 gas fields (or none) and backfills the legacy `GasPrice` for EVM execution, unless all fields are zeroes.

The function then ensures that the message is initialized properly. If `Gas` is not specified, it sets it to 50000000. If `Value` is not specified, it sets it to 0.

Next, it sets an infinite balance to the fake caller account. It then executes the call by creating a new `Message` struct and a new environment that holds all relevant information about the transaction and calling mechanisms. It then returns the result of the execution.

If there is an error during the execution, it returns the error. ## SimulatedBackend

`SimulatedBackend` is a struct that represents a simulated Ethereum blockchain backend. It implements the `Backend` interface and provides methods to interact with the blockchain.

### NewSimulatedBackend

`NewSimulatedBackend` creates a new `SimulatedBackend` instance with the given blockchain configuration and initial state.

### Commit

`Commit` commits the current pending state to the blockchain.

### HeaderByNumber

`HeaderByNumber` returns a block header from the current canonical chain. If the number is nil, the latest known header is returned.

### BlockByNumber

`BlockByNumber` returns a block from the current canonical chain. If the number is nil, the latest known block is returned.

### BlockByHash

`BlockByHash` returns a block from the current canonical chain with the given hash.

### TransactionByHash

`TransactionByHash` returns a transaction from the current canonical chain with the given hash.

### PendingNonceAt

`PendingNonceAt` retrieves the current pending nonce associated with an account.

### PendingBalanceAt

`PendingBalanceAt` retrieves the current pending balance of an account.

### CodeAt

`CodeAt` returns the code of the given account.

### CallContract

`CallContract` executes an Ethereum contract call with the specified data as the input.

### EstimateGas

`EstimateGas` estimates the gas needed to execute a specific transaction.

### SendTransaction

`SendTransaction` updates the pending block to include the given transaction.

### FilterLogs

`FilterLogs` executes a log filter operation, blocking during execution and returning all the results in one batch.

### SubscribeFilterLogs

`SubscribeFilterLogs` creates a background log filtering operation, returning a subscription immediately, which can be used to stream the found events.

### SubscribeNewHead

`SubscribeNewHead` returns an event subscription for a new header. ## SimulatedBackend

The `SimulatedBackend` struct provides a simulated Ethereum backend for testing purposes. It implements the `bind.ContractBackend` and `filters.Backend` interfaces.

### AdjustTime

`AdjustTime` adds a time shift to the simulated clock. It can only be called on empty blocks. It takes a `time.Duration` as input and returns an error if the pending block is not empty or if the parent block cannot be found.

### Blockchain

`Blockchain` returns the underlying blockchain.

### filterBackend

`filterBackend` implements `filters.Backend` to support filtering for logs without taking bloom-bits acceleration structures into account. It takes a `ethdb.Database`, a `*core.BlockChain`, and a `*SimulatedBackend` as input.

#### ChainDb

`ChainDb` returns the database.

#### EventMux

`EventMux` panics because it is not supported.

#### HeaderByNumber

`HeaderByNumber` returns the header for the given block number. It takes a `context.Context` and a `rpc.BlockNumber` as input and returns a `*types.Header` and an error.

#### HeaderByHash

`HeaderByHash` returns the header for the given block hash. It takes a `context.Context` and a `common.Hash` as input and returns a `*types.Header` and an error.

#### GetBody

`GetBody` returns the body for the given block hash and number. It takes a `context.Context`, a `common.Hash`, and a `rpc.BlockNumber` as input and returns a `*types.Body` and an error.

#### PendingBlockAndReceipts

`PendingBlockAndReceipts` returns the pending block and receipts.

#### GetReceipts

`GetReceipts` returns the receipts for the given block hash. It takes a `context.Context` and a `common.Hash` as input and returns a `types.Receipts` and an error.

#### GetLogs

`GetLogs` returns the logs for the given block hash and number. It takes a `context.Context`, a `common.Hash`, and a `uint64` as input and returns a `[][]*types.Log` and an error.

#### SubscribeNewTxsEvent

`SubscribeNewTxsEvent` returns a null subscription.

#### SubscribeChainEvent

`SubscribeChainEvent` subscribes to chain events and returns a subscription.

#### SubscribeRemovedLogsEvent

`SubscribeRemovedLogsEvent` subscribes to removed logs events and returns a subscription.

#### SubscribeLogsEvent

`SubscribeLogsEvent` subscribes to logs events and returns a subscription. # FilterBackend

The `FilterBackend` type is a struct that implements the `backend.FilterBackend` interface. It provides an implementation for the methods required to interact with Ethereum filters.

## Functions

### SubscribeLogsEvent

`SubscribeLogsEvent` subscribes to new logs that match the filter criteria and sends them to the provided channel. It returns an `event.Subscription` that can be used to unsubscribe from the event.

### SubscribePendingLogsEvent

`SubscribePendingLogsEvent` is not supported by the `FilterBackend` and always returns a null subscription.

### BloomStatus

`BloomStatus` returns the number of bytes used by the bloom filter and the number of hash functions used to generate the filter.

### ServiceFilter

`ServiceFilter` is not supported by the `FilterBackend` and always panics.

### ChainConfig

`ChainConfig` is not supported by the `FilterBackend` and always panics.

### CurrentHeader

`CurrentHeader` is not supported by the `FilterBackend` and always panics.

### nullSubscription

`nullSubscription` returns a null subscription that immediately returns when the provided quit channel is closed.