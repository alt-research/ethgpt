# ForkChoice

The `ForkChoice` package implements a fork chooser based on the highest total difficulty of the chain (the fork choice used in the eth1) and the external fork choice (the fork choice used in the eth2). The main goal of this `ForkChoice` is not only for offering fork choice during the eth1/2 merge phase but also to keep the compatibility for all other proof-of-work networks.

## ChainReader

`ChainReader` defines a small collection of methods needed to access the local blockchain during header verification. It's implemented by both blockchain and lightchain.

### Function `Config`

`Config` retrieves the header chain's chain configuration.

```go
Config() *params.ChainConfig
```

##### Return Values

- `*params.ChainConfig` - the header chain's chain configuration.

### Function `GetTd`

`GetTd` returns the total difficulty of a local block.

```go
GetTd(common.Hash, uint64) *big.Int
```

##### Parameters

- `common.Hash` - the hash of the block.
- `uint64` - the block number.

##### Return Values

- `*big.Int` - the total difficulty of the block.

## ForkChoice

`ForkChoice` is the fork chooser based on the highest total difficulty of the chain (the fork choice used in the eth1) and the external fork choice (the fork choice used in the eth2).

### Function `NewForkChoice`

`NewForkChoice` creates a new `ForkChoice` instance.

```go
func NewForkChoice(chainReader ChainReader, preserve func(header *types.Header) bool) *ForkChoice
```

##### Parameters

- `ChainReader` - a `ChainReader` instance.
- `func(header *types.Header) bool` - a function that returns a boolean value indicating whether to preserve the header.

##### Return Values

- `*ForkChoice` - a new `ForkChoice` instance.

### Function `ReorgNeeded`

`ReorgNeeded` returns whether the reorg should be applied based on the given external header and local canonical chain. In the td mode, the new head is chosen if the corresponding total difficulty is higher. In the extern mode, the trusted header is always selected as the head.

```go
func (f *ForkChoice) ReorgNeeded(current *types.Header, extern *types.Header) (bool, error)
```

##### Parameters

- `*types.Header` - the current header.
- `*types.Header` - the external header.

##### Return Values

- `bool` - a boolean value indicating whether the reorg should be applied.
- `error` - an error, if any.

### Field `chain`

`chain` is a `ChainReader` instance.

### Field `rand`

`rand` is a `*mrand.Rand` instance.

### Field `preserve`

`preserve` is a helper function used in td fork choice. Miners will prefer to choose the local mined block if the local td is equal to the extern one. It can be nil for light client. ## Function `CheckDifficulty`

The `CheckDifficulty` function is used to determine if a reorganization is necessary based on the difficulty of the current and external blocks. It takes in the current block and an external block and returns a boolean value indicating whether a reorganization is necessary.

### Parameters

- `current` - the current block.
- `extern` - the external block.

### Return Values

- `bool` - a boolean value indicating whether a reorganization is necessary.
- `error` - an error, if any.

### Description

The `CheckDifficulty` function first checks if the external block has a lower difficulty than the current block. If it does, a reorganization is necessary and the function returns `true`.

If the external block has the same difficulty as the current block, the function checks if the current block and external block should be preserved based on the `preserve` function. If the `preserve` function is not nil, it is called with the current and external blocks as arguments and returns a boolean value indicating whether the block should be preserved. If the `preserve` function returns `false` for the current block and `true` for the external block, a reorganization is necessary and the function returns `true`.

If the `preserve` function returns `true` for both blocks or `false` for the external block, the function randomly decides whether a reorganization is necessary by generating a random float between 0 and 1 and checking if it is less than 0.5. If it is, a reorganization is necessary and the function returns `true`.

If none of the above conditions are met, a reorganization is not necessary and the function returns `false`.

### Example

```go
current := &Block{Number: big.NewInt(100), Difficulty: big.NewInt(1000)}
extern := &Block{Number: big.NewInt(101), Difficulty: big.NewInt(1000)}
preserve := func(b *Block) bool {
    return b.Number.Cmp(big.NewInt(100)) >= 0
}
reorg, err := CheckDifficulty(current, extern, preserve)
if err != nil {
    log.Fatal(err)
}
if reorg {
    log.Println("Reorganization necessary")
} else {
    log.Println("Reorganization not necessary")
}
```