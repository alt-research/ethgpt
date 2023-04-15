## Documentation for Source Code

### Raise()

```go
func Raise(max uint64) (uint64, error)
```

`Raise()` tries to maximize the file descriptor allowance of the current process to the maximum hard-limit allowed by the operating system. The function returns the new file descriptor allowance and an error if any.

### Current()

```go
func Current() (int, error)
```

`Current()` retrieves the number of file descriptors allowed to be opened by the current process. The function returns the number of file descriptors and an error if any.

### Maximum()

```go
func Maximum() (int, error)
```

`Maximum()` retrieves the maximum number of file descriptors the current process is allowed to request for itself. The function returns the maximum number of file descriptors and an error if any.