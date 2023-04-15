Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides a way to log various metrics periodically using a logger.

### Logger Interface

The `Logger` interface defines a single function that can be used to log messages.

#### `Printf(format string, v ...interface{})`

This function is used to log a message with the given format and arguments.

### Log Function

The `Log` function is used to log each metric in the given registry periodically using the given logger.

#### `Log(r Registry, freq time.Duration, l Logger)`

This function takes three parameters:

- `r` (Registry): The registry containing the metrics to log.
- `freq` (time.Duration): The frequency at which to log the metrics.
- `l` (Logger): The logger to use for logging the metrics.

### LogScaled Function

The `LogScaled` function is used to log each metric in the given registry periodically using the given logger. It prints timings in `scale` units (e.g. time.Millisecond) rather than nanoseconds.

#### `LogScaled(r Registry, freq time.Duration, scale time.Duration, l Logger)`

This function takes four parameters:

- `r` (Registry): The registry containing the metrics to log.
- `freq` (time.Duration): The frequency at which to log the metrics.
- `scale` (time.Duration): The unit of time to use for printing timings.
- `l` (Logger): The logger to use for logging the metrics.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
import (
    "log"
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Create some metrics
    counter := metrics.NewCounter()
    gauge := metrics.NewGauge()
    histogram := metrics.NewHistogram(metrics.NewUniformSample(100))
    meter := metrics.NewMeter()
    timer := metrics.NewTimer()

    // Register the metrics with the registry
    registry.Register("my_counter", counter)
    registry.Register("my_gauge", gauge)
    registry.Register("my_histogram", histogram)
    registry.Register("my_meter", meter)
    registry.Register("my_timer", timer)

    // Log the metrics periodically
    logger := log.New(os.Stdout, "metrics: ", log.Lmicroseconds)
    metrics.LogScaled(registry, time.Minute, time.Millisecond, logger)
}
```

In this example, we create a new registry and some metrics using the `go-metrics` package. We then register the metrics with the registry and use the `LogScaled` function to log the metrics periodically using a logger.