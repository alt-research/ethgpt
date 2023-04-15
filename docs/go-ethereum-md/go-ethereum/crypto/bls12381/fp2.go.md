# BLS12381 Package Documentation

This package provides functions to perform arithmetic operations on the BLS12-381 finite field.

## Types

### fp2Temp

```go
type fp2Temp struct {
	t [4]*fe
}
```

fp2Temp is a temporary struct used to store intermediate values during arithmetic operations.

### fp2

```go
type fp2 struct {
	fp2Temp
}
```

fp2 is a struct that represents an element of the BLS12-381 finite field.

## Functions

### newFp2Temp

```go
func newFp2Temp() fp2Temp
```

newFp2Temp creates a new fp2Temp struct with all its fields initialized to zero.

### newFp2

```go
func newFp2() *fp2
```

newFp2 creates a new fp2 struct with all its fields initialized to zero.

### fromBytes

```go
func (e *fp2) fromBytes(in []byte) (*fe2, error)
```

fromBytes converts a byte slice to an element of the BLS12-381 finite field. It takes the following parameters:

- `in`: the byte slice to be converted.

It returns a pointer to an fe2 struct and an error if the length of the input byte slice is not 96 bytes.

### toBytes

```go
func (e *fp2) toBytes(a *fe2) []byte
```

toBytes converts an element of the BLS12-381 finite field to a byte slice. It takes the following parameters:

- `a`: the element to be converted.

It returns a byte slice of length 96.

### new

```go
func (e *fp2) new() *fe2
```

new creates a new element of the BLS12-381 finite field with all its fields initialized to zero.

### zero

```go
func (e *fp2) zero() *fe2
```

zero returns an element of the BLS12-381 finite field with all its fields set to zero.

### one

```go
func (e *fp2) one() *fe2
```

one returns an element of the BLS12-381 finite field with all its fields set to one.

### add

```go
func (e *fp2) add(c, a, b *fe2)
```

add adds two elements of the BLS12-381 finite field. It takes the following parameters:

- `c`: the result of the addition.
- `a`: the first element to be added.
- `b`: the second element to be added.

### addAssign

```go
func (e *fp2) addAssign(a, b *fe2)
```

addAssign # fp2 Package Documentation

This package provides functions to perform arithmetic operations on elements of the finite field extension Fp2.

## Functions

### add

```go
func add(c, a, b *fe2)
```

add adds two elements of Fp2 and stores the result in c.

### sub

```go
func sub(c, a, b *fe2)
```

sub subtracts two elements of Fp2 and stores the result in c.

### double

```go
func double(c, a *fe2)
```

double doubles an element of Fp2 and stores the result in c.

### neg

```go
func neg(c, a *fe2)
```

neg computes the negation of an element of Fp2 and stores the result in c.

### mul

```go
func mul(c, a, b *fe2)
```

mul multiplies two elements of Fp2 and stores the result in c.

### square

```go
func square(c, a *fe2)
```

square computes the square of an element of Fp2 and stores the result in c.

### inverse

```go
func inverse(c, a *fe2) bool
```

inverse computes the inverse of an element of Fp2 and stores the result in c. It returns true if the inverse exists, false otherwise.

### exp

```go
func (e *fp2) exp(c, a *fe2, s *big.Int)
```

exp computes the exponentiation of an element of Fp2 and stores the result in c. It takes the following parameters:

- `c`: the result of the exponentiation.
- `a`: the base of the exponentiation.
- `s`: the exponent.

### frobeniusMap

```go
func (e *fp2) frobeniusMap(c, a *fe2, power uint)
```

frobeniusMap computes the Frobenius map of an element of Fp2 and stores the result in c. It takes the following parameters:

- `c`: the result of the Frobenius map.
- `a`: the element to apply the Frobenius map to.
- `power`: the power of the Frobenius map.

### frobeniusMapAssign

```go
func (e *fp2) frobeniusMapAssign(a *fe2, power uint)
```

frobeniusMapAssign applies the Frobenius map to an element of Fp2 in place. It takes the following parameters:

- `a`: the element to apply the Frobenius map to.
- `power`: the power of the Frobenius map.

### sqrt

```go
func (e *fp2) sqrt(c, a *fe2) bool
```

sqrt computes the square root of an element of Fp2 and stores the result in c. It returns true if the square root exists, false otherwise. It takes the following parameters:

- `c`: the result of the square root.
- `a`: the element to compute the square root of.

### isQuadraticNonResidue

```go
func (e *fp2) isQuadraticNonResidue(a *fe2) bool
```

isQuadraticNonResidue checks if an element of Fp2 is a quadratic non-residue. It returns true if the element is a quadratic non-residue, false otherwise. It takes the following parameter:

- `a`: the element to check.