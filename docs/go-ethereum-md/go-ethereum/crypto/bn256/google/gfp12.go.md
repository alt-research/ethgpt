# Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

## Type `gfP12`

The `gfP12` type implements the field of size p¹² as a quadratic extension of `gfP6` where ω²=τ.

### Function `newGFp12(pool *bnPool) *gfP12`

`newGFp12` creates a new `gfP12` instance using the provided memory pool.

### Function `(e *gfP12) String() string`

`String` returns a string representation of the `gfP12` instance.

### Function `(e *gfP12) Put(pool *bnPool)`

`Put` returns the `gfP12` instance to the memory pool.

### Function `(e *gfP12) Set(a *gfP12) *gfP12`

`Set` sets the value of the `gfP12` instance to the value of the provided `gfP12` instance.

### Function `(e *gfP12) SetZero() *gfP12`

`SetZero` sets the value of the `gfP12` instance to zero.

### Function `(e *gfP12) SetOne() *gfP12`

`SetOne` sets the value of the `gfP12` instance to one.

### Function `(e *gfP12) Minimal()`

`Minimal` reduces the `gfP12` instance to its minimal form.

### Function `(e *gfP12) IsZero() bool`

`IsZero` returns true if the `gfP12` instance is zero.

### Function `(e *gfP12) IsOne() bool`

`IsOne` returns true if the `gfP12` instance is one.

### Function `(e *gfP12) Conjugate(a *gfP12) *gfP12`

`Conjugate` sets the value of the `gfP12` instance to the conjugate of the provided `gfP12` instance.

### Function `(e *gfP12) Negative(a *gfP12) *gfP12`

`Negative` sets the value of the `gfP12` instance to the negative of the provided `gfP12` instance.

### Function `(e *gfP12) Frobenius(a *gfP12, pool *bnPool) *gfP12`

`Frobenius` computes (xω+y)^p = x^p ω·ξ^((p-1)/6) + y^p.

### Function `(e *gfP12) FrobeniusP2(a *gfP12, pool *bnPool) *gfP12`

`FrobeniusP2` computes (xω+y)^p² = x^p² ω·ξ^((p²-1)/6) + y^p².

### Function `(e *gfP12) Add(a, b *gfP12) *gfP12`

`Add` sets the value of the `gfP12` instance to the sum of the provided `gfP12` instances.

### Function `(e *gfP12) Sub(a, b *gfP12) *gfP12`

`Sub` sets the value of the `gfP12` instance to the difference of the provided `gfP12` instances.

### Function `(e *gfP12) Mul(a, b *gfP12, pool *bnPool) *gfP12`

`Mul` sets the value of the `gfP12` instance to the product of the provided `gfP12` instances.

### Function `(e *gfP12) MulScalar(a *gfP12, b *gfP6, pool *bnPool) *gfP12`

`MulScalar` sets the value of the `gfP12` instance to the scalar product of the provided `gfP12` instance and `gfP6` instance.

### Function `(c *gfP12) Exp(a *gfP12, power *big.Int, pool *bnPool) *gfP12`

`Exp` sets the value of the `gfP12` instance to the exponentiation of the provided `gfP12` instance to the provided `big.Int` power.

### Function `(e *gfP12) Square(a *gfP12, pool *bnPool) *gfP12`

`Square` sets the value of the `gfP12` instance to the square of the provided `gfP12` instance.

### Function `(e *gfP12) Invert(a *gfP12, pool *bnPool) *gfP12`

`Invert` sets the value of the `gfP12` instance to the inverse of the provided `gfP12` instance.