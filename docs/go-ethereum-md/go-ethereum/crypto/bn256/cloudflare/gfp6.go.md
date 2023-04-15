## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `gfP6`

`gfP6` implements the field of size p⁶ as a cubic extension of `gfP2` where τ³=ξ and ξ=i+9.

#### Function `String`

`String` returns a string representation of `gfP6`.

```go
func (e *gfP6) String() string
```

##### Return Values

- `string` - a string representation of `gfP6`.

#### Function `Set`

`Set` sets `e` to `a` and then returns `e`.

```go
func (e *gfP6) Set(a *gfP6) *gfP6
```

##### Parameters

- `a` - a `gfP6` element.

##### Return Values

- `*gfP6` - `a`.

#### Function `SetZero`

`SetZero` sets `e` to the additive identity element and then returns `e`.

```go
func (e *gfP6) SetZero() *gfP6
```

##### Return Values

- `*gfP6` - the additive identity element.

#### Function `SetOne`

`SetOne` sets `e` to the multiplicative identity element and then returns `e`.

```go
func (e *gfP6) SetOne() *gfP6
```

##### Return Values

- `*gfP6` - the multiplicative identity element.

#### Function `IsZero`

`IsZero` returns `true` if `e` is the additive identity element, and `false` otherwise.

```go
func (e *gfP6) IsZero() bool
```

##### Return Values

- `bool` - `true` if `e` is the additive identity element, and `false` otherwise.

#### Function `IsOne`

`IsOne` returns `true` if `e` is the multiplicative identity element, and `false` otherwise.

```go
func (e *gfP6) IsOne() bool
```

##### Return Values

- `bool` - `true` if `e` is the multiplicative identity element, and `false` otherwise.

#### Function `Neg`

`Neg` sets `e` to `-a` and then returns `e`.

```go
func (e *gfP6) Neg(a *gfP6) *gfP6
```

##### Parameters

- `a` - a `gfP6` element.

##### Return Values

- `*gfP6` - `-a`.

#### Function `Frobenius`

`Frobenius` sets `e` to the result of applying the Frobenius map to `a` and then returns `e`.

```go
func (e *gfP6) Frobenius(a *gfP6) *gfP6
```

##### Parameters

- `a` - a `gfP6` element.

##### Return Values

- `*gfP6` - the result of applying the Frobenius map to `a`.

#### Function `FrobeniusP2`

`FrobeniusP2` sets `e` to the result of applying the Frobenius map to `a` raised to the power of `p²` and then returns `e`.

```go
func (e *gfP6) FrobeniusP2(a *gfP6) *gfP6
```

##### Parameters

- `a` - a `gfP6` element ## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `twistPoint`

`twistPoint` represents a point on the twisted curve.

#### Function `newTwistPoint`

`newTwistPoint` returns a new `twistPoint`.

```go
func newTwistPoint(pool *bnPool) *twistPoint
```

##### Parameters

- `pool` - a pool of buffers.

##### Return Values

- `*twistPoint` - a new `twistPoint`.

#### Function `Set`

`Set` sets `e` to `a` and then returns `e`.

```go
func (e *twistPoint) Set(a *twistPoint) *twistPoint
```

##### Parameters

- `a` - a point on the twisted curve.

##### Return Values

- `*twistPoint` - `a`.

#### Function `SetInfinity`

`SetInfinity` sets `e` to the point at infinity and then returns `e`.

```go
func (e *twistPoint) SetInfinity() *twistPoint
```

##### Return Values

- `*twistPoint` - the point at infinity.

#### Function `IsInfinity`

`IsInfinity` returns `true` if `e` is the point at infinity, and `false` otherwise.

```go
func (e *twistPoint) IsInfinity() bool
```

##### Return Values

- `bool` - `true` if `e` is the point at infinity, and `false` otherwise.

#### Function `IsOnCurve`

`IsOnCurve` returns `true` if `e` is on the twisted curve, and `false` otherwise.

```go
func (e *twistPoint) IsOnCurve() bool
```

##### Return Values

- `bool` - `true` if `e` is on the twisted curve, and `false` otherwise.

#### Function `Add`

`Add` sets `e` to `a+b` and then returns `e`.

```go
func (e *twistPoint) Add(a, b *twistPoint, pool *bnPool) *twistPoint
```

##### Parameters

- `a` - a point on the twisted curve.
- `b` - a point on the twisted curve.
- `pool` - a pool of buffers.

##### Return Values

- `*twistPoint` - `a+b`.

#### Function `Double`

`Double` sets `e` to `2*a` and then returns `e`.

```go
func (e *twistPoint) Double(a *twistPoint, pool *bnPool) *twistPoint