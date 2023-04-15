## Introduction

This document provides documentation for the source code of an `eth` package in a Go codebase. The `eth` package is responsible for handling the Ethereum protocol. The codebase is written in Go programming language.

## enrEntry Struct

The `enrEntry` struct represents the ENR (Ethereum Node Record) entry which advertises the `eth` protocol on the discovery. The struct has two fields: `ForkID` which is a fork identifier per EIP-2124, and `Rest` which is a slice of rlp.RawValue types representing additional fields.

```go
type enrEntry struct {
    ForkID forkid.ID // Fork identifier per EIP-2124

    // Ignore additional fields (for forward compatibility).
    Rest []rlp.RawValue `rlp:"tail"`
}
```

### ENRKey Function

The `ENRKey` function implements enr.Entry and returns a string representing the ENR key.

```go
func (e enrEntry) ENRKey() string {
    return "eth"
}
```

## StartENRUpdater Function

The `StartENRUpdater` function starts the `eth` ENR updater loop, which listens for chain head events and updates the requested node record whenever a fork is passed. The function takes two parameters: a `chain` parameter which is a pointer to a core.BlockChain type representing the blockchain, and an `ln` parameter which is a pointer to an enode.LocalNode type representing the local node.

```go
func StartENRUpdater(chain *core.BlockChain, ln *enode.LocalNode) {
    var newHead = make(chan core.ChainHeadEvent, 10)
    sub := chain.SubscribeChainHeadEvent(newHead)

    go func() {
        defer sub.Unsubscribe()
        for {
            select {
            case <-newHead:
                ln.Set(currentENREntry(chain))
            case <-sub.Err():
                // Would be nice to sync with Stop, but there is no
                // good way to do that.
                return
            }
        }
    }()
}
```

## currentENREntry Function

The `currentENREntry` function constructs an `eth` ENR entry based on the current state of the chain. The function takes a `chain` parameter which is a pointer to a core.BlockChain type representing the blockchain. The function returns a pointer to an enrEntry type representing the `eth` ENR entry.

```go
func currentENREntry(chain *core.BlockChain) *enrEntry {
    head := chain.CurrentHeader()
    return &enrEntry{
        ForkID: forkid.NewID(chain.Config(), chain.Genesis().Hash(), head.Number.Uint64(), head.Time),
    }
}
```