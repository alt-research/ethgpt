# Event Package

The `event` package provides a subscription-based event system for Go. It allows you to subscribe to events and receive notifications when they occur.

## Subscription

The `Subscription` type represents a subscription to an event. It can be created using the `NewSubscription` function.

### NewSubscription

```go
func NewSubscription(f func(quit <-chan struct{}) error) Subscription
```

`NewSubscription` creates a new `Subscription` with the given function `f`. The function `f` is called with a `quit` channel that can be used to signal the subscription to stop.

### Err

```go
func (s Subscription) Err() <-chan error
```

`Err` returns a channel that can be used to receive errors from the subscription.

### Unsubscribe

```go
func (s Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription.

## Resubscribe

The `Resubscribe` function creates a new subscription that automatically resubscribes when it fails.

### Resubscribe

```go
func Resubscribe(interval time.Duration, f func(ctx context.Context) (Subscription, error)) Subscription
```

`Resubscribe` creates a new subscription that automatically resubscribes when it fails. The `interval` parameter specifies the time to wait before attempting to resubscribe. The `f` parameter is a function that creates a new subscription.

## ResubscribeErr

The `ResubscribeErr` function creates a new subscription that automatically resubscribes when it fails, and provides the last error to the resubscribe function.

### ResubscribeErr

```go
func ResubscribeErr(interval time.Duration, f func(ctx context.Context, lastErr error) (Subscription, error)) Subscription
```

`ResubscribeErr` creates a new subscription that automatically resubscribes when it fails, and provides the last error to the resubscribe function. The `interval` parameter specifies the time to wait before attempting to resubscribe. The `f` parameter is a function that creates a new subscription and takes the last error as a parameter.

## Testing

The `event_test.go` file contains tests for the `event` package. The tests cover the following functionality:

- Creating a new subscription
- Unsubscribing from a subscription
- Resubscribing when a subscription fails
- Resubscribing with an error handler

The tests use the `subscribeInts` function, which is a simple function that can be used to test subscriptions. ## Function: TestSubscriptionErrors

The `TestSubscriptionErrors` function is a unit test that tests the handling of subscription errors in the JSON-RPC server implementation. It takes a testing `*T` object as a parameter and performs the following steps:

1. Creates a new JSON-RPC server using the `NewServer` function.
2. Registers a test service with the server using the `RegisterName` function.
3. Starts the server using the `ServeCodec` function with a mock `ServerCodec`.
4. Sends a subscription request to the server using the mock `ServerCodec`.
5. Expects the server to return an error response with the code `-32000` and the message `"subscription error"`.
6. Expects the server to close the subscription connection.
7. Compares the actual subscription errors returned by the server with the expected subscription errors.

If the actual subscription errors do not match the expected subscription errors, the function fails the test with a fatal error message.

### Parameters

- `t *testing.T`: A testing `*T` object.

### Return Value

This function does not return any values.

### Example Usage

```go
func TestMyFunction(t *testing.T) {
    TestSubscriptionErrors(t)
}
```

## Function: NewServer

The `NewServer` function is a constructor that creates a new JSON-RPC server. It takes no parameters and returns a pointer to a new `Server` object.

### Parameters

This function does not take any parameters.

### Return Value

- `*Server`: A pointer to a new `Server` object.

### Example Usage

```go
server := NewServer()
```

## Function: RegisterName

The `RegisterName` function is a method of the `Server` type that registers a service with the server. It takes two parameters:

- `name string`: The name of the service.
- `service interface{}`: The service object that implements one or more methods that can be called remotely.

### Parameters

- `name string`: The name of the service.
- `service interface{}`: The service object that implements one or more methods that can be called remotely.

### Return Value

This function does not return any values.

### Example Usage

```go
type MyService struct {}

func (s *MyService) MyMethod() {}

server := NewServer()
server.RegisterName("myService", &MyService{})
```

## Function: ServeCodec

The `ServeCodec` function is a method of the `Server` type that starts the server and begins serving requests using the given `ServerCodec`. It takes two parameters:

- `codec ServerCodec`: The `ServerCodec` to use for encoding and decoding JSON-RPC requests and responses.
- `maxConcurrent int`: The maximum number of concurrent requests that the server will handle. If `maxConcurrent` is zero, the server will handle an unlimited number of concurrent requests.

### Parameters

- `codec ServerCodec`: The `ServerCodec` to use for encoding and decoding JSON-RPC requests and responses.
- `maxConcurrent int`: The maximum number of concurrent requests that the server will handle. If `maxConcurrent` is zero, the server will handle an unlimited number of concurrent requests.

### Return Value

This function does not return any values.

### Example Usage

```go
server := NewServer()
server.RegisterName("myService", &MyService{})

listener, _ := net.Listen("tcp", ":8080")
defer listener.Close()

for {
    conn, _ := listener.Accept()
    go server.ServeCodec(NewCodec(conn), 0)
}
```

## Function: ServeHTTP

The `ServeHTTP` function is an HTTP handler that can be used to serve JSON-RPC requests over HTTP. It is a method of the `Server` type and takes two parameters:

- `w http.ResponseWriter`: The `http.ResponseWriter` to use for writing the HTTP response.
- `r *http.Request`: The `http.Request` to use for reading the HTTP request.

### Parameters

- `w http.ResponseWriter`: The `http.ResponseWriter` to use for writing the HTTP response.
- `r *http.Request`: The `http.Request` to use for reading the HTTP request.

### Return Value

This function does not return any values.

### Example Usage

```go
server := NewServer()
server.RegisterName("myService", &MyService{})

http.HandleFunc("/rpc", func(w http.ResponseWriter, r *http.Request) {
    server.ServeHTTP(w, r)
})

http.ListenAndServe(":8080", nil)
```

## Function: ServeWebSocket

The `ServeWebSocket` function is a WebSocket handler that can be used to serve JSON-RPC requests over WebSocket. It is a method of the `Server` type and takes one parameter:

- `conn *websocket.Conn`: The `websocket.Conn` to use for reading and writing WebSocket messages.

### Parameters

- `conn *websocket.Conn`: The `websocket.Conn` to use for reading and writing WebSocket messages.

### Return Value

This function does not return any values.

### Example Usage

```go
server := NewServer()
server.RegisterName("myService", &MyService{})

http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
    upgrader := websocket.Upgrader{}
    conn, _ := upgrader.Upgrade(w, r, nil)
    server.ServeWebSocket(conn)
})

http.ListenAndServe(":8080", nil)
```

## Function: ServeIPC

The `ServeIPC` function is a listener that can be used to serve JSON-RPC requests over IPC. It is a method of the `Server` type and takes one parameter:

- `listener net.Listener`: The `net.Listener` to use for accepting IPC connections.

### Parameters

- `listener net.Listener`: The `net.Listener` to use for accepting IPC connections.

### Return Value

This function does not return any values.

### Example Usage

```go
server := NewServer()
server.RegisterName("myService", &MyService{})

listener, _ := net.Listen("unix", "/tmp/mysocket")
defer listener.Close()

for {
    conn, _ := listener.Accept()
    go server.ServeIPC(conn)
}
```