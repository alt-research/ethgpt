# cmdtest

The `cmdtest` package provides utilities for testing command-line interfaces.

## Types

### TestCmd

```go
type TestCmd struct {
    *testing.T
    Func    template.FuncMap
    Data    interface{}
    Cleanup func()
    cmd     *exec.Cmd
    stdout  *bufio.Reader
    stdin   io.WriteCloser
    stderr  *testlogger
    Err     error
}
```

`TestCmd` is a struct that represents a command being tested. It contains a `*testing.T` object for logging, a `template.FuncMap` for template functions, a `Data` interface for template data, a `Cleanup` function for cleaning up after the test, a `*exec.Cmd` object for the command being tested, a `*bufio.Reader` for reading from stdout, a `io.WriteCloser` for writing to stdin, a `*testlogger` for logging stderr, and an `Err` error for the process exit error or interrupt signal error.

### testlogger

```go
type testlogger struct {
    t    *testing.T
    name string
    buf  bytes.Buffer
}
```

`testlogger` is a struct that represents a logger for testing. It contains a `*testing.T` object for logging, a `name` string for the name of the logger, and a `bytes.Buffer` for logging messages.

## Functions

### NewTestCmd

```go
func NewTestCmd(t *testing.T, data interface{}) *TestCmd
```

`NewTestCmd` creates a new `TestCmd` object and returns a pointer to it. It takes a `*testing.T` object for logging and a `data` interface for template data.

### (tt *TestCmd) Run

```go
func (tt *TestCmd) Run(name string, args ...string)
```

`Run` runs the command with the given name and arguments.

### (tt *TestCmd) InputLine

```go
func (tt *TestCmd) InputLine(s string) string
```

`InputLine` writes the given text to the child's stdin.

### (tt *TestCmd) SetTemplateFunc

```go
func (tt *TestCmd) SetTemplateFunc(name string, fn interface{})
```

`SetTemplateFunc` sets a template function with the given name and function.

### (tt *TestCmd) Expect

```go
func (tt *TestCmd) Expect(tplsource string)
```

`Expect` runs its argument as a template, then expects the child process to output the result of the template within 5s.

### (tt *TestCmd) Output

```go
func (tt *TestCmd) Output() []byte
```

`Output` reads all output from stdout, and returns the data.

### (tt *TestCmd) matchExactOutput

```go
func (tt *TestCmd) matchExactOutput(want []byte) error
```

`matchExactOutput` matches the exact output from stdout with the given byte slice. # TestCmd

The `TestCmd` type is a helper for testing command-line applications. It provides methods for starting a command, writing to its stdin, and reading from its stdout and stderr. It also provides methods for waiting for the command to exit, killing the command, and checking its exit status.

## Functions

### NewTestCmd

```go
func NewTestCmd(t *testing.T, name string, args ...string) *TestCmd
```

`NewTestCmd` creates a new `TestCmd` and returns a pointer to it. It takes a `*testing.T` object, the name of the command to run, and any arguments to pass to the command.

### Start

```go
func (tt *TestCmd) Start()
```

`Start` starts the command and sets up the pipes for reading and writing.

### Write

```go
func (tt *TestCmd) Write(b []byte) (n int, err error)
```

`Write` writes the given bytes to the command's stdin.

### Expect

```go
func (tt *TestCmd) Expect(want []byte) error
```

`Expect` reads from the command's stdout until it matches the given bytes. If the output does not match, `Expect` returns an error.

### ExpectRegexp

```go
func (tt *TestCmd) ExpectRegexp(regex string) (*regexp.Regexp, []string)
```

`ExpectRegexp` expects the child process to output text matching the given regular expression within 5 seconds. Note that an arbitrary amount of output may be consumed by the regular expression. This usually means that `Expect` cannot be used after `ExpectRegexp`.

### ExpectExit

```go
func (tt *TestCmd) ExpectExit()
```

`ExpectExit` expects the child process to exit within 5 seconds without printing any additional text on stdout.

### WaitExit

```go
func (tt *TestCmd) WaitExit()
```

`WaitExit` waits for the command to exit.

### Interrupt

```go
func (tt *TestCmd) Interrupt()
```

`Interrupt` sends an interrupt signal to the command.

### ExitStatus

```go
func (tt *TestCmd) ExitStatus() int
```

`ExitStatus` returns the process' OS exit code. It will only return a valid value after the process has finished.

### StderrText

```go
func (tt *TestCmd) StderrText() string
```

`StderrText` returns any stderr output written so far. The returned text holds all log lines after `ExpectExit` has returned.

### CloseStdin

```go
func (tt *TestCmd) CloseStdin()
```

`CloseStdin` closes the command's stdin.

### Kill

```go
func (tt *TestCmd) Kill()
```

`Kill` kills the command.

### withKillTimeout

```go
func (tt *TestCmd) withKillTimeout(fn func())
```

`withKillTimeout` sets a timeout of 5 seconds and calls the given function. If the function does not return before the timeout, `withKillTimeout` kills the command. 

## Types

### testlogger

`testlogger` logs all written lines via `t.Log` and also collects them for later inspection.

### runeTee

`runeTee` collects text read through it into a buffer. # eReader

The `eReader` is a struct that implements the `io.RuneReader` interface. It contains a `runeTee` struct and a `bytes.Buffer` struct.

## Fields

### runeTee

```go
type runeTee struct {
	in io.RuneReader
	buf bytes.Buffer
}
```

The `runeTee` struct contains an `io.RuneReader` and a `bytes.Buffer`. It is used to read runes and bytes from the input and write them to the buffer.

### buf

```go
buf bytes.Buffer
```

The `buf` field is a `bytes.Buffer` that is used to store the runes and bytes read from the input.

## Functions

### Read

```go
func (rtee *runeTee) Read(b []byte) (n int, err error)
```

`Read` reads up to len(b) bytes from the input and writes them to the buffer. It returns the number of bytes read and any error encountered.

### ReadRune

```go
func (rtee *runeTee) ReadRune() (r rune, size int, err error)
```

`ReadRune` reads a single UTF-8 encoded Unicode character from the input and writes it to the buffer. It returns the rune, its size in bytes, and any error encountered.

### ReadByte

```go
func (rtee *runeTee) ReadByte() (b byte, err error)
```

`ReadByte` reads a single byte from the input and writes it to the buffer. It returns the byte and any error encountered.