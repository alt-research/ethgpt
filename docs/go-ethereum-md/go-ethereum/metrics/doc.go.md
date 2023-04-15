Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### Constants

#### `epsilon`

The `epsilon` constant is a very small number used for floating-point comparisons. It is set to `0.0000000000000001`.

#### `epsilonPercentile`

The `epsilonPercentile` constant is a very small number used for percentile calculations. It is set to `.00000000001`.

### Example Usage

Here's an example of how you could use the `epsilon` and `epsilonPercentile` constants in your Go code:

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

    // Get the 50th percentile of the histogram
    percentile := histogram.Percentile(0.5)

    // Compare the percentile to a value with epsilon
    if math.Abs(percentile-2.0) < metrics.Epsilon() {
        fmt.Println("Percentile is within epsilon of 2.0")
    }

    // Compare the percentile to a value with epsilonPercentile
    if math.Abs(percentile-2.0) < percentile*metrics.EpsilonPercentile() {
        fmt.Println("Percentile is within epsilonPercentile of 2.0")
    }
}
```

In this example, we create a new histogram using the `NewHistogram` function provided by the `metrics` package. We then update the histogram with some values and get the 50th percentile using the `Percentile` function. We compare the percentile to a value with `epsilon` and `epsilonPercentile` to determine if it is within a certain range.