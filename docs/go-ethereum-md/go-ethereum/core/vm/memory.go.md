## Memory

The `Memory` type implements a simple memory model for the Ethereum virtual machine.

### NewMemory

```go
func NewMemory() *Memory
```

`NewMemory` returns a new memory model.

### Set

```go
func (m *Memory) Set(offset, size uint64, value []byte)
```

`Set` sets the memory at the given `offset` and `size` to the given `value`.

### Set32

```go
func (m *Memory) Set32(offset uint64, val *uint