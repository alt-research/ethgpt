# BLS12381 Package Documentation

This package provides a function to generate a random scalar using the `crypto/rand` and `math/big` packages.

## Functions

### randScalar

```go
func randScalar(max *big.Int) *big.Int
```

randScalar generates a random scalar using the `crypto/rand` package and returns it as a `*big.Int`. It takes the following parameter:

- `max`: the maximum value for the scalar.

## Variables

### fuz

```go
var fuz = 10
```

fuz is a variable that contains a fuzz factor used in some of the tests. It is not used in the randScalar function.