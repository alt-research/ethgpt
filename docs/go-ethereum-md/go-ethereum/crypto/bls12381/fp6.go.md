# BLS12381 Package Documentation

This package provides functions to perform arithmetic operations on the BLS12-381 finite field.

## Types

### fp6Temp

```go
type fp6Temp struct {
    t [6]*fe2
}
```

fp6Temp is a temporary struct used to store intermediate values during arithmetic operations on the BLS12-381 finite field.

### fp6

```go
type fp6 struct {
    fp2 *fp2
    fp6Temp
}
```

fp6 is a struct that represents an element of the BLS12-381 finite field.

## Functions

### newFp6Temp

```go
func newFp6Temp() fp6Temp
```

newFp6Temp returns a new fp6Temp struct with all its fields initialized to zero.

### newFp6

```go
func newFp6(f *fp2) *fp6
```

newFp6 returns a new fp6 struct with its fp2 field set to the given fp2 struct. If f is nil, a new fp2 struct is created.

### fromBytes

```go
func (e *fp6) fromBytes(b []byte) (*fe6, error)
```

fromBytes converts a byte slice to an element of the BLS12-381 finite field. It returns an error if the input byte slice is smaller than 288 bytes.

### toBytes

```go
func (e *fp6) toBytes(a *fe6) []byte
```

toBytes converts an element of the BLS12-381 finite field to a byte slice.

### new

```go
func (e *fp6) new() *fe6
```

new returns a new element of the BLS12-381 finite field.

### zero

```go
func (e *fp6) zero() *fe6
```

zero returns an element of the BLS12-381 finite field with all its coefficients set to zero.

### one

```go
func (e *fp6) one() *fe6
```

one returns an element of the BLS12-381 finite field with all its coefficients set to one.

### add

```go
func (e *fp6) add(c, a, b *fe6)
```

add sets c to the sum of a and b in the BLS12-381 finite field.

### addAssign

```go
func (e *fp6) addAssign(a, b *fe6)
```

addAssign sets a to the sum of a and b in the BLS12-381 finite field.

### double

```go
func (e *fp6) double(c, a *fe6)
```

double sets c to the double of a in the BLS12-381 finite field.

### doubleAssign

```go
func (e *fp6) doubleAssign(a *fe6)
```

doubleAssign sets a to its double in # FP6 Package Documentation

This package provides functions to perform arithmetic operations on elements of the finite field extension FP6.

## Functions

### add

```go
func (e *fp6) add(c, a, b *fe6)
```

add computes the sum of two elements in the field extension FP6 and stores the result in c.

### double

```go
func (e *fp6) double(c, a *fe6)
```

double computes the double of an element in the field extension FP6 and stores the result in c.

### sub

```go
func (e *fp6) sub(c, a, b *fe6)
```

sub computes the difference between two elements in the field extension FP6 and stores the result in c.

### neg

```go
func (e *fp6) neg(c, a *fe6)
```

neg computes the negation of an element in the field extension FP6 and stores the result in c.

### conjugate

```go
func (e *fp6) conjugate(c, a *fe6)
```

conjugate computes the conjugate of an element in the field extension FP6 and stores the result in c.

### mul

```go
func (e *fp6) mul(c # FP6 Package Documentation

This package provides functions to perform arithmetic operations on elements of the finite field extension FP6.

## Functions

### mul

```go
func (e *fp6) mul(c, a, b *fe6)
```

mul multiplies two elements of the finite field extension FP6. It takes the following parameters:

- `c`: the result of the multiplication.
- `a`: the first element to be multiplied.
- `b`: the second element to be multiplied.

### square

```go
func (e *fp6) square(c, a *fe6)
```

square computes the square of an element of the finite field extension FP6. It takes the following parameters:

- `c`: the result of the square operation.
- `a`: the element to be squared.

### inverse

```go
func (e *fp6) inverse(c, a *fe6)
```

inverse computes the inverse of an element of the finite field extension FP6. It takes the following parameters:

- `c`: the result of the inverse operation.
- `a`: the element to be inverted.

### frobeniusMap

```go
func (e *fp6) frobeniusMap(c, a *fe6, power uint)
```

frobeniusMap applies the Frobenius map to an element of the finite field extension FP6. It takes the following parameters:

- `c`: the result of the Frobenius map.
- `a`: the element to which the Frobenius map is applied.
- `power`: the power of the Frobenius map.

### frobeniusMapAssign

```go
func (e *fp6) frobeniusMapAssign(a *fe6, power uint)
```

frobeniusMapAssign applies the Frobenius map to an element of the finite field extension FP6 and assigns the result to the same element. It takes the following parameters:

- `a`: the element to which the Frobenius map is applied.
- `power`: the power of the Frobenius map.

## Variables

### frobeniusCoeffs61

```go
var frobeniusCoeffs61 = [6]fe2{
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
}
```

frobeniusCoeffs61 is a variable that contains the coefficients used in the Frobenius map for power 6k+1.

### frobeniusCoeffs62

```go
var frobeniusCoeffs62 = [6]fe2{
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
	{0x01, 0x00},
}
```

frobeniusCoeffs62 is a variable that contains the coefficients used in the Frobenius map for power 6k+2.