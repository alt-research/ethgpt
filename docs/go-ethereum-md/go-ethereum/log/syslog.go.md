# Documentation for log package

The `log` package provides a logging framework for Go programs. It includes various handlers for logging to different destinations such as the console, files, and syslog.

## Functions

### SyslogHandler

```go
func SyslogHandler(priority syslog.Priority, tag string, fmtr Format) (Handler, error)
```

`SyslogHandler` opens a connection to the system syslog daemon by calling `syslog.New` and writes all records to it. It takes the following parameters:

- `priority` (syslog.Priority): The syslog priority level.
- `tag` (string): The tag to use in the syslog message.
- `fmtr` (Format): The formatter to use for formatting the log message.

It returns a `Handler` and an error.

### SyslogNetHandler

```go
func SyslogNetHandler(net, addr string, priority syslog.Priority, tag string, fmtr Format) (Handler, error)
```

`SyslogNetHandler` opens a connection to a log daemon over the network and writes all log records to it. It takes the following parameters:

- `net` (string): The network type to use (e.g. "tcp", "udp").
- `addr` (string): The address of the log daemon.
- `priority` (syslog.Priority): The syslog priority level.
- `tag` (string): The tag to use in the syslog message.
- `fmtr` (Format): The formatter to use for formatting the log message.

It returns a `Handler` and an error.

## Helper Functions

### sharedSyslog

```go
func sharedSyslog(fmtr Format, sysWr *syslog.Writer, err error) (Handler, error)
```

`sharedSyslog` is a helper function that is used by both `SyslogHandler` and `SyslogNetHandler`. It takes the following parameters:

- `fmtr` (Format): The formatter to use for formatting the log message.
- `sysWr` (*syslog.Writer): The syslog writer.
- `err` (error): The error returned by `syslog.New` or `syslog.Dial`.

It returns a `Handler` and an error.

## Methods

### SyslogHandler

```go
func (m muster) SyslogHandler(priority syslog.Priority, tag string, fmtr Format) Handler
```

`SyslogHandler` is a method of the `muster` type. It is a convenience method that calls `SyslogHandler` with the same parameters and returns a `Handler`.

### SyslogNetHandler

```go
func (m muster) SyslogNetHandler(net, addr string, priority syslog.Priority, tag string, fmtr Format) Handler
```

`SyslogNetHandler` is a method of the `muster` type. It is a convenience method that calls `SyslogNetHandler` with the same parameters and returns a `Handler`.