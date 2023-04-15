# ethapi

The `ethapi` package provides the Ethereum JSON-RPC API.

## Functions

### TestTransaction_RoundTripRpcJSON

```go
func TestTransaction_RoundTripRpcJSON(t *testing.T)
```

`TestTransaction_RoundTripRpcJSON` tests the round-trip serialization and deserialization of transactions.

## Types

### allTransactionTypes

```go
func allTransactionTypes(addr common.Address, config *params.ChainConfig) []types.TxData
```

`allTransactionTypes` returns a slice of all transaction types.

### types.LegacyTx

`types.LegacyTx` represents a legacy transaction.

### types.AccessListTx

`types.AccessListTx` represents an access list transaction. # Test Transactions

The code snippet provided defines a function that returns a slice of test transactions. Each transaction is an instance of the `types.DynamicFeeTx` struct, which represents a dynamic fee transaction in the Ethereum blockchain.

## Transactions

Each transaction in the slice has the following fields:

- `ChainID`: the ID of the chain the transaction is being sent to.
- `Nonce`: the nonce of the account sending the transaction.
- `GasTipCap`: the maximum tip that can be paid per gas unit.
- `GasFeeCap`: the maximum fee that can be paid per gas unit.
- `Gas`: the amount of gas to be used for the transaction.
- `To`: the address of the recipient of the transaction.
- `Value`: the amount of Ether to be sent with the transaction.
- `Data`: the data to be sent with the transaction.
- `AccessList`: the access list for the transaction, which specifies which accounts and storage keys the transaction can access.
- `V`: the recovery ID of the transaction signature.
- `R`: the R component of the transaction signature.
- `S`: the S component of the transaction signature.

## Function

### TestTransactions

```go
func TestTransactions(config *params.ChainConfig) []*types.DynamicFeeTx
```

`TestTransactions` is a function that takes a `*params.ChainConfig` object and returns a slice of test transactions. The function creates three transactions with different values for the `To` and `AccessList` fields. The transactions are returned as a slice of pointers to `types.DynamicFeeTx` objects.