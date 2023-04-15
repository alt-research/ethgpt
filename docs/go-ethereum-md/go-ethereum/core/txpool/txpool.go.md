# Transaction Pool

The `txpool` package provides a transaction pool implementation for Ethereum nodes. The transaction pool is responsible for managing incoming transactions, validating them, and storing them until they are included in a block by a miner.

## Constants

- `chainHeadChanSize`: The size of the channel listening to `ChainHeadEvent`.
- `txSlotSize`: Used to calculate how many data slots a single transaction takes up based on its size.
- `txMaxSize`: The maximum size a single transaction can have.

## Variables

- `ErrAlreadyKnown`: Returned if the transaction is already contained within the pool.
- `ErrInvalidSender`: Returned if the transaction contains an invalid signature.
- `ErrUnderpriced`: Returned if a transaction's gas price is below the minimum configured for the transaction pool.
- `ErrTxPoolOverflow`: Returned if the transaction pool is full and can't accept another remote transaction.
- `ErrReplaceUnderpriced`: Returned if a transaction is attempted to be replaced with a different one without the required price bump.
- `ErrGasLimit`: Returned if a transaction's requested gas limit exceeds the maximum allowance of the current block.
- `ErrNegativeValue`: A sanity error to ensure no one is able to specify a transaction with a negative value.
- `ErrOversizedData`: Returned if the input data of a transaction is greater than some meaningful limit a user might use.

## Functions

### NewTxPool

```go
func NewTxPool(config *params.ChainConfig, chain *core.BlockChain, state *state.StateDB, eventMux *event.TypeMux, txFeed event.Feed, scope metrics.Scope) *TxPool
```

`NewTxPool` creates a new transaction pool instance.

### TxPool

```go
type TxPool struct {
    // contains filtered or unexported fields
}
```

`TxPool` is the main struct for the transaction pool.

#### AddRemotes

```go
func (pool *TxPool) AddRemotes(txs []*types.Transaction) (added []*types.Transaction, rejected []*types.Transaction, err error)
```

`AddRemotes` adds a batch of remote transactions to the pool.

#### AddLocal

```go
func (pool *TxPool) AddLocal(tx *types.Transaction) error
```

`AddLocal` adds a local transaction to the pool.

#### Remove

```go
func (pool *TxPool) Remove(tx *types.Transaction, reason error)
```

`Remove` removes a transaction from the pool.

#### Pending

```go
func (pool *TxPool) Pending() []*types.Transaction
```

`Pending` returns all transactions currently in the pool.

#### PendingState

```go
func (pool *TxPool) PendingState() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
```

`PendingState` returns all transactions currently in the pool, grouped by sender and recipient.

#### PendingStats

```go
func (pool *TxPool) PendingStats() (int, uint64, uint64)
```

`PendingStats` returns the number of transactions, total gas usage, and total gas price of all transactions currently in the pool.

#### Content

```go
func (pool *TxPool) Content() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
```

`Content` returns all transactions currently in the pool, grouped by sender and recipient.

#### Reset

```go
func (pool *TxPool) Reset()
```

`Reset` resets the transaction pool.

#### Promote

```go
func (pool *TxPool) Promote()
```

`Promote` promotes all transactions from the future queue to the local queue if their time has come.

#### Stats

```go
func (pool *TxPool) Stats() (pending int, queued int, queuedGas uint64)
```

`Stats` returns the number of transactions currently in the pool, the number of transactions in the future queue, and the total gas usage of all transactions in the future queue.

#### Journal

```go
func (pool *TxPool) Journal() []*types.Transaction
```

`Journal` returns the list of transactions that were added to the pool since the last call to `Journal`.

#### SubscribeNewTxsEvent

```go
func (pool *TxPool) SubscribeNewTxsEvent(ch chan<- core.NewTxsEvent)
```

`SubscribeNewTxsEvent` subscribes to the `NewTxsEvent` event.

#### SubscribePendingEvent

```go
func (pool *TxPool) SubscribePendingEvent(ch chan<- core.PendingLogsEvent)
```

`SubscribePendingEvent` subscribes to the `PendingLogsEvent` event.

#### SubscribeChainHeadEvent

```go
func (pool *TxPool) SubscribeChainHeadEvent(ch chan<- core.ChainHeadEvent) event.Subscription
```

`SubscribeChainHeadEvent` subscribes to the `ChainHeadEvent` event.

#### Stop

```go
func (pool *TxPool) Stop()
```

`Stop` stops the transaction pool.

### NewTx

```go
func NewTx(nonce uint64, to common.Address, amount *big.Int, gasLimit uint64, gasPrice *big.Int, data []byte) *types.Transaction
```

`NewTx` creates a new transaction.

### ValidateTx

```go
func ValidateTx(tx *types.Transaction, config *params.ChainConfig, currentBlockNumber, currentGasLimit uint64, state *state.StateDB, txs types.Transactions) error
```

`ValidateTx` validates a transaction.

### ValidateNonce

```go
func ValidateNonce(sender common.Address, nonce uint64, state *state.StateDB) error
```

`ValidateNonce` validates a transaction nonce.

### ValidateTxValues

```go
func ValidateTxValues(tx *types.Transaction, config *params.ChainConfig, currentBlockNumber uint64) error
```

`ValidateTxValues` validates a transaction's values.

### ValidateTxGas

```go
func ValidateTxGas(tx *types.Transaction, config *params.ChainConfig, currentBlockNumber, currentGasLimit uint64, state *state.StateDB, txs types.Transactions) error
```

`ValidateTxGas` validates a transaction's gas.

### ValidateTxData

```go
func ValidateTxData(tx *types.Transaction, config *params.ChainConfig) error
```

`ValidateTxData` validates a transaction's data.

### ValidateTxGasPrice

```go
func ValidateTxGasPrice(tx *types.Transaction, config *params.ChainConfig) error
```

`ValidateTxGasPrice` validates a transaction's gas price.

### ValidateTxSignature

```go
func ValidateTxSignature(tx *types.Transaction, signer types.Signer, state *state.StateDB) error
```

