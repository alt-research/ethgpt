## ChecksumDB

`ChecksumDB` is a struct that keeps file checksums.

## MustLoadChecksums

`MustLoadChecksums` is a function that loads a file containing checksums. It takes a file path as an argument and returns a pointer to a `ChecksumDB` struct.

## Verify

`Verify` is a method of the `ChecksumDB` struct that checks whether the given file is valid according to the checksum database. It takes a file path as an argument and returns an error if the file is invalid.

## findHash

`findHash` is a method of the `ChecksumDB` struct that searches for a hash in the checksum database. It takes a basename and a hash as arguments and returns a boolean value indicating whether the hash was found in the database.

## DownloadFile

`DownloadFile` is a method of the `ChecksumDB` struct that downloads a file and verifies its checksum. It takes a URL and a destination path as arguments and returns an error if the download or verification fails.

## downloadWriter

`downloadWriter` is a struct that implements the `io.Writer` interface and is used to write downloaded data to a file. It keeps track of the progress of the download and prints it to the console.