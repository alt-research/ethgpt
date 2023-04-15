# Simulated Clock Implementation in Go

This is an implementation of a simulated clock in Go. The simulated clock is used for reproducible time-sensitive tests. It simulates a scheduler on a virtual timescale where actual processing takes zero time.

## Simulated

The `Simulated` type is a virtual clock that can be used for testing. It is defined as follows:

```go
type Simulated struct {
    now       AbsTime
    scheduled simTimerHeap
    mu        sync.RWMutex
    cond      *sync.Cond
}
```

### Fields

- `now AbsTime`: The current virtual time.
- `scheduled simTimerHeap`: A heap of scheduled timers.
- `mu sync.RWMutex`: A mutex to protect access to the clock.
- `cond *sync.Cond`: A condition variable to signal when timers are scheduled.

### Methods

#### Method: Run

The `Run` method moves the clock by the given duration, executing all timers before that duration.

##### Parameters

- `d time.Duration`: The duration to advance the clock.

##### Example

```go
clock := &Simulated{}
clock.Run(time.Second)
```

#### Method: ActiveTimers

The `ActiveTimers` method returns the number of timers that haven't fired.

##### Returns

- `int`: The number of active timers.

##### Example

```go
clock := &Simulated{}
activeTimers := clock.ActiveTimers()
```

#### Method: WaitForTimers

The `WaitForTimers` method waits until the clock has at least n scheduled timers.

##### Parameters

- `n int`: The number of timers to wait for.

##### Example

```go
clock := &Simulated{}
clock.WaitForTimers(5)
```

#### Method: Now

The `Now` method returns the current virtual time.

##### Returns

- `AbsTime`: The current virtual time.

##### Example

```go
clock := &Simulated{}
now := clock.Now()
```

#### Method: Sleep

The `Sleep` method blocks until the clock has advanced by d.

##### Parameters

- `d time.Duration`: The duration to sleep.

##### Example

```go
clock := &Simulated{}
clock.Sleep(time.Second)
```

#### Method: NewTimer

The `NewTimer` method creates a timer which fires when the clock has advanced by d.

##### Parameters

- `d time.Duration`: The duration to wait before firing the timer.

##### Returns

- `ChanTimer`: A timer that can be used to receive the time when the timer fires.

##### Example

```go
clock := &Simulated{}
timer := clock.NewTimer(time.Second)
```

#### Method: After

The `After` method returns a channel which receives the current time after the clock has advanced by d.

##### Parameters

- `d time.Duration`: The duration to wait before sending the current time.

##### Returns

- `<-chan AbsTime`: A channel that can be used to receive the current time.

##### Example

```go
clock := &Simulated{}
after := clock.After(time.Second)
```

#### Method: AfterFunc

The `AfterFunc` method runs fn after the clock has advanced by d.

##### Parameters

- `d time.Duration`: The duration to wait before running fn.
- `fn func()`: The function to run.

##### Returns

- `Timer`: A timer that can be used to cancel the function.

##### Example

```go
clock := &Simulated{}
timer := clock.AfterFunc(time.Second, func() {
    fmt.Println("Timer fired")
})
```

## Conclusion

This implementation of a simulated clock in Go provides a simple and efficient way to test time-sensitive code. The `Simulated` type can be used to simulate the passage of time and schedule timers to fire at specific times. # Documentation for simTimer Package

The `simTimer` package provides a simulation timer that can be used to schedule events in a simulated environment. The package implements a timer that can be used to schedule events to occur at a specific time in the future. The timer is implemented using a heap data structure to keep track of the scheduled events.

## simTimer

The `simTimer` type represents a timer that can be used to schedule events in a simulated environment. The timer is implemented using a heap data structure to keep track of the scheduled events.

### Function: NewSimTimer

The `NewSimTimer` function creates a new instance of the `simTimer` type.

##### Parameters

- `now AbsTime`: The current time in the simulated environment.
- `cond *sync.Cond`: A condition variable that is used to signal when a timer event has occurred.
- `fn func()`: A function that is called when the timer event occurs.

##### Returns

- `*simTimer`: A pointer to a new instance of the `simTimer` type.

##### Example

```go
s := NewSimTimer(now, cond, func() {
    fmt.Println("Timer event occurred")
})
```

### Method: Stop

The `Stop` method stops the timer.

##### Returns

- `bool`: `true` if the timer was stopped, `false` otherwise.

##### Example

```go
if s.Stop() {
    fmt.Println("Timer stopped")
}
```

### Method: Reset

The `Reset` method resets the timer to fire after a specified duration.

##### Parameters

- `d time.Duration`: The duration after which the timer should fire.

##### Example

```go
s.Reset(10 * time.Second)
```

### Method: C

The `C` method returns a channel that can be used to receive the time at which the timer event occurred.

##### Returns

- `<-chan AbsTime`: A channel that can be used to receive the time at which the timer event occurred.

##### Example

```go
ch := s.C()
t := <-ch
fmt.Printf("Timer event occurred at %v\n", t)
```

## simTimerHeap

The `simTimerHeap` type is a heap data structure that is used to keep track of the scheduled events in the `simTimer` type.

### Method: Len

The `Len` method returns the number of items in the heap.

##### Returns

- `int`: The number of items in the heap.

##### Example

```go
h := &simTimerHeap{}
fmt.Printf("Heap length: %d\n", h.Len())
```

### Method: Less

The `Less` method compares two items in the heap and returns `true` if the first item is less than the second item.

##### Parameters

- `i int`: The index of the first item.
- `j int`: The index of the second item.

##### Returns

- `bool`: `true` if the first item is less than the second item, `false` otherwise.

##### Example

```go
h := &simTimerHeap{}
if h.Less(0, 1) {
    fmt.Println("First item is less than second item")
}
```

### Method: Swap

The `Swap` method swaps two items in the heap.

##### Parameters

- `i int`: The index of the first item.
- `j int`: The index of the second item.

##### Example

```go
h := &simTimerHeap{}
h.Swap(0, 1)
```

### Method: Push

The `Push` method adds an item to the heap.

##### Parameters

- `x interface{}`: The item to add to the heap.

##### Example

```go
h := &simTimerHeap{}
t := &simTimer{}
h.Push(t)
```

### Method: Pop

The `Pop` method removes the top item from the heap.

##### Returns

- `interface{}`: The top item from the heap.

##### Example

```go
h := &simTimerHeap{}
t := h.Pop().(*simTimer)
```