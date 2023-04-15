# Documentation for bn256 package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

## gfP2 type

The `gfP2` type implements a field of size p² as a quadratic extension of the base field where i²=-1. It has the following methods:

### newGFp2

```go
func newGFp2(pool *bnPool) *gfP2
```

`newGFp2` returns a new `gfP2` instance from the given `bnPool`.

### String

```go
func (e *gfP2) String() string
```

`String` returns a string representation of the `gfP2` instance.

### Put

```go
func (e *gfP2) Put(pool *bnPool)
```

`Put` returns the `gfP2` instance to the given `bnPool`.

### Set

```go
func (e *gfP2) Set(a *gfP2) *gfP2
```

`Set` sets the `gfP2` instance to the value of the given `gfP2` instance and returns the `gfP2` instance.

### SetZero

```go
func (e *gfP2) SetZero() *gfP2
```

`SetZero` sets the `gfP2` instance to zero and returns the `gfP2` instance.

### SetOne

```go
func (e *gfP2) SetOne() *gfP2
```

`SetOne` sets the `gfP2` instance to one and returns the `gfP2` instance.

### Minimal

```go
func (e *gfP2) Minimal()
```

`Minimal` reduces the `gfP2` instance to its minimal form.

### IsZero

```go
func (e *gfP2) IsZero() bool
```

`IsZero` returns true if the `gfP2` instance is zero, false otherwise.

### IsOne

```go
func (e *gfP2) IsOne() bool
```

`IsOne` returns true if the `gfP2` instance is one, false otherwise.

### Conjugate

```go
func (e *gfP2) Conjugate(a *gfP2) *gfP2
```

`Conjugate` sets the `gfP2` instance to the conjugate of the given `gfP2` instance and returns the `gfP2` instance.

### Negative

```go
func (e *gfP2) Negative(a *gfP2) *gfP2
```

`Negative` sets the `gfP2` instance to the negative of the given `gfP2` instance and returns the `gfP2` instance.

### Add

```go
func (e *gfP2) Add(a, b *gfP2) *gfP2
```

`Add` sets the `gfP2` instance to the sum of the given `gfP2` instances and returns the `gfP2` instance.

### Sub

```go
func (e *gfP2) Sub(a, b *gfP2) *gfP2
```

`Sub` sets the `gfP2` instance to the difference of the given `gfP2` instances and returns the `gfP2` instance.

### Double

```go
func (e *gfP2) Double(a *gfP2) *gfP2
```

`Double` sets the `gfP2` instance to the double of the given `gfP2` instance and returns the `gfP2` instance.

### Exp

```go
func (c *gfP2) Exp(a *gfP2, power *big.Int, pool *bnPool) *gfP2
```

`Exp` sets the `gfP2` instance to the power of the given `gfP2` instance and the given `big.Int` and returns the `gfP2` instance.

### Mul

```go
func (e *gfP2) Mul(a, b *gfP2, pool *bnPool) *gfP2
```

`Mul` sets the `gfP2` instance to the product of the given `gfP2` instances and returns the `gfP2` instance.

### MulScalar

```go
func (e *gfP2) MulScalar(a *gfP2, b *big.Int) *gfP2
```

`MulScalar` sets the `gfP2` instance to the scalar product of the given `gfP2` instance and the given `big.Int` and returns the `gfP2` instance.

### MulXi

```go
func (e *gfP2) MulXi(a *gfP2, pool *bnPool) *gfP2
```

`MulXi` sets the `gfP2` instance to the product of the given `gfP2` instance and ξ=i+9 and returns the `gfP2` instance.

### Square

```go
func (e *gfP2) Square(a *gfP2, pool *bnPool) *gfP2
```

`Square` sets the `gfP2` instance to the square of the given `gfP2` instance and returns the `gfP2` instance.

### Invert

```go
func (e *gfP2) Invert(a *gfP2, pool *bnPool) *gfP2
```

`Invert` sets the `gfP2` instance to the inverse of the given `gfP2` instance and returns the `gfP2` instance.

## License

The `bn256` package is licensed under the BSD-style license. ## Documentation for `inv` function

The `inv` function is a method of the `gfP2` type, which represents an element of the finite field GF(p^2). This function computes the multiplicative inverse of the input element and returns it as a new `gfP2` element.

### Parameters

The `inv` function takes no parameters.

### Return Value

The `inv` function returns a new `gfP2` element that is the multiplicative inverse of the input element.

### Example Usage

```
a := &gfP2{x: big.NewInt(2), y: big.NewInt(3)}
b := a.inv()
```

## Documentation for `Real` function

The `Real` function is a method of the `gfP2` type, which represents an element of the finite field GF(p^2). This function returns the real part of the input element as a `*big.Int`.

### Parameters

The `Real` function takes no parameters.

### Return Value

The `Real` function returns a `*big.Int` that is the real part of the input element.

### Example Usage

```
a := &gfP2{x: big.NewInt(2), y: big.NewInt(3)}
r := a.Real()
```

## Documentation for `Imag` function

The `Imag` function is a method of the `gfP2` type, which represents an element of the finite field GF(p^2). This function returns the imaginary part of the input element as a `*big.Int`.

### Parameters

The `Imag` function takes no parameters.

### Return Value

The `Imag` function returns a `*big.Int` that is the imaginary part of the input element.

### Example Usage

```
a := &gfP2{x: big.NewInt(2), y: big.NewInt(3)}
i := a.Imag()
```