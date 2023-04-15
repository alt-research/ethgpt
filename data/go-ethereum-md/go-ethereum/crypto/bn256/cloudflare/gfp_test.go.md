## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `TestGFpNeg`

`TestGFpNeg` tests that negation works the same way on both assembly-optimized and pure Go implementation.

```go
func TestGFpNeg(t *testing.T)
```

##### Parameters

- `t` - a testing handle.

### Function `TestGFpAdd`

`TestGFpAdd` tests that addition works the same way on both assembly-optimized and pure Go implementation.

```go
func TestGFpAdd(t *testing.T)
```

##### Parameters

- `t` - a testing handle.

### Function `TestGFpSub`

`TestGFpSub` tests that subtraction works the