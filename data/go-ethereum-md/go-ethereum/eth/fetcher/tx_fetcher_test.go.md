# Documentation for fetcher package

This package provides a transaction fetcher for the Ethereum network. It allows nodes to fetch transactions from other nodes in the network.

## Types

### `doTxNotify`

This type represents a transaction notification to be sent to the fetcher. It contains the peer ID and a slice of transaction hashes.

### `doTxEnqueue`

This type represents a transaction enqueue request to be sent to the fetcher. It contains the peer ID, a slice of transactions, and a boolean indicating whether the transactions should be fetched directly or through the transaction pool.

### `doWait`

This type represents a wait request to be sent to the fetcher. It contains a duration and a boolean indicating whether the wait should be a step in the test.

### `doDrop`

This type represents a drop request to be sent to the fetcher. It contains the peer ID of the peer to drop.

### `doFunc`

This type represents a function to be executed during a test.

### `isWaiting`

This type represents a map of peer IDs to transaction hashes that are waiting to be fetched.

### `isScheduled`

This type represents a struct containing maps of peer IDs to transaction hashes that are being tracked, fetched, or are dangling.

### `isUnderpriced`

This type represents an integer indicating whether a transaction is underpriced.

### `txFetcherTest`

This type represents a test scenario that can be executed by the test runner. It contains an initialization function and a slice of steps to execute.

### `TxFetcher`

This type represents a transaction fetcher for the Ethereum network. It contains a function to check whether a transaction is already in the local transaction pool, a transaction pool, and a function to send transaction fetch requests to other nodes in the network.

## Functions

### `NewTxFetcher`

This function creates a new transaction fetcher with the given parameters. It takes a function to check whether a transaction is already in the local transaction pool, a transaction pool, and a function to send transaction fetch requests to other nodes in the network. It returns a pointer to the new transaction fetcher.

### `TxFetcher.Notify`

This method adds a transaction notification to the waitlist. It takes a peer ID and a slice of transaction hashes.

### `TxFetcher.Enqueue`

This method enqueues a transaction fetch request. It takes a peer ID, a slice of transactions, and a boolean indicating whether the transactions should be fetched directly or through the transaction pool.

### `TxFetcher.Wait`

This method waits for a duration. It takes a duration and a boolean indicating whether the wait should be a step in the test.

### `TxFetcher.DropPeer`

This method drops a peer from the fetcher. It takes a peer ID.

### `TxFetcher.Run`

This method runs the transaction fetcher. It executes the steps in the test scenario and checks the results against the expected values. It takes a test scenario and a testing.T object.

## Test Cases

### `TestTransactionFetcherWaiting`

This test case tests that transaction announcements are added to a waitlist, and none of them are scheduled for retrieval until the wait expires. It creates a test scenario with an initialization function that creates a new transaction fetcher, and a slice of steps to execute. The steps include adding transaction notifications to the waitlist, waiting for a duration, and checking the waitlist against the expected values. ## TxFetcher Source Code Documentation

### Introduction

The TxFetcher is a Go package that provides a transaction fetcher for the Ethereum network. It is responsible for fetching transactions from the network and delivering them to the transaction pool. The package includes a set of tests that ensure the correct behavior of the fetcher.

### Function Documentation

#### NewTxFetcher

```go
func NewTxFetcher(
    isKnown func(common.Hash) bool,
    fetcher func(string, []common.Hash) error,
    txAnnounce func(string, []common.Hash) error,
) *TxFetcher
```

The `NewTxFetcher` function creates a new instance of the `TxFetcher` struct. It takes three arguments:

- `isKnown`: a function that takes a `common.Hash` value and returns a boolean indicating whether the transaction is already known to the fetcher.
- `fetcher`: a function that takes a peer ID and a slice of transaction hashes, and fetches the transactions from the peer.
- `txAnnounce`: a function that takes a peer ID and a slice of transaction hashes, and announces the transactions to the network.

The function returns a pointer to the new `TxFetcher` instance.

#### TxFetcher.Fetch

```go
func (f *TxFetcher) Fetch(hashes []common.Hash) error
```

The `Fetch` method fetches a slice of transaction hashes from the network. It takes a slice of `common.Hash` values as an argument, and returns an error if the fetch fails.

