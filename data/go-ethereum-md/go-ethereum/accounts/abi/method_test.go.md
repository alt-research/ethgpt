## Package Description

The `abi` package provides a Go implementation of the Ethereum Application Binary Interface (ABI). It allows encoding and decoding of function calls and event logs, as well as parsing of contract ABIs.

## TestMethodString

The `TestMethodString` function tests the `String` method of the `Method` struct. It takes a table of test cases, each containing a method name and an expected string representation of the method. It then parses the `methoddata` constant, which is a JSON-encoded ABI containing various function and fallback definitions. For each test case, it retrieves the corresponding `Method` struct from the parsed ABI and calls its `String` method. If the resulting string does not match the expected string, the test fails.

## JSON

The `JSON` function is a helper function that parses a JSON-encoded ABI and returns an `ABI` struct. It takes an `io.Reader` as input and returns the parsed `ABI` struct and an error if parsing fails.

## ABI

The `ABI` struct represents a parsed contract ABI. It has the following fields:

- `Methods map[string]*Method`: a map of method names to `Method` structs.
- `Events map[string]*Event`: a map of event names to `Event` structs.
- `Fallback *Method`: the fallback function.
- `Receive *Method`: the receive function.

The `ABI` struct has the following methods:

- `Pack(name string, args ...interface{}) ([]byte, error)`: packs the given arguments into a byte slice according to the ABI specification for the method with the given name.
- `Unpack(name string, data []byte, output ...interface{}) error`: unpacks the given data into the provided output variables according to the ABI specification for the method with the given name.
- `EventByID(id EventID) (*Event, error)`: returns the `Event` struct with the given ID.
- `MethodByID(id MethodID) (*Method, error)`: returns the `Method` struct with the given ID.

## Method

The `Method` struct represents a parsed function or fallback definition from a contract ABI. It has the following fields:

- `Name string`: the name of the function or fallback.
- `ID MethodID`: the ID of the function or fallback.
- `Inputs []Argument`: a slice of input arguments.
- `Outputs []Argument`: a slice of output arguments.
- `Const bool`: whether the function is constant.
- `Payable bool`: whether the function is payable.
- `StateMutability string`: the state mutability of the function.

The `Method` struct has the following methods:

- `String() string`: returns a string representation of the method in the format "function name(arg1 type1, arg2 type2) returns(ret1 type1, ret2 type2)" for functions and "fallback() returns()" for fallbacks.

## Event

The `Event` struct represents a parsed event definition from a contract ABI. It has the following fields:

- `Name string`: the name of the event.
- `ID EventID`: the ID of the event.
- `Inputs []Argument`: a slice of input arguments.

The `Event` struct has the following methods:

- `String() string`: returns a string representation of the event in the format "event name(arg1 type1, arg2 type2)". 

## Argument

The `Argument` struct represents a parsed argument definition from a contract ABI. It has the following fields:

- `Name string`: the name of the argument.
- `Type string`: the type of the argument. ## Function Description

The `TestMethodSig` function is a test function that tests the `Sig` field of the `Methods` struct in an ABI (Application Binary Interface) object. The function takes no arguments and returns no values.

The function first defines a test cases array, which contains a list of method names and their expected signatures. The function then parses a JSON string containing the ABI data using the `JSON` function and assigns the resulting ABI object to the `abi` variable.

The function then iterates over each test case in the test cases array and retrieves the signature of the method with the corresponding name from the `Methods` struct in the ABI object. The function then compares the retrieved signature with the expected signature and reports an error if they do not match.

The `TestMethodSig` function is used to ensure that the `Sig` field of the `Methods` struct in an ABI object is correctly populated with the expected method signatures.