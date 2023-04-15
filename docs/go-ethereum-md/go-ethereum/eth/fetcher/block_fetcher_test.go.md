## Introduction

This code is part of the go-ethereum library, which is a free and open-source software for building decentralized applications on the Ethereum blockchain. The `fetcher` package provides a block fetcher that retrieves blocks from the Ethereum network and verifies their validity.

## Variables

- `testdb`: a `rawdb.Database` object that represents an in-memory database used for testing.
- `testKey`: a `crypto.PrivateKey` object that represents a private key used for testing.
- `testAddress`: a `common.Address` object that represents the public address corresponding to `testKey`.
- `gspec`: a `core.Genesis` object that represents the genesis block of the Ethereum blockchain.
- `genesis`: a `*types.Block` object that represents the genesis block of the Ethereum blockchain.
- `unknownBlock`: a `*types.Block` object that represents an unknown block.

## Functions

### makeChain

```go
func makeChain(n int, seed byte, parent *types.Block) ([]common.Hash, map[common.Hash]*types.Block)
```

The `makeChain` function creates a chain of `n` blocks starting at and including `parent`. The returned hash chain is ordered `head->parent`. In addition, every 3rd block contains a transaction and every 5th an uncle to allow testing correct block reassembly.

- `n`: an integer that represents the number of blocks to create.
- `seed`: a byte that represents the seed for the coinbase address.
- `parent`: a `*types.Block` object that represents the parent block.

Returns:
- `[]common.Hash`: a slice of `common.Hash` objects that represents the hash chain.
- `map[common.Hash]*types.Block`: a map that maps block hashes to `*types.Block` objects.

### fetcherTester

```go
type fetcherTester struct {
    fetcher *BlockFetcher
    hashes  []common.Hash
    headers map[common.Hash]*types.Header
    blocks  map[common.Hash]*types.Block
    drops   map[string]bool
}
```

The `fetcherTester` struct is a test simulator for mocking out local block chain.

- `fetcher`: a `*BlockFetcher` object that represents the block fetcher.
- `hashes`: a slice of `common.Hash` objects that represents the hash chain belonging to the tester.
- `headers`: a map that maps block hashes to `*types.Header` objects belonging to the tester.
- `blocks`: a map that maps block hashes to `*types.Block` objects belonging to the tester.
- `drops`: a map that maps peer IDs to boolean values indicating whether the peer should be dropped. ## Introduction

This source code implements a fetcher test mocker for the Ethereum blockchain. The fetcher test mocker is used to test the block fetcher, which is responsible for fetching blocks from the Ethereum network.

## Functions

### newTester

`newTester` creates a new fetcher test mocker. It initializes the fetcher test mocker with a genesis block and starts the block fetcher.

```go
func newTester(light bool) *fetcherTester
```

### getHeader

`getHeader` retrieves a header from the tester's block chain.

```go
func (f *fetcherTester) getHeader(hash common.Hash) *types.Header
```

### getBlock

`getBlock` retrieves a block from the tester's block chain.

```go
func (f *fetcherTester) getBlock(hash common.Hash) *types.Block
```

### verifyHeader

`verifyHeader` is a nop placeholder for the block header verification.

```go
func (f *fetcherTester) verifyHeader(header *types.Header) error
```

### broadcastBlock

`broadcastBlock` is a nop placeholder for the block broadcasting.

```go
func (f *fetcherTester) broadcastBlock(block *types.Block, propagate bool)
```

### chainHeight

`chainHeight` retrieves the current height (block number) of the chain.

```go
func (f *fetcherTester) chainHeight() uint64
```

### insertHeaders

`insertHeaders` injects new headers into the simulated chain.

```go
func (f *fetcherTester) insertHeaders(headers []*types.Header) (int, error)
```

### insertChain

`insertChain` injects new blocks into the simulated chain.

```go
func (f *fetcherTester) insertChain(blocks types.Blocks) (int, error)
```

### dropPeer

`dropPeer` is an emulator for the peer removal, simply accumulating the various peers dropped by the fetcher.

```go
func (f *fetcherTester) dropPeer(peer string)
```

### makeHeaderFetcher

`makeHeaderFetcher` retrieves a block header fetcher associated with a simulated peer.

```go
func (f *fetcherTester) makeHeaderFetcher(peer string, blocks map[common.Hash]*types.Block, drift time.Duration) headerRequesterFn
``` # Documentation for fetcher_test.go

This file contains test functions for the `fetcher` package. The `fetcher` package provides functionality for fetching blocks and block bodies from Ethereum nodes.

## Functions

### `makeHeaderFetcher`

