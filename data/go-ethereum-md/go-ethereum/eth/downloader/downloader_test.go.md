## Download Tester

The `downloadTester` is a test simulator for mocking out local blockchain. It is used to test the `Downloader` package.

### `newTester`

```go
func newTester(t *testing.T) *downloadTester
```

`newTester` creates a new downloader test mocker. It returns a pointer to a new `downloadTester` instance.

### `newTesterWithNotification`

```go
func newTesterWithNotification(t *testing.T, success func()) *downloadTester
```

`newTesterWithNotification` creates a new downloader test mocker with a success notification function. It returns a pointer to a new `downloadTester` instance.

### `terminate`

```go
func (dl *downloadTester) terminate()
```

`terminate` aborts any operations on the embedded downloader and releases all held resources.

### `sync`

```go
func (dl *downloadTester) sync(id string, td *big.Int, mode SyncMode) error
```

`sync` starts synchronizing with a remote peer, blocking until it completes. It takes the following parameters:
- `id`: The ID of the remote peer to synchronize with.
- `td`: The total difficulty of the remote peer's blockchain.
- `mode`: The synchronization mode to use.

## Constants

- `maxQueuedBlocks`: The maximum number of blocks that can be queued for download.
- `maxQueuedBodies`: The maximum number of block bodies that can be queued for download.
- `maxQueuedReceipts`: The maximum number of block receipts that can be queued for download.
- `maxQueuedHeaders`: The maximum number of block headers that can be queued for download.
- `maxQueuedProofs`: The maximum number of block proofs that can be queued for download.
- `maxQueuedHeaderProofs`: The maximum number of header proofs that can be queued for download.
- `maxQueuedAccountProofs`: The maximum number of account proofs that can be queued for download.
- `maxQueuedStorageProofs`: The maximum number of storage proofs that can be queued for download.
- `maxQueuedCodeProofs`: The maximum number of code proofs that can be queued for download.
- `maxQueuedTxProofs`: The maximum number of transaction proofs that can be queued for download.
- `maxQueuedTxLookups`: The maximum number of transaction lookups that can be queued for download.
- `maxQueuedTxPool`: The maximum number of transactions that can be queued for download from the transaction pool.
- `maxQueuedTxPoolContent`: The maximum number of transaction contents that can be queued for download from the transaction pool.
- `maxQueuedTxPoolStatus`: The maximum number of transaction statuses that can be queued for download from the transaction pool.
- `maxQueuedTxPoolInspect`: The maximum number of transaction inspections that can be queued for download from the transaction pool.
- `maxQueuedTxPoolContentInspect`: The maximum number of transaction content inspections that can be queued for download from the transaction pool.
- `maxQueuedTxPoolStatusInspect`: The maximum number of transaction status inspections that can be queued for download from the transaction pool.
- `maxQueuedTxPoolContentStatusInspect`: The maximum number of transaction content and status inspections that can be queued for download from the transaction pool.
- `maxQueuedTxPoolInspectAll`: The maximum number of transaction pool inspections that can be queued for download.
- `maxQueuedTxPoolContentInspectAll`: The maximum number of transaction pool content inspections that can be queued for download.
- `maxQueuedTxPoolStatusInspectAll`: The maximum number of transaction pool status inspections that can be queued for download.
- `maxQueuedTxPoolContentStatusInspectAll`: The maximum number of transaction pool content and status inspections that can be queued for download.
- `maxQueuedTxPoolContentStatusInspectAllBatch`: The maximum number of transaction pool content and status inspections that can be queued for download in a batch.
- `maxQueuedTxPoolContentStatusInspectAllBatchSize`: The maximum size of a transaction pool content and status inspections batch.
- `maxQueuedTxPoolContentStatusInspectAllBatchWorkers`: The maximum number of workers that can be used for transaction pool content and status inspections batch.
- `maxQueuedTxPoolContentStatusInspectAllBatchTimeout`: The maximum time allowed for a transaction pool content and status inspections batch to complete.
- `maxQueuedTxPoolContentStatusInspectAllBatchRetryBackoff`: The backoff time between retries for # Download Tester

The `downloadTester` package provides a way to simulate block downloads from peers in the Ethereum network. It is used for testing purposes to ensure that the downloader can handle various scenarios and edge cases.

