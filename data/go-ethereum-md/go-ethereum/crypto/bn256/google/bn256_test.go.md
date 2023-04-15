## bn256 Package Documentation

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Types

#### G1

`G1` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

```go
type G1 = bn256cf.G1
```

#### G2

`G2` is an abstract cyclic group. The zero value is suitable for use as the output of an operation, but cannot be used as an input.

```go
type G2 = bn256cf.G2
```

#### gfP2

`gfP2` represents an element of the finite field GF(p^2).

```go
type gfP2 struct {
    x, y *gfP
}
```

#### gfP6

`gfP6` represents an element of the finite field GF(p^6).

```go
type gfP6 struct {
    x, y, z *gfP2
}
```

#### gfP12

`gfP12` represents an element of the finite field GF(p^12).

```go
type gfP12 struct {
    x, y *gfP6
}
```

#### curvePoint

`curvePoint` represents a point on the Barreto-Naehrig curve.

```go
type curvePoint struct {
    x, y, z, t *gfP
}
```

### Functions

#### TestGFp2Invert

`TestGFp2Invert` tests the inversion of an element in GF(p^2).

```go
func TestGFp2Invert(t *testing.T)
```

#### isZero

`isZero` checks if an integer is equal to zero modulo the prime `P`.

```go
func isZero(n *big.Int) bool
```

#### isOne

`isOne` checks if an integer is equal to one modulo the prime `P`.

```go
func isOne(n *big.Int) bool
```

#### TestGFp6Invert

`TestGFp6Invert` tests the inversion of an element in GF(p^6).

```go
func TestGFp6Invert(t *testing.T)
```

#### TestGFp12Invert

`TestGFp12Invert` tests the inversion of an element in GF(p^12).

```go
func TestGFp12Invert(t *testing.T)
```

#### TestCurveImpl

`TestCurveImpl` tests the implementation of the Barreto-Naehrig curve.

```go
func TestCurveImpl(t *testing.T)
```

#### TestOrderG1

`TestOrderG1` tests the order of the G1 group.

```go
func TestOrderG1(t *testing.T)
``` ## Documentation for Pairing Package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package contains two types, `G1` and `G2`, which represent abstract cyclic groups. The zero value of each type is suitable for use as the output of an operation, but cannot be used as an input.

### Test Functions

#### TestOrderG2

This function tests if the order of `G2` is correct. It creates a new `G2` point `g` and multiplies it by the order of the curve. If `g` is not infinity, the test fails.

#### TestOrderGT

This function tests if the order of `GT` is correct. It creates a new `GT` point `g` and multiplies it by the order of the curve. If `g` is not one, the test fails.

#### TestBilinearity

This function tests the bilinearity property of the pairing. It generates random points `p1` and `p2` from `G1` and `G2`, respectively, and computes the pairing `e1` between them. It also computes the pairing `e2` between the generator points of `G1` and `G2`, multiplied by random scalars `a` and `b`. It then subtracts `e2` from `e1` and checks if the result is one. If not, the test fails.

#### TestG1Marshal

This function tests the marshaling and unmarshaling of `G1` points. It creates a new `G1` point `g` and marshals it into a byte slice. It then unmarshals the byte slice into a new `G1` point `g2` and checks if it is equal to the original point `g`. It repeats the process with the point `g` multiplied by the order of the curve, and checks if the unmarshaled point is infinity.

#### TestG2Marshal

This function tests the marshaling and unmarshaling of `G2` points. It creates a new `G2` point `g` and marshals it into a byte slice. It then unmarshals the byte slice into a new `G2` point `g2` and checks if it is equal to the original point `g`. It repeats the process with the point `g` multiplied by the order of the curve, and checks if the unmarshaled point is infinity.

#### TestG1Identity

This function tests if the identity element of `G1` is infinity. It creates a new `G1` point `g` and multiplies it by zero. If `g` is not infinity, the test fails.

#### TestG2Identity

This function tests if the identity element of `G2` is infinity. It creates a new `G2` point `g` and multiplies it by zero. If `g` is not infinity, the test fails.

#### TestTripartiteDiffieHellman

This function tests the tripartite Diffie-Hellman key exchange protocol using the pairing. It generates random scalars `a`, `b`, and `c`, and creates `G1` and `G2` points `pa`, `qa`, `pb`, `qb`, `pc`, and `qc` from them. It then computes three keys `k1`, `k2`, and `k3` using the pairing, and checks if they are equal. If not, the test fails.

### Benchmark Function

#### BenchmarkPairing

This function benchmarks the pairing operation between the generator points of `G1` and `G2`. It creates new points for each iteration and computes the pairing between them. It repeats the process for `b.N` iterations.