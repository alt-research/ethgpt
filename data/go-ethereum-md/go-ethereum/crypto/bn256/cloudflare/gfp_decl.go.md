## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Architecture-Specific Assembly Implementations

This file contains forward declarations for the architecture-specific assembly implementations of these functions, provided that they exist.

#### Function `gfpNeg`

`gfpNeg` computes the negation of `a` and stores the result in `c`.

```go
func gfpNeg(c, a *gfP)
```

##### Parameters

- `c` - the result of the negation.
- `a` - the value to be negated.

#### Function `gfpAdd`

`gfpAdd` computes the sum of `a` and `b` and stores the result in `c`.

```go
func gfpAdd(c, a, b *gfP)
```

##### Parameters

- `c` - the result of the addition.
- `a` - the first operand.
- `b` - the second operand.

#### Function `gfpSub`

`gfpSub` computes the difference between `a` and `b` and stores the result in `c`.

```go
func gfpSub(c, a, b *gfP)
```

##### Parameters

- `c` - the result of the subtraction.
- `a` - the first operand.
- `b` - the second operand.

#### Function `gfpMul`

`gfpMul` computes the product of `a` and `b` and stores the result in `c`.

```go
func gfpMul(c, a, b *gfP)
```

##### Parameters

- `c` - the result of the multiplication.
- `a` - the first operand.
- `b` - the second operand.