# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including transactions, blocks, and accounts.

## Variables

### `ErrInvalidChainId`

`ErrInvalidChainId` is an error that is returned when the chain ID used for signing is invalid.

## Functions

### `MakeSigner`

`MakeSigner` returns a `Signer` based on the given chain configuration and block number.

```go
func MakeSigner(config *params.ChainConfig, blockNumber *big.Int) Signer
```

#### Parameters

- `config` - the chain configuration.
- `blockNumber` - the block number.

#### Return Values

- `Signer` - the signer.

### `LatestSigner`

`LatestSigner` returns the 'most permissive' `Signer` available for the given chain configuration.

```go
func LatestSigner(config *params.ChainConfig) Signer
```

#### Parameters

- `config` - the chain configuration.

#### Return Values

- `Signer` - the signer.

### `LatestSignerForChainID`

`LatestSignerForChainID` returns the 'most permissive' `Signer` available for the given chain ID.

```go
func LatestSignerForChainID(chainID *big.Int) Signer
```

#### Parameters

- `chainID` - the chain ID.

#### Return Values

- `Signer` - the signer.

### `SignTx`

`SignTx` signs the transaction using the given signer and private key.

```go
func SignTx(tx *Transaction, s Signer, prv *ecdsa.PrivateKey) (*Transaction, error)
```

#### Parameters

- `tx` - the transaction to sign.
- `s` - the signer.
- `prv` - the private key.

#### Return Values

- `*Transaction` - the signed transaction.
- `error` - an error, if any.

### `SignNewTx`

`SignNewTx` creates a new transaction and signs it.

```go
func SignNewTx(prv *ecdsa.PrivateKey, s Signer, txdata TxData) (*Transaction, error)
```

#### Parameters

- `prv` - the private key.
- `s` - the signer.
- `txdata` - the transaction data.

#### Return Values

- `*Transaction` - the signed transaction.
- `error` - an error, if any.

### `sigCache`

`sigCache` is used to cache the derived sender and contains the signer used to derive it. ## Package `core/types`

The `core/types` package contains the core types used in the Ethereum blockchain, including transactions, blocks, and addresses.

### Function `SignNewTx`

`SignNewTx` creates a new transaction and signs it with the given private key and signer.

```go
func SignNewTx(prv *ecdsa.PrivateKey, s Signer, txdata TxData) (*Transaction, error)
```

#### Parameters

- `prv` - the private key to use for signing.
- `s` - the signer to use for signing.
- `txdata` - the transaction data.

#### Return Values

- `*Transaction` - the signed transaction.
- `error` - an error, if any.

### Function `MustSignNewTx`

`MustSignNewTx` creates a new transaction and signs it with the given private key and signer. This function panics if the transaction cannot be signed.

```go
func MustSignNewTx(prv *ecdsa.PrivateKey, s Signer, txdata TxData) *Transaction
```

#### Parameters

- `prv` - the private key to use for signing.
- `s` - the signer to use for signing.
- `txdata` - the transaction data.

#### Return Values

- `*Transaction` - the signed transaction.

### Function `Sender`

`Sender` returns the address derived from the signature (V, R, S) using the secp256k1 elliptic curve and an error if it failed deriving or upon an incorrect signature.

```go
func Sender(signer Signer, tx *Transaction) (common.Address, error)
```

#### Parameters

- `signer` - the signer to use for deriving the address.
- `tx` - the transaction.

#### Return Values

- `common.Address` - the derived address.
- `error` - an error, if any.

### Type `Signer`

`Signer` encapsulates transaction signature handling. Signers don't actually sign, they're just for validating and processing of signatures.

```go
type Signer interface {
    // Sender returns the sender address of the transaction.
    Sender(tx *Transaction) (common.Address, error)

    // SignatureValues returns the raw R, S, V values corresponding to the
    // given signature.
    SignatureValues(tx *Transaction, sig []byte) (r, s, v *big.Int, err error)
    ChainID() *big.Int

    // Hash returns 'signature hash', i.e. the transaction hash that is signed by the
    // private key. This hash does not uniquely identify the transaction.
    Hash(tx *Transaction) common.Hash

    // Equal returns true if the given signer is the same as the receiver.
    Equal(Signer) bool
}
```

#### Methods

- `Sender` - returns the sender address of the transaction.
- `SignatureValues` - returns the raw R, S, V values corresponding to the given signature.
- `ChainID` - returns the chain ID.
- `Hash` - returns the 'signature hash', i.e. the transaction hash that is signed by the private key. This hash does not uniquely identify the transaction.
- `Equal` - returns true if the given signer is the same as the receiver.

### Type `londonSigner`

