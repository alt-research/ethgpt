# Ethereum Codebase Documentation

This is the documentation for the Ethereum codebase. The codebase is written in Go and is used to implement the Ethereum blockchain. The codebase is licensed under the GNU Lesser General Public License.

## EthAPIBackend

`EthAPIBackend` is a struct that implements `ethapi.Backend` for full nodes. It has the following fields:

- `extRPCEnabled`: a boolean that indicates whether external RPC is enabled.
- `allowUnprotectedTxs`: a boolean that indicates whether unprotected transactions are allowed.
- `eth`: a pointer to the `Ethereum` struct.
- `gpo`: a pointer to the `gasprice.Oracle` struct.

### ChainConfig

`ChainConfig` returns the active chain configuration.

```go
func (b *EthAPIBackend) ChainConfig() *params.ChainConfig
```

### CurrentBlock

`CurrentBlock` returns the current block header.

```go
func (b *EthAPIBackend) CurrentBlock() *types.Header
```

### SetHead

`SetHead` sets the head of the blockchain to the specified block number.

```go
func (b *EthAPIBackend) SetHead(number uint64)
```

### HeaderByNumber

`HeaderByNumber` returns the block header for the specified block number.

```go
func (b *EthAPIBackend) HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error)
```

### HeaderByNumberOrHash

`HeaderByNumberOrHash` returns the block header for the specified block number or hash.

```go
func (b *EthAPIBackend) HeaderByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*types.Header, error)
```

## Conclusion

This concludes the documentation for the Ethereum codebase. The codebase is a complex system that implements the Ethereum blockchain. The functions and structs described in this documentation are just a small part of the entire codebase. ## Documentation for EthAPIBackend

### Function: HeaderByNumber

```go
func (b *EthAPIBackend) HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error) {
	if number == rpc.PendingBlockNumber {
		header := b.eth.miner.Header()
		return header, nil
	}
	if number == rpc.LatestBlockNumber {
		header := b.eth.blockchain.CurrentBlock()
		return header, nil
	}
	if number == rpc.FinalizedBlockNumber {
		if !b.eth.Merger().TDDReached() {
			return nil, errors.New("'finalized' tag not supported on pre-merge network")
		}
		header := b.eth.blockchain.CurrentFinalBlock()
		return header, nil
	}
	if number == rpc.SafeBlockNumber {
		if !b.eth.Merger().TDDReached() {
			return nil, errors.New("'safe' tag not supported on pre-merge network")
		}
		header := b.eth.blockchain.CurrentSafeBlock()
		return header, nil
	}
	return b.eth.blockchain.GetHeaderByNumber(uint64(number)), nil
}
```

This function retrieves the header of a block by its number. If the block number is `rpc.PendingBlockNumber`, it returns the header of the pending block. If the block number is `rpc.LatestBlockNumber`, it returns the header of the current block. If the block number is `rpc.FinalizedBlockNumber`, it returns the header of the current finalized block. If the block number is `rpc.SafeBlockNumber`, it returns the header of the current safe block. Otherwise, it retrieves the header of the block with the given number using the `GetHeaderByNumber` function of the blockchain.

### Function: HeaderByHash

```go
func (b *EthAPIBackend) HeaderByHash(ctx context.Context, hash common.Hash) (*types.Header, error) {
	return b.eth.blockchain.GetHeaderByHash(hash), nil
}
```

This function retrieves the header of a block by its hash using the `GetHeaderByHash` function of the blockchain.

### Function: BlockByNumber

```go
func (b *EthAPIBackend) BlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error) {
	if number == rpc.PendingBlockNumber {
		block := b.eth.miner.PendingBlock()
		return block, nil
	}
	if number == rpc.LatestBlockNumber {
		header := b.eth.blockchain.CurrentBlock()
		return b.eth.blockchain.GetBlock(header.Hash(), header.Number.Uint64()), nil
	}
	if number == rpc.FinalizedBlockNumber {
		if !b.eth.Merger().TDDReached() {
			return nil, errors.New("'finalized' tag not supported on pre-merge network")
		}
		header := b.eth.blockchain.CurrentFinalBlock()
		return b.eth.blockchain.GetBlock(header.Hash(), header.Number.Uint64()), nil
	}
	if number == rpc.SafeBlockNumber {
		if !b.eth.Merger().TDDReached() {
			return nil, errors.New("'safe' tag not supported on pre-merge network")
		}
		header := b.eth.blockchain.CurrentSafeBlock()
		return b.eth.blockchain.GetBlock(header.Hash(), header.Number.Uint64()), nil
	}
	return b.eth.blockchain.GetBlockByNumber(uint64(number)), nil
}
```

This function retrieves a block by its number. If the block number is `rpc.PendingBlockNumber`, it returns the pending block. If the block number is `rpc.LatestBlockNumber`, it returns the current block. If the block number is `rpc.FinalizedBlockNumber`, it returns the current finalized block. If the block number is `rpc.SafeBlockNumber`, it returns the current safe block. Otherwise, it retrieves the block with the given number using the `GetBlockByNumber` function of the blockchain.

