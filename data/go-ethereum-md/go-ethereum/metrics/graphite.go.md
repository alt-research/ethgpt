Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Graphite Exporter

The `Graphite` package provides functionality for exporting metrics to a Graphite server.

### GraphiteConfig Struct

The `GraphiteConfig` struct provides a container with configuration parameters for the Graphite exporter.

#### Fields

- `Addr` (*net.TCPAddr): The network address to connect to.
- `Registry` (Registry): The registry to be exported.
- `FlushInterval` (time.Duration): The flush interval.
- `DurationUnit` (time.Duration): The time conversion unit for durations.
- `Prefix` (string): The prefix to be prepended to metric names.
- `Percentiles` ([]float64): The percentiles to export from timers and histograms.

### Functions

#### `Graphite(r Registry, d time.Duration, prefix string, addr *net.TCPAddr)`

This function is a blocking exporter function which reports metrics in `r` to a Graphite server located at `addr`, flushing them every `d` duration and prepending metric names with `prefix`.

#### `GraphiteWithConfig(c GraphiteConfig)`

This function is a blocking exporter function just like `Graphite`, but it takes a `GraphiteConfig` instead.

#### `GraphiteOnce(c GraphiteConfig) error`

This function performs a single submission to Graphite, returning a non-nil error on failed connections. This can be used in a loop similar to `GraphiteWithConfig` for custom error handling.

#### `graphite(c *GraphiteConfig) error`

This function is used internally by the `Graphite` package to export metrics to a Graphite server.

### Example Usage

Here's an example of how you could use the `Graphite` package in your Go code:

```go
import (
    "net"
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Create a new counter
    counter := metrics.NewCounter()
    registry.Register("my_counter", counter)

    // Create a new GraphiteConfig
    addr, _ := net.ResolveTCPAddr("tcp", "localhost:2003")
    config := metrics.GraphiteConfig{
        Addr:          addr,
        Registry:      registry,
        FlushInterval: time.Second,
        DurationUnit:  time.Millisecond,
        Prefix:        "myapp",
        Percentiles:   []float64{0.5, 0.75, 0.95, 0.99},
    }

    // Export metrics to Graphite
    metrics.GraphiteWithConfig(config)

    // Increment the counter
    counter.Inc(1)

    // Wait for the metrics to be exported
    time.Sleep(2 * time.Second)
}
```

In this example, we create a new registry and a new counter, and register the counter with the registry. We then create a new `GraphiteConfig` with the appropriate settings, and use the `GraphiteWithConfig` function to export the metrics to a Graphite server. Finally, we increment the counter and wait for the metrics to be exported. Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metric Exporter

The `MetricExporter` type is used to export metrics in a specific format.

### Functions

#### `Export(w io.Writer, c *Config, now int64) error`

This function is used to export metrics in a specific format. It takes three parameters:

- `w` (io.Writer): The writer to write the exported metrics to.
- `c` (*Config): The configuration to use for the export.
- `now` (int64): The current time in Unix timestamp format.

### Example Usage

Here's an example of how you could use the `MetricExporter` type in your Go code:

```go
import (
    "bytes"
    "fmt"
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Create a new counter
    counter := metrics.NewCounter()
    registry.Register("my_counter", counter)

    // Increment the counter
    counter.Inc(1)

    // Create a new timer
    timer := metrics.NewTimer()
    registry.Register("my_timer", timer)

    // Record the duration of an operation
    timer.Time(func() {
        time.Sleep(time.Second)
    })

    // Export the metrics
    var buf bytes.Buffer
    exporter := &MetricExporter{}
    exporter.Export(&buf, &Config{Prefix: "myapp"}, time.Now().Unix())

    // Print the exported metrics
    fmt.Println(buf.String())
}
```

In this example, we create a new registry and register a counter and a timer. We then increment the counter and record the duration of an operation using the timer. Finally, we export the metrics using the `MetricExporter` type and print the exported metrics.