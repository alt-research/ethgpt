# mclock Package Documentation

The `mclock` package is a wrapper for a monotonic clock source. It provides a way to measure time that is not affected by system clock changes, such as time adjustments or leap seconds.

## Functions

### `Now() AbsTime`

The `Now()` function returns the current absolute monotonic time.

### `(t AbsTime) Add(d time.Duration) AbsTime`

The `Add()` method returns `t + d` as absolute time.

### `(t AbsTime) Sub(t2 AbsTime) time.Duration`

The `Sub()` method returns `t - t2` as a duration.

## Interfaces

### `Clock`

The `Clock` interface makes it possible to replace the monotonic system clock with a simulated clock.

#### `Now() AbsTime`

The `Now()` method returns the current absolute monotonic time.

#### `Sleep(time.Duration)`

The `Sleep()` method blocks for the given duration.

#### `NewTimer(time.Duration) ChanTimer`

The `NewTimer()` method creates a timer which can be rescheduled.

#### `After(time.Duration) <-chan AbsTime`

The `After()` method returns a channel which receives the current time after `d` has elapsed.

#### `AfterFunc(time.Duration, func()) Timer`

The `AfterFunc()` method runs `f` on a new goroutine after the duration has elapsed.

### `Timer`

The `Timer` interface is a cancellable event created by `AfterFunc()`.

#### `Stop() bool`

The `Stop()` method cancels the timer. It returns `false` if the timer has already expired or been stopped.

### `ChanTimer`

The `ChanTimer` interface is a cancellable event created by `NewTimer()`.

#### `Timer`

The `Timer` interface is embedded in `ChanTimer`.

#### `C() <-chan AbsTime`

The `C()` method returns the channel that receives a value when the timer expires.

#### `Reset(time.Duration)`

The `Reset()` method reschedules the timer with a new timeout. It should be invoked only on stopped or expired timers with drained channels.

## Types

### `AbsTime`

The `AbsTime` type represents absolute monotonic time.

### `System`

The `System` type implements `Clock` using the system clock.

## Notes

This package uses the `runtime.nanotime()` function to get the current monotonic time. The `unsafe` package is used to import this function.