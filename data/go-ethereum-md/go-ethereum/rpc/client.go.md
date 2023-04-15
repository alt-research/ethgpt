# RPC Client

The `rpc` package provides a client for connecting to an RPC server. The client can connect to the server using HTTP, WebSocket, or IPC. The client can send requests to the server and receive responses. The client can also subscribe to events and receive notifications from the server.

## Client

The `Client` struct represents a connection to an RPC server. It has the following fields:

- `idgen`: a function that generates unique IDs for subscriptions
- `isHTTP`: a boolean indicating whether the connection is HTTP, WebSocket, or IPC
- `services`: a registry of services that can be called by the client
- `idCounter`: a counter for generating unique request IDs
- `reconnectFunc`: a function that is called when the connection is lost
- `writeConn`: a writer for sending messages to the server
- `close`: a channel for closing the client
- `closing`: a channel for indicating that the client is closing
- `didClose`: a channel for indicating that the client has closed
- `reconnected`: a channel for receiving the new connection after a reconnection
- `readOp`: a channel for reading messages from the server
- `readErr`: a channel for receiving errors from the server
- `reqInit`: a channel for registering response IDs and taking the write lock
- `reqSent`: a channel for signaling write completion and releasing the write lock
- `reqTimeout`: a channel for handling request timeouts

## BatchElem

The `BatchElem` struct represents an element in a batch request. It has the following fields:

- `Method`: the name of the method to call
- `Args`: the arguments to pass to the method
- `Result`: a pointer to the result of the method call
- `Error`: an error that is set if the server returns an error for this request, or if unmarshaling into `Result` fails

## Functions

### NewClient

```go
func NewClient(conn ServerCodec) *Client
```

`NewClient` creates a new RPC client with the given connection.

### NewHTTPClient

```go
func NewHTTPClient(endpoint string) (*Client, error)
```

`NewHTTPClient` creates a new RPC client with an HTTP connection to the given endpoint.

### NewWebSocketClient

```go
func NewWebSocketClient(endpoint string) (*Client, error)
```

`NewWebSocketClient` creates a new RPC client with a WebSocket connection to the given endpoint.

### NewIPCClient

```go
func NewIPCClient(endpoint string) (*Client, error)
```

`NewIPCClient` creates a new RPC client with an IPC connection to the given endpoint.

### (c *Client) Call

```go
func (c *Client) Call(result interface{}, method string, args ...interface{}) error
```

`Call` sends a synchronous request to the server and waits for the response. The response is unmarshaled into the `result` parameter.

### (c *Client) Batch

```go
func (c *Client) Batch(batch []BatchElem) error
```

`Batch` sends a batch request to the server and waits for the responses. The responses are unmarshaled into the `Result` fields of the `BatchElem` elements.

### (c *Client) Notify

```go
func (c *Client) Notify(method string, args ...interface{}) error
```

`Notify` sends a notification to the server. Notifications do not receive a response.

### (c *Client) Subscribe

```go
func (c *Client) Subscribe(ctx context.Context, channel interface{}, method string, args ...interface{}) error
```

`Subscribe` sends a subscription request to the server and waits for the response. The response is unmarshaled into the `channel` parameter. The `ctx` parameter is used to cancel the subscription.

### (c *Client) Unsubscribe

```go
func (c *Client) Unsubscribe(ctx context.Context, channel interface{}) error
```

`Unsubscribe` sends an unsubscribe request to the server and waits for the response. The `ctx` parameter is used to cancel the subscription.

### (c *Client) Close

```go
func (c *Client) Close()
```

`Close` closes the client and releases all resources. # RPC Client Library

This library provides a client for making remote procedure calls (RPC) to a server. It supports the following URL schemes: "http", "https", "ws", "wss", and "stdio". If the URL scheme is not specified, it will attempt to establish a local socket connection using UNIX domain sockets on supported platforms and named pipes on Windows.

## Functions

### Dial

```go
func Dial(rawurl string) (*Client, error)
```

Dial creates a new client for the given URL. It supports the currently supported URL schemes: "http", "https", "ws", and "wss". If rawurl is a file name with no URL scheme, a local socket connection is established using UNIX domain sockets on supported platforms and named pipes on Windows.

### DialContext

```go
func DialContext(ctx context.Context, rawurl string) (*Client, error)
```

DialContext creates a new RPC client, just like Dial. The context is used to cancel or time out the initial connection establishment. It does not affect subsequent interactions with the client.

### DialOptions

```go
func DialOptions(ctx context.Context, rawurl string, options ...ClientOption) (*Client, error)
```

