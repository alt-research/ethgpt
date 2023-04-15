Package RLP

The RLP package provides functions for encoding and decoding data in the Recursive Length Prefix (RLP) format. RLP is a serialization format used by the Ethereum blockchain to store and transmit data.

RawValue

The `RawValue` type represents an encoded RLP value and can be used to delay RLP decoding or to precompute an encoding. Note that the decoder does not verify whether the content of `RawValues` is valid RLP.

StringSize

The `StringSize` function returns the encoded size of a string.

BytesSize

The `BytesSize` function returns the encoded size of a byte slice.

ListSize

The `ListSize` function returns the encoded size of an RLP list with the given content size.

IntSize

The `IntSize` function returns the encoded size of the integer x.

Split

The `Split` function returns the content of the first RLP value and any bytes after the value as subslices of b.

SplitString

The `SplitString` function splits b into the content of an RLP string and any remaining bytes after the string.

SplitUint64

The `SplitUint64` function decodes an integer at the beginning of b.

SplitList

The `SplitList` function splits b into the content of a list and any remaining bytes after the list.

CountValues

The `CountValues` function counts the number of encoded values in b. # Documentation for RLP Encoding Functions

This source code contains functions for encoding and decoding data using the Recursive Length Prefix (RLP) encoding scheme. The RLP encoding scheme is used to encode arbitrarily nested arrays of binary data.

## `countValues(b []byte) (int, error)`

This function takes a byte slice `b` and returns the number of RLP-encoded values in the slice. It does this by iterating over the slice and counting the number of RLP-encoded values it encounters. If an error occurs during the iteration, the function returns an error.

## `readKind(buf []byte) (k Kind, tagsize, contentsize uint64, err error)`

This function takes a byte slice `buf` and returns the kind of RLP-encoded value it contains, along with the size of the value's tag and contents. The function does this by examining the first byte of the slice and using it to determine the kind of value and the size of its tag and contents. If an error occurs during the examination, the function returns an error.

## `readSize(b []byte, slen byte) (uint64, error)`

This function takes a byte slice `b` and a byte `slen` and returns the size of an RLP-encoded value. The function does this by examining the first byte of the slice and using it to determine the size of the value. If an error occurs during the examination, the function returns an error.

## `AppendUint64(b []byte, i uint64) []byte`

This function takes a byte slice `b` and a uint64 `i` and appends the RLP encoding of `i` to `b`. The function does this by examining the value of `i` and using it to determine the appropriate RLP encoding. The resulting byte slice is returned.