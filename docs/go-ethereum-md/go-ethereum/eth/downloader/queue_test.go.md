# Downloader Package

The `downloader` package provides a way to download blocks and headers from the Ethereum network. It includes a queue system that manages the download process and a peer connection system that handles the communication with other nodes.

## Constants

- `maxQueuedHeaders`: Maximum number of headers that can be queued for download.
- `maxQueuedBodies`: Maximum number of bodies that can be queued for download.
- `maxQueuedReceipts`: Maximum number of receipts that can be queued for download.
- `maxQueuedProofs`: Maximum number of proofs that can be queued for download.
- `maxQueuedCode`: Maximum number of code that can be queued for download.
- `maxQueuedTx`: Maximum number of transactions that can be queued for download.
- `maxQueuedTxPool`: Maximum number of transactions in the transaction pool that can be queued for download.
- `maxQueuedTxPoolContent`: Maximum number of transaction pool contents that can be queued for download.
- `maxQueuedTxPoolStatus`: Maximum number of transaction pool statuses that can be queued for download.
- `maxQueuedTxPoolInspect`: Maximum number of transaction pool inspections that can be queued for download.
- `maxQueuedTxPoolContentInspect`: Maximum number of transaction pool content inspections that can be queued for download.
- `maxQueuedTxPoolStatusInspect`: Maximum number of transaction pool status inspections that can be queued for download.
- `maxQueuedTxPoolContentStatusInspect`: Maximum number of transaction pool content and status inspections that can be queued for download.
- `maxQueuedTxPoolInspectAll`: Maximum number of transaction pool inspections for all peers that can be queued for download.
- `maxQueuedTxPoolContentInspectAll`: Maximum number of transaction pool content inspections for all peers that can be queued for download.
- `maxQueuedTxPoolStatusInspectAll`: Maximum number of transaction pool status inspections for all peers that can be queued for download.
- `maxQueuedTxPoolContentStatusInspectAll`: Maximum number of transaction pool content and status inspections for all peers that can be queued for download.
- `maxQueuedTxPoolContentStatusInspectAllBatch`: Maximum number of transaction pool content and status inspections for all peers that can be queued for download in a batch.
- `maxQueuedTxPoolContentStatusInspectAllBatchSize`: Maximum size of a batch of transaction pool content and status inspections for all peers.
- `maxQueuedTxPoolContentStatusInspectAllBatchWorkers`: Maximum number of workers for a batch of transaction pool content and status inspections for all peers.
- `maxQueuedTxPoolContentStatusInspectAllBatchTimeout`: Maximum timeout for a batch of transaction pool content and status inspections for all peers.
- `maxQueuedTxPoolContentStatusInspectAllBatchRetryBackoff`: Maximum retry backoff for a batch of transaction pool content and status inspections for all peers.

## Variables

- `testGenesis`: A test genesis block.
- `testAddress`: A test address.
- `testKey`: A test private key.
- `testDB`: A test database.

## Functions

### `makeChain`

```go
func makeChain(n int, seed byte, parent *types.Block, empty bool) ([]*types.Block, []types.Receipts)
```

`makeChain` creates a chain of `n` blocks starting at and including `parent`. The returned hash chain is ordered `head->parent`. In addition, every 3rd block contains a transaction and every 5th an uncle to allow testing correct block reassembly.

### `headers`

```go
func (chain *chainData) headers() []*types.Header
```

`headers` returns an array of headers from the chain.

### `Len`

```go
func (chain *chainData) Len() int
```

`Len` returns the length of the chain.

### `dummyPeer`

```go
func dummyPeer(id string) *peerConnection
```

`dummyPeer` creates a new `peerConnection` with the given `id`.

### `TestBasics`

```go
func TestBasics(t *testing.T)
```

`TestBasics` tests the basic functionality of the downloader package. It creates a new queue, schedules a batch of headers, and checks the pending block count ## Queue Package

The `queue` package provides a way to manage the download of blocks, headers, and receipts from the Ethereum network. It is used by the Ethereum client to synchronize with the network.

### `newQueue`

```go
func newQueue(blockLimit, receiptLimit int) *queue
```

`newQueue` creates a new queue with the specified limits on the number of blocks and receipts that can be queued.

### `Prepare`

```go
func (q *queue) Prepare(maxUncleDist uint64, mode SyncMode)
```

`Prepare` sets up the queue for synchronization. It takes a maximum uncle distance and a synchronization mode as arguments.

### `Schedule`

```go
func (q *queue) Schedule(headers []*types.Header, hashes []common.Hash, peerID string)
```

