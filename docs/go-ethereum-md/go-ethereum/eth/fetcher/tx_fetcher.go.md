# Fetcher Package

The `fetcher` package provides functionality for fetching transactions from the Ethereum network. It includes methods for announcing, broadcasting, and requesting transactions.

## Constants

- `maxTxAnnounces`: the maximum number of unique transactions a peer can announce in a short time.
- `maxTxRetrievals`: the maximum number of transactions that can be fetched in one request.
- `maxTxUnderpricedSetSize`: the size of the underpriced transaction set that is used to track recent transactions that have been dropped so we don't re-request them.
- `txArriveTimeout`: the time allowance before an announced transaction is explicitly requested.
- `txGatherSlack`: the interval used to collate almost-expired announces with network fetches.
- `txFetchTimeout`: the maximum allotted time to return an explicitly requested transaction.

## Variables

- `txAnnounceInMeter`: a metrics meter that tracks the number of incoming transaction announces.
- `txAnnounceKnownMeter`: a metrics meter that tracks the number of known transaction announces.
- `txAnnounceUnderpricedMeter`: a metrics meter that tracks the number of underpriced transaction announces.
- `txAnnounceDOSMeter`: a metrics meter that tracks the number of transaction announces that trigger a denial-of-service (DOS) protection mechanism.
- `txBroadcastInMeter`: a metrics meter that tracks the number of incoming transaction broadcasts.
- `txBroadcastKnownMeter`: a metrics meter that tracks the number of known transaction broadcasts.
- `txBroadcastUnderpricedMeter`: a metrics meter that tracks the number of underpriced transaction broadcasts.
- `txBroadcastOtherRejectMeter`: a metrics meter that tracks the number of transaction broadcasts that are rejected for reasons other than being underpriced.
- `txRequestOutMeter`: a metrics meter that tracks the number of outgoing transaction requests.
- `txRequestFailMeter`: a metrics meter that tracks the number of failed transaction requests.
- `txRequestDoneMeter`: a metrics meter that tracks the number of completed transaction requests.

## Functions

### `NewTxPoolFetcher`

```go
func NewTxPoolFetcher(pool *txpool.TxPool, clock mclock.Clock) *TxPoolFetcher
```

`NewTxPoolFetcher` creates a new `TxPoolFetcher` instance that fetches transactions from the given transaction pool.

### `NewTxSyncFetcher`

```go
func NewTxSyncFetcher(pool *txpool.TxPool, clock mclock.Clock) *TxSyncFetcher
```

`NewTxSyncFetcher` creates a new `TxSyncFetcher` instance that fetches transactions from the given transaction pool.

### `NewTxSyncer`

```go
func NewTxSyncer(pool *txpool.TxPool, clock mclock.Clock) *TxSyncer
```

`NewTxSyncer` creates a new `TxSyncer` instance that synchronizes transactions with the given transaction pool.

## Types

### `TxPoolFetcher`

`TxPoolFetcher` is a type that fetches transactions from a transaction pool.

#### Methods

##### `FetchTxs`

```go
func (f *TxPoolFetcher) FetchTxs(hashes []common.Hash) []*types.Transaction
```

`FetchTxs` fetches the transactions with the given hashes from the transaction pool.

### `TxSyncFetcher`

`TxSyncFetcher` is a type that fetches transactions from the Ethereum network.

#### Methods

##### `FetchTxs`

```go
func (f *TxSyncFetcher) FetchTxs(hashes []common.Hash) []*types.Transaction
```

`FetchTxs` fetches the transactions with the given hashes from the Ethereum network.

### `TxSyncer`

`TxSyncer` is a type that synchronizes transactions with the Ethereum network.

#### Methods

##### `Sync`

```go
func (s *TxSyncer) Sync(hashes []common.Hash, maxBatchSize int) error
```

`Sync` synchronizes the transactions with the given hashes with the Ethereum network. It fetches transactions in batches of up to `maxBatchSize`. ## TxFetcher

The `TxFetcher` struct is responsible for retrieving new transactions based on announcements. It operates in three stages:

1. Newly discovered transactions are moved into a wait list.
2. After approximately 500ms, transactions from the wait list that have not been broadcast to us in whole are moved into a queueing area.
3. When a connected peer doesn't have in-flight retrieval requests, any transaction queued up (and announced by the peer) are allocated to the peer and moved into a fetching status until it's fulfilled or fails.

