## Package: common

The `common` package provides common types and functions used throughout the Ethereum codebase.

### Constants

- `HashLength`: The expected length of a hash in bytes.
- `AddressLength`: The expected length of an address in bytes.

### Types

#### Type: Hash

The `Hash` type represents the 32-byte Keccak256 hash of arbitrary data.

##### Functions

- `BytesToHash(b []byte) Hash`: Sets `b` to `Hash`. If `b` is larger than `len(h)`, `b` will be cropped from the left.
- `BigToHash(b *big.Int) Hash`: Sets the byte representation of `b` to `Hash`. If `b` is larger than `len(h)`, `b` will be cropped from the left.
- `HexToHash(s string) Hash`: Sets the byte representation of `s` to `Hash`. If `b` is larger than `len(h)`, `b` will be cropped from the left.
- `Bytes() []byte`: Gets the byte representation of the underlying hash.
- `Big() *big.Int`: Converts a `Hash` to a big integer.
- `Hex() string`: Converts a `Hash` to a hex string.
- `TerminalString() string`: Implements `log.TerminalStringer`, formatting a string for console output during logging.
- `String() string`: Implements the `stringer` interface and is used also by the logger when doing full logging into a file.
- `Format(s fmt.State, c rune)`: Implements `fmt.Formatter`. `Hash` supports the `%v`, `%s`, `%q`, `%x`, `%X`, and `%d` format verbs.
- `UnmarshalText(input []byte) error`: Parses a `Hash` in hex syntax.
- `UnmarshalJSON(input []byte) error`: Parses a `Hash` in hex syntax.
- `MarshalText() ([]byte, error)`: Returns the hex representation of `Hash`.
- `SetBytes(b []byte)`: Sets `Hash` to the value of `b`. If `b` is larger than `len(h)`, `b` will be cropped from the left.

#### Type: Address

The `Address` type represents a 20-byte Ethereum address.

##### Functions

- `Bytes() []byte`: Gets the byte representation of the underlying address.
- `Hex() string`: Converts an `Address` to a hex string.
- `String() string`: Implements the `stringer` interface and is used also by the logger when doing full logging into a file.
- `Format(s fmt.State, c rune)`: Implements `fmt.Formatter`. `Address` supports the `%v`, `%s`, `%q`, `%x`, `%X`, and `%d` format verbs.
- `UnmarshalText(input []byte) error`: Parses an `Address` in hex syntax.
- `UnmarshalJSON(input []byte) error`: Parses an `Address` in hex syntax.
- `MarshalText() ([]byte, error)`: Returns the hex representation of `Address`.
- `SetBytes(b []byte)`: Sets `Address` to the value of `b`. If `b` is larger than `len(a)`, `b` will be cropped from the left.

### Variables

- `hashT`: A `reflect.Type` representing the `Hash` type.
- `addressT`: A `reflect.Type` representing the `Address` type.

### Functions

- `Keccak256(data ...[]byte) []byte`: Returns the Keccak256 hash of the concatenated `data` slices.
- `RandomBytes(n int) []byte`: Returns a slice of `n` random bytes.
- `RandomHex(n int) string`: Returns a hex string of `n` random bytes.
- `ToHex(b []byte) string`: Returns a hex string of `b`.
- `FromHex(s string) []byte`: Returns a byte slice of the hex string `s`.
- `ToAddress(b []byte) Address`: Returns an `Address` from a byte slice `b`.
- `ToBytes(a Address) []byte`: Returns a byte slice from an `Address` `a`.
- `IsHexAddress(s string) bool`: Returns a boolean indicating if the string `s` is a valid hex-encoded Ethereum address.
- `NewHash(data ...[]byte) Hash`: Returns the Keccak256 hash of the concatenated `data` slices as a `Hash`.
- `NewAddress(b []byte) Address`: Returns an `Address` from a byte slice `b`.
- `NewHashFromHex(s string) Hash`: Returns a `Hash` from a hex string `s`.
- `NewAddressFromHex(s string) Address`: Returns an `Address` from a hex string `s`.
- `NewHashFromBytes(b []byte) Hash`: Returns a `Hash` from a byte slice `b`.
- `NewAddressFromBytes(b []byte) Address`: Returns an `Address` from a byte slice `b`.
- `NewZeroHash() Hash`: Returns a `Hash` with all bytes set to zero.
- `NewZeroAddress() Address`: Returns an `Address` with all bytes set to zero.
- `NewHasher() hash.Hash`: Returns a new `sha3` hash function. ## Struct: Hash