## Functions

### `NewDownloadTester`

```go
func NewDownloadTester(chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, downloader *downloader.Downloader) *downloadTester
```

`NewDownloadTester` creates a new instance of the `downloadTester` struct. It takes in a `consensus.ChainReader`, `eth.Engine`, `eth.HeaderChainReader`, `eth.BodyChainReader`, `trie.Database`, and a `downloader.Downloader` as parameters. It returns a pointer to a new `downloadTester` struct.

### `(*downloadTester) Start`

```go
func (dl *downloadTester) Start()
```

`Start` starts the download tester. It initializes the downloader and starts the peer simulation.

### `(*downloadTester) Stop`

```go
func (dl *downloadTester) Stop()
```

`Stop` stops the download tester. It stops the peer simulation and shuts down the downloader.

### `(*downloadTester) newPeer`

```go
func (dl *downloadTester) newPeer(id string, version uint, blocks []*types.Block) *downloadTesterPeer
```

`newPeer` registers a new block download source into the downloader. It takes in a `string` `id`, a `uint` `version`, and a slice of `*types.Block` `blocks` as parameters. It returns a pointer to a new `downloadTesterPeer` struct.

### `(*downloadTester) dropPeer`

```go
func (dl *downloadTester) dropPeer(id string)
```

`dropPeer` simulates a hard peer removal from the connection pool. It takes in a `string` `id` as a parameter.

### `(*downloadTesterPeer) Head`

```go
func (dlp *downloadTesterPeer) Head() (common.Hash, *big.Int)
```

`Head` constructs a function to retrieve a peer's current head hash and total difficulty. It returns a `common.Hash` and a `*big.Int`.

### `unmarshalRlpHeaders`

```go
func unmarshalRlpHeaders(rlpdata []rlp.RawValue) []*types.Header
```

`unmarshalRlpHeaders` unmarshals a slice of `rlp.RawValue` `rlpdata` into a slice of `*types.Header`. It returns a slice of `*types.Header`.

### `(*downloadTesterPeer) RequestHeadersByHash`

```go
func (dlp *downloadTesterPeer) RequestHeadersByHash(origin common.Hash, amount int, skip int, reverse bool, sink chan *eth.Response) (*eth.Request, error)
```

`RequestHeadersByHash` constructs a `GetBlockHeaders` function based on a hashed origin associated with a particular peer in the download tester. The returned function can be used to retrieve batches of headers from the particular peer. It takes in a `common.Hash` `origin`, an `int` `amount`, an `int` `skip`, a `bool` `reverse`, and a channel of `*eth.Response` `sink` as parameters. It returns a pointer to an `eth.Request` and an `error`.

### `(*downloadTesterPeer) RequestHeadersByNumber`

```go
func (dlp *downloadTesterPeer) RequestHeadersByNumber(origin uint64, amount int, skip int, reverse bool, sink chan *eth.Response) (*eth.Request, error)
```

`RequestHeadersByNumber` constructs a `GetBlockHeaders` function based on a numbered origin associated with a particular peer in the download tester. The returned function can be used to retrieve batches of headers from the particular peer. It takes in a `uint64` `origin`, an `int` `amount`, an `int` `skip`, a `bool` `reverse`, and a channel of `*eth.Response` `sink` as parameters. It returns a pointer to an `eth.Request` and an `error`. This code is written in Go and is part of the `fetcher` package. It contains several functions that are used to fetch blocks, headers, and receipts from the Ethereum network. 

The `RequestHeaders` function is used to request headers from a particular peer in the download tester. It takes a slice of hashes as input and returns a request object and an error. The function first checks if the peer is simulating withholding headers and deletes them. It then creates a slice of hashes from the headers and delivers the headers to the downloader. Finally, it returns the request object and nil error.

The `RequestBodies` function is used to request block bodies from a particular peer in the download tester. It takes a slice of hashes as input and returns a request object and an error. The function first retrieves the block bodies from the requested peer and decodes them. It then calculates the transaction and uncle hashes for each block body and creates a request object. Finally, it delivers the request object to the downloader and returns the request object and nil error.

