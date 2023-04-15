# Documentation for the Ethereum Codebase

## Package filters

The `filters` package implements an Ethereum filtering system for blocks, transactions, and log events.

### Config

The `Config` struct represents the configuration of the filter system. It has two fields:

- `LogCacheSize`: the maximum number of cached blocks (default: 32)
- `Timeout`: how long filters stay active (default: 5 minutes)

The `withDefaults` method sets default values for the `Timeout` and `LogCacheSize` fields if they are not set.

### Backend

The `Backend` interface defines the methods that a backend must implement to be used with the filter system. It includes methods for retrieving block headers, bodies, receipts, and logs, as well as methods for subscribing to events.

### FilterSystem

The `FilterSystem` struct holds resources shared by all filters. It has three fields:

- `backend`: the backend used by the filter system
- `logsCache`: an LRU cache for storing block logs
- `cfg`: the configuration of the filter system

The `NewFilterSystem` function creates a new filter system with the given backend and configuration.

### logCacheElem

The `logCacheElem` struct represents a cached block and its logs. It has two fields:

- `logs`: the logs for the block
- `body`: an atomic value that holds the block body

The `cachedLogElem` method loads block logs from the backend and caches the result.

## Conclusion

The `filters` package provides a filtering system for Ethereum blocks, transactions, and log events. It uses a backend to retrieve block data and caches block logs to improve performance. ## Documentation for the Ethereum Codebase

### Function: GetLogs

The `GetLogs` function retrieves logs for a given block hash and number. It first checks if the logs are already cached and returns them if they are. If not, it retrieves the logs from the backend and fills in any missing information (such as txHash) before caching them and returning them.

```go
func (sys *FilterSystem) GetLogs(ctx context.Context, blockHash common.Hash, number uint64) (*logCacheElem, error) {
	cached, ok := sys.logsCache.Get(blockHash)
	if ok {
		return cached, nil
	}

	logs, err := sys.backend.GetLogs(ctx, blockHash, number)
	if err != nil {
		return nil, err
	}
	if logs == nil {
		return nil, fmt.Errorf("failed to get logs for block #%d (0x%s)", number, blockHash.TerminalString())
	}
	// Database logs are un-derived.
	// Fill in whatever we can (txHash is inaccessible at this point).
	flattened := make([]*types.Log, 0)
	var logIdx uint
	for i, txLogs := range logs {
		for _, log := range txLogs {
			log.BlockHash = blockHash
			log.BlockNumber = number
			log.TxIndex = uint(i)
			log.Index = logIdx
			logIdx++
			flattened = append(flattened, log)
		}
	}
	elem := &logCacheElem{logs: flattened}
	sys.logsCache.Add(blockHash, elem)
	return elem, nil
}
```

### Function: cachedGetBody

The `cachedGetBody` function retrieves the body for a given block hash and number. It first checks if the body is already cached and returns it if it is. If not, it retrieves the body from the backend, caches it, and returns it.

```go
func (sys *FilterSystem) cachedGetBody(ctx context.Context, elem *logCacheElem, hash common.Hash, number uint64) (*types.Body, error) {
	if body := elem.body.Load(); body != nil {
		return body.(*types.Body), nil
	}
	body, err := sys.backend.GetBody(ctx, hash, rpc.BlockNumber(number))
	if err != nil {
		return nil, err
	}
	elem.body.Store(body)
	return body, nil
}
```

### Type: Type

The `Type` type is an enumeration that determines the kind of filter and is used to put the filter in the correct bucket when added.

```go
type Type byte

const (
	// UnknownSubscription indicates an unknown subscription type
	UnknownSubscription Type = iota
	// LogsSubscription queries for new or removed (chain reorg) logs
	LogsSubscription
	// PendingLogsSubscription queries for logs in pending blocks
	PendingLogsSubscription
	// MinedAndPendingLogsSubscription queries for logs in mined and pending blocks.
	MinedAndPendingLogsSubscription
	// PendingTransactionsSubscription queries for pending transactions entering
	// the pending state
	PendingTransactionsSubscription
	// BlocksSubscription queries hashes for blocks that are imported
	BlocksSubscription
	// LastIndexSubscription keeps track of the last index
	LastIndexSubscription
)
```

### Constants: txChanSize, rmLogsChanSize, logsChanSize, chainEvChanSize

