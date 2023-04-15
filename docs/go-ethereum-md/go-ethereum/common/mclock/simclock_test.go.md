# Simulated Clock Implementation in Go

This is an implementation of a simulated clock in Go. The `Simulated` type is used to simulate the passage of time in a controlled manner. The `Simulated` type is defined as follows:

```go
type Simulated struct {
    // ...
}
```

### Fields

- `now AbsTime`: The current time of the simulated clock.
- `timers timerHeap`: A heap of timers that are scheduled to fire in the future.

### Methods

#### Method: Run

The `Run` method advances the simulated clock by a given duration.

##### Parameters

- `duration time.Duration`: The duration to advance the clock by.

##### Example

```go
c.Run(1 * time.Second)
```

#### Method: Now

The `Now` method returns the current time of the simulated clock.

##### Returns

- `AbsTime`: The current time of the simulated clock.

##### Example

```go
now := c.Now()
```

#### Method: After

The `After` method returns a channel that will be sent the current time of the simulated clock after a given duration.

##### Parameters

- `duration time.Duration`: The duration to wait before sending the current time.

##### Returns

- `<-chan AbsTime`: A channel that will be sent the current time of the simulated clock after the given duration.

##### Example

```go
ch := c.After(1 * time.Second)
select {
case now := <-ch:
    fmt.Printf("Current time: %v\n", now)
}
```

#### Method: AfterFunc

The `AfterFunc` method schedules a function to be called after a given duration.

##### Parameters

- `duration time.Duration`: The duration to wait before calling the function.
- `f func()`: The function to call.

##### Returns

- `*Timer`: A timer that can be used to stop the function from being called.

##### Example

```go
timer := c.AfterFunc(1 * time.Second, func() {
    fmt.Println("Function called")
})
```

#### Method: Sleep

The `Sleep` method blocks until a given duration has elapsed.

##### Parameters

- `duration time.Duration`: The duration to wait.

##### Example

```go
c.Sleep(1 * time.Second)
```

#### Method: NewTimer

The `NewTimer` method creates a new timer that will fire after a given duration.

##### Parameters

- `duration time.Duration`: The duration to wait before firing the timer.

##### Returns

- `*Timer`: A new timer.

##### Example

```go
timer := c.NewTimer(1 * time.Second)
```

#### Method: WaitForTimers

The `WaitForTimers` method blocks until a given number of timers have fired.

##### Parameters

- `n int`: The number of timers to wait for.

##### Example

```go
c.WaitForTimers(1)
```

#### Method: ActiveTimers

The `ActiveTimers` method returns the number of active timers.

##### Returns

- `int`: The number of active timers.

##### Example

```go
numTimers := c.ActiveTimers()
```

#### Method: StopTimer

The `StopTimer` method stops a timer from firing.

##### Parameters

- `timer *Timer`: The timer to stop.

##### Returns

- `bool`: `true` if the timer was stopped, `false` if the timer has already fired.

##### Example

```go
if c.StopTimer(timer) {
    fmt.Println("Timer stopped")
}
```

## Testing

The `TestSimulatedAfter` function tests the `After` method by waiting for a channel to be sent the current time of the simulated clock after a given duration.

The `TestSimulatedAfterFunc` function tests the `AfterFunc` method by scheduling a function to be called after a given duration.

The `TestSimulatedSleep` function tests the `Sleep` method by blocking until a given duration has elapsed.

The `TestSimulatedTimerReset` function tests the `Reset` method of a timer by resetting the timer and waiting for it to fire again.

The `TestSimulatedTimerStop` function tests the `Stop` method of a timer by stopping the timer and checking that it does not fire.

## Conclusion

This implementation of a simulated clock in Go provides a way to simulate the passage of time in a controlled manner. The `Simulated` type provides methods for scheduling timers and waiting for them to fire, as well as methods for advancing the clock and blocking until a given duration has elapsed. ## Function: ct

The `ct` function is a helper function used in testing to ensure that a timer has fired. It takes in a `*testing.T` object and a `time.Timer` object as parameters. 

### Parameters

- `t *testing.T`: A pointer to a `testing.T` object used for reporting test failures.
- `timer *time.Timer`: A pointer to a `time.Timer` object that is being tested.

### Behavior

The `ct` function waits for the timer to fire using a select statement with a default case to ensure that the function does not block indefinitely. If the timer does not fire, the function reports a test failure using the `t.Fatal` method.

### Example

```go
func TestMyFunction(t *testing.T) {
    timer := time.NewTimer(time.Second)
    // Do something that should cause the timer to fire
    ct(t, timer)
    // Continue with the test
}
```