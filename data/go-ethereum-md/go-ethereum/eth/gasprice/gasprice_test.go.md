## Documentation for Ethereum Gas Price Package

This package provides functionality for calculating the gas price for Ethereum transactions.

### Type: testBackend

The `testBackend` type is a struct that implements the `ethash.Backend` interface. It is used for testing purposes and provides methods for retrieving headers and blocks by number, as well as receipts and chain configuration. It also has a method for retrieving the pending block and receipts, if available.

```go
type testBackend struct {
	chain   *core.BlockChain
	pending bool // pending block available
}
```

### Function: (testBackend) HeaderByNumber

The `HeaderByNumber` method of the `testBackend` type retrieves the header for a given block number. It returns `nil` if the block number is greater than the test head or if the block number is not found. It also handles special block numbers such as `rpc.EarliestBlockNumber`, `rpc.FinalizedBlockNumber`, `rpc.SafeBlockNumber`, and `rpc.PendingBlockNumber`.

```go
func (b *testBackend) HeaderByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Header, error) {
	// ...
}
```

### Function: (testBackend) BlockByNumber

The `BlockByNumber` method of the `testBackend` type retrieves the block for a given block number. It returns `nil` if the block number is greater than the test head or if the block number is not found. It also handles special block numbers such as `rpc.EarliestBlockNumber`, `rpc.FinalizedBlockNumber`, `rpc.SafeBlockNumber`, and `rpc.PendingBlockNumber`.

```go
func (b *testBackend) BlockByNumber(ctx context.Context, number rpc.BlockNumber) (*types.Block, error) {
	// ...
}
```

### Function: (testBackend) GetReceipts

The `GetReceipts` method of the `testBackend` type retrieves the receipts for a given block hash. It returns an empty slice if the block hash is not found.

```go
func (b *testBackend) GetReceipts(ctx context.Context, hash common.Hash) (types.Receipts, error) {
	// ...
}
```

### Function: (testBackend) PendingBlockAndReceipts

The `PendingBlockAndReceipts` method of the `testBackend` type retrieves the pending block and receipts, if available. It returns `nil` for both if there is no pending block.

```go
func (b *testBackend) PendingBlockAndReceipts() (*types.Block, types.Receipts) {
	// ...
}
```

### Function: (testBackend) ChainConfig

The `ChainConfig` method of the `testBackend` type retrieves the chain configuration.

```go
func (b *testBackend) ChainConfig() *params.ChainConfig {
	// ...
}
```

### Function: (testBackend) SubscribeChainHeadEvent

The `SubscribeChainHeadEvent` method of the `testBackend` type subscribes to the chain head event and returns an event subscription.

```go
func (b *testBackend) SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription {
	// ...
}
```

### Function: (testBackend) teardown

The `teardown` method of the `testBackend` type stops the blockchain instance and should be called after use to prevent memory leaks.

```go
func (b *testBackend) teardown() {
	// ...
}
```

### Function: newTestBackend

The `newTestBackend` function creates a new `testBackend` instance for testing purposes. It takes a `*testing.T` instance, a `*big.Int` representing the London block, and a boolean indicating whether a pending block is available. It returns a pointer to the `testBackend` instance.

```go
func newTestBackend(t *testing.T, londonBlock *big.Int, pending bool) *testBackend {
	// ...
}
``` ## Documentation for Ethereum Codebase

### Function: newTestBackend

The `newTestBackend` function takes in a testing object, a London fork number, and a boolean value indicating whether to include pending transactions. It generates a testing blockchain with the specified number of blocks and a specified percentile value for gas prices. It then constructs a testing chain and inserts the generated blocks. Finally, it sets the finalized and safe headers for the chain and returns a `testBackend` object containing the chain and any pending transactions.

