# secp256k1 Package Documentation

This package provides functions to perform operations on the secp256k1 elliptic curve.

## Functions

### ScalarMult

```go
func (BitCurve *BitCurve) ScalarMult(Bx, By *big.Int, scalar []byte) (*big.Int, *big.Int)
```

ScalarMult multiplies a point on the secp256k1 elliptic curve by a scalar value and returns the resulting point. This function is not available when secp256k1 is built without cgo.

## License

This package is licensed under a BSD-style license. The full text of the license can be found in the LICENSE file.

## Build Tags

### gofuzz

The `gofuzz` build tag is used to include the ScalarMult function when building with the go-fuzz tool.

### !cgo

The