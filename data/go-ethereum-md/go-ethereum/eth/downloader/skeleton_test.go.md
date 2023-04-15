# Downloader Package

The `downloader` package provides the functionality for downloading blocks and headers from the Ethereum network.

## Constants

None.

## Variables

None.

## Functions

### `newHookedBackfiller`

```go
func newHookedBackfiller() backfiller
```

`newHookedBackfiller` creates a hooked backfiller with all callbacks disabled, essentially acting as a noop.

### `(*hookedBackfiller) suspend`

```go
func (hf *hookedBackfiller) suspend() *types.Header
```

`suspend` requests the backfiller to abort any running full or snap sync based on the skeleton chain as it might be invalid. The backfiller should gracefully handle multiple consecutive suspends without a resume, even on initial startup.

### `(*hookedBackfiller) resume`

```go
func (hf *hookedBackfiller) resume()
```

`resume` requests the backfiller to start running fill or snap sync based on the skeleton chain as it has successfully been linked. Appending new heads to the end of the chain will not result in suspend/resume cycles.

### `newSkeletonTestPeer`

```go
func newSkeletonTestPeer(id string, headers []*types.Header) *skeletonTestPeer
```

`newSkeletonTestPeer` creates a new mock peer to test the skeleton sync with.

### `(*skeletonTestPeer) serve`

```go
func (p *skeletonTestPeer) serve(origin uint64) []*types.Header
```

`serve` is a hook to allow custom responses.

### `(*skeletonTestPeer) Headers`

```go
func (p *skeletonTestPeer) Headers() []*types.Header
```

`Headers` returns the headers to serve when requested.

### `(*skeletonTestPeer) ID`

```go
func (p *skeletonTestPeer) ID() string
```

`ID` returns the unique identifier of the mock peer.

### `(*skeletonTestPeer) Drop`

```go
func (p *skeletonTestPeer) Drop()
```

`Drop` sets the flag whether the peer was dropped (stop responding).

### `(*skeletonTestPeer) Dropped`

```go
func (p *skeletonTestPeer) Dropped() bool
```

`Dropped` returns the flag whether the peer was dropped (stop responding).

### `(*skeletonTestPeer) Served`

```go
func (p *skeletonTestPeer) Served() uint64
```

`Served` returns the number of headers served by this peer.

### `(*skeletonTestPeer) Headers`

```go
func (p *skeletonTestPeer) Headers() []*types.Header
```

`Headers` returns the headers to serve when requested.

### `(*skeletonTestPeer) GetBlockHeaders`

```go
func (p *skeletonTestPeer) GetBlockHeaders(origin uint64, amount uint64, skip uint64, reverse bool) ([]*types.Header, error)
```

`GetBlockHeaders` returns the headers requested by the peer.

### `(*skeletonTestPeer) GetBlockBodies`

```go
func (p *skeletonTestPeer) GetBlockBodies(hashes []common.Hash) ([][]*types.Transaction, error)
```

`GetBlockBodies` returns the block bodies requested by the peer.

### `(*skeletonTestPeer) GetReceipts`

```go
func (p *skeletonTestPeer) GetReceipts(hashes []common.Hash) ([][]*types.Receipt, error)
```

`GetReceipts` returns the receipts requested by the peer.

### `(*skeletonTestPeer) GetCode`

```go
func (p *skeletonTestPeer) GetCode(hashes []common.Hash) ([][]byte, error)
```

`GetCode` returns the code requested by the peer.

### `(*skeletonTestPeer) GetProofs`

```go
func (p *skeletonTestPeer) GetProofs(requests []eth.GetProofsRequest) ([]eth.GetProofsResponse, error)
```

`GetProofs` returns the proofs requested by the peer.

### `(*skeletonTestPeer) GetHeaderProofs`

```go
func (p *skeletonTestPeer) GetHeaderProofs(requests []eth.GetHeaderProofsRequest) ([]eth.GetHeaderProofsResponse, error)
```

`GetHeaderProofs` returns the header proofs requested by the peer.

### `(*skeletonTestPeer) GetAccountProofs`

```go
func (p *skeletonTestPeer) GetAccountProofs(requests []eth.GetAccountProofsRequest) ([]eth.GetAccountProofsResponse, error)
```

`GetAccountProofs` returns the account proofs requested by the peer.

### `(*skeletonTestPeer) GetStorageProofs ## Skeleton Test Peer

The `skeletonTestPeer` is an in-memory mock peer used for testing purposes. It is used to retrieve batches of headers from a particular peer in the download tester. The `newSkeletonTestPeerWithHook` function creates a new `skeletonTestPeer` with a given ID, a slice of headers, and a serve function. The serve function is used to retrieve headers from the peer.

