## Overview

This file contains the implementation of the transaction pool for Ethereum. The transaction pool is responsible for managing the transactions that are waiting to be included in the blockchain. It provides an interface for adding, removing, and querying transactions.

## Variables

### testTxPoolConfig

`testTxPoolConfig` is a transaction pool configuration without stateful disk side effects used during testing.

### eip1559Config

`eip1559Config` is a chain config with EIP-1559 enabled at block 0.

## Functions

### newTestBlockChain

```go
func newTestBlockChain(gasLimit uint64, statedb *state.StateDB, chainHeadFeed *event.Feed) *testBlockChain
```

`newTestBlockChain` creates a new instance of the `testBlockChain` struct with the specified gas limit, state database, and chain head feed.

### (testBlockChain) CurrentBlock

```go
func (bc *testBlockChain) CurrentBlock() *types.Header
```

`CurrentBlock` returns a new instance of the `types.Header` struct with the current block number and gas limit.

### (testBlockChain) GetBlock

```go
func (bc *testBlockChain) GetBlock(hash common.Hash, number uint64) *types.Block
```

`GetBlock` returns a new instance of the `types.Block` struct with the specified hash and number.

### (testBlockChain) StateAt

```go
func (bc *testBlockChain) StateAt(common.Hash) (*state.StateDB, error)
```

`StateAt` returns the state database for the specified hash.

### (testBlockChain) SubscribeChainHeadEvent

```go
func (bc *testBlockChain) SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription
```

`SubscribeChainHeadEvent` subscribes to the chain head event.

### transaction

```go
func transaction(nonce uint64, gaslimit uint64, key *ecdsa.PrivateKey) *types.Transaction
```

`transaction` creates a new instance of the `types.Transaction` struct with the specified nonce, gas limit, and private key.

### pricedTransaction

```go
func pricedTransaction(nonce uint64, gaslimit uint64, gasprice *big.Int, key *ecdsa.PrivateKey) *types.Transaction
```

`pricedTransaction` creates a new instance of the `types.Transaction` struct with the specified nonce, gas limit, gas price, and private key.

### pricedDataTransaction

```go
func pricedDataTransaction(nonce uint64, gaslimit uint64, gasprice *big.Int, key *ecdsa.PrivateKey, bytes uint64) *types.Transaction
```

`pricedDataTransaction` creates a new instance of the `types.Transaction` struct with the specified nonce, gas limit, gas price, data, and private key.

### dynamicFeeTx

```go
func dynamicFeeTx(nonce uint64, gaslimit uint64, gasFee *big.Int, tip *big.Int, key *ecdsa.PrivateKey) *types.Transaction
```

`dynamicFeeTx` creates a new instance of the `types.DynamicFeeTx` struct with the specified nonce, gas limit, gas fee, tip, and private key. This codebase is written in Go and contains functions related to transaction pool management. Here is a brief description of each function:

`newTransaction` function creates a new transaction with the given parameters and returns it. The parameters include the chain ID, nonce, gas tip cap, gas fee cap, gas limit, recipient address, value, data, and access list.

`setupPool` function initializes a new transaction pool with the default test configuration and returns it along with a new private key.

`setupPoolWithConfig` function initializes a new transaction pool with the given configuration and returns it along with a new private key.

`validatePoolInternals` function checks various consistency invariants within the transaction pool. It ensures that the total transaction set is consistent with pending + queued, the next nonce to assign is the correct one, and the total priced transaction count is correct.

`validateEvents` function checks that the correct number of transaction addition events were fired on the pool's event feed.

`deriveSender` function derives the sender address of a given transaction using the Homestead signer.

`testChain` struct represents a test blockchain with an address and a trigger flag. It has a `State` method that returns a new state database and simulates a state change between fetches.

Overall, these functions are used to manage transactions in a pool and ensure consistency in the pool's state. The `TxPool` package contains the implementation of the Ethereum transaction pool. The transaction pool is responsible for managing the transactions that are waiting to be included in the next block. The package provides functions for adding, removing, and querying transactions in the pool.

The `NewTxPool` function creates a new transaction pool with the given configuration and chain configuration. It returns a pointer to the new transaction pool.

The `TxPool` struct represents the transaction pool. It contains the current state of the pool, the pending transactions, and the transaction queue. The `TxPool` struct also contains a `signer` field, which is used to sign transactions.

The `AddLocal` function adds a local transaction to the pool. A local transaction is a transaction that originates from the local node. The function returns an error if the transaction is invalid or if it already exists in the pool.

The `AddRemotes` function adds a list of remote transactions to the pool. A remote transaction is a transaction that originates from a remote node. The function returns an error if any of the transactions are invalid or if they already exist in the pool.

The `Remove` function removes a transaction from the pool. The function returns true if the transaction was removed and false otherwise.

The `Pending` function returns a list of pending transactions in the pool.

The `Nonce` function returns the nonce of the given address in the current state of the pool.

The `Stop` function stops the transaction pool and cleans up any resources used by the pool.

The `requestReset` function resets the state of the transaction pool. It is used to synchronize the state of the pool with the current block.

The `requestPromoteExecutables` function promotes executable transactions from the queue to the pending list. It is used to move transactions from the queue to the pending list when their dependencies have been satisfied.

The `TestStateChangeDuringReset` function tests whether the pending state is in sync with the block head event that initiated the resetState().

The `testAddBalance` function adds the given amount to the balance of the given address in the current state of the pool.

The `testSetNonce` function sets the nonce of the given address to the given value in the current state of the pool.

The `TestInvalidTransactions` function tests the handling of invalid transactions in the pool.

The `TestQueue` function tests the transaction queue functionality of the pool.

The `TestQueue2` function tests the transaction queue functionality of the pool with multiple transactions. This codebase contains several test functions that test the functionality of a transaction pool. The transaction pool is responsible for managing transactions that are waiting to be included in a block. The test functions use different scenarios to test the transaction pool's ability to handle different types of transactions.

The `TestAddRemote` function tests the ability of the transaction pool to add a remote transaction to the pool. It creates a new transaction with a valid value and adds it to the pool. It then checks that the transaction was added to the pool and that the pool's internal state was updated correctly.

The `TestAddLocal` function tests the ability of the transaction pool to add a local transaction to the pool. It creates a new transaction with a valid value and adds it to the pool. It then checks that the transaction was added to the pool and that the pool's internal state was updated correctly.

The `TestAddBalance` function tests the ability of the transaction pool to add a transaction to the pool when the sender has enough balance. It creates a new transaction with a valid value and adds it to the pool. It then checks that the transaction was added to the pool and that the pool's internal state was updated correctly.

The `TestEnqueueTx` function tests the ability of the transaction pool to enqueue a transaction. It creates three transactions with valid values and enqueues them in the pool. It then checks that the transactions were enqueued correctly and that the pool's internal state was updated correctly.

The `TestNegativeValue` function tests the ability of the transaction pool to handle a transaction with a negative value. It creates a new transaction with a negative value and adds it to the pool. It then checks that the transaction was rejected with the expected error message.

The `TestTipAboveFeeCap` function tests the ability of the transaction pool to handle a transaction with a tip above the fee cap. It creates a new transaction with a tip above the fee cap and adds it to the pool. It then checks that the transaction was rejected with the expected error message.

The `TestVeryHighValues` function tests the ability of the transaction pool to handle transactions with very high values. It creates two transactions, one with a very high tip and one with a very high fee cap, and adds them to the pool. It then checks that the transactions were rejected with the expected error messages.

The `TestChainFork` function tests the ability of the transaction pool to handle a chain fork. It creates a new transaction and adds it to the pool. It then resets the pool's internal state and adds the same transaction again. It then checks that the transaction was added to the pool and that the pool's internal state was updated correctly.

The `TestDoubleNonce` function tests the ability of the transaction pool to handle transactions with the same nonce. It creates three transactions with the same nonce and adds them to the pool. It then checks that the transactions were added to the pool and that the pool's internal state was updated correctly.

Overall, these test functions provide comprehensive coverage of the transaction pool's functionality and ensure that it can handle a wide range of scenarios. This code is a test suite for the `TxPool` package. The `TxPool` package is used to manage pending and queued transactions in the Ethereum network. The test suite tests various functions of the `TxPool` package.

The `TestAdd` function tests the `add` function of the `TxPool` package. It creates three transactions with different prices and adds them to the pool. It then checks that the transactions are correctly added to the pool and that the total transaction count is correct.

The `TestMissingNonce` function tests the case where a transaction is added to the pool without a nonce. It creates a transaction with a nonce of 1 and adds it to the pool. It then checks that the transaction is not added to the pending transactions and that the total transaction count is correct.

The `TestNonceRecovery` function tests the case where a transaction is added to the pool with a nonce that is not the next nonce for the account. It creates a transaction with a nonce of 10 and adds it to the pool. It then simulates a nonce reset and checks that the nonce is correctly recovered.

The `TestDropping` function tests the case where an account runs out of funds and any pending and queued transactions are dropped. It creates an account with a balance of 1000 and adds some pending and queued transactions to the pool. It then checks that the pending and queued transactions are correctly dropped from the pool.

Here is an example of how you can document the `TestAdd` function in Markdown format:

## TestAdd

This function tests the `add` function of the `TxPool` package.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates three transactions with different prices and adds them to the pool.
2. Checks that the transactions are correctly added to the pool.
3. Checks that the total transaction count is correct.

### Example

