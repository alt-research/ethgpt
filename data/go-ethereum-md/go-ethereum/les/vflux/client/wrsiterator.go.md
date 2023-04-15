# WrsIterator

The `WrsIterator` type is a struct that provides a way to iterate over a selectable set of nodes with a weighted random selection. It is defined in the `client` package.

## Fields

- `lock sync.Mutex`: A mutex to synchronize access to the iterator.
- `cond *sync.Cond`: A condition variable to signal when the iterator state changes.
- `ns *nodestate.NodeStateMachine`: A node state machine that manages the state of the nodes.
- `wrs *utils.WeightedRandomSelect`: A weighted random select instance that provides the random selection of nodes.
- `nextNode *enode.Node`: The next node to be returned by the iterator.
- `closed bool`: A flag indicating whether the iterator has been closed.

## Functions

### NewWrsIterator

```go
func NewWrsIterator(ns *nodestate.NodeStateMachine, requireFlags, disableFlags nodestate.Flags, weightField nodestate.Field) *WrsIterator
```

`NewWrsIterator` creates a new `WrsIterator` instance. It takes the following parameters:

- `ns *nodestate.NodeStateMachine`: A node state machine that manages the state of the nodes.
- `requireFlags nodestate.Flags`: A set of flags that nodes must have to be selectable.
- `disableFlags nodestate.Flags`: A set of flags that nodes must not have to be selectable.
- `weightField nodestate.Field`: The field that provides the weights for the nodes.

It returns a pointer to the new `WrsIterator` instance.

### Next

```go
func (w *WrsIterator) Next() bool
```

`Next` selects the next node in the iterator. It returns `true` if a node was selected, and `false` if there are no more nodes to select.

### chooseNode

```go
func (w *WrsIterator) chooseNode() *enode.Node
```

`chooseNode` selects a node from the selectable set with a weighted random selection. It returns a pointer to the selected node, or `nil` if there are no selectable nodes.

### Close

```go
func (w *WrsIterator) Close()
```

`Close` ends the iterator.

### Node

```go
func (w *WrsIterator) Node() *enode.Node
```

`Node` returns the current node in the iterator. It returns a pointer to the current node, or `nil` if there is no current node.