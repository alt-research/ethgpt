## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `gfP2`

`gfP2` implements a field of size p² as a quadratic extension of the base field where i²=-1.

#### Function `gfP2Decode`

`gfP2Decode` decodes the input `in` and returns the result.

```go
func gfP2Decode(in *gfP2) *gfP2
```

##### Parameters

- `in` - the input.

##### Return Values

- `*gfP2` - the decoded result.

#### Function `String`

`String` returns a string representation of `gfP2`.

```go
func (e *gfP2) String() string
```

##### Return Values

- `string` - a string representation of `gfP2`.

#### Function `Set`

`Set` sets `e` to `a` and then returns `e`.

```go
func (e *gfP2) Set(a *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.

##### Return Values

- `*gfP2` - `a`.

#### Function `SetZero`

`SetZero` sets `e` to the additive identity of `gfP2` and then returns `e`.

```go
func (e *gfP2) SetZero() *gfP2
```

##### Return Values

- `*gfP2` - the additive identity of `gfP2`.

#### Function `SetOne`

`SetOne` sets `e` to the multiplicative identity of `gfP2` and then returns `e`.

```go
func (e *gfP2) SetOne() *gfP2
```

##### Return Values

- `*gfP2` - the multiplicative identity of `gfP2`.

#### Function `IsZero`

`IsZero` returns `true` if `e` is the additive identity of `gfP2`, and `false` otherwise.

```go
func (e *gfP2) IsZero() bool
```

##### Return Values

- `bool` - `true` if `e` is the additive identity of `gfP2`, and `false` otherwise.

#### Function `IsOne`

`IsOne` returns `true` if `e` is the multiplicative identity of `gfP2`, and `false` otherwise.

```go
func (e *gfP2) IsOne() bool
```

##### Return Values

- `bool` - `true` if `e` is the multiplicative identity of `gfP2`, and `false` otherwise.

#### Function `Conjugate`

`Conjugate` sets `e` to the conjugate of `a` and then returns `e`.

```go
func (e *gfP2) Conjugate(a *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.

##### Return Values

- `*gfP2` - the conjugate of `a`.

#### Function `Neg`

`Neg` sets `e` to the negation of `a` and then returns `e`.

```go
func (e *gfP2) Neg(a *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.

##### Return Values

- `*gfP2` - the negation of `a`.

#### Function `Add`

`Add` sets `e` to `a+b` and then returns `e`.

```go
func (e *gfP2) Add(a, b *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.
- `b` - a `gfP2` value.

##### Return Values

- `*gfP2` - `a+b`.

#### Function `Sub`

`Sub` sets `e` to `a-b` and then returns `e`.

```go
func (e *gfP2) Sub(a, b *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.
- `b` - a `gfP2` value.

##### Return Values

- `*gfP2` - `a-b`.

#### Function `Mul`

`Mul` sets `e` to `a*b` and then returns `e`.

```go
func (e *gfP2) Mul(a, b *gfP2) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.
- `b` - a `gfP2` value.

##### Return Values

- `*gfP2` - `a*b`.

#### Function `MulScalar`

`MulScalar` sets `e` to `a*b` where `b` is a scalar and then returns `e`.

```go
func (e *gfP2) MulScalar(a *gfP2, b *gfP) *gfP2
```

##### Parameters

- `a` - a `gfP2` value.
- `b` - a scalar.

##### Return Values

- `*gfP2` - `a*b`.

#### Function `MulXi`

`MulXi` sets `e` to `ξa` where `ξ=i+9` and then returns `e`.

```go
func (e *gf