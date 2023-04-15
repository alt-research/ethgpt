# LegacyTx

The `LegacyTx` type represents the transaction data of regular Ethereum transactions. It contains the nonce of the sender account, the wei per gas, the gas limit, the recipient address (nil means contract creation), the wei amount, the contract invocation input data, and the signature values.

## Functions

### `NewTransaction`

`NewTransaction` creates an unsigned legacy transaction.

```go
func NewTransaction(nonce uint64, to common.Address, amount *big.Int, gasLimit uint64, gasPrice *big.Int, data []byte) *Transaction
```

#### Parameters

- `nonce` - the nonce of the sender account.
- `to` - the recipient address (nil means contract creation).
- `amount` - the wei amount.
- `gasLimit` - the gas limit.
- `gasPrice` - the wei per gas.
- `data` - the contract invocation input data.

#### Return Values

- `*Transaction` - the new transaction.

### `NewContractCreation`

`NewContractCreation` creates an unsigned legacy transaction for contract creation.

```go
func NewContractCreation(nonce uint64, amount *big.Int, gasLimit uint64, gasPrice *big.Int, data []byte) *Transaction
```

#### Parameters

- `nonce` - the nonce of the sender account.
- `amount` - the wei amount.
- `gasLimit` - the gas limit.
- `gasPrice` - the wei per gas.
- `data` - the contract invocation input data.

#### Return Values

- `*Transaction` - the new transaction.

## Methods

### `copy`

`copy` creates a deep copy of the transaction data and initializes all fields.

```go
func (tx *LegacyTx) copy() TxData
```

#### Return Values

- `TxData` - the deep copy of the transaction data.

### `txType`

`txType` returns the transaction type.

```go
func (tx *LegacyTx) txType() byte
```

#### Return Values

- `byte` - the transaction type.

### `chainID`

`chainID` returns the chain ID.

```go
func (tx *LegacyTx) chainID() *big.Int
```

#### Return Values

- `*big.Int` - the chain ID.

### `accessList`

`accessList` returns the access list.

```go
func (tx *LegacyTx) accessList() AccessList
```

#### Return Values

- `AccessList` - the access list.

### `data`

`data` returns the transaction data.

```go
func (tx *LegacyTx) data() []byte
```

#### Return Values

- `[]byte` - the transaction data.

### `gas`

`gas` returns the gas limit.

```go
func (tx *LegacyTx) gas() uint64
```

#### Return Values

- `uint64` - the gas limit.

### `gasPrice`

`gasPrice` returns the wei per gas.

```go
func (tx *LegacyTx) gasPrice() *big.Int
```

#### Return Values

- `*big.Int` - the wei per gas.

### `gasTipCap`

`gasTipCap` returns the gas tip cap.

```go
func (tx *LegacyTx) gasTipCap() *big.Int
```

#### Return Values

- `*big.Int` - the gas tip cap.

### `gasFeeCap`

`gasFeeCap` returns the gas fee cap.

```go
func (tx *LegacyTx) gasFeeCap() *big.Int
```

#### Return Values

- `*big.Int` - the gas fee cap.

### `value`

`value` returns the wei amount.

```go
func (tx *LegacyTx) value() *big.Int
```

#### Return Values

- `*big.Int` - the wei amount.

### `nonce`

`nonce` returns the nonce of the sender account.

```go
func (tx *LegacyTx) nonce() uint64
```

#### Return Values

- `uint64` - the nonce of the sender account.

### `to`

`to` returns the recipient address.

```go
func (tx *LegacyTx) to() *common.Address
```

#### Return Values

- `*common.Address` - the recipient address.

### `effectiveGasPrice`

`effectiveGasPrice` returns the effective gas price.

```go
func (tx *LegacyTx) effectiveGasPrice(dst *big.Int, baseFee *big.Int) *big.Int
```

#### Parameters

- `dst` - the destination big integer.
- `baseFee` - the base fee.

#### Return Values

- `*big.Int` - the effective gas price.

### `rawSignatureValues`

`rawSignatureValues` returns the raw signature values.

```go
func (tx *LegacyTx) rawSignatureValues() (v, r, s *big.Int)
```

#### Return Values

- `*big.Int` - the raw signature values.

### `setSignatureValues`

`setSignatureValues` sets the signature values.

```go
func (tx *LegacyTx) setSignatureValues(chainID, v, r, s *big.Int)
```

#### Parameters

- `chainID` - the chain ID.
- `v` - the V value.
- `r` - the R ## Function: SetSignature

### Description

The `SetSignature` function is used to set the signature of a transaction. It takes in three parameters: `v`, `r`, and `s`, which represent the signature values. These values are then assigned to the `V`, `R`, and `S` fields of the transaction.

### Parameters

- `v` (uint8) - the `v` value of the signature.
- `r` (common.Hash) - the `r` value of the signature.
- `s` (common.Hash) - the `s` value of the signature.

### Return Value

This function does not return any value.

### Example

```go
// create a new transaction
tx := types.NewTransaction(nonce, to, value, gasLimit, gasPrice, data)

// sign the transaction
signature, err := crypto.Sign(tx.SigHash().Bytes(), privateKey)
if err != nil {
    log.Fatal(err)
}

// set the signature on the transaction
v, r, s := crypto.SplitSignature(signature)
tx.SetSignature(v, r, s)
```