# Documentation for the Ethereum Codebase

## Filters Package

The Filters package provides functionality for retrieving and filtering logs from the Ethereum blockchain. The package contains the following functions:

### Filter

The `Filter` struct is used to retrieve and filter logs. It contains the following fields:

- `sys`: A pointer to the `FilterSystem` struct.
- `addresses`: An array of `common.Address` structs representing the addresses to filter.
- `topics`: A 2D array of `common.Hash` structs representing the topics to filter.
- `block`: A pointer to a `common.Hash` struct representing the block hash if filtering a single block.
- `begin`: An integer representing the beginning of the range interval if filtering multiple blocks.
- `end`: An integer representing the end of the range interval if filtering multiple blocks.
- `matcher`: A pointer to a `bloombits.Matcher` struct.

### NewRangeFilter

The `NewRangeFilter` function creates a new filter which uses a bloom filter on blocks to figure out whether a particular block is interesting or not. It takes in the beginning and end of the range interval, an array of `common.Address` structs representing the addresses to filter, and a 2D array of `common.Hash` structs representing the topics to filter. It returns a pointer to a `Filter` struct.

### NewBlockFilter

The `NewBlockFilter` function creates a new filter which directly inspects the contents of a block to figure out whether it is interesting or not. It takes in a `common.Hash` struct representing the block hash, an array of `common.Address` structs representing the addresses to filter, and a 2D array of `common.Hash` structs representing the topics to filter. It returns a pointer to a `Filter` struct.

### newFilter

The `newFilter` function creates a generic filter that can either filter based on a block hash, or based on range queries. The search criteria needs to be explicitly set. It takes in an array of `common.Address` structs representing the addresses to filter, and a 2D array of `common.Hash` structs representing the topics to filter. It returns a pointer to a `Filter` struct.

### Logs

The `Logs` function searches the blockchain for matching log entries, returning all from the first block that contains matches, updating the start of the filter accordingly. It takes in a context and returns an array of `types.Log` structs and an error. ## Documentation for Ethereum Codebase

### Function: FilterLogs

The `FilterLogs` function is used to filter logs based on the provided filter criteria. It takes in a context, and a filter object, and returns a slice of logs that match the filter criteria. The function first checks if the filter range is valid, and then determines the limits of the filter range. It then gathers all indexed logs and finishes with non-indexed ones. The function returns an error if there is any issue with the filter range or if there is an error while retrieving logs.

