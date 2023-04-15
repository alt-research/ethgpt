# Documentation for the `accounts` package

The `accounts` package provides a URL struct that represents the canonical identification URL of a wallet or account. It also provides functions for parsing, marshaling, and unmarshaling URLs.

## URL struct

The `URL` struct represents the canonical identification URL of a wallet or account. It has two fields:

- `Scheme`: a string that represents the protocol scheme to identify a capable account backend.
- `Path`: a string that represents the path for the backend to identify a unique entity.

## parseURL function

The `parseURL` function converts a user-supplied URL into the accounts specific structure. It takes a string as input and returns a `URL` struct and an error. If the input string is not in the correct format, the function returns an error.

## String method

The `String` method implements the stringer interface. It returns a string representation of the `URL` struct. If the `Scheme` field is not empty, the method returns a string in the format `scheme://path`. Otherwise, it returns the `Path` field.

## TerminalString method

The `TerminalString` method implements the log.TerminalStringer interface. It returns a string representation of the `URL` struct that is suitable for display in a terminal. If the length of the string representation is greater than 32 characters, the method returns a truncated string with ellipses.

## MarshalJSON method

The `MarshalJSON` method implements the json.Marshaller interface. It marshals the `URL` struct into a JSON-encoded byte slice.

## UnmarshalJSON method

The `UnmarshalJSON` method parses a JSON-encoded byte slice into a `URL` struct. It takes a byte slice as input and returns an error if the input is not in the correct format.

## Cmp method

The `Cmp` method compares two `URL` structs and returns an integer that represents the result of the comparison. If the `Scheme` fields of the two `URL` structs are equal, the method compares the `Path` fields. Otherwise, it compares the `Scheme` fields. The method returns:

- `-1` if the first `URL` struct is less than the second `URL` struct.
- `0` if the two `URL` structs are equal.
- `1` if the first `URL` struct is greater than the second `URL` struct.