#### TxFetcher.Notify

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash)
```

The `Notify` method notifies the fetcher of new transactions. It takes a peer ID and a slice of transaction hashes as arguments, and adds the transactions to the fetcher's wait list.

#### TxFetcher.Run

```go
func (f *TxFetcher) Run()
```

The `Run` method runs the fetcher's main loop. It fetches transactions from the network and delivers them to the transaction pool.

### Test Documentation

#### TestTransactionFetcherParallel

```go
func testTransactionFetcherParallel(t *testing.T, test txFetcherTest)
```

The `testTransactionFetcherParallel` function is a helper function for testing the `TxFetcher` struct. It takes a testing object and a `txFetcherTest` struct as arguments, and runs the test in parallel.

#### TestTransactionFetcherBasic

```go
func TestTransactionFetcherBasic(t *testing.T)
```

The `TestTransactionFetcherBasic` function tests the basic functionality of the `TxFetcher` struct. It tests that transactions are fetched and delivered to the transaction pool.

#### TestTransactionFetcherExpire

```go
func TestTransactionFetcherExpire(t *testing.T)
```

The `TestTransactionFetcherExpire` function tests the expiration of transactions in the fetcher's wait list. It tests that expired transactions are moved from the wait list to the scheduler.

#### TestTransactionFetcherSkipWaiting

```go
func TestTransactionFetcherSkipWaiting(t *testing.T)
```

The `TestTransactionFetcherSkipWaiting` function tests that transaction announcements skip the waiting list if they are already scheduled.

#### TestTransactionFetcherSingletonRequesting

```go
func TestTransactionFetcherSingletonRequesting(t *testing.T)
```

The `TestTransactionFetcherSingletonRequesting` function tests that only a single transaction request gets scheduled to a peer, and subsequent announces block or get allotted to someone else.

### Conclusion

The TxFetcher is a useful package for fetching transactions from the Ethereum network and delivering them to the transaction pool. Its functions and tests are well-documented, making it easy to use and understand. ## FetcherTest

The `FetcherTest` function is a test case for the `TxFetcher` struct. It tests the behavior of the `TxFetcher` when transactions are announced by different peers. The test case defines a set of steps that simulate the announcement of transactions by different peers and checks that the `TxFetcher` schedules the transactions for fetching correctly.

The `FetcherTest` function takes a `txFetcherTest` struct as an argument, which contains an `init` function that initializes a new `TxFetcher` instance, and a `steps` slice that defines the steps of the test case.

Each step in the `steps` slice is defined by an interface that represents a specific action or assertion. The following are the available step types:

- `doTxNotify`: announces a set of transactions from a specific peer.
- `isWaiting`: asserts that the `TxFetcher` is waiting for transactions from specific peers.
- `isScheduled`: asserts that the `TxFetcher` has scheduled transactions for fetching from specific peers.
- `doWait`: waits for a specific duration.
- `doFunc`: executes a specific function.

The `FetcherTest` function executes each step in the `steps` slice in order and checks that the `TxFetcher` behaves as expected.

## TestTransactionFetcherFailedRescheduling

The `TestTransactionFetcherFailedRescheduling` function is a test case for the `TxFetcher` struct. It tests the behavior of the `TxFetcher` when a transaction retrieval fails.

The test case defines a set of steps that simulate the announcement of transactions by a peer, the failure of the peer to retrieve the transactions, and the rescheduling of the transactions to another peer.

The `TestTransactionFetcherFailedRescheduling` function creates a new `TxFetcher` instance with a custom transaction retrieval function that always fails. The test case then defines a set of steps that simulate the announcement of transactions by a peer, the scheduling of the transactions for fetching, and the failure of the peer to retrieve the transactions.

The test case checks that the `TxFetcher` either reschedules the transactions to another peer or drops the announcements if no alternate source is available. This source code is a test suite for the `TxFetcher` struct, which is responsible for fetching transactions from the Ethereum network. The `TxFetcher` struct has three fields: a function that checks whether a transaction has already been fetched, a function that processes fetched transactions, and a function that requests transactions from a peer.

The test suite consists of three test functions: `TestTransactionFetcherSuccess`, `TestTransactionFetcherCleanup`, and `TestTransactionFetcherMissingRescheduling`. Each test function tests a different aspect of the `TxFetcher` struct.

The `TestTransactionFetcherSuccess` function tests that if a transaction retrieval succeeds, the transaction is processed and removed from the scheduled stage. The test initializes a `TxFetcher` struct and pushes an initial announcement through to the scheduled stage. It then waits for the transaction to arrive, checks that it is scheduled, and waits for the transaction to be delivered. Finally, it checks that the transaction is no longer scheduled.

The `TestTransactionFetcherCleanup` function tests that if a transaction retrieval succeeds, but the response is empty, all transactions are removed instead of being rescheduled. The test initializes a `TxFetcher` struct and pushes an initial announcement through to the scheduled stage. It then waits for the transaction to arrive, checks that it is scheduled, and waits for an empty response. Finally, it checks that the transactions are no longer scheduled.

The `TestTransactionFetcherMissingRescheduling` function tests that non-returned transactions are either re-scheduled from a different peer or self if they are after the cutoff point. The test initializes a `TxFetcher` struct and pushes an initial announcement through to the scheduled stage. It then waits for the transactions to arrive, checks that they are scheduled, and waits for the transactions to be delivered. Finally, it checks that the transactions are no longer scheduled.

Each test function uses a `txFetcherTest` struct to define the test steps. The `txFetcherTest` struct has an `init` function that initializes a `TxFetcher` struct, and a `steps` field that defines the test steps. The test steps are defined as a slice of interface{} values, where each value represents a step in the test. The test steps are executed in order, and each step is defined as a function call with arguments that represent the step parameters.

Overall, this source code is a well-organized and comprehensive test suite for the `TxFetcher` struct, which ensures that the struct functions correctly in various scenarios. # Transaction Fetcher

The `tx_fetcher.go` file contains the implementation of the `TxFetcher` struct, which is responsible for fetching transactions from peers in the Ethereum network.

## TxFetcher

The `TxFetcher` struct has the following fields:

- `announce`: a function that takes a transaction hash and returns a boolean indicating whether the transaction should be announced to peers.
- `validate`: a function that takes a slice of transactions and returns a slice of errors indicating any invalid transactions.
- `fetch`: a function that takes a peer ID and a slice of transaction hashes and fetches the transactions from the peer.

The `TxFetcher` struct provides the following methods:

### NewTxFetcher

```go
func NewTxFetcher(announce func(common.Hash) bool, validate func([]*types.Transaction) []error, fetch func(string, []common.Hash) error) *TxFetcher
```

The `NewTxFetcher` function creates a new `TxFetcher` struct with the given `announce`, `validate`, and `fetch` functions.

### Notify

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash)
```

