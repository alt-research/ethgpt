## Overview

This is a Go package that provides a set of functions for running and testing a Geth node. The package includes functions for starting a Geth node with minimal memory and disk I/O, testing the welcome message of a Geth console, and attaching a console to a running node via various means.

## Functions

### `runMinimalGeth`

```go
func runMinimalGeth(t *testing.T, args ...string) *testgeth
```

The `runMinimalGeth` function starts a Geth node with the given command line arguments. If the arguments do not set `--datadir`, the child Geth node gets a temporary data directory. The function returns a `testgeth` object.

### `TestConsoleWelcome`

```go
func TestConsoleWelcome(t *testing.T)
```

The `TestConsoleWelcome` function tests that a node embedded within a console can be started up properly and then terminated by closing the input stream. The function sets up a Geth console, verifies the welcome message, and terminates the console.

### `TestAttachWelcome`

```go
func TestAttachWelcome(t *testing.T)
```

The `TestAttachWelcome` function tests that a console can be attached to a running node via various means. The function configures the instance for IPC attachment and HTTP + WS attachment, sets up a Geth console, verifies the welcome message, and terminates the console.

### `trulyRandInt`

```go
func trulyRandInt(min, max int) int
```

The `trulyRandInt` function generates a random integer between the given minimum and maximum values. The function uses the `crypto/rand` package to generate a truly random number.

### `testgeth`

```go
type testgeth struct {
	*expect.GExpect
}
```

The `testgeth` type is a wrapper around the `expect.GExpect` type. The `testgeth` type provides additional methods for setting template functions and verifying the console output.

### `SetTemplateFunc`

```go
func (tg *testgeth) SetTemplateFunc(name string, fn interface{})
```

The `SetTemplateFunc` method sets a template function for the `testgeth` object. The method takes a function name and a function object as arguments.

### `Expect`

```go
func (tg *testgeth) Expect(pattern string)
```

The `Expect` method verifies that the console output matches the given pattern. The method takes a string pattern as an argument.

### `ExpectExit`

```go
func (tg *testgeth) ExpectExit()
```

The `ExpectExit` method verifies that the console has exited. The method takes no arguments.

### `trulyRandBigInt`

```go
func trulyRandBigInt(max *big.Int) *big.Int
```

The `trulyRandBigInt` function generates a random big integer between 0 and the given maximum value. The function uses the `crypto/rand` package to generate a truly random number.

### `TestAttachIPC`

```go
func TestAttachIPC(t *testing.T)
```

The `TestAttachIPC` function tests that a console can be attached to a running node via IPC. The function sets up a Geth node with IPC enabled, sets up a Geth console, verifies the welcome message, and terminates the console.

### `TestAttachHTTP`

```go
func TestAttachHTTP(t *testing.T)
```

The `TestAttachHTTP` function tests that a console can be attached to a running node via HTTP. The function sets up a Geth node with HTTP enabled, sets up a Geth console, verifies the welcome message, and terminates the console.

### `TestAttachWS`

```go
func TestAttachWS(t *testing.T)
```

The `TestAttachWS` function tests that a console can be attached to a running node via WS. The function sets up a Geth node with WS enabled, sets up a Geth console, verifies the welcome message, and terminates the console. ## Documentation for testAttachWelcome function

The `testAttachWelcome` function is used to test the welcome message of a running Geth node. The function attaches to a running Geth node and terminates immediately. The function then gathers all the information required to create the welcome message and verifies the actual welcome message to the required template.

### Parameters

- `t *testing.T`: A pointer to the testing.T struct.
- `geth *testgeth`: A pointer to the testgeth struct.
- `endpoint string`: The endpoint of the running Geth node.
- `apis string`: The APIs supported by the running Geth node.

### Return Value

The function does not return any value.

### Example Usage

```go
testAttachWelcome(t, geth, "http://127.0.0.1:"+httpPort, httpAPIs)
```

## Documentation for trulyRandInt function

The `trulyRandInt` function generates a crypto random integer used by the console tests to not clash network ports with other tests running concurrently.

### Parameters

- `lo int`: The lower bound of the random integer.
- `hi int`: The upper bound of the random integer.

### Return Value

The function returns a random integer between `lo` and `hi`.

### Example Usage

```go
port := trulyRandInt(10000, 20000)
```