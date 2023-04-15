# RLP Serialization Format

The `rlp` package implements the RLP serialization format, which is used to encode arbitrarily nested arrays of binary data. RLP is the main encoding method used to serialize objects in Ethereum. The purpose of RLP is to encode structure, and encoding specific atomic data types (e.g. strings, ints, floats) is left up to higher-order protocols. In Ethereum, integers must be represented in big endian binary form with no leading zeroes, making the integer value zero equivalent to the empty string.

RLP values are distinguished by a type tag, which precedes the value in the input stream and defines the size and kind of the bytes that follow.

# Encoding Rules

The `rlp` package uses reflection to encode RLP based on the Go type of the value. If the type implements the `Encoder` interface, `Encode` calls `EncodeRLP`. It does not call `EncodeRLP` on nil pointer values.

To encode a pointer, the value being pointed to is encoded. A nil pointer to a struct type, slice, or array always encodes as an empty RLP list unless the slice or array has element type byte. A nil pointer to any other value encodes as the empty string.

Struct values are encoded as an RLP list of all their encoded public fields. Recursive struct types are supported.

To encode slices and arrays, the elements are encoded as an RLP list of the value's elements. Note that arrays and slices with element type uint8 or byte are always encoded as an RLP string.

A Go string is encoded as an RLP string.

An unsigned integer value is encoded as an RLP string. Zero always encodes as an empty RLP string. `big.Int` values are treated as integers. Signed integers (int, int8, int16, ...) are not supported and will return an error when encoding.

Boolean values are encoded as the unsigned integers zero (false) and one (true).

An interface value encodes as the value contained in the interface.

Floating point numbers, maps, channels, and functions are not supported.

# Decoding Rules

Decoding uses the following type-dependent rules:

If the type implements the `Decoder` interface, `DecodeRLP` is called.

To decode into a pointer, the value will be decoded as the element type of the pointer. If the pointer is nil, a new value of the pointer's element type is allocated. If the pointer is non-nil, the existing value will be reused. Note that the `rlp` package never leaves a pointer-type struct field as nil unless one of the "nil" struct tags is present.

To decode into a struct, decoding expects the input to be an RLP list. The decoded elements of the list are assigned to each public field in the order given by the struct's definition. The input list must contain an element for each decoded field. Decoding returns an error if there are too few or too many elements for the struct.

To decode into a slice, the input must be a list, and the resulting slice will contain the input elements in order. For example, if the input is an RLP list of integers, the resulting slice will be a slice of integers.

# License

This file is part of the go-ethereum library, which is free software released under the terms of the GNU Lesser General Public License. # RLP Package Documentation

The RLP package provides encoding and decoding of Recursive Length Prefix (RLP) data. RLP is a serialization format used in Ethereum for encoding data in transactions, blocks, and other parts of the blockchain.

## Encoding

To encode a value, use the `Encode` function. The input value can be a Go integer, string, byte slice, or a struct. Struct values are encoded as RLP lists.

```go
encodedBytes, err := Encode(inputValue)
```

## Decoding

To decode an RLP-encoded value, use the `Decode` function. The output value can be a Go integer, string, byte slice, or a struct. Struct values are decoded as RLP lists.

```go
err := Decode(encodedBytes, &outputValue)
```

### Decoding into Specific Types

To decode into a Go integer type, use the `DecodeUint` function. The input must be an RLP string. The bytes are interpreted as a big endian representation of the integer. If the RLP string is larger than the bit size of the type, decoding will return an error. Decode also supports `*big.Int`. There is no size limit for big integers.

```go
decodedUint, err := DecodeUint(encodedBytes)
```

To decode into a Go string, use the `DecodeString` function. The input must be an RLP string. The input bytes are taken as-is and will not necessarily be valid UTF-8.

```go
decodedString, err := DecodeString(encodedBytes)
```

To decode into a boolean, the input must contain an unsigned integer of value zero (false) or one (true).

```go
decodedBool, err := DecodeBool(encodedBytes)
```

To decode into an interface value, use the `DecodeValue` function. The output value can be a slice of interfaces or a byte slice.

```go
decodedValue, err := DecodeValue(encodedBytes)
```

### Decoding Structs

Go struct values encode/decode as RLP lists. There are two ways of influencing the mapping of fields to list elements.

The "tail" tag, which may only be used on the last exported struct field, allows slurping up any excess list elements into a slice.

```go
type StructWithTail struct{
    Field   uint
    Tail    []string `rlp:"tail"`
}
```

The "optional" tag says that the field may be omitted if it is zero-valued. If this tag is used on a struct field, all subsequent public fields must also be declared optional.

```go
type StructWithOptionalFields struct{
     Required  uint
     Optional1 uint `rlp:"optional"`
     Optional2 uint `rlp:"optional"`
}
```

When encoding a struct with optional fields, the output RLP list contains all values up to the last non-zero optional field.

When decoding into a struct, optional fields may be omitted from the end of the input list. For the example below, this means input lists of one, two, or three elements are accepted.

The "nil", "nilList" and "nilString" tags apply to pointer-typed fields only, and change the decoding rules for the field type. For regular pointer fields without the "nil" tag, input values must always match the required input length exactly and the decoder does not produce nil values. When the "nil" tag is set, input values of size zero decode as a nil pointer. This is especially useful for recursive types.

```go
type StructWithNilField struct {
    Field *[3]byte `rlp:"nil"`
}
```

In the example above, Field allows two possible input sizes. For input 0xC180 (a list containing an empty string) Field is set to nil after decoding. For input 0xC483000000 (a list containing a 3-byte string), Field is set to a non-nil array pointer.

RLP supports two kinds of empty values: empty lists and empty strings. When using the "nil" tag, the kind of empty value allowed for a type is chosen automatically. A field whose Go type is a pointer to an unsigned integer, string, boolean or byte array/slice expects an empty RLP string. Any other pointer field type encodes/decodes as an empty RLP list.

The choice of null value can be made explicit with the "nilList" and "nilString" struct tags. Using these tags encodes/decodes a Go nil pointer value as the empty RLP value kind defined by the tag.