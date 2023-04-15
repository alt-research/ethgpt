## Documentation for the Light Package

### Function: makeHeaderChain

```go
func makeHeaderChain(parent *types.Header, n int, db ethdb.Database, seed int) []*types.Header {
	blocks, _ := core.GenerateChain(params.TestChainConfig, types.NewBlockWithHeader(parent), ethash.NewFaker(), db, n, func(i int, b *core.BlockGen) {
		b.SetCoinbase(common.Address{0: byte(seed), 19: byte(i)})
	})
	headers := make([]*types.Header, len(blocks))
	for i, block := range blocks {
		headers[i] = block.Header()
	}
	return headers
}
```

The `makeHeaderChain` function creates a deterministic chain of headers rooted at a parent header. It takes a parent header, the number of headers to generate, a database, and a seed as arguments. It generates a chain of headers using the `GenerateChain` function from the `core` package and sets the coinbase of each block to a deterministic value based on the seed. It then returns an array of headers.

### Function: newCanonical

```go
func newCanonical(n int) (ethdb.Database, *LightChain, error) {
	db := rawdb.NewMemoryDatabase()
	gspec := core.Genesis{Config: params.TestChainConfig}
	genesis := gspec.MustCommit(db)
	blockchain, _ := NewLightChain(&dummyOdr{db: db, indexerConfig: TestClientIndexerConfig}, gspec.Config, ethash.NewFaker(), nil)

	// Create and inject the requested chain
	if n == 0 {
		return db, blockchain, nil
	}
	// Header-only chain requested
	headers := makeHeaderChain(genesis.Header(), n, db, canonicalSeed)
	_, err := blockchain.InsertHeaderChain(headers, 1)
	return db, blockchain, err
}
```

The `newCanonical` function creates a chain database and injects a deterministic canonical chain. It takes the number of headers to generate as an argument. It creates a new memory database, a genesis block, and a light chain using the `NewLightChain` function. If the number of headers is 0, it returns the database and the light chain. Otherwise, it generates a chain of headers using the `makeHeaderChain` function and inserts it into the light chain using the `InsertHeaderChain` method. It then returns the database, the light chain, and any error that occurred.

### Function: newTestLightChain

```go
func newTestLightChain() *LightChain {
	db := rawdb.NewMemoryDatabase()
	gspec := &core.Genesis{
		Difficulty: big.NewInt(1),
		Config:     params.TestChainConfig,
	}
	gspec.MustCommit(db)
	lc, err := NewLightChain(&dummyOdr{db: db}, gspec.Config, ethash.NewFullFaker(), nil)
	if err != nil {
		panic(err)
	}
	return lc
}
```

The `newTestLightChain` function creates a light chain that doesn't validate anything. It creates a new memory database, a genesis block with a difficulty of 1, and a light chain using the `NewLightChain` function. It then returns the light chain.

### Function: testFork

```go
func testFork(t *testing.T, LightChain *LightChain, i, n int, comparator func(td1, td2 *big.Int)) {
	// Copy old chain up to #i into a new db
	db, LightChain2, err := newCanonical(i)
	if err != nil {
		t.Fatal("could not make new canonical in testFork", err)
	}
	// Assert the chains have the same header/block at #i
	var hash1, hash2 common.Hash
	hash1 = LightChain.GetHeaderByNumber(uint64(i)).Hash()
	hash2 = LightChain2.GetHeaderByNumber(uint64(i)).Hash()
	if hash1 != hash2 {
		t.Errorf("chain content mismatch at %d: have hash %v, want hash %v", i, hash2, hash1)
	}
	// Extend the newly created chain
	headerChainB := makeHeaderChain(LightChain2.CurrentHeader(), n, db, forkSeed)
	if _, err := LightChain.InsertHeaderChain(headerChainB, 1); err != nil {
		t.Fatalf("failed to insert header chain: %v", err)
	}
	// Compare the two chains
	if err := CompareChains(LightChain, LightChain2, comparator); err != nil {
		t.Fatalf("chain comparison failed: %v", err)
	}
}
```

