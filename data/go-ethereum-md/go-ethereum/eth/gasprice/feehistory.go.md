# Gas Price Oracle

The `gasprice` package provides an implementation of a gas price oracle for Ethereum. It calculates the recommended gas price for transactions based on the current state of the network.

## blockFees

`blockFees` is a struct that represents a single block for processing. It contains the block number, header, and receipts, as well as the results of processing the block.

## processedFees

`processedFees` is a struct that contains the results of processing a block. It includes the reward, base fee, next base fee, and gas used ratio.

## txGasAndReward

`txGasAndReward` is a struct that represents a transaction's gas used and reward. It is sorted in ascending order based on reward.

## sortGasAndReward

`sortGasAndReward` is a type that implements the `sort.Interface` interface for sorting `txGasAndReward` structs.

## processBlock

`processBlock` takes a `blockFees` structure with the block number, header, and optionally the block field filled in, retrieves the block from the backend if not present yet, and fills in the rest of the fields.

## Oracle

`Oracle` is the main struct that represents the gas price oracle. It contains the backend, which is used to retrieve blocks and transactions, as well as the cache, which is used to store the results of processing blocks.

## NewOracle

`NewOracle` creates a new gas price oracle with the given backend and cache size.

## SuggestGasPrice

`SuggestGasPrice` calculates the recommended gas price for a transaction based on the current state of the network. It takes in a context, a block number, and a slice of reward percentiles, and returns a big integer representing the recommended gas price.

## SuggestGasTipCap

`SuggestGasTipCap` calculates the recommended gas tip cap for a transaction based on the current state of the network. It takes in a context, a block number, and a slice of reward percentiles, and returns a big integer representing the recommended gas tip cap.

## SuggestGasFeeCap

`SuggestGasFeeCap` calculates the recommended gas fee cap for a transaction based on the current state of the network. It takes in a context, a block number, and a slice of reward percentiles, and returns a big integer representing the recommended gas fee cap. ## Documentation for Ethereum Codebase

### Function: calculatePercentileRewards

The `calculatePercentileRewards` function calculates the effective priority fee per gas for each transaction in a block and sorts them in ascending order. It then calculates the reward for each specified percentile of gas used in the block and stores it in the `bf.results.reward` array. The function takes in a `BlockFilter` struct which contains the block and its corresponding receipts, and a slice of percentiles for which to calculate the rewards.

```go
func calculatePercentileRewards(bf *BlockFilter, percentiles []float64) {
	sorter := make([]txGasAndReward, len(bf.block.Transactions()))

	for i, tx := range bf.block.Transactions() {
		reward, _ := tx.EffectiveGasTip(bf.block.BaseFee())
		sorter[i] = txGasAndReward{gasUsed: bf.receipts[i].GasUsed, reward: reward}
	}
	sort.Stable(sorter)

	var txIndex int
	sumGasUsed := sorter[0].gasUsed

	for i, p := range percentiles {
		thresholdGasUsed := uint64(float64(bf.block.GasUsed()) * p / 100)
		for sumGasUsed < thresholdGasUsed && txIndex < len(bf.block.Transactions())-1 {
			txIndex++
			sumGasUsed += sorter[txIndex].gasUsed
		}
		bf.results.reward[i] = sorter[txIndex].reward
	}
}
```

### Function: resolveBlockRange

The `resolveBlockRange` function resolves the specified block range to absolute block numbers while also enforcing backend specific limitations. It returns the block, its corresponding receipts, the absolute block number of the end of the range, the number of blocks to return, and an error if retrieving the head header has failed. If there are no retrievable blocks in the specified range then zero block count is returned with no error. The function takes in a `BlockNumber` type for the end of the range and a `uint64` for the number of blocks to return.

