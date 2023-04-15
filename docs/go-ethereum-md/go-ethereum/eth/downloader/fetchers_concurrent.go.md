# Downloader Package

The `downloader` package contains the concurrent downloader algorithm that is responsible for downloading blocks, headers, and bodies from the Ethereum network. It provides a way to download blocks in parallel from multiple peers.

## Constants

- `timeoutGracePeriod`: The amount of time to allow for a peer to deliver a response to a locally already timed out request.

## Variables

None.

## Functions

### `concurrentFetch`

```go
func (d *Downloader) concurrentFetch(queue typedQueue, beaconMode bool) error
```

The `concurrentFetch` function iteratively downloads scheduled block parts, taking available peers, reserving a chunk of fetch requests for each and waiting for delivery or timeouts.

- `queue`: The typed queue that is used to manage the download requests.
- `beaconMode`: A boolean flag indicating whether the downloader is in beacon mode or not.

### `timeout`

```go
func (d *Downloader) timeout() time.Duration
```

The `timeout` function returns the timeout duration for the downloader.

### `fetch`

```go
func (d *Downloader) fetch(peer *peerConnection, queue typedQueue, beaconMode bool) error
```

The `fetch` function fetches blocks from a peer.

- `peer`: The peer to fetch blocks from.
- `queue`: The typed queue that is used to manage the download requests.
- `beaconMode`: A boolean flag indicating whether the downloader is in beacon mode or not.

### `fetchBlocks`

```go
func (d *Downloader) fetchBlocks(peer *peerConnection, queue typedQueue) error
```

The `fetchBlocks` function fetches blocks from a peer.

- `peer`: The peer to fetch blocks from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchHeaders`

```go
func (d *Downloader) fetchHeaders(peer *peerConnection, queue typedQueue) error
```

The `fetchHeaders` function fetches headers from a peer.

- `peer`: The peer to fetch headers from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchBodies`

```go
func (d *Downloader) fetchBodies(peer *peerConnection, queue typedQueue) error
```

The `fetchBodies` function fetches bodies from a peer.

- `peer`: The peer to fetch bodies from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchReceipts`

```go
func (d *Downloader) fetchReceipts(peer *peerConnection, queue typedQueue) error
```

The `fetchReceipts` function fetches receipts from a peer.

- `peer`: The peer to fetch receipts from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchCode`

```go
func (d *Downloader) fetchCode(peer *peerConnection, queue typedQueue) error
```

The `fetchCode` function fetches code from a peer.

- `peer`: The peer to fetch code from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchProofs`

```go
func (d *Downloader) fetchProofs(peer *peerConnection, queue typedQueue) error
```

The `fetchProofs` function fetches proofs from a peer.

- `peer`: The peer to fetch proofs from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchHeaderProofs`

```go
func (d *Downloader) fetchHeaderProofs(peer *peerConnection, queue typedQueue) error
```

The `fetchHeaderProofs` function fetches header proofs from a peer.

- `peer`: The peer to fetch header proofs from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchAccountProofs`

```go
func (d *Downloader) fetchAccountProofs(peer *peerConnection, queue typedQueue) error
```

The `fetchAccountProofs` function fetches account proofs from a peer.

- `peer`: The peer to fetch account proofs from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchStorageProofs`

```go
func (d *Downloader) fetchStorageProofs(peer *peerConnection, queue typedQueue) error
```

The `fetchStorageProofs` function fetches storage proofs from a peer.

