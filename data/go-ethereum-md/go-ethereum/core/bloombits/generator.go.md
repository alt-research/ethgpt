# Documentation for bloombits package

This package provides a Generator type that can be used to generate rotated bloom bits for batched filtering. The package is part of the go-ethereum library, which is free software distributed under the GNU Lesser General Public License.

## Variables

### errSectionOutOfBounds

`errSectionOutOfBounds` is an error variable that is returned if the user tries to add more bloom filters to the batch than available space, or if they try to retrieve above the capacity.

### errBloomBitOutOfBounds

`errBloomBitOutOfBounds` is an error variable that is returned if the user tries to retrieve a specified bit bloom above the capacity.

## Types

### Generator

`Generator` is a type that takes a number of bloom filters and generates the rotated bloom bits to be used for batched filtering. It has the following fields:

- `blooms`: an array of rotated blooms for per-bit matching.
- `sections`: the number of sections to batch together.
- `nextSec`: the next section to set when adding a bloom.

#### NewGenerator

`NewGenerator` is a function that creates a rotated bloom generator that can iteratively fill a batched bloom filter's bits. It takes the number of sections as an argument and returns a pointer to a new `Generator` instance. If the number of sections is not a multiple of 8, it returns an error.

Example usage:

```go
b, err := NewGenerator(64)
if err != nil {
    // handle error
}
```

#### AddBloom

`AddBloom` is a method of the `Generator` type that takes a single bloom filter and sets the corresponding bit column in memory accordingly. It takes the index of the bloom filter and the bloom filter itself as arguments and returns an error if the user tries to add more bloom filters than the capacity or if the bloom filter has an unexpected index.

Example usage:

```go
bloom := types.BytesToBloom([]byte("hello world"))
err := b.AddBloom(0, bloom)
if err != nil {
    // handle error
}
```

#### Bitset

`Bitset` is a method of the `Generator` type that returns the bit vector belonging to the given bit index after all blooms have been added. It takes the bit index as an argument and returns the corresponding bit vector and an error if the bloom is not fully generated yet or if the bit index is out of bounds.

Example usage:

```go
bitset, err := b.Bitset(0)
if err != nil {
    // handle error
}
```