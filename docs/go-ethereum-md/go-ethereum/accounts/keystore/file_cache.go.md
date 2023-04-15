## Keystore Package

The `keystore` package provides functionality for managing Ethereum accounts stored in a keystore directory. It includes a file cache that tracks changes to the keystore directory and provides methods for scanning the directory and identifying changes.

### File Cache

The `fileCache` struct represents a cache of files seen during a scan of the keystore directory. It includes a set of all files in the directory and the last time a file was modified. The `scan` method performs a new scan on the directory, compares against the cached filenames, and returns sets of created, deleted, and updated files.

### Scan

The `scan` method performs a new scan on the given directory, compares against the already cached filenames, and returns file sets: creates, deletes, updates. It lists all the files from the keystore folder, gathers their metadata, and updates the tracked files. It returns the three sets of creates, deletes, and updates.

### Non-Key File

The `nonKeyFile` function ignores editor backups, hidden files, and folders/symlinks. It skips editor backups and UNIX-style hidden files. It also skips miscellaneous special files, directories, and symlinks.