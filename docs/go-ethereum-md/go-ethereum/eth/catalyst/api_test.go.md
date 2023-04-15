# Catalyst Ethereum Codebase Documentation

This is the documentation for the Catalyst Ethereum codebase. The codebase is written in Go and is used to interact with the Ethereum network.

## Package: catalyst

The `catalyst` package contains the implementation of the Catalyst Ethereum client.

### Function: generateMergeChain

The `generateMergeChain` function generates a merge chain with the specified number of blocks and whether or not the chain is merged. It returns the genesis block and a slice of blocks.

```go
func generateMergeChain(n int, merged bool) (*core.Genesis, []*types.Block)
```

### Function: TestEth2AssembleBlock

The `TestEth2AssembleBlock` function tests the `Eth2AssembleBlock` function of the `ConsensusAPI` struct. It creates a merge chain, starts an Ethereum service, and tests the `Eth2AssembleBlock` function with a signed transaction.

```go
func TestEth2AssembleBlock(t *testing.T)
```

## Package: ethclient

The `ethclient` package contains the implementation of the Ethereum client.

### Function: getFeeHistory

The `getFeeHistory` function takes in a `context.Context` and a `*ethclient.Client` and returns the fee history of the Ethereum network. It first creates a new instance of the `ethclient.FeeHistory` struct and calls its `GetFeeHistory` method with the provided context. If there is an error during the call, it returns an error. ## Eth2 Consensus API

### Function: TestEth2AssembleBlockWithTxs

The `TestEth2AssembleBlockWithTxs` function tests the ability of the consensus API to assemble a block with a transaction. It generates a chain of 10 blocks, starts an Ethereum service, and creates a new instance of the consensus API. It then creates a new transaction, signs it, and adds it to the transaction pool. The function then creates a new block with the transaction using the `assembleWithTransactions` function and adds it to the blockchain. Finally, it checks that the block was added to the blockchain successfully.

### Function: assembleWithTransactions

The `assembleWithTransactions` function tries to assemble a block with a specified number of transactions, retrying until it has the desired number of transactions or it has retried three times. It takes in a `*ConsensusAPI`, a parent block hash, a `*engine.PayloadAttributes`, and the desired number of transactions. It returns an `*engine.ExecutableData` and an error.

### Function: TestEth2AssembleBlockWithAnotherBlocksTxs

The `TestEth2AssembleBlockWithAnotherBlocksTxs` function tests the ability of the consensus API to assemble a block with transactions from another block. It generates a chain of 10 blocks, starts an Ethereum service, and creates a new instance of the consensus API. It then adds the transactions from the 10th block to the transaction pool and creates a new block with the transactions using the `assembleWithTransactions` function. Finally, it checks ## Documentation for Ethereum Codebase

### Function: atalf

The `atalf` function takes in a string and an error and logs the formatted string with the error message. It then calls `os.Exit(1)` to terminate the program.

```go
func atalf(format string, a ...interface{}) {
	log.Fatalf(format, a...)
	os.Exit(1)
}
```

### Function: checkLogEvents

The `checkLogEvents` function takes in a testing object, a channel of log events, a channel of removed log events, the expected number of new log events, and the expected number of removed log events. It first checks if the length of the log events channel matches the expected number of new log events and the length of the removed log events channel matches the expected number of removed log events. If either of these checks fails, it logs a fatal error. Finally, it drains the log events and removed log events channels.

