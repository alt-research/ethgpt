# Documentation for RLP package

The RLP package is a Go implementation of the Recursive Length Prefix (RLP) encoding algorithm. It provides functions for encoding and decoding data using the RLP algorithm.

## TestStreamKind

The `TestStreamKind` function tests the `Kind` method of the `Stream` type. It takes a list of test cases, each containing an input string, the expected `Kind`, and the expected length. It creates a new `Stream` instance using the input string and checks that the `Kind` and length match the expected values.

## TestNewListStream

The `TestNewListStream` function tests the `NewListStream` function. It creates a new `ListStream` instance using a byte reader and a list size of 3. It then checks that the `Kind` and list size match the expected values, and that the `Uint` method returns the expected values.

## TestStreamErrors

The `TestStreamErrors` function tests error handling in the `Stream` type. It takes a list of test cases, each containing an input string, a list of method calls, a function for creating a new `Stream` instance, and the expected error. It creates a new `Stream` instance using the input string and calls the specified methods, checking that the errors match the expected values.

## Stream

The `Stream` type provides an interface for encoding and decoding data using the RLP algorithm. It has several methods for reading and writing data, including `Kind`, `Uint`, `Bytes`, `String`, `List`, and `ListEnd`.

## ListStream

The `ListStream` type is a specialized `Stream` type for encoding and decoding lists of data. It has a `List` method for reading the list size, and a `ListEnd` method for indicating the end of the list.

## NewStream

The `NewStream` function creates a new `Stream` instance using a reader and an input limit. The input limit is used to prevent reading too much data from the reader.

## NewListStream

The `NewListStream` function creates a new `ListStream` instance using a reader and a list size. The list size is used to limit the number of elements in the list.

## Encode

The `Encode` function encodes a value using the RLP algorithm. It takes a value of any type and returns the encoded data as a byte slice.

## Decode

The `Decode` function decodes data using the RLP algorithm. It takes a byte slice and a pointer to a value of any type, and sets the value to the decoded data.

## DecodeBytes

The `DecodeBytes` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a byte slice.

## DecodeString

The `DecodeString` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a string.

## DecodeInt

The `DecodeInt` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a `big.Int`.

## DecodeUint64

The `DecodeUint64` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a `uint64`.

## DecodeBigInt

The `DecodeBigInt` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a `math.BigInt`.

## DecodeUint256

The `DecodeUint256` function decodes data using the RLP algorithm. It takes a byte slice and returns the decoded data as a `uint256.Int`.

## EncodeToBytes

The `EncodeToBytes` function encodes a value using the RLP algorithm and writes the encoded data to a byte buffer. It takes a value of any type and a byte buffer, and returns the number of bytes written.

## EncodeToStream

The `EncodeToStream` function encodes a value using the RLP algorithm and writes the encoded data to a `Stream` instance. It takes a value of any type and a `Stream` instance.

## EncodeSize

The `EncodeSize` function returns the size of the encoded data for a value of any type.

## DecodeSize

The `DecodeSize` function returns the size of the decoded data for a byte slice.

## ErrExpectedString

The `ErrExpectedString` error is returned when a string is expected but not found.

## ErrExpectedList

The `ErrExpectedList` error is returned when a list is expected but not found.

## ErrElemTooLarge

The `ErrElemTooLarge` error is returned when an element in a list is too large.

## ErrCanonInt

The `ErrCanonInt` error is returned when a non-canonical integer is found.

## errUintOverflow

The `errUintOverflow` error is returned when a `uint64` overflows.

## EOL

The `EOL` error is returned when the end of a list is reached.

## unhex

The `unhex` function converts a hex string to a byte slice. # RLP Package

The RLP package provides an implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm in Go. RLP is a serialization format used in Ethereum to encode arbitrary data structures.

## Functions

### TestDecoder

The `TestDecoder` function is a test function that verifies the correctness of the RLP decoding algorithm. It takes a slice of test cases, each of which consists of an RLP-encoded string, a list of method calls to make on the decoded object, an optional input limit, and an expected error. The function decodes the RLP-encoded string, makes the specified method calls on the decoded object, and checks that the output matches the expected error. If the output does not match the expected error, the function returns an error.

### unhex

The `unhex` function takes a hex-encoded string and returns the corresponding byte slice.

### withCustomInputLimit

The `withCustomInputLimit` function takes an input limit and returns a function that sets the input limit for a `Stream` object.

### withoutInputLimit

The `withoutInputLimit` function returns a function that sets the input limit for a `Stream` object to infinity.

## Test Cases

The `TestDecoder` function takes a slice of test cases, each of which consists of an RLP-encoded string, a list of method calls to make on the decoded object, an optional input limit, and an expected error. The following is a description of each test case:

- Valid cases:
  - `"80"`: empty string
  - `"00"`: zero
  - `"01"`: one
  - `"7F"`: 127
  - `"8180"`: empty list
  - `"8181"`: list with one empty string
  - `"820102"`: list with two elements, one and two
  - `"83010203"`: list with three elements, one, two, and three
  - `"B80102030405"`: list with five elements, one, two, three, four, and five
  - `"F90102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F202122232425262728292A2B2C2D2E2F303132333435363738393A3B3C3D3E3F404142434445464748494A4B4C4D4E4F505152535455565758595A5B5C5D5E5F606162636465666768696A6B6C6D6E6F707172737475767778797A7B7C7D7E7F808182838485868788898A8B8C8D8E8F909192939495969798999A9B9C9D9E9FA0A1A2A3A4A5A6A7A8A9AAABACADAEAFB0B1B2B3B4B5B6B7B8B9BABBBCBDBEBFC0C1C2C3C4C5C6C7C8C9CACBCCCDCECFD0D1D2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7E8E9EAEBECEDEEEFF0F1F2F3F4F5F6F7F8F9FAFBFCFDFEFF"`: maximum length string
  - `"8100"`: empty string with invalid size tag
  - `"817F"`: 127 with invalid size tag
  - `"8180"`: empty list with valid size tag
- Invalid cases:
  - `"02"`: non-valid boolean
  - `"8100"`: empty string with invalid size tag
  - `"8101"`: string with leading zero byte in size tag
  - `"817F"`: 127 with invalid size tag
  - `"8180"`: empty list with valid size tag
  - `"B800"`: empty byte string with invalid size tag
  - `"B90000"`: byte string with leading zero byte in size tag
  - `"B90055"`: byte string with leading zero byte in size tag
  - `"BA0002FFFF"`: byte string with leading zero byte in size tag
  - `"F800"`: empty list with invalid size tag
  - `"F90000"`: list with leading zero byte in size tag
  - `"F90055"`: list with leading zero byte in size tag
  - `"FA0002FFFF"`: list with leading zero byte in size tag
  - `""`: expected EOF
  - `"8180"`: expected EOF
  - `"C0"`: expected EOF
  - `""`: expected EOF with input limit
  - `"8180"`: expected EOF with input limit
  - `"C0"`: expected EOF with input limit
  - `"81"`: input limit exceeded for bytes
  - `"81"`: input limit exceeded for uint
  - `"81"`: input limit exceeded for raw
  - `"BFFFFFFFFFFFFFFFFFFF"`: input limit exceeded for bytes
  - `"C801"`: input limit exceeded for list
  - `"CD04040404FFFFFFFFFFFFFFFFFF0303"`: element size check overflow for list
  - `"C40102030401"`: input limit overflow for raw and uint
  - `"C4010203048180"`: input limit overflow for raw and uint
  - `"81"`: unexpected EOF for bytes
  - `"81"`: unexpected EOF for uint
  - `"BFFFFFFFFFFFFFFF"`: unexpected EOF for bytes
  - `"C801"`: unexpected EOF for list
  - `"C3808080"`: input position advanced correctly for empty strings

## Conclusion

The RLP package provides a reliable implementation of the RLP encoding and decoding algorithm in Go. The `TestDecoder` function verifies the correctness of the implementation with a comprehensive set of test cases. The package is a useful tool for encoding and decoding arbitrary data structures in Ethereum. ## Documentation for RLP Package

The RLP package is a Go implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. The package provides functions for encoding and decoding RLP data, as well as a `Stream` type for reading and writing RLP data.

### `func Encode(x interface{}) ([]byte, error)`

The `Encode` function encodes the given Go value into RLP format and returns the resulting byte slice. The function returns an error if the value cannot be encoded.

### `func Decode(r io.Reader, v interface{}) error`

The `Decode` function decodes RLP data from the given `io.Reader` into the given Go value. The function returns an error if the value cannot be decoded.

### `type Stream struct`

The `Stream` type provides a way to read and write RLP data. The type has several methods for reading and writing RLP data, including `List`, `ListEnd`, `Uint`, `Raw`, and `ReadBytes`.

### `func NewStream(r io.Reader, size int) *Stream`

The `NewStream` function creates a new `Stream` instance that reads from the given `io.Reader` and has the given size.

### `func (s *Stream) List() (int, error)`

The `List` method starts a new RLP list and returns the number of items in the list. The method returns an error if the list cannot be started.

### `func (s *Stream) ListEnd() error`

The `ListEnd` method ends the current RLP list. The method returns an error if the list cannot be ended.

### `func (s *Stream) Uint() (uint64, error)`

The `Uint` method reads a uint64 value from the RLP stream. The method returns an error if the value cannot be read.

### `func (s *Stream) Raw() ([]byte, error)`

The `Raw` method reads a raw byte slice from the RLP stream. The method returns an error if the slice cannot be read.

### `func (s *Stream) ReadBytes(b []byte) error`

The `ReadBytes` method reads a byte slice of the given size from the RLP stream. The method returns an error if the slice cannot be read.

### `func unhex(s string) []byte`

The `unhex` function converts a hex string to a byte slice.

### `func TestStreamList(t *testing.T)`