- `peer`: The peer to fetch storage proofs from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchTxProofs`

```go
func (d *Downloader) fetchTxProofs(peer *peerConnection, queue typedQueue) error
```

The `fetchTxProofs` function fetches transaction proofs from a peer.

- `peer`: The peer to fetch transaction proofs from.
- `queue`: The typed queue that is used to manage the download requests.

### `fetchTxLookupProofs`

```go
func (d *Downloader) fetchTxLookupProofs(peer *peerConnection This code is part of the Ethereum blockchain synchronization process. It manages the requests and responses between the Ethereum nodes. The function creates a map of requests and a queue of pending requests. It then sends download requests to idle peers until the queue is empty. If a peer is stalling, it drops the peer. If throttling is activated, it stops sending requests to peers. 

The function starts by creating a map of requests and a queue of pending requests. It then creates a timer and a map of timed-out but not-yet-answered requests. It subscribes to peer lifecycle events to schedule tasks to new joiners and reschedule tasks upon disconnections. 

The function then enters a loop where it sends download requests to idle peers until the queue is empty. It first checks if there are any peers available. If there are no peers and the node is not in beacon mode, it returns an error. If there are no more tasks to fetch, it waits or terminates. 

If there are tasks to fetch, it sends a download request to all idle peers until throttled. It sorts the peers by their capacity and sends requests to the peers with the highest capacity first. If a peer is stalling, it drops the peer. If throttling is activated, it stops sending requests to peers. 

If a request is successful, it updates the queue and the map of requests. If a request fails, it returns the hashes to the queue. If a request times out, it adds the request to the map of timed-out but not-yet-answered requests. 

The function returns an error if all peers are lost and the node is not in beacon mode. If there are no more tasks to fetch and all requests are answered, it returns nil. 

Overall, this function manages the requests and responses between the Ethereum nodes and ensures that the synchronization process runs smoothly. ## ParallelRetriever

The `ParallelRetriever` is a struct that provides a way to fetch blocks, headers, and transactions from multiple peers in parallel. It is used by the Ethereum client to synchronize with the network.

### `NewParallelRetriever`

```go
func NewParallelRetriever(peers *peerSet, fetcherLimit uint64, fetcherTimeout time.Duration, fetcherBackoff time.Duration, fetcherRetries int, fetcherRetryBackoff time.Duration, fetcherBurst int, fetcherQueue int, fetcherBatch int, fetcherWorkers int, fetcherIngress int, fetcherTimeoutIngress time.Duration, fetcherTimeoutEgress time.Duration, fetcherTimeoutBlock time.Duration, fetcherTimeoutTx time.Duration, fetcherTimeoutHeader time.Duration, fetcherTimeoutBody time.Duration, fetcherTimeoutFilter time.Duration, fetcherTimeoutUncle time.Duration, fetcherTimeoutState time.Duration, fetcherTimeoutReceipt time.Duration, fetcherTimeoutCode time.Duration, fetcherTimeoutProof time.Duration, fetcherTimeoutHeaderProof time.Duration, fetcherTimeoutAccountProof time.Duration, fetcherTimeoutStorageProof time.Duration, fetcherTimeoutCodeProof time.Duration, fetcherTimeoutTxProof time.Duration, fetcherTimeoutTxLookup time.Duration, fetcherTimeoutTxPool time.Duration, fetcherTimeoutTxPoolContent time.Duration, fetcherTimeoutTxPoolStatus time.Duration, fetcherTimeoutTxPoolInspect time.Duration, fetcherTimeoutTxPoolContentInspect time.Duration, fetcherTimeoutTxPoolStatusInspect time.Duration, fetcherTimeoutTxPoolContentStatusInspect time.Duration, fetcherTimeoutTxPoolInspectAll time.Duration, fetcherTimeoutTxPoolContentInspectAll time.Duration, fetcherTimeoutTxPoolStatusInspectAll time.Duration, fetcherTimeoutTxPoolContentStatusInspectAll time.Duration, fetcherTimeoutTxPoolContentStatus time.Duration, fetcherTimeoutTxPoolContentStatusAll time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatch int, fetcherTimeoutTxPoolContentStatusInspectAllBatchSize int, fetcherTimeoutTxPoolContentStatusInspectAllBatchWorkers int, fetcherTimeoutTxPoolContentStatusInspectAllBatchTimeout time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoff time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetry int, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimit time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMax time.Duration, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxFactor float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimitMaxLimitMaxJitter float64, fetcherTimeoutTxPoolContentStatusInspectAllBatchRetryBackoffLimitMaxLimit This is the `downloadLoop` function in the `fetcher/downloader.go` file. It is responsible for managing the download process of blocks and headers from the network. 

The function starts by initializing the necessary variables and channels. It then enters an infinite loop where it waits for incoming requests, responses, or waker signals. 

If a new request arrives, the function adds it to the pending requests map and sends it to the peer's request channel. It then adds the request to the timeout heap and starts the timeout timer. 

If a timeout occurs, the function checks if the peer has failed to deliver more than twice. If so, it updates the peer's capacity to zero and drops it. Otherwise, it drops the peer and cancels the sync if the peer was the master peer. 

If a response arrives, the function checks if it is for an existing or timed-out request. If it is for an existing request, it removes it from the timeout heap and updates the timeout timer if necessary. It then deletes the request from the pending and stales maps, signals the dispatcher that the round trip is done, and delivers the received chunk of data. If the delivery is stale, the peer is already idled. Otherwise, the function updates the peer's capacity. 

If the waker channel sends a continuation flag, the function checks if the header fetcher is done. If so, it sets the finished flag to true. 

Overall, this function manages the download process by sending requests to peers, handling responses, and updating the peer's capacity based on the delivered data.