# Update Timer

The `UpdateTimer` is a utility function that allows for the creation of a timer that can be updated based on a threshold. The timer is created using a clock implementation and a threshold duration. The clock implementation is used to track the time and the threshold duration is used to determine when the timer should be updated.

## Functions

### NewUpdateTimer

```go
func NewUpdateTimer(clock mclock.Clock, threshold time.Duration) *UpdateTimer
```

The `NewUpdateTimer` function creates a new `UpdateTimer` instance using the provided clock implementation and threshold duration. If the threshold duration is negative, the function returns `nil`.

### Update

```go
func (t *UpdateTimer) Update(updateFunc func(diff time.Duration) bool) bool
```

The `Update` function updates the timer and calls the provided `updateFunc` function if the threshold duration has been reached. The `updateFunc` function takes a `diff` parameter that represents the time difference between the last update and the current update. If the `updateFunc` function returns `true`, the timer is considered updated and the function returns `true`. Otherwise, the function returns `false`.

### UpdateAt

```go
func (t *UpdateTimer) UpdateAt(when time.Time, updateFunc func(diff time.Duration) bool) bool
```

The `UpdateAt` function updates the timer at a specific time and calls the provided `updateFunc` function if the threshold duration has been reached. The `when` parameter represents the time at which the timer should be updated. The `updateFunc` function takes a `diff` parameter that represents the time difference between the last update and the current update. If the `updateFunc` function returns `true`, the timer is considered updated and the function returns `true`. Otherwise, the function returns `false`.

## Testing

The `TestUpdateTimer` function tests the `UpdateTimer` functionality. It creates a new `UpdateTimer` instance using