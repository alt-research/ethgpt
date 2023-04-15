# Flags

The `flags` package provides custom flag types for the `cli` library used for argument parsing.

## DirectoryFlag

`DirectoryFlag` is a custom `cli.Flag` type which expands the received string to an absolute path. For example, `~/.ethereum` will be expanded to `/home/username/.ethereum`.

### Usage

```go
type DirectoryFlag struct {
    Name        string
    Category    string
    DefaultText string
    Usage       string
    Required    bool
    Hidden      bool
    HasBeenSet  bool
    Value       DirectoryString
    Aliases     []string
}
```

### Methods

#### Names

```go
func (f *DirectoryFlag) Names() []string
```

`Names` returns the name and aliases of the flag.

#### IsSet

```go
func (f *DirectoryFlag) IsSet() bool
```

`IsSet` returns whether the flag has been set.

#### String

```go
func (f *DirectoryFlag) String() string
```

`String` returns the string representation of the flag.

#### Apply

```go
func (f *DirectoryFlag) Apply(set *flag.FlagSet) error
```

`Apply` is called by the `cli` library, grabs the variable from the environment (if in env) and adds the variable to the flag set for parsing.

#### IsRequired

```go
func (f *DirectoryFlag) IsRequired() bool
```

`IsRequired` returns whether the flag is required.

#### IsVisible

```go
func (f *DirectoryFlag) IsVisible() bool
```

`IsVisible` returns whether the flag is visible.

#### GetCategory

```go
func (f *DirectoryFlag) GetCategory() string
```

`GetCategory` returns the category of the flag.

#### TakesValue

```go
func (f *DirectoryFlag) TakesValue() bool
```

`TakesValue` returns whether the flag takes a value.

#### GetUsage

```go
func (f *DirectoryFlag) GetUsage() string
```

`GetUsage` returns the usage of the flag.

#### GetValue

```go
func (f *DirectoryFlag) GetValue() string
```

`GetValue` returns the value of the flag.

#### GetEnvVars

```go
func (f *DirectoryFlag) GetEnvVars() []string
```

`GetEnvVars` returns the environment variables of the flag.

#### GetDefaultText

```go
func (f *DirectoryFlag) GetDefaultText() string
```

`GetDefaultText` returns the default text of the flag.

## TextMarshalerFlag

`TextMarshalerFlag` turns a `TextMarshaler` into a `flag.Value`.

### Usage

```go
type TextMarshalerFlag struct {
    Name        string
    Category    string
    DefaultText string
    Usage       string
    Required    bool
    Hidden      bool
    HasBeenSet  bool
    Value       TextMarshaler
    Aliases     []string
}
```

### Methods

#### Names

```go
func (f *TextMarshalerFlag) Names() []string
```

`Names` returns the name and aliases of the flag.

#### IsSet

```go
func (f *TextMarshalerFlag) IsSet() bool
```

`IsSet` returns whether the flag has been set.

#### String

```go
func (f *TextMarshalerFlag) String() string
```

`String` returns the string representation of the flag.

#### Apply

```go
func (f *TextMarshalerFlag) Apply(set *flag.FlagSet) error
```

`Apply` is called by the `cli` library, grabs the variable from the environment (if in env) and adds the variable to the flag set for parsing.

#### IsRequired

```go
func (f *TextMarshalerFlag) IsRequired() bool
```

`IsRequired` returns whether the flag is required.

#### IsVisible

```go
func (f *TextMarshalerFlag) IsVisible() bool
```

`IsVisible` returns whether the flag is visible.

#### GetCategory

```go
func (f *TextMarshalerFlag) GetCategory() string
```

`GetCategory` returns the category of the flag.

#### TakesValue

```go
func (f *TextMarshalerFlag) TakesValue() bool
```

`TakesValue` returns whether the flag takes a value.

#### GetUsage

```go
func (f *TextMarshalerFlag) GetUsage() string
```

`GetUsage` returns the usage of the flag.

#### GetValue

```go
func (f *TextMarshalerFlag) GetValue() string
```

`GetValue` returns the value of the flag.

#### GetEnvVars

```go
func (f *TextMarshalerFlag) GetEnvVars() []string
```