The `TestStreamList` function tests the `List` method of the `Stream` type.

### `func TestStreamRaw(t *testing.T)`

The `TestStreamRaw` function tests the `Raw` method of the `Stream` type.

### `func TestStreamReadBytes(t *testing.T)`

The `TestStreamReadBytes` function tests the `ReadBytes` method of the `Stream` type.

### `func TestDecodeErrors(t *testing.T)`

The `TestDecodeErrors` function tests the `Decode` function for various error cases.

### `func TestEncodeDecode(t *testing.T)`

The `TestEncodeDecode` function tests the `Encode` and `Decode` functions for various input values. # RLP Decoder

The RLP Decoder is a Go package that provides a decoder for Recursive Length Prefix (RLP) encoded data. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

## Functions

### Decode

```go
func Decode(input io.Reader, ptr interface{}) error
```

The `Decode` function decodes RLP-encoded data from an `io.Reader` into a Go value pointed to by `ptr`. The `ptr` argument must be a pointer to a value of a supported type. The supported types are `bool`, `uint`, `[]uint`, `[n]uint`, `*big.Int`, `[]byte`, `string`, and structs that contain only supported types.

### DecodeBytes

```go
func DecodeBytes(input []byte, ptr interface{}) error
```

The `DecodeBytes` function decodes RLP-encoded data from a byte slice into a Go value pointed to by `ptr`. The `ptr` argument must be a pointer to a value of a supported type. The supported types are `bool`, `uint`, `[]uint`, `[n]uint`, `*big.Int`, `[]byte`, `string`, and structs that contain only supported types.

## Types

### decodeTest

```go
type decodeTest struct {
	input string
	ptr   interface{}
	value interface{}
	error string
}
```

The `decodeTest` type is used to define test cases for the `Decode` function. Each test case consists of an RLP-encoded input string, a pointer to a Go value of a supported type, an expected decoded value, and an expected error message.

### simplestruct

```go
type simplestruct struct {
	A uint
	B string
}
```

The `simplestruct` type is a struct used in test cases for the `Decode` function. It contains two fields of supported types.

### recstruct

```go
type recstruct struct {
	I     uint
	Child *recstruct `rlp:"nil"`
}
```

The `recstruct` type is a recursive struct used in test cases for the `Decode` function. It contains a `uint` field and a pointer to another `recstruct`.

### bigIntStruct

```go
type bigIntStruct struct {
	I *big.Int
	B string
}
```

The `bigIntStruct` type is a struct used in test cases for the `Decode` function. It contains a pointer to a `big.Int` and a string field.

### invalidNilTag

```go
type invalidNilTag struct {
	X []byte `rlp:"nil"`
}
```

The `invalidNilTag` type is a struct used in test cases for the `Decode` function. It contains a byte slice field with an invalid `rlp` tag.

### invalidTail1

```go
type invalidTail1 struct {
	A uint `rlp:"tail"`
	B string
}
```

The `invalidTail1` type is a struct used in test cases for the `Decode` function. It contains a `uint` field with a `tail` tag and a string field.

### invalidTail2

```go
type invalidTail2 struct {
	A uint
	B string `rlp:"tail"`
}
```

The `invalidTail2` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a string field with a `tail` tag.

### tailRaw

```go
type tailRaw struct {
	A    uint
	Tail []RawValue `rlp:"tail"`
}
```

The `tailRaw` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a slice of `RawValue` with a `tail` tag.

### tailUint

```go
type tailUint struct {
	A    uint
	Tail []uint `rlp:"tail"`
}
```

The `tailUint` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a slice of `uint` with a `tail` tag.

### tailPrivateFields

```go
type tailPrivateFields struct {
	A    uint
	Tail []uint `rlp:"tail"`
	x, y bool   //lint:ignore U1000 unused fields required for testing purposes.
}
```

The `tailPrivateFields` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a slice of `uint` with a `tail` tag, as well as two unused private fields.

### nilListUint

```go
type nilListUint struct {
	X *uint `rlp:"nilList"`
}
```

The `nilListUint` type is a struct used in test cases for the `Decode` function. It contains a pointer to a `uint` field with a `nilList` tag.

### nilStringSlice

```go
type nilStringSlice struct {
	X *[]uint `rlp:"nilString"`
}
```

The `nilStringSlice` type is a struct used in test cases for the `Decode` function. It contains a pointer to a slice of `uint` with a `nilString` tag.

### intField

```go
type intField struct {
	X int
}
```

The `intField` type is a struct used in test cases for the `Decode` function. It contains an `int` field.

### optionalFields

```go
type optionalFields struct {
	A uint
	B uint `rlp:"optional"`
	C uint `rlp:"optional"`
}
```

The `optionalFields` type is a struct used in test cases for the `Decode` function. It contains three `uint` fields, two of which have an `optional` tag.

### optionalAndTailField

```go
type optionalAndTailField struct {
	A    uint
	B    uint   `rlp:"optional"`
	Tail []uint `rlp:"tail"`
}
```

