## Package `core`

The `core` package provides the core functionality for the Ethereum blockchain, including the header chain, block processing, and consensus algorithms.

### Function `verifyUnbrokenCanonchain`

`verifyUnbrokenCanonchain` verifies that the canonical hash chain is unbroken. It checks that the canonical hash of each block matches the expected hash and that the total difficulty (TD) of each block is present in the database.

```go
func verifyUnbrokenCanonchain(hc *HeaderChain) error
```

##### Parameters

- `hc` - a pointer to a `HeaderChain` object.

##### Return Values

- `error` - an error, if any.

### Function `testInsert`

`testInsert` is a helper function for testing the `InsertHeaderChain` function. It inserts a chain of headers into the header chain and verifies that the write status and error match the expected values. It also verifies that the header chain is unbroken.

```go
func testInsert(t *testing.T, hc *HeaderChain, chain []*types.Header, wantStatus WriteStatus, wantErr error, forker *ForkChoice)
```

##### Parameters

- `t` - a pointer to a `testing.T` object.
- `hc` - a pointer to a `HeaderChain` object.
- `chain` - a slice of `*types.Header` objects representing the chain of headers to insert.
- `wantStatus` - the expected `WriteStatus` returned by `InsertHeaderChain`.
- `wantErr` - the expected error returned by `InsertHeaderChain`.
- `forker` - a pointer to a `ForkChoice` object.

##### Return Values

None.

### Function `TestHeaderInsertion`

`TestHeaderInsertion` is a test function that checks the status reporting of `InsertHeaderChain`. It creates a new `HeaderChain` object, inserts several chains of headers, and verifies that the write status and error match the expected values. It also verifies that the header chain is unbroken.

```go
func TestHeaderInsertion(t *testing.T)
```

##### Parameters

- `t` - a pointer to a `testing.T` object.

##### Return Values

None. ## Function `testInsert`

The `testInsert` function is used to test the insertion of blocks into a blockchain. It takes several parameters, including a testing object, a blockchain object, a slice of blocks to insert, a status type, a callback function, and a forker object.

```go
func testInsert(t *testing.T, hc *HeaderChain, blocks []*types.Block, status uint64, cb func(*types.Block, *HeaderChain), forker ForkChoice)
```

##### Parameters

- `t` - a testing object.
- `hc` - a blockchain object.
- `blocks` - a slice of blocks to insert.
- `status` - a status type.
- `cb` - a callback function.
- `forker` - a forker object.

##### Return Values

None.

## Function `main`

The `main` function is the entry point of the program. It initializes a blockchain object, inserts several blocks into it using the `testInsert` function, and then prints out the final state of the blockchain.

```go
func main() {
	hc := NewHeaderChain()
	testInsert(t, hc, chainA, CanonStatTy, nil, forker)
	testInsert(t, hc, chainB[:32], CanonStatTy, nil, forker)
	testInsert(t, hc, chainA[32:90], CanonStatTy, nil, forker)
	testInsert(t, hc, chainB[32:97], CanonStatTy, nil, forker)
	testInsert(t, hc, chainA[90:100], CanonStatTy, nil, forker)
	testInsert(t, hc, chainB[97:107], CanonStatTy, nil, forker)
	testInsert(t, hc, chainB[107:128], CanonStatTy, nil, forker)

	fmt.Println(hc)
}
```

##### Parameters

None.

##### Return Values

None.