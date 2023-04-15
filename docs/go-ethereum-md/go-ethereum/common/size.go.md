## Type: StorageSize

The `StorageSize` type is a wrapper around a float value that supports user-friendly formatting. It is used to represent the size of storage in bytes.

### Example

```go
var size StorageSize = 1024 * 1024 * 1024
fmt.Println(size.String()) // "1.00 GiB"
```

## Method: String

The `String` method implements the `stringer` interface for the `StorageSize` type. It returns a string representation of the `StorageSize` value in a user-friendly format. If the value is greater than 1 TiB, it returns the value in TiB. If the value is greater than 1 GiB, it returns the value in GiB. If the value is greater than 1 MiB, it returns the value in MiB. If the value is greater than 1 KiB, it returns the value in KiB. Otherwise, it returns the value in bytes.

### Returns

- `string`: A string representation of the `StorageSize` value in a user-friendly format.

### Example

```go
var size StorageSize = 1024 * 1024 * 1024
fmt.Println(size.String()) // "1.00 GiB"
```

## Method: TerminalString

The `TerminalString` method implements the `log.TerminalStringer` interface for the `StorageSize` type. It returns a string representation of the `StorageSize` value in a format suitable for console output during logging. If the value is greater than 1 TiB, it returns the value in TiB. If the value is greater than 1 GiB, it returns the value in GiB. If the value is greater than 1 MiB, it returns the value in MiB. If the value is greater than 1 KiB, it returns the value in KiB. Otherwise, it returns the value in bytes.

### Returns

- `string`: A string representation of the `StorageSize` value in a format suitable for console output during logging.

### Example

```go
var size StorageSize = 1024 * 1024 * 1024
fmt.Println(size.TerminalString()) // "1.00GiB"
```