`ValidateTxSignature` validates a transaction's signature.

### ValidateTxChainID

```go
func ValidateTxChainID(tx *types.Transaction, config *params.ChainConfig) error
```

`ValidateTxChainID` validates a transaction's chain ID.

### ValidateTxAccessList

```go
func ValidateTxAccessList(tx *types.Transaction, config *params.ChainConfig, state *state.StateDB) error
```

`ValidateTxAccessList` validates a transaction's access list. The provided source code is a Go implementation of a transaction pool for Ethereum. The transaction pool is responsible for managing pending and queued transactions, validating them, and broadcasting them to the network. The transaction pool is also responsible for evicting transactions that have been in the queue for too long.

The source code starts with the definition of two error variables, `ErrFutureReplacePending` and `ErrOverdraft`. The `ErrFutureReplacePending` error is returned when a transaction tries to replace a pending transaction that has not yet been included in a block. The `ErrOverdraft` error is returned when a transaction would cause the sender's balance to go negative.

The source code then defines three variables, `evictionInterval`, `statsReportInterval`, and `reheapTimer`, which are used to configure the transaction pool.

The source code then defines several metrics variables that are used to track the performance of the transaction pool. These metrics include the number of pending and queued transactions, the number of transactions that have been discarded, replaced, or dropped due to rate limiting or out-of-funds, and the number of known, valid, invalid, underpriced, and overflowed transactions.

The source code then defines the `TxStatus` type, which represents the current status of a transaction as seen by the pool. The `TxStatusUnknown` status indicates that the transaction is not known to the pool, the `TxStatusQueued` status indicates that the transaction is in the queue, the `TxStatusPending` status indicates that the transaction is pending, and the `TxStatusIncluded` status indicates that the transaction has been included in a block.

The source code then defines the `blockChain` interface, which provides the state of the blockchain and the current gas limit to do some pre-checks in the transaction pool and event subscribers.

The source code then defines the `Config` struct, which contains the configuration parameters of the transaction pool. The `Locals` field is a list of addresses that should be treated by default as local. The `NoLocals` field indicates whether local transaction handling should be disabled. The `Journal` field is the journal of local transactions.

Overall, the source code provides a solid implementation of a transaction pool for Ethereum, with well-defined error handling and performance metrics. The code is well-documented and easy to read, making it easy for other developers to understand and modify. The `TxPool` struct contains all currently known transactions. Transactions enter the pool when they are received from the network or submitted locally. They exit the pool when they are included in the blockchain. The pool separates processable transactions (which can be applied to the current state) and future transactions. Transactions move between those two states over time as they are received and processed.

The `Config` struct contains the default configurations for the transaction pool. The `sanitize` function checks the provided user configurations and changes anything that's unreasonable or unworkable. The `DefaultConfig` variable contains the default values for the `Config` struct.

The `TxPool` struct has the following fields:

- `config`: The configuration for the transaction pool.
- `chainconfig`: The configuration for the blockchain.
- `chain`: The blockchain.
- `gasPrice`: The current gas price.
- `txFeed`: The event feed for transactions.
- `scope`: The subscription scope for events.
- `signer`: The signer for transactions.
- `mu`: The mutex for locking the transaction pool.
- `istanbul`: The fork indicator whether we are in the Istanbul stage.
- `eip2718`: The fork indicator whether we are using EIP-2718 type transactions.
- `eip1559`: The fork indicator whether we are using EIP-1559.

The `Config` struct has the following fields:

- `Journal`: The file name for the transaction journal.
- `Rejournal`: The time interval to regenerate the local transaction journal.
- `PriceLimit`: The minimum gas price to enforce for acceptance into the pool.
- `PriceBump`: The minimum price bump percentage to replace an already existing transaction (nonce).
- `AccountSlots`: The number of executable transaction slots guaranteed per account.
- `GlobalSlots`: The maximum number of executable transaction slots for all accounts.
- `AccountQueue`: The maximum number of non-executable transaction slots permitted per account.
- `GlobalQueue`: The maximum number of non-executable transaction slots for all accounts.
- `Lifetime`: The maximum amount of time non-executable transactions are queued.

The `sanitize` function checks the provided user configurations and changes anything that's unreasonable or unworkable. It returns a `Config` struct with the sanitized values.

Here is an example of how you can document the `TxPool` struct in Markdown format:

## TxPool

This struct contains all currently known transactions. Transactions enter the pool when they are received from the network or submitted locally. They exit the pool when they are included in the blockchain. The pool separates processable transactions (which can be applied to the current state) and future transactions. Transactions move between those two states over time as they are received and processed.

### Fields

- `config`: The configuration for the transaction pool.
- `chainconfig`: The configuration for the blockchain.
- `chain`: The blockchain.
- `gasPrice`: The current gas price.
- `txFeed`: The event feed for transactions.
- `scope`: The subscription scope for events.
- `signer`: The signer for transactions.
- `mu`: The mutex for locking the transaction pool.
- `istanbul`: The fork indicator whether we are in the Istanbul stage.
- `eip2718`: The fork indicator whether we are using EIP-2718 type transactions.
- `eip1559`: The fork indicator whether we are using EIP-1559.

### Example

```go
type TxPool struct {
	config      Config
	chainconfig *params.ChainConfig
	chain       blockChain
	gasPrice    *big.Int
	txFeed      event.Feed
	scope       event.SubscriptionScope
	signer      types.Signer
	mu          sync.RWMutex

	istanbul atomic.Bool // Fork indicator whether we are in the Istanbul stage.
	eip2718  atomic.Bool // Fork indicator whether we are using EIP-2718 type transactions.
	eip1559  atomic.Bool // Fork indicator whether we are using EIP-1559.
}
``` # TxPool

`TxPool` is a Go package that provides a transaction pool to gather, sort, and filter inbound transactions from the network. It is used in Ethereum nodes to manage transactions before they are included in a block.

## Functions

### NewTxPool

```go
func NewTxPool(config Config, chainconfig *params.ChainConfig, chain blockChain) *TxPool
```

