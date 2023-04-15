# Metrics Package

The `metrics` package provides a set of interfaces and implementations for collecting and reporting metrics in Go programs.

## Counter Interface

The `Counter` interface represents a counter that can be incremented and decremented. It has the following methods:

### Clear()

Clear sets the counter to zero.

### Count() int64

Count returns the current count.

### Dec(int64)

Dec decrements the counter by the given amount.

### Inc(int64)

Inc increments the counter by the given amount.

### Snapshot() Counter

Snapshot returns a read-only copy of the counter.

## GetOrRegisterCounter Function

The `GetOrRegisterCounter` function returns an existing `Counter` or constructs and registers a new `StandardCounter`. It has the following signature:

```go
func GetOrRegisterCounter(name string, r Registry) Counter
```

### Parameters

- `name`: The name of the counter.
- `r`: The registry to use. If `nil`, the default registry is used.

### Return Value

The function returns a `Counter`.

## GetOrRegisterCounterForced Function

The `GetOrRegisterCounterForced` function returns an existing `Counter` or constructs and registers a new `Counter` no matter the global switch is enabled or not. It has the following signature:

```go
func GetOrRegisterCounterForced(name string, r Registry) Counter
```

### Parameters

- `name`: The name of the counter.
- `r`: The registry to use. If `nil`, the default registry is used.

### Return Value

The function returns a `Counter`.

## NewCounter Function

The `NewCounter` function constructs a new `StandardCounter`. It has the following signature:

```go
func NewCounter() Counter
```

### Return Value

The function returns a `Counter`.

## NewCounterForced Function

The `NewCounterForced` function constructs a new `StandardCounter` and returns it no matter if the global switch is enabled or not. It has the following signature:

```go
func NewCounterForced() Counter
```

### Return Value

The function returns a `Counter`.

## NewRegisteredCounter Function

The `NewRegisteredCounter` function constructs and registers a new `StandardCounter`. It has the following signature:

```go
func NewRegisteredCounter(name string, r Registry) Counter
```

### Parameters

- `name`: The name of the counter.
- `r`: The registry to use. If `nil`, the default registry is used.

### Return Value

The function returns a `Counter`.

## NewRegisteredCounterForced Function

The `NewRegisteredCounterForced` function constructs and registers a new `StandardCounter` and launches a goroutine no matter the global switch is enabled or not. It has the following signature:

```go
func NewRegisteredCounterForced(name string, r Registry) Counter
```

### Parameters

- `name`: The name of the counter.
- `r`: The registry to use. If `nil`, the default registry is used.

### Return Value

The function returns a `Counter`.

## CounterSnapshot Type

The `CounterSnapshot` type is a read-only copy of another `Counter`.

### Functions

#### Clear()

Clear panics.

#### Count() int64

Count returns the count at the time the snapshot was taken.

#### Dec(int64)

Dec panics.

#### Inc(int64)

Inc panics.

#### Snapshot() Counter

Snapshot returns the snapshot.

## NilCounter Type

The `NilCounter` type is a no-op `Counter`.

### Functions

#### Clear()

Clear is a no-op.

#### Count() int64

Count is a no-op.

#### Dec(int64)

Dec is a no-op.

#### Inc(int64)

Inc is a no-op.

#### Snapshot() Counter

Snapshot is a no-op.

## StandardCounter Type

The `StandardCounter` type is the standard implementation of a `Counter` and uses the `sync/atomic` package to manage a single `int64` value.

### Fields

#### count int64

The current count.

### Functions

#### Clear()

Clear sets the counter to zero.

#### Count() int64

Count returns the current count.

#### Dec(int64)

Dec decrements the counter by the given amount.

#### Inc(int64)

Inc increments the counter by the given amount.

#### Snapshot() Counter

Snapshot returns a read-only copy of the counter.

### Example Usage

Here's an example of how you could use the `StandardCounter` type in your Go code:

```go
import (
    "fmt"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new counter
    counter := metrics.NewCounter()

    // Increment the counter
    counter.Inc(1)

    // Take a snapshot of the counter
    snapshot := counter.Snapshot()

    // Print the count from the snapshot
    fmt.Println("Count:", snapshot.Count())
}
```

In this example, we create a new counter and increment it by one. We then take a snapshot of the counter and print the count from the snapshot using the `Count` function provided by the `CounterSnapshot` type.