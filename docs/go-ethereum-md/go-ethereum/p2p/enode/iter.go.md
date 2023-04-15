This codebase is a part of the go-ethereum library, which is a free software that can be redistributed and modified under the terms of the GNU Lesser General Public License. The package enode contains functions and interfaces related to Ethereum nodes.

The Iterator interface represents a sequence of nodes, and it has three methods: Next, Node, and Close. The Next method moves to the next node in the sequence and returns false when the sequence has ended or the iterator is closed. The Node method returns the current node, and the Close method ends the iterator. The Iterator interface is implemented by the sliceIter struct and the filterIter struct.

The ReadNodes function reads at most n nodes from the given iterator. The function removes duplicates and nil values from the result. To prevent looping indefinitely for small repeating node sequences, this function calls Next at most n times.

The IterNodes function makes an iterator which runs through the given nodes once. The CycleNodes function makes an iterator which cycles through the given nodes indefinitely.

The sliceIter struct is an implementation of the Iterator interface. It has a mutex to ensure thread safety. The Next method moves to the next node in the sequence, and the Node method returns the current node. The Close method sets the nodes slice to nil.

The Filter function wraps an iterator such that Next only returns nodes for which the 'check' function returns true. The filterIter struct is an implementation of the Iterator interface. It has an Iterator field and a check function field. The Next method calls the Next method of the wrapped iterator until it finds a node that satisfies the check function.

The FairMix struct aggregates multiple node iterators. The mixer itself is an iterator which ends only when Close is called. Source iterators added via AddSource are removed from the mix when they end. The distribution of nodes returned by Next is approximately fair, i.e. FairMix attempts to draw from all sources equally often. However, if a certain source is slow and doesn't return a node within the configured timeout, a node from any other source will be returned.

Here is an example of how to use the IterNodes function:

```
nodes := []*Node{node1, node2, node3}
it := IterNodes(nodes)
for it.Next() {
    node := it.Node()
    // do something with node
}
it.Close()
```

Here is an example of how to use the Filter function:

```
it := Filter(sourceIt, func(node *Node) bool {
    return node.Seq() > 100
})
for it.Next() {
    node := it.Node()
    // do something with node
}
it.Close()
```

Here is an example of how to use the FairMix struct:

```
mix := NewFairMix()
mix.AddSource(sourceIt1)
mix.AddSource(sourceIt2)
for mix.Next() {
    node := mix.Node()
    // do something with node
}
mix.Close()
``` # FairMix

`FairMix` is a mixer that returns nodes from a random source. It is designed to be fair, meaning that it will try to read from each source in turn, so that no source is starved of reads. If a source is slow to deliver a node, `FairMix` will wait for a configurable timeout before moving on to the next source. If all sources are slow, `FairMix` will fall back to reading from any source.

## Usage

To use `FairMix`, create a new instance with `NewFairMix`, passing in a timeout duration. The timeout specifies how long the mixer will wait for the next fairly-chosen source before giving up and taking a node from any other source. A good way to set the timeout is deciding how long you'd want to wait for a node on average. Passing a negative timeout makes the mixer completely fair.

```go
m := NewFairMix(10 * time.Second)
```

To add a source of nodes, call `AddSource` with an `Iterator`. The `Iterator` should implement the `Next` and `Node` methods. `AddSource` can be called concurrently with `Next` and `Close`.

```go
m.AddSource(myIterator)
```

To get the next node, call `Next`. This will return `true` if a node was successfully read, and `false` if there are no more nodes to read.

```go
if m.Next() {
    node := m.Node()
    // do something with node
}
```

To shut down the mixer and all current sources, call `Close`. This is required to release resources associated with the mixer.

```go
m.Close()
```

## API

### type FairMix

```go
type FairMix struct {
    wg      sync.WaitGroup
    fromAny chan *Node
    timeout time.Duration
    cur     *Node

    mu      sync.Mutex
    closed  chan struct{}
    sources []*mixSource
    last    int
}
```

`FairMix` is a mixer that returns nodes from a random source.

### func NewFairMix

```go
func NewFairMix(timeout time.Duration) *FairMix
```

`NewFairMix` creates a mixer.

The timeout specifies how long the mixer will wait for the next fairly-chosen source before giving up and taking a node from any other source. A good way to set the timeout is deciding how long you'd want to wait for a node on average. Passing a negative timeout makes the mixer completely fair.

### func (*FairMix) AddSource

```go
func (m *FairMix) AddSource(it Iterator)
```

`AddSource` adds a source of nodes.

### func (*FairMix) Close

```go
func (m *FairMix) Close()
```

`Close` shuts down the mixer and all current sources. Calling this is required to release resources associated with the mixer.

### func (*FairMix) Next

```go
func (m *FairMix) Next() bool
```

`Next` returns a node from a random source.

### func (*FairMix) Node

```go
func (m *FairMix) Node() *Node
```

`Node` returns the current node.

### func (*FairMix) nextFromAny

```go
func (m *FairMix) nextFromAny() bool
```

`nextFromAny` is used when there are no sources or when the 'fair' choice doesn't turn up a node quickly enough.

### func (*FairMix) pickSource

```go
func (m *FairMix) pickSource() *mixSource
```

`pickSource` chooses the next source to read from, cycling through them in order.

### func (*FairMix) deleteSource

```go
func (m *FairMix) deleteSource(s *mixSource)
```

`deleteSource` deletes a source.

### func (*FairMix) runSource

```go
func (m *FairMix) runSource(closed chan struct{}, s *mixSource)
```

`runSource` reads a single source in a loop.