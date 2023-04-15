## Documentation for the Ethereum Codebase

### Package: Filters

The `Filters` package provides support for creating and managing filters in the Ethereum protocol. It allows external clients to retrieve various information related to the Ethereum protocol such as blocks, transactions, and logs.

### Struct: Filter

The `Filter` struct is a helper struct that holds meta information over the filter type and associated subscription in the event system. It contains the following fields:

- `typ`: The type of the filter.
- `deadline`: The timer that triggers when the filter is inactive.
- `hashes`: The hashes associated with the filter.
- `fullTx`: A boolean value indicating whether the filter is for full transactions.
- `txs`: The transactions associated with the filter.
- `crit`: The filter criteria.
- `logs`: The logs associated with the filter.
- `s`: The associated subscription in the event system.

### Struct: FilterAPI

The `FilterAPI` struct offers support to create and manage filters. It contains the following fields:

- `sys`: The filter system.
- `events`: The event system.
- `filtersMu`: The mutex for the filters.
- `filters`: The map of filters.
- `timeout`: The timeout duration.

### Function: NewFilterAPI

The `NewFilterAPI` function returns a new `FilterAPI` instance. It takes in a `FilterSystem` and a boolean value indicating whether the filter is for light mode.

### Function: timeoutLoop

The `timeoutLoop` function runs at the interval set by `timeout` and deletes filters that have not been recently used. It is started when the `FilterAPI` is created.

### Function: NewPendingTransactionFilter

The `NewPendingTransactionFilter` function creates a filter that fetches pending transactions as transactions enter the pending state. It is part of the filter package because this filter can be used through the `eth_getFilterChanges` polling method that is also used for log filters. It takes in a boolean value indicating whether the filter is for full transactions and returns an `rpc.ID`.

```go
func (api *FilterAPI) NewPendingTransactionFilter(fullTx *bool) rpc.ID {
	var (
		pendingTxs   = make(chan []*types.Transaction)
		pendingTxSub = api.events.SubscribePendingTxs(pendingTxs)
	)

	api.filtersMu.Lock()
	api.filters[pendingTxSub.ID] = &filter{typ: PendingTransactionsSubscription, fullTx: fullTx != nil && *fullTx, txs: []*types.Transaction{}, s: pendingTxSub}
	api.filtersMu.Unlock()

	return pendingTxSub.ID
}
```

### Function: NewBlockFilter

The `NewBlockFilter` function creates a filter that fetches blocks as they are added to the blockchain. It takes in a boolean value indicating whether the filter is for full transactions and returns an `rpc.ID`.

```go
func (api *FilterAPI) NewBlockFilter(fullTx *bool) rpc.ID {
	var (
		blocks   = make(chan *types.Block)
		blockSub = api.events.SubscribeBlocks(blocks)
	)

	api.filtersMu.Lock()
	api.filters[blockSub.ID] = &filter{typ: BlocksSubscription, fullTx: fullTx != nil && *fullTx, txs: []*types.Transaction{}, s: blockSub}
	api.filtersMu.Unlock()

	return blockSub.ID
}
```

### Function: NewFilter

The `NewFilter` function creates a filter that fetches logs that match the given filter criteria. It takes in a `FilterCriteria` and returns an `rpc.ID`.