```go
func (f *Filter) FilterLogs(ctx context.Context) ([]*types.Log, error) {
	if f.begin > f.end {
		return nil, errors.New("invalid block range")
	}
	// Short-cut if all we care about is the latest block's logs
	if f.begin == rpc.LatestBlockNumber.Int64() {
		header, _ := f.sys.backend.HeaderByNumber(ctx, rpc.LatestBlockNumber)
		if header == nil {
			return nil, nil
		}
		return f.blockLogs(ctx, header)
	}
	// Short-cut if all we care about is pending logs
	if f.begin == rpc.PendingBlockNumber.Int64() {
		if f.end != rpc.PendingBlockNumber.Int64() {
			return nil, errors.New("invalid block range")
		}
		return f.pendingLogs()
	}
	// Figure out the limits of the filter range
	header, _ := f.sys.backend.HeaderByNumber(ctx, rpc.LatestBlockNumber)
	if header == nil {
		return nil, nil
	}
	var (
		err     error
		head    = header.Number.Int64()
		pending = f.end == rpc.PendingBlockNumber.Int64()
	)
	resolveSpecial := func(number int64) (int64, error) {
		var hdr *types.Header
		switch number {
		case rpc.LatestBlockNumber.Int64():
			return head, nil
		case rpc.PendingBlockNumber.Int64():
			// we should return head here since we've already captured
			// that we need to get the pending logs in the pending boolean above
			return head, nil
		case rpc.FinalizedBlockNumber.Int64():
			hdr, _ = f.sys.backend.HeaderByNumber(ctx, rpc.FinalizedBlockNumber)
			if hdr == nil {
				return 0, errors.New("finalized header not found")
			}
		case rpc.SafeBlockNumber.Int64():
			hdr, _ = f.sys.backend.HeaderByNumber(ctx, rpc.SafeBlockNumber)
			if hdr == nil {
				return 0, errors.New("safe header not found")
			}
		default:
			return number, nil
		}
		return hdr.Number.Int64(), nil
	}
	if f.begin, err = resolveSpecial(f.begin); err != nil {
		return nil, err
	}
	if f.end, err = resolveSpecial(f.end); err != nil {
		return nil, err
	}
	// Gather all indexed logs, and finish with non indexed ones
	var (
		logs           []*types.Log
		end            = uint64(f.end)
		size, sections = f.sys.backend.BloomStatus()
	)
	if indexed := sections * size; indexed > uint64(f.begin) {
		if indexed > end {
			logs, err = f.indexedLogs(ctx, end)
		} else {
			logs, err = f.indexedLogs(ctx, indexed-1)
		}
		if err != nil {
			return logs, err
		}
	}
	rest, err := f.unindexedLogs(ctx, end)
	logs = append(logs, rest...)
	if pending {
		pending ## Documentation for Ethereum Codebase

### Function: rByNumber

The `rByNumber` function retrieves logs that match the filter criteria for a range of blocks specified by the `from` and `to` block numbers. It uses the `blockLogs` function to retrieve logs for each block in the range and appends the logs to a slice. If an error occurs during the retrieval of logs for a block, the function returns the logs retrieved up to that point and the error.

### Function: blockLogs

The `blockLogs` function retrieves logs that match the filter criteria for a single block specified by the `header` parameter. It first checks if the bloom filter of the block matches the filter criteria. If it does, it calls the `checkMatches` function to retrieve the logs. If it doesn't, it returns an empty slice of logs.

### Function: checkMatches

The `checkMatches` function checks if the receipts belonging to the given header contain any log events that match the filter criteria. This function is called when the bloom filter signals a potential match. It retrieves the cached logs for the block and filters them using the `filterLogs` function. If any logs match the filter criteria, it retrieves the block body and sets the transaction hash for each log. It then returns the logs.

### Function: pendingLogs

The `pendingLogs` function retrieves logs that match the filter criteria for the pending block. It first retrieves the pending block and receipts using the backend. It then checks if the bloom filter of the block matches the filter criteria. If it does, it retrieves all logs from the receipts and filters them using the `filterLogs` function. If any logs match the filter criteria, it returns them.

### Function: includes

The `includes` function checks if the given address is included in the slice of addresses.

### Function: filterLogs

The `filterLogs` function creates a slice of logs that match the given filter criteria. It iterates through each log and checks if it matches the filter criteria. If it does, it appends it to the slice of logs to be returned.

### Function: bloomFilter

The `bloomFilter` function checks if the given bloom filter matches the filter criteria. It first checks if any of the addresses match the bloom filter. If they do, it checks if any of the topics match the bloom filter. If they do, it returns true. Otherwise, it returns false. ## Documentation for Ethereum Codebase

### Function: BloomLookup

The `BloomLookup` function is used to check if a given topic is included in a Bloom filter. It takes in two parameters, `bloom` which is the Bloom filter to check against, and `topic` which is the topic to check for. The function returns a boolean value indicating whether the topic is included in the Bloom filter or not.

```go
func BloomLookup(bloom types.Bloom, topic common.Hash) bool {
	for i := 0; i < 3; i++ {
		// calculate the index of the Bloom filter for the given topic
		index := uint(topic.Bytes()[i*2])<<8 | uint(topic.Bytes()[i*2+1])

		// check if the bit at the calculated index is set in the Bloom filter
		if bloom[index/8]&(1<<(index%8)) == 0 {
			return false
		}
	}
	return true
}
```

### Function: MatchTopics

The `MatchTopics` function is used to check if a given set of topics matches a given set of subscriptions. It takes in two parameters, `sub` which is the set of subscriptions to check against, and `topics` which is the set of topics to check for. The function returns a boolean value indicating whether the set of topics matches the set of subscriptions or not.

```go
func MatchTopics(sub [][]common.Hash, topics []common.Hash) bool {
	for _, set := range sub {
		included := false
		for _, topic := range set {
			if BloomLookup(types.Bloom(topics), topic) {
				included = true
				break
			}
		}
		if !included {
			return false
		}
	}
	return true
}
```

In summary, the `BloomLookup` function is used to check if a given topic is included in a Bloom filter, while the `MatchTopics` function is used to check if a given set of topics matches a given set of subscriptions.