The `testFork` function tests a fork of length N starting from block i. It takes a testing object, a light chain, the starting block number, the length of the fork, and a comparator function as arguments. It creates a ## Documentation for LightChain2 Codebase

### Function: InsertHeaderChain

```go
LightChain2.InsertHeaderChain(headerChainB, 1); err != nil {
		t.Fatalf("failed to insert forking chain: %v", err)
	}
```

The `InsertHeaderChain` function is used to insert a chain of headers into the LightChain2 database. It takes a header chain and a skip value as arguments. It returns an error if the insertion fails.

### Function: testHeaderChainImport

```go
func testHeaderChainImport(chain []*types.Header, lightchain *LightChain) error {
	for _, header := range chain {
		// Try and validate the header
		if err := lightchain.engine.VerifyHeader(lightchain.hc, header, true); err != nil {
			return err
		}
		// Manually insert the header into the database, but don't reorganize (allows subsequent testing)
		lightchain.chainmu.Lock()
		rawdb.WriteTd(lightchain.chainDb, header.Hash(), header.Number.Uint64(),
			new(big.Int).Add(header.Difficulty, lightchain.GetTd(header.ParentHash, header.Number.Uint64()-1)))
		rawdb.WriteHeader(lightchain.chainDb, header)
		lightchain.chainmu.Unlock()
	}
	return nil
}
```

The `testHeaderChainImport` function is used to process a chain of headers and write them into the LightChain2 database if successful. It takes a header chain and a LightChain2 object as arguments. It returns an error if the validation or insertion fails.

### Function: TestExtendCanonicalHeaders

```go
func TestExtendCanonicalHeaders(t *testing.T) {
	length := 5

	// Make first chain starting from genesis
	_, processor, err := newCanonical(length)
	if err != nil {
		t.Fatalf("failed to make new canonical chain: %v", err)
	}
	// Define the difficulty comparator
	better := func(td1, td2 *big.Int) {
		if td2.Cmp(td1) <= 0 {
			t.Errorf("total difficulty mismatch: have %v, expected more than %v", td2, td1)
		}
	}
	// Start fork from current height
	testFork(t, processor, length, 1, better)
	testFork(t, processor, length, 2, better)
	testFork(t, processor, length, 5, better)
	testFork(t, processor, length, 10, better)
}
```

The `TestExtendCanonicalHeaders` function tests that given a starting canonical chain of a given size, it can be extended with various length chains. It creates a new canonical chain of a given length and defines a difficulty comparator. It then tests the creation of forks of different lengths from the current height of the chain.

### Function: TestShorterForkHeaders

```go
func TestShorterForkHeaders(t *testing.T) {
	length := 10

	// Make first chain starting from genesis
	_, processor, err := newCanonical(length)
	if err != nil {
		t.Fatalf("failed to make new canonical chain: %v", err)
	}
	// Define the difficulty comparator
	worse := func(td1, td2 *big.Int) {
		if td2.Cmp(td1) >= 0 {
			t.Errorf("total difficulty mismatch: have %v, expected less than %v", td2, td1)
		}
	}
	// Sum of numbers must be less than `length` for this to be a shorter fork
	testFork(t, processor, 0, 3, worse)
	testFork(t, processor, 0, 7, worse)
	testFork(t, processor, 1, 1, worse)
	testFork(t, processor, 1, 7, worse)
	testFork(t, processor, 5, 3, worse)
	testFork(t, processor, 5, 4, worse)
}
```

The `TestShorterForkHeaders` function tests that given a starting canonical chain of a given size, creating shorter forks do not take canonical ownership. It creates a new canonical chain of a given length and defines a difficulty comparator. It then tests the creation of forks of different lengths that have a sum of numbers less than the length of the chain.

### Function: TestLongerForkHeaders

