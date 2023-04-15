# Log Package

The `log` package provides functions for formatting and sanitizing log messages.

## Functions

### TestPrettyInt64

```go
func TestPrettyInt64(t *testing.T)
```

TestPrettyInt64 tests the `FormatLogfmtInt64` function, which formats an `int64` value as a string with commas separating groups of three digits.

### TestPrettyUint64

```go
func TestPrettyUint64(t *testing.T)
```

TestPrettyUint64 tests the `FormatLogfmtUint64` function, which formats a `uint64` value as a string with commas separating groups of three digits.

### TestPrettyBigInt

```go
func TestPrettyBigInt(t *testing.T)
```

TestPrettyBigInt tests the `formatLogfmtBigInt` function, which formats a `*big.Int` value as a string with commas separating groups of three digits.

### TestPrettyUint256

```go
func TestPrettyUint256(t *testing.T)
```

TestPrettyUint256 tests the `formatLogfmtUint256` function, which formats a `*uint256.Int` value as a string with commas separating groups of three digits.

### BenchmarkPrettyInt64Logfmt

```go
func BenchmarkPrettyInt64Logfmt(b *testing.B)
```

BenchmarkPrettyInt64Logfmt benchmarks the `FormatLogfmtInt64` function by formatting a random `int64` value `b.N` times.

### BenchmarkPrettyUint64Logfmt

```go
func BenchmarkPrettyUint64Logfmt(b *testing.B)
```

BenchmarkPrettyUint64Logfmt benchmarks the `FormatLogfmtUint64` function by formatting a random `uint64` value `b.N` times.

### TestSanitation

```go
func TestSanitation(t *testing.T)
```

TestSanitation tests the log message sanitization performed by the `log` package. It tests various types of messages, including messages with special characters, spaces, and newlines. The test ensures that the sanitized message is correctly formatted and does not contain any special characters that could cause issues when logging.