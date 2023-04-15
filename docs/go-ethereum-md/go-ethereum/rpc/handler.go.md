# RPC Package

The `rpc` package provides a framework for handling JSON-RPC messages. It includes a handler that manages incoming and outgoing messages, and a registry for registering services that can be called via JSON-RPC.

## Handler

The `handler` type handles JSON-RPC messages. There is one handler per connection. The `handler` is not safe for concurrent use. Message handling never blocks indefinitely because RPCs are processed on background goroutines launched by the `handler`.

The entry points for incoming messages are:

- `h.handleMsg(message)`
- `h.handleBatch(message)`

Outgoing calls use the `requestOp` struct. Register the request before sending it on the connection:

```go
op := &requestOp{ids: ...}
h.addRequestOp(op)
```

Now send the request, then wait for the reply to be delivered through `handleMsg`:

```go
if err := op.wait(...); err != nil {
    h.removeRequestOp(op) // timeout, etc.
}
```

## BatchCallBuffer

The `batchCallBuffer` type manages in-progress call messages and their responses during a batch call. Calls need to be synchronized between the processing and timeout-triggering goroutines.

## Functions

### newHandler

```go
func newHandler(connCtx context.Context, conn jsonWriter, idgen func() ID, reg *serviceRegistry) *handler
```

`newHandler` creates a new `handler` instance with the given `connCtx`, `conn`, `idgen`, and `reg`.

### handleMsg

```go
func (h *handler) handleMsg(msg *jsonrpcMessage)
```

`handleMsg` handles a single JSON-RPC message.

### handleBatch

```go
func (h *handler) handleBatch(msgs []*jsonrpcMessage)
```

`handleBatch` handles a batch of JSON-RPC messages.

### addRequestOp

```go
func (h *handler) addRequestOp(op *requestOp)
```

`addRequestOp` registers a request operation with the `handler`.

### removeRequestOp

```go
func (h *handler) removeRequestOp(op *requestOp)
```

`removeRequestOp` removes a request operation from the `handler`.

### addClientSubscription

```go
func (h *handler) addClientSubscription(sub *ClientSubscription)
```

`addClientSubscription` adds a client subscription to the `handler`.

### removeClientSubscription

```go
func (h *handler) removeClientSubscription(sub *ClientSubscription)
```

`removeClientSubscription` removes a client subscription from the `handler`.

### addServerSubscription

```go
func (h *handler) addServerSubscription(sub *Subscription)
```

`addServerSubscription` adds a server subscription to the `handler`.

### removeServerSubscription

```go
func (h *handler) removeServerSubscription(sub *Subscription)
```

`removeServerSubscription` removes a server subscription from the `handler`.

### unsubscribe

```go
func (h *handler) unsubscribe(id ID)
```

`unsubscribe` unsubscribes a subscription with the given ID.

### handleCall

```go
func (h *handler) handleCall(ctx context.Context, msg *jsonrpcMessage) (interface{}, error)
```

`handleCall` handles a JSON-RPC call message.

### handleNotify

```go
func (h *handler) handleNotify(ctx context.Context, msg *jsonrpcMessage) error
```

`handleNotify` handles a JSON-RPC notification message.

### handleSubscribe

```go
func (h *handler) handleSubscribe(ctx context.Context, msg *jsonrpcMessage) (interface{}, error)
```

`handleSubscribe` handles a JSON-RPC subscribe message.

### handleUnsubscribe

```go
func (h *handler) handleUnsubscribe(ctx context.Context, msg *jsonrpcMessage) (interface{}, error)
```

`handleUnsubscribe` handles a JSON-RPC unsubscribe message.

### handleBatchCall

```go
func (h *handler) handleBatchCall(ctx context.Context, msgs []*jsonrpcMessage) ([]interface{}, error)
```

`handleBatchCall` handles a batch of JSON-RPC call messages.

### handleBatchNotify

```go
func (h *handler) handleBatchNotify(ctx context.Context, msgs []*jsonrpcMessage) error
```

`handleBatchNotify` handles a batch of JSON-RPC notification messages.

### handleBatchSubscribe

```go
func (h *handler) handleBatchSubscribe(ctx context.Context, msgs []*jsonrpcMessage) ([]interface{}, error)
```

`handleBatchSubscribe` handles a batch of JSON-RPC subscribe messages.

### handleBatchUnsubscribe

