# BLS12381 Package Documentation

This package provides functions to perform operations on the BLS12-381 elliptic curve.

## Functions

### (g *G2) one() *PointG2

```go
func (g *G2) one() *PointG2
```

one returns a new PointG2 representing the point at infinity.

### (g *G2) rand() *PointG2

```go
func (g *G2) rand() *PointG2
```

rand returns a new random PointG2 on the curve.

### TestG2Serialization

```go
func TestG2Serialization(t *testing.T)
```

TestG2Serialization tests the serialization and deserialization of PointG2 values.

### TestG2IsOnCurve

```go
func TestG2IsOnCurve(t *testing.T)
```

TestG2IsOnCurve tests if a PointG2 is on the curve.

### TestG2AdditiveProperties

```go
func TestG2AdditiveProperties(t *testing.T)
```

TestG2AdditiveProperties tests the additive properties of PointG2 values.

### TestG2MultiplicativeProperties

```go
func TestG2MultiplicativeProperties(t *testing.T)
```

TestG2MultiplicativeProperties tests the multiplicative properties of PointG2 values.

## Variables

### q

```go
var q = new(big.Int).SetBytes([]byte{
	0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
	0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0 # Pairing Package Documentation

This package provides functions to perform pairing operations on elliptic curves.

## Functions

### TestGTAdditive(t *testing.T)

```go
func TestGTAdditive(t *testing.T)
```

TestGTAdditive is a test function that tests the additive property of the pairing operation. It generates two random points on the elliptic curve and verifies that the pairing of their sum is equal to the product of their pairings.

### TestGTMultiplicative(t *testing.T)

```go
func TestGTMultiplicative(t *testing.T)
```

TestGTMultiplicative is a test function that tests the multiplicative property of the pairing operation. It generates two random points on the elliptic curve and verifies that the pairing of their product is equal to the power of their pairing.

### TestG2MultiExp(t *testing.T)

```go
func TestG2MultiExp(t *testing.T)
```

TestG2MultiExp is a test function that tests the multi-exponentiation function of the pairing operation. It generates a set of random points and scalars, computes their product using the multi-exponentiation function, and verifies that the result is correct.

### TestG2MultiExpExpected(t *testing.T)

```go
func TestG2MultiExpExpected(t *testing.T)
```

TestG2MultiExpExpected is a test function that tests the multi-exponentiation function of the pairing operation with a known result. It generates a set of random points and scalars, computes their product using the multi-exponentiation function, and verifies that the result is equal to the expected value.

### TestG2MultiExpBatch(t *testing.T)

```go
func TestG2MultiExpBatch(t *testing.T)
```

TestG2MultiExpBatch is # G2 Package Documentation

This package provides an implementation of the G2 elliptic curve group over a 381-bit prime field. It includes functions to perform point addition, point multiplication, and map a byte slice to a point on the curve.

## Functions

### NewG2

```go
func NewG2() *G2
```

NewG2 returns a new instance of the G2 curve group.

### Add

```go
func (g *G2) Add(c, a, b *PointG2)
```

Add performs point addition on the G2 curve group. It takes the following parameters:

- `c`: the resulting point of the addition.
- `a`: the first point to be added.
- `b`: the second point to be added.

### MulScalar

```go
func (g *G2) MulScalar(c, a *PointG2, e *big.Int)
```

MulScalar performs point multiplication on the G2 curve group. It takes the following parameters:

- `c`: the resulting point of the multiplication.
- `a`: the point to be multiplied.
- `e`: the scalar to multiply the point by.

### MapToCurve

```go
func (g *G2) MapToCurve(u []byte) (*PointG2, error)
```

MapToCurve maps a byte slice to a point on the G2 curve group. It takes the following parameter:

- `u`: the byte slice to be mapped to a point on the curve.

It returns the resulting point on the curve and an error if the mapping fails.

### ToBytes

```go
func (g *G2) ToBytes(p *PointG2) []byte
```

ToBytes converts a point on the G2 curve group to a byte slice. It takes the following parameter:

- `p`: the point to be converted to a byte slice.

It returns the resulting byte slice.

## Variables

### g2Gen

```go
var g2Gen = [4]string{
	"11559732032986387107991004021392285783925812861821192530917403151452391805634",
	"10857046999023057135944570762232829481370756359578518086990519993285655852781",
	"8495653923123431417604973247489272438418190587263600148770280649306958101930",
	"4082367875863433681332203403145435568316851327593401208105741076214120093531",
}
```

g2Gen is a variable that contains the generator of the G2 curve group.

## Tests

### TestG2MapToCurve

```go
func TestG2MapToCurve(t *testing.T)
```

TestG2MapToCurve is a test function that tests the MapToCurve function. It generates a random byte slice, maps it to a point on the G2 curve group, and checks if the resulting byte slice is equal to the expected byte slice.

### BenchmarkG2Add

```go
func BenchmarkG2Add(t *testing.B)
```

BenchmarkG2Add is a benchmark function that benchmarks the Add function. It generates two random points on the G2 curve group and performs point addition on them.

### BenchmarkG2Mul

```go
func BenchmarkG2Mul(t *testing.B)
```

BenchmarkG2Mul is a benchmark function that benchmarks the MulScalar function. It generates a random point on the G2 curve group and a worst-case scalar, and performs point multiplication on them.

### BenchmarkG2SWUMap

```go
func BenchmarkG2SWUMap(t *testing.B)
```

BenchmarkG2SWUMap is a benchmark function that benchmarks the MapToCurve function. It generates a random byte slice and maps it to a point on the G2 curve group.