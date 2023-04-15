# RPC Package

The `rpc` package provides functionality for creating and managing remote procedure call (RPC) servers and clients. This file is specific to the Windows operating system and provides functions for creating and managing named pipe connections.

## Functions

### ipcListen

```go
func ipcListen(endpoint string) (net.Listener, error)
```

`ipcListen` creates a named pipe on the given endpoint and returns a `net.Listener` object that can be used to accept incoming connections.

### newIPCConnection

```go
func newIPCConnection(ctx context.Context, endpoint string) (net.Conn, error)
```

`newIPCConnection` connects to a named pipe with the given endpoint as name and returns a `net.Conn` object that can be used to communicate with the remote endpoint. The function takes a `context.Context` object as input, which can be used to set a deadline for the connection attempt. If no deadline is set, a default timeout of 2 seconds is used.