`NewTxPool` creates a new transaction pool with the given configuration, chain configuration, and blockchain. It returns a pointer to the new `TxPool`.

### AddRemotes

```go
func (pool *TxPool) AddRemotes(accounts []common.Address)
```

`AddRemotes` adds the given remote accounts to the transaction pool. Remote accounts are accounts that are not controlled by the local node.

### AddLocals

```go
func (pool *TxPool) AddLocals(accounts []common.Address)
```

`AddLocals` adds the given local accounts to the transaction pool. Local accounts are accounts that are controlled by the local node.

### Add

```go
func (pool *TxPool) Add(tx *types.Transaction) error
```

`Add` adds the given transaction to the transaction pool. It returns an error if the transaction is invalid or if it fails to meet the transaction pool's requirements.

### Remove

```go
func (pool *TxPool) Remove(tx *types.Transaction, reason RemoveReason)
```

`Remove` removes the given transaction from the transaction pool for the given reason.

### Promote

```go
func (pool *TxPool) Promote(accounts []common.Address)
```

`Promote` promotes the given accounts to local accounts. Promoted accounts are moved from the remote account set to the local account set.

### Journal

```go
func (pool *TxPool) Journal() *txJournal
```

`Journal` returns the transaction pool's journal. The journal is used to store local transactions to disk.

### Stats

```go
func (pool *TxPool) Stats() (pending int, queued int)
```

`Stats` returns the number of pending and queued transactions in the transaction pool.

### Content

```go
func (pool *TxPool) Content() (map[common.Address]types.Transactions, map[common.Address]types.Transactions)
```

`Content` returns the current contents of the transaction pool. It returns two maps: one for pending transactions and one for queued transactions. The keys of the maps are the addresses of the accounts that have transactions in the pool.

### Reset

```go
func (pool *TxPool) Reset() error
```

`Reset` resets the transaction pool to its initial state. It removes all transactions from the pool and resets the nonce tracking.

### Stop

```go
func (pool *TxPool) Stop()
```

`Stop` stops the transaction pool's event loop and cleans up its resources. It should be called before the transaction pool is discarded. ## TxPool

The `TxPool` struct represents a transaction pool in an Ethereum node. It manages the transactions that are waiting to be included in a block and provides an interface for adding, removing, and querying transactions.

### loop

The `loop` function is a goroutine that runs in the background and handles various events related to the transaction pool. It listens for chain head events, system shutdown events, stats reporting ticks, inactive account transaction eviction ticks, and local transaction journal rotation ticks. It also notifies tests that the initialization phase is done.

### Stop

The `Stop` function terminates the transaction pool. It unsubscribes all subscriptions registered from the transaction pool and blockchain, waits for all goroutines to finish, and closes the local transaction journal if it exists.

### SubscribeNewTxsEvent

The `SubscribeNewTxsEvent` function registers a subscription of `NewTxsEvent` and starts sending events to the given channel. It returns an `event.Subscription` object that can be used to unsubscribe from the event.

### GasPrice

The `GasPrice` function returns the current gas price enforced by the transaction pool.

### SetGasPrice

The `SetGasPrice` function updates the minimum price required by the transaction pool for a new transaction and drops all transactions below this threshold. It removes transactions below the new threshold from the `pool.all` and `pool.priced` data structures.

### Nonce

The `Nonce` function returns the next nonce of an account, with the given address. It returns an error if the account does not exist in the transaction pool.

### Pending

The `Pending` function returns a list of all pending transactions in the transaction pool.

### PendingAt

The `PendingAt` function returns a list of all pending transactions in the transaction pool at a given block number.

### Get

The `Get` function returns a transaction with the given hash from the transaction pool. It returns an error if the transaction does not exist in the transaction pool.

### Add

The `Add` function adds a transaction to the transaction pool. It validates the transaction and adds it to the `pool.all`, `pool.locals`, and `pool.queue` data structures. It also broadcasts a `NewTxsEvent` to all subscribers.

### Remove

The `Remove` function removes a transaction with the given hash from the transaction pool. It removes the transaction from the `pool.all`, `pool.locals`, and `pool.queue` data structures. It also broadcasts a `RemovedTxEvent` to all subscribers.

### Reset

The `Reset` function resets the transaction pool to a new chain head. It removes all transactions from the `pool.all`, `pool.locals`, and `pool.queue` data structures that are not included in the new chain head. It also broadcasts a `ResetEvent` to all subscribers.

### Stats

The `Stats` function returns the number of executable and queued transactions in the transaction pool. It also returns the number of stales transactions in the `pool.priced` data structure.

### Promote

The `Promote` function promotes a transaction with the given hash to the front of the queue for its account. It removes the transaction from the `pool.queue` data structure and adds it to the `pool.locals` data structure. It also broadcasts a `PromoteEvent` to all subscribers.

### Price

The `Price` function returns the minimum gas price required by the transaction pool for a new transaction. It is equivalent to calling `GasPrice`.

### Journal

The `Journal` function returns the local transaction journal of the transaction pool. It returns `nil` if the local transaction journal is not enabled.

### LocalNonce

The `LocalNonce` function returns the next nonce of an account, with the given address, in the local transaction pool. It returns an error if the account does not exist in the local transaction pool. ## TxPool

The `TxPool` struct represents a transaction pool that holds all the pending and queued transactions. It provides methods to add, remove, and retrieve transactions from the pool.

### Fields

- `mu`: A mutex used to synchronize access to the pool.
- `journal`: A journal used to record all the transactions added to the pool.
- `pending`: A map that holds all the pending transactions, grouped by the origin account.
- `queue`: A map that holds all the queued transactions, grouped by the origin account.
- `locals`: A set that holds all the accounts considered local by the pool.
- `priced`: A priced transaction queue used to sort the transactions by gas price.
- `pendingNonces`: A map that holds the next nonce for each account.

### Add

The `Add` method adds a transaction to the pool. It first checks if the transaction is valid and then adds it to the pending or queued list depending on its gas price.

### Remove

The `Remove` method removes a transaction from the pool. It first checks if the transaction is in the pending or queued list and then removes it.

### Promote

