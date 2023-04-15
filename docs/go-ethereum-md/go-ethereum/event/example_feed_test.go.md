# Event Package

The `event` package provides a simple implementation of the observer pattern for Go. It allows for the creation of event feeds that can be subscribed to by multiple consumers. The package is part of the `go-ethereum` library and is licensed under the GNU Lesser General Public License.

## ExampleFeed_acknowledgedEvents

The `ExampleFeed_acknowledgedEvents` function is an example of how the return value of `Send` can be used for request/reply interaction between event consumers and producers. 

The function creates an event feed and three consumers that wait for events on the feed and acknowledge processing. The producer sends values of type `ackedEvent` with increasing values of `i`. It waits for all consumers to acknowledge before sending the next event.

### Variables

- `feed` - an instance of the `event.Feed` type that represents the event feed.
- `ackedEvent` - a custom type that represents an event with an integer value and an acknowledgement channel.

### Channels

- `done` - a channel that is closed when the function completes.
- `ch` - a channel of `ackedEvent` that is used by the consumers to receive events.
- `acksignal` - a channel of `struct{}` that is used by the producer to wait for acknowledgements.

### Loops

- `for i := 0; i < 3; i++` - a loop that creates three consumers and subscribes them to the event feed.
- `for` - a loop that waits for events on the `ch` channel and processes them. It also waits for the `done` channel to be closed before returning.

### Select

- `case ev := <-ch` - receives an event from the `ch` channel and processes it.
- `case <-done` - returns from the function when the `done` channel is closed.

### Send

- `n := feed.Send(ackedEvent{i, acksignal})` - sends an event to the event feed and waits for all consumers to acknowledge processing before returning the number of acknowledgements received.

### Output

The function outputs the values of `i` for each event processed by the consumers. The output shows that each event is processed by all three consumers before the next event is sent.