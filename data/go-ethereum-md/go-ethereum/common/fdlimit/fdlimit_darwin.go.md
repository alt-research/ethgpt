## Documentation for Source Code

### Raise()

```go
func Raise(max uint64) (uint64, error)
```

`Raise()` tries to maximize the file descriptor allowance of the current process to the maximum hard-limit allowed by the operating system. The function takes an input parameter `max` that specifies the desired maximum number of file descriptors. If the current limit is already greater than or equal to `max`, the function returns the current limit. Otherwise, the function tries to update the limit to the maximum allowance and returns the size it was set to. If the function fails to update the limit, it returns an error.

### Current()

```go
func Current() (int, error)
```

`Current()` retrieves the number of file descriptors allowed to be opened by the current process. The function returns the current limit and an error if the operation fails.

### Maximum()

```go
func Maximum() (int, error)
```

`Maximum()` retrieves the maximum number of file descriptors that the current process is allowed to request for itself. The function returns the maximum limit and an error if the operation fails. The maximum limit is capped to `hardlimit` (10240) because macOS has a special limit.