The `Promote` method promotes a queued transaction to the pending list. It first checks if the transaction is in the queued list and then moves it to the pending list.

### Reprice

The `Reprice` method changes the gas price of a transaction in the pool. It first checks if the transaction is in the pending or queued list and then changes its gas price.

### Nonce

The `Nonce` method retrieves the next nonce for an account. It returns the next nonce for the account based on the pending transactions in the pool.

### Stats

The `Stats` method retrieves the current pool stats, namely the number of pending and the number of queued (non-executable) transactions.

### stats

The `stats` method retrieves the current pool stats, namely the number of pending and the number of queued (non-executable) transactions.

### Content

The `Content` method retrieves the data content of the transaction pool, returning all the pending as well as queued transactions, grouped by account and sorted by nonce.

### ContentFrom

The `ContentFrom` method retrieves the data content of the transaction pool, returning the pending as well as queued transactions of this address, grouped by nonce.

### Pending

The `Pending` method retrieves all currently processable transactions, grouped by origin account and sorted by nonce. The returned transaction set is a copy and can be freely modified by calling code.

### Locals

The `Locals` method retrieves the accounts currently considered local by the pool.

### local

The `local` method retrieves all currently known local transactions, grouped by origin account and sorted by nonce. The returned transaction set is a copy and can be freely modified by calling code. The `TxPool` struct represents a transaction pool that holds transactions that are waiting to be included in a block. The `TxPool` struct has several methods that are used to validate and add transactions to the pool.

The `validateTxBasics` function is used to check whether a transaction is valid according to the consensus rules, but does not check state-dependent validation such as sufficient balance. This check is meant as an early check which only needs to be performed once, and does not require the pool mutex to be held. The function checks whether the transaction is a legacy transaction or a dynamic fee transaction, whether the transaction size is within the defined limit, whether the init code size has been exceeded, whether the transaction value is negative, whether the transaction gas limit is within the current block limit gas, whether the gas fee cap is greater than or equal to the gas tip cap, and whether the transaction is signed properly.

The `validateTx` function is used to check whether a transaction is valid according to the consensus rules and adheres to some heuristic limits of the local node (price and size). The function checks whether the transaction adheres to nonce ordering, whether the transactor has enough funds to cover the costs, and whether replacing transactions will not result in overdraft.

The `add` function is used to validate a transaction and insert it into the non-executable queue for future inclusion in a block. The function first validates the transaction using the `validateTxBasics` and `validateTx` functions. If the transaction is valid, it is added to the pending transaction list for the sender. If the sender already has pending transactions, the function checks whether replacing transactions will result in overdraft. If the transaction is not valid, an error is returned.

The `addLocal` function is used to add a local transaction to the pool. The function first validates the transaction using the `validateTxBasics` and `validateTx` functions. If the transaction is valid, it is added to the local transaction list for the sender. If the sender already has local transactions, the function checks whether replacing transactions will result in overdraft. If the transaction is not valid, an error is returned.

The `addRemotes` function is used to add remote transactions to the pool. The function first validates each transaction using the `validateTxBasics` and `validateTx` functions. If a transaction is valid, it is added to the remote transaction list for the sender. If the sender already has remote transactions, the function checks whether replacing transactions will result in overdraft. If a transaction is not valid, it is skipped.

The `removeTx` function is used to remove a transaction from the pool. The function first removes the transaction from the pending transaction list for the sender. If the transaction is not found in the pending transaction list, the function removes the transaction from the local transaction list for the sender. If the transaction is not found in the local transaction list, the function removes the transaction from the remote transaction list for the sender. If the transaction is not found in any of the lists, an error is returned.

The `pending` field is a map that holds the pending transactions for each sender. The `local` field is a map that holds the local transactions for each sender. The `remote` field is a map that holds the remote transactions for each sender. The `signer` field is a signer used to verify transaction signatures. The `currentState` field is the current state of the blockchain. The `currentMaxGas` field is the maximum gas limit for the current block. The `gasPrice` field is the minimum gas price accepted by the pool. The `istanbul` field is a flag that indicates whether the Istanbul hard fork is active. The `shanghai` field is a flag that indicates whether the Shanghai hard fork is active. The `eip1559` field is a flag that indicates whether the EIP-1559 proposal is active. The `eip2718` field is a flag that indicates whether the EIP-2718 proposal is active. ## TxPool

The `TxPool` struct represents a transaction pool that holds pending transactions. It is used to validate and store transactions before they are included in a block. The `TxPool` struct has the following fields:

- `all`: A `txlookup` object that holds all transactions in the pool.
- `locals`: A `localList` object that holds all local transactions in the pool.
- `pending`: A map that holds all pending transactions in the pool, keyed by the sender's address.
- `priced`: A `pricedPriorityQueue` object that holds all priced transactions in the pool.
- `config`: A `params.TxPoolConfig` object that holds the configuration for the transaction pool.
- `signer`: A `types.Signer` object that is used to sign transactions.

### add

The `add` function adds a transaction to the transaction pool. If the transaction is already known, it is discarded. If the transaction fails basic validation, it is discarded. If the transaction pool is full, underpriced transactions are discarded. If the new transaction is better than the worst transaction in the pool, the worst transaction is replaced. If the new transaction is a future transaction, it replaces pending transactions.

#### Parameters

- `tx`: A `types.Transaction` object representing the transaction to add.
- `local`: A boolean indicating whether the transaction is local.

#### Return Values

- `replaced`: A boolean indicating whether the transaction replaced another transaction.
- `err`: An error indicating why the transaction was not added to the pool.

### validateTx

The `validateTx` function validates a transaction. It checks that the transaction is not too large, that it has a valid signature, and that it has a valid gas price.

#### Parameters

- `tx`: A `types.Transaction` object representing the transaction to validate.
- `isLocal`: A boolean indicating whether the transaction is local.

#### Return Values

- `err`: An error indicating why the transaction is invalid.

### removeTx

The `removeTx` function removes a transaction from the transaction pool.

#### Parameters

- `hash`: A `common.Hash` object representing the hash of the transaction to remove.
- `local`: A boolean indicating whether the transaction is local.