The `optionalAndTailField` type is a struct used in test cases for the `Decode` function. It contains a `uint` field, a `uint` field with an `optional` tag, and a slice of `uint` with a `tail` tag.

### optionalBigIntField

```go
type optionalBigIntField struct {
	A uint
	B *big.Int `rlp:"optional"`
}
```

The `optionalBigIntField` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a pointer to a `big.Int` field with an `optional` tag.

### optionalPtrField

```go
type optionalPtrField struct {
	A uint
	B *[3]byte `rlp:"optional"`
}
```

The `optionalPtrField` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a pointer to a fixed-size byte array with an `optional` tag.

### nonOptionalPtrField

```go
type nonOptionalPtrField struct {
	A uint
	B *[3]byte
}
```

The `nonOptionalPtrField` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a pointer to a fixed-size byte array.

### multipleOptionalFields

```go
type multipleOptionalFields struct {
	A *[3]byte `rlp:"optional"`
	B *[3]byte `rlp:"optional"`
}
```

The `multipleOptionalFields` type is a struct used in test cases for the `Decode` function. It contains two pointers to fixed-size byte arrays with an `optional` tag.

### optionalPtrFieldNil

```go
type optionalPtrFieldNil struct {
	A uint
	B *[3]byte `rlp:"optional,nil"`
}
```

The `optionalPtrFieldNil` type is a struct used in test cases for the `Decode` function. It contains a `uint` field and a pointer to a fixed-size byte array with an `optional` and `nil` tag.

### ignoredField

```go
type ignoredField struct {
	A uint
	B uint `rlp:"-"`
	C uint
}
```

The `ignoredField` type is a struct used in test cases for the `Decode` function. It contains three `uint` fields, one of which is ignored with a `-` tag.

## Variables

### veryBigInt

```go
var veryBigInt = new(big.Int).Add(
	new(big.Int).Lsh(big.NewInt(0xFFFFFFFFFFFFFF), 16),
	big.NewInt(0xFFFF),
)
```

The `veryBigInt` variable is a `*big.Int` used in test cases for the `Decode` function. It is a very large integer value.

### veryVeryBigInt

```go
var veryVeryBigInt = new(big.Int).Exp(veryBigInt, big.NewInt(8), nil)
```

The `veryVeryBigInt` variable is a `*big.Int` used in test cases for the `Decode` function. It is a very large integer value raised to the power of 8.

### veryBigInt256

```go
var veryBigInt256, _ = uint256.FromBig(veryBigInt)
```

The `veryBigInt256` variable is a `uint256.Uint256` used in test cases for the `Decode` function. It is a `uint256` value converted from `veryBigInt`.

### decodeTests

```go
var decodeTests = []decodeTest{...}
```

The `decodeTests` variable is a slice of `decodeTest` used in test cases for the `Decode` function. It contains various test cases for decoding RLP-encoded data into supported types. # RLP Package Documentation

The RLP package provides an implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm in Go. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

## Functions

### Encode

```go
func Encode(x interface{}) []byte
```

Encode encodes the given object using RLP encoding and returns the resulting byte slice.

### Decode

```go
func Decode(input []byte, ptr interface{}) error
```

Decode decodes the given RLP-encoded byte slice into the given pointer to a Go object. The object must be a pointer to a struct, slice, or array. The function returns an error if the decoding fails.

## Supported Types

The RLP package supports the following Go types:

- `bool`
- `int`, `int8`, `int16`, `int32`, `int64`
- `uint`, `uint8`, `uint16`, `uint32`, `uint64`
- `float32`, `float64`
- `string`
- `[]byte`
- `[]T` (slice of any supported type `T`)
- `[N]T` (array of any supported type `T` and fixed length `N`)
- `*big.Int`
- `*uint256.Int`

## Examples

### Encoding

```go
import (
    "fmt"
    "github.com/ethereum/go-ethereum/rlp"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    person := Person{Name: "Alice", Age: 30}
    encoded := rlp.Encode(person)
    fmt.Printf("%x\n", encoded) // Output: c883416c6963651e
}
```

### Decoding

```go
import (
    "fmt"
    "github.com/ethereum/go-ethereum/rlp"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    encoded := []byte{0xc8, 0x83, 0x41, 0x6c, 0x69, 0x63, 0x65, 0x1e}
    var person Person
    err := rlp.Decode(encoded, &person)
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", person) // Output: {Name:Alice Age:30}
}
```

### Supported Types