The `TxFetcher` struct contains the following fields:

- `notify`: a channel of `txAnnounce` pointers that notifies the fetcher of new transactions.
- `cleanup`: a channel of `txDelivery` pointers that notifies the fetcher of delivered transactions.
- `drop`: a channel of `txDrop` pointers that notifies the fetcher of disconnected peers.
- `quit`: a channel that can be closed to stop the fetcher.
- `underpriced`: a set of `common.Hash` values representing transactions that have been discarded as too cheap.
- `waitlist`: a map of `common.Hash` keys to maps of `string` keys representing transactions waiting for a potential broadcast.
- `waittime`: a `mclock.AbsTime` value representing the timestamp of the last wait list update.
- `queue`: a map of `common.Hash` keys to `txRequest` values representing transactions waiting to be fetched.
- `fetching`: a map of `common.Hash` keys to `txRequest` values representing transactions being fetched.
- `peers`: a map of `string` keys to `txRequest` values representing peers that have been allocated transactions to fetch.
- `peerQueue`: a queue of `string` values representing peers that are waiting to be allocated transactions to fetch.

The `TxFetcher` struct also defines several internal types:

- `txAnnounce`: the notification of the availability of a batch of new transactions in the network.
- `txRequest`: an in-flight transaction retrieval request destined to a specific peer.
- `txDelivery`: the notification that a batch of transactions have been added to the pool and should be untracked.
- `txDrop`: the notification that a peer has disconnected.

The `TxFetcher` struct provides the following methods:

- `NewTxFetcher()`: creates a new `TxFetcher` instance.
- `Start()`: starts the fetcher.
- `Stop()`: stops the fetcher.
- `Notify(ann *txAnnounce)`: notifies the fetcher of new transactions.
- `Cleanup(del *txDelivery)`: notifies the fetcher of delivered transactions.
- `Drop(peer string)`: notifies the fetcher of a disconnected peer.
- `fetch()`: fetches transactions from the queue.
- `schedule(peer string)`: schedules transactions to be fetched by a peer.
- `untrack(hashes []common.Hash)`: removes transactions from the wait list and queue.
- `track(hashes []common.Hash, origin string)`: adds transactions to the wait list.
- `queue(hashes []common.Hash)`: adds transactions to the queue.
- `fetchable()`: returns the number of fetchable transactions.
- `waiting()`: returns the number of waiting transactions.
- `queueing()`: returns the number of queueing transactions.
- `fetching()`: returns the number of fetching transactions.
- `waitingPeers()`: returns the number of peers waiting for transactions.
- `queueingPeers()`: returns the number of peers queueing transactions.
- `fetchingPeers()`: returns the number of peers fetching transactions.

The `TxFetcher` struct also defines several metrics to track the performance of the fetcher:

- `txAnnounceMeter`: the number of transaction announcements received.
- `txAnnounceKnownMeter`: the number of known transactions announced.
- `txAnnounceUnderpricedMeter`: the number of underpriced transactions announced.
- `txAnnounceOtherRejectMeter`: the number of other rejected transactions announced.
- `txRequestOutMeter`: the number of transaction retrieval requests sent.
- `txRequestDoneMeter`: the number of transaction retrieval requests fulfilled.
- `txRequestTimeoutMeter`: the number of transaction retrieval requests timed out.
- `txReplyInMeter`: the number of transaction retrieval replies received.
- `txReplyKnownMeter`: the number of known transactions received in a retrieval reply.
- `txReplyUnderpricedMeter`: the number of underpriced transactions received in a retrieval reply.
- `txReplyOtherRejectMeter`: the number of other rejected transactions received in a retrieval reply.
- `txFetcherWaitingPeers`: the number of peers waiting for transactions.
- `txFetcherWaitingHashes`: the number of transactions waiting to be fetched.
- `txFetcherQueueingPeers`: the number of peers queueing transactions.
- `txFetcherQueueingHashes`: the number of transactions queueing to be fetched.
- `txFetcherFetchingPeers`: the number of peers fetching transactions.
- `txFetcherFetchingHashes`: the number of transactions being fetched. The `TxFetcher` struct defines a transaction fetcher that retrieves transactions based on hash announcements. It has several stages of processing, each with its own set of data structures.

