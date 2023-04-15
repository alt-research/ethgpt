The `event` package provides a `FeedOf` type that implements one-to-many subscriptions where the carrier of events is a channel. Values sent to a `FeedOf` are delivered to all subscribed channels simultaneously.

The `FeedOf` type has the following fields:
- `once` is a `sync.Once` that ensures that `init` only runs once.
- `sendLock` is a channel that has a one-element buffer and is empty when held. It protects `sendCases`.
- `removeSub` is a channel that interrupts `Send`.
- `sendCases` is the active set of select cases used by `Send`.
- `mu` is a `sync.Mutex` that protects `inbox`.

The `FeedOf` type has the following methods:
- `init` initializes the `FeedOf` type.
- `Subscribe` adds a channel to the feed. Future sends will be delivered on the channel until the subscription is canceled.
- `remove` removes a subscription from the feed.
- `Send` delivers to all subscribed channels simultaneously. It returns the number of subscribers that the value was sent to.

The `FeedOf` type also has a `Subscription` type that represents a subscription to a `FeedOf`. The `Subscription` type has the following fields:
- `feed` is a pointer to the `FeedOf` that the subscription belongs to.
- `channel` is the channel that the subscription is associated with.
- `err` is a channel that is used to signal errors.

The `caseList` type is a slice of `reflect.SelectCase` that is used to store the active set of select cases used by `Send`.

The `firstSubSendCase` constant is the index of the first send case in `sendCases`.

The `find` method of the `caseList` type searches for a channel in the slice and returns its index. If the channel is not found, it returns -1.

The `delete` method of the `caseList` type deletes an element from the slice at the given index and returns the resulting slice.

The `feedOfSub` type is a struct that represents a subscription to a `FeedOf`. It has the following fields:
- `feed` is a pointer to the `FeedOf` that the subscription belongs to.
- `channel` is the channel that the subscription is associated with.
- `err` is a channel that is used to signal errors.

The `Subscription` type has the following methods:
- `Unsubscribe` cancels the subscription. ## Function: (*FeedOf[T]) send

The `send` function is a method of the `FeedOf[T]` type. It sends a value to all subscribers of the feed. It uses a non-blocking send operation to try to send the value to each subscriber. If the send operation succeeds, the subscriber is removed from the list of subscribers. If the send operation fails, the subscriber is added to a list of subscribers waiting to receive the value. The function then waits for all subscribers to receive the value before returning the number of subscribers that received the value.

### Parameters

- None

### Return Value

- `int`: The number of subscribers that received the value.

## Type: feedOfSub[T]

The `feedOfSub[T]` type represents a subscription to a `FeedOf[T]`. It contains a reference to the feed, a channel to receive values, and a channel to receive errors.

### Methods

#### Unsubscribe

The `Unsubscribe` method removes the subscription from the feed and closes the error channel.

##### Parameters

- None

##### Return Value

- None

#### Err

The `Err` method returns the error channel.

##### Parameters

- None

##### Return Value

- `<-chan error>`: The error channel.

## Example Usage

```go
type MyStruct struct {
    Name string
    Age  int
}

feed := NewFeedOf[MyStruct]()
sub := feed.Subscribe()
defer sub.Unsubscribe()

go func() {
    for {
        select {
        case value := <-sub.Channel:
            fmt.Println(value)
        case err := <-sub.Err():
            fmt.Println(err)
            return
        }
    }
}()

feed.Send(MyStruct{Name: "John", Age: 30})
```