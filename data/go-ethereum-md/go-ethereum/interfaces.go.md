Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Ethereum Package

The `ethereum` package defines interfaces for interacting with Ethereum.

### Variables

#### `NotFound`

`NotFound` is an error variable that is returned by API methods if the requested item does not exist.

### Interfaces

#### `Subscription`

`Subscription` represents an event subscription where events are delivered on a data channel. It has two methods:

- `Unsubscribe()`: Cancels the sending of events to the data channel and closes the error channel.
- `Err() <-chan error`: Returns the subscription error channel. The error channel receives a value if there is an issue with the subscription (e.g. the network connection delivering the events has been closed). Only one value will ever be sent. The error channel is closed by `Unsubscribe`.

#### `ChainReader`

`ChainReader` provides access to the blockchain. The methods in this interface access raw data from either the canonical chain (when requesting by block number) or any blockchain fork that was previously downloaded and processed by the node. The block number argument can be nil to select the latest canonical block. Reading block headers should be preferred over full blocks whenever possible. The returned error is `NotFound` if the requested item does not exist. The interface has the following methods:

- `BlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error)`: Returns the block with the given hash.
- `BlockByNumber(ctx context.Context, number *big.Int) (*types.Block, error)`: Returns the block with the given number.
- `HeaderByHash(ctx context.Context, hash common.Hash) (*types.Header, error)`: Returns the header with the given hash.
- `HeaderByNumber(ctx context.Context, number *big.Int) (*types.Header, error)`: Returns the header with the given number.
- `TransactionCount(ctx context.Context, blockHash common.Hash) (uint, error)`: Returns the number of transactions in the block with the given hash.
- `TransactionInBlock(ctx context.Context, blockHash common.Hash, index uint) (*types.Transaction, error)`: Returns the transaction at the given index in the block with the given hash.
- `SubscribeNewHead(ctx context.Context, ch chan<- *types.Header) (Subscription, error)`: Subscribes to notifications about changes of the head block of the canonical chain.

#### `TransactionReader`

`TransactionReader` provides access to past transactions and their receipts. Implementations may impose arbitrary restrictions on the transactions and receipts that can be retrieved. Historic transactions may not be available. Avoid relying on this interface if possible. Contract logs (through the `LogFilterer` interface) are more reliable and usually safer in the presence of chain reorganizations. The returned error is `NotFound` if the requested item does not exist. The interface has the following method:

- `TransactionByHash(ctx context.Context, hash common.Hash) (*types.Transaction, bool, error)`: Checks the pool of pending transactions in addition to the blockchain. The `bool` return value indicates whether the transaction has been mined yet. Note that the transaction may not be part of the canonical chain even if it's mined.

### Example Usage

Here's an example of how you could use the `ChainReader` interface in your Go code:

```go
package main

import (
	"context"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethereum"
)

func main() {
	// Create a new Ethereum client
	client, err := ethereum.Dial("http://localhost:8545")
	if err != nil {
		panic(err)
	}

	// Get the latest block header
	header, err := client.HeaderByNumber(context.Background(), nil)
	if err != nil {
		panic(err)
	}

	// Print the block number and hash
	fmt.Printf("Latest block number: %v\n", header.Number)
	fmt.Printf("Latest block hash: %v\n", header.Hash())

	// Get the block with the given number
	blockNumber := big.NewInt(12345)
	block, err := client.BlockByNumber(context.Background(), blockNumber)
	if err != nil {
		panic(err)
	}

	// Print the number of transactions in the block
	numTransactions, err := client.TransactionCount(context.Background(), block.Hash())
	if err != nil {
		panic(err)
	}
	fmt.Printf("Block %v has %v transactions\n", blockNumber, numTransactions)
}
```

In this example, we create a new Ethereum client using the `Dial` function. We then use the `HeaderByNumber` method to get the latest block header, and print the block number and hash. We also use the `BlockByNumber` method to get a specific block, and the `TransactionCount` method to get the number of transactions in that block. Certainly, here's an example of how you could document the code you provided in Markdown format:

## TransactionReader Interface

The `TransactionReader` interface defines two functions that can be used to retrieve transaction information from the blockchain.

### Functions

#### `TransactionByHash(ctx context.Context, txHash common.Hash) (tx *types.Transaction, isPending bool, err error)`

This function is used to retrieve a transaction by its hash. It takes two parameters:

- `ctx` (context.Context): The context of the transaction.
- `txHash` (common.Hash): The hash of the transaction to retrieve.

The function returns the transaction, a boolean indicating whether the transaction is pending, and an error if one occurred.

#### `TransactionReceipt(ctx context.Context, txHash common.Hash) (*types.Receipt, error)`

