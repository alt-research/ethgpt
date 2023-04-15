# Gas Price Oracle

The `gasprice` package provides a gas price oracle that recommends suitable gas prices for newly created transactions based on the content of recent blocks. It is suitable for both light and full clients.

## OracleBackend Interface

The `OracleBackend` interface includes all necessary background APIs for the oracle. It defines the following methods:

- `HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error)`: Returns the header of the block with the given number.
- `BlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error)`: Returns the block with the given number.
- `GetReceipts(ctx context.Context, hash common.Hash) (types.Receipts, error)`: Returns the receipts for the block with the given hash.
- `PendingBlockAndReceipts() (*types.Block, types.Receipts)`: Returns the pending block and its receipts.
- `ChainConfig() *params.ChainConfig`: Returns the chain configuration.
- `SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription`: Subscribes to chain head events.

## Oracle Struct

The `Oracle` struct represents the gas price oracle. It has the following fields:

- `backend`: The `OracleBackend` used by the oracle.
- `lastHead`: The hash of the last block processed by the oracle.
- `lastPrice`: The last recommended gas price.
- `maxPrice`: The maximum gas price that the oracle will recommend.
- `ignorePrice`: The minimum gas price that the oracle will consider.
- `cacheLock`: A mutex used to protect the cache.
- `fetchLock`: A mutex used to protect against concurrent fetches.
- `checkBlocks`: The number of blocks to sample for gas prices.
- `percentile`: The percentile of gas prices to recommend.
- `maxHeaderHistory`: The maximum number of headers to keep in the cache.
- `maxBlockHistory`: The maximum number of blocks to keep in the cache.
- `historyCache`: An LRU cache used to store processed fees.

The `NewOracle` function returns a new gas price oracle with the given `OracleBackend` and configuration parameters. The configuration parameters include the number of blocks to sample for gas prices, the percentile of gas prices to recommend, the maximum number of headers to keep in the cache, the maximum number of blocks to keep in the cache, the default gas price, the maximum gas price, and the minimum gas price.

## Functions

The `gasprice` package defines the following functions:

### `DefaultMaxPrice`

`DefaultMaxPrice` is a default maximum gas price of 500 GWei.

### `DefaultIgnorePrice`

`DefaultIgnorePrice` is a default minimum gas price of 2 Wei.

### `NewOracle`

`NewOracle` returns a new gas price oracle with the given `OracleBackend` and configuration parameters.

```go
func NewOracle(backend OracleBackend, params Config) *Oracle
```

### `Oracle.Check`

`Check` returns the recommended gas price for a new transaction.

```go
func (o *Oracle) Check(ctx context.Context) (*big.Int, error)
```

### `Oracle.LastPrice`

`LastPrice` returns the last recommended gas price.

```go
func (o *Oracle) LastPrice() *big.Int
```

### `Oracle.SetLastPrice`

`SetLastPrice` sets the last recommended gas price.

```go
func (o *Oracle) SetLastPrice(price *big.Int)
```

### `Oracle.SetMaxPrice`

`SetMaxPrice` sets the maximum gas price that the oracle will recommend.

```go
func (o *Oracle) SetMaxPrice(price *big.Int)
```

### `Oracle.SetIgnorePrice`

`SetIgnorePrice` sets the minimum gas price that the oracle will consider.

```go
func (o *Oracle) SetIgnorePrice(price *big.Int)
```

### `Oracle.ProcessBlock`

`ProcessBlock` processes the given block and updates the cache.

```go
func (o *Oracle) ProcessBlock(block *types.Block, receipts types.Receipts)
```

### `Oracle.ProcessBlockHeader`

`ProcessBlockHeader` processes the given block header and updates the cache.

```go
func (o *Oracle) ProcessBlockHeader(header *types.Header)
```

### `Oracle.ProcessTransaction`

`ProcessTransaction` processes the given transaction and updates the cache.

```go
func (o *Oracle) ProcessTransaction(tx *types.Transaction, block *types.Block, receipt *types.Receipt)
```

### `Oracle.ProcessReceipts`

`ProcessReceipts` processes the given receipts and updates the cache.

```go
func (o *Oracle) ProcessReceipts(receipts types.Receipts, block *types.Block)
```

### `Oracle.GetGasPrice`

`GetGasPrice` returns the recommended gas price for a new transaction.

