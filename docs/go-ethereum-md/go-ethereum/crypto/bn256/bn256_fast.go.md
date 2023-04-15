The codebase contains a package called `bn256`, which implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license. 

The package contains two types, `G1` and `G2`, which represent abstract cyclic groups. The zero value of each type is suitable for use as the output of an operation, but cannot be used as an input.

```
// G1 is an abstract cyclic group. The zero value is suitable for use as the
// output of an operation, but cannot be used as an input.
type G1 = bn256cf.G1

// G2 is an abstract cyclic group. The zero value is suitable for use as