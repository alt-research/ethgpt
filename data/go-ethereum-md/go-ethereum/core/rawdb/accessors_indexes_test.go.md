The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the raw database layer for Ethereum, including the functions for storing and retrieving transaction and receipt metadata.

## Variables

### `ErrTxIndexNotFound`

`ErrTxIndexNotFound` is an error that is returned when a transaction index is not found.

### `ErrReceiptNotFound`

`ErrReceiptNotFound` is an error that is returned when a receipt is not found.

### `ErrBlockNotFound`

`ErrBlockNotFound` is an error that is returned when a block is not found.

### `ErrHeaderNotFound`

`ErrHeaderNotFound` is an error that is returned when a header is not found.

### `ErrBodyNotFound`

`ErrBodyNotFound` is an error that is returned when a block body is not found # Documentation for Source Code

## ReadTransaction

```go
func ReadTransaction(db ethdb.Database, hash common.Hash) (*types.Transaction, common.Hash, uint64, uint64)
```

`ReadTransaction` reads a transaction from the database.

### Parameters

- `db` - the database to read from.
- `hash` - the hash of the transaction to read.

### Return Values

- `*types.Transaction` - the transaction read from the database.
- `common.Hash` - the hash of the block containing the transaction.
- `uint64` - the number of the block containing the transaction.
- `uint64` - the index of the transaction within the block.

## DeleteTxLookupEntry

```go
func DeleteTxLookupEntry(db ethdb.Database, hash common.Hash)
```

`DeleteTxLookupEntry` deletes a transaction lookup entry from the database.

### Parameters

- `db` - the database to delete from.
- `hash` - the hash of the transaction to delete.

## TestReadTransactions

```go
func TestReadTransactions(t *testing.T)
```

`TestReadTransactions` tests the `ReadTransaction` function.

## TestDeleteTransactions

```go
func TestDeleteTransactions(t *testing.T)
```

`TestDeleteTransactions` tests the `DeleteTxLookupEntry` function.

## TestDeleteBloomBits

```go
func TestDeleteBloomBits(t *testing.T)
```

`TestDeleteBloomBits` tests the `DeleteBloombits` function.

## WriteBloomBits

```go
func WriteBloomBits(db ethdb.Database, bit uint, section uint64, head common.Hash, data []byte)
```

`WriteBloomBits` writes bloom bits to the database.

### Parameters

- `db` - the database to write to.
- `bit` - the bit to write.
- `section` - the section to write.
- `head` - the head of the section.
- `data` - the data to write.

## ReadBloomBits

```go
func ReadBloomBits(db ethdb.Database, bit uint, section uint64, head common.Hash) ([]byte, error)
```

`ReadBloomBits` reads bloom bits from the database.

### Parameters

-