```go
func (o *Oracle) GetGasPrice(ctx context.Context) (*big.Int, error)
```

### `Oracle.GetGasPriceWithCache`

`GetGasPriceWithCache` returns the recommended gas price for a new transaction using the cache.

```go
func (o *Oracle) GetGasPriceWithCache(ctx context.Context) (*big.Int, error)
```

### `Oracle.GetGasPriceWithoutCache`

`GetGasPriceWithoutCache` returns the recommended gas price for a new transaction without using the cache.

```go
func (o *Oracle) GetGasPriceWithoutCache(ctx context.Context) (*big.Int, error)
```

### `Oracle.GetGasPriceByBlockNumber`

`GetGasPriceByBlockNumber` returns the recommended gas price for a new transaction at the given block number.

```go
func (o *Oracle) GetGasPriceByBlockNumber(ctx context.Context, blockNumber *big.Int) (*big.Int, error)
```

### `Oracle.GetGasPriceByBlockHash`

`GetGasPriceByBlockHash` returns the recommended gas price for a new transaction at the given block hash.

```go
func (o *Oracle) GetGasPriceByBlockHash(ctx context.Context, blockHash common.Hash) (*big.Int, error)
```

### `Oracle.GetGasPriceByBlock`

`GetGasPriceByBlock` returns the recommended gas price for a new transaction at the given block.

```go
func (o *Oracle) GetGasPriceByBlock(ctx context.Context, block *types.Block) (*big.Int, error)
```

### `Oracle.GetGasPriceByHeader`

`GetGasPriceByHeader` returns the recommended gas price for a new transaction at the given block header.

```go
func (o *Oracle) GetGasPriceByHeader(ctx context.Context, header *types.Header) (*big.Int, error)
```

### `Oracle.GetGasPriceByTransaction`

`GetGasPriceByTransaction` returns the recommended gas price for a new transaction based on the given transaction.

```go
func (o *Oracle) GetGasPriceByTransaction(ctx context.Context, tx *types.Transaction) (*big.Int, error)
```

### `Oracle.GetGasPriceByFeeHistory`

`GetGasPriceByFeeHistory` returns the recommended gas price for a new transaction based on the given fee history.

```go
func (o *Oracle) GetGasPriceByFeeHistory(ctx context.Context, feeHistory []FeeHistory) (*big.Int, error)
```

### `Oracle.GetFeeHistory`

`GetFeeHistory` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistory(ctx context.Context, fromBlock, toBlock *big.Int) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByBlockNumber`

`GetFeeHistoryByBlockNumber` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByBlockNumber(ctx context.Context, fromBlockNumber, toBlockNumber *big.Int) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByBlockHash`

`GetFeeHistoryByBlockHash` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByBlockHash(ctx context.Context, fromBlockHash, toBlockHash common.Hash) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByBlock`

`GetFeeHistoryByBlock` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByBlock(ctx context.Context, fromBlock, toBlock *types.Block) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByHeader`

`GetFeeHistoryByHeader` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByHeader(ctx context.Context, fromHeader, toHeader *types.Header) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByTransaction`

`GetFeeHistoryByTransaction` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByTransaction(ctx context.Context, tx *types.Transaction) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByReceipt`

`GetFeeHistoryByReceipt` returns the fee history for the given block range.

```go
func (o *Oracle) GetFeeHistoryByReceipt(ctx context.Context, receipt *types.Receipt) ([]FeeHistory, error)
```

### `Oracle.GetFeeHistoryByBlockAndIndex`

