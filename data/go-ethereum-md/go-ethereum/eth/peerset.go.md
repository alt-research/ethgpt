## Documentation for the Ethereum Codebase

### Package: eth

The `eth` package provides the implementation of the Ethereum protocol. It includes the `peerSet` type, which represents the collection of active peers currently participating in the `eth` protocol, with or without the `snap` extension.

### Type: peerSet

The `peerSet` type represents the collection of active peers currently participating in the `eth` protocol, with or without the `snap` extension. It has the following methods:

#### newPeerSet()

`newPeerSet()` creates a new peer set to track the active participants.

#### registerSnapExtension(peer *snap.Peer) error

`registerSnapExtension(peer *snap.Peer) error` unblocks an already connected `eth` peer waiting for its `snap` extension, or if no such peer exists, tracks the extension for the time being until the `eth` main protocol starts looking for it.

#### addPeer(peer *ethPeer) error

`addPeer(peer *ethPeer) error` adds a new peer to the peer set.

#### removePeer(id string) error

`removePeer(id string) error` removes a peer from the peer set.

#### peerCount() int

`peerCount() int` returns the number of peers in the peer set.

#### snapPeerCount() int

`snapPeerCount() int` returns the number of `snap` compatible peers in the peer set.

#### getPeers() []*ethPeer

`getPeers() []*ethPeer` returns a slice of all the peers in the peer set.

#### getSnapPeers() []*ethPeer

`getSnapPeers() []*ethPeer` returns a slice of all the `snap` compatible peers in the peer set.

#### getPeer(id string) (*ethPeer, error)

`getPeer(id string) (*ethPeer, error)` returns the peer with the given ID, or an error if no such peer exists.

#### getSnapPeer(id string) (*ethPeer, error)

`getSnapPeer(id string) (*ethPeer, error)` returns the `snap` compatible peer with the given ID, or an error if no such peer exists.

#### waitForSnap(peer *ethPeer) (*snap.Peer, error)

`waitForSnap(peer *ethPeer) (*snap.Peer, error)` waits for the `snap` extension of the given peer to become available, or returns an error if the peer is not `snap` compatible.

#### waitForEth(peer *snap.Peer) (*ethPeer, error)

`waitForEth(peer *snap.Peer) (*ethPeer, error)` waits for the `eth` main protocol of the given peer to become available, or returns an error if the peer is not `eth` compatible.

#### close()

`close()` closes the peer set and terminates all the peers in it.

### Variables

The `eth` package also defines the following variables:

#### errPeerSetClosed

`errPeerSetClosed` is returned if a peer is attempted to be added or removed from the peer set after it has been terminated.

#### errPeerAlreadyRegistered

`errPeerAlreadyRegistered` is returned if a peer is attempted to be added to the peer set, but one with the same ID already exists.

#### errPeerNotRegistered

`errPeerNotRegistered` is returned if a peer is attempted to be removed from a peer set, but no peer with the given ID exists.

#### errSnapWithoutEth

`errSnapWithoutEth` is returned if a peer attempts to connect only on the `snap` protocol without advertising the `eth` main protocol. ## Documentation for the PeerSet Codebase

### Function: addPeer

```go
func (ps *peerSet) addPeer(peer *eth.Peer, ext *snap.Peer) error {
    ps.lock.Lock()
    defer ps.lock.Unlock()

    if ps.closed {
        return errPeerSetClosed
    }
    id := peer.ID()
    if _, ok := ps.peers[id]; ok {
        return errPeerAlreadyRegistered
    }
    eth := &ethPeer{
        Peer: peer,
    }
    if ext != nil {
        eth.snapExt = &snapPeer{ext}
        ps.snapPeers++
    }
    ps.peers[id] = eth
    return nil
}
```

The `addPeer` function adds a new `eth` peer to the working set. If the peer is already known, it returns an error. If the `snap` peer is not nil, it starts tracking the new peer and increments the number of `snap` peers.

### Function: removePeer

```go
func (ps *peerSet) removePeer(id string) error {
    ps.lock.Lock()
    defer ps.lock.Unlock()

    peer, ok := ps.peers[id]
    if !ok {
        return errPeerNotRegistered
    }
    delete(ps.peers, id)
    if peer.snapExt != nil {
        ps.snapPeers--
    }
    return nil
}
```

The `removePeer` function removes a remote peer from the active set, disabling any further actions to/from that particular entity. If the peer is not registered, it returns an error. If the `snap` peer is not nil, it decrements the number of `snap` peers.

