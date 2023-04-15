# mclock Package

The `mclock` package provides a simulated clock implementation for testing purposes. It includes an `Alarm` type that can be used to schedule events to occur at a specific time.

## Simulated

The `Simulated` type is a simulated clock implementation that can be used for testing purposes. It provides methods for advancing the clock and scheduling timers.

### Methods

#### Method: Now

The `Now` method returns the current time of the simulated clock.

##### Returns

- `int64`: The current time of the simulated clock.

##### Example

```go
clk := new(Simulated)
now := clk.Now()
```

#### Method: Run

The `Run` method advances the simulated clock by a specified amount of time and processes any scheduled timers.

##### Parameters

- `time int64`: The amount of time to advance the clock.

##### Example

```go
clk := new(Simulated)
clk.Run(10)
```

#### Method: Schedule

The `Schedule` method schedules a timer to fire at a specified time.

##### Parameters

- `time int64`: The time at which the timer should fire.
- `callback func()`: The function to call when the timer fires.

##### Example

```go
clk := new(Simulated)
clk.Schedule(10, func() {
    fmt.Println("Timer fired")
})
```

#### Method: ActiveTimers

The `ActiveTimers` method returns the number of active timers on the simulated clock.

##### Returns

- `int`: The number of active timers on the simulated clock.

##### Example

```go
clk := new(Simulated)
ntimers := clk.ActiveTimers()
```

## Alarm

The `Alarm` type is used to schedule events to occur at a specific time.

### Methods

#### Function: NewAlarm

The `NewAlarm` function creates a new instance of the `Alarm` type.

##### Parameters

- `clock Clock`: The clock to use for scheduling events.

##### Returns

- `*Alarm`: A pointer to a new instance of the `Alarm` type.

##### Example

```go
clk := new(Simulated)
a := NewAlarm(clk)
```

#### Method: Schedule

The `Schedule` method schedules the alarm to fire at a specified time.

##### Parameters

- `time int64`: The time at which the alarm should fire.

##### Example

```go
clk := new(Simulated)
a := NewAlarm(clk)
a.Schedule(10)
```

#### Method: C

The `C` method returns a channel that will be closed when the alarm fires.

##### Returns

- `<-chan struct{}`: A channel that will be closed when the alarm fires.

##### Example

```go
clk := new(Simulated)
a := NewAlarm(clk)
<-a.C()
```

## Testing

The `TestAlarm` function tests the basic functionality of the `Alarm` type. It schedules an alarm to fire at a specific time and checks that it fires at the correct time.

The `TestAlarmScheduleEarlier` function tests that scheduling an alarm to an earlier time than the one already scheduled works properly.

The `TestAlarmScheduleLater` function tests that scheduling an alarm to a later time than the one already scheduled works properly.

The `TestAlarmNegative` function tests that scheduling an alarm in the past makes it fire immediately.

The `recv` function is a helper function that checks if a channel has received a value.

## Conclusion

The `mclock` package provides a simulated clock implementation and an `Alarm` type that can be used for testing purposes. The `Simulated` type provides methods for advancing the clock and scheduling timers, while the `Alarm` type provides a way to schedule events to occur at a specific time. The tests ensure that the `Alarm` type works as expected in various scenarios.