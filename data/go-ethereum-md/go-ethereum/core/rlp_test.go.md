## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain. It includes the implementation of the Ethereum Virtual Machine (EVM), the consensus algorithm, and the block validation rules.

### Function `getBlock`

`getBlock` generates a block with the specified number of transactions, uncles, and data size.

```go
func getBlock(transactions int, uncles int, dataSize int) *types.Block
```

##### Parameters

- `transactions` - the number of transactions to include in the block.
- `uncles` - the number of uncles to include in the block.
- `dataSize` - the size of the data to include in each transaction.

##### Return Values

- `*types.Block` - a block with the specified number of transactions, uncles, and data size.

### Function `TestRlpIterator`

`TestRlpIterator` tests that individual transactions can be picked out from blocks without full unmarshalling/marshalling.

```go
func TestRlpIterator(t *testing.T)
```

##### Parameters

- `t` - a testing object.

### Function `testRlpIterator`

`testRlpIterator` tests that individual transactions can be picked out from blocks without full unmarshalling/marshalling.

```go
func testRlpIterator(t *testing.T, txs, uncles, datasize int)
```

##### Parameters

- `t` - a testing object.
- `txs` - the number of transactions to include in the block.
- `uncles` - the number of uncles to include in the block.
- `datasize` - the size of the data to include in each transaction. ## Package `core`

The `core` package provides the core functionality of the Ethereum blockchain. It includes the implementation of the Ethereum Virtual Machine (EVM), the consensus algorithm, and the block and transaction processing logic.

### Function `TestHashTransactions`

`TestHashTransactions` tests the `HashTransactions` function, which computes the hash of a list of transactions.

```go
func TestHashTransactions(t *testing.T)
```

##### Parameters

- `t` - a testing instance.

### Function `BenchmarkHashing`

`BenchmarkHashing` benchmarks the speed of hashing a raw RLP-encoded block.

```go
func BenchmarkHashing(b *testing.B)
```

##### Parameters

- `b` - a benchmarking instance.