This function creates a block header fetcher associated with a simulated peer. It takes a `peer` string, a map of block hashes to blocks, and a `drift` duration as input parameters. It returns a `headerRequesterFn` function that can be used to fetch block headers.

### `makeBodyFetcher`

This function retrieves a block body fetcher associated with a simulated peer. It takes a `peer` string, a map of block hashes to blocks, and a `drift` duration as input parameters. It returns a `bodyRequesterFn` function that can be used to fetch block bodies.

### `verifyFetchingEvent`

This function verifies that one single event arrives on a fetching channel. It takes a testing object `t`, a `fetching` channel, and a boolean `arrive` as input parameters. If `arrive` is true, the function waits for an event to arrive on the `fetching` channel. If `arrive` is false, the function waits for a short period of time to ensure that no event arrives on the `fetching` channel.

### `verifyCompletingEvent`

This function verifies that one single event arrives on a completing channel. It takes a testing object `t`, a `completing` channel, and a boolean `arrive` as input parameters. If `arrive` is true, the function waits for an event to arrive on the `completing` channel. If `arrive` is false, the function waits for a short period of time to ensure that no event arrives on the `completing` channel.

### `verifyImportEvent`

This function verifies that one single event arrives on an import channel. It takes a testing object `t`, an `imported` channel, and a boolean `arrive` as input parameters. If `arrive` is true, the function waits for an event to arrive on the `imported` channel. If `arrive` is false, the function waits for a short period of time to ensure that no event arrives on the `imported` channel.

### `verifyImportCount`

This function verifies that exactly `count` number of events arrive on an import hook channel. It takes a testing object `t`, an `imported` channel, and an integer `count` as input parameters. The function waits for `count` number of events to arrive on the `imported` channel.

### `verifyImportDone`

This function verifies that no more events are arriving on an import channel. It takes a testing object `t` and an `imported` channel as input parameters. The function waits for a short period of time to ensure that no more events arrive on the `imported` channel.

### `verifyChainHeight`

This function verifies that the chain height is as expected. It takes a testing object `t`, a `fetcher` object, and a `height` uint64 as input parameters. The function checks that the chain height of the `fetcher` object is equal to `height`. This source code is a test suite for the Ethereum block fetcher. The fetcher is responsible for retrieving blocks and headers from the network and importing them into the local chain. The test suite includes tests for sequential and concurrent block/header announcements, ensuring that the fetcher correctly retrieves and imports blocks and headers.

The `testSequentialAnnouncements` function tests that the fetcher accepts block/header announcements and initiates retrievals for them, successfully importing into the local chain. It creates a chain of blocks to import and iteratively announces blocks until all are imported. The `importedHook` function is set to verify that the blocks/headers are imported correctly. The function takes a boolean value `light` that indicates whether the test is for a full or light client.

The `testConcurrentAnnouncements` function tests that if blocks are announced by multiple peers (or even the same buggy peer), they will only get downloaded at most once. It creates a chain of blocks to import and iteratively announces blocks until all are imported. The `importedHook` function is set to verify that the blocks/headers are imported correctly. The function takes a boolean value `light` that indicates whether the test is for a full or light client.

The `verifyImportEvent` function verifies that an import event has occurred. It takes a testing object `t`, a channel `imported`, and a boolean value `wantEvent`. If `wantEvent` is true, the function waits for an import event to occur and verifies that it is not nil. If `wantEvent` is false, the function waits for a timeout and verifies that no import event has occurred.

The `verifyImportDone` function verifies that all blocks/headers have been imported. It takes a testing object `t` and a channel `imported`. The function waits for a timeout and verifies that no more import events occur.

The `verifyChainHeight` function verifies that the chain height is correct. It takes a testing object `t`, a tester object `tester`, and an unsigned integer `height`. The function verifies that the chain height reported by the fetcher matches the expected height.

Overall, this test suite ensures that the Ethereum block fetcher correctly retrieves and imports blocks and headers from the network, even in the presence of concurrent announcements. ## Function Documentation

### `fyImportEvent(t, imported, true)`

This function is called to import events into the Ethereum node. It takes in three parameters: `t`, `imported`, and `true`. `t` is a testing object, `imported` is a channel that receives imported events, and `true` is a boolean value. The function calls `verifyImportDone` to verify that the import is complete, and then checks that no blocks were retrieved twice. Finally, it verifies the chain height.

### `TestFullOverlappingAnnouncements(t *testing.T)`

This function tests that announcements arriving while a previous one is being fetched still results in a valid import. It takes in one parameter, `t`, which is a testing object. It calls `testOverlappingAnnouncements` with `false` as the second parameter.

