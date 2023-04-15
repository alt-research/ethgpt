# RPC Package

The RPC package provides a framework for creating and handling JSON-RPC requests and responses. It includes functions for creating unique IDs for requests, subscribing to notifications, and handling errors.

## Functions

### TestNewID

```go
func TestNewID(t *testing.T)
```

TestNewID tests the NewID function, which generates a unique ID for a JSON-RPC request.

### TestSubscriptions

```go
func TestSubscriptions(t *testing.T)
```

TestSubscriptions tests the subscription functionality of the RPC package. It creates subscriptions for multiple namespaces and verifies that all notifications are received.

### NewID

```go
func NewID() []byte
```

NewID generates a unique ID for a JSON-RPC request.

### NewClientCodec

```go
func NewClientCodec(conn io.ReadWriteCloser) ClientCodec
```

NewClientCodec creates a new client codec for the given connection.

### NewServerCodec

```go
func NewServerCodec(conn io.ReadWriteCloser) ServerCodec
```

NewServerCodec creates a new server codec for the given connection.

### NewServer

```go
func NewServer() *Server
```

NewServer creates a new RPC server.

### (s *Server) RegisterName

```go
func (s *Server) RegisterName(name string, service interface{}) error
```

RegisterName registers a service with the given name on the RPC server.

### (s *Server) ServeCodec

```go
func (s *Server) ServeCodec(codec ServerCodec, maxConns int)
```

ServeCodec serves JSON-RPC requests using the given codec.

### (s *Server) ServeConn

```go
func (s *Server) ServeConn(conn io.ReadWriteCloser, maxConns int)
```

ServeConn serves JSON-RPC requests on the given connection.

### (s *Server) Stop

```go
func (s *Server) Stop()
```

Stop stops the RPC server.

### (s *Server) SetMaxOpenConnections

```go
func (s *Server) SetMaxOpenConnections(maxConns int)
```

SetMaxOpenConnections sets the maximum number of open connections for the RPC server.

### (s *Server) SetMaxRequestsPerConn

```go
func (s *Server) SetMaxRequestsPerConn(maxRequests int)
```

SetMaxRequestsPerConn sets the maximum number of requests per connection for the RPC server.

### (s *Server) SetMaxRequestSize

```go
func (s *Server) SetMaxRequestSize(maxSize int64)
```

SetMaxRequestSize sets the maximum request size for the RPC server.

### (s *Server) SetReadTimeout

```go
func (s *Server) SetReadTimeout(timeout time.Duration)
```

SetReadTimeout sets the read timeout for the RPC server.

### (s *Server) SetWriteTimeout

```go
func (s *Server) SetWriteTimeout(timeout time.Duration)
```

SetWriteTimeout sets the write timeout for the RPC server.

### (s *Server) SetKeepAlive

```go
func (s *Server) SetKeepAlive(keepAlive time.Duration)
```

SetKeepAlive sets the keep-alive interval for the RPC server.

### (s *Server) SetLogger

```go
func (s *Server) SetLogger(logger Logger)
```

SetLogger sets the logger for the RPC server.

### (s *Server) SetErrorLogger

```go
func (s *Server) SetErrorLogger(logger Logger)
```

SetErrorLogger sets the error logger for the RPC server.

### (s *Server) SetDebug

```go
func (s *Server) SetDebug(debug bool)
```

SetDebug sets the debug flag for the RPC server.

### (s *Server) SetAllowedOrigins

```go
func (s *Server) SetAllowedOrigins(origins []string)
```

SetAllowedOrigins sets the allowed origins for the RPC server.

### (s *Server) SetAllowedMethods

```go
func (s *Server) SetAllowedMethods(methods []string)
```

SetAllowedMethods sets # JSON-RPC Server

This package provides a JSON-RPC server implementation that can be used to expose APIs over HTTP, WebSocket, or IPC. The server can handle both requests and notifications, and supports subscriptions.

## Server

