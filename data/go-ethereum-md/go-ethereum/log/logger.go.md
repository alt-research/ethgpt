Package log

The `log` package provides a simple logging interface for Go programs. It defines a `Logger` interface that can be used to write log messages to a `Handler`. The `Handler` is responsible for writing the log messages to a specific output, such as the console or a file.

The `log` package defines six log levels: Trace, Debug, Info, Warn, Error, and Crit. Each log level has a corresponding method on the `Logger` interface. The `Logger` interface also provides a `New` method that can be used to create a new logger with additional context.

The `log` package also defines a `Record` type that represents a log message. A `Record` contains the time the message was logged, the log level, the message itself, any context associated with the message, and information about the call stack.

The `log` package uses the `go-stack/stack` package to capture information about the call stack when a log message is written.

Functions

AlignedString

```go
func (l Lvl) AlignedString() string
```

`AlignedString` returns a 5-character string containing the name of a `Lvl`. This method is used to format the log level in a consistent way.

Example:

```go
lvl := LvlInfo
fmt.Println(lvl.AlignedString()) // Output: "INFO "
```

String

```go
func (l Lvl) String() string
```

`String` returns the name of a `Lvl`. This method is used to convert a `Lvl` to a string.

Example:

```go
lvl := LvlInfo
fmt.Println(lvl.String()) // Output: "info"
```

LvlFromString

```go
func LvlFromString(lvlString string) (Lvl, error)
```

`LvlFromString` returns the appropriate `Lvl` from a string name. This function is useful for parsing command line arguments and configuration files.

Example:

```go
lvl, err := LvlFromString("debug")
if err != nil {
    // handle error
}
fmt.Println(lvl) // Output: LvlDebug
```

Types

Lvl

```go
type Lvl int
```

`Lvl` represents a log level. The `log` package defines six log levels: Trace, Debug, Info, Warn, Error, and Crit.

Example:

```go
lvl := LvlInfo
```

Record

```go
type Record struct {
    Time     time.Time
    Lvl      Lvl
    Msg      string
    Ctx      []interface{}
    Call     stack.Call
    KeyNames RecordKeyNames
}
```

`Record` represents a log message. A `Record` contains the time the message was logged, the log level, the message itself, any context associated with the message, and information about the call stack.

Example:

```go
record := Record{
    Time: time.Now(),
    Lvl:  LvlInfo,
    Msg:  "Hello, world!",
    Ctx:  []interface{}{"key1", "val1", "key2", "val2"},
    Call: stack.Caller(skipLevel),
}
```

RecordKeyNames

```go
type RecordKeyNames struct {
    Time string
    Msg  string
    Lvl  string
    Ctx  string
}
```

`RecordKeyNames` gets stored in a `Record` when the write function is executed. It contains the names of the keys used to store the time, message, log level, and context in the `Record`.

Example:

```go
keyNames := RecordKeyNames{
    Time: "t",
    Msg:  "msg",
    Lvl:  "lvl",
    Ctx:  "ctx",
}
```

Logger

```go
type Logger interface {
    New(ctx ...interface{}) Logger
    GetHandler() Handler
    SetHandler(h Handler)
    Trace(msg string, ctx ...interface{})
    Debug(msg string, ctx ...interface{})
    Info(msg string, ctx ...interface{})
    Warn(msg string, ctx ...interface{})
    Error(msg string, ctx ...interface{})
    Crit(msg string, ctx ...interface{})
}
```

`Logger` writes key/value pairs to a `Handler`. It defines six methods for logging messages at different log levels. It also provides a `New` method that can be used to create a new logger with additional context.

Example:

```go
logger := New()
logger.Info("Hello, world!")
```

logger

```go
type logger struct {
    ctx []interface{}
    h   Handler
}
```

`logger` implements the `Logger` interface. It contains the context associated with the logger and the `Handler` used to write log messages.

Example:

```go
logger := &logger{
    ctx: []interface{}{"key1", "val1"},
    h:   NewConsoleHandler(),
}
``` ## Documentation for the Logger Codebase

### Function: swapHandler

```go
func (sh *swapHandler) Swap(newHandler Handler) {
	sh.Lock()
	defer sh.Unlock()
	sh.currentHandler = newHandler
}
```

The `swapHandler` function is a method that swaps the current handler with a new handler. It takes a new handler as an argument and replaces the current handler with it.