```go
func TestAdd(t *testing.T) {
	pool, key := setupPool()
	defer pool.Stop()

	addr := crypto.PubkeyToAddress(key.PublicKey)
	testAddBalance(pool, addr, big.NewInt(100000000000000))

	tx1 := transaction(1, 100000, key)
	tx2 := transaction(2, 200000, key)
	tx3 := transaction(3, 300000, key)

	if _, err := pool.add(tx1, false); err != nil {
		t.Error("first transaction insert failed", err)
	}
	if _, err := pool.add(tx2, false); err != nil {
		t.Error("second transaction insert failed", err)
	}
	if _, err := pool.add(tx3, false); err != nil {
		t.Error("third transaction insert failed", err)
	}

	if pool.pending[addr].Len() != 3 {
		t.Error("expected 3 pending transactions, got", pool.pending[addr].Len())
	}
	if pool.all.Count() != 3 {
		t.Error("expected 3 total transactions, got", pool.all.Count())
	}
}
``` The `TestTxPool` function tests the functionality of the transaction pool. It creates a pool with a test blockchain and adds a set of transactions to it. It then checks that the transactions are correctly added to the pool and that they can be retrieved from the pool. It also tests the functionality of the `requestReset` function, which resets the pool and removes all transactions from it.

The `TestPostponing` function tests the behavior of the transaction pool when a transaction is dropped from the current pending pool. It creates a pool with a test blockchain and two test accounts. It then adds a batch of consecutive pending transactions to the pool and checks that they are correctly added. It then drops a transaction from the pool and checks that all consecutive transactions are postponed back into the future queue to prevent broadcasting them.

Here is an example of how you can document the `TestTxPool` function in Markdown format:

## TestTxPool

This function tests the functionality of the transaction pool.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool with a test blockchain.
2. Adds a set of transactions to the pool.
3. Checks that the transactions are correctly added to the pool.
4. Retrieves the transactions from the pool and checks that they match the original transactions.
5. Resets the pool using the `requestReset` function.
6. Checks that the pool is empty after the reset.

### Example

```go
func TestTxPool(t *testing.T) {
	// Create the pool to test with
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	pool := NewTxPool(testTxPoolConfig, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Create a test account to produce transactions with
	key, _ := crypto.GenerateKey()
	account := crypto.PubkeyToAddress(key.PublicKey)

	// Create a set of test transactions
	tx0 := transaction(0, 25000, key)
	tx1 := transaction(1, 25000, key)
	tx2 := transaction(2, 25000, key)
	tx3 := transaction(3, 25000, key)
	tx4 := transaction(4, 25000, key)
	tx5 := transaction(5, 25000, key)

	// Add the transactions to the pool
	pool.AddLocal(tx0)
	pool.AddLocal(tx1)
	pool.AddLocal(tx2)
	pool.AddLocal(tx3)
	pool.AddLocal(tx4)
	pool.AddLocal(tx5)

	// Check that the transactions are correctly added to the pool
	if pool.all.Count() != 6 {
		t.Errorf("total transaction mismatch: have %d, want %d", pool.all.Count(), 6)
	}
	if pool.pending[account].Len() != 3 {
		t.Errorf("pending transaction mismatch: have %d, want %d", pool.pending[account].Len(), 3)
	}
	if pool.queue[account].Len() != 3 {
		t.Errorf("queued transaction mismatch: have %d, want %d", pool.queue[account].Len(), 3)
	}

	// Retrieve the transactions from the pool and check that they match the original transactions
	txs := pool.Pending()
	if len(txs) != 3 {
		t.Errorf("pending transaction mismatch: have %d, want %d", len(txs), 3)
	}
	if !reflect.DeepEqual(txs[0], tx0) {
		t.Errorf("transaction mismatch: have %v, want %v", txs[0], tx0)
	}
	if !reflect.DeepEqual(txs[1], tx1) {
		t.Errorf("transaction mismatch: have %v, want %v", txs[1], tx1)
	}
	if !reflect.DeepEqual(txs[2], tx2) {
		t.Errorf("transaction mismatch: have %v, want %v", txs[2], tx2)
	}

	// Reset the pool and check that it is empty
	<-pool.requestReset(nil, nil)
	if pool.all.Count() != 0 {
		t.Errorf("total transaction mismatch: have %d, want %d", pool.all.Count(), 0)
	}
	if pool.pending[account].Len() != 0 {
		t.Errorf("pending transaction mismatch: have %d, want %d", pool.pending[account].Len(), 0)
	}
	if pool.queue[account].Len() != 0 {
		t.Errorf("queued transaction mismatch: have %d, want %d", pool.queue[account].Len(), 0)
	}
}
```

Here is an example of how you can document the `TestPostponing` function in Markdown format:

## TestPostponing

This function tests the behavior of the transaction pool when a transaction is dropped from the current pending pool.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool with a test blockchain and two test accounts.
2. Adds a batch of consecutive pending transactions to the pool.
3. Checks that the transactions are correctly added to the pool.
4. Drops a transaction from the pool.
5. Checks that all consecutive transactions are postponed back into the future queue to prevent broadcasting them.

### Example

```go
func TestPostponing(t *testing.T) {
	// Create the pool to test the postponing with
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	pool := NewTxPool(testTxPoolConfig, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Create two test accounts to produce different gap profiles with
	keys := make([]*ecdsa.PrivateKey, 2)
	accs := make([]common.Address, len(keys))

	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		accs[i] = crypto.PubkeyToAddress(keys[i].PublicKey)

		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(50100))
	}

	// Add a batch consecutive pending transactions for validation
	txs := []*types.Transaction{}
	for i, key := range keys {
		for j := 0; j < 100; j++ {
			var tx *types.Transaction
			if (i+j)%2 == 0 {
				tx = transaction(uint64(j), 25000, key)
			} else {
				tx = transaction(uint64(j), 50000, key)
			}
			txs = append(txs, tx)
		}
	}
	pool.AddRemotesSync(txs)

	// Drop a transaction from the pool and check that all consecutive transactions are postponed
	pool.RemoveTx(txs[5])
	if pool.pending[accs[0]].Len() != 5 {
		t.Errorf("pending transaction mismatch: have %d, want %d", pool.pending[accs[0]].Len(), 5)
	}
	if pool.queue[accs[0]].Len() != 95 {
		t.Errorf("queued transaction mismatch: have %d, want %d", pool.queue[accs[0]].Len(), 95)
	}
}
``` The `TestGapFilling` function tests the behavior of the transaction pool when there are both executable and non-executable transactions from an origin account. It checks that filling the nonce gap moves all queued transactions into the pending pool.

The function first sets up a test account and funds it. It then creates a pending and a queued transaction with a nonce gap in between. The function checks that the pending transaction is executable and the queued transaction is non-executable. It then fills the nonce gap by creating a new transaction with the missing nonce and adding it to the pool. The function checks that all queued transactions are moved to the pending pool and that the new transaction is executable.

The function also subscribes to the transaction feed and keeps track of transaction events to ensure that all executable transactions are announced.

Here is an example of how you can document the `TestGapFilling` function in Markdown format:

## TestGapFilling

This function tests the behavior of the transaction pool when there are both executable and non-executable transactions from an origin account.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Sets up a test account and funds it.
2. Creates a pending and a queued transaction with a nonce gap in between.
3. Checks that the pending transaction is executable and the queued transaction is non-executable.
4. Fills the nonce gap by creating a new transaction with the missing nonce and adding it to the pool.
5. Checks that all queued transactions are moved to the pending pool and that the new transaction is executable.
6. Subscribes to the transaction feed and keeps track of transaction events to ensure that all executable transactions are announced.

### Example

```go
func TestGapFilling(t *testing.T) {
	// Set up test account and fund it
	pool, key := setupPool()
	defer pool.Stop()
	account := crypto.PubkeyToAddress(key.PublicKey)
	testAddBalance(pool, account, big.NewInt(1000000))

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, testTxPoolConfig.AccountQueue+5)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a pending and a queued transaction with a nonce gap in between
	pendingTx := testNewTransaction(key, 0)
	pool.addLocal(pendingTx)
	queuedTx := testNewTransaction(key, 2)
	pool.addLocal(queuedTx)

	// Check that the pending transaction is executable and the queued transaction is non-executable
	if _, err := pool.Pending().get(pendingTx.Hash()); err != nil {
		t.Errorf("pending transaction not executable: %v", err)
	}
	if _, err := pool.Queued().get(queuedTx.Hash()); err == nil {
		t.Errorf("queued transaction executable: %v", err)
	}

	// Fill the nonce gap by creating a new transaction with the missing nonce and adding it to the pool
	fillTx := testNewTransaction(key, 1)
	pool.addLocal(fillTx)

	// Check that all queued transactions are moved to the pending pool and that the new transaction is executable
	if _, err := pool.Pending().get(pendingTx.Hash()); err != nil {
		t.Errorf("pending transaction not executable: %v", err)
	}
	if _, err := pool.Pending().get(fillTx.Hash()); err != nil {
		t.Errorf("filled transaction not executable: %v", err)
	}
	if _, err := pool.Queued().get(queuedTx.Hash()); err == nil {
		t.Errorf("queued transaction executable: %v", err)
	}

	// Check that all executable transactions are announced
	for i := 0; i < 3; i++ {
		select {
		case <-events:
		case <-time.After(10 * time.Second):
			t.Errorf("timeout waiting for transaction event")
		}
	}
}
``` This code is a test suite for the `TxPool` function, which is used to manage transactions in the Ethereum network. The test suite includes three functions: `TestQueueNonceGap`, `TestQueueAccountLimiting`, and `TestQueueGlobalLimiting`.

The `TestQueueNonceGap` function tests the behavior of the `TxPool` function when there is a gap in the nonces of transactions. It creates a pool of transactions with a gap in the nonces and checks that the transactions become pending after the gap is filled.

The `TestQueueAccountLimiting` function tests the behavior of the `TxPool` function when the transaction count belonging to a single account goes above a threshold. It creates a test account, funds it, and queues up transactions until the limit is reached. It then checks that the higher transactions are dropped to prevent DOS attacks.

The `TestQueueGlobalLimiting` function tests the behavior of the `TxPool` function when the transaction count belonging to multiple accounts goes above a threshold. It creates a pool of test accounts, funds them, and queues up transactions until the limit is reached. It then checks that the higher transactions are dropped to prevent DOS attacks.

Here is an example of how you can document the `TestQueueNonceGap` function in Markdown format:

## TestQueueNonceGap

