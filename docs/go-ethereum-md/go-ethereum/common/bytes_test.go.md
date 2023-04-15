## Package common

The `common` package provides common functions and types used throughout the Ethereum codebase.

### Functions

#### Function: CopyBytes

The `CopyBytes` function takes a byte slice and returns a copy of the slice. It checks if the copy is equal to the original slice and returns an error if they are equal.

##### Parameters

- `input []byte`: A byte slice.

##### Returns

- `[]byte`: A copy of the byte slice.

##### Example

```go
input := []byte{1, 2, 3, 4}
v := CopyBytes(input)
```

#### Function: LeftPadBytes

The `LeftPadBytes` function takes a byte slice and a length and returns a new byte slice padded with zeros on the left to the specified length. If the length is less than or equal to the length of the input slice, the function returns the input slice.

##### Parameters

- `val []byte`: A byte slice.
- `length int`: An integer representing the desired length of the padded byte slice.

##### Returns

- `[]byte`: A new byte slice padded with zeros on the left to the specified length.

##### Example

```go
val := []byte{1, 2, 3, 4}
padded := LeftPadBytes(val, 8)
```

#### Function: RightPadBytes

The `RightPadBytes` function takes a byte slice and a length and returns a new byte slice padded with zeros on the right to the specified length. If the length is less than or equal to the length of the input slice, the function returns the input slice.

##### Parameters

- `val []byte`: A byte slice.
- `length int`: An integer representing the desired length of the padded byte slice.

##### Returns

- `[]byte`: A new byte slice padded with zeros on the right to the specified length.

##### Example

```go
val := []byte{1, 2, 3, 4}
padded := RightPadBytes(val, 8)
```

#### Function: FromHex

The `FromHex` function takes a hex string and returns a byte slice. The hex string can have a `0x` prefix or not.

##### Parameters

- `input string`: A hex string.

##### Returns

- `[]byte`: A byte slice.

##### Example

```go
input := "0x01"
result := FromHex(input)
```

#### Function: IsHex

The `IsHex` function takes a string and returns a boolean indicating if the string is a valid hex string. The string can have a `0x` prefix or not.

##### Parameters

- `input string`: A string.

##### Returns

- `bool`: A boolean indicating if the string is a valid hex string.

##### Example

```go
input := "a9e67e"
ok := IsHex(input)
```

#### Function: TrimRightZeroes

The `TrimRightZeroes` function takes a byte slice and returns a new byte slice with any trailing zero bytes removed.

##### Parameters

- `arr []byte`: A byte slice.

##### Returns

- `[]byte`: A new byte slice with any trailing zero bytes removed.

##### Example

```go
arr := []byte{0x00, 0xff, 0x00, 0x00, 0xff, 0x00, 0x00}
trimmed := TrimRightZeroes(arr)
```