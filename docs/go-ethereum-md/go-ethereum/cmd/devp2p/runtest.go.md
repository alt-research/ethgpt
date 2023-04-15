# Main Package

The `main` package is the entry point for the Ethereum client.

## runTests Function

The `runTests` function runs the specified tests. It has the following signature:

```go
func runTests(ctx *cli.Context, tests []utesting.Test) error
```

### Parameters

- `ctx`: The `cli.Context` instance.
- `tests`: The tests to run.

### Return Value

The function returns an error.

## Global Variables

The `main` package defines the following global variables:

### testPatternFlag

A `cli.StringFlag` for specifying the pattern of test suites to run.

### testTAPFlag

A `cli.BoolFlag` for outputting TAP.

### testListen1Flag

A `cli.StringFlag` for specifying the IP address of the first tester