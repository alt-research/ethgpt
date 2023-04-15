# BLS12381 Package Documentation

This package provides functions to perform arithmetic operations on the BLS12-381 elliptic curve.

## Functions

### fromBytes

```go
func fromBytes(in []byte) (*fe, error)
```

fromBytes converts a byte slice to a field element. It takes the following parameters:

- `in`: the byte slice to be converted.

It returns a pointer to the field element and an error if the input string is not 48 bytes or if the field element is not less than the modulus.

### fromBig

```go
func fromBig(in *big.Int) (*fe, error)
```

fromBig converts a big integer to a field element. It takes the following parameters:

- `in`: the big integer to be converted.

It returns a pointer to the field element and an error if the input string is invalid or if the field element is not less than the modulus.

### fromString

```go
func fromString(in string) (*fe, error)
```

fromString converts a string to a field element. It takes the following parameters:

- `in`: the string to be converted.

It returns a pointer to the field element and an error if the input string is invalid or if the field element is not less than the modulus.

### toBytes

```go
func toBytes(e *fe) []byte
```

toBytes converts a field element to a byte slice. It takes the following parameters:

- `e`: the field element to be converted.

It returns a byte slice.

### toBig

```go
func toBig(e *fe) *big.Int
```

toBig converts a field element to a big integer. It takes the following parameters:

- `e`: the field element to be converted.

It returns a pointer to the big integer.

### toString

```go
func toString(e *fe) (s string)
```

toString converts a field element to a string. It takes the following parameters:

- `e`: the field element to be converted.

It returns a string.

### toMont

```go
func toMont(c, a *fe)
```

toMont converts a field element to Montgomery form. It takes the following parameters:

- `c`: the field element to be converted to Montgomery form.
- `a`: the field element to be converted.

### fromMont

```go
func fromMont(c, a *fe)
```

fromMont converts a field element from Montgomery form. It takes the following parameters:

- `c`: the field element to be converted from Montgomery form.
- `a`: the field element to be converted.

### exp

```go
func exp(c, a *fe, e *big.Int)
```

exp calculates the exponentiation of a field element to a big integer. It takes the following parameters:

- `c`: the result of the exponentiation.
- `a`: the field element to be exponentiated.
- `e`: the big integer exponent.

### inverse

```go
func inverse(inv, e *fe)
```

inverse calculates the inverse of a field element. It takes the following parameters:

- `inv`: the result of the inverse operation.
- `e`: the field element to be inverted.

### sqrt

```go
func sqrt(c, a *fe) bool
```

sqrt calculates the square root of a field element. It takes the following parameters:

- `c`: the result of the square root operation.
- `a`: the field element to be square rooted.

It returns a boolean indicating whether the square root was found.

### isQuadraticNonResidue

```go
func isQuadraticNonResidue(elem *fe) bool
```

isQuadraticNonResidue checks if a field element is a quadratic non-residue. It takes the following parameters:

- `elem`: the field element to be checked.

It returns a boolean indicating whether the field element is a quadratic non-residue.