```go
import (
    "fmt"
    "github.com/ethereum/go-ethereum/rlp"
    "math/big"
    "github.com/ethereum/go-ethereum/common/math/uint256"
)

func main() {
    // bool
    encoded := rlp.Encode(true)
    var b bool
    err := rlp.Decode(encoded, &b)
    if err != nil {
        panic(err)
    }
    fmt.Println(b) // Output: true

    // int
    encoded = rlp.Encode(42)
    var i int
    err = rlp.Decode(encoded, &i)
    if err != nil {
        panic(err)
    }
    fmt.Println(i) // Output: 42

    // string
    encoded = rlp.Encode("hello")
    var s string
    err = rlp.Decode(encoded, &s)
    if err != nil {
        panic(err)
    }
    fmt.Println(s) // Output: hello

    // slice
    encoded = rlp.Encode([]int{1, 2, 3})
    var slice []int
    err = rlp.Decode(encoded, &slice)
    if err != nil {
        panic(err)
    }
    fmt.Println(slice) // Output: [1 2 3]

    // array
    encoded = rlp.Encode([3]int{1, 2, 3})
    var array [3]int
    err = rlp.Decode(encoded, &array)
    if err != nil {
        panic(err)
    }
    fmt.Println(array) // Output: [1 2 3]

    // big.Int
    encoded = rlp.Encode(big.NewInt(42))
    var bi big.Int
    err = rlp.Decode(encoded, &bi)
    if err != nil {
        panic(err)
    }
    fmt.Println(bi) // Output: 42

    // uint256.Int
    encoded = rlp.Encode(uint256.NewInt(42))
    var ui uint256.Int
    err = rlp.Decode(encoded, &ui)
    if err != nil {
        panic(err)
    }
    fmt.Println(ui) // Output: 42
}
``` The code provided is a test suite for the RLP (Recursive Length Prefix) encoding and decoding library for Go. RLP is a serialization format used in Ethereum to encode data structures for storage on the blockchain.

The test suite includes tests for encoding and decoding of various data types, including integers, byte slices, and structs. The tests cover both valid and invalid inputs, and ensure that the library handles errors correctly.

The `Int` function encodes an integer as an RLP byte slice. The `Encode` function encodes an arbitrary Go value as an RLP byte slice. The `Decode` function decodes an RLP byte slice into an arbitrary Go value.

The `unhex` function converts a hex string to a byte slice.

The `uint256.Int` type is a custom implementation of a 256-bit unsigned integer. The test cases for this type ensure that the library handles non-canonical integers and non-canonical size information correctly.

The `simplestruct` type is a simple struct with an integer and a string field. The test cases for this type ensure that the library handles struct encoding and decoding correctly.

The `recstruct` type is a recursive struct with an integer field and a pointer to another `recstruct`. The test cases for this type ensure that the library handles recursive structs correctly.

The `bigIntStruct` type is a struct with a `big.Int` field and a string field. The test case for this type ensures that the library handles empty `big.Int` fields correctly.

The test cases for struct errors ensure that the library handles invalid struct inputs correctly. These include cases where there are too few or too many elements, where the input is not a list, and where the type is not RLP-serializable.

The test cases for struct tags ensure that the library handles struct tags correctly. These include cases where the tag is "tail", "-", or "nilList"/"nilString".

Overall, the test suite provides comprehensive coverage of the RLP library and ensures that it handles various inputs and errors correctly. # RLP Package Documentation

The RLP package provides a Go implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

## Functions

### optionalFields

The `optionalFields` function defines a struct with three optional fields. It takes an input string and a pointer to a new `optionalFields` instance. If the input string has too many elements, it returns an error. If the input string is too short, it sets the optional fields to zero. If the input string is valid, it sets the optional fields to the corresponding values in the input string.

### optionalAndTailField

The `optionalAndTailField` function defines a struct with an optional field and a tail field. It takes an input string and a pointer to a new `optionalAndTailField` instance. If the input string is too short, it sets the optional field to zero and the tail field to an empty slice. If the input string is valid, it sets the optional field to the corresponding value in the input string and the tail field to the remaining elements.

### optionalBigIntField

The `optionalBigIntField` function defines a struct with an optional big integer field. It takes an input string and a pointer to a new `optionalBigIntField` instance. If the input string is too short, it sets the optional field to nil. If the input string is valid, it sets the optional field to the corresponding big integer value in the input string.

### optionalPtrField

The `optionalPtrField` function defines a struct with an optional pointer field. It takes an input string and a pointer to a new `optionalPtrField` instance. If the input string is too short, it returns an error. If the input string is valid, it sets the optional field to the corresponding value in the input string.

### multipleOptionalFields

The `multipleOptionalFields` function defines a struct with multiple optional fields. It takes an input string and a pointer to a new `multipleOptionalFields` instance. If the input string is too short, it sets the optional fields to nil. If the input string is valid, it sets the optional fields to the corresponding values in the input string.

### nonOptionalPtrField

The `nonOptionalPtrField` function defines a struct with a non-optional pointer field. It takes an input string and a pointer to a new `nonOptionalPtrField` instance. If the input string is too short, it returns an error. If the input string is valid, it sets the pointer field to the corresponding value in the input string.

### optionalPtrFieldNil

The `optionalPtrFieldNil` function defines a struct with an optional pointer field that allows nil values. It takes an input string and a pointer to a new `optionalPtrFieldNil` instance. If the input string is too short, it returns an error. If the input string is valid, it sets the optional field to the corresponding value in the input string.

### RawValue

