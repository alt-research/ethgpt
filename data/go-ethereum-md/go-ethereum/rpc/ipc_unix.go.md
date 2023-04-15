# RPC Package

The `rpc` package provides functionality for creating and managing remote procedure call (RPC) servers and clients. This file contains functions for creating and managing Unix socket connections.

## Functions

### ipcListen

```go
func ipcListen(endpoint string) (net.Listener, error)
```

`ipcListen` creates a Unix socket on the given endpoint and returns a `net.Listener` object for accepting incoming connections. If the endpoint is longer than the maximum allowed length, a warning is logged and an error is returned. If the directory for the endpoint does not exist, it is created with permissions 0751. If the endpoint already exists, it is removed before creating the new socket. The socket is created with permissions 0600.

### newIPCConnection

```go
func newIPCConnection(ctx context.Context, endpoint string) (net.Conn, error)
```

`newIPCConnection` connects to a Unix socket on the given endpoint and returns a `net.Conn` object for sending and receiving data. The function uses a `net.Dialer` object to establish the connection and accepts a `context.Context` object for timing out the connection attempt.