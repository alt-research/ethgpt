The `tracker` package contains a `Tracker` type that is used to track sent network requests that have not yet received a response. The purpose of the `Tracker` is to measure how much time it takes a remote peer to respond. The `Tracker` is implemented using a map to store pending requests and a linked list to track the expiration order of the requests.

The `Tracker` type has the following methods:

- `New(protocol string, timeout time.Duration) *Tracker`: creates a new `Tracker` instance with the given protocol capability identifier and timeout duration.

- `Track(peer string, version uint, reqCode uint64, resCode uint64, id uint64)`: adds a network request to the tracker to wait for a response to arrive or until the request is cancelled or times out. The `peer` parameter is the identifier of the remote peer, `version` is the protocol version, `reqCode` is the protocol message code of the request, `resCode` is the protocol message code of the expected response, and `id` is the identifier of the request.

- `Untrack(id uint64)`: removes a pending request from the tracker. The `id` parameter is the identifier of the request.

- `Expire()`: removes all expired requests from the tracker.

- `Len() int`: returns the number of pending requests in the tracker.

- `Metrics() []metrics.Metric`: returns a slice of metrics that can be used to monitor the performance of the `Tracker`. The metrics include the number of pending requests, the number of lost requests, the number of stale responses, and the waiting time for requests.

Here is an example usage of the `Tracker`:

```go
package main

import (
	"time"

	"github.com/ethereum/go-ethereum/metrics"
	"github.com/ethereum/go-ethereum/p2p/tracker"
)

func main() {
	// Enable metrics collection
	metrics.Enabled = true

	// Create a new Tracker instance
	t := tracker.New("my-protocol", 10*time.Second)

	// Track a network request
	t.Track("peer-1", 1, 123, 456, 789)

	// Wait for the response to arrive or for the request to time out
	time.Sleep(5 * time.Second)

	// Remove the request from the tracker
	t.Untrack(789)

	// Print the number of pending requests
	println("Pending requests:", t.Len())

	// Print the metrics
	for _, m := range t.Metrics() {
		println(m.Name, m.Value)
	}
}
```

The output of the example program might look like this:

```
Pending requests: 0
p2p/tracked/my-protocol 0
p2p/lost/my-protocol 0
p2p/stale/my-protocol 0
p2p/wait/my-protocol/123 0
``` ## Function: maxTrackedPackets

This function logs an error message and returns if the number of pending requests exceeds the maximum allowed number of tracked packets. It takes in the following parameters:

- `pending`: an integer representing the number of pending requests.
- `peer`: a string representing the peer.
- `protocol`: a string representing the protocol.
- `version`: an integer representing the version.
- `reqCode`: an unsigned integer representing the request code.

Example usage:

```go
maxTrackedPackets(pending, peer, protocol, version, reqCode)
```

## Function: clean

This function is called automatically when a preset time passes without a response being delivered for the first network request. It removes expired requests from the `pending` map and updates the corresponding metrics. It takes no parameters.

Example usage:

```go
clean()
```

## Function: schedule

This function starts a timer to trigger on the expiration of the first network packet. It takes no parameters.

Example usage:

```go
schedule()
```

## Function: Fulfil

This function fills a pending request, if any is available, reporting on various metrics. It takes in the following parameters:

- `peer`: a string representing the peer.
- `version`: an integer representing the version.
- `code`: an unsigned integer representing the response code.
- `id`: an unsigned integer representing the request ID.

Example usage:

```go
Fulfil(peer, version, code, id)
```