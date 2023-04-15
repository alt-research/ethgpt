# RPC Package

The `rpc` package provides a framework for creating and serving JSON-RPC APIs. It includes a server implementation that can register services and methods, and a client implementation that can make requests to a server.

## Functions

### newTestServer

```go
func newTestServer() *Server
```

newTestServer creates a new test server instance with a sequential ID generator and two registered services: `test` and `nftest`.

### sequentialIDGenerator

```go
func sequentialIDGenerator() func() ID
```

sequentialIDGenerator returns a function that generates sequential IDs.

### testService

testService is a struct that implements the `Service` interface. It has several methods that can be registered with a `Server`.

#### NoArgsRets

```go
func (s *testService) NoArgsRets()
```

NoArgsRets is a method that takes no arguments and returns no values.

#### Null

```go
func (s *testService) Null() any
```

Null is a method that returns a `nil` value.

#### Echo

```go
func (s *testService) Echo(str string, i int, args *echoArgs) echoResult
```

Echo is a method that takes a string, an integer, and a pointer to an `echoArgs` struct, and returns an `echoResult` struct.

#### EchoWithCtx

```go
func (s *testService) EchoWithCtx(ctx context.Context, str string, i int, args *echoArgs) echoResult
```

EchoWithCtx is a method that takes a context, a string, an integer, and a pointer to an `echoArgs` struct, and returns an `echoResult` struct.

#### PeerInfo

```go
func (s *testService) PeerInfo(ctx context.Context) PeerInfo
```

PeerInfo is a method that takes a context and returns a `PeerInfo` struct.

#### Sleep

```go
func (s *testService) Sleep(ctx context.Context, duration time.Duration)
```

Sleep is a method that takes a context and a duration, and sleeps for the specified duration.

#### Block

```go
func (s *testService) Block(ctx context.Context) error
```

Block is a method that takes a context and blocks until the context is canceled.

#### Rets

```go
func (s *testService) Rets() (string, error)
```

Rets is a method that returns a string and an error.

#### InvalidRets1

```go
func (s *testService) InvalidRets1() (error, string)
```

InvalidRets1 is a method that returns an error and a string. This is an invalid return signature.

#### InvalidRets2

```go
func (s *testService) InvalidRets2() (string, string)
```

InvalidRets2 is a method that returns two strings. This is an invalid return signature.

#### InvalidRets3

```go
func (s *testService) InvalidRets3() (string, string, error)
```

InvalidRets3 is a method that returns two strings and an error. This is an invalid return signature.

#### ReturnError

```go
func (s *testService) ReturnError() error
```

ReturnError is a method that returns a `testError` struct.

#### MarshalError

```go
func (s *testService) MarshalError() *MarshalErrObj
```

MarshalError is a method that returns a `MarshalErrObj` struct, which cannot be marshaled.

#### Panic

```go
func (s *testService) Panic() string
```

Panic is a method that panics with a message.

#### CallMeBack

```go
func (s *testService) CallMeBack(ctx context.Context, method string, args []interface{}) (interface{}, error)
```

CallMeBack is a method that takes a context, a method name, and a slice of arguments, and calls the method on the client that initiated the request.

#### CallMeBackLater

```go
func (s *testService) Call # Documentation for Source Code

## testService

The `testService` struct represents a test service. It has two methods:

### Echo

```go
func (s *testService) Echo(i int) int
```

Echo returns the integer passed as an argument.

### Subscription

```go
func (s *testService) Subscription(ctx context.Context) (*Subscription, error)
```

Subscription returns a nil subscription and a nil error.

## notificationTestService

The `notificationTestService` struct represents a notification test service. It has four fields:

- `unsubscribed`: a channel of strings used to signal when a subscription has been unsubscribed.
- `gotHangSubscriptionReq`: a channel of empty structs used to signal when a hang subscription request has been received.
- `unblockHangSubscription`: a channel of empty structs used to unblock a hang subscription.

It also has four methods:

### Echo

```go
func (s *notificationTestService) Echo(i int) int
```

Echo returns the integer passed as an argument.

### Unsubscribe

```go
func (s *notificationTestService) Unsubscribe(subid string)
```

Unsubscribe sends the subscription ID to the `unsubscribed` channel.

### SomeSubscription

```go
func (s *notificationTestService) SomeSubscription(ctx context.Context, n, val int) (*Subscription, error)
```

SomeSubscription creates a subscription and sends notifications to it. It returns the subscription and a nil error if notifications are supported, otherwise it returns a nil subscription and an error.

### HangSubscription

```go
func (s *notificationTestService) HangSubscription(ctx context.Context, val int) (*Subscription, error)
```

HangSubscription blocks until `unblockHangSubscription` is closed, then creates a subscription and sends a notification to it. It returns the subscription and a nil error if notifications are supported, otherwise it returns a nil subscription and an error.

## largeRespService

The `largeRespService` struct represents a service that generates arbitrary-size JSON responses. It has one field:

- `length`: an integer representing the length of the response.

It also has one method:

### LargeResp

```go
func (x largeRespService) LargeResp() string
```

LargeResp returns a string of length `x.length` consisting of the character "x".