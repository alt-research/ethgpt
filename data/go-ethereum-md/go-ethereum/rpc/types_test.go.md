# RPC Package

The `rpc` package provides a JSON-RPC client and server implementation for Ethereum. It includes a set of functions for testing the JSON-RPC client and server.

## TestBlockNumberJSONUnmarshal

```go
func TestBlockNumberJSONUnmarshal(t *testing.T)
```

TestBlockNumberJSONUnmarshal tests the JSON unmarshaling of a block number.

## TestBlockNumberOrHash_UnmarshalJSON

```go
func TestBlockNumberOrHash_UnmarshalJSON(t *testing.T)
```

TestBlockNumberOrHash_UnmarshalJSON tests the JSON unmarshaling of a block number or hash.

## BlockNumber

```go
type BlockNumber uint64
```

BlockNumber represents a block number.

## BlockNumberOrHash

```go
type BlockNumberOrHash struct {
    Type  BlockNumberOrHashType
    Value interface{}
}
```

BlockNumberOrHash represents a block number or hash.

## BlockNumberOrHashType

```go
type BlockNumberOrHashType uint8
```

BlockNumberOrHashType represents the type of a block number or hash.

## BlockNumberOrHashWithHash

```go
func BlockNumberOrHashWithHash(hash common.Hash, isPending bool) BlockNumberOrHash
```

BlockNumberOrHashWithHash returns a BlockNumberOrHash with a hash.

## BlockNumberOrHashWithNumber

```go
func BlockNumberOrHashWithNumber(number BlockNumber) BlockNumberOrHash
```

BlockNumberOrHashWithNumber returns a BlockNumberOrHash with a number.

## PendingBlockNumber

```go
const PendingBlockNumber = BlockNumber(math.MaxUint64)
```

PendingBlockNumber represents a pending block number.

## LatestBlockNumber

```go
const LatestBlockNumber = BlockNumber(math.MaxUint64 - 1)
```

LatestBlockNumber represents the latest block number.

## EarliestBlockNumber

```go
const EarliestBlockNumber = BlockNumber(0)
```

EarliestBlockNumber represents the earliest block number. # BlockNumberOrHash Source Code Documentation

The `BlockNumberOrHash` type is a custom type used in the Ethereum Go client library to represent a block number or block hash. It is used in various functions that require a block number or block hash as input.

## Type Definition

```go
type BlockNumberOrHash struct {
	Number           *BlockNumber
	Hash             common.Hash
	RequireCanonical bool
}
```

The `BlockNumberOrHash` type is defined as a struct with three fields:
- `Number`: a pointer to a `BlockNumber` type, which represents the block number.
- `Hash`: a `common.Hash` type, which represents the block hash.
- `RequireCanonical`: a boolean value that indicates whether the block hash must be canonical.

## Functions

### Hash

```go
func (bnh BlockNumberOrHash) Hash() (common.Hash, bool)
```

The `Hash` function returns the block hash and a boolean value indicating whether the hash is valid. If the `Hash` field is empty, it returns an empty hash and `false`.

### Number

```go
func (bnh BlockNumberOrHash) Number() (BlockNumber, bool)
```

The `Number` function returns the block number and a boolean value indicating whether the number is valid. If the `Number` field is `nil`, it returns `0` and `false`.

### BlockNumberOrHashWithHash

```go
func BlockNumberOrHashWithHash(hash common.Hash, requireCanonical bool) BlockNumberOrHash
```

The `BlockNumberOrHashWithHash` function creates a new `BlockNumberOrHash` instance with the given block hash and `requireCanonical` flag.

### BlockNumberOrHashWithNumber

```go
func BlockNumberOrHashWithNumber(number BlockNumber) BlockNumberOrHash
```

The `BlockNumberOrHashWithNumber` function creates a new `BlockNumberOrHash` instance with the given block number.

### UnmarshalJSON

```go
func (bnh *BlockNumberOrHash) UnmarshalJSON(input []byte) error
```

The `UnmarshalJSON` function unmarshals a JSON-encoded `BlockNumberOrHash` value into the `bnh` instance.

### MarshalJSON

```go
func (bnh BlockNumberOrHash) MarshalJSON() ([]byte, error)
```

The `MarshalJSON` function marshals the `bnh` instance into a JSON-encoded byte array.

## Tests

The source code includes several tests to ensure the correctness of the `BlockNumberOrHash` type and its functions. These tests cover various scenarios, including valid and invalid input values, and ensure that the functions return the expected results.