The `RawValue` function defines a type that represents a raw RLP value. It takes an input string and returns a `RawValue` instance with the corresponding byte slice.

## Example Usage

```go
package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/rlp"
	"math/big"
)

type optionalFields struct {
	A uint8 `rlp:"optional"`
	B uint8 `rlp:"optional"`
	C uint8 `rlp:"optional"`
}

type optionalAndTailField struct {
	A    uint8   `rlp:"optional"`
	B    uint8   `rlp:"optional"`
	Tail []uint `rlp:"tail"`
}

type optionalBigIntField struct {
	A uint8      `rlp:"optional"`
	B *big.Int `rlp:"optional"`
}

type optionalPtrField struct {
	A uint8       `rlp:"optional"`
	B *[3]byte `rlp:"optional"`
}

type multipleOptionalFields struct {
	A *[3]byte `rlp:"optional"`
	B *[3]byte `rlp:"optional"`
}

type nonOptionalPtrField struct {
	A uint8
	B *[3]byte
}

type optionalPtrFieldNil struct {
	A uint8
	B *[3]byte `rlp:"nil"`
}

func main() {
	// Decode an RLP-encoded optionalFields struct
	input := "C101"
	ptr := new(optionalFields)
	err := rlp.DecodeString(input, ptr)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr) // Output: {A:1 B:0 C:0}

	// Decode an RLP-encoded optionalAndTailField struct
	input = "C20102"
	ptr = new(optionalAndTailField)
	err = rlp.DecodeString(input, ptr)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr) // Output: {A:1 B:2 Tail:[]}

	// Decode an RLP-encoded optionalBigIntField struct
	input = "C20102"
	ptr = new(optionalBigIntField)
	err = rlp.DecodeString(input, ptr)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr) // Output: {A:1 B:2}

	// Decode an RLP-encoded optionalPtrField struct
	input = "C50183010203"
	ptr = new(optionalPtrField)
	err = rlp.DecodeString(input, ptr)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr) // Output: {A:1 B:&[1 2 3]}

	// Decode an RLP-encoded multipleOptionalFields struct
	input = "C88301020383010203"
	ptr = new(multipleOptionalFields)
	err = rlp.DecodeString(input, ptr)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr) // Output: {A:&[1 2 3] B:&[1 2 3]}

	// Decode an RLP-encoded nonOptionalPtrField struct
	input = "C20102"
	ptr2 := new(nonOptionalPtrField)
	err = rlp.DecodeString(input, ptr2)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr2) // Output: {A:2 B:nil}

	// Decode an RLP-encoded optionalPtrFieldNil struct
	input = "C20180"
	ptr3 := new(optionalPtrFieldNil)
	err = rlp.DecodeString(input, ptr3)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", *ptr3) // Output: {A:2 B:nil}
}
``` ## RLP Decoder

The RLP Decoder is a Go package that provides an interface for decoding RLP-encoded data. RLP stands for Recursive Length Prefix, which is a method of encoding arbitrary data structures in a compact and efficient way. The package provides functions for decoding RLP-encoded data into Go data structures.

### Functions

#### uintp

```go
func uintp(i uint) *uint
```

The `uintp` function returns a pointer to a `uint` value.

#### runTests

```go
func runTests(t *testing.T, decode func([]byte, interface{}) error)
```

The `runTests` function runs a series of tests on the RLP decoder. It takes a testing object and a decoding function as arguments.

#### TestDecodeWithByteReader

```go
func TestDecodeWithByteReader(t *testing.T)
```

The `TestDecodeWithByteReader` function tests the RLP decoder with a byte reader.

#### TestDecodeWithEncReader

```go
func TestDecodeWithEncReader(t *testing.T)
```

The `TestDecodeWithEncReader` function tests the RLP decoder with an encoded reader.

#### TestDecodeWithNonByteReader

```go
func TestDecodeWithNonByteReader(t *testing.T)
```

The `TestDecodeWithNonByteReader` function tests the RLP decoder with a non-byte reader.

#### TestDecodeStreamReset

```go
func TestDecodeStreamReset(t *testing.T)
```

The `TestDecodeStreamReset` function tests the RLP decoder with a stream reset.

#### testDecodeWithEncReader

```go
func testDecodeWithEncReader(t *testing.T, n int)
```

The `testDecodeWithEncReader` function tests the RLP decoder with an encoded reader and a specified length.

#### TestDecodeWithByteReader

```go
type testDecode struct {
	input  string
	ptr    interface{}
	value  interface{}
	error  string
}
```

The `testDecode` struct defines a test case for the RLP decoder.

### Usage

The RLP decoder can be used to decode RLP-encoded data into Go data structures. The `Decode` function takes a byte slice and a pointer to a Go data structure as arguments, and decodes the RLP-encoded data into the Go data structure.

```go
func Decode(input []byte, into interface{}) error
```

The `Decode` function decodes RLP-encoded data into a Go data structure. It takes a byte slice and a pointer to a Go data structure as arguments, and returns an error if the decoding fails.

