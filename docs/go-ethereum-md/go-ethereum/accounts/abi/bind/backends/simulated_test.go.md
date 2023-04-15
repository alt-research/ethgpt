# SimulatedBackend

The `SimulatedBackend` package provides a simulated Ethereum blockchain backend for testing purposes. It allows the creation of a simulated blockchain with a specified genesis allocation and gas limit. It also provides methods to interact with the simulated blockchain, such as sending transactions, retrieving transactions by hash, and retrieving block headers.

## Functions

### NewSimulatedBackend

`NewSimulatedBackend` creates a new `SimulatedBackend` instance with the given genesis allocation and gas limit.

### (SimulatedBackend) Close

`Close` closes the `SimulatedBackend` instance.

### (SimulatedBackend) Commit

`Commit` commits the current state of the simulated blockchain.

### (SimulatedBackend) SendTransaction

`SendTransaction` sends a transaction to the simulated blockchain.

### (SimulatedBackend) TransactionByHash

`TransactionByHash` retrieves a transaction by its hash.

### (SimulatedBackend) HeaderByNumber

`HeaderByNumber` retrieves a block header by its number.

## Variables

### ErrNoCode

`ErrNoCode` is an error variable that is returned by call and transact operations when the requested recipient contract to operate on does not exist in the state db or does not have any code associated with it.

### ErrNoPendingState

`ErrNoPendingState` is an error variable that is raised when attempting to perform a pending state action on a backend that doesn't implement `PendingContractCaller`.

### ErrNoCodeAfterDeploy

`ErrNoCodeAfterDeploy` is an error variable that is returned by `WaitDeployed` if contract creation leaves an empty contract behind.

## TestSimulatedBackend

`TestSimulatedBackend` is a test function that tests the functionality of the `SimulatedBackend` package. It creates a simulated blockchain with a specified genesis allocation and gas limit, generates a transaction, sends it to the blockchain, and retrieves it by its hash. It also tests the retrieval of a non-existent transaction by its hash. # Ethereum Smart Contract Testing

This codebase contains a set of functions and interfaces to interact with Ethereum smart contracts. It also includes a simulated backend for testing purposes.

## `simTestBackend`

The `simTestBackend` function returns a `SimulatedBackend` instance for testing purposes. It takes a `common.Address` parameter and returns a simulated backend instance.

## `BoundContract`

The `BoundContract` struct represents a bound contract instance. It contains the contract address, ABI, and a `ContractCaller` instance for read-only operations.

## `BoundContractTransactor`

The `BoundContractTransactor` struct represents a bound contract instance for write-only operations. It contains the contract address, ABI, and a `ContractTransactor` instance.

## `BoundContractCaller`

The `BoundContractCaller` struct represents a bound contract instance for read-only operations. It contains the contract address, ABI, and a `ContractCaller` instance.

## `BoundContractFilterer`

The `BoundContractFilterer` struct represents a bound contract instance for event filtering. It contains the contract address, ABI, and a `ContractFilterer` instance.

## `NewBoundContract`

The `NewBoundContract` function creates a new `BoundContract` instance with the given contract address and ABI.

## `NewBoundContractAtAddress`

The `NewBoundContractAtAddress` function creates a new `BoundContract` instance with the given contract address and ABI, and sets the caller and transactor.

## `NewBoundContractTransactor`

The `NewBoundContractTransactor` function creates a new `BoundContractTransactor` instance with the given contract address and ABI, and sets the transactor.

## `NewBoundContractCaller`

The `NewBoundContractCaller` function creates a new `BoundContractCaller` instance with the given contract address and ABI, and sets the caller.

## `NewBoundContractFilterer`

The `NewBoundContractFilterer` function creates a new `BoundContractFilterer` instance with the given contract address and ABI, and sets the caller.

## `NewBoundContractTransactorWithOpts`

The `NewBoundContractTransactorWithOpts` function creates a new `BoundContractTransactor` instance with the given contract address and ABI, and sets the transactor with the given options.

## `NewBoundContractCallerWithOpts`

The `NewBoundContractCallerWithOpts` function creates a new `BoundContractCaller` instance with the given contract address and ABI, and sets the caller with the given options.

