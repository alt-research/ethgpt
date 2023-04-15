# ASM Package

The `asm` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum Assembly (EVM Assembly) language compiler.

## Functions

### `TestCompiler`

`TestCompiler` is a function that tests the `Compile` function of the `Compiler` struct.

```go
func TestCompiler(t *testing.T)
```

#### Parameters

- `t` - the testing object.

#### Return Values

- None.

## Structs

### `Compiler`

`Compiler` is a struct that represents an EVM Assembly compiler.

#### Fields

- `pc` - the program counter.
- `code` - the compiled code.
- `labels` - the labels in the code.
- `jumpDests` - the jump destinations in the code.
- `errors` - the errors encountered during compilation.

#### Methods

##### `NewCompiler`

`NewCompiler` creates a new EVM Assembly compiler.

```go
func NewCompiler(debug bool) *Compiler
```

###### Parameters

- `debug` - a boolean indicating whether to enable debug mode.

###### Return Values

- `*Compiler` - the new compiler.

##### `Feed`

`Feed` feeds the compiler with a lexer channel.

```go
func (c *Compiler) Feed(ch <-chan Token)
```

###### Parameters

- `ch` - the lexer channel.

###### Return Values

- None.

##### `Compile`

`Compile` compiles the EVM Assembly code.

```go
func (c *Compiler) Compile() (string, []error)
```

###### Return Values

- `string` - the compiled code.
- `[]error` - the errors encountered during compilation.