The `RequestReceipts` function is used to request receipts from a particular peer in the download tester. It takes a slice of hashes as input and returns a request object and an error. The function first retrieves the receipts from the requested peer and decodes them. It then calculates the hashes for each receipt and creates a request object. Finally, it delivers the request object to the downloader and returns the request object and nil error.

The `ID` function is used to retrieve the unique identifier of a peer.

The `RequestAccountRange` function is used to fetch a batch of accounts rooted in a specific account trie, starting with the origin. It takes an ID, root, origin, limit, and bytes as input and returns an error. The function creates a request object and services it. It then converts the slim format to non-slim format and delegates to the packet code. Finally, it delivers the request object to the downloader and returns nil error. ## Documentation for Go Ethereum Source Code

### Introduction

This documentation provides a clear and concise description of the functions in the Go Ethereum source code. The codebase is written in Go and is used to build decentralized applications on the Ethereum blockchain. The codebase is divided into several packages, each with its own set of functions.

### Fetcher Package

The `fetcher` package contains the announcement-based header, blocks, or transaction synchronization. It provides a way to fetch blocks and headers from the Ethereum network.

#### Constants

- `lightTimeout`: Time allowance before an announced header is explicitly requested.
- `arriveTimeout`: Time allowance before an announced block/transaction is explicitly requested.
- `gatherSlack`: Interval used to collate almost-expired announces with fetches.
- `fetchTimeout`: Maximum allotted time to return an explicitly requested block/transaction.
- `maxUncleDist`: Maximum allowed backward distance from the chain head.
- `maxQueueDist`: Maximum allowed distance from the chain head to queue.
- `hashLimit`: Maximum number of unique blocks or headers a peer may have announced.
- `blockLimit`: Maximum number of unique blocks a peer may have delivered.

#### Variables

- `blockAnnounceInMeter`: A metrics meter that tracks the number of incoming block announces.
- `blockAnnounceOutTimer`: A metrics timer that tracks the time it takes to process an outgoing block announce.
- `blockAnnounceDropMeter`: A metrics meter that tracks the number of dropped block announces.
- `blockAnnounceDOSMeter`: A metrics meter that tracks the number of block announces that are considered Denial of Service (DoS) attacks.
- `blockBroadcastInMeter`: A metrics meter that tracks the number of incoming block broadcasts.
- `blockBroadcastOutTimer`: A metrics timer that tracks the time it takes to process an outgoing block broadcast.
- `blockBroadcastDropMeter`: A metrics meter that tracks the number of dropped block broadcasts.
- `blockBroadcastDOSMeter`: A metrics meter that tracks the number of block broadcasts that are considered Denial of Service (DoS) attacks.
- `headerFetchMeter`: A metrics meter that tracks the number of header fetches.
- `bodyFetchMeter`: A metrics meter that tracks the number of body fetches.
- `headerFilterInMeter`: A metrics meter that tracks the number of incoming header filters.
- `headerFilterOutMeter`: A metrics meter that tracks the number of outgoing header filters.
- `bodyFilterInMeter`: A metrics meter that tracks the number of incoming body filters.
- `bodyFilterOutMeter`: A metrics meter that tracks the number of outgoing body filters.

#### Functions

##### `NewBlockFetcher`

This function creates a new block fetcher.

