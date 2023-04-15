## Package snapshot

The `snapshot` package provides functionality for creating and managing snapshots of the Ethereum state.

### BinaryIterator

The `binaryIterator` struct is a simplistic iterator used to step over the accounts or storage in a snapshot. It is slow but meant for cross-validating the fast iterator.

#### Fields

- `a`: The first iterator.
- `b`: The second iterator.
- `aDone`: Whether the first iterator is done.
- `bDone`: Whether the second iterator is done.
- `accountIterator`: Whether the iterator is for accounts.
- `k`: The current key.
- `account`: The current account.
- `fail`: The error that occurred during iteration.

#### Methods

##### initBinaryAccountIterator

```go
func (dl *diffLayer) initBinaryAccountIterator() Iterator
```

`initBinaryAccountIterator` creates a simplistic iterator to step over all the accounts in a slow, but easily verifiable way.

##### initBinaryStorageIterator

```go
func (dl *diffLayer) initBinaryStorageIterator(account common.Hash) Iterator
```

`initBinaryStorageIterator` creates a simplistic iterator to step over all the storage slots in a slow, but easily verifiable way.

##### Next

```go
func (it *binaryIterator) Next() bool
```

`Next` steps the iterator forward one element, returning false if exhausted, or an error if one occurred during iteration. ## Binary Iterator

The `binaryIterator` struct is used to iterate over the accounts and storage slots in a snapshot stack. It is a simplistic iterator that steps over all the accounts and storage slots in a slow, but easily verifiable way.

### Fields

- `a`: The first iterator in the binary iterator.
- `b`: The second iterator in the binary iterator.
- `k`: The hash of the account the iterator is currently at.
- `aDone`: A flag indicating whether the first iterator is done.
- `bDone`: A flag indicating whether the second iterator is done.
- `fail`: The error that occurred during iteration.

### Methods

#### Next

```go
func (it *binaryIterator) Next() bool
```

`Next` advances the iterator to the next account or storage slot. It returns true if there is another account or storage slot to iterate over, and false otherwise. It returns an error if iteration failed for some reason (e.g. root being iterated becomes stale and garbage collected).

#### Error

```go
func (it *binaryIterator) Error() error
```

`Error` returns any failure that occurred during iteration, which might have caused a premature iteration exit (e.g. snapshot stack becoming stale).

#### Hash

```go
func (it *binaryIterator) Hash() common.Hash
```

`Hash` returns the hash of the account the iterator is currently at.

#### Account

```go
func (it *binaryIterator) Account() []byte
```

`Account` returns the RLP encoded slim account the iterator is currently at, or nil if the iterated snapshot stack became stale (you can check Error after to see if it failed or not). Note the returned account is not a copy, please don't modify it.

#### Slot

```go
func (it *binaryIterator) Slot() []byte
```

`Slot` returns the raw storage slot data the iterator is currently at, or nil if the iterated snapshot stack became stale (you can check Error after to see if it failed or not). Note the returned slot is not a copy, please don't modify it.

#### Release

```go
func (it *binaryIterator) Release()
```

`Release` recursively releases all the iterators in the stack.

#### newBinaryAccountIterator

```go
func (dl *diffLayer) newBinaryAccountIterator() AccountIterator
```

`newBinaryAccountIterator` creates a simplistic account iterator to step over all the accounts in a slow, but easily verifiable way.

#### newBinaryStorageIterator

```go
func (dl *diffLayer) newBinaryStorageIterator(account common.Hash) StorageIterator
```

`newBinaryStorageIterator` creates a simplistic account iterator to step over all the storage slots in a slow, but easily verifiable way.