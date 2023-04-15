The `txpool` package contains the implementation of the Ethereum transaction pool. The transaction pool is responsible for storing and managing transactions that are waiting to be included in a block.

The `nonceHeap` type is a heap.Interface implementation over 64-bit unsigned integers. It is used to retrieve sorted transactions from the possibly gapped future queue.

The `sortedMap` type is a nonce->transaction hash map with a heap-based index to allow iterating over the contents in a nonce-incrementing way. It is used to store transactions sorted by their nonce.

The `newSortedMap` function creates a new nonce-sorted transaction map.

The `Get` method retrieves the current transactions associated with the given nonce.

The `Put` method inserts a new transaction into the map, also updating the map's nonce index. If a transaction already exists with the same nonce, it's overwritten.

The `Forward` method removes all transactions from the map with a nonce lower than the provided threshold. Every removed transaction is returned for any post-removal maintenance.

The `Filter` method iterates over the list of transactions and removes all of them for which the specified function evaluates to true. `Filter`, as opposed to `filter`, re-initializes the heap after the operation is done. If you want to do several consecutive filterings, it's therefore better to first do a `.filter(func1)` followed by `.Filter(func2)` or `reheap()`.

Here is an example of how you can document the `sortedMap` type in Markdown format:

## sortedMap

The `sortedMap` type is a nonce->transaction hash map with a heap-based index to allow iterating over the contents in a nonce-incrementing way.

### Fields

- `items`: A hash map storing the transaction data.
- `index`: A heap of nonces of all the stored transactions (non-strict mode).
- `cache`: A cache of the transactions already sorted.

### Methods

#### newSortedMap

```go
func newSortedMap() *sortedMap
```

`newSortedMap` creates a new nonce-sorted transaction map.

#### Get

```go
func (m *sortedMap) Get(nonce uint64) *types.Transaction
```

`Get` retrieves the current transactions associated with the given nonce.

#### Put

```go
func (m *sortedMap) Put(tx *types.Transaction)
```

`Put` inserts a new transaction into the map, also updating the map's nonce index. If a transaction already exists with the same nonce, it's overwritten.

#### Forward

```go
func (m *sortedMap) Forward(threshold uint64) types.Transactions
```

`Forward` removes all transactions from the map with a nonce lower than the provided threshold. Every removed transaction is returned for any post-removal maintenance.

#### Filter

```go
func (m *sortedMap) Filter(filter func(*types.Transaction) bool) types.Transactions
```

`Filter` iterates over the list of transactions and removes all of them for which the specified function evaluates to true. `Filter`, as opposed to `filter`, re-initializes the heap after the operation is done. If you want to do several consecutive filterings, it's therefore better to first do a `.filter(func1)` followed by `.Filter(func2)` or `reheap()`. This code defines a `sortedMap` type that maintains a map of transactions sorted by their nonces. The `sortedMap` type provides several methods to manipulate the map of transactions.

The `filter` method filters out transactions from the map based on a provided filter function. It returns a slice of removed transactions. If any transactions are removed, the heap and cache are invalidated. The `reheap` method regenerates the heap and cache.

The `Cap` method places a hard limit on the number of items in the map. It returns all transactions exceeding that limit.

The `Remove` method deletes a transaction from the map based on its nonce. It returns a boolean indicating whether the transaction was found.

The `Ready` method retrieves a sequentially increasing list of transactions starting at the provided nonce that is ready for processing. The returned transactions will be removed from the map. All transactions with nonces lower than start will also be returned to prevent getting into an invalid state.

The `Len` method returns the length of the transaction map.

The `flatten` method creates a nonce-sorted slice of transactions based on the loosely sorted internal representation. The result of the sorting is cached in case it's requested again before any modifications are made to the contents. The `Flatten` method returns a copy of the cached slice.

Here is an example of how you can document the `sortedMap` type and its methods in Markdown format:

## sortedMap

This type maintains a map of transactions sorted by their nonces.

### Fields

- `items`: A map of transactions.
- `index`: A heap of transaction nonces.
- `cache`: A cached nonce-sorted slice of transactions.

### Methods

#### filter

This method filters out transactions from the map based on a provided filter function. It returns a slice of removed transactions. If any transactions are removed, the heap and cache are invalidated.