```go
func NewBlockFetcher(chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, headerRetrievalFn HeaderRetrievalFn, blockRetrievalFn blockRetrievalFn, announceLimit uint64, broadcastLimit uint64, fetcherLimit uint64, fetcherTimeout time.Duration, fetcherBackoff time.Duration, fetcherRetries int, fetcherRetryBackoff time.Duration, fetcherBurst int, fetcherQueue int, fetcherBatch int, fetcherWorkers int, fetcherIngress int, fetcherTimeoutIngress time.Duration, fetcherTimeoutEgress time.Duration, fetcherTimeoutBlock time.Duration, fetcherTimeoutTx time.Duration, fetcherTimeoutHeader time.Duration, fetcherTimeoutBody time.Duration, fetcherTimeoutFilter time.Duration, fetcherTimeoutUncle time.Duration, fetcherTimeoutState time.Duration, fetcherTimeoutReceipt time.Duration, fetcherTimeoutCode time.Duration, fetcherTimeoutProof time.Duration, fetcherTimeoutHeaderProof time.Duration, fetcherTimeoutAccountProof time.Duration, fetcherTimeoutStorageProof time.Duration, fetcherTimeoutCodeProof time.Duration, fetcherTimeoutTxProof time.Duration, fetcherTimeoutTxLookup time.Duration, fetcherTimeoutTxPool time.Duration, fetcherTimeoutTxPoolContent time.Duration, fetcherTimeoutTxPoolStatus time.Duration This is a test file for the `fetcher` package. It contains four test functions: `TestThrottling66Full`, `TestThrottling66Snap`, `TestThrottling67Full`, and `TestThrottling67Snap`. These tests check that if a large batch of blocks are being downloaded, it is throttled until the cached blocks are retrieved. The `testThrottling` function is called by each of these tests and takes a testing object, a protocol version, and a synchronization mode as arguments.

The `testThrottling` function creates a new tester object and a long block chain to download. It then wraps the importer to allow stepping and starts a synchronization concurrently. The function iteratively takes some blocks, always checking the retrieval count. It waits a bit for sync to throttle itself and makes sure that the cache is filled up and then exhausts it. Finally, it checks that we haven't pulled more blocks than available.

The file also contains three test functions: `TestForkedSync66Full`, `TestForkedSync66Snap`, and `TestForkedSync66Light`. These tests check that simple synchronization against a forked chain works correctly. In this test, common ancestor lookup should *not* be short-circuited, and a full binary search should be executed. The `testForkedSync` function is called by each of these tests and takes a testing object, a protocol version, and a synchronization mode as arguments. The code above is a set of test functions for the `sync` package. These tests are used to ensure that the synchronization of blocks between peers works as expected. 

The `testForkedSync` function tests the synchronization of two forks of the same chain. It creates two peers, each with a different fork of the chain, and synchronizes with them using the specified sync mode. The function then checks that all blocks were retrieved and that the chain length matches the expected length.

The `testHeavyForkedSync` function tests the synchronization of a heavy fork with a much shorter but much heavier fork. It creates two peers, one with a light fork and the other with a heavy fork, and synchronizes with them using the specified sync mode. The function then checks that all blocks were retrieved and that the chain length matches the expected length.

The `testBoundedForkedSync` function tests that chain forks are contained within a certain interval of the current chain head. It creates two peers, one with the original chain and the other with a rewriter chain, and synchronizes with them using the specified sync mode. The function then checks that all blocks were retrieved and that the chain length matches the expected length.

Each test function has multiple variations, each with a different sync mode and protocol version. These variations are used to test the synchronization under different conditions.

Overall, these tests ensure that the synchronization of blocks between peers works as expected and that chain forks are handled correctly. This is a test file for the `downloader` package in the Ethereum Go implementation. It contains several test functions that test different scenarios for synchronizing blocks with peers.

The `TestBoundedForkedSync` function tests that chain forks are contained within a certain interval of the current chain head for short forks. It creates two chains, `chainA` and `chainB`, and synchronizes with the first chain. Then it synchronizes with the second chain and ensures that the fork is rejected as being too old.

The `TestBoundedHeavyForkedSync` function is similar to `TestBoundedForkedSync`, but it tests heavy forks instead of short forks.

The `TestCancel` function tests that a canceled download wipes all previously accumulated state. It creates a chain and synchronizes with a peer. Then it cancels the download and checks that the download queue is idle.

The `TestMultiSynchronisation` function tests that synchronization from multiple peers works as intended. It creates a chain and synchronizes with multiple peers simultaneously.

Each test function has several variations that test different synchronization modes and Ethereum protocol versions. ## Function: on66Light(t *testing.T)

This function is a test function that tests the multi-synchronization of blocks in the Ethereum network. It takes a testing object and uses the `testMultiSynchronisation` function to test the synchronization of blocks in the Ethereum network using the `LightSync` mode. It is called when the `TestMultiSynchronisation66Light` function is called.

## Function: TestMultiSynchronisation67Full(t *testing.T)

This function is a test function that tests the multi-synchronization of blocks in the Ethereum network. It takes a testing object and uses the `testMultiSynchronisation` function to test the synchronization of blocks in the Ethereum network using the `FullSync` mode. It is called when the `TestMultiSynchronisation67Full` function is called.

## Function: TestMultiSynchronisation67Snap(t *testing.T)

This function is a test function that tests the multi-synchronization of blocks in the Ethereum network. It takes a testing object and uses the `testMultiSynchronisation` function to test the synchronization of blocks in the Ethereum network using the `SnapSync` mode. It is called when the `TestMultiSynchronisation67Snap` function is called.

## Function: TestMultiSynchronisation67Light(t *testing.T)

This function is a test function that tests the multi-synchronization of blocks in the Ethereum network. It takes a testing object and uses the `testMultiSynchronisation` function to test the synchronization of blocks in the Ethereum network using the `LightSync` mode. It is called when the `TestMultiSynchronisation67Light` function is called.

## Function: testMultiSynchronisation(t *testing.T, protocol uint, mode SyncMode)

This function is used to test the synchronization of blocks in the Ethereum network. It takes a testing object, a protocol version, and a synchronization mode as input parameters. It creates various peers with various parts of the chain and synchronizes them. It then checks if all blocks were retrieved and if no peers have been dropped off. It is called by the `on66Light(t *testing.T)`, `TestMultiSynchronisation67Full(t *testing.T)`, `TestMultiSynchronisation67Snap(t *testing.T)`, and `TestMultiSynchronisation67Light(t *testing.T)` functions.

## Function: TestMultiProtoSynchronisation66Full(t *testing.T)

This function is a test function that tests the synchronization of blocks in the Ethereum network in multi-version protocol environments. It takes a testing object and uses the `testMultiProtoSync` function to test the synchronization of blocks in the Ethereum network using the `FullSync` mode. It is called when the `TestMultiProtoSynchronisation66Full` function is called.

## Function: TestMultiProtoSynchronisation66Snap(t *testing.T)

This function is a test function that tests the synchronization of blocks in the Ethereum network in multi-version protocol environments. It takes a testing object and uses the `testMultiProtoSync` function to test the synchronization of blocks in the Ethereum network using the `SnapSync` mode. It is called when the `TestMultiProtoSynchronisation66Snap` function is called.

## Function: TestMultiProtoSynchronisation66Light(t *testing.T)

This function is a test function that tests the synchronization of blocks in the Ethereum network in multi-version protocol environments. It takes a testing object and uses the `testMultiProtoSync` function to test the synchronization of blocks in the Ethereum network using the `LightSync` mode. It is called when the `TestMultiProtoSynchronisation66Light` function is called.

## Function: TestMultiProtoSynchronisation67Full(t *testing.T)

This function is a test function that tests the synchronization of blocks in the Ethereum network in multi-version protocol environments. It takes a testing object and uses the `testMultiProtoSync` function to test the synchronization of blocks in the Ethereum network using the `FullSync` mode. It is called when the `TestMulti This is a test file containing several test functions that test the functionality of the `downloader` package. 

