## Package `types`

The `types` package contains the data types used throughout the Ethereum codebase. This package provides a set of Go types that represent the various Ethereum data structures, such as blocks, transactions, and accounts.

### Function `MarshalJSON`

The `MarshalJSON` function is a method of the `AccessTuple` type. It marshals an `AccessTuple` instance into a JSON-encoded byte slice.

#### Parameters

None.

#### Return Values

- `[]byte` - the JSON-encoded byte slice.
- `error` - an error, if any.

### Function `UnmarshalJSON`

The `UnmarshalJSON` function is a method of the `AccessTuple` type. It unmarshals a JSON-encoded byte slice into an `AccessTuple` instance.

#### Parameters

- `input []byte` - the JSON-encoded byte slice to unmarshal.

#### Return Values

- `error` - an error, if any.