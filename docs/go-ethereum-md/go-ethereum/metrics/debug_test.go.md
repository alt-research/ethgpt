# Metrics Package

The `metrics` package provides functions for capturing and registering metrics related to the performance of Go programs. This package includes functions for benchmarking and testing garbage collection statistics.

## Functions

### BenchmarkDebugGCStats

```go
func BenchmarkDebugGCStats(b *testing.B)
```

`BenchmarkDebugGCStats` is a benchmarking function that captures garbage collection statistics using the `CaptureDebugGCStatsOnce` function. This function is used to measure the performance of garbage collection in a Go program.

### TestDebugGCStatsBlocking

```go
func TestDebugGCStatsBlocking(t *testing.T)
```

`TestDebugGCStatsBlocking` is a testing function that tests the blocking behavior of garbage collection statistics. This function uses the `testDebugGCStatsBlocking` function to simulate a blocking operation and measure the time it takes to complete.

### testDebugGCStatsBlocking

```go
func testDebugGCStatsBlocking(ch chan int)
```

`testDebugGCStatsBlocking` is a helper function used by `TestDebugGCStatsBlocking` to simulate a blocking operation. This function increments a counter until it is interrupted by a message on the provided channel.

## Dependencies

The `metrics` package depends on the following Go standard library packages:

- `runtime`
- `runtime/debug`
- `testing`

## Example Usage

```go
package main

import (
	"fmt"
	"github.com/example/metrics"
)

func main() {
	r := metrics.NewRegistry()
	metrics.RegisterDebugGCStats(r)
	metrics.CaptureDebugGCStatsOnce(r)
	fmt.Println("Garbage collection statistics captured.")
}
```

In this example, the `metrics` package is used to capture garbage collection statistics and print them to the console. The `NewRegistry` function is used to create a new metrics registry, and the `RegisterDebugGCStats` function is used to register the garbage collection statistics with the registry. Finally, the `CaptureDebugGCStatsOnce` function is used to capture the statistics and print them to the console.