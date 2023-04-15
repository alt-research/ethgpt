# ABI Package

The `abi` package provides a way to encode and decode Solidity function calls and event logs. It is used to interact with smart contracts on the Ethereum blockchain.

## Argument

The `Argument` struct holds the name of the argument and the corresponding type. Types are used when packing and testing arguments.

## Arguments

The `Arguments` type is a slice of `Argument` structs. It is used to represent the arguments of a Solidity function or event.

## ArgumentMarshaling

The `ArgumentMarshaling` struct is used to unmarshal JSON-encoded arguments.

## UnmarshalJSON

The `UnmarshalJSON` function unmarshals JSON-encoded arguments into an `Argument` struct.

## NonIndexed

The `NonIndexed` function returns the arguments with indexed arguments filtered out.

## isTuple

The `isTuple` function returns true for non-atomic constructs, like `(uint,uint)` or `uint[]`.

## Unpack

The `Unpack` function performs the operation hexdata -> Go format.

## UnpackIntoMap

The `UnpackIntoMap` function performs the operation hexdata -> mapping of argument name to argument value.

## Copy

The `Copy` function performs the operation go format -> provided struct. ## Function Descriptions

### `copyTuple(v interface{}, marshalledValues []interface{}) error`

This function copies a batch of values from `marshalledValues` to `v`. It takes in two parameters, `v` and `marshalledValues`, where `v` is the destination value and `marshalledValues` is the source value. The function uses reflection to copy the values from `marshalledValues` to `v`. If `v` is a struct, the function maps the argument names to the struct fields and copies the values to the corresponding fields. If `v` is a slice or an array, the function copies the values to the corresponding indices. The function returns an error if the number of arguments is insufficient or if the field cannot be found in the given value.

### `copyAtomic(v interface{}, marshalledValues interface{}) error`

This function unpacks a single value from `marshalledValues` to `v`. It takes in two parameters, `v` and `marshalledValues`, where `v` is the destination value and `marshalledValues` is the source value. The function uses reflection to copy the value from `marshalledValues` to `v`. If `v` is a struct, the function copies the value to the first field. If `v` is not a struct, the function copies the value to `v`. The function returns an error if the field cannot be found in the given value.

### `UnpackValues(data []byte) ([]interface{}, error)`

This function can be used to unpack ABI-encoded hexdata according to the ABI-specification, without supplying a struct to unpack into. Instead, this method returns a list containing the values. An atomic argument will be a list with one element. It takes in one parameter, `data`, which is the ABI-encoded hexdata. The function uses reflection to unpack the values from `data` and returns a list of the unpacked values. The function returns an error if there is an error in unpacking the values.

### `PackValues(args []interface{}) ([]byte, error)`

This function performs the operation Go format -> Hexdata. It is the semantic opposite of `UnpackValues`. It takes in one parameter, `args`, which is a list of values to be packed. The function uses reflection to pack the values into ABI-encoded hexdata and returns the packed hexdata. The function returns an error if there is an error in packing the values.

### `Pack(args ...interface{}) ([]byte, error)`

This function performs the operation Go format -> Hexdata. It takes in one or more parameters, `args`, which are the values to be packed. The function uses reflection to pack the values into ABI-encoded hexdata and returns the packed hexdata. The function returns an error if there is an error in packing the values. ## Function Descriptions

### `PackArguments(args []interface{}, abiArgs []abi.Argument) ([]byte, error)`

The `PackArguments` function takes in a slice of interface{} arguments and a slice of `abi.Argument` arguments and returns a byte slice and an error. It packs the input arguments according to the ABI specification and returns the packed byte slice. It also handles dynamic types such as strings and bytes by appending them to the end of the packed byte slice and returning the final byte slice. If there is an error during the packing process, it returns an error.

### `ToCamelCase(input string) string`

The `ToCamelCase` function takes in a string and returns a camel-case string. It splits the input string by underscores and capitalizes the first letter of each part except for the first part. It then joins the parts back together and returns the resulting string.