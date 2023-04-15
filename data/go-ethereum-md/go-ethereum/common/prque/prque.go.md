# Prque Package Documentation

The `prque` package implements a priority queue data structure that supports arbitrary value types and int64 priorities. It is a duplicated and slightly modified version of "gopkg.in/karalabe/cookiejar.v2/collections/prque".

## Package Functions

### New

```go
func New[P constraints.Ordered, V any](setIndex SetIndexCallback[V]) *Prque[P, V]
```

`New` creates a new priority queue and returns a pointer to it. It takes a `SetIndexCallback` function as an argument, which is used to set the index of an item in the priority queue.

### SetIndexCallback

```go
type SetIndexCallback[V any] func(V, int)
```

`SetIndexCallback` is a function type that takes a value and an integer index as arguments. It is used to set the index of an item in the priority queue.

## Prque Struct

### Prque

```go
type Prque[P constraints.Ordered, V any] struct {
	cont *sstack[P, V]
}
```

`Prque` is a priority queue data structure that holds a pointer to a `sstack` struct.

### Push

```go
func (p *Prque[P, V]) Push(data V, priority P)
```

`Push` adds a value with a given priority into the queue, expanding if necessary. It takes a value and a priority as arguments.

### Peek

```go
func (p *Prque[P, V]) Peek() (V, P)
```

`Peek` returns the value with the greatest priority but does not pop it off. It returns a value and a priority.

### Pop

```go
func (p *Prque[P, V]) Pop() (V, P)
```

`Pop` pops the value with the greatest priority off the stack and returns it. Currently, no shrinking is done. It returns a value and a priority.

### PopItem

```go
func (p *Prque[P, V]) PopItem() V
```

`PopItem` pops only the item from the queue, dropping the associated priority value. It returns a value.

### Remove

```go
func (p *Prque[P, V]) Remove(i int) V
```

`Remove` removes the element with the given index. It takes an integer index as an argument and returns a value.

### Empty

```go
func (p *Prque[P, V]) Empty() bool
```

`Empty` checks whether the priority queue is empty. It returns a boolean value.

### Size

```go
func (p *Prque[P, V]) Size() int
```

`Size` returns the number of elements in the priority queue. It returns an integer value.

### Reset

```go
func (p *Prque[P, V]) Reset()
```

`Reset` clears the contents of the priority queue. It takes no arguments and returns nothing.