# Package `core`

The `core` package provides the core functionality of the Ethereum blockchain. It includes the implementation of the transaction sender recoverer and cacher.

## Variable `SenderCacher`

`SenderCacher` is a concurrent transaction sender recoverer and cacher.

## Type `txSenderCacherRequest`

`txSenderCacherRequest` is a request for recovering transaction senders with a specific signature scheme and caching it into the transactions themselves. The `inc` field defines the number of transactions to skip after each recovery, which is used to feed the same underlying input array to different threads but ensure they process the early transactions fast.

## Type `txSenderCacher`

`txSenderCacher` is a helper structure to concurrently ecrecover transaction senders from digital signatures on background threads.

### Function `newTxSenderCacher`

`newTxSenderCacher` creates a new transaction sender background cacher and starts as many processing goroutines as allowed by the GOMAXPROCS on construction.

```go
func newTxSenderCacher(threads int) *txSenderCacher
```

##### Parameters

- `threads` - the number of threads to start.

##### Return Values

- `*txSenderCacher` - a new transaction sender background cacher.

### Function `cache`

`cache` is an infinite loop, caching transaction senders from various forms of data structures.

```go
func (cacher *txSenderCacher) cache()
```

### Function `Recover`

`Recover` recovers the senders from a batch of transactions and caches them back into the same data structures. There is no validation being done, nor any reaction to invalid signatures. That is up to calling code later.

```go
func (cacher *txSenderCacher) Recover(signer types.Signer, txs []*types.Transaction)
```

##### Parameters

- `signer` - the signer to use.
- `txs` - the transactions to recover.

### Function `RecoverFromBlocks`

`RecoverFromBlocks` recovers the senders from a batch of blocks and caches them back into the same data structures. There is no validation being done, nor any reaction to invalid signatures. That is up to calling code later.

```go
func (cacher *txSenderCacher) RecoverFromBlocks(signer types.Signer, blocks []*types.Block)
``` 

##### Parameters

- `signer` - the signer to use.
- `blocks` - the blocks to recover.