# RPC Package

The `rpc` package provides functionality for making remote procedure calls (RPCs) over HTTP. It includes functions for adding HTTP headers to a context, extracting HTTP headers from a context, and setting headers in an HTTP request.

## Functions

### NewContextWithHeaders

```go
func NewContextWithHeaders(ctx context.Context, h http.Header) context.Context
```

NewContextWithHeaders wraps the given context, adding HTTP headers. These headers will be applied by Client when making a request using the returned context.

### headersFromContext

```go
func headersFromContext(ctx context.Context) http.Header
```

headersFromContext is used to extract http.Header from context.

### setHeaders

```go
func setHeaders(dst http.Header, src http.Header) http.Header
```

setHeaders sets all headers from src in dst.