DialOptions creates a new RPC client for the given URL. You can supply any of the pre-defined client options to configure the underlying transport. The context is used to cancel or time out the initial connection establishment. It does not affect subsequent interactions with the client.

### ClientFromContext

```go
func ClientFromContext(ctx context.Context) (*Client, bool)
```

ClientFromContext retrieves the client from the context, if any. This can be used to perform 'reverse calls' in a handler method.

## Types

### Client

```go
type Client struct {
	// contains filtered or unexported fields
}
```

Client represents an RPC client.

### ClientOption

```go
type ClientOption interface {
	applyOption(*clientConfig)
}
```

ClientOption is an interface for configuring the RPC client.

### clientConfig

```go
type clientConfig struct {
	// contains filtered or unexported fields
}
```

clientConfig represents the configuration for the RPC client.

### clientConn

```go
type clientConn struct {
	codec   ServerCodec
	handler *handler
}
```

clientConn represents a client connection.

### readOp

```go
type readOp struct {
	msgs  []*jsonrpcMessage
	batch bool
}
```

readOp represents a read operation.

### requestOp

```go
type requestOp struct {
	ids  []json.RawMessage
	err  error
	resp chan *jsonrpcMessage // receives up to len(ids) responses
	sub  *ClientSubscription  // only set for EthSubscribe requests
}
```

requestOp represents a request operation.

### reconnectFunc

```go
type reconnectFunc func(context.Context) (ServerCodec, error)
```

reconnectFunc is a function that reconnects to the server.

### clientContextKey

```go
type clientContextKey struct{}
```

clientContextKey is a key for the client context.

## Methods

### newClientConn

```go
func (c *Client) newClientConn(conn ServerCodec) *clientConn
```

newClientConn creates a new client connection.

### close

```go
func (cc *clientConn) close(err error, inflightReq *requestOp)
```

close closes the client connection.

### wait

```go
func (op *requestOp) wait(ctx context.Context, c *Client) (*jsonrpcMessage, error)
```

wait waits for a response to a request operation.

### SetHTTPClient

```go
func SetHTTPClient(client *http.Client)
```

SetHTTPClient sets the HTTP client for the RPC client.

### SetLogger

```go
func SetLogger(logger *log.Logger)
```

SetLogger sets the logger for the RPC client.

### SetDebug

```go
func SetDebug(debug bool)
```

SetDebug sets the debug flag for the RPC client.

### SetTimeout

```go
func SetTimeout(timeout time.Duration)
```

SetTimeout sets the timeout for the RPC client.

### SetMaxPendingRequests

```go
func SetMaxPendingRequests(max int)
```

SetMaxPendingRequests sets the maximum number of pending requests for the RPC client.

### SetMaxBatchRequests

```go
func SetMaxBatchRequests(max int)
```

SetMaxBatch # JSON-RPC Client Package

This package provides a JSON-RPC client implementation for Go. It allows you to make JSON-RPC calls to a remote server and receive the response in a structured format. The package provides a `Client` struct that can be used to make JSON-RPC calls.

## Client Lifecycle

The `Client` struct has a lifecycle consisting of three basic states: INITIALIZING, RUNNING, and CLOSED. Creating a `Client` allocates basic resources such as the connection to the server and returns the client in its INITIALIZING state. Once everything is initialized, the client can be started, which moves it into the RUNNING state. Starting the client enables JSON-RPC calls to be made. Closing the client releases all held resources. The actions performed by Close depend on the state it was in. When closing a client in INITIALIZING state, resources related to the connection are released. If the client was RUNNING, closing it also aborts any in-flight requests.

## Functions

### NewClient

```go
func NewClient(conn ServerCodec, connect func() (ServerCodec, error)) (*Client, error)
```

NewClient creates a new `Client` instance with the given `ServerCodec` and `connect` function.

### initClient

```go
func initClient(conn ServerCodec, idgen func() ID, services *serviceRegistry) *Client
```

initClient initializes a new `Client` instance with the given `ServerCodec`, ID generator function, and service registry.

### RegisterName

```go
func (c *Client) RegisterName(name string, receiver interface{}) error
```

RegisterName creates a service for the given receiver type under the given name. When no methods on the given receiver match the criteria to be either a RPC method or a subscription an error is returned. Otherwise a new service is created and added to the service collection this client provides to the server.

### nextID

```go
func (c *Client) nextID() json.RawMessage
```

nextID generates the next ID for a JSON-RPC message.

### SupportedModules

```go
func (c *Client) SupportedModules() (map[string]string, error)
```