The first test function `TestBodyAndReceiptFetch` tests the body and receipt fetch functionality of the downloader. It creates a new tester instance and sets up a new peer with a chain of blocks. It then sets up hooks to track the number of bodies and receipts that are fetched. The function then synchronizes with the peer and ensures that all blocks were retrieved. Finally, it validates the number of block bodies and receipts that should have been requested.

The next set of test functions `TestMissingHeaderAttack66Full`, `TestMissingHeaderAttack66Snap`, `TestMissingHeaderAttack66Light`, `TestMissingHeaderAttack67Full`, `TestMissingHeaderAttack67Snap`, and `TestMissingHeaderAttack67Light` test the downloader's ability to handle missing headers. These functions create a new tester instance and set up a chain of blocks. They then set up an attacker peer that withholds headers at a specific block height. The function then attempts to synchronize with the attacker peer and ensures that the synchronization fails. Finally, it synchronizes with a valid peer and ensures that the synchronization succeeds.

The last set of test functions `TestShiftedHeaderAttack66Full`, `TestShiftedHeaderAttack66Snap`, `TestShiftedHeaderAttack66Light`, `TestShiftedHeaderAttack67Full`, `TestShiftedHeaderAttack67Snap`, and `TestShiftedHeaderAttack67Light` test the downloader's ability to handle shifted headers. These functions create a new tester instance and set up a chain of blocks. They then set up an attacker peer that feeds shifted headers. The function then attempts to synchronize with the attacker peer and ensures that the synchronization fails. Finally, it synchronizes with a valid peer and ensures that the synchronization succeeds. This is a test file for the `eth/downloader` package. It contains tests for various scenarios where the downloader is expected to rollback headers and blocks due to invalid data received from peers.