The first stage is the waitlist, which contains transactions that have been announced but are not yet ready to be retrieved. The waitlist is represented by a map of transaction hashes to a set of peers that have announced the transaction, and a map of transaction hashes to the time when the transaction was added to the waitlist.

The second stage is the queue, which contains transactions that are waiting to be allocated to some peer to be retrieved directly. The queue is represented by a map of announced transactions, grouped by origin peer, and a map of download locations, grouped by transaction hash.

The third stage is the set of transactions currently being retrieved, some of which may be fulfilled and some rescheduled. This stage shares the `announces` map from the previous stage to avoid having to duplicate it for DoS checks. It is represented by a map of transactions currently being retrieved, a map of in-flight transaction retrievals, and a map of in-flight transaction alternate origins if retrieval fails.

The `TxFetcher` struct also has several callback functions that are used to interact with the local transaction pool and retrieve transactions from remote peers.

The `NewTxFetcher` function creates a new `TxFetcher` instance with the given callback functions and returns a pointer to it. The `NewTxFetcherForTests` function is a testing method that allows the realtime clock to be mocked out with a simulated version and the internal randomness to be replaced with a deterministic one.

The `Notify` method announces the fetcher of the potential availability of a new batch of transactions in the network. It keeps track of all the announced transactions and skips any transaction announcements that are already known or have been previously marked as cheap and discarded. It then adds the remaining transactions to the waitlist and notifies the fetcher loop to process them.

```go
func (f *TxFetcher) Notify(peer string, hashes []common.Hash) error {
    // Keep track of all the announced transactions
    txAnnounceInMeter.Mark(int64(len(hashes)))

    // Skip any transaction announcements that we already know of, or that we've
    // previously marked as cheap and discarded. This check is of course racy,
    // because multiple concurrent notifies will still manage to pass it, but it's
    // still valuable to check here because it runs concurrent  to the internal
    // loop, so anything caught here is time saved internally.
    var (
        unknowns               = make([]common.Hash, 0, len(hashes))
        underpriced            = make([]common.Hash, 0, len(hashes))
        underpricedAnnounceCnt int
    )
    f.mu.Lock()
    for _, hash := range hashes {
        if _, ok := f.waitlist[hash]; ok {
            continue
        }
        if _, ok := f.underpriced[hash]; ok {
            underpriced = append(underpriced, hash)
            underpricedAnnounceCnt += len(f.announced[hash])
            continue
        }
        unknowns = append(unknowns, hash)
    }
    f.mu.Unlock()

    // If we have any underpriced transactions, we'll only announce them if they
    // are announced by a single peer. This is to avoid spamming the network with
    // cheap transactions that are unlikely to be included in a block.
    if len(underpriced) > 0 && underpricedAnnounceCnt > 1 {
        txAnnounceUnderpricedMeter.Mark(int64(len(underpriced)))
        return nil
    }

    // Add the remaining transactions to the waitlist and notify the fetcher loop
    f.mu.Lock()
    for _, hash := range unknowns {
        if f.waitlist[hash] == nil {
            f.waitlist[hash] = make(map[string]struct{})
        }
        f.waitlist[hash][peer] = struct{}{}
        f.waittime[hash] = f.clock.Now()
    }
    f.mu.Unlock()

    select {
    case f.notify <- &txAnnounce{peer, unknowns}:
    default:
        txAnnounceDropMeter.Mark(int64(len(unknowns)))
        return ErrTxAnnounceDrop
    }

    return nil
}
```

The `Cleanup` method removes any transactions that have been retrieved or failed to be retrieved from the fetcher's data structures. It takes a `txDelivery` struct as input, which contains the transaction hash and the peer that delivered the transaction.