#### Return Values

- `dropped`: An integer indicating how many transactions were removed from the pool.

### isGapped

The `isGapped` function checks whether a transaction is a future transaction.

#### Parameters

- `from`: A `common.Address` object representing the sender's address.
- `tx`: A `types.Transaction` object representing the transaction to check.

#### Return Values

- `bool`: A boolean indicating whether the transaction is a future transaction. ## Place Transaction in Pending Pool

This function is used to place an existing transaction in the pending pool. It takes a transaction hash, transaction object, a boolean value indicating whether the transaction is local, and a boolean value indicating whether to add all transactions. It returns a boolean value indicating whether the transaction was replaced and an error if any.

If the transaction is already pending, the function checks if the required price bump is met. If the required price bump is not met, the function returns an error. If the required price bump is met, the function replaces the old transaction with the new one.

If the transaction is not replacing a pending one, the function pushes it into the queue. If the transaction is local and not already in the local list, the function adds it to the local list. If the transaction is local, the function increments the local gauge. The function then journals the transaction and returns the replaced boolean value and nil error.

## isGapped

This function reports whether the given transaction is immediately executable. It takes an address and a transaction object and returns a boolean value.

If the transaction matches the pending nonce and can be promoted to the pending list as an executable transaction, the function returns false. If the transaction has a nonce gap with the pending list, the function checks if transactions in the queue can fill up the nonce gap. If transactions in the queue can fill up the nonce gap, the function returns false. Otherwise, the function returns true.

## enqueueTx

This function inserts a new transaction into the non-executable transaction queue. It takes a transaction hash, transaction object, a boolean value indicating whether the transaction is local, and a boolean value indicating whether to add all transactions. It returns a boolean value indicating whether the transaction was replaced and an error if any.

The function tries to insert the transaction into the future queue. If an older transaction was better, the function returns an error. If a previous transaction was discarded, the function removes it and marks the new transaction. If the transaction is not in the lookup set but is expected to be there, the function shows an error log. The function then adds the transaction to the all and priced sets. If the heartbeat is not recorded, the function records it. The function then returns the replaced boolean value and nil error.

## journalTx

This function adds the specified transaction to the local disk journal if it is deemed to have been sent from a local account. It takes an address and a transaction object and returns nothing. The function journals the transaction if it is deemed to have been sent from a local account. This codebase is a transaction pool implementation in Go. The transaction pool is responsible for managing the transactions that are waiting to be included in the next block. The codebase contains several functions that add transactions to the pool, promote transactions from the pending list to the processable list, and journal transactions.

The `journalTx` function journals a local transaction if journaling is enabled and the transaction is local. The function inserts the transaction into the journal and logs a warning if the insertion fails.

The `promoteTx` function adds a transaction to the pending list of transactions and returns whether it was inserted or an older transaction was better. The function assumes that the pool lock is held. The function tries to insert the transaction into the pending queue and discards the transaction if an older transaction was better. If the transaction was inserted, the function discards any previous transaction and marks the new transaction. The function sets the potentially new pending nonce and notifies any subsystems of the new transaction. The function returns true if the promotion was successful.

The `AddLocals` function enqueues a batch of transactions into the pool if they are valid, marking the senders as local ones, ensuring they go around the local pricing constraints. The function is used to add transactions from the RPC API and performs synchronous pool reorganization and event propagation. The function returns an array of errors.

The `AddLocal` function enqueues a single local transaction into the pool if it is valid. This is a convenience wrapper around `AddLocals`.

The `AddRemotes` function enqueues a batch of transactions into the pool if they are valid. If the senders are not among the locally tracked ones, full pricing constraints will apply. The function is used to add transactions from the p2p network and does not wait for pool reorganization and internal event propagation. The function returns an array of errors.

The `AddRemotesSync` function is like `AddRemotes`, but waits for pool reorganization. Tests use this method. The function returns an array of errors.

The `addRemoteSync` function is like `AddRemotes` with a single transaction, but waits for pool reorganization. Tests use this method. The function returns an error.

The `AddRemote` function enqueues a single transaction into the pool if it is valid. This is a convenience wrapper around `AddRemotes`. The function is deprecated, and `AddRemotes` should be used instead.

The `addTxs` function attempts to queue a batch of transactions if they are valid. The function filters out known transactions without obtaining the pool lock or recovering signatures. The function returns an array of errors and an array of new transactions. The code provided is a Go implementation of a transaction pool for Ethereum. The transaction pool is responsible for managing transactions that have not yet been included in a block. The pool is used to validate transactions, store them, and broadcast them to other nodes in the network.

The `TxPool` struct represents the transaction pool. It contains several fields, including a map of pending transactions, a map of queued transactions, and a set of all transactions in the pool. The `TxPool` struct also contains a mutex to ensure thread safety.

The `add` function is used to add a transaction to the pool. It first checks if the transaction is already in the pool and returns an error if it is. It then validates the transaction and returns an error if it is invalid. If the transaction is valid, it is added to the pool.

The `addTxs` function is used to add a batch of transactions to the pool. It calls the `add` function for each transaction in the batch and returns a slice of errors indicating which transactions were successfully added and which ones failed.

The `removeTx` function is used to remove a single transaction from the pool. It first fetches the transaction from the pool using its hash. If the transaction is not in the pool, it returns 0. If the transaction is in the pool, it is removed from the pool and from the list of pending transactions. The function returns the number of transactions removed from the pending queue.

The `Status` function is used to get the status of a batch of transactions identified by their hashes. It returns a slice of `TxStatus` values indicating whether each transaction is pending, queued, or unknown.

The `Get` function is used to get a transaction from the pool using its hash. It returns the transaction if it is in the pool and nil otherwise.

The `Has` function is used to check if a transaction with a given hash is in the pool. It returns true if the transaction is in the pool and false otherwise.

The `addTxsLocked` function is used to add a batch of transactions to the pool while holding the transaction pool lock. It calls the `add` function for each transaction in the batch and returns a slice of errors indicating which transactions were successfully added and which ones failed. It also returns a set of accounts that were modified by the new transactions.

