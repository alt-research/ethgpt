# BLS12381 Package Documentation

This package provides functions for arithmetic operations on the BLS12-381 finite field.

## Functions

### TestFpSerialization

```go
func TestFpSerialization(t *testing.T)
```

TestFpSerialization is a test function that tests the serialization and deserialization of field elements. It generates random field elements, serializes them to bytes, strings, and big integers, and then deserializes them back to field elements. It checks that the deserialized field elements are equal to the original ones.

### TestFpAdditionCrossAgainstBigInt

```go
func TestFpAdditionCrossAgainstBigInt(t *testing.T)
```

TestFpAdditionCrossAgainstBigInt is a test function that tests the addition, subtraction, negation, and doubling of field elements. It generates random field elements, performs the operations using the BLS12-381 arithmetic functions, and checks that the results are equal to the results obtained using big integers.

### TestFpAdditionCrossAgainstBigIntAssigned

```go
func TestFpAdditionCrossAgainstBigIntAssigned(t *testing.T)
```

TestFpAdditionCrossAgainstBigIntAssigned is a test function that tests the addition, subtraction, and doubling of field elements using the assignment versions of the BLS12-381 arithmetic functions. It generates random field elements, performs the operations using the BLS12-381 arithmetic functions, and checks that the results are equal to the results obtained using big integers.

### TestFpAdditionProperties

```go
func TestFpAdditionProperties(t *testing.T)
```

TestFpAdditionProperties is a test function that tests the properties of field element addition, subtraction, negation, and doubling. It generates random field elements and checks that the operations satisfy the expected properties.

## Variables

### fuz

```go
const fuz = 1 << 8
```

fuz is a constant variable that determines the number of iterations for the test functions.

### modulus

```go
var modulus = fe{
	0x1a0111ea397fe69a,
	0x4b1ba7b6434bacd7,
	0x64774b84f38512bf,
	0x4b1ba7b6434bacd6,
}
```

modulus is a variable that contains the modulus of the BLS12-381 finite field.

## Types

### fe

```go
type fe [4]uint64
```

fe is a type that represents a field element of the BLS12-381 finite field. It is represented as an array of four 64-bit unsigned integers. # Field Element (fe) Package Documentation

This package provides functions to perform arithmetic operations on field elements.

## Functions

### add

```go
func add(c, a, b *fe)
```

add sets `c` to the sum of `a` and `b`.

### sub

```go
func sub(c, a, b *fe)
```

sub sets `c` to the difference of `a` and `b`.

### double

```go
func double(c, a *fe)
```

double sets `c` to twice the value of `a`.

### neg

```go
func neg(c, a *fe)
```

neg sets `c` to the negation of `a`.

### addAssign

```go
func addAssign(a, b *fe)
```

addAssign adds `b` to `a`.

### subAssign

```go
func subAssign(a, b *fe)
```

subAssign subtracts `b` from `a`.

### doubleAssign

```go
func doubleAssign(a *fe)
```

doubleAssign doubles the value of `a`.

### ladd

```go
func ladd(c, a, b *fe)
```

ladd sets `c` to the sum of `a` and `b` using lazy addition.

### ldouble

```go
func ldouble(c, a *fe)
```

ldouble sets `c` to twice the value of `a` using lazy addition.

### laddAssign

```go
func laddAssign(a, b *fe)
```

laddAssign adds `b` to `a` using lazy addition.

### lsubAssign

```go
func lsubAssign(a, b *fe)
```

lsubAssign subtracts `b` from `a` using lazy addition.

### mul

```go
func mul(c, a, b *fe)
```

mul sets `c` to the product of `a` and `b`.

### square

```go
func square(c, a *fe)
```

square sets `c` to the square of `a`.

### inverse

```go
func inverse(c, a *fe)
```

inverse sets `c` to the inverse of `a`.

### exp

```go
func exp(c, a *fe, e *big.Int)
```

exp sets `c` to the exponentiation of `a` to the power of `e`.

### fromBytes

```go
func fromBytes(c *fe, in []byte)
```

fromBytes sets `c` to the field element represented by the input byte slice.

### toBytes

