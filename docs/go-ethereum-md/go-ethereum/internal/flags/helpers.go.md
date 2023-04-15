# Flags

The `flags` package provides utilities for working with command-line flags using the `urfave/cli` library.

## Usage

### NewApp

```go
func NewApp(usage string) *cli.App
```

`NewApp` creates an app with sane defaults. It takes a string `usage` as a parameter and returns a pointer to a new `cli.App` instance.

### Merge

```go
func Merge(groups ...[]cli.Flag) []cli.Flag
```

`Merge` merges the given flag slices. It takes one or more `[]cli.Flag` slices as parameters and returns a new `[]cli.Flag` slice.

### MigrateGlobalFlags

```go
func MigrateGlobalFlags(ctx *cli.Context)
```

`MigrateGlobalFlags` makes all global flag values available in the context. This should be called as early as possible in app.Before. It takes a `cli.Context` as a parameter and returns nothing.

### doMigrateFlags

```go
func doMigrateFlags(ctx *cli.Context)
```

`doMigrateFlags` is an internal function used by `MigrateGlobalFlags` to migrate global flags to the context. It takes a `cli.Context` as a parameter and returns nothing. # Command Line Interface (CLI) Package

The `cli` package provides a command line interface (CLI) for the application. It includes functions for parsing command line arguments, generating help text, and setting environment variables.

## Usage

### Parse

```go
func Parse(ctx *cli.Context, args []string) error
```

`Parse` parses the command line arguments and sets the values in the `ctx` context. It takes a `cli.Context` and a slice of strings as parameters and returns an error if there was an issue parsing the arguments.

### Context

```go
type Context struct {
	Parent *Context
	Name   string
	Args   []string
	Flags  []Flag
	Env    map[string]string
}
```

`Context` represents the context of the command line arguments. It includes a reference to the parent context, the name of the command, the arguments, the flags, and the environment variables.

### Flag

```go
type Flag interface {
	cli.DocGenerationFlag
	cli.Stringer
	IsSet() bool
}
```

`Flag` represents a command line flag. It includes functions for generating help text, converting the flag to a string, and checking if the flag has been set.

### DocGenerationFlag

```go
type DocGenerationFlag interface {
	GetUsage() string
	GetDefaultText() string
	GetEnvVars() []string
	TakesValue() bool
	Names() []string
}
```

`DocGenerationFlag` is an interface that represents a flag that can be used to generate help text. It includes functions for getting the usage, default value, environment variables, whether the flag takes a value, and the names of the flag.

### FlagString

```go
func FlagString(f cli.Flag) string
```

`FlagString` prints a single flag in help. It takes a `cli.Flag` as a parameter and returns a string containing the help text for the flag.

### pad

```go
func pad(s string, length int) string
```

`pad` pads a string with spaces to a specified length. It takes a string and an integer as parameters and returns a padded string.

### indent

```go
func indent(s string, nspace int) string
```

`indent` indents a string with a specified number of spaces. It takes a string and an integer as parameters and returns an indented string.

### wordWrap

```go
func wordWrap(s string, width int) string
```

`wordWrap` wraps a string to a specified width. It takes a string and an integer as parameters and returns a wrapped string.