The `Notify` method adds the given transaction hashes to the waiting list for the given peer.

### Enqueue

```go
func (f *TxFetcher) Enqueue(peer string, txs []*types.Transaction, direct bool)
```

The `Enqueue` method adds the given transactions to the queue for the given peer. If `direct` is true, the transactions are added to the front of the queue; otherwise, they are added to the back of the queue.

### Fetch

```go
func (f *TxFetcher) Fetch(peer string, hashes []common.Hash)
```

The `Fetch` method fetches the transactions with the given hashes from the given peer.

### Stop

```go
func (f *TxFetcher) Stop()
```

The `Stop` method stops the `TxFetcher` and cleans up any internal state.

## Tests

The `tx_fetcher_test.go` file contains tests for the `TxFetcher` struct.

### TestTransactionFetcher

This test checks that transactions are properly fetched from peers. It sets up a `TxFetcher` with a mock `announce` function that always returns true, a mock `validate` function that always returns no errors, and a mock `fetch` function that returns the transactions with the given hashes. It then adds some transactions to the waiting list for a peer, waits for them to be scheduled for fetching, and then delivers them to the `TxFetcher`. Finally, it checks that the transactions were properly delivered to the `validate` function.

### TestTransactionFetcherMissing

This test checks that missing transactions are properly re-requested. It sets up a `TxFetcher` with a mock `announce` function that always returns true, a mock `validate` function that always returns no errors, and a mock `fetch` function that returns the transactions with the given hashes. It then adds some transactions to the waiting list for a peer, waits for them to be scheduled for fetching, and then delivers only some of them to the `TxFetcher`. Finally, it checks that the missing transactions were properly re-requested.

### TestTransactionFetcherMissingCleanup

This test checks that missing transactions are properly cleaned up. It sets up a `TxFetcher` with a mock `announce` function that always returns true, a mock `validate` function that always returns no errors, and a mock `fetch` function that returns the transactions with the given hashes. It then adds some transactions to the waiting list for a peer, waits for them to be scheduled for fetching, and then delivers only some of them to the `TxFetcher`. Finally, it checks that the peer was properly cleaned up from the internal state.

### TestTransactionFetcherBroadcasts

This test checks that transaction broadcasts properly clean up announcements. It sets up a `TxFetcher` with a mock `announce` function that always returns true, a mock `validate` function that always returns no errors, and a mock `fetch` function that returns the transactions with the given hashes. It then adds some transactions to the waiting list for a peer, adds some transactions to the queue for the peer, and then broadcasts all the transactions. Finally, it checks that the internal state was properly cleaned up. ## Transaction Fetcher

