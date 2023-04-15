## Package testlog

The `testlog` package provides a log handler for unit tests. It contains two functions, `Handler` and `Logger`, which return a log handler and a logger respectively.

### Handler

The `Handler` function returns a log handler which logs to the unit test log of `t`. It takes two arguments, a pointer to a `testing.T` object and a `log.Lvl` object. The `log.Lvl` object specifies the minimum log level that should be logged.

```go
func Handler(t *testing.T, level log.Lvl) log.Handler
```

### Logger

The `Logger` function returns a logger which logs to the unit test log of `t`. It takes two arguments, a pointer to a `testing.T` object and a `log.Lvl` object. The `log.Lvl` object specifies the minimum log level that should be logged.

```go
func Logger(t *testing.T, level log.Lvl) log.Logger
```

## Structs

### handler

The `handler` struct is a private struct that implements the `log.Handler` interface. It has two fields, `t` and `fmt`. The `t` field is a pointer to a `testing.T` object and the `fmt` field is a `log.Format` object.

```go
type handler struct {
    t   *testing.T
    fmt log.Format
}
```

### logger

The `logger` struct is a private struct that implements the `log.Logger` interface. It has four fields, `t`, `l`, `mu`, and `h`. The `t` field is a pointer to a `testing.T` object, the `l` field is a `log.Logger` object, the `mu` field is a pointer to a `sync.Mutex` object, and the `h` field is a pointer to a `bufHandler` object.

```go
type logger struct {
    t  *testing.T
    l  log.Logger
    mu *sync.Mutex
    h  *bufHandler
}
```

### bufHandler

The `bufHandler` struct is a private struct that implements the `log.Handler` interface. It has two fields, `buf` and `fmt`. The `buf` field is a slice of `*log.Record` objects and the `fmt` field is a `log.Format` object.

```go
type bufHandler struct {
    buf []*log.Record
    fmt log.Format
}
```

## Methods

### handler.Log

The `Log` method is a method of the `handler` struct. It takes a pointer to a `log.Record` object as an argument and returns an error. It logs the record to the unit test log of `t`.

```go
func (h *handler) Log(r *log.Record) error
```

### logger.Trace

The `Trace` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs a trace message to the unit test log of `t`.

```go
func (l *logger) Trace(msg string, ctx ...interface{})
```

### logger.Debug

The `Debug` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs a debug message to the unit test log of `t`.

```go
func (l *logger) Debug(msg string, ctx ...interface{})
```

### logger.Info

The `Info` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs an info message to the unit test log of `t`.

```go
func (l *logger) Info(msg string, ctx ...interface{})
```

### logger.Warn

The `Warn` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs a warning message to the unit test log of `t`.

```go
func (l *logger) Warn(msg string, ctx ...interface{})
```

### logger.Error

The `Error` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs an error message to the unit test log of `t`.

```go
func (l *logger) Error(msg string, ctx ...interface{})
```

### logger.Crit

The `Crit` method is a method of the `logger` struct. It takes a message string and a variadic number of context interface{} objects as arguments. It logs a critical message to the unit test log of `t`.

```go
func (l *logger) Crit(msg string, ctx ...interface{})
```

### logger.New

The `New` method is a method of the `logger` struct. It takes a variadic number of context interface{} objects as arguments and returns a `log.Logger` object. It creates a new logger with the same `testing.T` object as `l` and the same `bufHandler` object as `l.h`.

```go
func (l *logger) New(ctx ...interface{}) log.Logger
```

### logger.GetHandler

The `GetHandler` method is a method of the `logger` struct. It takes no arguments and returns a `log.Handler` object. It returns the handler of the `log.Logger` object `l`.

```go
func (l *logger) GetHandler() log.Handler
```

### logger.SetHandler

The `SetHandler` method is a method of the `logger` struct. It takes a `log.Handler` object as an argument and returns nothing. It sets the handler of the `log.Logger` object `l` to the given handler.

```go
func (l *logger) SetHandler(h log.Handler)
```

### logger.flush

The `flush` method is a private method of the `logger` struct. It takes no arguments and returns nothing. It writes all buffered messages to the unit test log of `t` and clears the buffer.

```go
func (l *logger) flush()
```