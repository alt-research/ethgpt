# Beacon Backfiller

The `beaconBackfiller` is a struct that handles the chain and state backfilling process that can be initiated once the skeleton syncer has successfully reverse downloaded all the headers up to the genesis block or an existing header in the database. Its operation is fully directed by the skeleton sync's head/tail events.

## Variables

- `downloader`: A pointer to the `Downloader` struct that directs the backfiller.
- `syncMode`: The sync mode to use for backfilling the skeleton chains.
- `success`: A callback function to run on successful sync cycle completion.
- `filling`: A boolean flag indicating whether the downloader is backfilling or not.
- `filled`: The last header filled by the last terminated sync loop.
- `started`: A notification channel indicating whether the downloader has initialized.
- `lock`: A mutex that protects the sync lock.

## Functions

### `newBeaconBackfiller`

```go
func newBeaconBackfiller(dl *Downloader, success func()) backfiller
```

`newBeaconBackfiller` is a helper method to create the backfiller. It takes a pointer to the `Downloader` struct that directs the backfiller and a callback function to run on successful sync cycle completion. It returns a `backfiller` interface.

### `suspend`

```go
func (b *beaconBackfiller) suspend() *types.Header
```

`suspend` cancels any background downloader threads and returns the last header that has been successfully backfilled. If no filling is running, it returns the filled header on the previous sync completion. If a previous filling cycle is still running, it ignores the start request.

### `resume`

```go
func (b *beaconBackfiller) resume()
```

`resume` starts the downloader threads for backfilling state and chain data. If a previous filling cycle is still running, it ignores the start request. ## Documentation for Beacon Chain Downloader

### Function: `go func()`

This function starts the backfilling process on a separate thread since the downloader does not have its own lifecycle runloop. It sets the backfiller to non-filling when download completes. If the downloader fails, it reports an error as in beacon chain mode there should be no errors as long as the chain we're syncing to is valid. If synchronization succeeds, it notifies the outer context to disable snap syncing and enable transaction propagation.

### Function: `func (b *beaconBackfiller) setMode(mode SyncMode)`

This function updates the sync mode from the current one to the requested one. If there's an active sync in progress, it will be cancelled and restarted.

### Function: `func (d *Downloader) SetBadBlockCallback(onBadBlock badBlockFn)`

This function sets the callback to run when a bad block is hit by the block processor. This method is not thread safe and should be set only once on startup before system events are fired.

### Function: `func (d *Downloader) BeaconSync(mode SyncMode, head *types.Header, final *types.Header) error`

This function is the post-merge version of the chain synchronization, where the chain is not downloaded from genesis onward, rather from trusted head announces backwards. Internally backfilling and state sync is done the same way, but the header retrieval and scheduling is replaced.

### Function: `func (d *Downloader) BeaconExtend(mode SyncMode, head *types.Header) error`

This function is an optimistic version of BeaconSync, where an attempt is made to extend the current beacon chain with a new header, but in case of a mismatch, the old sync will not be terminated and reorged, rather the new head is dropped. This is useful if a beacon client is feeding us large chunks of payloads to run, but is not setting the head after each.

### Function: `func (d *Downloader) beaconSync(mode SyncMode, head *types.Header, final *types.Header, force bool) error`

This function is the post-merge version of the chain synchronization, where the chain is not downloaded from genesis onward, rather from trusted head announces backwards. Internally backfilling and state sync is done the same way, but the header retrieval and scheduling is replaced. When the downloader starts a sync cycle, it needs to be aware of the sync mode to use (full, snap). To keep the skeleton chain oblivious, inject the mode into the backfiller directly. The function signals the skeleton sync to switch to a new head, however it wants. If an error occurs, it is returned. ## Documentation for `findBeaconAncestor` function

The `findBeaconAncestor` function is a method of the `Downloader` struct. It tries to locate the common ancestor link of the local chain and the beacon chain just requested. In the general case when our node was in sync and on the correct chain, checking the top N links should already get us a match. In the rare scenario when we ended up on a long reorganization (i.e. none of the head links match), we do a binary search to find the ancestor.

### Parameters

This function does not take any parameters.

### Return Value

This function returns a `uint64` value representing the ancestor block number and an error if any.

### Example

```go
ancestor, err := d.findBeaconAncestor()
if err != nil {
    log.Error("Failed to find beacon ancestor", "err", err)
    return err
}
```

