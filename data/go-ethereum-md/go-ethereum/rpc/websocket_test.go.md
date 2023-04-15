# RPC Package

The `rpc` package provides a framework for creating and handling JSON-RPC requests and responses. It includes a client and server implementation for both HTTP and WebSocket transports.

## Functions

### wsClientHeaders

```go
func wsClientHeaders(endpoint, origin string) (string, http.Header, error)
```

wsClientHeaders returns the endpoint and headers for a WebSocket client connection.

### DialWebsocket

```go
func DialWebsocket(ctx context.Context, url, origin string) (*Client, error)
```

DialWebsocket creates a new WebSocket client connection.

### newTestServer

```go
func newTestServer() *Server
```

newTestServer creates a new test server.

## Types

### Client

```go
type Client struct {
    // contains filtered or unexported fields
}
```

Client represents a JSON-RPC client.

### Server

```go
type Server struct {
    // contains filtered or unexported fields
}
```

Server represents a JSON-RPC server.

### wsHandshakeError

```go
type wsHandshakeError struct {
    error
    Message string
}
```

wsHandshakeError represents a WebSocket handshake error.

### echoResult

```go
type echoResult struct {
    String string `json:"string"`
}
```

echoResult represents the result of an echo call. ## Websocket

The `Websocket` function is used to establish a WebSocket connection to a given URL. It takes in three parameters: a `ctx` context, a `tsurl` string representing the URL to connect to, and an `origin` string representing the origin of the connection. If the connection is successful, it requests peer information and checks that the connection information is correct.

## TestClientWebsocketPing

This test checks that the client handles WebSocket ping frames correctly. It creates a server that sends a ping frame, waits for a matching pong, and then delivers a single subscription result. The test waits for the context's deadline to be reached before proceeding, and then checks that the subscription result is received.

## TestClientWebsocketLargeMessage

This test checks that the WebSocket transport can deal with large messages. It creates a server that registers a service with a response length of `wsMessageSizeLimit - 50`. It then establishes a WebSocket connection to the server and calls the service. The test checks that the response has the correct length.

## wsPingTestServer

The `wsPingTestServer` function runs a WebSocket server which accepts a single subscription request. When a value arrives on `sendPing`, the server sends a ping frame, waits for a matching pong, and finally delivers a single subscription result. It returns an `http.Server` instance that can be used to shut down the server. ## Handler

The `Handler` function is used to handle incoming messages on a WebSocket connection. It takes in four parameters: a testing object `t`, a WebSocket connection `conn`, a channel for shutdown signals `shutdown`, and a channel for sending ping messages `sendPing`.

The function first sets up canned responses for the `eth_subscribe` call in the `TestClientWebsocketPing` test. It then handles the subscribe request by reading from the connection and writing the canned response.

Next, the function sets up a pong handler to read control messages from the connection. It starts a goroutine to read messages from the connection and logs them.

The function then enters a loop to handle sending ping messages, receiving pong messages, and sending notifications. It waits for a signal on either the `sendPing` or `shutdown` channel. If a signal is received on the `sendPing` channel, it sends a ping message on the connection and sets the expected pong message. If a pong message is received, it checks that it matches the expected message and resets the timer. If the timer expires, it sends a notification message on the connection. If a signal is received on the `shutdown` channel, it closes the connection and returns.

Overall, the `Handler` function is used to handle WebSocket connections and send and receive messages on them.