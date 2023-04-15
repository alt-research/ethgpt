# ClosableMutex

The `ClosableMutex` is a mutex that can also be closed. Once closed, it can never be taken again. This package contains exotic synchronization primitives.

## Functions

### NewClosableMutex

```go
func NewClosableMutex() *ClosableMutex
```

`NewClosableMutex` creates a new `ClosableMutex` and returns a pointer to it. It initializes the mutex with a buffered channel of size 1.

### TryLock

```go
func (cm *ClosableMutex) TryLock() bool
```

`TryLock` attempts to lock the `ClosableMutex`. If the mutex is closed, `TryLock` returns false.

### MustLock

```go
func (cm *ClosableMutex) MustLock()
```

`MustLock` locks the `ClosableMutex`. If the mutex is closed, `MustLock` panics.

### Unlock

```go
func (cm *ClosableMutex) Unlock()
```

`Unlock` unlocks the `ClosableMutex`.

### Close

```go
func (cm *ClosableMutex) Close()
```

`Close` locks the mutex, then closes it. If the mutex is already closed, `Close` panics.