This function is used to retrieve the receipt of a mined transaction. Note that the transaction may not be included in the current canonical chain even if a receipt exists. It takes two parameters:

- `ctx` (context.Context): The context of the transaction.
- `txHash` (common.Hash): The hash of the transaction to retrieve the receipt for.

The function returns the receipt of the transaction and an error if one occurred.

## ChainStateReader Interface

The `ChainStateReader` interface wraps access to the state trie of the canonical blockchain. Note that implementations of the interface may be unable to return state values for old blocks. In many cases, using `CallContract` can be preferable to reading raw contract storage.

### Functions

#### `BalanceAt(ctx context.Context, account common.Address, blockNumber *big.Int) (*big.Int, error)`

This function is used to retrieve the balance of an account at a specific block number. It takes three parameters:

- `ctx` (context.Context): The context of the transaction.
- `account` (common.Address): The address of the account to retrieve the balance for.
- `blockNumber` (*big.Int): The block number to retrieve the balance at.

The function returns the balance of the account and an error if one occurred.

#### `StorageAt(ctx context.Context, account common.Address, key common.Hash, blockNumber *big.Int) ([]byte, error)`

This function is used to retrieve the storage value of an account at a specific block number. It takes four parameters:

- `ctx` (context.Context): The context of the transaction.
- `account` (common.Address): The address of the account to retrieve the storage value for.
- `key` (common.Hash): The key of the storage value to retrieve.
- `blockNumber` (*big.Int): The block number to retrieve the storage value at.

The function returns the storage value of the account and an error if one occurred.

#### `CodeAt(ctx context.Context, account common.Address, blockNumber *big.Int) ([]byte, error)`

This function is used to retrieve the code of an account at a specific block number. It takes three parameters:

- `ctx` (context.Context): The context of the transaction.
- `account` (common.Address): The address of the account to retrieve the code for.
- `blockNumber` (*big.Int): The block number to retrieve the code at.

The function returns the code of the account and an error if one occurred.

#### `NonceAt(ctx context.Context, account common.Address, blockNumber *big.Int) (uint64, error)`

This function is used to retrieve the nonce of an account at a specific block number. It takes three parameters:

- `ctx` (context.Context): The context of the transaction.
- `account` (common.Address): The address of the account to retrieve the nonce for.
- `blockNumber` (*big.Int): The block number to retrieve the nonce at.

The function returns the nonce of the account and an error if one occurred.

## ChainSyncReader Interface

The `ChainSyncReader` interface wraps access to the node's current sync status. If there's no sync currently running, it returns nil.

### Functions

#### `SyncProgress(ctx context.Context) (*SyncProgress, error)`

This function is used to retrieve the progress of the node's current sync status. It takes one parameter:

- `ctx` (context.Context): The context of the transaction.

The function returns a `SyncProgress` struct containing progress indications when the node is synchronizing with the Ethereum network, and an error if one occurred.

## CallMsg Struct

The `CallMsg` struct contains parameters for contract calls.

### Fields

#### `From` (common.Address)

The sender of the 'transaction'.

#### `To` (*common.Address)

The destination contract (nil for contract creation).

#### `Gas` (uint64)

If 0, the call executes with near-infinite gas.

#### `GasPrice` (*big.Int)

Wei <-> gas exchange ratio.

#### `GasFeeCap` (*big.Int)

EIP-1559 fee cap per gas.

#### `GasTipCap` (*big.Int)

EIP-1559 tip per gas.

#### `Value` (*big.Int)

Amount of wei sent along with the call.

#### `Data` ([]byte)

Input data, usually an ABI-encoded contract method invocation.

#### `AccessList` (types.AccessList)

EIP-2930 access list.

## ContractCaller Interface

The `ContractCaller` interface provides contract calls, essentially transactions that are executed by the EVM but not mined into the blockchain. `ContractCall` is a low-level method to execute such calls. For applications which are structured around specific contracts, the `abigen` tool provides a nicer, properly typed way to perform contract calls.

### Functions

#### `ContractCall(ctx context.Context, call CallMsg, blockNumber *big.Int) ([]byte, error)`

This function is used to execute a contract call. It takes three parameters:

- `ctx` (context.Context): The context of the transaction.
- `call` (CallMsg): The parameters for the contract call.
- `blockNumber` (*big.Int): The block number to execute the contract call at.

The function returns the result of the contract call and an error if one occurred. Sure, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## ContractCaller Interface

The `ContractCaller` interface defines a single function that can be used to call a contract.

### Functions

#### `CallContract(ctx context.Context, call CallMsg, blockNumber *big.Int) ([]byte, error)`

This function is used to call a contract. It takes three parameters:

