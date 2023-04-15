This is a Go package for the Ethereum blockchain downloader. The package contains the active peer-set of the downloader, maintaining both failures as well as reputation metrics to prioritize the block retrievals. The package includes a peerConnection struct that represents an active peer from which hashes and blocks are retrieved. The struct contains various fields such as the peer's unique identifier, activity state, time instance when the last fetch was started, and a tracker to hone in on the number of items retrievable per second. The package also includes LightPeer and Peer interfaces that encapsulate the methods required to synchronize with a remote light peer and a remote full peer, respectively. 

The peerConnection struct has the following fields:
- id: Unique identifier of the peer
- headerIdle: Current header activity state of the peer (idle = 0, active = 1)
- blockIdle: Current block activity state of the peer (idle = 0, active = 1)
- receiptIdle: Current receipt activity state of the peer (idle = 0, active = 1)
- stateIdle: Current node data activity state of the peer (idle = 0, active = 1)
- headerStarted: Time instance when the last header fetch was started
- blockStarted: Time instance when the last block (body) fetch was started
- receiptStarted: Time instance when the last receipt fetch was started
- stateStarted: Time instance when the last node data fetch was started
- rates: Tracker to hone in on the number of items retrievable per second
- lacking: Set of hashes not to request (didn't have previously)
- peer: Peer interface that encapsulates the methods required to synchronize with a remote full peer
- version: Eth protocol version number to switch strategies
- log: Contextual logger to add extra infos to peer logs
- lock: RWMutex to synchronize access to the struct's fields

The LightPeer interface has the following methods:
- Head(): Returns the current head block hash and number
- RequestHeadersByHash(common.Hash, int, int, bool): Requests headers starting from the given hash
- RequestHeadersByNumber(uint64, int, int, bool): Requests headers starting from the given block number

The Peer interface extends the LightPeer interface and adds the following methods:
- RequestBodies([]common.Hash): Requests block bodies for the given block hashes
- RequestReceipts([]common.Hash): Requests receipts for the given transaction hashes
- RequestNodeData([]common.Hash): Requests node data for the given trie node hashes

The package also includes some errors that can be returned by the functions:
- errAlreadyFetching: Returned when blocks are already being fetched from a peer
- errAlreadyRegistered: Returned when a peer is already registered
- errNotRegistered: Returned when a peer is not registered

Example usage:
```
import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/p2p/msgrate"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/eth/protocols/eth"
	"github.com/ethereum/go-ethereum/event"
	"github.com/ethereum/go-ethereum/downloader"
)

func main() {
	// Create a new downloader
	d := downloader.NewDownloader()

	// Register a new peer
	peer := &eth.Peer{}
	d.RegisterPeer(peer)

	// Request headers from the peer
	hash := common.HexToHash("0x1234567890abcdef")
	d.RequestHeadersByHash(peer, hash, 10, 0, false)

	// Wait for headers to be received
	headersCh := make(chan *eth.Header, 10)
	sub := d.SubscribeHeadersEvent(headersCh)
	defer sub.Unsubscribe()
	for i := 0; i < 10; i++ {
		header := <-headersCh
		// Do something with the header
	}

	// Request block bodies for the received headers
	hashes := make([]common.Hash, 10)
	for i, header := range headers {
		hashes[i] = header.Hash()
	}
	d.RequestBodies(peer, hashes)

	// Wait for block bodies to be received
	bodiesCh := make(chan *eth.BlockBody, 10)
	sub := d.SubscribeBodiesEvent(bodiesCh)
	defer sub.Unsubscribe()
	for i := 0; i < 10; i++ {
		body := <-bodiesCh
		// Do something with the block body
	}
}
``` ## Documentation for Source Code

### Function: fetcher.RequestHeadersByNumber

```go
func (f *fetcher) RequestHeadersByNumber(i uint64, amount int, skip int, reverse bool) error {
	return f.peer.RequestHeadersByNumber(i, amount, skip, reverse)
}
```

This function sends a header retrieval request to the remote peer. It calls the `RequestHeadersByNumber` function of the peer to request headers by number.

### Function: lightPeerWrapper.RequestBodies

```go
func (w *lightPeerWrapper) RequestBodies([]common.Hash) error {
	panic("RequestBodies not supported in light client mode sync")
}
```

This function is not supported in light client mode sync. It panics when called.

### Function: lightPeerWrapper.RequestReceipts

```go
func (w *lightPeerWrapper) RequestReceipts([]common.Hash) error {
	panic("RequestReceipts not supported in light client mode sync")
}
```

This function is not supported in light client mode sync. It panics when called.

### Function: lightPeerWrapper.RequestNodeData

```go
func (w *lightPeerWrapper) RequestNodeData([]common.Hash) error {
	panic("RequestNodeData not supported in light client mode sync")
}
```

This function is not supported in light client mode sync. It panics when called.

### Function: newPeerConnection

```go
func newPeerConnection(id string, version uint, peer Peer, logger log.Logger) *peerConnection {
	return &peerConnection{
		id:      id,
		lacking: make(map[common.Hash]struct{}),
		peer:    peer,
		version: version,
		log:     logger,
	}
}
```

This function creates a new downloader peer connection. It takes an ID string, a version number, a peer, and a logger as input parameters. It returns a pointer to a new `peerConnection` object.

### Function: peerConnection.Reset

```go
func (p *peerConnection) Reset() {
	p.lock.Lock()
	defer p.lock.Unlock()

	atomic.StoreInt32(&p.headerIdle, 0)
	atomic.StoreInt32(&p.blockIdle, 0)
	atomic.StoreInt32(&p.receiptIdle, 0)
	atomic.StoreInt32(&p.stateIdle, 0)

	p.lacking = make(map[common.Hash]struct{})
}
```

This function clears the internal state of a peer entity. It sets the headerIdle, blockIdle, receiptIdle, and stateIdle to 0. It also clears the lacking map.

### Function: peerConnection.FetchHeaders

```go
func (p *peerConnection) FetchHeaders(from uint64, count int) error {
	// Short circuit if the peer is already fetching
	if !atomic.CompareAndSwapInt32(&p.headerIdle, 0, 1) {
		return errAlreadyFetching
	}
	p.headerStarted = time.Now()

	// Issue the header retrieval request (absolute upwards without gaps)
	go p.peer.RequestHeadersByNumber(from, count, 0, false)

	return nil
}
```

This function sends a header retrieval request to the remote peer. It sets the headerIdle to 1 if it is 0. It then calls the `RequestHeadersByNumber` function of the peer to request headers by number.

### Function: peerConnection.FetchBodies

```go
func (p *peerConnection) FetchBodies(request *fetchRequest) error {
	// Short circuit if the peer is already fetching
	if !atomic.CompareAndSwapInt32(&p.blockIdle, 0, 1) {
		return errAlreadyFetching
	}
	p.blockStarted = time.Now()

	go func() {
		// Convert the header set to a retrievable slice
		hashes := make([]common.Hash, 0, len(request.Headers))
		for _, header := range request.Headers {
			hashes = append(hashes, header.Hash())
		}
		p.peer.RequestBodies(hashes)
	}()

	return nil
}
```

This function sends a block body retrieval request to the remote peer. It sets the blockIdle to 1 if it is 0. It then calls the `RequestBodies` function of the peer to request block bodies.

### Function: peerConnection.FetchReceipts

```go
func (p *peerConnection) FetchReceipts(request *fetchRequest) error {
	// Short circuit if the peer is already fetching
	if !atomic.CompareAndSwapInt32(&p.receiptIdle, 0, 1) {
		return errAlreadyFetching
	}
	p.receiptStarted = time.Now()

	go func() {
		// Convert the header set to a retrievable slice
		hashes := make([]common.Hash, 0, len(request.Headers))
		for _, header := range request.Headers {
			hashes = append(hashes, header.Hash())
		}
		p.peer.RequestReceipts(hashes)
	}()

	return nil
}
```

This function sends a receipt retrieval request to the remote peer. It sets the receiptIdle to 1 if it is 0. It then calls the `RequestReceipts` function of the peer to request receipts.

### Function: peerConnection.FetchNodeData

```go
func (p *peerConnection) FetchNodeData(hashes []common.Hash) error {
	// Short circuit if the peer is already fetching
	if !atomic.CompareAndSwapInt32(&p.stateIdle, 0, 1) {
		return errAlreadyFetching
	}
	p.stateStarted = time.Now()

	go p.peer.RequestNodeData(hashes)

	return nil
}
```

This function sends a node state data retrieval request to the remote peer. It sets the stateIdle to 1 if it is 0. It then calls the `RequestNodeData` function of the peer to request node state data.

### Function: peerConnection.SetHeadersIdle

```go
func (p *peerConnection) SetHeadersIdle(delivered int, deliveryTime time.Time) {
	p.rates.Update(eth.BlockHeadersMsg, deliveryTime.Sub(p.headerStarted), delivered)
	atomic.StoreInt32(&p.headerIdle, 0)
}
```

This function sets the peer to idle, allowing it to execute new header retrieval requests. It updates its estimated header retrieval throughput with that measured just now. It sets the headerIdle to 0.

### Function: peerConnection.SetBodiesIdle

```go
func (p *peerConnection) SetBodiesIdle(delivered int, deliveryTime time.Time) {
	p.rates.Update(eth.BlockBodiesMsg, deliveryTime.Sub(p.blockStarted), delivered)
	atomic.StoreInt32(&p.blockIdle, 0)
}
```

This function sets the peer to idle, allowing it to execute new block body retrieval requests. It updates its estimated body retrieval throughput with that measured just now. It sets the blockIdle to 0. The provided code is a part of the Ethereum Go implementation and is responsible for managing the peer connections and their data transfer rates during the blockchain synchronization process. The code contains several functions that are used to update the peer's data transfer rates and capacities, mark the missing blockchain items, and check if a peer lacks a specific blockchain item.

The `SetBlockIdle`, `SetReceiptsIdle`, and `SetNodeDataIdle` functions are used to update the peer's data transfer rates for block bodies, receipts, and state trie data, respectively. These functions take the number of delivered items and the time it took to deliver them as input parameters. The `rates.Update` function is used to update the peer's data transfer rate based on the input parameters, and the `atomic.StoreInt32` function is used to set the peer's idle state to false.

The `HeaderCapacity`, `BlockCapacity`, `ReceiptCapacity`, and `NodeDataCapacity` functions are used to retrieve the peer's download allowance for block headers, block bodies, receipts, and state trie data, respectively. These functions take the target round-trip time (RTT) as an input parameter and return the download allowance based on the previously discovered throughput. The `rates.Capacity` function is used to calculate the download allowance, and the `MaxHeaderFetch`, `MaxBlockFetch`, `MaxReceiptFetch`, and `MaxStateFetch` constants are used to limit the download allowance to their respective maximum values.

The `MarkLacking` function is used to mark a blockchain item as missing for a peer. This function takes the hash of the missing item as an input parameter and appends it to the set of items that the peer is known not to have. If the set reaches its maximum allowed capacity, items are randomly dropped off. The `lock` variable is used to synchronize access to the `lacking` map.

The `Lacks` function is used to check if a peer lacks a specific blockchain item. This function takes the hash of the blockchain item as an input parameter and returns a boolean value indicating whether the peer is known not to have the item. The `lock` variable is used to synchronize access to the `lacking` map.

The `peerSet` struct represents the collection of active peers participating in the chain download procedure. The `peers` map is used to store the active peer connections, and the `rates` variable is used to track the data transfer rates of the peers. The `newPeerFeed` and `peerDropFeed` variables are used to notify subscribers of new peer arrivals and peer departures, respectively. The `lock` variable is used to synchronize access to the `peers` map.

The `newPeerSet` function is used to create a new peer set to track the active download sources. This function initializes the `peers` map and the `rates` variable.

The `SubscribeNewPeers` function is used to subscribe to peer arrival events. This function takes a channel as an input parameter and returns an event subscription.

The `SubscribePeerDrops` function is used to subscribe to peer departure events. This function takes a channel as an input parameter and returns an event subscription. ## Documentation for PeerSet Functions

### SubscribePeerDrops

```go
func (ps *peerSet) SubscribePeerDrops(ch chan<- *peerConnection) event.Subscription
```

SubscribePeerDrops subscribes to the peer drop event feed and returns an event subscription. The function takes a channel of peer connections as an argument and sends the peer connection to the channel when a peer is dropped.

### Reset

```go
func (ps *peerSet) Reset()
```

Reset iterates over the current peer set and resets each of the known peers to prepare for the next batch of block retrieval.

### Register

```go
func (ps *peerSet) Register(p *peerConnection) error
```

Register injects a new peer into the working set or returns an error if the peer is already known. The method also sets the starting throughput values of the new peer to the average of all existing peers to give it a realistic chance of being used for data retrievals.

### Unregister

```go
func (ps *peerSet) Unregister(id string) error
```

Unregister removes a remote peer from the active set, disabling any further actions to/from that particular entity.

### Peer

```go
func (ps *peerSet) Peer(id string) *peerConnection
```

Peer retrieves the registered peer with the given id.

### Len

```go
func (ps *peerSet) Len() int
```

Len returns the current number of peers in the set.

### AllPeers

```go
func (ps *peerSet) AllPeers() []*peerConnection
```

AllPeers retrieves a flat list of all the peers within the set.

### HeaderIdlePeers

```go
func (ps *peerSet) HeaderIdlePeers() ([]*peerConnection, int)
```

HeaderIdlePeers retrieves a flat list of all the currently header-idle peers within the active peer set, ordered by their reputation.

### BodyIdlePeers

```go
func (ps *peerSet) BodyIdlePeers() ([]*peerConnection, int)
```

BodyIdlePeers retrieves a flat list of all the currently body-idle peers within the active peer set, ordered by their reputation.

### ReceiptIdlePeers

```go
func (ps *peerSet) ReceiptIdlePeers() ([]*peerConnection, int)
```

ReceiptIdlePeers retrieves a flat list of all the currently receipt-idle peers within the active peer set, ordered by their reputation.

### NodeDataIdlePeers

```go
func (ps *peerSet) NodeDataIdlePeers() ([]*peerConnection, int)
```

NodeDataIdlePeers retrieves a flat list of all the currently node-data-idle peers within the active peer set, ordered by their reputation.

The PeerSet is a set of peers that can be used to retrieve data from the Ethereum network. The functions provided by the PeerSet allow for the registration and unregistration of peers, as well as the retrieval of idle peers for specific types of data. The PeerSet also provides event subscriptions for when peers are dropped from the set. The code snippet provided is written in Go programming language. It consists of a function called `idleETHPeers` and two helper functions called `idle` and `throughput`. The `idleETHPeers` function takes two arguments, a pointer to a `peerConnection` and an integer. It returns a slice of pointers to `peerConnection` and an integer. 

The `idleETHPeers` function calls the `idlePeers` function of the `peerSet` struct with the following arguments:
- `minProtocol` and `maxProtocol` are the minimum and maximum protocol versions that the peers must satisfy.
- `idleCheck` is a function that takes a pointer to a `peerConnection` and returns a boolean value indicating whether the peer is idle or not.
- `capacity` is a function that takes a pointer to a `peerConnection` and returns an integer value indicating the peer's capacity.

The `idlePeers` function retrieves a flat list of all currently idle peers satisfying the protocol version constraints, using the provided function to check idleness. The resulting set of peers are sorted by their capacity. It takes four arguments:
- `minProtocol` and `maxProtocol` are the minimum and maximum protocol versions that the peers must satisfy.
- `idleCheck` is a function that takes a pointer to a `peerConnection` and returns a boolean value indicating whether the peer is idle or not.
- `capacity` is a function that takes a pointer to a `peerConnection` and returns an integer value indicating the peer's capacity.
- `total` is an integer value indicating the total number of peers that satisfy the protocol version constraints.

The `idlePeers` function first acquires a read lock on the `peerSet` struct and then iterates over all the peers in the `peers` map. For each peer, it checks whether it satisfies the protocol version constraints. If it does, it calls the `idleCheck` function to check whether the peer is idle or not. If it is idle, it appends the peer to the `idle` slice and its capacity to the `tps` slice. It also increments the `total` counter. 

After iterating over all the peers, the `idle` and `tps` slices are sorted in descending order of capacity using the `peerCapacitySort` struct and the `sort.Sort` function. Finally, the `idle` slice and the `total` counter are returned.

The `peerCapacitySort` struct implements the `sort.Interface` interface and is used to sort the `idle` and `tps` slices. It has three fields:
- `p` is a slice of pointers to `peerConnection`.
- `tp` is a slice of integers indicating the capacity of each peer.

The `peerCapacitySort` struct has three methods:
- `Len` returns the length of the `p` slice.
- `Less` returns a boolean value indicating whether the element at index `i` should be sorted before the element at index `j`.
- `Swap` swaps the elements at index `i` and `j` in both the `p` and `tp` slices.

Here's an example of how to use the `idleETHPeers` function:

```
package main

import (
	"fmt"
)

func main() {
	// create a peerSet
	ps := &peerSet{
		peers: make(map[string]*peerConnection),
	}

	// add some peers to the peerSet
	p1 := &peerConnection{
		version:  eth.ETH66,
		stateIdle: 1,
		rates: &peerRates{
			rates: make(map[eth.MsgType]*rateTracker),
		},
	}
	ps.peers["peer1"] = p1

	p2 := &peerConnection{
		version:  eth.ETH67,
		stateIdle: 0,
		rates: &peerRates{
			rates: make(map[eth.MsgType]*rateTracker),
		},
	}
	ps.peers["peer2"] = p2

	p3 := &peerConnection{
		version:  eth.ETH66,
		stateIdle: 1,
		rates: &peerRates{
			rates: make(map[eth.MsgType]*rateTracker),
		},
	}
	ps.peers["peer3"] = p3

	// call the idleETHPeers function
	idlePeers, total := idleETHPeers(p1, 10)

	// print the results
	fmt.Printf("Total peers: %d\n", total)
	for _, p := range idlePeers {
		fmt.Printf("Peer: %s, Capacity: %d\n", p.id, p.rates.Capacity(eth.NodeDataMsg, time.Second))
	}
}
``` 

In this example, we create a `peerSet` and add three peers to it. We then call the `idleETHPeers` function with `p1` as the `peerConnection` argument and `10` as the integer argument. The function returns a slice of pointers to `peerConnection` and an integer. We print the total number of peers and the id and capacity of each idle peer.