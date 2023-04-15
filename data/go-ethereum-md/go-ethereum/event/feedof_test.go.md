# Event Package

The `event` package provides a simple implementation of an event feed that can be used to broadcast events to multiple subscribers. The package contains the following functions:

## TestFeedOf

```go
func TestFeedOf(t *testing.T)
```

`TestFeedOf` is a test function that tests the `FeedOf` type. It creates a `FeedOf` object and subscribes multiple goroutines to it. The function then sends a value to the feed and verifies that all subscribers receive the value. The function also tests that unsubscribing from the feed works correctly.

## TestFeedOfSubscribeSameChannel

```go
func TestFeedOfSubscribeSameChannel(t *testing.T)
```

`TestFeedOfSubscribeSameChannel` is a test function that tests subscribing to the same channel multiple times. It creates a `FeedOf` object and subscribes three subscriptions to the same channel. The function then sends values to the feed and verifies that all subscribers receive the correct number of values. The function also tests that unsubscribing from the feed works correctly.

## TestFeedOfSubscribeBlockedPost

```go
func TestFeedOfSubscribeBlockedPost(t *testing.T)
```

`TestFeedOfSubscribeBlockedPost` is a test function that tests subscribing to a channel that is blocked. It creates a `FeedOf` object and subscribes one subscription to a channel. The function then sends a large number of values to the feed and verifies that the subscription can still receive values. The function also tests that unsubscribing from the feed works correctly.

## TestFeedOfUnsubscribeBlockedPost

```go
func TestFeedOfUnsubscribeBlockedPost(t *testing.T)
```

`TestFeedOfUnsubscribeBlockedPost` is a test function that tests unsubscribing from a channel that is blocked. It creates a `FeedOf` object and subscribes multiple subscriptions to different channels. The function then sends a large number of values to the feed and verifies that all subscriptions can receive values. The function also tests that unsubscribing from the feed works correctly.

The `FeedOf` type represents an event feed that can be used to broadcast events to multiple subscribers. The type is defined as follows:

```go
type FeedOf[T any] struct {
    subs []subscription[T]
    mu   sync.RWMutex
}
```

The `FeedOf` type contains a slice of subscriptions and a mutex to protect the slice.

The `subscription` type represents a subscription to an event feed. The type is defined as follows:

```go
type subscription[T any] struct {
    ch  chan T
    err chan error
}
```

The `subscription` type contains a channel for receiving events and a channel for receiving errors.

The `Subscribe` method subscribes to the event feed and returns a subscription. The method is defined as follows:

```go
func (f *FeedOf[T]) Subscribe(ch chan T) Subscription
```

The `Subscribe` method takes a channel as a parameter and returns a subscription. The method adds the subscription to the `subs` slice and returns it.

The `Send` method sends an event to all subscribers of the event feed. The method is defined as follows:

```go
func (f *FeedOf[T]) Send(event T) int
```

The `Send` method takes an event as a parameter and sends it to all subscribers of the event feed. The method returns the number of subscribers that received the event.

The `Unsubscribe` method unsubscribes from the event feed. The method is defined as follows:

```go
func (s Subscription) Unsubscribe()
```

The `Unsubscribe` method unsubscribes from the event feed by closing the event channel and removing the subscription from the `subs` slice.

The `Err` method returns the error channel of the subscription. The method is defined as follows:

```go
func (s Subscription) Err() <-chan error
```

The `Err` method returns the error channel of the subscription. The channel is used to receive errors that occur while sending events to the subscription. # FeedOf Package

The `FeedOf` package provides a publish-subscribe mechanism for channels. It allows multiple channels to subscribe to a single feed, and for the feed to send messages to all subscribed channels.

## FeedOf

The `FeedOf` type represents a feed of channels. It can be created using the `NewFeedOf` function.

### NewFeedOf

```go
func NewFeedOf[T any]() *FeedOf[T]
```

`NewFeedOf` creates a new `FeedOf` of type `T`.

### Subscribe

```go
func (f *FeedOf[T]) Subscribe(ch <-chan T) *Subscription
```

`Subscribe` subscribes a channel to the feed. It returns a `Subscription` that can be used to unsubscribe the channel.

### Send

```go
func (f *FeedOf[T]) Send(value T) int
```

`Send` sends a value to all subscribed channels. It returns the number of channels that received the value.

## Subscription

The `Subscription` type represents a subscription to a feed. It can be created using the `Subscribe` method of a `FeedOf`.

### Unsubscribe

```go
func (s *Subscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the channel from the feed.

## Testing

The `feed_test.go` file contains tests for the `FeedOf` package. The tests cover the following functionality:

- Subscribing and unsubscribing channels
- Sending values to subscribed channels
- Unsubscribing channels during send
- Unsubscribing channels from the inbox

The tests use the `sync.WaitGroup` type to synchronize the sending and receiving of values on channels. The `BenchmarkFeedOfSend1000` benchmark measures the performance of sending values to 1000 subscribed channels.