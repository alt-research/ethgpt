## Documentation for the Light Package

### Type: testTxRelay

```go
type testTxRelay struct {
	send, discard, mined chan int
}
```

The `testTxRelay` type is a struct that represents a test transaction relay. It has three channels for sending, discarding, and mining transactions.

### Function: Send

```go
func (r *testTxRelay) Send(txs types.Transactions) {
	r.send <- len(txs)
}
```

The `Send` function is a method of the `testTxRelay` type that sends a transaction to the `send` channel.

### Function: NewHead

```go
func (r *testTxRelay) NewHead(head common.Hash, mined []common.Hash, rollback []common.Hash) {
	m := len(mined)
	if m != 0 {
		r.mined <- m
	}
}
```

The `NewHead` function is a method of the `testTxRelay` type that sends the number of mined transactions to the `mined` channel.

### Function: Discard

```go
func (r *testTxRelay) Discard(hashes []common.Hash) {
	r.discard <- len(hashes)
}
```

The `Discard` function is a method of the `testTxRelay` type that sends the number of discarded transactions to the `discard` channel.

### Function: txPoolTestChainGen

```go
func txPoolTestChainGen(i int, block *core.BlockGen) {
	s := minedTx(i)
	e := minedTx(i + 1)
	for i := s; i < e; i++ {
		block.AddTx(testTx[i])
	}
}
```

The `txPoolTestChainGen` function generates a test chain by adding transactions to a block.

### Function: TestTxPool