`londonSigner` is a type that implements the `Signer` interface and accepts EIP-1559 dynamic fee transactions, EIP-2930 access list transactions, EIP-155 replay protected transactions, and legacy Homestead transactions.

```go
type londonSigner struct{ eip2930Signer }
```

#### Methods

- `Sender` - returns the sender address of the transaction.
- `Equal` - returns true if the given signer is the same as the receiver.
- `SignatureValues` - returns the raw R, S, V values corresponding to the given signature. ## Introduction

This codebase is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. The codebase contains the implementation of the Ethereum transaction signing process, including the EIP-2930 and EIP-155 signers.

## Functions

### `e(sig)`

`e(sig)` is a helper function that extracts the `V` value from a signature.

#### Parameters

- `sig` - the signature.

#### Return Values

- `*big.Int` - the `V` value.

### `londonSigner.Hash(tx *Transaction) common.Hash`

`londonSigner.Hash(tx *Transaction) common.Hash` returns the hash to be signed by the sender. It does not uniquely identify the transaction.

#### Parameters

- `tx` - the transaction.

#### Return Values

- `common.Hash` - the hash to be signed.

### `NewEIP2930Signer(chainId *big.Int) Signer`

`NewEIP2930Signer(chainId *big.Int) Signer` returns a signer that accepts EIP-2930 access list transactions, EIP-155 replay protected transactions, and legacy Homestead transactions.

#### Parameters

- `chainId` - the chain ID.

#### Return Values

- `Signer` - the new signer.

### `eip2930Signer.ChainID() *big.Int`

`eip2930Signer.ChainID() *big.Int` returns the chain ID.

#### Return Values

- `*big.Int` - the chain ID.

### `eip2930Signer.Equal(s2 Signer) bool`

`eip2930Signer.Equal(s2 Signer) bool` returns whether the given signer is equal to this signer.

#### Parameters

- `s2` - the signer to compare.

#### Return Values

- `bool` - whether the signers are equal.

### `eip2930Signer.Sender(tx *Transaction) (common.Address, error)`

`eip2930Signer.Sender(tx *Transaction) (common.Address, error)` returns the sender of the transaction.

#### Parameters

- `tx` - the transaction.

#### Return Values

- `common.Address` - the sender address.
- `error` - an error, if any.

### `eip2930Signer.SignatureValues(tx *Transaction, sig []byte) (R, S, V *big.Int, err error)`

`eip2930Signer.SignatureValues(tx *Transaction, sig []byte) (R, S, V *big.Int, err error)` returns the signature values of the transaction.

#### Parameters

- `tx` - the transaction.
- `sig` - the signature.

#### Return Values

- `*big.Int` - the `R` value.
- `*big.Int` - the `S` value.
- `*big.Int` - the `V` value.
- `error` - an error, if any.

### `eip2930Signer.Hash(tx *Transaction) common.Hash`

`eip2930Signer.Hash(tx *Transaction) common.Hash` returns the hash to be signed by the sender. It does not uniquely identify the transaction.

#### Parameters

- `tx` - the transaction.

#### Return Values

- `common.Hash` - the hash to be signed.

### `NewEIP155Signer(chainId *big.Int) EIP155Signer`

`NewEIP155Signer(chainId *big.Int) EIP155Signer` returns a new EIP-155 signer.

#### Parameters

- `chainId` - the chain ID.

#### Return Values

- `EIP155Signer` - the new signer.

### `EIP155Signer.ChainID() *big.Int`

`EIP155Signer.ChainID() *big.Int` returns the chain ID.

#### Return Values

- `*big.Int` - the chain ID. ## Package `core/types`

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data structures and functions that are used to represent and manipulate Ethereum transactions and blocks.

### Type `Transaction`

The `Transaction` type represents an Ethereum transaction.

#### Fields

- `data` - the transaction data.
- `hash` - the transaction hash.
- `nonce` - the transaction nonce.
- `to` - the recipient address.
- `value` - the transaction value.
- `gas` - the gas limit.
- `gasPrice` - the gas price.
- `v` - the recovery ID.
- `r` - the ECDSA signature r value.
- `s` - the ECDSA signature s value.
- `chainId` - the chain ID.

#### Methods

##### `Type() int`

`Type` returns the transaction type.

##### `Protected() bool`

`Protected` returns whether the transaction is protected.

##### `ChainId() *big.Int`

`ChainId` returns the chain ID.

##### `RawSignatureValues() (v *big.Int, r *big.Int, s *big.Int)`

`RawSignatureValues` returns the raw signature values.

##### `SignatureValues(sig []byte) (r, s, v *big.Int, err error)`

`SignatureValues` returns the signature values.

##### `Hash() common.Hash`

`Hash` returns the hash of the transaction.

##### `CheckNonce() error`

`CheckNonce` checks the transaction nonce.

