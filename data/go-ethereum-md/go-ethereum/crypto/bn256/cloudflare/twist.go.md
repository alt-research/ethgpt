## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `twistPoint`

`twistPoint` implements the elliptic curve `y²=x³+3/ξ` over GF(p²). Points are kept in Jacobian form and `t=z²` when valid. The group G₂ is the set of n-torsion points of this curve over GF(p²) (where `n = Order`).

#### Function `String`

`String` returns a string representation of `twistPoint`.

```go
func (c *twistPoint) String() string
```

##### Return Values

- `string` - a string representation of `twistPoint`.

#### Function `Set`

`Set` sets `c` to `a`.

```go
func (c *twistPoint) Set(a *twistPoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `IsOnCurve`

`IsOnCurve` returns true if `c` is on the curve.

```go
func (c *twistPoint) IsOnCurve() bool
```

##### Return Values

- `bool` - true if `c` is on the curve, false otherwise.

#### Function `SetInfinity`

`SetInfinity` sets `c` to the point at infinity.

```go
func (c *twistPoint) SetInfinity()
```

#### Function `IsInfinity`

`IsInfinity` returns true if `c` is the point at infinity.

```go
func (c *twistPoint) IsInfinity() bool
```

##### Return Values

- `bool` - true if `c` is the point at infinity, false otherwise.

#### Function `Add`

`Add` sets `c` to `a+b`.

```go
func (c *twistPoint) Add(a, b *twistPoint)
```

##### Parameters

- `a` - a point on the curve.
- `b` - a point on the curve.

#### Function `Double`

`Double` sets `c` to `2*a`.

```go
func (c *twistPoint) Double(a *twistPoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `Mul`

`Mul` sets `c` to `a*scalar`.

```go
func (c *twistPoint) Mul(a *twistPoint, scalar *big.Int)
```

##### Parameters

- `a` - a point on the curve.
- `scalar` - a scalar.

#### Function `MakeAffine`

`MakeAffine` converts `c` to affine coordinates.

```go
func (c *twistPoint) MakeAffine()
```

### Variable `twistB`

`twistB` is a constant representing the coefficient `3/ξ` in the equation `y²=x³+3/ξ` over GF(p²).

```go
var twistB = &gfP2{
	gfP{0x38e7ecccd1dcff67, 0x65f0b37d93ce0d3e, 0xd749d0dd22ac00aa, 0x0141b9ce4a688d4d},
	gfP{0x3bf938e377b802a8, 0x020b1b273633535d, 0x26b7edf049755260, 0x2514c6324384a86d},
}
```

### Variable `twistGen`

`twistGen` is the generator of group G₂.

```go
var twistGen = &twistPoint{
	gfP2{
		gfP{0xafb4737da84c6140, 0x6043dd5a5802d8c4, 0 ## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `twistPoint`

`twistPoint` represents a point on the twisted curve.

#### Function `Add`

`Add` sets `c` to `a+b` and then returns `c`.

```go
func (c *twistPoint) Add(a, b *twistPoint) *twistPoint
```

##### Parameters

- `a` - a point on the curve.
- `b` - a point on the curve.

##### Return Values

- `*twistPoint` - `a+b`.

#### Function `Double`

`Double` sets `c` to `2*a` and then returns `c`.

```go
func (c *twistPoint) Double(a *twistPoint) *twistPoint
```

##### Parameters

- `a` - a point on the curve.

##### Return Values

- `*twistPoint` - `2*a`.

#### Function `Mul`

`Mul` sets `c` to `a*k` and then returns `c`.

```go
func (c *twistPoint) Mul(a *twistPoint, k *big.Int, pool *bnPool) *twistPoint
```

##### Parameters

- `a` - a point on the curve.
- `k` - a scalar.
- `pool` - a pool of buffers.

##### Return Values

- `*twistPoint` - `a*k`.

#### Function `IsOnCurve`

`IsOnCurve` returns `true` if `c` is on the curve, and `false` otherwise.

```go
func (c *twistPoint) IsOnCurve() bool
```

##### Return Values

- `bool` - `true` if `c` is on the curve, and `false` otherwise.

#### Function `MakeAffine`

`MakeAffine` converts `c` to affine coordinates.

```go
func (c *twistPoint) MakeAffine(pool *bnPool)
```

##### Parameters

- `pool` - a pool of buffers.

#### Function `Affine`

`Affine` converts `c` to affine coordinates.

```go
func (c *twistPoint) Affine()
```

### Function `Neg`

`Neg` sets `c` to `-a` and then returns `c`.

```go
func (c *twistPoint) Neg(a *twistPoint)
```

##### Parameters

- `a` - a point on the curve.

##### Return Values

- `*twistPoint` - `-a`.