# Go Ethereum Library - Node Package

This package contains the implementation of a P2P node in the Go Ethereum library. The node is a container on which services can be registered, and it provides a set of APIs for interacting with the Ethereum network.

## Functions

### New

```go
func New(conf *Config) (*Node, error)
```

The `New` function creates a new P2P node with the provided configuration. It returns a pointer to the created node and an error if the creation process fails. The configuration includes the data directory, logger, and other settings.

### Start

```go
func (n *Node) Start() error
```

The `Start` function starts the P2P networking layer and all registered services. It returns an error if the start process fails.

### Stop

```go
func (n *Node) Stop() error
```

The `Stop` function stops the P2P networking layer and all registered services. It returns an error if the stop process fails.

### AddLifecycle

```go
func (n *Node) AddLifecycle(lifecycle Lifecycle)
```

The `AddLifecycle` function adds a new lifecycle to the node. A lifecycle is a set of services that have a start and stop method and can be registered with the node.

### AddAPI

```go
func (n *Node) AddAPI(api rpc.API)
```

The `AddAPI` function adds a new API to the node. An API is a set of methods that can be called remotely using the RPC protocol.

### AddHTTPHandler

```go
func (n *Node) AddHTTPHandler(pattern string, handler http.Handler)
```

The `AddHTTPHandler` function adds a new HTTP handler to the node. An HTTP handler is a function that handles HTTP requests.

### AddHTTPMiddleware

```go
func (n *Node) AddHTTPMiddleware(middleware func(http.Handler) http.Handler)
```

The `AddHTTPMiddleware` function adds a new HTTP middleware to the node. An HTTP middleware is a function that wraps an HTTP handler and adds additional functionality to it.

### AddInProcHandler

```go
func (n *Node) AddInProcHandler(method string, handler interface{})
```

The `AddInProcHandler` function adds a new in-process RPC handler to the node. An in-process RPC handler is a function that handles RPC requests within the same process.

### AddService

```go
func (n *Node) AddService(service Service)
```

The `AddService` function adds a new service to the node. A service is a set of methods that can be called locally or remotely using the RPC protocol.

### Database

```go
func (n *Node) Database(name string) (ethdb.Database, error)
```

The `Database` function returns a database with the specified name. If the database does not exist, it creates a new one.

### OpenDatabase

```go
func (n *Node) OpenDatabase(name string) (ethdb.Database, error)
```

The `OpenDatabase` function opens a database with the specified name. If the database does not exist, it returns an error.

### CloseDatabase

```go
func (n *Node) CloseDatabase(db ethdb.Database)
```

The `CloseDatabase` function closes the specified database.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Node Package

This package contains the implementation of the Go Ethereum node. The node is responsible for managing the Ethereum blockchain, communicating with other nodes in the network, and providing an API for interacting with the blockchain.

## Functions

### New

The `New` function creates a new instance of the Go Ethereum node. It takes a configuration object as a parameter and returns a pointer to the created node. The function initializes the node's logger, stop channel, p2p server, and databases. It also creates an empty account manager with no backends and initializes the p2p server with the node key and discovery databases.

### Start

The `Start` function starts all registered lifecycles, RPC services, and p2p networking. The function can only be called once, and it returns an error if the node is already running or has been stopped. The function opens networking and RPC endpoints and starts all registered lifecycles. If any lifecycle fails to start, the function stops all started lifecycles and returns an error.

### Close

The `Close` function stops the node and releases resources acquired in the `New` function. The function can only be called once, and it returns an error if the node has already been stopped. The function releases resources acquired by the `Start` function and closes the databases. If the node was never started, the function releases all resources acquired in the `New` function. If any error occurs during the release of resources, the function collects the errors and returns them.

### doClose

The `doClose` function releases resources acquired by the `New` function and collects errors. The function is called by the `Close` function and is not intended to be called directly.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Node Package

