# BLS12381 Package Documentation

This package provides functions to work with the BLS12-381 elliptic curve.

## Functions

### TestFieldElementValidation

```go
func TestFieldElementValidation(t *testing.T)
```

TestFieldElementValidation is a test function that tests the validation of field elements. It checks if zero and one are valid, if the modulus is invalid, and if a number greater than the modulus is invalid.

### TestFieldElementEquality

```go
func TestFieldElementEquality(t *testing.T)
```

TestFieldElementEquality is a test function that tests the equality of field elements. It checks if zero and one are equal to themselves, if a random element is equal to itself, and if adding one to an element makes it different from the original element.

### TestFieldElementHelpers

```go
func TestFieldElementHelpers(t *testing.T)
```

TestFieldElementHelpers is a test function that tests the helper functions for field elements. It checks if zero is zero, if one is one, if 1 is odd and not even, if 2 is even and not odd.

### TestFieldElementSerialization

```go
func TestFieldElementSerialization(t *testing.T)
```

TestFieldElementSerialization is a test function that tests the serialization of field elements. It checks if zero is serialized correctly, if bytes can be serialized and deserialized correctly, if big integers can be encoded and decoded correctly, and if strings can be encoded and decoded correctly.

## Variables

### modulus

```go
var modulus = fe{
	0x1a0111ea397fe69a, 0x4b1ba7b6434bacd7,
	0x5d8ab8e4d6e5f329, 0x8a5296fff95f3b3d,
	0x6c47d08ffb10d4b8, 0x0000000000000001,
}
```

modulus is a variable that contains the modulus of the BLS12-381 elliptic curve.

### fuz

```go
const fuz = 100
```

fuz is a constant that defines the number of iterations for the serialization tests.

## Types

### fe

```go
type fe [6]uint64
```

fe is a type that represents a field element of the BLS12-381 elliptic curve.

### fe2

```go
type fe2 [2]fe
```

fe2 is a type that represents a field element of the BLS12-381 elliptic curve with two components.

### fe6

```go
type fe6 [3]fe2
```

fe6 is a type that represents a field element of the BLS12-381 elliptic curve with six components.

### fe12

```go
type fe12 [2]fe6
```

fe12 is a type that represents a field element of the BLS12-381 elliptic curve with twelve components. # Field Element Package Documentation

This package provides functions to manipulate field elements in the context of elliptic curve cryptography.

## Functions

### TestFieldElementSerialization

```go
func TestFieldElementSerialization(t *testing.T)
```

TestFieldElementSerialization is a test function that tests the serialization and deserialization of field elements. It generates random field elements, serializes them, deserializes them, and checks if the deserialized elements are equal to the original ones.

### TestFieldElementByteInputs

```go
func TestFieldElementByteInputs(t *testing.T)
```

TestFieldElementByteInputs is a test function that tests the deserialization of field elements from byte inputs. It generates byte inputs of different lengths, deserializes them, and checks if the deserialized elements are equal to the expected ones.

### TestFieldElementCopy

```go
func TestFieldElementCopy(t *testing.T)
```

TestFieldElementCopy is a test function that tests the copying of field elements. It generates random field elements, copies them, and checks if the copied elements are equal to the original ones.

## Variables

There are no variables in this package.