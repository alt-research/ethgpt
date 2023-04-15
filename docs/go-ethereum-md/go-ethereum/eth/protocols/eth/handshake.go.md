## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for executing the eth protocol handshake, negotiating version number, network IDs, difficulties, head and genesis blocks. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### Handshake Function

The `Handshake` function executes the eth protocol handshake, negotiating version number, network IDs, difficulties, head and genesis blocks. The function takes five parameters: `network` which is a uint64 representing the network ID, `td` which is a big.Int representing the total difficulty, `head` which is a common.Hash representing the head block hash, `genesis` which is a common.Hash representing the genesis block hash, and