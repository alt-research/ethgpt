# Prometheus Package

The `prometheus` package provides a collector for aggregating Prometheus reports for different metric types.

## Collector Type

The `collector` type represents a collection of byte buffers that aggregate Prometheus reports for different metric types. It has the following fields:

### Buff *bytes.Buffer

The byte buffer that aggregates Prometheus reports.

## Functions

The `prometheus` package provides the following functions:

### newCollector Function

The `newCollector` function creates a new Prometheus metric aggregator. It has the following signature:

```go
func newCollector() *collector
```

### addCounter Function

The `addCounter` function adds a counter metric to the Prometheus aggregator. It has the following signature:

```go
func (c *collector) addCounter(name string, m metrics.Counter)
```

### addCounterFloat64 Function

The `addCounterFloat64` function adds a float64 counter metric to the Prometheus aggregator. It has the following signature:

```go
func (c *collector) addCounterFloat64(name string, m metrics.CounterFloat64)
```

### addGauge Function

The `addGauge` function adds a gauge metric to the Prometheus aggregator. It has the following signature:

```go
func (c *collector) addGauge(name string, m metrics.Gauge)
```

### addGaugeFloat64 Function

The `addGaugeFloat64` function adds a float64 gauge metric to the Prometheus aggregator. It has the following signature:

```go
func (c *collector) addGaugeFloat64(name string, m metrics.GaugeFloat64)
```

### addHistogram Function

The `addHistogram` function adds a histogram metric to the Prometheus aggregator. It has the following signature:

```go
func (c *collector) addHistogram(name string, m metrics.Histogram)
```

### addMeter Function

The `addMeter` function # Metrics Package

The `metrics` package provides functions for working with metrics.

## addQuantile Function

The `addQuantile` function adds a quantile to a metric. It has the following signature:

```go
func addQuantile(c *Client, name string, p float64, value interface{})
```

### Parameters

- `c`: The client to use for sending the metric.
- `name`: The name of the metric.
- `p`: The quantile to add.
- `value`: The value of the quantile.

### Return Value

The function does not return a value.

## mutateKey Function

The `mutateKey` function mutates a key to be compatible with the InfluxDB line protocol. It has the following signature:

```go
func mutateKey(key string) string
```

### Parameters

- `key`: The key to mutate.

### Return Value

The function returns the mutated key.

## Key Mutations

The `mutateKey` function performs the following mutations on a key:

- Replaces all forward slashes (`/`) with underscores (`_`).

This is necessary because forward slashes are not allowed in InfluxDB measurement names or tag keys.