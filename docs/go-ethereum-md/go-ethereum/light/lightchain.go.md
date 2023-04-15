## Documentation for the LightChain Codebase

### Package: light

The `light` package implements on-demand retrieval capable state and chain objects for the Ethereum Light Client.

### Type: LightChain

```go
type LightChain struct {
	hc            *core.HeaderChain
	indexerConfig *IndexerConfig
	chainDb       ethdb.Database
	engine        consensus.Engine
	odr           OdrBackend
	chainFeed     event.Feed
	chainSideFeed event.Feed
	chainHeadFeed event.Feed
	scope         event.SubscriptionScope
	genesisBlock  *types.Block
	forker        *core.ForkChoice

	bodyCache    *lru.Cache[common.Hash, *types.Body]
	bodyRLPCache *lru.Cache[common.Hash, rlp.RawValue]
	blockCache   *lru.Cache[common.Hash, *types.Block]

	chainmu sync.RWMutex // protects header inserts
	quit    chan struct{}
	wg      sync.WaitGroup

	// Atomic boolean switches:
	running          int32 // whether LightChain is running or stopped
	procInterrupt    int32 // interrupts chain insert
	disableCheckFreq int32 // disables header verification
}
```

The `LightChain` type represents a canonical chain that by default only handles block headers, downloading block bodies and receipts on demand through an ODR interface. It only does header validation during chain insertion. It has the following fields:

- `hc`: a header chain that handles block headers
- `indexerConfig`: the configuration for the indexer
- `chainDb`: the database for the chain
- `engine`: the consensus engine
- `odr`: the on-demand retrieval backend
- `chainFeed`: a feed for chain events
- `chainSideFeed`: a feed for chain side events
- `chainHeadFeed`: a feed for chain head events
- `scope`: a subscription scope for the feeds
- `genesisBlock`: the genesis block of the chain
- `forker`: a fork choice algorithm for the chain
- `bodyCache`: a cache for block bodies
- `bodyRLPCache`: a cache for RLP-encoded block bodies
- `blockCache`: a cache for blocks
- `chainmu`: a mutex that protects header inserts
- `quit`: a channel for quitting the chain
- `wg`: a wait group for the chain

### Function: NewLightChain

```go
func NewLightChain(odr OdrBackend, config *params.ChainConfig, engine consensus.Engine, checkpoint *params.TrustedCheckpoint) (*LightChain, error) {
	...
}
```

The `NewLightChain` function returns a fully initialized light chain using information available in the database. It initializes the default Ethereum header validator. It takes an on-demand retrieval backend, a chain configuration, a consensus engine, and a trusted checkpoint as arguments. It returns a new light chain and an error if there was a problem initializing the header chain.

### Function: GetBlockByNumber

```go
func (bc *LightChain) GetBlockByNumber(ctx context.Context, number uint64) (*types.Block, error) {
	...
}
```

The `GetBlockByNumber` function retrieves a block by its number. It takes a context and a block number as arguments. It returns the block and an error if there was a problem retrieving the block.

### Function: GetBlockByHash

```go
func (bc *LightChain) GetBlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error) {
	...
}
```

The `GetBlockByHash` function retrieves a block by its hash. It takes a context and a block hash as arguments. It returns the block and an error if there was a problem retrieving the block.

### Function: GetHeaderByNumber

```go
func (bc *LightChain) GetHeaderByNumber(ctx context.Context, number uint64) (*types.Header, error) {
	...
}
```

The `GetHeaderByNumber` function retrieves a header by its number. It takes a context and a header number as arguments. It returns the header and an error if there was a problem retrieving the header.

### Function: GetHeaderByHash

```go
func (bc *LightChain) GetHeaderByHash(ctx context.Context, hash common.Hash) (*types.Header, error) {
	...
}
```

The `GetHeaderByHash` function retrieves a header by its hash. It takes a context and a header hash as arguments. It returns the header and an error if there was a problem retrieving the header.

### Function: GetTd

```go
func (bc *LightChain) GetTd(hash common.Hash) *big.Int {
	...
}
```

The `GetTd` function retrieves the total difficulty of a block by its hash. It takes a block hash as an argument. It returns the total difficulty of the block.

### Function: CurrentHeader

```go
func (bc *LightChain) CurrentHeader() *types.Header {
	...
}
```

