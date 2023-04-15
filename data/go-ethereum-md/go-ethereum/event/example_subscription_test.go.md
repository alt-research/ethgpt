# Event Package

The `event` package provides a simple implementation of the observer pattern in Go. It allows you to create subscriptions that can be used to send events to multiple observers.

## NewSubscription

```go
func NewSubscription(producer func(quit <-chan struct{}) error) *Subscription
```

`NewSubscription` creates a new subscription with the given producer function. The producer function is called with a `quit` channel that can be used to signal the producer to stop producing events. The producer function should return an error if it encounters an error while producing events.

## Subscription

The `Subscription` type represents a subscription. It can be created using the `NewSubscription` function.

### Unsubscribe

```go
func (s *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the subscription. It signals the producer to stop producing events and waits for the producer to shut down.

## ExampleNewSubscription

```go
func ExampleNewSubscription()
```

`ExampleNewSubscription` is an example function that demonstrates how to use the `NewSubscription` function to create a subscription that sends 10 integers on a channel. It also demonstrates how to consume the events and unsubscribe from the subscription.

The function creates a channel `ch` and a subscription `sub`. The subscription is created with a producer function that sends 10 integers on the channel. The consumer reads 5 integers from the channel and then unsubscribes from the subscription. The `Unsubscribe` function waits until the producer has shut down before returning.

The function prints the integers that are read from the channel and the message "unsubscribed" when the subscription is unsubscribed.

## License

The `event` package is part of the `go-ethereum` library, which is free software released under the GNU Lesser General Public License. You can redistribute it and/or modify it under the terms of the license. See the [GNU Lesser General Public License](http://www.gnu.org/licenses/lgpl.html) for more details.