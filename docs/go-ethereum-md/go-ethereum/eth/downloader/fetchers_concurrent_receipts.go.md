# Receipt Queue

The `receiptQueue` type is an adapter between the generic concurrent fetcher and the downloader. It implements the `typedQueue` interface and is responsible for handling receipt fetches.

## Functions

### `waker`

```go
func (q *receiptQueue) waker() chan bool
```

Returns a notification channel that gets pinged in case more receipt fetches have been queued up, so the fetcher might assign it to idle peers.

### `pending`

```go
func (q *receiptQueue) pending() int
```

Returns the number of receipts that are currently queued for fetching by the concurrent downloader.

### `capacity`

```go
func (q *receiptQueue) capacity(peer *peerConnection, rtt time.Duration) int
```

Calculates how many receipts a particular peer is estimated to be able to retrieve within the allotted round trip time.

### `updateCapacity`

```go
func (q *receiptQueue) updateCapacity(peer *peerConnection, items int, span time.Duration)
```

Updates how many receipts a particular peer is estimated to be able to retrieve in a unit time.

### `reserve`

```go
func (q *receiptQueue) reserve(peer *peerConnection, items int) (*fetchRequest, bool, bool)
```

Allocates a requested number of pending receipts from the download queue to the specified peer.

### `unreserve`

```go
func (q *receiptQueue) unreserve(peer string) int
```

Removes the current receipt retrieval allocation assigned to a specific peer and places it back into the pool to allow reassigning to some other peer.

### `request`

```go
func (q *receiptQueue) request(peer *peerConnection, req *fetchRequest, resCh chan *eth.Response) (*eth.Request, error)
```

Converts a generic fetch request into a receipt one and sends it to the remote peer for fulfillment.

### `deliver`

```go
func (q *receiptQueue) deliver(peer *peerConnection, packet *eth.Response) (int, error)
```

Takes a generic response packet from the concurrent fetcher, unpacks the receipt data, and delivers it to the downloader's queue. ## Function: `handleReceiptsPacket(packet *eth.Packet, q *fetcher.Queue, peer *peerConnection) (int, error)`

This function handles the receipt packets received from a peer. It extracts the receipt hashes and receipts from the packet and delivers them to the fetcher queue. It then logs the delivery status and returns the number of accepted receipts and any error encountered during the delivery process.

### Parameters:
- `packet *eth.Packet`: The receipt packet received from the peer.
- `q *fetcher.Queue`: The fetcher queue to which the receipts are delivered.
- `peer *peerConnection`: The peer from which the receipt packet was received.

### Return values:
- `int`: The number of accepted receipts.
- `error`: Any error encountered during the delivery process.

### Example usage:
```go
packet := &eth.Packet{
    Type: eth.ReceiptsMsg,
    Data: []byte{...},
    Meta: []common.Hash{...},
}
q := fetcher.NewQueue(...)
peer := &peerConnection{...}
accepted, err := handleReceiptsPacket(packet, q, peer)
```

### Explanation:
The `handleReceiptsPacket` function is responsible for handling the receipt packets received from a peer. It first extracts the receipt hashes and receipts from the packet. The receipt hashes are stored in the `Meta` field of the packet, while the receipts themselves are stored in the `Data` field.

The function then delivers the receipts and hashes to the fetcher queue using the `DeliverReceipts` method of the queue. The `DeliverReceipts` method takes the peer ID, receipts, and hashes as parameters and returns the number of accepted receipts and any error encountered during the delivery process.

After delivering the receipts to the queue, the function logs the delivery status. If there were no errors and the length of the receipts is zero, it logs that the requested receipts were delivered. If there were no errors and the length of the receipts is non-zero, it logs that a new batch of receipts was delivered along with the count of receipts delivered and the number of receipts accepted by the queue. If there was an error during the delivery process, it logs the error.

Finally, the function returns the number of accepted receipts and any error encountered during the delivery process.