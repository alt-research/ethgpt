# Block Download Scheduler

This file contains the block download scheduler to collect download tasks and schedule them in an ordered and throttled way. The scheduler is responsible for managing the download of blocks from peers and ensuring that the blocks are downloaded in an ordered and efficient manner.

## Constants

- `bodyType` and `receiptType`: constants used to identify the type of data being fetched.
- `blockCacheMaxItems`: the maximum number of blocks to cache before throttling the download.
- `blockCacheInitialItems`: the initial number of blocks to start fetching, before we know the sizes of the blocks.
- `blockCacheMemory`: the maximum amount of memory to use for block caching.
- `blockCacheSizeWeight`: a multiplier to approximate the average block size based on past ones.

## Structs

### fetchRequest

A currently running data retrieval operation.

- `Peer`: the peer to which the request was sent.
- `From`: [eth/62] the requested chain element index (used for skeleton fills only).
- `Headers`: [eth/62] the requested headers, sorted by request order.
- `Time`: the time when the request was made.

### fetchResult

A struct collecting partial results from data fetchers until all outstanding pieces complete and the result as a whole can be processed.

- `pending`: a flag telling what deliveries are outstanding.
- `Header`: the block header.
- `Uncles`: the block's uncles.
- `Transactions`: the block's transactions.
- `Receipts`: the block's receipts.

## Functions

### newFetchResult

Creates a new fetchResult struct.

- `header`: the block header.
- `fastSync`: a boolean indicating whether fast sync is enabled.

### SetBodyDone

Flags the body as finished.

### AllDone

Checks if the item is done.

### SetReceiptsDone

Flags the receipts as finished.

### Done

Checks if the given type is done already.

### queue

Represents hashes that are either need fetching or are being fetched.

- `mode`: the mode of the queue. The `queue` struct represents a download queue used for scheduling block retrieval during synchronization. It has several fields that are used for different purposes.

The `syncMode` field is used to determine the synchronization mode to decide on the block parts to schedule for fetching.

The `headerHead` field is a hash of the last queued header to verify order. The `headerTaskPool` field is a map of pending header retrieval tasks, mapping starting indexes to skeleton headers. The `headerTaskQueue` field is a priority queue of the skeleton indexes to fetch the filling headers for. The `headerPeerMiss` field is a set of per-peer header batches known to be unavailable. The `headerPendPool` field is a map of currently pending header retrieval operations. The `headerResults` field is a result cache accumulating the completed headers. The `headerProced` field is the number of headers already processed from the results. The `headerOffset` field is the number of the first header in the result cache. The `headerContCh` field is a channel to notify when header download finishes.

The `blockTaskPool` field is a map of pending block (body) retrieval tasks, mapping hashes to headers. The `blockTaskQueue` field is a priority queue of the headers to fetch the blocks (bodies) for. The `blockPendPool` field is a map of currently pending block (body) retrieval operations.

The `receiptTaskPool` field is a map of pending receipt retrieval tasks, mapping hashes to headers. The `receiptTaskQueue` field is a priority queue of the headers to fetch the receipts for. The `receiptPendPool` field is a map of currently pending receipt retrieval operations.

The `resultCache` field is a downloaded but not yet delivered fetch results. The `resultSize` field is the approximate size of a block (exponential moving average).

The `lock` field is a RWMutex used for locking access to the queue. The `active` field is a sync.Cond used for signaling when the queue is active. The `closed` field is a boolean indicating whether the queue is closed or not.

The `newQueue` function creates a new download queue for scheduling block retrieval. It takes in two parameters, `blockCacheLimit` and `thresholdInitialSize`, and returns a pointer to a new `queue` struct. It initializes the `headerContCh`, `blockTaskQueue`, `receiptTaskQueue`, `active`, and `lock` fields, and calls the `Reset` function to reset the queue contents.

The `Reset` method clears out the queue contents. It takes in two parameters, `blockCacheLimit` and `thresholdInitialSize`, and resets all the fields of the `queue` struct to their initial values.

The `Close` method marks the end of the sync, unblocking Results. It may be called even if the queue is already closed. It sets the `closed` field to true, signals the `active` field, and unlocks the `lock` field.

The `PendingHeaders` method retrieves the number of header requests pending for retrieval. It acquires a lock on the `lock` field, retrieves the size of the `headerTaskQueue`, and returns it.

The `PendingBlocks` method retrieves the number of block (body) requests pending for retrieval. It acquires a lock on the `lock` field, retrieves the size of the `blockTaskQueue`, and returns it. ## Queue Package