The first test, `TestInvalidHeaderRollbackFastSync`, tests that upon detecting an invalid header, the recent ones are rolled back for a fast sync. It creates a small block chain and attempts to sync with an attacker that feeds junk during the fast sync phase. This should result in the last `fsHeaderSafetyNet` headers being rolled back.

The second test, `TestInvalidHeaderRollbackFullSync`, is similar to the first test, but for a full sync. It creates a small block chain and attempts to sync with an attacker that feeds junk during the block import phase. This should result in both the last `fsHeaderSafetyNet` number of headers being rolled back, and also the pivot point being reverted to a non-block status.

The third test, `TestInvalidHeaderRollback66Snap` and `TestInvalidHeaderRollback67Snap`, are variations of the second test for different Ethereum protocol versions.

The fourth test, `TestWithholdAttacker`, tests that the downloader can handle an attacker that withholds promised blocks after the fast sync pivot point. This could be a trial to leave the node with a bad but already imported pivot block. It creates a small block chain and attempts to sync with an attacker that withholds promised blocks after the fast sync pivot point. This should result in the headers being rolled back.

Overall, these tests ensure that the downloader can handle various scenarios where invalid data is received from peers and can rollback headers and blocks accordingly. This is a test file containing several test functions that test different scenarios of the synchronization process in the Ethereum network. Each test function has a clear and concise description of what it tests.

The `TestFastSyncRollback` function tests that the fast sync pivot block is rolled back when a peer with a higher total difficulty is found. It creates a test chain and syncs it with a peer that has a higher total difficulty. Then, it checks that the fast sync pivot block is rolled back and that a fresh full sync is performed.

The `TestHighTDStarvationAttack` functions test that a peer advertising a high total difficulty doesn't get to stall the downloader by not sending any useful hashes. It creates a test chain and syncs it with a peer that advertises a high total difficulty. Then, it checks that the synchronization fails with an error indicating that the peer is stalling.

The `TestBlockHeaderAttackerDropping` functions test that misbehaving peers are disconnected, while behaving ones are not. It defines several test cases with different error results and checks that the peer is dropped or not depending on the error result.

All test functions use the `newTester` function to create a new tester instance and the `terminate` function to terminate it after the test is finished. They also use the `testChainBase` variable to create a test chain. Finally, they call the `sync` function to synchronize the chain with a peer and check the result. ## Documentation for Source Code

### `func TestSyncProgress66Full(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH66 protocol in FullSync mode.

### `func TestSyncProgress66Snap(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH66 protocol in SnapSync mode.

### `func TestSyncProgress66Light(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH66 protocol in LightSync mode.

### `func TestSyncProgress67Full(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH67 protocol in FullSync mode.

### `func TestSyncProgress67Snap(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH67 protocol in SnapSync mode.

### `func TestSyncProgress67Light(t *testing.T)`

This function is a test function that tests the synchronization progress of the Ethereum network. It tests the progress of the network for the ETH67 protocol in LightSync mode.

### `func testSyncProgress(t *testing.T, protocol uint, mode SyncMode)`

This function is a helper function that tests the synchronization progress of the Ethereum network. It takes in the testing object, the protocol version, and the synchronization mode as parameters.

### `func checkProgress(t *testing.T, d *Downloader, stage string, want ethereum.SyncProgress)`

This function is a helper function that checks the synchronization progress of the Ethereum network. It takes in the testing object, the downloader object, the stage of the synchronization, and the expected synchronization progress as parameters.

### `func (d *Downloader) LegacySync(id string, genesis common.Hash, td *big.Int, head *common.Hash, mode SyncMode) error`

This function is used to synchronize the Ethereum network with a peer. It takes in the peer ID, the genesis block hash, the total difficulty of the network, the head block hash, and the synchronization mode as parameters. It returns an error if the synchronization fails.

### `func (d *Downloader) Progress() ethereum.SyncProgress`

This function returns the current synchronization progress of the Ethereum network.

