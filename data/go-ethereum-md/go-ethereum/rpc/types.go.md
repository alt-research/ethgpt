# RPC Package

The RPC package provides a framework for setting up remote procedure call (RPC) interfaces for Ethereum nodes. It includes an API struct that describes the set of methods offered over the RPC interface, a ServerCodec interface that implements reading, parsing, and writing RPC messages for the server side of an RPC session, and a BlockNumber type that represents a block number in Ethereum.

## API

The API struct describes the set of methods offered over the RPC interface. It includes the namespace under which the RPC methods of the service are exposed, the version (deprecated), the receiver instance which holds the methods, and whether the API should only be available behind authentication.

## ServerCodec

The ServerCodec interface implements reading, parsing, and writing RPC messages for the server side of an RPC session. Implementations must be go-routine safe since the codec can be called in multiple go-routines concurrently. It includes the peerInfo() function that returns the peer information, the readBatch() function that reads a batch of messages, the close() function that closes the connection, and the jsonWriter interface that can write JSON messages to its underlying connection.

## BlockNumber

The BlockNumber type represents a block number in Ethereum. It includes constants for safe, finalized, latest, earliest, and pending block numbers. The UnmarshalJSON function parses the given JSON fragment into a BlockNumber. It supports "safe", "finalized", "latest", "earliest", or "pending" as string arguments, or the block number. The function returns an invalid block number error when the given argument isn't a known string or an out of range error when the given block number is either too little or too large.

## Functions

### UnmarshalJSON

```go
func (bn *BlockNumber) UnmarshalJSON(data []byte) error
```

UnmarshalJSON parses the given JSON fragment into a BlockNumber. It supports "safe", "finalized", "latest", "earliest", or "pending" as string arguments, or the block number. The function returns an invalid block number error when the given argument isn't a known string or an out of range error when the given block number is either too little or too large. ## BlockNumber and BlockNumberOrHash

### BlockNumber

The `BlockNumber` type is an integer type that represents a block number in the Ethereum blockchain. It is used to specify the block number in various Ethereum JSON-RPC APIs. This type also provides a `MarshalText()` function that marshals the block number to a string. If the block number is one of the predefined values (`EarliestBlockNumber`, `LatestBlockNumber`, `PendingBlockNumber`, `FinalizedBlockNumber`, or `SafeBlockNumber`), the corresponding string is returned. Otherwise, the block number is marshaled as a hexadecimal string.

### BlockNumberOrHash

The `BlockNumberOrHash` type is a struct that represents either a block number or a block hash. It is used to specify a block in various Ethereum JSON-RPC APIs. This type provides several functions to access the block number or block hash, as well as a `String()` function that returns a string representation of the block. The `UnmarshalJSON()` function is used to unmarshal a JSON-encoded `BlockNumberOrHash` value. If the input is a string, it is parsed as a block number or block hash. If the input is an object, it is parsed as a `BlockNumberOrHash` object. If both `BlockNumber` and `BlockHash` fields are present, an error is returned. 

The `BlockNumberOrHash` type also provides two helper functions to create a `BlockNumberOrHash` object with a block number or block hash: `BlockNumberOrHashWithNumber()` and `BlockNumberOrHashWithHash()`. These functions return a `BlockNumberOrHash` object with the corresponding `BlockNumber` or `BlockHash` field set.