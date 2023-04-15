# Checkpoint Oracle

The `checkpointoracle` package is an on-chain light client checkpoint oracle. It provides a Go wrapper around an on-chain checkpoint oracle contract. The package contains functions to bind the checkpoint contract, register a checkpoint with a batch of associated signatures, and search checkpoint events for a specific section in the given log batches.

## Functions

### NewCheckpointOracle

The `NewCheckpointOracle` function binds the checkpoint contract and returns a `CheckpointOracle` instance. It takes the contract address and a backend as input parameters. The function returns a `CheckpointOracle` instance and an error if the contract binding fails.

### ContractAddr

The `ContractAddr` function returns the address of the contract.

### Contract

The `Contract` function returns the underlying contract instance.

### LookupCheckpointEvents

The `LookupCheckpointEvents` function searches checkpoint events for a specific section in the given log batches. It takes the block logs, section, and hash as input parameters. The function returns an array of `CheckpointOracleNewCheckpointVote` events.

### RegisterCheckpoint

The `RegisterCheckpoint` function registers the checkpoint with a batch of associated signatures that are collected off-chain and sorted by lexicographical order. It takes the transaction options, index, hash, rnum, rhash, and sigs as input parameters. The function returns a transaction instance and an error if the signature is invalid.

## Structs

### CheckpointOracle

The `CheckpointOracle` struct is a Go wrapper around an on-chain checkpoint oracle contract. It contains the contract address and the contract instance. # Documentation for `ash.go`

## Overview

`ash.go` is a Go code file that contains a single function `Ash` which is used to generate an Ethereum signature hash. This function takes five arguments: `hash`, `index`, `v`, `r`, and `s`. The `hash` argument is a byte array representing the message to be signed. The `index` argument is an integer representing the index of the transaction in the block. The `v`, `r`, and `s` arguments are byte arrays representing the signature values.

## Function Description

### Ash

This function takes five arguments: `hash`, `index`, `v`, `r`, and `s`. It generates an Ethereum signature hash by concatenating the `hash` and `index` arguments and then hashing the result using the Keccak-256 algorithm. The resulting hash is then concatenated with the `v`, `r`, and `s` arguments to form the final signature hash.

```go
func Ash(hash []byte, index int64, v []byte, r []byte, s []byte) []byte
```

#### Parameters

- `hash` (type: `[]byte`): A byte array representing the message to be signed.
- `index` (type: `int64`): An integer representing the index of the transaction in the block.
- `v` (type: `[]byte`): A byte array representing the signature value `v`.
- `r` (type: `[]byte`): A byte array representing the signature value `r`.
- `s` (type: `[]byte`): A byte array representing the signature value `s`.

#### Return Value

- (type: `[]byte`): A byte array representing the Ethereum signature hash.

#### Example Usage

```go
hash := []byte("Hello, world!")
index := int64(0)
v := []byte{27}
r := []byte{1, 2, 3, 4, 5}
s := []byte{6, 7, 8, 9, 10}
signatureHash := Ash(hash, index, v, r, s)
```