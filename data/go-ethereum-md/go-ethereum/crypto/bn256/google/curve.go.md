# bn256 Package Documentation

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

## Types

### curvePoint

`curvePoint` is a type that implements the elliptic curve y²=x³+3. Points are kept in Jacobian form and t=z² when valid. G₁ is the set of points of this curve on GF(p).

```go
type curvePoint struct {
    x, y, z, t *big.Int
}
```

### G1

`G1` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

```go
type G1 = bn256cf.G1
```

### G2

`G2` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

```go
type G2 = bn256cf.G2
```

## Variables

### curveB

`curveB` is a variable of type `*big.Int` that represents the value 3.

```go
var curveB = new(big.Int).SetInt64(3)
```

### curveGen

`curveGen` is a variable of type `*curvePoint` that represents the generator of G₁.

```go
var curveGen = &curvePoint{
    new(big.Int).SetInt64(1),
    new(big.Int).SetInt64(2),
    new(big.Int).SetInt64(1),
    new(big.Int).SetInt64(1),
}
```

## Functions

### newCurvePoint

`newCurvePoint` is a function that returns a new `*curvePoint` using a given `*bnPool`.

```go
func newCurvePoint(pool *bnPool) *curvePoint
```

### String

`String` is a function that returns a string representation of a `*curvePoint`.

```go
func (c *curvePoint) String() string
```

### Put

`Put` is a function that puts a `*curvePoint` back into a given `*bnPool`.

```go
func (c *curvePoint) Put(pool *bnPool)
```

### Set

`Set` is a function that sets a `*curvePoint` to the value of another `*curvePoint`.

```go
func (c *curvePoint) Set(a *curvePoint)
```

### IsOnCurve

`IsOnCurve` is a function that returns true if a `*curvePoint` is on the curve where the `*curvePoint` must be in affine form.

```go
func (c *curvePoint) IsOnCurve() bool
```

### SetInfinity

`SetInfinity` is a function that sets a `*curvePoint` to infinity.

```go
func (c *curvePoint) SetInfinity()
```

### IsInfinity

`IsInfinity` is a function that returns true if a `*curvePoint` is infinity.

```go
func (c *curvePoint) IsInfinity() bool
```

### Add

`Add` is a function that adds two `*curvePoint`s and stores the result in a third `*curvePoint`.

```go
func (c *curvePoint) Add(a, b *curvePoint, pool *bnPool)
``` # Documentation for bn256 package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package contains two types, `G1` and `G2`, which represent abstract cyclic groups.

## G1 and G2 types

### G1

`G1` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

### G2

`G2` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

## Functions

### Double

```go
func (c *curvePoint) Double(a *curvePoint, pool *bnPool)
```

`Double` doubles the point `a` and stores the result in `c`. It uses the algorithm described in http://hyperelliptic.org/EFD/g1p/auto-code/shortw/jacobian-0/doubling/dbl-2009-l.op3.

### Mul

```go
func (c *curvePoint) Mul(a *curvePoint, scalar *big.Int, pool *bnPool) *curvePoint
```

`Mul` multiplies the point `a` by the scalar `scalar` and stores the result in `c`. It returns `c`. It uses the double-and-add algorithm.

### MakeAffine

```go
func (c *curvePoint) MakeAffine(pool *bnPool) *curvePoint
```

`MakeAffine` converts `c` to affine form and returns `c`. If `c` is ∞, then it sets `c` to 0 : 1 : 0.

### Negative

```go
func (c *curvePoint) Negative(a *curvePoint)
```

`Negative` sets `c` to the negative of `a`.