`GetFeeHistoryByBlockAnd # Gas Price Oracle

The Gas Price Oracle is a module that provides a suggested gas price for Ethereum transactions. It is used to estimate the gas price required for a transaction to be included in the next block. The suggested gas price is based on the current state of the Ethereum network and is calculated using a percentile of the gas prices of recent blocks.

## Function: NewOracle

The `NewOracle` function creates a new Gas Price Oracle instance. It takes in a `backend` parameter, which is an Ethereum client backend, and a `params` parameter, which is a `GasPriceOracleParams` struct that contains the configuration parameters for the Gas Price Oracle. The function returns a pointer to a new `Oracle` instance.

```go
func NewOracle(backend Backend, params GasPriceOracleParams) *Oracle {
	// ...
}
```

## Function: SuggestTipCap

The `SuggestTipCap` function returns a suggested tip cap for Ethereum transactions. It takes in a `ctx` parameter, which is a context.Context instance, and returns a pointer to a `big.Int` instance and an error. The `big.Int` instance represents the suggested tip cap, and the error is returned if there is an error fetching the suggested tip cap.

```go
func (oracle *Oracle) SuggestTipCap(ctx context.Context) (*big.Int, error) {
	// ...
}
```

## Implementation Details

The Gas Price Oracle uses a cache to store the last calculated gas price and the block hash of the block that the gas price was calculated for. When `SuggestTipCap` is called, the Gas Price Oracle first checks the cache to see if the last calculated gas price is still valid. If it is, the function returns the cached gas price. If the cached gas price is not valid, the Gas Price Oracle fetches the gas prices of recent blocks and calculates a new gas price based on a percentile of the gas prices.

The Gas Price Oracle fetches the gas prices of recent blocks by calling the `getBlockValues` function. This function takes in a `ctx` parameter, which is a context.Context instance, a `signer` parameter, which is a `types.Signer` instance, a `number` parameter, which is the block number to fetch the gas prices for, a `sampleNumber` parameter, which is the number of transactions to sample from each block, an `ignorePrice` parameter, which is a threshold gas price to ignore, a `result` parameter, which is a channel to send the results to, and a `quit` parameter, which is a channel to signal the function to stop fetching gas prices. The function fetches the gas prices of the specified block and sends the results to the `result` channel. If there is an error fetching the gas prices, the function sends the error to the `result` channel and closes the `quit` channel.

The Gas Price Oracle calculates a new gas price based on a percentile of the gas prices of recent blocks. It uses a cache to store the gas prices of recent blocks and purges the cache when a new block is added to the chain. The Gas Price Oracle calculates the percentile gas price by sorting the gas prices in the cache and selecting the gas price at the specified percentile. If there are not enough gas prices in the cache, the Gas Price Oracle fetches more gas prices until it has enough to calculate the percentile gas price. ## Documentation for Oracle Codebase

### Function: NewOracle

The `NewOracle` function creates a new instance of the `Oracle` struct. It takes in a `backend` parameter of type `Backend` and a `percentile` parameter of type `int`. It initializes the `backend`, `percentile`, `maxPrice`, `lastHead`, `lastPrice`, and `cacheLock` fields of the `Oracle` struct and returns a pointer to the new instance.

```go
func NewOracle(backend Backend, percentile int) *Oracle {
	return &Oracle{
		backend:    backend,
		percentile: percentile,
		maxPrice:   big.NewInt(0),
		lastHead:   common.Hash{},
		lastPrice:  big.NewInt(0),
		cacheLock:  new(sync.Mutex),
	}
}
```

### Function: GetGasPrice

The `GetGasPrice` function calculates the gas price for a transaction based on the current state of the Ethereum network. It takes in a `context.Context` parameter and returns a `*big.Int` and an `error`. It first checks if the `lastHead` and `lastPrice` fields of the `Oracle` struct are up-to-date. If they are, it returns the `lastPrice` field. If they are not, it calculates the gas price by calling the `getBlockValues` function and taking the `percentile`-th percentile of the gas prices. It then updates the `lastHead` and `lastPrice` fields and returns the calculated gas price.

```go
func (oracle *Oracle) GetGasPrice(ctx context.Context) (*big.Int, error) {
	oracle.cacheLock.Lock()
	defer oracle.cacheLock.Unlock()

	headHash := oracle.backend.CurrentBlock().Hash()
	if headHash == oracle.lastHead {
		return new(big.Int).Set(oracle.lastPrice), nil
	}

	// Calculate the gas price by sampling the last 10 blocks.
	var values bigIntArray
	result := make(chan results, 10)
	quit := make(chan struct{})
	defer close(quit)
	for i := 0; i < 10; i++ {
		go oracle.getBlockValues(ctx, oracle.backend.Signer(), oracle.backend.CurrentBlock().NumberU64()-uint64(i), 10, nil, result, quit)
	}
	for i := 0; i < 10; i++ {
		res := <-result
		if res.err != nil {
			return nil, res.err
		}
		if res.values != nil {
			values = append(values, res.values...)
		}
	}
	if len(values) == 0 {
		return nil, errors.New("no gas prices found")
	}
	sort.Sort(values)
	price := values[(len(values)-1)*oracle.percentile/100]
	if price.Cmp(oracle.maxPrice) > 0 {
		price = new(big.Int).Set(oracle.maxPrice)
	}
	oracle.cacheLock.Lock()
	oracle.lastHead = headHash
	oracle.lastPrice = price
	oracle.cacheLock.Unlock()

	return new(big.Int).Set(price), nil
}
```

### Function: getBlockValues

The `getBlockValues` function calculates the lowest transaction gas price in a given block and sends it to the `result` channel. It takes in a `context.Context` parameter, a `signer` parameter of type `types.Signer`, a `blockNum` parameter of type `uint64`, a `limit` parameter of type `int`, an `ignoreUnder` parameter of type `*big.Int`, a `result` channel of type `chan results`, and a `quit` channel of type `chan struct{}`. It first gets the block with the given block number from the `backend`. It then sorts the transactions in the block by effective tip in ascending order. It then iterates through the sorted transactions and adds their gas prices to a slice of `*big.Int`. If the `ignoreUnder` parameter is not `nil`, it skips transactions with a gas price less than `ignoreUnder`. If the sender of the transaction is not the miner of the block, it adds the gas price to the slice. If the slice has reached the `limit`, it stops iterating. It then sends the slice of gas prices to the `result` channel.

```go
func (oracle *Oracle) getBlockValues(ctx context.Context, signer types.Signer, blockNum uint64, limit int, ignoreUnder *big.Int, result chan results, quit chan struct{}) {
	block, err := oracle.backend.BlockByNumber(ctx, rpc.BlockNumber(blockNum))
	if block == nil {
		select {
		case result <- results{nil, err}:
		case <-quit:
		}
		return
	}
	// Sort the transaction by by effective tip in ascending sort.
	txs := make([]*types.Transaction, len(block.Transactions()))
	copy(txs, block.Transactions())
	sorter := newSorter(txs, block.BaseFee())
	sort.Sort(sorter)

	var prices []*big.Int
	for _, tx := range sorter.txs {
		tip, _ := tx.EffectiveGasTip(block.BaseFee())
		if ignoreUnder != nil && tip.Cmp(ignoreUnder) == -1 {
			continue
		}
		sender, err := types.Sender(signer, tx)
		if err == nil && sender != block.Coinbase() {
			prices = append(prices, tip)
			if len(prices) >= limit {
				break
			}
		}
	}
	select {
	case result <- results{prices, nil}:
	case <-quit:
	}
}
```

### Type: results

The `results` type is a struct that contains a slice of `*big.Int` values and an `error` value. It is used as the value type for the `result` channel in the `getBlockValues` function.

```go
type results struct {
	values []*big.Int
	err    error
}
```

### Type: txSorter

The `txSorter` type is a struct that contains a slice of `*types.Transaction` values and a `*big.Int` value. It is used as the value type for the `sorter` variable in the `getBlockValues` function. It implements the `Len`, `Swap`, and `Less` methods required by the `sort.Interface` interface.

```go
type txSorter struct {
	txs     []*types.Transaction
	baseFee *big.Int
}

