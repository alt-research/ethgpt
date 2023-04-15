# RPC Package

The `rpc` package provides functionality for remote procedure calls (RPC) in the Ethereum ecosystem. It includes metrics tracking for RPC requests and serving time histograms.

## Metrics

The `rpc` package includes three metrics for tracking RPC requests:

- `rpcRequestGauge`: tracks the number of RPC requests.
- `successfulRequestGauge`: tracks the number of successful RPC requests.
- `failedRequestGauge`: tracks the number of failed RPC requests.

## Serving Time Histograms

The `rpc` package includes a function for tracking the serving time of a remote RPC call:

### updateServeTimeHistogram

```go
func updateServeTimeHistogram(method string, success bool, elapsed time.Duration)
```

`updateServeTimeHistogram` tracks the serving time of a remote RPC call. It takes in the method name, a boolean indicating whether the call was successful, and the elapsed time of the call. It updates a histogram with the serving time of the call.

## Variables

### serveTimeHistName

```go
var serveTimeHistName = "rpc/duration"
```

`serveTimeHistName` is the prefix of the per-request serving time histograms.

### rpcServingTimer

```go
var rpcServingTimer = metrics.NewRegisteredTimer("rpc/duration/all", nil)
```

`rpcServingTimer` is a timer that tracks the serving time of all RPC requests.

## Registered Metrics

The following metrics are registered in the `rpc` package:

- `rpc/requests`: tracks the number of RPC requests.
- `rpc/success`: tracks the number of successful RPC requests.
- `rpc/failure`: tracks the number of failed RPC requests.
- `rpc/duration/all`: tracks the serving time of all RPC requests.