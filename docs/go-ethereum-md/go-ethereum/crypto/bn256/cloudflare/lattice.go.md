## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Type `lattice`

`lattice` is a struct that represents a lattice. It contains the basis vectors of the lattice, the inverse of the basis vectors, and the determinant of the lattice.

#### Function `decompose`

`decompose` takes a scalar mod Order as input and finds a short, positive decomposition of it with respect to the lattice basis.

```go
func (l *lattice) decompose(k *big.Int) []*big.Int
```

##### Parameters

- `k` - a scalar mod Order.

##### Return Values

- `[]*big.Int` - a short, positive decomposition of `k` with respect to the lattice basis.

#### Function `Precompute`

`Precompute` precomputes the basis vectors of the lattice.

```go
func (l *lattice) Precompute(add func(i, j uint))
```

##### Parameters

- `add` - a function that adds two integers.

#### Function `Multi`

`Multi` multiplies a scalar with the basis vectors of the lattice.

```go
func (l *lattice) Multi(scalar *big.Int) []uint8
```

##### Parameters

- `scalar` - a scalar.

##### Return Values

- `[]uint8` - the result of multiplying `scalar` with the basis vectors of the lattice.

#### Function `round`

`round` rounds a number to the nearest integer.

```go
func round(num, denom *big.Int)
```

##### Parameters

- `num` - a number.
- `denom` - a denominator.