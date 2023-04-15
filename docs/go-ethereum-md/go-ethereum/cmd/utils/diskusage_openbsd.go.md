# Utils

The `utils` package provides utility functions for the go-ethereum project.

## Functions

### `getFreeDiskSpace(path string) (uint64, error)`

The `getFreeDiskSpace()` function returns the amount of free disk space in bytes for the specified path. The function takes a `path` parameter as a string and returns a `uint64` and an `error`. The function first calls the `unix.Statfs()` function to get the file system statistics for the specified path. The function then calculates the available space in bytes by multiplying the available blocks by the size per block. The function then returns the available space and any errors encountered during the process.