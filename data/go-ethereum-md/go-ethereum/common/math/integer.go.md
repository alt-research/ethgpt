## Math Package Documentation

This package provides various mathematical functions and constants for use in Go programs.

### Constants

The following constants are defined in this package:

- `MaxInt8`: The maximum value of a signed 8-bit integer.
- `MinInt8`: The minimum value of a signed 8-bit integer.
- `MaxInt16`: The maximum value of a signed 16-bit integer.
- `MinInt16`: The minimum value of a signed 16-bit integer.
- `MaxInt32`: The maximum value of a signed 32-bit integer.
- `MinInt32`: The minimum value of a signed 32-bit integer.
- `MaxInt64`: The maximum value of a signed 64-bit integer.
- `MinInt64`: The minimum value of a signed 64-bit integer.
- `MaxUint8`: The maximum value of an unsigned 8-bit integer.
- `MaxUint16`: The maximum value of an unsigned 16-bit integer.
- `MaxUint32`: The maximum value of an unsigned 32-bit integer.
- `MaxUint64`: The maximum value of an unsigned 64-bit integer.

### Types

The following custom types are defined in this package:

#### `HexOrDecimal64`

This type is used to marshal a `uint64` as either a hexadecimal or decimal value.

##### `UnmarshalJSON`

This method implements the `json.Unmarshaler` interface and unmarshals a JSON-encoded `HexOrDecimal64` value.

##### `UnmarshalText`

This method implements the `encoding.TextUnmarshaler` interface and unmarshals a text-encoded `HexOrDecimal64` value.

##### `MarshalText`

This method implements the `encoding.TextMarshaler` interface and marshals a `HexOrDecimal64` value as a text-encoded string.

#### Functions

The following functions are defined in this package:

##### `ParseUint64`

This function parses a string as an integer in decimal or hexadecimal syntax. Leading zeros are accepted. The empty string parses as zero.

```go
func ParseUint64(s string) (uint64, bool)
```

- `s`: The string to parse.
- Returns:
  - `uint64`: The parsed integer value.
  - `bool`: `true` if the string was successfully parsed, `false` otherwise.

##### `MustParseUint64`

This function parses a string as an integer and panics if the string is invalid.

```go
func MustParseUint64(s string) uint64
```

- `s`: The string to parse.
- Returns:
  - `uint64`: The parsed integer value.

##### `SafeSub`

This function returns the difference of two `uint64` values and checks for overflow.

```go
func SafeSub(x, y uint64) (uint64, bool)
```

- `x`: The first value.
- `y`: The second value.
- Returns:
  - `uint64`: The difference of `x` and `y`.
  - `bool`: `true` if an overflow occurred, `false` otherwise.

##### `SafeAdd`

This function returns the sum of two `uint64` values and checks for overflow.

```go
func SafeAdd(x, y uint64) (uint64, bool)
```

- `x`: The first value.
- `y`: The second value.
- Returns:
  - `uint64`: The sum of `x` and `y`.
  - `bool`: `true` if an overflow occurred, `false` otherwise.

##### `SafeMul`

This function returns the product of two `uint64` values and checks for overflow.

```go
func SafeMul(x, y uint64) (uint64, bool)
```

- `x`: The first value.
- `y`: The second value.
- Returns:
  - `uint64`: The product of `x` and `y`.
  - `bool`: `true` if an overflow occurred, `false` otherwise.