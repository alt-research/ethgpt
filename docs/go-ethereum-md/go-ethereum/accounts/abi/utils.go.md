# ABI Package

The `abi` package provides functionality for encoding and decoding Ethereum contract ABI (Application Binary Interface) data. This file contains a helper function `ResolveNameConflict` that resolves naming conflicts by returning the next available name for a given thing.

## ResolveNameConflict

The `ResolveNameConflict` function takes in two parameters: `rawName` and `used`. `rawName` is the name of the thing that needs to be resolved for naming conflicts. `used` is a function that takes in a string and returns a boolean indicating whether the string is already in use.

The function returns a string that is the next available name for the given thing. If the `rawName` is not already in use, it is returned as is. If it is already in use, a number suffix is added to the name until an available name is found.

This function can be used for various purposes, such as resolving naming conflicts in Solidity function overloading or in Golang binding generation where parameter names are converted to camelcase style, which may lead to naming conflicts.

For example, if the ABI contains methods "send" and "send1", calling `ResolveNameConflict("send", used)` would return "send2".