## Package Native

This package contains the implementation of the `accountMarshaling` interface, which is used to marshal and unmarshal account data to and from JSON format.

### Function: MarshalJSON

```go
func (a account) MarshalJSON() ([]byte, error)
```

This function marshals an account object to JSON format. It returns a byte slice containing the JSON-encoded data and an error if any.

#### Parameters

- `a` - an account object to be marshaled.

#### Return Values

- `[]byte` - a byte slice containing the JSON-encoded data.
- `error` - an error if any.

### Function: UnmarshalJSON

```go
func (a *account) UnmarshalJSON(input []byte) error
```

This function unmarshals an account object from JSON format. It takes a byte slice containing the JSON-encoded data as input and returns an error if any.

#### Parameters

- `a` - a pointer to an account object to be unmarshaled.
- `input` - a byte slice containing the JSON-encoded data.

#### Return Values

- `error` - an error if any.

### Struct: account

```go
type account struct {
	Balance *hexutil.Big                `json:"balance,omitempty"`
	Code    hexutil.Bytes               `json:"code,omitempty"`
	Nonce   uint64                      `json:"nonce,omitempty"`
	Storage map[common.Hash]common.Hash `json:"storage,omitempty"`
}
```

This struct represents an Ethereum account. It contains the following fields:

- `Balance` - a pointer to a `hexutil.Big` object representing the account balance.
- `Code` - a `hexutil.Bytes` object representing the account code.
- `Nonce` - an unsigned 64-bit integer representing the account nonce.
- `Storage` - a map of `common.Hash` keys and `common.Hash` values representing the account storage.

### Variable: _

```go
var _ = (*accountMarshaling)(nil)
```

This variable is used to ensure that the `account` struct implements the `accountMarshaling` interface. It is not used anywhere else in the code.