### `TestLightOverlappingAnnouncements(t *testing.T)`

This function tests that announcements arriving while a previous one is being fetched still results in a valid import. It takes in one parameter, `t`, which is a testing object. It calls `testOverlappingAnnouncements` with `true` as the second parameter.

### `testOverlappingAnnouncements(t *testing.T, light bool)`

This function tests that announcements arriving while a previous one is being fetched still results in a valid import. It takes in two parameters: `t`, which is a testing object, and `light`, which is a boolean value. It creates a chain of blocks to import, and then iteratively announces blocks, but overlaps them continuously. It then waits for all the imports to complete and checks the count.

### `TestFullPendingDeduplication(t *testing.T)`

This function tests that announces already being retrieved will not be duplicated. It takes in one parameter, `t`, which is a testing object. It calls `testPendingDeduplication` with `false` as the second parameter.

### `TestLightPendingDeduplication(t *testing.T)`

This function tests that announces already being retrieved will not be duplicated. It takes in one parameter, `t`, which is a testing object. It calls `testPendingDeduplication` with `true` as the second parameter.

### `testPendingDeduplication(t *testing.T, light bool)`

This function tests that announces already being retrieved will not be duplicated. It takes in two parameters: `t`, which is a testing object, and `light`, which is a boolean value. It creates a hash and corresponding block, and then announces the same block many times until it's fetched. It then checks that all blocks were imported and none fetched twice.

### `TestFullRandomArrival(t *testing.T)`

This function tests that announcements retrieved in a random order are cached and eventually imported when all the gaps are filled in. It takes in one parameter, `t`, which is a testing object. It calls `testRandomArrival` with `false` as the second parameter.

### `TestLightRandomArrival(t *testing.T)`

This function tests that announcements retrieved in a random order are cached and eventually imported when all the gaps are filled in. It takes in one parameter, `t`, which is a testing object. It calls `testRandomArrival` with `true` as the second parameter.

### `testRandomArrival(t *testing.T, light bool)`

This function tests that announcements retrieved in a random order are cached and eventually imported when all the gaps are filled in. It takes in two parameters: `t`, which is a testing object, and `light`, which is a boolean value. It creates a chain of blocks to import, and then randomly announces blocks until all the gaps are filled in. It then waits for all the imports to complete and checks the count. ## Documentation for `valImport` function

The `valImport` function is a test function that is used to test the import of a chain of blocks. It takes a testing object `t` as its argument and calls the `testRandomArrivalImport` function with the `light` parameter set to `false`. 

## Documentation for `TestLightRandomArrivalImport` function

The `TestLightRandomArrivalImport` function is a test function that is used to test the import of a chain of blocks. It takes a testing object `t` as its argument and calls the `testRandomArrivalImport` function with the `light` parameter set to `true`.

## Documentation for `testRandomArrivalImport` function

The `testRandomArrivalImport` function is used to test the import of a chain of blocks. It takes two arguments: a testing object `t` and a boolean value `light`. 

The function creates a chain of blocks to import and chooses one block to delay. It then creates a tester object and makes header and body fetchers. The function iteratively announces blocks, skipping one entry, and imports the remaining blocks. Finally, it announces the skipped entry and checks the full import.

## Documentation for `TestQueueGapFill` function

The `TestQueueGapFill` function is a test function that is used to test the direct block enqueues due to block propagation vs. hash announce. It creates a chain of blocks to import and chooses one block to not announce at all. It then creates a tester object and makes header and body fetchers. The function iteratively announces blocks, skipping one entry, and fills the missing block directly as if propagated. Finally, it verifies the import count and chain height.

## Documentation for `TestImportDeduplication` function

The `TestImportDeduplication` function is a test function that is used to test that blocks arriving from various sources (multiple propagations, hash announces, etc.) do not get scheduled for import multiple times. It creates two blocks to import (one for duplication, the other for stalling), creates a tester object, and wraps the importer with a counter. The function then instruments the fetching and imported events, announces the duplicate block, and verifies the import count and chain height. ## Function: TestPropagation

This function tests the propagation of blocks between nodes. It creates a chain of blocks and simulates the propagation of two blocks. The function first creates a tester instance and then creates a chain of blocks using the `makeChain` function. The function then sets the head of the tester instance to the middle block of the chain. The function then simulates the propagation of two blocks by notifying the fetcher of the tester instance of the arrival of the two blocks. The function then waits for the fetcher to retrieve the first block and then enqueues it three times. The function then waits for the fetcher to retrieve the second block and then enqueues it once. Finally, the function verifies that the import count is two and that the import invocation count is also two.

## Function: TestDistantPropagationDiscarding

