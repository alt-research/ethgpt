## RPC Package Documentation

This package provides a framework for implementing Remote Procedure Call (RPC) servers and clients in Go. It includes support for subscriptions and notifications.

### ID

The `ID` type is a pseudo-random number used to identify RPC subscriptions. The `NewID()` function generates a new, random ID.

### randomIDGenerator

The `randomIDGenerator()` function returns a function that generates random IDs. It uses a cryptographically secure random number generator to seed a pseudo-random number generator.

### encodeID

The `encodeID()` function encodes a byte slice as a hexadecimal string and returns it as an `ID`. It removes leading zeros and adds a "0x" prefix.

### Notifier

The `Notifier` type is tied to an RPC connection that supports subscriptions. It is used by server callbacks to send notifications to clients. It includes a mutex to protect against concurrent access.

#### CreateSubscription

The `CreateSubscription()` method creates a new subscription that is coupled to the RPC connection. By default, subscriptions are inactive and notifications are dropped until the subscription is marked as active. This is done by the RPC server after the subscription ID is sent to the client.

#### Notify

The `Notify()` method sends a notification to the client with the given data as payload. If an error occurs, the RPC connection is closed and the error is returned.

### NotifierFromContext

The `NotifierFromContext()` function returns the `Notifier` value stored in a context, if any.

### Subscription

The `Subscription` type represents an RPC subscription. It includes an ID, a namespace, and a channel for errors.

### ErrNotificationsUnsupported

The `ErrNotificationsUnsupported` error is returned when the connection doesn't support notifications.

### ErrSubscriptionNotFound

The `ErrSubscriptionNotFound` error is returned when the notification for the given ID is not found. ## Notifier

The `Notifier` type is used to send notifications to a client that has subscribed to a particular event. It has the following methods:

### `Closed() <-chan interface{}`
This method returns a channel that is closed when the RPC connection is closed. It is deprecated and should be replaced with the subscription error channel.

### `takeSubscription() *Subscription`
This method returns the subscription (if one has been created). No subscription can be created after this call.

### `activate() error`
This method is called after the subscription ID was sent to the client. Notifications are buffered before activation. This prevents notifications being sent to the client before the subscription ID is sent to the client.

### `send(sub *Subscription, data json.RawMessage) error`
This method sends the notification to the client. It takes a `Subscription` object and the data to be sent as parameters.

## Subscription

The `Subscription` type is created by a notifier and tied to that notifier. The client can use this subscription to wait for an unsubscribe request for the client. It has the following methods:

### `Err() <-chan error`
This method returns a channel that is closed when the client sends an unsubscribe request.

### `MarshalJSON() ([]byte, error)`
This method marshals a subscription as its ID.

## ClientSubscription

The `ClientSubscription` type is a subscription established through the Client's Subscribe or EthSubscribe methods. It has the following methods:

### `Err() chan error`
This method returns the subscription error channel. The intended use of Err is to schedule resubscription when the client connection is closed unexpectedly.

### `newClientSubscription(c *Client, namespace string, channel reflect.Value) *ClientSubscription`
This method creates a new `ClientSubscription` object. It takes a `Client` object, a namespace string, and a reflect.Value object as parameters.

### `Unsubscribe() error`
This method unsubscribes the client from the subscription.

### `forward()`
This method forwards the notifications to the client.

### `handleError(err error)`
This method handles the error that occurred during the subscription.

### `handleNotification(notification json.RawMessage)`
This method handles the notification received from the server.

### `handleUnsubscribe()`
This method handles the unsubscribe request from the client. # ClientSubscription Source Code Documentation

The `ClientSubscription` struct represents a subscription to a JSON-RPC notification. It is used by the `Client` struct to manage subscriptions and forward notifications to the appropriate channels.

## Functions

### Err

```go
func (sub *ClientSubscription) Err() <-chan error
```

`Err` returns a channel that receives any errors that occur during the subscription. The channel is closed when `Unsubscribe` is called on the subscription.

### Unsubscribe

```go
func (sub *ClientSubscription) Unsubscribe()
```

`Unsubscribe` unsubscribes the notification and closes the error channel. It can safely be called more than once.

### deliver

```go
func (sub *ClientSubscription) deliver(result json.RawMessage) (ok bool)
```

`deliver` is called by the client's message dispatcher to send a notification value.

### close

```go
func (sub *ClientSubscription) close(err error)
```

`close` is called by the client's message dispatcher when the connection is closed.

### run

```go
func (sub *ClientSubscription) run()
```

`run` is the forwarding loop of the subscription. It runs in its own goroutine and is launched by the client's handler after the subscription has been created.

### forward

```go
func (sub *ClientSubscription) forward() (unsubscribeServer bool, err error)
```

`forward` is the forwarding loop. It takes in RPC notifications and sends them on the subscription channel.

### unmarshal

```go
func (sub *ClientSubscription) unmarshal(result json.RawMessage) (interface{}, error)
```

`unmarshal` unmarshals a JSON-RPC notification into the appropriate type.

### requestUnsubscribe

```go
func (sub *ClientSubscription) requestUnsubscribe() error
```

`requestUnsubscribe` sends an unsubscribe request to the server.