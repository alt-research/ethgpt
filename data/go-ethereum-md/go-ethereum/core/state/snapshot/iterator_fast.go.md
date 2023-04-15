## Package snapshot

The `snapshot` package provides functionality for creating and managing snapshots of the state.

### WeightedIterator

`weightedIterator` is a struct that represents an iterator with an assigned weight. It is used to prioritize which account or storage slot is the correct one if multiple iterators find the same one (modified in multiple consecutive blocks).

### WeightedIterators

`weightedIterators` is a set of iterators implementing the `sort.Interface`.

### Len

`Len` implements `sort.Interface`, returning the number of active iterators.

### Less

`Less` implements `sort.Interface`, returning which of two iterators in the stack is before the other.

### Swap

`Swap` implements `sort.Interface`, swapping two entries in the iterator stack.

### FastIterator

`fastIterator` is a more optimized multi-layer iterator which maintains a direct mapping of all iterators leading down to the bottom layer.

### NewFastIterator

`newFastIterator` creates a new hierarchical account or storage iterator with one element per diff layer. The returned combo iterator can be used to walk over the entire snapshot diff stack simultaneously. ## FastIterator

The `FastIterator` struct is used to iterate over the state trie in a fast and efficient manner. It is used to iterate over accounts and storage slots.

### Fields

- `iterators`: The list of iterators to use for iteration.
- `account`: A boolean indicating whether the iterator is for accounts or storage slots.
- `curAccount`: The current account being iterated over.
- `curSlot`: The current storage slot being iterated over.
- `fail`: The error that occurred during iteration.
- `initiated`: A boolean indicating whether the iterator has been initiated.

### Methods

#### NewFastIterator

```go
func NewFastIterator(db Database, root common.Hash, account bool) (*fastIterator, error)
```

`NewFastIterator` creates a new `FastIterator` instance with the given database, root hash, and account flag.

#### init

```go
func (fi *fastIterator) init()
```

`init` walks over all the iterators and resolves any clashes between them, after which it prepares the stack for step-by-step iteration.

#### Next

```go
func (fi *fastIterator) Next() bool
```

`Next` steps the iterator forward one element, returning false if exhausted. It handles the next operation internally and should be invoked when we know that two elements in the list may have the same value.

#### next

```go
func (fi *fastIterator) next(i int) bool
```

`next` handles the next operation internally and should be invoked when we know that two elements in the list may have the same value.

#### Len

```go
func (fi *fastIterator) Len() int
```

`Len` returns the number of iterators in the stack.

#### Less

```go
func (fi *fastIterator) Less(i, j int) bool
```

`Less` returns whether the iterator at index i is less than the iterator at index j.

#### Swap

```go
func (fi *fastIterator) Swap(i, j int)
```

`Swap` swaps the iterators at index i and j. ## FastIterator

The `FastIterator` struct is used to iterate over the state trie in a hierarchical manner. It is used to walk over the entire snapshot diff stack simultaneously.

### Fields

- `iterators`: The list of layer iterators.
- `curAccount`: The current account blob.
- `curSlot`: The current storage slot.
- `fail`: The failure that occurred during iteration.

### Methods

#### next

```go
func (fi *fastIterator) next(idx int) bool
```

`next` is a recursive function that advances the iterator to the next element.

#### move

```go
func (fi *fastIterator) move(index, newpos int)
```

`move` advances an iterator to another position in the list.

#### Error

```go
func (fi *fastIterator) Error() error
```

`Error` returns any failure that occurred during iteration, which might have caused a premature iteration exit.

#### Hash

```go
func (fi *fastIterator) Hash() common.Hash
```

`Hash` returns the current key.

#### Account

```go
func (fi *fastIterator) Account() []byte
```

`Account` returns the current account blob.

#### Slot

```go
func (fi *fastIterator) Slot() []byte
```

`Slot` returns the current storage slot.

#### Release

```go
func (fi *fastIterator) Release()
```

`Release` iterates over all the remaining live layer iterators and releases each of them individually.

#### Debug

```go
func (fi *fastIterator) Debug()
```

`Debug` is a convenience helper during testing.

#### newFastAccountIterator

```go
func newFastAccountIterator(tree *Tree, root common.Hash, seek common.Hash) (*fastIterator, error)
```

`newFastAccountIterator` creates a new hierarchical account iterator with one element per diff layer. The returned combo iterator can be used to walk over the entire snapshot diff stack simultaneously. ## AccountIterator

The `AccountIterator` function returns a new fast iterator for accounts in the state trie. It takes in a `tree` parameter which is the merkle trie, a `root` parameter which is the root hash of the trie, a `seek` parameter which is the hash to seek to, and a `reverse` parameter which is a boolean indicating whether to iterate in reverse order. It returns an iterator object and an error.

## newFastStorageIterator

The `newFastStorageIterator` function creates a new hierarchical storage iterator with one element per diff layer. It takes in a `tree` parameter which is the merkle trie, a `root` parameter which is the root hash of the trie, an `account` parameter which is the hash of the account to iterate over, and a `seek` parameter which is the hash to seek to. It returns a storage iterator object and an error.

The returned combo iterator can be used to walk over the entire snapshot diff stack simultaneously. This function is used to iterate over the storage of an account in the state trie.