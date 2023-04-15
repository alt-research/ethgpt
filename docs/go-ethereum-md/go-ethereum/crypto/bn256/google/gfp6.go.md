## Package bn256

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type gfP6

The `gfP6` type implements the field of size p⁶ as a cubic extension of `gfP2` where τ³=ξ and ξ=i+9.

#### func newGFp6(pool *bnPool) *gfP6

`newGFp6` returns a new `gfP6` instance.

#### func (e *gfP6) String() string

`String` returns a string representation of the `gfP6` instance.

#### func (e *gfP6) Put(pool *bnPool)

`Put` returns the `gfP6` instance to the pool.

#### func (e *gfP6) Set(a *gfP6) *gfP6

`Set` sets the `gfP6` instance to the value of `a`.

#### func (e *gfP6) SetZero() *gfP6

`SetZero` sets the `gfP6` instance to zero.

#### func (e *gfP6) SetOne() *gfP6

`SetOne` sets the `gfP6` instance to one.

#### func (e *gfP6) Minimal()

`Minimal` sets the `gfP6` instance to its minimal representation.

#### func (e *gfP6) IsZero() bool

`IsZero` returns true if the `gfP6` instance is zero.

#### func (e *gfP6) IsOne() bool

`IsOne` returns true if the `gfP6` instance is one.

#### func (e *gfP6) Negative(a *gfP6) *gfP6

`Negative` sets the `gfP6` instance to the negative of `a`.

#### func (e *gfP6) Frobenius(a *gfP6, pool *bnPool) *gfP6

`Frobenius` sets the `gfP6` instance to the Frobenius of `a`.

#### func (e *gfP6) FrobeniusP2(a *gfP6) *gfP6

`FrobeniusP2` sets the `gfP6` instance to the Frobenius of `a` raised to the power of p².

#### func (e *gfP6) Add(a, b *gfP6) *gfP6

`Add` sets the `gfP6` instance to the sum of `a` and `b`.

#### func (e *gfP6) Sub(a, b *gfP6) *gfP6

`Sub` sets the `gfP6` instance to the difference of `a` and `b`.

#### func (e *gfP6) Double(a *gfP6) *gfP6

`Double` sets the `gfP6` instance to the double of `a`.

#### func (e *gfP6) Mul(a, b *gfP6, pool *bnPool) *gfP6

`Mul` sets the `gfP6` instance to the product of `a` and `b`.

#### func (e *gfP6) MulScalar(a *gfP6, b *gfP2, pool *bnPool) *gfP6

`MulScalar` sets the `gfP6` instance to the product of `a` and `b`.

#### func (e *gfP6) MulGFP(a *gfP6, b *big.Int) *gfP6

`MulGFP` sets the `gfP6` instance to the product of `a` and `b`.

#### func (e *gfP6) MulTau(a *gfP6, pool *bnPool)

`MulTau` sets the `gfP6` instance to τ·(aτ²+bτ+c) = bτ²+cτ+aξ. ## Documentation for `et(tz)`

This function takes two arguments, `tz` and `ty`, and puts them into the `pool`. It does not return anything. 

## Documentation for `Square(a *gfP6, pool *bnPool) *gfP6`

This function takes two arguments, `a` and `pool`, and returns a pointer to a `gfP6` type. It computes the square of `a` and stores the result in `e`. 

## Documentation for `Invert(a *gfP6, pool *bnPool) *gfP6`

This function takes two arguments, `a` and `pool`, and returns a pointer to a `gfP6` type. It computes the inverse of `a` and stores the result in `e`. 

The function implements the algorithm described in "Implementing cryptographic pairings", M. Scott, section 3.2. It computes the cubic root of unity `j` in `GF(p²)` such that `1+j+j²=0`. Then it computes `A = (z²-ξxy)`, `B = (ξx²-yz)`, and `C = (y²-ξxz)`. It also computes `F = (x³ξ²+y³ξ+z³-3ξxyz)`, which is an element of the base field (the norm). 

Finally, it computes the inverse of `F` and uses it to compute `e.x`, `e.y`, and `e.z`.