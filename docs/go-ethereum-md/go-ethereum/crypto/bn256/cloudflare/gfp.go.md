## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `gfP`

`gfP` represents an element of the finite field `Fp`.

#### Function `newGFp`

`newGFp` returns a new `gfP` initialized with the given value.

```go
func newGFp(x int64) (out *gfP)
```

##### Parameters

- `x` - an integer.

##### Return Values

- `*gfP` - a new `gfP` initialized with the given value.

#### Function `String`

`String` returns a string representation of `e`.

```go
func (e *gfP) String() string
```

##### Return Values

- `string` - a string representation of `e`.

#### Function `Set`

`Set` sets `e` to `f`.

```go
func (e *gfP) Set(f *gfP)
```

##### Parameters

- `f` - an `gfP`.

#### Function `Invert`

`Invert` sets `e` to the inverse of `f`.

```go
func (e *gfP) Invert(f *gfP)
```

##### Parameters

- `f` - an `gfP`.

#### Function `Marshal`

`Marshal` encodes `e` into a byte slice.

```go
func (e *gfP) Marshal(out []byte)
```

##### Parameters

- `out` - a byte slice.

#### Function `Unmarshal`

`Unmarshal` decodes `in