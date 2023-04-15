# Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of Ethereum transactions, including the different types of transactions and their encoding and decoding.

## Variables

### `ErrInvalidSig`

`ErrInvalidSig` is an error that is returned when the v, r, s values of a transaction are invalid.

### `ErrUnexpectedProtection`

`ErrUnexpectedProtection` is an error that is returned when a transaction type does not support EIP-155 protected signatures.

### `ErrInvalidTxType`

`ErrInvalidTxType` is an error that is returned when a transaction type is not valid in a certain context.

### `ErrTxTypeNotSupported`

`ErrTxTypeNotSupported` is an error that is returned when a transaction type is not supported.

### `ErrGasFeeCapTooLow`

`ErrGasFeeCapTooLow` is an error that is returned when the fee cap is less than the base fee.

### `errShortTypedTx`

`errShortTypedTx` is an error that is returned when a typed transaction is too short.

### `LegacyTxType`

`LegacyTxType` is a constant that represents the type ID of a legacy transaction.

### `AccessListTxType`

`AccessListTxType` is a constant that represents the type ID of an access list transaction.

### `DynamicFeeTxType`

`DynamicFeeTxType` is a constant that represents the type ID of a dynamic fee transaction.

## Types

### `Transaction`

`Transaction` is a struct that represents an Ethereum transaction.

#### Fields

- `inner` - the consensus contents of the transaction.
- `time` - the time the transaction was first seen locally.

#### Methods

##### `NewTx`

`NewTx` creates a new transaction.

```go
func NewTx(inner TxData) *Transaction
```

###### Parameters

- `inner` - the consensus contents of the transaction.

###### Return Values

- `*Transaction` - the new transaction.

##### `EncodeRLP`

`EncodeRLP` encodes the transaction in RLP format.

```go
func (tx *Transaction) EncodeRLP(w io.Writer) error
```

###### Parameters

- `w` - the writer to write the encoded transaction to.

###### Return Values

- `error` - an error, if any.

##### `encodeTyped`

`encodeTyped` writes the canonical encoding of a typed transaction to a buffer.

```go
func (tx *Transaction) encodeTyped(w *bytes.Buffer) error
```

###### Parameters

- `w` - the buffer to write the encoded transaction to.

###### Return Values

- `error` - an error, if any.

##### `MarshalBinary`

`MarshalBinary` returns the canonical encoding of the transaction.

```go
func (tx *Transaction) MarshalBinary() ([]byte, error)
```

###### Return Values

- `[]byte` - the encoded transaction.
- `error` - an error, if any.

##### `UnmarshalBinary`

`UnmarshalBinary` decodes the transaction from its canonical encoding.

```go
func (tx *Transaction) UnmarshalBinary(data []byte) error
```

###### Parameters

- `data` - the encoded transaction.

###### Return Values

- `error` - an error, if any.

##### `Hash`

`Hash` returns the hash of the transaction.

```go
func (tx *Transaction) Hash() common.Hash
```

###### Return Values

- `common.Hash` - the hash of the transaction.

##### `Size`

`Size` returns the size of the transaction in bytes.

```go
func (tx *Transaction) Size() common.StorageSize
```

###### Return Values

- `common.StorageSize` - the size of the transaction.

##### `From`

`From` returns the sender of the transaction.

```go
func (tx *Transaction) From() (common.Address, error)
```

###### Return Values

- `common.Address` - the sender of the transaction.
- `error` - an error, if any.

##### `Nonce`

`Nonce` returns the nonce of the transaction.

```go
func (tx *Transaction) Nonce() uint64
```

###### Return Values

- `uint64` - the nonce of the transaction.

##### `Value`

`Value` returns the value of the transaction.

```go
func (tx *Transaction) Value() *big.Int
```

###### Return Values

- `*big.Int` - the value of the transaction.

##### `GasPrice`

`GasPrice` returns the gas price of the transaction.

```go
func (tx *Transaction) GasPrice() *big.Int
```

###### Return Values

- `*big.Int` - the gas price of the transaction.

##### `GasTipCap`

`GasTipCap` returns the gas tip cap of the transaction.

```go
func (tx *Transaction) GasTipCap() *big.Int
```

###### Return Values

- `*big.Int` - the gas tip cap of the transaction.

##### `GasFeeCap`

`GasFeeCap` returns the gas fee cap of the transaction.

```go
func (tx *Transaction) GasFeeCap() *big.Int
```

###### Return Values

- `*big.Int` - the gas fee cap of the transaction.