```go
func (f *TxFetcher) Cleanup(delivery *txDelivery) {
    f.mu.Lock()
    defer f.mu.Unlock()

    // Remove the transaction from the fetching set
    delete(f.fetching, delivery.hash)

    // Remove the transaction from the requests map
    if request, ok := f.requests[delivery.hash]; ok {
        delete(f.requests, delivery.hash)
        request.done()
    }

    // Remove the transaction from the alternates map
    delete(f.alternates, delivery.hash)

    // Remove the transaction from the announced set
    if peers, ok := f.announced[delivery.hash]; ok {
        for peer := range peers {
            delete(f.announces[peer], delivery.hash)
            if len(f.announces[peer]) == 0 {
                delete(f.announces, peer)
            }
        }
        delete(f.announced, delivery.hash)
    }

    // Remove the transaction from the waitlist
    if peers, ok := f.waitlist[delivery.hash]; ok {
        for peer := range peers {
            delete(f.waitslots[peer], delivery.hash)
            if len(f.waitslots[peer]) == 0 {
                delete(f.waitslots, peer)
            }
        }
        delete(f.waitlist, delivery.hash)
        delete(f.waittime, delivery.hash)
    }
}
```

The `Drop` method removes any transactions that have been dropped from the fetcher's data structures. It takes a `txDrop` struct as input, which contains the transaction hash and the reason for dropping the transaction.

```go
func (f *TxFetcher) Drop(drop *txDrop) {
    f.mu.Lock()
    defer f.mu.Unlock()

    // Remove the transaction from the fetching set
    delete(f.fetching, drop.hash)

    // Remove the transaction from the requests map
    if request, ok := f.requests[drop.hash]; ok {
        delete(f.requests, drop.hash)
        request.done()
    }

    // Remove the transaction from the alternates map
    delete(f.alternates, drop.hash)

    // Remove the transaction from the announced set
    if peers, ok := f.announced[drop.hash]; ok {
        for peer := range peers {
            delete(f.announces[peer], drop.hash)
            if len(f.announces[peer]) == 0 {
                delete(f.announces, peer)
            }
        }
        delete(f.announced, drop.hash)
    }

    // Remove the transaction from the waitlist
    if peers, ok := f.waitlist[drop.hash]; ok {
        for peer := range peers {
            delete(f.waitslots[peer], drop.hash)
            if len(f.waitslots[peer]) == 0 {
                delete(f.waitslots, peer)
            }
        }
        delete(f.waitlist, drop.hash)
        delete(f.waittime, drop.hash)
    }

    // Add the transaction to the underpriced set
    if drop.reason == ErrTxUnderpriced {
        f.underpriced.Add(drop.hash)
    }
}
```

The `Start` method starts the fetcher loop, which processes transactions in the fetcher's data structures and retrieves them from remote peers.

```go
func (f *TxFetcher) Start() {
    go f.loop()
}
``` 

The `Stop` method stops the fetcher loop and cleans up any remaining transactions in the fetcher's data structures.

```go
func (f *TxFetcher) Stop() {
    close(f.quit)
    f.wg.Wait()

    f.mu.Lock()
    defer f.mu.Unlock()

    for hash := range f.waitlist {
        delete(f.waitlist, hash)
        delete(f.waittime, hash)
    }
    for hash := range f.fetching {
        delete(f.fetching, hash)
    }
    for hash := range f.requests {
        delete(f.requests, hash)
    }
    for hash := range f.alternates {
        delete(f.alternates, hash)
    }
    for hash := range f.announced {
        delete(f.announced, hash)
    }
    for peer := range f.announces {
        delete(f.announces, peer)
    }
    for peer := range f.waitslots {
        delete(f.waitslots, peer)
    }
    f.underpriced.Clear()
}
```

The `loop` method is the main fetcher loop that processes transactions in the fetcher's data structures and retrieves them from remote peers. It has several stages of processing, each with its own set of data structures.

The first stage is the waitlist, which contains transactions that have been announced but are not yet ready to be retrieved. The loop checks the waitlist for any transactions that have been waiting for too long and removes them from the waitlist.

The second stage is the queue, which contains transactions that are waiting to be allocated to some peer to be retrieved directly. The loop checks the queue for any transactions that have not been announced by any peer and removes them from the queue.

The third stage is the set of transactions currently being retrieved, some of which may be fulfilled and some rescheduled ## TxFetcher Source Code Documentation

### Introduction
The `TxFetcher` struct is a transaction fetcher that is responsible for managing the transaction pool and fetching transactions from peers. This documentation provides a detailed explanation of the functions in the `TxFetcher` struct.

### Functions

#### `func (f *TxFetcher) Announce(peer string, hashes []common.Hash) error`
The `Announce` function is responsible for announcing new transactions to the fetcher. It takes a peer string and a slice of transaction hashes as input. The function checks if the transaction is already in the pool or if it is underpriced. If the transaction is neither in the pool nor underpriced, it is added to the internal loop. The function returns an error if the fetcher has been terminated.

