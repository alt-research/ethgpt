# BLS12-381 Package Documentation

This package provides an implementation of the BLS12-381 elliptic curve pairing engine.

## Types

### pair

```go
type pair struct {
	g1 *PointG1
	g2 *PointG2
}
```

pair is a struct that represents a pair of points, one from G1 and one from G2.

### Engine

```go
type Engine struct {
	G1   *G1
	G2   *G2
	fp12 *fp12
	fp2  *fp2
	pairingEngineTemp
	pairs []pair
}
```

Engine is the BLS12-381 elliptic curve pairing engine. It contains pointers to the G1 and G2 groups, as well as the fp2 and fp12 finite fields. It also has a pairingEngineTemp struct and a slice of pairs.

## Functions

### NewPairingEngine

```go
func NewPairingEngine() *Engine
```

NewPairingEngine creates a new pairing engine instance. It returns a pointer to an Engine struct.

### (e *Engine) AddPair

```go
func (e *Engine) AddPair(g1 *PointG1, g2 *PointG2) *Engine
```

AddPair adds a G1, G2 point pair to the pairing engine. It takes a pointer to a PointG1 and a PointG2 and returns a pointer to the Engine struct.

### (e *Engine) AddPairInv

```go
func (e *Engine) AddPairInv(g1 *PointG1, g2 *PointG2) *Engine
```

AddPairInv adds a G1, G2 point pair to the pairing engine. The G1 point is negated. It takes a pointer to a PointG1 and a PointG2 and returns a pointer to the Engine struct.

### (e *Engine) Reset

```go
func (e *Engine) Reset() *Engine
```

Reset deletes all added pairs from the pairing engine. It returns a pointer to the Engine struct.

### (e *Engine) doublingStep

```go
func (e *Engine) doublingStep(coeff *[3]fe2, r *PointG2)
```

doublingStep is a helper function used in the pairing calculation. It takes a pointer to an array of three fe2 elements and a pointer to a PointG2.

### (e *Engine) additionStep

```go
func (e *Engine) additionStep(coeff *[3]fe2, r, q *PointG2)
```

additionStep is a helper function used in the pairing calculation. It takes a pointer to an array of three fe2 elements and two pointers to PointG2.

## Variables

### testSecKey

```go
var testSecKey = "RWRCSwAAAABVN5lr2JViGBN8DhX3/Qb/0g0wBdsNAR/APRW2qy9Fjsfr12sK2cd3URUFis1jgzQzaoayK8x4syT4G3Gvlt9RwGIwUYIQW/0mTeI+ECHu1lv5U4Wa2YHEPIesVPyRm5M="
```

testSecKey is a test variable that contains a secret key used to sign files.

### testPubKey

```go
var testPubKey = "RWTAPRW2qy9FjsBiM # Pairing Package Documentation

This package provides functions to compute pairings between points in G1 and G2 groups.

## Functions

### Check

```go
func (e *Engine) Check() bool
```

Check computes pairing and checks if the result is equal to one. It returns a boolean value indicating whether the result is equal to one or not.

### Result

```go
func (e *Engine) Result() *E
```

Result computes pairing and returns the target group element as a result. It returns a pointer to the target group element.

### GT

```go
func (e *Engine) GT() *GT
```

GT returns the target group instance. It returns a pointer to the target group instance.

## Private Functions

### preCompute

```go
func (e *Engine) preCompute(ellCoeffs *[68][3]fe2, twistPoint *PointG2)
```

preCompute is a private function that precomputes the coefficients for the Miller loop algorithm.

### doublingStep

```go
func (e *Engine) doublingStep(coeff *[3]fe2, r *PointG2)
```

doublingStep is a private function that performs a doubling step in the Miller loop algorithm.

### additionStep

```go
func (e *Engine) additionStep(coeff *[3]fe2, r, p *PointG2)
```

additionStep is a private function that performs an addition step in the Miller loop algorithm.

### millerLoop

```go
func (e *Engine) millerLoop(f *fe12)
```

millerLoop is a private function that computes the Miller loop algorithm.

### exp

```go
func (e *Engine) exp(c, a *fe12)
```

exp is a private function that computes the exponentiation of a field element.

### finalExp

```go
func (e *Engine) finalExp(f *fe12)
```

finalExp is a private function that computes the final exponentiation of the Miller loop algorithm.

### calculate

```go
func (e *Engine) calculate() *fe12
```

calculate is a private function that computes the pairing and returns the result as a field element.

## Variables

### x

```go
var x = new(big.Int).SetBytes([]byte{
	0x72, 0x8c, 0x1b, 0x1e, 0x6d, 0x3f, 0x3b, 0x60,
	0x41, 0x38, 0x4f, 0x8c, 0x8b, 0x4f, 0x93, 0x9d,
	0x13, 0x3e, 0x14, 0x5d, 0x5e, 0x30, 0x3d, 0x29,
	0x70, 0x2f, 0x6d, 0x9c, 0x18, 0x5d, 0x1e, 0x3d,
})
```

x is a variable that contains a big integer used in the Miller loop algorithm.

### pairs

```go
var pairs = []g1g2{
	{
		g1: [2]fe{
			{
				0x1d8f6d4e5d8f6d4e, 0x1d8f6d4e5d8f6d4e,
				0x1d8f6d4e5d8f6d4e, 0x1d8f6d