### `func NewBlockFetcher(chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, headerRetrievalFn HeaderRetrievalFn, blockRetrievalFn blockRetrievalFn, announceLimit uint64, broadcastLimit uint64, fetcherLimit uint64, fetcherTimeout time.Duration, fetcherBackoff time.Duration, fetcherRetries int, fetcherRetryBackoff time.Duration, fetcherBurst int, fetcherQueue int, fetcherBatch int, fetcherWorkers int, fetcherIngress int, fetcherTimeoutIngress time.Duration, fetcherTimeoutEgress time.Duration, fetcherTimeoutBlock time.Duration, fetcherTimeoutTx time.Duration, fetcherTimeoutHeader time.Duration, fetcherTimeoutBody time.Duration, fetcherTimeoutFilter time.Duration, fetcherTimeoutUncle time.Duration, fetcherTimeoutState time.Duration, fetcherTimeoutReceipt time.Duration, fetcherTimeoutCode time.Duration, fetcherTimeoutProof time.Duration, fetcherTimeoutHeaderProof time.Duration, fetcherTimeoutAccountProof time.Duration, fetcherTimeoutStorageProof time.Duration, fetcherTimeoutCodeProof time.Duration, fetcherTimeoutTxProof time.Duration, fetcherTimeoutTxLookup time.Duration, fetcherTimeoutTxPool time.Duration, fetcherTimeoutTxPoolContent time.Duration, fetcherTimeoutTxPoolStatus time.Duration, fetcherTimeoutTxPoolInspect time.Duration, fetcherTimeoutTxPoolContentInspect time.Duration, fetcherTimeoutTxPoolStatusInspect time.Duration, fetcherTimeoutTxPoolContentStatusInspect time.Duration, fetcherTimeoutTxPoolInspectAll time.Duration, fetcherTimeoutTxPoolContentInspectAll time.Duration, fetch ## TestForkedSyncProgress

The `TestForkedSyncProgress` function is a test function that checks if the synchronization progress is tracked and updated correctly in case of a fork (or manual head revertal). It takes in a testing object `t`, a protocol version `protocol`, and a synchronization mode `mode`. It creates a new tester object, sets a sync init hook to catch progress changes, and synchronizes with one of the forks and checks progress. It then simulates a successful sync above the fork, synchronizes with the second fork, and checks final progress after successful sync.

## TestFailedSyncProgress

The `TestFailedSyncProgress` function is a test function that checks if the progress origin is not updated in the next sync cycle if synchronization is aborted due to some failure. It takes in a testing object `t`, a protocol version `protocol`, and a synchronization mode `mode`. It creates a new tester object, sets a sync init hook to catch progress changes, and synchronizes with one of the forks and checks progress. It then aborts the synchronization due to some failure and synchronizes again to check if the progress origin is not updated. This is a test function that tests the synchronization of blocks with a faulty peer. It creates a new tester instance and sets a sync init hook to catch progress changes. It then attempts a full sync with a faulty peer by withholding headers from a specific block. After the sync fails, it synchronizes with a good peer and checks that the progress origin remains the same after the failure. Finally, it checks the final progress after a successful sync.

The `testFakedSyncProgress` function tests that if an attacker fakes a chain height, after the attack is detected, the progress height is successfully reduced at the next sync invocation. It creates a new tester instance and sets a sync init hook to catch progress changes. It then creates and syncs with an attacker that promises a higher chain than available. The attacker withholds headers from a specific block. After the sync fails, it synchronizes with the correct chain and checks that the progress origin remains the same after the failure. Finally, it checks the final progress after a successful sync.

These test functions are used to ensure that the synchronization of blocks with peers works correctly and that the progress height is correctly updated after a failed sync. ## Introduction

This document provides documentation for the source code of a software project. The codebase is written in Go and is intended to be used as a peer-to-peer network for Ethereum. The codebase is designed to provide a way to fetch blocks and headers from the Ethereum network.

## Fetcher Package

The `fetcher` package contains the announcement-based header, blocks, or transaction synchronization. It provides a way to fetch blocks and headers from the Ethereum network.

### Constants