The `tx_fetcher_test.go` file contains tests for the `TxFetcher` struct, which is responsible for fetching transactions from peers.

### TestTransactionFetcherWaitTimerResets

This test ensures that the wait timer for transaction fetching properly resets and reschedules. It creates a new `TxFetcher` instance and performs a series of steps to simulate transaction notifications and waiting periods. The test checks that the wait timer is properly reset and rescheduled when new transactions are received.

### TestTransactionFetcherTimeoutRescheduling

This test ensures that if a transaction request is not replied to, it will time out and be re-scheduled for someone else. It creates a new `TxFetcher` instance and performs a series of steps to simulate transaction notifications and waiting periods. The test checks that transactions that time out are properly cleaned up and that follow-up announcements are not scheduled.

### TestTransactionFetcherTimeoutTimerResets

This test ensures that the fetching timeout timer for transaction fetching properly resets and reschedules. It creates a new `TxFetcher` instance and performs a series of steps to simulate transaction notifications and waiting periods. The test checks that the fetching timeout timer is properly reset and rescheduled when new transactions are received.

The `TxFetcher` struct has the following methods:

#### NewTxFetcher

```go
func NewTxFetcher(
    isKnown func(common.Hash) bool,
    deliver func([]*types.Transaction) []error,
    announce func(string, []common.Hash) error,
) *TxFetcher
```

`NewTxFetcher` creates a new `TxFetcher` instance with the given `isKnown`, `deliver`, and `announce` functions. The `isKnown` function is used to check if a transaction is already known. The `deliver` function is used to deliver transactions to the client. The `announce` function is used to announce transactions to peers.

#### TxFetcher.Notify

```go
func (fetcher *TxFetcher) Notify(peer string, txs []*types.Transaction)
```

`Notify` notifies the `TxFetcher` instance that the given `peer` has the given `txs`.

#### TxFetcher.Enqueue

```go
func (fetcher *TxFetcher) Enqueue(peer string, txs []*types.Transaction, direct bool)
```

`Enqueue` enqueues the given `txs` from the given `peer`. If `direct` is true, the transactions are directly fetched from the peer.

#### TxFetcher.Fetch

```go
func (fetcher *TxFetcher) Fetch()
```

`Fetch` fetches transactions from peers.

#### TxFetcher.Stop

```go
func (fetcher *TxFetcher) Stop()
```

`Stop` stops the `TxFetcher` instance. # Transaction Fetcher

The `tx_fetcher.go` file contains the implementation of the transaction fetcher, which is responsible for fetching transactions from peers in the Ethereum network.

## Functions

### NewTxFetcher

```go
func NewTxFetcher(
    isKnown func(common.Hash) bool,
    pending func(common.Hash) (*types.Transaction, error),
    fetch func(string, []common.Hash) error,
) *TxFetcher
```

The `NewTxFetcher` function creates a new instance of the `TxFetcher` struct, which is used to fetch transactions from peers in the Ethereum network. It takes three arguments:

- `isKnown`: a function that takes a `common.Hash` value and returns a boolean indicating whether the transaction with that hash is already known.
- `pending`: a function that takes a `common.Hash` value and returns a `*types.Transaction` value and an error. It is used to retrieve a pending transaction with the given hash.
- `fetch`: a function that takes a peer ID and a slice of `common.Hash` values, and returns an error. It is used to fetch transactions from the given peer.

### TxFetcher.Fetch

```go
func (f *TxFetcher) Fetch(hashes []common.Hash, peer string)
```

The `Fetch` method of the `TxFetcher` struct is used to fetch transactions with the given hashes from the given peer. It takes two arguments:

- `hashes`: a slice of `common.Hash` values representing the hashes of the transactions to fetch.
- `peer`: a string representing the ID of the peer to fetch the transactions from.

### TxFetcher.Notify

```go
func (f *TxFetcher) Notify(hashes []common.Hash, peer string)
```

The `Notify` method of the `TxFetcher` struct is used to notify the fetcher that the given peer has the given transactions. It takes two arguments:

- `hashes`: a slice of `common.Hash` values representing the hashes of the transactions that the peer has.
- `peer`: a string representing the ID of the peer that has the transactions.

### TxFetcher.Retrieve

```go
func (f *TxFetcher) Retrieve(hashes []common.Hash) []*types.Transaction
```