##### `CheckSignature() error`

`CheckSignature` checks the transaction signature.

##### `AsMessage(s Signer) (Message, error)`

`AsMessage` returns the message representation of the transaction.

##### `Sender(s Signer) (common.Address, error)`

`Sender` returns the sender address of the transaction.

### Type `Block`

The `Block` type represents an Ethereum block.

#### Fields

- `header` - the block header.
- `uncles` - the block uncles.
- `transactions` - the block transactions.

#### Methods

##### `Hash() common.Hash`

`Hash` returns the hash of the block.

##### `UncleHash() common.Hash`

`UncleHash` returns the hash of the block uncles.

##### `TransactionHash() common.Hash`

`TransactionHash` returns the hash of the block transactions.

##### `ReceiptHash() common.Hash`

`ReceiptHash` returns the hash of the block receipts.

##### `StateHash() common.Hash`

`StateHash` returns the hash of the block state.

##### `MarshalJSON() ([]byte, error)`

`MarshalJSON` marshals the block to JSON.

##### `UnmarshalJSON(data []byte) error`

`UnmarshalJSON` unmarshals the block from JSON.

### Type `Header`

The `Header` type represents an Ethereum block header.

#### Fields

- `parentHash` - the parent block hash.
- `uncleHash` - the uncle block hash.
- `coinbase` - the miner address.
- `root` - the state root hash.
- `txHash` - the transaction hash.
- `receiptHash` - the receipt hash.
- `bloom` - the bloom filter.
- `difficulty` - the block difficulty.
- `number` - the block number.
- `gasLimit` - the block gas limit.
- `gasUsed` - the block gas used.
- `time` - the block timestamp.
- `extra` - the extra data.
- `mixDigest` - the mix digest.
- `nonce` - the block nonce.

#### Methods

##### `Hash() common.Hash`

`Hash` returns the hash of the block header.

##### `UncleHash() common.Hash`

`UncleHash` returns the hash of the block header uncles.

##### `MarshalJSON() ([]byte, error)`

`MarshalJSON` marshals the block header to JSON.

##### `UnmarshalJSON(data []byte) error`

`UnmarshalJSON` unmarshals the block header from JSON.

### Type `Log`

The `Log` type represents an Ethereum log.

#### Fields

- `Address` - the contract address.
- `Topics` - the log topics.
- `Data` - the log data.
- `BlockNumber` - the block number.
- `TxHash` - the transaction hash.
- `TxIndex` - the transaction index.
- `BlockHash` - the block hash.
- `Index` - the log index.

#### Methods

##### `EncodeRLP(w io.Writer) error`

`EncodeRLP` encodes the log to RLP.

##### `DecodeRLP(s *rlp.Stream) error`

`DecodeRLP` decodes the log from RLP.

### Type `Receipt`

The `Receipt` type represents an Ethereum receipt.

#### Fields

- `PostState` - the post-state ## Documentation for Source Code

### `SetBytes(sig[32:64])`

This function sets the bytes of the signature from index 32 to 64. It takes in a slice of bytes `sig` and returns nothing.

### `recoverPlain(sighash common.Hash, R, S, Vb *big.Int, homestead bool) (common.Address, error)`

This function recovers the plain signature from the given parameters. It takes in the following parameters:

- `sighash` - the hash of the message being signed.
- `R` - the R value of the signature.
- `S` - the S value of the signature.
- `Vb` - the V value of the signature.
- `homestead` - a boolean value indicating whether the signature is from the Homestead era.

It returns the recovered address and an error, if any.

### `deriveChainId(v *big.Int) *big.Int`

This function derives the chain ID from the given V parameter. It takes in a big integer `v` and returns a big integer representing the chain ID.

## Explanation of Source Code

The source code contains three functions that are used for signature recovery and chain ID derivation in the Ethereum blockchain. 

The `SetBytes` function sets the bytes of the signature from index 32 to 64. This is used in the `recoverPlain` function to encode the signature in uncompressed format.

The `recoverPlain` function recovers the plain signature from the given parameters. It first checks if the V value is greater than 8 bits, and returns an error if it is. It then validates the signature values using the `ValidateSignatureValues` function from the `crypto` package. The signature is then encoded in uncompressed format using the `SetBytes` function. The public key is recovered from the signature using the `Ecrecover` function from the `crypto` package. The recovered public key is then used to derive the address of the signer.

The `deriveChainId` function derives the chain ID from the given V parameter. If the V value is less than or equal to 64 bits, it checks if it is equal to 27 or 28, and returns 0 if it is. Otherwise, it calculates the chain ID using the formula `(v - 35) / 2`. If the V value is greater than 64 bits, it subtracts 35 from it and divides the result by 2 to get the chain ID.