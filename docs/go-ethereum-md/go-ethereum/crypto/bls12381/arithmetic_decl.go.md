# BLS12381 Package Documentation

This package provides functions for performing arithmetic operations on BLS12-381 finite fields.

## Functions

### init

```go
func init()
```

init is a function that initializes the package by setting the `mul` function to `mulNoADX` if the ADX instruction set is not available on the current CPU.

### square

```go
func square(c, a *fe)
```

square calculates the square of the given field element `a` and stores the result in `c`.

### neg

```go
func neg(c, a *fe)
```

neg calculates the negation of the given field element `a` and stores the result in `c`.

### add

```go
func add(c, a, b *fe)
```

add calculates the sum of the given field elements `a` and `b` and stores the result in `c`.

### addAssign

```go
func addAssign(a, b *fe)
```

addAssign calculates the sum of the given field elements `a` and `b` and stores the result in `a`.

### ladd

```go
func ladd(c, a, b *fe)
```

ladd calculates the sum of the given field elements `a` and `b` and stores the result in `c`. This function is used for lazy addition.

### laddAssign

```go
func laddAssign(a, b *fe)
```

laddAssign calculates the sum of the given field elements `a` and `b` and stores the result in `a`. This function is used for lazy addition.

### double

```go
func double(c, a *fe)
```

double calculates the double of the given field element `a` and stores the result in `c`.

### doubleAssign

```go
func doubleAssign(a *fe)
```

doubleAssign calculates the double of the given field element `a` and stores the result in `a`.

### ldouble

```go
func ldouble(c, a *fe)
```

ldouble calculates the double of the given field element `a` and stores the result in `c`. This function is used for lazy doubling.

### sub

```go
func sub(c, a, b *fe)
```

sub calculates the difference between the given field elements `a` and `b` and stores the result in `c`.

### subAssign

```go
func subAssign(a, b *fe)
```

subAssign calculates the difference between the given field elements `a` and `b` and stores the result in `a`.

### lsubAssign

```go
func lsubAssign(a, b *fe)
```

lsubAssign calculates the difference between the given field elements `a` and `b` and stores the result in `a`. This function is used for lazy subtraction.

### _neg

```go
func _neg(c, a *fe)
```

_neg calculates the negation of the given field element `a` and stores the result in `c`. This function is used internally.

### mulNoADX

```go
func mulNoADX(c, a, b *fe)
```

mulNoADX calculates the product of the given field elements `a` and `b` using a non-ADX backend and stores the result in `c`.

### mulADX

```go
func mulADX(c, a, b *fe)
```

mulADX calculates the product of the given field elements `a` and `b` using an ADX backend and stores the result in `c`.

## Variables

### mul

```go
var mul func(c, a, b *fe) = mulADX
```

mul is a variable that holds the function used for multiplication. By default, it is set to `mulADX`, which uses an ADX backend. If the ADX instruction set is not available on the current CPU, it is set to `mulNoADX`, which uses a non-ADX backend.