```go
func toBytes(c *fe) []byte
`` # Field Element Package Documentation

This package provides functions to perform arithmetic operations on field elements.

## Functions

### mul

```go
func mul(c, a, b *fe)
```

mul multiplies two field elements `a` and `b` and stores the result in `c`.

### square

```go
func square(c, a *fe)
```

square computes the square of a field element `a` and stores the result in `c`.

### exp

```go
func exp(c, a *fe, e *big.Int)
```

exp computes the exponentiation of a field element `a` to the power of a big integer `e` and stores the result in `c`.

### inverse

```go
func inverse(c, a *fe)
```

inverse computes the inverse of a field element `a` and stores the result in `c`.

### sqrt

```go
func sqrt(c, a *fe) bool
```

sqrt computes the square root of a field element `a` and stores the result in `c`. It returns `true` if the square root exists, and `false` otherwise.

### isQuadraticNonResidue

```go
func isQuadraticNonResidue(a *fe) bool
```

isQuadraticNonResidue checks if a field element `a` is a quadratic non-residue.

### newFp2

```go
func newFp2() *fp2
```

newFp2 creates a new instance of the fp2 field.

### fromBytes

```go
func (f *fp2) fromBytes(in []byte) (*fe2, error)
```

fromBytes deserializes a byte slice `in` into a field element `fe2`.

### toBytes

```go
func (f *fp2) toBytes(a *fe2) []byte
```

toBytes serializes a field element `a` into a byte slice.

### add

```go
func (f *fp2) add(c, a, b *fe2)
```

add adds two field elements `a` and `b` and stores the result in `c`.

### sub

```go
func (f *fp2) sub(c, a, b *fe2)
```

sub subtracts two field elements `a` and `b` and stores the result in `c`.

### double

```go
func (f *fp2) double(c, a *fe2)
```

double doubles a field element `a` and stores the result in `c`.

### neg

```go
func (f *fp2) neg(c, a *fe2)
```

neg computes the negation of a field element `a` and stores the result in `c`.

## Tests

The package also includes several test functions to ensure the correctness of the implemented functions. These test functions include:

- TestFpMultiplication
- TestFpExponentiation
- TestFpInversion
- TestFp # Fp2 Package Documentation

This package provides functions to perform arithmetic operations on elements of the field Fp2.

## Functions

### TestFp2AdditionProperties

```go
func TestFp2AdditionProperties(t *testing.T)
```

TestFp2AdditionProperties is a test function that tests the addition properties of the Fp2 field. It generates random elements `a` and `b` and tests the following properties:

- `0 - a == -a`
- `2 * a == a + a`
- `a + b = b + a`
- `a - b = - ( b - a )`
- `(a + b) + c == (a + c ) + b`
- `(a - b) - c == (a - c ) -b`

### TestFp2AdditionPropertiesAssigned

```go
func TestFp2AdditionPropertiesAssigned(t *testing.T)
```

TestFp2AdditionPropertiesAssigned is a test function that tests the addition properties of the Fp2 field with assigned values. It generates random elements `a` and `b` and tests the following properties:

- `a + 0 == a`
- `a - 0 == a`
- `2 * 0 == 0`
- `0 - a == -a`
- `2 * a == a + a`
- `a + b = b + a`
- `a - b = - ( b - a )`
- `(a + b) + c == (b + c) + a`
- `(a - b) - c == (a - c) -b`

### TestFp2LazyOperations

```go
func TestFp2LazyOperations(t *testing.T)
```

TestFp2LazyOperations is a test function that tests the lazy operations of the Fp2 field. It generates random elements `a`, `b`, and `c` and tests the following properties:

- `(a + b) * c == (a l+ b) * c`
- `2 l* a = a l+ a`

### TestFp2MultiplicationProperties

```go
func TestFp2MultiplicationProperties(t *testing.T)
```

TestFp2MultiplicationProperties is a test function that tests the multiplication properties of the Fp2 field. It generates random elements `a` and `b` and tests the following properties:

- `a * 0 == 0`
- `a * 1 == a`
- `a * b == b * a`
- `a * b * c == a * (b * c)`

## Variables

### fuz

```go
const fuz = 128
```

fuz is a constant variable that represents the number of iterations for the test functions.

### rand.Reader

```go
var # Fp2 Package Documentation

This package provides functions to perform arithmetic operations on elements of the field Fp2.

## Functions

### TestFp2Addition

```go
func TestFp2Addition(t *testing.T)
```

TestFp2Addition is a test function that tests the addition operation on elements of Fp2. It generates random elements of Fp2 and checks if the addition operation is commutative and associative.

### TestFp2Subtraction

```go
func TestFp2Subtraction(t *testing.T)
```

TestFp2Subtraction is a test function that tests the subtraction operation on elements of Fp2. It generates random elements of Fp2 and checks if the subtraction operation is the inverse of the addition operation.

### TestFp2Multiplication

```go
func TestFp2Multiplication(t *testing.T)
```

TestFp2Multiplication is a test function that tests the multiplication operation on elements of Fp2. It generates random elements of Fp2 and checks if the multiplication operation is commutative and associative.

### TestFp2MultiplicationPropertiesAssigned

```go
func TestFp2MultiplicationPropertiesAssigned(t *testing.T)
```

TestFp2MultiplicationPropertiesAssigned is a test function that tests the multiplication operation on elements of Fp2 with assigned properties. It generates random elements of Fp2 and checks if the multiplication operation satisfies the properties of the identity element, the zero element, and the commutative and associative properties.

