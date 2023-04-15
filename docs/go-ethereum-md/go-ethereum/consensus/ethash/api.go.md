# Ethash API Documentation

This is the documentation for the `ethash` package in the `go-ethereum` library. The `ethash` package provides an implementation of the Ethash proof-of-work algorithm used in Ethereum mining. This package also exposes Ethash related methods for the RPC interface.

## API

### type API

```go
type API struct {
    ethash *Ethash
}
```

`API` exposes Ethash related methods for the RPC interface.

### func (*API) GetWork

```go
func (api *API) GetWork() ([4]string, error)
```

`GetWork` returns a work package for external miner. The work package consists of 3 strings:

- `result[0]` - 32 bytes hex encoded current block header pow-hash
- `result[1]` - 32 bytes hex encoded seed hash used for DAG
- `result[2]` - 32 bytes hex encoded boundary condition ("target"), 2^256/difficulty
- `result[3]` - hex encoded block number

```go
func ExampleAPI_GetWork() {
    api := &API{ethash: New()}
    work, err := api.GetWork()
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(work)
}
```

### func (*API) SubmitWork

```go
func (api *API) SubmitWork(nonce types.BlockNonce, hash, digest common.Hash) bool
```

`SubmitWork` can be used by external miner to submit their POW solution. It returns an indication if the work was accepted. Note either an invalid solution, a stale work a non-existent work will return false.

```go
func ExampleAPI_SubmitWork() {
    api := &API{ethash: New()}
    nonce := types.BlockNonce{}
    hash := common.Hash{}
    digest := common.Hash{}
    result := api.SubmitWork(nonce, hash, digest)
    fmt.Println(result)
}
```

### func (*API) SubmitHashrate

```go
func (api *API) SubmitHashrate(rate hexutil.Uint64, id common.Hash) bool
```

`SubmitHashrate` can be used for remote miners to submit their hash rate. This enables the node to report the combined hash rate of all miners which submit work through this node. It accepts the miner hash rate and an identifier which must be unique between nodes.

```go
func ExampleAPI_SubmitHashrate() {
    api := &API{ethash: New()}
    rate := hexutil.Uint64(100)
    id := common.Hash{}
    result := api.SubmitHashrate(rate, id)
    fmt.Println(result)
}
```

### func (*API) GetHashrate

```go
func (api *API) GetHashrate() uint64
```

`GetHashrate` returns the current hashrate for local CPU miner and remote miner.

```go
func ExampleAPI_GetHashrate() {
    api := &API{ethash: New()}
    hashrate := api.GetHashrate()
    fmt.Println(hashrate)
}
```