# Go Ethereum Library - Node Package

This package contains functions related to the Go Ethereum node, including starting the HTTP RPC endpoint and checking module availability.

## Functions

### StartHTTPEndpoint

```go
func StartHTTPEndpoint(endpoint string, timeouts rpc.HTTPTimeouts, handler http.Handler) (*http.Server, net.Addr, error)
```

This function starts the HTTP RPC endpoint. It takes three parameters: the endpoint to listen on, the HTTP timeouts to use, and the HTTP handler to use. It returns a pointer to the HTTP server, the network address of the listener, and an error if one occurred.

### checkModuleAvailability

```go
func checkModuleAvailability(modules []string, apis []rpc.API) (bad, available []string)
```

This function checks that all names given in modules are actually available API services. It assumes that the MetadataApi module ("rpc") is always available; the registration of this "rpc" module happens in NewServer() and is thus common to all endpoints. It takes two parameters: a slice of module names to check, and a slice of available API services. It returns two slices: one containing the names of modules that are not available, and one containing the names of modules that are available.

### CheckTimeouts

```go
func CheckTimeouts(timeouts *rpc.HTTPTimeouts)
```

This function ensures that timeout values are meaningful. It takes a pointer to an `rpc.HTTPTimeouts` struct and modifies it in place if any of the timeout values are less than one second. It logs a warning message if any of the values are modified.

## Imports

### net

This package provides a portable interface for network I/O, including TCP/IP, UDP, domain name resolution, and Unix domain sockets.

### net/http

This package provides HTTP client and server implementations.

### time

This package provides functionality for measuring and displaying time.

### github.com/ethereum/go-ethereum/log

This package provides logging functionality for the Go Ethereum library.

### github.com/ethereum/go-ethereum/rpc

This package provides functionality for creating and serving JSON-RPC APIs.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.