#### `func (f *TxFetcher) Enqueue(peer string, txs []*types.Transaction, direct bool) error`
The `Enqueue` function is responsible for importing a batch of received transactions into the transaction pool and the fetcher. It takes a peer string, a slice of transactions, and a boolean value indicating whether the transactions were broadcasted or requested directly as input. The function pushes all the transactions into the pool, tracking underpriced ones to avoid re-requesting them and dropping the peer in case of malicious transfers. The function returns an error if the fetcher has been terminated.

#### `func (f *TxFetcher) Drop(peer string) error`
The `Drop` function should be called when a peer disconnects. It cleans up all the internal data structures of the given node. The function takes a peer string as input and returns an error if the fetcher has been terminated.

#### `func (f *TxFetcher) Start()`
The `Start` function boots up the announcement based synchronizer, accepting and processing hash notifications and block fetches until termination requested.

#### `func (f *TxFetcher) Stop()`
The `Stop` function terminates the announcement based synchronizer, canceling all pending operations. The `Stop()` function is a method of the `TxFetcher` struct that closes the `quit` channel, which signals the `loop()` function to stop.

The `loop()` function is the main loop of the `TxFetcher` struct. It listens for new transaction announcements on the `notify` channel and processes them accordingly. If a new announcement is received, the function checks if there are too many accumulated transactions and drops part of the new announcements if necessary. If the number of transactions is within the limit, the function schedules the remainder of the transactions for download.

The function then checks if the transaction is already downloading, queued from a different peer, or known to the fetcher but not yet downloading. Depending on the case, the function adds the transaction to the list of possible alternates, tracks it for the new peer, or inserts it into the waiting list.

If a new item was added to the waitlist, the function schedules it into the fetcher. If the peer is new and announced something already queued, the function requests transactions from them.

The function also listens for triggers from the `waitTimer` and `timeoutTimer` timers. When a trigger is received from the `waitTimer`, the function pushes all expired transactions into the retrieval queues.

Overall, the `loop()` function manages the download of transactions from the network and ensures that the fetcher does not download too many transactions at once. ## Function Explanation: `func (f *TxPool) loop(timeoutTimer *time.Timer, waitTimer *time.Timer, timeoutTrigger, waitTrigger <-chan time.Time, actives map[string]struct{})`

This function is the main loop of the transaction pool. It listens to the timeout and wait triggers, and performs various actions based on the triggers. It also takes a map of active peers as input, which is used to request transactions from idle peers.

The function first checks for any expired transactions in the waitlist, and schedules them for retrieval if they have not been propagated. It then checks if there are any transactions still waiting for propagation, and reschedules the wait timer if necessary. Next, it checks if any peers have become active and are idle, and requests transactions from them. Finally, it listens for timeout triggers, and cleans up any expired retrievals. It then schedules a new transaction retrieval, and triggers the timeout timer if necessary.

## Code Explanation

The function starts with a `range` loop over the `waittime` map, which contains the timestamps of transactions waiting for propagation. For each transaction, it checks if the transaction has expired without propagation, and schedules it for retrieval if it has not been propagated. It then removes the transaction from the waitlist and waittime maps.

The function then checks if there are any transactions still waiting for propagation, and reschedules the wait timer if necessary.

Next, it checks if any peers have become active and are idle, and requests transactions from them. It does this by calling the `scheduleFetches` function, which takes the timeout timer, timeout trigger, and a map of active peers as input.

The function then listens for timeout triggers, and cleans up any expired retrievals. It does this by iterating over the `requests` map, which contains the transactions being fetched from each peer. For each peer, it checks if any transactions have expired, and reschedules them for retrieval if necessary. It then schedules a new transaction retrieval, and triggers the timeout timer if necessary.

Finally, the function listens for cleanup triggers, and removes any traces of the delivered transactions from the internal trackers. It does this by iterating over the hashes in the delivery, and removing them from the waitlist, waittime, announced, alternates, and fetching maps. ## Function: `deliver`

This function is responsible for delivering transactions to the requesting peer. It takes a `delivery` parameter that contains the hashes of the transactions to be delivered, the origin of the request, and a boolean flag indicating whether the delivery is direct or not.

