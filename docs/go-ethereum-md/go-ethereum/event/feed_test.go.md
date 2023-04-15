The `event` package provides a `Feed` type that can be used to implement a publish-subscribe pattern. The `Feed` type allows subscribers to receive events that are sent by publishers.

The `TestFeedPanics` function tests that the `Feed` type panics when it is used incorrectly. The function tests that the `Send` method panics when it is called with an argument of the wrong type, that the `Subscribe` method panics when it is called with a channel of the wrong type, and that the `Subscribe` method panics when it is called with a non-channel argument.

The `checkPanic` function is a helper function that checks that a function panics with a specific error. The function calls the specified function and checks that it panics with the specified error. If the function does not panic or if it panics with a different error, the function returns an error.

The `TestFeed` function tests the `Feed` type by creating 1000 subscribers and sending an event to the feed. The function creates a subscriber function that subscribes to the feed, waits for an event, and then unsubscribes from the feed. The function creates 1000 goroutines that call the subscriber function. The function then sends an event to the feed and waits for all of the subscribers to receive the event. The function checks that the event was received by all of the subscribers.

The `TestFeedSubscribeSameChannel` function tests that the `Feed` type can handle multiple subscriptions to the same channel. The function creates a feed and subscribes to it three times with the same channel. The function then sends two events to the feed and waits for the channel to receive the events. The function checks that the channel received the events the correct number of times. ## Feed

The `Feed` type represents a publish-subscribe feed. It can be used to send messages to multiple subscribers.

### Subscribe

```go
func (f *Feed) Subscribe(ch chan<- int) Subscription
```

`Subscribe` subscribes a channel to the feed. It returns a `Subscription` that can be used to unsubscribe the channel.

### Send

```go
func (f *Feed) Send(v int) int
```

`Send` sends a value to all subscribers. It returns the number of subscribers that received the value.

## Subscription

The `Subscription` type represents a subscription to a feed. It can be used to unsubscribe a channel.

### Unsubscribe

```go
func (s Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the channel from the feed.

## Testing

The `feed_test.go` file contains tests for the `Feed` type. The tests cover the following functionality:

- Subscribing and unsubscribing channels
- Sending values to subscribers
- Unsubscribing channels during send
- Unsubscribing channels from the inbox
- Benchmarking the `Send` method