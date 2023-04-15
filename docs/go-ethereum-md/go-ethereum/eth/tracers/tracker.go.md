# `stateTracker` Package

The `stateTracker` package provides an auxiliary tool used to cache the release functions of all used trace states, and to determine whether the creation of trace state needs to be paused in case there are too many states waiting for tracing.

## `newStateTracker`

```go
func newStateTracker(limit int, oldest uint64) *stateTracker
```

`newStateTracker` initializes the tracker with provided state limits and the number of the first state that will be used.

- `limit` - Maximum number of states allowed waiting for tracing.
- `oldest` - The number of the oldest state which is still using for trace.

## `releaseState`

```go
func (t *stateTracker) releaseState(number uint64, release StateReleaseFunc)
```

`releaseState` marks the state specified by the number as released and caches the corresponding release functions internally.

- `number` - The number of the state to be released.
- `release` - The release function of the state to be released.

## `callReleases`

```go
func (t *stateTracker) callReleases()
```

`callReleases` invokes all cached release functions.

## `wait`

```go
func (t *stateTracker) wait(number uint64) error
```

`wait` blocks until the accumulated trace states are less than the limit.

- `number` - The number of the state to be waited for.