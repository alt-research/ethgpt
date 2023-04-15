## Documentation for the Ethereum Codebase

### Package: eth

This package contains the implementation of the Ethereum protocol.

### Function: startBloomHandlers

```go
func (eth *Ethereum) startBloomHandlers(sectionSize uint64)
```

The `startBloomHandlers` function starts a batch of goroutines to accept bloom bit database retrievals from possibly a range of filters and serving the data to satisfy. It takes a `sectionSize` parameter of type `uint64` which is the size of each section of the bloom filter.

This function starts `bloomServiceThreads` number of goroutines to service bloombits lookups for all running filters. It then listens for requests on the `eth.bloomRequests` channel and retrieves the requested bloom bits from the database. The retrieved bloom bits are then decompressed and sent back to the requester through the `request` channel.

The function runs indefinitely until the `eth.closeBloomHandler` channel is closed.

### Constants

```go
const (
	bloomServiceThreads   = 16
	bloomFilterThreads    = 3
	bloomRetrievalBatch   = 16
	bloomRetrievalWait    = time.Duration(0)
)
```

This block of constants defines the number of goroutines used globally by an Ethereum instance to service bloombits lookups for all running filters (`bloomServiceThreads`), the number of goroutines used locally per filter to multiplex requests onto the global servicing goroutines (`bloomFilterThreads`), the maximum number of bloom bit retrievals to service in a single batch (`bloomRetrievalBatch`), and the maximum time to wait for enough bloom bit requests to accumulate request an entire batch (`bloomRetrievalWait`).