```go
func (oracle *Oracle) resolveBlockRange(ctx context.Context, reqEnd rpc.BlockNumber, blocks uint64) (*types.Block, []*types.Receipt, uint64, uint64, error) {
	var (
		headBlock       *types.Header
		pendingBlock    *types.Block
		pendingReceipts types.Receipts
		err             error
	)

	// Get the chain's current head.
	if headBlock, err = oracle.backend.HeaderByNumber(ctx, rpc.LatestBlockNumber); err != nil {
		return nil, nil, 0, 0, err
	}
	head := rpc.BlockNumber(headBlock.Number.Uint64())

	// Fail if request block is beyond the chain's current head.
	if head < reqEnd {
		return nil, nil, 0, 0, fmt.Errorf("%w: requested %d, head %d", errRequestBeyondHead, reqEnd, head)
	}

	// Resolve block tag.
	if reqEnd < 0 {
		var (
			resolved *types.Header
			err      error
		)
		switch reqEnd {
		case rpc.PendingBlockNumber:
			if pendingBlock, pendingReceipts = oracle.backend.PendingBlockAndReceipts(); pendingBlock != nil {
				resolved = pendingBlock.Header()
			} else {
				// Pending block not supported by backend, process only until latest block.
				resolved = headBlock

				// Update total blocks to return to account for this.
				blocks--
			}
		case rpc.LatestBlockNumber:
			// Retrieved above.
			resolved = headBlock
		case rpc.SafeBlockNumber:
			resolved, err = oracle.backend.HeaderByNumber(ctx, rpc.SafeBlockNumber)
		case rpc.FinalizedBlockNumber:
			resolved, err = oracle.backend.HeaderByNumber(ctx, rpc.FinalizedBlockNumber)
		case rpc.EarliestBlockNumber:
			resolved, err = oracle.backend.HeaderByNumber(ctx, rpc.EarliestBlockNumber)
		}
		if resolved == nil || err != nil {
			return nil, nil, 0, 0, err
		}
		// Absolute number resolved.
		reqEnd = rpc.BlockNumber(resolved.Number.Uint64())
	}

	// If there are no blocks to return, short circuit.
	if blocks == 0 {
		return nil, nil, 0, 0, nil
	}
	// Ensure not trying to retrieve before genesis.
	if uint64(reqEnd+1) < blocks {
		blocks = uint64(reqEnd + 1)
	}
	return pendingBlock, pendingReceipts, uint64(reqEnd), blocks, nil
}
``` ## Documentation for FeeHistory function

The `FeeHistory` function is a method of the `Oracle` struct that returns the fee history of a given number of blocks. It takes in a context, the number of blocks to retrieve, the last unresolved block number, an array of reward percentiles, and returns the base fee, an array of arrays of fees for each block, an array of base fees for each block, an array of gas used ratios for each block, and an error.

The function first checks if the number of blocks to retrieve is less than 1, in which case it returns with no data and no error. If the number of blocks to retrieve is greater than the maximum header history or block history, it sets the number of blocks to retrieve to the maximum history and logs a warning.

The function then checks if the reward percentiles are valid, i.e., between 0 and 100 and in ascending order. If they are not valid, it returns an error.

The function then resolves the block range using the `resolveBlockRange` function, which returns the pending block, pending receipts, last block number, and the number of blocks to retrieve. If there is an error or the number of blocks to retrieve is 0, it returns an error.

The function then initializes variables for the oldest block, the next block to fetch, and a channel for the results. It also creates a byte slice for the percentile key.

The function then starts a number of goroutines to fetch the fees for each block in the range. Each goroutine retrieves the next block number to fetch and fetches the fees for that block. If the block is in the pending block range, it uses the pending block and receipts. Otherwise, it checks the cache for the fees for that block. If the fees are not in the cache, it fetches the block and receipts or header and processes the block to calculate the fees. If there is an error, it returns the error. If the fees are calculated successfully, it adds them to the cache and sends them to the results channel.

The function then initializes variables for the reward, base fee, gas used ratio, and the first missing block. It then retrieves the fees for each block from the results channel and adds them to the appropriate arrays. If there is an error, it returns the error.

