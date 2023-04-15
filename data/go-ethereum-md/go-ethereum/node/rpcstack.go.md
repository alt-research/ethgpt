# Go Ethereum Library - Node Package

This package contains the implementation of the HTTP and WebSocket servers used in the Go Ethereum client. The servers handle JSON-RPC requests and responses, and provide an interface for clients to interact with the Ethereum network.

## Functions

### newHTTPServer

```go
func newHTTPServer(log log.Logger, timeouts rpc.HTTPTimeouts) *httpServer
```

This function creates a new HTTP server with the specified logger and timeouts.

### (*httpServer) setListenAddr

```go
func (h *httpServer) setListenAddr(host string, port int) error
```

This function sets the listening address of the HTTP server. The address can only be set while the server isn't running.

### (*httpServer) listenAddr

```go
func (h *httpServer) listenAddr() string
```

This function returns the listening address of the HTTP server.

### (*httpServer) start

```go
func (h *httpServer) start() error
```

This function starts the HTTP server if it is enabled and not already running.

### CheckTimeouts

```go
func CheckTimeouts(timeouts *rpc.HTTPTimeouts)
```

This function checks the validity of the specified HTTP timeouts.

### (*httpServer) ServeHTTP

```go
func (h *httpServer) ServeHTTP(w http.ResponseWriter, r *http.Request)
```

This function handles incoming HTTP requests and routes them to the appropriate handler.

### (*httpServer) Stop

```go
func (h *httpServer) Stop() error
```

This function stops the HTTP server.

### (*httpServer) RegisterHandler

```go
func (h *httpServer) RegisterHandler(name string, handler http.Handler)
```

This function registers an HTTP handler with the server.

### (*httpServer) RegisterHandlerFunc

```go
func (h *httpServer) RegisterHandlerFunc(name string, handlerFunc func(http.ResponseWriter, *http.Request))
```

This function registers an HTTP handler function with the server.

### (*httpServer) RegisterModules

```go
func (h *httpServer) RegisterModules(modules []string)
```

This function registers the specified JSON-RPC modules with the HTTP server.

### (*httpServer) RegisterVhosts

```go
func (h *httpServer) RegisterVhosts(vhosts []string)
```

This function registers the specified virtual hosts with the HTTP server.

### (*httpServer) RegisterPrefix

```go
func (h *httpServer) RegisterPrefix(prefix string)
```

This function registers the specified path prefix with the HTTP server.

### (*httpServer) RegisterJWTSecret

```go
func (h *httpServer) RegisterJWTSecret(secret []byte)
```

This function registers the specified JWT secret with the HTTP server.

### (*httpServer) RegisterCORSAllowedOrigins

```go
func (h *httpServer) RegisterCORSAllowedOrigins(origins []string)
```

This function registers the specified CORS allowed origins with the HTTP server.

### (*httpServer) RegisterWSHandler

```go
func (h *httpServer) RegisterWSHandler(name string, handler http.Handler)
```

This function registers a WebSocket handler with the server.

### (*httpServer) RegisterWSHandlerFunc

```go
func (h *httpServer) RegisterWSHandlerFunc(name string, handlerFunc func(http.ResponseWriter, *http.Request))
```

This function registers a WebSocket handler function with the server.

### (*httpServer) RegisterWSModules

```go
func (h *httpServer) RegisterWSModules(modules []string)
```

This function registers the specified JSON-RPC modules with the WebSocket server.

### (*httpServer) RegisterWSPrefix

```go
func (h *httpServer) RegisterWSPrefix(prefix string)
```

This function registers the specified path prefix with the WebSocket server.

### (*httpServer) RegisterWSJWTSecret

```go
func (h *httpServer) RegisterWSJWTSecret(secret []byte)
```

This function registers the specified JWT secret with the WebSocket server.

### (*httpServer) RegisterWSOrigins

```go
func (h *httpServer) RegisterWSOrigins(origins []string)
```

This function registers the specified WebSocket origins with the server.

### (*httpServer) ServeHTTP

```go
func (h *httpServer) ServeHTTP(w http.ResponseWriter, r *http.Request)
```

This function handles incoming HTTP requests and routes them to the appropriate handler.

### (*httpServer) Stop

```go
func (h *httpServer) Stop() error
```

This function stops the HTTP server.

### CheckTimeouts

```go
func CheckTimeouts(timeouts *rpc.HTTPTimeouts)
```

This function checks the validity of the specified HTTP timeouts.

## Types

### httpConfig

```go
type httpConfig struct {
	Modules            []string
	CorsAllowedOrigins []string
	Vhosts             []string
	prefix             string // path prefix on which to mount http handler
	jwtSecret          []byte // optional JWT secret
}
```

This type represents the JSON-RPC/HTTP configuration.

### wsConfig

```go
type wsConfig struct {
	Origins   []string
	Modules   []string
	prefix    string // path prefix on which to mount ws handler
	jwtSecret []byte // optional JWT secret
}
```