The `txChanSize`, `rmLogsChanSize`, `logsChanSize`, and `chainEvChanSize` constants define the size of the channels used to listen for various events.

```go
const (
	// txChanSize is the size of channel listening to NewTxsEvent.
	// The number is referenced from the size of tx pool.
	txChanSize = 4096
	// rmLogsChanSize is the size of channel listening to RemovedLogsEvent.
	rmLogsChanSize = 10
	// logsChanSize is the size of channel listening to LogsEvent.
	logsChanSize = 10
	// chainEvChanSize is the size of channel listening to ChainEvent.
	chainEvChanSize = 10
)
```

### Struct: subscription

The `subscription` struct represents a subscription to a particular event type. It contains an ID, a type (determined by the `Type` enumeration), the time it was created, filter criteria, channels for receiving logs, transactions, and headers, and channels for signaling when the filter is installed or uninstalled.

```go
type subscription ## Documentation for the Ethereum Codebase

### Function: NewEventSystem

The `NewEventSystem` function creates a new manager that listens for events on the given mux, parses and filters them. It uses the all map to retrieve filter changes. The work loop holds its own index that is used to forward events to filters. The returned manager has a loop that needs to be stopped with the Stop function or by stopping the given mux.

```go
func NewEventSystem(sys *FilterSystem, lightMode bool) *EventSystem {
	m := &EventSystem{
		sys:           sys,
		backend:       sys.backend,
		lightMode:     lightMode,
		install:       make(chan *subscription),
		uninstall:     make(chan *subscription),
		txsCh:         make(chan core.NewTxsEvent, txChanSize),
		logsCh:        make(chan []*types.Log, logsChanSize),
		rmLogsCh:      make(chan core.RemovedLogsEvent, rmLogsChanSize),
		pendingLogsCh: make(chan []*types.Log, logsChanSize),
		chainCh:       make(chan core.ChainEvent, chainEvChanSize),
	}

	// Subscribe events
	m.txsSub = m.backend.SubscribeNewTxsEvent(m.txsCh)
	m.logsSub = m.backend.SubscribeLogsEvent(m.logsCh)
	m.rmLogsSub = m.backend.SubscribeRemovedLogsEvent(m.rmLogsCh)
	m.chainSub = m.backend.SubscribeChainEvent(m.chainCh)
	m.pendingLogsSub = m.backend.SubscribePendingLogsEvent(m.pendingLogsCh)

	// Make sure none of the subscriptions are empty
	if m.txsSub == nil || m.logsSub == nil || m.rmLogsSub == nil || m.chainSub == nil || m.pendingLogsSub == nil {
		log.Crit("Subscribe for event system failed")
	}

	go m.eventLoop()
	return m
}
```

### Type: Subscription

The `Subscription` type is created when the client registers itself for a particular event.

```go
type Subscription struct {
	ID        rpc.ID
	f         *subscription
	es        *EventSystem
	unsubOnce sync.Once
}
```

### Function: Err

The `Err` function returns a channel that is closed when unsubscribed.

```go
func (sub *Subscription) Err() <-chan error {
	return sub.f.err
}
```

### Function: Unsubscribe

The `Unsubscribe` function uninstalls the subscription from the event broadcast loop.

```go
func (sub *Subscription) Unsubscribe() {
	sub.unsubOnce.Do(func() {
	uninstallLoop:
		for {
			// write uninstall request and consume logs/hashes. This prevents
			// the eventLoop broadcast method to deadlock when writing to the
			// filter event channel while the subscription loop is waiting for
			// this method to return (and thus not reading these events).
			select {
			case sub.es.uninstall <- sub.f:
				break uninstallLoop
			case <-sub.f.logs:
			case <-sub.f.txs:
			case <-sub.f.headers:
			}
		}

		// wait for filter to be uninstalled in work loop before returning
		// this ensures that the manager won't use the event channel which
		// will probably be closed by the client asap after this method returns.
		<-sub.Err()
	})
}
```

### Function: subscribe

The `subscribe` function installs the subscription in the event broadcast loop.

```go
func (es *EventSystem) subscribe(sub *subscription) *Subscription {
	es.install <- sub
	<-sub.installed
	return &Subscription{ID: sub.id, f: sub, es: es}
}
```

### Function: SubscribeLogs

The `SubscribeLogs` function creates a subscription that will write all logs matching the given criteria to the given logs channel. Default value for the from and to block is "latest". If the fromBlock > toBlock an error is returned.

```go
func (es *EventSystem) SubscribeLogs(crit ethereum.FilterQuery, logs chan []*types.Log) (*Subscription, error) {
	var from, to rpc.BlockNumber
	if crit.FromBlock == nil {
		from = rpc.LatestBlockNumber
	} ## Documentation for the Ethereum Codebase

### Function: handleLogs

The `handleLogs` function is responsible for handling incoming logs and matching them to the appropriate subscriptions. It takes in a `filterIndex` which is a map of subscription types to a map of subscription IDs to the subscription itself. The function then loops through each log and checks if it matches any of the subscriptions in the `filterIndex`. If a match is found, the log is added to the appropriate subscription's logs channel.

```go
func (es *EventSystem) handleLogs(filters filterIndex, logs []*types.Log) {
	for _, log := range logs {
		for _, sub := range filters[LogsSubscription][Any] {
			if sub.logsCrit.MatchLog(log) {
				select {
				case sub.logs <- log:
				case <-sub.ctx.Done():
					es.unsubscribe(sub)
				}
			}
		}
		for _, sub := range filters[MinedAndPendingLogsSubscription][Any] {
			if sub.logsCrit.MatchLog(log) {
				select {
				case sub.logs <- log:
				case <-sub.ctx.Done():
					es.unsubscribe(sub)
				}
			}
		}
	}
}
```

### Function: subscribe

The `subscribe` function is responsible for creating a new subscription and adding it to the appropriate filter index. It takes in a `subscription` struct which contains the subscription ID, type, filter criteria, and channels for logs, transactions, and headers. The function then adds the subscription to the appropriate filter index based on its type and ID.

```go
func (es *EventSystem) subscribe(sub *subscription) *Subscription {
	es.mu.Lock()
	defer es.mu.Unlock()

	if _, ok := es.filters[sub.typ]; !ok {
		es.filters[sub.typ] = make(map[Type]map[rpc.ID]*subscription)
	}
	if _, ok := es.filters[sub.typ][sub.logType]; !ok {
		es.filters[sub.typ][sub.logType] = make(map[rpc.ID]*subscription)
	}

	es.filters[sub.typ][sub.logType][sub.id] = sub

	select {
	case es.newSubs <- sub:
	default:
	}

	return &Subscription{
		ID:      sub.id,
		Type:    sub.typ,
		LogType: sub.logType,
	}
}
```

### Function: subscribeLogs

The `subscribeLogs` function creates a subscription that will write all logs matching the given criteria to the given logs channel. It takes in a `FilterQuery` struct which contains the filter criteria for the logs and a channel for the logs. The function then creates a new subscription with the `LogsSubscription` type and adds it to the event system's filter index.

```go
func (es *EventSystem) subscribeLogs(crit ethereum.FilterQuery, logs chan []*types.Log) *Subscription {
	sub := &subscription{
		id:        rpc.NewID(),
		typ:       LogsSubscription,
		logsCrit:  crit,
		created:   time.Now(),
		logs:      logs,
		txs:       make(chan []*types.Transaction),
		headers:   make(chan *types.Header),
		installed: make(chan struct{}),
		err:       make(chan error),
	}
	return es.subscribe(sub)
}
```

### Function: subscribePendingLogs

The `subscribePendingLogs` function creates a subscription that writes contract event logs for transactions that enter the transaction pool. It takes in a `FilterQuery` struct which contains the filter criteria for the logs and a channel for the logs. The function then creates a new subscription with the `PendingLogsSubscription` type and adds it to the event system's filter index.

```go
func (es *EventSystem) subscribePendingLogs(crit ethereum.FilterQuery, logs chan []*types.Log) *Subscription {
	sub := &subscription{
		id:        rpc.NewID(),
		typ:       PendingLogsSubscription,
		logsCrit:  crit,
		created:   time.Now(),
		logs:      logs,
		txs:       make(chan []*types.Transaction),
		headers:   make(chan *types.Header),
		installed: make(chan struct{}),
		err:       make(chan error),
	}
	return es.subscribe(sub)
}
```

### Function: SubscribeNewHeads

The `Subscribe This codebase is part of the Ethereum client and is responsible for handling events and filtering logs. The `EventSystem` struct contains several functions that handle different types of events. 

The `handleLogsEvent` function takes in a filter index and an array of logs. It iterates through all the filters subscribed to the `LogsSubscription` event and filters the logs based on the filter criteria. If any logs match the criteria, they are sent to the corresponding filter's log channel.

The `handlePendingLogs` function is similar to `handleLogsEvent`, but it handles logs that are pending and have not yet been added to a block.

The `handleRemovedLogs` function handles logs that have been removed from the blockchain due to a chain reorganization. It filters the logs based on the filter criteria and sends any matching logs to the corresponding filter's log channel.

The `handleTxsEvent` function handles new transactions that have been added to the transaction pool. It sends the new transactions to the corresponding filter's transaction channel.

The `handleChainEvent` function handles new blocks that have been added to the blockchain. It sends the block header to the corresponding filter's header channel. If the client is running in light mode and there are filters subscribed to the `LogsSubscription` event, it calls the `lightFilterNewHead` function to filter the logs for the new block.

The `lightFilterNewHead` function is used to filter logs in light client mode. It takes in the new block header and a callback function. It finds the common ancestor between the old and new block headers and creates a list of rolled back and new block headers. It then calls the callback function for each rolled back and new block header.

The `lightFilterLogs` function is used to filter logs for a single block header in light client mode. It takes in the block header, an array of addresses, an array of topics, and a boolean indicating whether the logs should be removed. It checks if the block header's bloom filter matches the filter criteria. If it does, it retrieves the logs for the block and filters them based on the filter criteria. If any logs match the criteria, they are returned.

Overall, these functions are responsible for handling events and filtering logs for the Ethereum client. ## Documentation for the Ethereum Codebase

### Function: ResolveTxHash

The `ResolveTxHash` function resolves the transaction hash for a given log. It takes in a context, a cached state, a header, and a slice of logs. It returns the slice of logs with the transaction hash resolved.

```go
func (es *EventSystem) ResolveTxHash(ctx context.Context, cached *trie.Trie, header *types.Header, logs []*types.Log) []*types.Log {
	// If there are no logs, return early
	if len(logs) == 0 {
		return logs
	}
	// If the txhash is already resolved, return early
	if logs[0].TxHash != (common.Hash{}) {
		return logs
	}
	// Resolve txhash
	body, err := es.sys.cachedGetBody(ctx, cached, header.Hash(), header.Number.Uint64())
	if err != nil {
		return nil
	}
	for _, log := range logs {
		// logs are already copied, safe to modify
		log.TxHash = body.Transactions[log.TxIndex].Hash()
	}
	return logs
}
```

### Function: eventLoop

The `eventLoop` function installs and uninstalls filters and processes mux events. It takes no arguments and has no return value.

```go
func (es *EventSystem) eventLoop() {
	// Ensure all subscriptions get cleaned up
	defer func() {
		es.txsSub.Unsubscribe()
		es.logsSub.Unsubscribe()
		es.rmLogsSub.Unsubscribe()
		es.pendingLogsSub.Unsubscribe()
		es.chainSub.Unsubscribe()
	}()

	index := make(filterIndex)
	for i := UnknownSubscription; i < LastIndexSubscription; i++ {
		index[i] = make(map[rpc.ID]*subscription)
	}

	for {
		select {
		case ev := <-es.txsCh:
			es.handleTxsEvent(index, ev)
		case ev := <-es.logsCh:
			es.handleLogs(index, ev)
		case ev := <-es.rmLogsCh:
			es.handleRemovedLogs(index, ev)
		case ev := <-es.pendingLogsCh:
			es.handlePendingLogs(index, ev)
		case ev := <-es.chainCh:
			es.handleChainEvent(index, ev)

		case f := <-es.install:
			if f.typ == MinedAndPendingLogsSubscription {
				// the type are logs and pending logs subscriptions
				index[LogsSubscription][f.id] = f
				index[PendingLogsSubscription][f.id] = f
			} else {
				index[f.typ][f.id] = f
			}
			close(f.installed)

		case f := <-es.uninstall:
			if f.typ == MinedAndPendingLogsSubscription {
				// the type are logs and pending logs subscriptions
				delete(index[LogsSubscription], f.id)
				delete(index[PendingLogsSubscription], f.id)
			} else {
				delete(index[f.typ], f.id)
			}
			close(f.err)

		// System stopped
		case <-es.txsSub.Err():
			return
		case <-es.logsSub.Err():
			return
		case <-es.rmLogsSub.Err():
			return
		case <-es.chainSub.Err():
			return
		}
	}
}
```