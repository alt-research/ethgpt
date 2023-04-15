# BLS12381 Package Documentation

This package provides functions for implementing the BLS12-381 pairing-based cryptography system.

## Functions

### swuMapG1

```go
func swuMapG1(u *fe) (*fe, *fe)
```

swuMapG1 is an implementation of the Simplified Shallue-van de Woestijne-Ulas Method for mapping a point in the field `fe` to a point on the elliptic curve G1. It follows the implementation at draft-irtf-cfrg-hash-to-curve-06.

### swuMapG2

```go
func swuMapG2(e *fp2, u *fe2) (*fe2, *fe2)
```

swuMapG2 is an implementation of the Simplified Shallue-van de Woestijne-Ulas Method for mapping a point in the field `fe2` to a point on the elliptic curve G2. It follows the implementation at draft-irtf-cfrg-hash-to-curve-06.

## Variables

### swuParamsForG1

```go
var swuParamsForG1 = struct {
	z           *fe
	zInv        *fe
	a           *fe
	b           *fe
	minusBOverA *fe
}{
	// ...
}
```

swuParamsForG1 is a struct containing the parameters used in the swuMapG1 function.

### swuParamsForG2

```go
var swuParamsForG2 = struct {
	z           *fe2
	zInv        *fe2
	a           *fe2
	b           *fe2
	minusBOverA *fe2
}{
	// ...
}
```

swuParamsForG2 is a struct containing the parameters used in the swuMapG2 function.

## License

This code is licensed under the GNU Lesser General Public License. See the license for more details. I'm sorry, but the code snippet you provided does not contain any functions or methods to document. It appears to be a struct initialization. If you have any specific functions or methods you would like me to document, please provide them.