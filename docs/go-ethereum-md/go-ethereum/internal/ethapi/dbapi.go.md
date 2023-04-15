# DebugAPI

The `DebugAPI` type provides an API for debugging Ethereum nodes.

## Functions

### DbGet

```go
func (api *DebugAPI) DbGet(key string) (hexutil.Bytes, error)
```

`DbGet` returns the raw value of a key stored in the database. It takes a string `key` and returns a `hexutil.Bytes` value and an error.

### DbAncient

```go
func (api *DebugAPI) DbAncient(kind string, number uint64) (hexutil.Bytes, error)
```

`DbAncient` retrieves an ancient binary blob from the append-only immutable files. It takes a string `kind` and a `uint64` `number` and returns a `hexutil.Bytes` value and an error.

### DbAncients

```go
func (api *DebugAPI) DbAncients() (uint64, error)
```

`DbAncients` returns the ancient item numbers in the ancient store. It returns a `uint64` value and an error.