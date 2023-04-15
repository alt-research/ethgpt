# Event Package

The `event` package provides functionality for subscriptions to real-time events. It includes a `TypeMux` type that dispatches events to registered receivers, and a `TypeMuxSubscription` type that represents a subscription to events of a certain type.

## TypeMuxEvent

The `TypeMuxEvent` type is a time-tagged notification pushed to subscribers. It contains a `Time` field that represents the time the event occurred, and a `Data` field that contains the event data.

## TypeMux

The `TypeMux` type dispatches events to registered receivers. Receivers can be registered to handle events of certain type. Any operation called after the `TypeMux` is stopped will return `ErrMuxClosed`.

### Subscribe

```go
func (mux *TypeMux) Subscribe(types ...interface{}) *TypeMuxSubscription
```

`Subscribe` creates a subscription for events of the given types. The subscription's channel is closed when it is unsubscribed or the `TypeMux` is closed.

### Post

```go
func (mux *TypeMux) Post(ev interface{}) error
```

`Post` sends an event to all receivers registered for the given type. It returns `ErrMuxClosed` if the `TypeMux` has been stopped.

### Stop

```go
func (mux *TypeMux) Stop()
```

`Stop` closes a `TypeMux`. The `TypeMux` can no longer be used. Future `Post` calls will fail with `ErrMuxClosed`. `Stop` blocks until all current deliveries have finished.

## TypeMuxSubscription

The `TypeMuxSubscription` type represents a subscription to events of a certain type.

### Deliver

```go
func (sub *TypeMuxSubscription) Deliver(event *TypeMuxEvent)
```

`Deliver` delivers an event to the subscription's channel.

### CloseWait

```go
func (sub *TypeMuxSubscription) CloseWait()
```

`CloseWait` blocks until the subscription's channel is closed.

### Unsubscribe

```go
func (sub *TypeMuxSubscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription. ## TypeMuxSubscription

`TypeMuxSubscription` is a struct that represents a subscription established through TypeMux. It contains the following fields:

- `mux`: a pointer to the `TypeMux` instance that created the subscription.
- `created`: the time at which the subscription was created.
- `closeMu`: a mutex used to synchronize access to the `closing` and `closed` fields.
- `closing`: a channel used to signal that the subscription is being closed.
- `closed`: a boolean flag indicating whether the subscription has been closed.
- `postMu`: a mutex used to synchronize access to the `readC` and `postC` fields.
- `readC`: a read-only channel used to receive events from the subscription.
- `postC`: a write-only channel used to send events to the subscription.

### newsub

```go
func newsub(mux *TypeMux) *TypeMuxSubscription
```

`newsub` is a function that creates a new `TypeMuxSubscription` instance with the given `mux` instance. It returns a pointer to the new instance.

### Chan

```go
func (s *TypeMuxSubscription) Chan() <-chan *TypeMuxEvent
```

`Chan` is a method that returns the read-only channel used to receive events from the subscription.

### Unsubscribe

```go
func (s *TypeMuxSubscription) Unsubscribe()
```

`Unsubscribe` is a method that removes the subscription from the `TypeMux` instance that created it and signals that the subscription is being closed.

### Closed

```go
func (s *TypeMuxSubscription) Closed() bool
```

`Closed` is a method that returns a boolean flag indicating whether the subscription has been closed.

### closewait

```go
func (s *TypeMuxSubscription) closewait()
```

`closewait` is a method that waits for the subscription to be closed and sets the `closed` flag to true.

### deliver

```go
func (s *TypeMuxSubscription) deliver(event *TypeMuxEvent)
```

`deliver` is a method that delivers an event to the subscription. If the event is stale (i.e., its time is earlier than the time at which the subscription was created), the method does nothing. Otherwise, it sends the event to the subscription's `postC` channel, unless the subscription is being closed, in which case it does nothing. 

### remove

```go
func remove(slice []*TypeMuxSubscription, pos int) []*TypeMuxSubscription
```

`remove` is a function that removes the element at the given position `pos` from the `slice` of `TypeMuxSubscription` instances. It returns a new slice with the removed element.