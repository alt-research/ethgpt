# Geth Test

The `geth-test` package provides a test suite for the `geth` command-line tool. The package includes functions for running `geth` with various command-line arguments, waiting for an RPC endpoint to become available, and initializing the test suite.

## Functions

### `init`

```go
func init()
```

The `init` function registers the `geth-test` command with the `reexec` package. If the `geth-test` command is executed, the function runs the `app` command.

### `TestMain`

```go
func TestMain(m *testing.M)
```

The `TestMain` function initializes the test suite and runs the tests. The function checks if the `geth-test` command has been executed and exits if it has. Otherwise, the function runs the tests.

### `runGeth`

```go
func runGeth(t *testing.T, args ...string) *testgeth
```

The `runGeth` function runs the `geth` command with the given command-line arguments. If the arguments do not include a `--datadir` flag, the function creates a temporary data directory. The function returns a `testgeth` object that can be used to interact with the running `geth` instance.

### `waitForEndpoint`

```go
func waitForEndpoint(t *testing.T, endpoint string, timeout time.Duration)
```

The `waitForEndpoint` function attempts to connect to an RPC endpoint until it succeeds. The function takes a `timeout` argument that specifies the maximum amount of time to wait for the endpoint to become available. If the endpoint does not become available within the timeout period, the function fails the test.