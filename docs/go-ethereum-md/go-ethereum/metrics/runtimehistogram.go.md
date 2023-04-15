## Metrics Package

The `metrics` package provides a way to collect and report various metrics in Go programs. This package contains a `runtimeHistogram` type that wraps a `runtime/metrics` histogram.

### Functions

#### `getOrRegisterRuntimeHistogram(name string, scale float64, r Registry) *runtimeHistogram`

This function returns a `*runtimeHistogram` pointer. It takes three arguments: `name` (string), `scale` (float64), and `r` (Registry). If `r` is `nil`, it uses the `DefaultRegistry`. It registers a new `runtimeHistogram` with the given `name` and `scale` factor in the provided `Registry` or the `DefaultRegistry`. If the `name` already exists in the `Registry`, it returns the existing `runtimeHistogram`.

### Types

#### `runtimeHistogram`

The `runtimeHistogram` type wraps a `runtime/metrics` histogram. It has the following methods:

##### `Clear()`

This method panics as `runtimeHistogram` does not support clearing.

##### `Update(int64)`

This method panics as `runtimeHistogram` does not support updating.

##### `Sample() Sample`

This method returns a `NilSample`.

##### `Snapshot() Histogram`

This method returns a non-changing copy of the histogram.

##### `Count() int64`

This method returns the sample count.

##### `Mean() float64`

This method returns an approximation of the mean.

##### `StdDev() float64`

This method approximates the standard deviation of the histogram.

##### `Variance() float64`

This method approximates the variance of the histogram.

##### `Percentile(p float64) float64`

This method computes the p'th percentile value.

##### `Percentiles(ps []float64) []float64`

This method computes all requested percentile values.

##### `Max() int64`

This method returns the highest sample value.

##### `Min() int64`

This method returns the lowest sample value.

##### `Sum() int64`

This method returns the sum of all sample values.

#### `runtimeHistogramSnapshot`

The `runtimeHistogramSnapshot` type is a type alias for `metrics.Float64Histogram`. It has the following methods:

##### `Clear()`

This method panics as `runtimeHistogram` does not support clearing.

##### `Update(int64)`

This method panics as `runtimeHistogram` does not support updating.

##### `Sample() Sample`

This method returns a `NilSample`.

##### `Snapshot() Histogram`

This method returns the histogram.

##### `Count() int64`

This method returns the sample count.

##### `Mean() float64`

This method returns an approximation of the mean.

##### `mean() (mean, totalCount float64)`

This method computes the mean and also the total sample count. It is used internally by `Mean()`.

##### `StdDev() float64`

This method approximates the standard deviation of the histogram.

##### `Variance() float64`

This method approximates the variance of the histogram.

##### `Percentile(p float64) float64`

This method computes the p'th percentile value.

##### `Percentiles(ps []float64) []float64`

This method computes all requested percentile values.

##### `Max() int64`

This method returns the highest sample value.

##### `Min() int64`

This method returns the lowest sample value.

##### `Sum() int64`

This method returns the sum of all sample values.

### Example Usage

Here's an example of how you could use the `getOrRegisterRuntimeHistogram` function in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
)

func main() {
    r := metrics.NewRegistry()
    h := metrics.GetOrRegisterRuntimeHistogram("myHistogram", 0.1, r)
    h.Update(1)
    h.Update(2)
    h.Update(3)
    fmt.Println(h.Mean())
}
``` 

This code creates a new `Registry`, registers a new `runtimeHistogram` with the name "myHistogram" and a scale factor of 0.1, and updates it with three values. Finally, it prints the mean of the histogram. ## RuntimeHistogramSnapshot

The `RuntimeHistogramSnapshot` struct represents a snapshot of a float64 histogram. It provides methods to compute various statistics on the histogram.

### Functions

#### `mean() (float64, float64)`

The `mean` function computes the mean value of the histogram. It returns a tuple of two float64 values: the mean value and the total count of samples.

#### `midpoint(bucket int) float64`

The `midpoint` function computes the midpoint of a given bucket in the histogram. It takes an integer `bucket` as input and returns a float64 value representing the midpoint of the bucket.

#### `StdDev() float64`

The `StdDev` function approximates the standard deviation of the histogram. It returns a float64 value representing the standard deviation.

#### `Variance() float64`

The `Variance` function approximates the variance of the histogram. It returns a float64 value representing the variance.

#### `Percentile(p float64) float64`

The `Percentile` function computes the p'th percentile value of the histogram. It takes a float64 value `p` as input and returns a float64 value representing the p'th percentile value.

#### `Percentiles(ps []float64) []float64`

The `Percentiles` function computes all requested percentile values of the histogram. It takes a slice of float64 values `ps` as input and returns a slice of float64 values representing the requested percentile values.

#### `computePercentiles(thresh []float64)`

The `computePercentiles` function computes the percentile values of the histogram for a given set of thresholds. It takes a slice of float64 values `thresh` as input and modifies it in place to store the computed percentile values.

#### `Max() int64`

The `Max` function returns the highest sample value of the histogram. It returns an int64 value representing the highest sample value.

#### `Min() int64`

The `Min` function returns the lowest sample value of the histogram. It returns an int64 value representing the lowest sample value.

#### `Sum() int64`

The `Sum` function returns the sum of all sample values of the histogram. It returns an int64 value representing the sum of all sample values.

### Example Usage

Here's an example of how you could use the `RuntimeHistogramSnapshot` struct in your Go code:

```go
import (
    "math/rand"
    "github.com/rcrowley/go-metrics"
)