## `NewBoundContractFiltererWithOpts`

The `NewBoundContractFiltererWithOpts` function creates a new `BoundContractFilterer` instance with the given contract address and ABI, and sets the caller with the given options.

## `NewBoundContractBackend`

The `NewBoundContractBackend` function creates a new `BoundContractBackend` instance with the given contract address and ABI, and sets the backend.

## `NewBoundContractTransactorBackend`

The `NewBoundContractTransactorBackend` function creates a new `BoundContractTransactorBackend` instance with the given contract address and ABI, and sets the transactor and backend.

## `NewBoundContractCallerBackend`

The `NewBoundContractCallerBackend` function creates a new `BoundContractCallerBackend` instance with the given contract address and ABI, and sets the caller and backend.

## `NewBoundContractFiltererBackend`

The `NewBoundContractFiltererBackend` function creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend.

## `NewBoundContractTransactorBackendWithOpts`

The `NewBoundContractTransactorBackendWithOpts` function creates a new `BoundContractTransactorBackend` instance with the given contract address and ABI, and sets the transactor and backend with the given options.

## `NewBoundContractCallerBackendWithOpts`

The `NewBoundContractCallerBackendWithOpts` function creates a new `BoundContractCallerBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options.

## `NewBoundContractFiltererBackendWithOpts`

The `NewBoundContractFiltererBackendWithOpts` function creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options.

## `ErrNoCode`

The `ErrNoCode` error variable is returned by call and transact operations when the requested recipient contract to operate on does not exist in the state db or does not have any code associated with it.

## `ErrNoPendingState`

The `ErrNoPendingState` error variable is raised when attempting to perform a pending state action on a backend that doesn't implement `PendingContractCaller`.

## `ErrNoCodeAfterDeploy`

The `ErrNoCodeAfterDeploy` error variable is returned by `WaitDeployed` if contract creation leaves an empty contract behind.

## `ContractCaller`

The `ContractCaller` interface defines the methods needed to allow operating with a contract on a read-only basis.

## `CodeAt`

The `CodeAt` method of the `ContractCaller` interface returns the code of the given account.

## `CallContract`

The `CallContract` method of the `ContractCaller` interface executes an Ethereum contract call with the specified data as the input.

## `PendingContractCaller`

The `PendingContractCaller` interface defines methods to perform contract calls on the pending state.

## `PendingCodeAt`

The `PendingCodeAt` method of the `PendingContractCaller` interface returns the code of the given account in the pending state.

## `PendingCallContract`

The `PendingCallContract` method of the `PendingContractCaller` interface executes an Ethereum contract call against the pending state.

## `ContractTransactor`

The `ContractTransactor` interface defines the methods needed to allow operating with a contract on a write-only basis.

## `HeaderByNumber`

The `HeaderByNumber` method of the `ContractTransactor` interface returns a block header from the current canonical chain.

## `PendingNonceAt`

The `PendingNonceAt` method of the `ContractTransactor` interface retrieves the current pending nonce associated with an account.

## `SimulatedBackend`

The `SimulatedBackend` struct represents a simulated Ethereum backend for testing purposes.

## `DeployContract`

The `DeployContract` function deploys a contract to the simulated backend.

## `WaitDeployed`

The `WaitDeployed` function waits for the contract to be deployed and returns the contract instance. If the contract creation leaves an empty contract behind, it returns ` ## NewSimulatedBackend

The `NewSimulatedBackend` function creates a new simulated Ethereum blockchain backend. It takes two arguments: `GenesisAlloc` and `GasLimit`. `GenesisAlloc` is a map of account addresses to their initial balances. `GasLimit` is the maximum amount of gas that can be used in a single transaction.

## TestNewSimulatedBackend

The `TestNewSimulatedBackend` function tests the `NewSimulatedBackend` function. It creates a simulated backend with a test address and an expected balance. It then checks that the simulated backend has the correct configuration and that the balance of the test address is correct.

## TestAdjustTime

The `TestAdjustTime` function tests the `AdjustTime` function of the simulated backend. It creates a simulated backend and adjusts the time by one second. It then checks that the time has been adjusted correctly.

## TestNewAdjustTimeFail

