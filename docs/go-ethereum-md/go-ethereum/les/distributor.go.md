{}{}
d.peerLock.Unlock()
}

// unregisterTestPeer removes a test peer
func (d *requestDistributor) unregisterTestPeer(p distPeer) {
	d.peerLock.Lock()
	delete(d.peers, p)
	d.peerLock.Unlock()
}

// request adds a new request to the distributor
func (d *requestDistributor) request(getCost func(distPeer) uint64, canSend func(distPeer) bool, request func(distPeer) func()) {
	d.lock.Lock()
	defer d.lock.Unlock()

	req := &distReq{
		getCost:      getCost,
		canSend:      canSend,
		request:      request,
		reqOrder:     d.lastReqOrder,
		sentChn:      make(chan distPeer, 1),
		waitForPeers: d.clock.Now(),
		enterQueue:   d.clock.Now(),
	}
	d.lastReqOrder++

	d.reqQueue.PushBack(req)
	d.loopChn <- struct{}{}
}

// loop is the main loop of the distributor
func (d *requestDistributor) loop() {
	defer d.wg.Done()

	for {
		select {
		case <-d.closeCh:
			return
		case <-d.loopChn:
			d.loopNextSent = false
			d.sendRequests()
		}
	}
}

// sendRequests sends requests to suitable peers
func (d *requestDistributor) sendRequests() {
	d.lock.Lock()
	defer d.lock.Unlock()

	for e := d.reqQueue.Front(); e != nil; e = e.Next() {
		req := e.Value.(*distReq)

		// Check if the request has already been sent
		if req.element == nil {
			continue
		}

		// Check if the request can be sent
		var peerToSend distPeer
		var costToSend uint64
		d.peerLock.RLock()
		for peer := range d.peers {
			if !req.canSend(peer) {
				continue
			}
			cost := req.getCost(peer)
			if costToSend == 0 || cost < costToSend {
				costToSend = cost
				peerToSend = peer
			}
		}
		d.peerLock.RUnlock()

		// If no suitable peer was found, wait for the next loop
		if peerToSend == nil {
			req.waitForPeers = d.clock.Now()
			continue
		}

		// Check if the peer can queue the request
		if !peerToSend.canQueue() {
			continue
		}

		// Send the request
		req.element = nil
		req.sentChn <- peerToSend
		peerToSend.queueSend(req.request(peerToSend))

		// Update the wait time for the next request
		waitTime, buffer := peerToSend.waitBefore(costToSend)
		req.waitForPeers = d.clock.Now().Add(waitTime)
		if buffer > 0 {
			req.waitForPeers = req.waitForPeers.Add(time.Duration(float64(waitTime) * buffer))
		}

		// Check if the next request can be sent immediately
		if !d.loopNextSent && d.reqQueue.Len() > 0 {
			nextReq := d.reqQueue.Front().Value.(*distReq)
			if nextReq.waitForPeers.Before(d.clock.Now()) {
				d.loopNextSent = true
				d.loopChn <- struct{}{}
			}
		}
	}
}

// notify implements peerSetNotify
func (d *requestDistributor) notify(peers map[*serverPeer]struct{}) {
	d.lock.Lock()
	defer d.lock.Unlock()

	for e := d.reqQueue.Front(); e != nil; e = e.Next() {
		req := e.Value.(*distReq)
		if req.element == nil {
			continue
		}
		for peer := range peers {
			if _, ok := peer.(distPeer); ok {
				req.waitForPeers = d.clock.Now()
				break
			}
		}
	}
}

// close stops the distributor
func (d *requestDistributor) close() {
	close(d.closeCh)
	d.wg.Wait()
} 

## Explanation

The `requestDistributor` struct is a mechanism that distributes requests to suitable peers, obeying flow control rules and prioritizing them in creation order (even when a resend is necessary). It contains a `clock` object, a `reqQueue` list, a `lastReqOrder` variable, a `peers` map, a `peerLock` mutex, a `loopChn` channel, a `loopNextSent` boolean, a `lock` mutex, a `closeCh` channel, and a `wg` WaitGroup.

The `distPeer` interface is an LES server peer interface for the request distributor. The `waitBefore` function returns either the necessary waiting time before sending a request with the given upper estimated cost or the estimated remaining relative buffer value after sending such a request (in which case the request can be sent immediately). The `canQueue` function returns a boolean indicating whether the peer can queue the request, and the `queueSend` function adds a function to the peer's send queue.

The `distReq` struct is the request abstraction used by the distributor. It contains three callback functions: `getCost` returns the upper estimate of the cost of sending the request to a given peer, `canSend` tells if the server peer is suitable to serve the request, and `request` prepares sending the request to the given peer and returns a function that does the actual sending. Request order should be preserved but the callback itself should not block until it is sent because other peers might still be able to receive requests while one of them is blocking. Instead, the returned function is put in the peer's send queue.

The `newRequestDistributor` function creates a new request distributor. It takes a `peers` parameter, which is a serverPeerSet, and a `clock` parameter, which is a mclock.Clock object. It returns a pointer to the request distributor.

The `registerPeer` function implements the `peerSetNotify` interface and adds a new server peer to the `peers` map.

The `unregisterPeer` function implements the `peerSetNotify` interface and removes a server peer from the `peers` map.

The `registerTestPeer` function adds a new test peer to the `peers` map.

The `unregisterTestPeer` function removes a test peer from the `peers` map.

The `request` function adds a new request to the distributor. It takes three callback functions as parameters: `getCost`, `canSend`, and `request`. It creates a new `distReq` object and adds it to the `reqQueue` list.