### Function: write

```go
func (l *logger) write(msg string, lvl Lvl, ctx []interface{}, skip int) {
	l.h.Log(&Record{
		Time: time.Now(),
		Lvl:  lvl,
		Msg:  msg,
		Ctx:  newContext(l.ctx, ctx),
		Call: stack.Caller(skip),
		KeyNames: RecordKeyNames{
			Time: timeKey,
			Msg:  msgKey,
			Lvl:  lvlKey,
			Ctx:  ctxKey,
		},
	})
}
```

The `write` function is a method that logs a message with a given level and context. It takes a message, level, context, and skip as arguments. It creates a new record with the current time, level, message, context, and caller information. It then logs the record using the current handler.

### Function: newContext

```go
func newContext(prefix []interface{}, suffix []interface{}) []interface{} {
	normalizedSuffix := normalize(suffix)
	newCtx := make([]interface{}, len(prefix)+len(normalizedSuffix))
	n := copy(newCtx, prefix)
	copy(newCtx[n:], normalizedSuffix)
	return newCtx
}
```

The `newContext` function creates a new context by concatenating a prefix and a suffix. It takes a prefix and a suffix as arguments. It normalizes the suffix by expanding it if it is a Ctx object and making sure it has an even number of elements. It then creates a new context by concatenating the prefix and the normalized suffix.

### Function: normalize

```go
func normalize(ctx []interface{}) []interface{} {
	// if the caller passed a Ctx object, then expand it
	if len(ctx) == 1 {
		if ctxMap, ok := ctx[0].(Ctx); ok {
			ctx = ctxMap.toArray()
		}
	}

	// ctx needs to be even because it's a series of key/value pairs
	// no one wants to check for errors on logging functions,
	// so instead of erroring on bad input, we'll just make sure
	// that things are the right length and users can fix bugs
	// when they see the output looks wrong
	if len(ctx)%2 != 0 {
		ctx = append(ctx, nil, errorKey, "Normalized odd number of arguments by adding nil")
	}

	return ctx
}
```

The `normalize` function normalizes a context by expanding it if it is a Ctx object and making sure it has an even number of elements. If the context has an odd number of elements, it adds a nil value with an error message to make it even.

### Function: Trace, Debug, Info, Warn, Error, Crit

```go
func (l *logger) Trace(msg string, ctx ...interface{}) {
	l.write(msg, LvlTrace, ctx, skipLevel)
}

func (l *logger) Debug(msg string, ctx ...interface{}) {
	l.write(msg, LvlDebug, ctx, skipLevel)
}

func (l *logger) Info(msg string, ctx ...interface{}) {
	l.write(msg, LvlInfo, ctx, skipLevel)
}

func (l *logger) Warn(msg string, ctx ...interface{}) {
	l.write(msg, LvlWarn, ctx, skipLevel)
}

func (l *logger) Error(msg string, ctx ...interface{}) {
	l.write(msg, LvlError, ctx, skipLevel)
}

func (l *logger) Crit(msg string, ctx ...interface{}) {
	l.write(msg, LvlCrit, ctx, skipLevel)
	os.Exit(1)
}
```

These functions are methods that log messages with different levels and contexts. They take a message and a context as arguments and call the `write` function with the appropriate level and skip value. The `Crit` function also exits the program with a status code of 1.

### Function: GetHandler

```go
func (l *logger) GetHandler() Handler {
	return l.h.Get()
}
```

The `GetHandler` function is a method that returns the current handler.

### Function: SetHandler

```go
func (l *logger) SetHandler(h Handler) {
	l.h.Swap(h)
}
```

The `SetHandler` function is a method that sets the current handler to a new handler. It takes a new handler as an argument and swaps it with the current handler using the `Swap` method of the `swapHandler` struct.

### Type: Lazy

```go
type Lazy struct {
	Fn interface{}
}
```

The `Lazy` type is a struct that represents a function that is expensive to compute. It is used to defer the calculation of a logged value until it is certain that it must be evaluated with the given filters.

### Type: Ctx

```go
type Ctx map[string]interface{}
```

The `Ctx` type is a map of key/value pairs to pass as context to a log function. It is used to provide greater safety around the arguments passed to the logging functions. The `toArray` method is used to convert the map to an array of alternating keys and values.