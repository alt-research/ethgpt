## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain, including block insertion, validation, and consensus.

### Type `insertStats`

`insertStats` is a struct that tracks and reports on block insertion.

#### Fields

- `queued` - the number of blocks queued for insertion.
- `processed` - the number of blocks processed.
- `ignored` - the number of blocks ignored.
- `usedGas` - the amount of gas used.
- `lastIndex` - the index of the last block processed.
- `startTime` - the time at which the insertion started.

#### Function `report`

`report` prints statistics if some number of blocks have been processed or more than a few seconds have passed since the last message.

```go
func (st *insertStats) report(chain []*types.Block, index int, dirty common.StorageSize, setHead bool)
```

##### Parameters

- `chain` - a slice of blocks.
- `index` - the index of the current block being processed.
- `dirty` - the amount of dirty storage.
- `setHead` - a boolean indicating whether the head should be set.

### Type `insertIterator`

`insertIterator` is a helper to assist during chain import.

#### Fields

- `chain` - the chain of blocks being iterated over.
- `results` - the verification result sink from the consensus engine.
- `errors` - header verification errors for the blocks.
- `index` - the current offset of the iterator.
- `validator` - the validator to run if verification succeeds.

#### Function `newInsertIterator`

`newInsertIterator` creates a new iterator based on the given blocks, which are assumed to be a contiguous chain.

```go
func newInsertIterator(chain types.Blocks, results <-chan error, validator Validator) *insertIterator
```

##### Parameters

- `chain` - a slice of blocks.
- `results` - the verification result sink from the consensus engine.
- `validator` - the validator to run if verification succeeds. ## Package `core`

The `core` package contains the core functionality of the Ethereum blockchain, including block validation and insertion.

### Type `insertIterator`

`insertIterator` is an iterator over a chain of blocks that are being inserted into the blockchain. It provides methods for advancing the iterator, peeking at the next block, and retrieving information about the current and previous blocks.

#### Function `NewInsertIterator`

`NewInsertIterator` creates a new `insertIterator` for the given chain of blocks, with the given validator.

```go
func NewInsertIterator(chain []*types.Block, results <-chan error, validator Validator) *insertIterator
```

##### Parameters

- `chain` - a slice of blocks to iterate over.
- `results` - a channel of validation results for each block in the chain.
- `validator` - a validator for validating block bodies.

##### Return Values

- `*insertIterator` - a new `insertIterator`.

#### Function `next`

`next` returns the next block in the iterator, along with any potential validation error for that block. When the end is reached, it will return `(nil, nil)`.

```go
func (it *insertIterator) next() (*types.Block, error)
```

##### Return Values

- `*types.Block` - the next block in the iterator.
- `error` - any potential validation error for that block.

#### Function `peek`

`peek` returns the next block in the iterator, along with any potential validation error for that block, but does **not** advance the iterator.

```go
func (it *insertIterator) peek() (*types.Block, error)
```

##### Return Values

- `*types.Block` - the next block in the iterator.
- `error` - any potential validation error for that block.

#### Function `previous`

`previous` returns the previous header that was being processed, or `nil`.

```go
func (it *insertIterator) previous() *types.Header
```

##### Return Values

- `*types.Header` - the previous header that was being processed, or `nil`.

#### Function `current`

`current` returns the current header that is being processed, or `nil`.

```go
func (it *insertIterator) current() *types.Header
```

##### Return Values

- `*types.Header` - the current header that is being processed, or `nil`.

#### Function `first`

`first` returns the first block in the iterator.

```go
func (it *insertIterator) first() *types.Block
```

##### Return Values

- `*types.Block` - the first block in the iterator.

#### Function `remaining`

`remaining` returns the number of remaining blocks.

```go
func (it *insertIterator) remaining() int
```

##### Return Values

- `int` - the number of remaining blocks.

#### Function `processed`

`processed` returns the number of processed blocks.

```go
func (it *insertIterator) processed() int
```

##### Return Values

- `int` - the number of processed blocks.