SupportedModules calls the `rpc_modules` method, retrieving the list of APIs that are available on the server.

### Close

```go
func (c *Client) Close()
```

Close closes the client, aborting any in-flight requests.

### SetHeader

```go
func (c *Client) SetHeader(key, value string)
```

SetHeader adds a custom HTTP header to the client's requests. This method only works for clients using HTTP, it doesn't have any effect for clients using another transport.

### Call

```go
func (c *Client) Call(result interface{}, method string, args ...interface{}) error
```

Call performs a JSON-RPC call with the given arguments and unmarshals into result if no error occurred. The result must be a pointer so that package json can unmarshal into it. You can also pass nil, in which case the result is ignored.

### CallContext

```go
func (c *Client) CallContext(ctx context.Context, result interface{}, method string, args ...interface{}) error
```

CallContext performs a JSON-RPC call with the given arguments. If the context is canceled before the call has successfully returned, CallContext returns immediately. The result must be a pointer so that package json can unmarshal into it. You can also pass nil, in which case the result is ignored.

## Conclusion

This package provides a simple and easy-to-use JSON-RPC client implementation for Go. It allows you to make JSON-RPC calls to a remote server and receive the response in a structured format. The package provides a `Client` struct that can be used to make JSON-RPC calls. The `Client` struct has a lifecycle consisting of three basic states: INITIALIZING, RUNNING, and CLOSED. Creating a `Client` allocates basic resources such as the connection to the server and returns the client in its INITIALIZING state. Once everything is initialized, the client can be started, which moves it into the RUNNING state. Starting the client enables JSON-RPC calls to be made. Closing the client releases all held resources. The actions performed by Close depend on the state it was ## JSON-RPC Client Library

This package provides a JSON-RPC client library for Go. It allows you to send JSON-RPC requests to a server and receive responses.

### Call

```go
func (c *Client) Call(method string, args ...interface{}) error
```

Call sends a JSON-RPC request with the given method and arguments to the server and waits for a response. If the response contains an error, it is returned. If the response contains a result, it is unmarshaled into the provided result argument.

### CallContext

```go
func (c *Client) CallContext(ctx context.Context, method string, args ...interface{}) error
```

CallContext sends a JSON-RPC request with the given method and arguments to the server and waits for a response. The wait duration is bounded by the context's deadline. If the response contains an error, it is returned. If the response contains a result, it is unmarshaled into the provided result argument.

### BatchCall

```go
func (c *Client) BatchCall(b []BatchElem) error
```

BatchCall sends all given requests as a single batch and waits for the server to return a response for all of them. In contrast to Call, BatchCall only returns I/O errors. Any error specific to a request is reported through the Error field of the corresponding BatchElem. Note that batch calls may not be executed atomically on the server side.

### BatchCallContext

```go
func (c *Client) BatchCallContext(ctx context.Context, b []BatchElem) error
```

BatchCallContext sends all given requests as a single batch and waits for the server to return a response for all of them. The wait duration is bounded by the context's deadline. In contrast to CallContext, BatchCallContext only returns errors that have occurred while sending the request. Any error specific to a request is reported through the Error field of the corresponding BatchElem. Note that batch calls may not be executed atomically on the server side.

### Notify

```go
func (c *Client) Notify(ctx context.Context, method string, args ...interface{}) error
```

Notify sends a notification, i.e. a method call that doesn't expect a response.

### EthSubscribe

```go
func (c *Client) EthSubscribe(ctx context.Context, channel interface{}, args ...interface{}) (*ClientSubscription, error)
```

EthSubscribe registers a subscription under the "eth" namespace.

### ShhSubscribe

```go
func (c *Client) ShhSubscribe(ctx context.Context, channel interface{}, args ...interface{}) (*ClientSubscription, error)
```

ShhSubscribe registers a subscription under the "shh" namespace. Deprecated: use Subscribe(ctx, "shh", ...).

### Subscribe

```go
func (c *Client) Subscribe(ctx context.Context, namespace string, channel interface{}, args ...interface{}) (*ClientSubscription, error)
```

Subscribe calls the "<namespace>_subscribe" method with the given arguments, registering a subscription. Server notifications for the subscription are sent to the given channel. The element type of the channel must match the expected type of content returned by the subscription. The context argument cancels the RPC request that sets up the subscription but has no effect on the subscription after Subscribe has returned. Slow subscribers will be dropped by the server.

### Unsubscribe

```go
func (c *Client) Unsubscribe(ctx context.Context, sub *ClientSubscription) error
```