### TestFp2Exponentiation

```go
func TestFp2Exponentiation(t *testing.T)
```

TestFp2Exponentiation is a test function that tests the exponentiation operation on elements of Fp2. It generates random elements of Fp2 and checks if the exponentiation operation satisfies the properties of the identity element and the power of 1.

### TestFp2Inversion

```go
func TestFp2Inversion(t *testing.T)
```

TestFp2Inversion is a test function that tests the inversion operation on elements of Fp2. It generates random elements of Fp2 and checks if the inversion operation satisfies the properties of the identity element and the inverse element.

### TestFp2SquareRoot

```go
func TestFp2SquareRoot(t *testing.T)
```

TestFp2SquareRoot is a test function that tests the square root operation on elements of Fp2. It generates random elements of Fp2 and checks if the square root operation satisfies the properties of the square root.

### TestFp2NonResidue

```go
func TestFp2NonResidue(t *testing.T)
```

TestFp2NonResidue is a test function that tests the non-residue operation on elements of Fp2. It generates random elements of Fp2 and checks if the non-residue operation satisfies the properties of the quadratic non-residue.

## Variables

### nonResidue2

```go
var nonResidue2 = &fe2{*new(fe).one(), *new(fe).one()}
```

nonResidue2 is a variable that contains the quadratic non-residue element of Fp2. # Fp6 Package Documentation

This package provides functions to perform arithmetic operations on elements of the Fp6 field.

## Functions

### TestFp6Sqrt

```go
func TestFp6Sqrt(t *testing.T)
```

TestFp6Sqrt is a test function that tests if the square root of a given element in the Fp6 field can be computed correctly. It generates a random element and checks if it is a quadratic non-residue. If it is not, it computes its square root and checks if it is correct.

### TestFp6Serialization

```go
func TestFp6Serialization(t *testing.T)
```

TestFp6Serialization is a test function that tests if the serialization and deserialization of elements in the Fp6 field can be performed correctly. It generates a random element, serializes it, deserializes it, and checks if the deserialized element is equal to the original element.

### TestFp6AdditionProperties

```go
func TestFp6AdditionProperties(t *testing.T)
```

TestFp6AdditionProperties is a test function that tests the addition properties of elements in the Fp6 field. It generates two random elements and checks if the following properties hold:

- a + 0 == a
- a - 0 == a
- 2 * 0 == 0
- -0 == 0
- 0 - a == -a
- 2 * a == a + a
- a + b = b + a
- a - b = - ( b - a )
- (a + b) + c == (a + c ) + b
- (a - b) - c == (a - c ) -b

### TestFp6AdditionPropertiesAssigned

```go
func TestFp6AdditionPropertiesAssigned(t *testing.T)
```

TestFp6AdditionPropertiesAssigned is a test function that tests the addition properties of elements in the Fp6 field using the assigned versions of the addition functions. It generates two random elements and checks if the following properties hold:

- a + 0 == a
- a - 0 == a
- 2 * 0 == 0
- 0 - a == -a
- 2 * a == a + a
- a + b = b + a
- a - b = - ( b - a )
- (a + b) + c == (b + c) + a
- (a - b) - c == (a - c) -b

### TestFp6SparseMultiplication

```go
func TestFp6SparseMultiplication(t *testing.T)
```

TestFp6SparseMultiplication is a test function that tests if the sparse multiplication of two elements in the Fp6 field can be performed correctly. It generates two random elements and sets the third coefficient of one of them to zero. It then multiplies the two elements and checks if the # Fp6 and Fp12 Package Documentation

This package provides functions to perform arithmetic operations on Fp6 and Fp12 fields.

## Fp6 Functions

### mul

```go
func (e *fp6) mul(c, a, b *fe6)
```

mul multiplies two Fp6 elements and stores the result in a third Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the result will be stored.
- `a`: the first Fp6 element to be multiplied.
- `b`: the second Fp6 element to be multiplied.

### mulBy01

```go
func (e *fp6) mulBy01(c, a *fe6, b0, b1 *fe2)
```

mulBy01 multiplies an Fp6 element by (b0 + b1*v) and stores the result in another Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the result will be stored.
- `a`: the Fp6 element to be multiplied.
- `b0`: the first coefficient of the Fp2 element to be multiplied.
- `b1`: the second coefficient of the Fp2 element to be multiplied.

### mulBy1

```go
func (e *fp6) mulBy1(c, a *fe6, b *fe2)
```

mulBy1 multiplies an Fp6 element by (0 + b*v + 0*v^2) and stores the result in another Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the result will be stored.
- `a`: the Fp6 element to be multiplied.
- `b`: the coefficient of the Fp2 element to be multiplied.

### exp

```go
func (e *fp6) exp(c, a *fe6, b *big.Int)
```