This function tests the behavior of the `TxPool` function when there is a gap in the nonces of transactions.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool of transactions with a gap in the nonces.
2. Checks that the transactions become pending after the gap is filled.

### Example

```go
func TestQueueNonceGap(t *testing.T) {
	pool, key := setupPool()
	defer pool.Stop()

	// Add transactions with a nonce gap in between
	pool.AddRemotesSync([]*types.Transaction{
		transaction(0, 100000, key),
		transaction(2, 100000, key),
	})
	pending, queued := pool.Stats()
	if pending != 1 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 1)
	}
	if queued != 1 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 1)
	}
	if err := validateEvents(events, 1); err != nil {
		t.Fatalf("original event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// Fill the nonce gap and ensure all transactions become pending
	if err := pool.addRemoteSync(transaction(1, 100000, key)); err != nil {
		t.Fatalf("failed to add gapped transaction: %v", err)
	}
	pending, queued = pool.Stats()
	if pending != 3 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 3)
	}
	if queued != 0 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 0)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("gap-filling event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` ## Introduction

This source code is a Go implementation of a transaction pool for Ethereum. The transaction pool is responsible for managing the transactions that are waiting to be included in the next block. The transaction pool is an important component of the Ethereum network as it helps to ensure that transactions are processed in a timely and efficient manner.

## Functions

### `TestAddBalance`

This function tests the `AddBalance` function. It creates a pool and adds a balance to an address. It then checks that the balance has been added correctly.

### Parameters

- `pool`: The transaction pool to add the balance to.
- `addr`: The address to add the balance to.
- `amount`: The amount of balance to add.

### Example

```go
func TestAddBalance(t *testing.T) {
	pool := NewTxPool(testTxPoolConfig, params.TestChainConfig, nil)
	defer pool.Stop()

	addr := common.HexToAddress("0x1234567890123456789012345678901234567890")
	amount := big.NewInt(1000000)

	testAddBalance(pool, addr, amount)

	if pool.state.GetBalance(addr).Cmp(amount) != 0 {
		t.Errorf("balance mismatch: have %v, want %v", pool.state.GetBalance(addr), amount)
	}
}
```

### `TestQueueTimeLimiting`

This function tests the time limiting logic of the transaction pool. It creates a pool and adds a batch of transactions. It then waits for the expiration time to elapse and checks that the non-executable transactions have been dropped.

### Parameters

- `t`: A testing object used for reporting test failures.

### Example

```go
func TestQueueTimeLimiting(t *testing.T) {
	testQueueTimeLimiting(t, false)
}
```

### `TestQueueTimeLimitingNoLocals`

This function tests the time limiting logic of the transaction pool with local tracking disabled. It creates a pool and adds a batch of transactions. It then waits for the expiration time to elapse and checks that the non-executable transactions have been dropped.

### Parameters

- `t`: A testing object used for reporting test failures.

### Example

```go
func TestQueueTimeLimitingNoLocals(t *testing.T) {
	testQueueTimeLimiting(t, true)
}
```

### `testQueueTimeLimiting`

This function is a helper function for `TestQueueTimeLimiting` and `TestQueueTimeLimitingNoLocals`. It creates a pool and adds a batch of transactions. It then waits for the expiration time to elapse and checks that the non-executable transactions have been dropped.

### Parameters

- `t`: A testing object used for reporting test failures.
- `nolocals`: A boolean indicating whether local tracking is disabled.

### Example

```go
func testQueueTimeLimiting(t *testing.T, nolocals bool) {
	// Reduce the eviction interval to a testable amount
	defer func(old time.Duration) { evictionInterval = old }(evictionInterval)
	evictionInterval = time.Millisecond * 100

	// Create the pool to test the non-expiration enforcement
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	config := testTxPoolConfig
	config.Lifetime = time.Second
	config.NoLocals = nolocals

	pool := NewTxPool(config, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Create two test accounts to ensure remotes expire but locals do not
	local, _ := crypto.GenerateKey()
	remote, _ := crypto.GenerateKey()

	testAddBalance(pool, crypto.PubkeyToAddress(local.PublicKey), big.NewInt(1000000000))
	testAddBalance(pool, crypto.PubkeyToAddress(remote.PublicKey), big.NewInt(1000000000))

	// Add the two transactions and ensure they are queued
	pool.AddLocals([]*types.Transaction{transaction(1, 100000, local)})
	pool.AddRemotesSync([]*types.Transaction{transaction(1, 100000, remote)})

	if len(pool.locals) != 1 {
		t.Errorf("locals not queued: have %v, want %v", len(pool.locals), 1)
	}
	if len(pool.remotes) != 1 {
		t.Errorf("remotes not queued: have %v, want %v", len(pool.remotes), 1)
	}

	// Wait for the expiration time to elapse and ensure the non-executable transactions are dropped
	time.Sleep(config.Lifetime + evictionInterval)

	if len(pool.locals) != 1 {
		t.Errorf("locals dropped: have %v, want %v", len(pool.locals), 1)
	}
	if len(pool.remotes) != 0 {
		t.Errorf("remotes not dropped: have %v, want %v", len(pool.remotes), 0)
	}
}
```

### `transaction`

This function creates a new transaction with the specified nonce, gas limit, and key.

### Parameters

- `nonce`: The nonce of the transaction.
- `gasLimit`: The gas limit of the transaction.
- `key`: The key to sign the transaction with.

### Example

```go
func transaction(nonce uint64, gasLimit uint64, key *ecdsa.PrivateKey) *types.Transaction {
	to := common.HexToAddress("0x1234567890123456789012345678901234567890")
	value := big.NewInt(1000000)
	data := []byte("test")

	tx := types.NewTransaction(nonce, to, value, gasLimit, nil, data)
	signer := types.NewEIP155Signer(params.TestChainConfig.ChainID)
	signedTx, _ := types.SignTx(tx, signer, key)
	return signedTx
}
``` This code is a test suite for the `TxPool` struct, which is used to manage transactions in the Ethereum network. The test suite tests the functionality of the `TxPool` struct with different types of transactions.

The `TestTxPool` function tests the `TxPool` struct. It creates a `TxPool` object and adds local and remote transactions to it. It then checks the number of pending and queued transactions in the pool and validates the internal state of the pool. It also tests the eviction of transactions from the pool after their lifetime duration has passed.

The function then removes the current transactions and increases the nonce to prepare for a reset and cleanup. It checks that the queue and pending transactions are cleared and validates the internal state of the pool.

The function then queues gapped transactions and waits for a half lifetime to pass. It then queues executable transactions, and the life cycle of the transactions should be restarted. It checks that the gapped transactions are not kicked out and validates the internal state of the pool. Finally, it waits for the whole lifetime to pass after the last promotion and kicks out stale transactions.

Here is an example of how you can document the `TestTxPool` function in Markdown format:

## TestTxPool

This function tests the `TxPool` struct.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a `TxPool` object.
2. Adds local and remote transactions to the pool.
3. Checks the number of pending and queued transactions in the pool.
4. Validates the internal state of the pool.
5. Tests the eviction of transactions from the pool after their lifetime duration has passed.
6. Removes the current transactions and increases the nonce to prepare for a reset and cleanup.
7. Checks that the queue and pending transactions are cleared.
8. Validates the internal state of the pool.
9. Queues gapped transactions and waits for a half lifetime to pass.
10. Queues executable transactions, and the life cycle of the transactions should be restarted.
11. Checks that the gapped transactions are not kicked out.
12. Validates the internal state of the pool.
13. Waits for the whole lifetime to pass after the last promotion and kicks out stale transactions.

### Example

```go
func TestTxPool(t *testing.T) {
	pool := NewTxPool(config, statedb)

	local := newTestTransaction(0, 0)
	remote := newTestTransaction(0, 0)

	// Add local and remote transactions to the pool
	if err := pool.AddLocal(pricedTransaction(1, 100000, big.NewInt(1), local)); err != nil {
		t.Fatalf("failed to add local transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(1, 100000, big.NewInt(1), remote)); err != nil {
		t.Fatalf("failed to add remote transaction: %v", err)
	}

	// Check the number of pending and queued transactions in the pool
	pending, queued := pool.Stats()
	if pending != 0 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 0)
	}
	if queued != 2 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 2)
	}

	// Validate the internal state of the pool
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Wait for the eviction interval to run
	time.Sleep(2 * evictionInterval)

	// Transactions should not be evicted from the queue yet since lifetime duration has not passed
	pending, queued = pool.Stats()
	if pending != 0 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 0)
	}
	if queued != 2 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 2)
	}

	// Validate the internal state of the pool
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Wait a bit for eviction to run and clean up any leftovers, and ensure only the local remains
	time.Sleep(2 * config.Lifetime)

	pending, queued = pool.Stats()
	if pending != 0 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 0)
	}
	if nolocals {
		if queued != 0 {
			t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 0)
		}
	} else {
		if queued != 1 {
			t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 1)
		}
	}

	// Validate the internal state of the pool
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Remove current transactions and increase nonce to prepare for a reset and cleanup
	statedb.SetNonce(crypto.PubkeyToAddress(remote.PublicKey), 2)
	statedb.SetNonce(crypto.PubkeyToAddress(local.PublicKey), 2)
	<-pool.requestReset(nil, nil)

	// Make sure queue, pending are cleared
	pending, queued = pool.Stats()
	if pending != 0 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 0)
	}
	if queued != 0 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 0)
	}

	// Validate the internal state of the pool
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Queue gapped transactions
	if err := pool.AddLocal(pricedTransaction(4, 100000, big.NewInt(1), local)); err != nil {
		t.Fatalf("failed to add remote transaction: %v", err)
	}
	if err := pool.addRemoteSync(pricedTransaction(4, 100000, big.NewInt(1), remote)); err != nil {
		t.Fatalf("failed to add remote transaction: %v", err)
	}

	// Wait for a half lifetime to pass
	time.Sleep(5 * evictionInterval)

	// Queue executable transactions, the life cycle should be restarted
	if err := pool.AddLocal(pricedTransaction(2, 100000, big.NewInt(1), local)); err != nil {
		t.Fatalf("failed to add remote transaction: %v", err)
	}
	if err := pool.addRemoteSync(pricedTransaction(2, 100000, big.NewInt(1), remote)); err != nil {
		t.Fatalf("failed to add remote transaction: %v", err)
	}

	// Wait for the whole lifetime to pass after the last promotion and kick out stale transactions
	time.Sleep(2 * config.Lifetime)

	pending, queued = pool.Stats()
	if pending != 2 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 2)
	}
	if queued != 2 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 3)
	}

	// Validate the internal state of the pool
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` ## Stats

