# InfluxDB Package

The `influxdb` package provides a function for reading metrics from the Ethereum client and converting them into InfluxDB format.

## readMeter Function

The `readMeter` function reads a metric from the Ethereum client and converts it into InfluxDB format. It has the following signature:

```go
func readMeter(namespace, name string, i interface{}) (string, map[string]interface{})
```

### Parameters

- `namespace`: The namespace of the metric.
- `name`: The name of the metric.
- `i`: The metric to read.

### Return Value

The function returns a measurement and a map of fields in InfluxDB format.

## Supported Metrics

The `readMeter` function supports the following metrics:

### Counter

A counter metric represents a monotonically increasing value. The function converts it into an InfluxDB measurement with a `count` field.

### CounterFloat64

A counter float64 metric represents a monotonically increasing float64 value. The function converts it into an InfluxDB measurement with a `count` field.

### Gauge

A gauge metric represents a value that can increase or decrease. The function converts it into an InfluxDB measurement with a `value` field.

### GaugeFloat64

A gauge float64 metric represents a float64 value that can increase or decrease. The function converts it into an InfluxDB measurement with a `value` field.

### Histogram

A histogram metric represents a distribution of values. The function converts it into an InfluxDB measurement with the following fields:

- `count`: The number of values in the distribution.
- `max`: The maximum value in the distribution.
- `mean`: The mean value of the distribution.
- `min`: The minimum value in the distribution.
- `stddev`: The standard deviation of the distribution.
- `variance`: The variance of the distribution.
- `p25`: The 25th percentile of the distribution.
- `p50`: The 50th percentile of the distribution.
- `p75`: The 75th percentile of the distribution.
- `p95`: The 95th percentile of the distribution.
- `p99`: The 99th percentile of the distribution.
- `p999`: The 99.9th percentile of the distribution.
- `p9999`: The 99.99th percentile of the distribution.

### Meter

A meter metric represents a rate of events. The function converts it into an InfluxDB measurement with the following fields:

- `count`: The number of events.
- `m1`: The one-minute rate of events.
- `m5`: The five-minute rate of events.
- `m15`: The fifteen-minute rate of events.
- `mean`: The mean rate of events.

### Timer

A timer metric represents a distribution of durations. The function converts it into an InfluxDB measurement with the following fields:

- `count`: The number of durations.
- `max`: The maximum duration.
- `mean`: The mean duration.
- `min`: The minimum duration.
- `stddev`: The standard deviation of the durations.
- `variance`: The variance of the durations.
- `p50`: The 50th percentile of the durations.
- `p75`: The 75th percentile of the durations.
- `p95`: The 95th percentile of the durations.
- `p99`: The 99th percentile of the durations.
- `p999`: The 99.9th percentile of the durations.
- `p9999`: The 99.99th percentile of the durations.
- `m1`: The one-minute rate of durations.
- `m5`: The five-minute rate of durations.
- `m15`: The fifteen-minute rate of durations.
- `meanrate`: The mean rate of durations.

### ResettingTimer

A resetting timer metric represents a distribution of durations that are reset after each read. The function converts it into an InfluxDB measurement with the following fields:

- `count`: The number of durations.
- `max`: The maximum duration.
- `mean`: The mean duration.
- `min`: The minimum duration.
- `p50`: The 50th percentile of the durations.
- `p95`: The 95th percentile of the durations.
- `p99`: The 99th percentile of the durations.