# Documentation for resultStore in downloader package

The `resultStore` struct is used to maintain `fetchResults`, track their download progress, and deliver finished results. It contains the following fields:

- `items`: an array of `fetchResult` objects that have been downloaded but not yet delivered.
- `resultOffset`: the offset of the first cached `fetchResult` in the block chain.
- `indexIncomplete`: an internal index of the first non-completed entry, updated atomically when needed.
- `throttleThreshold`: the limit up to which we want to fill the results. If blocks are large, we want to limit the results to less than the number of available slots, and maybe only fill 1024 out of 8192 possible places. The queue will, at certain times, recalibrate this index.
- `lock`: a mutex to protect concurrent access to the `resultStore`.

The `resultStore` struct has the following methods:

## newResultStore

```go
func newResultStore(size int) *resultStore
```

`newResultStore` creates a new `resultStore` object with the given size.

## SetThrottleThreshold

```go
func (r *resultStore) SetThrottleThreshold(threshold uint64) uint64
```

`SetThrottleThreshold` updates the throttling threshold based on the requested limit and the total queue capacity. It returns the (possibly capped) threshold.

## AddFetch

```go
func (r *resultStore) AddFetch(header *types.Header, fastSync bool) (stale, throttled bool, item *fetchResult, err error)
```

`AddFetch` adds a header for body/receipt fetching. This is used when the queue wants to reserve headers for fetching. It returns the following:

- `stale`: if true, this item is already passed, and should not be requested again.
- `throttled`: if true, the store is at capacity, this particular header is not priority now.
- `item`: the result to store data into.
- `err`: any error that occurred.

## GetDeliverySlot

```go
func (r *resultStore) GetDeliverySlot(headerNumber uint64) (*fetchResult, bool)
```

`GetDeliverySlot` returns the `fetchResult` for the given header. If the `stale` flag is true, that means the header has already been delivered upstream. This method does not bubble up the `throttle` flag, since it's moot at the point in time when the item is downloaded and ready for delivery.

## GetFetchResult

```go
func (r *resultStore) GetFetchResult(number uint64) (*fetchResult, int, bool, bool, error)
```

`GetFetchResult` returns the `fetchResult` for the given block number. It also returns the index of the `fetchResult` in the `items` array, whether the `fetchResult` is stale, whether the `fetchResult` is throttled, and any error that occurred.

## GetResultOffset

```go
func (r *resultStore) GetResultOffset() uint64
```

`GetResultOffset` returns the offset of the first cached `fetchResult` in the block chain.

## GetThrottleThreshold

```go
func (r *resultStore) GetThrottleThreshold() uint64
```

`GetThrottleThreshold` returns the throttling threshold. This codebase is written in Go and contains a struct called `resultStore` with several methods. Let's go through each method and its purpose:

1. `getFetchResult(headerNumber uint64) (item *fetchResult, index int, stale, throttle bool, err error)`: This method returns the `fetchResult` corresponding to the given `headerNumber` and the index where the result is stored. It also returns a boolean value indicating whether the result is stale or not, a boolean value indicating whether the result is beyond the throttle threshold, and an error if the index allocation went beyond the available `resultStore` space.

2. `HasCompletedItems() bool`: This method returns a boolean value indicating whether there are processable items available. It checks if the length of the `items` slice is greater than zero and if the first item in the slice is not nil and has completed processing.

3. `countCompleted() int`: This method returns the number of items ready for delivery, stopping at the first non-complete item. It assumes that at least the read lock is held.

4. `GetCompleted(limit int) []*fetchResult`: This method returns the next batch of completed `fetchResults`. It takes a limit parameter indicating the maximum number of results to return. It first counts the number of completed results, then creates a slice of `fetchResult` pointers with the specified limit and copies the completed results into it. It then deletes the completed results from the cache and clears the tail. Finally, it advances the expected block number of the first cache entry.

5. `Prepare(offset uint64)`: This method initializes the offset with the given block number. It takes a `uint64` parameter indicating the block number to use as the offset and sets the `resultOffset` field to it.

The code also contains a `sync.RWMutex` field called `lock` to synchronize access to the `resultStore` struct. The `RLock()` and `RUnlock()` methods are used to acquire and release a read lock, respectively, while the `Lock()` and `Unlock()` methods are used to acquire and release a write lock, respectively.

Here's an example of how to use the `getFetchResult()` method:

```
rs := &resultStore{}
res, stale, err := rs.getFetchResult(12345)
if err != nil {
    // handle error
}
if stale {
    // handle stale result
}
// use res
```

I hope this documentation helps you understand the purpose of each method in the `resultStore` struct. Let me know if you have any questions or need further clarification.