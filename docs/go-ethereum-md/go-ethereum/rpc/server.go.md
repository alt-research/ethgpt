# RPC Server

The RPC Server is a server that provides a framework for creating and serving remote procedure calls (RPCs) over various protocols. It allows clients to call methods on a server remotely, and receive the results of those calls. The RPC Server is designed to be extensible, allowing developers to add new services and methods as needed.

## Server

The Server type is the main type of the RPC Server. It is responsible for managing the services and codecs that are registered with the server, and for serving incoming requests. The Server type has the following methods:

### NewServer

```go
func NewServer() *Server
```

NewServer creates a new server instance with no registered handlers.

### RegisterName

```go
func (s *Server) RegisterName(name string, receiver interface{}) error
```

RegisterName creates a service for the given receiver type under the given name. When no methods on the given receiver match the criteria to be either a RPC method or a subscription an error is returned. Otherwise a new service is created and added to the service collection this server provides to clients.

### ServeCodec

```go
func (s *Server) ServeCodec(codec ServerCodec, options CodecOption)
```

ServeCodec reads incoming requests from codec, calls the appropriate callback and writes the response back using the given codec. It will block until the codec is closed or the server is stopped. In either case the codec is closed.

### serveSingleRequest

```go
func (s *Server) serveSingleRequest(ctx context.Context, codec ServerCodec)
```

serveSingleRequest reads and processes a single RPC request from the given codec. This is used to serve HTTP connections. Subscriptions and reverse calls are not allowed in this mode.

## CodecOption

The CodecOption type specifies which type of messages a codec supports. It is deprecated and no longer honored by Server.

## RPCService

The RPCService type provides meta information about the RPC service such as the services and methods it offers.

## ServerCodec

The ServerCodec type is an interface that defines the methods required to implement a codec for the RPC Server. It has the following methods:

### ReadRequestHeader

```go
func (c ServerCodec) ReadRequestHeader(r *Request) error
```

ReadRequestHeader reads the header of an incoming request.

### ReadRequestBody

```go
func (c ServerCodec) ReadRequestBody(args interface{}) error
```

ReadRequestBody reads the body of an incoming request.

### WriteResponse

```go
func (c ServerCodec) WriteResponse(r *Response, body interface{}) error
```

WriteResponse writes the response to an outgoing request.

### Close

```go
func (c ServerCodec) Close() error
```

Close closes the codec.

## Handler

The Handler type is responsible for handling incoming requests. It has the following methods:

### ServeRequest

```go
func (h *Handler) ServeRequest(ctx context.Context, req *Request) {
```

ServeRequest serves an incoming request.

### ServeHTTP

```go
func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request)
```

ServeHTTP serves an incoming HTTP request.

## Client

The Client type is responsible for managing the connection to the server and sending requests. It has the following methods:

### Call

```go
func (c *Client) Call(ctx context.Context, serviceMethod string, args interface{}, reply interface{}) error
```

Call sends a request to the server and waits for the response.

### Go

```go
func (c *Client) Go(ctx context.Context, serviceMethod string, args interface{}, reply interface{}, done chan *Call) *Call
```

Go sends a request to the server and returns immediately. The response will be sent to the provided channel.

### Close

```go
func (c *Client) Close() error
```

Close closes the client connection.

## Conclusion

The RPC Server is a powerful tool for creating and serving remote procedure calls over various protocols. It is designed to be extensible, allowing developers to add new services and methods as needed. The Server type manages the services and codecs that are registered with the server, and serves incoming requests. The Client type manages the connection to the server and sends requests. The Handler type is responsible for handling incoming requests. # RPC Server - Go Ethereum Library

This package provides a framework for setting up an RPC server for the Go Ethereum Library. The server can handle multiple codecs and provides a way to stop the server gracefully. It also includes an RPCService that gives meta information about the server and a PeerInfo struct that contains information about the remote end of the network connection.

## Server Lifecycle

The Server object has a lifecycle consisting of two basic states: RUNNING and STOPPED. Creating a Server allocates basic resources and returns the server in its RUNNING state. Once the server is started, it can handle incoming requests from clients. Stopping the server gracefully waits for stopPendingRequestTimeout to allow pending requests to finish, then closes all codecs which will cancel pending requests and subscriptions. You must always call Stop on Server, even if the server was not started.

## Functions

### NewServer

```go
func NewServer() *Server
```

NewServer creates a new Server instance.

### Start

```go
func (s *Server) Start()
```

Start starts the Server instance.

### ServeCodec

```go
func (s *Server) ServeCodec(codec ServerCodec)
```

ServeCodec serves a single codec.

### Stop

```go
func (s *Server) Stop()
```

Stop stops the Server instance.

### Modules

```go
func (s *RPCService) Modules() map[string]string
```

Modules returns the list of RPC services with their version number.

### PeerInfoFromContext

```go
func PeerInfoFromContext(ctx context.Context) PeerInfo
```

PeerInfoFromContext returns information about the client's network connection. Use this with the context passed to RPC method handler functions.

## Structs

### PeerInfo

```go
type PeerInfo struct {
	Transport  string
	RemoteAddr string
	HTTP       struct {
		Version   string
		UserAgent string
		Origin    string
		Host      string
	}
}
```

PeerInfo contains information about the remote end of the network connection.

### RPCService

```go
type RPCService struct {
	server *Server
}
```

RPCService gives meta information about the server. e.g. gives information about the loaded modules.

## Methods

### ServeRequest

```go
func (h *rpcHandler) ServeRequest(ctx context.Context, codec ServerCodec)
```

ServeRequest serves a single request.

### Stop

```go
func (s *Server) Stop()
```

Stop stops reading new requests, waits for stopPendingRequestTimeout to allow pending requests to finish, then closes all codecs which will cancel pending requests and subscriptions.