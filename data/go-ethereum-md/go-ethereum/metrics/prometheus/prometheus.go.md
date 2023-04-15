# Prometheus Package

The `prometheus` package provides an HTTP handler for dumping metrics in Prometheus format.

## Handler Function

The `Handler` function returns an HTTP handler which dumps metrics in Prometheus format. It has the following signature:

```go
func Handler(reg metrics.Registry) http.Handler
```

### Parameters

- `reg`: The metrics registry to dump.

### Return Value

The function returns an HTTP handler which dumps metrics in Prometheus format.

## Supported Metrics

The `Handler` function supports the following metrics:

### Counter

A counter metric represents a monotonically increasing value. The function converts it into a Prometheus counter.

### CounterFloat64

A counter float64 metric represents a monotonically increasing float64 value. The function converts it into a Prometheus counter.

### Gauge

A gauge metric represents a value that can increase or decrease. The function converts it into a Prometheus gauge.

### GaugeFloat64

A gauge float64 metric represents a float64 value that can increase or decrease. The function converts it into a Prometheus gauge.

### Histogram

A histogram metric represents a distribution of values. The function converts it into a Prometheus histogram.

### Meter

A meter metric represents a rate of events. The function converts it into a Prometheus counter.

### Timer

A timer metric represents a distribution of durations. The function converts it into a Prometheus histogram.

### ResettingTimer

A resetting timer metric represents a distribution of durations that are reset after each read. The function converts it into a Prometheus histogram.

## Collector

The `Handler` function aggregates all the metrics into a Prometheus collector. The `newCollector` function creates a new collector.

## Sorting

The `Handler` function gathers and pre-sorts the metrics to avoid random listings.