# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including the implementation of the `common.Hash` type and the `DeriveSha` function.

## Variables

### `hasherPool`

`hasherPool` is a sync pool that holds `LegacyKeccak256` hashers for `rlpHash`.

### `encodeBufferPool`

`encodeBufferPool` is a sync pool that holds temporary encoder buffers for `DeriveSha` and transaction encoding.

## Functions

### `rlpHash`

`rlpHash` encodes `x` and hashes the encoded bytes.

```go
func rlpHash(x interface{}) (h common.Hash)
```

#### Parameters

- `x` - the object to encode and hash.

#### Return Values

- `common.Hash` - the hash of the encoded bytes.

### `prefixedRlpHash`

`prefixedRlpHash` writes the prefix into the hasher before rlp-encoding `x`. It's used for typed transactions.

```go
func prefixedRlpHash(prefix byte, x interface{}) (h common.Hash)
```

#### Parameters

- `prefix` - the prefix byte to write into the hasher.
- `x` - the object to encode and hash.

#### Return Values

- `common.Hash` - the hash of the encoded bytes with the prefix.

### `DeriveSha`

`DeriveSha` creates the tree hashes of transactions, receipts, and withdrawals in a block header.

```go
func DeriveSha(list DerivableList, hasher TrieHasher) common.Hash
```

#### Parameters

- `list` - the list of derivable objects.
- `hasher` - the hasher to use for calculating the tree hashes.

#### Return Values

- `common.Hash` - the tree hash of the derivable objects.