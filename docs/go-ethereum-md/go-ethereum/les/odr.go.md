## Les Package Documentation

This package contains the implementation of the LES (Light Ethereum Subprotocol) backend. It provides an implementation of the `light.OdrBackend` interface, which is used by the LES protocol to retrieve data from the Ethereum network.

### LesOdr

`LesOdr` is the main struct of the package, which implements the `light.OdrBackend` interface. It contains the necessary chain indexers, the backing database, and the server peer set. It also has a `retrieveManager` to manage the pending retrievals.

#### NewLesOdr

```go
func NewLesOdr(db ethdb.Database, config *light.IndexerConfig, peers *serverPeerSet, retriever *retrieveManager) *LesOdr
```

`NewLesOdr` is a constructor function that creates a new instance of `LesOdr`. It takes the following parameters:

- `db`: The backing database.
- `config`: The indexer configuration.
- `peers`: The server peer set.
- `retriever`: The retrieve manager.

#### Stop

```go
func (odr *LesOdr) Stop()
```

`Stop` is a method of `LesOdr` that cancels all pending retrievals.

#### Database

```go
func (odr *LesOdr) Database() ethdb.Database
```

`Database` is a method of `LesOdr` that returns the backing database.

#### SetIndexers

```go
func (odr *LesOdr) SetIndexers(chtIndexer, bloomTrieIndexer, bloomIndexer *core.ChainIndexer)
```

`SetIndexers` is a method of `LesOdr` that adds the necessary chain indexers to the ODR backend. It takes the following parameters:

- `chtIndexer`: The CHT chain indexer.
- `bloomTrieIndexer`: The bloom trie chain indexer.
- `bloomIndexer`: The bloombits chain indexer.

#### ChtIndexer

```go
func (odr *LesOdr) ChtIndexer() *core.ChainIndexer
```

`ChtIndexer` is a method of `LesOdr` that returns the CHT chain indexer.

#### BloomTrieIndexer

```go
func (odr *LesOdr) BloomTrieIndexer() *core.ChainIndexer
```

`BloomTrieIndexer` is a method of `LesOdr` that returns the bloom trie chain indexer.

#### BloomIndexer

```go
func (odr *LesOdr) BloomIndexer() *core.ChainIndexer
```

`BloomIndexer` is a method of `LesOdr` that returns the bloombits chain indexer.

#### IndexerConfig

```go
func (odr *LesOdr) IndexerConfig() *light.IndexerConfig
```

`IndexerConfig` is a method of `LesOdr` that returns the indexer configuration.

### Msg

`Msg` is a struct that encodes a LES message that delivers reply data for a request. It contains the message type, the request ID, and the object.

### peerByTxHistory

`peerByTxHistory` is a heap.Interface implementation that can sort the server peer set by transaction history.

### Constants

- `MsgBlockHeaders`: The message type for block headers.
- `MsgBlockBodies`: The message type for block bodies.
- `MsgCode`: The message type for contract code.
- `MsgReceipts`: The message type for transaction receipts.
- `MsgProofsV2`: The message type for Merkle proofs.
- `MsgHelperTrieProofs`: The message type for helper trie proofs.
- `MsgTxStatus`: The message type for transaction status.

- `maxTxStatusRetry`: The maximum retries that will be made for a transaction status request.
- `maxTxStatusCandidates`: The maximum LES servers that the transaction status requests will be sent to. ## Function: RetrieveTxStatus

The `RetrieveTxStatus` function retrieves the transaction status from the LES network. It takes a context and a `TxStatusRequest` as input and returns an error. The function sends the request to the peers with the longest transaction history and assembles the result. If the transaction status is unknown, the function retries a certain number of times to give a weak guarantee. 

### Parameters
- `ctx context.Context`: The context of the request.
- `req *light.TxStatusRequest`: The transaction status request.

### Return Value
- `error`: An error if the function fails to retrieve the transaction status.

### Example
```go
txStatusReq := &light.TxStatusRequest{Hashes: []common.Hash{hash1, hash2}}
err := odr.RetrieveTxStatus(ctx, txStatusReq)
if err != nil {
    log.Println("Failed to retrieve transaction status:", err)
}
```

## Function: Retrieve

The `Retrieve` function tries to fetch an object from the LES network. It takes a context and an `OdrRequest` as input and returns an error. If the network retrieval is successful, it stores the object in the local database.

### Parameters
- `ctx context.Context`: The context of the request.
- `req light.OdrRequest`: The object retrieval request.

### Return Value
- `error`: An error if the function fails to retrieve the object.

### Example
```go
odrReq := light.OdrRequest{Block: blockNum, Hash: blockHash}
err := odr.Retrieve(ctx, odrReq)
if err != nil {
    log.Println("Failed to retrieve object:", err)
}
```