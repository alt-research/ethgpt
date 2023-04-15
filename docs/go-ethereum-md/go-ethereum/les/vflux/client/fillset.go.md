# Introduction

This is a Go package that implements a FillSet data structure. The FillSet tries to read nodes from an input iterator and add them to a node set by setting the specified node state flag(s) until the size of the set reaches the target. This package is part of the go-ethereum library, which is free software under the GNU Lesser General Public License.

# Functions

## NewFillSet

```go
func NewFillSet(ns *nodestate.NodeStateMachine, input enode.Iterator, flags nodestate.Flags) *FillSet
```

NewFillSet creates a new FillSet. It takes a NodeStateMachine, an enode.Iterator, and a nodestate.Flags as input parameters. It returns a pointer to a new FillSet.

## readLoop

```go
func (fs *FillSet) readLoop()
```

readLoop keeps reading nodes from the input and setting the specified flags for them whenever the node set size is under the current target.

## SetTarget

```go
func (fs *FillSet) SetTarget(target int)
```

SetTarget sets the current target for node set size. If the previous target was not reached and FillSet was still waiting for the next node from the input then the next incoming node will be added to the set regardless of the target.

## Close

```go
func (fs *FillSet) Close()
```

Close shuts FillSet down and closes the input iterator.

# Variables

## FillSet

```go
type FillSet struct {
	lock          sync.Mutex
	cond          *sync.Cond
	ns            *nodestate.NodeStateMachine
	input         enode.Iterator
	closed        bool
	flags         nodestate.Flags
	count, target int
}
```

FillSet is a struct that contains a lock, a condition variable, a NodeStateMachine, an enode.Iterator, a boolean value, a nodestate.Flags, and two integer values. The lock and condition variable are used to synchronize access to the FillSet. The NodeStateMachine is used to manage the state of the nodes in the FillSet. The enode.Iterator is used to iterate over the nodes. The boolean value is used to indicate whether the FillSet is closed or not. The nodestate.Flags is used to specify the state of the nodes. The two integer values are used to keep track of the number of nodes in the FillSet and the target number of nodes.