```go
func checkLogEvents(t *testing.T, logsCh <-chan []*types.Log, rmLogsCh <-chan core.Rem ## Documentation for Ethereum Codebase

### Function: TestEth2DeepReorg

The `TestEth2DeepReorg` function is a test function that is currently broken. It is designed to test the reorganization of the Ethereum blockchain when a deep reorganization occurs. It generates a merge chain with a length of `core.TriesInMemory * 2` and starts an Ethereum service with the generated chain. It then attempts to reorganize the chain by creating new blocks and inserting them into the chain. However, the test is currently broken because it tries to reorganize the chain before the `totalTerminalDifficulty` threshold is reached.

### Function: TestEth2MergeChain

The `TestEth2MergeChain` function is a test function that tests the creation of a merge chain in the Ethereum blockchain. It generates a merge chain with a length of `core.TriesInMemory * 2` and starts an Ethereum service with the generated chain. It then creates new blocks and inserts them into the chain to test the functionality of the merge chain.

### Function: assembleBlock

The `assembleBlock` function takes in a `ConsensusAPI` object, a parent block ## Documentation for Ethereum Codebase

### Function: startEthService

The `startEthService` function takes in a `*testing.T`, a `*core.Genesis`, and a slice of `*types.Block` and returns a `*node.Node` and a `*eth.Ethereum`. It creates a new instance of a full node for testing, sets the Ethereum configuration, and inserts the provided blocks into the blockchain. It then sets the etherbase and marks the node as synced. Finally, it returns the node and Ethereum instances.

```go
func startEthService(t *testing.T, genesis *core.Genesis, blocks []*types.Block) (*node.Node, *eth.Ethereum) {
	n, err := node.New(&node.Config{
		P2P: p2p.Config{
			ListenAddr:  "0.0.0.0:0",
			NoDiscovery: true,
			MaxPeers:    25,
		}})
	if err != nil {
		t.Fatal("can't create node:", err)
	}

	ethcfg := &ethconfig.Config{Genesis: genesis, Ethash: ethash.Config{PowMode: eth ## Documentation for Ethereum Codebase

### Function: ExchangeTransitionConfigurationV1

The `ExchangeTransitionConfigurationV1` function takes in a `TransitionConfigurationV1` struct and returns an `ExecutableData` struct. It first checks if the provided configuration is valid by checking the terminal total difficulty, terminal block hash, and terminal block number. If any of these values are invalid, it returns an error. Otherwise, it creates a new instance of the `engine.ExecutableData` struct and sets its fields based on the provided configuration. Finally, it returns the `engine.ExecutableData` struct.

```go
func ExchangeTransitionConfigurationV1(config TransitionConfigurationV1) (*engine.ExecutableData, error) {
	if err := config.Validate(); err != nil {
		return nil, err
	}
	execData := engine.NewExecutableData()
	execData.TerminalTotalDifficulty = (*big.Int)(config.TerminalTotalDifficulty)
	execData.TerminalBlockHash = config.TerminalBlockHash
	execData.TerminalBlockNumber = config.TerminalBlockNumber
	return execData, nil
}
```

### Function: TestNewPayloadOnInvalidChain

The `TestNewPayloadOnInvalidChain` function sets up a valid chain and tries to feed blocks from an invalid chain ## Documentation for ConsensusAPI Codebase

### Function: assembleBlock

The `assembleBlock` function takes in a `*ConsensusAPI`, a `common.Hash`, and a `*engine.PayloadAttributes` and returns an `*engine.ExecutableData` and an error. It first creates a `*miner.BuildPayloadArgs` struct with the provided parameters and calls the `BuildPayload` method of the `api.eth.Miner()` object with the created struct. If there is an error during the call, it returns an error. Otherwise, it resolves the payload and returns the `ExecutionPayload` of the resulting `*engine.ExecutableData` struct.

```go
func assembleBlock(api *ConsensusAPI, parentHash common.Hash, params *engine.PayloadAttributes) (*engine.ExecutableData, error) {
	args := &miner.BuildPayloadArgs{
		Parent:       parentHash,
		Timestamp:    params.Timestamp,
		FeeRecipient: params.SuggestedFeeRecipient,
		Random:       params.Random,
		Withdrawals:  params.Withdrawals,
	}
	payload, err := api.eth.Miner().BuildPayload(args)
	if err != nil {
		return nil, err
	}
	return payload.ResolveFull().ExecutionPayload, nil
}
```

### Function: TestEmptyBlocks

The `TestEmptyBlocks` function is a test function that takes in a `*testing.T` object. It first generates a chain of blocks with the `generateMergeChain` function and starts an Ethereum service with ## Documentation for eData

The `eData` function takes in a `PayloadAttributes` struct and returns a payload. The `PayloadAttributes` struct contains the timestamp, random hash, suggested fee recipient, and withdrawals. The function calls the `assembleBlock` function to create a block with the provided attributes and returns the resulting payload.

```go
func eData(api engine.API, parent *types.Header, withdrawals []*types.Log) (*engine.ExecutableData, error) {
	params := engine.PayloadAttributes{
		Timestamp:             parent.Time + 1,
		Random:                crypto.Keccak256Hash([]byte{byte(1)}),
		SuggestedFeeRecipient: parent.Coinbase,
		Withdrawals:           withdrawals,
	}

	payload, err := assembleBlock(api, parent.Hash(), &params)
	if err != nil {
		return nil, err
	}
	return payload, nil
}
```

The `setBlockhash` function takes in an `ExecutableData` struct and sets its blockhash to make it look valid. It first decodes the transactions in the payload using the `decodeTransactions` function. Then, it creates a new `types.Header` struct with the necessary fields and creates a new block with the header and transactions. Finally, it sets the blockhash of the payload to the hash of the block and returns the modified payload.

```go
func setBlockhash(data *engine.ExecutableData) ## Documentation for ConsensusAPI

### Function: TestInvalidChain

The `TestInvalidChain` function is a test function that checks if the status of a chain is invalid when it is invalid. It generates a merge chain with 10 blocks and starts an Ethereum service with it. It then checks if the status of the chain is invalid when a payload with an invalid bloom filter is sent. If the status is not invalid, it throws an error.

### Function: TestInvalidBloom

The `TestInvalidBloom` function is a test function that checks if the status of a payload is invalid when it has an invalid bloom filter. It generates a merge chain with 10 blocks and starts an Ethereum service with it. It then sets up 10 blocks on the canonical chain and sends a normal payload with an appended byte to the logs bloom filter. It checks if the status of the payload is invalid. If the status is not invalid, it throws an error.

### Function: TestNewPayloadOnInvalidTerminalBlock

The `TestNewPayloadOnInvalidTerminalBlock` function is a test function that checks if the status of a payload is invalid when it is sent on an invalid terminal block. It generates a merge chain with 100 blocks and starts an Ethereum service with it. It then sends a fork choice update with an invalid terminal block and checks if the status of the payload is invalid. It then prepares a payload with a parent that is already post TTD in NewPayload and sends it. ## Documentation for Ethereum Codebase

### Function: i++

The `i++` function is not a function, but rather a loop incrementing the value of `i` by 1. It is used to iterate through a loop 10 times.

### Function: assembleBlock

The `assembleBlock` function takes in an `api`, a `parent` hash, and a `PayloadAttributes` struct and returns executable data for a block. It first creates a new instance of the `engine.Payload` struct and calls its `AssembleBlock` method with the provided parent hash and payload attributes. If there is an error during the call, it returns an error. Otherwise, it returns the resulting `engine.ExecutableData` struct.

```go
func assembleBlock(api *ConsensusAPI, parent common.Hash, attrs *engine.PayloadAttributes) (*engine.ExecutableData, error) {
	payload := engine.NewPayload(api.backend, parent, attrs)
	return payload.AssembleBlock()
}
```

### Function: TestWithdrawals

The `TestWithdrawals` function creates and verifies two post-Shanghai blocks. The first includes zero withdrawals and the second includes two. It first generates a merge chain with 10 blocks and sets the Shanghai time to the last block's time plus 5 seconds. It ## Documentation for Ethereum Codebase

### Function: TestWithdrawals

The `TestWithdrawals` function is a test function that tests the withdrawal functionality of the Ethereum network. It first generates a merge chain with 10 blocks and sets the Shanghai time to the last block + 4 seconds. It then starts the Ethereum service and creates a new consensus API. The function then tests various scenarios for withdrawals, including before and after the Shanghai time, with and without withdrawals, and with invalid withdrawals. It verifies that the withdrawals were processed correctly and returns an error if any of the tests fail.

### Function: TestNilWithdrawals

The `TestNilWithdrawals` function is a test function that tests the withdrawal functionality of the Ethereum network when there are no withdrawals. It first generates a merge chain with 10 blocks and sets the Shanghai time to the last block + 4 seconds. It then starts the Ethereum service and creates a new consensus API. The function then tests various scenarios for withdrawals, including before and after the Shanghai time, with and without withdrawals, and with invalid withdrawals. It verifies that the withdrawals were processed correctly and returns an error if any of the tests ## Documentation for `rkchoiceUpdatedV2` function

The `rkchoiceUpdatedV2` function takes in a `fcState` and a `blockParams` and updates the `fcState` with the new block parameters. If the `blockParams` contain invalid withdrawals, the function returns an error. Otherwise, it updates the `fcState` with the new block parameters and returns `nil`.

```go
func rkchoiceUpdatedV2(fcState *state.FcState, blockParams *types.BlockParams) error {
	if err := fcState.ValidateWithdrawals(blockParams.Withdrawals); err != nil {
		return err
	}
	fcState.UpdateBlockParams(blockParams)
	return nil
}
```

## Documentation for `setupBodies` function

The `setupBodies` function sets up a test environment for testing the `GetBlockBodiesByHash` function. It generates a chain of 10 blocks, enables Shanghai on the last block, and adds a contract creation transaction to the block. It also generates a slice of withdrawals for each block and sets up the post-Shanghai blocks. Finally, it returns the This codebase seems to be a test suite for the `ConsensusAPI` struct. The `ConsensusAPI` struct is used to provide an API for consensus-related functionality to the Ethereum node. The tests in this file are testing the `GetPayloadBodiesByHashV1` and `GetPayloadBodiesByRangeV1` methods of the `ConsensusAPI` struct.

The `GetPayloadBodiesByHashV1` method takes a slice of `common.Hash` values and returns a slice of `*types.Body` values. The `*types.Body` type represents the body of an Ethereum block. The method returns the bodies of the blocks corresponding to the input hashes.

The `GetPayloadBodiesByRangeV1` method takes two `hexutil.Uint64` values, `start` and `count`, and returns a slice of `*engine.ExecutionPayloadBodyV1` values. The `*engine.ExecutionPayloadBodyV1` type represents the body of an Ethereum block. The method returns the bodies of the blocks in the range `[start, start+count)`.

The `TestGetBlockBodiesByHash` function tests the `GetPayloadBodiesByHashV1` method. It creates a `ConsensusAPI` instance and a slice of `*types.Block` values. It then creates a slice of test cases, where each test case contains a slice of expected `*types.Body` values and a slice of input `common.Hash` values. The function then iterates over the test cases, calls the `GetPayloadBodiesByHashV1` method with the input hashes, and compares the returned `*types.Body` values with the expected values.

The `TestGetBlockBodiesByRange` function tests the `GetPayloadBodiesByRangeV1` method. It creates a `ConsensusAPI` instance and a slice of `*types.Block` values. It then creates a slice of test cases, where each test case contains a slice of expected `*types.Body` values, a `start` value, and a `count` value. The function then iterates over the test cases, calls the `GetPayloadBodiesByRangeV1` method with the input `start` and `count` values, and compares the returned `*types.Body` values with the expected values.

The `equalBody` function is a helper function used to compare two `*types.Body` values. It returns `true` if the two values are equal, and `false` otherwise.

Here is an example of how to use the `GetPayloadBodiesByHashV1` method:

```
api := NewConsensusAPI(eth)
hashes := []common.Hash{hash1, hash2, hash3}
bodies := api.GetPayloadBodiesByHashV1(hashes)
```

Here is an example of how to use the `GetPayloadBodiesByRangeV1` method:

```
api := NewConsensusAPI(eth)
start := hexutil.Uint64(10)
count := hexutil.Uint64(5)
bodies, err := api.GetPayloadBodiesByRangeV1(start, count)
if err != nil {
    // handle error
}
``` ## Documentation for Codebase

### Function: Equal

The `Equal` function takes in two `Transaction` structs and returns a boolean indicating whether they are equal. It first checks if the `Nonce`, `GasPrice`, `GasLimit`, `To`, `Value`, and `Data` fields of the two structs are equal. If any of these fields are not equal, it returns false. Otherwise, it checks if the `Withdrawals` field of the two structs are equal using the `reflect.DeepEqual` function. If the `Withdrawals` field is not equal, it returns false. If all fields are equal, it returns true.

```go
func Equal(a, b *Transaction) bool {
	if a.Nonce != b.Nonce ||
		a.GasPrice.Cmp(b.GasPrice) != 0 ||
		a.GasLimit != b.GasLimit ||
		a.To != b.To ||
		a.Value.Cmp(b.Value) != 0 ||
		!bytes.Equal(a.Data, b.Data) {
		return false
	}
	for i, data := range a.TransactionData {
		if !Equal(data, b.TransactionData[i]) {
			return false
		}
	}
	return reflect.DeepEqual(a.Withdrawals, b.Withdrawals)
}
```

### Function: TransactionData.Equal

The `Equal` method of the `TransactionData` struct takes in another `TransactionData` struct and returns a boolean indicating whether they are equal. It first checks if the `AccountNonce`, `PricePerPixel`, `GasLimit`, and `Recipient` fields of the two structs are equal. If any of these fields are not equal, it returns false. Otherwise, it checks if the `Data` field of the two structs are equal using the `bytes.Equal` function. If the `Data` field is not equal, it returns false. If all fields are equal, it returns true.

```go
func (td *TransactionData) Equal(other *TransactionData) bool {
	if td.AccountNonce != other.AccountNonce ||
		td.PricePerPixel.Cmp(other.PricePerPixel) != 0 ||
		td.GasLimit != other.GasLimit ||
		td.Recipient != other.Recipient ||
		!bytes.Equal(td.Data, other.Data) {
		return false
	}
	return true
}
```

### Function: Withdrawal.Equal

The `Equal` method of the `Withdrawal` struct takes in another `Withdrawal` struct and returns a boolean indicating whether they are equal. It first checks if the `Account`, `Amount`, and `Token` fields of the two structs are equal. If any of these fields are not equal, it returns false. If all fields are equal, it returns true.

```go
func (w *Withdrawal) Equal(other *Withdrawal) bool {
	return w.Account == other.Account &&
		w.Amount.Cmp(other.Amount) == 0 &&
		w.Token == other.Token
}
```