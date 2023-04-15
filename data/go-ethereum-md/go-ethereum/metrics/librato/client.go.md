# Librato Package

The `librato` package provides a client for sending metrics to the Librato Metrics API.

## LibratoClient Type

The `LibratoClient` type represents a client for sending metrics to the Librato Metrics API. It has the following fields:

### Email string

The email address associated with the Librato account.

### Token string

The API token associated with the Librato account.

### PostMetrics Function

The `PostMetrics` function sends a batch of metrics to the Librato Metrics API. It has the following signature:

```go
func (c *LibratoClient) PostMetrics(batch Batch) (err error)
```

### Parameters

- `batch`: The batch of metrics to send.

### Return Value

The function returns an error if the request fails.

## Batch Type

The `Batch` type represents a batch of metrics to send to the Librato Metrics API. It has the following fields:

### Gauges []Measurement

An array of gauge measurements.

### Counters []Measurement

An array of counter measurements.

### MeasureTime int64

The time at which the measurements were taken.

### Source string

The source of the measurements.

## Measurement Type

The `Measurement` type represents a single measurement. It is a map of string keys to interface{} values.

## Metric Type

The `Metric` type represents a single metric. It is a map of string keys to interface{} values.

## Constants

The `librato` package defines the following constants:

### Operations string

The name of the "operations" metric.

### OperationsShort string

The short name of the "operations" metric.

### Color string

The key for the color display attribute.

### DisplayMax string

The key for the display max display attribute.

### DisplayMin string

The key for the display min display attribute.

### DisplayUnitsLong string

The key for the display units long display attribute.

### DisplayUnitsShort string

The key for the display units short display attribute.

### DisplayStacked string

The key for the display stacked display attribute.

### DisplayTransform string

The key for the display transform display attribute.

### SummarizeFunction string

The key for the summarize function special gauge display attribute.

### Aggregate string

The key for the aggregate special gauge display attribute.

### Name string

The key for the name metric property.

### Period string

The key for the period metric property.

### Description string

The key for the description metric property.

### DisplayName string

The key for the display name metric property.

### Attributes string

The key for the attributes metric property.

### MeasureTime string

The key for the measure time measurement property.

### Source string

The key for the source measurement property.

### Value string

The key for the value measurement property.

### Count string

The key for the count special gauge property.

### Sum string

The key for the sum special gauge property.

### Max string

The key for the max special gauge property.

### Min string

The key for the min special gauge property.

### SumSquares string

The key for the sum squares special gauge property.

### Counters string

The key for the counters batch property.

### Gauges string

The key