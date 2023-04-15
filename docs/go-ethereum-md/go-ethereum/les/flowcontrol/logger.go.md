# Documentation for flowcontrol package

The `flowcontrol` package provides flow control mechanisms for Ethereum nodes. It includes a logger that collects events in string format and discards events older than a specified duration.

## logger

The `logger` struct collects events in string format and discards events older than the "keep" parameter. It has the following fields:

- `events`: A map of `logEvent` objects, where the key is a uint64 value representing the index of the event.
- `writePtr`: A uint64 value representing the index of the next event to be written.
- `delPtr`: A uint64 value representing the index of the next event to be deleted.
- `keep`: A time.Duration value representing the duration to keep events.

The `logger` struct has the following methods:

### newLogger

```go
func newLogger(keep time.Duration) *logger
```

`newLogger` creates a new logger with the specified duration to keep events. It returns a pointer to the new logger.

### add

```go
func (l *logger) add(now mclock.AbsTime, event string)
```

`add` adds a new event to the logger and discards old events if possible. It takes in the current time as an `mclock.AbsTime` object and the event as a string.

### dump

```go
func (l *logger) dump(now mclock.AbsTime)
```

`dump` prints all stored events in the logger. It takes in the current time as an `mclock.AbsTime` object.