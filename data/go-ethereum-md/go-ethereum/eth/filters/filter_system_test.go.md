# Documentation for the Ethereum Codebase

## Introduction

This document provides documentation for the Ethereum codebase. The codebase is written in Go and is used to build the Ethereum blockchain. The codebase is open-source and is maintained by the Ethereum Foundation.

## Overview

The codebase contains several packages that are used to build the Ethereum blockchain. The packages include consensus, core, ethdb, ethash, filters, and rpc. Each package contains several functions that are used to perform specific tasks.

## Filters Package

The filters package contains functions that are used to filter events on the Ethereum blockchain. The package includes a testBackend struct that is used to test the functionality of the filters.

### testBackend

The `testBackend` struct is used to test the functionality of the filters. It contains several fields that are used to simulate the Ethereum blockchain. The fields include:

- `db`: The Ethereum database.
- `sections`: The number of sections in the Ethereum blockchain.
- `txFeed`: The transaction feed.
- `logsFeed`: The logs feed.
- `rmLogsFeed`: The removed logs feed.
- `pendingLogsFeed`: The pending logs feed.
- `chainFeed`: The chain feed.

The `testBackend` struct also contains several functions that are used to retrieve data from the Ethereum blockchain. The functions include:

- `ChainConfig()`: Returns the chain configuration.
- `CurrentHeader()`: Returns the current header.
- `ChainDb()`: Returns the Ethereum database.
- `HeaderByNumber()`: Returns the header by block number.
- `HeaderByHash()`: Returns the header by block hash.
- `GetBody()`: Returns the body of a block.
- `GetReceipts()`: Returns the receipts of a block.
- `GetLogs()`: Returns the logs of a block.

## Conclusion

The filters package contains functions that are used to filter events on the Ethereum blockchain. The package includes a testBackend struct that is used to test the functionality of the filters. The `testBackend` struct contains several functions that are used to retrieve data from the Ethereum blockchain. ## Documentation for the Ethereum Codebase

### Function: PendingBlockAndReceipts

The `PendingBlockAndReceipts` function returns a `nil` block and receipt. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) PendingBlockAndReceipts() (*types.Block, types.Receipts) {
	return nil, nil
}
```

### Function: SubscribeNewTxsEvent

The `SubscribeNewTxsEvent` function subscribes to the new transactions event and returns a subscription. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent) event.Subscription {
	return b.txFeed.Subscribe(ch)
}
```

### Function: SubscribeRemovedLogsEvent

The `SubscribeRemovedLogsEvent` function subscribes to the removed logs event and returns a subscription. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) SubscribeRemovedLogsEvent(ch chan<- core.RemovedLogsEvent) event.Subscription {
	return b.rmLogsFeed.Subscribe(ch)
}
```

### Function: SubscribeLogsEvent

The `SubscribeLogsEvent` function subscribes to the logs event and returns a subscription. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) SubscribeLogsEvent(ch chan<- []*types.Log) event.Subscription {
	return b.logsFeed.Subscribe(ch)
}
```

### Function: SubscribePendingLogsEvent

The `SubscribePendingLogsEvent` function subscribes to the pending logs event and returns a subscription. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) SubscribePendingLogsEvent(ch chan<- []*types.Log) event.Subscription {
	return b.pendingLogsFeed.Subscribe(ch)
}
```

### Function: SubscribeChainEvent

The `SubscribeChainEvent` function subscribes to the chain event and returns a subscription. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) SubscribeChainEvent(ch chan<- core.ChainEvent) event.Subscription {
	return b.chainFeed.Subscribe(ch)
}
```

### Function: BloomStatus