This function tests that blocks with numbers much lower or higher than the current head of the chain get discarded to prevent wasting resources on useless blocks from faulty peers. The function first creates a long chain of blocks using the `makeChain` function and defines the discard boundaries. The function then creates a tester instance and simulates a head block being the middle of the above chain. The function then ensures that a block with a lower number than the threshold is discarded and that a block with a higher number than the threshold is also discarded.

## Function: TestFullDistantAnnouncementDiscarding and TestLightDistantAnnouncementDiscarding

These functions test that announcements with numbers much lower or higher than the current head of the chain get discarded to prevent wasting resources on useless blocks from faulty peers. The `TestFullDistantAnnouncementDiscarding` function tests the full node implementation, while the `TestLightDistantAnnouncementDiscarding` function tests the light node implementation. Both functions create a long chain of blocks using the `makeChain` function and define the discard boundaries. The functions then create a tester instance and simulate a head block being the middle of the above chain. The functions then ensure that a block with a lower number than the threshold is discarded and that a block with a higher number than the threshold is also discarded. ## Function: alf

This function is not defined in the codebase. 

## Function: TestFullInvalidNumberAnnouncement

This function tests that peers announcing blocks with invalid numbers get dropped as malicious. It creates a single block to import and check numbers against. Then, it creates a tester object and a bad header fetcher and a bad body fetcher. It also creates two channels, one for imported events and one for announced events. The importedHook function is set to send the header or block to the imported channel. The announceChangeHook function is set to send a nil value to the announced channel. The fetcher is notified with the bad header and body fetchers. The function then verifies that the fetcher has dropped the peer with the invalid numbered announcement. It then creates a good header fetcher and a good body fetcher and notifies the fetcher with them. The function then verifies that the fetcher has not dropped the peer with the valid numbered announcement.

## Function: TestLightInvalidNumberAnnouncement

This function is similar to TestFullInvalidNumberAnnouncement, but it tests for light clients.

## Function: testInvalidNumberAnnouncement

This function is called by TestFullInvalidNumberAnnouncement and TestLightInvalidNumberAnnouncement. It tests that peers announcing blocks with invalid numbers get dropped as malicious. It takes a tester object and a boolean indicating whether it is a light client or not. It creates a single block to import and check numbers against. It also creates a bad header fetcher and a bad body fetcher. It also creates two channels, one for imported events and one for announced events. The importedHook function is set to send the header or block to the imported channel. The announceChangeHook function is set to send a nil value to the announced channel. The fetcher is notified with the bad header and body fetchers. The function then verifies that the fetcher has dropped the peer with the invalid numbered announcement. It then creates a good header fetcher and a good body fetcher and notifies the fetcher with them. The function then verifies that the fetcher has not dropped the peer with the valid numbered announcement.

## Function: TestEmptyBlockShortCircuit

This function tests that if a block is empty (i.e. header only), no body request should be made, and instead the header should be assembled into a whole block in itself. It creates a chain of blocks to import. Then, it creates a tester object and a header fetcher and a body fetcher. It also creates three channels, one for fetching events, one for completing events, and one for imported events. The fetchingHook function is set to send the hashes to the fetching channel. The completingHook function is set to send the hashes to the completing channel. The importedHook function is set to send the block to the imported channel. The function iteratively announces blocks until all are imported. It verifies that all announces fetch the header and only blocks with data contents request bodies. # Block Fetcher

The `blockfetcher` package provides a block fetcher implementation for the Ethereum blockchain. The fetcher is responsible for retrieving blocks from peers and importing them into the local node's blockchain.

## Functions

### `NewBlockFetcher`

```go
func NewBlockFetcher(config *FetcherConfig, chain ChainReader, engine consensus.Engine, txpool TxPool, eventMux *event.TypeMux) *Fetcher
```

`NewBlockFetcher` creates a new block fetcher with the given configuration, chain reader, consensus engine, transaction pool, and event multiplexer.

### `(*Fetcher) Start`

```go
func (f *Fetcher) Start() error
```

`Start` starts the block fetcher.

### `(*Fetcher) Stop`

```go
func (f *Fetcher) Stop()
```

`Stop` stops the block fetcher.

### `(*Fetcher) Enqueue`

```go
func (f *Fetcher) Enqueue(peer string, block *types.Block)
```

`Enqueue` enqueues a block for retrieval from the given peer.

### `(*Fetcher) Notify`

```go
func (f *Fetcher) Notify(peer string, hash common.Hash, distance uint64, arrival time.Time, headerFetcher HeaderFetcher, bodyFetcher BodyFetcher)
```