##### `Gas`

`Gas` returns the gas limit of the transaction.

```go
func (tx *Transaction) Gas() uint64
```

###### Return Values

- `uint64` - the gas limit of the transaction.

##### `To`

`To` returns the recipient of the transaction.

```go
func (tx *Transaction) To() *common.Address
```

###### Return Values

- `*common.Address` - the recipient of the transaction.

##### `Data ## Transactions

The `transactions` package contains the implementation of Ethereum transactions. It provides functions to encode and decode transactions, as well as to check their signature and protection.

### `func (tx *Transaction) MarshalBinary() ([]byte, error)`

`MarshalBinary` encodes a transaction into its binary representation. If the transaction is a legacy transaction, it is encoded using RLP. Otherwise, it is encoded using the EIP-2718 typed transaction envelope.

### `func (tx *Transaction) DecodeRLP(s *rlp.Stream) error`

`DecodeRLP` decodes a transaction from its RLP representation. If the transaction is a legacy transaction, it is decoded as a `LegacyTx`. Otherwise, it is decoded as an EIP-2718 typed transaction envelope.

### `func (tx *Transaction) UnmarshalBinary(b []byte) error`

`UnmarshalBinary` decodes a transaction from its binary representation. If the first byte of the input is greater than `0x7f`, it is a legacy transaction and is decoded using RLP. Otherwise, it is an EIP-2718 typed transaction envelope and is decoded accordingly.

### `func (tx *Transaction) decodeTyped(b []byte) (TxData, error)`

`decodeTyped` decodes a typed transaction from its canonical format. It returns the decoded transaction data and an error if the transaction type is not supported.

### `func (tx *Transaction) setDecoded(inner TxData, size uint64)`

`setDecoded` sets the inner transaction and size after decoding.

### `func sanityCheckSignature(v *big.Int, r *big.Int, s *big.Int, maybeProtected bool) error`

`sanityCheckSignature` checks the signature of a transaction. It verifies that the `v` value is not protected if `maybeProtected` is false, and that the signature values are valid.

### `func isProtectedV(V *big.Int) bool`

`isProtectedV` checks if the `v` value of a signature is protected.

### `func (tx *Transaction) Protected() bool`

`Protected` returns whether the transaction is replay-protected.

### `func (tx *Transaction) Type() uint8`

`Type` returns the transaction type.

### `func (tx *Transaction) ChainId() *big.Int`

`ChainId` returns the EIP155 chain ID of the transaction. The return value will always be non-nil. For legacy transactions which are not replay-protected, the return value is zero.

### `func (tx *Transaction) Data() []byte`

`Data` returns the input data of the transaction. # Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum transactions.

## Functions

### `AccessList`

`AccessList` returns the access list of the transaction.

```go
func (tx *Transaction) AccessList() AccessList
```

#### Parameters

- None

#### Return Values

- `AccessList` - the access list of the transaction.

### `Gas`

`Gas` returns the gas limit of the transaction.

```go
func (tx *Transaction) Gas() uint64
```

#### Parameters

- None

#### Return Values

- `uint64` - the gas limit of the transaction.

### `GasPrice`

`GasPrice` returns the gas price of the transaction.

```go
func (tx *Transaction) GasPrice() *big.Int
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the gas price of the transaction.

### `GasTipCap`

`GasTipCap` returns the gasTipCap per gas of the transaction.

```go
func (tx *Transaction) GasTipCap() *big.Int
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the gasTipCap per gas of the transaction.

### `GasFeeCap`

`GasFeeCap` returns the fee cap per gas of the transaction.

```go
func (tx *Transaction) GasFeeCap() *big.Int
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the fee cap per gas of the transaction.

### `Value`

`Value` returns the ether amount of the transaction.

```go
func (tx *Transaction) Value() *big.Int
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the ether amount of the transaction.

### `Nonce`

`Nonce` returns the sender account nonce of the transaction.

```go
func (tx *Transaction) Nonce() uint64
```

#### Parameters

- None

#### Return Values

- `uint64` - the sender account nonce of the transaction.

### `To`

`To` returns the recipient address of the transaction. For contract-creation transactions, To returns nil.

```go
func (tx *Transaction) To() *common.Address
```

#### Parameters

- None

#### Return Values

- `*common.Address` - the recipient address of the transaction.

### `Cost`

`Cost` returns gas * gasPrice + value.

