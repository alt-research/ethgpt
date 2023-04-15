# Prometheus Package

The `prometheus` package provides a collector for converting Ethereum client metrics into Prometheus format.

## TestMain Function

The `TestMain` function enables metrics collection for testing purposes. It has the following signature:

```go
func TestMain(m *testing.M)
```

### Parameters

- `m`: The test function.

### Return Value

The function exits with the status code returned by the test function.

## TestCollector Function

The `TestCollector` function tests the `collector` type by adding various types of metrics and verifying the output. It has the following signature:

```go
func TestCollector(t *testing.T)
```

### Parameters

- `t`: The testing.T instance.

### Return Value

The function does not return anything.

## Collector Type

The `collector` type represents a collector for converting Ethereum client metrics into Prometheus format. It has the following fields:

### buff bytes.Buffer

A buffer for storing the output.

### addCounter Function

The `addCounter` function adds a counter metric to the collector. It has the following signature:

```go
func (c *collector) addCounter(name string, counter metrics.Counter)
```

### Parameters

- `name`: The name of the metric.
- `counter`: The counter metric.

### Return Value

The function does not return anything.

### addCounterFloat64 Function

The `addCounterFloat64` function adds a counter float64 metric to the collector. It has the following signature:

```go
func (c *collector) addCounterFloat64(name string, counter metrics.CounterFloat64)
```

### Parameters

- `name`: The name of the metric.
- `counter`: The counter float64 metric.

### Return Value

The function does not return anything.

### addGauge Function

The `addGauge` function adds a gauge metric to the collector. It has the following signature:

```go
func (c *collector) addGauge(name string, gauge metrics.Gauge)
```

### Parameters

- `name`: The name of the metric.
- `gauge`: The gauge metric.

### Return Value

The function does not return anything.

### addGaugeFloat64 Function

The `addGaugeFloat64` function adds a gauge float64 metric to the collector. It has the following signature:

```go
func (c *collector) addGaugeFloat64(name string, gauge metrics.GaugeFloat64)
```

### Parameters

- `name`: The name of the metric.
- `gauge`: The gauge float64 metric.

###