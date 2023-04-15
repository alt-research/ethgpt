# UpdateTimer

The `UpdateTimer` struct is a utility for tracking the time elapsed between updates and triggering a callback function when a certain threshold has been reached. It is used to avoid excessive updates in a system that requires periodic updates.

## Struct Definition

```go
type UpdateTimer struct {
	clock     mclock.Clock
	lock      sync.Mutex
	last      mclock.AbsTime
	threshold time.Duration
}
```

The `UpdateTimer` struct has four fields:
- `clock`: an instance of the `mclock.Clock` interface that provides the current time.
- `lock`: a mutex to synchronize access to the `last` field.
- `last`: the last time the `Update` method was called.
- `threshold`: the minimum time that must elapse before the `Update` method triggers the callback function.

## Functions

### NewUpdateTimer

```go
func NewUpdateTimer(clock mclock.Clock, threshold time.Duration) *UpdateTimer
```

The `NewUpdateTimer` function creates a new instance of the `UpdateTimer` struct with the specified clock and threshold values. It returns a pointer to the new instance.

### Update

```go
func (t *UpdateTimer) Update(callback func(diff time.Duration) bool) bool
```

The `Update` method updates the `last` field with the current time and triggers the callback function if the elapsed time since the last update is greater than or equal to the `threshold` value. It returns a boolean value indicating whether the callback function was triggered.

### UpdateAt

```go
func (t *UpdateTimer) UpdateAt(at mclock.AbsTime, callback func(diff time.Duration) bool) bool
```

The `UpdateAt` method updates the `last` field with the specified time and triggers the callback function if the elapsed time since the last update is greater than or equal to the `threshold` value. It