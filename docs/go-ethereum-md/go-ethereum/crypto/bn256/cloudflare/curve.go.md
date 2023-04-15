## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `curvePoint`

`curvePoint` implements the elliptic curve `y²=x³+3`. Points are kept in Jacobian form and `t=z²` when valid. `G₁` is the set of points of this curve on GF(p).

#### Function `String`

`String` returns a string representation of `curvePoint`.

```go
func (c *curvePoint) String() string
```

##### Return Values

- `string` - a string representation of `curvePoint`.

#### Function `Set`

`Set` sets `c` to `a`.

```go
func (c *curvePoint) Set(a *curvePoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `IsOnCurve`

`IsOnCurve` returns true if `c` is on the curve.

```go
func (c *curvePoint) IsOnCurve() bool
```

##### Return Values

- `bool` - true if `c` is on the curve, false otherwise.

#### Function `SetInfinity`

`SetInfinity` sets `c` to the point at infinity.

```go
func (c *curvePoint) SetInfinity()
```

#### Function `IsInfinity`

`IsInfinity` returns true if `c` is the point at infinity.

```go
func (c *curvePoint) IsInfinity() bool
```

##### Return Values

- `bool` - true if `c` is the point at infinity, false otherwise.

#### Function `Add`

`Add` sets `c` to `a+b`.

```go
func (c *curvePoint) Add(a, b *curvePoint)
```

##### Parameters

- `a` - a point on the curve.
- `b` - a point on the curve.

#### Function `Double`

`Double` sets `c` to `2*a`.

```go
func (c *curvePoint) Double(a *curvePoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `Mul`

`Mul` sets `c` to `a*scalar`.

```go
func (c *curvePoint) Mul(a *curvePoint, scalar *big.Int)
```

##### Parameters

- `a` - a point on the curve.
- `scalar` - a scalar.

### Variable `curveB`

`curveB` is a constant representing the value 3.

```go
var curveB = newGFp(3)
```

### Variable `curveGen`

`curveGen` is the generator of `G₁`.

```go
var curveGen = &curvePoint{
	x: *newGFp(1),
	y: *newGFp(2),
	z: *newGFp(1),
	t: *newGFp(1),
}
``` ## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `curvePoint`

`curvePoint` represents a point on the curve.

#### Function `SetInfinity`

`SetInfinity` sets `c` to the point at infinity.

```go
func (c *curvePoint) SetInfinity()
```

#### Function `Set`

`Set` sets `c` to `a`.

```go
func (c *curvePoint) Set(a *curvePoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `Double`

`Double` sets `c` to `2*a`.

```go
func (c *curvePoint) Double(a *curvePoint)
```

##### Parameters

- `a` - a point on the curve.

#### Function `Add`

`Add` sets `c` to `a+b`.

```go
func (c *curvePoint) Add(a, b *curvePoint)
```

##### Parameters

- `a` - a point on the curve.
- `b` - a point on the curve.

#### Function `ScalarMult`

`ScalarMult` sets `c` to `a*k`.

```go
func (c *curvePoint) ScalarMult(a *curvePoint, k *big.Int)
```

##### Parameters

- `a` - a point on the curve.
- `k` - a scalar.

#### Function `ScalarMultSimultaneous`

`ScalarMultSimultaneous` sets `c` to `a[i]*k[i]` for all `i`.

```go
func (c *curvePoint) ScalarMultSimultaneous(a []*curvePoint, k []*big.Int)
```

##### Parameters

- `a` - an array of points on the curve.
- `k` - an array of scalars.

#### Function `ScalarBaseMult`

`ScalarBaseMult` sets `c` to `g*k` where `g` is the generator of the group.

```go
func (c *curvePoint) ScalarBaseMult(k *big.Int)
```

##### Parameters

- `k` - a scalar.

#### Function `ScalarMultCurveLattice`

`ScalarMultCurveLattice` sets `c` to `a*scalar` where `a` is a point on the curve and `scalar` is a scalar.

```go
func (c *curvePoint) ScalarMultCurveLattice(a *curvePoint, scalar *big.Int)
```

##### Parameters

- `a` - a point on the curve.
- `scalar` - a scalar.

#### Function `MakeAffine`

`MakeAffine` converts `c` to affine coordinates.

```go
func (c *curvePoint) MakeAffine()
```

#### Function `Neg`

`Neg` sets `c` to `-a`.

```go
func (