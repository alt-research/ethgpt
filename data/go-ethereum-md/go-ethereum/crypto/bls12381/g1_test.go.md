# BLS12381 Package Documentation

This package provides functions to perform operations on the BLS12-381 elliptic curve.

## Functions

### one

```go
func (g *G1) one() *PointG1
```

one returns a point on the curve with coordinates (1, 2).

### rand

```go
func (g *G1) rand() *PointG1
```

rand returns a random point on the curve.

### TestG1Serialization

```go
func TestG1Serialization(t *testing.T)
```

TestG1Serialization is a test function that tests the serialization and deserialization of points on the curve.

### TestG1IsOnCurve

```go
func TestG1IsOnCurve(t *testing.T)
```

TestG1IsOnCurve is a test function that tests if a point is on the curve.

### TestG1AdditiveProperties

```go
func TestG1AdditiveProperties(t *testing.T)
```

TestG1AdditiveProperties is a test function that tests the additive properties of points on the curve.

### TestG1MultiplicativeProperties

```go
func TestG1MultiplicativeProperties(t *testing.T)
```

TestG1MultiplicativeProperties is a test function that tests the multiplicative properties of points on the curve.

### TestG1MultiExpExpected

```go
func TestG1MultiExpExpected(t *testing.T)
```

TestG1MultiExpExpected is a test function that tests the multi-exponentiation of points on the curve.

## Variables

### scalars

```go
var scalars [2]*big.Int
```

scalars is a test variable that contains two big integers.

### bases

```go
var bases [2]*PointG1
```

bases is a test variable that contains two points on the curve. # G1 Package Documentation

This package provides functions to perform operations on points in the G1 group of the BLS12-381 elliptic curve.

## Functions

### NewG1

```go
func NewG1() *G1
```

NewG1 returns a new G1 object.

### (g *G1) one

```go
func (g *G1) one() *PointG1
```

one returns the generator point of the G1 group.

### (g *G1) rand

```go
func (g *G1) rand() *PointG1
```

rand returns a random point in the G1 group.

### (g *G1) Add

```go
func (g *G1) Add(c, a, b *PointG1)
```

Add adds two points in the G1 group and stores the result in c.

### (g *G1) MulScalar

```go
func (g *G1) MulScalar(c, a *PointG1, e *big.Int)
```

MulScalar multiplies a point in the G1 group by a scalar and stores the result in c.

### (g *G1) MultiExp

```go
func (g *G1) MultiExp(c *PointG1, bases []*PointG1, scalars []*big.Int) (*PointG1, error)
```

MultiExp performs a multi-exponentiation on a slice of points and a slice of scalars in the G1 group and stores the result in c. It returns an error if the length of the bases and scalars slices are not equal.

### (g *G1) MapToCurve

```go
func (g *G1) MapToCurve(u []byte) (*PointG1, error)
```

MapToCurve maps a byte slice to a point in the G1 group.

### (g *G1) ToBytes

```go
func (g *G1) ToBytes(p *PointG1) []byte
```

ToBytes converts a point in the G1 group to a byte slice.

## Test Functions

### TestG1Add

```go
func TestG1Add(t *testing.T)
```

TestG1Add is a test function that tests the Add function of the G1 group. It generates two random points and adds them using the Add function. It then checks if the result is correct.

### TestG1Mul

```go
func TestG