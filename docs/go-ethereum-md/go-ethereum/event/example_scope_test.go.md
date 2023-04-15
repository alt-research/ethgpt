# Event Package

The `event` package provides a way to subscribe to and publish events in Go. This package is part of the `go-ethereum` library and is licensed under the GNU Lesser General Public License.

## SubscriptionScope

The `SubscriptionScope` type represents a scope for managing subscriptions. It can be used to control the lifetime of subscriptions.

### Track

```go
func (s *SubscriptionScope) Track(sub event.Subscription) event.Subscription
```

`Track` registers a subscription with the scope. The returned subscription is tied to the lifetime of the scope.

### Close

```go
func (s *SubscriptionScope) Close()
```

`Close` closes all subscriptions registered with the scope.

## Feed

The `Feed` type represents a feed of events. It can be used to publish events to subscribers.

### Send

```go
func (f *Feed) Send(event interface{})
```

`Send` sends an event to all subscribers of the feed.

### Subscribe

```go
func (f *Feed) Subscribe(ch chan<- interface{}) event.Subscription
```

`Subscribe` subscribes to the feed and sends events to the given channel. The returned subscription can be used to unsubscribe from the feed.

## Subscription

The `Subscription` type represents a subscription to a feed. It can be used to unsubscribe from the feed.

### Unsubscribe

```go
func (s *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes from the feed.

### Err

```go
func (s *Subscription) Err() <-chan error
```

`Err` returns a channel that receives errors that occur during subscription.

## Example

The `event_test.go` file contains an example program that demonstrates how to use `SubscriptionScope` to control the lifetime of subscriptions. The program consists of two servers that perform calculations and publish the results to subscribers. The servers are contained in an `App` that exposes them through its API. The `App` also provides a method for subscribing to the results of calculations. Subscriptions created through this method are tied to the lifetime of the `App` because they are registered in the `SubscriptionScope`. The program also includes a subscriber that runs in the background and prints the results of calculations as they are received. The subscriber is shut down when the `App` is stopped.