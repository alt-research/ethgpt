## Documentation for the Light Client Transaction Pool Codebase

### Package: light

The `light` package provides a transaction pool implementation for light clients. It keeps track of the status of locally created transactions, detecting if they are included in a block (mined) or rolled back.

### Type: TxPool

```go
type TxPool struct {
	config       *params.ChainConfig
	signer       types.Signer
	quit         chan bool
	txFeed       event.Feed
	scope        event.SubscriptionScope
	chainHeadCh  chan core.ChainHeadEvent
	chainHeadSub event.Subscription
	mu           sync.RWMutex
	chain        *LightChain
	odr          OdrBackend
	chainDb      ethdb.Database
	relay        TxRelayBackend
	head         common.Hash
	nonce        map[common.Address]uint64
	pending      map[common.Hash]*types.Transaction
	mined        map[common.Hash][]*types.Transaction
	clearIdx     uint64
	istanbul     bool
	eip2718      bool
	shanghai     bool
}
```

The `TxPool` type is a struct that represents a transaction pool for light clients. It contains various fields such as the configuration, signer, quit channel, event feed, subscription scope, chain head channel, chain head subscription, mutex, light chain, ODR backend, chain database, transaction relay backend, head hash, nonce map, pending transactions map, mined transactions map, clear index, and fork indicators.

### Function: NewTxPool

```go
func NewTxPool(config *params.ChainConfig, chain *LightChain, odr OdrBackend, chainDb ethdb.Database, relay TxRelayBackend) *TxPool
```

The `NewTxPool` function creates a new light transaction pool. It takes a chain configuration, light chain, ODR backend, chain database, and transaction relay backend as arguments and returns a new `TxPool` instance.

### Type: TxRelayBackend

```go
type TxRelayBackend interface {
	Send(txs types.Transactions)
	NewHead(head common.Hash, mined []common.Hash, rollback []common.Hash)
	Discard(hashes []common.Hash)
}
```

The `TxRelayBackend` type is an interface that provides a mechanism to forward transactions to the Ethereum network. It has three methods: `Send`, `NewHead`, and `Discard`.

### Function: (TxPool) Add

```go
func (pool *TxPool) Add(tx *types.Transaction) error
```

The `Add` function adds a new transaction to the transaction pool. It takes a transaction as an argument and returns an error if the transaction is invalid or already exists in the pool.

### Function: (TxPool) Remove

```go
func (pool *TxPool) Remove(hash common.Hash)
```

The `Remove` function removes a transaction from the transaction pool. It takes a transaction hash as an argument.

### Function: (TxPool) Get

```go
func (pool *TxPool) Get(hash common.Hash) *types.Transaction
```

The `Get` function retrieves a transaction from the transaction pool. It takes a transaction hash as an argument and returns the transaction if it exists in the pool, or `nil` otherwise.

### Function: (TxPool) Pending

```go
func (pool *TxPool) Pending() []*types.Transaction
```

The `Pending` function returns a list of all pending transactions in the transaction pool.

### Function: (TxPool) Mined

```go
func (pool *TxPool) Mined(hash common.Hash) []*types.Transaction
```

The `Mined` function returns a list of all transactions that were mined in a block with the given hash. It takes a block hash as an argument.

### Function: (TxPool) Nonce

```go
func (pool *TxPool) Nonce(addr common.Address) uint64
```

The `Nonce` function returns the next nonce for a given address. It takes an address as an argument and returns the next nonce as a `uint64`.

### Function: (TxPool) SubscribeNewTxs

```go
func (pool *TxPool) SubscribeNewTxs(ch chan<- core.NewTxsEvent) event.Subscription
```

The `SubscribeNewTxs` function subscribes to new transaction events. It takes a channel as an argument and returns a subscription.

### Function: (TxPool) SubscribeChainHeadEvent

```go
func (pool *TxPool) SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription
```

The `SubscribeChainHeadEvent` function subscribes to chain head events. It takes a channel as an argument and returns a subscription.

### Function: (TxPool) Stop

```go
func (pool *TxPool) Stop()
```

The `Stop` function stops the transaction pool and cleans up all resources.

### Function: (TxPool) update

```go
func (pool *TxPool) update(head common.Hash, mined []common.Hash, rollback []common.Hash)
```

The `update` function updates the transaction pool with new mined and rolled back transactions. It takes the new head hash, a list of mined block hashes, and a list of rolled back block hashes as arguments.

