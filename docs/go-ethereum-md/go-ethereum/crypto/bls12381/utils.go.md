# BLS12381 Package Documentation

This package provides functions to work with BLS12-381 elliptic curve.

## Functions

### bigFromHex

```go
func bigFromHex(hex string) *big.Int
```

bigFromHex is a utility function that converts a hexadecimal string to a big integer.

It takes a hexadecimal string as input and returns a big integer.

### decodeFieldElement

```go
func decodeFieldElement(in []byte) ([]byte, error)
```

decodeFieldElement is a function that decodes a field element from a byte slice.

It takes a byte slice as input and returns a byte slice with the lower 48 bytes of the input slice. If the input slice is not 64 bytes long or the top 16 bytes are not zero, an error is returned.

## Variables

This package does not define any variables.