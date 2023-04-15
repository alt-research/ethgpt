# RPC Package

The `rpc` package provides functionality for starting an IPC endpoint and registering APIs exposed by services. The package is part of the `go-ethereum` library, which is free software distributed under the GNU Lesser General Public License.

## Functions

### StartIPCEndpoint

```go
func StartIPCEndpoint(ipcEndpoint string, apis []API) (net.Listener, *Server, error)
```

StartIPCEndpoint starts an IPC endpoint and registers all the APIs exposed by the services. It takes an IPC endpoint string and a slice of `API` structs as arguments. The function returns a `net.Listener`, a `*Server`, and an error. The `*Server` is used to register the APIs, and the `net.Listener` is used to listen for incoming IPC connections.

The function first registers all the APIs exposed by the services. It creates a `handler` using the `NewServer` function, and then iterates over the `apis` slice, registering each API with the handler using the `RegisterName` method. If an error occurs during registration, the function logs the error and returns it.

Once all the APIs are registered, the function starts the IPC listener using the `ipcListen` function. If an error occurs during listener creation, the function returns the error.

Finally, the function starts the handler using the `ServeListener` method and returns the listener, handler, and nil error.

## Variables

The `rpc` package does not define any variables.