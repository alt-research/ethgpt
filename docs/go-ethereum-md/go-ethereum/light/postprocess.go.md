## Documentation for the Light Codebase

### Type: IndexerConfig

```go
type IndexerConfig struct {
	ChtSize           uint64
	ChtConfirms       uint64
	BloomSize         uint64
	BloomConfirms     uint64
	BloomTrieSize     uint64
	BloomTrieConfirms uint64
}
```

The `IndexerConfig` type includes a set of configurations for chain indexers. It has fields for the block frequency for creating CHTs, the number of confirmations needed to generate/accept a canonical hash help trie, the block frequency for creating new bloom bits, the number of confirmations needed before a bloom section is considered probably final and its rotated bits are calculated, the block frequency for creating BloomTrie, and the number of confirmations needed to generate/accept a bloom trie.

### Variables: DefaultServerIndexerConfig, DefaultClientIndexerConfig, TestServerIndexerConfig, TestClientIndexerConfig

```go
var (
	DefaultServerIndexerConfig = &IndexerConfig{
		ChtSize:           params.CHTFrequency,
		ChtConfirms:       params.HelperTrieProcessConfirmations,
		BloomSize:         params.BloomBitsBlocks,
		BloomConfirms:     params.BloomConfirms,
		BloomTrieSize:     params.BloomTrieFrequency,
		BloomTrieConfirms: params.HelperTrieProcessConfirmations,
	}
	DefaultClientIndexerConfig = &IndexerConfig{
		ChtSize:           params.CHTFrequency,
		ChtConfirms:       params.HelperTrieConfirmations,
		BloomSize:         params.BloomBitsBlocksClient,
		BloomConfirms:     params.HelperTrieConfirmations,
		BloomTrieSize:     params.BloomTrieFrequency,
		BloomTrieConfirms: params.HelperTrieConfirmations,
	}
	TestServerIndexerConfig = &IndexerConfig{
		ChtSize:           128,
		ChtConfirms:       1,
		BloomSize:         16,
		BloomConfirms:     1,
		BloomTrieSize:     128,
		BloomTrieConfirms: 1,
	}
	TestClientIndexerConfig = &IndexerConfig{
		ChtSize:           128,
		ChtConfirms:       8,
		BloomSize:         128,
		BloomConfirms:     8,
		BloomTrieSize:     128,
		BloomTrieConfirms: 8,
	}
)
```

These variables are sets of configurations for chain indexers. They are used as default and test configurations for server and client side.

### Type: ChtNode

```go
type ChtNode struct {
	Hash  common.Hash
	Level uint
}
```

The `ChtNode` type represents a node in the Canonical Hash Trie (CHT). It has fields for the hash of the node and its level.

### Type: BloomTrieNode

```go
type BloomTrieNode struct {
	Hash  common.Hash
	Level uint
}
```

The `BloomTrieNode` type represents a node in the Bloom Trie. It has fields for the hash of the node and its level.

### Function: NewChainIndexer

```go
func NewChainIndexer(db ethdb.Database, config *IndexerConfig, chainConfig *params.ChainConfig, genesis common.Hash, header *types.Header, trie *trie.Trie, bloomTrie *trie.Trie, bloomBits *bitutil.BloomBits, logger log.Logger) *ChainIndexer
```

The `NewChainIndexer` function creates a new chain indexer. It takes a database, an indexer configuration, a chain configuration, a genesis hash, a header, a trie, a bloom trie, a bloom bits, and a logger as arguments. It returns a new chain indexer.

### Type: ChainIndexer

```go
type ChainIndexer struct {
	db               ethdb.Database
	config           *IndexerConfig
	chainConfig      *params.ChainConfig
	genesis          common.Hash
	logger           log.Logger
	cht              *trie.Trie
	bloomTrie        *trie.Trie
	bloomBits        *bitutil.BloomBits
	trustedChtRoot   common.Hash
	trustedBloomRoot common.Hash
}
```