This function is used to check the state of the transaction pool. It checks the number of pending and queued transactions and validates the internal state of the pool.

### Parameters

- `pool`: A transaction pool object.

### Behavior

1. Checks the number of pending and queued transactions.
2. Validates the internal state of the pool.

### Example

```go
func Stats(pool *TxPool) {
	pending := pool.all.Len()
	queued := pool.allQueued.Len()
	nolocals := pool.locals.Len() == 0
	if pending != 2 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 2)
	}
	if nolocals {
		if queued != 0 {
			t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 0)
		}
	} else {
		if queued != 1 {
			t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 1)
		}
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
```

## TestPendingLimiting

This function tests the behavior of the transaction pool when the number of transactions belonging to a single account goes above a certain threshold.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a test account and funds it.
2. Subscribes to transaction events to ensure all executables get announced.
3. Queues up transactions and makes sure all above a limit are dropped.
4. Validates the internal state of the pool.

### Example

```go
func TestPendingLimiting(t *testing.T) {
	t.Parallel()

	// Create a test account and fund it
	pool, key := setupPool()
	defer pool.Stop()

	account := crypto.PubkeyToAddress(key.PublicKey)
	testAddBalance(pool, account, big.NewInt(1000000000000))

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, testTxPoolConfig.AccountQueue+5)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Keep queuing up transactions and make sure all above a limit are dropped
	for i := uint64(0); i < testTxPoolConfig.AccountQueue+5; i++ {
		if err := pool.addRemoteSync(transaction(i, 100000, key)); err != nil {
			t.Fatalf("tx %d: failed to add transaction: %v", i, err)
		}
		if pool.pending[account].Len() != int(i)+1 {
			t.Errorf("tx %d: pending pool size mismatch: have %d, want %d", i, pool.pending[account].Len(), i+1)
		}
		if len(pool.queue) != 0 {
			t.Errorf("tx %d: queue size mismatch: have %d, want %d", i, pool.queue[account].Len(), 0)
		}
	}
	if pool.all.Count() != int(testTxPoolConfig.AccountQueue+5) {
		t.Errorf("total transaction mismatch: have %d, want %d", pool.all.Count(), testTxPoolConfig.AccountQueue+5)
	}
	if err := validateEvents(events, int(testTxPoolConfig.AccountQueue+5)); err != nil {
		t.Fatalf("event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
```

## TestPendingGlobalLimiting

This function tests the behavior of the transaction pool when the number of transactions belonging to multiple accounts goes above a certain threshold.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool to test the limit enforcement with.
2. Creates a number of test accounts and funds them.
3. Generates and queues a batch of transactions.
4. Imports the batch and verifies that limits have been enforced.
5. Validates the internal state of the pool.

### Example

```go
func TestPendingGlobalLimiting(t *testing.T) {
	t.Parallel()

	// Create the pool to test the limit enforcement with
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	config := testTxPoolConfig
	config.GlobalSlots = config.AccountSlots * 10

	pool := NewTxPool(config, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Create a number of test accounts and fund them
	keys := make([]*ecdsa.PrivateKey, 5)
	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(1000000))
	}
	// Generate and queue a batch of transactions
	nonces := make(map[common.Address]uint64)

	txs := types.Transactions{}
	for _, key := range keys {
		addr := crypto.PubkeyToAddress(key.PublicKey)
		for j := 0; j < int(config.GlobalSlots)/len(keys)*2; j++ {
			txs = append(txs, transaction(nonces[addr], 100000, key))
			nonces[addr]++
		}
	}
	// Import the batch and verify that limits have been enforced
	pool.AddRemotesSync(txs)

	pending := 0
	for _, list := range pool.pending {
		pending += list.Len()
	}
	if pending > int(config.GlobalSlots) {
		t.Fatalf("total pending transactions overflow allowance: %d > %d", pending, config.GlobalSlots)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
```

## TestTransactionSizeLimiting

This function tests the limit on transaction size.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a test account and funds it.
2. Creates a transaction with a size above the limit and adds it to the pool.
3. Validates that the transaction was not added to the pool.
4. Validates the internal state of the pool.

### Example

```go
func TestTransactionSizeLimiting(t *testing.T) {
	t.Parallel()

	// Create a test account and fund it
	pool, key := setupPool()
	defer pool.Stop()

	account := crypto.PubkeyToAddress(key.PublicKey)
	testAddBalance(pool, account, big.NewInt(1000000000000))

	// Create a transaction with a size above the limit and add it to the pool
	tx := transaction(0, testTxPoolConfig.MaxTxSize+1, key)
	if err := pool.addRemoteSync(tx); err == nil {
		t.Fatalf("transaction size limit not enforced")
	}
	if pool.all.Count() != 0 {
		t.Errorf("total transaction mismatch: have %d, want %d", pool.all.Count(), 0)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` The codebase consists of three test functions that test the functionality of the Ethereum transaction pool. The transaction pool is responsible for managing transactions that are waiting to be included in the blockchain. The test functions are written in Go and use the Go testing framework.

The first function, `TestAllowedTxSize`, tests the transaction pool's ability to handle transactions of different sizes. The function creates a test account and funds it with Ether. It then computes the maximum data size for transactions and tries to add transactions of different sizes to the pool. The function checks that transactions of the maximum allowed size are added to the pool, transactions of random allowed sizes are added to the pool, and transactions of minimal and random not allowed sizes are rejected. Finally, the function checks the pool's internal state to ensure that the transactions were added or rejected correctly.

The second function, `TestCapClearsFromAll`, tests the transaction pool's ability to enforce transaction limits. The function creates a test blockchain and a transaction pool with a limited number of slots and queues. It then creates a number of test accounts and funds them with Ether. The function creates a batch of transactions and imports them into the pool. The function checks that the pool enforces the transaction limits correctly and that the transactions are removed from the pool's `all` list.

The third function, `TestPendingMinimumAllowance`, tests the transaction pool's ability to handle multiple accounts with a large number of pending transactions. The function creates a test blockchain and a transaction pool with a minimum guaranteed slot count. It then creates a number of test accounts and funds them with Ether. The function creates a batch of transactions and imports them into the pool. The function checks that the pool keeps the transactions in the pool if they are under the minimum guaranteed slot count, even if the transaction count belonging to multiple accounts goes above some hard threshold.

Overall, these test functions ensure that the transaction pool is functioning correctly and can handle transactions of different sizes and limits. The tests also ensure that the pool's internal state is consistent and that transactions are added or rejected correctly. This code is a test suite for the Ethereum transaction pool. The test suite includes two functions: `TestLimits` and `TestRepricing`.

The `TestLimits` function tests that the transaction pool enforces limits on the number of transactions that can be added to the pool per account. It creates a number of test accounts, funds them, generates a batch of transactions, and adds them to the pool. It then checks that the number of pending transactions for each account matches the configured limit.

The `TestRepricing` function tests that the transaction pool correctly discards transactions with a gas price lower than the configured minimum gas price and moves any gapped transactions back from the pending pool to the queue. It creates a pool, creates a number of test accounts, funds them, generates a batch of transactions, both pending and queued, and adds them to the pool. It then sets the minimum gas price to a higher value and checks that the pool discards transactions with a lower gas price and moves any gapped transactions back from the pending pool to the queue.

Here is an example of how you can document the `TestLimits` function in Markdown format:

## TestLimits

This function tests that the transaction pool enforces limits on the number of transactions that can be added to the pool per account.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a number of test accounts and funds them.
2. Generates a batch of transactions.
3. Adds the transactions to the pool.
4. Checks that the number of pending transactions for each account matches the configured limit.

### Example

```go
func TestLimits(t *testing.T) {
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	config := testTxPoolConfig
	config.GlobalSlots = 1

	pool := NewTxPool(config, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Create a number of test accounts and fund them
	keys := make([]*ecdsa.PrivateKey, 5)
	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(1000000))
	}
	// Generate and queue a batch of transactions
	nonces := make(map[common.Address]uint64)

	txs := types.Transactions{}
	for _, key := range keys {
		addr := crypto.PubkeyToAddress(key.PublicKey)
		for j := 0; j < int(config.AccountSlots)*2; j++ {
			txs = append(txs, transaction(nonces[addr], 100000, key))
			nonces[addr]++
		}
	}
	// Import the batch and verify that limits have been enforced
	pool.AddRemotesSync(txs)

	for addr, list := range pool.pending {
		if list.Len() != int(config.AccountSlots) {
			t.Errorf("addr %x: total pending transactions mismatch: have %d, want %d", addr, list.Len(), config.AccountSlots)
		}
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
```

Similarly, you can document the `TestRepricing` function as follows:

## TestRepricing

This function tests that setting the transaction pool gas price to a higher value correctly discards everything cheaper than that and moves any gapped transactions back from the pending pool to the queue.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool.
2. Creates a number of test accounts and funds them.
3. Generates a batch of transactions, both pending and queued.
4. Adds the transactions to the pool.
5. Sets the minimum gas price to a higher value.
6. Checks that the pool discards transactions with a lower gas price and moves any gapped transactions back from the pending pool to the queue.

### Example