func main() {
    histogram := metrics.NewHistogram(metrics.NewExpDecaySample(1028, 0.015))
    for i := 0; i < 1000; i++ {
        histogram.Update(rand.Float64() * 100)
    }
    snapshot := histogram.Snapshot().(*metrics.Histogram).Snapshot()
    mean, count := snapshot.mean()
    fmt.Printf("Mean: %f, Count: %f\n", mean, count)
    fmt.Printf("Max: %d, Min: %d, Sum: %d\n", snapshot.Max(), snapshot.Min(), snapshot.Sum())
    fmt.Printf("Variance: %f, StdDev: %f\n", snapshot.Variance(), snapshot.StdDev())
    fmt.Printf("50th Percentile: %f, 90th Percentile: %f\n", snapshot.Percentile(0.5), snapshot.Percentile(0.9))
    fmt.Printf("All Percentiles: %v\n", snapshot.Percentiles([]float64{0.1, 0.5, 0.9}))
}
``` Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## sAscendingKeepingIndex Struct

The `sAscendingKeepingIndex` struct is used to sort a slice of `float64` values while keeping track of their original indexes.

### Fields

#### `values []float64`

This field is a slice of `float64` values to be sorted.

#### `indexes []int`

This field is a slice of `int` values representing the original indexes of the `float64` values.

### Functions

#### `Len() int`

This function returns the length of the `values` slice.

#### `Less(i, j int) bool`

This function compares the `float64` values at indexes `i` and `j` in the `values` slice and returns `true` if the value at index `i` is less than the value at index `j`.

#### `Swap(i, j int)`

This function swaps the `float64` values at indexes `i` and `j` in the `values` slice, as well as their corresponding indexes in the `indexes` slice.

## floatsByIndex Struct

The `floatsByIndex` struct is used to sort a slice of `float64` values based on their original indexes.

### Fields

#### `values []float64`

This field is a slice of `float64` values to be sorted.

#### `indexes []int`

This field is a slice of `int` values representing the original indexes of the `float64` values.

### Functions

#### `Len() int`

This function returns the length of the `values` slice.

#### `Less(i, j int) bool`

This function compares the indexes at `i` and `j` in the `indexes` slice and returns `true` if the value at index `i` is less than the value at index `j`.

#### `Swap(i, j int)`

This function swaps the `float64` values at indexes `i` and `j` in the `values` slice, as well as their corresponding indexes in the `indexes` slice.

### Example Usage

Here's an example of how you could use the `sAscendingKeepingIndex` and `floatsByIndex` structs in your Go code:

```go
import (
    "sort"
)

func main() {
    values := []float64{3.2, 1.5, 4.7, 2.1}
    indexes := make([]int, len(values))
    for i := range indexes {
        indexes[i] = i
    }

    sort.Sort(sAscendingKeepingIndex{values, indexes})
    // values is now [1.5, 2.1, 3.2, 4.7]
    // indexes is now [1, 3, 0, 2]

    sort.Sort(floatsByIndex{values, indexes})
    // values is now [3.2, 1.5, 4.7, 2.1]
    // indexes is now [0, 1, 2, 3]
}
```