exp raises an Fp6 element to a given power and stores the result in another Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the result will be stored.
- `a`: the Fp6 element to be raised to a power.
- `b`: the power to raise the Fp6 element to.

### inverse

```go
func (e *fp6) inverse(c, a *fe6)
```

inverse calculates the inverse of an Fp6 element and stores the result in another Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the inverse will be stored.
- `a`: the Fp6 element to calculate the inverse of.

### square

```go
func (e *fp6) square(c, a *fe6)
```

square calculates the square of an Fp6 element and stores the result in another Fp6 element. It takes the following parameters:

- `c`: the Fp6 element where the square will be stored.
- `a`: the Fp6 element to calculate the square of.

### mulAssign

```go
func (e *fp6) mulAssign(a, # Fp12 Package Documentation

This package provides functions to perform arithmetic operations on Fp12 elements.

## Functions

### TestFp12AdditionProperties

```go
func TestFp12AdditionProperties(t *testing.T)
```

TestFp12AdditionProperties is a test function that tests the addition properties of Fp12 elements. It generates random Fp12 elements and tests the following properties:

- `a + 0 == a`
- `2 * 0 == 0`
- `-0 == 0`
- `0 - a == -a`
- `2 * a == a + a`
- `a + b = b + a`
- `a - b = - ( b - a )`
- `(a + b) + c == (a + c ) + b`
- `(a - b) - c == (a - c ) -b`

### TestFp12MultiplicationProperties

```go
func TestFp12MultiplicationProperties(t *testing.T)
```

TestFp12MultiplicationProperties is a test function that tests the multiplication properties of Fp12 elements. It generates random Fp12 elements and tests the following properties:

- `a * 0 == 0`
- `a * 1 == a`
- `a * b == b * a`
- `(a * b) * c == (a * c) * b`
- `0^2 == 0`
- `1^2 == 1`
- `a^2 == a*a`

### TestFp12MultiplicationPropertiesAssigned

```go
func TestFp12MultiplicationPropertiesAssigned(t *testing.T)
```

TestFp12MultiplicationPropertiesAssigned is a test function that tests the multiplication properties of Fp12 elements using the `mulAssign` function. It generates random Fp12 elements and tests the following properties:

- `a * 0 == 0`
- `a * 1 == a`
- `a * b == b * a`
- `(a * b) * c == (a * c) * b`

### TestFp12SparseMultiplication

```go
func TestFp12SparseMultiplication(t *testing.T)
```

TestFp12SparseMultiplication is a test function that tests the sparse multiplication of Fp12 elements. It generates random Fp12 elements and tests the multiplication of two elements with some coefficients set to zero.

### TestFp12Exponentiation

```go
func TestFp12Exponentiation(t *testing.T)
```

TestFp12Exponentiation is a test function that tests the exponentiation of Fp12 elements. It generates random Fp12 elements and tests the following properties:

- `a^0 == 1`
- ` # Fp12 Package Documentation

This package provides functions for arithmetic operations on Fp12 finite fields.

## Functions

### mul

```go
func mul(z, x, y *fe12)
```

mul multiplies two Fp12 elements and stores the result in z. It takes the following parameters:

- `z`: the Fp12 element where the result will be stored.
- `x`: the first Fp12 element to be multiplied.
- `y`: the second Fp12 element to be multiplied.

### inverse

```go
func inverse(z, x *fe12)
```

inverse calculates the inverse of an Fp12 element and stores the result in z. It takes the following parameters:

- `z`: the Fp12 element where the inverse will be stored.
- `x`: the Fp12 element to be inverted.

### TestFp12Multiplication

```go
func TestFp12Multiplication(t *testing.T)
```

TestFp12Multiplication is a test function that tests the mul function. It generates random Fp12 elements, multiplies them using the mul function, and checks if the result is correct.

### TestFp12Inversion

```go
func TestFp12Inversion(t *testing.T)
```

TestFp12Inversion is a test function that tests the inverse function. It generates random Fp12 elements, calculates their inverse using the inverse function, and checks if the result is correct.

### BenchmarkMultiplication

```go
func BenchmarkMultiplication(t *testing.B)
```

BenchmarkMultiplication is a benchmark function that benchmarks the mul function. It generates random Fp elements and measures the time it takes to multiply them using the mul function.

### BenchmarkInverse

```go
func BenchmarkInverse(t *testing.B)
```

BenchmarkInverse is a benchmark function that benchmarks the inverse function. It generates random Fp elements and measures the time it takes to calculate their inverse using the inverse function.

### padBytes

```go
func padBytes(in []byte, size int) []byte
```

padBytes pads a byte slice with zeros to a given size. It takes the following parameters:

- `in`: the byte slice to be padded.
- `size`: the size of the resulting padded byte slice.

## Variables

None.