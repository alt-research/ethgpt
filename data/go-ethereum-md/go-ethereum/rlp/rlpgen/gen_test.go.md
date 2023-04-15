# RLP Package

The RLP package is a Go implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. It provides functions for encoding and decoding RLP data, as well as a decoding stream for reading RLP data from an io.Reader.

## Functions

### Decode

```go
func Decode(r io.Reader, val interface{}) error
```

Decode parses RLP-encoded data from r and stores the result in the value pointed to by val. Val must be a non-nil pointer. If r does not implement ByteReader, Decode will do its own buffering.

### DecodeBytes

```go
func DecodeBytes(b []byte, val interface{}) error
```

DecodeBytes parses RLP data from b into val. The input must contain exactly one value and no trailing data.

## Types

### Stream

```go
type Stream struct {
	r     io.Reader
	limit uint64
	buf   *bufio.Reader
}
```

Stream is an RLP decoding stream that reads from an io.Reader.

### Decoder

```go
type Decoder interface {
	DecodeRLP(*Stream) error
}
```

Decoder is an interface implemented by types that require custom RLP decoding rules or need to decode into private fields.

## Variables

### EOL

```go
var EOL = errors.New("rlp: end of list")
```

EOL is an error returned when the end of the current list has been reached during streaming.

### ErrExpectedString

```go
var ErrExpectedString = errors.New("rlp: expected String or Byte")
```

ErrExpectedString is an error returned when an RLP value is expected to be a string or byte.

### ErrExpectedList

```go
var ErrExpectedList = errors.New("rlp: expected List")
```

ErrExpectedList is an error returned when an RLP value is expected to be a list.

### ErrCanonInt

```go
var ErrCanonInt = errors.New("rlp: non-canonical integer format")
```

ErrCanonInt is an error returned when an RLP integer is not in canonical format.

### ErrCanonSize

```go
var ErrCanonSize = errors.New("rlp: non-canonical size information")
```

ErrCanonSize is an error returned when an RLP size is not in canonical format.

### ErrElemTooLarge

```go
var ErrElemTooLarge = errors.New("rlp: element is larger than containing list")
```

ErrElemTooLarge is an error returned when an RLP element is larger than its containing list.

### ErrValueTooLarge

```go
var ErrValueTooLarge = errors.New("rlp: value size exceeds available input length")
```

ErrValueTooLarge is an error returned when an RLP value size exceeds the available input length.

### ErrMoreThanOneValue

```go
var ErrMoreThanOneValue = errors.New("rlp: input contains more than one value")
```

ErrMoreThanOneValue is an error returned when an RLP input contains more than one value.

### errNotInList

```go
var