Unsubscribe cancels a subscription previously registered with Subscribe. The context argument cancels the RPC request that cancels the subscription but has no effect on the subscription after Unsubscribe has returned. # JSON-RPC Client Library

This package provides a JSON-RPC client library for Go. It allows you to make remote procedure calls (RPCs) to a JSON-RPC server and receive responses.

## Client

The `Client` type represents a JSON-RPC client. It provides methods for making RPCs and subscribing to notifications.

### Subscribe

```go
func (c *Client) Subscribe(ctx context.Context, namespace string, channel interface{}, args ...interface{}) (*ClientSubscription, error)
```

`Subscribe` registers a subscription with the server. It takes a context, a namespace, a channel, and optional arguments. The namespace is the name of the method to subscribe to, with the suffix "-subscribe". The channel is a writable channel that will receive notifications from the server. The optional arguments are passed to the server when the subscription is created.

### NewMessage

```go
func (c *Client) newMessage(method string, paramsIn ...interface{}) (*jsonrpcMessage, error)
```

`NewMessage` creates a new JSON-RPC message with the given method and parameters. It returns a `jsonrpcMessage` struct.

### Send

```go
func (c *Client) send(ctx context.Context, op *requestOp, msg interface{}) error
```

`Send` sends a JSON-RPC message to the server. It takes a context, a request operation, and a message. The request operation is used to track the response to the message. The message can be a `jsonrpcMessage` struct or a notification.

### Write

```go
func (c *Client) write(ctx context.Context, msg interface{}, retry bool) error
```

`Write` writes a JSON-RPC message to the server. It takes a context, a message, and a boolean indicating whether to retry if the write fails.

### Reconnect

```go
func (c *Client) reconnect(ctx context.Context) error
```

`Reconnect` attempts to reconnect to the server. It takes a context and returns an error if the reconnection fails.

### Dispatch

```go
func (c *Client) dispatch(codec ServerCodec)
```

`Dispatch` is the main loop of the client. It reads messages from the server and sends them to waiting calls or subscriptions.

## ClientSubscription

The `ClientSubscription` type represents a subscription to a JSON-RPC server. It provides methods for managing the subscription.

### Unsubscribe

```go
func (s *ClientSubscription) Unsubscribe() error
```

`Unsubscribe` cancels the subscription with the server.

### Err

```go
func (s *ClientSubscription) Err() <-chan error
```

`Err` returns a channel that receives errors related to the subscription.

### Channel

```go
func (s *ClientSubscription) Channel() reflect.Value
```

`Channel` returns the channel that receives notifications from the server.

## JSON-RPC Message

The `jsonrpcMessage` type represents a JSON-RPC message. It has fields for the version, ID, method, and parameters.

## Request Operation

The `requestOp` type represents a request operation. It has fields for the message IDs, response channels, and subscriptions.

## Server Codec

The `ServerCodec` type represents a server codec. It has methods for reading and writing JSON-RPC messages.

## Conclusion

This JSON-RPC client library provides a simple and easy-to-use interface for making remote procedure calls and subscribing to notifications. It is designed to be flexible and extensible, allowing you to customize it to your needs. ## RPC Client

This code is part of the Go Ethereum library and provides an RPC client for communicating with an Ethereum node. The client uses a ServerCodec to read and write messages to the node. The read and write operations are performed in separate goroutines to allow for concurrent communication.

### `func (c *Client) run()`

This function is the main loop of the RPC client. It listens for events on several channels and performs the appropriate action based on the event. The channels it listens on are:

- `c.close`: This channel is used to signal that the client should close. When a message is received on this channel, the function returns.
- `c.readOp`: This channel is used to receive messages from the node. When a message is received, it is passed to the appropriate handler function.
- `c.readErr`: This channel is used to receive errors from the node. When an error is received, the function logs the error and closes the connection.
- `c.reconnected`: This channel is used to receive a new ServerCodec when the connection is re-established. When a new codec is received, the function closes the old connection and starts a new read loop with the new codec.

### `func (c *Client) drainRead()`

This function is used to drop read messages until an error occurs. It is called when the connection is re-established to clear out any messages that were received on the old connection.

### `func (c *Client) read(codec ServerCodec)`

This function is used to read messages from the node and feed them into the appropriate handler function. It runs in a separate goroutine from the main loop. It listens for messages on the codec and sends them to the `c.readOp` channel. If an error occurs, it sends the error to the `c.readErr` channel.

Overall, this code provides a robust and concurrent RPC client for communicating with an Ethereum node. It handles errors and re-connections gracefully, and allows for concurrent communication with the node.