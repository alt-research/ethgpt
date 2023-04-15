Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Timer Interface

The `Timer` interface defines several functions that can be used to capture the duration and rate of events.

### Functions

#### `Count() int64`

This function returns the number of events recorded.

#### `Max() int64`

This function returns the maximum value in the sample.

#### `Mean() float64`

This function returns the mean of the values in the sample.

#### `Min() int64`

This function returns the minimum value in the sample.

#### `Percentile(float64) float64`

This function returns the value at a given percentile in the sample. It takes one parameter:

- `p` (float64): The percentile to get the value for.

#### `Percentiles([]float64) []float64`

This function returns the values at the given percentiles in the sample. It takes one parameter:

- `ps` ([]float64): The percentiles to get the values for.

#### `Rate1() float64`

This function returns the one-minute rate of events.

#### `Rate5() float64`

This function returns the five-minute rate of events.

#### `Rate15() float64`

This function returns the fifteen-minute rate of events.

#### `RateMean() float64`

This function returns the mean rate of events.

#### `Snapshot() Timer`

This function returns a snapshot of the timer.

#### `StdDev() float64`

This function returns the standard deviation of the values in the sample.

#### `Stop()`

This function stops the timer.

#### `Sum() int64`

This function returns the sum of the values in the sample.

#### `Time(func())`

This function times the execution of a function.

#### `Update(time.Duration)`

This function updates the timer with a duration.

#### `UpdateSince(time.Time)`

This function updates the timer with the time since a given time.

#### `Variance() float64`

This function returns the variance of the values in the sample.

### GetOrRegisterTimer Function

The `GetOrRegisterTimer` function returns an existing timer or constructs and registers a new `StandardTimer`.

#### `GetOrRegisterTimer(name string, r Registry) Timer`

This function returns an existing timer or constructs and registers a new `StandardTimer`. It takes two parameters:

- `name` (string): The name of the timer.
- `r` (Registry): The registry to use for the timer.

### NewCustomTimer Function

The `NewCustomTimer` function constructs a new `StandardTimer` from a histogram and a meter.

#### `NewCustomTimer(h Histogram, m Meter) Timer`

This function constructs a new `StandardTimer` from a histogram and a meter. It takes two parameters:

- `h` (Histogram): The histogram to use for the timer.
- `m` (Meter): The meter to use for the timer.

### NewRegisteredTimer Function

The `NewRegisteredTimer` function constructs and registers a new `StandardTimer`.

#### `NewRegisteredTimer(name string, r Registry) Timer`

This function constructs and registers a new `StandardTimer`. It takes two parameters:

- `name` (string): The name of the timer.
- `r` (Registry): The registry to use for the timer.

### NewTimer Function

The `NewTimer` function constructs a new `StandardTimer` using an exponentially-decaying sample with the same reservoir size and alpha as UNIX load averages.

#### `NewTimer() Timer`

This function constructs a new `StandardTimer` using an exponentially-decaying sample with the same reservoir size and alpha as UNIX load averages.

### NilTimer Type

The `NilTimer` type is a no-op timer.

### StandardTimer Type

The `StandardTimer` type is the standard implementation of a timer and uses a histogram and meter.

### Example Usage

Here's an example of how you could use the `Timer` interface in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
    "time"
)