Finally, it returns the base fee, the array of arrays of fees for each block, the array of base fees for each block, the array of gas used ratios for each block, and nil. ## Documentation for Ethereum Codebase

### Function: getFeeHistory

The `getFeeHistory` function takes in a `context.Context` and a `*ethclient.Client` and returns the fee history of the Ethereum network. It first creates a new instance of the `ethclient.FeeHistory` struct and calls its `GetFeeHistory` method with the provided context. If there is an error during the call, it returns an error. Otherwise, it returns the `ethclient.FeeHistory` struct.

```go
func getFeeHistory(ctx context.Context, client *ethclient.Client) (*ethclient.FeeHistory, error) {
	feeHistory := ethclient.NewFeeHistory(client)
	return feeHistory.GetFeeHistory(ctx)
}
```

### Function: getFeePercentiles

The `getFeePercentiles` function takes in a `context.Context`, a `*ethclient.Client`, and a slice of percentiles and returns the corresponding fee percentiles for the Ethereum network. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calculates the fee percentiles for the provided percentiles using the `ethclient.FeeHistory` struct's `Percentiles` method and returns them.

```go
func getFeePercentiles(ctx context.Context, client *ethclient.Client, percentiles []float64) ([]*big.Int, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.Percentiles(percentiles)
}
```

### Function: getFeeStats

The `getFeeStats` function takes in a `context.Context`, a `*ethclient.Client`, and a block number and returns the fee statistics for the specified block. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeStats` method with the provided block number and returns the resulting `ethclient.FeeStats` struct.

```go
func getFeeStats(ctx context.Context, client *ethclient.Client, blockNumber uint64) (*ethclient.FeeStats, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeStats(ctx, blockNumber)
}
```

### Function: getFeeHistoryByTime

The `getFeeHistoryByTime` function takes in a `context.Context`, a `*ethclient.Client`, a start time, and an end time and returns the fee history for the specified time range. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByTime` method with the provided start and end times and returns the resulting `ethclient.FeeHistoryByTime` struct.

```go
func getFeeHistoryByTime(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time) (*ethclient.FeeHistoryByTime, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByTime(ctx, startTime, endTime)
}
```

### Function: getFeeHistoryByBlock

The `getFeeHistoryByBlock` function takes in a `context.Context`, a `*ethclient.Client`, a start block number, and an end block number and returns the fee history for the specified block range. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByBlock` method with the provided start and end block numbers and returns the resulting `ethclient.FeeHistoryByBlock` struct.

```go
func getFeeHistoryByBlock(ctx context.Context, client *ethclient.Client, startBlock, endBlock uint64) (*ethclient.FeeHistoryByBlock, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByBlock(ctx, startBlock, endBlock)
}
```

### Function: getFeeHistoryByTimeAndBlock

The `getFeeHistoryByTimeAndBlock` function takes in a `context.Context`, a `*ethclient.Client`, a start time, an end time, a start block number, and an end block number and returns the fee history for the specified time range and block range. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByTimeAndBlock` method with the provided start and end times and block numbers and returns the resulting `ethclient.FeeHistoryByTimeAndBlock` struct.

```go
func getFeeHistoryByTimeAndBlock(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time, startBlock, endBlock uint64) (*ethclient.FeeHistoryByTimeAndBlock, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByTimeAndBlock(ctx, startTime, endTime, startBlock, endBlock)
}
```

### Function: getFeeHistoryByBlockRange

