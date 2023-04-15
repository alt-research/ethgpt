# EthereumAPI

The `EthereumAPI` struct provides an API to access Ethereum full node-related information. It has the following methods:

## Etherbase

```go
func (api *EthereumAPI) Etherbase() (common.Address, error)
```

`Etherbase` returns the address that mining rewards will be sent to.

## Coinbase

```go
func (api *EthereumAPI) Coinbase() (common.Address, error)
```

`Coinbase` is an alias for `Etherbase`.

## Hashrate

```go
func (api *EthereumAPI) Hashrate() hexutil.Uint64
```

`Hashrate` returns the POW hashrate.

## Mining

```go
func (api *EthereumAPI) Mining() bool
```

`Mining` returns an indication if this node is currently mining.

# MinerAPI

The `MinerAPI` struct provides an API to control the miner. It has the following methods:

## Start

```go
func (api *MinerAPI) Start(threads *int) error
```

`Start` starts the miner with the given number of threads. If threads is nil, the number of workers started is equal to the number of logical CPUs that are usable by this process. If mining is already running, this method adjusts the number of threads allowed to use and updates the minimum price required by the transaction pool.

## Stop

```go
func (api *MinerAPI) Stop()
```

`Stop` terminates the miner, both at the consensus engine level as well as at the block creation level.

## SetExtra

```go
func (api *MinerAPI) SetExtra(extra string) (bool, error)
```

`SetExtra` sets the extra data string that is included when this miner mines a block.

## SetGasPrice

```go
func (api *MinerAPI) SetGasPrice(gasPrice hexutil.Big) bool
```

`SetGasPrice` sets the minimum accepted gas price for the miner.

## SetGasLimit

```go
func (api *MinerAPI) SetGasLimit(gasLimit hexutil.Uint64) bool
```

`SetGasLimit` sets the gas limit to target towards when mining a block. ## Documentation for Ethereum Codebase

### Function: SetGasLimit

This function sets the gas limit for the miner. It takes a hexutil.Uint64 value as input and returns a boolean value. It sets the gas limit for the miner by calling the SetGasCeil function of the Miner object of the Ethereum instance.

```go
func (api *MinerAPI) SetGasLimit(gasLimit hexutil.Uint64) bool {
	api.e.Miner().SetGasCeil(uint64(gasLimit))
	return true
}
```

### Function: SetEtherbase

This function sets the etherbase of the miner. It takes a common.Address value as input and returns a boolean value. It sets the etherbase of the miner by calling the SetEtherbase function of the Ethereum instance.

```go
func (api *MinerAPI) SetEtherbase(etherbase common.Address) bool {
	api.e.SetEtherbase(etherbase)
	return true
}
```

### Function: SetRecommitInterval

This function updates the interval for miner sealing work recommitting. It takes an integer value as input and does not return anything. It sets the recommit interval for the miner by calling the SetRecommitInterval function of the Miner object of the Ethereum instance.

```go
func (api *MinerAPI) SetRecommitInterval(interval int) {
	api.e.Miner().SetRecommitInterval(time.Duration(interval) * time.Millisecond)
}
```

### Struct: AdminAPI

This struct is the collection of Ethereum full node related APIs for node administration. It has an Ethereum instance as a field.

```go
type AdminAPI struct {
	eth *Ethereum
}
```

### Function: NewAdminAPI

This function creates a new instance of AdminAPI. It takes an Ethereum instance as input and returns a pointer to an AdminAPI instance.

```go
func NewAdminAPI(eth *Ethereum) *AdminAPI {
	return &AdminAPI{eth: eth}
}
```

### Function: ExportChain

This function exports the current blockchain into a local file, or a range of blocks if first and last are non-nil. It takes a string value as the file name, and two uint64 pointers as the first and last block numbers. It returns a boolean value and an error. It exports the blockchain by calling the Export or ExportN function of the BlockChain object of the Ethereum instance.