The `CurrentHeader` function returns the current header of the chain.

### Function: CurrentBlock ## Documentation for the LightChain Codebase

### Function: NewLightChain

```go
func NewLightChain(config *params.ChainConfig, chainDb ethdb.Database, odr OdrBackend, genesisBlock *types.Block, indexerConfig *IndexerConfig) (*LightChain, error) {
	// Create the header chain and the blockchain
	hc := core.NewHeaderChain(chainDb, config)
	bc, err := NewBlockChain(chainDb, config, hc, odr, genesisBlock, indexerConfig)
	if err != nil {
		return nil, err
	}
	// Check the current state of the block hashes and make sure that we do not have any of the bad blocks in our chain
	for hash := range core.BadHashes {
		if header := bc.GetHeaderByHash(hash); header != nil {
			log.Error("Found bad hash, rewinding chain", "number", header.Number, "hash", header.ParentHash)
			bc.SetHead(header.Number.Uint64() - 1)
			log.Info("Chain rewind was successful, resuming normal operation")
		}
	}
	return bc, nil
}
```

The `NewLightChain` function creates a new LightChain instance. It takes a ChainConfig, a ChainDb, an OdrBackend, a genesis block, and an IndexerConfig as arguments. It creates a new HeaderChain and a new BlockChain. It then checks the current state of the block hashes and makes sure that there are no bad blocks in the chain. It returns the new BlockChain instance.

### Function: AddTrustedCheckpoint

```go
func (lc *LightChain) AddTrustedCheckpoint(cp *params.TrustedCheckpoint) {
	if lc.odr.ChtIndexer() != nil {
		StoreChtRoot(lc.chainDb, cp.SectionIndex, cp.SectionHead, cp.CHTRoot)
		lc.odr.ChtIndexer().AddCheckpoint(cp.SectionIndex, cp.SectionHead)
	}
	if lc.odr.BloomTrieIndexer() != nil {
		StoreBloomTrieRoot(lc.chainDb, cp.SectionIndex, cp.SectionHead, cp.BloomRoot)
		lc.odr.BloomTrieIndexer().AddCheckpoint(cp.SectionIndex, cp.SectionHead)
	}
	if lc.odr.BloomIndexer() != nil {
		lc.odr.BloomIndexer().AddCheckpoint(cp.SectionIndex, cp.SectionHead)
	}
	log.Info("Added trusted checkpoint", "block", (cp.SectionIndex+1)*lc.indexerConfig.ChtSize-1, "hash", cp.SectionHead)
}
```

The `AddTrustedCheckpoint` function adds a trusted checkpoint to the blockchain. It takes a TrustedCheckpoint as an argument. It stores the CHT root, the Bloom trie root, and the Bloom filter checkpoint in the database and adds the checkpoint to the CHT indexer, the Bloom trie indexer, and the Bloom filter indexer. It logs that a trusted checkpoint has been added.

### Function: getProcInterrupt

```go
func (lc *LightChain) getProcInterrupt() bool {
	return atomic.LoadInt32(&lc.procInterrupt) == 1
}
```

The `getProcInterrupt` function returns a boolean indicating whether the process has been interrupted.

### Function: Odr

```go
func (lc *LightChain) Odr() OdrBackend {
	return lc.odr
}
```

The `Odr` function returns the ODR backend of the chain.

### Function: HeaderChain

```go
func (lc *LightChain) HeaderChain() *core.HeaderChain {
	return lc.hc
}
```

The `HeaderChain` function returns the underlying header chain.

### Function: loadLastState

```go
func (lc *LightChain) loadLastState() error {
	if head := rawdb.ReadHeadHeaderHash(lc.chainDb); head == (common.Hash{}) {
		// Corrupt or empty database, init from scratch
		lc.Reset()
	} else {
		header := lc.GetHeaderByHash(head)
		if header == nil {
			// Corrupt or empty database, init from scratch
			lc.Reset()
		} else {
			lc.hc.SetCurrentHeader(header)
		}
	}
	// Issue a status log and return
	header := lc.hc.CurrentHeader()
	headerTd := lc.GetTd(header.Hash(), header.Number.Uint64())
	log.Info("Loaded most recent local header", "number", header.Number, "hash", header.Hash(), "td", headerTd, "age", common.PrettyAge(time.Unix(int64(header.Time), 0)))
	return nil
}
```

