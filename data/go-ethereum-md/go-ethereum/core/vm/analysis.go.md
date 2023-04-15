# go-ethereum Library: VM Package

## Introduction

This package is part of the go-ethereum library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. The VM package contains functions that are used to map bytes in a program, set bits, and collect data locations in code.

## Functions

### bitvec

`bitvec` is a bit vector which maps bytes in a program. An unset bit means the byte is an opcode, a set bit means it's data (i.e. argument of PUSHxx).

#### set1

```go
func (bits bitvec) set1(pos uint64)
```

`set1` sets a single bit at the given position.

#### setN

```go
func (bits bitvec) setN(flag uint16, pos uint64)
```

`setN` sets multiple bits at the given position, based on the given flag.

#### set8

```go
func (bits bitvec) set8(pos uint64)
```

`set8` sets 8 bits at the given position.

#### set16

```go
func (bits bitvec) set16(pos uint64)
```

`set16` sets 16 bits at the given position.

### codeSegment

```go
func (bits *bitvec) codeSegment(pos uint64) bool
```

`codeSegment` checks if the position is in a code segment.

### codeBitmap

```go
func codeBitmap(code []byte) bitvec
```

`codeBitmap` collects data locations in code. The bitmap is 4 bytes longer than necessary, in case the code ends with a PUSH32, the algorithm will set bits on the bitvector outside the bounds of the actual code.

### codeBitmapInternal

```go
func codeBitmapInternal(code, bits bitvec) bitvec
```

`codeBitmapInternal` is the internal implementation of `codeBitmap`. It exists for the purpose of being able to run benchmark tests without dynamic allocations affecting the results.