# Utils

The `utils` package provides utility functions for the go-ethereum project.

## Functions

### `getFreeDiskSpace(path string) (uint64, error)`

The `getFreeDiskSpace()` function returns the amount of free disk space in bytes for the specified path. The function first calls the `unix.Statfs()` function to get the file system statistics for the specified path. If the function call fails, the function returns an error. The function then calculates the available space in bytes by multiplying the number of available blocks by the size per block. If the number of available blocks is negative, the function sets it to zero for FreeBSD systems. The function then returns the available space in bytes and `nil` for the error.