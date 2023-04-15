## Documentation for the Light Package

### Variable: NoOdr

```go
var NoOdr = context.Background()
```

The `NoOdr` variable is a default context passed to an ODR capable function when the ODR service is not required.

### Variable: ErrNoPeers

```go
var ErrNoPeers = errors.New("no suitable peers available")
```

The `ErrNoPeers` variable is an error that is returned if no peers capable of serving a queued request are available.

### Interface: OdrBackend

```go
type OdrBackend interface {
	Database() ethdb.Database
	ChtIndexer() *core.ChainIndexer
	BloomTrieIndexer() *core.ChainIndexer
	BloomIndexer() *core.ChainIndexer
	Retrieve(ctx context.Context, req OdrRequest) error
	RetrieveTxStatus(ctx context.Context, req *TxStatusRequest) error
	IndexerConfig() *IndexerConfig
}
```

The `OdrBackend` interface is an interface to a backend service that handles ODR retrievals. It defines methods for retrieving data from the backend, such as the database, chain indexer, and bloom indexer. It also defines methods for retrieving transaction status and the indexer configuration.

### Interface: OdrRequest

```go
type OdrRequest interface {
	StoreResult(db ethdb.Database)
}
```

The `OdrRequest` interface is an interface for retrieval requests. It defines a method for storing the retrieved data in a local database.

### Type: TrieID

```go
type TrieID struct {
	BlockHash   common.Hash
	BlockNumber uint64
	StateRoot   common.Hash
	Root        common.Hash
	AccKey      []byte
}
```

The `TrieID` type identifies a state or account storage trie. It contains the block hash, block number, state root, root, and account key.

### Function: StateTrieID

```go
func StateTrieID(header *types.Header) *TrieID {
	return &TrieID{
		BlockHash:   header.Hash(),
		BlockNumber: header.Number.Uint64(),
		StateRoot:   header.Root,
		Root:        header.Root,
		AccKey:      nil,
	}
}
```

The `StateTrieID` function returns a `TrieID` for a state trie belonging to a certain block header. It takes a header as an argument and returns a `TrieID` with the block hash, block number, state root, root, and account key set to their default values.

### Function: StorageTrieID

```go
func StorageTrieID(state *TrieID, addrHash, root common.Hash) *TrieID {
	return &TrieID{
		BlockHash:   state.BlockHash,
		BlockNumber: state.BlockNumber,
		StateRoot:   state.StateRoot,
		AccKey:      addrHash[:],
		Root:        root,
	}
}
```

The `StorageTrieID` function returns a `TrieID` for a contract storage trie at a given account of a given state trie. It takes a state trie, an address hash, and a root hash as arguments and returns a `TrieID` with the block hash, block number, state root, account key, and root set to their respective values.

### Type: TrieRequest

```go
type TrieRequest struct {
	Id    *TrieID
	Key   []byte
	Proof *NodeSet
}
```

The `TrieRequest` type is the ODR request type for state/storage trie entries. It contains a `TrieID`, a key, and a proof.

### Function: StoreResult

```go
func (req *TrieRequest) StoreResult(db ethdb.Database) {
	req.Proof.Store(db)
}
```

The `StoreResult` function stores the retrieved data in a local database. It takes a database as an argument and stores the proof in it.

### Type: CodeRequest

```go
type CodeRequest struct {
	Id   *TrieID
	Hash common.Hash
	Data []byte
}
```

The `CodeRequest` type is the ODR request type for retrieving contract code. It contains a `TrieID`, a hash, and data.

### Function: StoreResult

```go
func (req *CodeRequest) StoreResult(db ethdb.Database) {
	rawdb.WriteCode(db, req.Hash, req.Data)
}
```

The `StoreResult` function stores the retrieved data in a local database. It takes a database as an argument and writes the code to it.

### Type: BlockRequest

```go
type BlockRequest struct {
	Hash   common.Hash
	Number uint64
	Header *types.Header
	Rlp    []byte
}
```

The `BlockRequest` type is the ODR request type for retrieving block bodies. It contains a hash, a number, a header, and RLP data.

### Function: StoreResult