The `validateTxBasics` function is used to validate the basic properties of a transaction, such as its signature and intrinsic gas. It returns an error if the transaction is invalid and nil otherwise.

Overall, the transaction pool is an important component of the Ethereum network. It ensures that transactions are validated and stored before they are included in a block, which helps to prevent double-spending and other types of fraud. The Go implementation of the transaction pool is well-documented and easy to understand, making it a valuable resource for developers working on Ethereum-related projects. ## TxPool

The `TxPool` struct represents a transaction pool in an Ethereum node. It contains a set of pending transactions, a set of queued transactions, and a set of accounts with pending nonces. It also has channels for requesting a pool reset and transaction promotion checks.

### Functions

#### NewTxPool

```go
func NewTxPool(config *params.ChainConfig, txSigner types.Signer, txValidator TxValidator, gasPrice oracle.Oracle, chainID *big.Int, enableNonceGap bool) *TxPool
```

The `NewTxPool` function creates a new transaction pool with the given configuration, transaction signer, transaction validator, gas price oracle, chain ID, and nonce gap enablement. It returns a pointer to the new `TxPool` struct.

#### AddRemotes

```go
func (pool *TxPool) AddRemotes(remotes []*ethclient.Client)
```

The `AddRemotes` function adds the given remote Ethereum clients to the transaction pool. It sets up a listener for new blocks and transactions from each client.

#### AddLocal

```go
func (pool *TxPool) AddLocal(tx *types.Transaction) error
```

The `AddLocal` function adds the given local transaction to the transaction pool. It validates the transaction and adds it to the pending transactions set. It returns an error if the transaction is invalid.

#### AddRemote

```go
func (pool *TxPool) AddRemote(tx *types.Transaction) error
```

The `AddRemote` function adds the given remote transaction to the transaction pool. It validates the transaction and adds it to the queued transactions set. It returns an error if the transaction is invalid.

#### Remove

```go
func (pool *TxPool) Remove(tx *types.Transaction, local bool) bool
```

The `Remove` function removes the given transaction from the transaction pool. If the transaction is in the pending transactions set, it is removed and the pending nonces set is updated. If the transaction is in the queued transactions set, it is removed. If `local` is true, the transaction is only removed from the pending transactions set. If `local` is false, the transaction is only removed from the queued transactions set. If the transaction is not found in either set, the function returns false. If the transaction is removed, the function returns true.

#### requestReset

```go
func (pool *TxPool) requestReset(oldHead *types.Header, newHead *types.Header) chan struct{}
```

The `requestReset` function requests a pool reset to the new head block. The returned channel is closed when the reset has occurred.

#### requestPromoteExecutables

```go
func (pool *TxPool) requestPromoteExecutables(set *accountSet) chan struct{}
```

The `requestPromoteExecutables` function requests transaction promotion checks for the given addresses. The returned channel is closed when the promotion checks have occurred.

#### queueTxEvent

```go
func (pool *TxPool) queueTxEvent(tx *types.Transaction)
```

The `queueTxEvent` function enqueues a transaction event to be sent in the next reorg run.

#### scheduleReorgLoop

```go
func (pool *TxPool) scheduleReorgLoop()
```

The `scheduleReorgLoop` function schedules runs of reset and promoteExecutables. Code above should not call those methods directly, but request them being run using `requestReset` and `requestPromoteExecutables` instead.

#### runReorg

```go
func (pool *TxPool) runReorg(done chan struct{}, reset *txpoolResetRequest, dirtyAccounts *accountSet, events map[common.Address]*sortedMap)
```

The `runReorg` function runs reset and promoteExecutables on behalf of `scheduleReorgLoop`. The `TxPool` struct is a transaction pool that holds pending transactions that have not yet been included in a block. The `TxPool` struct has several methods that are used to manage the pool of pending transactions.

The `addRemotes` function is used to add transactions to the pool that were received from remote nodes. The function takes a list of transactions and a set of dirty accounts as input. The dirty accounts are accounts that have pending transactions in the pool. The function promotes the dirty accounts to the front of the transaction queue and then checks for pending transactions for each account that sent new ones. The function then validates the pool of pending transactions and removes any transaction that has been included in a block or was invalidated because of another transaction. Finally, the function notifies subsystems for newly added transactions.

The `reset` function retrieves the current state of the blockchain and ensures the content of the transaction pool is valid with regard to the chain state. If the pool is being reset due to a reorg, the function reinjects all dropped transactions. If the reorg is too deep, the function skips the reorg. If the reorg is shallow enough, the function pulls in all transactions into memory and discards any transactions that were not included in the new chain.

Overall, the `TxPool` struct and its methods are used to manage the pool of pending transactions and ensure that the pool is valid with regard to the current state of the blockchain. The `TxPool` struct is a transaction pool that holds pending transactions that have not yet been included in a block. It is responsible for managing the transactions and ensuring that they are valid and executable. The `TxPool` struct has several functions that are used to manage the transactions.

The `addTxs` function is used to add transactions to the transaction pool. It takes a list of transactions and a flag indicating whether the transactions are local or remote. The function first checks if the transactions are valid and executable. If they are, the transactions are added to the transaction pool.

The `removeTxs` function is used to remove transactions from the transaction pool. It takes a list of transactions and removes them from the transaction pool.

The `reset` function is used to reset the transaction pool. It is called when there is a chain reorganization or when a new block is added to the chain. The function first checks if there was a chain reorganization. If there was, it removes any transactions that were invalidated by the reorganization. It then updates the internal state of the transaction pool to the current head of the chain. Finally, it injects any transactions that were discarded due to the reorganization.

The `promoteExecutables` function is used to move transactions that have become processable from the future queue to the set of pending transactions. During this process, all invalidated transactions (low nonce, low balance) are deleted.

Here is an example of how you can document the `addTxs` function in Markdown format:

## addTxs

This function is used to add transactions to the transaction pool.

### Parameters

- `txs`: A list of transactions to add to the transaction pool.
- `local`: A flag indicating whether the transactions are local or remote.

