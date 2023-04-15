# Event Package

The `event` package provides a way to create and manage subscriptions to event streams. The package includes a `Subscription` interface, which represents a stream of events, and a `NewSubscription` function, which runs a producer function as a subscription in a new goroutine.

## Subscription

The `Subscription` interface represents a stream of events. The carrier of the events is typically a channel, but isn't part of the interface.

### Err

```go
Err() <-chan error
```

`Err` returns the error channel. Subscriptions can fail while established. Failures are reported through an error channel. It receives a value if there is an issue with the subscription (e.g. the network connection delivering the events has been closed). Only one value will ever be sent.

### Unsubscribe

```go
Unsubscribe()
```

`Unsubscribe` cancels the sending of events. You must call `Unsubscribe` in all cases to ensure that resources related to the subscription are released. It can be called any number of times.

## NewSubscription

```go
NewSubscription(producer func(<-chan struct{}) error) Subscription
```

`NewSubscription` runs a producer function as a subscription in a new goroutine. The channel given to the producer is closed when `Unsubscribe` is called. If `fn` returns an error, it is sent on the subscription's error channel.

## Resubscribe

```go
Resubscribe(backoffMax time.Duration, fn ResubscribeFunc) Subscription
```

`Resubscribe` calls `fn` repeatedly to keep a subscription established. When the subscription is established, `Resubscribe` waits for it to fail and calls `fn` again. This process repeats until `Unsubscribe` is called or the active subscription ends successfully.

`Resubscribe` applies backoff between calls to `fn`. The time between calls is adapted based on the error rate, but will never exceed `backoffMax`.

## ResubscribeFunc

```go
type ResubscribeFunc func(context.Context) (Subscription, error)
```

`ResubscribeFunc` attempts to establish a subscription.

## funcSub

`funcSub` is a struct that implements the `Subscription` interface. It is used by the `NewSubscription` function to create a new subscription.

### Unsubscribe

```go
Unsubscribe()
```

`Unsubscribe` cancels the sending of events, closing the error channel.

### Err

```go
Err() <-chan error
```

`Err` returns the error channel. # ResubscribeErr

The `ResubscribeErr` function creates a new subscription that attempts to establish a subscription using the provided `ResubscribeErrFunc`. If the subscription fails, `ResubscribeErr` applies backoff between calls to the `ResubscribeErrFunc`. The time between calls is adapted based on the error rate, but will never exceed `backoffMax`.

## Parameters

- `backoffMax time.Duration`: The maximum backoff time.
- `fn ResubscribeErrFunc`: A function that attempts to establish a subscription. For every call but the first, the second argument to this function is the error that occurred with the previous subscription.

## Return Value

`ResubscribeErr` returns a `Subscription` that repeats until `Unsubscribe` is called or the active subscription ends successfully.

## Example

```go
func subscribe(ctx context.Context, lastErr error) (Subscription, error) {
    // Attempt to establish a subscription.
}

sub := ResubscribeErr(10*time.Second, subscribe)
```

# ResubscribeErrFunc

The `ResubscribeErrFunc` type represents a function that attempts to establish a subscription. For every call but the first, the second argument to this function is the error that occurred with the previous subscription.

## Parameters

- `ctx context.Context`: The context for the subscription.
- `lastErr error`: The error that occurred with the previous subscription.

## Return Value

`ResubscribeErrFunc` returns a `Subscription` and an error.

# Subscription

The `Subscription` type represents a subscription. It can be created using the `ResubscribeErr` function.

## Methods

### Unsubscribe

```go
func (s *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription.

### Err

```go
func (s *Subscription) Err() <-chan error
```

`Err` returns a channel that receives errors from the subscription.

# SubscriptionScope

The `SubscriptionScope` type provides a facility to unsubscribe multiple subscriptions at once.

## Methods

### Track

```go
func (sc *SubscriptionScope) Track(s Subscription) Subscription
```

`Track` starts tracking a subscription. If the scope is closed, `Track` returns nil. The returned subscription is a wrapper. Unsubscribing the wrapper removes it from the scope.

## Example

```go
scope := &SubscriptionScope{}
sub1 := ResubscribeErr(10*time.Second, subscribe1)
sub2 := ResubscribeErr(10*time.Second, subscribe2)
sub3 := ResubscribeErr(10*time.Second, subscribe3)
sub1 = scope.Track(sub1)
sub2 = scope.Track(sub2)
sub3 = scope.Track(sub3)
// ...
scope.Close()
``` # SubscriptionScope

The `SubscriptionScope` type represents a scope for tracking subscriptions. It can be used to keep track of multiple subscriptions and unsubscribe from them all at once. The `SubscriptionScope` type has the following methods:

## Track

```go
func (sc *SubscriptionScope) Track(s Subscription) Subscription
```

`Track` adds a subscription to the tracked set. The subscription will be automatically unsubscribed when the scope is closed. The method returns a new subscription that can be used instead of the original subscription. The new subscription will automatically unsubscribe when the scope is closed.

## Close

```go
func (sc *SubscriptionScope) Close()
```

`Close` calls `Unsubscribe` on all tracked subscriptions and prevents further additions to the tracked set. Calls to `Track` after `Close` return `nil`.

## Count

```go
func (sc *SubscriptionScope) Count() int
```

`Count` returns the number of tracked subscriptions. It is meant to be used for debugging.

# scopeSub

The `scopeSub` type represents a subscription that is tracked by a `SubscriptionScope`. It has the following methods:

## Unsubscribe

```go
func (s *scopeSub) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription from the underlying service and removes it from the tracked set.

## Err

```go
func (s *scopeSub) Err() <-chan error
```

`Err` returns a channel that will receive any errors that occur while processing the subscription.