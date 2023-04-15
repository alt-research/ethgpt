# InfluxDB Go Client

The `influxdb` package provides a Go client for sending metrics to InfluxDB. This package uses the InfluxDB v2 API.

## V2Reporter Type

The `v2Reporter` type represents a reporter for sending metrics to InfluxDB v2. It has the following fields:

### reg metrics.Registry

The metrics registry to report.

### interval time.Duration

The interval at which to report metrics.

### endpoint string

The InfluxDB endpoint to connect to.

### token string

The InfluxDB API token to use.

### bucket string

The InfluxDB bucket to write to.

### organization string

The InfluxDB organization to write to.

### namespace string

The namespace to use for the metrics.

### tags map[string]string

The tags to include with the metrics.

### client influxdb2.Client

The InfluxDB client.

### write api.WriteAPI

The InfluxDB write API.

### InfluxDBV2WithTags Function

The `InfluxDBV2WithTags` function starts an InfluxDB reporter which will post the metrics from the given `metrics.Registry` at each `d` interval with the specified tags.

```go
func InfluxDBV2WithTags(r metrics.Registry, d time.Duration, endpoint string, token string, bucket string, organization string, namespace string, tags map[string]string)
```

### Parameters

- `r`: The metrics registry to report.
- `d`: The interval at which to report metrics.
- `endpoint`: The InfluxDB endpoint to connect to.
- `token`: The InfluxDB API token to use.
- `bucket`: The InfluxDB bucket to write to.
- `organization`: The InfluxDB organization to write to.
- `namespace`: The namespace to use for the metrics.
- `tags`: The tags to include with the metrics.

### Return Value

The function does not return anything.

### Run Function

The `run` function runs the InfluxDB reporter.

```go
func (r *v2Reporter) run()
```

### Parameters

The function does not take any parameters.

### Return Value

The function does not return anything.

### Send Function

The `send` function sends the metrics to InfluxDB.

```go
func (r *v2Reporter) send()
```

### Parameters

The function does not take any parameters.

### Return Value

The function does not return anything.

### readMeter Function

The `readMeter` function reads a meter from the metrics registry.

```go
func readMeter(namespace string, name string, i interface{}) (string, map[string]interface{})
```

### Parameters

- `namespace`: The namespace to use for the metric.
- `name`: The name of the metric.
- `i`: The metric value.

### Return Value

The function returns the measurement name and a map of fields for the metric.