Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package is a Go port of Coda Hale's Metrics library. It provides a way to collect and report various metrics about the runtime performance of a Go program.

### Variables

#### `Enabled`

The `Enabled` variable is a global kill-switch that is checked by the constructor functions for all of the standard metrics. If it is true, the metric returned is a stub. This global kill-switch helps quantify the observer effect and makes for less cluttered pprof profiles.

#### `EnabledExpensive`

The `EnabledExpensive` variable is a soft-flag meant for external packages to check if costly metrics gathering is allowed or not. The goal is to separate standard metrics for health monitoring and debug metrics that might impact runtime performance.

#### `enablerFlags`

The `enablerFlags` variable is a slice of CLI flag names to use to enable metrics collections.

#### `expensiveEnablerFlags`

The `expensiveEnablerFlags` variable is a slice of CLI flag names to use to enable expensive metrics collections.

### Functions

#### `init()`

The `init()` function enables or disables the metrics system. Since we need this to run before any other code gets to create meters and timers, we'll actually do an ugly hack and peek into the command line args for the metrics flag.

#### `readRuntimeStats(v *runtimeStats)`

The `readRuntimeStats()` function reads the runtime statistics and updates the `runtimeStats` struct. It takes one parameter:

- `v` (*runtimeStats): A pointer to the `runtimeStats` struct to update.

### Types

#### `runtimeStats`

The `runtimeStats` struct contains various runtime statistics.

##### Fields

- `GCPauses` (*metrics.Float64Histogram): A histogram of GC pauses.
- `GCAllocBytes` (uint64): The number of bytes allocated by the GC.
- `GCFreedBytes` (uint64): The number of bytes freed by the GC.
- `MemTotal` (uint64): The total amount of memory used.
- `HeapObjects` (uint64): The number of heap objects.
- `HeapFree` (uint64): The amount of free heap memory.
- `HeapReleased` (uint64): The amount of heap memory released to the OS.
- `HeapUnused` (uint64): The amount of unused heap memory.
- `Goroutines` (uint64): The number of goroutines.
- `SchedLatency` (*metrics.Float64Histogram): A histogram of scheduler latencies.

#### `runtimeSamples`

The `runtimeSamples` slice contains the names of the runtime samples to read.

##### Elements

