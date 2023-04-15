// decodeError is an internal error type used to wrap decoding errors with additional context.
type decodeError struct {
	msg string
}

// Error returns the error message for the decodeError.
func (e *decodeError) Error() string {
	return e.msg
}

// EOL is an error returned when the end of the current list has been reached during streaming.
var EOL = errors.New("rlp: end of list")

// ErrExpectedString is an error returned when an RLP value is expected to be a string or byte.
var ErrExpectedString = errors.New("rlp: expected String or Byte")

// ErrExpectedList is an error returned when an RLP value is expected to be a list.
var ErrExpectedList = errors.New("rlp: expected List")

// ErrCanonInt is an error returned when an RLP integer is not in canonical format.
var ErrCanonInt = errors.New("rlp: non-canonical integer format")

// ErrCanonSize is an error returned when an RLP size is not in canonical format.
var ErrCanonSize = errors.New("rlp: non-canonical size information")

// ErrElemTooLarge is an error returned when an RLP element is larger than its containing list.
var ErrElemTooLarge = errors.New("rlp: element is larger than containing list")

// ErrValueTooLarge is an error returned when an RLP value size exceeds the available input length.
var ErrValueTooLarge = errors.New("rlp: value size exceeds available input length")

// ErrMoreThanOneValue is an error returned when an RLP input contains more than one value.
var ErrMoreThanOneValue = errors.New("rlp: input contains more than one value")

// errNotInList is an internal error returned when ListEnd is called outside of any list.
var errNotInList = errors.New("rlp: call of ListEnd outside of any list")

// errNotAtEOL is an internal error returned when ListEnd is not positioned at EOL.
var errNotAtEOL = errors.New("rlp: call of ListEnd not positioned at EOL")

// errUintOverflow is an internal error returned when an RLP integer overflows a uint64.
var errUintOverflow = errors.New("rlp: uint overflow")

// errNoPointer is an internal error returned when an interface given to Decode is not a pointer.
var errNoPointer = errors.New("rlp: interface given to Decode must be a pointer")

// errDecodeIntoNil is an internal error returned when a pointer given to Decode is nil.
var errDecodeIntoNil = errors.New("rlp: pointer given to Decode must not be nil")

// errUint256Large is an internal error returned when an RLP value is too large for a uint256.
var errUint256Large = errors.New("rlp: value too large for uint256")

// streamPool is a sync.Pool used to reuse Stream instances.
var streamPool = sync.Pool{
	New: func() interface{} { return new(Stream) },
}

// Decoder is an interface implemented by types that require custom RLP decoding rules or need to decode
// into private fields.
//
// The DecodeRLP method should read one value from the given Stream. It is not forbidden to
// read less or more, but it might be confusing.
type Decoder interface {
	DecodeRLP(*Stream) error
}

// Decode parses RLP-encoded data from r and stores the result in the value pointed to by val.
// Val must be a non-nil pointer. If r does not implement ByteReader, Decode will do its own buffering.
//
// Note that Decode does not set an input limit for all readers and may be vulnerable to
// panics caused by huge value sizes. If you need an input limit, use NewStream(r, limit).Decode(val).
func Decode(r io.Reader, val interface{}) error {
	stream := streamPool.Get().(*Stream)
	defer streamPool.Put(stream)

	stream.Reset(r, 0)
	return stream.Decode(val)
}

// DecodeBytes parses RLP data from b into val. The input must contain exactly one value and no trailing data.
func DecodeBytes(b []byte, val interface{}) error {
	r := bytes.NewReader(b)

	stream := streamPool.Get().(*Stream)
	defer streamPool.Put(stream)

	stream.Reset(r, uint64(len(b)))
	if err := stream.Decode(val); err != nil {
		return err
	}
	if r.Len() > 0 {
		return ErrMoreThanOneValue
	}
	return nil
}

// decodeErrorf is a helper function that creates a new decodeError with a formatted message.
func decodeErrorf(format string, args ...interface{}) error {
	return &decodeError{fmt.Sprintf(format, args...)}
}

// Stream is an RLP decoding stream that reads from an io.Reader.
type Stream struct {
	r     io.Reader
	limit uint64
	buf   *bufio.Reader
}

// Reset resets the Stream to read from r with the given limit.
func (s *Stream) Reset(r io.Reader, limit uint64) {
	s.r = r
	s.limit = limit
	s.buf = nil
}

