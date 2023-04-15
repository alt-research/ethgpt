# DynamicFeeTx

The `DynamicFeeTx` type represents a transaction with dynamic fees. It is a struct that contains the following fields:

- `ChainID` - the ID of the chain.
- `Nonce` - the nonce of the transaction.
- `GasTipCap` - the maximum tip per gas unit that the sender is willing to pay.
- `GasFeeCap` - the maximum fee per gas unit that the sender is willing to pay.
- `Gas` - the amount of gas that the transaction is allowed to consume.
- `To` - the address of the recipient. If `nil`, the transaction is a contract creation.
- `Value` - the amount of Ether to transfer.
- `Data` - the input data for the contract.
- `AccessList` - the access list for the transaction.
- `V` - the recovery ID of the signature.
- `R` - the R component of the signature.
- `S` - the S component of the signature.

## Functions

### `copy`

`copy` creates a deep copy of the transaction data and initializes all fields.

```go
func (tx *DynamicFeeTx) copy() TxData
```

#### Return Values

- `TxData` - a deep copy of the transaction data.

### Accessors

The following functions are accessors for the `DynamicFeeTx` type:

- `txType` - returns the transaction type.
- `chainID` - returns the chain ID.
- `accessList` - returns the access list.
- `data` - returns the input data for the contract.
- `gas` - returns the amount of gas that the transaction is allowed to consume.
- `gasFeeCap` - returns the maximum fee per gas unit that the sender is willing to pay.
- `gasTipCap` - returns the maximum tip per gas unit that the sender is willing to pay.
- `gasPrice` - returns the maximum fee per gas unit that the sender is willing to pay.
- `value` - returns the amount of Ether to transfer.
- `nonce` - returns the nonce of the transaction.
- `to` - returns the address of the recipient.

### `effectiveGasPrice`

`effectiveGasPrice` calculates the effective gas price of the transaction, taking into account the base fee.

```go
func (tx *DynamicFeeTx) effectiveGasPrice(dst *big.Int, baseFee *big.Int) *big.Int
```

#### Parameters

- `dst` - the destination big integer.
- `baseFee` - the base fee.

#### Return Values

- `*big.Int` - the effective gas price.

### `rawSignatureValues`

`rawSignatureValues` returns the raw signature values of the transaction.

```go
func (tx *DynamicFeeTx) rawSignatureValues() (v, r, s *big.Int)
```

#### Return Values

- `*big.Int` - the recovery ID of the signature.
- `*big.Int` - the R component of the signature.
- `*big.Int` - the S component of the signature.

### `setSignatureValues`

`setSignatureValues` sets the signature values of the transaction.

```go
func (tx *DynamicFeeTx) setSignatureValues(chainID, v, r, s *big.Int)
```

#### Parameters

- `chainID` - the ID of the chain.
- `v` - the recovery ID of the signature.
- `r` - the R component of the signature.
- `s` - the S component of the signature.