The `Hash` struct represents a 32-byte hash value. It provides methods for setting the hash value from a byte slice, generating a random hash value, scanning a hash value from a database query result, and implementing GraphQL and database/sql interfaces. It also provides a method for unmarshaling a hash value from a GraphQL query data.

### Fields

- `HashLength int`: An integer representing the length of the hash value.

### Methods

#### Method: SetBytes

The `SetBytes` method sets the hash value from a byte slice. If the byte slice is larger than the hash length, it is cropped from the left.

##### Parameters

- `b []byte`: A byte slice.

##### Example

```go
var h Hash
h.SetBytes([]byte{0x01, 0x02, 0x03})
```

#### Method: Generate

The `Generate` method generates a random hash value. It implements the `testing/quick.Generator` interface.

##### Parameters

- `rand *rand.Rand`: A `rand.Rand` instance.
- `size int`: An integer representing the size of the generated value.

##### Returns

- `reflect.Value`: A `reflect.Value` instance representing the generated hash value.

##### Example

```go
var h Hash
h.Generate(rand.New(rand.NewSource(0)), 10)
```

#### Method: Scan

The `Scan` method scans a hash value from a database query result. It implements the `Scanner` interface for database/sql.

##### Parameters

- `src interface{}`: An interface representing the query result.

##### Returns

- `error`: An error if there is an issue scanning the hash value.

##### Example

```go
var h Hash
err := h.Scan([]byte{0x01, 0x02, 0x03})
```

#### Method: Value

The `Value` method returns the hash value as a driver value. It implements the `valuer` interface for database/sql.

##### Returns

- `driver.Value`: A driver value representing the hash value.
- `error`: An error if there is an issue getting the driver value.

##### Example

```go
var h Hash
value, err := h.Value()
```

#### Method: ImplementsGraphQLType

The `ImplementsGraphQLType` method returns true if the `Hash` struct implements the specified GraphQL type.

##### Parameters

- `name string`: A string representing the GraphQL type.

##### Returns

- `bool`: A boolean indicating if the `Hash` struct implements the specified GraphQL type.

##### Example

```go
var h Hash
h.ImplementsGraphQLType("Bytes32")
```

#### Method: UnmarshalGraphQL

The `UnmarshalGraphQL` method unmarshals the provided GraphQL query data.

##### Parameters

- `input interface{}`: An interface representing the GraphQL query data.

##### Returns

- `error`: An error if there is an issue unmarshaling the GraphQL query data.

##### Example

```go
var h Hash
err := h.UnmarshalGraphQL("0x01")
```

## Struct: UnprefixedHash

The `UnprefixedHash` struct allows marshaling a `Hash` struct without the `0x` prefix. It provides methods for unmarshaling and marshaling the hash value as text.

### Methods

#### Method: UnmarshalText

The `UnmarshalText` method decodes the hash value from hex. The `0x` prefix is optional.

##### Parameters

- `input []byte`: A byte slice representing the hex-encoded hash value.

##### Returns

- `error`: An error if there is an issue unmarshaling the hash value.

##### Example

```go
var h UnprefixedHash
err := h.UnmarshalText([]byte("01"))
```

#### Method: MarshalText

The `MarshalText` method encodes the hash value as hex.

##### Returns

- `[]byte`: A byte slice representing the hex-encoded hash value.
- `error`: An error if there is an issue marshaling the hash value.

##### Example

```go
var h UnprefixedHash
text, err := h.MarshalText()
```

## Struct: Address

The `Address` struct represents a 20-byte Ethereum account address. It provides methods for converting the address to a hash, big integer, and hex string, and for verifying if a string can represent a valid hex-encoded Ethereum address.

### Fields

- `AddressLength int`: An integer representing the length of the address.

### Methods

#### Function: BytesToAddress