The `getFeeHistoryByBlockRange` function takes in a `context.Context`, a `*ethclient.Client`, a start block number, an end block number, and a slice of percentiles and returns the fee history for the specified block range and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByBlockRange` method with the provided start and end block numbers and percentiles and returns the resulting `ethclient.FeeHistoryByBlockRange` struct.

```go
func getFeeHistoryByBlockRange(ctx context.Context, client *ethclient.Client, startBlock, endBlock uint64, percentiles []float64) (*ethclient.FeeHistoryByBlockRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByBlockRange(ctx, startBlock, endBlock, percentiles)
}
```

### Function: getFeeHistoryByTimeRange

The `getFeeHistoryByTimeRange` function takes in a `context.Context`, a `*ethclient.Client`, a start time, an end time, and a slice of percentiles and returns the fee history for the specified time range and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByTimeRange` method with the provided start and end times and percentiles and returns the resulting `ethclient.FeeHistoryByTimeRange` struct.

```go
func getFeeHistoryByTimeRange(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time, percentiles []float64) (*ethclient.FeeHistoryByTimeRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByTimeRange(ctx, startTime, endTime, percentiles)
}
```

### Function: getFeeHistoryByTimeAndBlockRange

The `getFeeHistoryByTimeAndBlockRange` function takes in a `context.Context`, a `*ethclient.Client`, a start time, an end time, a start block number, an end block number, and a slice of percentiles and returns the fee history for the specified time range, block range, and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeHistoryByTimeAndBlockRange` method with the provided start and end times, block numbers, and percentiles and returns the resulting `ethclient.FeeHistoryByTimeAndBlockRange` struct.

```go
func getFeeHistoryByTimeAndBlockRange(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time, startBlock, endBlock uint64, percentiles []float64) (*ethclient.FeeHistoryByTimeAndBlockRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeHistoryByTimeAndBlockRange(ctx, startTime, endTime, startBlock, endBlock, percentiles)
}
```

### Function: getFeeStatsForBlockRange

The `getFeeStatsForBlockRange` function takes in a `context.Context`, a `*ethclient.Client`, a start block number, an end block number, and a slice of percentiles and returns the fee statistics for the specified block range and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeStatsForBlockRange` method with the provided start and end block numbers and percentiles and returns the resulting `ethclient.FeeStatsForBlockRange` struct.

```go
func getFeeStatsForBlockRange(ctx context.Context, client *ethclient.Client, startBlock, endBlock uint64, percentiles []float64) (*ethclient.FeeStatsForBlockRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeStatsForBlockRange(ctx, startBlock, endBlock, percentiles)
}
```

### Function: getFeeStatsForTimeRange

The `getFeeStatsForTimeRange` function takes in a `context.Context`, a `*ethclient.Client`, a start time, an end time, and a slice of percentiles and returns the fee statistics for the specified time range and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeStatsForTimeRange` method with the provided start and end times and percentiles and returns the resulting `ethclient.FeeStatsForTimeRange` struct.

```go
func getFeeStatsForTimeRange(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time, percentiles []float64) (*ethclient.FeeStatsForTimeRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeStatsForTimeRange(ctx, startTime, endTime, percentiles)
}
```

### Function: getFeeStatsForTimeAndBlockRange

The `getFeeStatsForTimeAndBlockRange` function takes in a `context.Context`, a `*ethclient.Client`, a start time, an end time, a start block number, an end block number, and a slice of percentiles and returns the fee statistics for the specified time range, block range, and percentiles. It first calls the `getFeeHistory` function to retrieve the fee history. If there is an error during the call, it returns an error. Otherwise, it calls the `ethclient.FeeHistory` struct's `FeeStatsForTimeAndBlockRange` method with the provided start and end times, block numbers, and percentiles and returns the resulting `ethclient.FeeStatsForTimeAndBlockRange` struct.

```go
func getFeeStatsForTimeAndBlockRange(ctx context.Context, client *ethclient.Client, startTime, endTime time.Time, startBlock, endBlock uint64, percentiles []float64) (*ethclient.FeeStatsForTimeAndBlockRange, error) {
	feeHistory, err := getFeeHistory(ctx, client)
	if err != nil {
		return nil, err
	}
	return feeHistory.FeeStatsForTimeAndBlockRange(ctx, startTime, endTime, startBlock, endBlock, percentiles)
}
```

###