```go
func TestTxPool(t *testing.T) {
	for i := range testTx {
		testTx[i], _ = types.SignTx(types.NewTransaction(uint64(i), acc1Addr, big.NewInt(10000), params.TxGas, big.NewInt(params.InitialBaseFee), nil), types.HomesteadSigner{}, testBankKey)
	}

	var (
		sdb   = rawdb.NewMemoryDatabase()
		ldb   = rawdb.NewMemoryDatabase()
		gspec = &core.Genesis{
			Config:  params.TestChainConfig,
			Alloc:   core.GenesisAlloc{testBankAddress: {Balance: testBankFunds}},
			BaseFee: big.NewInt(params.InitialBaseFee),
		}
	)
	// Assemble the test environment
	blockchain, _ := core.NewBlockChain(sdb, nil, gspec, nil, ethash.NewFullFaker(), vm.Config{}, nil, nil)
	_, gchain, _ := core.GenerateChainWithGenesis(gspec, ethash.NewFaker(), poolTestBlocks, txPoolTestChainGen)
	if _, err := blockchain.InsertChain(gchain); err != nil {
		panic(err)
	}

	gspec.MustCommit(ldb)
	odr := &testOdr{sdb: sdb, ldb: ldb, serverState: blockchain.StateCache(), indexerConfig: TestClientIndexerConfig}
	relay := &testTxRelay{
		send:    make(chan int, 1),
		discard: make(chan int, 1),
		mined:   make(chan int, 1),
	}
	lightchain, _ := NewLightChain(odr, params.TestChainConfig, ethash.NewFullFaker(), nil)
	txPermanent = 50
	pool := NewTxPool(params.TestChainConfig, lightchain, relay)
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	for ii, block := range gchain {
		i := ii + 1
		s := sentTx(i - 1)
		e := sentTx(i)
		for i := s; i < e; i++ {
			pool.Add(ctx, testTx[i])
			got := <-relay.send
			exp := 1
			if got != exp {
				t.Errorf("relay.Send expected len = %d, got %d", exp, got)
			}
		}
		pool.Process(ctx, block.Header(), block.Transactions(), []*types.Receipt{})
		got := <-relay.mined ## Documentation for the Lightchain Codebase

### Function: TestRelay

```go
func TestRelay(t *testing.T) {
	lightchain := NewLightchain()
	relay := NewRelay(lightchain, txPermanent)

	for i := 1; i <= int(txPermanent)+10; i++ {
		tx := NewTx(i)
		if err := relay.AddTx(tx); err != nil {
			t.Fatal(err)
		}

		if i <= int(txPermanent) {
			if len(relay.pending) != i {
				t.Errorf("relay.AddTx expected len(pending) = %d, got %d", i, len(relay.pending))
			}
		} else {
			if len(relay.pending) != int(txPermanent) {
				t.Errorf("relay.AddTx expected len(pending) = %d, got %d", txPermanent, len(relay.pending))
			}
		}

		if i == int(txPermanent)+1 {
			if _, err := lightchain.InsertHeaderChain([]*types.Header{block.Header()}, 1); err != nil {
				panic(err)
			}
		}

		if i > int(txPermanent) {
			if len(relay.pending) != int(txPermanent) {
				t.Errorf("relay.AddTx expected len(pending) = %d, got %d", txPermanent, len(relay.pending))
			}
		}

		if i == int(txPermanent)+10 {
			if _, err := lightchain.InsertHeaderChain([]*types.Header{block.Header()}, 1); err != nil {
				panic(err)
			}
		}

		if len(relay.pending) != 0 {
			t.Errorf("relay.NewHead expected len(pending) = 0, got %d", len(relay.pending))
		}

		if i > 1 {
			exp := minedTx(i) - minedTx(i-1)
			got := relay.MinedTx()
			if got != exp {
				t.Errorf("relay.MinedTx expected %d, got %d", exp, got)
			}
		}

		if i > int(txPermanent)+1 {
			exp := minedTx(i-int(txPermanent)-1) - minedTx(i-int(txPermanent)-2)
			if exp != 0 {
				got := relay.Discard()
				if got != exp {
					t.Errorf("relay.Discard expected len = %d, got %d", exp, got)
				}
			}
		}
	}
}
```

The `TestRelay` function is a test function that tests the `Relay` struct. It creates a new `Lightchain` and a new `Relay` with a given number of permanent transactions. It then adds transactions to the relay and tests various properties of the relay as the number of transactions increases.

### Variable: txPermanent

```go
const txPermanent = 5
```

The `txPermanent` variable is a constant that represents the number of permanent transactions in the `Relay`.

### Function: NewTx

```go
func NewTx(i int) *types.Transaction {
	return types.NewTransaction(nonce.Uint64(), common.Address{}, big.NewInt(int64(i)), 21000, big.NewInt(1), nil)
}
```

The `NewTx` function creates a new transaction with a given nonce and value. It takes an integer as an argument and returns a new transaction with a nonce generated from a global nonce generator, a zero address as the recipient, the integer as the value, a gas limit of 21000, a gas price of 1 wei, and no data.

### Function: minedTx

```go
func minedTx(i int) int {
	return (i - 1) * 21000
}
```

The `minedTx` function calculates the number of transactions that have been mined up to a given index. It takes an integer as an argument and returns the number of transactions that have been mined up to that index.

### Type: Relay

```go
type Relay struct {
	lightchain *Lightchain
	pending    []*types.Transaction
	mined      chan int
	discard    chan int
}
```

The `Relay` type is a struct that represents a transaction relay. It has a `Lightchain` field, a `pending` field that is a slice of transactions, a `mined` channel that receives the number of transactions that have been mined, and a `discard` channel that receives the number of transactions that have been discarded.

### Function: NewRelay

```go
func NewRelay(lightchain *Lightchain, txPermanent int) *Relay {
	return &Relay{
		lightchain: lightchain,
		pending:    make([]*types.Transaction, 0, txPermanent),
		mined:      make(chan int),
		discard:    make(chan int),
	}
}
```

The `NewRelay` function creates a new `Relay` with a given `Lightchain` and number of permanent transactions. It takes a `Lightchain` and an integer as arguments and returns a new `Relay` with the `Lightchain`, an empty `pending` slice with a capacity of `txPermanent`, and two channels for mined and discarded transactions.

### Function: AddTx

```go
func (relay *Relay) AddTx(tx *types.Transaction) error {
	if len(relay.pending) >= cap(relay.pending) {
		relay.discard <- len(relay.pending) - cap(relay.pending) + 1
		relay.pending = relay.pending[len(relay.pending)-cap(relay.pending)+1:]
	}
	relay.pending = append(relay.pending, tx)
	return nil
}
```

The `AddTx` function adds a transaction to the `Relay`. It takes a transaction as an argument and adds it to the `pending` slice. If the `pending` slice is full, it discards the oldest transaction and sends the number of discarded transactions to the `discard` channel.

### Function: MinedTx

```go
func (relay *Relay) MinedTx() int {
	mined := len(relay.pending)
	relay.mined <- mined
	relay.pending = relay.pending[:0]
	return mined
}
```

The `MinedTx` function returns the number of transactions that have been mined since the last call to `MinedTx`. It sends the number of mined transactions to the `mined` channel and clears the `pending` slice.

### Function: Discard

```go
func (relay *Relay) Discard() int {
	discarded := <-relay.discard
	relay.pending = relay.pending[discarded:]
	return discarded
}
```

The `Discard` function returns the number of transactions that have been discarded since the last call to `Discard`. It receives the number of discarded transactions from the `discard` channel and removes them from the `pending` slice.