// Decode parses an RLP-encoded value from the Stream and stores the result in the value pointed to by val.
// Val must be a non-nil pointer.
func (s *Stream) Decode(val interface{}) error {
	if val == nil {
		return errDecodeIntoNil
	}
	v := reflect.ValueOf(val)
	if v.Kind() != reflect.Ptr || v.IsNil() {
		return errNoPointer
	}
	return s.decodeValue(v.Elem())
}

// decodeValue decodes an RLP-encoded value into the given reflect.Value.
func (s *Stream) decodeValue(v reflect.Value) error {
	if v.Kind() == reflect.Interface {
		if v.NumMethod() == 0 {
			// Empty interface, decode as []byte.
			return s.decodeBytes(v)
		}
		// Non-empty interface, decode as the interface type.
		return s.decodeValue(v.Elem())
	}
	switch v.Kind() {
	case reflect.Bool:
		return s.decodeBool(v)
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return s.decodeInt(v)
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return s.decodeUint(v)
	case reflect.Float32, reflect.Float64:
		return s.decodeFloat(v)
	case reflect.String:
		return s.decodeString(v)
	case reflect.Slice:
		if v.Type().Elem().Kind() == reflect.Uint8 {
			return s.decodeBytes(v)
		}
		return s.decodeList(v)
	case reflect.Struct:
		return s.decodeStruct(v)
	default:
		return fmt.Errorf("rlp: unsupported type %v", v.Type())
	}
}

// decodeBool decodes an RLP-encoded boolean into the given reflect.Value.
func (s *Stream) decodeBool(v reflect.Value) error {
	b, err := s.readByte()
	if err != nil {
		return err
	}
	if b == 0x80 {
		v.SetBool(false)
	} else {
		v.SetBool(true)
	}
	return nil
}