The `TestNewAdjustTimeFail` function tests the `AdjustTime` function of the simulated backend when there are pending transactions. It creates a simulated backend with a test address and sends a transaction. It then tries to adjust the time by one second, which should fail because there are pending transactions. It then adjusts the time by one minute and checks that the time has been adjusted correctly.

## TestBalanceAt

The `TestBalanceAt` function tests the `BalanceAt` function of the simulated backend. It creates a simulated backend with a test address and an expected balance. It then checks that the balance of the test address is correct.

## TestBlockByHash

The `TestBlockByHash` function tests the `BlockByHash` function of the simulated backend. It creates a simulated backend and gets the most recent block. It then gets the same block by its hash and checks that the two blocks are equal. ## SimulatedBackend

The `SimulatedBackend` struct provides a simulated Ethereum blockchain backend for testing purposes. It implements the `Backend` interface and allows for the creation of test blocks, transactions, and contract deployments.

### NewSimulatedBackend

`NewSimulatedBackend` creates a new `SimulatedBackend` instance with the given genesis allocation and gas limit.

### Close

`Close` closes the `SimulatedBackend` instance and frees up any resources it was using.

### Commit

`Commit` creates a new block with all pending transactions and adds it to the blockchain.

### BlockByNumber

`BlockByNumber` returns the block at the given height. If `nil` is passed as the block number, it returns the most recent block.

### NonceAt

`NonceAt` returns the nonce for the given address at the given block height.

### SendTransaction

`SendTransaction` adds the given transaction to the pending transaction pool.

### TransactionByHash

`TransactionByHash` returns the transaction with the given hash.

## Test Functions

### TestBlockByNumber

`TestBlockByNumber` tests the `BlockByNumber` function of the `SimulatedBackend` struct. It creates a new `SimulatedBackend` instance, gets the most recent block, creates a new block, gets the most recent block again, and then gets a specific block by height.

### TestNonceAt

`TestNonceAt` tests the `NonceAt` function of the `SimulatedBackend` struct. It creates a new `SimulatedBackend` instance, gets the nonce for a test address at block height 0, creates a new transaction, adds it to the pending transaction pool, commits the block, and then gets the nonce for the test address at block height 1.

### TestSendTransaction

`TestSendTransaction` tests the `SendTransaction` function of the `SimulatedBackend` struct. It creates a new `SimulatedBackend` instance, creates a new transaction, adds it to the pending transaction pool, commits the block, and then checks that the transaction was committed.

### TestTransactionByHash

`TestTransactionByHash` tests the `TransactionByHash` function of the `SimulatedBackend` struct. It creates a new `SimulatedBackend` instance, creates a new transaction, adds it to the pending transaction pool, commits the block, and then gets the transaction by its hash. ## ubkeyToAddress(testKey.PublicKey)

This function takes a public key as input and returns the corresponding Ethereum address. It uses the `crypto.PubkeyToAddress` function from the `crypto` package to generate the address.

## TestEstimateGas(t *testing.T)

This function is a test function that tests the gas estimation functionality of the `bind` package. It creates a simulated Ethereum backend using the `NewSimulatedBackend` function and deploys a contract with the given ABI and bytecode. It then tests various contract functions to estimate the gas cost of each function call.

## NewSimulatedBackend(alloc core.GenesisAlloc, gasLimit uint64) *SimulatedBackend

This function creates a new simulated Ethereum backend with the given genesis allocation and gas limit. It returns a `SimulatedBackend` instance.

## SimulatedBackend

`SimulatedBackend` is a struct that represents a simulated Ethereum backend. It provides methods to interact with the simulated blockchain, such as sending transactions, querying account balances, and retrieving block headers.

## HeaderByNumber(ctx context.Context, number *big.Int) (*types.Header, error)

This function retrieves the block header for the given block number. If the block number is nil, it returns the latest known header.

## types.NewTransaction(nonce uint64, to common.Address, value *big.Int, gasLimit uint64, gasPrice *big.Int, data []byte) *types.Transaction

This function creates a new Ethereum transaction with the given nonce, recipient address, value, gas limit, gas price, and data. It returns a `Transaction` instance.