```go
func (h *handler # JSON-RPC Handler

This package provides a JSON-RPC handler for Go. It supports both single requests and batch requests. The handler is designed to be used with a net.Conn, but it can also be used with any io.ReadWriteCloser.

## Handler Lifecycle

The handler has a lifecycle consisting of two basic states: INITIALIZING and RUNNING. Creating a handler allocates basic resources and returns the handler in its INITIALIZING state. Once everything is initialized, the handler can be started, which moves it into the RUNNING state. Note that no additional requests can be handled while the handler is initializing.

## Functions

### NewHandler

```go
func NewHandler() *handler
```

NewHandler creates a new JSON-RPC handler.

### Start

```go
func (h *handler) Start(conn jsonWriter)
```

Start starts the JSON-RPC handler and begins processing requests from the given connection.

### Stop

```go
func (h *handler) Stop()
```

Stop stops the JSON-RPC handler and releases all held resources.

### AddImmediateHandler

```go
func (h *handler) AddImmediateHandler(method string, handler ImmediateHandler)
```

AddImmediateHandler registers an immediate handler for the given method. Immediate handlers are called synchronously and do not block the request processing loop.

### AddHandler

```go
func (h *handler) AddHandler(method string, handler Handler)
```

AddHandler registers a handler for the given method. Handlers are called asynchronously and may block the request processing loop.

### AddSubscriptionHandler

```go
func (h *handler) AddSubscriptionHandler(method string, handler SubscriptionHandler)
```

AddSubscriptionHandler registers a subscription handler for the given method. Subscription handlers are called asynchronously and may block the request processing loop.

### AddSubscription

```go
func (h *handler) AddSubscription(sub *Subscription)
```

AddSubscription adds a subscription to the handler.

### RemoveSubscription

```go
func (h *handler) RemoveSubscription(sub *Subscription)
```

RemoveSubscription removes a subscription from the handler.

### handleImmediate

```go
func (h *handler) handleImmediate(msg *jsonrpcMessage) bool
```

handleImmediate handles a single message synchronously.

### handleCallMsg

```go
func (h *handler) handleCallMsg(cp *callProc, msg *jsonrpcMessage) *jsonrpcMessage
```

handleCallMsg handles a single call message asynchronously.

### handleBatch

```go
func (h *handler) handleBatch(msgs []*jsonrpcMessage)
```

handleBatch handles a batch of messages asynchronously.

### startCallProc

```go
func (h *handler) startCallProc(fn func(cp *callProc))
```

startCallProc starts a new call processing goroutine.

### addSubscriptions

```go
func (h *handler) addSubscriptions(notifiers []*SubscriptionNotifier)
```

addSubscriptions adds subscriptions to the handler.

### removeSubscriptions

```go
func (h *handler) removeSubscriptions(notifiers []*SubscriptionNotifier)
```

removeSubscriptions removes subscriptions from the handler.

### errorMessage

```go
func errorMessage(err error) *jsonrpcMessage
```

errorMessage creates an error response message for the given error.

### ContextRequestTimeout

```go
func ContextRequestTimeout(ctx context.Context) (time.Duration, bool)
```

ContextRequestTimeout returns the request timeout from the given context, if any. # JSON-RPC Handler

The JSON-RPC Handler is a package that provides a framework for handling JSON-RPC messages. It is used to handle incoming JSON-RPC messages, process them, and send responses back to the client.

## Handler Lifecycle

The Handler object has a lifecycle consisting of three basic states: INITIALIZING, RUNNING, and CLOSED. Creating a Handler allocates basic resources such as the response wait list and returns the handler in its INITIALIZING state. Once everything is registered, the handler can be started, which moves it into the RUNNING state. Starting the handler enables processing of incoming JSON-RPC messages. Note that no additional JSON-RPC messages can be registered while the handler is running. Closing the handler releases all held resources. The actions performed by Close depend on the state it was in. When closing a handler in INITIALIZING state, resources related to the response wait list are released. If the handler was RUNNING, closing it also cancels all pending requests and active subscriptions. You must always call Close on Handler, even if the handler was not started.

## Functions

### NewHandler

```go
func NewHandler(log log.Logger, maxInFlight int, maxBatch int, maxBatchSize int, maxBatchTimeout time.Duration) *handler
```

NewHandler creates a new Handler instance with the given logger and configuration.

### Start

```go
func (h *handler) Start(conn *Conn)
```

Start starts the Handler instance and begins processing incoming JSON-RPC messages.

### Close

```go
func (h *handler) Close(err error, inflightReq *requestOp)
```

Close cancels all requests except for inflightReq and waits for call goroutines to shut down.

### addRequestOp

```go
func (h *handler) addRequestOp(op *requestOp)
```

addRequestOp registers a request operation.

### removeRequestOp

```go
func (h *handler) removeRequestOp(op *requestOp)
```

removeRequestOps stops waiting for the given request IDs.

### cancelAllRequests

```go
func (h *handler) cancelAllRequests(err error, inflightReq *requestOp)
```

cancelAllRequests unblocks and removes pending requests and active subscriptions.

### addSubscriptions

```go
func (h *handler) addSubscriptions(nn []*Notifier)
```

addSubscriptions registers a list of subscriptions with the Handler instance.

### cancelServerSubscriptions

```go
func (h *handler) cancelServerSubscriptions(err error)
```

cancelServerSubscriptions removes all subscriptions and closes their error channels.

### startCallProc

```go
func (h *handler) startCallProc(fn func(*callProc))
```

startCallProc runs fn in a new goroutine and starts tracking it in the h.calls wait group.

### handleImmediate

```go
func (h *handler) handleImmediate(msg *jsonrpcMessage) bool
```

handleImmediate executes non-call messages. It returns false if the message is a call or requires a reply.

### handleSubscriptionResult

```go
func (h *handler) handleSubscriptionResult(msg *jsonrpcMessage)
```

handleSubscriptionResult processes subscription notifications.

### handleResponse

```go
func (h *handler) handleResponse(msg *jsonrpcMessage)
```

handleResponse processes method call responses. # JSON-RPC Handler

This code implements a JSON-RPC handler for Ethereum nodes. It provides a way for clients to send requests to the node and receive responses. The handler is responsible for parsing incoming requests, executing the requested method, and returning the result to the client.

## Functions

### handleCallMsg

```go
func (h *handler) handleCallMsg(ctx *callProc, msg *jsonrpcMessage) *jsonrpcMessage
```

handleCallMsg processes incoming JSON-RPC messages. It determines whether the message is a notification or a call, and then calls the appropriate function to handle the message.

### handleCall

```go
func (h *handler) handleCall(cp *callProc, msg *jsonrpcMessage) *jsonrpcMessage
```

handleCall processes method calls. It determines whether the method is a subscription or a regular method call, and then calls the appropriate function to handle the method.

### handleSubscribe

```go
func (h *handler) handleSubscribe(cp *callProc, msg *jsonrpcMessage) *jsonrpcMessage
```

handleSubscribe processes subscription method calls. It parses the subscription name and calls the appropriate function to handle the subscription.

### runMethod

```go
func (h *handler) runMethod(ctx context.Context, msg *jsonrpcMessage, callb *callback, args []reflect.Value) *jsonrpcMessage
```

runMethod runs the Go callback for an RPC method. It executes the requested method and returns the result to the client.

## Conclusion

This code provides a robust and efficient JSON-RPC handler for Ethereum nodes. It is responsible for parsing incoming requests, executing the requested method, and returning the result to the client. The handler is designed to be extensible and can be easily modified to support new methods and subscriptions. ## Function Documentation

### call

```go
func (callb *callback) call(ctx context.Context, method string, args []interface{}) (interface{}, error)
```

The `call` function is a method of the `callback` struct. It takes in a context, a method string, and a slice of arguments. It calls the method with the given arguments and returns the result or an error if one occurred.

### errorResponse

```go
func (msg *message) errorResponse(err error) []byte
```

The `errorResponse` function is a method of the `message` struct. It takes in an error and returns a byte slice representing the error response.

### response

```go
func (msg *message) response(result interface{}) []byte
```

The `response` function is a method of the `message` struct. It takes in a result interface and returns a byte slice representing the response.

### unsubscribe

```go
func (h *handler) unsubscribe(ctx context.Context, id ID) (bool, error)
```

The `unsubscribe` function is a method of the `handler` struct. It takes in a context and an ID. It removes the subscription associated with the given ID and returns a boolean indicating whether the subscription was successfully removed and an error if one occurred.

### idForLog

```go
type idForLog struct{ json.RawMessage }

func (id idForLog) String() string {
	if s, err := strconv.Unquote(string(id.RawMessage)); err == nil {
		return s
	}
	return string(id.RawMessage)
}
```

The `idForLog` type is a struct that wraps a `json.RawMessage`. It has a `String` method that returns the string representation of the `json.RawMessage`. If the `json.RawMessage` is a quoted string, it is unquoted before being returned. Otherwise, the raw message is returned as a string.