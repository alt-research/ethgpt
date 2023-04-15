## Package `core`

The `core` package provides functionality for working with the Ethereum blockchain. This particular file contains code for marshaling and unmarshaling `GenesisAccount` structs to and from JSON.

### Type `GenesisAccount`

`GenesisAccount` represents an account in the Ethereum blockchain at the time of its creation (i.e. in the genesis block). It contains the account's code, storage, balance, nonce, and private key.

#### Function `MarshalJSON`

`MarshalJSON` marshals a `GenesisAccount` struct to JSON.

```go
func (g GenesisAccount) MarshalJSON() ([]byte, error)
```

##### Return Values

- `[]byte` - the JSON-encoded `GenesisAccount`.
- `error` - an error, if any.

#### Function `UnmarshalJSON`

`UnmarshalJSON` unmarshals a `GenesisAccount` struct from JSON.

```go
func (g *GenesisAccount) UnmarshalJSON(input []byte) error
```

##### Parameters

- `input` - the JSON-encoded `GenesisAccount`.

##### Return Values

- `error` - an error, if any.