## types.SignTx(tx *types.Transaction, s types.Signer, prv *ecdsa.PrivateKey) (*types.Transaction, error)

This function signs the given transaction with the given private key using the specified signer. It returns the signed transaction.

## SendTransaction(ctx context.Context, tx *types.Transaction) error

This function sends the given transaction to the simulated Ethereum backend for processing. It returns an error if the transaction could not be added to the pending block.

## TransactionByHash(ctx context.Context, hash common.Hash) (tx *types.Transaction, isPending bool, err error)

This function retrieves the transaction with the given hash from the simulated Ethereum backend. It returns the transaction, a boolean indicating whether the transaction is still pending, and an error if the transaction could not be found.

## Commit()

This function commits the current pending block to the simulated Ethereum blockchain.

## NewBoundContract(address common.Address, abi abi.ABI, backend bind.ContractBackend) (*BoundContract, error)

This function creates a new `BoundContract` instance with the given contract address, ABI, and backend. It returns the `BoundContract` instance and an error if the contract could not be bound.

## NewBoundContractAtAddress(address common.Address, abi abi.ABI, caller bind.ContractCaller) (*BoundContract, error)

This function creates a new `BoundContract` instance with the given contract address, ABI, and caller. It returns the `BoundContract` instance and an error if the contract could not be bound.

## NewBoundContractTransactor(address common.Address, abi abi.ABI, transactor bind.ContractTransactor) (*BoundContractTransactor, error)

This function creates a new `BoundContractTransactor` instance with the given contract address, ABI, and transactor. It returns the `BoundContractTransactor` instance and an error if the contract could not be bound.

## NewBoundContractCaller(address common.Address, abi abi.ABI, caller bind.ContractCaller) (*BoundContractCaller, error)

This function creates a new `BoundContractCaller` instance with the given contract address, ABI, and caller. It returns the `BoundContractCaller` instance and an error if the contract could not be bound.

## NewBoundContractFilterer(address common.Address, abi abi.ABI, caller bind.ContractFilterer) (*BoundContractFilterer, error)

This function creates a new `BoundContractFilterer` instance with the given contract address, ABI, and caller. It returns the `BoundContractFilterer` instance and an error if the contract could not be bound.

## NewBoundContractTransactorWithOpts(address common.Address, abi abi.ABI, transactor bind.ContractTransactor, opts *bind.TransactOpts) (*BoundContractTransactor, error)

This function creates a new `BoundContractTransactor` instance with the given contract address, ABI, transactor, and transaction options. It returns the `BoundContractTransactor` instance and an error if the contract could not be bound.

## NewBoundContractCallerWithOpts(address common.Address, abi abi.ABI, caller bind.ContractCaller, opts *bind.CallOpts) (*BoundContractCaller, error)

This function creates a new `BoundContractCaller` instance with the given contract address, ABI, caller, and call options. It returns the `BoundContractCaller` instance and an error if the contract could not be bound.

## NewBoundContractFiltererWithOpts(address common.Address, abi abi.ABI, caller bind.ContractFilterer, opts *bind.FilterOpts) (*BoundContractFilterer, error)

This function creates a new `BoundContractFilterer` instance with the given contract address, ABI, caller, and filter options. It returns the `BoundContractFilterer` instance and an error if the contract could not be bound.

## NewBoundContractBackend(address common.Address, abi abi.ABI, backend bind.ContractBackend) (*BoundContract, error)

This function creates a new `BoundContract` instance with the given contract address, ABI, and backend. It returns the `BoundContract` instance and an error if the contract could not be bound.

## NewBoundContractTransactorBackend(address common.Address, abi abi.ABI, transactor bind.ContractTransactor, backend bind.ContractBackend) (*BoundContractTransactor, error)

This function creates a new `BoundContractTransactor` instance with the given contract address, ABI, transactor, and backend. It returns the `BoundContractTransactor` instance and an error if the contract could not be bound.

## NewBoundContractCallerBackend(address common.Address, abi abi.ABI, caller bind.ContractCaller, backend bind.ContractBackend) (*BoundContractCaller, error)

This function creates a new `BoundContractCaller` instance with the given contract address, ABI, caller, and backend. It returns the `BoundContractCaller` instance and an error if the contract could not be bound.

