# ethapi

The `ethapi` package implements the general Ethereum API functions.

## Types

### Backend

`Backend` interface provides the common API services (that are provided by both full and light clients) with access to necessary functions.

### HeaderByNumber

```go
func (api *PrivateDebugAPI) HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error)
```

`HeaderByNumber` returns the header for the block with the given number.

### HeaderByHash

```go
func (api *PrivateDebugAPI) HeaderByHash(ctx context.Context, hash common.Hash) (*types.Header, error)
```

`HeaderByHash` returns the header for the block with the given hash.

### HeaderByNumberOrHash

```go
func (api *PrivateDebugAPI) HeaderByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*types.Header, error)
```

`HeaderByNumberOrHash` returns the header for the block with the given number or hash.

### CurrentHeader

```go
func (api *PrivateDebugAPI) CurrentHeader() *types.Header
```

`CurrentHeader` returns the current header.

### CurrentBlock

```go
func (api *PrivateDebugAPI) CurrentBlock() *types.Header
```

`CurrentBlock` returns the current block.

### BlockByNumber

```go
func (api *PrivateDebugAPI) BlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error)
```

`BlockByNumber` returns the block with the given number.

### BlockByHash

```go
func (api *PrivateDebugAPI) BlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error)
```

`BlockByHash` returns the block with the given hash.

### BlockByNumberOrHash

```go
func (api *PrivateDebugAPI) BlockByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*types.Block, error)
```

`BlockByNumberOrHash` returns the block with the given number or hash.

### GetReceipts

```go
func (api *PrivateDebugAPI) GetReceipts(ctx context.Context, hash common.Hash) (types.Receipts, error)
```

`GetReceipts` returns the receipts for the block with the given hash.

### GetTd

```go
func (api *PrivateDebugAPI) GetTd # Backend

The `Backend` interface defines the methods that must be implemented by a blockchain backend.

## Methods

### BlockChain

```go
type BlockChain interface {
	CurrentBlock() *types.Block
	GetBlock(ctx context.Context, hash common.Hash) (*types.Block, error)
	GetBlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error)
	GetHeader(ctx context.Context, hash common.Hash) (*types.Header, error)
	GetHeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error)
	GetReceipts(ctx context.Context, hash common.Hash) (types.Receipts, error)
	GetTd(hash common.Hash) *big.Int
	GetEVM(ctx context.Context, msg core.Message, state *state.StateDB, header *types.Header) (*vm.EVM, func() error, error)
	SubscribeChainEvent(ch chan<- core.ChainEvent) event.Subscription
	SubscribeChainSideEvent(ch chan<- core.ChainSideEvent) event.Subscription
}
```

`BlockChain` defines the methods for interacting with the blockchain.

### TxPool

```go
type TxPool interface {
	Content() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
	ContentAt(number uint64) (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
	Stats() (pending int, queued int)
	Inspect(nonce uint64) (types.PoolTransaction, error)
	RemoveTx(hash common.Hash)
	Reset()
	Prune() (removed int)
	API() TxPoolAPI
}
```

`TxPool` defines the methods for interacting with the transaction pool.

### Backend

```go
type Backend interface {
	BlockChain() BlockChain
	TxPool() TxPool
	AccountManager() *accounts.Manager
	GetBalance(ctx context.Context, addr common.Address, number rpc.BlockNumber) (*big.Int, error)
	GetCode(ctx context.Context, addr common.Address, number rpc.BlockNumber) ([]byte, error)
	GetNonce(ctx context.Context, addr common.Address, number rpc.BlockNumber) (uint64, error)
	GetStorageAt(ctx context.Context, addr common.Address, key common.Hash, number rpc.BlockNumber) ([]byte, error)
	SendTransaction(ctx context.Context, signedTx *types.Transaction) error
	SuggestGasPrice(ctx context.Context) (*big.Int, error)
	CallContract(ctx context.Context, call ethereum.CallMsg, number rpc.BlockNumber) ([]byte, error)
	EstimateGas(ctx context.Context, call ethereum.CallMsg) (uint64, error)
	SubscribeNewHead(ctx context.Context, ch chan<- *types.Header) event.Subscription
	SubscribeChainEvent(ch chan<- core.ChainEvent) event.Subscription
	SubscribeChainSideEvent(ch chan<- core.ChainSideEvent) event.Subscription
	SendTx(ctx context.Context, signedTx *types.Transaction) error
	GetTransaction(ctx context.Context, txHash common.Hash) (*types.Transaction, common.Hash, uint64, uint64, error)
	GetPoolTransactions() (types.Transactions, error)
	GetPoolTransaction(txHash common.Hash) *types.Transaction
	GetPoolNonce(ctx context.Context, addr common.Address) (uint64, error)
	Stats() (pending int, queued int)
	TxPoolContent() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
	TxPoolContentFrom(addr common.Address) (types.Transactions, types.Transactions)
	SubscribeNewTxsEvent(chan<- core.NewTxsEvent) event.Subscription
	ChainConfig() *params.ChainConfig
	Engine() consensus.Engine
	GetBody(ctx context.Context, hash common.Hash, number rpc.BlockNumber) (*types.Body, error)
	GetLogs(ctx context.Context, blockHash common.Hash, number uint64) ([][]*types.Log, error)
	SubscribeRemovedLogsEvent(ch chan<- core.RemovedLogsEvent) event.Subscription
	SubscribeLogsEvent(ch chan<- []*types.Log) event.Subscription
	SubscribePendingLogsEvent(ch chan<- []*types.Log) event.Subscription
	BloomStatus() (uint64, uint64)
	ServiceFilter(ctx context.Context, session *bloombits.MatcherSession)
}
```

`Backend