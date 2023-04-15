# BLS12381 Package Documentation

This package provides functions to work with the BLS12-381 elliptic curve.

## Types

### fe

```go
type fe [6]uint64
```

fe is a type that represents a base field element.

### fe2

```go
type fe2 [2]fe
```

fe2 is a type that represents an element of the quadratic extension of the base field.

### fe6

```go
type fe6 [3]fe2
```

fe6 is a type that represents an element of the cubic extension of the quadratic extension of the base field.

### fe12

```go
type fe12 [2]fe6
```

fe12 is a type that represents an element of the quadratic extension of the cubic extension of the quadratic extension of the base field.

## Functions

### setBytes

```go
func (fe *fe) setBytes(in []byte) *fe
```

setBytes sets the value of a base field element from a byte slice.

### setBig

```go
func (fe *fe) setBig(a *big.Int) *fe
```

setBig sets the value of a base field element from a big integer.

### setString

```go
func (fe *fe) setString(s string) (*fe, error)
```

setString sets the value of a base field element from a hexadecimal string.

### set

```go
func (fe *fe) set(fe2 *fe) *fe
```

set sets the value of a base field element to the value of another base field element.

### bytes

```go
func (fe *fe) bytes() []byte
```

bytes returns the byte representation of a base field element.

### big

```go
func (fe *fe) big() *big.Int
```

big returns the big integer representation of a base field element.

### string

```go
func (fe *fe) string() (s string)
```

string returns the hexadecimal string representation of a base field element.

### zero

```go
func (fe *fe) zero() *fe
```

zero sets the value of a base field element to zero.

### one

```go
func (fe *fe) one() *fe
```

one sets the value of a base field element to one.

### rand

```go
func (fe *fe) rand(r io.Reader) (*fe, error)
```

rand sets the value of a base field element to a random value.

### isValid

```go
func (fe *fe) isValid() bool
```

isValid checks if a base field element is a valid element of the field.

### isOdd

```go
func (fe *fe) isOdd() bool
```

isOdd checks if a base field element is odd.

### isEven

```go
func (fe *fe) isEven() bool
```

isEven checks if a base field element is even.

### isZero

```go
func (fe *fe) isZero() bool
```

isZero checks if a base field element is zero.

### isOne

```go
func (fe *fe) isOne() bool
```

isOne checks if a base field element is one.

### cmp

```go
func (fe *fe) cmp(fe2 *fe) int
```

cmp compares two base field elements and returns 1 if the first element is greater, -1 if the second element is greater, and 0 if they are equal.

### e

```go
func (fe *fe) e
```

e is an incomplete function definition and should not be used. # Source Code Documentation

This source code contains several functions that operate on finite fields. Below is a description of each function:

## Functions

### qual

```go
func qual(fe2 *fe) bool
```

qual returns true if the two given finite fields are equal, and false otherwise.

### (e *fe) sign

```go
func (e *fe) sign() bool
```

sign returns true if the given finite field is even, and false otherwise.

### (fe *fe) div2

```go
func (fe *fe) div2(e uint64)
```

div2 divides the given finite field by 2 and sets the least significant bit to the given value.

### (fe *fe) mul2

```go
func (fe *fe) mul2() uint64
```

mul2 multiplies the given finite field by 2 and returns the carry bit.

### (e *fe2) zero

```go
func (e *fe2) zero() *fe2
```

zero sets the given finite field to zero and returns it.

### (e *fe2) one

```go
func (e *fe2) one() *fe2
```

one sets the given finite field to one and returns it.

### (e *fe2) set

```go
func (e *fe2) set(e2 *fe2) *fe2
```

set sets the given finite field to the value of the given finite field and returns it.

### (e *fe2) rand

```go
func (e *fe2) rand(r io.Reader) (*fe2, error)
```

rand generates a random finite field and returns it along with any error that occurred.

### (e *fe2) isOne

```go
func (e *fe2) isOne() bool
```

isOne returns true if the given finite field is equal to one, and false otherwise.

### (e *fe2) isZero

```go
func (e *fe2) isZero() bool
```

isZero returns true if the given finite field is equal to zero, and false otherwise.

### (e *fe2) equal

```go
func (e *fe2) equal(e2 *fe2) bool
```

equal returns true if the two given finite fields are equal, and false otherwise.

### (e *fe2) sign

```go
func (e *fe2) sign() bool
```

sign returns true if the given finite field is even, and false otherwise.

### (e *fe6) zero

```go
func (e *fe6) zero() *fe6
```

zero sets the given finite field to zero and returns it.

### (e *fe6) one

```go
func (e *fe6) one() *fe6
```

one sets the given finite field to one and returns it.

### (e *fe6) set

```go
func (e *fe6) set(e2 *fe6) *fe6
```

set sets the given finite field to the value of the given finite field and returns it.

### (e *fe6) rand

```go
func (e *fe6) rand(r io.Reader) (*fe6, error)
```

rand generates a random finite field and returns it along with any error that occurred.

### (e *fe6) isOne

```go
func (e *fe6) isOne() bool
```

isOne returns true if the given finite field is equal to one, and false otherwise.

### (e *fe6) isZero

```go
func (e *fe6) isZero() bool
```

isZero returns true