`GetEnvVars` returns the environment variables of the flag.

#### GetDefaultText

```go
func (f *TextMarshalerFlag) GetDefaultText() string
```

`GetDefaultText` returns the default text of the flag. # TextMarshalerFlag

The `TextMarshalerFlag` type wraps a `TextMarshaler` value and provides a way to use it as a command line flag. It implements the `cli.Flag`, `cli.RequiredFlag`, `cli.VisibleFlag`, `cli.DocGenerationFlag`, and `cli.CategorizableFlag` interfaces.

## Usage

### NewTextMarshalerFlag

```go
func NewTextMarshalerFlag(name string, value TextMarshaler, usage string) *TextMarshalerFlag
```

`NewTextMarshalerFlag` creates a new `TextMarshalerFlag` instance and has no other side-effect. It takes a `name` string, a `value` of type `TextMarshaler`, and a `usage` string as parameters and returns a pointer to a new `TextMarshalerFlag` instance.

### Apply

```go
func (f *TextMarshalerFlag) Apply(set *flag.FlagSet) error
```

`Apply` applies the `TextMarshalerFlag` to the given `flag.FlagSet`. It takes a `*flag.FlagSet` as a parameter and returns an error.

### GetValue

```go
func (f *TextMarshalerFlag) GetValue() string
```

`GetValue` returns the string representation of the `TextMarshaler` value. It takes no parameters and returns a string.

### GetDefaultText

```go
func (f *TextMarshalerFlag) GetDefaultText() string
```

`GetDefaultText` returns the default text for the `TextMarshalerFlag`. It takes no parameters and returns a string.

### GlobalTextMarshaler

```go
func GlobalTextMarshaler(ctx *cli.Context, name string) TextMarshaler
```

`GlobalTextMarshaler` returns the value of a `TextMarshalerFlag` from the global flag set. It takes a `*cli.Context` and a `name` string as parameters and returns a `TextMarshaler`.

# BigFlag

The `BigFlag` type is a command line flag that accepts 256 bit big integers in decimal or hexadecimal syntax. It implements the `cli.Flag`, `cli.RequiredFlag`, `cli.VisibleFlag`, `cli.DocGenerationFlag`, and `cli.CategorizableFlag` interfaces.

## Usage

### NewBigFlag

```go
func NewBigFlag(name string, value *big.Int, usage string) *BigFlag
```

`NewBigFlag` creates a new `BigFlag` instance and has no other side-effect. It takes a `name` string, a `value` of type `*big.Int`, and a `usage` string as parameters and returns a pointer to a new `BigFlag` instance.

### Apply

```go
func (f *BigFlag) Apply(set *flag.FlagSet) error
```

`Apply` applies the `BigFlag` to the given `flag.FlagSet`. It takes a `*flag.FlagSet` as a parameter and returns an error.

### GetValue

```go
func (f *BigFlag) GetValue() string
```

`GetValue` returns the string representation of the `*big.Int` value. It takes no parameters and returns a string.

### GetDefaultText

```go
func (f *BigFlag) GetDefaultText() string
```

`GetDefaultText` returns the default text for the `BigFlag`. It takes no parameters and returns a string. # Command Line Interface (CLI) Utilities

The `utils` package provides various utility functions for working with command line interfaces (CLI).

## Usage

### GlobalBig

```go
func GlobalBig(ctx *cli.Context, name string) *big.Int
```

`GlobalBig` returns the value of a `BigFlag` from the global flag set. It takes a `cli.Context` and a `name` string as parameters and returns a pointer to a `big.Int`.

### expandPath

```go
func expandPath(p string) string
```

`expandPath` expands a file path by replacing tilde with the user's home directory, expanding embedded environment variables, and cleaning the path. Note that it has limitations, e.g. `~someuser/tmp` will not be expanded. It takes a `p` string as a parameter and returns a string.

### HomeDir

```go
func HomeDir() string
```

`HomeDir` returns the user's home directory. It takes no parameters and returns a string.

### eachName

```go
func eachName(f cli.Flag, fn func(string))
```

`eachName` iterates over each name of a `cli.Flag` and calls a function `fn` with each name. It takes a `cli.Flag` and a function `fn` as parameters and returns nothing.