```go
type Stream struct {
	// contains filtered or unexported fields
}
```

The `Stream` struct provides a streaming interface for decoding RLP-encoded data. It can be used to decode large RLP-encoded data structures in a memory-efficient way.

```go
func NewStream(input io.Reader, size int) *Stream
```

The `NewStream` function creates a new `Stream` object. It takes an input reader and a size as arguments, and returns a pointer to a new `Stream` object.

```go
func (s *Stream) Reset(input io.Reader, size int)
```

The `Reset` method resets the `Stream` object. It takes an input reader and a size as arguments, and resets the `Stream` object to decode the new input.

```go
func (s *Stream) Decode(into interface{}) error
```

The `Decode` method decodes RLP-encoded data into a Go data structure. It takes a pointer to a Go data structure as an argument, and returns an error if the decoding fails. # Documentation for RLP Decoder

The RLP Decoder is a Go package that provides an interface for decoding RLP-encoded data. The package defines several functions and types that can be used to decode RLP-encoded data.

## `type testDecoder struct{ called bool }`

The `testDecoder` type is a struct that has a single boolean field called `called`. This type implements the `Decoder` interface, which is used to decode RLP-encoded data. The `DecodeRLP` method of this type sets the `called` field to `true` and returns `nil`.

## `func (t *testDecoder) DecodeRLP(s *Stream) error`

The `DecodeRLP` method of the `testDecoder` type is used to decode RLP-encoded data. This method takes a pointer to a `Stream` object and returns an error. The method reads an unsigned integer from the stream and sets the `called` field of the `testDecoder` object to `true`.

## `func TestDecodeDecoder(t *testing.T)`

The `TestDecodeDecoder` function is a test function that tests the `Decode` function of the RLP Decoder package. This function creates a struct with three fields of type `testDecoder` and calls the `Decode` function with a byte slice that contains RLP-encoded data. The function then checks that the `DecodeRLP` method was called for each of the three fields.

## `func TestDecodeDecoderNilPointer(t *testing.T)`

The `TestDecodeDecoderNilPointer` function is a test function that tests the `Decode` function of the RLP Decoder package with a nil pointer. This function creates a struct with two fields of type `testDecoder`, one of which is a nil pointer. The function then calls the `Decode` function with a byte slice that contains RLP-encoded data. The function checks that the `DecodeRLP` method was called for the non-nil field and that the nil field was not allocated.

## `type byteDecoder byte`

The `byteDecoder` type is a type that implements the `Decoder` interface. This type has a single method called `DecodeRLP` that sets the value of the `byteDecoder` object to 255 and returns an error.

## `func (bd *byteDecoder) DecodeRLP(s *Stream) error`

The `DecodeRLP` method of the `byteDecoder` type is used to decode RLP-encoded data. This method takes a pointer to a `Stream` object and returns an error. The method reads an unsigned integer from the stream and sets the value of the `byteDecoder` object to 255.

## `func (bd byteDecoder) called() bool`

The `called` method of the `byteDecoder` type is used to check if the `DecodeRLP` method was called for a `byteDecoder` object. This method returns `true` if the value of the `byteDecoder` object is 255.

## `func TestDecoderInByteSlice(t *testing.T)`

The `TestDecoderInByteSlice` function is a test function that tests the `Decode` function of the RLP Decoder package with a byte slice. This function creates a byte slice and an array of `byteDecoder` objects. The function then calls the `Decode` function with a byte slice that contains RLP-encoded data. The function checks that the `DecodeRLP` method was called for the first element of the slice and the array.

## `type unencodableDecoder func()`

The `unencodableDecoder` type is a type that implements the `Decoder` interface. This type has a single method called `DecodeRLP` that reads a list from the stream and sets the value of the `unencodableDecoder` object to a function that does nothing.

## `func (f *unencodableDecoder) DecodeRLP(s *Stream) error`

The `DecodeRLP` method of the `unencodableDecoder` type is used to decode RLP-encoded data. This method takes a pointer to a `Stream` object and returns an error. The method reads a list from the stream and sets the value of the `unencodableDecoder` object to a function that does nothing.

## `func TestDecoderFunc(t *testing.T)`

The `TestDecoderFunc` function is a test function that tests the `DecodeBytes` function of the RLP Decoder package with a function. This function creates a function variable and calls the `DecodeBytes` function with a byte slice that contains RLP-encoded data. The function then calls the function variable and checks that it does nothing.

## `func TestInvalidOptionalField(t *testing.T)`

The `TestInvalidOptionalField` function is a test function that tests the `Decode` function of the RLP Decoder package with invalid struct tags. This function creates three structs with invalid struct tags and calls the `Decode` function with a byte slice that contains RLP-encoded data. The function checks that the `Decode` function returns an error with the correct message.

## `func ExampleDecode()`

The `ExampleDecode` function is an example function that demonstrates how to use the `Decode` function of the RLP Decoder package. This function creates a struct with three fields and calls the `Decode` function with a byte slice that contains RLP-encoded data. The function then prints the decoded value. # Documentation for RLP Go Package

