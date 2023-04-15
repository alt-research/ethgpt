# Event Package

The `event` package provides a simple event system for Go programs. It allows for the creation of event types, subscription to events, and posting of events.

## TypeMux

The `TypeMux` type represents an event multiplexer. It can be created using the `NewTypeMux` function.

### NewTypeMux

```go
func NewTypeMux() *TypeMux
```

`NewTypeMux` creates a new `TypeMux`.

### Subscribe

```go
func (mux *TypeMux) Subscribe(types ...interface{}) *Subscription
```

`Subscribe` subscribes to one or more event types. It returns a `Subscription` that can be used to receive events of the subscribed types.

### Post

```go
func (mux *TypeMux) Post(event interface{})
```

`Post` posts an event to the multiplexer. The event will be sent to all subscribers that have subscribed to the event type.

### Stop

```go
func (mux *TypeMux) Stop()
```

`Stop` stops the multiplexer and closes all subscription channels.

## Subscription

The `Subscription` type represents a subscription to one or more event types. It can be created using the `TypeMux.Subscribe` method.

### Chan

```go
func (sub *Subscription) Chan() <-chan *Event
```

`Chan` returns a channel that can be used to receive events of the subscribed types.

## Event

The `Event` type represents an event that has been posted to a `TypeMux`. It contains the event data and the type of the event.

### Type

```go
func (event *Event) Type() reflect.Type
```

`Type` returns the type of the event.

### Data

```go
func (event *Event) Data() interface{}
```

`Data` returns the data of the event.

## Example

The `ExampleTypeMux` function provides an example of how to use the `TypeMux` type to subscribe to events and receive them. It creates a `TypeMux`, subscribes to some event types, posts some events, and then stops the `TypeMux`. The example function prints the received events to the console.