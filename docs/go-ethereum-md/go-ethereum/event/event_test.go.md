# Event Package

The `event` package provides a type-safe event multiplexer for Go. It allows for the creation of event subscriptions and the posting of events to those subscriptions.

## TypeMux

The `TypeMux` type represents an event multiplexer. It can be created using the `new` function.

### Subscribe

```go
func (mux *TypeMux) Subscribe(types ...interface{}) *Subscription
```

`Subscribe` creates a new subscription for the given event types. It returns a `Subscription` object that can be used to receive events.

### Post

```go
func (mux *TypeMux) Post(event interface{}) error
```

`Post` posts an event to all subscriptions that are subscribed to the event type. It returns an error if the event multiplexer has been stopped.

### Stop

```go
func (mux *TypeMux) Stop()
```

`Stop` stops the event multiplexer and closes all subscriptions.

## Subscription

The `Subscription` type represents an event subscription. It can be created using the `Subscribe` method of a `TypeMux`.

### Chan

```go
func (sub *Subscription) Chan() <-chan *Event
```

`Chan` returns a channel that can be used to receive events.

### Unsubscribe

```go
func (sub *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription from the event multiplexer.

## Event

The `Event` type represents an event that has been posted to a subscription.

### Type

```go
func (ev *Event) Type() interface{}
```

`Type` returns the type of the event.

### Data

```go
func (ev *Event) Data() interface{}
```

`Data` returns the data of the event.

## Testing

The `event_test.go` file contains tests for the `event` package. The tests cover the following functionality:

- Subscription creation and event posting
- Subscription unsubscription
- Event multiplexer stopping
- Concurrent event posting and subscription
- Duplicate event type subscription
- Benchmarking event posting performance

The tests use the `testEvent` type, which is a simple type that can be used to test event posting and subscription. # TypeMux

The `TypeMux` type is a multiplexer that can be used to route events to subscribers based on their type. It is implemented using a map of subscriber lists, where each subscriber list contains all subscribers that are interested in a particular event type.

## TypeMux

The `TypeMux` type represents a multiplexer. It can be created using the `new(TypeMux)` function.

### Post

```go
func (mux *TypeMux) Post(event interface{})
```

`Post` posts an event to the multiplexer. The event is routed to all subscribers that are interested in its type.

### Subscribe

```go
func (mux *TypeMux) Subscribe(subscriber Subscriber, eventTypes ...interface{})
```

`Subscribe` subscribes a subscriber to the multiplexer. The subscriber will receive events of the specified types.

### Unsubscribe

```go
func (mux *TypeMux) Unsubscribe(subscriber Subscriber, eventTypes ...interface{})
```

`Unsubscribe` unsubscribes a subscriber from the multiplexer. The subscriber will no longer receive events of the specified types.

### Stop

```go
func (mux *TypeMux) Stop()
```

`Stop` stops the multiplexer. All subscribers are unsubscribed, and no more events can be posted.

### Subscriber

The `Subscriber` interface represents a subscriber that can receive events. It has a single method, `Notify`, which is called when an event is posted to the multiplexer.

```go
type Subscriber interface {
	Notify(event interface{})
}
```

## Benchmarks

The `TypeMux` type has been benchmarked against a channel-based implementation of the same functionality. The benchmarks measure the time it takes to post events to the multiplexer or channel.

### BenchmarkPost

```go
func BenchmarkPost(b *testing.B)
```

`BenchmarkPost` benchmarks the time it takes to post events to the multiplexer. It creates a single subscriber for each event type, and posts `b.N` events of each type.

### BenchmarkPostConcurrent

```go
func BenchmarkPostConcurrent(b *testing.B)
```

`BenchmarkPostConcurrent` benchmarks the time it takes to post events to the multiplexer concurrently. It creates five subscribers for each event type, and posts `b.N` events of each type concurrently.

### BenchmarkChanSend

```go
func BenchmarkChanSend(b *testing.B)
```

`BenchmarkChanSend` benchmarks the time it takes to send events to a channel. It creates a channel and a goroutine that reads from the channel, and sends `b.N` events to the channel.