### Behavior

1. Checks if the transactions are valid and executable.
2. If the transactions are valid and executable, adds them to the transaction pool.

### Example

```go
func (pool *TxPool) addTxs(txs []*types.Transaction, local bool) error {
	// Filter out any transactions that are already in the pool
	txs = types.Transactions(types.TxDifference(txs, pool.getPendingTransactions()))

	// Filter out any transactions that are invalid or non-executable
	validTxs, err := pool.validateTransactions(txs, local)
	if err != nil {
		return err
	}

	// Add the valid transactions to the transaction pool
	pool.addTxsLocked(validTxs, local)

	return nil
}
``` The `truncatePending` function is used to remove transactions from the pending queue if the pool is above the pending limit. The algorithm tries to reduce transaction counts by an approximately equal number for all accounts with many pending transactions.

The function first calculates the total number of pending transactions in the pool. If the number of pending transactions is less than or equal to the global slots limit, the function returns without doing anything.

If the number of pending transactions is greater than the global slots limit, the function assembles a spam order to penalize large transactors first. It creates a priority queue of addresses with the number of pending transactions as the priority. It then retrieves the next offender if not a local address and appends it to the offenders list.

The function then equalizes balances until all are the same or below the threshold. If there are more than one offender, the function calculates the equalization threshold for all current offenders. It then iteratively reduces all offenders until below the limit or threshold reached.

For each offender, the function drops transactions until the number of pending transactions is below the limit or the threshold is reached. It drops the transaction from the global pools and updates the account nonce to the dropped transaction. It then removes the dropped transactions from the priced pool and decrements the pending gauge. If the offender is a local address, it also decrements the local gauge.

Here is an example of how you can document the `truncatePending` function in Markdown format:

## truncatePending

This function removes transactions from the pending queue if the pool is above the pending limit. The algorithm tries to reduce transaction counts by an approximately equal number for all accounts with many pending transactions.

### Behavior

1. Calculates the total number of pending transactions in the pool.
2. If the number of pending transactions is less than or equal to the global slots limit, the function returns without doing anything.
3. If the number of pending transactions is greater than the global slots limit, the function assembles a spam order to penalize large transactors first.
4. Retrieves the next offender if not a local address and appends it to the offenders list.
5. Equalizes balances until all are the same or below the threshold.
6. If there are more than one offender, the function calculates the equalization threshold for all current offenders.
7. Iteratively reduces all offenders until below the limit or threshold reached.
8. For each offender, the function drops transactions until the number of pending transactions is below the limit or the threshold is reached.
9. Drops the transaction from the global pools and updates the account nonce to the dropped transaction.
10. Removes the dropped transactions from the priced pool and decrements the pending gauge.
11. If the offender is a local address, it also decrements the local gauge.

### Example

```go
func (pool *TxPool) truncatePending() {
	pending := uint64(0)
	for _, list := range pool.pending {
		pending += uint64(list.Len())
	}
	if pending <= pool.config.GlobalSlots {
		return
	}

	pendingBeforeCap := pending
	// Assemble a spam order to penalize large transactors first
	spammers := prque.New[int64, common.Address](nil)
	for addr, list := range pool.pending {
		// Only evict transactions from high rollers
		if !pool.locals.contains(addr) && uint64(list.Len()) > pool.config.AccountSlots {
			spammers.Push(addr, int64(list.Len()))
		}
	}
	// Gradually drop transactions from offenders
	offenders := []common.Address{}
	for pending > pool.config.GlobalSlots && !spammers.Empty() {
		// Retrieve the next offender if not local address
		offender, _ := spammers.Pop()
		offenders = append(offenders, offender)

		// Equalize balances until all are the same or below threshold
		if len(offenders) > 1 {
			// Calculate the equalization threshold for all current offenders
			threshold := pool.pending[offender].Len()

			// Iteratively reduce all offenders until below limit or threshold reached
			for pending > pool.config.GlobalSlots && pool.pending[offenders[len(offenders)-2]].Len() > threshold {
				for i := 0; i < len(offenders)-1; i++ {
					list := pool.pending[offenders[i]]

					caps := list.Cap(list.Len() - 1)
					for _, tx := range caps {
						// Drop the transaction from the global pools too
						hash := tx.Hash()
						pool.all.Remove(hash)

						// Update the account nonce to the dropped transaction
						pool.pendingNonces.setIfLower(offenders[i], tx.Nonce())
						log.Trace("Removed fairness-exceeding pending transaction", "hash", hash)
					}
					pool.priced.Removed(len(caps))
					pendingGauge.Dec(int64(len(caps)))
					if pool.locals.contains(offenders[i]) {
						localGauge.Dec(int64(len(caps)))
					}
				}
			}
		}
	}
}
``` The `TxPool` struct is a transaction pool that holds transactions that are waiting to be included in a block. It is responsible for managing the transactions and ensuring that they are valid and executable.

The `addTx` function adds a transaction to the pool. It first checks if the transaction is already in the pool, and if so, it returns an error. If the transaction is not in the pool, it checks if the transaction is valid and executable. If the transaction is valid and executable, it adds the transaction to the pool and updates the pool's state.

The `removeTx` function removes a transaction from the pool. It first checks if the transaction is in the pool, and if so, it removes the transaction from the pool and updates the pool's state.

The `promote` function promotes transactions from the future queue to the executable/pending queue. It first checks if the transaction is executable, and if so, it moves the transaction from the future queue to the executable/pending queue.

The `prune` function removes old transactions from the pool. It first checks if the transaction is too old, and if so, it removes the transaction from the pool and updates the pool's state.

The `content` function returns a list of transactions in the pool. It returns a list of transactions in the executable/pending queue, the future queue, and the local queue.

The `pending` function returns a list of transactions in the executable/pending queue.

The `pendingByPrice` function returns a list of transactions in the executable/pending queue sorted by price.

The `pendingByNonce` function returns a list of transactions in the executable/pending queue sorted by nonce.

The `queueContent` function returns a list of transactions in the future queue.

The `localsContent` function returns a list of transactions in the local queue.

