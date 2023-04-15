## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for managing the communication between two nodes in a blockchain network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### blockPropagation Struct

The `blockPropagation` struct is a block propagation event, waiting for its turn in the broadcast queue. The struct has two fields: `block` which is a types.Block type representing the block to be propagated, and `td` which is a big.Int type representing the total difficulty of the block.

```go
type blockPropagation struct {
    block *types.Block
    td    *big.Int
}
```

### broadcastBlocks Function

The `broadcastBlocks` function is a write loop that multiplexes blocks and block announcements to the remote peer. The goal is to have an async writer ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for syncing the state of a blockchain node with the network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### announceBlocks Function

The `announceBlocks` function is a write loop that schedules block broadcasts to the remote peer. The goal is to have an async writer that does not lock up node internals and at the same time rate limits queued data. The function uses a select statement to listen for events and perform the necessary actions. The function has a queue of block hashes to announce as block stubs. If there's no in-flight announce running, the function checks if a new one is needed. The function piles block hashes until it reaches the allowed network limit and then shifts and trims the queue. If there's anything available to transfer, the function fires up an async writer. The function uses the `sendPooledBlockHashes` function to send the block hashes to the remote peer.

```go
func (p *Peer) announceBlocks() {
    var (
        queue  []common.Hash         // Queue of hashes to announce as block stubs
        done   chan struct{}         // Non-nil if background announcer is running
        fail   = make(chan error, 1) // Channel used to receive network error
        failed bool                  // Flag whether a send failed, discard everything onward
    )
    for {
        // If there's no in-flight announce running, check if a new one is needed
        if done == nil && len(queue) > 0 {