This type represents the JSON-RPC/WebSocket configuration.

### rpcHandler

```go
type rpcHandler struct {
	http.Handler
	server *rpc.Server
}
```

This type represents an RPC handler.

### httpServer

```go
type httpServer struct {
	log      log.Logger
	timeouts rpc.HTTPTimeouts
	mux      http.ServeMux // registered handlers go here

	mu       sync.Mutex
	server   *http.Server
	listener net.Listener // non-nil when server is running

	httpConfig  httpConfig
	httpHandler atomic.Value // *rpcHandler

	wsConfig  wsConfig
	wsHandler atomic.Value // *rpcHandler

	handlerNames map[string]string
}
```

This type represents an HTTP server. It contains the server's logger, timeouts, and registered handlers. # Go Ethereum Library - HTTP Server

This file contains the implementation of the HTTP server used in the Go Ethereum build system. The server is responsible for handling HTTP and WebSocket requests and routing them to the appropriate handlers.

## Functions

### `func (h *httpServer) start() error`

This function starts the HTTP server. It first checks if the server is already running, and if so, returns an error. It then sets up the server by creating a listener on the specified endpoint and starting the server in a separate goroutine. If WebSocket is enabled, it logs the WebSocket URL. If the server is WebSocket-only, it returns after logging. Otherwise, it logs the HTTP endpoint and all handlers mounted on the server.

### `func (h *httpServer) ServeHTTP(w http.ResponseWriter, r *http.Request)`

This function serves HTTP requests. It first checks if the request is a WebSocket request and if WebSocket is enabled. If so, it serves the request using the WebSocket handler. Otherwise, it checks if HTTP-RPC is enabled and tries to serve the request using the RPC handler. If the request matches a path below root, it is handled by the mux, which has all the handlers registered via `Node.RegisterHandler`. If the request does not match any of the above conditions, it returns a 404 status code.

### `func checkPath(r *http.Request, path string) bool`

This function checks whether a given request URL matches a given path prefix. If no prefix has been specified, the request URL must be on root. Otherwise, it checks to make sure the prefix matches.

### `func validatePrefix(what, path string) error`

This function checks if `path` is a valid configuration value for the RPC prefix option. If the path is empty, it returns nil. If the path does not contain a leading "/", it returns an error. If the path contains URL meta-characters ("?" or "#"), it returns an error.

### `func (h *httpServer) stop()`

This function shuts down the HTTP server. It first acquires a lock on the server mutex, then calls `doStop` to shut down the server. If the server is not running, it returns.

### `func (h *httpServer) doStop()`

This function shuts down the HTTP server. It first checks if the listener is nil, which indicates that the server is not running. If the HTTP or WebSocket handler is not nil, it stops the server and sets the handler to nil. It then cancels the context and waits for the server to shut down. If the server does not shut down within the specified timeout, it logs an error.

## License

This file is part of the go-ethereum library, which is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # HTTP Server

This source code contains the implementation of an HTTP server that can be used to serve JSON-RPC over HTTP and WebSocket. It provides functions to enable and disable these features, as well as to start and stop the server.

## Functions

### `func (h *httpServer) enableRPC(apis []rpc.API, config httpConfig) error`

This function is used to enable JSON-RPC over HTTP on the server. It takes a slice of `rpc.API` objects and an `httpConfig` object as parameters. It creates an `rpc.Server` and registers the provided APIs with it. It then creates an `rpcHandler` object and stores it in the `httpHandler` field of the `httpServer` object. The `rpcHandler` object contains an `http.Handler` that wraps the `rpc.Server` and provides additional functionality such as CORS support and JWT authentication. If JSON-RPC over HTTP is already enabled, this function returns an error.

### `func (h *httpServer) disableRPC() bool`

This function is used to disable JSON-RPC over HTTP on the server. It stops the `rpc.Server` and removes the `rpcHandler` object from the `httpHandler` field of the `httpServer` object. This function returns `true` if JSON-RPC over HTTP was previously enabled, and `false` otherwise.

### `func (h *httpServer) enableWS(apis []rpc.API, config wsConfig) error`

This function is used to enable JSON-RPC over WebSocket on the server. It takes a slice of `rpc.API` objects and a `wsConfig` object as parameters. It creates an `rpc.Server` and registers the provided APIs with it. It then creates an `rpcHandler` object and stores it in the `wsHandler` field of the `httpServer` object. The `rpcHandler` object contains an `http.Handler` that wraps the `rpc.Server` and provides additional functionality such as JWT authentication. If JSON-RPC over WebSocket is already enabled, this function returns an error.

### `func (h *httpServer) stopWS()`

This function is used to disable JSON-RPC over WebSocket on the server. It stops the `rpc.Server` and removes the `rpcHandler` object from the `wsHandler` field of the `httpServer` object. If JSON-RPC over WebSocket was the only feature enabled on the server, this function also stops the server.

