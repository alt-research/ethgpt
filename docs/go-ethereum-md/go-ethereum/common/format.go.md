## Package: common

The `common` package provides common utility functions and types used throughout the Ethereum codebase.

## Type: PrettyDuration

The `PrettyDuration` type is a custom type that represents a time duration with a pretty printed string representation. It is a wrapper around the `time.Duration` type.

### Example

```go
duration := time.Duration(1234567890)
prettyDuration := PrettyDuration(duration)
fmt.Println(prettyDuration.String()) // Output: 14m34s
```

## Type: PrettyAge

The `PrettyAge` type is a custom type that represents a time duration as a pretty printed age. It is a wrapper around the `time.Time` type.

### Example

```go
now := time.Now()
prettyAge := PrettyAge(now)
fmt.Println(prettyAge.String()) // Output: 0
```

## Function: (PrettyDuration) String

The `String` function is a method on the `PrettyDuration` type that returns a pretty printed string representation of the duration. It rounds the duration to three decimal places.

### Returns

- `string`: A pretty printed string representation of the duration.

### Example

```go
duration := time.Duration(1234567890)
prettyDuration := PrettyDuration(duration)
fmt.Println(prettyDuration.String()) // Output: 14m34s
```

## Function: (PrettyAge) String

The `String` function is a method on the `PrettyAge` type that returns a pretty printed string representation of the age. It rounds the age up to the most significant time unit, including days, weeks, and years.

### Returns

- `string`: A pretty printed string representation of the age.

### Example

```go
now := time.Now()
prettyAge := PrettyAge(now)
fmt.Println(prettyAge.String()) // Output: 0
```