### Function: (TxPool) processBlock

```go
func (pool *TxPool) processBlock(block *types.Block, state *state.StateDB, receipts types.Receipts)
```

The ## Documentation for the TxPool Codebase

### Function: NewTxPool

```go
func NewTxPool(config *params.ChainConfig, chain *core.BlockChain, chainHeadChanSize int, relay TxRelayBackend) *TxPool {
	pool := &TxPool{
		config:      config,
		signer:      types.LatestSigner(config),
		nonce:       make(map[common.Address]uint64),
		pending:     make(map[common.Hash]*types.Transaction),
		mined:       make(map[common.Hash][]*types.Transaction),
		quit:        make(chan bool),
		chainHeadCh: make(chan core.ChainHeadEvent, chainHeadChanSize),
		chain:       chain,
		relay:       relay,
		odr:         chain.Odr(),
		chainDb:     chain.Odr().Database(),
		head:        chain.CurrentHeader().Hash(),
		clearIdx:    chain.CurrentHeader().Number.Uint64(),
	}
	// Subscribe events from blockchain
	pool.chainHeadSub = pool.chain.SubscribeChainHeadEvent(pool.chainHeadCh)
	go pool.eventLoop()

	return pool
}
```

The `NewTxPool` function creates a new transaction pool. It takes a chain configuration, a blockchain, a chain head channel size, and a transaction relay backend as arguments. It initializes the transaction pool with the given parameters and returns a pointer to the new transaction pool.

### Function: currentState

```go
func (pool *TxPool) currentState(ctx context.Context) *state.StateDB {
	return NewState(ctx, pool.chain.CurrentHeader(), pool.odr)
}
```

The `currentState` function returns the light state of the current head header. It takes a context as an argument and returns a pointer to the current state.

### Function: GetNonce

```go
func (pool *TxPool) GetNonce(ctx context.Context, addr common.Address) (uint64, error) {
	state := pool.currentState(ctx)
	nonce := state.GetNonce(addr)
	if state.Error() != nil {
		return 0, state.Error()
	}
	sn, ok := pool.nonce[addr]
	if ok && sn > nonce {
		nonce = sn
	}
	if !ok || sn < nonce {
		pool.nonce[addr] = nonce
	}
	return nonce, nil
}
```

The `GetNonce` function returns the "pending" nonce of a given address. It always queries the nonce belonging to the latest header too in order to detect if another client using the same key sent a transaction. It takes a context and an address as arguments and returns the nonce and an error (if any).

### Type: txStateChanges

```go
type txStateChanges map[common.Hash]bool
```

The `txStateChanges` type is a map of transaction hashes to boolean values. A true value means the transaction has been mined, a false value means it has been rolled back, and no entry means there has been no change.

### Function: setState

```go
func (txc txStateChanges) setState(txHash common.Hash, mined bool) {
	val, ent := txc[txHash]
	if ent && (val != mined) {
		delete(txc, txHash)
	} else {
		txc[txHash] = mined
	}
}
```

The `setState` function sets the status of a transaction to either recently mined or recently rolled back. It takes a transaction hash and a boolean value as arguments.

### Function: getLists

```go
func (txc txStateChanges) getLists() (mined []common.Hash, rollback []common.Hash) {
	for hash, val := range txc {
		if val {
			mined = append(mined, hash)
		} else {
			rollback = append(rollback, hash)
		}
	}
	return
}
```

The `getLists` function creates lists of mined and rolled back transaction hashes. It takes no arguments and returns two lists of transaction hashes.

### Function: checkMinedTxs

