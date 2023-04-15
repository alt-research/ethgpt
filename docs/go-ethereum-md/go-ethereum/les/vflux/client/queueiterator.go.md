## QueueIterator

The `QueueIterator` type is a struct that provides an iterator over a selectable set of nodes. It is used to iterate over a set of nodes that have all the required and none of the disabled flags set. When a node is selected, the selectedFlag is set which also disables further selectability until it is removed or times out.

### Fields

- `lock sync.Mutex`: A mutex to synchronize access to the `QueueIterator` fields.
- `cond *sync.Cond`: A condition variable to signal when a new node is added to the queue.
- `ns *nodestate.NodeStateMachine`: A `NodeStateMachine` instance to subscribe to node state changes.
- `queue []*enode.Node`: A slice of `enode.Node` instances representing the selectable nodes.
- `nextNode *enode.Node`: A pointer to the next node in the queue.
- `waitCallback func(bool)`: A callback function to be called when the iterator is waiting for a new node to be added to the queue.
- `fifo, closed bool`: A boolean flag indicating whether the queue should be treated as a FIFO or LIFO, and whether the iterator is closed or not.

### Functions

#### NewQueueIterator

```go
func NewQueueIterator(ns *nodestate.NodeStateMachine, requireFlags, disableFlags nodestate.Flags, fifo bool, waitCallback func(bool)) *QueueIterator
```

`NewQueueIterator` creates a new `QueueIterator` instance. It takes the following parameters:

- `ns *nodestate.NodeStateMachine`: A `NodeStateMachine` instance to subscribe to node state changes.
- `requireFlags, disableFlags nodestate.Flags`: The required and disabled flags for the selectable nodes.
- `fifo bool`: A boolean flag indicating whether the queue should be treated as a FIFO or LIFO.
- `waitCallback func(bool)`: A callback function to be called when the iterator is waiting for a new node to be added to the queue.

#### Next

```go
func (qi *QueueIterator) Next() bool
```

`Next` moves to the next selectable node. It returns a boolean indicating whether there is a next node or not.

#### Close

```go
func (qi *QueueIterator) Close()
```

`Close` ends the iterator.

#### Node

```go
func (qi *QueueIterator) Node() *enode.Node
```

`Node` returns the current node. It returns a pointer to the current `enode.Node` instance.