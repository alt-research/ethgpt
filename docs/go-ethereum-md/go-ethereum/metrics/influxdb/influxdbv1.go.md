# InfluxDB Package

The `influxdb` package provides a reporter for sending metrics to an InfluxDB database.

## Reporter Type

The `reporter` type represents a reporter for sending metrics to an InfluxDB database. It has the following fields:

### reg metrics.Registry

The metrics registry to report.

### interval time.Duration

The interval at which to report metrics.

### url uurl.URL

The URL of the InfluxDB database.

### database string

The name of the InfluxDB database.

### username string

The username to use when connecting to the InfluxDB database.

### password string

The password to use when connecting to the InfluxDB database.

### namespace string

The namespace to use when reporting metrics.

### tags map[string]string

The tags to use when reporting metrics.

### client client.Client

The InfluxDB client.

### cache map[string]int64

A cache of metric values.

## Functions

### InfluxDB

The `InfluxDB` function starts an InfluxDB reporter which will post the given metrics registry at each interval `d`.

```go
func InfluxDB(r metrics.Registry, d time.Duration, url, database, username, password, namespace string)
```

### Parameters

- `r`: The metrics registry to report.
- `d`: The interval at which to report metrics.
- `url`: The URL of the InfluxDB database.
- `database`: The name of the InfluxDB database.
- `username`: The username to use when connecting to the InfluxDB database.
- `password`: The password to use when connecting to the InfluxDB database.
- `namespace`: The namespace to use when reporting metrics.

### InfluxDBWithTags

The `InfluxDBWithTags` function starts an InfluxDB reporter which will post the given metrics registry at each interval `d` with the specified tags.

```go
func InfluxDBWithTags(r metrics.Registry, d time.Duration, url, database, username, password, namespace string, tags map[string]string)
```

### Parameters

- `r`: The metrics registry to report.
- `d`: The interval at which to report metrics.
- `url`: The URL of the InfluxDB database.
- `database`: The name of the InfluxDB database.
- `username`: The username to use when connecting to the InfluxDB database.
- `password`: The password to use when connecting to the InfluxDB database.
- `namespace`: The namespace to use when reporting metrics.
- `tags`: The tags to use when reporting metrics.

### InfluxDBWithTagsOnce

The `InfluxDBWithTagsOnce` function runs once an InfluxDB reporter and posts the given metrics registry with the specified tags.

```go
func InfluxDBWithTagsOnce(r metrics.Registry, url, database, username, password, namespace string, tags map[string]string) error
```

### Parameters

- `r`: The metrics registry to report.
- `url`: The URL of the InfluxDB database.
- `database`: The name of the InfluxDB database.
- `username`: The username to use when connecting to the InfluxDB database.
- `password`: The password to use when connecting to the InfluxDB database.
- `namespace`: The namespace to use when reporting metrics.
- `tags`: The tags to use when reporting metrics.

### makeClient

The `makeClient` function creates an InfluxDB client.

```go
func (r *reporter) makeClient() (err error)
```

### run

The `run` function runs the InfluxDB reporter.

```go
func (r *reporter) run()
```

### send

The `send` function sends metrics to the InfluxDB database.

```go
func (r *reporter) send() error
```