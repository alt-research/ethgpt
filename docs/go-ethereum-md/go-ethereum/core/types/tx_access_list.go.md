# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including the implementation of the EIP-2930 access list.

## Variables

### `AccessListTxType`

`AccessListTxType` is a byte that represents the transaction type of an EIP-2930 access list transaction.

## Types

### `AccessList`

`AccessList` is a slice of `AccessTuple` elements, which represent the addresses and storage keys that are allowed to access a contract.

### `AccessTuple`

`AccessTuple` is a struct that represents an address and a slice of storage keys that are allowed to access a contract.

### `AccessListTx`

`AccessListTx` is a struct that represents the data of an EIP-2930 access list transaction.

#### Fields

- `ChainID` - the destination chain ID.
- `Nonce` - the nonce of the sender account.
- `GasPrice` - the wei per gas.
- `Gas` - the gas limit.
- `To` - the contract address (nil means contract creation).
- `Value` - the wei amount.
- `Data` - the contract invocation input data.
- `AccessList` - the EIP-2930 access list.
- `V` - the signature value.
- `R` - the signature value.
- `S` - the signature value.

#### Methods

##### `copy() TxData`

`copy()` creates a deep copy of the transaction data and initializes all fields.

##### `txType() byte`

`txType()` returns the transaction type of an EIP-2930 access list transaction.

##### `chainID() *big.Int`

`chainID()` returns the destination chain ID of an EIP-2930 access list transaction.

##### `accessList() AccessList`

`accessList()` returns the EIP-2930 access list of an EIP-2930 access list transaction.

##### `data() []byte`

`data()` returns the contract invocation input data of an EIP-2930 access list transaction.

##### `gas() uint64`

`gas()` returns the gas limit of an EIP-2930 access list transaction.

##### `gasPrice() *big.Int`

`gasPrice()` returns the wei per gas of an EIP-2930 access list transaction.

##### `gasTipCap() *big.Int`

`gasTipCap()` returns the wei per gas of an EIP-2930 access list transaction.

##### `gasFeeCap() *big.Int`

`gasFeeCap()` returns the wei per gas of an EIP-2930 access list transaction.

##### `value() *big.Int`

`value()` returns the wei amount of an EIP-2930 access list transaction.

##### `nonce() uint64`

`nonce()` returns the nonce of the sender account of an EIP-2930 access list transaction.

##### `to() *common.Address`

`to()` returns the contract address of an EIP-2930 access list transaction. # Documentation for AccessListTx Functions

## `func (tx *AccessListTx) GasTipCap(g *big.Int, baseFee *big.Int) *big.Int`

This function calculates the gas tip cap for an AccessListTx transaction. It takes in two parameters, `g` and `baseFee`, both of which are pointers to `big.Int` values. The function returns a pointer to a `big.Int` value.

### Parameters

- `g` - a pointer to a `big.Int` value representing the gas price.
- `baseFee` - a pointer to a `big.Int` value representing the base fee.

### Return Values

- A pointer to a `big.Int` value representing the gas tip cap.

## `func (tx *AccessListTx) rawSignatureValues() (v, r, s *big.Int)`

This function returns the raw signature values for an AccessListTx transaction. It does not take any parameters and returns three pointers to `big.Int` values.

### Return Values

- Three pointers to `big.Int` values representing the raw signature values for the transaction.

## `func (tx *AccessListTx) setSignatureValues(chainID, v, r, s *big.Int)`

This function sets the signature values for an AccessListTx transaction. It takes in four parameters, `chainID`, `v`, `r`, and `s`, all of which are pointers to `big.Int` values. The function does not return any values.

### Parameters

- `chainID` - a pointer to a `big.Int` value representing the chain ID.
- `v` - a pointer to a `big.Int` value representing the V value of the signature.
- `r` - a pointer to a `big.Int` value representing the R value of the signature.
- `s` - a pointer to a `big.Int` value representing the S value of the signature.