```go
func (req *BlockRequest ## Documentation for the ODR Request Types

### Function: StoreResult

```go
func (req *BlockRequest) StoreResult(db ethdb.Database) {
	rawdb.WriteBodyRLP(db, req.Hash, req.Number, req.Rlp)
}
```

The `StoreResult` function is a method that stores the retrieved block data in the local database. It takes a database as an argument and writes the block body RLP to the database using the `WriteBodyRLP` function of the `rawdb` package.

### Type: ReceiptsRequest

```go
type ReceiptsRequest struct {
	Untrusted bool // Indicator whether the result retrieved is trusted or not
	Hash      common.Hash
	Number    uint64
	Header    *types.Header
	Receipts  types.Receipts
}
```

The `ReceiptsRequest` type is an ODR request type for retrieving receipts. It contains a boolean indicating whether the result retrieved is trusted or not, the hash and number of the block, the header of the block, and the receipts of the block.

### Function: StoreResult

```go
func (req *ReceiptsRequest) StoreResult(db ethdb.Database) {
	if !req.Untrusted {
		rawdb.WriteReceipts(db, req.Hash, req.Number, req.Receipts)
	}
}
```

The `StoreResult` function is a method that stores the retrieved receipt data in the local database. It takes a database as an argument and writes the receipts to the database using the `WriteReceipts` function of the `rawdb` package. If the result retrieved is untrusted, it does not store the data.

### Type: ChtRequest

```go
type ChtRequest struct {
	Config           *IndexerConfig
	ChtNum, BlockNum uint64
	ChtRoot          common.Hash
	Header           *types.Header
	Td               *big.Int
	Proof            *NodeSet
}
```

The `ChtRequest` type is an ODR request type for retrieving a header by Canonical Hash Trie. It contains the indexer configuration, the CHT number and block number, the CHT root, the header of the block, the total difficulty of the block, and the proof.

### Function: StoreResult

```go
func (req *ChtRequest) StoreResult(db ethdb.Database) {
	hash, num := req.Header.Hash(), req.Header.Number.Uint64()
	rawdb.WriteHeader(db, req.Header)
	rawdb.WriteTd(db, hash, num, req.Td)
	rawdb.WriteCanonicalHash(db, hash, num)
}
```

The `StoreResult` function is a method that stores the retrieved header data in the local database. It takes a database as an argument and writes the header, total difficulty, and canonical hash to the database using the `WriteHeader`, `WriteTd`, and `WriteCanonicalHash` functions of the `rawdb` package.

### Type: BloomRequest

```go
type BloomRequest struct {
	OdrRequest
	Config           *IndexerConfig
	BloomTrieNum     uint64
	BitIdx           uint
	SectionIndexList []uint64
	BloomTrieRoot    common.Hash
	BloomBits        [][]byte
	Proofs           *NodeSet
}
```

The `BloomRequest` type is an ODR request type for retrieving bloom filters from a CHT structure. It contains an `OdrRequest` field, the indexer configuration, the bloom trie number, the bit index, the section index list, the bloom trie root, the bloom bits, and the proof.

### Function: StoreResult

```go
func (req *BloomRequest) StoreResult(db ethdb.Database) {
	for i, sectionIdx := range req.SectionIndexList {
		sectionHead := rawdb.ReadCanonicalHash(db, (sectionIdx+1)*req.Config.BloomTrieSize-1)
		rawdb.WriteBloomBits(db, req.BitIdx, sectionIdx, sectionHead, req.BloomBits[i])
	}
}
```

The `StoreResult` function is a method that stores the retrieved bloom filter data in the local database. It takes a database as an argument and writes the bloom bits to the database using the `WriteBloomBits` function of the `rawdb` package.

### Type: TxStatus

```go
type TxStatus struct {
	Status txpool.TxStatus
	Lookup *rawdb.LegacyTxLookupEntry `rlp:"nil"`
	Error  string
}
```

The `TxStatus` type describes the status of a transaction. It contains the transaction status, a lookup entry, and an error message.

### Type: TxStatusRequest

```go
type TxStatusRequest struct {
	Hashes []common.Hash
	Status []TxStatus
}
```

The `TxStatusRequest` type is an ODR request type for retrieving transaction status. It contains an array of transaction hashes and an array of transaction statuses.

### Function: StoreResult

```go
func (req *TxStatusRequest) StoreResult(db ethdb.Database) {}
```

The `StoreResult` function is a method that does not store any retrieved data in the local database. It takes a database as an argument and does nothing.