The `Retrieve` method of the `TxFetcher` struct is used to retrieve the transactions with the given hashes. It takes a slice of `common.Hash` values representing the hashes of the transactions to retrieve, and returns a slice of `*types.Transaction` values representing the retrieved transactions.

## Tests

The `tx_fetcher_test.go` file contains tests for the `TxFetcher` struct.

### TestTransactionFetcherParallel

```go
func TestTransactionFetcherParallel(t *testing.T, test txFetcherTest)
```

The `TestTransactionFetcherParallel` function is a helper function used to run tests for the `TxFetcher` struct in parallel. It takes two arguments:

- `t`: a `*testing.T` value representing the testing context.
- `test`: a `txFetcherTest` value representing the test to run.

### TestTransactionFetcherBasic

```go
func TestTransactionFetcherBasic(t *testing.T)
```

The `TestTransactionFetcherBasic` function tests the basic functionality of the `TxFetcher` struct.

### TestTransactionFetcherRateLimiting

```go
func TestTransactionFetcherRateLimiting(t *testing.T)
```

The `TestTransactionFetcherRateLimiting` function tests that only a small number of transactions are requested at a time, even if thousands of transactions are announced.

### TestTransactionFetcherDoSProtection

```go
func TestTransactionFetcherDoSProtection(t *testing.T)
```

The `TestTransactionFetcherDoSProtection` function tests that the number of transactions a peer is allowed to announce and/or request at the same time is hard capped. ## TxFetcher

The `TxFetcher` struct is used to fetch transactions from peers. It has three fields:

- `isKnown`: a function that takes a `common.Hash` and returns a boolean indicating whether the hash is known.
- `getTxErrs`: a function that takes a slice of `*types.Transaction` and returns a slice of `error` indicating whether each transaction is valid.
- `enqueueTx`: a function that takes a peer ID and a slice of `common.Hash` and enqueues the transactions for retrieval.

### NewTxFetcher

```go
func NewTxFetcher(isKnown func(common.Hash) bool, getTxErrs func([]*types.Transaction) []error, enqueueTx func(string, []common.Hash) error) *TxFetcher
```

`NewTxFetcher` creates a new `TxFetcher` with the given functions.

- `isKnown`: a function that takes a `common.Hash` and returns a boolean indicating whether the hash is known.
- `getTxErrs`: a function that takes a slice of `*types.Transaction` and returns a slice of `error` indicating whether each transaction is valid.
- `enqueueTx`: a function that takes a peer ID and a slice of `common.Hash` and enqueues the transactions for retrieval.

### TxFetcher.Fetch

```go
func (f *TxFetcher) Fetch(ctx context.Context, peer string, hashes []common.Hash) error
```

`Fetch` fetches the transactions with the given hashes from the given peer.

- `ctx`: a `context.Context` that can be used to cancel the fetch.
- `peer`: the ID of the peer to fetch from.
- `hashes`: the hashes of the transactions to fetch.

### TxFetcher.Stop

```go
func (f *TxFetcher) Stop()
```

`Stop` stops the fetcher and cancels any ongoing fetches. ## TxFetcher

The `TxFetcher` struct provides a mechanism for fetching transactions from peers in the Ethereum network. It is used by the transaction pool to fetch transactions that are not yet in the pool.

### NewTxFetcher

```go
func NewTxFetcher(
    hasTx func(common.Hash) bool,
    validateTxs func([]*types.Transaction) []error,
    deliverTxs func(string, []common.Hash) error,
) *TxFetcher
```

`NewTxFetcher` creates a new `TxFetcher` instance with the given `hasTx`, `validateTxs`, and `deliverTxs` functions.

- `hasTx` is a function that takes a transaction hash and returns a boolean indicating whether the transaction is already in the pool.
- `validateTxs` is a function that takes a slice of transactions and returns a slice of errors indicating which transactions are invalid.
- `deliverTxs` is a function that takes a peer ID and a slice of transaction hashes, and delivers the corresponding transactions to the peer.

### TxFetcher.Fetch

```go
func (f *TxFetcher) Fetch(peer string, hashes []common.Hash)
```

`Fetch` fetches the transactions with the given hashes from the given peer. It adds the hashes to the internal tracking data structure and sends a `GetTransactions` message to the peer.

