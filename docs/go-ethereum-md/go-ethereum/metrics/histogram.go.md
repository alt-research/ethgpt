Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Histogram Interface

The `Histogram` interface defines several functions that can be used to calculate distribution statistics from a series of `int64` values.

### Functions

#### `Clear()`

This function is used to clear the histogram.

#### `Count() int64`

This function is used to get the number of samples recorded in the histogram.

#### `Max() int64`

This function is used to get the maximum value in the histogram.

#### `Mean() float64`

This function is used to get the mean of the values in the histogram.

#### `Min() int64`

This function is used to get the minimum value in the histogram.

#### `Percentile(float64) float64`

This function is used to get an arbitrary percentile of values in the histogram.

#### `Percentiles([]float64) []float64`

This function is used to get a slice of arbitrary percentiles of values in the histogram.

#### `Sample() Sample`

This function is used to get the sample underlying the histogram.

#### `Snapshot() Histogram`

This function is used to get a read-only copy of the histogram.

#### `StdDev() float64`

This function is used to get the standard deviation of the values in the histogram.

#### `Sum() int64`

This function is used to get the sum of the values in the histogram.

#### `Update(int64)`

This function is used to update the histogram with a new value.

#### `Variance() float64`

This function is used to get the variance of the values in the histogram.

### GetOrRegisterHistogram Function

The `GetOrRegisterHistogram` function is used to get an existing histogram or construct and register a new `StandardHistogram`.

### GetOrRegisterHistogramLazy Function

The `GetOrRegisterHistogramLazy` function is used to get an existing histogram or construct and register a new `StandardHistogram`.

### NewHistogram Function

The `NewHistogram` function is used to construct a new `StandardHistogram` from a sample.

### NewRegisteredHistogram Function

The `NewRegisteredHistogram` function is used to construct and register a new `StandardHistogram` from a sample.

### HistogramSnapshot Type

The `HistogramSnapshot` type is a read-only copy of another histogram.

### NilHistogram Type

The `NilHistogram` type is a no-op histogram.

### Example Usage

Here's an example of how you could use the `Histogram` interface in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new histogram
    histogram := metrics.NewHistogram(metrics.NewUniformSample(1024))

    // Update the histogram with some values
    histogram.Update(10)
    histogram.Update(20)
    histogram.Update(30)

    // Get some statistics from the histogram
    count := histogram.Count()
    max := histogram.Max()
    mean := histogram.Mean()
    min := histogram.Min()
    percentile := histogram.Percentile(0.95)
    stdDev := histogram.StdDev()
    sum := histogram.Sum()
    variance := histogram.Variance()

    // Print the statistics
    fmt.Printf("Count: %d\n", count)
    fmt.Printf("Max: %d\n", max)
    fmt.Printf("Mean: %f\n", mean)
    fmt.Printf("Min: %d\n", min)
    fmt.Printf("95th Percentile: %f\n", percentile)
    fmt.Printf("Standard Deviation: %f\n", stdDev)
    fmt.Printf("Sum: %d\n", sum)
    fmt.Printf("Variance: %f\n", variance)
}
```

In this example, we create a new histogram using the `NewHistogram` function and update it with some values using the `Update` function. We then use the various functions provided by the `Histogram` interface to get some statistics from the histogram and print them to the console. Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## NilHistogram

The `NilHistogram` type is a no-op implementation of the `Histogram` interface.

### Functions

#### `Clear()`

This function is a no-op and does not clear the histogram.

#### `Count() int64`

This function is a no-op and always returns 0.

#### `Max() int64`

This function is a no-op and always returns 0.

#### `Mean() float64`

This function is a no-op and always returns 0.0.

#### `Min() int64`

This function is a no-op and always returns 0.

#### `Percentile(p float64) float64`

This function is a no-op and always returns 0.0.

#### `Percentiles(ps []float64) []float64`

This function is a no-op and always returns a slice of 0.0 values.

#### `Sample() Sample`

This function is a no-op and always returns a `NilSample`.

#### `Snapshot() Histogram`

This function is a no-op and always returns a `NilHistogram`.

#### `StdDev() float64`

This function is a no-op and always returns 0.0.

#### `Sum() int64`

This function is a no-op and always returns 0.

#### `Update(v int64)`

This function is a no-op and does not update the histogram.

#### `Variance() float64`

This function is a no-op and always returns 0.0.

## StandardHistogram

The `StandardHistogram` type is the standard implementation of a `Histogram` and uses a `Sample` to bound its memory use.

### Functions

#### `Clear()`

This function clears the histogram and its sample.

#### `Count() int64`

This function returns the number of samples recorded since the histogram was last cleared.

#### `Max() int64`

This function returns the maximum value in the sample.

#### `Mean() float64`

This function returns the mean of the values in the sample.

#### `Min() int64`

This function returns the minimum value in the sample.

#### `Percentile(p float64) float64`

This function returns an arbitrary percentile of the values in the sample.

#### `Percentiles(ps []float64) []float64`

This function returns a slice of arbitrary percentiles of the values in the sample.

#### `Sample() Sample`

This function returns the `Sample` underlying the histogram.

#### `Snapshot() Histogram`

This function returns a read-only copy of the histogram.

#### `StdDev() float64`

This function returns the standard deviation of the values in the sample.

#### `Sum() int64`

This function returns the sum in the sample.

#### `Update(v int64)`

This function samples a new value.

#### `Variance() float64`

This function returns the variance of the values in the sample.

### Example Usage

Here's an example of how you could use the `StandardHistogram` type in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new histogram
    histogram := metrics.NewHistogram(metrics.NewUniformSample(1024))

    // Update the histogram with some values
    histogram.Update(1)
    histogram.Update(2)
    histogram.Update(3)

    // Print some statistics about the histogram
    count := histogram.Count()
    mean := histogram.Mean()
    fmt.Printf("Count: %d, Mean: %f\n", count, mean)
}
```

In this example, we create a new `StandardHistogram` using a `UniformSample` with a size of 1024. We then update the histogram with some values and print some statistics about the histogram.