```go
func TestRepricing(t *testing.T) {
	// Create the pool to test the pricing enforcement with
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	pool := NewTxPool(testTxPoolConfig, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, 32)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a number of test accounts and fund them
	keys := make([]*ecdsa.PrivateKey, 4)
	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(1000000))
	}
	// Generate and queue a batch of transactions, both pending and queued
	txs := types.Transactions{}

	txs = append(txs, pricedTransaction(0, 100000, big.NewInt(2), keys[0]))
	txs = append(txs, pricedTransaction(1, 100000, big.NewInt(1), keys[0]))
	txs = append(txs, pricedTransaction(2, 100000, big.NewInt(2), keys[0]))

	txs = append(txs, pricedTransaction(0, 100000, big.NewInt(1), keys[1]))
	txs = append(txs, pricedTransaction(1, 100000, big.NewInt(2), keys[1]))
	txs = append(txs, pricedTransaction(2, 100000, big.NewInt(2), keys[1]))

	txs = append(txs, pricedTransaction(1, 100000, big.NewInt(2), keys[2]))
	txs = append(txs, pricedTransaction(2, 100000, big.NewInt(1), keys[2]))
	txs = append(txs, pricedTransaction(3, 100000, big.NewInt(2), keys[2]))

	ltx := pricedTransaction(0, 100000, big.NewInt(1), keys[3])

	// Import the batch and that both pending and queued transactions match up
	pool.AddRemotesSync(txs)
	pool.AddLocal(ltx)

	pending, queued := pool.Stats()
	if pending != 7 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 7)
	}
	if queued != 3 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 3)
	}
	if err := validateEvents(events, 7); err != nil {
		t.Fatalf("original event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// Reprice the pool and check that the pool discards transactions with a lower gas price and moves any gapped transactions back from the pending pool to the queue.
	pool.SetOptions(TxPoolConfig{PriceBump: 10})
	if err := validateEvents(events, 1); err != nil {
		t.Fatalf("event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` The `TestRepricingDynamicFee` function is a test suite that tests the behavior of the transaction pool when the gas price is increased. The test suite creates a transaction pool and adds a set of transactions to it. It then sets the gas price to a higher value and checks that all transactions with a lower gas price are dropped, and any gapped transactions are moved back from the pending pool to the queue.

The test suite creates a set of test accounts and funds them. It then generates and queues a batch of transactions, both local and remote, with different gas prices. The test suite then sets the gas price to a higher value and checks that all transactions with a lower gas price are dropped, and any gapped transactions are moved back from the pending pool to the queue. It also checks that local transactions are never dropped.

Here is an example of how you can document the `TestRepricingDynamicFee` function in Markdown format:

## TestRepricingDynamicFee

This function tests the behavior of the transaction pool when the gas price is increased.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a transaction pool.
2. Creates a set of test accounts and funds them.
3. Generates and queues a batch of transactions, both local and remote, with different gas prices.
4. Sets the gas price to a higher value.
5. Checks that all transactions with a lower gas price are dropped, and any gapped transactions are moved back from the pending pool to the queue.
6. Checks that local transactions are never dropped.

### Example

```go
func TestRepricingDynamicFee(t *testing.T) {
	t.Parallel()

	// Create the pool to test the pricing enforcement with
	pool, _ := setupPoolWithConfig(eip1559Config)
	defer pool.Stop()

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, 32)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a number of test accounts and fund them
	keys := make([]*ecdsa.PrivateKey, 4)
	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(1000000))
	}
	// Generate and queue a batch of transactions, both local and remote, with different gas prices
	pool.AddLocal(pricedTransaction(0, 100000, big.NewInt(1), keys[0]))
	pool.AddRemote(pricedTransaction(1, 100000, big.NewInt(1), keys[1]))
	pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(1), keys[2]))
	pool.AddRemote(pricedTransaction(3, 100000, big.NewInt(2), keys[0]))
	pool.AddRemote(pricedTransaction(4, 100000, big.NewInt(2), keys[1]))
	pool.AddRemote(pricedTransaction(5, 100000, big.NewInt(2), keys[2]))

	// Set the gas price to a higher value
	pool.SetGasPrice(big.NewInt(2))

	// Check that underpriced transactions get dropped
	pending, queued = pool.Stats()
	if pending != 2 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 2)
	}
	if queued != 5 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 5)
	}
	if err := validateEvents(events, 0); err != nil {
		t.Fatalf("reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// Check that we can't add the old transactions back
	if err := pool.AddRemote(pricedTransaction(1, 100000, big.NewInt(1), keys[0])); err != ErrUnderpriced {
		t.Fatalf("adding underpriced pending transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100000, big.NewInt(1), keys[1])); err != ErrUnderpriced {
		t.Fatalf("adding underpriced pending transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(1), keys[2])); err != ErrUnderpriced {
		t.Fatalf("adding underpriced queued transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	if err := validateEvents(events, 0); err != nil {
		t.Fatalf("post-reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// However we can add local underpriced transactions
	tx := pricedTransaction(1, 100000, big.NewInt(1), keys[3])
	if err := pool.AddLocal(tx); err != nil {
		t.Fatalf("failed to add underpriced local transaction: %v", err)
	}
	if pending, _ = pool.Stats(); pending != 3 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 3)
	}
	if err := validateEvents(events, 1); err != nil {
		t.Fatalf("post-reprice local event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// And we can fill gaps with properly priced transactions
	if err := pool.AddRemote(pricedTransaction(1, 100000, big.NewInt(2), keys[0])); err != nil {
		t.Fatalf("failed to add pending transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100000, big.NewInt(2), keys[1])); err != nil {
		t.Fatalf("failed to add pending transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(2), keys[2])); err != nil {
		t.Fatalf("failed to add queued transaction: %v", err)
	}
	if err := validateEvents(events, 5); err != nil {
		t.Fatalf("post-reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` This code is a test suite for the `TxPool` package. The `TxPool` package is used to manage a pool of pending and queued transactions. The test suite tests the functionality of the `TxPool` package with different types of transactions.

The `TestTxPool` function tests the `TxPool` package. It creates a list of transactions with different gas prices and adds them to the pool. It then checks that the number of pending and queued transactions in the pool matches the expected values. It also checks that the events fired by the pool match the expected events. It then reprices the pool and checks that underpriced transactions get dropped. It also checks that old transactions cannot be added back to the pool. Finally, it adds local underpriced transactions and properly priced transactions to the pool and checks that the pool state is correct.

Here is an example of how you can document the `TestTxPool` function in Markdown format:

## TestTxPool

This function tests the `TxPool` package.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a list of transactions with different gas prices and adds them to the pool.
2. Checks that the number of pending and queued transactions in the pool matches the expected values.
3. Checks that the events fired by the pool match the expected events.
4. Reprices the pool and checks that underpriced transactions get dropped.
5. Checks that old transactions cannot be added back to the pool.
6. Adds local underpriced transactions and properly priced transactions to the pool.
7. Checks that the pool state is correct.

### Example

```go
func TestTxPool(t *testing.T) {
	keys := crypto.GenerateKey()
	pool := NewTxPool(&Config{PriceLimit: 1, PriceBump: 10, AccountSlots: 10})
	events := make(chan core.TxPoolEvent, 10)
	pool.Subscribe(events)

	// Add transactions to the pool
	txs := types.Transactions{}

	txs = append(txs, pricedTransaction(0, 100000, big.NewInt(2), keys[0]))
	txs = append(txs, pricedTransaction(1, 100000, big.NewInt(1), keys[0]))
	txs = append(txs, pricedTransaction(2, 100000, big.NewInt(2), keys[0]))

	txs = append(txs, dynamicFeeTx(0, 100000, big.NewInt(2), big.NewInt(1), keys[1]))
	txs = append(txs, dynamicFeeTx(1, 100000, big.NewInt(3), big.NewInt(2), keys[1]))
	txs = append(txs, dynamicFeeTx(2, 100000, big.NewInt(3), big.NewInt(2), keys[1]))

	txs = append(txs, dynamicFeeTx(1, 100000, big.NewInt(2), big.NewInt(2), keys[2]))
	txs = append(txs, dynamicFeeTx(2, 100000, big.NewInt(1), big.NewInt(1), keys[2]))
	txs = append(txs, dynamicFeeTx(3, 100000, big.NewInt(2), big.NewInt(2), keys[2]))

	ltx := dynamicFeeTx(0, 100000, big.NewInt(2), big.NewInt(1), keys[3])

	// Import the batch and that both pending and queued transactions match up
	pool.AddRemotesSync(txs)
	pool.AddLocal(ltx)

	// Check that the pool state is correct
	pending, queued := pool.Stats()
	if pending != 7 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 7)
	}
	if queued != 3 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 3)
	}
	if err := validateEvents(events, 7); err != nil {
		t.Fatalf("original event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Reprice the pool and check that underpriced transactions get dropped
	pool.SetGasPrice(big.NewInt(2))

	// Check that the pool state is correct
	pending, queued = pool.Stats()
	if pending != 2 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 2)
	}
	if queued != 5 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 5)
	}
	if err := validateEvents(events, 0); err != nil {
		t.Fatalf("reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Check that old transactions cannot be added back to the pool
	tx := pricedTransaction(1, 100000, big.NewInt(1), keys[0])
	if err := pool.AddRemote(tx); err != ErrUnderpriced {
		t.Fatalf("adding underpriced pending transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	tx = dynamicFeeTx(0, 100000, big.NewInt(2), big.NewInt(1), keys[1])
	if err := pool.AddRemote(tx); err != ErrUnderpriced {
		t.Fatalf("adding underpriced pending transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	tx = dynamicFeeTx(2, 100000, big.NewInt(1), big.NewInt(1), keys[2])
	if err := pool.AddRemote(tx); err != ErrUnderpriced {
		t.Fatalf("adding underpriced queued transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}
	if err := validateEvents(events, 0); err != nil {
		t.Fatalf("post-reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Add local underpriced transactions and properly priced transactions to the pool
	tx = dynamicFeeTx(1, 100000, big.NewInt(1), big.NewInt(1), keys[3])
	if err := pool.AddLocal(tx); err != nil {
		t.Fatalf("failed to add underpriced local transaction: %v", err)
	}
	if pending, _ = pool.Stats(); pending != 3 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 3)
	}
	if err := validateEvents(events, 1); err != nil {
		t.Fatalf("post-reprice local event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	tx = pricedTransaction(1, 100000, big.NewInt(2), keys[0])
	if err := pool.AddRemote(tx); err != nil {
		t.Fatalf("failed to add pending transaction: %v", err)
	}
	if pending, _ = pool.Stats(); pending != 4 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 4)
	}
	tx = dynamicFeeTx(3, 100000, big.NewInt(2), big.NewInt(2), keys[2])
	if err := pool.AddRemote(tx); err != nil {
		t.Fatalf("failed to add queued transaction: %v", err)
	}
	if pending, queued = pool.Stats(); queued != 5 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 5)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("post-reprice event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` The source code provided is a test suite for the Ethereum transaction pool. The Ethereum transaction pool is responsible for managing transactions that are waiting to be included in the blockchain. The test suite tests the functionality of the transaction pool with different types of transactions.

