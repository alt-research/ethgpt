# Main Package

The `main` package provides a test for message signing and verification using `ethkey`.

## TestMessageSignVerify Function

The `TestMessageSignVerify` function tests message signing and verification using `ethkey`. It has the following signature:

```go
func TestMessageSignVerify(t *testing.T)
```

### Parameters

- `t`: The testing.T instance.

### Return Value

The function does not return anything.

The function performs the following steps:

1. Creates a temporary directory.
2. Generates a key using `ethkey`.
3. Signs a test message using the generated key.
4. Verifies the signed message using the recovered public key and address.

If the recovered address does not match the generated key, the function reports an error.

## runEthkey Function

The `runEthkey` function runs `ethkey` with the given arguments and returns a `Cmd` instance. It has the following signature:

```go
func runEthkey(t *testing.T, args ...string) *Cmd
```

### Parameters

- `t`: The testing.T instance.
- `args`: The arguments to pass to `ethkey`.

### Return Value

The function returns a `Cmd` instance.

The function performs the following steps:

1. Starts a new `Cmd` instance with `ethkey` as the command.
2. Sets the working directory to the current directory.
3. Sets the environment variables to the current environment.
4. Runs the command with the given arguments.
5. Returns the `Cmd` instance.

## Cmd Type

The `Cmd` type represents a command instance. It has the following fields:

### t *testing.T

The `testing.T` instance.

### cmd *exec.Cmd

The `exec.Cmd` instance.

### stdout bytes.Buffer

The standard output buffer.

### stderr bytes.Buffer

The standard error buffer.

## Expect Function

The `Expect` function expects the given string to be output to the standard output or standard error. It has the following signature:

```go
func (c *Cmd) Expect(s string)
```

### Parameters

- `s`: The string to expect.

### Return Value

The function does not return anything.

If the expected string is not output to the standard output or standard error, the function reports an error.

## ExpectRegexp Function

The `ExpectRegexp` function expects the given regular expression to match the output to the standard output or standard error. It has the following signature:

```go
func (c *Cmd) ExpectRegexp(pattern string) (string, []string)
```

### Parameters

- `pattern`: The regular expression pattern to expect.

### Return Value

The function returns a string and a slice of strings.

The function searches the standard output or standard error for the given regular expression pattern. If the pattern is found, the function returns the matched string and a slice of matched groups. If the pattern is not found, the function reports an error.

## ExpectExit Function

The `ExpectExit` function expects the command to exit. It has the following signature:

```go
func (c *Cmd) ExpectExit()
```

### Parameters

The function does not take any parameters.

### Return Value

The function does not return anything.

If the command does not exit, the function reports an error.