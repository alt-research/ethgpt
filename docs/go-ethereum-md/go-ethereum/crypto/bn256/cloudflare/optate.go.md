## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `lineFunctionAdd`

`lineFunctionAdd` implements the mixed addition algorithm from "Faster Computation of the Tate Pairing", http://arxiv.org/pdf/0904.0854v3.pdf. It sets `a`, `b`, and `c` to the coefficients of the line passing through `r` and `q` and then returns `a`, `b`, `c`, and `rOut`.

```go
func lineFunctionAdd(r, p *twistPoint, q *curvePoint, r2 *gfP2) (a, b, c *gfP2, rOut *twistPoint)
```

##### Parameters

- `r` - a point on the curve.
- `p` - a point on the curve.
- `q` - a point on the curve.
- `r2` - the square of the `y`-coordinate of `r`.

##### Return Values

- `*gfP2` - the coefficient `a` of the line.
- `*gfP2` - the coefficient `b` of the line.
- `*gfP2` - the coefficient `c` of the line.
- `*twistPoint` - the result of the addition.

### Function `lineFunctionDouble`

`lineFunctionDouble` implements the doubling algorithm for `a=0` from "Faster Computation of the Tate Pairing", http://arxiv.org/pdf/0904.0854v3.pdf. It sets `a`, `b`, and `c` to the coefficients of the line passing through `r` and `q` and then returns `a`, `b`, `c`, and `rOut`.

```go
func lineFunctionDouble(r *twistPoint, q *curvePoint) (a, b, c *gfP2, rOut *twistPoint)
```

##### Parameters

- `r` - a point on the curve.
- `q` - a point on the curve.

##### Return Values

- `*gfP2` - the coefficient `a` of the line.
- `*gfP2` - the coefficient `b` of the line.
- `*gfP2` - the coefficient `c` of the line.
- `*twistPoint` - the result of the doubling.

### Function `mulLine`

`mulLine` multiplies the line defined by `a`, `b`, and `c` by the line defined by `ret.x` and `ret.y` and then updates `ret`.

```go
func mulLine(ret *gfP12, a, b, c *gfP2)
```

##### Parameters

- `ret` - a pointer to a `gfP12` element.
- `a` - the coefficient `a` of the line.
- `b` - the coefficient `b` of the line.
- `c` - the coefficient `c` of the line.

##### Return Values

None.

### Variable `sixuPlus2NAF`

`sixuPlus2NAF` is a slice of `int8` values representing `6u+2` in non-adjacent form.

```go
var sixuPlus2NAF = []int8{0, 0, 0, 1, 0, 1, 0, -1, 0, 0, 1, -1, 0, 0, 1, 0,
	0, 1, 1, 0, -1, 0, 0, 1 ## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `miller`

`miller` computes the Optimal Ate pairing of `a` and `b`.

```go
func miller(a *twistPoint, b *curvePoint) *gfP12
```

##### Parameters

- `a` - a point on the twist curve.
- `b` - a point on the curve.

##### Return Values

- `*gfP12` - the Optimal Ate pairing of `a` and `b`.

### Function `finalExponentiation`

`finalExponentiation` computes the (p¹²-1)/Order-th power of an element of GF(p¹²) to obtain an element of GT.

```go
func finalExponentiation(in *gfP12) *gfP12
```

##### Parameters

- `in` - an element of GF(p¹²).

##### Return Values

- `*gfP12` - the (p¹²-1)/Order-th power of `in`.

### Function `optimalAte`

`optimalAte` computes the Optimal Ate pairing of `a` and `b` using `miller` and `finalExponentiation`.

```go
func optimalAte(a *twistPoint, b *curvePoint) *gfP12
```

##### Parameters

- `a` - a point on the twist curve.
- `b` - a point on the curve.

##### Return Values

- `*gfP12` - the Optimal Ate pairing of `a` and `b`.