# Introduction

This is a source code file for the go-ethereum library, which is a free and open-source blockchain software project. This file contains the implementation of an ultra light client (ULC) instance, which is used to determine whether a peer is trusted or not.

# License

This file is licensed under the GNU Lesser General Public License version 3 or later. For more information, please visit <http://www.gnu.org/licenses/>.

# Package

This file belongs to the `les` package, which is a sub-package of the `p2p` package in the go-ethereum library. The `les` package provides the implementation of the Light Ethereum Subprotocol (LES), which is a protocol used to synchronize Ethereum blockchain data between nodes.

# Struct

The `ulc` struct is defined in this file, which contains two fields:

- `keys`: a map of trusted server IDs.
- `fraction`: an integer representing the fraction of trusted servers required for a peer to be considered trusted.

# Functions

## newULC

```go
func newULC(servers []string, fraction int) (*ulc, error)
```

The `newULC` function creates and returns a new `ulc` instance. It takes two arguments:

- `servers`: a slice of server IDs that are trusted.
- `fraction`: an integer representing the fraction of trusted servers required for a peer to be considered trusted.

The function returns a pointer to the new `ulc` instance and an error if there are no trusted servers.

## trusted

```go
func (u *ulc) trusted(p enode.ID) bool
```

The `trusted` function is a method of the `ulc` struct. It takes an argument `p` of type `enode.ID`, which represents the ID of a peer. The function returns a boolean value indicating whether the specified peer is trusted or not.