# ABI Package

The `abi` package provides a set of functions for encoding and decoding data according to the Ethereum Application Binary Interface (ABI). The package is used to encode and decode data for smart contract function calls and events.

## Functions

### formatSliceString

```go
func formatSliceString(kind reflect.Kind, sliceSize int) string
```

`formatSliceString` formats the reflection kind with the given slice size and returns a formatted string representation.

### sliceTypeCheck

```go
func sliceTypeCheck(t Type, val reflect.Value) error
```

`sliceTypeCheck` checks that the given slice can be assigned to the reflection type in `t`.

### typeCheck

```go
func typeCheck(t Type, value reflect.Value) error
```

`typeCheck` checks that the given reflection value can be assigned to the reflection type in `t`.

### typeErr

```go
func typeErr(expected, got interface{}) error
```

`typeErr` returns a formatted type casting error.

## Variables

### errBadBool

```go
var errBadBool = errors.New("abi: improperly encoded boolean value")
```

`errBadBool` is an error returned when a boolean value is improperly encoded.

### errBadUint8

```go
var errBadUint8 = errors.New("abi: improperly encoded uint8 value")
```

`errBadUint8` is an error returned when a uint8 value is improperly encoded.

### errBadUint16

```go
var errBadUint16 = errors.New("abi: improperly encoded uint16 value")
```

`errBadUint16` is an error returned when a uint16 value is improperly encoded.

### errBadUint32

```go
var errBadUint32 = errors.New("abi: improperly encoded uint32 value")
```

`errBadUint32` is an error returned when a uint32 value is improperly encoded.

### errBadUint64

```go
var errBadUint64 = errors.New("abi: improperly encoded uint64 value")
```

`errBadUint64` is an error returned when a uint64 value is improperly encoded.

### errBadInt8

```go
var errBadInt8 = errors.New("abi: improperly encoded int8 value")
```

`errBadInt8` is an error returned when an int8 value is improperly encoded.

### errBadInt16

```go
var errBadInt16 = errors.New("abi: improperly encoded int16 value")
```

`errBadInt16` is an error returned when an int16 value is improperly encoded.

### errBadInt32

```go
var errBadInt32 = errors.New("abi: improperly encoded int32 value")
```

`errBadInt32` is an error returned when an int32 value is improperly encoded.

### errBadInt64

```go
var errBadInt64 = errors.New("abi: improperly encoded int64 value")
```

`errBadInt64` is an error returned when an int64 value is improperly encoded.