The `BytesToAddress` function returns an `Address` struct with the value of the provided byte slice. If the byte slice is larger than the address length, it is cropped from the left.

##### Parameters

- `b []byte`: A byte slice representing the address value.

##### Returns

- `Address`: An `Address` struct.

##### Example

```go
a := BytesToAddress([]byte{0x01, 0x02, 0x03})
```

#### Function: BigToAddress

The `BigToAddress` function returns an `Address` struct with the byte values of the provided big integer. If the big integer is larger than the address length, it is cropped from the left.

##### Parameters

- `b *big.Int`: A big integer.

##### Returns

- `Address`: An `Address` struct.

##### Example

```go
a := BigToAddress(big.NewInt(123))
```

#### Function: HexToAddress

The `HexToAddress` function returns an `Address` struct with the byte values of the provided hex string. If the hex string is larger than the address length, it is cropped from the left.

##### Parameters

- `s string`: A hex string representing the address value.

##### Returns

- `Address`: An `Address` struct.

##### Example

```go
a := HexToAddress("0x01")
```

#### Function: IsHexAddress

The `IsHexAddress` function verifies whether a string can represent a valid hex-encoded Ethereum address or not.

##### Parameters

- `s string`: A string representing the hex-encoded Ethereum address.

##### Returns

- `bool`: A boolean indicating if the string can represent a valid hex-encoded Ethereum address.

##### Example

```go
IsHexAddress("0x01")
```

#### Method: Bytes

The `Bytes` method gets the byte slice representation of the ## Function: checksumHex

The `checksumHex` function returns the hex representation of the address with a checksum appended to the end. It first creates a buffer with a length of 2 plus the length of the address and copies the string "0x" to the first two bytes of the buffer. It then encodes the address as hex and copies it to the remaining bytes of the buffer. Finally, it calculates the checksum of the address and appends it to the end of the buffer before returning the buffer.

### Parameters

None.

### Returns

- `[]byte`: A byte slice containing the hex representation of the address with a checksum appended to the end.

### Example

```go
addr := Address{}
hexAddr := addr.checksumHex()
```

## Method: Format

The `Format` method implements the `fmt.Formatter` interface for the `Address` type. It supports the `%v`, `%s`, `%q`, `%x`, `%X`, and `%d` format verbs. It checks the format verb and writes the appropriate representation of the address to the `fmt.State` object.

### Parameters

- `s fmt.State`: A `fmt.State` object.
- `c rune`: A rune representing the format verb.

### Returns

None.

### Example

```go
addr := Address{}
fmt.Printf("%v", addr) // 0x0000000000000000000000000000000000000000
```

## Method: SetBytes

The `SetBytes` method sets the address to the value of the byte slice passed as an argument. If the byte slice is larger than the length of the address, it is cropped from the left.

### Parameters

- `b []byte`: A byte slice.

### Returns

None.

### Example

```go
addr := Address{}
addr.SetBytes([]byte{0x01, 0x02, 0x03})
```

## Method: MarshalText

The `MarshalText` method returns the hex representation of the address as a byte slice.

### Parameters

None.

### Returns

- `[]byte`: A byte slice containing the hex representation of the address.

### Example

```go
addr := Address{}
hexAddr, _ := addr.MarshalText()
```

## Method: UnmarshalText

The `UnmarshalText` method parses a hex string and sets the address to the value of the parsed hex string.

### Parameters

- `input []byte`: A byte slice containing the hex string to parse.

### Returns

- `error`: An error if the input is not a valid hex string.

### Example

```go
addr := Address{}
err := addr.UnmarshalText([]byte("0x0000000000000000000000000000000000000000"))
```

## Method: UnmarshalJSON

The `UnmarshalJSON` method parses a JSON string and sets the address to the value of the parsed hex string.

### Parameters

- `input []byte`: A byte slice containing the JSON string to parse.

### Returns

- `error`: An error if the input is not a valid JSON string.

### Example

```go
addr := Address{}
err := addr.UnmarshalJSON([]byte(`"0x0000000000000000000000000000000000000000"`))
```

## Method: Scan

The `Scan` method implements the `Scanner` interface for the `Address` type. It scans the input and sets the address to the value of the scanned input.