- `ctx` (context.Context): The context of the call.
- `call` (CallMsg): The message to send to the contract.
- `blockNumber` (*big.Int): The block number to use for the call.

## FilterQuery Struct

The `FilterQuery` struct contains options for contract log filtering.

### Fields

#### `BlockHash` (*common.Hash)

Used by `eth_getLogs`, return logs only from block with this hash.

#### `FromBlock` (*big.Int)

Beginning of the queried range, nil means genesis block.

#### `ToBlock` (*big.Int)

End of the range, nil means latest block.

#### `Addresses` ([]common.Address)

Restricts matches to events created by specific contracts.

#### `Topics` ([][]common.Hash)

The Topic list restricts matches to particular event topics. Each event has a list of topics. Topics matches a prefix of that list. An empty element slice matches any topic. Non-empty elements represent an alternative that matches any of the contained topics.

### Example Usage

Here's an example of how you could use the `FilterQuery` struct in your Solidity code:

```solidity
pragma solidity 0.6.12;

import "./FilterQuery.sol";

contract MyContract {
    FilterQuery public filterQuery;

    constructor(FilterQuery _filterQuery) public {
        filterQuery = _filterQuery;
    }

    function getLogs() external {
        // Get logs using the filter query
        types.Log[] memory logs = filterQuery.FilterLogs(ctx, filterQuery);
    }
}
```

In this example, we import the `FilterQuery` struct and define a `filterQuery` variable of type `FilterQuery`. We then use the `FilterLogs` function to get logs using the filter query.

## LogFilterer Interface

The `LogFilterer` interface provides access to contract log events using a one-off query or continuous event subscription.

### Functions

#### `FilterLogs(ctx context.Context, q FilterQuery) ([]types.Log, error)`

This function is used to filter logs. It takes two parameters:

- `ctx` (context.Context): The context of the call.
- `q` (FilterQuery): The filter query to use.

#### `SubscribeFilterLogs(ctx context.Context, q FilterQuery, ch chan<- types.Log) (Subscription, error)`

This function is used to subscribe to filtered logs. It takes three parameters:

- `ctx` (context.Context): The context of the call.
- `q` (FilterQuery): The filter query to use.
- `ch` (chan<- types.Log): The channel to send the logs to.

## TransactionSender Interface

The `TransactionSender` interface wraps transaction sending.

### Functions

#### `SendTransaction(ctx context.Context, tx *types.Transaction) error`

This function is used to send a transaction. It takes two parameters:

- `ctx` (context.Context): The context of the call.
- `tx` (*types.Transaction): The transaction to send.

## GasPricer Interface

The `GasPricer` interface wraps the gas price oracle.

### Functions

#### `SuggestGasPrice(ctx context.Context) (*big.Int, error)`

This function is used to suggest a gas price. It takes one parameter:

- `ctx` (context.Context): The context of the call.

## FeeHistory Struct

The `FeeHistory` struct provides recent fee market data that consumers can use to determine a reasonable `maxPriorityFeePerGas` value.

### Fields

#### `OldestBlock` (*big.Int)

Block corresponding to first response value.

#### `Reward` ([][]*big.Int)

List every txs priority fee per block.

#### `BaseFee` ([]*big.Int)

List of each block's base fee.

#### `GasUsedRatio` ([]float64)

Ratio of gas used out of the total available limit.

## PendingStateReader Interface

The `PendingStateReader` interface provides access to the pending state.

### Functions

#### `PendingBalanceAt(ctx context.Context, account common.Address) (*big.Int, error)`

This function is used to get the pending balance of an account. It takes two parameters:

- `ctx` (context.Context): The context of the call.
- `account` (common.Address): The address of the account.

#### `PendingStorageAt(ctx context.Context, account common.Address, key common.Hash) ([]byte, error)`

This function is used to get the pending storage of an account. It takes three parameters:

- `ctx` (context.Context): The context of the call.
- `account` (common.Address): The address of the account.
- `key` (common.Hash): The key of the storage.

#### `PendingCodeAt(ctx context.Context, account common.Address, blockNumber *big.Int) ([]byte, error)`

This function is used to get the pending code of an account. It takes three parameters:

- `ctx` (context.Context): The context of the call.
- `account` (common.Address): The address of the account.
- `blockNumber` (*big.Int): The block number to use for the call.

### Example Usage

Here's an example of how you could use the `PendingStateReader` interface in your Solidity code:

```solidity
pragma solidity 0.6.12;

import "./PendingStateReader.sol";

contract MyContract {
    PendingStateReader public pendingStateReader;

    constructor(PendingStateReader _pendingStateReader) public {
        pendingStateReader = _pendingStateReader;
    }

    function getPendingBalance(address _account) external {
        // Get the pending balance of an account using the pending state reader
        uint256 balance = pendingStateReader.PendingBalanceAt(ctx, _account);
    }
}
```