This package contains the implementation of the `Node` type, which represents a running Ethereum node. It provides methods for starting and stopping the node, as well as managing its various components.

## Functions

### d(errs []error, err error)

This function is used to append an error to a slice of errors. If the error is not nil, it is appended to the slice.

### openEndpoints() error

This function is used to start all network and RPC endpoints. It starts the peer-to-peer node and the RPC endpoints. If an error occurs, it stops the RPC and peer-to-peer nodes and returns the error.

### containsLifecycle(lfs []Lifecycle, l Lifecycle) bool

This function is used to check if a slice of `Lifecycle` objects contains a specific `Lifecycle` object. It iterates over the slice and returns true if the object is found, false otherwise.

### stopServices(running []Lifecycle) error

This function is used to stop running services, RPC, and peer-to-peer networking. It stops the RPC, stops the running lifecycles in reverse order, and stops the peer-to-peer networking. If an error occurs, it returns a `StopError` object containing the errors for each service that failed to stop.

### openDataDir() error

This function is used to open the data directory for the node. It creates the instance directory and locks it to prevent concurrent use by another instance or accidental use of the instance directory as a database.

### closeDataDir()

This function is used to release the instance directory lock.

### obtainJWTSecret(cliParam string) ([]byte, error)

This function is used to load the JWT secret for the node. It loads the secret from the provided config or the default location. If neither is present, it generates a new secret and stores it to the default location.

### startRPC() error

This function is used to configure all the various RPC endpoints during node startup. It filters out the personal API and starts the remaining APIs.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Node Package

The `Node` package contains the implementation of the Ethereum node. It provides functions to start and stop the node, configure the HTTP and WebSocket servers, and register RPC APIs.

## Functions

### start

The `start` function is used to start the Ethereum node. It takes no parameters and returns an error if the node fails to start.

The function first checks if the personal namespace is enabled and logs a warning if it is deprecated. It then starts the in-process server by registering all RPC APIs on it. After that, it configures the IPC endpoint if it is enabled. Finally, it sets up the HTTP and WebSocket servers and starts them.

### wsServerForPort

The `wsServerForPort` function is used to get the WebSocket server for a given port. It takes two parameters: the port number and a boolean indicating whether the server is authenticated. It returns the appropriate server based on the port number and authentication status.

### stopRPC

The `stopRPC` function is used to stop the RPC servers. It stops the HTTP and WebSocket servers, the authenticated HTTP and WebSocket servers, the IPC endpoint, and the in-process server.

### startInProc

The `startInProc` function is used to register all RPC APIs on the in-process server. It takes a slice of `rpc.API` objects as a parameter and returns an error if any of the APIs fail to register.

### stopInProc

The `stopInProc` function is used to terminate the in-process RPC endpoint.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Node Package

This package contains the implementation of the Go Ethereum node. It provides a set of functions to register lifecycles, protocols, APIs, and HTTP handlers, as well as to retrieve information about the node's configuration, server, data directory, instance directory, key directory, account manager, IPC endpoint, and HTTP endpoint.

## Functions

### `stopInProc()`

This function stops the in-process API handler.

### `Wait()`

This function blocks until the node is closed.

### `RegisterLifecycle(lifecycle Lifecycle)`

This function registers the given lifecycle on the node.

### `RegisterProtocols(protocols []p2p.Protocol)`

This function adds backend's protocols to the node's P2P server.

### `RegisterAPIs(apis []rpc.API)`

This function registers the APIs a service provides on the node.

### `getAPIs()`

This function returns two sets of APIs, both the ones that do not require authentication, and the complete set.

### `RegisterHandler(name, path string, handler http.Handler)`

This function mounts a handler on the given path on the canonical HTTP server.

### `Attach()`

This function creates an RPC client attached to an in-process API handler.

### `RPCHandler()`

This function returns the in-process RPC request handler.

### `Config()`

This function returns the configuration of the node.

### `Server()`

This function retrieves the currently running P2P network layer.