### TxFetcher.Notify

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash)
```

`Notify` is called when the given peer sends a `Transactions` message containing the given hashes. It removes the hashes from the internal tracking data structure and adds them to the internal fetching data structure.

### TxFetcher.Enqueue

```go
func (f *TxFetcher) Enqueue(peer string, txs []*types.Transaction, direct bool)
```

`Enqueue` enqueues the given transactions from the given peer. If `direct` is true, it adds the transactions to the internal fetching data structure. Otherwise, it adds the transactions to the internal dangling data structure.

### TxFetcher.Drop

```go
func (f *TxFetcher) Drop(peer string)
```

`Drop` drops the given peer from the internal tracking, fetching, and dangling data structures.

### TxFetcher.Run

```go
func (f *TxFetcher) Run()
```

`Run` runs the main loop of the `TxFetcher`. It processes incoming messages and sends outgoing messages to peers. It should be run in a separate goroutine.

## Tests

The `TxFetcher` is thoroughly tested with the following tests:

- `TestTransactionFetcher`: tests the basic functionality of the `TxFetcher`.
- `TestTransactionFetcherParallel`: tests the parallel functionality of the `TxFetcher`.
- `TestTransactionFetcherOutOfBoundDeliveries`: tests that unexpected deliveries don't corrupt the internal state.
- `TestTransactionFetcherDrop`: tests that dropping a peer cleans out all internal data structures in all the live or dangling stages.

Each test creates a `TxFetcher` instance with a specific configuration and runs a series of steps to test its behavior. The steps are defined as a slice of interface{} values, where each value represents a specific action to take. The tests use the `testTransactionFetcher` and `testTransactionFetcherParallel` helper functions to run the steps in a sequential or parallel manner, respectively. ## TxFetcher

The `TxFetcher` struct is responsible for fetching transactions from the network. It provides methods to enqueue transactions, track their status, and fetch them from peers.

### NewTxFetcher

```go
func NewTxFetcher(
    isKnown func(common.Hash) bool,
    validate func([]*types.Transaction) []error,
    broadcast func(string, []common.Hash) error,
) *TxFetcher
```

`NewTxFetcher` creates a new `TxFetcher` instance with the given `isKnown`, `validate`, and `broadcast` functions.

- `isKnown` is a function that takes a transaction hash and returns a boolean indicating whether the transaction is already known.
- `validate` is a function that takes a slice of transactions and returns a slice of errors indicating any invalid transactions.
- `broadcast` is a function that takes a peer ID and a slice of transaction hashes, and broadcasts the hashes to the peer.

### Enqueue

```go
func (f *TxFetcher) Enqueue(peer string, txs []*types.Transaction) error
```

`Enqueue` adds the given transactions to the fetcher's queue for the given peer. It returns an error if any of the transactions are already known or invalid.

### Notify

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash) error
```

`Notify` updates the fetcher's status for the given peer and transaction hashes. It returns an error if any of the transactions are already known or invalid.

### Drop

```go
func (f *TxFetcher) Drop(peer string)
```

`Drop` removes the given peer from the fetcher's status and reschedules any failed transactions to other peers.

### Fetch

```go
func (f *TxFetcher) Fetch(peer string, max int) []*types.Transaction
```

`Fetch` fetches up to `max` transactions from the given peer. It returns a slice of transactions that were successfully fetched.

### Tests

The `TxFetcher` struct has several tests that cover its functionality and edge cases. These tests include:

- `TestTransactionFetcherEnqueue`: tests that transactions can be enqueued and fetched from the fetcher.
- `TestTransactionFetcherNotify`: tests that transactions can be notified and fetched from the fetcher.
- `TestTransactionFetcherDrop`: tests that dropping a peer removes it from the fetcher's status and reschedules failed transactions to other peers.
- `TestTransactionFetcherDropRescheduling`: tests that dropping a peer instantly reschedules failed announcements to any available peer.
- `TestTransactionFetcherFuzzCrash01`: reproduces a crash caught by the fuzzer where a dangling transaction times out and clashes on re-add with a concurrently announced one.
- `TestTransactionFetcherFuzzCrash02`: reproduces a crash caught by the fuzzer where a dangling transaction gets peer-dropped and clashes on re-add with a concurrently announced one. ## TxFetcher

The `TxFetcher` struct provides a mechanism for fetching transactions from peers in the Ethereum network. It is used by the Ethereum node to retrieve transactions that are not yet in the local transaction pool.

### NewTxFetcher

```go
func NewTxFetcher(
    hasTx func(common.Hash) bool,
    addTxs func([]*types.Transaction) []error,
    requestTxs func(string, []common.Hash) error,
) *TxFetcher
```

`NewTxFetcher` creates a new `TxFetcher` instance with the given functions for checking if a transaction is already in the local pool, adding transactions to the local pool, and requesting transactions from a peer.

