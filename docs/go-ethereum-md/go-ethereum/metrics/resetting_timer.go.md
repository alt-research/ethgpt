Sure, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## ResettingTimer Interface

The `ResettingTimer` interface defines several functions that can be used to store and retrieve aggregated values for timers, which are reset on every flush interval.

### Functions

#### `Values() []int64`

This function is used to get a slice with all measurements.

#### `Snapshot() ResettingTimer`

This function is used to reset the timer and return a read-only copy of its contents.

#### `Percentiles([]float64) []int64`

This function is used to get the percentiles of the timer.

#### `Mean() float64`

This function is used to get the mean of the timer.

#### `Time(func())`

This function is used to record the duration of the execution of the given function.

#### `Update(time.Duration)`

This function is used to record the duration of an event.

#### `UpdateSince(time.Time)`

This function is used to record the duration of an event that started at a time and ends now.

### GetOrRegisterResettingTimer Function

The `GetOrRegisterResettingTimer` function returns an existing `ResettingTimer` or constructs and registers a new `StandardResettingTimer`.

#### `GetOrRegisterResettingTimer(name string, r Registry) ResettingTimer`

This function is used to get an existing `ResettingTimer` or construct and register a new `StandardResettingTimer`. It takes two parameters:

- `name` (string): The name of the timer.
- `r` (Registry): The registry to use for the timer.

### NewRegisteredResettingTimer Function

The `NewRegisteredResettingTimer` function constructs and registers a new `StandardResettingTimer`.

#### `NewRegisteredResettingTimer(name string, r Registry) ResettingTimer`

This function is used to construct and register a new `StandardResettingTimer`. It takes two parameters:

- `name` (string): The name of the timer.
- `r` (Registry): The registry to use for the timer.

### NewResettingTimer Function

The `NewResettingTimer` function constructs a new `StandardResettingTimer`.

#### `NewResettingTimer() ResettingTimer`

This function is used to construct a new `StandardResettingTimer`.

### NilResettingTimer Type

The `NilResettingTimer` type is a no-op `ResettingTimer`.

#### `NilResettingTimer`

This type is a no-op `ResettingTimer`.

### StandardResettingTimer Type

The `StandardResettingTimer` type is the standard implementation of a `ResettingTimer`.

#### `StandardResettingTimer`

This type is the standard implementation of a `ResettingTimer`.

### ResettingTimerSnapshot Type

The `ResettingTimerSnapshot` type is a point-in-time copy of another `ResettingTimer`.

#### `ResettingTimerSnapshot`

This type is a point-in-time copy of another `ResettingTimer`.

### Example Usage

Here's an example of how you could use the `ResettingTimer` interface in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
    "time"
)

func main() {
    // Create a new resetting timer
    timer := metrics.NewResettingTimer()

    // Record the duration of an event
    timer.Update(time.Second)

    // Record the duration of an event that started at a time and ends now
    start := time.Now()
    time.Sleep(time.Second)
    timer.UpdateSince(start)

    // Get the values of the timer
    values := timer.Values()
    fmt.Println("Values:", values)

    // Get a snapshot of the timer
    snapshot := timer.Snapshot()
    fmt.Println("Snapshot:", snapshot)

    // Get the percentiles of the timer
    percentiles := timer.Percentiles([]float64{0.5, 0.9, 0.99})
    fmt.Println("Percentiles:", percentiles)

    // Get the mean of the timer
    mean := timer.Mean()
    fmt.Println("Mean:", mean)

    // Record the duration of the execution of a function
    timer.Time(func() {
        time.Sleep(time.Second)
    })
}
```

In this example, we create a new resetting timer using the `NewResettingTimer` function and use the various functions provided by the `ResettingTimer` interface to store and retrieve aggregated values for timers, which are reset on every flush interval. We also use the `Time` function to record the duration of the execution of a function. Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## ResettingTimerSnapshot Struct

The `ResettingTimerSnapshot` struct represents a snapshot of a `ResettingTimer` object.

### Fields

#### `values` ([]int64)

This field is an array of int64 values representing the values of the `ResettingTimer` object at the time the snapshot was taken.

#### `thresholdBoundaries` ([]int64)

This field is an array of int64 values representing the boundaries for the input percentiles.

#### `mean` (float64)

This field is a float64 value representing the mean of the snapshotted values.

#### `calculated` (bool)

This field is a boolean value indicating whether the snapshot has been calculated.

### Methods

#### `Snapshot() ResettingTimer`

This method returns the snapshot.

#### `Time(func())`

This method panics.

#### `Update(time.Duration)`

This method panics.

#### `UpdateSince(time.Time)`

This method panics.

#### `Values() []int64`

This method returns all values from the snapshot.

#### `Percentiles(percentiles []float64) []int64`

This method returns the boundaries for the input percentiles. It takes one parameter:

- `percentiles` ([]float64): An array of float64 values representing the percentiles to calculate.

#### `Mean() float64`

This method returns the mean of the snapshotted values.

### Int64Slice Type

The `Int64Slice` type attaches the methods of `sort.Interface` to `[]int64`, sorting in increasing order.

#### `Len() int`

This method returns the length of the slice.

#### `Less(i, j int) bool`

This method returns whether the element at index `i` is less than the element at index `j`.

#### `Swap(i, j int)`

This method swaps the elements at index `i` and `j`.

### Example Usage

Here's an example of how you could use the `ResettingTimerSnapshot` struct in your Go code:

```go
import (
    "fmt"
    "sort"
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new resetting timer
    timer := metrics.NewResettingTimer()

    // Time some operations
    timer.Time(func() {
        time.Sleep(100 * time.Millisecond)
    })
    timer.Time(func() {
        time.Sleep(200 * time.Millisecond)
    })
    timer.Time(func() {
        time.Sleep(300 * time.Millisecond)
    })

    // Take a snapshot of the timer
    snapshot := timer.Snapshot()

    // Get the values from the snapshot
    values := snapshot.Values()
    fmt.Println("Values:", values)

    // Get the mean from the snapshot
    mean := snapshot.Mean()
    fmt.Println("Mean:", mean)

    // Get the percentiles from the snapshot
    percentiles := []float64{50, 90, 99}
    boundaries := snapshot.Percentiles(percentiles)
    fmt.Println("Percentiles:")
    for i, p := range percentiles {
        fmt.Printf("%vth percentile: %v\n", p, boundaries[i])
    }

    // Sort the values
    sort.Sort(metrics.Int64Slice(values))
    fmt.Println("Sorted values:", values)
}
```

In this example, we create a new resetting timer and time some operations. We then take a snapshot of the timer and use the various methods provided by the `ResettingTimerSnapshot` struct to get the values, mean, and percentiles from the snapshot. We also use the `Int64Slice` type to sort the values.