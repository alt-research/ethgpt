The `fourbyte` package provides functionality for verifying function selectors and parsing call data according to an ABI method signature. The package has the following types:

- `decodedCallData`: an internal type that represents a method call parsed according to an ABI method signature. It has the following fields:
  - `signature`: a string representing the method signature.
  - `name`: a string representing the method name.
  - `inputs`: a slice of `decodedArgument` types representing the method arguments.
- `decodedArgument`: an internal type that represents an argument parsed according to an ABI method signature. It has the following fields:
  - `soltype`: an `abi.Argument` type representing the Solidity type of the argument.
  - `value`: an interface{} representing the value of the argument.

The package has the following functions:

- `verifySelector(selector string, calldata []byte) (*decodedCallData, error)`: a function that checks whether the ABI encoded data blob matches the requested function signature. It takes in a `selector` string and a `calldata` byte slice and returns a pointer to a `decodedCallData` type and an `error`.
- `parseSelector(unescapedSelector string) ([]byte, error)`: a function that converts a method selector into an ABI JSON spec. The returned data is a valid JSON string which can be consumed by the standard abi package. It takes in an `unescapedSelector` string and returns a byte slice and an `error`.
- `parseCallData(calldata []byte, unescapedAbidata string) (*decodedCallData, error)`: a function that matches the provided call data against the ABI definition and returns a struct containing the actual go-typed values. It takes in a `calldata` byte slice and an `unescapedAbidata` string and returns a pointer to a `decodedCallData` type and an `error`.

The `verifySelector` function checks whether the ABI encoded data blob matches the requested function signature. It first parses the selector into an ABI JSON spec using the `parseSelector` function. It then parses the call data according to the requested selector using the `parseCallData` function The `decodeCallData` function takes in a byte slice representing the encoded call data and a slice of `abi.Method` representing the methods to check against. It returns a pointer to a `decodedCallData` type and an `error`. The function decodes the call data and checks if it matches any of the provided methods. If it matches, it assembles the call infos for the signer and returns a pointer to a `decodedCallData` type. If it does not match, it returns an error.

The `decodedCallData` type is a struct that represents the decoded call data. It has the following fields:

- `signature`: a string representing the method signature.
- `name`: a string representing the method name.
- `inputs`: a slice of `decodedArgument` representing the decoded arguments.

The `decodedArgument` type is a struct that represents a decoded argument. It has the following fields:

- `soltype`: a `abi.Type` representing the Solidity type of the argument.
- `value`: an interface{} representing the value of the argument.

```go
// decodeCallData decodes the call data and checks if it matches any of the provided methods.
// If it matches, it assembles the call infos for the signer and returns a pointer to a decodedCallData.
// If it does not match, it returns an error.
func decodeCallData(data []byte, methods []abi.Method) (*decodedCallData, error) {
	if len(data) < 4 {
		return nil, fmt.Errorf("data too short")
	}
	sig := data[:4]
	argdata := data[4:]
	method, err := abiLookupMethod(methods, sig)
	if err != nil {
		return nil, err
	}
	values, err := method.Inputs.UnpackValues(argdata)
	if err != nil {
		return nil, fmt.Errorf("signature %q matches, but arguments mismatch: %v", method.String(), err)
	}
	decoded := decodedCallData{signature: method.Sig, name: method.RawName}
	for i := 0; i < len(method.Inputs); i++ {
		decoded.inputs = append(decoded.inputs, decodedArgument{
			soltype: method.Inputs[i],
			value:   values[i],
		})
	}
	encoded, err := method.Inputs.PackValues(values)
	if err != nil {
		return nil, err
	}
	if !bytes.Equal(encoded, argdata) {
		was := common.Bytes2Hex(encoded)
		exp := common.Bytes2Hex(argdata)
		return nil, fmt.Errorf("WARNING: Supplied data is stuffed with extra data. \nWant %s\nHave %s\nfor method %v", exp, was, method.Sig)
	}
	return &decoded, nil
}

// decodedCallData represents the decoded call data
type decodedCallData struct {
	signature string
	name      string
	inputs    []decodedArgument
}

// decodedArgument represents a decoded argument
type decodedArgument struct {
	soltype abi.Type
	value   interface{}
}
```