The function first checks if the delivery is a duplicate or not. If it is a duplicate, it will not deliver the transactions again. If it is not a duplicate, it will mark the delivery as successful and remove the hashes from the `fetching` map.

If the delivery is not direct and there is already a delivery in progress for the same transaction, the function will mark the transaction as stolen and add it to the `stolen` map of the original request. If the delivery is direct, the function will reschedule any missing transactions from the original request.

If the delivery is direct and there are missing transactions, the function will reschedule them from the alternates. If there are no alternates available, the function will not retry the missing transactions. If there are alternates available, the function will add them to the `announced` map.

If a peer is dropped, the function will remove all traces of it and clean up any active requests.

## Function: `scheduleFetches`

This function is responsible for scheduling transaction fetches. It takes a `timeoutTimer`, a `timeoutTrigger`, and a `peer` parameter. If the `peer` parameter is not nil, the function will add the peer to the `fetching` map and schedule a timeout for the peer. If the `peer` parameter is nil, the function will schedule fetches for all transactions in the `waitlist` map.

The function first checks if there are any transactions in the `waitlist` map. If there are no transactions in the `waitlist` map, the function will return. If there are transactions in the `waitlist` map, the function will iterate over the transactions and add them to the `fetching` map. If the transaction is not in the `announced` map, the function will add it to the `announced` map. If the transaction is in the `announced` map, the function will add the peer to the `alternates` map.

The function then checks if there are any transactions in the `fetching` map. If there are no transactions in the `fetching` map, the function will return. If there are transactions in the `fetching` map, the function will iterate over the transactions and schedule a timeout for each peer.

## Function: `rescheduleWait`

This function is responsible for rescheduling transaction fetches. It takes a `waitTimer` and a `waitTrigger` parameter.

The function first checks if there are any transactions in the `waitlist` map. If there are no transactions in the `waitlist` map, the function will return. If there are transactions in the `waitlist` map, the function will iterate over the transactions and add them to the `fetching` map. If the transaction is not in the `announced` map, the function will add it to the `announced` map. If the transaction is in the `announced` map, the function will add the peer to the `alternates` map.

The function then checks if there are any transactions in the `fetching` map. If there are no transactions in the `fetching` map, the function will return. If there are transactions in the `fetching` map, the function will iterate over the transactions and schedule a timeout for each peer. ## TxFetcher Source Code Documentation

The `TxFetcher` struct is responsible for fetching transactions from peers in the Ethereum network. It maintains a list of transactions to fetch, and schedules requests to be sent to peers. The `TxFetcher` struct has the following methods:

### `func (f *TxFetcher) Start()`

The `Start` method starts the TxFetcher loop, which listens for incoming messages and processes them accordingly. It runs until the `quit` channel is closed.

### `func (f *TxFetcher) Stop()`

The `Stop` method stops the TxFetcher loop by closing the `quit` channel.

### `func (f *TxFetcher) AddTransactions(hashes []common.Hash, peer string)`

The `AddTransactions` method adds a list of transaction hashes to the waitlist, and associates them with the specified peer. If the peer is not already in the `announces` map, it is added. If any of the hashes are already in the `waitlist` map, they are ignored.

### `func (f *TxFetcher) RemoveTransactions(hashes []common.Hash, peer string)`

The `RemoveTransactions` method removes a list of transaction hashes from the waitlist, and disassociates them from the specified peer. If the peer has no more transactions in the waitlist, it is removed from the `announces` map. If any of the hashes are not in the `waitlist` map, they are ignored.

### `func (f *TxFetcher) RequestTransactions(hashes []common.Hash, peer string)`

The `RequestTransactions` method sends a request to the specified peer to fetch the specified list of transaction hashes. If the peer is not already in the `requests` map, it is added. If any of the hashes are already in the `fetching` map, they are ignored.

### `func (f *TxFetcher) forEachPeer(fn func(peer string))`

The `forEachPeer` method iterates over all the peers in the `announces` map, and calls the specified function with each peer as an argument.

### `func (f *TxFetcher) fetchTransactions(peer string, hashes []common.Hash)`

The `fetchTransactions` method sends a request to the specified peer to fetch the specified list of transaction hashes. It adds the request to the `requests` map, and sets a timeout for the request.