## NewBoundContractFiltererBackend(address common.Address, abi abi.ABI, caller bind.ContractFilterer, backend bind.ContractBackend) (*BoundContractFilterer, error)

This function creates a new `BoundContractFilterer` instance with the given contract address, ABI, caller, and backend. It returns the `BoundContractFilterer` instance and an error if the contract could not be bound.

## NewBoundContractTransactorBackendWithOpts(address common.Address, abi abi.ABI, transactor bind.ContractTransactor, backend bind.ContractBackend, opts *bind.TransactOpts) (*BoundContractTransactor, error)

This function creates a new `BoundContractTransactor` instance with the given contract address, ABI, transactor, backend, and transaction options. It returns the `BoundContractTransactor` instance and an error if the contract could not be bound.

## NewBoundContractCallerBackendWithOpts(address common.Address, abi abi.ABI, caller bind.ContractCaller, backend bind.ContractBackend, opts *bind.CallOpts) (*BoundContractCaller, error)

This function creates a new `BoundContractCaller` instance with the given contract address, ABI, caller, backend, and call options. It returns the `BoundContractCaller` instance and an error if the contract could not be bound.

## NewBoundContractFiltererBackendWithOpts(address common.Address, abi abi.ABI, caller bind.ContractFilterer, backend bind.ContractBackend, opts *bind.FilterOpts) (*BoundContractFilterer, error)

This function creates a new `BoundContractFilterer` instance with the given contract address, ABI, caller, backend, and filter options. It returns the `BoundContractFilterer` instance and an error if the contract could not be bound. ## TestEstimateGasWithPrice

This function is a test function that tests the `EstimateGasWithPrice` function. It creates a simulated backend with a genesis allocation of 2 ether and 200000000000 wei, and a gas limit of 10000000. It then creates a recipient address and defines a set of test cases to test the function. 

The test cases include:

- `EstimateWithoutPrice`: This test case estimates the gas required for a transaction without specifying a gas price.
- `EstimateWithPrice`: This test case estimates the gas required for a transaction with a specified gas price.

The function then runs each test case and checks if the estimated gas matches the expected value. If the estimated gas does not match the expected value, the test fails.

## TestEstimateGas

This function is a test function that tests the `EstimateGas` function. It creates a simulated backend with a genesis allocation of 2 ether and 200000000000 wei, and a gas limit of 10000000. It then deploys a contract and defines a set of test cases to test the function.

The test cases include:

- `plain transfer(valid)`: This test case performs a plain transfer of 1 wei from one address to another and expects the estimated gas to be equal to `params.TxGas`.
- `plain transfer(invalid)`: This test case performs a plain transfer of 1 wei from one address to the deployed contract and expects the function to return an error.
- `Revert`: This test case calls a function on the deployed contract that reverts and expects the function to return an error with the revert reason.
- `PureRevert`: This test case calls a function on the deployed contract that reverts without a reason and expects the function to return an error.
- `OOG`: This test case calls a function on the deployed contract that requires more gas than the specified gas limit and expects the function to return an error.
- `Assert`: This test case calls a function on the deployed contract that throws an invalid opcode and expects the function to return an error.
- `Valid`: This test case calls a valid function on the deployed contract and expects the estimated gas to be equal to 21275.

The function then runs each test case and checks if the estimated gas matches the expected value. If the estimated gas does not match the expected value, the test fails. If the function returns an error, the test checks if the error matches the expected error. If the error is a revert error, the test checks if the error data matches the expected data. ## Documentation for sim_test.go

### Function: TestEstimateGas

This function tests the gas estimation of different Ethereum transactions. It creates a slice of test cases, each containing a message to be sent to the Ethereum network, and the expected gas cost of that message. The function then iterates over the test cases, calling the `EstimateGas` function of the simulated Ethereum backend with the message, and comparing the returned gas cost with the expected gas cost. If the expected gas cost is not equal to the returned gas cost, the test fails.

### Function: TestHeaderByHash

This function tests the `HeaderByHash` function of the simulated Ethereum backend. It first retrieves the latest block header using the `HeaderByNumber` function, and then retrieves the same block header using the `HeaderByHash` function with the hash of the latest block header. If the hash of the retrieved block header is not equal to the hash of the latest block header, the test fails.