```go
func (tx *Transaction) Cost() *big.Int
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the cost of the transaction.

### `RawSignatureValues`

`RawSignatureValues` returns the V, R, S signature values of the transaction. The return values should not be modified by the caller.

```go
func (tx *Transaction) RawSignatureValues() (v, r, s *big.Int)
```

#### Parameters

- None

#### Return Values

- `*big.Int` - the V signature value of the transaction.
- `*big.Int` - the R signature value of the transaction.
- `*big.Int` - the S signature value of the transaction.

### `GasFeeCapCmp`

`GasFeeCapCmp` compares the fee cap of two transactions.

```go
func (tx *Transaction) GasFeeCapCmp(other *Transaction) int
```

#### Parameters

- `other` - the other transaction to compare.

#### Return Values

- `int` - the result of the comparison.

### `GasFeeCapIntCmp`

`GasFeeCapIntCmp` compares the fee cap of the transaction against the given fee cap.

```go
func (tx *Transaction) GasFeeCapIntCmp(other *big.Int) int
```

#### Parameters

- `other` - the fee cap to compare.

#### Return Values

- `int` - the result of the comparison.

### `GasTipCapCmp`

`GasTipCapCmp` compares the gasTipCap of two transactions.

```go
func (tx *Transaction) GasTipCapCmp(other *Transaction) int
```

#### Parameters

- `other` - the other transaction to compare.

#### Return Values

- `int` - the result of the comparison.

### `GasTipCapIntCmp`

`GasTipCapIntCmp` compares the gasTipCap of the transaction against the given gasTipCap.

```go
func (tx *Transaction) GasTipCapIntCmp(other *big.Int) int
```

#### Parameters

- `other` - the gasTipCap to compare.

#### Return Values

- `int` - the result of the comparison.

### `EffectiveGasTip`

`EffectiveGasTip` returns the effective miner gasTipCap for the given base fee. Note: if the effective gasTipCap is negative, this method returns both error the actual negative value, _and_ ErrGasFeeCapTooLow.

```go
func (tx *Transaction) EffectiveGasTip(baseFee *big.Int) (*big.Int, error)
```

#### Parameters

- `baseFee` - the base fee.

#### Return Values

- `*big.Int` - the effective miner gasTipCap.
- `error` - an error, if any.

### `EffectiveGasTipValue`

`EffectiveGasTipValue` is identical to `EffectiveGasTip`, but does not return an error in case the effective ## Transaction Package

The `transaction` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum transactions.

### `GasTipCmp`

`GasTipCmp` compares the gas tip of two transactions and returns an integer value.

```go
func (tx *Transaction) GasTipCmp(other *Transaction, baseFee *big.Int) int
```

#### Parameters

- `tx` - the first transaction to compare.
- `other` - the second transaction to compare.
- `baseFee` - the base fee.

#### Return Values

- `int` - an integer value representing the comparison result.

### `Hash`

`Hash` returns the transaction hash.

```go
func (tx *Transaction) Hash() common.Hash
```

#### Return Values

- `common.Hash` - the transaction hash.

### `Size`

`Size` returns the true encoded storage size of the transaction, either by encoding and returning it, or returning a previously cached value.

```go
func (tx *Transaction) Size() uint64
```

#### Return Values

- `uint64` - the encoded storage size of the transaction.

### `WithSignature`

`WithSignature` returns a new transaction with the given signature.

```go
func (tx *Transaction) WithSignature(signer Signer, sig []byte) (*Transaction, error)
```

#### Parameters

- `signer` - the signer.
- `sig` - the signature.

#### Return Values

- `*Transaction` - the new transaction with the given signature.
- `error` - an error, if any.

### `Transactions`

`Transactions` implements DerivableList for transactions.

```go
type Transactions []*Transaction
```

### `Len`

`Len` returns the length of s.

```go
func (s Transactions) Len() int
```

#### Return Values

- `int` - the length of s.

### `EncodeIndex`

`EncodeIndex` encodes the i'th transaction to w.

```go
func (s Transactions) EncodeIndex(i int, w *bytes.Buffer)
```

#### Parameters

- `i` - the index of the transaction to encode.
- `w` - the buffer to write the encoded transaction to.

### `TxDifference`

`TxDifference` returns a new set which is the difference between a and b.

```go
func TxDifference(a, b Transactions) Transactions
```

#### Parameters

- `a` - the first set of transactions.
- `b` - the second set of transactions.

#### Return Values

- `Transactions` - a new set which is the difference between a and b.

### `HashDifference`

`HashDifference` returns a new set which is the difference between a and b.

```go
func HashDifference(a, b []common.Hash) []common.Hash
```

#### Parameters

- `a` - the first set of hashes.
- `b` - the second set of hashes.

#### Return Values

- `[]common.Hash` - a new set which is the difference between a and b.

### `TxByNonce`

`TxByNonce` implements the sort interface to allow sorting a list of transactions by their nonces.

```go
type TxByNonce Transactions
```

### `Len`

`Len` returns the length of s.

```go
func (s TxByNonce) Len() int
```

#### Return Values

- `int` - the length of s.

### `Less`

`Less` returns true if the nonce of the i'th transaction is less than the nonce of the j'th transaction.

```go
func (s TxByNonce) Less(i, j int) bool
```

#### Parameters

- `i` - the index of the first transaction to compare.
- `j` - the index of the second transaction to compare.

#### Return Values

- `bool` - true if the nonce of the i'th transaction is less than the nonce of the j'th transaction.

### `Swap`

`Swap` swaps the i'th and j'th transactions.

```go
func (s TxByNonce) Swap(i, j int)
```

#### Parameters

- `i` - the index of the first transaction to swap.
- `j` - the index of the second transaction to swap.

### `TxWithMinerFee`

`TxWithMinerFee` wraps a transaction with its gas price or effective miner gasTipCap.

```go
type TxWithMinerFee struct {
	tx       *Transaction
	minerFee *big.Int
}
```

### `NewTxWithMinerFee`

`NewTxWithMinerFee` creates a wrapped transaction, calculating the effective miner gasTipCap if a base fee is provided.

```go
func NewTxWithMinerFee(tx *Transaction, baseFee *big.Int) (*TxWithMinerFee, error)
```

#### Parameters

- `tx` - the transaction to wrap.
- `baseFee` - the base fee.

#### Return Values

- `*TxWithMinerFee` - the wrapped transaction.
- `error` - an error, if any. ## TransactionsByPriceAndNonce

The `TransactionsByPriceAndNonce` type represents a set of transactions that can return transactions in a profit-maximizing sorted order, while supporting removing entire batches of transactions for non-executable accounts.

### NewTransactionsByPriceAndNonce

```go
func NewTransactionsByPriceAndNonce(signer Signer, txs map[common.Address]Transactions, baseFee *big.Int) *TransactionsByPriceAndNonce
```

`NewTransactionsByPriceAndNonce` creates a transaction set that can retrieve price sorted transactions in a nonce-honouring way.

#### Parameters

- `signer` - the signer for the set of transactions.
- `txs` - a map of per account nonce-sorted list of transactions.
- `baseFee` - the current base fee.

#### Return Values

- `*TransactionsByPriceAndNonce` - the new transaction set.

### Peek

```go
func (t *TransactionsByPriceAndNonce) Peek() *Transaction
```

`Peek` returns the next transaction by price.

#### Return Values

- `*Transaction` - the next transaction by price.

### Shift

```go
func (t *TransactionsByPriceAndNonce) Shift()
```

`Shift` replaces the current best head with the next one from the same account.

### Pop

```go
func (t *TransactionsByPriceAndNonce) Pop()
```

`Pop` removes the best transaction, *not* replacing it with the next one from the same account. This should be used when a transaction cannot be executed and hence all subsequent ones should be discarded from the same account.

## TxByPriceAndTime

The `TxByPriceAndTime` type implements both the sort and the heap interface, making it useful for all at once sorting as well as individually adding and removing elements.

### Len

```go
func (s TxByPriceAndTime) Len() int
```

`Len` returns the length of the slice.

#### Return Values

- `int` - the length of the slice.

### Less

```go
func (s TxByPriceAndTime) Less(i, j int) bool
```

`Less` returns whether the element with index `i` should sort before the element with index `j`.

#### Parameters

- `i` - the index of the first element.
- `j` - the index of the second element.

#### Return Values

- `bool` - whether the element with index `i` should sort before the element with index `j`.

### Swap

```go
func (s TxByPriceAndTime) Swap(i, j int)
```

`Swap` swaps the elements with indexes `i` and `j`.

#### Parameters

- `i` - the index of the first element.
- `j` - the index of the second element.

### Push

```go
func (s *TxByPriceAndTime) Push(x interface{})
```

`Push` adds an element to the heap.

#### Parameters

- `x` - the element to add.

### Pop

```go
func (s *TxByPriceAndTime) Pop() interface{}
```

`Pop` removes the best element from the heap.

#### Return Values

- `interface{}` - the best element.