The `ChainIndexer` type represents a chain indexer. It has fields for a database, an indexer configuration, a chain configuration, a genesis hash, a logger, a CHT, a bloom trie, a bloom bits, and trusted CHT and bloom roots.

### Function: (ci *ChainIndexer) Start

```go
func (ci *ChainIndexer) Start(ctx context.Context) error
```

The `Start` function starts the chain indexer. It takes a context ## Documentation for the CHT Chain Indexer

### Type: ChtNode

```go
type ChtNode struct {
	Hash common.Hash
	Td   *big.Int
}
```

The `ChtNode` type is a struct that represents a CHT node. It contains a hash and a total difficulty.

### Function: GetChtRoot

```go
func GetChtRoot(db ethdb.Database, sectionIdx uint64, sectionHead common.Hash) common.Hash {
	var encNumber [8]byte
	binary.BigEndian.PutUint64(encNumber[:], sectionIdx)
	data, _ := db.Get(append(append(rawdb.ChtPrefix, encNumber[:]...), sectionHead.Bytes()...))
	return common.BytesToHash(data)
}
```

The `GetChtRoot` function reads the CHT root associated with the given section from the database. It takes a database, section index, and section head as arguments. It retrieves the CHT root from the database using the section index and section head.

### Function: StoreChtRoot

```go
func StoreChtRoot(db ethdb.Database, sectionIdx uint64, sectionHead, root common.Hash) {
	var encNumber [8]byte
	binary.BigEndian.PutUint64(encNumber[:], sectionIdx)
	db.Put(append(append(rawdb.ChtPrefix, encNumber[:]...), sectionHead.Bytes()...), root.Bytes())
}
```

The `StoreChtRoot` function writes the CHT root associated with the given section into the database. It takes a database, section index, section head, and root as arguments. It stores the CHT root in the database using the section index and section head.

### Type: ChtIndexerBackend

```go
type ChtIndexerBackend struct {
	disablePruning       bool
	diskdb, trieTable    ethdb.Database
	odr                  OdrBackend
	triedb               *trie.Database
	section, sectionSize uint64
	lastHash             common.Hash
	trie                 *trie.Trie
}
```

The `ChtIndexerBackend` type is a struct that implements the `core.ChainIndexerBackend` interface. It contains fields for disabling pruning, a disk database, a trie table, an ODR backend, a trie database, a section index, a section size, the last hash, and a trie.

### Function: NewChtIndexer

```go
func NewChtIndexer(db ethdb.Database, odr OdrBackend, size, confirms uint64, disablePruning bool) *core.ChainIndexer {
	trieTable := rawdb.NewTable(db, string(rawdb.ChtTablePrefix))
	backend := &ChtIndexerBackend{
		diskdb:         db,
		odr:            odr,
		trieTable:      trieTable,
		triedb:         trie.NewDatabaseWithConfig(trieTable, &trie.Config{Cache: 1}), // Use a tiny cache only to keep memory down
		sectionSize:    size,
		disablePruning: disablePruning,
	}
	return core.NewChainIndexer(db, rawdb.NewTable(db, string(rawdb.ChtIndexTablePrefix)), backend, size, confirms, time.Millisecond*100, "cht")
}
```

The `NewChtIndexer` function creates a new CHT chain indexer. It takes a database, an ODR backend, a size, a number of confirms, and a flag for disabling pruning as arguments. It creates a new trie table and backend, and returns a new chain indexer.

### Function: fetchMissingNodes

```go
func (c *ChtIndexerBackend) fetchMissingNodes(ctx context.Context, section uint64, root common.Hash) error {
	batch := c.trieTable.NewBatch()
	r := &ChtRequest{ChtRoot: root, ChtNum: section - 1, BlockNum: section*c.sectionSize - 1, Config: c.odr.IndexerConfig()}
	for {
		err := c.odr.Retrieve(ctx, r)
		switch err {
		case nil:
			r.Proof.Store(batch)
			return batch.Write()
		case ErrNoPeers:
			// if there are no peers to serve, retry later
			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(time.Second * 10):
				// stay in the loop and try again
			}
		default:
			return err
		}
	}
}
```