```go
func newTestBackend(t *testing.T, londonBlock *big.Int, pending bool) *testBackend {
	var (
		key, _ = crypto.GenerateKey()
		addr   = crypto.PubkeyToAddress(key.PublicKey)
		config = *params.TestChainConfig // needs copy because it is modified below
		gspec  = &core.Genesis{
			Config: &config,
			Alloc:  core.GenesisAlloc{addr: {Balance: big.NewInt(math.MaxInt64)}},
		}
		signer = types.LatestSigner(gspec.Config)
	)
	config.LondonBlock = londonBlock
	config.ArrowGlacierBlock = londonBlock
	config.GrayGlacierBlock = londonBlock
	config.TerminalTotalDifficulty = common.Big0
	engine := ethash.NewFaker()

	// Generate testing blocks
	_, blocks, _ := core.GenerateChainWithGenesis(gspec, engine, testHead+1, func(i int, b *core.BlockGen) {
		b.SetCoinbase(common.Address{1})

		var txdata types.TxData
		if londonBlock != nil && b.Number().Cmp(londonBlock) >= 0 {
			txdata = &types.DynamicFeeTx{
				ChainID:   gspec.Config.ChainID,
				Nonce:     b.TxNonce(addr),
				To:        &common.Address{},
				Gas:       30000,
				GasFeeCap: big.NewInt(100 * params.GWei),
				GasTipCap: big.NewInt(int64(i+1) * params.GWei),
				Data:      []byte{},
			}
		} else {
			txdata = &types.LegacyTx{
				Nonce:    b.TxNonce(addr),
				To:       &common.Address{},
				Gas:      21000,
				GasPrice: big.NewInt(int64(i+1) * params.GWei),
				Value:    big.NewInt(100),
				Data:     []byte{},
			}
		}
		b.AddTx(types.MustSignNewTx(key, signer, txdata))
	})
	// Construct testing chain
	chain, err := core.NewBlockChain(rawdb.NewMemoryDatabase(), &core.CacheConfig{TrieCleanNoPrefetch: true}, gspec, nil, engine, vm.Config{}, nil, nil)
	if err != nil {
		t.Fatalf("Failed to create local chain, %v", err)
	}
	chain.InsertChain(blocks)
	chain.SetFinalized(chain.GetBlockByNumber(25).Header())
	chain.SetSafe(chain.GetBlockByNumber(25).Header())
	return &testBackend{chain: chain, pending: pending}
}
```

### Function: CurrentHeader

The `CurrentHeader` function returns the current header of the testing chain.

```go
func (b *testBackend) CurrentHeader() *types.Header {
	return b.chain.CurrentHeader()
}
```

### Function: GetBlockByNumber

The `GetBlockByNumber` function takes in a block number and returns the block with that number from the testing chain.

```go
func (b *testBackend) GetBlockByNumber(number uint64) *types.Block {
	return b.chain.GetBlockByNumber(number)
}
```

### Function: TestSuggestTipCap

The `TestSuggestTipCap` function tests the `SuggestTipCap` function of the `Oracle` struct. It takes in a testing object and a `Config` struct containing the number of blocks to sample, the percentile value for gas prices, and a default gas price. It then generates a testing blockchain with a specified London fork number and constructs an `Oracle` object with the generated chain and the `Config` struct. It samples gas prices for a number of blocks and checks if the suggested gas price matches the expected value for each case.

```go
func TestSuggestTipCap(t *testing.T) {
	config := Config{
		Blocks:     3,
		Percentile: 60,
		Default:    big.NewInt(params.GWei),
	}
	var cases = []struct {
		fork   *big.Int // London fork number
		expect *big.Int // Expected gasprice suggestion
	}{
		{nil, big.NewInt(params.GWei * int64(30))},
		{big.NewInt(0), big.NewInt(params.GWei * int64(30))},  // Fork point in genesis
		{big.NewInt(1), big.NewInt(params.GWei * int64(30))},  // Fork point in first block
		{big.NewInt(32), big.NewInt(params.GWei * int64(30))}, // Fork point in last block
		{big.NewInt(33), big.NewInt(params.GWei * int64(30))}, // Fork point in the future
	}
	for _, c := range cases {
		backend := newTestBackend(t, c.fork, false)
		oracle := NewOracle(backend, config)

		// The gas price sampled is: 32G, 31G, 30G, 29G, 28G, 27G
		got, err := oracle.SuggestTipCap(context.Background())
		backend.teardown()
		if err != nil {
			t.Fatalf("Failed to retrieve recommended gas price: %v", err)
		}
		if got.Cmp(c.expect) != 0 {
			t.Fatalf("Gas price mismatch, want %d, got %d", c.expect, got)
		}
	}
}
```