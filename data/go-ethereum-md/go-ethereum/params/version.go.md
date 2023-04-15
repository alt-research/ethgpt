## Package params

The `params` package provides version information for the go-ethereum library.

### Constants

- `VersionMajor`: an integer representing the major version component of the current release.
- `VersionMinor`: an integer representing the minor version component of the current release.
- `VersionPatch`: an integer representing the patch version component of the current release.
- `VersionMeta`: a string representing the version metadata to append to the version string.

### Variables

- `Version`: a string representing the textual version string of the current release.
- `VersionWithMeta`: a string representing the textual version string of the current release including the metadata.
- `ArchiveVersion`: a function that returns the textual version string used for Geth archives. It takes a `gitCommit` string as an argument and returns a string.
- `VersionWithCommit`: a function that returns the textual version string of the current release including the metadata and the git commit and date. It takes `gitCommit` and `gitDate` strings as arguments and returns a string.

The `Version`, `VersionWithMeta`, `ArchiveVersion`, and `VersionWithCommit` variables and functions are used to provide version information for the go-ethereum library. They are used in various places throughout the library, such as in the `geth version` command and in the HTTP API.