## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for managing relevant information about an `eth` peer. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    id string // Unique ID for the peer, cached

    *p2p.Peer                   // The embedded P2P package peer
    rw        p2p.MsgReadWriter // Input/output streams for snap
    version   uint              // Protocol version negotiated

    head common.Hash // Latest advertised head block hash
    td   *big.Int    // Latest advertised head block total difficulty

    knownBlocks     *knownCache            // Set of block hashes known to be known by this peer
    queuedBlocks    chan *blockPropagation // Queue of blocks to broadcast to the peer
    queuedBlockAnns chan *types.Block      // Queue of blocks to announce to the peer

    txpool      TxPool             // Transaction pool used by the broadcasters for liveness checks
    knownTxs    *knownCache        // Set of transaction hashes known to be known by this peer
    txBroadcast chan []common.Hash // Channel used to queue transaction propagation requests
    txAnnounce ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for managing a network connection and negotiated protocol version with another peer. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### NewPeer Function

The `NewPeer` function creates a wrapper for a network connection and negotiated protocol version. The function takes four parameters: a uint `version` representing the protocol version, a `p` parameter of type `*p2p.Peer` representing the network connection, an `rw` parameter of type `p2p.MsgReadWriter` representing the message read writer, and a `txpool` parameter of type `TxPool` representing the transaction pool. The function returns a pointer to a Peer struct.

```go
func NewPeer(version uint, p *p2p.Peer, rw p2p.MsgReadWriter, txpool TxPool) *Peer {
    peer := &Peer{
        id:              p ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for managing a connection to a remote peer in a peer-to-peer network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### AsyncSendTransactions Function

The `AsyncSendTransactions` function queues a list of transaction hashes to eventually announce to a remote peer. If the peer's broadcast queue is full, the event is silently dropped. The function takes a slice of common.Hash types representing transaction hashes as a parameter.

```go
func (p *Peer) AsyncSendTransactions(hashes []common.Hash) {
    select {
    case p.txBroadcast <- hashes:
        // Mark all the transactions as known, but ensure we don ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for handling communication with a remote peer in a blockchain network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
``` ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for handling communication with other nodes in a blockchain network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### RequestHeaders Function

The `RequestHeaders` function fetches a batch of headers from a remote node. The function takes four parameters: an integer `amount` representing the number of headers to fetch, a `origin` parameter of type uint64 representing the starting block number, a `skip`