```go
func (api *FilterAPI) NewFilter(crit FilterCriteria) (rpc.ID, error) {
	if crit.FromBlock == nil {
		crit.FromBlock = big.NewInt(0)
	}
	if crit.ToBlock == nil {
		crit.ToBlock = big.NewInt(0)
	}

	if crit.FromBlock.Cmp(crit.ToBlock) > 0 {
		return "", errors.New("invalid filter range")
	}

	if crit.Address != nil && len(crit.Address) == 0 {
		return "", errors.New("empty address list")
	}

	if crit.Topics != nil {
		for _, topic := range crit.Topics {
			if len(topic) == 0 {
				return "", errors.New("empty topic")
			}
		}
	}

	var (
		logs   = make(chan []*types.Log)
		logSub = api.events.SubscribeLogs(logs, crit)
	) ## Documentation for the Ethereum Codebase

### Function: NewPendingTransactions

The `NewPendingTransactions` function creates a subscription that is triggered each time a transaction enters the transaction pool. If `fullTx` is true, the full transaction is sent to the client, otherwise, only the hash is sent. The function takes in a context and a boolean value for `fullTx`. It returns a subscription and an error.

```go
func (api *FilterAPI) NewPendingTransactions(ctx context.Context, fullTx *bool) (*rpc.Subscription, error) {
	// check if notifications are supported
	notifier, supported := rpc.NotifierFromContext(ctx)
	if !supported {
		return &rpc.Subscription{}, rpc.ErrNotificationsUnsupported
	}

	// create a new subscription
	rpcSub := notifier.CreateSubscription()

	// subscribe to pending transactions
	txs := make(chan []*types.Transaction, 128)
	pendingTxSub := api.events.SubscribePendingTxs(txs)
	chainConfig := api.sys.backend.ChainConfig()

	// send notifications for new pending transactions
	go func() {
		for {
			select {
			case txs := <-txs:
				// To keep the original behaviour, send a single tx hash in one notification.
				// TODO(rjl493456442) Send a batch of tx hashes in one notification
				latest := api.sys.backend.CurrentHeader()
				for _, tx := range txs {
					if fullTx != nil && *fullTx {
						rpcTx := ethapi.NewRPCPendingTransaction(tx, latest, chainConfig)
						notifier.Notify(rpcSub.ID, rpcTx)
					} else {
						notifier.Notify(rpcSub.ID, tx.Hash())
					}
				}
			case <-rpcSub.Err():
				pendingTxSub.Unsubscribe()
				return
			case <-notifier.Closed():
				pendingTxSub.Unsubscribe()
				return
			}
		}
	}()

	return rpcSub, nil
}
```

### Function: NewBlockFilter

The `NewBlockFilter` function creates a filter that fetches blocks that are imported into the chain. It is part of the filter package since polling goes with `eth_getFilterChanges`. The function returns an ID for the filter.

```go
func (api *FilterAPI) NewBlockFilter() rpc.ID {
	// create a new subscription for new headers
	var (
		headers   = make(chan *types.Header)
		headerSub = api.events.SubscribeNewHeads(headers)
	)

	// create a new filter for blocks
	api.filtersMu.Lock()
	api.filters[headerSub.ID] = &filter{typ: BlocksSubscription, deadline: time.NewTimer(api.timeout), hashes: make([]common.Hash, 0), s: headerSub}
	api.filtersMu.Unlock()

	// send notifications for new blocks
	go func() {
		for {
			select {
			case h := <-headers:
				api.filtersMu.Lock()
				if f, found := api.filters[headerSub.ID]; found {
					f.hashes = append(f.hashes, h.Hash())
				}
				api.filtersMu.Unlock()
			case <-headerSub.Err():
				api.filtersMu.Lock()
				delete(api.filters, headerSub.ID)
				api.filtersMu.Unlock()
				return
			}
		}
	}()

	return headerSub.ID
}
```

### Function: NewHeads

The `NewHeads` function sends a notification each time a new (header) block is appended to the chain. The function takes in a context and returns a subscription and an error.

```go
func (api *FilterAPI) NewHeads(ctx context.Context) (*rpc.Subscription, error) {
	// check if notifications are supported
	notifier, supported := rpc.NotifierFromContext(ctx)
	if !supported {
		return &rpc.Subscription{}, rpc.ErrNotificationsUnsupported
	}

	// create a new subscription
	rpcSub := notifier.CreateSubscription()

	// subscribe to new headers
	headers := make(chan *types.Header)
	headersSub := api.events.SubscribeNewHeads(headers)

	// send notifications ## Documentation for Ethereum Codebase

### Function: SubscribeLogs

The `SubscribeLogs` function subscribes to new logs that match the given filter criteria. It returns a `rpc.Subscription` and an error. The function creates a new `notifier` subscription and a channel for matched logs. It then subscribes to the logs using the `api.events.SubscribeLogs` function and listens for new logs. When a new log is received, it is sent to the `matchedLogs` channel. If the `rpcSub` subscription is closed or the connection is dropped, the function unsubscribes from the logs.

### Type: FilterCriteria

The `FilterCriteria` type represents a request to create a new filter. It is the same as `ethereum.FilterQuery` but with an additional `UnmarshalJSON()` method.

### Function: NewFilter

The `NewFilter` function creates a new filter and returns the filter ID. It can be used to retrieve logs when the state changes. The function takes in a `FilterCriteria` and subscribes to the logs using the `api.events.SubscribeLogs` function. It then creates a new filter and adds it to the `api.filters` map. When new logs are received, they are added to the filter's logs. If the subscription is closed, the function removes the filter from the `api.filters` map.

### Function: GetLogs

The `GetLogs` function returns logs matching the given argument that are stored within the state. The function takes in a `FilterCriteria` and constructs a filter based on the block hash or block range. It then runs the filter and returns all the logs.

### Function: UninstallFilter

The `UninstallFilter` function removes the filter with the given filter ID. The function takes in a `rpc.ID` and removes the filter from the `api.filters` map. If the filter is found, the function unsubscribes from the logs.

### Function: GetFilterLogs

The `GetFilterLogs` function returns the logs for the filter with the given ID. The function takes in a `rpc.ID` and retrieves the filter from the `api.filters` map. If the filter is found, the function returns the logs for the filter. If the filter is not found, the function returns an empty array of logs. ## Documentation for the Ethereum Codebase

### Function: Unlock

The `Unlock` function is used to unlock a filter that has been previously locked. It takes in the filter ID and checks if the filter exists and is of the correct type. If the filter is a block filter, it constructs a single-shot filter. If the filter is a range filter, it constructs a range filter. It then runs the filter and returns all the logs.

### Function: GetFilterChanges

The `GetFilterChanges` function is used to get the logs for the filter with the given ID since the last time it was called. It takes in the filter ID and checks if the filter exists. If the filter exists, it resets the filter's deadline timer and returns the logs for the filter. If the filter is a block filter, it returns an array of hashes. If the filter is a pending transaction filter, it returns an array of transaction hashes or an array of pending transactions. If the filter is a log filter, it returns an array of logs.

### Function: returnHashes

The `returnHashes` function is a helper function that returns an empty hash array if the given hash array is nil, otherwise it returns the given hash array.

### Function: returnLogs

The `returnLogs` function is a helper function that returns an empty log array if the given log array is nil, otherwise it returns the given log array.

### Function: UnmarshalJSON

The `UnmarshalJSON` function is used to set the fields of a `FilterCriteria` struct with the given data. It takes in a byte array of JSON data and unmarshals it into an `input` struct. It then checks if the `BlockHash` field is not nil and if the `FromBlock` and `ToBlock` fields are nil. If the `BlockHash` field is not nil, it sets the `BlockHash` field of the `FilterCriteria` struct to the value of the `BlockHash` field of the `input` struct. If the `BlockHash` field is nil, it sets the `FromBlock` and `ToBlock` fields of the `FilterCriteria` struct to the values of the `FromBlock` and `ToBlock` fields of the `input` struct, respectively. It also sets the `Addresses` and `Topics` fields of the `FilterCriteria` struct to the values of the `Addresses` and `Topics` fields of the `input` struct, respectively. ## Documentation for Ethereum Codebase

### Function: decodeAddress

The `decodeAddress` function takes in a string representation of an Ethereum address and returns a `common.Address` type. It first decodes the hex string using `hexutil.Decode` and checks if the resulting byte slice has the correct length for an Ethereum address. If the length is correct, it converts the byte slice to a `common.Address` type and returns it. If there is an error during decoding or the length is incorrect, it returns an error.

```go
func decodeAddress(s string) (common.Address, error) {
	b, err := hexutil.Decode(s)
	if err == nil && len(b) != common.AddressLength {
		err = fmt.Errorf("hex has invalid length %d after decoding; expected %d for address", len(b), common.AddressLength)
	}
	return common.BytesToAddress(b), err
}
```

### Function: decodeTopic

The `decodeTopic` function takes in a string representation of an Ethereum topic and returns a `common.Hash` type. It first decodes the hex string using `hexutil.Decode` and checks if the resulting byte slice has the correct length for an Ethereum topic. If the length is correct, it converts the byte slice to a `common.Hash` type and returns it. If there is an error during decoding or the length is incorrect, it returns an error.

```go
func decodeTopic(s string) (common.Hash, error) {
	b, err := hexutil.Decode(s)
	if err == nil && len(b) != common.HashLength {
		err = fmt.Errorf("hex has invalid length %d after decoding; expected %d for topic", len(b), common.HashLength)
	}
	return common.BytesToHash(b), err
}
```

### Function: parseFilterArgs

The `parseFilterArgs` function takes in a `FilterArgs` struct and a raw JSON object and populates the `FilterArgs` struct with the appropriate values. It first initializes the `BlockHash` and `FromBlock` and `ToBlock` fields to their default values. It then checks if the `BlockHash` field is present in the raw JSON object and sets it to the appropriate value if it is. It then checks if the `FromBlock` and `ToBlock` fields are present in the raw JSON object and sets them to the appropriate values if they are. If the `Addresses` field is present in the raw JSON object, it decodes the addresses and adds them to the `FilterArgs` struct. If the `Topics` field is present in the raw JSON object, it decodes the topics and adds them to the `FilterArgs` struct. If there are any errors during decoding, it returns an error.

```go
func parseFilterArgs(args *FilterArgs, raw map[string]interface{}) error {
	args.BlockHash = common.Hash{}
	args.FromBlock = big.NewInt(0)
	args.ToBlock = big.NewInt(0)

	if rawBlockHash, ok := raw["blockHash"].(string); ok {
		blockHash, err := decodeHash(rawBlockHash)
		if err != nil {
			return err
		}
		args.BlockHash = blockHash
	}

	if rawFromBlock, ok := raw["fromBlock"].(string); ok {
		if raw.FromBlock == "latest" {
			args.FromBlock = nil
		} else {
			k, ok := new(big.Int).SetString(rawFromBlock, 0)
			if !ok {
				return fmt.Errorf("invalid fromBlock: %v", rawFromBlock)
			}
			args.FromBlock = k
		}
	}

	if rawToBlock, ok := raw["toBlock"].(string); ok {
		if raw.ToBlock == "latest" {
			args.ToBlock = nil
		} else {
			k, ok := new(big.Int).SetString(rawToBlock, 0)
			if !ok {
				return fmt.Errorf("invalid toBlock: %v", rawToBlock)
			}
			args.ToBlock = k
		}
		if args.FromBlock == nil {
			args.FromBlock = big.NewInt(0)
		}
		if args.ToBlock == nil {
			k = big.NewInt(raw.ToBlock.Int64())
		}
	}

	args.Addresses = []common.Address{}

	if raw.Addresses != nil {
		// raw.Address can contain a single address or an array of addresses
		switch rawAddr := raw.Addresses.(type) {
		case []interface{}:
			for i, addr := range rawAddr {
				if strAddr, ok := addr.(string); ok {
					addr, err := decodeAddress(strAddr)
					if err != nil {
						return fmt.Errorf("invalid address at index %d: %v", i, err)
					}
					args.Addresses = append(args.Addresses, addr)
				} else {
					return fmt.Errorf("non-string address at index %d", i)
				}
			}
		case string:
			addr, err := decodeAddress(rawAddr)
			if err != nil {
				return fmt.Errorf("invalid address: %v", err)
			}
			args.Addresses = []common.Address{addr}
		default:
			return errors.New("invalid addresses in query")
		}
	}

	// topics is an array consisting of strings and/or arrays of strings.
	// JSON null