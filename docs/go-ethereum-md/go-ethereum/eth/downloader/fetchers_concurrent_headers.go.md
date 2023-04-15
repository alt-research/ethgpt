# Header Queue

The `headerQueue` type is an adapter between the generic concurrent fetcher and the downloader. It implements the `typedQueue` interface and is responsible for handling header fetches.

## Functions

### `waker`

```go
func (q *headerQueue) waker() chan bool
```

Returns a notification channel that gets pinged in case more header fetches have been queued up, so the fetcher might assign it to idle peers.

### `pending`

```go
func (q *headerQueue) pending() int
```

Returns the number of headers that are currently queued for fetching by the concurrent downloader.

### `capacity`

```go
func (q *headerQueue) capacity(peer *peerConnection, rtt time.Duration) int
```

Calculates how many headers a particular peer is estimated to be able to retrieve within the allotted round trip time.

### `updateCapacity`

```go
func (q *headerQueue) updateCapacity(peer *peerConnection, items int, span time.Duration)
```

Updates how many headers a particular peer is estimated to be able to retrieve in a unit time.

### `reserve`

```go
func (q *headerQueue) reserve(peer *peerConnection, items int) (*fetchRequest, bool, bool)
```

Allocates a requested number of pending headers from the download queue to the specified peer.

### `unreserve`

```go
func (q *headerQueue) unreserve(peer string) int
```

Removes the current header retrieval allocation assigned to a specific peer and places it back into the pool to allow reassigning to some other peer.

### `request`

```go
func (q *headerQueue) request(peer *peerConnection, req *fetchRequest, resCh chan *eth.Response) (*eth.Request, error)
```

Converts a generic fetch request into a header one and sends it to the remote peer for fulfillment.

### `deliver`

```go
func (q *headerQueue) deliver(peer *peerConnection, packet *eth.Response) (int, error)
```

Takes a generic response packet from the concurrent fetcher, unpacks the header data, and delivers it to the downloader's queue. ## Function: `deliverHeaders`

This function is responsible for delivering a batch of headers to the peer. It takes in a slice of headers and a peer object as input parameters. It returns the number of headers that were accepted by the peer and any error that occurred during the delivery process.

The function first checks if the peer is currently syncing headers. If it is, the headers are added to the peer's header queue. If not, the headers are sent to the peer using the `Send` method of the peer object.

If the headers are successfully sent to the peer, the function logs the number of headers delivered and the number of headers that were accepted by the peer. If there was an error during the delivery process, the function logs the error.

The `deliverHeaders` function is called by the `fetchHeaders` function when a batch of headers is retrieved from the network.