# Librato Package

The `librato` package provides a reporter that sends metrics to the Librato Metrics service.

## Reporter Type

The `Reporter` type represents a reporter that sends metrics to the Librato Metrics service. It has the following fields:

### Email string

The email address associated with the Librato Metrics account.

### Token string

The API token associated with the Librato Metrics account.

### Namespace string

The namespace to use for the metrics. If empty, the default namespace is used.

### Source string

The source to use for the metrics. If empty, the hostname is used.

### Interval time.Duration

The interval at which to send the metrics.

### Registry metrics.Registry

The registry to use for the metrics.

### Percentiles []float64

The percentiles to report on histogram metrics.

### TimerAttributes map[string]interface{}

The units in which timers will be displayed.

### intervalSec int64

The interval in seconds.

### Functions

#### NewReporter()

The `NewReporter` function constructs a new `Reporter`. It has the following signature:

```go
func NewReporter(r metrics.Registry, d time.Duration, e string, t string, s string, p []float64, u time.Duration) *Reporter
```

### Parameters

- `r`: The registry to use for the metrics.
- `d`: The interval at which to send the metrics.
- `e`: The email address associated with the Librato Metrics account # Metrics Package

The `metrics` package provides a set of interfaces and implementations for collecting and reporting metrics in Go programs.

## Snapshot Type

The `Snapshot` type represents a snapshot of a set of metrics. It has the following fields:

### Counters []Measurement

Counters is a slice of `Measurement` structs representing counters.

### Gauges []Measurement

Gauges is a slice of `Measurement` structs representing gauges.

### Histograms []Measurement

Histograms is a slice of `Measurement` structs representing histograms.

### Meters []Measurement

Meters is a slice of `Measurement` structs representing meters.

### Timers []Measurement

Timers is a slice of `Measurement` structs representing timers.

## Measurement Type

The `Measurement` type represents a single measurement of a metric. It has the following fields:

### Name string

Name is the name of the metric.

### Value interface{}

Value is the value of the metric.

### Count uint64

Count is the count of the metric.

### Max float64

Max is the maximum value of the metric.

### Min float64

Min is the minimum value of the metric.

### # Metrics Package

The `metrics` package provides a set of interfaces and implementations for collecting and reporting metrics in Go programs.

## Report Function

The `Report` function generates a report of the metrics in the given registry and sends it to the given reporter. It has the following signature:

```go
func Report(r Registry, rep Reporter)
```

### Parameters

- `r`: The registry to report on.
- `rep`: The reporter to send the report to.

### Return Value

The function does not return a value.

### Description

The `Report` function generates a report of the metrics in the given registry and sends it to the given reporter. The report includes the following measurements for each metric:

- Count
- Mean
- Min
- Max
- StdDev
- 50th Percentile
- 75th Percentile
- 95th Percentile
- 99th Percentile
- 99.9th Percentile
- One Minute Rate
- Five Minute Rate
- Fifteen Minute Rate

The measurements are sent to the reporter as a slice of `Measurement` structs.

## Measurement Type

The `Measurement` type represents a single measurement of a metric. It has the following fields:

### Name string

The name of the measurement.

### Value float64

The value of the measurement.

### Period int64

The period of the measurement in seconds.

### Attributes map[string]interface{}

The attributes of the measurement.

## Example Usage

Here's an example of how you could use the `Report` function in your Go code:

```go
import (
    "fmt"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Create a new counter and register it with the registry
    counter := metrics.NewCounter()
    registry.Register("my_counter", counter)

    // Increment the counter
    counter.Inc(1)

    // Create a new reporter that prints to stdout
    reporter := metrics.NewStdoutReporter()

    // Report the metrics to the reporter
    metrics.Report(registry, reporter)
}
```

In this example, we create a new registry and a new counter, and register the counter with the registry. We then increment the counter by one. We create a new reporter that prints to stdout, and report the metrics in the registry to the reporter using the `Report` function. The output of the program should be similar to the following:

```
my_counter.count: 1
my_counter.mean: 1
my_counter.min: 1
my_counter.max: 1
my_counter.stddev: 0
my_counter.p50: 1
my_counter.p75: 1
my_counter.p95: 1
my_counter.p99: 1
my_counter.p999: 1
my_counter.rate.1min: 0
my_counter.rate.5min: 0
my_counter.rate.15min: 0
```