### Function: BlockByHash

```go
func (b *EthAPIBackend) BlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error) {
	return b.eth.blockchain.GetBlockByHash(hash), nil
}
```

This function retrieves a block by its hash using the `GetBlockByHash` function of the blockchain.

### Function: GetBody

```go
func (b *EthAPIBackend) GetBody(ctx context.Context, hash common.Hash, number rpc.BlockNumber) (*types.Body, error) {
	if number < 0 || hash == (common.Hash{}) {
		return nil, errors.New("invalid arguments; expect hash and no special block numbers")
	}
	if body := b.eth.blockchain.GetBody(hash); body != nil {
		return body, nil
	}
	return nil, errors.New("block body not found")
}
```

This function retrieves the body of a block by its hash. It does not resolve special block numbers.

### Function: BlockByNumberOrHash

```go
func (b *EthAPIBackend) BlockByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*types.Block, error) {
	if blockNr, ok := blockNrOrHash.Number(); ok {
		return b.BlockByNumber(ctx, blockNr)
	}
	if hash, ok := blockNrOrHash.Hash(); ok {
		header := b.eth.blockchain.GetHeaderByHash(hash)
		if header == nil {
			return nil, errors.New("header for hash not found")
		}
		if blockNrOrHash.RequireCanonical && b.eth.blockchain.GetCanonicalHash(header.Number.Uint64()) != hash {
			return nil, errors.New("hash is not currently canonical")
		}
		block := b.eth.blockchain.GetBlock(hash, header.Number.Uint64())
		if block == nil {
			return nil, errors.New("header found, but block body is missing")
		}
		return block, nil
	}
	return nil, errors.New("invalid arguments; neither block nor hash specified")
}
```

This function retrieves a block by its number or hash. If the argument is a block number ## Documentation for the Ethereum Codebase

### Function: StateAndHeaderByNumberOrHash

This function takes a context and a block number or hash as input and returns the state database and header for the specified block. If the input is a block number, it calls the StateAndHeaderByNumber function to retrieve the state and header. If the input is a block hash, it retrieves the header by hash and then retrieves the state at the header's root. If the hash is not currently canonical, an error is returned.

### Function: GetReceipts

This function takes a context and a transaction hash as input and returns the receipts for the specified transaction.

### Function: GetLogs

This function takes a context, a block hash, and a block number as input and returns the logs for the specified block.

### Function: GetTd

This function takes a context and a block hash as input and returns the total difficulty for the specified block.

### Function: GetEVM

This function takes a context, a message, a state database, a header, and a VM configuration as input and returns a new EVM instance, along with a function to retrieve any errors that occurred during execution. If the VM configuration is not provided, it retrieves the default configuration from the blockchain.

### Function: SubscribeRemovedLogsEvent

This function takes a channel as input and returns a subscription to the removed logs event.

### Function: SubscribePendingLogsEvent

This function takes a channel as input and returns a subscription to the pending logs event.

### Function: SubscribeChainEvent

This function takes a channel as input and returns a subscription to the chain event.

### Function: SubscribeChainHeadEvent

This function takes a channel as input and returns a subscription to the chain head event.

### Function: SubscribeChainSideEvent

This function takes a channel as input and returns a subscription to the chain side event.

### Function: SubscribeLogsEvent

This function takes a channel as input and returns a subscription to the logs event.

### Function: SendTx

This function takes a context and a signed transaction as input and adds the transaction to the local transaction pool.

### Function: GetPoolTransactions

This function returns all pending transactions in the transaction pool.

### Function: GetPoolTransaction

This function takes a transaction hash as input and returns the transaction with the specified hash from the transaction pool.

### Function: GetTransaction

This function takes a context and a transaction hash as input and returns the transaction, block hash, block number, and index for the specified transaction.

### Function: GetPoolNonce

This function takes an address as input and returns the nonce for the specified address in the transaction pool.

### Function: Stats

This function returns the number of pending and queued transactions in the transaction pool. ## Documentation for the Ethereum Codebase

### Function: Stats()

```go
func (b *EthAPIBackend) Stats() (pending int, queued int) {
	return b.eth.TxPool().Stats()
}
```

The `Stats()` function returns the number of transactions that are currently pending and queued in the transaction pool.

### Function: TxPoolContent()

```go
func (b *EthAPIBackend) TxPoolContent() (map[common.Address]types.Transactions, map[common.Address]types.Transactions) {
	return b.eth.TxPool().Content()
}
```

The `TxPoolContent()` function returns a map of all transactions in the transaction pool, grouped by sender address.

### Function: TxPoolContentFrom()

```go
func (b *EthAPIBackend) TxPoolContentFrom(addr common.Address) (types.Transactions, types.Transactions) {
	return b.eth.TxPool().ContentFrom(addr)
}
```

The `TxPoolContentFrom()` function returns two slices of transactions: one slice of transactions that are currently pending in the transaction pool from the specified address, and another slice of transactions that are currently queued in the transaction pool from the specified address.

### Function: TxPool()

