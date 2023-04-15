# RPC Package

The RPC package is a part of the go-ethereum library, which provides a framework for setting up multi-protocol Ethereum nodes. The package contains functions and variables that are used to manage remote procedure calls (RPC) in the Ethereum network.

## max_path_size

The `max_path_size` variable is a constant that is used to define the maximum size of the path for Unix domain sockets on Linux. It is set to 108 bytes, which is the size of the `sun_path` field in the `sockaddr_un` structure on Linux. This variable is only used on non-Windows systems that do not use CGO.

## Functions

There are no functions defined in this file. This file only contains a variable definition.