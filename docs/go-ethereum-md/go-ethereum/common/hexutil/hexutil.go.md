The `hexutil` package provides functions for encoding and decoding hexadecimal data with a `0x` prefix. This encoding is used by the Ethereum RPC API to transport binary data in JSON payloads.

The package contains the following functions:

- `Decode(input string) ([]byte, error)`: This function decodes a hex string with a `0x` prefix. It returns a byte slice and an error. If the input string is empty, it returns an `ErrEmptyString` error. If the input string does not have a `0x` prefix, it returns an `ErrMissingPrefix` error. If the input string has an odd length, it returns an `ErrOddLength` error. If the input string is a valid hex string, it returns the decoded byte slice. If the input string is not a valid hex string, it returns a mapped error.
- `MustDecode(input string) []byte`: This function decodes a hex string with a `0x` prefix. It panics for invalid input. It returns the decoded byte slice.
- `Encode(b []byte) string`: This function encodes a byte slice as a hex string with a `0x` prefix. It returns the encoded string.
- `DecodeUint64(input string) (uint64, error)`: This function decodes a hex string with a `0x` prefix as a quantity. It returns a uint64 and an error. If the input string is empty, it returns an `ErrEmptyString` error. If the input string does not have a `0x` prefix, it returns an `ErrMissingPrefix` error. If the input string has an odd length, it returns an `ErrOddLength` error. If the input string is a valid hex string, it returns the decoded uint64. If the input string is not a valid hex string, it returns a mapped error.
- `MustDecodeUint64(input string) uint64`: This function decodes a hex string with a `0x` prefix as a quantity. It panics for invalid input. It returns the decoded uint64.
- `EncodeUint64(i uint64) string`: This function encodes a uint64 as a hex string with a `0x` prefix. It returns the encoded string.

The package also defines several errors that can be returned by the decoding functions:

- `ErrEmptyString`: This error is returned when the input string is empty.
- `ErrSyntax`: This error is returned when the input string is not a valid hex string.
- `ErrMissingPrefix`: This error is returned when the input string does not have a `0x` prefix.
- `ErrOddLength`: This error is returned when the input string has an odd length.
- `ErrEmptyNumber`: This error is returned when the input string is `0x`.
- `ErrLeadingZero`: This error is returned when the input string has leading zero digits.
- `ErrUint64Range`: This error is returned when the input string represents a number greater than 64 bits.
- `ErrUintRange`: This error is returned when the input string represents a number greater than the maximum size of a uint on the current platform.
- `ErrBig256Range`: This error is returned when the input string represents a number greater than 256 bits.

Here is an example usage of the `hexutil` package:

```go
package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common/hexutil"
)

func main() {
	// Encode a byte slice
	data := []byte{0x01, 0x02, 0x03}
	encoded := hexutil.Encode(data)
	fmt.Println(encoded) // Output: 0x010203

	// Decode a hex string
	decoded, err := hexutil.Decode(encoded)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%x\n", decoded) // Output: 010203

	// Encode a uint64
	num := uint64(1234567890)
	encodedNum := hexutil.EncodeUint64(num)
	fmt.Println(encodedNum) // Output: 0x499602d2

	// Decode a hex string as a uint64
	decodedNum, err := hexutil.DecodeUint64(encodedNum)
	if err != nil {
		panic(err)
	}
	fmt.Println(decodedNum) // Output: 1234567890
}
``` # Source Code Documentation

## Function: DecodeBig

```go
func DecodeBig(input string) (*big.Int, error)
```

This function decodes a hex string with 0x prefix as a quantity. It returns a pointer to a big.Int and an error. If the input string is not a valid hex string or the number of bits is larger than 256, it returns an error. The function first checks the input string using the `checkNumber` function. If the input string is valid, it converts the string to a big.Int using the `SetBits` method. The function uses the `make` function to create a slice of big.Word with a length of `len(raw)/bigWordNibbles+1`. It then loops through the slice and converts each nibble to a big.Word. Finally, it returns the big.Int and nil if there is no error.

## Function: MustDecodeBig

```go
func MustDecodeBig(input string) *big.Int
```

This function decodes a hex string with 0x prefix as a quantity. It panics if the input string is not a valid hex string or the number of bits is larger than 256. The function calls the `DecodeBig` function and panics if there is an error. Otherwise, it returns the big.Int.

## Function: EncodeBig

```go
func EncodeBig(bigint *big.Int) string
```

This function encodes a big.Int as a hex string with 0x prefix. It returns a string. If the big.Int is zero, it returns "0x0". If the big.Int is positive, it returns "0x" + the hex string of the big.Int. If the big.Int is negative, it returns "-0x" + the hex string of the absolute value of the big.Int.

## Function: checkNumber

```go
func checkNumber(input string) (raw string, err error)
```

This function checks if the input string is a valid hex string with 0x prefix. It returns the raw hex string and an error. If the input string is empty, it returns an error. If the input string does not have a 0x prefix, it returns an error. If the input string has an odd length or a leading zero, it returns an error. Otherwise, it returns the raw hex string and nil.

## Function: has0xPrefix

```go
func has0xPrefix(input string) bool
```

This function checks if the input string has a 0x prefix. It returns a boolean value.

## Function: decodeNibble

```go
func decodeNibble(in byte) uint64
```

This function decodes a nibble from a byte. It returns a uint64 value. If the input byte is a valid nibble, it returns the corresponding uint64 value. Otherwise, it returns `badNibble`.

## Function: mapError

```go
func mapError(err error) error
```

This function maps an error to a specific error type. It returns an error. If the input error is a `strconv.NumError` with an error type of `strconv.ErrRange`, it returns `ErrUint64Range`. If the input error is a `strconv.NumError` with an error type of `strconv.ErrSyntax`, it returns `ErrSyntax`. If the input error is a `hex.InvalidByteError`, it returns `ErrSyntax`. If the input error is `hex.ErrLength`, it returns `ErrOddLength`. Otherwise, it returns the input error.