##### Parameters

- `filter`: A function that takes a transaction and returns a boolean indicating whether the transaction should be removed.

##### Returns

A slice of removed transactions.

#### reheap

This method regenerates the heap and cache.

#### Cap

This method places a hard limit on the number of items in the map. It returns all transactions exceeding that limit.

##### Parameters

- `threshold`: An integer indicating the maximum number of items allowed in the map.

##### Returns

A slice of transactions exceeding the limit.

#### Remove

This method deletes a transaction from the map based on its nonce. It returns a boolean indicating whether the transaction was found.

##### Parameters

- `nonce`: An integer indicating the nonce of the transaction to be removed.

##### Returns

A boolean indicating whether the transaction was found.

#### Ready

This method retrieves a sequentially increasing list of transactions starting at the provided nonce that is ready for processing. The returned transactions will be removed from the map. All transactions with nonces lower than start will also be returned to prevent getting into an invalid state.

##### Parameters

- `start`: An integer indicating the nonce of the first transaction to be retrieved.

##### Returns

A slice of ready transactions.

#### Len

This method returns the length of the transaction map.

##### Returns

An integer indicating the length of the transaction map.

#### flatten

This method creates a nonce-sorted slice of transactions based on the loosely sorted internal representation. The result of the sorting is cached in case it's requested again before any modifications are made to the contents.

##### Returns

A nonce-sorted slice of transactions.

#### Flatten

This method returns a copy of the cached nonce-sorted slice of transactions.

##### Returns

A copy of the cached nonce-sorted slice of transactions. The provided code is a Go implementation of a transaction pool for Ethereum. The transaction pool is responsible for managing transactions that are waiting to be included in a block. The code defines a `list` struct that represents a list of transactions belonging to an account, sorted by account nonce. The `list` struct contains methods for adding, removing, and filtering transactions from the list.

The `make` function creates a new `types.Transactions` slice with the same length as the `cache` slice and copies the contents of the `cache` slice to the new slice. The `LastElement` method of the `sortedMap` struct returns the last element of a flattened list, which is the transaction with the highest nonce.

The `newList` function creates a new `list` struct with a `sortedMap` heap-indexed sorted hash map of the transactions. The `Contains` method returns whether the `list` contains a transaction with the provided nonce. The `Add` method tries to insert a new transaction into the `list`, returning whether the transaction was accepted, and if yes, any previous transaction it replaced. If the new transaction is accepted into the `list`, the lists' cost and gas thresholds are also potentially updated. The `Forward` method removes all transactions from the `list` with a nonce lower than the provided threshold. Every removed transaction is returned for any post-removal maintenance. The `Filter` method removes all transactions from the `list` with a cost or gas limit higher than the provided thresholds. Every removed transaction is returned for any post-removal maintenance. Strict-mode invalidated transactions are also returned.

Here is an example of how you can document the `Add` method in Markdown format:

## Add

This method tries to insert a new transaction into the `list`, returning whether the transaction was accepted, and if yes, any previous transaction it replaced.

### Parameters

- `tx`: The transaction to add to the `list`.
- `priceBump`: The price bump to apply to the transaction.

### Returns

- `bool`: Whether the transaction was accepted into the `list`.
- `*types.Transaction`: The previous transaction that was replaced by the new transaction.

### Behavior

1. If there's an older better transaction, abort.
2. If the new transaction is accepted into the `list`, the lists' cost and gas thresholds are also potentially updated.
3. If the old transaction is being replaced, subtract old cost.
4. Add new transaction cost to `totalcost`.
5. Otherwise overwrite the old transaction with the current one.

### Example

