# ABI Package

The `abi` package provides tools for working with the Ethereum Application Binary Interface (ABI). It includes functions for encoding and decoding data according to the ABI specification, as well as for parsing and generating ABI definitions.

## Event

The `Event` struct represents an event potentially triggered by the EVM's LOG mechanism. It holds type information (inputs) about the yielded output. Anonymous events don't get the signature canonical representation as the first LOG topic. The struct has the following fields:

- `Name string`: the event name used for internal representation. It's derived from the raw name and a suffix will be added in the case of event overloading.
- `RawName string`: the raw event name parsed from ABI.
- `Anonymous bool`: whether the event is anonymous or not.
- `Inputs Arguments`: the inputs of the event.
- `str string`: the string representation of the event.
- `Sig string`: the string signature according to the ABI spec.
- `ID common.Hash`: the canonical representation of the event's signature used by the ABI definition to identify event names and types.

The `Event` struct has the following methods:

- `NewEvent(name, rawName string, anonymous bool, inputs Arguments) Event`: creates a new `Event`. It sanitizes the input arguments to remove unnamed arguments. It also precomputes the id, signature and string representation of the event.
- `String() string`: returns the string representation of the event.

## NewEvent

The `NewEvent` function creates a new `Event`. It takes the following parameters:

- `name string`: the event name used for internal representation.
- `rawName string`: the raw event name parsed from ABI.
- `anonymous bool`: whether the event is anonymous or not.
- `inputs Arguments`: the inputs of the event.

The function sanitizes the input arguments to remove unnamed arguments. It also precomputes the id, signature and string representation of the event.

## String

The `String` method returns the string representation of the event. It returns a string that represents the event in the following format:

```
event <rawName>(<type1> <name1>, <type2> <name2>, ...)
```

If an input is indexed, the string representation will include the `indexed` keyword before the input name.