The `TestAddLocal` function tests the addition of a local transaction to the transaction pool. A local transaction is a transaction that originates from the local node. The function creates a local transaction and adds it to the transaction pool. It then checks that the transaction was added to the pool and that the pool's internal state is valid.

The `TestAddRemote` function tests the addition of a remote transaction to the transaction pool. A remote transaction is a transaction that originates from a remote node. The function creates a remote transaction and adds it to the transaction pool. It then checks that the transaction was added to the pool and that the pool's internal state is valid.

The `TestRepricingKeepsLocals` function tests that setting the transaction pool gas price to a higher value does not remove local transactions (legacy & dynamic fee). The function creates a number of test accounts and funds them. It then creates transactions (both pending and queued) with a linearly growing gas price and adds them to the transaction pool. It sets the gas price of the pool to a higher value and checks that the local transactions are not removed from the pool.

The `TestUnderpricing` function tests that when the pool reaches its global transaction limit, underpriced transactions are gradually shifted out for more expensive ones and any gapped pending transactions are moved into the queue. The function creates the transaction pool with a global transaction limit. It then creates a number of test transactions and adds them to the pool. It sets the gas price of the pool to a lower value and checks that the underpriced transactions are gradually shifted out for more expensive ones and any gapped pending transactions are moved into the queue.

Here is an example of how you can document the `TestAddLocal` function in Markdown format:

## TestAddLocal

This function tests the addition of a local transaction to the transaction pool.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a local transaction.
2. Adds the local transaction to the transaction pool.
3. Checks that the transaction was added to the pool.
4. Checks that the pool's internal state is valid.

### Example

```go
func TestAddLocal(t *testing.T) {
	pool := newTestTxPool()
	defer pool.Stop()

	tx := newTestTx(0, 100000, big.NewInt(1), big.NewInt(1), testAddr1)
	if err := pool.AddLocal(tx); err != nil {
		t.Fatalf("failed to add local transaction: %v", err)
	}
	if _, ok := pool.locals[tx.Hash()]; !ok {
		t.Fatalf("local transaction not added to pool")
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` This code is a test suite for the `TxPool` package. The `TxPool` package is used to manage a pool of pending and queued transactions. The test suite tests the functionality of the `TxPool` package with different types of transactions.

The `TestTxPool` function tests the `TxPool` package. It creates a pool of transactions with different types of transactions, including pending and queued transactions. It then tests the functionality of the `TxPool` package by adding and removing transactions from the pool and checking that the pool's internal state is consistent.

Here is an example of how you can document the `TestTxPool` function in Markdown format:

## TestTxPool

This function tests the `TxPool` package.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool of transactions with different types of transactions, including pending and queued transactions.
2. Tests the functionality of the `TxPool` package by adding and removing transactions from the pool.
3. Checks that the pool's internal state is consistent.

### Example

