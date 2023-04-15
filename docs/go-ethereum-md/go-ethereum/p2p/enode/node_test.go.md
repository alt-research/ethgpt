## Documentation for enode package

This package provides the implementation of Ethereum Node Records (ENR) as specified in [EIP-778](https://eips.ethereum.org/EIPS/eip-778).

### Variables

#### pyRecord

```go
var pyRecord, _ = hex.DecodeString("f884b8407098ad865b00a582051940cb9cf36836572411a47278783077011599ed5cd16b76f2635f4e234738f30813a89eb9137e3e3df5266e3a1f11df72ecf1145ccb9c01826964827634826970847f00000189736563703235366b31a103ca634cae0d49acb401d8a4c6b6fe8c55b70d115bf400769cc1400f3258cd31388375647082765f")
```

`pyRecord` is a byte slice containing a record produced by the Python implementation. This variable is used in the `TestPythonInterop` function.

### Functions

#### TestPythonInterop

```go
func TestPythonInterop(t *testing.T)
```

`TestPythonInterop` checks that we can decode and verify a record produced by the Python implementation. It decodes the `pyRecord` variable and verifies the record using the `New` function. It then checks that the decoded record matches the expected values.

#### TestHexID

```go
func TestHexID(t *testing.T)
```

`TestHexID` tests the `HexID` function. It creates two `ID` variables using different hex strings and checks that they both match the expected `ID`.

#### TestID_textEncoding

```go
func TestID_textEncoding(t *testing.T)
```

`TestID_textEncoding` tests the `MarshalText` and `UnmarshalText` functions of the `ID` type. It encodes an `ID` variable to text and then decodes it back to an `ID` variable. It then checks that the decoded `ID` variable matches the expected `ID`.

#### TestID_distcmp

```go
func TestID_distcmp(t *testing.T)
```

`TestID_distcmp` tests the `distcmp` function of the `ID` type. It creates three `ID` variables and checks that the distance comparison between the first and second `ID` variables is less than the distance comparison between the first and third `ID` variables.

### Types

#### ID

```go
type ID [32]byte
```

`ID` is a 32-byte array representing the ID of an ENR. It provides functions for encoding and decoding the ID to and from text.

#### Node

```go
type Node struct {
    seq uint64
    id  ID
    enr *enr.Record
}
```

`Node` represents an ENR node. It contains the sequence number, ID, and ENR record of the node. It provides functions for loading and saving ENR entries.

### Conclusion

This package provides the implementation of Ethereum Node Records (ENR) as specified in [EIP-778](https://eips.ethereum.org/EIPS/eip-778). It contains functions for decoding and verifying ENR records, encoding and decoding ENR IDs to and from text, and loading and saving ENR entries. The codebase contains four test functions: `TestID_distcmp`, `TestID_distcmpEqual`, `TestID_logdist`, and `TestID_logdistEqual`. Each test function tests a different aspect of the `ID` struct.

## TestID_distcmp

This test function tests the `DistCmp` method of the `ID` struct. It generates two random `ID` values and compares the result of `DistCmp` with the result of a big integer XOR operation. It uses the `quick.CheckEqual` function to perform the comparison and reports any errors.

```go
func TestID_distcmp(t *testing.T) {
    distcmpBig := func(a, b ID) int {
        abig, bbig := new(big.Int).SetBytes(a[:]), new(big.Int).SetBytes(b[:])
        tbig := new(big.Int).Xor(abig, bbig)
        return distCmp(tbig)
    }
    if err := quick.CheckEqual(DistCmp, distcmpBig, nil); err != nil {
        t.Error(err)
    }
}
```

## TestID_distcmpEqual

This test function tests the `DistCmp` method of the `ID` struct when the two `ID` values are equal. It creates two `ID` values with the same bytes and checks that `DistCmp` returns 0.

```go
func TestID_distcmpEqual(t *testing.T) {
    base := ID{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}
    x := ID{15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0}
    if DistCmp(base, x, x) != 0 {
        t.Errorf("DistCmp(base, x, x) != 0")
    }
}
```

## TestID_logdist

This test function tests the `LogDist` method of the `ID` struct. It generates two random `ID` values and compares the result of `LogDist` with the result of a