## Package asm

The `asm` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum Assembly language compiler.

### Variables

#### `number`

`number` is a constant that represents a numeric value in the assembly language.

#### `stringValue`

`stringValue` is a constant that represents a string value in the assembly language.

#### `element`

`element` is a constant that represents an element in the assembly language.

#### `labelDef`

`labelDef` is a constant that represents a label definition in the assembly language.

#### `label`

`label` is a constant that represents a label in the assembly language.

#### `lineStart`

`lineStart` is a constant that represents the start of a line in the assembly language.

#### `lineEnd`

`lineEnd` is a constant that represents the end of a line in the assembly language.

### Types

#### `Compiler`

`Compiler` is a struct that represents an Ethereum Assembly language compiler.

##### Fields

- `tokens` - the tokens for the program.
- `binary` - the binary string that can be interpreted by the EVM.
- `labels` - the used labels in the program.
- `pc` - the program counter which is used to determine the locations of the jump dests.
- `pos` - the current position in the tokens.
- `debug` - a boolean value that indicates whether to print debug information.

##### Methods

###### `NewCompiler`

`NewCompiler` creates a new allocated compiler.

```go
func NewCompiler(debug bool) *Compiler
```

###### Parameters

- `debug` - a boolean value that indicates whether to print debug information.

###### Return Values

- `*Compiler` - the new compiler.

###### `Feed`

`Feed` feeds tokens in to ch and are interpreted by the compiler.

```go
func (c *Compiler) Feed(ch <-chan token)
```

###### Parameters

- `ch` - the channel to feed tokens in to.

###### `Compile`

`Compile` compiles the current tokens and returns a binary string that can be interpreted by the EVM and an error if it failed.

```go
func (c *Compiler) Compile() (string, []error)
```

###### Return Values

- `string` - the binary string that can be interpreted by the EVM.
- `[]error` - an error, if any.

###### `next`

`next` returns the next token and increments the position.

```go
func (c *Compiler) next() token
```

###### Return Values

- `token` - the next token.

###### `compileLine`

`compileLine` compiles a single line instruction e.g. "push 1", "jump @label".

```go
func (c *Compiler) compileLine() error
```

###### Return Values

- `error` - an error, if any.

###### `compileElement`

`compileElement` compiles an element in the assembly language.

```go
func (c *Compiler) compileElement(lvalue token) error
```

###### Parameters

- `lvalue` - the element to compile.

###### Return Values

- `error` - an error, if any.

###### `compileLabel`

`compileLabel` compiles a label in the assembly language.

```go
func (c *Compiler) compileLabel()
``` # Solidity Compiler

The `Compiler` struct and its associated functions are part of the Solidity compiler, which is a tool for compiling Solidity smart contracts into bytecode that can be executed on the Ethereum Virtual Machine (EVM). The `Compiler` struct is responsible for compiling Solidity code into EVM bytecode.

## Variables

### `vm`

`vm` is a package that provides the EVM opcodes.

## Types

### `Compiler`

`Compiler` is a struct that represents a Solidity compiler.

#### Fields

- `tokens` - the list of tokens to be compiled.
- `pos` - the current position in the list of tokens.
- `binary` - the compiled bytecode.
- `labels` - a map of label names to their positions in the bytecode.
- `debug` - a flag indicating whether to print debug information during compilation.

#### Methods

##### `Compile`

`Compile` compiles the Solidity code into EVM bytecode.

```go
func (c *Compiler) Compile() ([]byte, error)
```

###### Return Values

- `[]byte` - the compiled bytecode.
- `error` - an error, if any.

##### `next`

`next` returns the next token in the list of tokens.

```go
func (c *Compiler) next() token
```

###### Return Values

- `token` - the next token.

##### `compileCode`

`compileCode` compiles the Solidity code to bytecode.

```go
func (c *Compiler) compileCode() error
```

###### Return Values

- `error` - an error, if any.

##### `compileElement`

`compileElement` compiles the element (push & label or both) to a binary representation and may error if incorrect statements were fed.

```go
func (c *Compiler) compileElement(element token) error
```

###### Parameters

- `element` - the element to be compiled.

###### Return Values

- `error` - an error, if any.

##### `compileLabel`

`compileLabel` pushes a jumpdest to the binary slice.

```go
func (c *Compiler) compileLabel()
```

##### `pushBin`

`pushBin` pushes the value v to the binary stack.

```go
func (c *Compiler) pushBin(v interface{})
```

###### Parameters

- `v` - the value to be pushed.

##### `isPush`

`isPush` returns whether the string op is either any of push(N).

```go
func isPush(op string) bool
```

###### Parameters

- `op` - the string to be checked.

###### Return Values

- `bool` - whether the string op is either any of push(N).

##### `isJump`

`isJump` returns whether the string op is jump(i).

```go
func isJump(op string) bool
```

###### Parameters

- `op` - the string to be checked.

###### Return Values

- `bool` - whether the string op is jump(i).

##### `toBinary`

`toBinary` converts text to a vm.OpCode.

```go
func toBinary(text string) vm.OpCode
```

###### Parameters

- `text` - the text to be converted.

###### Return Values

- `vm.OpCode` - the converted opcode.

##### `compileErr`

`compileErr` returns a compile error.

```go
func compileErr(c token, got, want string) error
```

###### Parameters

- `c` - the token that caused the error.
- `got` - the actual value of the token.
- `want` - the expected value of the token.

###### Return Values

- `error` - the compile error.