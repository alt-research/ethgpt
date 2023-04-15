## Package logger

The `logger` package provides tools for logging Ethereum transactions and blocks. It includes functions for marshaling and unmarshaling JSON-encoded logs.

### Variables

- `_`: A variable used to ensure that `StructLogMarshaling` implements the `json.Marshaler` and `json.Unmarshaler` interfaces.

### Types

- `StructLog`: A struct representing a single log entry in a transaction or block trace.
- `StructLogMarshaling`: A struct used to ensure that `StructLog` implements the `json.Marshaler` and `json.Unmarshaler` interfaces.

### Methods

#### `StructLog.MarshalJSON() ([]byte, error)`

`MarshalJSON` marshals a `StructLog` object as JSON.

- Returns a byte slice containing the JSON-encoded `StructLog` object and an error, if any.

#### `StructLog.UnmarshalJSON(input []byte) error`

`UnmarshalJSON` unmarshals a JSON-encoded `StructLog` object.

- `input`: A byte slice containing the JSON-encoded `StructLog` object.
- Returns an error, if any.