# Documentation for `downloader` package

The `downloader` package provides a way to download blocks, headers, and transactions from the Ethereum network.

## Constants

None

## Variables

None

## Functions

### `newResultStore`

```go
func newResultStore(size int) *resultStore
```

`newResultStore` creates a new instance of `resultStore` with the given size.

### `SetThrottleThreshold`

```go
func (r *resultStore) SetThrottleThreshold(threshold uint64) uint64
```

`SetThrottleThreshold` updates the throttling threshold based on the requested limit and the total queue capacity. It returns the (possibly capped) threshold.

### `AddFetch`

```go
func (r *resultStore) AddFetch(header *types.Header, fastSync bool) (stale, throttled bool, item *fetchResult, err error)
```

`AddFetch` adds a header for body/receipt fetching. This is used when the queue wants to reserve headers for fetching. It returns the following:

- `stale`: if true, this item is already passed, and should not be requested again
- `throttled`: if true, the store is at capacity, this particular header is not prio now
- `item`: the result to store data into
- `err`: any error that occurred

### `GetDeliverySlot`

```go
func (r *resultStore) GetDeliverySlot(headerNumber uint64) (*fetchResult, bool, error)
```

`GetDeliverySlot` returns the `fetchResult` for the given header. If the `stale` flag is true, that means the header has already been delivered upstream. This method does not bubble up the `throttle` flag, since it's moot at the point in time when the item is downloaded and ready for delivery. It returns the following:

- `fetchResult`: the `fetchResult` for the given header
- `stale`: if true, the header has already been delivered upstream
- `error`: any error that occurred

### `GetFetchResult`

```go
func (r *resultStore) GetFetchResult(number uint64) (*fetchResult, bool, error)
```

`GetFetchResult` returns the `fetchResult` for the given block number. If the `stale` flag is true, that means the header has already been delivered upstream. If the `throttle` flag is true, the store is at capacity, and this particular header is not a priority. It returns the following:

- `fetchResult`: the `fetchResult` for the given block number
- `stale`: if true, the header has already been delivered upstream
- `throttle`: if true, the store is at capacity, and this particular header is not a priority
- `error`: any error that occurred

### `GetResult`

```go
func (r *resultStore) GetResult(number uint64) (*fetchResult, bool, error)
```

`GetResult` returns the `fetchResult` for the given block number. If the `stale` flag is true, that means the header has already been delivered upstream. It returns the following:

- `fetchResult`: the `fetchResult` for the given block number
- `stale`: if true, the header has already been delivered upstream
- `error`: any error that occurred

### `GetResults`

```go
func (r *resultStore) GetResults(from uint64, limit int) ([]*fetchResult, error)
```

`GetResults` returns a slice of `fetchResult` starting from the given block number and up to the given limit.

### `GetResultsFrom`

```go
func (r *resultStore) GetResultsFrom(from uint64) ([]*fetchResult, error)
```

`GetResultsFrom` returns a slice of `fetchResult` starting from the given block number.

### `GetResultsLimit`

```go
func (r *resultStore) GetResultsLimit(limit int) ([]*fetchResult, error)
```

`GetResultsLimit` returns a slice of `fetchResult` up to the given limit.

### `GetResultsRange`

```go
func (r *resultStore) GetResultsRange(from, to uint64) ([]*fetchResult, error)
```

`GetResultsRange` returns a slice of `fetchResult` starting from the given block number and up to the given limit.

### `GetResultsReverse`

```go
func (r *resultStore) GetResultsReverse(from uint64, limit int) ([]*fetchResult, error)
```

`GetResultsReverse` returns a slice of `fetchResult` starting from the given block number in reverse order and up to the given limit.

### `GetResultsTo ## Function Documentation

### `getFetchResult(headerNumber uint64) (item *fetchResult, index int, stale, throttle bool, err error)`

This function returns the `fetchResult` corresponding to the given `headerNumber`, and the index where the result is stored. It takes the `headerNumber` as an argument and returns the `fetchResult`, the index of the result, a boolean indicating if the result is stale, a boolean indicating if the result is throttled, and an error if the index allocation went beyond the available `resultStore` space.

### `HasCompletedItems() bool`

This function returns a boolean indicating if there are processable items available. It checks if there are any items in the `resultStore` and if the first item is not `nil` and all its processes are done.

### `countCompleted() int`

This function returns the number of items ready for delivery, stopping at the first non-complete item. It assumes that at least the read lock is held.

### `GetCompleted(limit int) []*fetchResult`

This function returns the next batch of completed `fetchResults`. It takes the `limit` as an argument and returns a slice of `fetchResults`. It copies the completed `fetchResults` to a new slice, deletes the results from the cache, clears the tail, advances the expected block number of the first cache entry, and returns the new slice.

### `Prepare(offset uint64)`

This function initializes the offset with the given block number. It takes the `offset` as an argument and sets the `resultOffset` to the `offset`.