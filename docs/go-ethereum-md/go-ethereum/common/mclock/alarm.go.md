# Alarm Implementation in Go

This is an implementation of an Alarm in Go. The Alarm sends timed notifications on a channel. It is similar to a regular timer but is easier to use in code that needs to re-schedule the same timer over and over. When scheduling an Alarm, the channel returned by `C()` will receive a value no later than the scheduled time. An Alarm can be reused after it has fired and can also be canceled by calling `Stop`.

## Alarm

The `Alarm` type is a struct that represents an Alarm. It has the following fields:

```go
type Alarm struct {
    ch       chan struct{}
    clock    Clock
    timer    Timer
    deadline AbsTime
}
```

### Fields

- `ch chan struct{}`: The channel on which the notifications are sent.
- `clock Clock`: The clock used to schedule the notifications.
- `timer Timer`: The timer used to schedule the notifications.
- `deadline AbsTime`: The deadline for the next notification.

### Methods

#### Function: NewAlarm

The `NewAlarm` function creates a new instance of the `Alarm` type.

##### Parameters

- `clock Clock`: The clock used to schedule the notifications.

##### Returns

- `*Alarm`: A pointer to a new instance of the `Alarm` type.

##### Example

```go
alarm := NewAlarm(systemClock{})
```

#### Method: C

The `C` method returns the alarm notification channel. This channel remains identical for the entire lifetime of the alarm and is never closed.

##### Returns

- `<-chan struct{}`: The channel on which the notifications are sent.

##### Example

```go
ch := alarm.C()
```

#### Method: Stop

The `Stop` method cancels the alarm and drains the channel. This method is not safe for concurrent use.

##### Example

```go
alarm.Stop()
```

#### Method: Schedule

The `Schedule` method sets the alarm to fire no later than the given time. If the alarm was already scheduled but has not fired yet, it may fire earlier than the newly-scheduled time.

##### Parameters

- `time AbsTime`: The time at which the alarm should fire.

##### Example

```go
alarm.Schedule(now.Add(time.Second))
```

#### Method: schedule

The `schedule` method sets the timer for the alarm.

##### Parameters

- `now AbsTime`: The current time.
- `newDeadline AbsTime`: The deadline for the next notification.

##### Example

This method is not intended to be called directly.

#### Method: send

The `send` method sends a notification on the channel.

##### Example

This method is not intended to be called directly.

## Conclusion

This implementation of an Alarm in Go provides a simple and efficient way to schedule timed notifications. The `Alarm` type can be used to schedule notifications that need to be re-scheduled over and over. The `C()` method returns the channel on which the notifications are sent, and the `Stop()` method cancels the alarm and drains the channel. The `Schedule()` method sets the alarm to fire no later than the given time.