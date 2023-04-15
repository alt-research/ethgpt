# exp Package

The `exp` package provides a way to hook `go-metrics` into `expvar` and register an `expvar` powered metrics handler with `http.DefaultServeMux` on `/debug/vars`.

## exp Struct

The `exp` struct represents an `expvar` powered metrics handler. It has the following fields:

### expvarLock sync.Mutex

A mutex for safely probing `expvar`.

### registry metrics.Registry

A registry for storing metrics.

## expHandler Function

The `expHandler` function returns an `expvar` powered metrics handler. It has the following signature:

```go
func ExpHandler(r metrics.Registry) http.Handler
```

### Parameters

- `r`: The metrics registry.

### Return Value

The function returns an `http.Handler`.

## expHandler Function

The `expHandler` function returns an `expvar` powered metrics handler. It has the following signature:

```go
func ExpHandler(r metrics.Registry) http.Handler
```

### Parameters

- `r`: The metrics registry.

### Return Value

The function returns an `http.Handler`.

## Exp Function

The `Exp` function registers an `expvar` powered metrics handler with `http.DefaultServeMux` on `/debug/vars`. It has the following signature:

```go
func Exp(r metrics.Registry)
```

### Parameters

- `r`: The metrics registry.

### Return Value

The function does not return anything.

## Setup Function

The `Setup` function starts a dedicated metrics server at the given address. It enables metrics reporting separate from `pprof`. It has the following signature:

```go
func Setup(address string)
```

### Parameters

- `address`: The address to start the metrics server.

### Return Value

The function does not return anything.

## getInt Function

The `getInt` function returns an `expvar.Int` for the given name. It has the following signature:

```go
func (exp *exp) getInt(name string) *expvar.Int
```

### Parameters

- `name`: The name of the `expvar.Int`.

### Return Value

The function returns an `expvar.Int`.

## getFloat Function

The `getFloat` function returns an `expvar.Float` for the given name. It has the following signature:

```go
func (exp *exp) getFloat(name string) *expvar.Float
```

### Parameters

- `name`: The name of the `expvar.Float`.

### Return Value

The function returns an `expvar.Float`.

## publishCounter Function

The `publishCounter` function publishes a counter metric to `expvar`. It has the following signature:

```go
func (exp *exp) publishCounter(name string, metric metrics.Counter)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The counter metric.

### Return Value

The function does not return anything.

## publishCounterFloat64 Function

The `publishCounterFloat64` function publishes a counter float64 metric to `expvar`. It has the following signature:

```go
func (exp *exp) publishCounterFloat64(name string, metric metrics.CounterFloat64)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The counter float64 metric.

### Return Value

The function does not return anything.

## publishGauge Function

The `publishGauge` function publishes a gauge metric to `expvar`. It has the following signature:

```go
func (exp *exp) publishGauge(name string, metric metrics.Gauge)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The gauge metric.

### Return Value

The function does not return anything.

## publishGaugeFloat64 Function

The `publishGaugeFloat64` function publishes a gauge float64 metric to `expvar`. It has the following signature:

```go
func (exp *exp) publishGaugeFloat64(name string, metric metrics.GaugeFloat64)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The gauge float64 metric.

### Return Value

The function does not return anything.

## publishHistogram Function

The `publishHistogram` function publishes a histogram metric to `expvar`. It has the following signature:

```go
func (exp *exp) publishHistogram(name string, metric metrics.Histogram)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The histogram metric.

### Return Value

The function does not return anything. # Metrics Exporter

The `exp` type represents a metrics exporter that converts metrics from the `metrics` package into expvar format. The `exp` type has the following methods:

## publishCounter Function

The `publishCounter` function publishes a counter metric to expvar. It has the following signature:

```go
func (exp *exp) publishCounter(name string, metric metrics.Counter)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The counter metric.

### Return Value

The function does not return anything.

## publishCounterFloat64 Function

The `publishCounterFloat64` function publishes a counter float64 metric to expvar. It has the following signature:

```go
func (exp *exp) publishCounterFloat64(name string, metric metrics.CounterFloat64)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The counter float64 metric.

### Return Value

The function does not return anything.

## publishGauge Function

The `publishGauge` function publishes a gauge metric to expvar. It has the following signature:

```go
func (exp *exp) publishGauge(name string, metric metrics.Gauge)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The gauge metric.

### Return Value

The function does not return anything.

## publishGaugeFloat64 Function

The `publishGaugeFloat64` function publishes a gauge float64 metric to expvar. It has the following signature:

```go
func (exp *exp) publishGaugeFloat64(name string, metric metrics.GaugeFloat64)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The gauge float64 metric.

### Return Value

The function does not return anything.

## publishHistogram Function

The `publishHistogram` function publishes a histogram metric to expvar. It has the following signature:

```go
func (exp *exp) publishHistogram(name string, metric metrics.Histogram)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The histogram metric.

### Return Value

The function does not return anything.

## publishMeter Function

The `publishMeter` function publishes a meter metric to expvar. It has the following signature:

```go
func (exp *exp) publishMeter(name string, metric metrics.Meter)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The meter metric.

### Return Value

The function does not return anything.

## publishTimer Function

The `publishTimer` function publishes a timer metric to expvar. It has the following signature:

```go
func (exp *exp) publishTimer(name string, metric metrics.Timer)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The timer metric.

### Return Value

The function does not return anything.

## publishResettingTimer Function

The `publishResettingTimer` function publishes a resetting timer metric to expvar. It has the following signature:

```go
func (exp *exp) publishResettingTimer(name string, metric metrics.ResettingTimer)
```

### Parameters

- `name`: The name of the metric.
- `metric`: The resetting timer metric.

### Return Value

The function does not return anything.

## syncToExpvar Function

The `syncToExpvar` function synchronizes all metrics in the registry to expvar. It has the following signature:

```go
func (exp *exp) syncToExpvar()
```

### Parameters

The function does not take any parameters.

### Return Value

The function does not return anything.