### TxFetcher.Start

```go
func (f *TxFetcher) Start()
```

`Start` starts the transaction fetcher.

### TxFetcher.Stop

```go
func (f *TxFetcher) Stop()
```

`Stop` stops the transaction fetcher.

### TxFetcher.Notify

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash) error
```

`Notify` notifies the transaction fetcher that a peer has new transactions available.

### TxFetcher.Enqueue

```go
func (f *TxFetcher) Enqueue(peer string, txs []*types.Transaction, direct bool) error
```

`Enqueue` enqueues transactions to be fetched from a peer.

### TxFetcher.Fetch

```go
func (f *TxFetcher) Fetch()
```

`Fetch` fetches transactions from peers.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher.

### TxFetcher.FetcherLoop

```go
func (f *TxFetcher) FetcherLoop()
```

`FetcherLoop` is the main loop of the transaction fetcher. ## Function Documentation: `func (fetcher *fetcher) runTest(t *testing.T, steps []interface{})`

This function is a test function that runs a series of steps to test the `fetcher` struct. The function takes a testing object `t` and a slice of `interface{}` objects called `steps`. The `steps` slice contains a series of instructions that the `fetcher` struct should execute.

The function iterates over each step in the `steps` slice and executes the corresponding action. The actions include waiting for a specified duration, enqueuing transactions, dropping requests, executing a function, and checking the waiting and scheduled lists.

If an error occurs during the execution of a step, the function will log an error message with the step number and the error message.

The function is used to test the functionality of the `fetcher` struct and ensure that it behaves as expected. The `fetcher` struct is responsible for managing the download of blocks and transactions from the Ethereum network. The `runTest` function tests the various methods and functions of the `fetcher` struct to ensure that it is working correctly.

## Code Documentation

```go
case doTxEnqueue:
	if err := fetcher.Enqueue(step.peer, step.txs, step.direct); err != nil {
		t.Errorf("step %d: %v", i, err)
	}
	<-wait // Fetcher needs to process this, wait until it's done
```

This code block is executed when the `doTxEnqueue` action is specified in the `steps` slice. The `doTxEnqueue` action enqueues a set of transactions to be downloaded by the `fetcher` struct. The `Enqueue` method of the `fetcher` struct is called with the specified `peer`, `txs`, and `direct` parameters. If an error occurs during the execution of the `Enqueue` method, the function logs an error message with the step number and the error message. The function then waits until the `fetcher` struct has finished processing the enqueued transactions before continuing to the next step.

```go
case doWait:
	clock.Run(step.time)
	if step.step {
		<-wait // Fetcher supposed to do something, wait until it's done
	}
```

This code block is executed when the `doWait` action is specified in the `steps` slice. The `doWait` action waits for a specified duration before continuing to the next step. The `Run` method of the `clock` object is called with the specified `time` parameter to wait for the specified duration. If the `step` parameter is `true`, the function waits until the `fetcher` struct has finished processing the current step before continuing to the next step.

```go
case doDrop:
	if err := fetcher.Drop(string(step)); err != nil {
		t.Errorf("step %d: %v", i, err)
	}
	<-wait // Fetcher needs to process this, wait until it's done
```

This code block is executed when the `doDrop` action is specified in the `steps` slice. The `doDrop` action drops a request from the `fetcher` struct. The `Drop` method of the `fetcher` struct is called with the specified `step` parameter. If an error occurs during the execution of the `Drop` method, the function logs an error message with the step number and the error message. The function then waits until the `fetcher` struct has finished processing the dropped request before continuing to the next step.

```go
case doFunc:
	step()
