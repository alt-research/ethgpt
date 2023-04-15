# BLS12381 Package Documentation

This package provides functions to apply the 11-isogeny map for BLS12-381 G1 and G2 defined at draft-irtf-cfrg-hash-to-curve-06.

## Functions

### isogenyMapG1

```go
func isogenyMapG1(x, y *fe)
```

isogenyMapG1 applies the 11-isogeny map for BLS12-381 G1 defined at draft-irtf-cfrg-hash-to-curve-06. It takes the following parameters:

- `x`: a pointer to the x-coordinate of the point to be mapped.
- `y`: a pointer to the y-coordinate of the point to be mapped.

### isogenyMapG2

```go
func isogenyMapG2(e *fp2, x, y *fe2)
```

isogenyMapG2 applies the 11-isogeny map for BLS12-381 G2 defined at draft-irtf-cfrg-hash-to-curve-06. It takes the following parameters:

- `e`: a pointer to an fp2 element to be used for intermediate calculations. If nil, a new fp2 element will be created.
- `x`: a pointer to the x-coordinate of the point to be mapped.
- `y`: a pointer to the y-coordinate of the point to be mapped.

## Variables

### isogenyConstantsG1

```go
var isogenyConstantsG1 = [4][16]*fe{...}
```

isogenyConstantsG1 is a constant array that contains the coefficients used in the 11-isogeny map for BLS12-381 G1 defined at draft-irtf-cfrg-hash-to-curve-06.

### isogenyConstantsG2

```go
var isogenyConstantsG2 = [4][4]*fe2{...}
```

isogenyConstantsG2 is a constant array that contains the coefficients used in the 11-isogeny map for BLS12-381 G2 defined at draft-irtf-cfrg-hash-to-curve-06. Hello! I'd be happy to help you with documenting this code. However, I need some more information about the codebase. Could you please provide me with the programming language and the purpose of this code? Hello! I'd be happy to help you with documenting this code. It looks like this is a section of code that defines constants for isogeny calculations in G2. 

Let's start with the `isogenyConstantsG2` variable. This is a 4x4 array of pointers to `fe2` structs. Each `fe2` struct contains two `fe` structs, which represent elements of the finite field Fp2. 

Here's an example of how to access the first element of the first `fe2` struct in the first row of `isogenyConstantsG2`:

```
fe2 *elem = isogenyConstantsG2[0][0];
fe *feElem1 = elem->e1;
fe *feElem2 = elem->e2;
```

Moving on to the `isogenyConstantsG1` variable, this is a 4x3x2 array of `fe` structs. Each `fe` struct represents an element of the finite field Fp. 

Here's an example of how to access the first element of the first row of `isogenyConstantsG1`:

```
fe *elem = isogenyConstantsG1[0][0];
```

I hope this helps! Let me know if you have any further questions. I'm sorry, but the code snippet you provided seems to be incomplete and out of context. It appears to be a multi-dimensional array of `fe` structs, but without more information about the context and purpose of this code, I cannot provide a meaningful documentation. Please provide more information or context about the code so I can assist you better.