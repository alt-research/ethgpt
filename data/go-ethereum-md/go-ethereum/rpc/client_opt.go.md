# RPC Package

The `rpc` package provides a client configuration option for the RPC client. The `ClientOption` interface is used to configure the client. The `clientConfig` struct contains the configuration options for the client. The `initHeaders` function initializes the HTTP headers for the client. The `setHeader` function sets the HTTP header for the client. The `optionFunc` function applies the configuration option to the client.

## Functions

### WithWebsocketDialer

```go
func WithWebsocketDialer(dialer websocket.Dialer) ClientOption
```

WithWebsocketDialer configures the websocket.Dialer used by the RPC client.

### WithHeader

```go
func WithHeader(key, value string) ClientOption
```

WithHeader configures HTTP headers set by the RPC client. Headers set using this option will be used for both HTTP and WebSocket connections.

### WithHeaders

```go
func WithHeaders(headers http.Header) ClientOption
```

WithHeaders configures HTTP headers set by the RPC client. Headers set using this option will be used for both HTTP and WebSocket connections.

### WithHTTPClient

```go
func WithHTTPClient(c *http.Client) ClientOption
```

WithHTTPClient configures the http.Client used by the RPC client.

### WithHTTPAuth

```go
func WithHTTPAuth(a HTTPAuth) ClientOption
```

WithHTTPAuth configures HTTP request authentication. The given provider will be called whenever a request is made. Note that only one authentication provider can be active at any time.

### HTTPAuth

```go
type HTTPAuth func(h http.Header) error
```

A HTTPAuth function is called by the client whenever a HTTP request is sent. The function must be safe for concurrent use. Usually, HTTPAuth functions will call h.Set("authorization", "...") to add auth information to the request.