### `func (h *httpServer) disableWS() bool`

This function is used to disable the WebSocket handler. It stops the `rpc.Server` and removes the `rpcHandler` object from the `wsHandler` field of the `httpServer` object. This function returns `true` if JSON-RPC over WebSocket was previously enabled, and `false` otherwise.

### `func (h *httpServer) rpcAllowed() bool`

This function is used to check if JSON-RPC over HTTP is enabled on the server. It returns `true` if JSON-RPC over HTTP is enabled, and `false` otherwise.

### `func (h *httpServer) wsAllowed() bool`

This function is used to check if JSON-RPC over WebSocket is enabled on the server. It returns `true` if JSON-RPC over WebSocket is enabled, and `false` otherwise.

### `func isWebsocket(r *http.Request) bool`

This function is used to check if an HTTP request is a WebSocket upgrade request. It checks the `Upgrade` and `Connection` headers of the request and returns `true` if they indicate a WebSocket upgrade request, and `false` otherwise.

### `func NewHTTPHandlerStack(srv http.Handler, cors []string, vhosts []string, jwtSecret []byte) http.Handler`

This function is used to create an `http.Handler` that wraps the provided `http.Handler` with additional functionality such as CORS support, virtual host routing, JWT authentication, and gzip compression. It takes the `http.Handler` to wrap, a slice of allowed CORS origins, a slice of virtual host names, and a JWT secret as parameters. It returns the wrapped `http.Handler`.

### `func NewWSHandlerStack(srv http.Handler, jwtSecret []byte) http.Handler`

This function is used to create an `http.Handler` that wraps the provided `http.Handler` with JWT authentication. It takes the `http.Handler` to wrap and a JWT secret as parameters. It returns the wrapped `http.Handler`.

## License

This source code is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # HTTP Server Handlers

This file contains several HTTP server handlers used in the Go Ethereum build system. These handlers are used to serve JSON-RPC requests over HTTP, validate the Host-header of incoming requests, and compress HTTP responses.

## Functions

### `corsHandler`

This function returns a new HTTP handler that adds Cross-Origin Resource Sharing (CORS) headers to the response. It takes a list of allowed origins as a parameter and returns a new HTTP handler that adds the appropriate CORS headers to the response.

### `virtualHostHandler`

This function returns a new HTTP handler that validates the Host-header of incoming requests. It takes a list of allowed virtual hosts and a next HTTP handler as parameters. The function creates a map of allowed virtual hosts and returns a new HTTP handler that verifies the targeted virtual host of incoming requests against the allowed virtual hosts.

### `gzipResponseWriter`

This struct represents an HTTP response writer that compresses the response using gzip compression. It contains a reference to the original response writer, a gzip writer, and information about the uncompressed response.

### `init`

This method initializes the gzipResponseWriter by checking the response headers for a Content-Length header and setting up the gzip writer if compression is enabled.

### `Header`

This method returns the header of the response.

### `WriteHeader`

This method writes the header of the response.

## Variables

### `gzPool`

This variable is a sync.Pool that contains a pool of gzip writers. It is used to reuse gzip writers and reduce memory allocations.

## License

This file is part of the go-ethereum library and is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # HTTP Server and IPC Server

This source code contains two types of servers: an HTTP server and an IPC server. The HTTP server is responsible for serving HTTP requests, while the IPC server is responsible for serving IPC requests.

## HTTP Server

The HTTP server is implemented using the `http` package in Go. It uses a middleware pattern to handle requests. The `newGzipHandler` function is a middleware that compresses the response using gzip if the client supports it. The `gzipResponseWriter` type is used to wrap the `http.ResponseWriter` and compress the response.

### `newGzipHandler`

This function takes an `http.Handler` as input and returns a new `http.Handler` that compresses the response using gzip if the client supports it.

### `gzipResponseWriter`

This type wraps the `http.ResponseWriter` and compresses the response using gzip if the client supports it. It implements the `http.ResponseWriter` interface and provides the `Write` and `Flush` methods to write and flush the compressed response.

### `Write`

This method writes the compressed response to the client. If compression is disabled, it writes the uncompressed response.

### `Flush`

This method flushes the compressed response to the client.

### `close`

This method closes the gzip stream and returns the resources to the pool.

## IPC Server

The IPC server is implemented using the `net/rpc` package in Go. It listens on a Unix domain socket and serves RPC requests.

### `ipcServer`

This type represents an IPC server. It contains a `net.Listener` and an `rpc.Server`.

### `newIPCServer`

This function creates a new `ipcServer` instance with the given logger and endpoint.

### `start`

This method starts the IPC server and registers the given APIs.

### `stop`

This method stops the IPC server and closes the listener.

### `RegisterApis`

This function registers the given APIs with the RPC server. It checks the availability of the modules and generates an allowlist based on the allowed modules. It then registers all the APIs exposed by the services.