```go
func (b *EthAPIBackend) TxPool() *txpool.TxPool {
	return b.eth.TxPool()
}
```

The `TxPool()` function returns the transaction pool instance.

### Function: SubscribeNewTxsEvent()

```go
func (b *EthAPIBackend) SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent) event.Subscription {
	return b.eth.TxPool().SubscribeNewTxsEvent(ch)
}
```

The `SubscribeNewTxsEvent()` function subscribes to new transaction events in the transaction pool and returns an event subscription.

### Function: SyncProgress()

```go
func (b *EthAPIBackend) SyncProgress() ethereum.SyncProgress {
	return b.eth.Downloader().Progress()
}
```

The `SyncProgress()` function returns the current sync progress of the Ethereum node.

### Function: SuggestGasTipCap()

```go
func (b *EthAPIBackend) SuggestGasTipCap(ctx context.Context) (*big.Int, error) {
	return b.gpo.SuggestTipCap(ctx)
}
```

The `SuggestGasTipCap()` function returns the suggested gas tip cap for the current network.

### Function: FeeHistory()

```go
func (b *EthAPIBackend) FeeHistory(ctx context.Context, blockCount uint64, lastBlock rpc.BlockNumber, rewardPercentiles []float64) (firstBlock *big.Int, reward [][]*big.Int, baseFee []*big.Int, gasUsedRatio []float64, err error) {
	return b.gpo.FeeHistory(ctx, blockCount, lastBlock, rewardPercentiles)
}
```

The `FeeHistory()` function returns the fee history of the current network, including the first block, reward, base fee, and gas used ratio.

### Function: ChainDb()

```go
func (b *EthAPIBackend) ChainDb() ethdb.Database {
	return b.eth.ChainDb()
}
```

The `ChainDb()` function returns the chain database instance.

### Function: EventMux()

```go
func (b *EthAPIBackend) EventMux() *event.TypeMux {
	return b.eth.EventMux()
}
```

The `EventMux()` function returns the event type multiplexer instance.

### Function: AccountManager()

```go
func (b *EthAPIBackend) AccountManager() *accounts.Manager {
	return b.eth.AccountManager()
}
```

The `AccountManager()` function returns the account manager instance.

### Function: ExtRPCEnabled()

```go
func (b *EthAPIBackend) ExtRPCEnabled() bool {
	return b.extRPCEnabled
}
```

The `ExtRPCEnabled()` function returns a boolean value indicating whether external RPC is enabled.

### Function: UnprotectedAllowed()

```go
func (b *EthAPIBackend) UnprotectedAllowed() bool {
	return b.allowUnprotectedTxs
}
```

The `UnprotectedAllowed()` function returns a boolean value indicating whether unprotected transactions are allowed.

### Function: RPCGasCap()

```go
func (b *EthAPIBackend) RPCGasCap() uint64 {
	return b.eth.config.RPCGasCap
}
```

The `RPCGasCap()` function returns the maximum gas limit for RPC calls.

### Function: RPCEVMTimeout()

```go
func (b *EthAPIBackend) RPCEVMTimeout() time.Duration {
	return b.eth.config.RPCEVMTimeout
}
```

The `RPCEVMTimeout()` function returns the timeout duration for RPC calls.

### Function: RPCTxFeeCap()

```go
func (b *EthAPIBackend) RPCTxFeeCap() float64 {
	return b.eth.config.RPCTxFeeCap
}
```

The `RPCTxFeeCap()` function returns the maximum transaction fee for RPC calls.

### Function: BloomStatus()

```go
func (b *EthAPIBackend) BloomStatus() (uint64, uint64) {
	sections, _, _ := b.eth.bloomIndexer.Sections()
	return params.BloomBitsBlocks, sections
}
```

The `BloomStatus()` function returns the bloom filter status, including the number of sections and blocks.

### Function: ServiceFilter()

```go
func (b *EthAPIBackend) ServiceFilter(ctx context.Context, session *bloombits.MatcherSession) {
	for i := 0; i < bloomFilterThreads; i++ {
		go session.Multiplex(bloomRetrievalBatch, bloomRetrievalWait, b.eth.bloomRequests)
	}
}
```

The `ServiceFilter()` function filters the service using the bloom filter.

### Function: Engine()

```go
func (b *EthAPIBackend) Engine() consensus.Engine {
	return b.eth.engine
}
```

The `Engine()` function returns the consensus engine instance.

### Function: CurrentHeader()

```go
func (b *EthAPIBackend) CurrentHeader() *types.Header {
	return b.eth.blockchain.CurrentHeader()
}
```

The `CurrentHeader()` function returns the current header of the blockchain.

### Function: Miner()

```go
func (b *EthAPIBackend) Miner() *miner.Miner {
	return b.eth.Miner()
}
```

The `Miner()` function returns the miner instance.

### Function: StartMining()

```go
func (b *EthAPIBackend) StartMining(threads int) error {
	return b.eth.StartMining(threads)
}
```

The `StartMining()` function starts the mining process with the specified number of threads.

### Function: StateAtBlock()

```