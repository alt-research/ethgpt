# Catalyst Package Documentation

The `catalyst` package is a temporary Ethereum 1.0 and Ethereum 2.0 RPC integration. It provides an engine API to the full node. The package contains the following functions:

## Function: Register

The `Register` function adds the engine API to the full node. It takes in a `*node.Node` and a `*eth.Ethereum` and returns an error. It registers the engine API with the provided node and returns an error if there is any.

```go
func Register(stack *node.Node, backend *eth.Ethereum) error {
    ...
}
```

## ConsensusAPI Struct

The `ConsensusAPI` struct contains the Ethereum instance and caches of remote and local payloads. It also tracks historical bad blocks and bad tipsets.

```go
type ConsensusAPI struct {
    eth *eth.Ethereum
    remoteBlocks *headerQueue
    localBlocks *payloadQueue
    ...
}
```

## Function: NewConsensusAPI

The `NewConsensusAPI` function creates a new instance of the `ConsensusAPI` struct. It takes in a `*eth.Ethereum` and returns a new instance of the `ConsensusAPI` struct.

```go
func NewConsensusAPI(backend *eth.Ethereum) *ConsensusAPI {
    ...
}
```

## Function: (ConsensusAPI) forkchoiceUpdatedV1

The `forkchoiceUpdatedV1` function is a method of the `ConsensusAPI` struct. It takes in a `*rpc.Request` and returns a `hexutil.Bytes` and an error. It returns the latest valid hash in an invalid chain.

```go
func (api *ConsensusAPI) forkchoiceUpdatedV1(req *rpc.Request) (interface{}, error) {
    ...
}
```

## Function: (ConsensusAPI) forkchoiceUpdatedV2

