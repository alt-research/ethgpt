# Go Ethereum Library - Node Package

This package contains the core functionality for running a Go Ethereum node. It provides a protocol stack that handles communication with other nodes on the Ethereum network, as well as a set of services that provide additional functionality.

## Functions

### New

```go
func New(config *Config) (*Node, error)
```

The `New` function creates a new Ethereum node with the provided configuration. It returns a `Node` object and an error if the creation fails.

### (*Node) Start

```go
func (n *Node) Start() error
```

The `Start` method starts the Ethereum node. It returns an error if the node fails to start.

### (*Node) Close

```go
func (n *Node) Close() error
```

The `Close` method stops the Ethereum node. It returns an error if the node fails to stop.

### (*Node) RegisterLifecycle

```go
func (n *Node) RegisterLifecycle(lifecycle Lifecycle)
```

The `RegisterLifecycle` method registers a `Lifecycle` object with the Ethereum node. The `Lifecycle` object is used to manage the lifecycle of a service.

### (*Node) RegisterService

```go
func (n *Node) RegisterService(service Service)
```

The `RegisterService` method registers a `Service` object with the Ethereum node. The `Service` object provides additional functionality to the node.

## Structs

### Config

```go
type Config struct {
    Name    string
    DataDir string
    P2P     p2p.Config
    DB      ethdb.Database
    RPC     *rpc.Server
    Logger  log.Logger
}
```

The `Config` struct contains the configuration options for an Ethereum node. It includes the name of the node, the data directory, the P2P configuration, the database, the RPC server, and the logger.

### Node

```go
type Node struct {
    config     *Config
    protocols  []p2p.Protocol
    services   []Service
    lifecycles []Lifecycle
    p2pServer  *p2p.Server
    rpcServer  *rpc.Server
    db         ethdb.Database
    logger     log.Logger
    started    bool
    stopped    bool
}
```

The `Node` struct represents an Ethereum node. It includes the configuration, the protocols, the services, the lifecycles, the P2P server, the RPC server, the database, the logger, and the start/stop status of the node.

### Lifecycle

```go
type Lifecycle interface {
    Start(server *p2p.Server) error
    Stop() error
}
```

The `Lifecycle` interface is used to manage the lifecycle of a service. It includes the `Start` and `Stop` methods.

### Service

```go
type Service interface {
    Protocols() []p2p.Protocol
    APIs() []rpc.API
    Start(server *p2p.Server) error
    Stop() error
}
```

The `Service` interface provides additional functionality to the Ethereum node. It includes the protocols, APIs, `Start`, and `Stop` methods.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Protocol Stack Tests

This file contains a set of tests for the Go Ethereum protocol stack. The tests are designed to ensure that the protocol stack is functioning correctly and that all registered protocols and APIs are successfully registered.

## Functions

### TestRegisterProtocols

This test checks that all protocols and APIs are successfully registered with the protocol stack. It creates a new protocol stack and full service, and then checks that all registered protocols and APIs are present in the stack.

### TestNodeCloseClosesDB

This test checks that open databases are closed when the node is closed. It creates a new protocol stack, opens a database, writes to the database, and then closes the node. It then attempts to write to the database again and checks that an error is returned.

### TestNodeOpenDatabaseFromLifecycleStart

This test checks that `OpenDatabase` can be used from within a Lifecycle Start method. It creates a new protocol stack, registers an instrumented service with a start hook that opens a database, and then starts the stack. It then checks that the database was successfully opened.

### TestNodeOpenDatabaseFromLifecycleStop

This test checks that `OpenDatabase` can be used from within a Lifecycle Stop method. It creates a new protocol stack, registers an instrumented service with a stop hook that opens a database, and then starts and stops the stack. It then checks that the database was successfully opened and closed.

### TestLifecycleLifeCycle

This test checks that registered Lifecycles are started and stopped correctly. It creates a new protocol stack, registers a batch of instrumented services with start and stop hooks, and then starts and stops the stack. It then checks that all services were successfully started and stopped.

### TestLifecycleStartupError

This test checks that if a Lifecycle fails to start, all others started before it will be shut down. It creates a new protocol stack and attempts to start a service that will fail to start. It then checks that all other services that were started before the failed service were shut down.

## License

This file is part of the Go Ethereum library and is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Protocol Stack Tests

This file contains tests for the protocol stack used in the Go Ethereum library. The tests ensure that the protocol stack can start and stop services correctly, even when some services fail to start or stop.

## Functions

### TestLifecycleStartupGuarantee

This function tests that all services registered with the protocol stack are started and stopped correctly. It creates a batch of instrumented services and registers them with the protocol stack. It also registers a service that fails to construct itself. The function then starts the protocol stack and ensures that all started services stop. If any service fails to stop, the test fails.

### TestLifecycleTerminationGuarantee

