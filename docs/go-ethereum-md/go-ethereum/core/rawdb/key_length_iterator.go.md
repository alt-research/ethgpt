# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the low-level database access functions.

## Types

### `KeyLengthIterator`

`KeyLengthIterator` is a struct that wraps a database iterator and ensures that only key-value pairs with a specific key length will be returned.

#### Fields

- `requiredKeyLength` - the required length of the key.
- `Iterator` - the underlying database iterator.

#### Methods

##### `NewKeyLengthIterator`

`NewKeyLengthIterator` returns a wrapped version of the iterator that will only return key-value pairs where keys with a specific key length will be returned.

```go
func NewKeyLengthIterator(it ethdb.Iterator, keyLen int) ethdb.Iterator
```

###### Parameters

- `it` - the underlying database iterator.
- `keyLen` - the required length of the key.

###### Return Values

- `ethdb.Iterator` - the wrapped version of the iterator.

##### `Next`

`Next` returns true as soon as a key with the required key length is discovered. It exhausts the keys in the underlying iterator and returns false when there are no more keys.

```go
func (it *KeyLengthIterator) Next() bool
```

###### Return Values

- `bool` - true if a key with the required key length is discovered, false otherwise.