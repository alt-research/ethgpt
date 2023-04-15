This is a Go source code file that contains a package named `miner`. The package provides a `Payload` struct that represents a block waiting for sealing. The `Payload` struct has an empty block and a full block that will be updated with the latest built version. The `Payload` struct also has a unique identifier, a stop channel, a lock, and a condition variable.

The package also provides a `BuildPayloadArgs` struct that contains the provided parameters for building a payload. The `Id()` method of the `BuildPayloadArgs` struct computes an 8-byte identifier by hashing the components of the payload arguments.

The `Payload` struct has the following fields:

- `id`: an `engine.PayloadID` object that represents the unique identifier of the payload.
- `empty`: a `*types.Block` object that represents the empty block of the payload This is a Go source code file that contains a `Payload` struct and several functions that operate on it. The `Payload` struct represents a payload of transactions to be included in a block. The `Payload` struct has the following fields:

- `id`: a string that represents the ID of the payload.
- `lock`: a `sync.Mutex` object that is used to synchronize access to the payload.
- `cond`: a `sync.Cond` object that is used to signal when the payload has been updated.
- `stop`: a channel that is used to signal when the background thread for updating the payload should stop.
- `empty`: a `*types.Block` object that represents an empty block.
- `full`: a `*types.Block` object that represents a full block.
- `fullFees`: a `*big.Int` object that represents the total fees for the transactions in the full block.

The `Payload` struct has the following methods:

- `update(block *types.Block, fees *big.Int, elapsed time.Duration)`: updates the payload with the given block and fees.