### Function: peer

```go
func (ps *peerSet) peer(id string) *ethPeer {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    return ps.peers[id]
}
```

The `peer` function retrieves the registered peer with the given id.

### Function: peersWithoutBlock

```go
func (ps *peerSet) peersWithoutBlock(hash common.Hash) []*ethPeer {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    list := make([]*ethPeer, 0, len(ps.peers))
    for _, p := range ps.peers {
        if !p.KnownBlock(hash) {
            list = append(list, p)
        }
    }
    return list
}
```

The `peersWithoutBlock` function retrieves a list of peers that do not have a given block in their set of known hashes so it might be propagated to them.

### Function: peersWithoutTransaction

```go
func (ps *peerSet) peersWithoutTransaction(hash common.Hash) []*ethPeer {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    list := make([]*ethPeer, 0, len(ps.peers))
    for _, p := range ps.peers {
        if !p.KnownTransaction(hash) {
            list = append(list, p)
        }
    }
    return list
}
```

The `peersWithoutTransaction` function retrieves a list of peers that do not have a given transaction in their set of known hashes.

### Function: len

```go
func (ps *peerSet) len() int {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    return len(ps.peers)
}
```

The `len` function returns the current number of `eth` peers in the set.

### Function: snapLen

```go
func (ps *peerSet) snapLen() int {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    return ps.snapPeers
}
```

The `snapLen` function returns the current number of `snap` peers in the set.

### Function: peerWithHighestTD

```go
func (ps *peerSet) peerWithHighestTD() *eth.Peer {
    ps.lock.RLock()
    defer ps.lock.RUnlock()

    var (
        bestPeer *eth.Peer
        bestTd   *big.Int
    )
    for _, p := range ps.peers {
        if p.TD() == nil {
            continue
        }
        if bestPeer == nil || p.TD().Cmp(bestTd) > 0 {
            bestPeer = p.Peer
            bestTd = p.TD()
        }
    }
    return bestPeer
}
```

The `peerWithHighestTD` function retrieves the known peer with the currently highest total difficulty, but below the given PoS switchover threshold. It returns the peer with the highest total difficulty. ## Documentation for the PeerSet Codebase

### Function: AddPeer

```go
func (ps *peerSet) AddPeer(p *peer) {
	ps.lock.Lock()
	defer ps.lock.Unlock()

	ps.peers[p.ID()] = p
}
```

The `AddPeer` function adds a new peer to the peer set. It takes a pointer to a `peer` object as its argument. The function first acquires a lock on the peer set to ensure that no other goroutine is modifying the set at the same time. It then adds the peer to the set by mapping its ID to the peer object in the `peers` map.

### Function: RemovePeer

```go
func (ps *peerSet) RemovePeer(id string) {
	ps.lock.Lock()
	defer ps.lock.Unlock()

	delete(ps.peers, id)
}
```

The `RemovePeer` function removes a peer from the peer set. It takes the ID of the peer to be removed as its argument. The function first acquires a lock on the peer set to ensure that no other goroutine is modifying the set at the same time. It then removes the peer from the set by deleting its ID from the `peers` map.

### Function: Head

```go
func (ps *peerSet) Head() (*peer, *big.Int) {
	ps.lock.RLock()
	defer ps.lock.RUnlock()

	var (
		bestPeer *peer
		bestTd   *big.Int
	)

	for _, p := range ps.peers {
		if _, td := p.Head(); bestPeer == nil || td.Cmp(bestTd) > 0 {
			bestPeer, bestTd = p, td
		}
	}
	return bestPeer, bestTd
}
```

The `Head` function returns the peer with the highest total difficulty in the peer set, along with its total difficulty. It first acquires a read lock on the peer set to ensure that no other goroutine is modifying the set at the same time. It then iterates over all peers in the set and retrieves the total difficulty of each peer's head block. The function keeps track of the peer with the highest total difficulty and returns it along with its total difficulty.

### Function: Close

```go
func (ps *peerSet) Close() {
	ps.lock.Lock()
	defer ps.lock.Unlock()

	for _, p := range ps.peers {
		p.Disconnect(p2p.DiscQuitting)
	}
	ps.closed = true
}
```

The `Close` function disconnects all peers in the peer set. It first acquires a lock on the peer set to ensure that no other goroutine is modifying the set at the same time. It then iterates over all peers in the set and disconnects them with the `Disconnect` function, passing `p2p.DiscQuitting` as the reason for disconnection. Finally, the function sets the `closed` flag to true to indicate that the peer set is closed.