- `/gc/pauses:seconds` (histogram): A histogram of GC pauses.
- `/gc/heap/allocs:bytes` (uint64): The number of bytes allocated by the GC.
- `/gc/heap/frees:bytes` (uint64): The number of bytes freed by the GC.
- `/memory/classes/total:bytes` (uint64): The total amount of memory used.
- `/memory/classes/heap/objects:bytes` (uint64): The number of heap objects.
- `/memory/classes/heap/free:bytes` (uint64): The amount of free heap memory.
- `/memory/classes/heap/released:bytes` (uint64): The amount of heap memory released to the OS.
- `/memory/classes/heap/unused:bytes` (uint64): The amount of unused heap memory.
- `/sched/goroutines:goroutines` (uint64): The number of goroutines.
- `/sched/latencies:seconds` (histogram): A histogram of scheduler latencies.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
import (
    "time"

    "github.com/ethereum/go-ethereum/log"
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new meter
    meter := metrics.NewMeter()
    metrics.Register("my_meter", meter)

    // Increment the meter
    meter.Mark(1)

    // Create a new timer
    timer := metrics.NewTimer()
    metrics.Register("my_timer", timer)

    // Record the time it takes to execute a function
    start := time.Now()
    myFunction()
    elapsed := time.Since(start)
    timer.Update(elapsed)

    // Start collecting runtime metrics
    go collectRuntimeMetrics Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Process Metrics Collection Function

The `CollectProcessMetrics` function is used to collect various metrics about the running process.

### Function

#### `CollectProcessMetrics(refresh time.Duration)`

This function is used to collect various metrics about the running process. It takes one parameter:

- `refresh` (time.Duration): The duration between each collection of metrics.

### Metrics

The `CollectProcessMetrics` function collects the following metrics:

#### `system/cpu/sysload`

This gauge represents the system CPU load as a percentage.

#### `system/cpu/syswait`

This gauge represents the system CPU wait time as a percentage.

#### `system/cpu/procload`

This gauge represents the process CPU load as a percentage.

#### `system/cpu/sysload/total`

This counter represents the total system CPU load in milliseconds.

#### `system/cpu/syswait/total`

This counter represents the total system CPU wait time in milliseconds.

#### `system/cpu/procload/total`

This counter represents the total process CPU load in milliseconds.

#### `system/cpu/threads`

This gauge represents the number of threads created by the process.

#### `system/cpu/goroutines`

This gauge represents the number of goroutines running in the process.

#### `system/cpu/schedlatency`

This histogram represents the scheduling latency of the Go runtime.

#### `system/memory/pauses`

This histogram represents the pause time of the Go garbage collector.

#### `system/memory/allocs`

This meter represents the number of memory allocations made by the process.

#### `system/memory/frees`

This meter represents the number of memory frees made by the process.

#### `system/memory/held`

This gauge represents the total amount of memory held by the process.

#### `system/memory/used`

This gauge represents the amount of heap memory used by the process.

#### `system/memory/objects`

This gauge represents the number of heap objects in use by the process.

#### `system/disk/readcount`

This meter represents the number of disk reads made by the process.

#### `system/disk/readdata`

This meter represents the amount of data read from disk by the process.

#### `system/disk/readbytes`

This counter represents the total number of bytes read from disk by the process.

#### `system/disk/writecount`

This meter represents the number of disk writes made by the process.

#### `system/disk/writedata`

This meter represents the amount of data written to disk by the process.

#### `system/disk/writebytes`

This counter represents the total number of bytes written to disk by the process.

### Example Usage

Here's an example of how you could use the `CollectProcessMetrics` function in your Go code:

```go
import (
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Enable metrics collection
    metrics.Enabled = true

    // Collect process metrics every 10 seconds
    go metrics.CollectProcessMetrics(10 * time.Second)

    // Do some work...
}
```

In this example, we enable metrics collection and use the `CollectProcessMetrics` function to collect process metrics every 10 seconds. We then do some work in the main function. Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## StatsTicker Function

The `StatsTicker` function is used to periodically collect and update various system statistics.

### Parameters

#### `refresh` (time.Duration)

The `refresh` parameter is used to specify the interval at which the system statistics should be collected and updated.

### Example Usage

Here's an example of how you could use the `StatsTicker` function in your Go code:

```go
import (
    "time"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create new metrics
    cpuUsage := metrics.NewGauge()
    memUsage := metrics.NewGauge()
    memPauses := metrics.NewHistogram(metrics.NewUniformSample(1024))
    memAllocs := metrics.NewCounter()
    memFrees := metrics.NewCounter()
    memTotal := metrics.NewGauge()
    heapUsed := metrics.NewGauge()
    heapObjects := metrics.NewGauge()
    diskReads := metrics.NewCounter()
    diskReadBytes := metrics.NewCounter()
    diskWrites := metrics.NewCounter()
    diskWriteBytes := metrics.NewCounter()
    diskReadBytesCounter := metrics.NewCounter()
    diskWriteBytesCounter := metrics.NewCounter()

    // Start collecting system statistics
    go metrics.StatsTicker(time.Minute, cpuUsage, memUsage, memPauses, memAllocs, memFrees, memTotal, heapUsed, heapObjects, diskReads, diskReadBytes, diskWrites, diskWriteBytes, diskReadBytesCounter, diskWriteBytesCounter)

    // Do other stuff...
}
```

In this example, we create new metrics for various system statistics and start collecting them using the `StatsTicker` function. We pass in the desired interval for collecting the statistics, as well as the various metrics we want to collect.