The Queue package contains a set of functions that manage the download queue for scheduling headers and blocks retrieval. The package provides functions to add headers to the download queue, retrieve headers, and manage the status of the download queue.

### PendingBlocks

The `PendingBlocks` function retrieves the number of block requests pending for retrieval. The function acquires a lock on the queue, retrieves the size of the block task queue, and returns the size.

### PendingReceipts

The `PendingReceipts` function retrieves the number of block receipts pending for retrieval. The function acquires a lock on the queue, retrieves the size of the receipt task queue, and returns the size.

### InFlightHeaders

The `InFlightHeaders` function retrieves whether there are header fetch requests currently in flight. The function acquires a lock on the queue, checks if there are any header fetch requests in the header pending pool, and returns a boolean value.

### InFlightBlocks

The `InFlightBlocks` function retrieves whether there are block fetch requests currently in flight. The function acquires a lock on the queue, checks if there are any block fetch requests in the block pending pool, and returns a boolean value.

### InFlightReceipts

The `InFlightReceipts` function retrieves whether there are receipt fetch requests currently in flight. The function acquires a lock on the queue, checks if there are any receipt fetch requests in the receipt pending pool, and returns a boolean value.

### Idle

The `Idle` function returns if the queue is fully idle or has some data still inside. The function acquires a lock on the queue, retrieves the size of the block and receipt task queues, and the size of the block and receipt pending pools. The function returns a boolean value indicating whether the queue is idle or not.

### ScheduleSkeleton

The `ScheduleSkeleton` function adds a batch of header retrieval tasks to the queue to fill up an already retrieved header skeleton. The function acquires a lock on the queue, checks if there is a header retrieval in progress, and panics if there is. The function then schedules all the header retrieval tasks for the skeleton assembly, resets the availability to correct invalid chains, and initializes the header task pool, header task queue, header peer miss, header results, header proced, header offset, and header cont ch.

### RetrieveHeaders

The `RetrieveHeaders` function retrieves the header chain assemble based on the scheduled skeleton. The function acquires a lock on the queue, retrieves the header results and header proced, sets the header results and header proced to nil and 0, respectively, and returns the header results and header proced.

### Schedule

The `Schedule` function adds a set of headers for the download queue for scheduling, returning the new headers encountered. The function acquires a lock on the queue, inserts all the headers prioritized by the contained block number, checks if the chain order is honored and preserved throughout, checks if the header broke chain ancestry, and checks if the header is already scheduled for block fetch. The function then adds the header to the block task pool, adds the header to the block task queue, adds the header to the header pend pool, and adds the header to the header pend queue. The function then sets the header head to the header parent hash, adds the header to the inserts slice, and returns the inserts slice.

### Conclusion

The Queue package provides a set of functions that manage the download queue for scheduling headers and blocks retrieval. The package provides functions to add headers to the download queue, retrieve headers, and manage the status of the download queue. These functions are essential for managing the download queue and ensuring that headers and blocks are retrieved efficiently and effectively. ## Documentation for the Downloader Queue

The Downloader Queue is a Go package that provides a queue for downloading blocks and receipts from the Ethereum network. The package is used by the Ethereum client to download blocks and receipts during synchronization.

### Function: Schedule

The Schedule function schedules a batch of headers for download. It takes a slice of headers and returns a slice of headers that were successfully scheduled for download. The function also adds the headers to the block task queue and the receipt task queue if the queue is in fast sync mode.

### Function: Results

The Results function retrieves and permanently removes a batch of fetch results from the cache. The function takes a boolean parameter that specifies whether the function should block if there are no items in the cache. The function returns a slice of fetch results.

### Function: Stats

The Stats function returns statistics about the downloader queue. The function returns a slice of interface{} that contains the following statistics:

- receiptTasks: the number of items in the receipt task queue
- blockTasks: the number of items in the block task queue
- itemSize: the size of the items in the result cache

### Function: ReserveHeaders

The ReserveHeaders function reserves a set of headers for the given peer, skipping any previously failed batches. The function takes a peerConnection and an integer count as parameters and returns a fetchRequest.

### Function: Deliver

The Deliver function delivers a fetch result to the downloader queue. The function takes a fetchResult as a parameter.

### Function: Close

The Close function closes the downloader queue. The function sets the closed flag to true and signals the active condition variable.

### Function: New