### `DataDir()`

This function retrieves the current data directory used by the protocol stack. (Deprecated)

### `InstanceDir()`

This function retrieves the instance directory used by the protocol stack.

### `KeyStoreDir()`

This function retrieves the key directory.

### `AccountManager()`

This function retrieves the account manager used by the protocol stack.

### `IPCEndpoint()`

This function retrieves the current IPC endpoint used by the protocol stack.

### `HTTPEndpoint()`

This function returns the URL of the HTTP server.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Node Package

This package contains the implementation of the `Node` struct, which represents a running Ethereum node. It provides methods for managing the node's databases, endpoints, and event multiplexer.

## Functions

### HTTPEndpoint

```go
func (n *Node) HTTPEndpoint() string
```

This function returns the current HTTP endpoint of the node.

### WSEndpoint

```go
func (n *Node) WSEndpoint() string
```

This function returns the current JSON-RPC over WebSocket endpoint of the node.

### HTTPAuthEndpoint

```go
func (n *Node) HTTPAuthEndpoint() string
```

This function returns the URL of the authenticated HTTP server.

### WSAuthEndpoint

```go
func (n *Node) WSAuthEndpoint() string
```

This function returns the current authenticated JSON-RPC over WebSocket endpoint of the node.

### EventMux

```go
func (n *Node) EventMux() *event.TypeMux
```

This function retrieves the event multiplexer used by all the network services in the current protocol stack.

### OpenDatabase

```go
func (n *Node) OpenDatabase(name string, cache, handles int, namespace string, readonly bool) (ethdb.Database, error)
```

This function opens an existing database with the given name (or creates one if no previous can be found) from within the node's instance directory. If the node is ephemeral, a memory database is returned.

### OpenDatabaseWithFreezer

```go
func (n *Node) OpenDatabaseWithFreezer(name string, cache, handles int, ancient string, namespace string, readonly bool) (ethdb.Database, error)
```

This function opens an existing database with the given name (or creates one if no previous can be found) from within the node's data directory, also attaching a chain freezer to it that moves ancient chain data from the database to immutable append-only files. If the node is an ephemeral one, a memory database is returned.

### ResolvePath

```go
func (n *Node) ResolvePath(x string) string
```

This function returns the absolute path of a resource in the instance directory.

### ResolveAncient

```go
func (n *Node) ResolveAncient(name string, ancient string) string
```

This function returns the absolute path of the root ancient directory.

## Structs

### closeTrackingDB

This struct wraps the `Close` method of a database. When the database is closed by the service, the wrapper removes it from the node's database map. This ensures that Node won't auto-close the database if it is closed by the service that opened it. # Go Ethereum Library - Node Package

This package contains the `Node` type, which represents a node in the Ethereum network. It also contains several functions used to manage the node's databases.

## Types

### Node

The `Node` type represents a node in the Ethereum network. It contains a `lock` field, which is used to synchronize access to the node's databases, and a `databases` field, which is a map of open databases.

## Functions

### (db *closeTrackingDB) Close() error

This function is a method of the `closeTrackingDB` type. It is used to close a database and remove it from the node's list of open databases. It takes no parameters and returns an error if the database cannot be closed.

### (n *Node) wrapDatabase(db ethdb.Database) ethdb.Database

This function is a method of the `Node` type. It is used to wrap a database with a `closeTrackingDB` instance, which ensures that the database will be closed when the node is closed. It takes a `db` parameter, which is the database to wrap, and returns the wrapped database.

### (n *Node) closeDatabases() (errors []error)

This function is a method of the `Node` type. It is used to close all open databases associated with the node. It returns a slice of errors if any errors occur while closing the databases.

## Types

### closeTrackingDB

The `closeTrackingDB` type is a wrapper around an `ethdb.Database` instance. It contains a `Database` field, which is the wrapped database, and an `n` field, which is a reference to the node that the database is associated with.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.