### `newSkeletonTestPeerWithHook`

```go
func newSkeletonTestPeerWithHook(id string, headers []*types.Header, serve func(origin uint64) []*types.Header) *skeletonTestPeer {
	return &skeletonTestPeer{
		id:      id,
		headers: headers,
		serve:   serve,
	}
}
```

- `id`: The ID of the peer.
- `headers`: A slice of headers.
- `serve`: A function used to retrieve headers from the peer.

### `RequestHeadersByNumber`

The `RequestHeadersByNumber` function constructs a `GetBlockHeaders` function based on a numbered origin associated with a particular peer in the download tester. The returned function can be used to retrieve batches of headers from the particular peer.

```go
func (p *skeletonTestPeer) RequestHeadersByNumber(origin uint64, amount int, skip int, reverse bool, sink chan *eth.Response) (*eth.Request, error) {
	// Since skeleton test peer are in-memory mocks, dropping the does not make
	// them inaccessible. As such, check a local `dropped` field to see if the
	// peer has been dropped and should not respond any more.
	if p.dropped.Load() != 0 {
		return nil, errors.New("peer already dropped")
	}
	// Skeleton sync retrieves batches of headers going backward without gaps.
	// This ensures we can follow a clean parent progression without any reorg
	// hiccups. There is no need for any other type of header retrieval, so do
	// panic if there's such a request.
	if !reverse || skip != 0 {
		// Note, if other clients want to do these kinds of requests, it's their
		// problem, it will still work. We just don't want *us* making complicated
		// requests without a very strong reason to.
		panic(fmt.Sprintf("invalid header retrieval: reverse %v, want true; skip %d, want 0", reverse, skip))
	}
	// If the skeleton syncer requests the genesis block, panic. Whilst it could
	// be considered a valid request, our code specifically should not request it
	// ever since we want to link up headers to an existing local chain, which at
	// worse will be the genesis.
	if int64(origin)-int64(amount) < 0 {
		panic(fmt.Sprintf("headers requested before (or at) genesis: origin %d, amount %d", origin, amount))
	}
	// To make concurrency easier, the skeleton syncer always requests fixed size
	// batches of headers. Panic if the peer is requested an amount other than the
	// configured batch size (apart from the request leading to the genesis).
	if amount > requestHeaders || (amount < requestHeaders && origin > uint64(amount)) {
		panic(fmt.Sprintf("non-chunk size header batch requested: requested %d, want %d, origin %d", amount, requestHeaders, origin))
	}
	// Simple reverse header retrieval. Fill from the peer's chain and return.
	// If the tester has a serve hook set, try to use that before falling back
	// to the default behavior.
	var headers []*types.Header
	if p.serve != nil {
		headers = p.serve(origin)
	}
	if headers == nil {
		headers = make([]*types.Header, 0, amount)
		if len(p.headers) > int(origin) { // Don't serve headers if we're missing the origin
			for i := 0; i < amount; i++ {
				// Consider nil headers as a form of attack and withhold them. Nil
				// cannot be decoded from RLP, so it's not possible to produce an
				// attack by sending/receiving those over eth.
				header := p.headers[int(origin)-i]
				if header == nil {
					continue
				}
				headers = append(headers, header)
			}
		}
	} ## Skeleton Sync

The `skeleton_sync.go` file contains the implementation of the `SkeletonSync` struct and its associated methods. The `SkeletonSync` struct is used to synchronize the blockchain with other peers on the network.

### `SkeletonSync` Struct

The `SkeletonSync` struct contains the following fields:

- `chain`: A `consensus.ChainReader` interface that provides access to the blockchain.
- `engine`: An `eth.Engine` interface that provides access to the Ethereum protocol.
- `headers`: An `eth.HeaderChainReader` interface that provides access to block headers.
- `bodies`: An `eth.BodyChainReader` interface that provides access to block bodies.
- `receipts`: An `eth.ReceiptChainReader` interface that provides access to transaction receipts.
- `state`: A `trie.Database` interface that provides access to the state trie.
- `announceLimit`: The maximum number of headers that can be announced by a peer.
- `broadcastLimit`: The maximum number of blocks that can be broadcast by a peer.
- `fetcherLimit`: The maximum number of blocks that can be fetched by a peer.
- `fetcherTimeout`: The maximum amount of time allowed for a block fetch.
- `fetcherBackoff`: The amount of time to wait before retrying a failed block fetch.
- `fetcherRetries`: The maximum number of times to retry a failed block fetch.
- `fetcherRetryBackoff`: The amount of time to wait before retrying a failed block fetch.
- `fetcherBurst`: The maximum number of blocks that can be fetched in a single burst.
- `fetcherQueue`: The maximum number of blocks that can be queued for fetching.
- `fetcherBatch`: The maximum number of blocks that can be fetched in a single batch.
- `fetcherWorkers`: The number of worker threads used for fetching blocks.
- `fetcherIngress`: The maximum number of blocks that can be received from a peer.
- `fetcherTimeoutIngress`: The maximum amount of time allowed for a block to be received from a peer.
- `fetcherTimeoutEgress`: The maximum amount of time allowed for a block to be sent to a peer.
- `fetcherTimeoutBlock`: The maximum amount of time allowed for a block to be fetched.
- `fetcherTimeoutTx`: The maximum amount of time allowed for a transaction to be fetched.
- `fetcherTimeoutHeader`: The maximum amount of time allowed for a header to be fetched.
- `fetcherTimeoutBody`: The maximum amount of time allowed for a block body to be fetched.
- `fetcherTimeoutFilter`: The maximum amount of time allowed for a filter to be fetched.
- `fetcherTimeoutUncle`: The maximum amount of time allowed for an uncle block to be fetched.
- `fetcherTimeoutState`: The maximum amount of time allowed for a state trie to be fetched.
- `fetcherTimeoutReceipt`: The maximum amount of time allowed for a receipt to be fetched.
- `fetcherTimeoutCode`: The maximum amount of time allowed for contract code to be fetched.
- `fetcherTimeoutProof`: The maximum amount of time allowed for a proof to be fetched.
- `fetcherTimeoutHeaderProof`: The maximum amount of time allowed for a header proof to be fetched.
- `fetcherTimeoutAccountProof`: The maximum amount of time allowed for an account proof to be fetched.
- `fetcherTimeoutStorageProof`: The maximum amount of time allowed for a storage proof to be fetched.
- `fetcherTimeoutCodeProof`: The maximum amount of time allowed for a code proof to be fetched.
- `fetcherTimeoutTxProof`: The This is a test function `TestSkeletonSyncExtend` that tests the functionality of the `skeleton` package. The function tests whether a running skeleton sync can be extended with properly linked up headers but not with side chains. 

The function creates a few key headers, including the genesis block, block 49, block 49B, and block 50. It then creates a fresh database and initializes it with the starting state. The function creates a skeleton sync and runs a cycle. The function ensures the correct resulting sync status by comparing the expected subchain count, head, and tail with the actual subchain count, head, and tail. 

This function is part of a test suite that tests the functionality of the `skeleton` package. The `skeleton` package provides a way to synchronize headers between nodes in the Ethereum network. It maintains a skeleton chain of headers that are not yet fully validated, allowing for faster synchronization. This is a test function that tests the functionality of the `skeleton` package. The `skeleton` package provides a way to synchronize headers between peers in the Ethereum network. The function tests the `Sync` function of the `skeleton` package by creating a fresh database and initializing it with the starting state. It then creates a skeleton sync and runs a cycle. After that, it ensures the correct resulting sync status.

The function has two test cases. The first test case initializes a sync and tries to extend it with a subsequent block. The expected result is that the sync state will have a new subchain with the head at block 50 and the tail at block 49. The second test case initializes a sync and tries to extend it with the existing head block. The expected result is that the sync state will have a new subchain with the head and tail at block 49.

The function then tests the `Sync` function of the `skeleton` package by creating a long fake chain to test with. It tests that the skeleton sync correctly retrieves headers from one or more peers without duplicates or other strange side effects. This is a test function for the `skeletonSyncer` package. It tests the synchronization of headers between peers in a skeleton network. The function defines a set of test cases, each with a different set of initial conditions and expected outcomes. 

The `tests` variable is an array of test cases, each with a set of parameters that define the initial state of the network and the expected outcome. Each test case has a `fill` parameter that determines whether to run a real backfiller in the test case, and an `unpredictable` parameter that determines whether to ignore drops/serves due to uncertain packet assignments.

The `head` parameter is a pointer to the header of the block to sync to. The `peers` parameter is an array of `skeletonTestPeer` objects, which represent the peers in the network. The `midstate`, `midserve`, and `middrop` parameters represent the expected sync state, number of header retrievals, and number of peers dropped after the initial cycle. The `newHead` and `newPeer` parameters represent the new header to anoint on top of the old one and the new peer to join the skeleton syncer, respectively. The `endstate`, `endserve`, and `enddrop` parameters represent the expected sync state, number of header retrievals, and number of peers dropped after the post-init event.

The test function creates a set of headers and a sidechain for testing purposes. It then runs each test case, initializing the skeleton syncer with the specified parameters and checking the resulting sync state, number of header retrievals, and number of peers dropped against the expected values. 

Overall, this test function is used to ensure that the `skeletonSyncer` package is functioning correctly and that the synchronization of headers between peers in a skeleton network is working as expected. This code snippet appears to be a test case for the `skeletonTestPeer` struct, which is used to simulate a peer in the Ethereum network. The test case checks if a peer tries to withhold or duplicate a header, either on or off the sync boundary, instead of sending the correct sequence. The malicious package should not be accepted, and joining with a new peer should unblock the sync.

The test case creates a `skeletonTestPeer` with a chain of headers, and then creates another `skeletonTestPeer` that either withholds or duplicates a header. The `midstate` variable represents the state of the sync before the malicious peer joins, and the `midserve` variable represents the number of headers served before the malicious peer is dropped. The `middrop` variable penalizes shortened or invalid header deliveries.

After the malicious peer is dropped, a new `skeletonTestPeer` is created with the correct chain of headers, and the `endstate` variable represents the state of the sync after the new peer joins. The `endserve` variable represents the total number of headers served after the new peer joins, and the `enddrop` variable penalizes any new drops.

Overall, this test case ensures that the sync mechanism is robust against malicious peers that try to disrupt the sync by withholding or duplicating headers. I'm sorry, but the code snippet you provided seems to be incomplete and out of context. Could you please provide me with the complete codebase or a specific file that you want me to document? I'll be happy to help you with that. This code snippet is incomplete and cannot be properly documented. Please provide the complete code snippet. ## Function: newSkeleton

The `newSkeleton` function creates a new `skeleton` object that is used to synchronize headers between peers. It takes in several parameters, including a database, a peerset, a drop function, and a filler function. 

The `skeleton` object is used to manage the synchronization of headers between peers. It is responsible for requesting headers from peers, validating them, and adding them to the local chain. 

The `newSkeleton` function returns a new `skeleton` object.

### Parameters

- `db`: A database object that is used to store the headers that have been synchronized.
- `peerset`: A peerset object that is used to manage the peers that are being synchronized with.
- `drop`: A function that is called when a peer is dropped from the synchronization process.
- `filler`: A function that is called when a header is missing from the local chain and needs to be fetched from a peer.

### Example

```go
func newSkeleton(db ethdb.Database, peerset *peerset.PeerSet, drop func(id string), filler func(id string, number uint64) *types.Header) *skeleton {
	return &skeleton{
		db:      db,
		peerset: peerset,

		dropHook: drop,

		fillHook: filler,

		suspendHook: func() *types.Header {
			prev := filled
			filled = nil

			return prev
		},
	}
}
```

## Function: Sync

The `Sync` function is used to synchronize headers between peers. It takes in several parameters, including a header, a peer, and a flag indicating whether or not to reset the synchronization process.

The `Sync` function is responsible for requesting headers from peers, validating them, and adding them to the local chain. It is called repeatedly until all headers have been synchronized.

### Parameters

- `header`: A header object that represents the header being synchronized.
- `peer`: A peer object that represents the peer being synchronized with.
- `reset`: A boolean flag indicating whether or not to reset the synchronization process.

### Example

```go
func (s *skeleton) Sync(header *types.Header, peer *peerConnection, reset bool) {
	// If we're resetting, clear the state and start anew
	if reset {
		s.reset()
	}

	// If we're not resetting, check if we're already syncing this header
	if !reset && s.isSyncing(header.Hash()) {
		return
	}

	// Add the header to the sync queue
	s.addSync(header, peer)

	// Start the sync loop if it's not already running
	if atomic.CompareAndSwapUint32(&s.syncing, 0, 1) {
		go s.syncLoop()
	}
}
``` ## Function Description: `TestSyncer`

The `TestSyncer` function is a test function that tests the synchronization of headers between peers. It takes in a `t` testing object and a `tt` test case object. The test case object contains the necessary parameters to run the test, such as the number of peers, the number of headers to sync, and the expected end state of the synchronization.

The function creates a skeleton sync object and initializes it with the test case parameters. It then creates a set of peers and adds them to the sync object. The function then starts the synchronization process by calling the `Start` method on the sync object.

The function then waits for the synchronization to complete by calling the `Wait` method on the sync object. Once the synchronization is complete, the function checks if the sync object served the correct number of headers and dropped the correct number of peers. If the `unpredictable` flag is set to false in the test case object, the function checks if the sync object served no more headers than necessary.

Finally, the function cleans up any leftover skeleton sync resources by calling the `Terminate` method on the sync object.

Overall, the `TestSyncer` function is a test function that tests the synchronization of headers between peers using a skeleton sync object. It is useful for ensuring that the synchronization process is working correctly and efficiently.