The `loadLastState` function loads the last known chain state from ## Documentation for the LightChain Codebase

### Function: Reset

```go
func (lc *LightChain) Reset() {
	batch := lc.db.NewBatch()
	genesis := lc.engine.Genesis()
	rawdb.WriteCanonicalHash(batch, 0, genesis.Hash())
	rawdb.WriteBlock(batch, genesis)
	rawdb.WriteHeadHeaderHash(batch, genesis.Hash())
	if err := batch.Write(); err != nil {
		log.Crit("Failed to reset genesis block", "err", err)
	}
	lc.genesisBlock = genesis
	lc.hc.SetGenesis(lc.genesisBlock.Header())
	lc.hc.SetCurrentHeader(lc.genesisBlock.Header())
}
```

The `Reset` function resets the light chain by writing the genesis block to the database and setting it as the current header.

### Function: Engine

```go
func (lc *LightChain) Engine() consensus.Engine { return lc.engine }
```

The `Engine` function retrieves the light chain's consensus engine.

### Function: Genesis

```go
func (lc *LightChain) Genesis() *types.Block {
	return lc.genesisBlock
}
```

The `Genesis` function returns the genesis block.

### Function: StateCache

```go
func (lc *LightChain) StateCache() state.Database {
	panic("not implemented")
}
```

The `StateCache` function is not implemented and panics.

### Function: GetBody

```go
func (lc *LightChain) GetBody(ctx context.Context, hash common.Hash) (*types.Body, error) {
	// Short circuit if the body's already in the cache, retrieve otherwise
	if cached, ok := lc.bodyCache.Get(hash); ok {
		return cached, nil
	}
	number := lc.hc.GetBlockNumber(hash)
	if number == nil {
		return nil, errors.New("unknown block")
	}
	body, err := GetBody(ctx, lc.odr, hash, *number)
	if err != nil {
		return nil, err
	}
	// Cache the found body for next time and return
	lc.bodyCache.Add(hash, body)
	return body, nil
}
```

The `GetBody` function retrieves a block body (transactions and uncles) from the database or ODR service by hash, caching it if found.

### Function: GetBodyRLP

```go
func (lc *LightChain) GetBodyRLP(ctx context.Context, hash common.Hash) (rlp.RawValue, error) {
	// Short circuit if the body's already in the cache, retrieve otherwise
	if cached, ok := lc.bodyRLPCache.Get(hash); ok {
		return cached, nil
	}
	number := lc.hc.GetBlockNumber(hash)
	if number == nil {
		return nil, errors.New("unknown block")
	}
	body, err := GetBodyRLP(ctx, lc.odr, hash, *number)
	if err != nil {
		return nil, err
	}
	// Cache the found body for next time and return
	lc.bodyRLPCache.Add(hash, body)
	return body, nil
}
```

The `GetBodyRLP` function retrieves a block body in RLP encoding from the database or ODR service by hash, caching it if found.

### Function: HasBlock

```go
func (lc *LightChain) HasBlock(hash common.Hash, number uint64) bool {
	blk, _ := lc.GetBlock(NoOdr, hash, number)
	return blk != nil
}
```

The `HasBlock` function checks if a block is fully present in the database or not, caching it if present.

### Function: GetBlock

```go
func (lc *LightChain) GetBlock(ctx context.Context, hash common.Hash, number uint64) (*types.Block, error) {
	// Short circuit if the block's already in the cache, retrieve otherwise
	if block, ok := lc.blockCache.Get(hash); ok {
		return block, nil
	}
	block, err := GetBlock(ctx, lc.odr, hash, number)
	if err != nil {
		return nil, err
	}
	// Cache the found block for next time and return
	lc.blockCache.Add(block.Hash(), block)
	return block, nil
}
```

The `GetBlock` function retrieves a block from the database or ODR service by hash and number, caching it if found.

### Function: GetBlockByHash

```go
func (lc *LightChain) GetBlockByHash(ctx context.Context, hash common.Hash) (*types.Block, error) {
	number := lc.hc.GetBlockNumber(hash)
	if number == nil {
		return nil, errors.New("unknown block")
	}
	return lc.GetBlock(ctx, hash, *number)
}
```

The `GetBlockByHash` function retrieves a block from the database or ODR service by hash, ## Documentation for the LightChain Codebase

### Function: Stop

