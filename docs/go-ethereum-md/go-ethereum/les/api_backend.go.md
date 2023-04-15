This is a Go source code file for the go-ethereum library, specifically for the LES (Light Ethereum Subprotocol) API backend. The LES protocol is a lightweight version of the Ethereum protocol designed for use in low-power devices and networks with limited bandwidth.

The file starts with a copyright notice and license information for the go-ethereum library. It then imports various packages from the go-ethereum library and other external libraries.

The `LesApiBackend` struct is defined, which contains several fields including a boolean flag for whether external RPC is enabled, a boolean flag for whether unprotected transactions are allowed, a pointer to a `LightEthereum` struct, and a pointer to a gas price oracle.

Several methods are defined for the `LesApiBackend` struct, including `ChainConfig()`, which returns the current chain configuration, `CurrentBlock()`, which returns the current block header, and `SetHead()`, which sets the head block number.

Other methods include `HeaderByNumber()`, which returns the block header for a given block number, `HeaderByNumberOrHash()`, which returns the block header for a given block number or hash, and `HeaderByHash()`, which returns the block header for a given block hash.

Finally, there is a `BlockByNumber()` method, which returns the full block for a given block number. ## LesApiBackend Source Code Documentation

### func (b *LesApiBackend) BlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error)

This function retrieves a block by its number. It takes a context and a block number as input parameters and returns a pointer to a types.Block struct and an error. It calls the GetBlockByNumber function of the blockchain package to retrieve the block.

Example usage:

```go
block, err := b.BlockByNumber(ctx, rpc.BlockNumber(12345))
if err != nil {
    // handle error
}
// use block
```

### func (b *LesApiBackend) HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error)

This function retrieves a block header by its number. It takes a context and a block number as input parameters and returns a pointer to a types.Header struct and an error. It calls the GetHeaderByNumber function of the blockchain package to retrieve the header.

Example usage:

```go
header, err := b.HeaderByNumber(ctx, rpc.BlockNumber(12345))
if err != nil {
    // handle error
}
// use header
```

### func (b *LesApiBackend) BlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error)

This function retrieves a block by its hash. It takes a context and a block hash as input parameters and returns a pointer to a types.Block struct and an error. It calls the GetBlockByHash function of the blockchain package to retrieve the block.

Example usage:

```go
block, err := b.BlockByHash(ctx, common.HexToHash("0x1234567890abcdef"))
if err != nil {
    // handle error
}
// use block
```

### func (b *LesApiBackend) BlockByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*types.Block, error)

This function retrieves a block by its number or hash. It takes a context and a BlockNumberOrHash struct as input parameters and returns a pointer to a types.Block struct and an error. If the input parameter is a block number, it calls the BlockByNumber function to retrieve the block. If the input parameter is a block hash, it calls the BlockByHash function to retrieve the block.

Example usage:

```go
blockNrOrHash := rpc.BlockNumberOrHash{Number: rpc.BlockNumber(12345)}
block, err := b.BlockByNumberOrHash(ctx, blockNrOrHash)
if err != nil {
    // handle error
}
// use block

blockNrOrHash = rpc.BlockNumberOrHash{Hash: common.HexToHash("0x1234567890abcdef")}
block, err = b.BlockByNumberOrHash(ctx, blockNrOrHash)
if err != nil {
    // handle error
}
// use block
```

### func (b *LesApiBackend) GetBody(ctx context.Context, hash common.Hash, number rpc.BlockNumber) (*types.Body, error)

This function retrieves the body of a block by its hash and number. It takes a context, a block hash, and a block number as input parameters and returns a pointer to a types.Body struct and an error. It calls the GetBody function of the light package to retrieve the body.

Example usage:

```go
body, err := b.GetBody(ctx, common.HexToHash("0x1234567890abcdef"), rpc.BlockNumber(12345))
if err != nil {
    // handle error
}
// use body
```

### func (b *LesApiBackend) PendingBlockAndReceipts() (*types.Block, types.Receipts)

This function returns the pending block and receipts. It returns a pointer to a types.Block struct and a types.Receipts struct.

Example usage:

```go
block, receipts := b.PendingBlockAndReceipts()
// use block and receipts
```

### func (b *LesApiBackend) StateAndHeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*state.StateDB, *types.Header, error)

This function retrieves the state and header of a block by its number. It takes a context and a block number as input parameters and returns a pointer to a state.StateDB struct, a pointer to a types.Header struct, and an error. It calls the HeaderByNumber function to retrieve the header and the NewState function of the light package to retrieve the state.

Example usage:

```go
state, header, err := b.StateAndHeaderByNumber(ctx, rpc.BlockNumber(12345))
if err != nil {
    // handle error
}
// use state and header
```

### func (b *LesApiBackend) StateAndHeaderByNumberOrHash(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (*state.StateDB, *types.Header, error)

This function retrieves the state and header of a block by its number or hash. It takes a context and a BlockNumberOrHash struct as input parameters and returns a pointer to a state.StateDB struct, a pointer to a types.Header struct, and an error. If the input parameter is a block number, it calls the StateAndHeaderByNumber function to retrieve the state and header. If the input parameter is a block hash, it calls the GetHeaderByHash function of the blockchain package to retrieve the header and the NewState function of the light package to retrieve the state.

Example usage:

```go
blockNrOrHash := rpc.BlockNumberOrHash{Number: rpc.BlockNumber(12345)}
state, header, err := b.StateAndHeaderByNumberOrHash(ctx, blockNrOrHash)
if err != nil {
    // handle error
}
// use state and header

blockNrOrHash = rpc.BlockNumberOrHash{Hash: common.HexToHash("0x1234567890abcdef")}
state, header, err = b.StateAndHeaderByNumberOrHash(ctx, blockNrOrHash)
if err != nil {
    // handle error
}
// use state and header
```

### func (b *LesApiBackend) GetReceipts(ctx context.Context, hash common.Hash) (types.Receipts, error)

This function retrieves the receipts of a block by its hash. It takes a context and a block hash as input parameters and returns a types.Receipts struct and an error. It calls the GetBlockReceipts function of the light package to retrieve the receipts.

Example usage:

```go
receipts, err := b.GetReceipts(ctx, common.HexToHash("0x1234567890abcdef"))
if err != nil {
    // handle error
}
// use receipts
```

### func (b *LesApiBackend) GetLogs(ctx context.Context, hash common.Hash, number uint64) ([][]*types.Log, error)

This function retrieves the logs of a block by its hash and number. It takes a context, a block hash, and a block number as input parameters and returns a slice of slices of types.Log structs and an error. It calls the GetBlockLogs function of the light package to retrieve the logs.

Example usage:

```go
logs, err := b.GetLogs(ctx, common.HexToHash("0x1234567890abcdef"), 12345)
if err != nil {
    // handle error
}
// use logs
```

### func (b *LesApiBackend) GetTd(ctx context.Context, hash common.Hash) *big.Int

This function retrieves the total difficulty of a block by its hash. It takes a context and a block hash as input parameters and returns a pointer to a big.Int struct.

Example usage:

```go
td := b.GetTd(ctx, common.HexToHash("0x1234567890abcdef"))
// use td
```

### func (b *LesApiBackend) GetEVM(ctx context.Context, msg *core.Message, state *state.StateDB, header *types.Header, vmConfig *vm.Config) (*vm.EVM, func() error, error)

This function creates a new EVM instance. It takes a context, a pointer to a core.Message struct, a pointer to a state.StateDB struct, a pointer to a types.Header struct, and a pointer to a vm.Config struct as input parameters and returns a pointer to a vm.EVM struct, a function that returns an error, and an error.

Example usage:

```go
msg := &core.Message{
    From: common.HexToAddress("0x1234567890abcdef"),
    To: common.HexToAddress("0xabcdef1234567890"),
    Value: big.NewInt(12345),
    GasPrice: big.NewInt(67890),
    GasLimit: 123456,
    Nonce: 0,
    Data: []byte("hello world"),
}
state, header, err := b.StateAndHeaderByNumber(ctx, rpc.BlockNumber(12345))
if err != nil {
    // handle error
}
vmConfig := &vm.Config{}
evm, revert, err := b.GetEVM(ctx, msg, state, header, vmConfig)
if err != nil {
    // handle error
}
defer revert()
// use evm
```

### func (b *LesApiBackend) SendTx(ctx context.Context, signedTx *types.Transaction) error

This function sends a signed transaction to the transaction pool. It takes a context and a pointer to a types.Transaction struct as input parameters and returns an error.

Example usage:

```go
tx := types.NewTransaction(nonce, to, amount, gasLimit, gasPrice, data)
signedTx, err := types.SignTx(tx, types.HomesteadSigner{}, privateKey)
if err != nil {
    // handle error
}
err = b.SendTx(ctx, signedTx)
if err != nil {
    // handle error
}
```

### func (b *LesApiBackend) RemoveTx(txHash common.Hash)

This function removes a transaction from the transaction pool. It takes a transaction hash as an input parameter.

Example usage:

```go
b.RemoveTx(common.HexToHash("0x1234567890abcdef"))
```