The `loop` function is the main loop of the distributor. It listens for signals on the `closeCh` and `loopChn` channels and calls the `sendRequests` function when a signal is received.

The `sendRequests` function sends requests to suitable peers. It iterates over the `reqQueue` list and checks if each request can be sent. If a suitable peer is found, the request is sent to the peer and removed from the `reqQueue` list. The function also updates the wait time for the next request and checks if the next request can be sent immediately.

The `notify` function implements the `peerSetNotify` interface and updates the wait time for requests when a server peer is added or removed.

The `close` function stops the distributor by closing the `closeCh` channel and waiting for the `wg` WaitGroup to finish. The code provided is a part of a request distributor package that distributes requests to multiple peers. The package is designed to handle multiple requests and distribute them to peers in a load-balanced manner. The package uses a weighted random selection algorithm to select the peer to send the request to.

The `loop()` function is the main event loop that handles the distribution of requests. It listens to two channels, `closeCh` and `loopChn`. The `closeCh` channel is used to stop the event loop, and the `loopChn` channel is used to signal the event loop to wake up and process the next request. The `loop()` function selects the next request to send to a peer using the `nextRequest()` function. If there is a request to send, it sends the request to the selected peer and updates the request's sent channel. If there is no request to send, it waits for the specified time and then wakes up to process the next request.

The `nextRequest()` function selects the next possible request from any peer, along with the associated peer and necessary waiting time. It uses a weighted random selection algorithm to select the peer to send the request to. The function checks if the request can be sent to any of the available peers and returns the peer with the lowest weight. If there is no available peer, it returns the necessary waiting time.

The `selectPeerItem` struct represents a peer to be selected for a request by weightedRandomSelect. The `selectPeerWeight` function returns the weight of the `selectPeerItem` struct.

The `distMaxWait` and `waitForPeers` variables are used to set the maximum waiting time and the time window in which a request does not fail even if it has no suitable peers to send to at the moment.

The `peerLock` variable is a mutex that is used to synchronize access to the `peers` map.

The `queue()` function adds a request to the distribution queue and returns a channel where the receiving peer is sent once the request has been sent. If the request cannot be sent to any of the available peers, the function returns an error.

Here is an example of how to use the `requestDistributor` package:

```go
package main

import (
	"fmt"
	"time"

	"github.com/example/requestDistributor"
)

func main() {
	// create a new request distributor
	rd := requestDistributor.NewRequestDistributor()

	// add some peers to the request distributor
	rd.AddPeer("peer1", "http://peer1.example.com")
	rd.AddPeer("peer2", "http://peer2.example.com")
	rd.AddPeer("peer3", "http://peer3.example.com")

	// create a new request
	req := requestDistributor.NewRequest("GET", "http://example.com", nil)

	// add the request to the request distributor queue
	sentChn, err := rd.Queue(req)
	if err != nil {
		fmt.Println(err)
		return
	}

	// wait for the request to be sent
	select {
	case peer := <-sentChn:
		fmt.Printf("Request sent to peer %s\n", peer.Name())
	case <-time.After(time.Second * 10):
		fmt.Println("Request timed out")
	}
}
```

In this example, we create a new request distributor and add some peers to it. We then create a new request and add it to the request distributor queue using the `Queue()` function. The `Queue()` function returns a channel where the receiving peer is sent once the request has been sent. We wait for the request to be sent using a select statement. If the request is sent successfully, we print the name of the peer that the request was sent to. If the request times out, we print an error message. The `requestDistributor` struct is responsible for distributing requests to peers. It has a `queue` method that adds a request to the queue and returns a channel that will receive the peer that will handle the request. The `cancel` method removes a request from the queue if it has not been sent yet. The `remove` method removes a request from the queue. The `close` method closes the channel and waits for all goroutines to finish.

The `queue` method takes a `distReq` pointer as an argument. If the `reqOrder` field of the `distReq` is 0, it assigns a new order to the request and sets the `waitForPeers` field to the current time plus the `waitForPeers` constant. It also sets the `enterQueue` field to the current time. The method then adds the request to the queue in order based on the `reqOrder` field. If the `loopNextSent` field is false, it sets it to true and sends a signal to the `loopChn` channel to start processing the queue. Finally, it returns the `sentChn` channel that will receive the peer that will handle the request.

The `cancel` method takes a `distReq` pointer as an argument. If the `sentChn` field of the `distReq` is nil, it returns false. Otherwise, it closes the `sentChn` channel, removes the request from the queue, and returns true.

The `remove` method takes a `distReq` pointer as an argument. It sets the `sentChn` field of the `distReq` to nil and removes the request from the queue if it exists.

The `close` method closes the `closeCh` channel and waits for all goroutines to finish using the `wg.Wait()` method.

Here is an example of how to use the `requestDistributor` struct:

```go
// Create a new request distributor
rd := &requestDistributor{
    reqQueue: list.New(),
    loopChn:  make(chan struct{}),
    closeCh:  make(chan struct{}),
    clock:    &realClock{},
}

// Start the request distributor
go rd.loop()

// Add a request to the queue
req := &distReq{
    reqOrder: 0,
    callback: func(peer distPeer, err error) {
        // Handle the response from the peer
    },
}
peerChn := rd.queue(req)

// Wait for a peer to handle the request
peer := <-peerChn

// Cancel the request if it has not been sent yet
if rd.cancel(req) {
    // Request was cancelled
} else {
    // Request has already been sent
}
```

In this example, we create a new `requestDistributor` and start it in a new goroutine. We then add a request to the queue and wait for a peer to handle it. If the request has not been sent yet, we cancel it. Otherwise, we handle the response from the peer.