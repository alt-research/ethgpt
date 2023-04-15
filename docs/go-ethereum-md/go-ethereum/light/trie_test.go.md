## Documentation for the Light Codebase

### Function: TestNodeIterator

```go
func TestNodeIterator(t *testing.T) {
	var (
		fulldb  = rawdb.NewMemoryDatabase()
		lightdb = rawdb.NewMemoryDatabase()
		gspec   = &core.Genesis{
			Config:  params.TestChainConfig,
			Alloc:   core.GenesisAlloc{testBankAddress: {Balance: testBankFunds}},
			BaseFee: big.NewInt(params.InitialBaseFee),
		}
	)
	blockchain, _ := core.NewBlockChain(fulldb, nil, gspec, nil, ethash.NewFullFaker(), vm.Config{}, nil, nil)
	_, gchain, _ := core.GenerateChainWithGenesis(gspec, ethash.NewFaker(), 4, testChainGen)
	if _, err := blockchain.InsertChain(gchain); err != nil {
		panic(err)
	}

	gspec.MustCommit(lightdb)
	ctx := context.Background()
	odr := &testOdr{sdb: fulldb, ldb: lightdb, serverState: blockchain.StateCache(), indexerConfig: TestClientIndexerConfig}
	head := blockchain.CurrentHeader()
	lightTrie, _ := NewStateDatabase(ctx, head, odr).OpenTrie(head.Root)
	fullTrie, _ := blockchain.StateCache().OpenTrie(head.Root)
	if err := diffTries(fullTrie, lightTrie); err != nil {
		t.Fatal(err)
	}
}
```

The `TestNodeIterator` function is a test function that tests the `diffTries` function. It creates two tries, a full trie and a light trie, and compares them using the `diffTries` function. It uses a memory database for both the full and light tries, generates a blockchain with a genesis block, and inserts the generated chain into the blockchain. It then creates a new state database and opens the tries for the current header. It finally calls the `diffTries` function to compare the two tries.

### Function: diffTries

```go
func diffTries(t1, t2 state.Trie) error {
	i1 := trie.NewIterator(t1.NodeIterator(nil))
	i2 := trie.NewIterator(t2.NodeIterator(nil))
	for i1.Next() && i2.Next() {
		if !bytes.Equal(i1.Key, i2.Key) {
			spew.Dump(i2)
			return fmt.Errorf("tries have different keys %x, %x", i1.Key, i2.Key)
		}
		if !bytes.Equal(i1.Value, i2.Value) {
			return fmt.Errorf("tries differ at key %x", i1.Key)
		}
	}
	switch {
	case i1.Err != nil:
		return fmt.Errorf("full trie iterator error: %v", i1.Err)
	case i2.Err != nil:
		return fmt.Errorf("light trie iterator error: %v", i2.Err)
	case i1.Next():
		return fmt.Errorf("full trie iterator has more k/v pairs")
	case i2.Next():
		return fmt.Errorf("light trie iterator has more k/v pairs")
	}
	return nil
}
```

The `diffTries` function compares two tries and returns an error if they are different. It takes two tries as arguments and returns an error if the tries have different keys or values. It uses the `NodeIterator` method of the tries to iterate over their nodes and compare them. If the iterators have different keys or values, it returns an error. If one of the iterators has more key/value pairs than the other, it returns an error.