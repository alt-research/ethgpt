## Package snapshot

The `snapshot` package provides functionality for managing snapshots of the Ethereum state.

### Type

#### hashes

`hashes` is a helper type used to implement the `sort.Interface` interface.

### Methods

#### Len

```go
func (hs hashes) Len() int
```

`Len` returns the number of elements in the collection.

#### Less

```go
func (hs hashes) Less(i, j int) bool
```

`Less` reports whether the element with index `i` should sort before the element with index `j`.

#### Swap

```go
func (hs hashes) Swap(i, j int)
```

`Swap` swaps the elements with indexes `i` and `j`.