# TestSetFeeDefaults

The `TestSetFeeDefaults` function tests the logic for filling in default fee values works as expected.

## Types

### test

`test` is a struct that contains the input and expected output for a single test case.

## Functions

### TestSetFeeDefaults

```go
func TestSetFeeDefaults(t *testing.T)
```

`TestSetFeeDefaults` tests the logic for filling in default fee values works as expected. It creates a `backendMock` object and sets up various test cases to check the behavior of the function. 

The function tests the following cases:
- Legacy transactions pre-London
- Legacy transactions post-London with explicit gas price
- Access list transactions pre-London
- Access list transactions post-London with explicit gas price
- Access list transactions post-London with default gas prices
- Dynamic fee transactions post-London with default gas prices

For each test case, the function creates an input `TransactionArgs` object and an expected output `TransactionArgs` object. It then calls the `SetFeeDefaults` function with the input object and checks that the output matches the expected output. If the output does not match the expected output, the function returns an error. # TransactionArgs

The `TransactionArgs` type is used to specify the parameters for a transaction. It includes fields for the gas price, maximum fee per gas, and maximum priority fee per gas.

## Functions

### setFeeDefaults

```go
func (t *TransactionArgs) setFeeDefaults(ctx context.Context, b *backendMock) error
```

`setFeeDefaults` sets the default values for the transaction's fee parameters. It takes a context and a `backendMock` object as arguments. If the transaction is being sent after the London hard fork, it sets the maximum priority fee per gas to the suggested gas tip cap. If the transaction is being sent before the London hard fork, it returns an error if the maximum fee per gas or maximum priority fee per gas are set.

## Types

### backendMock

`backendMock` is a mock implementation of the `backend` interface used for testing. It includes a `ChainConfig` object and a `Header` object. It also includes methods for activating and deactivating the London hard fork, and for getting the current header and chain config. # backendMock

The `backendMock` type is a mock implementation of the `Backend` interface. It provides methods for accessing blockchain data and sending transactions.

## Functions

### Config

```go
func (b *backendMock) Config() *params.ChainConfig
```

`Config` returns the chain configuration.

### SyncProgress

```go
func (b *backendMock) SyncProgress() ethereum.SyncProgress
```

`SyncProgress` returns the synchronization progress.

### FeeHistory

```go
func (b *backendMock) FeeHistory(ctx context.Context, blockCount uint64, lastBlock rpc.BlockNumber, rewardPercentiles []float64) (*big.Int, [][]*big.Int, []*big.Int, []float64, error)
```

`FeeHistory` returns the fee history.

### ChainDb

```go
func (b *backendMock) ChainDb() ethdb.Database
```

`ChainDb` returns the chain database.

### AccountManager

```go
func (b *backendMock) AccountManager() *accounts.Manager
```

`AccountManager` returns the account manager.

### ExtRPCEnabled

```go
func (b *backendMock) ExtRPCEnabled() bool
```

`ExtRPCEnabled` returns whether external RPC is enabled.

### RPCGasCap

```go
func (b *backendMock) RPCGasCap() uint64
```

`RPCGasCap` returns the RPC gas cap.

### RPCEVMTimeout

```go
func (b *backendMock) RPCEVMTimeout() time.Duration
```

`RPCEVMTimeout` returns the RPC EVM timeout.

### RPCTxFeeCap

```go
func (b *backendMock) RPCTxFeeCap() float64
```

`RPCTxFeeCap` returns the RPC transaction fee cap.

### UnprotectedAllowed

```go
func (b *backendMock) UnprotectedAllowed() bool
```

`UnprotectedAllowed` returns whether unprotected transactions are allowed.

### SetHead

```go
func (b *backendMock) SetHead # backendMock

The `backendMock` type is a mock implementation of the `core.Backend` interface. It provides methods for getting the nonce of an address, getting the content of the transaction pool, and subscribing to events.

## Functions

### GetPoolNonce

```go
func (b *backendMock) GetPoolNonce(ctx context.Context, addr common.Address) (uint64, error)
```

`GetPoolNonce` returns the nonce of the given address in the transaction pool.

### Stats

```go
func (b *backendMock) Stats() (pending int, queued int)
```

`Stats` returns the number of pending and queued transactions in the transaction pool.

### TxPoolContent

```go
func (b *backendMock) TxPoolContent() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
```

`TxPoolContent` returns the content of the transaction pool.

### TxPoolContentFrom

```go
func (b *backendMock) TxPoolContentFrom(addr common.Address) (types.Transactions, types.Transactions)
```

`TxPoolContentFrom` returns the content of the transaction pool for the given address.

### SubscribeNewTxsEvent

```go
func (b *backendMock) SubscribeNewTxsEvent(chan<- core.NewTxsEvent) event.Subscription
```

`SubscribeNewTxsEvent` subscribes to the `NewTxsEvent` event.

### BloomStatus

```go
func (b *backendMock) BloomStatus() (uint64, uint64)
```

`BloomStatus` returns the bloom status.

### ServiceFilter

```go
func (b *backendMock) ServiceFilter(ctx context.Context, session *bloombits.MatcherSession)
```

`ServiceFilter` services the bloom filter.

### SubscribeLogsEvent

```go
func (b *backendMock) SubscribeLogsEvent(ch chan<- []*types.Log) event.Subscription
```

`SubscribeLogsEvent` subscribes to the `LogsEvent` event.

### SubscribePendingLogsEvent

```go
func (b *backendMock) SubscribePendingLogsEvent(ch chan<- []*types.Log) event.Subscription
```

`SubscribePendingLogsEvent` subscribes to the `PendingLogsEvent` event.

### SubscribeRemovedLogsEvent

```go
func (b *backendMock) SubscribeRemovedLogsEvent(ch chan<- core.RemovedLogsEvent) event.Subscription
```

`SubscribeRemovedLogsEvent` subscribes to the `RemovedLogsEvent` event.

### Engine

```go
func (b *backendMock) Engine() consensus.Engine
```

`Engine` returns the consensus engine.