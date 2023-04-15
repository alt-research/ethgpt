## Documentation for the Ethereum Codebase

### Package: eth

The `eth` package contains the Ethereum protocol implementation.

### Function: newTestTxPool

```go
func newTestTxPool() *testTxPool {
	return &testTxPool{
		pool: make(map[common.Hash]*types.Transaction),
	}
}
```

`newTestTxPool` creates a new mock transaction pool.

### Type: testTxPool

`testTxPool` is a mock transaction pool that blindly accepts all transactions. Its goal is to get around setting up a valid statedb for the balance and nonce checks.

#### Method: Has

```go
func (p *testTxPool) Has(hash common.Hash) bool {
	p.lock.Lock()
	defer p.lock.Unlock()

	return p.pool[hash] != nil
}
```

`Has` returns an indicator whether txpool has a transaction cached with the given hash.

#### Method: Get

```go
func (p *testTxPool) Get(hash common.Hash) *types.Transaction {
	p.lock.Lock()
	defer p.lock.Unlock()

	return p.pool[hash]
}
```

`Get` retrieves the transaction from local txpool with given tx hash.

#### Method: AddRemotes

```go
func (p *testTxPool) AddRemotes(txs []*types.Transaction) []error {
	p.lock.Lock()
	defer p.lock.Unlock()

	for _, tx := range txs {
		p.pool[tx.Hash()] = tx
	}
	p.txFeed.Send(core.NewTxsEvent{Txs: txs})
	return make([]error, len(txs))
}
```

`AddRemotes` appends a batch of transactions to the pool, and notifies any listeners if the addition channel is non-nil.

#### Method: Pending

```go
func (p *testTxPool) Pending(enforceTips bool) map[common.Address]types.Transactions {
	p.lock.RLock()
	defer p.lock.RUnlock()

	batches := make(map[common.Address]types.Transactions)
	for _, tx := range p.pool {
		from, _ := types.Sender(types.HomesteadSigner{}, tx)
		batches[from] = append(batches[from], tx)
	}
	for _, batch := range batches {
		sort.Sort(types.TxByNonce(batch))
	}
	return batches
}
```

`Pending` returns all the transactions known to the pool.

#### Method: SubscribeNewTxsEvent

```go
func (p *testTxPool) SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent) event.Subscription {
	return p.txFeed.Subscribe(ch)
}
```

`SubscribeNewTxsEvent` should return an event subscription of NewTxsEvent and send events to the given channel. ## Documentation for the Ethereum Codebase

### Function: e(ch)

```go
func e(ch)
```

This function takes in a channel `ch` and sends a value to it. The purpose of this function is not clear from the code snippet provided. 

### Type: testHandler

```go
type testHandler struct {
	db      ethdb.Database
	chain   *core.BlockChain
	txpool  *testTxPool
	handler *handler
}
```

This is a struct that represents a test implementation of the Ethereum protocol handler. It contains the following fields:

- `db`: an instance of `ethdb.Database` that represents the database used by the handler.
- `chain`: a pointer to an instance of `core.BlockChain` that represents the blockchain used by the handler.
- `txpool`: a pointer to an instance of `testTxPool` that represents the transaction pool used by the handler.
- `handler`: a pointer to an instance of `handler` that represents the actual protocol handler.

### Function: newTestHandler

```go
func newTestHandler() *testHandler
```

This function creates a new instance of `testHandler` with no blocks. It initializes a new database with a genesis block and creates a new blockchain with the given configuration. It also creates a new transaction pool and a new protocol handler. It returns a pointer to the newly created `testHandler`.

### Function: newTestHandlerWithBlocks

```go
func newTestHandlerWithBlocks(blocks int) *testHandler
```

This function creates a new instance of `testHandler` with a given number of initial blocks. It initializes a new database with a genesis block and creates a new blockchain with the given configuration and the specified number of blocks. It also creates a new transaction pool and a new protocol handler. It returns a pointer to the newly created `testHandler`.

### Function: (b *testHandler) close

```go
func (b *testHandler) close()
```

This function tears down the `testHandler` and all its internal constructs. It stops the protocol handler and the blockchain.