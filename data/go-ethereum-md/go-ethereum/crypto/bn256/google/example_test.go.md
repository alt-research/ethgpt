# bn256 Package

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

## ExamplePair Function

The `ExamplePair()` function implements the tripartite Diffie-Hellman algorithm from "A One Round Protocol for Tripartite Diffie-Hellman", A. Joux. The function generates three private values, `a`, `b`, and `c`, for each of the three parties involved in the algorithm. Then, each party calculates `g₁` and `g₂` times their private value. After that, each party exchanges its public values with the other two parties, and all parties can calculate the shared key.

### Parameters

The `ExamplePair()` function does not take any parameters.

### Return Value

The `ExamplePair()` function does not return any values.

### Example Usage

```go
func main() {
    ExamplePair()
}
```