```

This code block is executed when the `doFunc` action is specified in the `steps` slice. The `doFunc` action executes a function specified in the `step` parameter.

```go
case isWaiting:
	// We need to check that the waiting list (stage 1) internals
	// match with the expected set. Check the peer->hash mappings
	// first.
	for peer, hashes := range step {
		waiting := fetcher.waitslots[peer]
		if waiting == nil {
			t.Errorf("step %d: peer %s missing from waitslots", i, peer)
			continue
		}
		for _, hash := range hashes {
			if _, ok := waiting[hash]; !ok {
				t.Errorf("step %d, peer %s: hash %x missing from waitslots", i, peer, hash)
			}
		}
		for hash := range waiting {
			if !containsHash(hashes, hash) {
				t.Errorf("step %d, peer %s: hash %x extra in waitslots", i, peer, hash)
			}
		}
	}
	for peer := range fetcher.waitslots {
		if _, ok := step[peer]; !ok {
			t.Errorf("step %d: peer %s extra in waitslots", i, peer)
		}
	}
	// Peer->hash sets correct, check the hash->peer and timeout sets
	for peer, hashes := range step {
		for _, hash := range hashes {
			if _, ok := fetcher.waitlist[hash][peer]; !ok {
				t.Errorf("step %d, hash %x: peer %s missing from waitlist", i, hash, peer)
			}
			if _, ok := fetcher.waittime[hash]; !ok {
				t.Errorf("step %d: hash %x missing from waittime", i, hash)
			}
		}
	}
	for hash, peers := range fetcher.waitlist {
		if len(peers) == 0 {
			t.Errorf("step %d, hash %x: empty peerset in waitlist", i, hash)
		}
		for peer := range peers {
			if !containsHash(step[peer], hash) {
				t.Errorf("step %d, hash %x: peer %s extra in waitlist", i, hash, peer)
			}
		}
	}
	for hash := range fetcher.waittime {
		var found bool
		for _, hashes := range step {
			if containsHash(hashes, hash) {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("step %d,: hash %x extra in waittime", i, hash)
		}
	}
```

This code block is executed when the `isWaiting` action is specified in the `steps` slice. The `isWaiting` action checks that the waiting list of the `fetcher` struct matches the expected set. The function checks the peer->hash mappings first, then checks the hash->peer and timeout sets. If any errors are found during the checking process, the function logs an error message with the step number and the error message.

```go
case isScheduled:
	// Check that all scheduled announces are accounted for and no
	// extra ones are present.
	for peer, hashes := range step.tracking {
		scheduled := fetcher.announces[peer]
		if scheduled == nil {
			t.Errorf("step %d: peer %s missing from announces", i, peer)
			continue
		}
		for _, hash := range hashes {
			if _, ok := scheduled[hash]; !ok {
				t.Errorf("step %d, peer %s: hash %x missing from announces", i, peer, hash)
			}
		}
		for hash := range scheduled {
			if !containsHash(hashes, hash) {
				t.Errorf("step %d, peer %s: hash %x extra in announces", i, peer, hash)
			}
		}
	}
	for peer := range fetcher.announces {
		if _, ok := step.tracking[peer]; !ok {
			t.Errorf("step %d: peer %s extra in announces", i, peer)
		}
	}
	// Check that all announces required to be fetching are in the
	// appropriate sets
	for peer, hashes := range step.fetching {
		request := fetcher.requests[peer]
		if request == nil {
			t.Errorf("step %d: peer %s missing from requests", i, peer)
			continue
		}
		for _, hash := range hashes {
			if !containsHash(request.hashes, hash) {
				t.Errorf("step %d, peer %s: hash %x missing from requests", i, peer, hash)
			}
		}
		for _, hash := range request.hashes {
			if containsHash(hashes, hash) && !containsHash(request.fetching, hash) {
				t.Errorf("step %d, peer %s: hash %x not marked as fetching", i, peer, hash)
			}
		}
	}
```

This code block is executed when the `isScheduled` action is specified in the `steps` slice. The `isScheduled` action checks that all scheduled announces are accounted for and no extra ones are present. The function checks the peer->hash This code is a test function that checks the internal consistency of the `fetcher` object. The `fetcher` object is a struct that manages the download of blocks and transactions from the Ethereum network.

The `TestFetcherConsistency` function iterates over a list of steps, each of which represents a different operation that the `fetcher` object can perform. For each step, the function checks that the `fetcher` object is in a consistent state.

The function checks that all requests made by the `fetcher` object are accounted for, and that all blocks and transactions that are being downloaded are being tracked correctly. It also checks that all blocks and transactions that are scheduled for retrieval but not actively being downloaded are tracked only in the stage 2 `announced` map.

The `containsHash` function is a helper function that checks whether a hash is contained within a hash slice.

Overall, this test function ensures that the `fetcher` object is working correctly and that it is able to download blocks and transactions from the Ethereum network in a consistent and reliable manner. ## Function: containsString

The `containsString` function takes two arguments: a slice of strings `slice` and a string `s`. It returns a boolean value indicating whether the string `s` is present in the slice `slice`.

The function iterates over each element in the slice `slice` and checks if it is equal to the string `s`. If a match is found, the function returns `true`. If no match is found after iterating over all elements in the slice, the function returns `false`.

This function can be useful in scenarios where you need to check if a particular string is present in a slice of strings. For example, you might use this function to check if a user-provided input matches any of the valid options in a list of allowed values.