This function tests that even if a registered Lifecycle fails to shut down cleanly, it does not influence the rest of the shutdown invocations. It creates a batch of instrumented services and registers them with the protocol stack. It also registers a service that fails to shut down cleanly. The function then starts the protocol stack and ensures that all services are online. It then stops the protocol stack and verifies that the failure occurred and checks all terminations.

### TestRegisterHandler_Successful

This function tests whether a handler can be successfully mounted on the canonical HTTP server on the given prefix. It creates a new protocol stack and registers a handler on the HTTP server. It then sends a request to the server and verifies that the response is successful.

## License

This file is part of the go-ethereum library. The go-ethereum library is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Node Package

This package contains the implementation of the Go Ethereum node, which is responsible for running the Ethereum protocol and interacting with the Ethereum network.

## Functions

### createNode(t *testing.T, httpPort, wsPort int) *Node

This function creates a new instance of the Go Ethereum node for testing purposes. It takes three parameters: a testing object, an HTTP port number, and a WebSocket port number. It returns a pointer to the created node.

### (node *Node) Close()

This function stops the Go Ethereum node and releases any resources associated with it.

### (node *Node) RegisterHandler(name, path string, handler http.Handler)

This function registers an HTTP handler with the Go Ethereum node. It takes three parameters: the name of the handler, the path to mount the handler on, and the handler object itself.

### (node *Node) Start() error

This function starts the Go Ethereum node and begins listening for incoming connections. It returns an error if the node fails to start.

### (node *Node) HTTPEndpoint() string

This function returns the HTTP endpoint of the Go Ethereum node.

### (node *Node) WSEndpoint() string

This function returns the WebSocket endpoint of the Go Ethereum node.

### startHTTP(t *testing.T, httpPort, wsPort int) *Node

This function creates a new instance of the Go Ethereum node and starts it with the specified HTTP and WebSocket port numbers. It takes three parameters: a testing object, an HTTP port number, and a WebSocket port number. It returns a pointer to the created node.

### checkRPC(endpoint string) bool

This function sends an RPC request to the specified endpoint and returns a boolean indicating whether the request was successful.

### TestCreateNode(t *testing.T)

This test function tests the creation of a new Go Ethereum node.

### TestRegisterHandler(t *testing.T)

This test function tests the registration of an HTTP handler with the Go Ethereum node.

### TestRegisterHandler_Unsuccessful(t *testing.T)

This test function tests the unsuccessful registration of an HTTP handler with the Go Ethereum node.

### TestWebsocketHTTPOnSamePort_WebsocketRequest(t *testing.T)

This test function tests whether WebSocket requests can be handled on the same port as a regular HTTP server.

### TestWebsocketHTTPOnSeparatePort_WSRequest(t *testing.T)

This test function tests whether WebSocket requests can be handled on a separate port from the regular HTTP server.

### TestNodeRPCPrefix(t *testing.T)

This test function tests the RPC prefix functionality of the Go Ethereum node.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # RPC Prefix Test

This source code file contains a test suite for the `rpcPrefixTest` struct, which tests the functionality of the `check` method. The `check` method is used to verify that the HTTP and WebSocket endpoints of a `Node` instance are correctly set based on the provided HTTP and WebSocket path prefixes.

## Functions

### `check`

The `check` method is a method of the `rpcPrefixTest` struct. It takes a `*testing.T` instance and a `*Node` instance as parameters. It verifies that the HTTP and WebSocket endpoints of the `Node` instance are correctly set based on the provided HTTP and WebSocket path prefixes. It does this by making HTTP and WebSocket requests to the expected endpoints and verifying that the responses are correct.

### `createNode`

The `createNode` function is used to create a new `Node` instance with the provided HTTP and WebSocket ports. It takes a `*testing.T` instance, an `int` representing the HTTP port, and an `int` representing the WebSocket port as parameters. It returns a new `Node` instance.

### `startHTTP`

The `startHTTP` function is used to start an HTTP service on a `Node` instance with the provided HTTP and WebSocket ports. It takes a `*testing.T` instance, an `int` representing the HTTP port, and an `int` representing the WebSocket port as parameters. It returns a new `Node` instance with the HTTP service started.

### `doHTTPRequest`

The `doHTTPRequest` function is used to issue a GET request to the provided endpoint. It takes a `*testing.T` instance and an `*http.Request` instance as parameters. It returns the response from the GET request.

### `containsProtocol`

The `containsProtocol` function is used to determine whether a `Protocol` instance is contained in a slice of `Protocol` instances. It takes a slice of `Protocol` instances and a `Protocol` instance as parameters. It returns a boolean value indicating whether the `Protocol` instance is contained in the slice.

### `containsAPI`

The `containsAPI` function is used to determine whether an `API` instance is contained in a slice of `API` instances. It takes a slice of `API` instances and an `API` instance as parameters. It returns a boolean value indicating whether the `API` instance is contained in the slice.

## License

This source code file is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.