The New function creates a new downloader queue. The function takes a boolean parameter that specifies whether the queue is in fast sync mode. The function returns a pointer to a new queue.

### Function: fetcher

The fetcher function is a private function that fetches a block or receipt from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetch

The fetch function is a private function that fetches a block or receipt from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchBlocks

The fetchBlocks function is a private function that fetches a batch of blocks from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchReceipts

The fetchReceipts function is a private function that fetches a batch of receipts from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchUncles

The fetchUncles function is a private function that fetches a batch of uncles from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchTransactions

The fetchTransactions function is a private function that fetches a batch of transactions from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchHeaders

The fetchHeaders function is a private function that fetches a batch of headers from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchBodies

The fetchBodies function is a private function that fetches a batch of block bodies from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchReceiptsByHash

The fetchReceiptsByHash function is a private function that fetches a batch of receipts by hash from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchUnclesByHash

The fetchUnclesByHash function is a private function that fetches a batch of uncles by hash from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchTransactionsByHash

The fetchTransactionsByHash function is a private function that fetches a batch of transactions by hash from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchHeadersByHash

The fetchHeadersByHash function is a private function that fetches a batch of headers by hash from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchBodiesByHash

The fetchBodiesByHash function is a private function that fetches a batch of block bodies by hash from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchReceiptsByNumber

The fetchReceiptsByNumber function is a private function that fetches a batch of receipts by block number from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchUnclesByNumber

The fetchUnclesByNumber function is a private function that fetches a batch of uncles by block number from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchTransactionsByNumber

The fetchTransactionsByNumber function is a private function that fetches a batch of transactions by block number from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchHeadersByNumber

The fetchHeadersByNumber function is a private function that fetches a batch of headers by block number from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult.

### Function: fetchBodiesByNumber

The fetchBodiesByNumber function is a private function that fetches a batch of block bodies by block number from the Ethereum network. The function takes a fetchRequest as a parameter and returns a fetchResult. The code provided is a part of a Go program that handles the download of headers, bodies, and receipts from peers. The code contains four functions: Pop, ReserveBodies, ReserveReceipts, and reserveHeaders.

The Pop function pops the next header download request from the queue and returns it. It also skips any previously failed downloads and merges all the skipped batches back. If there are no requests to pop, it returns nil.

The ReserveBodies function reserves a set of body fetches for the given peer, skipping any previously failed downloads. It returns the next batch of needed fetches and a flag indicating whether empty blocks were queued requiring processing.

The ReserveReceipts function reserves a set of receipt fetches for the given peer, skipping any previously failed downloads. It returns the next batch of needed fetches and a flag indicating whether empty receipts were queued requiring importing.

The reserveHeaders function is a generic version used by the individual special reservation functions. It reserves a set of data download operations for a given peer, skipping any previously failed ones. It returns the next batch of needed fetches, a flag indicating whether any progress was made, and a flag indicating whether the caller should throttle for a while.

The code uses a priority queue to keep track of the headers that need to be downloaded. The queue is sorted by block number, with the highest priority block being the lowest block number. The code also uses a result cache to keep track of the headers that have already been delivered upstream.

Here is an example of how to use the Pop function:

```
func downloadHeaders(q *queue) {
    for {
        request := q.Pop()
        if request == nil {
            break
        }
        // Download the headers from the peer
        headers, err := request.Peer.GetHeaders(request.From, maxHeadersFetch, 0, false)
        if err != nil {
            // Handle the error
            continue
        }
        // Process the headers
        for _, header := range headers {
            // Add the header to the result cache
            q.resultCache.AddResult(header)
            // Add the header to the task pool
            q.headerTaskPool[header.Hash()] = header
            // Add the header to the task queue
            q.headerTaskQueue.Push(header.Number.Int64(), header)
        }
    }
}
```

Here is an example of how to use the ReserveBodies function:

```
func downloadBodies(q *queue, p *peerConnection) {
    for {
        request, empty, _ := q.ReserveBodies(p, maxBodiesFetch)
        if request == nil {
            break
        }
        // Download the bodies from the peer
        bodies, err := request.Peer.GetBodies(request.Hashes)
        if err != nil {
            // Handle the error
            continue
        }
        // Process the bodies
        for i, body := range bodies {
            if body == nil {
                // Empty block, queue for processing
                q.blockTaskPool[request.Hashes[i]] = nil
                q.blockTaskQueue.Push(request.Hashes[i].Int64(), request.Hashes[i])
                continue
            }
            // Add the body to the result cache
            q.resultCache.AddResult(body)
            // Add the body to the task pool
            q.blockTaskPool[request.Hashes[i]] = body
            // Add the body to the task queue
            q.blockTaskQueue.Push(request.Hashes[i].Int64(), body)
        }
        // Process empty blocks
        if empty {
            // Queue empty blocks for processing
            for _, hash := range request.Hashes {
                if _, ok := q.blockTaskPool[hash]; !ok {
                    q.blockTaskPool[hash] = nil
                    q.blockTaskQueue.Push(hash.Int64(), hash)
                }
            }
        }
    }
}
```