```go
func (lc *LightChain) Stop() {
	if !atomic.CompareAndSwapInt32(&lc.running, 0, 1) {
		return
	}
	close(lc.quit)
	lc.StopInsert()
	lc.wg.Wait()
	log.Info("Blockchain stopped")
}
```

The `Stop` function is a method that stops the blockchain. It sets the `running` flag to 1 and closes the `quit` channel. It then calls the `StopInsert` function to interrupt all insertion methods and waits for all goroutines to finish before logging a message that the blockchain has stopped.

### Function: StopInsert

```go
func (lc *LightChain) StopInsert() {
	atomic.StoreInt32(&lc.procInterrupt, 1)
}
```

The `StopInsert` function is a method that interrupts all insertion methods, causing them to return `errInsertionInterrupted` as soon as possible. Insertion is permanently disabled after calling this method.

### Function: Rollback

```go
func (lc *LightChain) Rollback(chain []common.Hash) {
	lc.chainmu.Lock()
	defer lc.chainmu.Unlock()

	batch := lc.chainDb.NewBatch()
	for i := len(chain) - 1; i >= 0; i-- {
		hash := chain[i]

		// Degrade the chain markers if they are explicitly reverted.
		// In theory we should update all in-memory markers in the
		// last step, however the direction of rollback is from high
		// to low, so it's safe the update in-memory markers directly.
		if head := lc.hc.CurrentHeader(); head.Hash() == hash {
			rawdb.WriteHeadHeaderHash(batch, head.ParentHash)
			lc.hc.SetCurrentHeader(lc.GetHeader(head.ParentHash, head.Number.Uint64()-1))
		}
	}
	if err := batch.Write(); err != nil {
		log.Crit("Failed to rollback light chain", "error", err)
	}
}
```

The `Rollback` function is a method that removes a chain of links from the database that aren't certain enough to be valid. It takes a chain of hashes as an argument and iterates over them in reverse order. For each hash, it checks if it is the current header and if so, degrades the chain markers and updates the in-memory markers. It then writes the batch to the database and logs a critical message if there is an error.

### Function: InsertHeader

```go
func (lc *LightChain) InsertHeader(header *types.Header) error {
	// Verify the header first before obtaining the lock
	headers := []*types.Header{header}
	if _, err := lc.hc.ValidateHeaderChain(headers, 100); err != nil {
		return err
	}
	// Make sure only one thread manipulates the chain at once
	lc.chainmu.Lock()
	defer lc.chainmu.Unlock()

	lc.wg.Add(1)
	defer lc.wg.Done()

	_, err := lc.hc.WriteHeaders(headers)
	log.Info("Inserted header", "number", header.Number, "hash", header.Hash())
	return err
}
```

The `InsertHeader` function is a method that inserts a header into the local chain. It first verifies the header before obtaining the lock. It then makes sure only one thread manipulates the chain at once and writes the header to the chain. It logs a message that the header has been inserted and returns an error if there is one.

### Function: SetCanonical

```go
func (lc *LightChain) SetCanonical(header *types.Header) error {
	lc.chainmu.Lock()
	defer lc.chainmu.Unlock()

	lc.wg.Add(1)
	defer lc.wg.Done()

	if err := lc.hc.Reorg([]*types.Header{header}); err != nil {
		return err
	}
	// Emit events
	block := types.NewBlockWithHeader(header)
	lc.chainFeed.Send(core.ChainEvent{Block: block, Hash: block.Hash()})
	lc.chainHeadFeed.Send(core.ChainHeadEvent{Block: block})
	log.Info("Set the chain head", "number", block.Number(), "hash", block.Hash())
	return nil
}
```

The `SetCanonical` function is a method that sets the canonical chain head to a given header. It locks the chain, adds a wait group, and calls the `Reorg` function to perform a reorganization. It then emits events and logs a message that the chain head has been set.

### Function: InsertHeaderChain

