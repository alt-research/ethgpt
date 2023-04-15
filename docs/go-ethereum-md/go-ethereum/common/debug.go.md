## Package: common

The `common` package provides common functions and utilities used throughout the Ethereum Go implementation.

### Functions

## Function: Report

The `Report` function prints a warning message to `os.Stderr` requesting the user to submit an issue to the Ethereum Go GitHub tracker. It also prints any additional arguments passed to the function. It then prints the file and line number where the function was called from using `runtime.Caller` and prints the stack trace using `debug.PrintStack`.

### Parameters

- `extra ...interface{}`: An optional variadic argument of type `interface{}`.

### Example

```go
Report("Something went wrong")
```

## Function: PrintDeprecationWarning

The `PrintDeprecationWarning` function prints a string in a box using `fmt.Println`.

### Parameters

- `str string`: A string to print in the box.

### Example

```go
PrintDeprecationWarning("This function is deprecated")
```