I hope this documentation helps you understand the code better. Let me know if you have any questions or need further clarification. ## Documentation for the Source Code

### Function: `queue.fetchHeaders`

This function is responsible for fetching headers from a peer. It takes a peer object and a list of headers as input and returns a fetch request object, a boolean value indicating progress, and a boolean value indicating whether the request was throttled. The function first locks the queue and then iterates over the headers in the list. For each header, it checks if there are any result slots available. If not, it logs a warning message and breaks out of the loop. If the header is a noop, it removes it from the task pool and the task queue and decrements the `proc` variable. If the peer is known not to have the data, the header is added to the `skip` list, otherwise, it is added to the `send` list. After iterating over all headers, the function merges all the skipped headers back into the task queue. If the result cache has completed items, the function signals the active channel. Finally, the function assembles and returns the block download request.

### Function: `queue.CancelHeaders`

This function cancels a fetch request for headers, returning all pending skeleton indexes to the queue. It takes a fetch request object as input and locks the queue. It then calls the `cancel` function with the header task queue and the header pending pool.

### Function: `queue.CancelBodies`

This function cancels a body fetch request, returning all pending headers to the task queue. It takes a fetch request object as input and locks the queue. It then calls the `cancel` function with the block task queue and the block pending pool.

### Function: `queue.CancelReceipts`

This function cancels a receipt fetch request, returning all pending headers to the task queue. It takes a fetch request object as input and locks the queue. It then calls the `cancel` function with the receipt task queue and the receipt pending pool.

### Function: `queue.cancel`

This function cancels a fetch request, returning all pending hashes to the task queue. It takes a fetch request object, a task queue, and a pending pool as input. If the request has a `From` value greater than zero, it pushes it onto the task queue. It then iterates over the headers in the request and pushes them onto the task queue. Finally, it deletes the request from the pending pool.

### Function: `queue.Revoke`

This function cancels all pending requests belonging to a given peer. It takes a peer ID as input and locks the queue. If there is a pending block request for the peer, it pushes all the headers onto the block task queue and deletes the request from the block pending pool. If there is a pending receipt request for the peer, it pushes all the headers onto the receipt task queue and deletes the request from the receipt pending pool.

### Function: `queue.ExpireHeaders`

This function checks for in-flight requests that exceeded a timeout allowance, canceling them and returning the responsible peers for penalization. It takes a timeout duration as input and locks the queue. It then calls the `expire` function with the header pending pool, the header task queue, and the header timeout meter.

### Function: `queue.ExpireBodies`

This function checks for in-flight block body requests that exceeded a timeout allowance, canceling them and returning the responsible peers for penalization. It takes a timeout duration as input and locks the queue. It then calls the `expire` function with the block pending pool, the block task queue, and the body timeout meter.

### Function: `queue.expire`

This function checks for in-flight requests that exceeded a timeout allowance, canceling them and returning the responsible peers for penalization. It takes a timeout duration, a pending pool, a task queue, and a timeout meter as input. It first initializes a map to keep track of the responsible peers. It then iterates over the pending pool, checking if the request has exceeded the timeout duration. If it has, it cancels the request and adds the peer to the map. Finally, it returns the map of responsible peers. ## Documentation for the Go codebase

### pireReceipts

The `pireReceipts` function checks for in-flight receipt requests that exceeded a timeout allowance, cancels them, and returns the responsible peers for penalization. The function takes a timeout duration as input and returns a map of string keys and integer values.

### expire

The `expire` function is a generic check that moves expired tasks from a pending pool back into a task pool, returning all entities caught with expired tasks. This function is called by `pireReceipts` and other similar functions. The function takes a timeout duration, a pending pool, a task queue, and a timeout meter as input. The function returns a map of string keys and integer values.

Note that this method expects the queue lock to be already held. The reason the lock is not obtained in here is that the parameters already need to access the queue, so they already need a lock anyway.