`Notify` notifies the fetcher of a new block hash from the given peer.

### `(*Fetcher) HeaderFetcher`

```go
func (f *Fetcher) HeaderFetcher(peer string, hashes []common.Hash, number uint64) ([]*types.Header, error)
```

`HeaderFetcher` retrieves the headers for the given block hashes from the given peer.

### `(*Fetcher) BodyFetcher`

```go
func (f *Fetcher) BodyFetcher(peer string, hashes []common.Hash, number uint64) ([][]*types.Transaction, []*types.Receipts, error)
```

`BodyFetcher` retrieves the bodies for the given block hashes from the given peer.

### `(*Fetcher) SetImportedHook`

```go
func (f *Fetcher) SetImportedHook(hook func(header *types.Header, block *types.Block))
```

`SetImportedHook` sets the hook function to be called when a block is imported.

### `(*Fetcher) SetAnnounceChangeHook`

```go
func (f *Fetcher) SetAnnounceChangeHook(hook func(hash common.Hash, added bool))
```

`SetAnnounceChangeHook` sets the hook function to be called when a block announcement is added or removed.

### `(*Fetcher) SetQueueChangeHook`

```go
func (f *Fetcher) SetQueueChangeHook(hook func(hash common.Hash, added bool))
```

`SetQueueChangeHook` sets the hook function to be called when a block is enqueued or dequeued.

## Tests

The `blockfetcher_test.go` file contains tests for the block fetcher implementation. The tests cover the following scenarios:

- Tests that blocks can be fetched from peers and imported into the local blockchain.
- Tests that blocks can be enqueued for retrieval from peers.
- Tests that block announcements from peers are properly handled.
- Tests that the fetcher can handle a memory exhaustion attack from a peer sending an infinite number of block announcements.
- Tests that the fetcher can handle a memory exhaustion attack from a peer sending an infinite number of blocks. ## Function: TestFetcher_Queueing

This function is a unit test for the `fetcher` package. It tests the queueing behavior of the fetcher when receiving blocks from a peer. The test creates a `fetcher` instance and a `blockchain` instance, and generates a set of valid blocks to use as test data. 

The test then queues up a batch of blocks to the fetcher, and checks that the fetcher has correctly queued the blocks. It then inserts a missing block into the queue, and checks that the fetcher has correctly imported the missing block and all subsequent blocks. Finally, it inserts the remaining blocks in chunks to ensure that the fetcher's DOS protection mechanism is working correctly.

The function takes a single argument, `t`, which is a pointer to a `testing.T` instance. This argument is used to report test failures.

## Parameters:

- `t`: a pointer to a `testing.T` instance.

## Return Value:

This function does not return a value.

## Example Usage:

```go
func Test_TestFetcher_Queueing(t *testing.T) {
	// Create a new tester instance
	tester := newFetcherTester(t)

	// Generate a set of valid blocks
	blocks, hashes := generateBlocks(t, tester.blockchain, 100)

	// Set the maximum queue distance and block limit
	maxQueueDist := int(tester.fetcher.maxQueueDist)
	blockLimit := int(tester.fetcher.blockLimit)

	// Queue up a batch of blocks, and check that the fetcher has correctly queued them
	for i := 0; i < blockLimit; i++ {
		tester.fetcher.Enqueue("valid", blocks[hashes[len(hashes)-1-i]])
	}
	if queued := atomic.LoadInt32(&tester.fetcher.queued); queued != blockLimit {
		t.Fatalf("queued block count mismatch: have %d, want %d", queued, blockLimit)
	}

	// Queue up a batch of valid blocks, and check that a new peer is allowed to do so
	for i := 0; i < maxQueueDist-1; i++ {
		tester.fetcher.Enqueue("valid", blocks[hashes[len(hashes)-3-i]])
	}
	time.Sleep(100 * time.Millisecond)
	if queued := atomic.LoadInt32(&tester.fetcher.queued); queued != blockLimit+maxQueueDist-1 {
		t.Fatalf("queued block count mismatch: have %d, want %d", queued, blockLimit+maxQueueDist-1)
	}

	// Insert the missing piece (and sanity check the import)
	tester.fetcher.Enqueue("valid", blocks[hashes[len(hashes)-2]])
	verifyImportCount(t, tester.imported, maxQueueDist)

	// Insert the remaining blocks in chunks to ensure clean DOS protection
	for i := maxQueueDist; i < len(hashes)-1; i++ {
		tester.fetcher.Enqueue("valid", blocks[hashes[len(hashes)-2-i]])
		verifyImportEvent(t, tester.imported, true)
	}
	verifyImportDone(t, tester.imported)
}
```