### Parameters

- `src interface{}`: The input to scan.

### Returns

- `error`: An error if the input is not a valid byte slice.

### Example

```go
addr := Address{}
err := addr.Scan([]byte{0x01, 0x02, 0x03})
```

## Method: Value

The `Value` method implements the `valuer` interface for the `Address` type. It returns the address as a driver value.

### Parameters

None.

### Returns

- `driver.Value`: The address as a driver value.

### Example

```go
addr := Address{}
value, _ := addr.Value()
```

## Method: ImplementsGraphQLType

The `ImplementsGraphQLType` method returns true if the `Address` type implements the specified GraphQL type.

### Parameters

- `name string`: A string representing the GraphQL type.

### Returns

- `bool`: A boolean indicating if the `Address` type implements the specified GraphQL type.

### Example

```go
addr := Address{}
implementsType := addr.ImplementsGraphQLType("Address")
```

## Method: UnmarshalGraphQL

The `UnmarshalGraphQL` method unmarshals the provided GraphQL query data.

### Parameters

- `input interface{}`: The input to unmarshal.

### Returns

- `error`: An error if the input is not a valid string.

### Example

```go
addr := Address{}
err := addr.UnmarshalGraphQL("0x0000000000000000000000000000000000000000")
```

## Type: UnprefixedAddress

The `UnprefixedAddress` type allows marshaling an `Address` without the `0x` prefix.

### Example

```go
type Person struct {
    Address UnprefixedAddress `json:"address"`
}

p := Person{Address: UnprefixedAddress{}}
```

## Type: MixedcaseAddress

The `MixedcaseAddress` type retains the original string, which may or may not be correctly checksummed.

### Example

```go
type Person struct {
    Address MixedcaseAddress `json:"address"`
}

p := Person{Address: MixedcaseAddress{}}
``` ## Method: MarshalJSON

The `MarshalJSON` method marshals the original value of a `MixedcaseAddress` struct to JSON. If the original value starts with "0x" or "0X", it removes the prefix before marshaling. It returns a byte slice and an error.

### Parameters

- None

### Returns

- `[]byte`: A byte slice representing the JSON-encoded value of the original value of the `MixedcaseAddress` struct.
- `error`: An error if there is an issue with marshaling the value.

### Example

```go
mixedcaseAddr := MixedcaseAddress{original: "0xAbC123"}
jsonBytes, err := mixedcaseAddr.MarshalJSON()
if err != nil {
    log.Fatal(err)
}
```

## Method: Address

The `Address` method returns the `Address` value of the `MixedcaseAddress` struct.

### Parameters

- None

### Returns

- `Address`: An `Address` value.

### Example

```go
mixedcaseAddr := MixedcaseAddress{original: "0xAbC123"}
addr := mixedcaseAddr.Address()
```

## Method: String

The `String` method implements the `fmt.Stringer` interface for the `MixedcaseAddress` struct. It returns a string representation of the `MixedcaseAddress` struct. If the checksum is valid, it appends "[chksum ok]" to the end of the string. If the checksum is invalid, it appends "[chksum INVALID]" to the end of the string.

### Parameters

- None

### Returns

- `string`: A string representation of the `MixedcaseAddress` struct.

### Example

```go
mixedcaseAddr := MixedcaseAddress{original: "0xAbC123"}
str := mixedcaseAddr.String()
```

## Method: ValidChecksum

The `ValidChecksum` method returns a boolean indicating if the checksum of the `MixedcaseAddress` struct is valid. It compares the original value to the `Address` value of the struct.

### Parameters

- None

### Returns

- `bool`: A boolean indicating if the checksum is valid.

### Example

```go
mixedcaseAddr := MixedcaseAddress{original: "0xAbC123"}
valid := mixedcaseAddr.ValidChecksum()
```

## Method: Original

The `Original` method returns the mixed-case input string of the `MixedcaseAddress` struct.

### Parameters

- None

### Returns

- `string`: A string representing the mixed-case input string of the `MixedcaseAddress` struct.

### Example

```go
mixedcaseAddr := MixedcaseAddress{original: "0xAbC123"}
original := mixedcaseAddr.Original()
```