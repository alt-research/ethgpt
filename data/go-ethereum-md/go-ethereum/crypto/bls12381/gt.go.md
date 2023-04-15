# BLS12381 Package Documentation

This package provides functions to perform operations on the BLS12-381 elliptic curve.

## Types

### E

```go
type E = fe12
```

E is a type for target group element.

### GT

```go
type GT struct {
	fp12 *fp12
}
```

GT is a type for target multiplicative group GT.

## Functions

### NewGT

```go
func NewGT() *GT
```

NewGT constructs a new target group instance.

### (e *E) Set

```go
func (e *E) Set(e2 *E) *E
```

Set sets the value of a target group element to the value of another target group element.

### (e *E) One

```go
func (e *E) One() *E
```

One sets a new target group element to one.

### (e *E) IsOne

```go
func (e *E) IsOne() bool
```

IsOne returns true if the given element equals to one.

### (g *E) Equal

```go
func (g *E) Equal(g2 *E) bool
```

Equal returns true if the given two elements are equal, otherwise returns false.

### (g *GT) Q

```go
func (g *GT) Q() *big.Int
```

Q returns the group order in big.Int.

### (g *GT) FromBytes

```go
func (g *GT) FromBytes(in []byte) (*E, error)
```

FromBytes expects 576 byte input and returns a target group element. FromBytes returns an error if the given element is not on the correct subgroup.

### (g *GT) ToBytes

```go
func (g *GT) ToBytes(e *E) []byte
```

ToBytes serializes a target group element.

### (g *GT) IsValid

```go
func (g *GT) IsValid(e *E) bool
```

IsValid checks whether the given target group element is in the correct subgroup.

### (g *GT) New

```go
func (g *GT) New() *E
```

New initializes a new target group element which is equal to one.

### (g *GT) Add

```go
func (g *GT) Add(c, a, b *E)
```

Add adds two field elements `a` and `b` and assigns the result to the element in the first argument.

### (g *GT) Sub

```go
func (g *GT) Sub(c, a, b *E)
```

Sub subtracts two field elements `a` and `b`, and assigns the result to the element in the first argument.

### (g *GT) Mul

```go
func (g *GT) Mul(c, a, b *E)
```

Mul multiplies two field elements `a` and `b` and assigns the result to the element in the first argument.

### (g *GT) Square

```go
func (g *GT) Square(c, a *E)
```

Square squares an element `a` and assigns the result to the element in the first argument.

### (g *GT) Exp

```go
func (g *GT) Exp(c, a *E, s *big.Int)
```

Exp exponents an element `a` by a scalar `s` and assigns the result to the element in the first argument.

### (g *GT) Inverse

```go
func (g *GT) Inverse(c, a *E)
```

Inverse inverses an element `a` and assigns the result to the element in the first argument.