The `forkchoiceUpdatedV2` function is a method of the `ConsensusAPI ## Consensus API Documentation

The Consensus API is responsible for managing the consensus layer of the Ethereum network. It provides methods for updating the fork choice, handling invalid blocks, and assembling new blocks with payload attributes.

### Function: NewConsensusAPI

The `NewConsensusAPI` function creates a new instance of the Consensus API for the given Ethereum backend. It initializes the remote and local block queues and the invalid block caches. If the blockchain does not have a valid terminal total difficulty set, it logs a warning message.

```go
func NewConsensusAPI(eth *eth.Ethereum) *ConsensusAPI {
	api := &ConsensusAPI{
		eth:               eth,
		remoteBlocks:      newHeaderQueue(),
		localBlocks:       newPayloadQueue(),
		invalidBlocksHits: make(map[common.Hash]int),
		invalidTipsets:    make(map[common.Hash]*types.Header),
	}
	eth.Downloader().SetBadBlockCallback(api.setInvalidAncestor)
	go api.heartbeat()

	return api
}
```

### Function: ForkchoiceUpdatedV1

The `ForkchoiceUpdatedV1` function is responsible for updating the fork choice of the Ethereum network. It takes in a `engine.ForkchoiceStateV1` update and a `*engine.PayloadAttributes` and returns a `engine.ForkChoiceResponse` and an error. If the payload attributes contain withdrawals or are called post-Shanghai, it returns an invalid status. Otherwise, it calls the `forkchoiceUpdated` method with the provided update and payload attributes.

```go
func (api *ConsensusAPI) ForkchoiceUpdatedV1(update engine.ForkchoiceStateV1, payloadAttributes *engine.PayloadAttributes) (engine.ForkChoiceResponse, error) {
	if payloadAttributes != nil {
		if payloadAttributes.Withdrawals != nil {
			return engine.STATUS_INVALID, engine.InvalidParams.With(fmt.Errorf("withdrawals not supported in V1"))
		}
		if api.eth.BlockChain().Config().IsShanghai(payloadAttributes.Timestamp) {
			return engine.STATUS_INVALID, engine.InvalidParams.With(fmt.Errorf("forkChoiceUpdateV1 called post-shanghai"))
		}
	}
	return api.forkchoiceUpdated(update, payload ## Documentation for ConsensusAPI Codebase

### Function: verifyPayloadAttributes

The `verifyPayloadAttributes` function takes in a `*engine.PayloadAttributes` and verifies that the attributes are valid. If the timestamp of the attributes is before the Shanghai hard fork, withdrawals are not allowed and an error is returned. If the timestamp is after the Shanghai hard fork, withdrawals must be included and an error is returned if they are missing. If the attributes are valid, nil is returned.

```go
func (api *ConsensusAPI) verifyPayloadAttributes(attr *engine.PayloadAttributes) error {
	if !api.eth.BlockChain().Config().IsShanghai(attr.Timestamp) {
		if attr.Withdrawals != nil {
			return errors.New("withdrawals before shanghai")
		}
	} else {
		if attr.Withdrawals == nil {
			return errors.New("missing withdrawals list")
		}
	}
	return nil
}
```

### Function: forkchoiceUpdated

The `forkchoiceUpdated` function takes in a `engine.ForkchoiceStateV1` and a `*engine.PayloadAttributes` and updates the fork choice state accordingly. It first acquires a lock to ensure that only one update can occur at a time. It then logs the update information and checks if the head block hash is zero. If it is, it returns an invalid status. If the block is not in the local database, it checks if it was previously invalidated and rejects it if it was. If the head hash is unknown, it returns a syncing status. If the finalized hash is known, it directs the downloader to move more data to the freezer. If the header was advertised via a past newPayload request, it starts syncing to it. If the block is known locally, it checks that the beacon client does not attempt to push the node back to before the merge. If the block is valid, it returns a syncing status and nil ## Documentation for Ethereum Codebase

### Function: updateBeaconHead

The `updateBeaconHead` function takes in an `engine.UpdateBeaconHead` struct and updates the beacon head of the Ethereum network. It first retrieves the total difficulty of the current block and its parent block, as well as the terminal total difficulty from the Ethereum configuration. If the total difficulty of the current block or its parent block is unavailable, it returns an error. If the total difficulty of the current block is less than the terminal total difficulty, it logs an error and returns an invalid terminal block status. If the parent block's total difficulty is greater than or equal to the terminal total difficulty, it logs an error and returns an invalid terminal block status. If the block is not canonical, it sets the head block to the specified block. If the head block is already in the canonical chain, it ignores the update. If the beacon client also advertised a finalized block, it marks the local chain as final and completely in PoS mode. If the finalized block is not in the canonical chain, it logs a warning and returns an invalid fork choice state status. If the safe block hash is not in the canonical chain, it logs a warning and returns an invalid fork choice state status.

```go
func updateBeaconHead(update engine.UpdateBeaconHead) (engine.ForkChoiceResponse, error) {
	block := update.Block
	if api.eth.BlockChain().Config().IsEIP155(block.NumberU64()) {
		td, ptd, ttd := (
			api.eth.BlockChain().GetTd(update.HeadBlockHash, block.NumberU64()),
			api.eth.BlockChain(). ## Documentation for Ethereum Codebase

### Function: updateTransition

The `updateTransition` function takes in a `*engine.TransitionUpdate` and a `*engine.PayloadAttributes` and updates the transition state of the Ethereum network. It first checks if the safe block is available in the database and if it is in the canonical chain. If not, it returns an error. If the payload generation was requested, it creates a new block to be potentially sealed by the beacon client. The payload will be requested later, and it will replace it arbitrarily many times in between. If the payload generation was not requested, it returns `nil`.

```go
func (api *ConsensusAPI) updateTransition(update *engine.TransitionUpdate, payloadAttributes *engine.PayloadAttributes) (*engine.Validity, error) {
	// Check if the safe block is available in the database and in the canonical chain
	if update.SafeBlockHash != (common.Hash{}) {
		safeBlock := api.eth.BlockChain().GetBlockByHash(update.SafeBlockHash)
		if safeBlock == nil {
			log.Warn("Safe block not available in database")
			return engine.STATUS_INVALID, engine.InvalidForkChoiceState.With(errors.New("safe block not available in database"))
		}
		if rawdb.ReadCanonicalHash(api.eth.ChainDb(), safeBlock.NumberU64()) != update.SafeBlockHash {
			log.Warn("Safe block not in canonical chain")
			return engine.STATUS_INVALID, engine.InvalidForkChoiceState.With(errors.New("safe block not in canonical chain"))
		}
		// Set the safe block
		api.eth.BlockChain().SetSafe(safeBlock.Header())
	}
	// If payload generation was requested, create a new block to be potentially
	// sealed by the beacon client. The payload will be requested later, and we
	// will replace it arbitrarily many times in between.
	if payloadAttributes != nil {
		args := &miner.BuildPayloadArgs{
			Parent:       update.HeadBlockHash,
			Timestamp:    payloadAttributes.Timestamp,
			FeeRecipient: payload ## Documentation for ConsensusAPI Codebase

### Function: GetPayload

The `GetPayload` function takes in a payload ID and returns the corresponding data from the local blocks. It first logs that an Engine API request has been received with the method and ID. It then retrieves the data from the local blocks using the provided payload ID. If the data is nil, it returns an error of `engine.UnknownPayload`. Otherwise, it returns the data.

```go
func (api *ConsensusAPI) GetPayload(payloadID string) ([]byte, error) {
	log.Trace("Engine API request received", "method", "GetPayload", "id", payloadID)
	data := api.localBlocks.get(payloadID)
	if data == nil {
		return nil, engine.UnknownPayload
	}
	return data, nil
}
```

### Function: NewPayloadV1

The `NewPayloadV1` function creates an Eth1 block, inserts it in the chain, and returns the status of the chain. If the provided parameters include withdrawals, it returns an error of `engine.InvalidParams` with a message indicating that withdrawals are not supported in V1. Otherwise, it calls the `newPayload` function with the provided parameters.

```go
func (api *ConsensusAPI) NewPayloadV1(params engine.ExecutableData) (engine.PayloadStatusV1, error) {
	if params.Withdrawals != nil {
		return engine.PayloadStatusV1{Status: engine.INVALID}, engine.InvalidParams.With(fmt.Errorf("withdrawals not supported in V1"))
	}
	return api.newPayload(params)
}
```

### Function: NewPayloadV2

The `NewPayloadV2` function creates an Eth1 block, inserts it in the chain, and returns the status of the chain. If the provided timestamp indicates that the block is post-Shanghai and the parameters do not include withdrawals, it returns an error of `engine.InvalidParams` with a message indicating that withdrawals are required. ## Documentation for ConsensusAPI Codebase

### Function: processPayload

The `processPayload` function takes in a `params` struct containing the block hash and number, and a `payload` struct containing the block data. It performs various checks on the block and its parent before inserting it into the blockchain. If the block is valid, it is inserted into the blockchain and the function returns a `PayloadStatusV1` struct with a status of `VALID` and the hash of the latest valid block. If the block is invalid, the function returns a `PayloadStatusV1` struct with a status of `INVALID` and an error message.

```go
func (api *ConsensusAPI) processPayload(params engine.PayloadParamsV1, payload engine.PayloadV1) (engine.PayloadStatusV1, error) {
	// Check if the block's parent exists in the blockchain. If it doesn't, stash the block away for later import.
	// If the parent does exist, perform various checks on the block and its parent before inserting it into the blockchain.
	// If the block is valid, insert it into the blockchain and return a PayloadStatusV1 struct with a status of VALID and the hash of the latest valid block.
	// If the block is invalid, return a PayloadStatusV1 struct with a status of INVALID and an error message.
}
```

### Function: delayPayloadImport

The `delayPayloadImport` function takes in a `block` struct containing the block data. It stashes the block away for import at a later time, either via a fork choice update or a sync extension. This function is meant to be called by the `processPayload` function when the block seems to be okay, but some prerequisite prevents it from being processed (e.g. no parent, or snap sync). If the ## Documentation for ConsensusAPI Codebase

### Function: syncExtension

The `syncExtension` function is a callback for the downloader to notify us if a new block is received during the async sync. It takes in a `*types.Block` and returns an `engine.PayloadStatusV1` and an error. If the block is successfully imported, it returns a `SYNCING` status. If the block is rejected due to missing parent, it logs a warning and returns a `SYNCING` status. If the block is rejected while snap syncing, it logs a warning and returns a `SYNCING` status. If the block is rejected for any other reason, it returns an error.

### Function: setInvalidAncestor

The `setInvalidAncestor` function is a callback for the downloader to notify us if a bad block is encountered during the async sync. It takes in a `*types.Header` representing the invalid block and a `*types.Header` representing the origin block. It stores the invalid block in a map of invalid tipsets and increments the count of hits for the invalid block.

### Function: checkInvalidAncestor

The `checkInvalidAncestor` function checks whether the specified chain end links to a known bad ancestor. It takes in a `common.Hash` representing the hash to check and a `common.Hash` representing the current head. If the hash to check is unknown, it returns `nil`. If the bad hash was hit too many times, it evicts it and tries to reprocess. If not too many failures yet, it marks the head of the invalid chain as invalid and returns a `PayloadStatusV1` with the latest valid hash and a validation error message.

### Function: invalid

The `invalid` function returns a response "INVALID" with the latest valid hash supplied by latest or to the current head if no latestValid block was provided. It takes in an error and a `*types.Header` representing the latest valid block and returns a ` ## Documentation for ConsensusAPI Codebase

### Function: getPayloadStatusV1

The `getPayloadStatusV1` function takes in a `latestValid` block and an error and returns a `PayloadStatusV1` struct. It sets the `currentHash` variable to the current block hash and sets it to 0x0 if the parent is a PoW block. If the parent is not a PoW block, it sets `currentHash` to the parent hash. It then sets the `errorMsg` variable to the provided error message and returns a `PayloadStatusV1` struct with the `INVALID` status, the `currentHash`, and the `errorMsg`.

```go
func getPayloadStatusV1(latestValid *types.Block, err error) engine.PayloadStatusV1 {
	currentHash := api.eth.BlockChain().CurrentBlock().Hash()
	if latestValid != nil {
		currentHash = common.Hash{}
		if latestValid.Difficulty.BitLen() == 0 {
			currentHash = latestValid.Hash()
		}
	}
	errorMsg := err.Error()
	return engine.PayloadStatusV1{Status: engine.INVALID, LatestValidHash: &currentHash, ValidationError: &errorMsg}
}
```

### Function: heartbeat

The `heartbeat` function is a goroutine that loops indefinitely and checks if there have been beacon client updates received in the last while. If there have been no updates for the past while, it warns the user that the beacon client is probably offline. It sleeps for a bit on startup since there's obviously no beacon client yet attached, so no need to print scary warnings to the user. If the network is not yet merged/merging, it doesn't bother continuing.

```go
func (api *ConsensusAPI) heartbeat() {
	time.Sleep(beaconUpdateStartupTimeout)
	if api.eth.BlockChain().Config().TerminalTotalDifficulty == nil {
		return
	}
	var offlineLogged time.Time
	for {
		time.Sleep(5 * time.Second)
		api ## Documentation for Ethereum Codebase

### Function: getExecutionPayloadBodies

The `getExecutionPayloadBodies` function takes in a `start` block number and a `count` of blocks to retrieve, and returns a slice of `engine.ExecutionPayloadBodyV1` structs. It first checks if the requested count is too large and returns an error if it is. Otherwise, it limits the count up until the current block and retrieves the block bodies for each block in the specified range using the `getBlockByNumber` function. It then returns a slice of `engine.ExecutionPayloadBodyV1` structs, each containing the transaction data and withdrawals for the corresponding block.

```go
func getExecutionPayloadBodies(start int64, count int) ([]*engine.ExecutionPayloadBodyV1, error) {
	if count > maxBlockCount {
		return nil, engine.TooLargeRequest.With(fmt.Errorf("requested count too large: %v", count))
	}
	// limit count up until current
	current := api.eth.BlockChain().CurrentBlock().Number.Uint64()
	last := uint64(start) + uint64(count) - 1
	if last > current {
		last = current
	}
	bodies := make([]*engine.ExecutionPayloadBodyV1, 0, uint64(count))
	for i := uint64(start); i <= last; i++ {
		block := api.eth.BlockChain().GetBlockByNumber(i)
		bodies = append(bodies, getBody(block))
	}
	return bodies, nil
}
```

### Function: getBody

The `getBody` function takes in a `*types.Block` and returns an `engine.ExecutionPayloadBodyV1` struct containing the transaction data and withdrawals for the block. It first checks if the block is nil and returns nil if it is. Otherwise, it retrieves the transaction data and withdrawals from the block's body and returns an `engine.ExecutionPayloadBodyV1` struct containing them.

```go
func getBody(block *types.Block) *engine.ExecutionPayloadBodyV1 {
	if block == nil {
		return nil
	}

	var (
		body        = block.Body()
		txs         = make([]hexutil.Bytes, len(body.Transactions))
		withdrawals = body.Withdrawals
	)

	for j, tx := range body.Transactions {
		data, _ := tx.MarshalBinary()
		txs[j] = hexutil.Bytes(data)
	}

	// Post-shanghai withdrawals MUST be set to empty slice instead of nil
	if withdrawals == nil && block.Header().WithdrawalsHash != nil {
		withdrawals = make([]*types.Withdrawal, 0)
	}

	return &engine.ExecutionPayloadBodyV1{
		TransactionData: txs,
		Withdrawals:     withdrawals,
	}
}
```