### `func (f *TxFetcher) handleTimeout()`

The `handleTimeout` method is called when a request times out. It removes the request from the `requests` map, and adds the associated transactions back to the waitlist.

### `func (f *TxFetcher) handleResponse(peer string, hashes []common.Hash, txs types.Transactions)`

The `handleResponse` method is called when a peer responds to a request with a list of transactions. It removes the request from the `requests` map, and adds the associated transactions to the `fetching` map. It also removes the transactions from the waitlist, and disassociates them from the peer in the `announced` map.

### `func (f *TxFetcher) handleDrop(peer string)`

The `handleDrop` method is called when a peer disconnects. It removes the peer from the `announces` map, and removes any associated transactions from the waitlist. It also removes any requests associated with the peer from the `requests` map.

### `func (f *TxFetcher) rescheduleWait(timer *mclock.Timer, trigger chan struct{})`

The `rescheduleWait` method iterates over all the transactions currently in the waitlist, and schedules the movement into the fetcher for the earliest. The method has a granularity of 'gatherSlack', since there's not much point in spinning over all the transactions just to maybe find one that should trigger a few ms earlier.

### `func (f *TxFetcher) rescheduleTimeout(timer *mclock.Timer, trigger chan struct{})`

The `rescheduleTimeout` method iterates over all the transactions currently in flight and schedules a cleanup run when the first would trigger. The method has a granularity of 'gatherSlack', since there's not much point in spinning over all the transactions just to maybe find one that should trigger a few ms earlier.

### `func (f *TxFetcher) scheduleFetches(timer *mclock.Timer, timeout chan struct{}, whitelist map[string]struct{})`

The `scheduleFetches` method starts a batch of retrievals for all available idle peers. It gathers the set of peers we want to retrieve from (default to all), and for each active peer, tries to schedule some transaction fetches. It also sets a timeout for the fetch request. ## TxFetcher

The `TxFetcher` struct is responsible for fetching transactions from peers in the Ethereum network. This code snippet shows the `actives` function, which is called periodically to request transactions from peers.

### actives

The `actives` function is called periodically to request transactions from peers. It takes a function `func(peer string)` as an argument, which is called for each active peer. The function checks if the peer has any pending requests or announcements, and if so, it fetches the transactions from the peer.

If there are any transactions to fetch, the function creates a new `txRequest` object and adds it to the `requests` map. It then sends a request to the peer to fetch the transactions.

If a new request was fired, the function schedules a timeout timer.

### forEachPeer

The `forEachPeer` function is used to iterate over a map of peers. In production, it does a range loop over the map, but during testing, it does a deterministic sorted random to allow reproducing issues.

### forEachHash

The `forEachHash` function is used to iterate over a map of hashes. In production, it does a range loop over the map, but during testing, it does a deterministic sorted random to allow reproducing issues.

### rotateStrings

The `rotateStrings` function rotates the contents of a slice by n steps. This method is only used in tests to simulate random map iteration but keep it deterministic.

### sortHashes

The `sortHashes` function sorts a slice of hashes. This method is only used in tests in order to simulate random map iteration but keep it deterministic.

### rotateHashes

The `rotateHashes` function rotates the contents of a slice by n steps. This method is only used in tests to simulate random map iteration but keep it deterministic. # Function Documentation: rotateHashes

The `rotateHashes` function takes in a slice of `common.Hash` values and an integer `n`. It rotates the values in the slice by `n` positions to the right, effectively shifting the values to the right and wrapping around to the beginning of the slice if necessary.

## Parameters

- `slice`: A slice of `common.Hash` values to be rotated.
- `n`: An integer representing the number of positions to rotate the values in the slice.

## Return Value

The `rotateHashes` function does not return any value. Instead, it modifies the input slice in place.

## Function Logic

The `rotateHashes` function first creates a copy of the input slice using the `make` function and the `len` function to determine the length of the slice. This is done to ensure that the original slice is not modified during the rotation process.

Next, the function iterates over the original slice using a `for` loop and assigns the rotated values to the input slice using the modulo operator to wrap around to the beginning of the slice if necessary.

## Example Usage

```go
hashes := []common.Hash{hash1, hash2, hash3, hash4}
rotateHashes(hashes, 2)
// hashes now contains [hash3, hash4, hash1, hash2]
```