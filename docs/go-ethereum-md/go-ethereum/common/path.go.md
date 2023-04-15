## Package: common

The `common` package provides common functions used throughout the Ethereum codebase.

## Function: FileExist

The `FileExist` function checks if a file exists at the specified file path. It returns a boolean indicating if the file exists or not.

### Parameters

- `filePath string`: A string representing the file path to check.

### Returns

- `bool`: A boolean indicating if the file exists or not.

### Example

```go
if FileExist("/path/to/file") {
    fmt.Println("File exists!")
}
```

## Function: AbsolutePath

The `AbsolutePath` function returns the absolute path of a file by joining the data directory and the file name. If the file name is already an absolute path, it is returned as is.

### Parameters

- `datadir string`: A string representing the data directory.
- `filename string`: A string representing the file name.

### Returns

- `string`: A string representing the absolute path of the file.

### Example

```go
absPath := AbsolutePath("/path/to/datadir", "file.txt")
```