### func (b *LesApiBackend) GetPoolTransactions() (types.Transactions, error)

This function retrieves the transactions in the transaction pool. It returns a types.Transactions struct and an error.

Example usage:

```go
txs, err := b.GetPoolTransactions()
if err != nil {
    // handle error
}
// use txs
``` The codebase provided contains a set of functions that are part of the LesApiBackend struct. This struct is used to provide an API for interacting with the Ethereum network through a light client. The functions in this struct are described below:

1. `GetPoolTransaction(txHash common.Hash) *types.Transaction`: This function retrieves a transaction from the transaction pool by its hash.

2. `GetTransaction(ctx context.Context, txHash common.Hash) (*types.Transaction, common.Hash, uint64, uint64, error)`: This function retrieves a transaction from the Ethereum network by its hash.

3. `GetPoolNonce(ctx context.Context, addr common.Address) (uint64, error)`: This function retrieves the nonce of an address from the transaction pool.

4. `Stats() (pending int, queued int)`: This function returns the number of pending and queued transactions in the transaction pool.

5. `TxPoolContent() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)`: This function returns the content of the transaction pool, grouped by sender and recipient addresses.

6. `TxPoolContentFrom(addr common.Address) (types.Transactions, types.Transactions)`: This function returns the content of the transaction pool for a specific sender address.

7. `SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent) event.Subscription`: This function subscribes to new transaction events in the transaction pool.

8. `SubscribeChainEvent(ch chan<- core.ChainEvent) event.Subscription`: This function subscribes to chain events, such as new blocks being added to the blockchain.

9. `SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription`: This function subscribes to chain head events, which occur when the head of the blockchain changes.

10. `SubscribeChainSideEvent(ch chan<- core.ChainSideEvent) event.Subscription`: This function subscribes to chain side events, which occur when a new chain is detected.

11. `SubscribeLogsEvent(ch chan<- []*types.Log) event.Subscription`: This function subscribes to log events, which occur when a contract emits an event.

12. `SubscribePendingLogsEvent(ch chan<- []*types.Log) event.Subscription`: This function subscribes to pending log events, which occur when a contract emits an event that has not yet been included in a block.

13. `SubscribeRemovedLogsEvent(ch chan<- core.RemovedLogsEvent) event.Subscription`: This function subscribes to removed log events, which occur when a block is reorganized and logs are removed.

14. `SyncProgress() ethereum.SyncProgress`: This function returns the current sync progress of the light client.

15. `ProtocolVersion() int`: This function returns the protocol version of the Ethereum network.

16. `SuggestGasTipCap(ctx context.Context) (*big.Int, error)`: This function suggests a gas tip cap for a transaction.

17. `FeeHistory(ctx context.Context, blockCount uint64, lastBlock rpc.BlockNumber, rewardPercentiles []float64) (firstBlock *big.Int, reward [][]*big.Int, baseFee []*big.Int, gasUsedRatio []float64, err error)`: This function returns the fee history of the Ethereum network.

18. `ChainDb() ethdb.Database`: This function returns the database used by the Ethereum client.

19. `AccountManager() *accounts.Manager`: This function returns the account manager used by the Ethereum client.

20. `ExtRPCEnabled() bool`: This function returns whether or not external RPC is enabled.

21. `UnprotectedAllowed() bool`: This function returns whether or not unprotected transactions are allowed.

22. `RPCGasCap() uint64`: This function returns the maximum gas allowed for an RPC call.

23. `RPCEVMTimeout() time.Duration`: This function returns the timeout for an RPC call.

24. `RPCTxFeeCap() float64`: This function returns the maximum transaction fee allowed for an RPC call.

25. `BloomStatus() (uint64, uint64)`: This function returns the status of the bloom filter.

26. `ServiceFilter(ctx context.Context, session *bloombits.MatcherSession)`: This function sets up a bloom filter for filtering events.

27. `Engine() consensus.Engine`: This function returns the consensus engine used by the Ethereum client.

28. `CurrentHeader() *type`: This function returns the current header of the blockchain.

Each function has a specific purpose and is used to interact with the Ethereum network in a specific way. The functions are well-documented and should be easy to understand for anyone familiar with Ethereum development. # LesApiBackend

The `LesApiBackend` struct is used to provide an implementation of the Ethereum Light Client API.

## Functions

### HeaderByNumber

`HeaderByNumber` returns the header of the block at the given block number. It takes in a `*big.Int` as a parameter and returns a `*types.Header`.

### StateAtBlock

`StateAtBlock` returns the state of the Ethereum network at the given block. It takes in a `context.Context`, a `*types.Block`, a `uint64`, a `*