The `Server` type represents a JSON-RPC server. It can be created using the `NewServer` function.

### NewServer

```go
func NewServer() *Server
```

`NewServer` creates a new JSON-RPC server.

### RegisterName

```go
func (s *Server) RegisterName(name string, service interface{})
```

`RegisterName` registers a service with the server. The service must be an object that implements one or more methods that can be called remotely. The `name` parameter is the name of the service, and is used to identify it in the JSON-RPC requests.

### ServeCodec

```go
func (s *Server) ServeCodec(codec ServerCodec, maxConcurrent int)
```

`ServeCodec` starts the server and begins serving requests using the given `ServerCodec`. The `maxConcurrent` parameter specifies the maximum number of concurrent requests that the server will handle. If `maxConcurrent` is zero, the server will handle an unlimited number of concurrent requests.

### ServeHTTP

```go
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request)
```

`ServeHTTP` is an HTTP handler that can be used to serve JSON-RPC requests over HTTP.

### ServeWebSocket

```go
func (s *Server) ServeWebSocket(conn *websocket.Conn)
```

`ServeWebSocket` is a WebSocket handler that can be used to serve JSON-RPC requests over WebSocket.

### ServeIPC

```go
func (s *Server) ServeIPC(listener net.Listener)
```

`ServeIPC` is a listener that can be used to serve JSON-RPC requests over IPC.

## ServerCodec

The `ServerCodec` interface represents a codec that can be used to encode and decode JSON-RPC requests and responses. The `NewCodec` function can be used to create a new `ServerCodec` from an `io.ReadWriteCloser`.

### NewCodec

```go
func NewCodec(conn io.ReadWriteCloser) ServerCodec
```

`NewCodec` creates a new `ServerCodec` from an `io.ReadWriteCloser`.

## Subscription

The `Subscription` type represents a JSON-RPC subscription. It can be created using the `NewSubscription` function.

### NewSubscription

```go
func NewSubscription(id ID, subid ID, unsubscribe func()) *Subscription
```

`NewSubscription` creates a new `Subscription` with the given `id`, `subid`, and `unsubscribe` function.

### ID

```go
func (s *Subscription) ID() ID
```

`ID` returns the ID of the subscription.

### SubID

```go
func (s *Subscription) SubID() ID
```

`SubID` returns the subscription ID.

### Unsubscribe

```go
func (s *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription.

## ID

The `ID` type represents a JSON-RPC ID. It can be created using the `NewID` function.

### NewID

```go
func NewID() ID
```

`NewID` creates a new `ID`.

### String

```go
func (id ID) String() string
```

`String` returns the string representation of the `ID`.

## Errors

The `Error` type represents a JSON-RPC error. It can be created using the `NewError` function.

### NewError

```go
func NewError(code int, message string) *Error
```

`NewError` creates a new `Error` with the given `code` and `message`.

### Code

```go
func (e *Error) Code() int
```

`Code` returns the error code.

### Message

```go
func (e *Error) Message() string
```

`Message` returns the error message.

## SubscriptionResult

The `SubscriptionResult` type represents a JSON-RPC subscription result. It can be created using the `NewSubscriptionResult` function.

### NewSubscriptionResult

```go
func NewSubscriptionResult(subid ID, result interface{}) *SubscriptionResult
```

`NewSubscriptionResult` creates a new `SubscriptionResult` with the given `subid` and `result`.

### SubID

```go
func (r *SubscriptionResult) SubID() ID
```

`SubID` returns the subscription ID.

### Result

```go
func (r *SubscriptionResult) Result() interface{}
```

`Result` returns the subscription result.

## Testing

The `jsonrpc_test.go` file contains tests for the JSON-RPC server implementation. The tests cover the following functionality:

- Handling of requests and notifications
- Handling of subscriptions
- Unsubscribing from subscriptions

The tests use the `notificationTestService` type, which is a simple service that can be used to test notifications and subscriptions.