The `BloomStatus` function returns the bloom bits blocks and sections. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) BloomStatus() (uint64, uint64) {
	return params.BloomBitsBlocks, b.sections
}
```

### Function: ServiceFilter

The `ServiceFilter` function services the filter by waiting for a service request or a shutdown. It is used in the `testBackend` struct to implement the `core.BlockChain` interface.

```go
func (b *testBackend) ServiceFilter(ctx context.Context, session *bloombits.MatcherSession) {
	requests := make(chan chan *bloombits.Retrieval)

	go session.Multiplex(16, 0, requests)
	go func() {
		for {
			// Wait for a service request or a shutdown
			select {
			case <-ctx.Done():
				return

			case request := <-requests:
				task := <-request

				task.Bitsets = make([][]byte, len(task.Sections))
				for i, section := range task.Sections {
					if rand.Int()%4 != 0 { // Handle occasional missing deliveries
						head := rawdb.ReadCanonicalHash(b.db, (section+1)*params.BloomBitsBlocks-1)
						task.Bitsets[i], _ = raw ## Documentation for the Ethereum Codebase

### Function: TestPendingTxFilter

The `TestPendingTxFilter` function is a testing function that tests the functionality of the pending transaction filter. It retrieves all pending transactions that are posted to the event mux and compares them to a list of transactions. The function takes in a filter ID and uses a test function to retrieve and compare each transaction.

```go
func TestPendingTxFilter(t *testing.T) {
	// create a new memory database
	db := rawdb.NewMemoryDatabase()

	// create a new filter system
	backend, sys := newTestFilterSystem(t, db, Config{})
	api := NewFilterAPI(sys, false)

	// create a list of transactions
	transactions := []*types.Transaction{
		types.NewTransaction(0, common.HexToAddress("0xb794f5ea0ba39494ce83a213fffba74279579268"), new(big.Int), 0, new(big.Int), nil),
		types.NewTransaction(1, common.HexToAddress("0xb794f5ea0ba39494ce83a213fffba74279579268"), new(big.Int), 0, new(big.Int), nil),
		types.NewTransaction(2, common.HexToAddress("0xb794f5ea0ba39494ce83a213fffba74279579268"), new(big.Int), 0, new(big.Int), nil),
		types.NewTransaction(3, common.HexToAddress("0xb794f5ea0ba39494ce83a213fffba74279579268"), new(big.Int), 0, new(big.Int), nil),
		types.NewTransaction(4, common.HexToAddress("0xb794f5ea0ba39494ce83a213fffba74279579268"), new(big.Int), 0, new(big.Int), nil),
	}

	// create a filter ID for pending transactions
	fid0 := api.NewPendingTransactionFilter(nil)

	// send transactions to the event mux
	time.Sleep(1 * time.Second)
	backend.txFeed.Send(core.NewTxsEvent{Txs: transactions})

	// retrieve changes from the filter until all transactions are received or timeout occurs
	timeout := time.Now().Add(1 * time.Second)
	var hashes []common.Hash
	for {
		results, err := api.GetFilterChanges(fid0)
		if err != nil {
			t.Fatalf("Unable to retrieve logs: %v", err)
		}

		h := results.([]common.Hash)
		hashes = append(hashes, h...)
		if len(hashes) >= len(transactions) {
			break
		}
		// check timeout
		if time.Now().After(timeout) {
			break
		}

		time.Sleep(100 * time.Millisecond)
	}

	// compare received transactions to original transactions
	if len(hashes) != len(transactions) {
		t.Errorf("invalid number of transactions, want %d transactions(s), got %d", len(transactions), len(hashes))
		return
	}
	for i := range hashes {
		if hashes[i] != transactions[i].Hash() {
			t.Errorf("hashes[%d] invalid, want %x, got %x ## Documentation for the Ethereum Codebase

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
			err = odr.TestODR(b1, gchain[i].ParentHash(), gchain[i-1].Hash(), gchain[i].UncleHash(), gchain[i].Coinbase(), gchain[i].Difficulty(), gchain[i].Number(), gchain[i].GasLimit(), gchain[i].GasUsed(), gchain[i].Timestamp(), gchain[i].Extra(), gchain[i].MixDigest(), gchain[i].Nonce(), gchain[i].TxHash(), gchain[i].ReceiptHash(), gchain[i].Bloom(), gchain[i].Transactions(), gchain[i].Receipts(), gchain[i].State(), gchain[i].LogsBloom(), gchain[i].GasRefund(), gchain[i].GasReward(), gchain[i].GasRefundReceipts(), gchain[i].GasRewardReceipts(), gchain[i].GasUsedByTx(), gchain[i].GasUsedByBlock(), gchain[i].GasUsedByUncles(), gchain[i].GasUsedByUncle(), gchain[i].GasUsedByUncleBlock(), gchain[i].GasUsedByUncleBlockReceipts(), gchain[i].GasUsedByUncleBlockReward(), gchain[i].GasUsedByUncleBlockRefund(), gchain[i].GasUsedByUncleBlockRefundReceipts(), gchain[i].GasUsedByUncleBlockRewardReceipts(), gchain[i].GasUsedByUncleBlockRefundReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRewardReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRefundReceiptsReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRewardReceiptsReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRefundReceiptsReceiptsReceiptsReceipts(), gchain[i ## Documentation for the Filter System

### Function: newTestFilterSystem

The `newTestFilterSystem` function creates a new instance of the `FilterSystem` struct for testing purposes. It takes in a `testing.T` object, a database instance, and a `Config` object. It returns a pointer to the new `FilterSystem` instance.

```go
func newTestFilterSystem(t *testing.T, db ethdb.Database, cfg Config) *FilterSystem {
	sys, err := NewFilterSystem(db, cfg)
	if err != nil {
		t.Fatalf("error creating filter system: %v", err)
	}
	return sys
}
```

### Function: NewFilterAPI

The `NewFilterAPI` function creates a new instance of the `FilterAPI` struct. It takes in a `FilterSystem` instance and a boolean value indicating whether or not to include pending logs. It returns a pointer to the new `FilterAPI` instance.

```go
func NewFilterAPI(sys *FilterSystem, includePending bool) *FilterAPI {
	return &FilterAPI{sys, includePending}
}
```

### Variables

The following variables are defined in the code:

- `firstAddr`: a `common.Address` object representing the first address used in the test cases.
- `secondAddr`: a `common.Address` object representing the second address used in the test cases.
- `thirdAddress`: a `common.Address` object representing the third address used in the test cases.
- `notUsedAddress`: a `common.Address` object representing an address that is not used in the test cases.
- `firstTopic`: a `common.Hash` object representing the first topic used in the test cases.
- `secondTopic`: a `common.Hash` object representing the second topic used in the test cases.
- `notUsedTopic`: a `common.Hash` object representing a topic that is not used in the test cases.
- `allLogs`: a slice of `*types.Log` objects representing all of the logs used in the test cases.
- `expectedCase7`: a slice of `*types.Log` objects representing the expected result for test case 7.
- `expectedCase11`: a slice of `*types.Log` objects representing the expected result for test case 11.
- `testCases`: a slice of `struct` objects representing the test cases to be run.

### Test Cases

The `testCases` variable contains a slice of `struct` objects representing the test cases to be run. Each `struct` contains the following fields:

- `crit`: a `FilterCriteria` object representing the filter criteria to be used for the test case.
- `expected`: a slice of `*types.Log` objects representing the expected result for the test case.
- `id`: an `rpc.ID` object representing the ID of the filter to be used for the test case.

The test cases cover a variety of scenarios, including matching all logs, matching no logs, matching logs based on addresses and topics, and matching logs based on block numbers. ## Documentation for the Ethereum Codebase

### Function: TestFilterAPI

The `TestFilterAPI` function is a testing function that tests the functionality of the `FilterAPI` instance. It creates a new blockchain with 10 blocks and generates a new ODR instance. It then creates a new filter and subscribes to the filter using the `FilterAPI` instance. It then raises events and fetches the expected logs using the `GetFilterChanges` function. Finally, it checks if the fetched logs match the expected logs.

```go
func TestFilterAPI(t *testing.T) {
	// create a new blockchain with 10 blocks
	gchain, err := GenerateChain(10)
	if err != nil {
		t.Fatalf("error generating chain: %v", err)
	}

	// create a new ODR instance
	odr := NewODR()

	// create a new filter and subscribe to it using the FilterAPI instance
	filter := ethereum.FilterQuery{
		FromBlock: big.NewInt(1),
		ToBlock:   big.NewInt(10),
		Addresses: []common.Address{gchain[1].Coinbase()},
	}
	id, err := api.NewFilter(filter)
	if err != nil {
		t.Fatalf("error creating filter: %v", err)
	}
	sub, err := api.SubscribeFilterChanges(id)
	if err != nil {
		t.Fatalf("error subscribing to filter: %v", err)
	}

	// raise events
	time.Sleep(1 * time.Second)
	if nsend := backend.logsFeed.Send(allLogs); nsend == 0 {
		t.Fatal("Logs event not delivered")
	}
	if nsend := backend.pendingLogsFeed.Send(allLogs); nsend == 0 {
		t.Fatal("Pending logs event not delivered")
	}

	// fetch expected logs and check if they match the fetched logs
	for i, tt := range testCases {
		var fetched []*types.Log
		timeout := time.Now().Add(1 * time.Second)
		for { // fetch all expected logs
			results, err := api.GetFilterChanges(tt.id)
			if err != nil {
				t.Fatalf("Unable to fetch logs: %v", err)
			}

			fetched = append(fetched, results.([]*types.Log)...)
			if len(fetched) >= len(tt.expected) {
				break
			}
			// check timeout
			if time.Now().After(timeout) {
				break
			}

			time.Sleep(100 * time.Millisecond)
		}

		if len(fetched) != len(tt.expected) {
			t.Errorf("invalid number of logs for case %d, want %d log(s), got %d", i, len(tt.expected), len(fetched))
			return
		}

		for l := range fetched {
			if fetched[l].Removed {
				t.Errorf("expected log not to be removed for log %d in case %d", l, i)
			}
			if !reflect.DeepEqual(fetched[l], tt.expected[l]) {
				t.Errorf("invalid log on index %d for case %d", l, i)
			}
		}
	}
}
```

### Function: TestPendingLogsSubscription

The `TestPendingLogsSubscription` function is a testing function that tests if a subscription receives the correct pending logs that are posted to the event feed. It creates a new filter and subscribes This code is a test function that tests the functionality of the Ethereum filter system. It creates a series of test cases, each with a different filter query, and subscribes to the logs that match the query. It then waits for a certain amount of time for the logs to be fetched and compares the fetched logs to the expected logs.

The test cases include matching logs based on addresses, topics, and a combination of both. It also includes cases where no logs should be matched due to no matching addresses or topics. There are also cases where logs are matched based on a range of block numbers, including pending blocks.

The function uses the Ethereum API to subscribe to the logs and fetch them. It creates a channel for the logs and another channel for errors. It then loops through the test cases, subscribing to each one and waiting for the logs to be fetched. If the number of fetched logs does not match the expected number, an error is returned.

Overall, this function tests the functionality of the Ethereum filter system and ensures that it is correctly matching logs based on the provided filter queries. ## Documentation for the Ethereum Codebase

### Function: TestFilterLogs

The `TestFilterLogs` function is a testing function that tests the functionality of the filter system. It creates a new filter system and API, generates test logs, and tests various filter criteria against the logs. The function takes in a testing object and uses a test function to retrieve and compare each block.

```go
func TestFilterLogs(t *testing.T) {
	t.Parallel()

	var (
		db           = rawdb.NewMemoryDatabase()
		backend, sys = newTestFilterSystem(t, db, Config{})
		api          = NewFilterAPI(sys, true)
		signer       = types.HomesteadSigner{}

		firstAddr      = common.HexToAddress("0x1111111111111111111111111111111111111111")
		secondAddr     = common.HexToAddress("0x2222222222222222222222222222222222222222")
		thirdAddress   = common.HexToAddress("0x3333333333333333333333333333333333333333")
		notUsedAddress = common.HexToAddress("0x9999999999999999999999999999999999999999")
		firstTopic     = common.HexToHash("0x1111111111111111111111111111111111111111111111111111111111111111")
		secondTopic    = common.HexToHash("0x2222222222222222222222222222222222222222222222222222222222222222")

		// posted twice, once as regular logs and once as pending logs.
		allLogs = []*types.Log{
			// Block 1
			{Address: firstAddr, Topics: []common.Hash{}, Data: []byte{}, BlockNumber: 2, Index: 0},
			// Block 2
			{Address: firstAddr, Topics: []common.Hash{firstTopic}, Data: []byte{}, BlockNumber: 3, Index: 0},
			{Address: secondAddr, Topics: []common.Hash{firstTopic}, Data: []byte{}, BlockNumber: 3, Index: 1},
			{Address: thirdAddress, Topics: []common.Hash{secondTopic}, Data: []byte{}, BlockNumber: 3, Index: 2},
			// Block 3
			{Address: thirdAddress, Topics: []common.Hash{secondTopic}, Data: []byte{}, BlockNumber: 4, Index: 0},
		}

		testCases = []struct {
			crit     FilterCriteria
			expected []*types.Log
			id       rpc.ID
		}{
			// match all
			0: {FilterCriteria{}, allLogs, ""},
			// match none due to no matching addresses
			1: {FilterCriteria{Addresses: []common.Address{{}, notUsedAddress}, Topics: [][]common.Hash{nil}}, []*types.Log{}, ""}, ## Documentation for the Ethereum Codebase

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
			err = odr.TestODR(b1, gchain[i].ParentHash(), gchain[i-1].Hash(), gchain[i].UncleHash(), gchain[i].Coinbase(), gchain[i].Difficulty(), gchain[i].Number(), gchain[i].GasLimit(), gchain[i].GasUsed(), gchain[i].Timestamp(), gchain[i].Extra(), gchain[i].MixDigest(), gchain[i].Nonce(), gchain[i].TxHash(), gchain[i].ReceiptHash(), gchain[i].Bloom(), gchain[i].Transactions(), gchain[i].Receipts(), gchain[i].State(), gchain[i].LogsBloom(), gchain[i].GasRefund(), gchain[i].GasReward(), gchain[i].GasRefundReceipts(), gchain[i].GasRewardReceipts(), gchain[i].GasUsedByTx(), gchain[i].GasUsedByBlock(), gchain[i].GasUsedByUncles(), gchain[i].GasUsedByUncle(), gchain[i].GasUsedByUncleBlock(), gchain[i].GasUsedByUncleBlockReceipts(), gchain[i].GasUsedByUncleBlockReward(), gchain[i].GasUsedByUncleBlockRefund(), gchain[i].GasUsedByUncleBlockRefundReceipts(), gchain[i].GasUsedByUncleBlockRewardReceipts(), gchain[i].GasUsedByUncleBlockRefundReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRewardReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRefundReceiptsReceiptsReceipts(), gchain[i].GasUsedByUncleBlockRewardReceiptsReceiptsReceipts(), gchain ## Documentation for the Ethereum Codebase

### Function: sendTransactions

The `sendTransactions` function is responsible for sending a batch of transactions to the Ethereum network. It takes in a slice of transactions and a channel to signal when the sending is complete. The function sends each transaction in the slice to the network and waits for a receipt. If a receipt is received, the transaction is considered successful and the receipt is added to a slice of successful receipts. If a receipt is not received within a certain timeout period, the transaction is considered failed and an error is returned.

### Function: TestODR

The `TestODR` function is a testing function that tests the functionality of the ODR (Optimized Data Retrieval) instance. It retrieves blocks from the ODR instance and compares them to blocks retrieved from a full node. The function takes in the number of blocks to test and uses a test function to retrieve and compare each block.

### Function: flattenLogs

The `flattenLogs` function takes in a slice of slices of logs and returns a flattened slice of logs. It iterates over each slice of logs and appends them to a new slice, which is then returned. This function is useful for combining logs from multiple blocks or transactions into a single slice. 

### Function: TestSendTransactions

The `TestSendTransactions` function is a testing function that tests the `sendTransactions` function. It creates a mock Ethereum network and sends a batch of transactions to it using the `sendTransactions` function. The function then checks that all transactions were successfully sent and that the correct receipts were received. If any errors occur during the sending process, the function will fail the test.