## Documentation for `fetchBeaconHeaders` function

The `fetchBeaconHeaders` function is a method of the `Downloader` struct. It feeds skeleton headers to the downloader queue for scheduling until sync errors or is finished.

### Parameters

This function takes a `uint64` value representing the block number from which to start fetching headers.

### Return Value

This function returns an error if any.

### Example

```go
err := d.fetchBeaconHeaders(from)
if err != nil {
    log.Error("Failed to fetch beacon headers", "err", err)
    return err
}
``` The `SyncBeaconHeaders` function is responsible for synchronizing beacon headers from the Ethereum network. It takes an argument `from` which is the block number from which to start syncing headers. If there are headers available locally, it retrieves them and checks if the `from` argument is valid. If the `from` argument is invalid, it returns an error. 

The function then enters a loop where it checks if the pivot header is stale. If it is, it retrieves the next pivot header from the skeleton chain or the filled chain. If the pivot header is not found, it returns an error. If the pivot header is found, it writes it to the database so that a rollback beyond it will re-enable snap sync and update the state root that the state syncer will be downloading.

The function then retrieves a batch of headers and feeds them to the header processor. If there are still headers to import, it loops and keeps pushing them. If there are no more headers to import and the pivot block is committed, it signals header sync termination. If the state sync is still going, it waits a bit for new headers and retries.

```go
func (d *downloader) SyncBeaconHeaders(from uint64) error {
	tail := d.skeleton.Tail()
	head, _, _, err := d.skeleton.Bounds()
	if err != nil {
		return err
	}

	// Retrieve local headers if available and check if the origin is valid
	var localHeaders []*types.Header
	if from < tail.Number.Uint64() {
		count := tail.Number.Uint64() - from
		if count > uint64(fsMinFullBlocks) {
			return fmt.Errorf("invalid origin (%d) of beacon sync (%d)", from, tail.Number)
		}
		localHeaders = d.readHeaderRange(tail, int(count))
		log.Warn("Retrieved beacon headers from local", "from", from, "count", count)
	}

	for {
		// Some beacon headers might have appeared since the last cycle, make
		// sure we're always syncing to all available ones
		head, _, _, err = d.skeleton.Bounds()
		if err != nil {
			return err
		}

		// If the pivot became stale (older than 2*64-8 (bit of wiggle room)),
		// move it ahead to HEAD-64
		d.pivotLock.Lock()
		if d.pivotHeader != nil {
			if head.Number.Uint64() > d.pivotHeader.Number.Uint64()+2*uint64(fsMinFullBlocks)-8 {
				// Retrieve the next pivot header, either from skeleton chain
				// or the filled chain
				number := head.Number.Uint64() - uint64(fsMinFullBlocks)

				log.Warn("Pivot seemingly stale, moving", "old", d.pivotHeader.Number, "new", number)
				if d.pivotHeader = d.skeleton.Header(number); d.pivotHeader == nil {
					if number < tail.Number.Uint64() {
						dist := tail.Number.Uint64() - number
						if len(localHeaders) >= int(dist) {
							d.pivotHeader = localHeaders[dist-1]
							log.Warn("Retrieved pivot header from local", "number", d.pivotHeader.Number, "hash", d.pivotHeader.Hash(), "latest", head.Number, "oldest", tail.Number)
						}
					}
				}
				// Print an error log and return directly in case the pivot header
				// is still not found. It means the skeleton chain is not linked
				// correctly with local chain.
				if d.pivotHeader == nil {
					log.Error("Pivot header is not found", "number", number)
					d.pivotLock.Unlock()
					return errNoPivotHeader
				}
				// Write out the pivot into the database so a rollback beyond
				// it will reenable snap sync and update the state root that
				// the state syncer will be downloading
				rawdb.WriteLastPivotNumber(d.stateDB, d.pivotHeader.Number.Uint64())
			}
		}
		d.pivotLock.Unlock()

		// Retrieve a batch of headers and feed it to the header processor ## Function: r(fsHeaderContCheck)

This function takes in a parameter `fsHeaderContCheck` and returns an error. It is not clear what the purpose of this function is without more context. 

The function appears to be using a select statement with a case for a channel `d.cancelCh`. If the cancel channel receives a value, the function returns an error with the message "errCanceled". 

Without more information about the purpose of this function and its context within the codebase, it is difficult to provide a more detailed explanation.