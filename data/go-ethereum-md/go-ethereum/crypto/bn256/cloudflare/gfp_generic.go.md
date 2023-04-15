## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `gfpCarry`

`gfpCarry` performs a carry operation on the input `a` and stores the result in `a`. The carry is added to `head`.

```go
func gfpCarry(a *gfP, head uint64)
```

##### Parameters

- `a` - a pointer to a `gfP` value.
- `head` - a carry value.

##### Return Values

None.

### Function `gfpNeg`

`gfpNeg` sets `c` to `-a`.

```go
func gfpNeg(c, a *gfP)
```

##### Parameters

- `c` - a pointer to a `gfP` value.
- `a` - a pointer to a `gfP` value.

##### Return Values

None.

### Function `gfpAdd`

`gfpAdd` sets `c` to `a+b`.

```go
func gfpAdd(c, a, b *gfP)
```

##### Parameters

- `c` - a pointer to a `gfP` value.
- `a` - a pointer to a `gfP` value.
- `b` - a pointer to a `gfP` value.

##### Return Values

None.

### Function `gfpSub`

`gfpSub` sets `c` to `a-b`.

```go
func gfpSub(c, a, b *gfP)
```

##### Parameters

- `c` - a pointer to a `gfP` value.
- `a` - a pointer to a `gfP` value.
- `b` - a pointer to a `gfP` value.

##### Return Values

None.

### Function `mul`

`mul` multiplies two 256-bit integers and returns the result as an 8-element array of 64-bit integers.

```go
func mul(a, b [4]uint64) [8]uint64
```

##### Parameters

- `a` - a 4-element array of 64-bit integers.
- `b` - a 4-element array of 64-bit integers.

##### Return Values

- `[8]uint64` - an 8-element array of 64-bit integers.

### Function `halfMul`

`halfMul` multiplies two 256-bit integers and returns the result as a 4-element array of 64-bit integers.

```go
func halfMul(a, b [4]uint64) [4]uint64
```

##### Parameters

- `a` - a 4-element array of 64-bit integers.
- `b` - a 4-element array of 64-bit integers.

##### Return Values

- `[4]uint64` - a 4-element array of 64-bit integers.

### Function `gfpMul`

`gfpMul` sets `c` to `a*b`.

```go
func gfpMul(c, a, b *gfP)
```

##### Parameters

- `c` - a pointer to a `gfP` value.
- `a` - a pointer to a `gfP` value.
- `b` - a pointer to a `gfP` value.

##### Return Values

None.