## Documentation for the Ethereum Codebase

### Package: Filters

The `Filters` package provides functionality for filtering Ethereum blockchain data. It includes functions for creating and managing filters, as well as retrieving logs and other data from the blockchain.

### Function: makeReceipt

The `makeReceipt` function creates a new receipt with a log containing the specified address. It takes in a `common.Address` parameter and returns a `*types.Receipt`.

```go
func makeReceipt(addr common.Address) *types.Receipt {
	receipt := types.NewReceipt(nil, false, 0)
	receipt.Logs = []*types.Log{
		{Address: addr},
	}
	receipt.Bloom = types.CreateBloom(types.Receipts{receipt})
	return receipt
}
```

### Function: BenchmarkFilters

The `BenchmarkFilters` function is a benchmarking function that tests the performance of the filter system. It creates a new filter system, generates a chain of blocks with receipts and transactions, and then tests the filter system's ability to retrieve logs from the chain. It takes in a `*testing.B` parameter.

```go
func BenchmarkFilters(b *testing.B) {
	var (
		db, _   = rawdb.NewLevelDBDatabase(b.TempDir(), 0, 0, "", false)
		_, sys  = newTestFilterSystem(b, db, Config{})
		key1, _ = crypto.HexToECDSA("b71c71a67e1177ad4e901695e1b4b9ee17ae16c6668d313eac2f96dbcda3f291")
		addr1   = crypto.PubkeyToAddress(key1.PublicKey)
		addr2   = common.BytesToAddress([]byte("jeff"))
		addr3   = common.BytesToAddress([]byte("ethereum"))
		addr4   = common.BytesToAddress([]byte("random addresses please"))

		gspec = &core.Genesis{
			Alloc:   core.GenesisAlloc{addr1: {Balance: big.NewInt(1000000)}},
			BaseFee: big.NewInt(params.InitialBaseFee),
			Config:  params.TestChainConfig,
		}
	)
	defer db.Close()
	_, chain, receipts := core.GenerateChainWithGenesis(gspec, ethash.NewFaker(), 100010, func(i int, gen *core.BlockGen) {
		switch i {
		case 2403:
			receipt := makeReceipt(addr1)
			gen.AddUncheckedReceipt(receipt)
			gen.AddUncheckedTx(types.NewTransaction(999, common.HexToAddress("0x999"), big.NewInt(999), 999, gen.BaseFee(), nil))
		case 1034:
			receipt := makeReceipt(addr2)
			gen.AddUncheckedReceipt(receipt)
			gen.AddUncheckedTx(types.NewTransaction(999, common.HexToAddress("0x999"), big.NewInt(999), 999, gen.BaseFee(), nil))
		case 34:
			receipt := makeReceipt(addr3)
			gen.AddUncheckedReceipt(receipt)
			gen.AddUncheckedTx(types.NewTransaction(999, common.HexToAddress("0x999"), big.NewInt(999), 999, gen.BaseFee(), nil))
		case 99999:
			receipt := makeReceipt(addr4)
			gen.AddUncheckedReceipt(receipt)
			gen.AddUncheckedTx(types.NewTransaction(999, common.HexToAddress("0x999"), big.NewInt(999), 999, gen.BaseFee(), nil))
		}
	})
	// The test txs are not properly signed, can't simply create a chain
	// and then import blocks. TODO(rjl493456442 ## Documentation for the Ethereum Codebase

### Function: TestODR

The `TestODR` function is a testing function that tests the functionality of the ODR (Optimized Data Retrieval) instance. It retrieves blocks from the ODR instance and compares them to blocks retrieved from a full node. The function takes in the number of blocks to test and uses a test function to retrieve and compare each block.

```go
func TestODR(t *testing.T) {
	// create a new blockchain with 10 blocks
	gchain, err := GenerateChain(10)
	if err != nil {
		t.Fatalf("error generating chain: %v", err)
	}

	// create a new ODR instance
	odr := NewODR()

	// create a full node to compare against
	full := NewFullNode(gchain)

	// define a test function to retrieve blocks using ODR and compare to full node
	test := func(n int) {
		for i := 1; i <= n; i++ {
			// retrieve block from ODR
			bhash := gchain[i].Hash()
			b1, err := odr.RetrieveBlock(bhash)
			if err != nil {
				t.Errorf("error retrieving block %d: %v", i, err)
			}

			// retrieve block from full node
			b2, err := full.RetrieveBlock(bhash)
			if err != nil {
				t.Errorf("error retrieving block %d: %v", i, err)
			}

			// compare blocks
			exp := i == 1 || i%2 == 0
			err = odr.TestODR(b1, gchain[i].ParentHash(), gchain[i-1].Hash(), gchain[i].UncleHash(), gchain[i].Coinbase(), gchain[i].Difficulty(), gchain[i].Number(), gchain[i].GasLimit(), gchain[i].GasUsed(), gchain[i].Timestamp(), gchain[i].Extra(), gchain[i].MixDigest(), gchain[i].Nonce(), gchain[i].TxHash(), gchain[i].ReceiptHash(), gchain[i].Bloom(), gchain[i].Transactions(), gchain[i].Receipts(), gchain[i].State(), gchain[i].LogsBloom(), gchain[i].GasRefund(), gchain[i].GasReward(), gchain[i].GasRefundReceipts(), gchain[i].GasRewardReceipts(), gchain[i].GasUsedByTx(), gchain[i].GasUsedByBlock(), gchain[i].GasUsedByUncles(), gchain[i].GasUsedByUncle(), gchain[i].GasUsedByUncleBlock(), gchain[i].GasUsedByUncleBlockReceipts(), gchain[i].GasUsedByUncleBlockReward(), gchain[i].GasUsedByUncleBlockRefund(), gchain[i].GasUsedByUncleBlockRefundReceipts(), ## Documentation for the Ethereum Codebase

### Function: TestFilterLogs

The `TestFilterLogs` function is a testing function that tests the functionality of the `FilterLogs` method of the `Filter` struct. It creates a new `Filter` instance and applies various filters to it to retrieve logs from the blockchain. It then compares the retrieved logs to the expected logs to ensure that the filtering is working correctly.

```go
func TestFilterLogs(t *testing.T) {
	// create a new blockchain with 10 blocks
	gchain, err := GenerateChain(10)
	if err != nil {
		t.Fatalf("error generating chain: %v", err)
	}

	// create a new filter for the blockchain
	f := NewFilter(gchain)

	// define test cases for various filters
	tests := []struct {
		f    *sys.Filter
		want []common.Hash
	}{
		{
			sys.NewRangeFilter(0, 0, nil, nil), []common.Hash{gchain[1].Transactions()[0].Hash()},
		}, {
			sys.NewRangeFilter(1, 1, nil, nil), []common.Hash{gchain[2].Transactions()[0].Hash()},
		}, {
			sys.NewRangeFilter(0, 1, nil, nil), []common.Hash{gchain[1].Transactions()[0].Hash(), gchain[2].Transactions()[0].Hash()},
		}, {
			sys.NewRangeFilter(-3, -1, nil, nil), []common.Hash{gchain[7].Transactions()[0].Hash(), gchain[8].Transactions()[0].Hash()},
		}, {
			sys.NewRangeFilter(-3, -3, nil, nil), []common.Hash{gchain[7].Transactions()[0].Hash()},
		}, {
			sys.NewRangeFilter(-1, -3, nil, nil), nil,
		}, {
			sys.NewRangeFilter(-4, -1, nil, nil), nil,
		}, {
			sys.NewRangeFilter(-4, -4, nil, nil), nil,
		}, {
			sys.NewRangeFilter(-1, -4, nil, nil), nil,
		},
	}

	// apply each filter and compare retrieved logs to expected logs
	for i, tc := range tests {
		f.SetFilter(tc.f)
		logs, _ := f.Logs(context.Background())
		var haveHashes []common.Hash
		for _, l := range logs {
			haveHashes = append(haveHashes, l.Topics[0])
		}
		if have, want := len(haveHashes), len(tc.want); have != want {
			t.Fatalf("test %d, have %d logs, want %d", i, have, want)
		}
		if len(haveHashes) == 0 {
			continue
		}
		if !reflect.DeepEqual(tc.want, haveHashes) {
			t.Fatalf("test %d, have %v want %v", i, haveHashes, tc.want)
		}
	}
}
```