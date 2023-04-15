# RPC Package

The `rpc` package provides a framework for creating remote procedure call (RPC) APIs. This package is part of the `go-ethereum` library, which is free software distributed under the GNU Lesser General Public License.

## Functions

### ipcListen

```go
func ipcListen(endpoint string) (net.Listener, error)
```

`ipcListen` creates a named pipe on the given endpoint. This function is not supported in the `js` build of the package.

### newIPCConnection

```go
func newIPCConnection(ctx context.Context, endpoint string) (net.Conn, error)
```

`newIPCConnection` connects to a named pipe with the given endpoint as name. This function is not supported in the `js` build of the package.

## Variables

### errNotSupported

```go
var errNotSupported = errors.New("rpc: not supported")
```

`errNotSupported` is an error variable that indicates that a function is not supported in the `js` build of the package.