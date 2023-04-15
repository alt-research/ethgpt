# Simulations Package

The `simulations` package provides a set of functions and types for simulating network topologies and testing network connectivity. The package includes functions for verifying ring, chain, full, and star network topologies.

## NoopService

The `NoopService` type is a service that does not do anything but implements the `node.Service` interface. It is used in the simulation tests to create a protocol that can be used to establish connections between nodes.

### NewNoopService

```go
func NewNoopService(ackC map[enode.ID]chan struct{}) *NoopService
```

`NewNoopService` creates a new `NoopService` instance with the given `ackC` map.

### Protocols

```go
func (t *NoopService) Protocols() []p2p.Protocol
```

`Protocols` returns a slice of `p2p.Protocol` instances that can be used to establish connections between nodes.

### APIs

```go
func (t *NoopService) APIs() []rpc.API
```

`APIs` returns a slice of `rpc.API` instances that can be used to interact with the `NoopService`.

### Start

```go
func (t *NoopService) Start() error
```

`Start` starts the `NoopService`.

### Stop

```go
func (t *NoopService) Stop() error
```

`Stop` stops the `NoopService`.

## VerifyRing

```go
func VerifyRing(t *testing.T, net *Network, ids []enode.ID)
```

`VerifyRing` verifies that the nodes in the given `ids` slice are connected in a ring topology in the given `net` network.

## VerifyChain

```go
func VerifyChain(t *testing.T, net *Network, ids []enode.ID)
```

`VerifyChain` verifies that the nodes in the given `ids` slice are connected in a chain topology in the given `net` network.

## VerifyFull

```go
func VerifyFull(t *testing.T, net *Network, ids []enode.ID)
```

`VerifyFull` verifies that the nodes in the given `ids` slice are connected in a full topology in the given `net` network.

## VerifyStar

```go
func VerifyStar(t *testing.T, net *Network, ids []enode.ID, centerIndex int)
```

`VerifyStar` verifies that the nodes in the given `ids` slice are connected in a star topology in the given `net` network with the node at the given `centerIndex` as the center of the star.