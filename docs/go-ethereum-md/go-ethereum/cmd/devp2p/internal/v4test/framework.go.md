# v4test Package

The `v4test` package contains test utilities for the `v4wire` package of the Ethereum Go client. The package provides a test environment, functions for sending and receiving packets, and a function for checking if a list of nodes contains a specific public key.

## Constants

### waitTime

`waitTime` is a constant of type `time.Duration` that represents the maximum time to wait for a packet to be received.

## Types

### testenv

`testenv` is a struct that represents a test environment. The struct contains two `net.PacketConn` objects, a private key, a remote node, and a remote address.

#### newTestEnv

`newTestEnv` is a function that creates a new test environment. The function takes three arguments: a string representing the remote node, a string representing the first listening address, and a string representing the second listening address. The function returns a pointer to a `testenv` struct.

#### close

`close` is a method of the `testenv` struct that closes the two `net.PacketConn` objects.

#### send

`send` is a method of the `testenv` struct that sends a packet to the remote node. The method takes two arguments: a `net.PacketConn` object and a `v4wire.Packet` object. The method returns a byte slice representing the hash of the sent packet.

#### read

`read` is a method of the `testenv` struct that reads a packet from a `net.PacketConn` object. The method takes one argument: a `net.PacketConn` object. The method returns a `v4wire.Packet` object, a byte slice representing the hash of the received packet, and an error.

#### localEndpoint

`localEndpoint` is a method of the `testenv` struct that returns the local endpoint of a `net.PacketConn` object. The method takes one argument: a `net.PacketConn` object. The method returns a `v4wire.Endpoint` object.

#### remoteEndpoint

`remoteEndpoint` is a method of the `testenv` struct that returns the remote endpoint of the test environment. The method takes no arguments. The method returns a `v4wire.Endpoint` object.

#### contains

`contains` is a method of the `testenv` struct that checks if a list of nodes contains a specific public key. The method takes two arguments: a slice of `v4wire.Node` objects and a `v4wire.Pubkey` object. The method returns a boolean value.

## Functions

### None

The `v4test` package does not contain any functions.