```go
func (lc *LightChain) InsertHeaderChain(chain []*types.Header, checkFreq int) (int, error) {
	if len(chain) == 0 {
		return 0, nil
	}
	if atomic.LoadInt32(&lc.disableCheck ## Documentation for the LightChain Codebase

### Function: s

```go
func (lc *LightChain) s(block *types.Block, typ core.SyncType) (int, error) {
	err := lc.hc.Process(block, typ)
	switch typ {
	case core.CanonStatTy:
		lc.chainFeed.Send(core.ChainEvent{Block: block, Hash: block.Hash()})
		lc.chainHeadFeed.Send(core.ChainHeadEvent{Block: block})
	case core.SideStatTy:
		lc.chainSideFeed.Send(core.ChainSideEvent{Block: block})
	}
	return 0, err
}
```

The `s` function is a method that processes a block and updates the header chain. It takes a block and a sync type as arguments. It processes the block using the header chain's `Process` method and sends events to the appropriate feeds based on the sync type. It returns 0 and an error.

### Function: CurrentHeader

```go
func (lc *LightChain) CurrentHeader() *types.Header {
	return lc.hc.CurrentHeader()
}
```

The `CurrentHeader` function is a method that retrieves the current head header of the canonical chain from the header chain's internal cache.

### Function: GetTd

```go
func (lc *LightChain) GetTd(hash common.Hash, number uint64) *big.Int {
	return lc.hc.GetTd(hash, number)
}
```

The `GetTd` function is a method that retrieves a block's total difficulty in the canonical chain from the database by hash and number, caching it if found.

### Function: GetTdOdr

```go
func (lc *LightChain) GetTdOdr(ctx context.Context, hash common.Hash, number uint64) *big.Int {
	td := lc.GetTd(hash, number)
	if td != nil {
		return td
	}
	td, _ = GetTd(ctx, lc.odr, hash, number)
	return td
}
```

The `GetTdOdr` function is a method that retrieves the total difficulty from the database or network by hash and number, caching it (associated with its hash) if found. It takes a context, hash, and number as arguments. It first tries to retrieve the total difficulty from the cache using the `GetTd` method. If it is not found, it retrieves it from the network using the `GetTd` function from the `odr` object.

### Function: GetHeader

```go
func (lc *LightChain) GetHeader(hash common.Hash, number uint64) *types.Header {
	return lc.hc.GetHeader(hash, number)
}
```

The `GetHeader` function is a method that retrieves a block header from the database by hash and number, caching it if found.

### Function: GetHeaderByHash

```go
func (lc *LightChain) GetHeaderByHash(hash common.Hash) *types.Header {
	return lc.hc.GetHeaderByHash(hash)
}
```

The `GetHeaderByHash` function is a method that retrieves a block header from the database by hash, caching it if found.

### Function: HasHeader

```go
func (lc *LightChain) HasHeader(hash common.Hash, number uint64) bool {
	return lc.hc.HasHeader(hash, number)
}
```

The `HasHeader` function is a method that checks if a block header is present in the database or not, caching it if present.

### Function: GetCanonicalHash

```go
func (bc *LightChain) GetCanonicalHash(number uint64) common.Hash {
	return bc.hc.GetCanonicalHash(number)
}
```

The `GetCanonicalHash` function is a method that returns the canonical hash for a given block number.

### Function: GetAncestor

```go
func (lc *LightChain) GetAncestor(hash common.Hash, number, ancestor uint64, maxNonCanonical *uint64) (common.Hash, uint64) {
	return lc.hc.GetAncestor(hash, number, ancestor, maxNonCanonical)
}
```

The `GetAncestor` function is a method that retrieves the Nth ancestor of a given block. It assumes that either the given block or a close ancestor of it is canonical. `maxNonCanonical` points to a downwards counter limiting the number of blocks to be individually checked before we reach the canonical chain. Note: ancestor == 0 returns the same block, 1 returns its parent and so on.

### Function: GetHeaderByNumber

```go
func (lc *LightChain) GetHeaderByNumber(number uint64) *types.Header {
	return lc.hc.GetHeaderByNumber(number)
}
```

The `GetHeaderByNumber` function is a method that retrieves a block header from the database by number, caching it (associated with its hash) if found.

### Function: GetHeaderByNumberOdr

```go
func (lc *LightChain) GetHeaderByNumberOdr(ctx context.Context, number uint64) (*types.Header, error) {
	if header := lc.hc.GetHeaderByNumber(number); header != nil {
		return header, nil
	}
	return GetHeaderByNumber(ctx, lc.odr, number)
}
``` ## Documentation for the LightChain Codebase

### Function: UpdateLatestHeader

```go
func (lc *LightChain) UpdateLatestHeader(ctx context.Context) bool {
	head := lc.hc.CurrentHeader().Number.Uint64()
	latest := lc.odr.CurrentBlock().NumberU64()
	latest -= rConfig.ChtSize - 1
	if clique := lc.hc.Config().Clique; clique != nil {
		latest -= latest % clique.Epoch // epoch snapshot for clique
	}
	if head >= latest {
		return true
	}
	// Retrieve the latest useful header and update to it
	if header, err := GetHeaderByNumber(ctx, lc.odr, latest); header != nil && err == nil {
		lc.chainmu.Lock()
		defer lc.chainmu.Unlock()

		// Ensure the chain didn't move past the latest block while retrieving it
		if lc.hc.CurrentHeader().Number.Uint64() < header.Number.Uint64() {
			log.Info("Updated latest header based on CHT", "number", header.Number, "hash", header.Hash(), "age", common.PrettyAge(time.Unix(int64(header.Time), 0)))
			rawdb.WriteHeadHeaderHash(lc.chainDb, header.Hash())
			lc.hc.SetCurrentHeader(header)
		}
		return true
	}
	return false
}
```

The `UpdateLatestHeader` function updates the latest header of the chain. It first calculates the latest block number based on the current block and the CHT size. If the chain is using the Clique consensus algorithm, it also takes an epoch snapshot. If the current header is already at or beyond the latest block, it returns true. Otherwise, it retrieves the latest useful header and updates to it. If the header is successfully retrieved and the chain didn't move past the latest block while retrieving it, it updates the current header and returns true. Otherwise, it returns false.

### Function: LockChain

```go
func (lc *LightChain) LockChain() {
	lc.chainmu.RLock()
}
```

The `LockChain` function locks the chain mutex for reading so that multiple canonical hashes can be retrieved while it is guaranteed that they belong to the same version of the chain.

### Function: UnlockChain

```go
func (lc *LightChain) UnlockChain() {
	lc.chainmu.RUnlock()
}
```

The `UnlockChain` function unlocks the chain mutex.

### Function: SubscribeChainEvent

```go
func (lc *LightChain) SubscribeChainEvent(ch chan<- core.ChainEvent) event.Subscription {
	return lc.scope.Track(lc.chainFeed.Subscribe(ch))
}
```

The `SubscribeChainEvent` function registers a subscription of ChainEvent. It takes a channel as an argument and returns a subscription.

### Function: SubscribeChainHeadEvent

```go
func (lc *LightChain) SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription {
	return lc.scope.Track(lc.chainHeadFeed.Subscribe(ch))
}
```

The `SubscribeChainHeadEvent` function registers a subscription of ChainHeadEvent. It takes a channel as an argument and returns a subscription.

### Function: SubscribeChainSideEvent

```go
func (lc *LightChain) SubscribeChainSideEvent(ch chan<- core.ChainSideEvent) event.Subscription {
	return lc.scope.Track(lc.chainSideFeed.Subscribe(ch))
}
```

The `SubscribeChainSideEvent` function registers a subscription of ChainSideEvent. It takes a channel as an argument and returns a subscription.

### Function: SubscribeLogsEvent

```go
func (lc *LightChain) SubscribeLogsEvent(ch chan<- []*types.Log) event.Subscription {
	return lc.scope.Track(new(event.Feed).Subscribe(ch))
}
```

The `SubscribeLogsEvent` function implements the interface of filters.Backend. LightChain does not send logs events, so it returns an empty subscription.

### Function: SubscribeRemovedLogsEvent

```go
func (lc *LightChain) SubscribeRemovedLogsEvent(ch chan<- core.RemovedLogsEvent) event.Subscription {
	return lc.scope.Track(new(event.Feed).Subscribe(ch))
}
```

The `SubscribeRemovedLogsEvent` function implements the interface of filters.Backend. LightChain does not send core.RemovedLogsEvent, so it returns an empty subscription.

### Function: DisableCheckFreq

```go
func (lc *LightChain) DisableCheckFreq() {
	atomic.StoreInt32(&lc.disableCheckFreq, 1)
}
```

The `DisableCheckFreq` function disables header validation. This is used for ultralight mode.

### Function: EnableCheckFreq

```go
func (lc *LightChain) EnableCheckFreq() {
	atomic.StoreInt32(&lc.disableCheckFreq, 0)
}
```

The `EnableCheckFreq` function enables header validation.