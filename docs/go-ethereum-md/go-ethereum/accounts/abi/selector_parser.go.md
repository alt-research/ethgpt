# Package Description

The `abi` package provides a Go implementation of the Ethereum ABI (Application Binary Interface) encoding and decoding. It is used to encode and decode data structures for Ethereum smart contracts.

## SelectorMarshaling

`SelectorMarshaling` is a struct that represents the marshaling of a function selector. It has the following fields:

- `Name string`: the name of the function.
- `Type string`: the type of the function.
- `Inputs []ArgumentMarshaling`: the arguments of the function.

## isDigit

`isDigit` is a function that returns true if the given byte is a digit.

## isAlpha

`isAlpha` is a function that returns true if the given byte is an alphabetic character.

## isIdentifierSymbol

`isIdentifierSymbol` is a function that returns true if the given byte is a valid identifier symbol.

## parseToken

`parseToken` is a function that parses a token from the given string. It takes in an unescaped selector string and a boolean indicating whether the token is an identifier. It returns the parsed token, the remaining string, and an error if there was an issue parsing the token.

## parseIdentifier

`parseIdentifier` is a function that parses an identifier from the given string. It takes in an unescaped selector string and returns the parsed identifier, the remaining string, and an error if there was an issue parsing the identifier.

## parseElementaryType

`parseElementaryType` is a function that parses an elementary type from the given string. It takes in an unescaped selector string and returns the parsed type, the remaining string, and an error if there was an issue parsing the type.

## parseCompositeType

`parseCompositeType` is a function that parses a composite type from the given string. It takes in an unescaped selector string and returns the parsed type, the remaining string, and an error if there was an issue parsing the type.

## parseType

`parseType` is a function that parses a type from the given string. It takes in an unescaped selector string and returns the parsed type, the remaining string, and an error if there was an issue parsing the type. It can parse both elementary and composite types. ## Function Description

### `assembleArgs(args []interface{}) ([]ArgumentMarshaling, error)`

This function takes a slice of interface{} as input and returns a slice of ArgumentMarshaling and an error. It iterates over the input slice and generates a dummy name to avoid unmarshal issues. If the element is a string, it appends an ArgumentMarshaling struct with the name, type, value, sub-arguments, and false. If the element is a slice of interface{}, it recursively calls itself with the slice as input and appends an ArgumentMarshaling struct with the name, tupleType, tupleType, sub-arguments, and false. If the element is neither a string nor a slice of interface{}, it returns an error. Finally, it returns the slice of ArgumentMarshaling and an error.

### `ParseSelector(unescapedSelector string) (SelectorMarshaling, error)`

This function takes an unescapedSelector string as input and returns a SelectorMarshaling struct and an error. It first calls the `parseIdentifier` function to parse the name and rest of the selector. If there is no error, it checks if the rest of the selector is empty or not. If it is not empty, it returns an error. If it is empty, it calls the `parseCompositeType` function to parse the arguments. If there is no error, it calls the `assembleArgs` function to assemble the arguments and returns a SelectorMarshaling struct with the name, "function", and fake arguments. If there is an error in any of the parsing functions, it returns an error. Note that this function accepts uppercase letters as the general format is valid, although they are not part of the ABI spec.