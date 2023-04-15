# asm Package

The `asm` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum Virtual Machine (EVM) assembler.

## Functions

### `NewInstructionIterator`

`NewInstructionIterator` creates a new instruction iterator.

```go
func NewInstructionIterator(code []byte) *InstructionIterator
```

###### Parameters

- `code` - the EVM code to iterate over.

###### Return Values

- `*InstructionIterator` - the new instruction iterator.

## Types

### `InstructionIterator`

`InstructionIterator` is a struct that represents an iterator over EVM instructions.

#### Fields

- `code` - the EVM code to iterate over.
- `pc` - the current program counter.
- `err` - the current error, if any.

#### Methods

##### `Next`

`Next` advances the iterator to the next instruction.

```go
func (it *InstructionIterator) Next() bool
```

###### Return Values

- `bool` - `true` if there is another instruction, `false` otherwise.

##### `Error`

`Error` returns the current error, if any.

```go
func (it *InstructionIterator) Error() error
```

###### Return Values

- `error` - the current error, if any.