### DeliverHeaders

The `DeliverHeaders` function injects a header retrieval response into the header results cache. This method either accepts all headers it received or none of them if they do not map correctly to the skeleton.

If the headers are accepted, the method makes an attempt to deliver the set of ready headers to the processor to keep the pipeline full. However, it will not block to prevent stalling other pending deliveries. The function takes a peer ID, a slice of headers, and a header processing channel as input and returns an integer and an error.

The function first checks if the data was ever requested. If not, it returns an error. If the data was requested, the function checks if the headers can be mapped onto the skeleton chain. If the headers are accepted, the function attempts to deliver the set of ready headers to the processor to keep the pipeline full.

### Conclusion

In conclusion, the codebase contains three functions: `pireReceipts`, `expire`, and `DeliverHeaders`. These functions are used to check for in-flight receipt requests that exceeded a timeout allowance, move expired tasks from a pending pool back into a task pool, and inject a header retrieval response into the header results cache. The codebase is written in Go and is designed to be efficient and scalable. ## Queue

The `queue` struct is used to manage the fetching of block headers, block bodies, and transaction receipts. It contains several fields, including a lock, a header task pool, a header task queue, a header results slice, a header offset, a header proced, a header peer miss map, a header cont channel, a block task pool, a block task queue, a block pend pool, a receipt task pool, a receipt task queue, a receipt pend pool, and a metrics timer.

### Fetch

The `Fetch` function is used to fetch block headers from a peer. It takes in a `fetchRequest` struct, which contains the peer ID, the block number, and the maximum number of headers to fetch. The function returns the number of headers fetched and an error if the fetch was unsuccessful.

### DeliverBodies

The `DeliverBodies` function is used to inject a block body retrieval response into the results queue. It takes in the peer ID, a slice of transaction lists, and a slice of uncle lists. The function returns the number of block bodies accepted from the delivery and wakes any threads waiting for data delivery.

### DeliverReceipts

The `DeliverReceipts` function is used to inject a receipt retrieval response into the results queue. It takes in the peer ID and a slice of receipt lists. The function returns the number of transaction receipts accepted from the delivery and wakes any threads waiting for data delivery.

### Deliver

The `deliver` function is used to inject a data retrieval response into the results queue. It takes in the peer ID, a task pool, a task queue, a pend pool, a request timer, the number of results, a validation function, and a reconstruction function. The function returns the number of data retrieval responses accepted from the delivery and wakes any threads waiting for data delivery.

## Conclusion

The `queue` struct and its associated functions are used to manage the fetching of block headers, block bodies, and transaction receipts. The `Fetch` function is used to fetch block headers from a peer, while the `DeliverBodies` and `DeliverReceipts` functions are used to inject block body and receipt retrieval responses into the results queue, respectively. The `deliver` function is used to inject a data retrieval response into the results queue. The first function is called `processFetchResponse` and takes in several parameters: `id` of type `uint64`, `results` of type `int`, `header` of type `*types.Header`, and `reconstruct` of type `func(index int, result *fetchResult)`. The purpose of this function is to process the response from a fetch request made to a peer. 

The function first checks if the data was ever requested by looking up the `id` in the `pendPool` map. If the request was not found, it returns an error. Otherwise, it updates the request timer and deletes the request from the `pendPool` map. 

If no data items were retrieved, the function marks them as unavailable for the origin peer. Otherwise, it assembles each of the results with their headers and retrieved data parts. It validates the fields and appends the header hashes to a slice called `hashes`. 

The function then checks if the result cache has a delivery slot for each header. If it does, it calls the `reconstruct` function with the accepted index and the result. Otherwise, it logs an error and sets the `failure` variable to `errStaleDelivery`. 

If a fetch is successful, it deletes the corresponding hash from the `taskPool` map and increments the `accepted` counter. If a fetch fails, it pushes the header to the back of the `taskQueue`. 

Finally, the function signals the `active` condition variable if any fetches were successful. If there were no successful fetches, it returns an error with `errStaleDelivery`. If there were some successful fetches, it returns an error with `partial failure` and the `failure` variable. 

The second function is called `Prepare` and takes in two parameters: `offset` of type `uint64` and `mode` of type `SyncMode`. The purpose of this function is to configure the result cache to allow accepting and caching inbound fetch results. 

The function first acquires a lock on the `queue` object and then calls the `Prepare` function on the `resultCache` object with the `offset` parameter. It also sets the `mode` variable to the `mode` parameter.