func newSorter(txs []*types.Transaction, baseFee *big.Int) *txSorter {
	return &txSorter{
		txs:     txs,
		baseFee: baseFee,
	}
}

func (s *txSorter) Len() int { return len(s.txs) }
func (s *txSorter) Swap(i, j int) {
	s.txs[i], s.txs[j] = s.txs[j], s.txs[i]
}
func (s *txSorter) Less(i, j int) bool {
	// It's okay to discard the error because a tx would never be
	// accepted into a block with an invalid effective tip.
	tip1, _ := s.txs[i].EffectiveGasTip(s.baseFee)
	tip2, _ := s.txs[j].EffectiveGasTip(s.baseFee)
	return tip1.Cmp(tip2) < 0
}
```

### Type: bigIntArray

The `bigIntArray` type is a slice of `*big.Int` values. It is used as the value type for the `values` variable in the `getBlockValues` function. It implements the `Len`, `Swap`, and `Less` methods required by the `sort.Interface` interface.

```go
type bigIntArray []*big.Int

func (s bigIntArray) Len() int           { return len(s) }
func (s bigIntArray) Less(i, j int) bool { return s[i].Cmp(s[j]) < 0 }
func (s bigIntArray) Swap(i, j int)      { s[i], s[j] = s[j], s[i] }
```