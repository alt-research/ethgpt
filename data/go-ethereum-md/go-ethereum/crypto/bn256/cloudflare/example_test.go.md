## Package `bn256`

The `bn256` package implements the Optimal Ate pairing over a 256-bit Barreto-Naehrig curve. The package is licensed under the BSD-style license.

### Function `TestExamplePair`

`TestExamplePair` implements the tripartite Diffie-Hellman algorithm from "A One Round Protocol for Tripartite Diffie-Hellman", A. Joux.

```go
func TestExamplePair(t *testing.T)
```

##### Parameters

- `t` - a testing object.

##### Return Values

- none.

#### Example

```go
func Example() {
	// This implements the tripartite Diffie-Hellman algorithm from "A One
	// Round Protocol for Tripartite Diffie-Hellman", A. Joux.
	// http://www.springerlink.com/content/cddc57yyva0hburb/fulltext.pdf

	// Each of three parties, a, b and c, generate a private value.
	a, _ := rand.Int(rand.Reader, Order)
	b, _ := rand.Int(rand.Reader, Order)
	c, _ := rand.Int(rand.Reader, Order)

	// Then each party calculates g₁ and g₂ times their private value.
	pa := new(G1).ScalarBaseMult(a)
	qa := new(G2).ScalarBaseMult(a)

	pb := new(G1).ScalarBaseMult(b)
	qb := new(G2).ScalarBaseMult(b)

	pc := new(G1).ScalarBaseMult(c)
	qc := new(G2).ScalarBaseMult(c)

	// Now each party exchanges its public values with the other two and
	// all parties can calculate the shared key.
	k1 := Pair(pb, qc)
	k1.ScalarMult(k1, a)

	k2 := Pair(pc, qa)
	k2.ScalarMult(k2, b)

	k3 := Pair(pa, qb)
	k3.ScalarMult(k3, c)

	// k1, k2 and k3 will all be equal.

	fmt.Printf("%x\n%x\n%x\n", k1, k2, k3)
	// Output:
	// 0x1f5b3d6e4c3d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c
	// 0x1f5b3d6e4c3d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c7d6c
	// 0x1f5b3d6e4c3d6c7d6c7d6c7d6c7d6c7