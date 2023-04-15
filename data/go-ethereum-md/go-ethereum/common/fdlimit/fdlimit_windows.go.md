## Documentation for Source Code

### Raise()

```go
func Raise(max uint64) (uint64, error)
```

`Raise()` tries to maximize the file descriptor allowance of the current process to the maximum hard-limit allowed by the operating system. The function takes an input parameter `max` which is the maximum number of file descriptors that the process is allowed to request. If `max` is greater than the hard limit, the function returns an error. Otherwise, the function returns the maximum number of file descriptors that the process is allowed to request.

### Current()

```go
func Current() (int, error)
```

`Current()` retrieves the number of file descriptors allowed to be opened by the current process. The function returns the hard limit of 16384 as the number of file descriptors allowed.

### Maximum()

```go
func Maximum() (int, error)
```

`Maximum()` retrieves the maximum number of file descriptors that the current process is allowed to request for itself. The function returns the same value as `Current()`, which is the hard limit of 16384.