The RLP Go Package is a Go implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. This package provides functions for encoding and decoding RLP data, as well as a Stream type for decoding RLP data in a streaming fashion.

## Functions

### Decode

```go
func Decode(reader io.Reader, val interface{}) error
```

The `Decode` function decodes RLP-encoded data from an `io.Reader` and stores the result in the provided `val` variable. The `val` variable must be a pointer to a struct or slice that matches the structure of the RLP-encoded data.

### DecodeBytes

```go
func DecodeBytes(input []byte, val interface{}) error
```

The `DecodeBytes` function decodes RLP-encoded data from a byte slice and stores the result in the provided `val` variable. The `val` variable must be a pointer to a struct or slice that matches the structure of the RLP-encoded data.

### Encode

```go
func Encode(val interface{}) ([]byte, error)
```

The `Encode` function encodes the provided `val` variable as RLP data and returns the result as a byte slice.

### EncodeToBytes

```go
func EncodeToBytes(val interface{}) ([]byte, error)
```

The `EncodeToBytes` function encodes the provided `val` variable as RLP data and returns the result as a byte slice. This function is equivalent to `Encode`, but has a different name to match the naming convention of the `DecodeBytes` function.

### NewStream

```go
func NewStream(reader io.Reader, size int) *Stream
```

The `NewStream` function creates a new `Stream` instance for decoding RLP data from an `io.Reader`. The `size` parameter is the expected size of the RLP data, or 0 if the size is unknown.

## Types

### Stream

```go
type Stream struct {
	// contains filtered or unexported fields
}
```

The `Stream` type is used for decoding RLP data in a streaming fashion. The `Kind` method is used to determine the type of the next value in the stream, and the `List` method is used to enter a list of values. The `Uint`, `Bytes`, and `String` methods are used to decode individual values, and the `ListEnd` method is used to acknowledge the end of a list.

## Examples

### ExampleDecode_structTagNil

This example demonstrates how to use the `nil` struct tag to change how a pointer-typed field is decoded. The input contains an RLP list of one element, an empty string.

```go
func ExampleDecode_structTagNil() {
	// In this example, we'll use the "nil" struct tag to change
	// how a pointer-typed field is decoded. The input contains an RLP
	// list of one element, an empty string.
	input := []byte{0xC1, 0x80}

	// This type uses the normal rules.
	// The empty input string is decoded as a pointer to an empty Go string.
	var normalRules struct {
		String *string
	}
	Decode(bytes.NewReader(input), &normalRules)
	fmt.Printf("normal: String = %q\n", *normalRules.String)

	// This type uses the struct tag.
	// The empty input string is decoded as a nil pointer.
	var withEmptyOK struct {
		String *string `rlp:"nil"`
	}
	Decode(bytes.NewReader(input), &withEmptyOK)
	fmt.Printf("with nil tag: String = %v\n", withEmptyOK.String)

	// Output:
	// normal: String = ""
	// with nil tag: String = <nil>
}
```

### ExampleStream

This example demonstrates how to use the `Stream` type to decode RLP data in a streaming fashion.

```go
func ExampleStream() {
	input, _ := hex.DecodeString("C90A1486666F6F626172")
	s := NewStream(bytes.NewReader(input), 0)

	// Check what kind of value lies ahead
	kind, size, _ := s.Kind()
	fmt.Printf("Kind: %v size:%d\n", kind, size)

	// Enter the list
	if _, err := s.List(); err != nil {
		fmt.Printf("List error: %v\n", err)
		return
	}

	// Decode elements
	fmt.Println(s.Uint())
	fmt.Println(s.Uint())
	fmt.Println(s.Bytes())

	// Acknowledge end of list
	if err := s.ListEnd(); err != nil {
		fmt.Printf("ListEnd error: %v\n", err)
	}
	// Output:
	// Kind: List size:9
	// 10 <nil>
	// 20 <nil>
	// [102 111 111 98 97 114] <nil>
}
```

## Benchmarks

The RLP Go Package includes several benchmarks to measure the performance of the encoding and decoding functions. These benchmarks can be run using the `go test` command with the `-bench` flag.

### BenchmarkDecodeUints

This benchmark measures the performance of decoding a slice of 90,000 `uint` values.

### BenchmarkDecodeUintsReused

This benchmark measures the performance of decoding a slice of 100,000 `uint` values using a reused slice.

### BenchmarkDecodeByteArrayStruct

This benchmark measures the performance of decoding a struct that contains a byte array.

### BenchmarkDecodeBigInts

This benchmark measures the performance of decoding a slice of 200 `*big.Int` values.

### BenchmarkDecodeU256Ints

This benchmark measures the performance of decoding a slice of 200 `*uint256.Int` values.

### encodeTestSlice

This function is used by the benchmark functions to generate a test slice of `uint` values.

### unhex

This function is used by the example functions to convert a hex string to a byte slice.