```go
func (l *list) Add(tx *types.Transaction, priceBump uint64) (bool, *types.Transaction) {
	old := l.txs.Get(tx.Nonce())
	if old != nil {
		// If there's an older better transaction, abort
		if old.GasFeeCapCmp(tx) >= 0 || old.GasTipCapCmp(tx) >= 0 {
			return false, nil
		}
		// thresholdFeeCap = oldFC  * (100 + priceBump) / 100
		a := big.NewInt(100 + int64(priceBump))
		aFeeCap := new(big.Int).Mul(a, old.GasFeeCap())
		aTip := a.Mul(a, old.GasTipCap())

		// thresholdTip    = oldTip * (100 + priceBump) / 100
		b := big.NewInt(100)
		thresholdFeeCap := aFeeCap.Div(aFeeCap, b)
		thresholdTip := aTip.Div(aTip, b)

		// We have to ensure that both the new fee cap and tip are higher than the
		// old ones as well as checking the percentage threshold to ensure that
		// this is accurate for low (Wei-level) gas price replacements.
		if tx.GasFeeCapIntCmp(thresholdFeeCap) < 0 || tx.GasTipCapIntCmp(thresholdTip) < 0 {
			return false, nil
		}
		// Old is being replaced, subtract old cost
		l.subTotalCost([]*types.Transaction{old})
	}
	// Add new tx cost to totalcost
	l.totalcost.Add(l.totalcost, tx.Cost())
	// Otherwise overwrite the old transaction with the current one
	l.txs.Put(tx)
	if cost := tx.Cost(); l.costcap.Cmp(cost) < 0 {
		l.costcap = cost
	}
	if gas := tx.Gas(); l.gascap < gas {
		l.gascap = gas
	}
	return true, old
}
``` This code is a part of the Ethereum Go implementation and is responsible for managing a list of transactions. The list is maintained in a loosely sorted order based on the transaction's nonce. The list is used to filter out transactions that exceed the gas limit or cost limit, and to cap the number of transactions in the list. The list also provides a way to retrieve transactions that are ready for processing based on their nonce.

The `Filter` function filters out transactions that exceed the gas limit or cost limit. It also caps the number of transactions in the list. If the list was strict, it filters out transactions above the lowest nonce. The function returns the removed transactions and any transactions that were invalidated due to the deletion.

The `Cap` function places a hard limit on the number of items in the list and returns all transactions exceeding that limit.

The `Remove` function deletes a transaction from the list and returns whether the transaction was found. In strict mode, it also returns any transaction invalidated due to the deletion.

The `Ready` function retrieves a sequentially increasing list of transactions starting at the provided nonce that is ready for processing. The returned transactions will be removed from the list. All transactions with nonces lower than start will also be returned to prevent getting into an invalid state.

The `Len` function returns the length of the transaction list.

The `Empty` function returns whether the list of transactions is empty or not.

The `Flatten` function creates a nonce-sorted slice of transactions based on the loosely sorted internal representation. The result of the sorting is cached in case it's requested again before any modifications are made to the contents.

The `LastElement` function returns the last element of a flattened list, thus, the transaction with the highest nonce.

The `subTotalCost` function subtracts the cost of the given transactions from the total cost of all transactions.

The `priceHeap` is a heap.Interface implementation over the transaction list. The `priceHeap` struct is a heap data structure used to store transactions sorted by their gas price. The heap is sorted based on the effective tip of the transaction, which is calculated based on the gas fee cap and the base fee. If the base fee is not set, the heap is sorted based on the gas fee cap. If two transactions have the same effective tip, the one with the higher nonce is sorted first.

The `pricedList` struct is a price-sorted heap that allows operating on transactions in a price-incrementing way. It is built upon all transactions in the transaction pool but only interested in the remote part. It means only remote transactions will be considered for tracking, sorting, eviction, etc. The `pricedList` struct uses two heaps for sorting: the urgent heap (based on effective tip in the next block) and the floating heap (based on gas fee cap). Always the bigger heap is chosen for eviction. Transactions evicted from the urgent heap are first demoted into the floating heap.

The `newPricedList` function creates a new price-sorted transaction heap.

The `Put` function inserts a new transaction into the heap. If the transaction is local, it is not inserted.

The `Removed` function notifies the prices transaction list that an old transaction dropped from the pool. The list will just keep a counter of stale objects and update the heap if a large enough ratio of transactions go stale.

The `Underpriced` function checks whether a transaction is cheaper than (or as cheap as) the cheapest transaction in the heap. If the transaction is underpriced, it is removed from the heap and the function returns true. Otherwise, the function returns false.