The `fetchMissing ## Documentation for the Chain Indexer Backend Codebase

### Function: Commit

```go
func (c *ChtIndexerBackend) Commit(root common.Hash, nodes *trie.NodeSet) error {
	// Commit trie changes into trie database in case it's not nil.
	if nodes != nil {
		if err := c.triedb.Update(trie.NewWithNodeSet(nodes)); err != nil {
			return err
		}
		if err := c.triedb.Commit(root, false); err != nil {
			return err
		}
	}
	// Re-create trie with newly generated root and updated database.
	var err error
	c.trie, err = trie.New(trie.TrieID(root), c.triedb)
	if err != nil {
		return err
	}
	// Pruning historical trie nodes if necessary.
	if !c.disablePruning {
		it := c.trieTable.NewIterator(nil, nil)
		defer it.Release()

		var (
			deleted int
			batch   = c.trieTable.NewBatch()
			t       = time.Now()
		)
		hashes := make(map[common.Hash]struct{})
		if nodes != nil {
			for _, hash := range nodes.Hashes() {
				hashes[hash] = struct{}{}
			}
		}
		for it.Next() {
			trimmed := bytes.TrimPrefix(it.Key(), rawdb.ChtTablePrefix)
			if len(trimmed) == common.HashLength {
				if _, ok := hashes[common.BytesToHash(trimmed)]; !ok {
					batch.Delete(trimmed)
					deleted += 1
				}
			}
		}
		if err := batch.Write(); err != nil {
			return err
		}
		log.Debug("Prune historical CHT trie nodes", "deleted", deleted, "remaining", len(hashes), "elapsed", common.PrettyDuration(time.Since(t)))
	}
	log.Info("Storing CHT", "section", c.section, "head", fmt.Sprintf("%064x", c.lastHash), "root", fmt.Sprintf("%064x", root))
	StoreChtRoot(c.diskdb, c.section, c.lastHash, root)
	return nil
}
```

The `Commit` function is a method that commits changes to the CHT trie database. It takes a root and a node set as arguments. If the node set is not nil, it updates the trie database with the new nodes and commits the changes. It then creates a new trie with the updated root and database. If pruning is not disabled, it prunes historical trie nodes that are not in the new node set. Finally, it stores the CHT root in the disk database.

### Function: Prune

```go
func (c *ChtIndexerBackend) Prune(threshold uint64) error {
	// Short circuit if the light pruning is disabled.
	if c.disablePruning {
		return nil
	}
	t := time.Now()
	// Always keep genesis header in database.
	start, end := uint64(1), (threshold+1)*c.sectionSize

	var batch = c.diskdb.NewBatch()
	for {
		numbers, hashes := rawdb.ReadAllCanonicalHashes(c.diskdb, start, end, 10240)
		if len(numbers) == 0 {
			break
		}
		for i := 0; i < len(numbers); i++ {
			// Keep hash<->number mapping in database otherwise the hash based
			// API(e.g. GetReceipt, GetLogs) will be broken.
			//
			// Storage size wise, the size of a mapping is ~41bytes. For one
			// section is about 1.3MB which is acceptable.
			//
			// In order to totally get rid of this index, we need an additional
			// flag to specify how many historical data light client can serve.
			rawdb.DeleteCanonicalHash(batch, numbers[i])
			rawdb.DeleteBlockWithoutNumber(batch, hashes[i], numbers[i])
		}
		if batch.ValueSize() > ethdb.IdealBatchSize {
			if err := batch.Write(); err != nil {
				return err
			}
			batch.Reset()
		}
		start = numbers[len(numbers)-1] + 1
	}
	if err := batch.Write(); err != nil {
		return err
	}
	log.Debug("Prune history headers", "threshold", threshold, "elapsed", common.PrettyDuration(time.Since(t)))
	return nil
}
``` ## Documentation for the BloomTrieIndexerBackend Codebase

### Type: BloomTrieIndexerBackend

```go
type BloomTrieIndexerBackend struct {
	disablePruning    bool
	diskdb, trieTable ethdb.Database
	triedb            *trie.Database
	odr               OdrBackend
	section           uint64
	parentSize        uint64
	size              uint64
	bloomTrieRatio    uint64
	trie              *trie.Trie
	sectionHeads      []common.Hash
}
```

The `BloomTrieIndexerBackend` type is a struct that represents the backend for a BloomTrie chain indexer. It contains fields for disabling pruning, disk database, trie table, trie database, ODR backend, section, parent size, size, bloomTrieRatio, trie, and section heads.

### Function: NewBloomTrieIndexer

```go
func NewBloomTrieIndexer(db ethdb.Database, odr OdrBackend, parentSize, size uint64, disablePruning bool) *core.ChainIndexer {
	trieTable := rawdb.NewTable(db, string(rawdb.BloomTrieTablePrefix))
	backend := &BloomTrieIndexerBackend{
		diskdb:         db,
		odr:            odr,
		trieTable:      trieTable,
		triedb:         trie.NewDatabaseWithConfig(trieTable, &trie.Config{Cache: 1}), // Use a tiny cache only to keep memory down
		parentSize:     parentSize,
		size:           size,
		disablePruning: disablePruning,
	}
	backend.bloomTrieRatio = size / parentSize
	backend.sectionHeads = make([]common.Hash, backend.bloomTrieRatio)
	return core.NewChainIndexer(db, rawdb.NewTable(db, string(rawdb.BloomTrieIndexPrefix)), backend, size, 0, time.Millisecond*100, "bloomtrie")
}
```

The `NewBloomTrieIndexer` function creates a new BloomTrie chain indexer. It takes a disk database, ODR backend, parent size, size, and disable pruning as arguments. It creates a new trie table and backend, sets the bloomTrieRatio, and creates a new section heads slice. It then returns a new chain indexer with the backend.

### Function: fetchMissingNodes

```go
func (b *BloomTrieIndexerBackend) fetchMissingNodes(ctx context.Context, section uint64, root common.Hash) error {
	indexCh := make(chan uint, types.BloomBitLength)
	type res struct {
		nodes *NodeSet
		err   error
	}
	resCh := make(chan res, types.BloomBitLength)
	for i := 0; i < 20; i++ {
		go func() {
			for bitIndex := range indexCh {
				r := &BloomRequest{BloomTrieRoot: root, BloomTrieNum: section - 1, BitIdx: bitIndex, SectionIndexList: []uint64{section - 1}, Config: b.odr.IndexerConfig()}
				for {
					if err := b.odr.Retrieve(ctx, r); err == ErrNoPeers {
						// if there are no peers to serve, retry later
						select {
						case <-ctx.Done():
							resCh <- res{nil, ctx.Err()}
							return
						case <-time.After(time.Second * 10):
							// stay in the loop and try again
						}
					} else {
						resCh <- res{r.Proofs, err}
						break
					}
				}
			}
		}()
	}
	for i := uint(0); i < types.BloomBitLength; i++ {
		indexCh <- i
	}
	close(indexCh)
	batch := b.trieTable.NewBatch()
	for i := uint(0); i < types.BloomBitLength; i++ {
		res := <-resCh
		if res.err != nil {
			return res.err
		}
		res.nodes.Store(batch)
	}
	return batch.Write()
}
```

The `fetchMissingNodes` function tries to retrieve the last entries of the latest ## Documentation for the BloomTrieIndexerBackend Codebase

### Function: Update

```go
func (b *BloomTrieIndexerBackend) Update(block *types.Block, receipts types.Receipts) error {
	// Short circuit if the bloom trie is disabled.
	if b.disableBloomTrie {
		return nil
	}
	// Update the bloom bits for each transaction receipt.
	for _, receipt := range receipts {
		if receipt.Status == types.ReceiptStatusSuccessful {
			b.bloom.Add(receipt.LogsBloom)
		}
	}
	// Update the bloom trie if the section is full.
	if b.bloom.Len() >= b.bloomTrieRatio*b.parentSize {
		if err := b.updateTrie(); err != nil {
			return err
		}
	}
	return nil
}
```

The `Update` function updates the bloom bits and the bloom trie for a given block and its receipts. It takes a block and its receipts as arguments. It adds the logs bloom of each successful receipt to the bloom filter. If the bloom filter is full, it updates the bloom trie.

### Function: updateTrie

```go
func (b *BloomTrieIndexerBackend) updateTrie() error {
	// Get the current section head and increment it.
	sectionHead := GetBloomTrieRoot(b.diskdb, b.section)
	b.sectionHeads = append(b.sectionHeads, sectionHead)
	b.section += 1
	// Create a new trie for the new section.
	newTrie, err := trie.New(common.Hash{}, b.triedb)
	if err != nil {
		return err
	}
	// Add the bloom filter to the trie.
	encKey := make([]byte, 8)
	binary.BigEndian.PutUint64(encKey, b.section)
	decomp := make([]byte, 0, b.bloom.Len())
	for i := uint64(0); i < b.parentSize; i++ {
		decomp = append(decomp, b.bloom.Get(i)...)
	}
	for i := uint64(0); i < b.bloomTrieRatio; i++ {
		data, err := rawdb.ReadBloomBits(b.diskdb, i, b.section*b.bloomTrieRatio+i, b.sectionHeads[i])
		if err != nil {
			return err
		}
		decompData, err2 := bitutil.DecompressBytes(data, int(b.parentSize/8))
		if err2 != nil {
			return err2
		}
		decomp = append(decomp, decompData...)
	}
	comp := bitutil.CompressBytes(decomp)

	decompSize += uint64(len(decomp))
	compSize += uint64(len(comp))
	if len(comp) > 0 {
		newTrie.Update(encKey[:], comp)
	} else {
		newTrie.Delete(encKey[:])
	}
	// Commit the new trie and update the section head.
	root, nodes := newTrie.Commit(false)
	if nodes != nil {
		if err := b.triedb.Update(trie.NewWithNodeSet(nodes)); err != nil {
			return err
		}
		if err := b.triedb.Commit(root, false); err != nil {
			return err
		}
	}
	// Re-create trie with newly generated root and updated database.
	var err error
	b.trie, err = trie.New(trie.TrieID(root), b.triedb)
	if err != nil {
		return err
	}
	// Prune historical trie nodes if necessary.
	if !b.disablePruning {
		it := b.trieTable.NewIterator(nil, nil)
		defer it.Release()

		var (
			deleted int
			batch   = b.trieTable.NewBatch()
			t       = time.Now()
		)
		hashes := make(map[common.Hash]struct{})
		if nodes != nil {
			for _, hash := range nodes.Hashes() {
				hashes[hash] = struct{}{}
			}
		}
		for it.Next() {
			trimmed := bytes.TrimPrefix(it.Key(), rawdb.BloomTrieTablePrefix)
			if len(trimmed) == common.HashLength {
				if _, ok := hashes[common.BytesToHash(trimmed)]; !ok {
					batch.Delete(trimmed)
					deleted += 1
				}
			}
		}
		if err := batch.Write(); err != nil {
			return err
		}
		log.Debug("Prune historical bloom trie nodes", "deleted", deleted, "remaining", len(hashes), "elapsed", common.PrettyDuration(time.Since(t)))
	}
	sectionHead := b.sectionHeads[b.bloomTrieRatio-1]
	StoreBloomTrieRoot(b.diskdb, b.section, sectionHead, root)
	log.Info("Storing bloom trie", "section", b.section, "head", fmt.Sprintf("%064x", sectionHead), "root", fmt.Sprintf("%064x", root), "compression", float64(compSize)/float64(decompSize))

	return nil
}
```

The `updateTrie` function updates the bloom trie with the current bloom filter. It creates a new section in the trie and adds the bloom filter to it. It then commits the new trie and updates the section head. If pruning is not disabled, it prunes historical trie nodes. Finally, it stores the bloom trie in the database.

### Function: Prune

```go
func (b *BloomTrieIndexerBackend) Prune(threshold uint64) error {
	// Short