```go
func (pool *TxPool) checkMinedTxs(ctx context.Context, hash common.Hash, number uint64, txc txStateChanges) error {
	// If no transactions are pending, we don't care about anything
	if len(pool.pending) == 0 {
		return nil
	}
	block, err := GetBlock(ctx, pool.odr, hash, number)
	if err != nil {
		return err
	}
	// Gather all the local transaction mined in this block
	list := pool.mined[hash]
	for _, tx := range block.Transactions() {
		if _, ok := pool.pending[tx.Hash()]; ok {
			list = append(list, tx)
		}
	}
	// If some transactions have been mined, write the needed data to disk and update
	if list != nil ## Documentation for the TxPool Codebase

### Function: ackTxs

```go
func ackTxs(hash common.Hash, txc txStateChanges) {
	batch := pool.chainDb.NewBatch()
	if list, ok := pool.mined[hash]; ok {
		for _, tx := range list {
			txHash := tx.Hash()
			rawdb.DeleteTxLookupEntry(batch, txHash)
			pool.pending[txHash] = tx
			txc.setState(txHash, false)
		}
		delete(pool.mined, hash)
	}
	batch.Write()
}
```

The `ackTxs` function acknowledges the receipt of mined transactions by deleting their lookup entries from the database and moving them from the mined map to the pending map. It takes a hash and a txStateChanges map as arguments. It iterates over the list of mined transactions for the given hash, deletes their lookup entries, moves them to the pending map, and sets their state to false in the txStateChanges map.

### Function: reorgOnNewHead

```go
func (pool *TxPool) reorgOnNewHead(ctx context.Context, newHeader *types.Header) (txStateChanges, error) {
	txc := make(txStateChanges)
	oldh := pool.chain.GetHeaderByHash(pool.head)
	newh := newHeader
	// find common ancestor, create list of rolled back and new block hashes
	var oldHashes, newHashes []common.Hash
	for oldh.Hash() != newh.Hash() {
		if oldh.Number.Uint64() >= newh.Number.Uint64() {
			oldHashes = append(oldHashes, oldh.Hash())
			oldh = pool.chain.GetHeader(oldh.ParentHash, oldh.Number.Uint64()-1)
		}
		if oldh.Number.Uint64() < newh.Number.Uint64() {
			newHashes = append(newHashes, newh.Hash())
			newh = pool.chain.GetHeader(newh.ParentHash, newh.Number.Uint64()-1)
			if newh == nil {
				// happens when CHT syncing, nothing to do
				newh = oldh
			}
		}
	}
	if oldh.Number.Uint64() < pool.clearIdx {
		pool.clearIdx = oldh.Number.Uint64()
	}
	// roll back old blocks
	for _, hash := range oldHashes {
		pool.rollbackTxs(hash, txc)
	}
	pool.head = oldh.Hash()
	// check mined txs of new blocks (array is in reversed order)
	for i := len(newHashes) - 1; i >= 0; i-- {
		hash := newHashes[i]
		if err := pool.checkMinedTxs(ctx, hash, newHeader.Number.Uint64()-uint64(i), txc); err != nil {
			return txc, err
		}
		pool.head = hash
	}

	// clear old mined tx entries of old blocks
	if idx := newHeader.Number.Uint64(); idx > pool.clearIdx+txPermanent {
		idx2 := idx - txPermanent
		if len(pool.mined) > 0 {
			for i := pool.clearIdx; i < idx2; i++ {
				hash := rawdb.ReadCanonicalHash(pool.chainDb, i)
				if list, ok := pool.mined[hash]; ok {
					hashes := make([]common.Hash, len(list))
					for i, tx := range list {
						hashes[i] = tx.Hash()
					}
					pool.relay.Discard(hashes)
					delete(pool.mined, hash)
				}
			}
		}
		pool.clearIdx = idx2
	}

	return txc, nil
}
```

The `reorgOnNewHead` function processes a new head header, rolling back old blocks and checking mined transactions of new blocks. It takes a context and a new header as arguments and returns a txStateChanges map and an error. It finds the common ancestor of the old and new headers, creates lists of rolled back and new block hashes, and rolls back old blocks by calling the `rollbackTxs` function. It then checks mined transactions of new blocks by calling the `checkMinedTxs` function and updates the head hash. Finally, it clears old mined tx entries of old blocks and returns the txStateChanges map.

### Function: blockCheckTimeout

```go
const blockCheckTimeout = time.Second * 3
```

The `blockCheckTimeout` constant is the time limit for checking new blocks for mined transactions. Checking resumes at the next chain ## Documentation for the TxPool Codebase

### Function: NewTxPool

```go
func NewTxPool(config *params.ChainConfig, chain *core.BlockChain, signer types.Signer, txFeed event.Feed) *TxPool {
	pool := &TxPool{
		config: config,
		chain:  chain,
		signer: signer,
		txFeed: txFeed,
		scope:  event.NewScope(event.GlobalScope),
		quit:   make(chan struct{}),
	}
	pool.currentState = func(ctx context.Context) *state.StateDB {
		return pool.chain.State()
	}
	pool.chainHeadSub = pool.chain.SubscribeChainHeadEvent(pool.scope.Track)
	pool.head = pool.chain.CurrentBlock().Hash()
	pool.istanbul = pool.config.IsIstanbul(pool.chain.Config().ChainID)
	pool.eip2718 = pool.config.IsBerlin(pool.chain.Config().ChainID)
	pool.shanghai = pool.config.IsShanghai(uint64(time.Now().Unix()))
	return pool
}
```

The `NewTxPool` function creates a new transaction pool. It takes a chain configuration, a blockchain, a signer, and a transaction feed as arguments. It creates a new transaction pool with the given parameters and initializes its state.

### Function: Start

```go
func (pool *TxPool) Start() {
	go pool.loop()
	log.Info("Transaction pool started")
}
```

The `Start` function starts the light transaction pool by running the `loop` function in a new goroutine.

### Function: loop

```go
func (pool *TxPool) loop() {
	defer pool.scope.Close()

	for {
		select {
		case <-pool.quit:
			return
		case head := <-pool.chainHeadSub.Chan():
			if head == nil {
				return
			}
			pool.mu.Lock()
			pool.head = head.(core.ChainHeadEvent).Block.Hash()
			pool.mu.Unlock()
		}
	}
}
```

The `loop` function is a goroutine that listens for new blocks on the blockchain and updates the transaction pool's head block accordingly.

### Function: Stop

```go
func (pool *TxPool) Stop() {
	pool.scope.Close()
	pool.chainHeadSub.Unsubscribe()
	close(pool.quit)
	log.Info("Transaction pool stopped")
}
```

The `Stop` function stops the light transaction pool by closing all subscriptions and channels and logging a message.

### Function: SubscribeNewTxsEvent

```go
func (pool *TxPool) SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent) event.Subscription {
	return pool.scope.Track(pool.txFeed.Subscribe(ch))
}
```

The `SubscribeNewTxsEvent` function registers a subscription of `core.NewTxsEvent` and starts sending events to the given channel. It returns a subscription object.

### Function: Stats

```go
func (pool *TxPool) Stats() (pending int) {
	pool.mu.RLock()
	defer pool.mu.RUnlock()

	pending = len(pool.pending)
	return
}
```

The `Stats` function returns the number of currently pending (locally created) transactions.

### Function: validateTx

```go
func (pool *TxPool) validateTx(ctx context.Context, tx *types.Transaction) error {
	// Validate sender
	var (
		from common.Address
		err  error
	)

	// Validate the transaction sender and it's sig. Throw
	// if the from fields is invalid.
	if from, err = types.Sender(pool.signer, tx); err != nil {
		return txpool.ErrInvalidSender
	}
	// Last but not least check for nonce errors
	currentState := pool.currentState(ctx)
	if n := currentState.GetNonce(from); n > tx.Nonce() {
		return core.ErrNonceTooLow
	}

	// Check the transaction doesn't exceed the current
	// block limit gas.
	header := pool.chain.GetHeaderByHash(pool.head)
	if header.GasLimit < tx.Gas() {
		return txpool.ErrGasLimit
	}

	// Transactions can't be negative. This may never happen
	// using RLP decoded transactions but may occur if you create
	// a transaction using the RPC for example.
	if tx.Value().Sign() < 0 {
		return txpool.ErrNegativeValue
	}

	// Transactor should have enough funds to cover the costs
	// cost == V + GP * GL
	if b := currentState.GetBalance(from); b.Cmp(tx.Cost()) < 0 {
		return core.ErrInsufficientFunds
	}

	// Should supply enough intrinsic gas
	gas, err := core.IntrinsicGas(tx.Data(), tx.AccessList(), tx.To() == nil, true, pool.istanbul, pool.shanghai)
	if err != nil {
		return err
	}
	if tx.Gas() < gas {
		return core.ErrIntrinsicGas
	}
	return currentState.Error()
}
```

The `validateTx` function checks whether a transaction is valid according to the consensus rules. It takes a ## Documentation for the TxPool Codebase

### Function: Add

```go
func (pool *TxPool) Add(ctx context.Context, tx *types.Transaction) error {
	data, err := tx.MarshalBinary()
	if err != nil {
		return err
	}

	if err := pool.add(ctx, tx); err != nil {
		return err
	}
	pool.relay.Send(types.Transactions{tx})

	pool.chainDb.Put(tx.Hash().Bytes(), data)
	return nil
}
```

The `Add` function adds a transaction to the pool. It takes a context and a transaction as arguments. It marshals the transaction to binary format and adds it to the pool using the `add` function. It then sends the transaction to the relay backend and stores the transaction data in the chain database.

### Function: AddBatch

```go
func (pool *TxPool) AddBatch(ctx context.Context, txs []*types.Transaction) {
	pool.mu.Lock()
	defer pool.mu.Unlock()
	var sendTx types.Transactions

	for _, tx := range txs {
		if err := pool.add(ctx, tx); err == nil {
			sendTx = append(sendTx, tx)
		}
	}
	if len(sendTx) > 0 {
		pool.relay.Send(sendTx)
	}
}
```

The `AddBatch` function adds all valid transactions in a batch to the pool and passes them to the transaction relay backend. It takes a context and a slice of transactions as arguments. It adds each transaction to the pool using the `add` function and appends it to a slice of transactions to be sent to the relay backend. It then sends the transactions to the relay backend.

### Function: GetTransaction

```go
func (pool *TxPool) GetTransaction(hash common.Hash) *types.Transaction {
	// check the txs first
	if tx, ok := pool.pending[hash]; ok {
		return tx
	}
	return nil
}
```

The `GetTransaction` function returns a transaction if it is contained in the pool and nil otherwise. It takes a hash of the transaction as an argument. It checks if the transaction is in the pending pool and returns it if it is.

### Function: GetTransactions

```go
func (pool *TxPool) GetTransactions() (txs types.Transactions, err error) {
	pool.mu.RLock()
	defer pool.mu.RUnlock()

	txs = make(types.Transactions, len(pool.pending))
	i := 0
	for _, tx := range pool.pending {
		txs[i] = tx
		i++
	}
	return txs, nil
}
```

The `GetTransactions` function returns all currently processable transactions in the pool. It takes no arguments. It returns a slice of transactions and an error. It locks the pool for reading, creates a new slice of transactions with the same length as the pending pool, and copies the transactions from the pending pool to the new slice. It then returns the new slice of transactions.

### Function: Content

```go
func (pool *TxPool) Content() (map[common.Address]types.Transactions, map[common.Address]types.Transactions) {
	pool.mu.RLock()
	defer pool.mu.RUnlock()

	// Retrieve all the pending transactions and sort by account and by nonce
	pending := make(map[common.Address]types.Transactions)
	for _, tx := range pool.pending {
		account, _ := types.Sender(pool.signer, tx)
		pending[account] = append(pending[account], tx)
	}
	// There are no queued transactions in a light pool, just return an empty map
	queued := make(map[common.Address]types.Transactions)
	return pending, queued
}
```

The `Content` function retrieves the data content of the transaction pool, returning all the pending as well as queued transactions, grouped by account and nonce. It takes no arguments. It locks the pool for reading, creates two maps of transactions, and populates the first map with the pending transactions sorted by account and nonce. It then returns both maps.

### Function: ContentFrom

```go
func (pool *TxPool) ContentFrom(addr common.Address) (types.Transactions, types.Transactions) {
	pool.mu.RLock()
	defer pool.mu.RUnlock()

	// Retrieve the pending transactions and sort by nonce
	var pending types.Transactions
	for _, tx := range pool.pending {
		account, _ := types.Sender(pool.signer, tx)
		if account != addr {
			continue
		}
		pending = append(pending, tx)
	}
	// There are no queued transactions in a light pool, just return an empty map
	return pending, types.Transactions{}
}
```

The `ContentFrom` function retrieves the data content of the transaction pool, returning the pending as well as queued transactions of a specific address, grouped by nonce. It takes an address as an argument. It locks the pool for reading, creates a new slice of transactions, and populates it with the pending transactions of the specified address sorted by nonce. It then returns the new slice of transactions and an empty slice of transactions.

### Function: RemoveTransactions

```go
func (pool *TxPool) RemoveTransactions(txs types.Transactions) {
	pool.mu.Lock()
	defer pool.mu.Unlock()

	var hashes []common.Hash
	batch := pool.chainDb.NewBatch()
	for _, tx := range txs {
		hash := tx.Hash()
		delete(pool.pending, hash)
		batch.Delete(hash.Bytes())
		hashes =