```go
func (api *AdminAPI) ExportChain(file string, first *uint64, last *uint64) (bool, error) {
	if first == nil && last != nil {
		return false, errors.New("last cannot be specified without first")
	}
	if first != nil && last == nil {
		head := api.eth.BlockChain().CurrentHeader().Number.Uint64()
		last = &head
	}
	if _, err := os.Stat(file); err == nil {
		return false, errors.New("location would overwrite an existing file")
	}
	out, err := os.OpenFile(file, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		return false, err
	}
	defer out.Close()
	var writer io.Writer = out
	if strings.HasSuffix(file, ".gz") {
		writer = gzip.NewWriter(writer)
		defer writer.(*gzip.Writer).Close()
	}
	if first != nil {
		if err := api.eth.BlockChain().ExportN(writer, *first, *last); err != nil {
			return false, err
		}
	} else if err := api.eth.BlockChain().Export(writer); err != nil {
		return false, err
	}
	return true, nil
}
```

### Function: hasAllBlocks

This function checks if all the blocks in a given slice are present in the blockchain. It takes a BlockChain object and a slice of Block objects as input and returns a boolean value.

```go
func hasAllBlocks(chain *core.BlockChain, bs []*types.Block) bool {
	for _, b := range bs {
		if !chain.HasBlock(b.Hash(), b.NumberU64()) {
			return false
		}
	}
	return true
}
```

### Function: ImportChain

This function imports a blockchain from a local file. It takes a string value as the file name and returns a boolean value and an error. It imports the blockchain by calling the InsertChain function of the BlockChain object of the Ethereum instance.

