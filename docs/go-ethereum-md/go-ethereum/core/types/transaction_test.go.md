# Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum transactions, including the encoding and decoding of transactions, and the signing and verification of transactions.

## Variables

### `errShortTypedTx`

`errShortTypedTx` is an error that is returned when a typed transaction is too short.

## Functions

### `TestDecodeEmptyTypedTx`

`TestDecodeEmptyTypedTx` tests the decoding of an empty typed transaction.

### `TestTransactionSigHash`

`TestTransactionSigHash` tests the hash of a transaction.

### `TestTransactionEncode`

`TestTransactionEncode` tests the encoding of a transaction.

### `TestEIP2718TransactionSigHash`

`TestEIP2718TransactionSigHash` tests the hash of an EIP-2718 transaction.

## Types

### `Transaction`

`Transaction` represents an Ethereum transaction.

#### Fields

- `Nonce` - the transaction nonce.
- `GasPrice` - the gas price for the transaction.
- `Gas` - the gas limit for the transaction.
- `To` - the recipient address for the transaction.
- `Value` - the amount of Ether to transfer.
- `Data` - the input data for the transaction.
- `V` - the recovery ID for the transaction signature.
- `R` - the first 32 bytes of the ECDSA signature.
- `S` - the second 32 bytes of the ECDSA signature.

#### Methods

##### `WithSignature`

`WithSignature` adds a signature to the transaction.

```go
func (tx *Transaction) WithSignature(signer Signer, sig []byte) (*Transaction, error)
```

##### Parameters

- `signer` - the signer to use.
- `sig` - the signature to add.

##### Return Values

- `*Transaction` - the signed transaction.
- `error` - an error, if any.

### `AccessListTx`

`AccessListTx` represents an EIP-2718 transaction.

#### Fields

- `ChainID` - the chain ID for the transaction.
- `Nonce` - the transaction nonce.
- `GasPrice` - the gas price for the transaction.
- `Gas` - the gas limit for the transaction.
- `To` - the recipient address for the transaction.
- `Value` - the amount of Ether to transfer.
- `Data` - the input data for the transaction.
- `AccessList` - the access list for the transaction.

### `Signer`

`Signer` is an interface for transaction signers.

#### Methods

##### `Hash`

`Hash` calculates the hash of a transaction.

```go
func (s Signer) Hash(tx *Transaction) common.Hash
```

##### Parameters

- `tx` - the transaction to hash.

##### Return Values

- `common.Hash` - the hash of the transaction.

### `HomesteadSigner`

`HomesteadSigner` is a signer for Homestead transactions.

### `NewEIP2930Signer`

`NewEIP2930Signer` creates a new signer for EIP-2930 transactions.

```go
func NewEIP2930Signer(chainID *big.Int) Signer
```

#### Parameters

- `chainID` - the chain ID for the transaction.

#### Return Values

- `Signer` - the new signer. ## EIP2718 Transaction Hash Mismatch

This function tests the signature operations on EIP2718 access list transactions. It checks if the hash of the signed transaction matches the expected hash.

```go
func TestEIP2718TransactionHash(t *testing.T) {
    // ...
}
```

## EIP2930 Signer

This function tests signature operations on EIP2930 access list transactions. It creates a new blockchain instance with the given configuration and validators.

```go
func TestEIP2930Signer(t *testing.T) {
    // ...
}
```

## Test EIP2718 Transaction Encode

This function tests the encoding of EIP2718 transactions. It checks if the RLP and binary representations of the transaction match the expected values.

```go
func TestEIP2718TransactionEncode(t *testing.T) {
    // ...
}
``` # Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum transactions.

## Variables

### `ErrInvalidChainID`

`ErrInvalidChainID` is an error that is returned when the chain ID is invalid.

### `ErrInvalidSignature`

`ErrInvalidSignature` is an error that is returned when the signature is invalid.

### `ErrInvalidSender`

`ErrInvalidSender` is an error that is returned when the sender is invalid.

### `ErrNonceTooLow`

`ErrNonceTooLow` is an error that is returned when the nonce of a transaction is lower than the one present in the local chain.

### `ErrNonceTooHigh`

`ErrNonceTooHigh` is an error that is returned when the nonce of a transaction is higher than the next one expected based on the local chain.

### `ErrInsufficientFundsForTransfer`

