# ExecQueue

`ExecQueue` is a Go package that implements a queue that executes function calls in a single thread, in the same order as they have been queued.

## Usage

### NewExecQueue

`NewExecQueue` creates a new execution queue with a given capacity.

```go
func NewExecQueue(capacity int) *ExecQueue
```

### Queue

`Queue` adds a function call to the execution queue