// decodeInt decodes an RLP-encoded integer into the given reflect.Value.
func (s *Stream) decodeInt(v reflect.Value) error {
	b, err := s.readByte()
	if err != nil {
		return err
	}
	if b <= 0x7f {
		v.SetInt(int64(b))
		return nil
	}
	if b <= 0xb7 {
		n := int(b - 0x80)
		if err := s.decodeIntBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xbf {
		n := int(b - 0xb7)
		if err := s.decodeIntBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xf7 {
		n := int(b - 0xc0)
		if err := s.decodeIntBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xff {
		n := int(b - 0xf7)
		if err := s.decodeIntBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	return decodeErrorf("rlp: invalid integer prefix %x", b)
}

// decodeIntBytes decodes n bytes from the Stream and stores the result in the given reflect.Value as an integer.
func (s *Stream) decodeIntBytes(n int, v reflect.Value) error {
	if n == 0 {
		v.SetInt(0)
		return nil
	}
	if n > 8 {
		return errUintOverflow
	}
	b, err := s.readBytes(n)
	if err != nil {
		return err
	}
	var x uint64
	for _, c := range b {
		x = x<<8 | uint64(c)
	}
	if b[0]&0x80 != 0 {
		v.SetInt(-int64((1<<uint(n*8))-x))
	} else {
		v.SetInt(int64(x))
	}
	return nil
}

// checkCanonInt checks if the given reflect.Value contains a canonical integer.
func (s *Stream) checkCanonInt(v reflect.Value) error {
	if v.Kind() != reflect.Int && v.Kind() != reflect.Int8 && v.Kind() != reflect.Int16 && v.Kind() != reflect.Int32 && v.Kind() != reflect.Int64 {
		return nil
	}
	if v.Int() == 0 {
		return nil
	}
	if v.Int() > 0 && v.Int() <= 0x7f {
		return nil
	}
	if v.Int() < 0 && v.Int() >= -0x80 {
		return nil
	}
	if v.Int() > 0 && v.Int() <= 0xff {
		return ErrCanonInt
	}
	if v.Int() < 0 && v.Int() >= -0x100 {
		return ErrCanonInt
	}
	return nil
}

// decodeUint decodes an RLP-encoded unsigned integer into the given reflect.Value.
func (s *Stream) decodeUint(v reflect.Value) error {
	b, err := s.readByte()
	if err != nil {
		return err
	}
	if b <= 0x7f {
		v.SetUint(uint64(b))
		return nil
	}
	if b <= 0xb7 {
		n := int(b - 0x80)
		if err := s.decodeUintBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xbf {
		n := int(b - 0xb7)
		if err := s.decodeUintBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xf7 {
		n := int(b - 0xc0)
		if err := s.decodeUintBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	if b <= 0xff {
		n := int(b - 0xf7)
		if err := s.decodeUintBytes(n, v); err != nil {
			return err
		}
		return s.checkCanonInt(v)
	}
	return decodeErrorf("rlp: invalid integer prefix %x", b)
}

// decodeUintBytes decodes n bytes from the Stream and stores the result in the given reflect.Value as an unsigned integer.
func (s *Stream) decodeUintBytes(n int, v reflect.Value) error {
	if n == 0 {
		v.SetUint(0)
		return nil
	}
	if n > 8 {
		return errUintOverflow
	}
	b, err := s.readBytes(n)
	if err != nil {
		return err
	} # RLP Decoder Source Code Documentation

This source code implements a decoder for RLP (Recursive Length Prefix) serialization format in Go. The RLP format is used to serialize arbitrary data structures in a compact and efficient way.

## decodeError

The `decodeError` struct represents an error that occurred during decoding. It contains a message describing the error, the type of the value being decoded, and a context string that provides additional information about the decoding process.

The `Error` method of the `decodeError` struct returns a string representation of the error.

## wrapStreamError

The `wrapStreamError` function wraps a decoding error returned by the `Stream` type with additional information about the type being decoded. It returns a new `decodeError` instance with the appropriate error message and type information.

## addErrorContext

The `addErrorContext` function adds a context string to a decoding error. It takes an error and a context string as input, and returns a new error with the context string added to the `ctx` field of the `decodeError` instance.

## makeDecoder

The `makeDecoder` function creates a decoder function for a given type. It takes a `reflect.Type` instance and a set of RLP struct tags as input, and returns a decoder function that can decode values of that type from an RLP stream.

The `makeDecoder` function uses reflection to determine the kind of the input type, and returns a decoder function that is specialized for that kind of type. The supported types include integers, booleans, strings, slices, arrays, structs, and interfaces.

## decodeRawValue

The `decodeRawValue` function decodes a raw RLP value into a byte slice. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded byte slice.

## decodeUint

The `decodeUint` function decodes an RLP-encoded unsigned integer into a `uint64` value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded integer.

## decodeBool

The `decodeBool` function decodes an RLP-encoded boolean value into a `bool` value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded boolean.

## decodeString

The `decodeString` function decodes an RLP-encoded string value into a `string` value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded string.

## decodeBigIntNoPtr

The `decodeBigIntNoPtr` function decodes an RLP-encoded big integer value into a `big.Int` value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded big integer.

## decodeBigInt

The `decodeBigInt` function is similar to `decodeBigIntNoPtr`, but it takes a pointer to a `big.Int` value as input, and sets the value to the decoded big integer.

## decodeU256NoPtr

The `decodeU256NoPtr` function decodes an RLP-encoded 256-bit unsigned integer value into a `uint256.Int` value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded 256-bit integer.

## decodeU256

The `decodeU256` function is similar to `decodeU256NoPtr`, but it takes a pointer to a `uint256.Int` value as input, and sets the value to the decoded 256-bit integer.

## makeListDecoder

The `makeListDecoder` function creates a decoder function for a slice or array type. It takes a `reflect.Type` instance and a set of RLP struct tags as input, and returns a decoder function that can decode values of that type from an RLP stream.

The `makeListDecoder` function uses reflection to determine the element type of the slice or array, and returns a decoder function that is specialized for that element type.

## makeStructDecoder

The `makeStructDecoder` function creates a decoder function for a struct type. It takes a `reflect.Type` instance as input, and returns a decoder function that can decode values of that type from an RLP stream.

The `makeStructDecoder` function uses reflection to determine the fields of the struct, and returns a decoder function that is specialized for those fields.

## decodeInterface

The `decodeInterface` function decodes an RLP-encoded value into an interface value. It takes a `Stream` instance and a `reflect.Value` instance as input, and sets the value to the decoded interface.

## Conclusion

This source code implements a flexible and extensible decoder for RLP serialization format in Go. It uses reflection to support a wide range of data types, and provides specialized decoder functions for each type. The code is well-documented and easy to understand, making it a useful resource for anyone working with RLP serialization in Go. ## Documentation for RLP Decoder Source Code

The RLP Decoder source code is a Go package that provides an interface for decoding RLP-encoded data. The package contains several functions and methods that are used to decode RLP-encoded data into Go data types.

### Function: makeStructDecoder

The `makeStructDecoder` function is used to create a decoder for a given struct type. It takes a `reflect.Type` as input and returns a `decoder` and an `error`. The `decoder` is a function that is used to decode RLP-encoded data into a struct of the given type. The `error` is returned if there is an error while generating the decoder.

### Function: decodeListSlice

The `decodeListSlice` function is used to decode a list of RLP-encoded data into a slice of a given type. It takes a `Stream`, a `reflect.Value`, and a `decoder` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data. The `decoder` is a function that is used to decode each element of the list.

### Function: decodeSliceElems

The `decodeSliceElems` function is used to decode the elements of a list of RLP-encoded data into a slice of a given type. It takes a `Stream`, a `reflect.Value`, and a `decoder` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data. The `decoder` is a function that is used to decode each element of the list.

### Function: decodeListArray

The `decodeListArray` function is used to decode a list of RLP-encoded data into an array of a given type. It takes a `Stream`, a `reflect.Value`, and a `decoder` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data. The `decoder` is a function that is used to decode each element of the list.

### Function: decodeByteSlice

The `decodeByteSlice` function is used to decode a byte slice of RLP-encoded data into a `reflect.Value`. It takes a `Stream` and a `reflect.Value` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data.

### Function: decodeByteArray

The `decodeByteArray` function is used to decode a byte array of RLP-encoded data into a `reflect.Value`. It takes a `Stream` and a `reflect.Value` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data.

### Function: makeListDecoder

The `makeListDecoder` function is used to create a decoder for a given list type. It takes a `reflect.Type` as input and returns a `decoder` and an `error`. The `decoder` is a function that is used to decode RLP-encoded data into a list of the given type. The `error` is returned if there is an error while generating the decoder.

### Function: makeDecoder

The `makeDecoder` function is used to create a decoder for a given type. It takes a `reflect.Type` as input and returns a `decoder` and an `error`. The `decoder` is a function that is used to decode RLP-encoded data into the given type. The `error` is returned if there is an error while generating the decoder.

### Function: decode

The `decode` function is used to decode RLP-encoded data into a Go data type. It takes a `Stream` and a `reflect.Value` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data.

### Function: decodeValue

The `decodeValue` function is used to decode RLP-encoded data into a Go data type. It takes a `Stream` and a `reflect.Value` as input. The `Stream` is used to read the RLP-encoded data. The `reflect.Value` is used to store the decoded data.

### Function: decodeValueBytes

The `decodeValueBytes` function is used to decode RLP-encoded data into a byte slice. It takes a `Stream` as input and returns a byte slice.

### Function: decodeValueString

The `decodeValueString` function is used to decode RLP-encoded data into a string. It takes a `Stream` as input and returns a string.

### Function: decodeValueInt

The `decodeValueInt` function is used to decode RLP-encoded data into an integer. It takes a `Stream` as input and returns an integer.

### Function: decodeValueUint

The `decodeValueUint` function is used to decode RLP-encoded data into an unsigned integer. It takes a `Stream` as input and returns an unsigned integer.

### Function: decodeValueBool

The `decodeValueBool` function is used to decode RLP-encoded data into a boolean. It takes a `Stream` as input and returns a boolean.

### Function: decodeValueFloat

The `decodeValueFloat` function is used to decode RLP-encoded data into a float. It takes a `Stream` as input and returns a float.

### Function: decodeValueBigInt

The `decodeValueBigInt` function is used to decode RLP-encoded data into a big integer. It takes a `Stream` as input and returns a big integer.

### Function: decodeValueSlice

The `decodeValueSlice` function is used to decode RLP-encoded data into a slice. It takes a `Stream` as input and returns a slice.

### Function: decodeValueArray

The `decodeValueArray` function is used to decode RLP-encoded data into an array. It takes a `Stream` as input and returns an array.

### Function: decodeValueMap

The `decodeValueMap` function is used to decode RLP-encoded data into a map. It takes a `Stream` as input and returns a map.

### Function: decodeValueStruct

The `decodeValueStruct` function is used to decode RLP-encoded data into a struct. It takes a `Stream` as input and returns a struct.

### Function: byteArrayBytes

The `byteArrayBytes` function is used to convert a byte array to a byte slice. It takes a `reflect.Value` and a `int` as input and returns a byte slice. ## Documentation for RLP Decoder Source Code

The RLP Decoder source code is a Go package that provides an interface for decoding RLP-encoded data. The package contains several functions and variables that are used to decode RLP-encoded data into Go values.

### `structFields(typ)`

This function takes a `reflect.Type` argument and returns a decoder function that can decode RLP-encoded data into a struct. The function first checks if there are any decoding errors in the struct fields. If there are no errors, the function decodes the RLP-encoded data into the struct using the `Stream` type. If there are too few elements in the RLP-encoded data, the function returns an error. If there are any other errors, the function returns an error with the field name that caused the error.

### `zeroFields(structval reflect.Value, fields []field)`

This function takes a `reflect.Value` argument and a slice of `field` structs. The function sets all the fields in the slice to their zero values.

### `makePtrDecoder(typ reflect.Type, tag rlpstruct.Tags)`

This function takes a `reflect.Type` argument and a `rlpstruct.Tags` argument and returns a decoder function that can decode RLP-encoded data into a pointer. The function first checks if there are any decoding errors in the pointer's element type. If there are no errors and the `NilOK` tag is not set, the function returns a simple pointer decoder. If the `NilOK` tag is set, the function returns a nil pointer decoder.

### `makeSimplePtrDecoder(etype reflect.Type, etypeinfo *typeinfo)`

This function takes a `reflect.Type` argument and a `*typeinfo` argument and returns a decoder function that can decode RLP-encoded data into a pointer. The function first checks if the pointer is nil. If the pointer is nil, the function creates a new pointer and decodes the RLP-encoded data into the new pointer. If the pointer is not nil, the function decodes the RLP-encoded data into the existing pointer.

### `makeNilPtrDecoder(etype reflect.Type, etypeinfo *typeinfo, ts rlpstruct.Tags)`

This function takes a `reflect.Type` argument, a `*typeinfo` argument, and a `rlpstruct.Tags` argument and returns a decoder function that can decode RLP-encoded data into a nil pointer. The function first determines the value kind that results in a nil pointer. If the RLP-encoded data is empty, the function returns a nil pointer. If the RLP-encoded data is not empty, the function decodes the RLP-encoded data into a new pointer.

### `decodeInterface(s *Stream, val reflect.Value)`

This function takes a `Stream` argument and a `reflect.Value` argument and decodes RLP-encoded data into an interface. The function first checks if the type is RLP-serializable. If the RLP-encoded data is a list, the function decodes the list into a slice of interfaces. If the RLP-encoded data is not a list, the function decodes the data into a byte slice.

### `decodeDecoder(s *Stream, val reflect.Value)`

This function takes a `Stream` argument and a `reflect.Value` argument and decodes RLP-encoded data into a decoder. The function returns the address of the decoder. ## RLP Package Documentation

The RLP package provides an interface for encoding and decoding data in Recursive Length Prefix (RLP) format. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

### Types

#### Kind

`Kind` represents the kind of value contained in an RLP stream. It is an integer type with three possible values: `Byte`, `String`, and `List`. 

#### ByteReader

`ByteReader` is an interface that must be implemented by any input reader for a `Stream`. It is implemented by `bufio.Reader` and `bytes.Reader`.

#### Stream

`Stream` can be used for piecemeal decoding of an input stream. It is useful if the input is very large or if the decoding rules for a type depend on the input structure. `Stream` does not keep an internal buffer. After decoding a value, the input reader will be positioned just before the type information for the next value.

When decoding a list and the input position reaches the declared length of the list, all operations will return error `EOL`. The end of the list must be acknowledged using `ListEnd` to continue reading the enclosing list.

`Stream` is not safe for concurrent use.

### Functions

#### NewStream

`NewStream` creates a new decoding stream reading from `r`. If `r` implements the `ByteReader` interface, `Stream` will not introduce any buffering.

For non-toplevel values, `Stream` returns `ErrElemTooLarge` for values that do not fit into the enclosing list.

`Stream` supports an optional input limit. If a limit is set, the size of any toplevel value will be checked against the remaining input length. `Stream` operations that encounter a value exceeding the remaining input length will return `ErrValueTooLarge`. The limit can be set by passing a non-zero value for `inputLimit`.

If `r` is a `bytes.Reader` or `strings.Reader`, the input limit is set to the length of `r`'s underlying data unless an explicit limit is provided.

#### NewListStream

`NewListStream` creates a new stream that pretends to be positioned at an encoded list of the given length.

#### Bytes

`Bytes` reads an RLP string and returns its contents as a byte slice. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`.

#### ReadBytes

`ReadBytes` decodes the next RLP value and stores the result in `b`. The value size must match `len(b)` exactly. ## Documentation for RLP Package

The RLP package provides an implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. The RLP algorithm is used to encode and decode arbitrary data structures in a compact and efficient way. The package provides a `Stream` type that can be used to read and write RLP-encoded data.

### Stream Type

The `Stream` type is the main type in the RLP package. It provides methods for reading and writing RLP-encoded data. The `Stream` type has the following methods:

#### Kind

The `Kind` method reads the RLP type information for the next value in the stream and returns the type, size, and an error if any. The `Kind` method has the following signature:

```go
func (s *Stream) Kind() (kind Kind, size uint64, err error)
```

#### String

The `String` method reads an RLP-encoded string from the stream and stores it in the provided byte slice. The `String` method has the following signature:

```go
func (s *Stream) String(b []byte) error
```

#### Raw

The `Raw` method reads a raw encoded value including RLP type information. The `Raw` method has the following signature:

```go
func (s *Stream) Raw() ([]byte, error)
```

#### Uint

The `Uint` method reads an RLP string of up to 8 bytes and returns its contents as an unsigned integer. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Uint` method has the following signature:

```go
func (s *Stream) Uint() (uint64, error)
```

#### Uint64

The `Uint64` method reads an RLP string of up to 8 bytes and returns its contents as an unsigned 64-bit integer. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Uint64` method has the following signature:

```go
func (s *Stream) Uint64() (uint64, error)
```

#### Uint32

The `Uint32` method reads an RLP string of up to 4 bytes and returns its contents as an unsigned 32-bit integer. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Uint32` method has the following signature:

```go
func (s *Stream) Uint32() (uint32, error)
```

#### Uint16

The `Uint16` method reads an RLP string of up to 2 bytes and returns its contents as an unsigned 16-bit integer. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Uint16` method has the following signature:

```go
func (s *Stream) Uint16() (uint16, error)
```

#### Uint8

The `Uint8` method reads an RLP string of up to 1 byte and returns its contents as an unsigned 8-bit integer. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Uint8` method has the following signature:

```go
func (s *Stream) Uint8() (uint8, error)
```

#### Bool

The `Bool` method reads an RLP string of up to 1 byte and returns its contents as a boolean. If the input does not contain an RLP string, the returned error will be `ErrExpectedString`. The `Bool` method has the following signature:

```go
func (s *Stream) Bool() (bool, error)
```

#### List

The `List` method starts decoding an RLP list. If the input does not contain a list, the returned error will be `ErrExpectedList`. When the list's end has been reached, any Stream operation will return EOL. The `List` method has the following signature:

```go
func (s *Stream) List() (size uint64, err error)
```

#### ListEnd

The `ListEnd` method returns to the enclosing list. The input reader must be positioned at the end of a list. The `ListEnd` method has the following signature:

```go
func (s *Stream) ListEnd() error
```

### Conclusion

The RLP package provides a simple and efficient way to encode and decode arbitrary data structures. The `Stream` type provides a convenient interface for reading and writing RLP-encoded data. The package is well-documented and easy to use. ## rrNotAtEOL

The `rrNotAtEOL` function checks if the current byte is not the end of line character. It returns an error if the current byte is the end of line character.

## MoreDataInList

The `MoreDataInList` function reports whether the current list context contains more data to be read. It returns a boolean value indicating whether there is more data to be read.

## BigInt

The `BigInt` function decodes an arbitrary-size integer value. It returns a pointer to a `big.Int` value and an error. The `big.Int` value is the decoded integer value. The error is non-nil if there was an error decoding the integer value.

## decodeBigInt

The `decodeBigInt` function decodes an arbitrary-size integer value and stores the result in the `dst` parameter. It returns an error if there was an error decoding the integer value.

## ReadUint256

The `ReadUint256` function decodes the next value as a `uint256.Int` value and stores the result in the `dst` parameter. It returns an error if there was an error decoding the `uint256.Int` value.

## Decode

The `Decode` function decodes a value and stores the result in the value pointed to by `val`. It returns an error if there was an error decoding the value. The `val` parameter must be a pointer to the value to be decoded.

## Reset

The `Reset` function discards any information about the current decoding context and starts reading from `r`. It is meant to facilitate reuse of a preallocated `Stream` across many decoding operations. If `r` does not also implement `ByteReader`, `Stream` will do its own buffering. The `inputLimit` parameter specifies the maximum number of bytes to read from `r`. If `inputLimit` is zero, `Stream` will attempt to automatically discover the limit when reading from a byte slice. ## Documentation for the RLP package

The RLP package provides an implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

### Stream

The `Stream` type is the main type in the RLP package. It provides methods for encoding and decoding RLP data. The `Stream` type implements the `ByteReader` interface, which is used to read bytes from an input stream.

#### NewStream

The `NewStream` function creates a new `Stream` instance. It takes an optional `io.Reader` argument that specifies the input stream to read from.

#### Reset

The `Reset` method resets the `Stream` instance to its initial state. It takes an optional `io.Reader` argument that specifies the input stream to read from.

#### Kind

The `Kind` method returns the kind and size of the next value in the input stream. The returned size is the number of bytes that make up the value. For kind == Byte, the size is zero because the value is contained in the type tag. The first call to `Kind` will read size information from the input reader and leave it positioned at the start of the actual bytes of the value. Subsequent calls to `Kind` (until the value is decoded) will not advance the input reader and return cached information.

#### readKind

The `readKind` method reads the kind and size of the next value in the input stream. It returns the kind, size, and an error if one occurred.

#### readByte

The `readByte` method reads a single byte from the input stream. It returns the byte and an error if one occurred.

### Encoding

The `Stream` type provides several methods for encoding RLP data.

#### EncodeByte

The `EncodeByte` method encodes a single byte value.

#### EncodeString

The `EncodeString` method encodes a string value.

#### EncodeList

The `EncodeList` method encodes a list of values.

### Decoding

The `Stream` type provides several methods for decoding RLP data.

#### DecodeByte

The `DecodeByte` method decodes a single byte value.

#### DecodeString

The `DecodeString` method decodes a string value.

#### DecodeList

The `DecodeList` method decodes a list of values.

### Conclusion

The RLP package provides a simple and efficient implementation of the RLP encoding and decoding algorithm. It is easy to use and provides a flexible API for encoding and decoding RLP data. # RLP Encoding Functions

The functions in this codebase are used for RLP (Recursive Length Prefix) encoding, which is a method of encoding arbitrary data structures in a compact and efficient way. The RLP encoding is used in Ethereum to encode transactions, blocks, and other data structures.

## `func (s *Stream) Next() (kind Kind, size uint64, err error)`

This function reads the next item from the RLP stream and returns its kind, size, and any errors encountered. The `kind` value is an enumeration of the possible RLP item types (`String`, `List`, or `Uint`), the `size` value is the length of the item in bytes, and the `err` value is any error encountered during decoding.

## `func (s *Stream) readUint(size byte) (uint64, error)`

This function reads an unsigned integer of the specified size from the RLP stream and returns its value as a `uint64`. The `size` parameter is the number of bytes to read, and must be between 1 and 8. If the value is less than 8 bytes, the function pads the value with zeros on the left. If the value is zero, the function returns an error.

## `func (s *Stream) readFull(buf []byte) (err error)`

This function reads the specified number of bytes from the RLP stream into the provided buffer. If the stream does not contain enough bytes to fill the buffer, the function returns an error.

## `func (s *Stream) readByte() (byte, error)`

This function reads a single byte from the RLP stream and returns its value as a `byte`. If the stream does not contain a byte to read, the function returns an error.

## `func (s *Stream) willRead(n uint64) error`

This function is called before any read from the RLP stream. It checks the size of the read against size limits, and updates the limits if the read does not overflow them. If the read would exceed the size limits, the function returns an error.

## `func (s *Stream) listLimit() (inList bool, limit uint64)`

This function returns the amount of data remaining in the innermost list. If there is no innermost list, the function returns `false` for `inList` and `0` for `limit`. If there is an innermost list, the function returns `true` for `inList` and the remaining size of the list for `limit`.