In this example, we import the `PendingStateReader` interface and define a `pendingStateReader` variable of type `PendingStateReader`. We then use the `PendingBalanceAt` function to get the pending balance of an account using the pending state reader. Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## PendingState Interface

The `PendingState` interface defines several functions that can be used to interact with the pending state of the Ethereum blockchain.

### Functions

#### `PendingBalanceAt(ctx context.Context, account common.Address) (*big.Int, error)`

This function is used to get the pending balance of an account. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `account` (common.Address): The address of the account to get the pending balance for.

#### `PendingCodeAt(ctx context.Context, account common.Address) ([]byte, error)`

This function is used to get the pending code at a specific address. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `account` (common.Address): The address to get the pending code for.

#### `PendingNonceAt(ctx context.Context, account common.Address) (uint64, error)`

This function is used to get the pending nonce of an account. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `account` (common.Address): The address of the account to get the pending nonce for.

#### `PendingTransactionCount(ctx context.Context) (uint, error)`

This function is used to get the number of pending transactions in the pending state. It takes one parameter:

- `ctx` (context.Context): The context of the request.

### PendingContractCaller Interface

The `PendingContractCaller` interface defines a single function that can be used to perform calls against the pending state.

#### `PendingCallContract(ctx context.Context, call CallMsg) ([]byte, error)`

This function is used to perform a call against the pending state. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `call` (CallMsg): The call message to use for the call.

### GasEstimator Interface

The `GasEstimator` interface defines a single function that can be used to estimate the gas needed to execute a specific transaction based on the pending state.

#### `EstimateGas(ctx context.Context, call CallMsg) (uint64, error)`

This function is used to estimate the gas needed to execute a specific transaction based on the pending state. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `call` (CallMsg): The call message to use for the estimation.

### PendingStateEventer Interface

The `PendingStateEventer` interface defines a single function that can be used to subscribe to real-time notifications about changes to the pending state.

#### `SubscribePendingTransactions(ctx context.Context, ch chan<- *types.Transaction) (Subscription, error)`

This function is used to subscribe to real-time notifications about changes to the pending state. It takes two parameters:

- `ctx` (context.Context): The context of the request.
- `ch` (chan<- *types.Transaction): The channel to send the notifications to.

### Example Usage

Here's an example of how you could use the `PendingState` interface in your Go code:

```go
import (
    "context"
    "fmt"
    "math/big"

    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/core/types"
)

func main() {
    // Create a new client
    client, err := ethclient.Dial("http://localhost:8545")
    if err != nil {
        log.Fatal(err)
    }

    // Get the pending balance of an account
    account := common.HexToAddress("0x123...")
    balance, err := client.PendingBalanceAt(context.Background(), account)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Pending balance:", balance)

    // Get the pending code at a specific address
    code, err := client.PendingCodeAt(context.Background(), account)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Pending code:", code)

    // Get the pending nonce of an account
    nonce, err := client.PendingNonceAt(context.Background(), account)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Pending nonce:", nonce)

    // Get the number of pending transactions in the pending state
    count, err := client.PendingTransactionCount(context.Background())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Pending transaction count:", count)

    // Perform a call against the pending state
    call := &ethereum.CallMsg{
        From:     common.HexToAddress("0x123..."),
        To:       common.HexToAddress("0x456..."),
        Gas:      100000,
        GasPrice: big.NewInt(1000000000),
        Value:    big.NewInt(0),
        Data:     []byte("data"),
    }
    result, err := client.PendingCallContract(context.Background(), *call)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Result:", result)

    // Estimate the gas needed to execute a specific transaction based on the pending state
    gas, err := client.EstimateGas(context.Background(), *call)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Gas estimate:", gas)

    // Subscribe to real-time notifications about changes to the pending state
    ch := make(chan *types.Transaction)
    sub, err := client.SubscribePendingTransactions(context.Background(), ch)
    if err != nil {
        log.Fatal(err)
    }
    defer sub.Unsubscribe()

    for {
        select {
        case tx := <-ch:
            fmt.Println("New pending transaction:", tx.Hash().Hex())
        case err := <-sub.Err():
            log.Fatal(err)
        }
    }
}
```

In this example, we create a new client and use the various functions provided by the `PendingState` interface to interact with the pending state of the Ethereum blockchain. We also use the `PendingContractCaller` interface to perform a call against the pending state, the `GasEstimator` interface to estimate the gas needed to execute a specific transaction based on the pending state, and the `PendingStateEventer` interface to subscribe to real-time notifications about changes to the pending state.