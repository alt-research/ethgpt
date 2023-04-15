# Bind Package

The `bind` package provides a set of interfaces and functions to interact with Ethereum smart contracts. It allows read-only and write-only operations on a contract, including contract deployment, function calls, and event listening.

## Variables

### ErrNoCode

`ErrNoCode` is an error variable that is returned by call and transact operations when the requested recipient contract to operate on does not exist in the state db or does not have any code associated with it.

### ErrNoPendingState

`ErrNoPendingState` is an error variable that is raised when attempting to perform a pending state action on a backend that doesn't implement `PendingContractCaller`.

### ErrNoCodeAfterDeploy

`ErrNoCodeAfterDeploy` is an error variable that is returned by `WaitDeployed` if contract creation leaves an empty contract behind.

## Interfaces

### ContractCaller

`ContractCaller` is an interface that defines the methods needed to allow operating with a contract on a read-only basis.

#### CodeAt

`CodeAt` returns the code of the given account. This is needed to differentiate between contract internal errors and the local chain being out of sync.

#### CallContract

`CallContract` executes an Ethereum contract call with the specified data as the input.

### PendingContractCaller

`PendingContractCaller` is an interface that defines methods to perform contract calls on the pending state. `Call` will try to discover this interface when access to the pending state is requested. If the backend does not support the pending state, `Call` returns `ErrNoPendingState`.

#### PendingCodeAt

`PendingCodeAt` returns the code of the given account in the pending state.

#### PendingCallContract

`PendingCallContract` executes an Ethereum contract call against the pending state.

### ContractTransactor

`ContractTransactor` is an interface that defines the methods needed to allow operating with a contract on a write-only basis. Besides the transacting method, the remainder are helpers used when the user does not provide some needed values but rather leaves it up to the transactor to decide.

#### HeaderByNumber

`HeaderByNumber` returns a block header from the current canonical chain. If the number is nil, the latest known header is returned.

#### PendingCodeAt

`PendingCodeAt` returns the code of the given account in the pending state.

#### PendingNonceAt

`PendingNonceAt` retrieves the current pending nonce associated with an account.

## Functions

### WaitDeployed

`WaitDeployed` waits for the contract to be deployed and returns the contract instance. If the contract creation leaves an empty contract behind, it returns `ErrNoCodeAfterDeploy`.

### NewBoundContract

`NewBoundContract` creates a new `BoundContract` instance with the given contract address and ABI.

### NewBoundContractAtAddress

`NewBoundContractAtAddress` creates a new `BoundContract` instance with the given contract address and ABI, and sets the caller and transactor.

### NewBoundContractTransactor

`NewBoundContractTransactor` creates a new `BoundContractTransactor` instance with the given contract address and ABI, and sets the transactor.

### NewBoundContractCaller

`NewBoundContractCaller` creates a new `BoundContractCaller` instance with the given contract address and ABI, and sets the caller.

### NewBoundContractFilterer

`NewBoundContractFilterer` creates a new `BoundContractFilterer` instance with the given contract address and ABI, and sets the caller.

### NewBoundContractTransactorWithOpts

`NewBoundContractTransactorWithOpts` creates a new `BoundContractTransactor` instance with the given contract address and ABI, and sets the transactor with the given options.

### NewBoundContractCallerWithOpts

`NewBoundContractCallerWithOpts` creates a new `BoundContractCaller` instance with the given contract address and ABI, and sets the caller with the given options.

### NewBoundContractFiltererWithOpts

`NewBoundContractFiltererWithOpts` creates a new `BoundContractFilterer` instance with the given contract address and ABI, and sets the caller with the given options.

### NewBoundContractBackend

`NewBoundContractBackend` creates a new `BoundContractBackend` instance with the given contract address and ABI, and sets the backend.

### NewBoundContractTransactorBackend

`NewBoundContractTransactorBackend` creates a new `BoundContractTransactorBackend` instance with the given contract address and ABI, and sets the transactor and backend.

### NewBoundContractCallerBackend

`NewBoundContractCallerBackend` creates a new `BoundContractCallerBackend` instance with the given contract address and ABI, and sets the caller and backend.

### NewBoundContractFiltererBackend

`NewBoundContractFiltererBackend` creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend.

### NewBoundContractTransactorBackendWithOpts

`NewBoundContractTransactorBackendWithOpts` creates a new `BoundContractTransactorBackend` instance with the given contract address and ABI, and sets the transactor and backend with the given options.

### NewBoundContractCallerBackendWithOpts

`NewBoundContractCallerBackendWithOpts` creates a new `BoundContractCallerBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options.

### NewBoundContractFiltererBackendWithOpts

`NewBoundContractFiltererBackendWithOpts` creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options The code snippet provided contains several interfaces and functions that are used to interact with the Ethereum blockchain. Here is a brief explanation of each function and interface:

1. `SuggestGasPrice(ctx context.Context) (*big.Int, error)`: This function retrieves the currently suggested gas price to allow a timely execution of a transaction. It takes a context as input and returns a big integer and an error.

2. `SuggestGasTipCap(ctx context.Context) (*big.Int, error)`: This function retrieves the currently suggested 1559 priority fee to allow a timely execution of a transaction. It takes a context as input and returns a big integer and an error.

3. `EstimateGas(ctx context.Context, call ethereum.CallMsg) (gas uint64, err error)`: This function tries to estimate the gas needed to execute a specific transaction based on the current pending state of the backend blockchain. It takes a context and a CallMsg as input and returns a gas value and an error.

4. `SendTransaction(ctx context.Context, tx *types.Transaction) error`: This function injects the transaction into the pending pool for execution. It takes a context and a Transaction as input and returns an error.

5. `ContractFilterer`: This interface defines the methods needed to access log events using one-off queries or continuous event subscriptions.

6. `FilterLogs(ctx context.Context, query ethereum.FilterQuery) ([]types.Log, error)`: This function executes a log filter operation, blocking during execution and returning all the results in one batch. It takes a context and a FilterQuery as input and returns an array of Log objects and an error.

7. `SubscribeFilterLogs(ctx context.Context, query ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error)`: This function creates a background log filtering operation, returning a subscription immediately, which can be used to stream the found events. It takes a context, a FilterQuery, and a channel as input and returns a Subscription and an error.

8. `DeployBackend`: This interface wraps the operations needed by WaitMined and WaitDeployed.

9. `TransactionReceipt(ctx context.Context, txHash common.Hash) (*types.Receipt, error)`: This function retrieves the receipt of a transaction by its hash. It takes a context and a transaction hash as input and returns a Receipt object and an error.

10. `CodeAt(ctx context.Context, account common.Address, blockNumber *big.Int) ([]byte, error)`: This function retrieves the code of a contract at a specific block number. It takes a context, an address, and a block number as input and returns a byte array and an error.

11. `ContractBackend`: This interface defines the methods needed to work with contracts on a read-write basis. It extends the ContractCaller, ContractTransactor, and ContractFilterer interfaces.