The `resetLocal` function removes all transactions from the local queue.

The `resetAll` function removes all transactions from the pool.

The `stats` function returns statistics about the pool, including the number of transactions in the pool, the number of transactions in the executable/pending queue, the number of transactions in the future queue, and the number of transactions in the local queue.

The `promoteLoop` function is a goroutine that continuously promotes transactions from the future queue to the executable/pending queue.

The `pruneLoop` function is a goroutine that continuously removes old transactions from the pool.

The `truncatePool` function removes transactions from the pool if the pool is above the global pool limit.

The `truncateQueue` function drops the oldest transactions in the queue if the pool is above the global queue limit.

The `demoteUnexecutables` function removes invalid and processed transactions from the pools executable/pending queue and any subsequent transactions that become unexecutable are moved back into the future queue. This codebase is the implementation of a transaction pool for Ethereum. The transaction pool is responsible for managing pending transactions and ensuring that they are valid before they are included in a block. The codebase is written in Go.

The `TxPool` struct is the main struct that represents the transaction pool. It contains a list of pending transactions, a list of local transactions, and a list of queued transactions. It also contains a set of accounts that are allowed to send transactions and a set of accounts that are not allowed to send transactions.

The `add` function is used to add a new transaction to the transaction pool. It first checks if the transaction is valid and if the sender is allowed to send transactions. If the transaction is valid and the sender is allowed to send transactions, it is added to the pending transaction list.

The `addLocal` function is used to add a new local transaction to the transaction pool. Local transactions are transactions that are generated by the node itself. The function first checks if the transaction is valid and if the sender is allowed to send transactions. If the transaction is valid and the sender is allowed to send transactions, it is added to the local transaction list.

The `addRemotes` function is used to add new remote transactions to the transaction pool. Remote transactions are transactions that are received from other nodes. The function first checks if the transactions are valid and if the senders are allowed to send transactions. If the transactions are valid and the senders are allowed to send transactions, they are added to the queued transaction list.

The `promote` function is used to promote a local transaction to a pending transaction. It first checks if the transaction is still valid and if the sender is still allowed to send transactions. If the transaction is still valid and the sender is still allowed to send transactions, it is moved from the local transaction list to the pending transaction list.

The `remove` function is used to remove a transaction from the transaction pool. It first checks if the transaction is in the pending transaction list, the local transaction list, or the queued transaction list. If the transaction is found, it is removed from the corresponding list.

The `content` function is used to get the list of pending transactions. It returns a list of transactions sorted by their gas price.

The `journal` function is used to get the list of local transactions. It returns a list of transactions sorted by their nonce.

The `reset` function is used to reset the transaction pool. It clears all the pending transactions, local transactions, and queued transactions.

The `addressByHeartbeat` struct is used to represent an account address tagged with its last activity timestamp. The `addressesByHeartbeat` type is a slice of `addressByHeartbeat` structs that implements the `sort.Interface` interface. It is used to sort a list of account addresses by their last activity timestamp.

The `accountSet` struct is used to represent a set of account addresses. It contains a map of account addresses and a signer capable of deriving addresses from transactions. The `newAccountSet` function is used to create a new account set with an associated signer for sender derivations. The `contains` function is used to check if a given address is contained within the set. The `containsTx` function is used to check if the sender of a given transaction is within the set. The `add` function is used to insert a new address into the set to track. The `addTx` function is used to add the sender of a transaction into the set. The `flatten` function is used to return the list of addresses within the set. The `merge` function is used to add all addresses from another set into the current set.

Overall, this codebase provides a robust implementation of a transaction pool for Ethereum. The code is well-organized and easy to read, with clear and concise function names and comments. The use of Go's built-in concurrency features ensures that the transaction pool can handle a large number of transactions efficiently. The `lookup` type is a struct that is used to store and manage transactions in the transaction pool. It is used to peek into the pool in `TxPool.Get` without having to acquire the widely scoped `TxPool.mu` mutex. The `lookup` type combines the notion of "local transactions", which is useful to build upper-level structure.

The `newLookup` function returns a new `lookup` structure with empty `locals` and `remotes` maps.

The `Range` method calls the callback function `f` on each key and value present in the map. The callback function should return the indicator whether the iteration needs to be continued. Callers need to specify which set (or both) to be iterated.

The `Get` method returns a transaction if it exists in the lookup, or nil if not found.

The `GetLocal` method returns a local transaction if it exists in the lookup, or nil if not found.

The `GetRemote` method returns a remote transaction if it exists in the lookup, or nil if not found.

The `Count` method returns the current number of transactions in the lookup.

The `LocalCount` method returns the current number of local transactions in the lookup.

The `RemoteCount` method returns the current number of remote transactions in the lookup.

The `Slots` method returns the current number of slots used in the lookup.

The `Add` method adds a transaction to the lookup.

The `Remove` method removes a transaction from the lookup.

The `RemoteToLocals` method migrates the transactions belongs to the given locals to locals set. The assumption is held the locals set is thread-safe to be used.

The `RemotesBelowTip` method finds all remote transactions that are below the given tip and returns them as a slice. ## lookup.RemotesBelowTip

This function returns a list of transactions that have a gas tip cap below a given threshold. It iterates over all remote transactions in the lookup and checks if their gas tip cap is below the given threshold. If a transaction's gas tip cap is below the threshold, it is added to the list of found transactions.

### Parameters

- `threshold`: A `*big.Int` representing the minimum gas tip cap for a transaction to be included in the returned list.

### Return Value

A `types.Transactions` slice containing all remote transactions with a gas tip cap below the given threshold.

### Example

```go
txs := lookup.RemotesBelowTip(big.NewInt(1000000000))
```

## numSlots

This function calculates the number of slots needed for a single transaction. It takes a `*types.Transaction` as input and returns an `int` representing the number of slots needed to store the transaction.

### Parameters

- `tx`: A `*types.Transaction` representing the transaction to calculate the number of slots for.

### Return Value

An `int` representing the number of slots needed to store the transaction.

### Example

```go
tx := types.NewTransaction(...)
numSlots := numSlots(tx)
```