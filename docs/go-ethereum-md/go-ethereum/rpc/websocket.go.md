# WebsocketHandler Function

The `WebsocketHandler` function returns a handler that serves JSON-RPC to WebSocket connections. It takes a slice of allowed origins as input, which should be a comma-separated list of allowed origin URLs. To allow connections with any origin, pass "*". 

The function uses the `websocket.Upgrader` struct to upgrade the HTTP connection to a WebSocket connection. The `ReadBufferSize` and `WriteBufferSize` fields of the `Upgrader` struct are set to `wsReadBuffer` and `wsWriteBuffer`, respectively. The `CheckOrigin` field is set to a function that validates the origin during the WebSocket upgrade process. 

If the upgrade process is successful, the function creates a new `websocketCodec` object using the `newWebsocketCodec` function and serves the codec using the `ServeCodec` method of the `Server` object.

# wsHandshakeValidator Function

The `wsHandshakeValidator` function returns a function that verifies the origin during the WebSocket upgrade process. It takes a slice of allowed origins as input, which should be a comma-separated list of allowed origin URLs. When a '*' is specified as an allowed origin, all connections are accepted.

The function creates a new set of allowed origins using the `mapset.NewSet` function. If no allowed origins are specified, the function adds "http://localhost" and "http://<hostname>" to the set, where <hostname> is the hostname of the machine running the code.

The function returns a function that takes an HTTP request as input and returns a boolean value indicating whether the origin is allowed. If no Origin header is present in the request, the function skips origin verification. Otherwise, the function verifies the origin against the allowed origins set. If the origin is allowed, the function returns true. Otherwise, the function logs a warning and returns false.

# Other Constants and Variables

The code also defines several constants and variables used by the `WebsocketHandler` and `wsHandshakeValidator` functions. These include:

- `wsReadBuffer`: The read buffer size for WebSocket connections.
- `wsWriteBuffer`: The write buffer size for WebSocket connections.
- `wsPingInterval`: The interval at which ping messages are sent to WebSocket connections.
- `wsPingWriteTimeout`: The write timeout for ping messages sent to WebSocket connections.
- `wsPongTimeout`: The timeout for pong messages received from WebSocket connections.
- `wsMessageSizeLimit`: The maximum size of a message that can be sent or received over a WebSocket connection.
- `wsBufferPool`: A sync.Pool object used to pool WebSocket write buffers.
- `wsHandshakeError`: A custom error type used to wrap errors that occur during the WebSocket handshake process. ## Documentation for WebSocket Client Functions

### apset.Set[string], browserOrigin string) bool

This function takes in a set of allowed origins and a browser origin and returns a boolean indicating whether the browser origin is allowed. It iterates through the set of allowed origins and checks if the browser origin matches any of them using the `ruleAllowsOrigin` function.

### ruleAllowsOrigin(allowedOrigin string, browserOrigin string) bool

This function takes in an allowed origin and a browser origin and returns a boolean indicating whether the browser origin is allowed. It first parses the allowed and browser origins using the `parseOriginURL` function. It then checks if the schemes, hostnames, and ports match between the two origins. If any of these do not match, it returns false.

### parseOriginURL(origin string) (string, string, string, error)

This function takes in an origin string and returns the scheme, hostname, and port of the origin. It first parses the origin using the `url.Parse` function. It then extracts the scheme, hostname, and port from the parsed URL. If the origin does not contain a scheme, it assumes that the scheme is empty and the hostname is the first part of the origin before the first colon. If the hostname is empty, it assumes that the origin is the hostname and the port is the opaque part of the URL.

### DialWebsocketWithDialer(ctx context.Context, endpoint, origin string, dialer websocket.Dialer) (*Client, error)

This function creates a new RPC client using WebSocket with a custom dialer. It takes in a context, endpoint, origin, and dialer. It sets the WebSocket dialer to the provided dialer and sets the origin header to the provided origin. It then creates a new client transport using the `newClientTransportWS` function and returns a new client using the `newClient` function.

### DialWebsocket(ctx context.Context, endpoint, origin string) (*Client, error)

This function creates a new RPC client using WebSocket. It takes in a context, endpoint, and origin. It sets the origin header to the provided origin. It then creates a new client transport using the `newClientTransportWS` function and returns a new client using the `newClient` function.

### newClientTransportWS(endpoint string, cfg *clientConfig) (reconnectFunc, error)

This function creates a new WebSocket client transport. It takes in an endpoint and a client configuration. It sets the WebSocket dialer to the default dialer with the read and write buffer sizes set to `wsReadBuffer` and `wsWriteBuffer`, respectively. It then creates a new client codec using the `newWebsocketCodec` function and returns a new reconnect function that creates a new client codec using the same WebSocket connection.

### wsClientHeaders(endpoint string, origin string) (*url.URL, http.Header, error)

This function creates a new WebSocket client header. It takes in an endpoint and an origin. It parses the endpoint using the `url.Parse` function and sets the WebSocket URL to the parsed URL. It then creates a new HTTP header with the `Upgrade` and `Connection` fields set to `websocket` and `Upgrade`, respectively. It also sets the `Sec-WebSocket-Version` and `Sec-WebSocket-Key` fields to their respective values. If the origin is not empty, it sets the `Origin` field to the provided origin. It then returns the WebSocket URL and HTTP header. # Websocket Codec

The `websocketCodec` struct is used to encode and decode JSON messages over a websocket connection. It implements the `ServerCodec` interface, which defines the methods used to read and write messages.

## Functions

### newWebsocketCodec

```go
func newWebsocketCodec(conn *websocket.Conn, host string, req http.Header) ServerCodec
```

`newWebsocketCodec` creates a new `websocketCodec` instance with the given `websocket.Conn`, host, and HTTP request headers. It sets the read limit and pong handler for the connection, and starts a goroutine to send periodic ping frames when the connection is idle.

### close

```go
func (wc *websocketCodec) close()
```

`close` closes the underlying `jsonCodec` and waits for the ping loop goroutine to exit.

### peerInfo

```go
func (wc *websocketCodec) peerInfo() PeerInfo
```

`peerInfo` returns the `PeerInfo` for the websocket connection.

### writeJSON

```go
func (wc *websocketCodec) writeJSON(ctx context.Context, v interface{}, isError bool) error
```

`writeJSON` writes a JSON message to the websocket connection. It also notifies the ping loop goroutine to delay the next idle ping.

### pingLoop

```go
func (wc *websocketCodec) pingLoop()
```

`pingLoop` sends periodic ping frames when the connection is idle. It uses a timer to send pings at a fixed interval, and resets the timer whenever a message is sent or received. If the connection is closed, the goroutine exits.