### Function: TestHeaderByNumber

This function tests the `HeaderByNumber` function of the simulated Ethereum backend. It first retrieves the latest block header using the `HeaderByNumber` function with a nil argument, and checks if the retrieved block header has a block number of 0. It then commits the simulated Ethereum backend, and retrieves the latest block header again, this time checking if the retrieved block header has a block number greater than 0. It then retrieves the block header of block number 1, and checks if the retrieved block header is the same as the latest block header. Finally, it retrieves the block of block number 1, and checks if the retrieved block has the same hash as the block header of block number 1. If any of these checks fail, the test fails. ## Simulated Ethereum Backend

This codebase provides a simulated Ethereum backend for testing purposes. It includes functions to interact with the simulated blockchain, such as getting the current block, getting the transaction count of a block, and getting a transaction in a block.

### TestBlockHash

This function tests whether the block hash and block header hash match. It takes in a testing object and compares the hash of the block and the hash of the block header. If they do not match, it throws an error.

### TestTransactionCount

This function tests the transaction count of a block. It takes in a testing object and creates a simulated backend. It then gets the current block and checks that the transaction count is 0. It creates a signed transaction and sends it to the simulated backend. It then commits the transaction and gets the last block. It checks that the transaction count is 1.

### TestTransactionInBlock

This function tests getting a transaction in a block. It takes in a testing object and creates a simulated backend. It then gets the pending transaction and checks that it does not exist. It creates a signed transaction and sends it to the simulated backend. It then commits the transaction and gets the last block. It checks that the transaction count is 1 and gets the transaction in the block. It checks that the transaction does not exist at index 1 and exists at index 0.

### Conclusion

The simulated Ethereum backend provides a useful tool for testing smart contracts. The functions provided in this codebase allow for easy interaction with the simulated blockchain and can be used to test various aspects of smart contracts. ## Description

This Go code is a set of unit tests for the `SimulatedBackend` package. The tests cover the following functions: `SendTransaction`, `PendingNonceAt`, `TransactionReceipt`, and `SuggestGasPrice`. The `SimulatedBackend` package provides a simulated Ethereum blockchain backend for testing purposes.

## Functions

### TestSendTransaction

This function tests the `SendTransaction` function of the `SimulatedBackend` package. It creates a simulated backend and sends a transaction to it. The function then checks if the transaction was added to the pending block and if the received transaction matches the sent transaction.

### TestPendingNonceAt

This function tests the `PendingNonceAt` function of the `SimulatedBackend` package. It creates a simulated backend and checks if the pending nonce is 0 since the account has not been used. It then creates a signed transaction and sends it to the simulated backend. The function checks if the pending nonce is 1 since the account has submitted one transaction. It then creates a new transaction with a nonce of 1 and sends it to the simulated backend. The function checks if the pending nonce is 2 since the account now has two transactions.

### TestTransactionReceipt

This function tests the `TransactionReceipt` function of the `SimulatedBackend` package. It creates a simulated backend and sends a transaction to it. The function then commits the transaction and gets the transaction receipt. The function checks if the received receipt is correct.

### TestSuggestGasPrice

This function tests the `SuggestGasPrice` function of the `SimulatedBackend` package. It creates a simulated backend and gets the gas price. The function checks if the gas price is equal to the pending block's base fee. ## TestPendingCodeAt

This function tests the `PendingCodeAt` method of the `bind` package. It first creates a simulated Ethereum backend using the `simTestBackend` function and then checks if the code of the test address is empty. It then parses the ABI JSON and creates a new transactor with a chain ID of 1337. It deploys the contract using the `DeployContract` function and checks if the contract was deployed successfully. It then gets the code of the contract using the `PendingCodeAt` method and checks if the code is not empty. Finally, it checks if the code received is equal to the expected deployed code.

## TestCodeAt

This function tests the `CodeAt` method of the `bind` package. It first creates a simulated Ethereum backend using the `simTestBackend` function and then checks if the code of the test address is empty. It then parses the ABI JSON and creates a new transactor with a chain ID of 1337. It deploys the contract using the `DeployContract` function and checks if the contract was deployed successfully. It then gets the code of the contract using the `CodeAt` method and checks if the code is not empty. Finally, it checks if the code received is equal to the expected deployed code.

