# BLS12381 Package Documentation

This package provides functions to perform pairings on elliptic curve points using the BLS12-381 curve.

## Functions

### TestPairingExpected

```go
func TestPairingExpected(t *testing.T)
```

TestPairingExpected is a test function that tests the pairing of two points on the BLS12-381 curve. It generates two points, calculates their pairing, and compares the result with an expected value.

### TestPairingNonDegeneracy

```go
func TestPairingNonDegeneracy(t *testing.T)
```

TestPairingNonDegeneracy is a test function that tests the non-degeneracy of the pairing function on the BLS12-381 curve. It generates four points and tests that the pairing of any two non-zero points is not equal to one, while the pairing of a zero point with any other point is equal to one.

## Variables

### bls

```go
var bls = NewPairingEngine()
```

bls is a variable that initializes a new pairing engine for the BLS12-381 curve.

## Types

### PairingEngine

```go
type PairingEngine struct {
	G1 *G1
	G2 *G2
}
```

PairingEngine is a struct that represents a pairing engine for the BLS12-381 curve. It contains two points on the curve, G1 and G2.

### G1

```go
type G1 struct {
	*CurvePoint
}
```

G1 is a struct that represents a point on the BLS12-381 curve in the G1 group.

### G2

```go
type G2 struct {
	*CurvePoint
} # Pairing Package Documentation

This package provides functions to perform pairing operations on elliptic curve points.

## Functions

### NewPairingEngine

```go
func NewPairingEngine() *Engine
```

NewPairingEngine creates a new pairing engine and returns a pointer to it.

### (e *Engine) AddPair

```go
func (e *Engine) AddPair(P1 G1, P2 G2) *Engine
```

AddPair adds a pairing of two points to the engine. It takes two parameters:

- `P1`: a point on the G1 curve.
- `P2`: a point on the G2 curve.

### (e *Engine) AddPairInv

```go
func (e *Engine) AddPairInv(P1 G1, P2 G2) *Engine
```

AddPairInv adds the inverse of a pairing of two points to the engine. It takes two parameters:

- `P1`: a point on the G1 curve.
- `P2`: a point on the G2 curve.

### (e *Engine) Check

```go
func (e *Engine) Check() bool
```

Check checks if the accumulated pairings in the engine are valid and returns a boolean value indicating whether they are valid or not.

### (e *Engine) Result

```go
func (e *Engine) Result() *GT
```

Result returns the result of the accumulated pairings in the engine as a point on the GT curve.

### (e *Engine) calculate

```go
func (e *Engine) calculate() *GT
```

calculate calculates the result of the accumulated pairings in the engine and returns it as a point on the GT curve.

## Variables

### g1Zero

```go
var g1Zero = G1(nil)
```

g1Zero is a variable that represents the zero point on the G1 curve.

### g1One

```go
var g1One = G1(nil)
```

g1One is a variable that represents the one point on the G1 curve.

### g2Zero

```go
var g2Zero = G2(nil)
```

g2Zero is a variable that represents the zero point on the G2 curve.

### g2One

```go
var g2One = G2(nil)
```

g2One is a variable that represents the one point on the G2 curve.

### q

```go
var q = new(big.Int).SetBytes([]byte{
	0x73, 0x5d, 0x36, 0x67, 0x8d, 0x3d, 0x3f, 0x0d,
	0xa7, 0x62, 0xc2, 0x0a, 0x4f, 0x54, 0x49, 0x1d,
	0x79, 0x3f, 0x04, 0x87, 0x3e, 0x6d, 0x55, 0x7c,
	0x6b, 0x6e, 0x7c, 0x03, 0x8c, 0x0c, 0x8d, 0x2c,
})
```

q is a variable that represents the order of the elliptic curve used in the pairing operation.