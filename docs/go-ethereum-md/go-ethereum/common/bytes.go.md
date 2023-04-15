## Package: common

The `common` package contains various helper functions.

## Function: FromHex

The `FromHex` function takes a hexadecimal string and returns a byte slice. If the string is prefixed with "0x", the prefix is removed before decoding. If the length of the string is odd, a leading "0" is added before decoding.

### Parameters

- `s string`: A hexadecimal string.

### Returns

- `[]byte`: A byte slice.

### Example

```go
bytes := FromHex("0x68656c6c6f20776f726c64")
```

## Function: CopyBytes

The `CopyBytes` function takes a byte slice and returns an exact copy of the provided bytes.

### Parameters

- `b []byte`: A byte slice.

### Returns

- `[]byte`: A copied byte slice.

### Example

```go
original := []byte{1, 2, 3}
copied := CopyBytes(original)
```

## Function: has0xPrefix

The `has0xPrefix` function takes a string and returns a boolean indicating if the string begins with "0x" or "0X".

### Parameters

- `str string`: A string.

### Returns

- `bool`: A boolean indicating if the string begins with "0x" or "0X".

### Example

```go
hasPrefix := has0xPrefix("0x68656c6c6f20776f726c64")
```

## Function: isHexCharacter

The `isHexCharacter` function takes a byte and returns a boolean indicating if the byte is a valid hexadecimal character.

### Parameters

- `c byte`: A byte.

### Returns

- `bool`: A boolean indicating if the byte is a valid hexadecimal character.

### Example

```go
isHex := isHexCharacter('a')
```

## Function: isHex

The `isHex` function takes a string and returns a boolean indicating if each byte is a valid hexadecimal character.

### Parameters

- `str string`: A string.

### Returns

- `bool`: A boolean indicating if each byte is a valid hexadecimal character.

### Example

```go
isHex := isHex("68656c6c6f20776f726c64")
```

## Function: Bytes2Hex

The `Bytes2Hex` function takes a byte slice and returns the hexadecimal encoding of the bytes.

### Parameters

- `d []byte`: A byte slice.

### Returns

- `string`: A hexadecimal string.

### Example

```go
hex := Bytes2Hex([]byte{104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100})
```

## Function: Hex2Bytes

The `Hex2Bytes` function takes a hexadecimal string and returns the bytes represented by the string.

### Parameters

- `str string`: A hexadecimal string.

### Returns

- `[]byte`: A byte slice.

### Example

```go
bytes := Hex2Bytes("68656c6c6f20776f726c64")
```

## Function: Hex2BytesFixed

The `Hex2BytesFixed` function takes a hexadecimal string and a length and returns the bytes represented by the string. If the length of the resulting byte slice is greater than the specified length, the function returns the last `flen` bytes. If the length of the resulting byte slice is less than the specified length, the function zero-pads the byte slice to the left.

### Parameters

- `str string`: A hexadecimal string.
- `flen int`: The desired length of the resulting byte slice.

### Returns

- `[]byte`: A byte slice.

### Example

```go
bytes := Hex2BytesFixed("68656c6c6f20776f726c64", 10)
```

## Function: ParseHexOrString

The `ParseHexOrString` function takes a string and tries to decode it as a hexadecimal string. If the string is not a valid hexadecimal string, the function returns the raw bytes. If the string is a valid hexadecimal string, the function returns the decoded bytes.

### Parameters

- `str string`: A string.

### Returns

- `[]byte`: A byte slice.
- `error`: An error if there is an issue decoding the string.

### Example

```go
bytes, err := ParseHexOrString("68656c6c6f20776f726c64")
```

## Function: RightPadBytes

The `RightPadBytes` function takes a byte slice and a length and zero-pads the byte slice to the right up to the specified length.

### Parameters

- `slice []byte`: A byte slice.
- `l int`: The desired length of the resulting byte slice.

### Returns

- `[]byte`: A zero-padded byte slice.

### Example

```go
padded := RightPadBytes([]byte{1, 2, 3}, 5)
```

## Function: LeftPadBytes

The `LeftPadBytes` function takes a byte slice and a length and zero-pads the byte slice to the left up to the specified length.

### Parameters

- `slice []byte`: A byte slice.
- `l int`: The desired length of the resulting byte slice.

### Returns

- `[]byte`: A zero-padded byte slice.

### Example

```go
padded := LeftPadBytes([]byte{1, 2, 3}, 5)
```

## Function: TrimLeftZeroes

The `TrimLeftZeroes` function takes a byte slice and returns a subslice of the byte slice without leading zeroes.

### Parameters

- `s []byte`: A byte slice.

### Returns

- `[]byte`: A subslice of the byte slice without leading zeroes.

### Example

```go
trimmed := TrimLeftZeroes([]byte{0, 0, 1, 2, 3})
```

## Function: TrimRightZeroes

The `TrimRightZeroes` function takes a byte slice and returns a subslice of the byte slice without trailing zeroes.

### Parameters

- `s []byte`: A byte slice.

### Returns

- `[]byte`: A subslice of the byte slice without trailing zeroes.

### Example

```go