```go
func TestLongerForkHeaders(t *testing.T) {
	length := 10

	// Make first chain starting from genesis ## Documentation for the LightChain Codebase

### Function: TestCanonicalHeaders

```go
func TestCanonicalHeaders(t *testing.T) {
	// Make chain starting from genesis
	_, processor, err := newCanonical(10)
	if err != nil {
		t.Fatalf("failed to make new canonical chain: %v", err)
	}
	// Define the difficulty comparator
	better := func(td1, td2 *big.Int) {
		if td2.Cmp(td1) < 0 {
			t.Errorf("total difficulty mismatch: have %v, want >= %v", td2, td1)
		}
	}
	// Test that all headers are accepted
	testFork(t, processor, 0, 10, better)
	// Test that forks with higher total difficulty are accepted
	testFork(t, processor, 1, 12, better)
	testFork(t, processor, 5, 6, better)
	testFork(t, processor, 5, 8, better)
}
```

The `TestCanonicalHeaders` function tests the `newCanonical` function by creating a chain starting from genesis and checking that all headers are accepted. It defines the difficulty comparator and tests that forks with higher total difficulty are accepted.

### Function: TestEqualForkHeaders

```go
func TestEqualForkHeaders(t *testing.T) {
	length := 10

	// Make first chain starting from genesis
	_, processor, err := newCanonical(length)
	if err != nil {
		t.Fatalf("failed to make new canonical chain: %v", err)
	}
	// Define the difficulty comparator
	equal := func(td1, td2 *big.Int) {
		if td2.Cmp(td1) != 0 {
			t.Errorf("total difficulty mismatch: have %v, want %v", td2, td1)
		}
	}
	// Sum of numbers must be equal to `length` for this to be an equal fork
	testFork(t, processor, 0, 10, equal)
	testFork(t, processor, 1, 9, equal)
	testFork(t, processor, 2, 8, equal)
	testFork(t, processor, 5, 5, equal)
	testFork(t, processor, 6, 4, equal)
	testFork(t, processor, 9, 1, equal)
}
```

The `TestEqualForkHeaders` function tests that given a starting canonical chain of a given size, creating equal forks do take canonical ownership. It defines the difficulty comparator and tests that the sum of numbers is equal to `length` for this to be an equal fork.

### Function: TestBrokenHeaderChain

```go
func TestBrokenHeaderChain(t *testing.T) {
	// Make chain starting from genesis
	db, LightChain, err := newCanonical(10)
	if err != nil {
		t.Fatalf("failed to make new canonical chain: %v", err)
	}
	// Create a forked chain, and try to insert with a missing link
	chain := makeHeaderChain(LightChain.CurrentHeader(), 5, db, forkSeed)[1:]
	if err := testHeaderChainImport(chain, LightChain); err == nil {
		t.Errorf("broken header chain not reported")
	}
}
```

The `TestBrokenHeaderChain` function tests that chains missing links do not get accepted by the processor. It creates a chain starting from genesis, creates a forked chain, and tries to insert it with a missing link. It then checks that the broken header chain is not reported.

### Function: makeHeaderChainWithDiff

```go
func makeHeaderChainWithDiff(genesis *types.Block, d []int, seed byte) []*types.Header {
	var chain []*types.Header
	for i, difficulty := range d {
		header := &types.Header{
			Coinbase:    common.Address{seed},
			Number:      big.NewInt(int64(i + 1)),
			Difficulty:  big.NewInt(int64(difficulty)),
			UncleHash:   types.EmptyUncleHash,
			TxHash:      types.EmptyTxsHash,
			ReceiptHash: types.EmptyReceiptsHash,
		}
		if i == 0 {
			header.Parent ## Documentation for the LightChain Codebase

### Function: makeHeaderChainWithDiff

```go
func makeHeaderChainWithDiff(parent *types.Header, difficulties []int, timestamp int64) []*types.Header {
	var headers []*types.Header
	for i, diff := range difficulties {
		header := &types.Header{
			ParentHash: parent.Hash(),
			UncleHash:  types.EmptyUncleHash,
			Coinbase:   common.Address{},
			Root:       types.EmptyRootHash,
			TxHash:     types.EmptyRootHash,
			ReceiptHash: types.EmptyRootHash,
			Bloom:      types.Bloom{},
			Difficulty: big.NewInt(int64(diff)),
			Number:     big.NewInt(int64(i) + 1),
			GasLimit:   1000000,
			GasUsed:    0,
			Time:       big.NewInt(timestamp),
			Extra:      []byte{},
			MixDigest:  types.EmptyRootHash,
			Nonce:      types.BlockNonce{},
		}
		headers = append(headers, header)
		parent = header
	}
	return headers
}
```

The `makeHeaderChainWithDiff` function creates a chain of headers with increasing difficulties. It takes a parent header, a slice of difficulties, and a timestamp as arguments. It creates a new header for each difficulty level with the parent hash set to the previous header's hash and the difficulty set to the current difficulty level.

### Function: TestInsertHeaderChain

```go
func TestInsertHeaderChain(t *testing.T) {
	bc := newTestLightChain()

	// Create a chain and import it
	headers := makeHeaderChainWithDiff(bc.genesisBlock, []int{1, 2, 4}, 10)
	if _, err := bc.InsertHeaderChain(headers, 1); err != nil {
		t.Fatalf("failed to import headers: %v", err)
	}

	// Check that the chain was imported correctly
	if bc.CurrentHeader().Number.Uint64() != uint64(len(headers)) {
		t.Errorf("header count mismatch: have %v, want %v", bc.CurrentHeader().Number.Uint64(), len(headers))
	}
	want := new(big.Int).Add(headers[0].Difficulty, headers[1].Difficulty, headers[2].Difficulty)
	if have := bc.CurrentHeader().Td; have.Cmp(want) != 0 {
		t.Errorf("total difficulty mismatch: have %v, want %v", have, want)
	}
}
```

The `TestInsertHeaderChain` function tests the insertion of a chain of headers into a light chain. It creates a chain of headers with increasing difficulties and imports it into the light chain. It then checks that the chain was imported correctly by comparing the header count and total difficulty to the expected values.

### Function: TestBadHeaderHashes

```go
func TestBadHeaderHashes(t *testing.T) {
	bc := newTestLightChain()

	// Create a chain, ban a hash and try to import
	var err error
	headers := makeHeaderChainWithDiff(bc.genesisBlock, []int{1, 2, 4}, 10)
	core.BadHashes[headers[2].Hash()] = true
	if _, err = bc.InsertHeaderChain(headers, 1); !errors.Is(err, core.ErrBannedHash) {
		t.Errorf("error mismatch: have: %v, want %v", err, core.ErrBannedHash)
	}
}
```

The `TestBadHeaderHashes` function tests that the insertion functions detect banned hashes. It creates a chain of headers with increasing difficulties, bans the hash of the third header, and tries to import the chain into the light chain. It then checks that the expected error is returned.

### Function: TestReorgBadHeaderHashes

```go
func TestReorgBadHeaderHashes(t *testing.T) {
	bc := newTestLightChain()

	// Create a chain, import and ban afterwards
	headers := makeHeaderChainWithDiff(bc.genesisBlock, []int{1, 2, 3, 4}, 10)

	if _, err := bc.InsertHeaderChain(headers, 1); err != nil {
		t.Fatalf("failed to import headers: %v", err)
	}
	if bc.CurrentHeader().Hash() != headers[3].Hash() {
		t.Errorf("last header hash mismatch: have: %x, want %x", bc.CurrentHeader().Hash(), headers[3].Hash())
	}
	core.BadHashes[headers[3].Hash()] = true
	defer func() { delete(core.BadHashes, headers[3].Hash()) }()

	// Create a new LightChain and check that it rolled back the state.
	ncm, err := NewLightChain(&dummyOdr{db: bc.chainDb}, params.TestChainConfig, ethash.NewFaker(), nil)
	if err != nil {
		t.Fatalf("failed to create new chain manager: %v", err)
	}
	if ncm.CurrentHeader().Hash() != headers[2].Hash() {
		t.Errorf("last header hash mismatch: have: %x, want %x", ncm.CurrentHeader().Hash(), headers[2].Hash())
	}
}
```

The `TestReorgBadHeaderHashes` function tests that bad hashes are detected on boot, and the chain is rolled back to a good state prior to the bad hash. It creates a chain of headers with increasing difficulties, imports it into the light chain, bans the hash of the last header, and creates a new light chain. It then checks that the new light chain has rolled back to the header before the bad hash.