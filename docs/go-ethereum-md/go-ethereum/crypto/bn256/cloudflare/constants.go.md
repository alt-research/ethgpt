## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `bigFromBase10`

`bigFromBase10` converts a string representation of a base-10 number to a `*big.Int`.

```go
func bigFromBase10(s string) *big.Int
```

##### Parameters

- `s` - a string representation of a base-10 number.

##### Return Values

- `*big.Int` - a `*big.Int` representation of the input string.

### Variable `u`

`u` is a BN parameter.

### Variable `Order`

`Order` is the number of elements in both G₁ and G₂: 36u⁴+36u³+18u²+6u+1. It needs to be highly 2-adic for efficient SNARK key and proof generation. `Order - 1` is a large composite number with many prime factors.

### Variable `P`

`P` is a prime over which we form a basic field: 36u⁴+36u³+24u²+6u+1.

### Variable `p2`

`p2` is `P`, represented as little-endian 64-bit words.

### Variable `np`

`np` is the negative inverse of `P`, mod 2^256.

### Variable `rN1`

`rN1` is R^-1 where R = 2^256 mod `P`.

### Variable `r2`

`r2` is R^2 where R = 2^256 mod `P`.

### Variable `r3`

`r3` is R^3 where R = 2^256 mod `P`.

### Variable `xiToPMinus1Over6`

`xiToPMinus1Over6` is ξ^((P-1)/6) where ξ = i+9.

### Variable `xiToPMinus1Over3`

`xiToPMinus1Over3` is ξ^((P-1)/3) where ξ = i+9.

### Variable `xiToPMinus1Over2`

`xiToPMinus1Over2` is ξ^((P-1)/2) where ξ = i+9.

### Variable `xiToPSquaredMinus1Over3`

`xiToPSquaredMinus1Over3` is ξ^((P²-1)/3) where ξ = i+9.

### Variable `xiTo2PSquaredMinus2Over3`

`xiTo2PSquaredMinus2Over3` is ξ^((2P²-2)/3) where ξ = i+9 (a cubic root of unity, mod `P`).

### Variable `xiToPSquaredMinus1Over6`

`xiToPSquaredMinus1Over6` is ξ^((1P²-1)/6) where ξ = i+9 (a cubic root of -1, mod `P`).

### Variable `xiTo2PMinus2Over3`

`xiTo2PMinus2Over3` is ξ^((2P-2)/3) where ξ = i+9.