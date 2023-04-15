## Package log

The `log` package provides a simple logging interface for Go programs. It defines a `Logger` interface and a default implementation of that interface, `logger`. The `logger` implementation provides methods for logging messages at different levels of severity, including trace, debug, info, warn, error, and crit. 

### Variables

#### root

`root` is a pointer to the root logger. It is initialized with an empty context and a `swapHandler` that discards all log messages.

#### StdoutHandler

`StdoutHandler` is a `Handler` that writes log messages to standard output using the `LogfmtFormat` format.

#### StderrHandler

`StderrHandler` is a `Handler` that writes log messages to standard error using the `LogfmtFormat` format.

### Functions

#### init

`init` is a function that initializes the `root` logger with a `DiscardHandler`, which discards all log messages.

#### New

`New` returns a new logger with the given context. It is a convenient alias for `Root().New`.

##### Parameters

- `ctx ...interface{}`: context key/value pairs to include in log messages.

##### Returns

- `Logger`: a new logger with the given context.

#### Root

`Root` returns the root logger.

##### Returns

- `Logger`: the root logger.

#### Trace

`Trace` is a function that logs a message at the trace level with context key/value pairs. It is a convenient alias for `Root().Trace`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Debug

`Debug` is a function that logs a message at the debug level with context key/value pairs. It is a convenient alias for `Root().Debug`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Info

`Info` is a function that logs a message at the info level with context key/value pairs. It is a convenient alias for `Root().Info`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Warn

`Warn` is a function that logs a message at the warn level with context key/value pairs. It is a convenient alias for `Root().Warn`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Error

`Error` is a function that logs a message at the error level with context key/value pairs. It is a convenient alias for `Root().Error`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Crit

`Crit` is a function that logs a message at the crit level with context key/value pairs, and then exits the program with an exit code of 1. It is a convenient alias for `Root().Crit`.

##### Parameters

- `msg string`: the log message.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

#### Output

`Output` is a function that logs a message at the specified level with context key/value pairs, and allows for the modification of the call depth (number of stack frames to skip). It is a convenient alias for `write`.

##### Parameters

- `msg string`: the log message.
- `lvl Lvl`: the log level.
- `calldepth int`: the number of stack frames to skip.
- `ctx ...interface{}`: context key/value pairs to include in log messages.

### Example Usage

```go
package main

import (
	"github.com/example/log"
)

func main() {
	// Log a message at the info level with context key/value pairs
	log.Info("Starting application", "port", 8080)

	// Log a message at the error level with context key/value pairs
	log.Error("Failed to start application", "error", "port already in use")

	// Log a message at the crit level with context key/value pairs, and exit the program
	log.Crit("Fatal error occurred", "error", "unable to start application")
}
```