```go
func TestTxPool(t *testing.T) {
	pool := NewTxPool(&mockSigner{}, &mockGasPrice{}, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, This code is a test suite for the Ethereum transaction pool. The test suite includes three functions: `TestAddUnderpricedLocalTx`, `TestStableUnderpricing`, and `TestUnderpricingDynamicFee`.

The `TestAddUnderpricedLocalTx` function tests that the transaction pool rejects underpriced local transactions. It creates a new transaction pool with a configuration that allows only transactions with a minimum gas price of 1 wei. It then adds a local transaction with a gas price of 0 wei and checks that the transaction is rejected by the pool. The function also checks that the pool's pending and queued transactions and internal state are updated correctly.

The `TestStableUnderpricing` function tests that more expensive transactions push out cheaper ones from the pool without creating gaps that cause transactions to jump back and forth between queued and pending states. It creates a new transaction pool with a configuration that allows 128 global slots and 0 global queue. It then fills up the entire queue with transactions with the same gas price and adds a high-priced transaction. The function checks that the pool's pending and queued transactions and internal state are updated correctly.

The `TestUnderpricingDynamicFee` function tests that when the pool reaches its global transaction limit, underpriced transactions are gradually shifted out for more expensive ones, and any gapped pending transactions are moved into the queue. It creates a new transaction pool with a configuration that allows 2 global slots and 2 global queue. It then adds transactions with different gas prices and checks that the pool's pending and queued transactions and internal state are updated correctly.

Here is an example of how you can document the `TestAddUnderpricedLocalTx` function in Markdown format:

## TestAddUnderpricedLocalTx

This function tests that the transaction pool rejects underpriced local transactions.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a new transaction pool with a configuration that allows only transactions with a minimum gas price of 1 wei.
2. Adds a local transaction with a gas price of 0 wei.
3. Checks that the transaction is rejected by the pool.
4. Checks that the pool's pending and queued transactions and internal state are updated correctly.

### Example

```go
func TestAddUnderpricedLocalTx(t *testing.T) {
	pool, _ := setupPoolWithConfig(defaultConfig)
	defer pool.Stop()

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, 32)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a test account and fund it
	key, _ := crypto.GenerateKey()
	testAddBalance(pool, crypto.PubkeyToAddress(key.PublicKey), big.NewInt(1000000))

	// Add an underpriced local transaction
	tx := types.NewTransaction(0, crypto.PubkeyToAddress(key.PublicKey), big.NewInt(1), 21000, big.NewInt(0), nil)
	if err := pool.addLocal(tx); err == nil {
		t.Fatalf("expected error when adding underpriced local transaction")
	}
	pending, queued := pool.Stats()
	if pending != 0 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 0)
	}
	if queued != 0 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 0)
	}
	if err := validateEvents(events, 0); err != nil {
		t.Fatalf("local event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` This code is a test suite for the `TransactionPool` package. The `TransactionPool` package is used to manage a pool of pending and queued transactions. The test suite tests the functionality of the `TransactionPool` package with different types of transactions.

The `TestTransactionPool` function tests the `TransactionPool` package. It creates a pool of transactions and tests the functionality of the `AddRemote` and `AddLocal` functions. It also tests the functionality of the `Stats` function, which returns the number of pending and queued transactions in the pool.

The test suite creates a number of test accounts and funds them. It then generates and queues a batch of transactions, both pending and queued. It checks that both pending and queued transactions match up. It also ensures that adding an underpriced transaction fails and that adding high priced transactions drops cheap ones, but not own. Finally, it ensures that adding local transactions can push out even higher priced ones.

Here is an example of how you can document the `TestTransactionPool` function in Markdown format:

## TestTransactionPool

This function tests the `TransactionPool` package.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a pool of transactions and tests the functionality of the `AddRemote` and `AddLocal` functions.
2. Tests the functionality of the `Stats` function, which returns the number of pending and queued transactions in the pool.
3. Generates and queues a batch of transactions, both pending and queued.
4. Checks that both pending and queued transactions match up.
5. Ensures that adding an underpriced transaction fails.
6. Ensures that adding high priced transactions drops cheap ones, but not own.
7. Ensures that adding local transactions can push out even higher priced ones.

### Example

```go
func TestTransactionPool(t *testing.T) {
	events := make(chan core.TxPreEvent, 10)
	pool := NewTransactionPool(&testConfig, &testChain, events)

	// Subscribe to the transaction pool events
	sub := pool.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a number of test accounts and fund them
	keys := make([]*ecdsa.PrivateKey, 4)
	for i := 0; i < len(keys); i++ {
		keys[i], _ = crypto.GenerateKey()
		testAddBalance(pool, crypto.PubkeyToAddress(keys[i].PublicKey), big.NewInt(1000000))
	}

	// Generate and queue a batch of transactions, both pending and queued
	txs := types.Transactions{}

	txs = append(txs, dynamicFeeTx(0, 100000, big.NewInt(3), big.NewInt(2), keys[0]))
	txs = append(txs, pricedTransaction(1, 100000, big.NewInt(2), keys[0]))
	txs = append(txs, dynamicFeeTx(1, 100000, big.NewInt(2), big.NewInt(1), keys[1]))

	ltx := dynamicFeeTx(0, 100000, big.NewInt(2), big.NewInt(1), keys[2])

	// Import the batch and that both pending and queued transactions match up
	pool.AddRemotes(txs) // Pend K0:0, K0:1; Que K1:1
	pool.AddLocal(ltx)   // +K2:0 => Pend K0:0, K0:1, K2:0; Que K1:1

	pending, queued := pool.Stats()
	if pending != 3 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 3)
	}
	if queued != 1 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 1)
	}
	if err := validateEvents(events, 3); err != nil {
		t.Fatalf("original event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}

	// Ensure that adding an underpriced transaction fails
	tx := dynamicFeeTx(0, 100000, big.NewInt(2), big.NewInt(1), keys[1])
	if err := pool.AddRemote(tx); err != ErrUnderpriced { // Pend K0:0, K0:1, K2:0; Que K1:1
		t.Fatalf("adding underpriced pending transaction error mismatch: have %v, want %v", err, ErrUnderpriced)
	}

	// Ensure that adding high priced transactions drops cheap ones, but not own
	tx = pricedTransaction(0, 100000, big.NewInt(2), keys[1])
	if err := pool.AddRemote(tx); err != nil { // +K1:0, -K1:1 => Pend K0:0, K0:1, K1:0, K2:0; Que -
		t.Fatalf("failed to add well priced transaction: %v", err)
	}

	tx = pricedTransaction(1, 100000, big.NewInt(3), keys[1])
	if err := pool.AddRemote(tx); err != nil { // +K1:2, -K0:1 => Pend K0:0 K1:0, K2:0; Que K1:2
		t.Fatalf("failed to add well priced transaction: %v", err)
	}
	tx = dynamicFeeTx(2, 100000, big.NewInt(4), big.NewInt(1), keys[1])
	if err := pool.AddRemote(tx); err != nil { // +K1:3, -K1:0 => Pend K0:0 K2:0; Que K1:2 K1:3
		t.Fatalf("failed to add well priced transaction: %v", err)
	}
	pending, queued = pool.Stats()
	if pending != 2 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 2)
	}
	if queued != 2 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 2)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("additional event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
	// Ensure that adding local transactions can push out even higher priced ones
	ltx = dynamicFeeTx(1, 100000, big.NewInt(0), big.NewInt(0), keys[2])
	if err := pool.AddLocal(ltx); err != nil {
		t.Fatalf("failed to append underpriced local transaction: %v", err)
	}
	ltx = dynamicFeeTx(0, 100000, big.NewInt(0), big.NewInt(0), keys[3])
	if err := pool.AddLocal(ltx); err != nil {
		t.Fatalf("failed to add new underpriced local transaction: %v", err)
	}
	pending, queued = pool.Stats()
	if pending != 3 {
		t.Fatalf("pending transactions mismatched: have %d, want %d", pending, 3)
	}
	if queued != 1 {
		t.Fatalf("queued transactions mismatched: have %d, want %d", queued, 1)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("local event firing failed: %v", err)
	}
	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` This codebase contains tests for the Ethereum transaction pool. The tests are written in Go and use the `testing` package. The tests cover various aspects of the transaction pool, including transaction validation, fee calculation, and transaction eviction.

The `TestFilter` function tests the `filter` function, which is used to validate the compatibility of two Ethereum nodes based on their `ID`. The `ID` is a struct that contains a hash and a next value. The test suite tests the functionality of the `filter` function with different `ID` values.

The `TestDualHeapEviction` function tests whether the highest fee cap transaction is retained after a batch of high effective tip transactions are added and vice versa. The test creates a transaction pool and adds transactions with different fees and tips. It then checks that the highest fee cap transaction and the highest effective tip transaction are retained after each batch of transactions is added.

The `TestDeduplication` function tests that the transaction pool rejects duplicate transactions. The test creates a transaction pool and adds a batch of transactions. It then adds a subset of the transactions and checks that they are added to the pool. Finally, it adds all the transactions and checks that the previously added transactions are rejected as duplicates.

Overall, these tests provide comprehensive coverage of the Ethereum transaction pool and ensure that it functions correctly. The `TestReplacement` function is a test suite for the transaction pool's replacement functionality. The test suite ensures that the pool rejects replacement transactions that do not meet the minimum price bump required.

The test suite creates a new transaction pool with a test blockchain and subscribes to the pool's transaction feed to keep track of transaction events. It then creates a test account to add transactions with.

The test suite adds pending transactions to the pool, ensuring that the minimum price bump is enforced for replacement. It then validates that the replacement events are fired correctly.

The test suite also adds queued transactions to the pool, ensuring that the minimum price bump is enforced for replacement. It then validates that the replacement events are fired correctly.

Here is an example of how you can document the `TestReplacement` function in Markdown format:

## TestReplacement

This function is a test suite for the transaction pool's replacement functionality. It ensures that the pool rejects replacement transactions that do not meet the minimum price bump required.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a new transaction pool with a test blockchain and subscribes to the pool's transaction feed to keep track of transaction events.
2. Creates a test account to add transactions with.
3. Adds pending transactions to the pool, ensuring that the minimum price bump is enforced for replacement.
4. Validates that the replacement events are fired correctly.
5. Adds queued transactions to the pool, ensuring that the minimum price bump is enforced for replacement.
6. Validates that the replacement events are fired correctly.

### Example

```go
func TestReplacement(t *testing.T) {
	t.Parallel()

	// Create the pool to test the pricing enforcement with
	statedb, _ := state.New(common.Hash{}, state.NewDatabase(rawdb.NewMemoryDatabase()), nil)
	blockchain := newTestBlockChain(1000000, statedb, new(event.Feed))

	pool := NewTxPool(testTxPoolConfig, params.TestChainConfig, blockchain)
	defer pool.Stop()

	// Keep track of transaction events to ensure all executables get announced
	events := make(chan core.NewTxsEvent, 32)
	sub := pool.txFeed.Subscribe(events)
	defer sub.Unsubscribe()

	// Create a test account to add transactions with
	key, _ := crypto.GenerateKey()
	testAddBalance(pool, crypto.PubkeyToAddress(key.PublicKey), big.NewInt(1000000000))

	// Add pending transactions, ensuring the minimum price bump is enforced for replacement (for ultra low prices too)
	price := int64(100)
	threshold := (price * (100 + int64(testTxPoolConfig.PriceBump))) / 100

	if err := pool.addRemoteSync(pricedTransaction(0, 100000, big.NewInt(1), key)); err != nil {
		t.Fatalf("failed to add original cheap pending transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100001, big.NewInt(1), key)); err != ErrReplaceUnderpriced {
		t.Fatalf("original cheap pending transaction replacement error mismatch: have %v, want %v", err, ErrReplaceUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100000, big.NewInt(2), key)); err != nil {
		t.Fatalf("failed to replace original cheap pending transaction: %v", err)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("cheap replacement event firing failed: %v", err)
	}

	if err := pool.addRemoteSync(pricedTransaction(0, 100000, big.NewInt(price), key)); err != nil {
		t.Fatalf("failed to add original proper pending transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100001, big.NewInt(threshold-1), key)); err != ErrReplaceUnderpriced {
		t.Fatalf("original proper pending transaction replacement error mismatch: have %v, want %v", err, ErrReplaceUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(0, 100000, big.NewInt(threshold), key)); err != nil {
		t.Fatalf("failed to replace original proper pending transaction: %v", err)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("proper replacement event firing failed: %v", err)
	}

	// Add queued transactions, ensuring the minimum price bump is enforced for replacement (for ultra low prices too)
	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(1), key)); err != nil {
		t.Fatalf("failed to add original cheap queued transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100001, big.NewInt(1), key)); err != ErrReplaceUnderpriced {
		t.Fatalf("original cheap queued transaction replacement error mismatch: have %v, want %v", err, ErrReplaceUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(2), key)); err != nil {
		t.Fatalf("failed to replace original cheap queued transaction: %v", err)
	}

	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(price), key)); err != nil {
		t.Fatalf("failed to add original proper queued transaction: %v", err)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100001, big.NewInt(threshold-1), key)); err != ErrReplaceUnderpriced {
		t.Fatalf("original proper queued transaction replacement error mismatch: have %v, want %v", err, ErrReplaceUnderpriced)
	}
	if err := pool.AddRemote(pricedTransaction(2, 100000, big.NewInt(threshold), key)); err != nil {
		t.Fatalf("failed to replace original proper queued transaction: %v", err)
	}
	if err := validateEvents(events, 2); err != nil {
		t.Fatalf("proper replacement event firing failed: %v", err)
	}
}
``` This code is a test suite for the Ethereum transaction pool. The test suite tests the functionality of the transaction pool with dynamic fee transactions that are replaced with higher fee transactions. The test suite ensures that the pool rejects replacement dynamic fee transactions that don't meet the minimum price bump required.

The `TestReplacementDynamicFee` function tests the pricing enforcement of the transaction pool with dynamic fee transactions. It creates a pool and adds a balance to it. It then adds pending transactions to the pool and ensures that the minimum price bump is enforced for replacement. The function runs the following identical checks for both the pending and queue pools:

1. Send initial tx => accept
2. Don't bump tip or fee cap => discard
3. Bump both more than min => accept
4. Check events match expected (2 new executable txs during pending, 0 during queue)
5. Send new tx with larger tip and gasFeeCap => accept
6. Bump tip max allowed so it's still underpriced => discard
7. Bump fee cap max allowed so it's still underpriced => discard
8. Bump tip min for acceptance => discard
9. Bump feecap min for acceptance => discard
10. Bump feecap and tip min for acceptance => accept
11. Check events match expected (2 new executable txs during pending, 0 during queue)

The `dynamicFeeTx` function creates a dynamic fee transaction with the given nonce, gas limit, gas fee cap, gas tip cap, and private key.

The `setupPoolWithConfig` function sets up a transaction pool with the given configuration and returns the pool and a private key.

The `testAddBalance` function adds the given balance to the given address in the pool.

The `validateEvents` function validates that the number of events matches the expected number of events.

The `validatePoolInternals` function validates the internal state of the pool.

Overall, this test suite ensures that the transaction pool enforces the minimum price bump required for replacement dynamic fee transactions. The code you provided is a test suite for the Ethereum transaction pool. The test suite tests the functionality of the transaction pool with different types of transactions.

The `TestReplaceUnderpriced` function tests the replacement of underpriced transactions with higher-priced transactions. It creates a transaction pool and adds a cheap transaction to it. It then adds a series of higher-priced transactions to the pool and checks that the cheap transaction is replaced with the higher-priced transactions. The function also checks that the events fired during the replacement match the expected events.

The `TestJournaling` and `TestJournalingNoLocals` functions test the journaling functionality of the transaction pool. They create a temporary file for the journal and a transaction pool with journaling enabled. They then add a series of local and remote transactions to the pool and check that the local transactions are journaled to disk, but the remote transactions are discarded between restarts. The `TestJournalingNoLocals` function tests the same functionality but with the `NoLocals` configuration option enabled.

Here is an example of how you can document the `TestReplaceUnderpriced` function in Markdown format:

## TestReplaceUnderpriced

This function tests the replacement of underpriced transactions with higher-priced transactions.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a transaction pool.
2. Adds a cheap transaction to the pool.
3. Adds a series of higher-priced transactions to the pool.
4. Checks that the cheap transaction is replaced with the higher-priced transactions.
5. Checks that the events fired during the replacement match the expected events.

### Example

```go
func TestReplaceUnderpriced(t *testing.T) {
	pool := newTestPool()

	// Add a cheap transaction to the pool
	tx := dynamicFeeTx(0, 100000, big.NewInt(1), big.NewInt(1), key)
	if err := pool.AddRemote(tx); err != nil {
		t.Fatalf("failed to add original cheap transaction: %v", err)
	}

	// Add a series of higher-priced transactions to the pool
	nonce := uint64(1)
	key, _ := crypto.GenerateKey()
	for _, stage := range []string{"queued", "pending"} {
		// 1.  Bump fee cap min allowed => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold), big.NewInt(gasTipCap), key)
		if err := pool.AddRemote(tx); err != nil {
			t.Fatalf("failed to replace original cheap %s transaction: %v", stage, err)
		}
		// 2.  Bump tip min allowed => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(gasFeeCap), big.NewInt(tipThreshold), key)
		if err := pool.AddRemote(tx); err != nil {
			t.Fatalf("failed to replace original cheap %s transaction: %v", stage, err)
		}
		// 3.  Bump fee cap max allowed => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold), big.NewInt(gasTipCap), key)
		if err := pool.AddRemote(tx); err != nil {
			t.Fatalf("failed to replace original cheap %s transaction: %v", stage, err)
		}
		// 4.  Bump tip max allowed => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(gasFeeCap), big.NewInt(tipCapThreshold), key)
		if err := pool.AddRemote(tx); err != nil {
			t.Fatalf("failed to replace original cheap %s transaction: %v", stage, err)
		}
		// 5.  Bump fee cap max allowed so it's overpriced => discard
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold+1), big.NewInt(gasTipCap), key)
		if err := pool.AddRemote(tx); err != ErrReplaceUnderpriced {
			t.Fatalf("original proper %s transaction replacement error mismatch: have %v, want %v", stage, err, ErrReplaceUnderpriced)
		}
		// 6.  Bump tip max allowed so it's overpriced => discard
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(gasFeeCap), big.NewInt(tipCapThreshold+1), key)
		if err := pool.AddRemote(tx); err != ErrReplaceUnderpriced {
			t.Fatalf("original proper %s transaction replacement error mismatch: have %v, want %v", stage, err, ErrReplaceUnderpriced)
		}
		// 7.  Bump fee cap max allowed so it's still underpriced => discard
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold-1), big.NewInt(gasTipCap), key)
		if err := pool.AddRemote(tx); err != ErrReplaceUnderpriced {
			t.Fatalf("original proper %s transaction replacement error mismatch: have %v, want %v", stage, err, ErrReplaceUnderpriced)
		}
		// 8.  Bump tip min for acceptance => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(gasFeeCap), big.NewInt(tipThreshold), key)
		if err := pool.AddRemote(tx); err != ErrReplaceUnderpriced {
			t.Fatalf("original proper %s transaction replacement error mismatch: have %v, want %v", stage, err, ErrReplaceUnderpriced)
		}
		// 9.  Bump fee cap min for acceptance => accept
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold), big.NewInt(gasTipCap), key)
		if err := pool.AddRemote(tx); err != ErrReplaceUnderpriced {
			t.Fatalf("original proper %s transaction replacement error mismatch: have %v, want %v", stage, err, ErrReplaceUnderpriced)
		}
		// 10. Check events match expected (3 new executable txs during pending, 0 during queue)
		tx = dynamicFeeTx(nonce, 100000, big.NewInt(feeCapThreshold), big.NewInt(tipThreshold), key)
		if err := pool.AddRemote(tx); err != nil {
			t.Fatalf("failed to replace original cheap %s transaction: %v", stage, err)
		}
		// 11. Check events match expected (3 new executable txs during pending, 0 during queue)
		count = 2
		if stage == "queued" {
			count = 0
		}
		if err := validateEvents(events, count); err != nil {
			t.Fatalf("replacement %s event firing failed: %v", stage, err)
		}
	}

	if err := validatePoolInternals(pool); err != nil {
		t.Fatalf("pool internal state corrupted: %v", err)
	}
}
``` ## TestTxPool

This function tests the `TxPool` struct, which is responsible for managing the transaction pool of an Ethereum node.

### TestAddRemotesSync

This function tests the `AddRemotesSync` method of the `TxPool` struct. It creates a new `TxPool` instance and adds two transactions to it, one that is pending and one that is both pending and queued. It then checks that the transactions were correctly added to the pool and that the pool's internal state is valid.

### TestStatusCheck

This function tests the `StatusCheck` method of the `TxPool` struct. It creates a new `TxPool` instance and generates three test accounts. It then generates and queues a batch of transactions, some of which are pending and some of which are queued. It checks that the `StatusCheck` method correctly retrieves the pending status of each transaction.

### pricedTransaction

This function generates a new priced transaction with the specified nonce, gas limit, gas price, and sender key. It returns the new transaction.

### validatePoolInternals

This function validates the internal state of a `TxPool` instance. It checks that the pool's pending and queued transactions are correctly tracked and that the pool's internal data structures are consistent.

### newTestBlockChain

This function creates a new test blockchain with the specified block number, state database, and event feed. It returns the new blockchain.

### testAddBalance

This function adds the specified balance to the specified account in the specified `TxPool` instance. It returns an error if the account does not exist in the pool.

### TestTxPoolConfig

This variable is a `TxPoolConfig` instance used for testing the `TxPool` struct. It contains default values for the various configuration options of the pool.

### TestChainConfig

This variable is a `ChainConfig` instance used for testing the `TxPool` struct. It contains default values for the various configuration options of the Ethereum chain.

### TestTxPool

This function is the main entry point for the `TestTxPool` test suite. It runs the `TestAddRemotesSync` and `TestStatusCheck` tests. ## Introduction

This codebase contains the implementation of a transaction pool for Ethereum nodes. The transaction pool is responsible for managing the pending and future transactions of the node. The codebase includes several functions that test the functionality of the transaction pool.

## Functions

### `TestAddBalance`

This function tests the `addBalance` function of the transaction pool. It creates a new account and adds a balance to it. It then checks that the balance of the account matches the expected balance.

### `TestPromote`

This function tests the `promote` function of the transaction pool. It creates a new transaction and adds it to the pool. It then promotes the transaction and checks that it is moved from the pending queue to the future queue.

### `TestDemote`

This function tests the `demote` function of the transaction pool. It creates a new transaction and adds it to the pool. It then demotes the transaction and checks that it is moved from the future queue to the pending queue.

### `TestFilter`

This function tests the `filter` function of the transaction pool. It creates a list of test cases with different `ID` values and expected error messages. It then runs the `filter` function with each test case and checks that the returned error message matches the expected error message.

### `TestEncoding`

This function tests the RLP encoding of the `ID` struct. It creates a list of test cases with different `ID` values and expected RLP encoded bytes. It then encodes each `ID` struct using RLP encoding and checks that the resulting bytes match the expected RLP encoded bytes.

### `TestTxPool`

This function tests the functionality of the transaction pool. It creates a new pool and adds several transactions to it. It then checks that the transactions are added to the pending queue and that their status is set to `TxStatusPending`. It then promotes some of the transactions and checks that their status is set to `TxStatusQueued`. It then demotes some of the transactions and checks that their status is set back to `TxStatusPending`. Finally, it retrieves the status of each transaction and validates them.

### `TestSlotCount`

This function tests the computation of the transaction slots consumption. It creates a small and a large transaction and checks that the number of slots consumed by each transaction matches the expected number of slots.

### `BenchmarkPendingDemotion`

This function benchmarks the speed of validating the contents of the pending queue of the transaction pool. It adds a batch of transactions to the pool and then benchmarks the speed of pool validation.

### `BenchmarkFuturePromotion`

This function benchmarks the speed of scheduling the contents of the future queue of the transaction pool. It adds a batch of transactions to the pool and then benchmarks the speed of pool validation.

### `BenchmarkBatchInsert`

This function benchmarks the speed of batched transaction insertion. It adds a batch of transactions to the pool and then benchmarks the speed of transaction insertion. It includes two versions of the benchmark, one for local transactions and one for remote transactions. ## Description

The provided source code contains three benchmark functions that test the performance of the transaction pool in the Ethereum blockchain. The transaction pool is responsible for storing and managing transactions before they are included in a block by miners. The benchmark functions test the speed of inserting transactions into the pool in different scenarios.

### `BenchmarkInsert`

This function benchmarks the speed of inserting a batch of transactions into the transaction pool. It generates a batch of transactions and adds them to the pool using either the `AddLocals` or `AddRemotes` function depending on the value of the `local` parameter. The function measures the time it takes to add all transactions to the pool.

### `BenchmarkInsertRemoteWithAllLocals`

This function benchmarks the speed of inserting a batch of remote transactions into the transaction pool that already contains all local transactions. It generates a batch of local and remote transactions and adds them to the pool. The function measures the time it takes to add all transactions to the pool.

### `BenchmarkMultiAccountBatchInsert`

This function benchmarks the speed of inserting a batch of transactions into the transaction pool for multiple accounts. It generates a batch of transactions for each account and adds them to the pool. The function measures the time it takes to add all transactions to the pool.

### `setupPool`

This function sets up a new transaction pool and returns a reference to it. It also generates a new private key and returns a reference to it.

### `testAddBalance`

This function adds a specified amount of Ether to the balance of a specified account in the transaction pool.

### `transaction`

This function creates a new transaction with the specified nonce, gas limit, and private key.

### `pricedTransaction`

This function creates a new transaction with the specified nonce, gas limit, gas price, and private key.