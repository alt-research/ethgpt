Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### `Write()` Function

The `Write()` function sorts and writes each metric in the given registry periodically to the given `io.Writer`. It takes three parameters:

- `r` (Registry): The registry to write the metrics from.
- `d` (time.Duration): The duration between writes.
- `w` (io.Writer): The writer to write the metrics to.

### `WriteOnce()` Function

The `WriteOnce()` function sorts and writes metrics in the given registry to the given `io.Writer`. It takes two parameters:

- `r` (Registry): The registry to write the metrics from.
- `w` (io.Writer): The writer to write the metrics to.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
package main

import (
    "fmt"
    "os"
    "time"

    "github.com/myusername/mymodule/metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Register some metrics
    counter := metrics.NewCounter()
    registry.Register("mycounter", counter)

    gauge := metrics.NewGauge()
    registry.Register("mygauge", gauge)

    // Write metrics to stdout every 10 seconds
    go metrics.Write(registry, 10*time.Second, os.Stdout)

    // Do some work...
    counter.Inc(1)
    gauge.Update(42)

    // Wait for