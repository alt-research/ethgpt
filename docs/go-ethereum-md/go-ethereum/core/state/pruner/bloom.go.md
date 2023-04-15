# Pruner Package

The `pruner` package provides functionality for pruning the Ethereum state trie. It includes a bloom filter used during the state conversion and a set of functions for creating and loading the bloom filter.

## Type: stateBloomHasher

The `stateBloomHasher` type is a wrapper around a byte blob to satisfy the interface API requirements of the bloom library used. It's used to convert a trie hash or contract code hash into a 64 bit mini hash.

## Type: stateBloom

The `stateBloom` type is a bloom filter used during the state conversion (snapshot->state). The keys of all generated entries will be recorded here so that in the pruning stage the entries belong to the specific version can be avoided for deletion.

### Function: newStateBloomWithSize

```go
func newStateBloomWithSize(size uint64) (*stateBloom, error)
```

The `newStateBloomWithSize` function creates a brand new state bloom for state generation. The bloom filter will be created by the passing bloom filter size. According to the https://hur.st/bloomfilter/?n=600000000&p=&m=2048MB&k=4, the parameters are picked so that the false-positive rate for mainnet is low enough.

### Function: NewStateBloomFromDisk

```go
func NewStateBloomFromDisk(filename string) (*stateBloom, error)
```

The `NewStateBloomFromDisk` function loads the state bloom from the given file. In this case, the assumption is held the bloom filter is complete. ## Function: ReadFile

```go
func ReadFile(filename string) (*stateBloom, error)
```

The `ReadFile` function reads a state bloom filter from a file and returns a pointer to the stateBloom struct.

### Parameters

- `filename`: The name of the file to read the bloom filter from.

### Returns

- A pointer to the stateBloom struct.
- An error if the read fails.

## Function: (bloom *stateBloom) Commit

```go
func (bloom *stateBloom) Commit(filename, tempname string) error
```

The `Commit` method flushes the bloom filter content into the disk and marks the bloom as complete. It writes the bloom filter to a temporary file, syncs the file to disk, and then moves the temporary file to its final location.

### Parameters

- `filename`: The name of the file to write the bloom filter to.
- `tempname`: The name of the temporary file to write the bloom filter to.

### Returns

- An error if the commit fails.

## Function: (bloom *stateBloom) Put

```go
func (bloom *stateBloom) Put(key []byte, value []byte) error
```

The `Put` method implements the KeyValueWriter interface. It adds a key to the bloom filter. If the key length is not 32 bytes, it ensures that it's a contract code entry with a new scheme.

### Parameters

- `key`: The key to add to the bloom filter.
- `value`: The value associated with the key.

### Returns

- An error if the key is invalid.

## Function: (bloom *stateBloom) Delete

```go
func (bloom *stateBloom) Delete(key []byte) error
```

The `Delete` method removes a key from the key-value data store. This method is not supported and will panic if called.

### Parameters

- `key`: The key to remove from the key-value data store.

### Returns

- None.

## Function: (bloom *stateBloom) Contain

```go
func (bloom *stateBloom) Contain(key []byte) (bool, error)
```

The `Contain` method is a wrapper of the underlying contains function which reports whether a key is contained in the bloom filter. If it returns true, the key may be contained. If it returns false, the key is definitely not contained.

### Parameters

- `key`: The key to check for in the bloom filter.

### Returns

- A boolean indicating whether the key is contained in the bloom filter.
- An error if the check fails.