`Schedule` schedules a batch of headers for download. It takes a slice of headers, a slice of hashes, and a peer ID as arguments.

### `ReserveBodies`

```go
func (q *queue) ReserveBodies(peer *peer, limit int) (*fetchRequest, uint64, bool)
```

`ReserveBodies` reserves a number of blocks for download by a specific peer. It takes a peer and a limit as arguments and returns a fetch request, a number, and a boolean indicating whether the request was throttled.

### `ReserveReceipts`

```go
func (q *queue) ReserveReceipts(peer *peer, limit int) (*fetchRequest, uint64, bool)
```

`ReserveReceipts` reserves a number of receipts for download by a specific peer. It takes a peer and a limit as arguments and returns a fetch request, a number, and a boolean indicating whether the request was throttled.

### `Idle`

```go
func (q *queue) Idle() bool
```

`Idle` returns a boolean indicating whether the queue is idle.

### `PendingBodies`

```go
func (q *queue) PendingBodies() int
```

`PendingBodies` returns the number of pending blocks in the queue.

### `PendingReceipts`

```go
func (q *queue) PendingReceipts() int
```

`PendingReceipts` returns the number of pending receipts in the queue.

### `resultCache.countCompleted`

```go
func (rc *resultCache) countCompleted() int
```

`countCompleted` returns the number of completed fetch results in the result cache. This code is a test function for the `queue` package. It tests the delivery of blocks and receipts to peers. The function creates a chain of 128 blocks and a network of peers. It then schedules headers for delivery to the queue and collects the results. It also reserves body fetches and delivers them to peers. 

The `dummyPeer` function creates a new peer with a given ID. The `ReserveBodies` function reserves body fetches for a given peer and number of blocks. If there are no fetches to be made, the function returns `nil`. The `ReserveReceipts` function reserves receipt fetches for a given peer and number of blocks. If there are no fetches to be made, the function returns `nil`.

The `newQueue` function creates a new queue with a given block and receipt task limit. The `Prepare` function prepares the queue for processing with a given snapshot sync mode.

The `Results` function returns the results of completed tasks in the queue. The `forget` function removes a block from the network.

The `getTransactions` function returns the transactions for a given block number. The `DeliverBodies` function delivers the bodies of blocks to a given peer. It returns an error if the delivery fails.

The `sync.WaitGroup` type is used to synchronize the goroutines in the function. The `rand` package is used to generate random numbers. The `fmt` package is used for printing debug information. ## Documentation for the Source Code

### Function: `func()`

This function is a goroutine that reserves receipt fetch and delivers receipts to a peer. It reserves receipts from the queue and delivers them to the peer. It sleeps for 100 milliseconds if the receipts are delivered successfully, and 200 milliseconds if the receipts are not reserved. If there is an error while delivering the receipts, it prints the error message.

### Function: `func newNetwork() *network`

This function creates a new instance of the `network` struct and returns a pointer to it. It initializes the `sync.RWMutex` and returns the pointer to the `network` struct.

### Struct: `type network struct`

This struct represents the network. It has the following fields:

- `offset`: An integer representing the offset of the block.
- `chain`: A slice of pointers to `types.Block` representing the chain.
- `receipts`: A slice of `types.Receipts` representing the receipts.
- `lock`: A `sync.RWMutex` used to lock and unlock the struct.
- `cond`: A `sync.Cond` used to signal and wait for progress.

### Function: `func (n *network) getTransactions(blocknum uint64) types.Transactions`

This function takes a `uint64` block number as input and returns a slice of `types.Transactions`. It gets the transactions from the block at the given block number.

### Function: `func (n *network) getReceipts(blocknum uint64) types.Receipts`

This function takes a `uint64` block number as input and returns a `types.Receipts`. It gets the receipts from the block at the given block number.

### Function: `func (n *network) forget(blocknum uint64)`

This function takes a `uint64` block number as input and removes all blocks and receipts before the given block number.

### Function: `func (n *network) progress(numBlocks int)`

This function takes an integer `numBlocks` as input and adds new blocks and receipts to the chain. It locks the struct, creates new blocks and receipts, and appends them to the chain. It then broadcasts a signal to all waiting goroutines. It unlocks the struct after the operation.

### Function: `func (n *network) headers(from int) []*types.Header`

This function takes an integer `from` as input and returns a slice of pointers to `types.Header`. It gets the headers from the chain starting from the given block number. If the chain does not have enough headers, it waits for progress and then gets the headers. It returns a slice of pointers to `types.Header`.