- `lightTimeout`: Time allowance before an announced header is explicitly requested.
- `arriveTimeout`: Time allowance before an announced block/transaction is explicitly requested.
- `gatherSlack`: Interval used to collate almost-expired announces with fetches.
- `fetchTimeout`: Maximum allotted time to return an explicitly requested block/transaction.
- `maxUncleDist`: Maximum allowed backward distance from the chain head.
- `maxQueueDist`: Maximum allowed distance from the chain head to queue.
- `hashLimit`: Maximum number of unique blocks or headers a peer may have announced.
- `blockLimit`: Maximum number of unique blocks a peer may have delivered.

### Variables

- `blockAnnounceInMeter`: A metrics meter that tracks the number of incoming block announces.
- `blockAnnounceOutTimer`: A metrics timer that tracks the time it takes to process an outgoing block announce.
- `blockAnnounceDropMeter`: A metrics meter that tracks the number of dropped block announces.
- `blockAnnounceDOSMeter`: A metrics meter that tracks the number of block announces that are considered Denial of Service (DoS) attacks.
- `blockBroadcastInMeter`: A metrics meter that tracks the number of incoming block broadcasts.
- `blockBroadcastOutTimer`: A metrics timer that tracks the time it takes to process an outgoing block broadcast.
- `blockBroadcastDropMeter`: A metrics meter that tracks the number of dropped block broadcasts.
- `blockBroadcastDOSMeter`: A metrics meter that tracks the number of block broadcasts that are considered Denial of Service (DoS) attacks.
- `headerFetchMeter`: A metrics meter that tracks the number of header fetches.
- `bodyFetchMeter`: A metrics meter that tracks the number of body fetches.
- `headerFilterInMeter`: A metrics meter that tracks the number of incoming header filters.
- `headerFilterOutMeter`: A metrics meter that tracks the number of outgoing header filters.
- `bodyFilterInMeter`: A metrics meter that tracks the number of incoming body filters.
- `bodyFilterOutMeter`: A metrics meter that tracks the number of outgoing body filters.

### Functions

#### `NewBlockFetcher`

This function creates a new block fetcher.

```go
func NewBlockFetcher(chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, headerRetrievalFn HeaderRetrievalFn, blockRetrievalFn blockRetrievalFn, announceLimit uint64, broadcastLimit uint64, fetcherLimit uint64, fetcherTimeout time.Duration, fetcherBackoff time.Duration, fetcherRetries int, fetcherRetryBackoff time ## Function `testBeaconSync`

This function is a test function that tests the synchronization of a beacon chain with a peer. It takes in three parameters: a testing object, a protocol version, and a synchronization mode. The function tests four different scenarios of beacon chain synchronization with a peer, each with a different length of the local chain.

The function creates a new tester object and sets up a peer with a given protocol version and a chain of blocks. It then builds a local chain segment if required and attempts to synchronize the beacon chain with the peer using the `BeaconSync` function of the downloader. If the synchronization is successful, the function checks if the number of synchronized blocks matches the expected number of blocks.

## Function `testBeaconSync66Full`

This function is a test function that tests the synchronization of a beacon chain with a peer using the ETH66 protocol version and a full synchronization mode. It calls the `testBeaconSync` function with the testing object, ETH66 protocol version, and FullSync mode.

## Function `testBeaconSync66Snap`

This function is a test function that tests the synchronization of a beacon chain with a peer using the ETH66 protocol version and a snapshot synchronization mode. It calls the `testBeaconSync` function with the testing object, ETH66 protocol version, and SnapSync mode.

## Function `testChainBase.shorten`

This function is used to shorten a chain of blocks to a given length. It takes in an integer parameter that represents the desired length of the chain and returns a new chain of blocks with the desired length.

## Function `assertOwnChain`

This function is used to assert that the chain owned by the tester object matches the expected length. It takes in three parameters: a testing object, a tester object, and an integer representing the expected length of the chain. The function checks if the length of the chain owned by the tester object matches the expected length and fails the test if they do not match.

## Function `newTester`

This function is used to create a new tester object. It takes in a testing object and returns a new tester object.

## Function `newTesterWithNotification`

This function is used to create a new tester object with a notification function. It takes in a testing object and a notification function and returns a new tester object. The notification function is called when the downloader is fully cancelled after a sync cycle.

## Function `tester.terminate`

This function is used to terminate the tester object. It takes in no parameters and terminates the tester object.