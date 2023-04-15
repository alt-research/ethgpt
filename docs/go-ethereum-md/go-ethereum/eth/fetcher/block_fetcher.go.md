# Fetcher Package

The `fetcher` package contains the announcement-based header, blocks, or transaction synchronization. It provides a way to fetch blocks and headers from the Ethereum network.

## Constants

- `lightTimeout`: Time allowance before an announced header is explicitly requested.
- `arriveTimeout`: Time allowance before an announced block/transaction is explicitly requested.
- `gatherSlack`: Interval used to collate almost-expired announces with fetches.
- `fetchTimeout`: Maximum allotted time to return an explicitly requested block/transaction.
- `maxUncleDist`: Maximum allowed backward distance from the chain head.
- `maxQueueDist`: Maximum allowed distance from the chain head to queue.
- `hashLimit`: Maximum number of unique blocks or headers a peer may have announced.
- `blockLimit`: Maximum number of unique blocks a peer may have delivered.

## Variables

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

## Functions

### `NewBlockFetcher`

```go
func NewBlockFetcher(chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, headerRetrievalFn HeaderRetrievalFn, blockRetrievalFn blockRetrievalFn, announceLimit uint64, broadcastLimit uint64, fetcherLimit uint64, fetcherTimeout time.Duration, fetcherBackoff time.Duration, fetcherRetries int, fetcherRetryBackoff time.Duration, fetcherBurst int, fetcherQueue int, fetcherBatch int, fetcherWorkers int, fetcherIngress int, fetcherTimeoutIngress time.Duration, fetcherTimeoutEgress time.Duration, fetcherTimeoutBlock time.Duration, fetcherTimeoutTx time.Duration, fetcherTimeoutHeader time.Duration, fetcherTimeoutBody time.Duration, fetcherTimeoutFilter time.Duration, fetcherTimeoutUncle time.Duration, fetcherTimeoutState time.Duration, fetcherTimeoutReceipt time.Duration, fetcherTimeoutCode time.Duration, fetcherTimeoutProof time.Duration, fetcherTimeoutHeaderProof time.Duration, fetcherTimeoutAccountProof time.Duration, fetcherTimeoutStorageProof time.Duration, fetcherTimeoutCodeProof time.Duration, fetcherTimeoutTxProof time.Duration, fetcherTimeoutTxLookup time.Duration, fetcherTimeoutTxPool time.Duration, fetcherTimeoutTxPoolContent time.Duration, fetcherTimeoutTxPoolStatus time.Duration, fetcherTimeoutTxPoolInspect time.Duration, fetcherTimeoutTxPoolContentInspect time.Duration, fetcherTimeoutTxPoolStatusInspect time.Duration, fetcherTimeoutTxPoolContentStatusInspect time.Duration, fetcherTimeoutTxPoolInspectAll time.Duration, fetcherTimeoutTxPoolContentInspectAll time.Duration, fetcherTimeoutTxPoolStatusInspectAll time.Duration, fetcherTimeoutTxPoolContentStatusInspectAll time.Duration, fetcherTimeoutTxPoolContentStatus time.Duration, fetcherTimeoutTxPoolContentStatusAll time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatch int, fetcherTimeoutTxPoolContentStatusInspectAllBatchSize int, fetcherTimeoutTxPoolContentStatusInspectAllBatchWorkers int, fetcherTimeoutTxPoolContentStatusInspectAllBatchTimeout time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoff time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetry int, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, fetcher ## BlockFetcher

The `BlockFetcher` struct is responsible for accumulating block announcements from various peers and scheduling them for retrieval. It contains various event channels and callback functions to handle the retrieval and filtering of block headers and bodies.

### Fields

- `light`: a boolean value that indicates whether the fetcher is a light fetcher or a normal one.
- `notify`: a channel of `*blockAnnounce` type that receives block announcements from peers.
- `inject`: a channel of `*blockOrHeaderInject` type that schedules import operations.
- `headerFilter`: a channel of channels of `*headerFilterTask` type that receives batches of headers needing fetcher filtering.
- `bodyFilter`: a channel of channels of `*bodyFilterTask` type that receives batches of block bodies needing fetcher filtering.
- `done`: a channel of `common.Hash` type that receives block hashes of completed fetch operations.
- `quit`: a channel of empty struct type that signals the fetcher to stop.

### Methods

- `unc(hash common.Hash) *types.Block`: retrieves an uncles list for a given block hash.

### Callback Types

- `headerRequesterFn`: a callback type for sending a header retrieval request.
- `bodyRequesterFn`: a callback type for sending a body retrieval request.
- `headerVerifierFn`: a callback type to verify a block's header for fast propagation.
- `blockBroadcasterFn`: a callback type for broadcasting a block to connected peers.
- `chainHeightFn`: a callback type to retrieve the current chain height.
- `headersInsertFn`: a callback type to insert a batch of headers into the local chain.
- `chainInsertFn`: a callback type to insert a batch of blocks into the local chain.
- `peerDropFn`: a callback type for dropping a peer detected as malicious.

### Structs

- `blockAnnounce`: the hash notification of the availability of a new block in the network.
  - `hash`: the hash of the block being announced.
  - `number`: the number of the block being announced (0 = unknown | old protocol).
  - `header`: the header of the block partially reassembled (new protocol).
  - `time`: the timestamp of the announcement.
  - `origin`: the identifier of the peer originating the notification.
  - `fetchHeader`: the fetcher function to retrieve the header of an announced block.
  - `fetchBodies`: the fetcher function to retrieve the body of an announced block.
- `headerFilterTask`: represents a batch of headers needing fetcher filtering.
  - `peer`: the source peer of block headers.
  - `headers`: the collection of headers to filter.
  - `time`: the arrival time of the headers.
- `bodyFilterTask`: represents a batch of block bodies (transactions and uncles) needing fetcher filtering.
  - `peer`: the source peer of block bodies.
  - `transactions`: the collection of transactions per block bodies.
  - `uncles`: the collection of uncles per block bodies.
  - `time`: the arrival time of the blocks' contents.
- `blockOrHeaderInject`: represents a scheduled import operation.
  - `origin`: the identifier of the peer originating the import operation.
  - `header`: the header of the block used for light mode fetcher which only cares about header.
  - `block`: the block used for normal mode fetcher which imports full block.

### Methods

- `number() uint64`: returns the block number of the injected object.
- `hash() common.Hash`: returns the block hash of the injected object. # Block Fetcher

The `BlockFetcher` struct is responsible for retrieving blocks based on hash announcements. It contains several maps and queues to keep track of announced, fetching, fetched, and completing blocks. It also has several callback functions to retrieve headers and blocks, verify headers, broadcast blocks, retrieve the current chain's height, insert headers and blocks into the chain, and drop peers for misbehaving.

## Struct Fields

### Announce States

- `announces`: a map that keeps track of the number of block announces per peer to prevent memory exhaustion.
- `announced`: a map that keeps track of announced blocks scheduled for fetching.
- `fetching`: a map that keeps track of announced blocks currently fetching.
- `fetched`: a map that keeps track of blocks with headers fetched, scheduled for body retrieval.
- `completing`: a map that keeps track of blocks with headers currently body-completing.

### Block Cache

- `queue`: a priority queue containing the import operations sorted by block number.
- `queues`: a map that keeps track of the number of blocks per peer to prevent memory exhaustion.
- `queued`: a set of already queued blocks to dedup imports.

### Callbacks

- `getHeader`: a function that retrieves a header from the local chain.
- `getBlock`: a function that retrieves a block from the local chain.
- `verifyHeader`: a function that checks if a block's headers have a valid proof of work.
- `broadcastBlock`: a function that broadcasts a block to connected peers.
- `chainHeight`: a function that retrieves the current chain's height.
- `insertHeaders`: a function that injects a batch of headers into the chain.
- `insertChain`: a function that injects a batch of blocks into the chain.
- `dropPeer`: a function that drops a peer for misbehaving.

### Testing Hooks

- `announceChangeHook`: a method to call upon adding or deleting a hash from the blockAnnounce list.
- `queueChangeHook`: a method to call upon adding or deleting a block from the import queue.
- `fetchingHook`: a method to call upon starting a block (eth/61) or header (eth/62) fetch.
- `completingHook`: a method to call upon starting a block body fetch (eth/62).
- `importedHook`: a method to call upon successful header or block import (both eth/61 and eth/62).

## NewBlockFetcher

The `NewBlockFetcher` function creates a new `BlockFetcher` struct with the given callback functions and returns a pointer to it.

## Start

The `Start` method boots up the announcement-based synchronizer, accepting and processing hash notifications and block fetches until termination is requested. # Block Fetcher

The `BlockFetcher` type is an announcement-based synchronizer that manages the fetching of blocks and headers from the Ethereum network. It is used by the Ethereum node to synchronize with the network and maintain a copy of the blockchain.

## Functions

### `NewBlockFetcher(chain ChainReader, queueSize int, queueChangeHook func(common.Hash, bool)) *BlockFetcher`

The `NewBlockFetcher` function creates a new `BlockFetcher` instance with the given `ChainReader` and queue size. The `queueChangeHook` parameter is an optional function that is called whenever the queue changes.

### `(f *BlockFetcher) Start()`

The `Start` method starts the announcement-based synchronizer loop.

### `(f *BlockFetcher) Stop()`

The `Stop` method terminates the announcement-based synchronizer, canceling all pending operations.

### `(f *BlockFetcher) Notify(peer string, hash common.Hash, number uint64, time time.Time, headerFetcher headerRequesterFn, bodyFetcher bodyRequesterFn) error`

The `Notify` method announces the fetcher of the potential availability of a new block in the network. It takes the `peer` that announced the block, the `hash` of the block, the `number` of the block, the `time` the block was announced, and functions to fetch the header and body of the block. It returns an error if the fetcher has been terminated.

### `(f *BlockFetcher) Enqueue(peer string, block *types.Block) error`

The `Enqueue` method tries to fill gaps in the fetcher's future import queue. It takes the `peer` that announced the block and the `block` to be enqueued. It returns an error if the fetcher has been terminated.

### `(f *BlockFetcher) FilterHeaders(peer string, headers []*types.Header, time time.Time) []*types.Header`

The `FilterHeaders` method extracts all the headers that were explicitly requested by the fetcher, returning those that should be handled differently. It takes the `peer` that requested the headers, the `headers` to be filtered, and the `time` the headers were requested. It returns the headers remaining after filtering or `nil` if the fetcher has been terminated.

### `(f *BlockFetcher) FilterBodies(peer string, transactions [][]*types.Transaction, uncles [][]*types.Header, time time.Time) ([][]*types.Transaction, [][]*types.Header)`

The `FilterBodies` method extracts all the block bodies that were explicitly requested by the fetcher, returning those that should be handled differently. It takes the `peer` that requested the bodies, the `transactions` and `uncles` to be filtered, and the `time` the bodies were requested. It returns the bodies remaining after filtering or `nil` if the fetcher has been terminated.

### `(f *BlockFetcher) loop()`

The `loop` method is the main fetcher loop, checking and processing various notification events. It is called by the `Start` method and runs until the fetcher is terminated. It manages the fetching of blocks and headers from the network, and the import of blocks into the local blockchain. ## BlockFetcher

The `BlockFetcher` struct is responsible for fetching blocks and headers from peers in the Ethereum network. It maintains a list of announced blocks and headers, and schedules requests to fetch them from peers. It also handles direct block injections and removes traces of completed imports.

### Methods

#### `func (f *BlockFetcher) fetchLoop()`

The `fetchLoop` method is the main loop of the `BlockFetcher`. It continuously checks for announced blocks and headers, and schedules requests to fetch them from peers. It also handles direct block injections and removes traces of completed imports. It waits for an outside event to occur using a `select` statement.

#### `func (f *BlockFetcher) enqueue(origin string, header *types.Header, block *types.Block)`

The `enqueue` method adds a block or header to the list of announced blocks and headers. It also schedules the block or header for fetching if it's not already being fetched or completed.

#### `func (f *BlockFetcher) forgetHash(hash common.Hash)`

The `forgetHash` method removes all traces of an announced block or header from the `BlockFetcher`. It removes the block or header from the list of announced blocks and headers, and removes it from the `fetching` and `completing` maps.

#### `func (f *BlockFetcher) forgetBlock(hash common.Hash)`

The `forgetBlock` method removes a block from the `BlockFetcher`. It removes the block from the `fetching` and `completing` maps.

#### `func (f *BlockFetcher) importHeaders(origin string, headers []*types.Header)`

The `importHeaders` method imports a list of headers into the Ethereum blockchain. It checks if the headers are valid and adds them to the blockchain if they are.

#### `func (f *BlockFetcher) importBlocks(origin string, blocks []*types.Block)`

The `importBlocks` method imports a list of blocks into the Ethereum blockchain. It checks if the blocks are valid and adds them to the blockchain if they are.

#### `func (f *BlockFetcher) rescheduleFetch(timer *time.Timer)`

The `rescheduleFetch` method reschedules a fetch timer for the `BlockFetcher`. It sets the timer to the `fetchTimer` duration.

#### `func (f *BlockFetcher) chainHeight() uint64`

The `chainHeight` method returns the height of the Ethereum blockchain.

#### `func (f *BlockFetcher) getHeader(hash common.Hash) *types.Header`

The `getHeader` method returns the header with the given hash from the Ethereum blockchain.

#### `func (f *BlockFetcher) getBlock(hash common.Hash) *types.Block`

The `getBlock` method returns the block with the given hash from the Ethereum blockchain.

#### `func (f *BlockFetcher) MarshalJSON() ([]byte, error)`

The `MarshalJSON` method marshals the `BlockFetcher` struct to JSON format.

#### `func (f *BlockFetcher) UnmarshalJSON(data []byte) error`

The `UnmarshalJSON` method unmarshals a JSON-encoded `BlockFetcher` struct into the receiver. This code is part of the Ethereum blockchain node implementation and is responsible for fetching block headers and bodies from other nodes in the network. The `fetcher` struct contains various maps to keep track of the state of the fetcher, including the headers that have been fetched, the headers that are being fetched, and the headers that are being completed.

The `fetcher` struct has several methods, including `rescheduleFetch`, `rescheduleComplete`, `forgetHash`, `getBlock`, `dropPeer`, `FilterHeaders`, and `FilterBodies`. However, the code snippet provided only shows the implementation of the `fetchHeaders` method.

The `fetchHeaders` method is called periodically to fetch block headers from other nodes in the network. It first checks if there are any headers that are currently being fetched, and if so, it skips the fetch. Otherwise, it selects a random peer from the list of available peers and fetches headers from that peer.

The method then creates a closure that fetches the headers from the selected peer and schedules it on a new thread. The closure sends the fetched headers to a channel, which is then used to filter the headers and update the state of the fetcher.

The closure also sets a timeout for the fetch, and if the peer does not respond in time, the fetcher drops the peer. If the fetch is successful, the fetched headers are filtered and processed using the `FilterHeaders` method.

Overall, the `fetchHeaders` method is responsible for fetching block headers from other nodes in the network and updating the state of the fetcher accordingly. The `fetchLoop` function is responsible for fetching blocks from peers and scheduling them for import. It is a long-running goroutine that listens on several channels for incoming tasks.

The function starts by initializing several variables, including `unknown`, `incomplete`, `lightHeaders`, and `complete`. These variables are used to keep track of the blocks that need to be fetched, blocks that need to be completed, and headers that need to be fetched in light mode.

The function then enters a loop that listens on several channels for incoming tasks. If a task is received on the `headerFilter` channel, the function processes the headers and schedules them for body completion. If a task is received on the `bodyFilter` channel, the function extracts any explicitly requested blocks and returns the rest.

When a task is received on the `headerFilter` channel, the function first filters out any headers that are already known or being fetched. It then checks if the header matches the promised number and drops the announcer if it does not. If the function is running in light mode and the headers are not imported by other means, it collects all headers. If the block is not imported by other means, it adds it to the list of blocks needing completion.

When a task is received on the `bodyFilter` channel, the function matches up a body to any possible completion request. If there is a match, it adds the block to the list of blocks to be imported.

The `fetchLoop` function is a complex function that performs several tasks. It is well-documented with comments that explain each step of the process. # BlockFetcher

The `BlockFetcher` struct is responsible for fetching and importing blocks and headers from peers in the Ethereum network. It provides methods for scheduling and executing block and header imports, as well as for managing the queue of pending imports.

## Methods

### `NewBlockFetcher(chain ChainReader, engine consensus.Engine, light bool, network uint64, queueChangeHook func(common.Hash, bool)) *BlockFetcher`

This method creates a new `BlockFetcher` instance with the specified `ChainReader`, `consensus.Engine`, `light` mode flag, `network` ID, and `queueChangeHook` function. The `queueChangeHook` function is called whenever a block or header is added or removed from the import queue.

### `Start()`

This method starts the `BlockFetcher` instance by spawning a new goroutine to handle block and header imports.

### `Stop()`

This method stops the `BlockFetcher` instance by closing the `quit` channel and waiting for the import goroutine to exit.

### `Announce(header *types.Header, origin string)`

This method adds a new block header announcement to the `BlockFetcher` instance. The `header` parameter is the header to be announced, and the `origin` parameter is the peer that sent the announcement.

### `Complete(block *types.Block, origin string)`

This method adds a new block import completion to the `BlockFetcher` instance. The `block` parameter is the block that was imported, and the `origin` parameter is the peer that sent the block.

### `getBlock(hash common.Hash) *types.Block`

This method returns the block with the specified hash, if it has been imported by the `BlockFetcher` instance.

### `forgetHash(hash common.Hash)`

This method removes the specified block or header hash from the `BlockFetcher` instance's queues and maps.

### `chainHeight() uint64`

This method returns the current height of the blockchain, as reported by the `ChainReader` instance.

### `importLoop()`

This method is the main import loop for the `BlockFetcher` instance. It handles block and header imports, as well as queue management and rescheduling.

### `rescheduleFetch(fetch *time.Timer)`

This method resets the specified fetch timer to the next blockAnnounce timeout.

### `rescheduleComplete(complete *time.Timer)`

This method resets the specified completion timer to the next fetch timeout.

### `enqueue(peer string, header *types.Header, block *types.Block)`

This method schedules a new header or block import operation, if the component to be imported has not yet been seen.

## Code Explanation

The `BlockFetcher` struct is responsible for fetching and importing blocks and headers from peers in the Ethereum network. It maintains a queue of pending block and header imports, and schedules new imports based on the arrival and completion of announcements from peers.

The `NewBlockFetcher` method creates a new `BlockFetcher` instance with the specified `ChainReader`, `consensus.Engine`, `light` mode flag, `network` ID, and `queueChangeHook` function. The `queueChangeHook` function is called whenever a block or header is added or removed from the import queue.

The `Start` method starts the `BlockFetcher` instance by spawning a new goroutine to handle block and header imports. The `Stop` method stops the `BlockFetcher` instance by closing the `quit` channel and waiting for the import goroutine to exit.

The `Announce` method adds a new block header announcement to the `BlockFetcher` instance. The `header` parameter is the header to be announced, and the `origin` parameter is the peer that sent the announcement. The `Complete` method adds a new block import completion to the `BlockFetcher` instance. The `block` parameter is the block that was imported, and the `origin` parameter is the peer that sent the block.

The `getBlock` method returns the block with the specified hash, if it has been imported by the `BlockFetcher` instance. The `forgetHash` method removes the specified block or header hash from the `BlockFetcher` instance's queues and maps. The `chainHeight` method returns the current height of the blockchain, as reported by the `ChainReader` instance.

The `importLoop` method is the main import loop for the `BlockFetcher` instance. It handles block and header imports, as well as queue management and rescheduling. The `rescheduleFetch` method resets the specified fetch timer to the next blockAnnounce timeout. The `rescheduleComplete` method resets the specified completion timer to the next fetch timeout. The `enqueue` method schedules a new header or block import operation, if the component to be imported has not yet been seen. # BlockFetcher

The `BlockFetcher` struct is responsible for fetching and importing blocks and headers from peers in the Ethereum network. It maintains an internal state of announced and fetching blocks, and uses a `sync.WaitGroup` to keep track of the number of blocks and headers being fetched.

## importHeaders

The `importHeaders` method is called when a new header is propagated by a peer. It validates the header, checks if the parent header is known, and then runs the actual import of the header. If the import is successful, it invokes the `importedHook` testing hook.

## importBlocks

The `importBlocks` method is called when a new block is propagated by a peer. It validates the header of the block, checks if the parent block is known, and then runs the actual import of the block. If the import is successful, it broadcasts the block to other peers and invokes the `importedHook` testing hook.

## forgetHash

The `forgetHash` method removes all traces of a block announcement from the fetcher's internal state. It removes any pending announces and decrement DOS counters, and removes any pending fetches and decrement the DOS counters. If the `announceChangeHook` testing hook is defined, it invokes the hook with the hash and a `false` value to indicate that the block has been forgotten.

## Conclusion

The `BlockFetcher` struct is an important component of the Ethereum node that is responsible for fetching and importing blocks and headers from peers. The `importHeaders` and `importBlocks` methods are used to validate and import headers and blocks, respectively, while the `forgetHash` method is used to remove any traces of a block announcement from the fetcher's internal state. ## BlockFetcher

The `BlockFetcher` struct is used to manage the fetching of blocks from the network. It contains several maps to keep track of the state of the fetcher, including `queued`, `fetching`, `fetched`, and `completing`. 

### forgetBlock

The `forgetBlock` function removes all traces of a queued block from the fetcher's internal state. It takes a `common.Hash` as input, which represents the hash of the block to be forgotten. 

The function first checks if the block is in the `queued` map. If it is, it decrements the `queues` counter for the block's origin and removes the block from the `queued` map. If the `queues` counter for the block's origin is now 0, the origin is removed from the `queues` map.

```go
func (f *BlockFetcher) forgetBlock(hash common.Hash) {
	if insert := f.queued[hash]; insert != nil {
		f.queues[insert.origin]--
		if f.queues[insert.origin] == 0 {
			delete(f.queues, insert.origin)
		}
		delete(f.queued, hash)
	}
}
```

### forget

The `forget` function removes all traces of a block from the fetcher's internal state. It takes a `common.Hash` as input, which represents the hash of the block to be forgotten. 

The function first removes the block from the `fetching` map. It then removes any pending completion requests and decrements the DOS counters for each announcement in the `fetched` map. Finally, it removes any pending completions and decrements the DOS counters for the block in the `completing` map.

```go
func (f *BlockFetcher) forget(hash common.Hash) {
	// Remove the block from the fetching map
	delete(f.fetching, hash)

	// Remove any pending completion requests and decrement the DOS counters
	for _, announce := range f.fetched[hash] {
		f.announces[announce.origin]--
		if f.announces[announce.origin] <= 0 {
			delete(f.announces, announce.origin)
		}
	}
	delete(f.fetched, hash)

	// Remove any pending completions and decrement the DOS counters
	if announce := f.completing[hash]; announce != nil {
		f.announces[announce.origin]--
		if f.announces[announce.origin] <= 0 {
			delete(f.announces, announce.origin)
		}
		delete(f.completing, hash)
	}
}
```

Both `forgetBlock` and `forget` are used to manage the state of the fetcher and ensure that blocks are only fetched once.