## Package `types`

The `types` package provides types and functions for working with Ethereum data structures.

### Function `Log.MarshalJSON`

The `Log.MarshalJSON` function marshals a `Log` struct to JSON.

#### Parameters

None.

#### Return Values

- `[]byte` - the JSON-encoded `Log` struct.
- `error` - an error, if any.

### Function `Log.UnmarshalJSON`

The `Log.UnmarshalJSON` function unmarshals a `Log` struct from JSON.

#### Parameters

- `input []byte` - the JSON-encoded `Log` struct.

#### Return Values

- `error` - an error, if any.