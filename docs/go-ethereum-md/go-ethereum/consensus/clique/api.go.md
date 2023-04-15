This is a Go source code file that implements the proof-of-authority consensus algorithm for the Ethereum blockchain. The file defines an API struct that provides user-facing RPC methods for controlling the signer and voting mechanisms of the consensus algorithm.

The API struct has the following fields:
- `chain`: a consensus.ChainHeaderReader interface that provides access to the blockchain headers.
- `clique`: a pointer to the Clique struct that implements the consensus algorithm.

The API struct has the following methods:
- `GetSnapshot`: retrieves the state snapshot at a given block. It takes a `number` parameter that specifies the block number to retrieve the snapshot for. If `number` is nil or `rpc.LatestBlockNumber`, the current block is used. It returns a `Snapshot` struct and an error.
- `GetSnapshotAtHash`: retrieves the state snapshot at a given block. It takes a `hash` parameter that specifies the block hash to retrieve the snapshot for. It returns a `Snapshot` struct and an error.
- `GetSigners`: retrieves the list of authorized signers at the specified block. It takes a `number` parameter that specifies the block number to retrieve the signers for. If `number` is nil or `rpc.LatestBlockNumber`, the current block is used. It returns a slice of `common.Address` and an error.
- `GetSignersAtHash`: retrieves the list of authorized signers at the specified block. It takes a `hash` parameter that specifies the block hash to retrieve the signers for. It returns a slice of `common.Address` and an error.
- `Proposals`: returns the current proposals the node tries to uphold and vote on. It returns a map of `common.Address` to `bool`.

The file also includes a license header that specifies the terms under which the code is distributed. ## API Documentation

### Propose

```go
func (api *API) Propose(address common.Address, auth bool)
```

Propose injects a new authorization proposal that the signer will attempt to push through. It takes in two parameters:
- `address` of type `common.Address`: the address of the proposal to be injected.
- `auth` of type `bool`: the authorization status of the proposal.

### Discard

```go
func (api *API) Discard(address common.Address)
```

Discard drops a currently running proposal, stopping the signer from casting further votes (either for or against). It takes in one parameter:
- `address` of type `common.Address`: the address of the proposal to be discarded.

### Status

```go
func (api *API) Status() (*status, error)
```

Status returns the status of the last N blocks, the number of active signers, the number of signers, and the percentage of in-turn blocks. It returns a pointer to a `status` struct and an error. The `status` struct has the following fields:
- `InturnPercent` of type `float64`: the percentage of in-turn blocks.
- `SigningStatus` of type `map[common.Address]int`: the number of blocks signed by each signer.
- `NumBlocks` of type `uint64`: the number of blocks.

### GetSigner

```go
func (api *API) GetSigner(rlpOrBlockNr *blockNumberOrHashOrRLP) (common.Address, error)
```

GetSigner returns the signer for a specific clique block. It can be called with either a block number, block hash, or an RLP encoded blob. The RLP encoded blob can either be a block or a header. It takes in one parameter:
- `rlpOrBlockNr` of type `*blockNumberOrHashOrRLP`: a pointer to a `blockNumberOrHashOrRLP` struct that contains the block number, block hash, or RLP encoded blob.

### blockNumberOrHashOrRLP

```go
type blockNumberOrHashOrRLP struct {
	*rpc.BlockNumberOrHash
	RLP hexutil.Bytes `json:"rlp,omitempty"`
}
```

`blockNumberOrHashOrRLP` is a struct that contains a `*rpc.BlockNumberOrHash` and an RLP encoded blob. It is used as a parameter for the `GetSigner` function.

### status

```go
type status struct {
	InturnPercent float64                `json:"inturnPercent"`
	SigningStatus map[common.Address]int `json:"sealerActivity"`
	NumBlocks     uint64                 `json:"numBlocks"`
}
```

`status` is a struct that contains the status of the last N blocks, the number of active signers, the number of signers, and the percentage of in-turn blocks. It is used as a return value for the `Status` function.