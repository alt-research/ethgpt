## Documentation for `ethclient` package

This package provides a client implementation for interacting with an Ethereum node. It includes functions for sending transactions, querying the blockchain, and managing accounts.

### `senderFromServer` type

`senderFromServer` is a custom implementation of the `types.Signer` interface. It is used to remember the sender address returned by the RPC server and is stored in the transaction's sender address cache to avoid an additional request in `TransactionSender`.

#### `setSenderFromServer` function

`setSenderFromServer` is a helper function that sets the sender address and block hash for a given transaction using the `types.Sender` function.

```go
func setSenderFromServer(tx *types.Transaction, addr common.Address, block common.Hash)
```

- `tx`: The transaction to set the sender address and block hash for.
- `addr`: The sender address to set.
- `block`: The block hash to set.

#### `Equal` method

`Equal` is a method of the `senderFromServer` type that compares two `types.Signer` instances for equality.

```go
func (s *senderFromServer) Equal(other types.Signer) bool
```

- `other`: The `types.Signer` instance to compare to.

#### `Sender` method

`Sender` is a method of the `senderFromServer` type that returns the sender address for a given transaction.

```go
func (s *senderFromServer) Sender(tx *types.Transaction) (common.Address, error)
```

- `tx`: The transaction to get the sender address for.

#### `ChainID` method

`ChainID` is a method of the `senderFromServer` type that returns the chain ID for the Ethereum network.

```go
func (s *senderFromServer) ChainID() *big.Int
```

#### `Hash` method

`Hash` is a method of the `senderFromServer` type that returns the hash of a given transaction.

```go
func (s *senderFromServer) Hash(tx *types.Transaction) common.Hash
```

- `tx`: The transaction to get the hash for.

#### `SignatureValues` method

`SignatureValues` is a method of the `senderFromServer` type that returns the signature values for a given transaction.

```go
func (s *senderFromServer) SignatureValues(tx *types.Transaction, sig []byte) (R, S, V *big.Int, err error)
```

- `tx`: The transaction to get the signature values for.
- `sig`: The signature bytes to use.