func main() {
    // Create a new timer
    timer := metrics.NewTimer()

    // Time the execution of a function
    timer.Time(func() {
        time.Sleep(1 * time.Second)
    })

    // Update the timer Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## StandardTimer

The `StandardTimer` type is a timer that records the duration of events and provides various statistics about those events.

### Functions

#### `Count() int64`

This function returns the number of events recorded by the timer.

#### `Max() int64`

This function returns the maximum value recorded by the timer.

#### `Mean() float64`

This function returns the mean value of the events recorded by the timer.

#### `Min() int64`

This function returns the minimum value recorded by the timer.

#### `Percentile(p float64) float64`

This function returns an arbitrary percentile of the values recorded by the timer.

#### `Percentiles(ps []float64) []float64`

This function returns a slice of arbitrary percentiles of the values recorded by the timer.

#### `Rate1() float64`

This function returns the one-minute moving average rate of events per second.

#### `Rate5() float64`

This function returns the five-minute moving average rate of events per second.

#### `Rate15() float64`

This function returns the fifteen-minute moving average rate of events per second.

#### `RateMean() float64`

This function returns the meter's mean rate of events per second.

#### `Snapshot() Timer`

This function returns a read-only copy of the timer.

#### `StdDev() float64`

This function returns the standard deviation of the values recorded by the timer.

#### `Stop()`

This function stops the meter.

#### `Sum() int64`

This function returns the sum of the values recorded by the timer.

#### `Time(f func())`

This function records the duration of the execution of the given function.

#### `Update(d time.Duration)`

This function records the duration of an event.

#### `UpdateSince(ts time.Time)`

This function records the duration of an event that started at a time and ends now.

#### `Variance() float64`

This function returns the variance of the values recorded by the timer.

### TimerSnapshot

The `TimerSnapshot` type is a read-only copy of another timer.

#### `Count() int64`

This function returns the number of events recorded at the time the snapshot was taken.

#### `Max() int64`

This function returns the maximum value at the time the snapshot was taken.

#### `Mean() float64`

This function returns the mean value at the time the snapshot was taken.

#### `Min() int64`

This function returns the minimum value at the time the snapshot was taken.

#### `Percentile(p float64) float64`

This function returns an arbitrary percentile of sampled values at the time the snapshot was taken.

#### `Percentiles(ps []float64) []float64`

This function returns a slice of arbitrary percentiles of sampled values at the time the snapshot was taken.

#### `Rate1() float64`

This function returns the one-minute moving average rate of events per second at the time the snapshot was taken.

#### `Rate5() float64`

This function returns the five-minute moving average rate of events per second at the time the snapshot was taken.

#### `Rate15() float64`

This function returns the fifteen-minute moving average rate of events per second at the time the snapshot was taken.

#### `RateMean() float64`

This function returns the meter's mean rate of events per second at the time the snapshot was taken.

### Example Usage

Here's an example of how you could use the `StandardTimer` type in your Go code:

```go
import (
    "fmt"
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new timer
    timer := metrics.NewTimer()

    // Record the duration of an event
    timer.Update(time.Second)

    // Record the duration of an event that started at a time and ends now
    ts := time.Now()
    time.Sleep(time.Second)
    timer.UpdateSince(ts)

    // Record the duration of the execution of a function
    timer.Time(func() {
        time.Sleep(time.Second)
    })

    // Get various statistics about the timer
    fmt.Println("Count:", timer.Count())
    fmt.Println("Max:", timer.Max())
    fmt.Println("Mean:", timer.Mean())
    fmt.Println("Min:", timer.Min())
    fmt.Println("Percentile:", timer.Percentile(0.5))
    fmt.Println("Percentiles:", timer.Percentiles([]float64{0.5, 0.9, 0.99}))
    fmt.Println("Rate1:", timer.Rate1())
    fmt.Println("Rate5:", timer.Rate5())
    fmt.Println("Rate15:", timer.Rate15())
    fmt.Println("RateMean:", timer.RateMean())
    fmt.Println("StdDev:", timer.StdDev())
    fmt.Println("Sum:", timer.Sum())
    fmt.Println("Variance:", timer.V Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## TimerSnapshot Type

The `TimerSnapshot` type is a snapshot of a `Timer` that captures its current state.

### Functions

#### `Count() int64`

This function returns the number of events recorded at the time the snapshot was taken.

#### `Max() int64`

This function returns the maximum value recorded at the time the snapshot was taken.

#### `Mean() float64`

This function returns the mean value recorded at the time the snapshot was taken.

#### `Min() int64`

This function returns the minimum value recorded at the time the snapshot was taken.

#### `Percentile(p float64) float64`

This function returns the `p`th percentile value recorded at the time the snapshot was taken.

#### `Rate1() float64`

This function returns the one-minute moving average rate of events per second at the time the snapshot was taken.

#### `Rate5() float64`

This function returns the five-minute moving average rate of events per second at the time the snapshot was taken.

#### `Rate15() float64`

This function returns the fifteen-minute moving average rate of events per second at the time the snapshot was taken.

#### `RateMean() float64`

This function returns the meter's mean rate of events per second at the time the snapshot was taken.

#### `Snapshot() Timer`

This function returns the snapshot.

#### `StdDev() float64`

This function returns the standard deviation of the values at the time the snapshot was taken.

#### `Stop()`

This function is a no-op.

#### `Sum() int64`

This function returns the sum at the time the snapshot was taken.

#### `Time(func())`

This function panics.

#### `Update(time.Duration)`

This function panics.

#### `UpdateSince(time.Time)`

This function panics.

#### `Variance() float64`

This function returns the variance of the values at the time the snapshot was taken.

### Example Usage

Here's an example of how you could use the `TimerSnapshot` type in your Go code:

```go
import (
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new timer
    timer := metrics.NewTimer()

    // Record some events
    timer.Update(time.Second)
    timer.Update(time.Second * 2)
    timer.Update(time.Second * 3)

    // Take a snapshot of the timer
    snapshot := timer.Snapshot()

    // Print some statistics from the snapshot
    fmt.Println("Count:", snapshot.Count())
    fmt.Println("Max:", snapshot.Max())
    fmt.Println("Mean:", snapshot.Mean())
    fmt.Println("Min:", snapshot.Min())
    fmt.Println("Percentile:", snapshot.Percentile(0.5))
    fmt.Println("Rate1:", snapshot.Rate1())
    fmt.Println("Rate5:", snapshot.Rate5())
    fmt.Println("Rate15:", snapshot.Rate15())
    fmt.Println("RateMean:", snapshot.RateMean())
    fmt.Println("StdDev:", snapshot.StdDev())
    fmt.Println("Sum:", snapshot.Sum())
    fmt.Println("Variance:", snapshot.Variance())
}
```

In this example, we create a new timer and record some events. We then take a snapshot of the timer and print some statistics from the snapshot using the various functions provided by the `TimerSnapshot` type.