## receive

This function is not included in the code provided. Please provide the code for this function if you would like me to document it. ## TestPendingAndCallContract

This function is a test function that tests the ability to call a contract in both the pending state and the normal state. It first creates a simulated test backend and deploys a contract to it. It then packs the "receive" function of the contract and calls it in the pending state using the `PendingCallContract` function. The result of the call is then compared to an expected return value. The function then commits the simulated backend and calls the same function using the `CallContract` function. The result of this call is also compared to the expected return value.

## TestCallContractRevert

This function is a test function that tests the ability to handle contract reverts. It first creates a simulated test backend and deploys a contract to it. It then defines the ABI and bytecode of the contract. The function then calls the "noRevert" function of the contract using the `CallContract` function. The function then checks that the result of the call is empty. The function then calls the "revertASM" function of the contract using the `CallContract` function. The function then checks that the result of the call is empty. The function then calls the "revertNoString" function of the contract using the `CallContract` function. The function then checks that the result of the call is empty. The function then calls the "revertString" function of the contract using the `CallContract` function. The function then checks that the result of the call is empty. ## Documentation for Source Code

### Function: TestReverter

The `TestReverter` function is a test function that tests the `reverter` contract. It deploys the contract, calls its functions with different inputs, and checks if the expected errors are returned. The function takes a testing object `t` as an argument.

### Function: TestFork

The `TestFork` function is a test function that checks if the chain length after a reorg is correct. It saves the current block as the parent for the fork, mines n blocks with n ∈ [0, 20], asserts that the chain length is n, forks by using the parent block as ancestor, mines n+1 blocks which should trigger a reorg, and asserts that the chain length is n+1. Since `Commit()` was called 2n+1 times in total, having a chain length of just n+1 means that a reorg occurred. The function takes a testing object `t` as an argument.

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

`NewBoundContractFiltererBackendWithOpts` creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options. ## Introduction

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

`NewBoundContractFiltererBackendWithOpts` creates a new `BoundContractFiltererBackend` instance with the given contract address and ABI, and sets the caller and backend with the given options.

### TestForkLogsReborn

`TestForkLogsReborn` checks that the simulated reorgs correctly remove and reborn logs. The function deploys a contract, sets up an event subscription, saves the current block which will serve as parent for the fork, sends a transaction, checks that the event was included, forks by using the parent block as ancestor, mines two blocks to trigger a reorg, checks that the event was removed, re-sends the transaction and mines a block, and checks that the event was reborn.

### TestForkResendTx

`TestForkResendTx` checks that re-sending a TX after a fork is possible and does not cause a "nonce mismatch" panic. The function saves the current block which will serve as parent for the fork, sends a transaction, checks that the TX is included in block 1, forks by using the parent block as ancestor, mines a block, re-sends the transaction and mines another one, and checks that the TX is now included in block 2. ## Function: TestSendTransaction

This function tests the `SendTransaction` method of the `SimulatedBackend` struct. It creates a new simulated backend with a test address, generates a transaction with a specified amount of Ether, gas limit, and gas price, signs the transaction with a test key, sends the transaction to the simulated backend, and commits the transaction. It then checks if the transaction receipt is included in the correct block. It also forks the blockchain at the parent block of the transaction and sends the same transaction again to check if it is included in the correct block after the fork.

## Function: TestCommitReturnValue

This function tests the `Commit` method of the `SimulatedBackend` struct. It creates a new simulated backend with a test address, gets the current block height, commits the current block and checks if the returned hash is the same as the hash of the current block. It then creates a new block with a transaction, commits it, creates another block, forks the blockchain at the first block, and checks if the returned hash after committing the forked block is different from the hash of the original block.

## Function: TestAdjustTimeAfterFork

This function tests the `AdjustTime` method of the `SimulatedBackend` struct after a fork. It creates a new simulated backend with a test address, commits two blocks, forks the blockchain at the first block, adjusts the time by one second, and commits a new block. It then checks if the new block was built on the fork and has the correct parent hash.