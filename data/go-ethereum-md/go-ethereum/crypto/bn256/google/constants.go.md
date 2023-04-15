## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `bigFromBase10(s string) *big.Int`

The `bigFromBase10` function takes a string `s` representing a base-10 number and returns a pointer to a `big.Int` representing the same number.

### Variable `u`

`u` is a `big.Int` representing the BN parameter that determines the prime.

### Variable `P`

`P` is a `big.Int` representing a prime over which we form a basic field: 36u⁴+36u³+24u²+6u+1.

### Variable `Order`

`Order` is a `big.Int` representing the number of elements in both G₁ and G₂: 36u⁴+36u³+18u²+6u+1. It needs to be highly 2-adic for efficient SNARK key and proof generation. `Order - 1` is a product of several large prime numbers.

### Variable `xiToPMinus1Over6`

`xiToPMinus1Over6` is a `gfP2` representing ξ^((p-1)/6) where ξ = i+9.

### Variable `xiToPMinus1Over3`

`xiToPMinus1Over3` is a `gfP2` representing ξ^((p-1)/3) where ξ = i+9.

### Variable `xiToPMinus1Over2`

`xiToPMinus1Over2` is a `gfP2` representing ξ^((p-1)/2) where ξ = i+9.

### Variable `xiToPSquaredMinus1Over3`

`xiToPSquaredMinus1Over3` is a `big.Int` representing ξ^((p²-1)/3) where ξ = i+9.

### Variable `xiTo2PSquaredMinus2Over3`

`xiTo2PSquaredMinus2Over3` is a `big.Int` representing ξ^((2p²-2)/3) where ξ = i+9 (a cubic root of unity, mod p).

### Variable `xiToPSquaredMinus1Over6`

`xiToPSquaredMinus1Over6` is a `big.Int` representing ξ^((1p²-1)/6) where ξ = i+9 (a cubic root of -1, mod p).

### Variable `xiTo2PMinus2Over3`

`xiTo2PMinus2Over3` is a `gfP2` representing ξ^((2p-2)/3) where ξ = i+9.