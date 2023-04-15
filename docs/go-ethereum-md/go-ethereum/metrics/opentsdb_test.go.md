Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### Functions

#### `ExampleOpenTSDB()`

This function provides an example of how to use the `OpenTSDB` function to report metrics to an OpenTSDB server. It takes no parameters.

The `OpenTSDB` function takes three parameters:

- `registry` (Registry): The registry to use for collecting metrics.
- `interval` (time.Duration): The interval at which to report metrics.
- `prefix` (string): The prefix to use for metric names.
- `addr` (net.Addr): The address of the OpenTSDB server to report metrics to.

#### `ExampleOpenTSDBWithConfig()`

This function provides an example of how to use the `OpenTSDBWithConfig` function to report metrics to an OpenTSDB server with a custom configuration. It takes no parameters.

The `OpenTSDBWithConfig` function takes one parameter:

- `config` (OpenTSDBConfig): The configuration to use for reporting metrics.

The `OpenTSDBConfig` struct has the following fields:

- `Addr` (net.Addr): The address of the OpenTSDB server to report metrics to.
- `Registry` (Registry): The registry to use for collecting metrics.
- `FlushInterval` (time.Duration): The interval at which to report metrics.
- `DurationUnit` (time.Duration): The unit to use for durations.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
package main

import (
	"net"
	"time"

	"github.com/rcrowley/go-metrics"
	"github.com/rcrowley/go-metrics/metrics"
)

func main() {
	// Create a new registry
	registry := metrics.NewRegistry()

	// Register some metrics
	counter := metrics.NewCounter()
	registry.Register("my_counter", counter)

	// Report metrics to an OpenTSDB server
	addr, _ := net.ResolveTCPAddr("net", ":2003")
	go metrics.OpenTSDB(registry, 1*time.Second, "my.prefix", addr)

	// Increment the counter
	counter.Inc(1)

	// Wait for a while to allow metrics to be reported
	time.Sleep(5 * time.Second)
}
```

In this example, we create a new registry and register a counter metric. We then use the `OpenTSDB` function to report metrics to an OpenTSDB server. Finally, we increment the counter and wait for a while to allow metrics to be reported.