`ErrInsufficientFundsForTransfer` is an error that is returned if the transaction sender doesn't have enough funds for transfer (topmost call only).

### `ErrInsufficientFunds`

`ErrInsufficientFunds` is an error that is returned if the total cost of executing a transaction is higher than the balance of the user's account.

### `ErrGasLimit`

`ErrGasLimit` is an error that is returned if the gas limit of a transaction is too low.

### `ErrNegativeValue`

`ErrNegativeValue` is an error that is returned if the value of a transaction is negative.

### `ErrOversizedData`

`ErrOversizedData` is an error that is returned if the data of a transaction is too large.

### `ErrIntrinsicGas`

`ErrIntrinsicGas` is an error that is returned if the transaction is specified to use less gas than required to start the invocation.

### `ErrGasUintOverflow`

`ErrGasUintOverflow` is an error that is returned when calculating gas usage.

### `ErrTxTooBig`

`ErrTxTooBig` is an error that is returned if the transaction is too big.

### `ErrInvalidFeeCap`

`ErrInvalidFeeCap` is an error that is returned if the fee cap of a transaction is invalid.

### `ErrInvalidTipCap`

`ErrInvalidTipCap` is an error that is returned if the tip cap of a transaction is invalid.

### `ErrInvalidGasTipCap`

`ErrInvalidGasTipCap` is an error that is returned if the gas tip cap of a transaction is invalid.

### `ErrInvalidGasFeeCap`

`ErrInvalidGasFeeCap` is an error that is returned if the gas fee cap of a transaction is invalid.

### `ErrInvalidGasLimit`

`ErrInvalidGasLimit` is an error that is returned if the gas limit of a transaction is invalid.

### `ErrInvalidValue`

`ErrInvalidValue` is an error that is returned if the value of a transaction is invalid.

### `ErrInvalidNonce`

`ErrInvalidNonce` is an error that is returned if the nonce of a transaction is invalid.

### `ErrInvalidTo`

`ErrInvalidTo` is an error that is returned if the recipient of a transaction is invalid.

### `ErrInvalidSignatureExtraData`

`ErrInvalidSignatureExtraData` is an error that is returned if the signature of a transaction contains extra data.

### `ErrInvalidSignatureS`

`ErrInvalidSignatureS` is an error that is returned if the signature of a transaction contains an invalid S value.

### `ErrInvalidSignatureR`

`ErrInvalidSignatureR` is an error that is returned if the signature of a transaction contains an invalid R value.

### `ErrInvalidSignatureV`

`ErrInvalidSignatureV` is an error that is returned if the signature of a transaction contains an invalid V value.

### `ErrInvalidSignatureLength`

`ErrInvalidSignatureLength` is an error that is returned if the signature of a transaction has an invalid length.

### `ErrInvalidSignatureType`

`ErrInvalidSignatureType` is an error that is returned if the signature of a transaction has an invalid type.

### `ErrInvalidSignatureRecoveryID`

`ErrInvalidSignatureRecoveryID` is an error that is returned if the signature of a transaction has an invalid recovery ID.

### `ErrInvalidSignatureChainID`

`ErrInvalidSignatureChainID` is an error that is returned if the signature of a transaction has an invalid chain ID.

### `ErrInvalidSignatureChainIDMismatch ## Transaction Pool Package

The `tx_pool` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the transaction pool, which is responsible for managing the pending transactions that have not yet been included in a block.

### `NewTransactionsByPriceAndNonce`

`NewTransactionsByPriceAndNonce` creates a new transaction set sorted by price and nonce.

```go
func NewTransactionsByPriceAndNonce(signer types.Signer, txs map[common.Address]types.Transactions, baseFee *big.Int) *TransactionsByPriceAndNonce
```

#### Parameters

- `signer` - the signer.
- `txs` - the transactions.
- `baseFee` - the base fee.

#### Return Values

- `*TransactionsByPriceAndNonce` - the new transaction set.

### `TransactionsByPriceAndNonce`

`TransactionsByPriceAndNonce` is a set of transactions sorted by price and nonce.

```go
type TransactionsByPriceAndNonce struct {
	// contains filtered or unexported fields
}
```

#### Functions

##### `NewTransactionsByPriceAndNonce`

`NewTransactionsByPriceAndNonce` creates a new transaction set sorted by price and nonce.

