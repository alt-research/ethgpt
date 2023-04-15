The `build` package provides functionality for creating archives of files. It defines an `Archive` interface that must be implemented by any archive type, and provides two implementations: `ZipArchive` and `TarballArchive`.

The `Archive` interface defines three methods: `Directory`, `Header`, and `Close`. `Directory` adds a new directory entry to the archive and sets the directory for subsequent calls to `Header`. `Header` adds a new file to the archive. The file is added to the directory set by `Directory`. The content of the file must be written to the returned writer. `Close` flushes the archive and closes the underlying file.

The `NewArchive` function creates a new archive based on the file extension of the provided file. It returns the archive and the base name of the file.

The `AddFile` function appends an existing file to an archive. It opens the file, gets its file info, creates a new header in the archive, and copies the file content to the archive.

The `WriteArchive` function creates an archive containing the given files. It creates a new file with the provided name, creates a new archive based on the file extension of the file, adds a directory entry to the archive, adds each file to the archive, and closes the archive.

The `ZipArchive` type implements the `Archive` interface for ZIP archives. It has a `dir` field that stores the current directory, a `zipw` field that is a `zip.Writer`, and a `file` field that is an `io.Closer`. The `Directory` method sets the `dir` field to the provided name plus a forward slash. The `Header` method creates a new header based on the provided file info, sets the header name to the current directory plus the file name, sets the header method to `zip.Deflate`, creates a new writer for the file, and returns the writer. The `Close` method closes the `zipw` writer and the `file` closer.

The `TarballArchive` type implements the `Archive` interface for tarball archives. It has a `dir` field that stores the current directory, a `tarw` field that is a `tar.Writer`, a `gzw` field that is a `gzip.Writer`, and a `file` field that is an `io.Closer`. The `Directory` method sets the `dir` field to the provided name plus a forward slash. The `Header` method creates a new header based on the provided file info, sets the header name to the current directory plus the file name, and writes the header to the `tarw` writer. The `Header` method then creates a new writer for the file, wraps it in a `gzw` writer, and returns the wrapped writer. The `Close` method closes the `gzw` writer, the `tarw` writer, and the `file` closer. ## Package Documentation

This package provides functions for creating and extracting archive files. It supports `.zip` and `.tar.gz` archive formats.

## Functions

### NewTarballArchive

```go
func NewTarballArchive(filename string) (*TarballArchive, error)
```

`NewTarballArchive` creates a new `TarballArchive` instance with the given filename.

### Directory

```go
func (a *TarballArchive) Directory(name string) error
```

`Directory` sets the directory name for the archive.

### Header

```go
func (a *TarballArchive) Header(fi os.FileInfo) (io.Writer, error)
```

`Header` creates a new tar header for the given file info.

### Close

```go
func (a *TarballArchive) Close() error
```

`Close` closes the archive file and its writers.

### ExtractArchive

```go
func ExtractArchive(archive string, dest string) error
```

`ExtractArchive` unpacks a `.zip` or `.tar.gz` archive to the destination directory.

### extractTarball

```go
func extractTarball(ar io.Reader, dest string) error
```

`extractTarball` unpacks a `.tar.gz` file.

### extractZip

```go
func extractZip(ar *os.File, dest string) error
```

`extractZip` unpacks the given `.zip` file.

### extractFile

```go
func extractFile(arpath string, armode os.FileMode, data io.Reader, dest string) error
```

`extractFile` extracts a single file from an archive.