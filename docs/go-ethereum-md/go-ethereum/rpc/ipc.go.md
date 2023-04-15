# RPC Package

The RPC package provides a framework for serving and consuming JSON-RPC over various transports. It includes a server implementation and a client implementation.

## Functions

### ServeListener

```go
func (s *Server) ServeListener(l net.Listener) error
```

ServeListener accepts connections on the given listener and serves JSON-RPC on them. It creates a new codec for each connection and serves it in a separate goroutine.

### DialIPC

```go
func DialIPC(ctx context.Context, endpoint string) (*Client, error)
```

DialIPC creates a new IPC client that connects to the given endpoint. On Unix, it assumes the endpoint is the full path to a Unix socket, and on Windows, the endpoint is an identifier for a named pipe. The context is used for the initial connection establishment and does not affect subsequent interactions with the client.

### newClientTransportIPC

```go
func newClientTransportIPC(endpoint string) reconnectFunc
```

newClientTransportIPC creates a new IPC transport function that returns a new codec for each connection. It takes a context and an endpoint string as arguments and returns a reconnectFunc. The reconnectFunc creates a new IPC connection and returns a new codec for each connection.