```go
func NewTransactionsByPriceAndNonce(signer types.Signer, txs map[common.Address]types.Transactions, baseFee *big.Int) *TransactionsByPriceAndNonce
```

##### Parameters

- `signer` - the signer.
- `txs` - the transactions.
- `baseFee` - the base fee.

##### Return Values

- `*TransactionsByPriceAndNonce` - the new transaction set.

##### `Peek`

`Peek` returns the transaction with the highest price and lowest nonce.

```go
func (t *TransactionsByPriceAndNonce) Peek() *types.Transaction
```

##### Return Values

- `*types.Transaction` - the transaction.

##### `Shift`

`Shift` removes the transaction with the highest price and lowest nonce.

```go
func (t *TransactionsByPriceAndNonce) Shift()
```

### `TestTransactionPriceSort`

`TestTransactionPriceSort` tests that transactions are sorted by price and nonce.

```go
func TestTransactionPriceSort(t *testing.T)
```

### `TestTransactionTimeSort`

`TestTransactionTimeSort` tests that transactions are sorted by time if they have the same price.

```go
func TestTransactionTimeSort(t *testing.T)
```

### `TestTransactionCoding`

`TestTransactionCoding` tests serializing/de-serializing to/from RLP and JSON.

```go
func TestTransactionCoding(t *testing.T)
``` ## Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of Ethereum transactions.

### `SignNewTx`

`SignNewTx` signs a new transaction with the given signer and transaction data.

```go
func SignNewTx(key *ecdsa.PrivateKey, signer Signer, txdata TxData) (*Transaction, error)
```

#### Parameters

- `key` - the private key to sign the transaction with.
- `signer` - the signer to use.
- `txdata` - the transaction data.

#### Return Values

- `*Transaction` - the signed transaction.
- `error` - an error, if any.

### `encodeDecodeJSON`

`encodeDecodeJSON` encodes and decodes a transaction in JSON format.

```go
func encodeDecodeJSON(tx *Transaction) (*Transaction, error)
```

#### Parameters

- `tx` - the transaction to encode and decode.

#### Return Values

- `*Transaction` - the encoded and decoded transaction.
- `error` - an error, if any.

### `encodeDecodeBinary`

`encodeDecodeBinary` encodes and decodes a transaction in binary format.

```go
func encodeDecodeBinary(tx *Transaction) (*Transaction, error)
```

#### Parameters

- `tx` - the transaction to encode and decode.

#### Return Values

- `*Transaction` - the encoded and decoded transaction.
- `error` - an error, if any.

### `assertEqual`

`assertEqual` compares two transactions and returns an error if they are not equal.

```go
func assertEqual(orig *Transaction, cpy *Transaction) error
```

#### Parameters

- `orig` - the original transaction.
- `cpy` - the copied transaction.

#### Return Values

- `error` - an error, if any.

### `TestTransactionSizes`

`TestTransactionSizes` tests the size of different types of transactions.

```go
func TestTransactionSizes(t *testing.T)
```

#### Parameters

- `t` - the testing object.

#### Return Values

This function does not return anything.

### `TestTransactionEncoding`

`TestTransactionEncoding` tests the encoding and decoding of different types of transactions.

```go
func TestTransactionEncoding(t *testing.T)
```

#### Parameters

- `t` - the testing object.

#### Return Values

This function does not return anything. The code snippet provided is a test function for verifying the correctness of the `Size()` and `UnmarshalBinary()` methods of the `Transaction` struct. The `Transaction` struct represents a transaction in the Ethereum blockchain.

The test function takes in a testing object `t` and a slice of byte slices `tests`. Each byte slice in `tests` represents a serialized transaction. The function then iterates through each byte slice in `tests`, unmarshals it into a `Transaction` struct, and checks if the size of the struct matches the length of the byte slice.

The function first checks the size of the `Transaction` struct using the `Size()` method. It then checks the size of the cached version of the struct by converting it to a byte slice using the `MarshalBinary()` method and checking its length. Finally, it checks the size of the unmarshalled version of the struct by unmarshalling the byte slice into a new `Transaction` struct and checking its size.

If any of the size checks fail, the function logs an error message using the `Errorf()` method of the testing object `t`.

Overall, this test function ensures that the `Size()` and `UnmarshalBinary()` methods of the `Transaction` struct are working correctly and that the struct can be serialized and deserialized without losing any information.