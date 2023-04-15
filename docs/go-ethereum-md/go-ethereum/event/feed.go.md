# Event Package

The `event` package provides a `Feed` type that implements one-to-many subscriptions where the carrier of events is a channel. Values sent to a `Feed` are delivered to all subscribed channels simultaneously.

## Feed

The `Feed` type represents a one-to-many subscription feed. It can be created using the zero value.

### Subscribe

```go
func (f *Feed) Subscribe(channel interface{}) Subscription
```

`Subscribe` adds a channel to the feed. Future sends will be delivered on the channel until the subscription is canceled. All channels added must have the same element type.

### Subscription

The `Subscription` type represents a subscription to a `Feed`. It can be canceled using the `Unsubscribe` method.

### Unsubscribe

```go
func (s *feedSub) Unsubscribe()
```

`Unsubscribe` cancels the subscription.

## Errors

The `feedTypeError` type represents an error that occurs when a channel of the wrong type is used with a `Feed`. It can be created using the `feedTypeError` function.

### feedTypeError

```go
func (e feedTypeError) Error() string
```

`feedTypeError` returns the error message.

## Testing

The `event_test.go` file contains tests for the `event` package. The tests cover the following functionality:

- Subscribing to a feed
- Sending events to a feed
- Unsubscribing from a feed ## Feed

The `Feed` type represents a publish-subscribe feed. It can be used to send values to multiple subscribers simultaneously.

### face

```go
func (f *Feed) face(ch reflect.Value)
```

`face` removes the given channel from the feed's inbox or sendCases. If the channel is not found in the inbox, it is removed from the sendCases. If the channel is found in the inbox, it is removed from the inbox and the function returns. If the channel is not found in the inbox, it is added to the removeSub channel, which will remove the channel from the sendCases when it is received.

### Send

```go
func (f *Feed) Send(value interface{}) (nsent int)
```

`Send` delivers the given value to all subscribed channels simultaneously. It returns the number of subscribers that the value was sent to. The function first takes the send lock, then adds new cases from the inbox. It then checks if the value's type matches the feed's expected type. If the types do not match, the function panics with a `feedTypeError`. The function then sets the sent value on all channels and sends until all channels except removeSub have been chosen. The function forgets about the sent value and hands off the send lock.

### feedSub

The `feedSub` type represents a subscription to a feed. It can be used to unsubscribe from the feed and receive errors.

### Unsubscribe

```go
func (sub *feedSub) Unsubscribe()
```

`Unsubscribe` removes the subscription from the feed and closes the error channel.

### Err

```go
func (sub *feedSub) Err() <-chan error
```

`Err` returns the error channel for the subscription.

### caseList

The `caseList` type represents a list of `reflect.SelectCase` values. It can be used to find, delete, and deactivate cases.

### find

```go
func (cs caseList) find(channel interface{}) int
```

`find` returns the index of a case containing the given channel.

### delete

```go
func (cs caseList) delete(index int) caseList
```

`delete` removes the given case from the list.

### deactivate

```go
func (cs caseList) deactivate(index int) caseList
```

`deactivate` moves the case at index into the non-accessible portion of the list. ## Function: `addClosingBracket(s string) string`

This function takes a string `s` as input and returns a new string with a closing bracket `]` appended to it. 

### Parameters
- `s` (string): The input string to which the closing bracket will be appended.

### Return Value
- (string): A new string with the closing bracket `]` appended to the input string `s`.

### Example Usage
```go
input := "Hello, world"
output := addClosingBracket(input)
fmt.Println(output) // Output: "Hello, world]"
```

## Code Snippet
```go
func addClosingBracket(s string) string {
    return s + "]"
}
```