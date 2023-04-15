## Documentation for bn256 package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### twistPoint

The `twistPoint` type implements the elliptic curve y²=x³+3/ξ over GF(p²). Points are kept in Jacobian form and t=z² when valid. The group G₂ is the set of n-torsion points of this curve over GF(p²) (where n = Order).

#### newTwistPoint

```go
func newTwistPoint(pool *bnPool) *twistPoint
```

`newTwistPoint` returns a new `twistPoint` with all fields initialized to zero.

#### String

```go
func (c *twistPoint) String() string
```

`String` returns a string representation of the `twistPoint` in the form of "(x, y, z)".

#### Put

```go
func (c *twistPoint) Put(pool *bnPool)
```

`Put` puts the `twistPoint` back into the pool.

#### Set

```go
func (c *twistPoint) Set(a *twistPoint)
```

`Set` sets the `twistPoint` to the value of `a`.

#### IsOnCurve

```go
func (c *twistPoint) IsOnCurve() bool
```

`IsOnCurve` returns true if `c` is on the curve where `c` must be in affine form.

#### SetInfinity

```go
func (c *twistPoint) SetInfinity()
```

`SetInfinity` sets the `twistPoint` to the point at infinity.

#### IsInfinity

```go
func (c *twistPoint) IsInfinity() bool
```

`IsInfinity` returns true if the `twistPoint` is the point at infinity.

#### Add

```go
func (c *twistPoint) Add(a, b *twistPoint, pool *bnPool)
```

`Add` sets `c` to the sum of `a` and `b`. The result is put back into the pool.

### twistB

`twistB` is a constant of type `*gfP2` that represents the value 3/ξ.

### twistGen

`twistGen` is a constant of type `*twistPoint` that represents the generator of group G₂.

### Conclusion

The `bn256` package provides an implementation of the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The `twistPoint` type represents points on the curve in Jacobian form, and the `twistB` and `twistGen` constants are used in various calculations. The package provides functions for point addition and scalar multiplication, as well as functions for checking if a point is on the curve and for converting points to and from affine form. ## Documentation for `bn256` Package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package contains two types, `G1` and `G2`, which represent abstract cyclic groups. The zero value of each type is suitable for use as the output of an operation, but cannot be used as an input.

### `func (c *twistPoint) Double(a *twistPoint, pool *bnPool)`

This function doubles the given point `a` on the elliptic curve. It uses the algorithm described in http://hyperelliptic.org/EFD/g1p/auto-code/shortw/jacobian-0/doubling/dbl-2009-l.op3. The result is stored in the receiver `c`.

### `func (c *twistPoint) Mul(a *twistPoint, scalar *big.Int, pool *bnPool) *twistPoint`

This function multiplies the given point `a` on the elliptic curve by the given scalar `scalar`. It uses the double-and-add algorithm to perform the multiplication. The result is stored in the receiver `c`.

### `func (c *twistPoint) MakeAffine(pool *bnPool) *twistPoint`

This function converts the given point `c` on the elliptic curve to affine form. If `c` is the point at infinity, then it sets `c` to the point `0 : 1 : 0`. The result is stored in the receiver `c`.

### `func (c *twistPoint) Negative(a *twistPoint, pool *bnPool)`

This function computes the negation of the given point `a` on the elliptic curve. The result is stored in the receiver `c`.

### `func (put *bnPool) Put(v interface{})`

This function returns the given object `v` to the pool `put`. It is used to return objects to the pool after they are no longer needed, in order to reduce memory allocation overhead.