```go
func (api *AdminAPI) ImportChain(file string) (bool, error) {
	in, err := os.Open(file)
	if err != nil {
		return false, err
	}
	defer in.Close()
	var reader io.Reader = in
	if strings.HasSuffix(file, ".gz") {
		if reader, err = gzip.NewReader(reader); err != nil {
			return false, err
		}
	}
	stream := rlp.NewStream(reader, 0)
	blocks, index := make([]*types.Block, 0, 2500), 0
	for batch := 0; ; batch++ {
		for len(blocks) < cap(blocks) {
			block := new(types.Block)
			if err := stream.Decode(block); err == io.EOF {
				break
			} else if err != nil {
				return false, fmt.Errorf("block %d: failed to parse: %v", index, err)
			}
			blocks = append(blocks, block)
			index++
		}
		if len(blocks) == 0 {
			break
		}
		if hasAllBlocks(api.eth.BlockChain(), blocks) {
			blocks = blocks[:0]
			continue
		}
		if _, err := api.eth.BlockChain().InsertChain(blocks); err != nil {
			return false, fmt.Errorf ## Documentation for the DebugAPI Codebase

### Function: I

```go
func I(eth Backend) *DebugAPI {
	return &DebugAPI{eth: eth}
}
```

This function returns a new instance of the DebugAPI struct with the given Ethereum backend.

### Function: DumpBlock

```go
func (api *DebugAPI) DumpBlock(blockNr rpc.BlockNumber) (state.Dump, error) {
	// function body
}
```

This function retrieves the entire state of the database at a given block. It takes a block number as input and returns a state dump and an error.

### Function: Preimage

```go
func (api *DebugAPI) Preimage(ctx context.Context, hash common.Hash) (hexutil.Bytes, error) {
	// function body
}
```

This function returns the preimage for a sha3 hash, if known. It takes a context and a hash as input and returns a hexutil byte array and an error.

### Function: BadBlockArgs

```go
type BadBlockArgs struct {
	Hash  common.Hash            `json:"hash"`
	Block map[string]interface{} `json:"block"`
	RLP   string                 `json:"rlp"`
}
```

This struct represents the entries in the list returned when bad blocks are queried. It has three fields: Hash, Block, and RLP.

### Function: GetBadBlocks

```go
func (api *DebugAPI) GetBadBlocks(ctx context.Context) ([]*BadBlockArgs, error) {
	// function body
}
```

This function returns a list of the last 'bad blocks' that the client has seen on the network and returns them as a JSON list of block hashes. It takes a context as input and returns a list of BadBlockArgs and an error.

### Constant: AccountRangeMaxResults

```go
const AccountRangeMaxResults = 256
```

This constant represents the maximum number of results to be returned per call in the AccountRange function.

### Function: AccountRange

```go
func (api *DebugAPI) AccountRange(blockNrOrHash rpc.BlockNumberOrHash, start hexutil.Bytes, maxResults int, nocode, nostorage, incompletes bool) (state.IteratorDump, error) {
	// function body
}
```

This function enumerates all accounts in the given block and start point in paging request. It takes a block number or hash, a start byte array, a maximum number of results, and three boolean flags as input and returns a state iterator dump and an error. ## Documentation for Ethereum Codebase

### Function: GetModifiedAccountsByNumber

```go
// GetModifiedAccountsByNumber returns all accounts that have changed between the
// two blocks specified. A change is defined as a difference in nonce, balance,
// code hash, or storage hash.
//
// With one parameter, returns the list of accounts modified in the specified block.
func (api *DebugAPI) GetModifiedAccountsByNumber(ctx context.Context, numberOrHash rpc.BlockNumberOrHash) (accounts []common.Address, err error) {
	// Retrieve the block
	block, statedb, err := api.getStatedbAndBlock(numberOrHash)
	if err != nil {
		return nil, err
	}
	defer statedb.Database().TrieDB().Discard(statedb.TrieDB().NodeIterator(nil))

	// Retrieve the previous block
	prevBlock, prevStatedb, err := api.getStatedbAndBlock(rpc.BlockNumberOrHash{BlockNumber: rpc.BlockNumber(block.Number().Int64() - 1)})
	if err != nil {
		return nil, err
	}
	defer prevStatedb.Database().TrieDB().Discard(prevStatedb.TrieDB().NodeIterator(nil))

	// Compare the accounts
	return api.compareAccounts(statedb, prevStatedb)
}
```

This function is used to retrieve all accounts that have changed between two specified blocks. A change is defined as a difference in nonce, balance, code hash, or storage hash. If only one block is specified, the function returns the list of accounts modified in the specified block. 

#### Parameters
- `ctx context.Context`: The context of the function call.
- `numberOrHash rpc.BlockNumberOrHash`: The block number or hash to retrieve the accounts from.

#### Returns
- `accounts []common.Address`: The list of accounts that have changed between the two specified blocks.
- `err error`: An error if the function fails to retrieve the accounts.

### Function: StorageRangeAt

```go
// StorageRangeAt returns the storage at the given block height and transaction index.
func (api *DebugAPI) StorageRangeAt(ctx context.Context, blockHash common.Hash, txIndex int, contractAddress common.Address, keyStart hexutil.Bytes, maxResult int) (StorageRangeResult, error) {
	// Retrieve the block
	block := api.eth.blockchain.GetBlockByHash(blockHash)
	if block == nil {
		return StorageRangeResult{}, fmt.Errorf("block %#x not found", blockHash)
	}
	_, _, statedb, release, err := api.eth.stateAtTransaction(ctx, block, txIndex, 0)
	if err != nil {
		return StorageRangeResult{}, err
	}
	defer release()

	st, err := statedb.StorageTrie(contractAddress)
	if err != nil {
		return StorageRangeResult{}, err
	}
	if st == nil {
		return StorageRangeResult{}, fmt.Errorf("account %x doesn't exist", contractAddress)
	}
	return storageRangeAt(st, keyStart, maxResult)
}
```

This function is used to retrieve the storage at the given block height and transaction index. 

#### Parameters
- `ctx context.Context`: The context of the function call.
- `blockHash common.Hash`: The hash of the block to retrieve the storage from.
- `txIndex int`: The index of the transaction in the block.
- `contractAddress common.Address`: The address of the contract to retrieve the storage from.
- `keyStart hexutil.Bytes`: The starting key to retrieve the storage from.
- `maxResult int`: The maximum number of results to retrieve.

#### Returns
- `StorageRangeResult`: The storage range result containing the storage and the next key.
- `err error`: An error if the function fails to retrieve the storage.

### Function: GetModifiedAccountsByNumber

```go
// GetModifiedAccountsByNumber returns all accounts that have changed between the
// two blocks specified. A change is defined as a difference in nonce, balance,
// code hash, or storage hash.
//
// With one parameter, returns the list of accounts modified in the specified block.
func (api *DebugAPI) GetModifiedAccountsByNumber(ctx context.Context, numberOrHash rpc.BlockNumberOrHash) (accounts []common.Address, err error) {
	// Retrieve the block
	block, statedb, err := api.getStatedbAndBlock(numberOrHash)
	if err != nil {
		return nil, err
	}
	defer statedb.Database().TrieDB().Discard(statedb.TrieDB().NodeIterator(nil))

	// Retrieve the previous block
	prevBlock, prevStatedb, err := api.getStatedbAndBlock(rpc.BlockNumberOrHash{BlockNumber: rpc.BlockNumber(block.Number().Int64() - 1)})
	if err != nil {
		return nil, err
	}
	defer prevStatedb.Database().TrieDB().Discard(prevStatedb.TrieDB().NodeIterator(nil))

	// Compare the accounts
	return api.compareAccounts(statedb, prevStatedb)
}
```

This function is used to retrieve all accounts that have changed between two specified blocks. A change is defined as a difference in nonce, balance, code hash, or storage hash. If only one block is specified, the function returns the list of accounts modified in the specified block. 

#### Parameters
- `ctx context.Context`: The context of the function call.
- `numberOrHash rpc.BlockNumberOrHash`: The block number or hash to retrieve the accounts from.

#### Returns
- `accounts []common.Address`: The list of accounts that have changed between the two specified blocks.
- `err error`: An error if the function fails to retrieve the accounts. ## Documentation for the Ethereum Codebase

### Function: AccountsByNumber

```go
func (api *DebugAPI) AccountsByNumber(startNum uint64, endNum *uint64) ([]common.Address, error) {
	var startBlock, endBlock *types.Block

	startBlock = api.eth.blockchain.GetBlockByNumber(startNum)
	if startBlock == nil {
		return nil, fmt.Errorf("start block %x not found", startNum)
	}

	if endNum == nil {
		endBlock = startBlock
		startBlock = api.eth.blockchain.GetBlockByHash(startBlock.ParentHash())
		if startBlock == nil {
			return nil, fmt.Errorf("block %x has no parent", endBlock.Number())
		}
	} else {
		endBlock = api.eth.blockchain.GetBlockByNumber(*endNum)
		if endBlock == nil {
			return nil, fmt.Errorf("end block %d not found", *endNum)
		}
	}
	return api.getModifiedAccounts(startBlock, endBlock)
}
```

This function retrieves all accounts that have changed between two blocks specified. It takes in two parameters, `startNum` and `endNum`, which are the block numbers of the start and end blocks respectively. If `endNum` is not specified, it defaults to the parent block of `startBlock`. It returns a slice of `common.Address` and an error.

### Function: GetModifiedAccountsByHash

```go
func (api *DebugAPI) GetModifiedAccountsByHash(startHash common.Hash, endHash *common.Hash) ([]common.Address, error) {
	var startBlock, endBlock *types.Block

	startBlock = api.eth.blockchain.GetBlockByHash(startHash)
	if startBlock == nil {
		return nil, fmt.Errorf("start block %x not found", startHash)
	}

	if endHash == nil {
		endBlock = startBlock
		startBlock = api.eth.blockchain.GetBlockByHash(startBlock.ParentHash())
		if startBlock == nil {
			return nil, fmt.Errorf("block %x has no parent", endBlock.Number())
		}
	} else {
		endBlock = api.eth.blockchain.GetBlockByHash(*endHash)
		if endBlock == nil {
			return nil, fmt.Errorf("end block %x not found", *endHash)
		}
	}
	return api.getModifiedAccounts(startBlock, endBlock)
}
```

This function retrieves all accounts that have changed between two blocks specified. It takes in two parameters, `startHash` and `endHash`, which are the block hashes of the start and end blocks respectively. If `endHash` is not specified, it defaults to the parent block of `startBlock`. It returns a slice of `common.Address` and an error.

### Function: getModifiedAccounts

```go
func (api *DebugAPI) getModifiedAccounts(startBlock, endBlock *types.Block) ([]common.Address, error) {
	if startBlock.Number().Uint64() >= endBlock.Number().Uint64() {
		return nil, fmt.Errorf("start block height (%d) must be less than end block height (%d)", startBlock.Number().Uint64(), endBlock.Number().Uint64())
	}
	triedb := api.eth.BlockChain().StateCache().TrieDB()

	oldTrie, err := trie.NewStateTrie(trie.StateTrieID(startBlock.Root()), triedb)
	if err != nil {
		return nil, err
	}
	newTrie, err := trie.NewStateTrie(trie.StateTrieID(endBlock.Root()), triedb)
	if err != nil {
		return nil, err
	}
	diff, _ := trie.NewDifferenceIterator(oldTrie.NodeIterator([]byte{}), newTrie.NodeIterator([]byte{}))
	iter := trie.NewIterator(diff)

	var dirty []common.Address
	for iter.Next() {
		key := newTrie.GetKey(iter.Key)
		if key == nil {
			return nil, fmt.Errorf("no preimage found for hash %x", iter.Key)
		}
		dirty = append(dirty, common.BytesToAddress(key))
	}
	return dirty, nil
}
```

This function retrieves all accounts that have changed between two blocks specified. It takes in two parameters, `startBlock` and `endBlock`, which are the start and end blocks respectively. It returns a slice of `common.Address` and an error.

### Function: GetAccessibleState

```go
func (api *DebugAPI) GetAccessibleState(from, to rpc.BlockNumber) (uint64, error) {
	db := api.eth.ChainDb()
	var pivot uint64
	if p := rawdb.ReadLastPivotNumber(db); p != nil {
		pivot = *p
		log.Info("Found fast-sync pivot marker", "number", pivot)
	}
	var resolveNum = func(num rpc.BlockNumber) (uint64, error) {
		// We don't have state for pending (-2), so treat it as latest
		if num.Int64() < 0 {
			block := api.eth.blockchain.CurrentBlock()
			if block == nil {
				return 0, fmt.Errorf("current block missing")
			}
			return block.Number.Uint64(), nil
		}
		return uint64(num.Int64()), nil
	}
	var (
		start   uint64
		end     uint64
		delta   = int64(1)
		lastLog time.Time
		err     
```

This function returns the first number where the node has accessible state on disk. It takes in two parameters, `from` and `to`, which are the sequence of blocks to search, which can go either forwards or backwards. It returns a `uint64` and an error. ## Documentation for the Ethereum Codebase

### Function: FindState

The `FindState` function is used to find the state of a given block number by searching for the root hash of the state trie. It takes two arguments, `from` and `to`, which represent the block numbers to search between. The function returns the block number where the state was found and an error if the state was not found.

```go
func (api *DebugAPI) FindState(from, to string) (uint64, error) {
	var (
		start, end int64
		delta      int64 = 1
		err        error
	)
	if start, err = resolveNum(from); err != nil {
		return 0, err
	}
	if end, err = resolveNum(to); err != nil {
		return 0, err
	}
	if start == end {
		return 0, fmt.Errorf("from and to needs to be different")
	}
	if start > end {
		delta = -1
	}
	for i := int64(start); i != int64(end); i += delta {
		if time.Since(lastLog) > 8*time.Second {
			log.Info("Finding roots", "from", start, "to", end, "at", i)
			lastLog = time.Now()
		}
		if i < int64(pivot) {
			continue
		}
		h := api.eth.BlockChain().GetHeaderByNumber(uint64(i))
		if h == nil {
			return 0, fmt.Errorf("missing header %d", i)
		}
		if ok, _ := api.eth.ChainDb().Has(h.Root[:]); ok {
			return uint64(i), nil
		}
	}
	return 0, errors.New("no state found")
}
```

### Function: SetTrieFlushInterval

The `SetTrieFlushInterval` function is used to configure how often in-memory tries are persisted to disk. The value is in terms of block processing time, not wall clock. It takes a string argument `interval` representing the duration of the interval. The function returns an error if the duration cannot be parsed.

```go
func (api *DebugAPI) SetTrieFlushInterval(interval string) error {
	t, err := time.ParseDuration(interval)
	if err != nil {
		return err
	}
	api.eth.blockchain.SetTrieFlushInterval(t)
	return nil
}
```