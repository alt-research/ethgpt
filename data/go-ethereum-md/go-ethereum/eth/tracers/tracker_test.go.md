## Tracers Package

The `Tracers` package provides a state tracker for tracing Ethereum transactions. It includes functions for releasing states and waiting for available states.

### `TestTracker`

This function is a test function that tests the `newStateTracker` function. It takes in a test object that contains a limit, a list of calls, and an expected head. It then creates a new state tracker with the given limit and iterates through the list of calls, releasing each state. Finally, it checks if the head of the state tracker matches the expected head.

### `TestTrackerWait`

This function is a test function that tests the `wait` function of the state tracker. It creates a new state tracker with a limit of 5 and an oldest state of 0. It then creates a channel for the result and defines two helper functions, `checkNoWait` and `checkWait`. The `checkNoWait` function checks if the result channel has received a signal within a second, and the `checkWait` function checks if the result channel has not received a signal within 100 milliseconds. 

The function then calls `doCall` with the argument 0 and checks if `checkNoWait` returns true. It then calls `doCall` with the argument 4 and checks if `checkNoWait` returns true. It then calls `doCall` with the argument 5 and checks if `checkWait` returns true. It then releases state 0 and checks if `checkNoWait` returns true. It then calls `doCall` with the argument 7 and checks if `checkWait` returns true. Finally, it releases state 2 and checks if `checkNoWait` returns true. 

### `newStateTracker`

```go
func newStateTracker(limit int, oldest uint64) *stateTracker
```

This function creates a new state tracker with the given limit and oldest state. It returns a pointer to the new state tracker.

### `stateTracker.releaseState`

```go
func (t *stateTracker) releaseState(number uint64, callback func())
```

This function releases the state with the given number and calls the given callback function. It updates the state tracker's `used` array and `oldest` state.

### `stateTracker.wait`

```go
func (t *stateTracker) wait(number uint64) error
```

This function waits for the state with the given number to become available. It returns an error if the state is not available within a certain amount of time. ## Function: `available`

The `available` function is a helper function that is used to release the state of the `tracker` object and check if the wait is necessary. 

### Parameters
This function does not take any parameters.

### Return Value
This function does not return any value.

### Functionality
The `available` function is used to release the state of the `tracker` object and check if the wait is necessary. It does this by calling the `releaseState` function of the `tracker` object with a state value of `1` and a `nil` error value. This indicates that the state is now available for use. 

Next, the `checkWait` function is called to check if the wait is necessary. If the wait is necessary, the function will block until the state is available. 

Finally, the `releaseState` function is called again with a state value of `2` and a `nil` error value. This indicates that the state is now available for use in the range of states `[3, 8)`.

### Example Usage
```go
available()
```