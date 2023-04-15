## Introduction

This document provides documentation for the source code of an Ethereum protocol handler in a Go codebase. The protocol handler is responsible for handling Ethereum-specific P2P messages and data retrieval requests. The codebase is written in Go programming language.

## Backend Interface

The Backend interface defines the data retrieval methods to serve remote requests and the callback methods to invoke on remote deliveries. The interface has four methods:

### Chain Method

The `Chain` method retrieves the blockchain object to serve data.

```go
Chain() *core.BlockChain
```

### TxPool Method

The `TxPool` method retrieves the transaction pool object to serve data.

```go
TxPool() TxPool
```

### AcceptTxs Method

The `AcceptTxs` method retrieves whether transaction processing is enabled on the node or if inbound transactions should simply be dropped.

```go
AcceptTxs() bool
```

### RunPeer Method

The `RunPeer` method is invoked when a peer joins on the `eth` protocol. The handler should do any peer maintenance work, handshakes, and validations. If all is passed, control should be given back to the `handler` to process the inbound messages going forward.

```go
RunPeer(peer *Peer ## Introduction

This document provides documentation for the source code of the `MakeProtocols` function in a Go codebase. The function is responsible for creating and returning a slice of `p2p.Protocol` types for the Ethereum sub-protocol. The codebase is written in Go programming language.

## MakeProtocols Function

The `MakeProtocols` function takes three parameters: a `Backend` type representing the backend of the Ethereum node, a `uint64` type representing the network ID, and an `enode.Iterator` type representing the DNS discovery. The function returns a slice of `p2p.Protocol` types.

```go
func MakeProtocols(backend Backend, network uint64, dnsdisc enode.Iterator) []p2p.Protocol {
    protocols := make([]p2p.Protocol, len(ProtocolVersions))
    for i, version := range ProtocolVersions {
        version := version // Closure

        protocols[i] = p2p.Protocol{
            Name:    ProtocolName,
            Version: version, ## Introduction

This document provides documentation for the source code of a handleMessage function in a Go codebase. The handleMessage function is responsible for handling inbound messages from a remote peer in a blockchain network. The codebase is written in Go programming language.

## handleMessage Function

The `handleMessage` function is invoked whenever an inbound message is received from a remote peer. The function takes two parameters: a `backend` parameter of type Backend and a `peer` parameter of type Peer. The function returns an error if any.

```go
func handleMessage(backend Backend, peer *Peer) error {
    // Read the next message from the remote peer, and ensure it's fully consumed
    msg, err := peer.rw.ReadMsg()
    if err != nil {
        return err
    }
    if msg.Size > maxMessageSize {
        return fmt.Errorf("%w: %v > %v", errMsgTooLarge, msg.Size, maxMessageSize)
    }
    defer msg.Discard()

    var handlers = eth66
    if peer.Version() == ETH67 {
        handlers = eth67
    }
    if peer.Version() >= ETH68 {
        handlers = eth68
    }

    // Track the amount of time it takes to serve the request and run the handler
    if metrics.Enabled {
        h := fmt.Sprintf("%s/%s/%d/%#02x", p2p.HandleHistName, ProtocolName, peer.Version(), msg.Code)
        defer func(start time.Time) {
            sampler := func() metrics.Sample {
                return metrics.ResettingSample(
                    metrics.NewExpDecaySample(1028, 0.015),
                )
            }
            metrics.GetOrRegisterHistogramLazy(h, nil, sampler).Update(time.Since(start).Microseconds())
        }(time.Now())
    }
    if handler := handlers[msg.Code]; handler != nil {
        return handler(backend, msg, peer)
    }
    return fmt.Errorf("%w: %v", errInvalidMsgCode, msg.Code)
}
```

The function first reads the next message from the remote peer and ensures that it is fully consumed. If the message size is greater than the maximum message size, the function returns an error. The function then determines the appropriate message handler based on the peer's version and the message code. The function tracks the amount of time it takes to serve the request and run the handler if metrics are enabled. Finally, the function calls the appropriate message handler and returns any error that the handler returns. If no handler is found for the message code, the function returns an error.