# Utils

The `utils` package provides various utility functions for the go-ethereum project.

## Functions

### `getFreeDiskSpace(path string) (uint64, error)`

The `getFreeDiskSpace()` function takes a `path` parameter and returns the amount of free disk space in bytes and an error. The function uses the `windows.UTF16PtrFromString()` function to convert the `path` parameter to a UTF-16 encoded string. The function then calls the `windows.GetDiskFreeSpaceEx()` function to get the amount of free disk space in bytes. If the function call is successful, the function returns the amount of free disk space in bytes. If the function call fails, the function returns an error.

## Dependencies

- `fmt`
- `golang.org/x/sys/windows`