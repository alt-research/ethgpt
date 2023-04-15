# Main Package

The `main` package provides a command-line interface for interacting with Ethereum nodes.

## getPassphrase Function

The `getPassphrase` function obtains a passphrase given by the user. It first checks the `--passfile` command line flag and ultimately prompts the user for a passphrase. It has the following signature:

```go
func getPassphrase(ctx *cli.Context, confirmation bool) string
```

### Parameters

- `ctx`: The `cli.Context` instance.
- `confirmation`: A boolean indicating whether to prompt the user for confirmation.

### Return Value

The function returns a string representing the passphrase.

## mustPrintJSON Function

The `mustPrintJSON` function prints the JSON encoding of the given object and exits the program with an error message when the marshaling fails. It has the following signature:

```go
func mustPrintJSON(jsonObject interface{})
```

### Parameters

- `jsonObject`: The object to be marshaled and printed.

### Return Value

The function does not return anything.