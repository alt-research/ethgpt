## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `gfP12`

`gfP12` implements the field of size p¹² as a quadratic extension of `gfP6` where ω²=τ.

#### Function `String`

`String` returns a string representation of `gfP12`.

```go
func (e *gfP12) String() string
```

##### Return Values

- `string` - a string representation of `gfP12`.

#### Function `Set`

`Set` sets `e` to `a` and then returns `e`.

```go
func (e *gfP12) Set(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - `a`.

#### Function `SetZero`

`SetZero` sets `e` to the additive identity element and then returns `e`.

```go
func (e *gfP12) SetZero() *gfP12
```

##### Return Values

- `*gfP12` - the additive identity element.

#### Function `SetOne`

`SetOne` sets `e` to the multiplicative identity element and then returns `e`.

```go
func (e *gfP12) SetOne() *gfP12
```

##### Return Values

- `*gfP12` - the multiplicative identity element.

#### Function `IsZero`

`IsZero` returns `true` if `e` is the additive identity element, and `false` otherwise.

```go
func (e *gfP12) IsZero() bool
```

##### Return Values

- `bool` - `true` if `e` is the additive identity element, and `false` otherwise.

#### Function `IsOne`

`IsOne` returns `true` if `e` is the multiplicative identity element, and `false` otherwise.

```go
func (e *gfP12) IsOne() bool
```

##### Return Values

- `bool` - `true` if `e` is the multiplicative identity element, and `false` otherwise.

#### Function `Conjugate`

`Conjugate` sets `e` to the conjugate of `a` and then returns `e`.

```go
func (e *gfP12) Conjugate(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - the conjugate of `a`.

#### Function `Neg`

`Neg` sets `e` to the negation of `a` and then returns `e`.

```go
func (e *gfP12) Neg(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - the negation of `a`.

#### Function `Frobenius`

`Frobenius` sets `e` to `(xω+y)^p = x^p ω·ξ^((p-1)/6) + y^p` and then returns `e`.

```go
func (e *gfP12) Frobenius(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - `(xω+y)^p`.

#### Function `FrobeniusP2`

`FrobeniusP2` sets `e` to `(xω+y)^p² = x^p² ω·ξ^((p²-1)/6) + y^p²` and then returns `e`.

```go
func (e *gfP12) FrobeniusP2(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - `(xω+y)^p²`.

#### Function `FrobeniusP4`

`FrobeniusP4` sets `e` to `(xω+y)^p⁴ = x^p⁴ ω·ξ^((p⁴-1)/3) + y^p⁴` and then returns `e`.

```go
func (e *gfP12) FrobeniusP4(a *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.

##### Return Values

- `*gfP12` - `(xω+y)^p⁴`.

#### Function `Add`

`Add` sets `e` to `a+b` and then returns `e`.

```go
func (e *gfP12) Add(a, b *gfP12) *gfP12
```

##### Parameters

- `a` - a `gfP12` element.
- `b` - a `gfP12` element.

##### Return Values

- `*gfP12` - `a+b`.

#### Function `Sub`

`Sub` sets `e` to `a-b` and then returns `e`.

```go
func (e *gfP12) Sub(a, b *gfP12) *gfP12
```

##### Parameters

- `a` -