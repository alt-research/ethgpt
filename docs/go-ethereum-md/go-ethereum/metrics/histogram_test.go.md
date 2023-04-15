Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### Functions

#### `BenchmarkHistogram(b *testing.B)`

This function is used to benchmark the `Histogram` type. It creates a new `Histogram` with a `UniformSample` of size 100 and updates it with `b.N` values.

#### `TestGetOrRegisterHistogram(t *testing.T)`

This function is used to test the `GetOrRegisterHistogram` function. It creates a new `Registry`, a `UniformSample` of size 100, and a new `RegisteredHistogram` with the name "foo" and the `Registry` and `UniformSample`. It then updates the `RegisteredHistogram` with the value 47 and checks that the count of the `Histogram` returned by `GetOrRegisterHistogram` is 1.

#### `TestHistogram10000(t *testing.T)`

This function is used to test the `Histogram` type with 10000 values. It creates a new `Histogram` with a `UniformSample` of size 100000 and updates it with the values 1 through 10000. It then calls the `testHistogram10000` function to check that the count, min, max, mean, standard deviation, and percentiles of the `Histogram` are correct.

#### `TestHistogramEmpty(t *testing.T)`

This function is used to test the `Histogram` type with an empty `UniformSample`. It creates a new `Histogram` with a `UniformSample` of size 100 and checks that the count, min, max, mean, standard deviation, and percentiles of the `Histogram` are all 0.

#### `TestHistogramSnapshot(t *testing.T)`

This function is used to test the `Snapshot` function of the `Histogram` type. It creates a new `Histogram` with a `UniformSample` of size 100000 and updates it with the values 1 through 10000. It then takes a snapshot of the `Histogram` and updates the original `Histogram` with the value 0. It then calls the `testHistogram10000` function to check that the count, min, max, mean, standard deviation, and percentiles of the snapshot are correct.

#### `testHistogram10000(t *testing.T, h Histogram)`

This function is used to test the `Histogram` type with 10000 values. It takes two parameters:

- `t` (testing.T): The testing object.
- `h` (Histogram): The `Histogram` to test.

It checks that the count, min, max, mean, standard deviation, and percentiles of the `Histogram` are correct.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
import (
    "fmt"
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new histogram with a uniform sample of size 100
    h := metrics.NewHistogram(metrics.NewUniformSample(100))

    // Update the histogram with some values
    for i := 1; i <= 10000; i++ {
        h.Update(int64(i))
    }

    // Print some statistics about the histogram
    fmt.Println("Count:", h.Count())
    fmt.Println("Min:", h.Min())
    fmt.Println("Max:", h.Max())
    fmt.Println("Mean:", h.Mean())
    fmt.Println("Standard Deviation:", h.StdDev())
    fmt.Println("50th Percentile:", h.Percentile(0.5))
    fmt.Println("75th Percentile:", h.Percentile(0.75))
    fmt.Println("99th Percentile:", h.Percentile(0.99))
}
```

In this example, we create a new `Histogram` with a `UniformSample` of size 100 and update it with the values 1 through 10000. We then print some statistics about the `Histogram`, including the count, min, max, mean, standard deviation, and percentiles.