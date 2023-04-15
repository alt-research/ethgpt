# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the low-level database operations used by the Ethereum blockchain.

## Functions

### `ReadCanonicalHash`

`ReadCanonicalHash` reads the canonical hash of a block by its number.

```go
func ReadCanonicalHash(db ethdb.Database, num uint64) common.Hash
```

###### Parameters

- `db` - the database to read from.
- `num` - the number of the block.

###### Return Values

- `common.Hash` - the canonical hash of the block.

### `WriteCanonicalHash`

`WriteCanonicalHash` writes the canonical hash of a block by its number.

```go
func WriteCanonicalHash(db ethdb.Database, num uint64, hash common.Hash)
```

###### Parameters

- `db` - the database to write to.
- `num` - the number of the block.
- `hash` - the canonical hash of the block.

### `ReadHeadBlockHash`

`ReadHeadBlockHash` reads the hash of the head block.

```go
func ReadHeadBlockHash(db ethdb.Database) common.Hash
```

###### Parameters

- `db` - the database to read from.

###### Return Values

- `common.Hash` - the hash of the head block.

### `WriteHeadBlockHash`

`WriteHeadBlockHash` writes the hash of the head block.

```go
func WriteHeadBlockHash(db ethdb.Database, hash common.Hash)
```

###### Parameters

- `db` - the database to write to.
- `hash` - the hash of the head block.

### `ReadHeader`

`ReadHeader` reads the header of a block by its hash.

```go
func ReadHeader(db ethdb.Database, hash common.Hash, number uint64) *types.Header
```

###### Parameters

- `db` - the database to read from.
- `hash` - the hash of the block.
- `number` - the number of the block.

###### Return Values

- `*types.Header` - the header of the block.

### `WriteHeader`

`WriteHeader` writes the header of a block.

```go
func WriteHeader(db ethdb.Database, header *types.Header) (common.Hash, error)
```

###### Parameters

- `db` - the database to write to.
- `header` - the header of the block.

###### Return Values

- `common.Hash` - the hash of the block.
- `error` - an error, if any.

### `ReadBody`

`ReadBody` reads the body of a block by its hash.

```go
func ReadBody(db ethdb.Database, hash common.Hash, number uint64) *types.Body
```

###### Parameters

- `db` - the database to read from.
- `hash` - the hash of the block.
- `number` - the number of the block.

###### Return Values

- `*types.Body` - the body of the block.

### `WriteBody`

`WriteBody` writes the body of a block.

```go
func WriteBody(db ethdb.Database, hash common.Hash, body *types.Body) error
```

###### Parameters

- `db` - the database to write to.
- `hash` - the hash of the block.
- `body` - the body of the block.

###### Return Values

- `error` - an error, if any.

### `ReadReceipts`

`ReadReceipts` reads the receipts of a block by its hash.

```go
func ReadReceipts(db ethdb.Database, hash common.Hash, number uint64) types.Receipts
```

###### Parameters

- `db` - the database to read from.
- `hash` - the hash of the block.
- `number` - the number of the block.

###### Return Values

- `types.Receipts` - the receipts of the block.

### `WriteReceipts`

`WriteReceipts` writes the receipts of a block.

```go
func WriteReceipts(db ethdb.Database, hash common.Hash, receipts types.Receipts) error
```

###### Parameters

- `db` - the database to write to.
- `hash` - the hash of the block.
- `receipts` - the receipts of the block.

###### Return Values

- `error` - an error, if any.

### `ReadTd`

`ReadTd` reads the total difficulty of a block by its hash.

```go
func ReadTd(db ethdb.Database, hash common.Hash, number uint64) *big.Int
```

###### Parameters

- `db` - the database to read from.
- `hash` - the hash of the block.
- `number` - the number of the block.

###### Return Values

- `*big.Int` - the total difficulty of the block.

### `WriteTd`

`WriteTd` writes