The `Reheap` function re-sorts the heap based on the current base fee. It first merges the urgent and floating heaps, then sorts the merged heap based on the effective tip of the transaction. If the base fee is not set, the heap is sorted based on the gas fee cap. If two transactions have the same effective tip, the one with the higher nonce is sorted first. Finally, the merged heap is split into the urgent and floating heaps based on their capacity ratio. The `pricedList` struct is used to track the prices of transactions in the transaction pool. It contains two heaps, `urgent` and `floating`, which are used to store transactions that are considered urgent and floating, respectively. The `all` field is a reference to the transaction pool, which is used to check whether a transaction is local or remote. The `stales` field is used to keep track of the number of stale transactions in the heap.

The `Underpriced` function checks whether a transaction is underpriced or not. It does this by checking whether the transaction is cheaper than (or as cheap as) the lowest priced (remote) transaction in both the `urgent` and `floating` heaps. If there are no remote transactions in either heap, the function returns false.

The `underpricedFor` function checks whether a transaction is cheaper than (or as cheap as) the lowest priced (remote) transaction in the given heap. It first discards any stale price points at the start of the heap. It then checks whether the transaction is underpriced or not. If there are no remote transactions in the heap, the function returns false.

The `Discard` function finds a number of most underpriced transactions, removes them from the priced list, and returns them for further removal from the entire pool. If noPending is set to true, it will only consider the floating list. The function first checks whether the `urgent` heap is larger than the `floating` heap. If it is, it pops the cheapest transaction from the `urgent` heap and moves it to the `floating` heap. If the `floating` heap is larger than the `urgent` heap, it pops the cheapest transaction from the `floating` heap and discards it. The function continues to do this until it has removed the desired number of transactions or until it can no longer make enough room for the new transaction. If it cannot make enough room for the new transaction and `force` is false, it returns false. Otherwise, it returns true.

The `Reheap` function forcibly rebuilds the heap based on the current remote transaction set. It first initializes the `stales` field to 0. It then creates a new `urgent` heap and adds all remote transactions to it. It then initializes the `floating` heap with the worst half of the transactions in the `urgent` heap. Finally, it balances out the two heaps by moving the worse half of transactions into the `floating` heap. ## Function: `Add`

This function adds a transaction to the priced list. It takes a transaction as input and returns a boolean value indicating whether the transaction was added successfully or not.

### Parameters

- `tx`: A pointer to a `types.Transaction` object representing the transaction to be added.

### Behavior

1. Calculates the gas price of the transaction.
2. Calculates the fee cap of the transaction.
3. Creates a new `pricedTransaction` object with the gas price, fee cap, and transaction.
4. Adds the `pricedTransaction` object to the appropriate list in the priced list.
5. Reheaps the list.

### Example

```go
tx := types.NewTransaction(...)
added := pricedList.Add(tx)
if !added {
    fmt.Println("Transaction not added to priced list.")
}
```

## Function: `Remove`

This function removes a transaction from the priced list. It takes a transaction hash as input and returns a boolean value indicating whether the transaction was removed successfully or not.

### Parameters

- `hash`: A pointer to a `common.Hash` object representing the hash of the transaction to be removed.

### Behavior

1. Searches for the `pricedTransaction` object with the given hash in the appropriate list in the priced list.
2. If the `pricedTransaction` object is found, removes it from the list.
3. Reheaps the list.
4. Returns a boolean value indicating whether the `pricedTransaction` object was found and removed successfully.

### Example

```go
hash := common.HexToHash("...")
removed := pricedList.Remove(&hash)
if !removed {
    fmt.Println("Transaction not found in priced list.")
}
```

## Function: `Reheap`

This function re-heaps the priced list. It is called after a transaction is added or removed from the list, or after the base fee is updated.

### Behavior

1. Clears the `floating` heap.
2. Adds all transactions from the `normal` and `priority` lists to the `floating` heap.
3. Reheaps the `floating` heap.

### Example

```go
pricedList.Reheap()
```

## Function: `SetBaseFee`

This function updates the base fee and triggers a re-heap. Note that `Remove` is not necessary to call right before `SetBaseFee` when processing a new block.

### Parameters

- `baseFee`: A pointer to a `big.Int` object representing the new base fee.

### Behavior

1. Updates the base fee of the `urgent` list.
2. Reheaps the priced list.

### Example

```go
baseFee := big.NewInt(...)
pricedList.SetBaseFee(baseFee)
```