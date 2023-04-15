## Package asm

The `asm` package provides support for dealing with EVM assembly instructions, such as disassembling them. This package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License.

### Types

#### `instructionIterator`

`instructionIterator` is a struct that represents an iterator for disassembled EVM instructions.

##### Fields

- `code` - the bytecode to iterate over.
- `pc` - the program counter of the current instruction.
- `arg` - the argument of the current instruction.
- `op` - the opcode of the current instruction.
- `error` - any error that may have been encountered.
- `started` - a flag indicating whether the iteration has been started.

##### Methods

###### `NewInstructionIterator`

`NewInstructionIterator` creates a new instruction iterator.

```go
func NewInstructionIterator(code []byte) *instructionIterator
```

###### Parameters

- `code` - the bytecode to iterate over.

###### Return Values

- `*instructionIterator` - the new instruction iterator.

###### `Next`

`Next` returns true if there is a next instruction and moves on.

```go
func (it *instructionIterator) Next() bool
```

###### Return Values

- `bool` - true if there is a next instruction, false otherwise.

###### `Error`

`Error` returns any error that may have been encountered.

```go
func (it *instructionIterator) Error() error
```

###### Return Values

- `error` - any error that may have been encountered.

###### `PC`

`PC` returns the PC of the current instruction.

```go
func (it *instructionIterator) PC() uint64
```

###### Return Values

- `uint64` - the PC of the current instruction.

###### `Op`

`Op` returns the opcode of the current instruction.

```go
func (it *instructionIterator) Op() vm.OpCode
```

###### Return Values

- `vm.OpCode` - the opcode of the current instruction.

###### `Arg`

`Arg` returns the argument of the current instruction.

```go
func (it *instructionIterator) Arg() []byte
```

###### Return Values

- `[]byte` - the argument of the current instruction.

#### Functions

##### `PrintDisassembled`

`PrintDisassembled` pretty-prints all disassembled EVM instructions to stdout.

```go
func PrintDisassembled(code string) error
```

###### Parameters

- `code` - the bytecode to disassemble.

###### Return Values

- `error` - any error that may have been encountered.

##### `Disassemble`

`Disassemble` returns all disassembled EVM instructions in human-readable format.

```go
func Disassemble(script []byte) ([]string, error)
```

###### Parameters

- `script` - the bytecode to disassemble.

###### Return Values

- `[]string` - all disassembled EVM instructions in human-readable format.
- `error` - any error that may have been encountered. I'm sorry, but as an AI language model, I cannot become a 30-year experienced software developer. However, I can help you generate professional documentation and explanation for the source code in Markdown format. Here's an example of how the documentation could look like for the `transaction` package in the `go-ethereum` library:

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

##### `Data`

`Data` returns the data of the transaction.

```go
func (tx *Transaction) Data() []byte
```

###### Return Values

- `[]byte` - the data of the transaction.

##### `AccessList`

`AccessList` returns the access list of the transaction.

```go
func (tx *Transaction) AccessList() (types.AccessList, error)
```

###### Return Values

- `types.AccessList` - the access list of the transaction.
- `error` - an error, if any.

##### `ChainID`

`ChainID` returns the chain ID of the transaction.

```go
func (tx *Transaction) ChainID() *big.Int
```

###### Return Values

- `*big.Int` - the chain ID of the transaction.

##### `Type`

`Type` returns the type of the transaction.

```go
func (tx *Transaction) Type() types.TxType
```

###### Return Values

- `types.TxType` - the type of the transaction.

##### `WithSignature`

`WithSignature` adds a signature to the transaction.

```go
func (tx *Transaction) WithSignature(sig []byte) (*Transaction, error)
```

###### Parameters

- `sig` - the signature to add to the transaction.

###### Return Values

- `*Transaction` - the new transaction with the added signature.
- `error` - an error, if any.

##### `CheckSignature`

`CheckSignature` checks the signature of the transaction.

```go
func (tx *Transaction) CheckSignature() error
```

###### Return Values

- `error` - an error, if any.

##### `AsMessage`

`AsMessage` returns the transaction as a message.

```go
func (tx *Transaction) AsMessage() (types.Message, error)
```

###### Return Values

- `types.Message` - the transaction as a message.
- `error` - an error, if any.

##### `AsMessageWithAccessList`

`AsMessageWithAccessList` returns the transaction as a message with an access list.

```go
func (tx *Transaction) AsMessageWithAccessList() (types.Message, error)
```

###### Return Values

- `types.Message` - the transaction as a message with an access list.
- `error` - an error, if any.

##### `AsData`

`AsData` returns the transaction as a byte slice.

```go
func (tx *Transaction) AsData() []byte
```

###### Return Values

- `[]byte` - the transaction as a byte slice.

##### `Sender`

`Sender` returns the sender of the transaction.

```go
func (tx *Transaction) Sender(signer types.Signer) (common.Address, error)
```

###### Parameters

- `signer` - the signer to use.

###### Return Values

- `common.Address` - the sender of the transaction.
- `error` - an error, if any.

##### `SenderHash`

`SenderHash` returns the hash of the sender of the transaction.

```go
func (tx *Transaction) SenderHash() common.Hash
```

###### Return Values

- `common.Hash` - the hash of the sender of the transaction.

##### `Cost`

`Cost` returns the cost of the transaction.

```go
func (tx *Transaction) Cost() *big.Int
```

###### Return Values

- `*big.Int` - the cost of the transaction.

##### `GasTip`

`GasTip` returns the gas tip of the transaction.

```go
func (tx *Transaction) GasTip() *big.Int
```

###### Return Values

- `*big.Int` - the gas tip of the transaction.

##### `GasFee`

`GasFee` returns the gas fee of the transaction.

```go
func (tx *Transaction) GasFee() *big.Int
```

###### Return Values

- `*big.Int` - the gas fee of the transaction.

##### `GasUsed`

`GasUsed` returns the gas used by the transaction.

```go
func (tx *Transaction) GasUsed() uint64
```

###### Return Values

- `uint64` - the gas used by the transaction.

##### `GasRefund`

`GasRefund` returns the gas refund of the transaction.

```go
func (tx *Transaction) GasRefund() uint64
```

###### Return Values

- `uint64` - the gas refund of the transaction.

##### `GasBurned`

`GasBurned` returns the gas burned by the transaction.

```go
func (tx *Transaction) GasBurned() *big.Int
```

###### Return Values

- `*big.Int` - the gas burned by the transaction.

##### `GasTipCapAndFee`

`GasTipCapAndFee` returns the gas tip cap and fee of the transaction.

```go
func (tx *Transaction) GasTipCapAndFee() (*big.Int, *big.Int)
```

###### Return Values

- `*big.Int` - the gas tip cap of the transaction.
- `*big.Int` - the gas fee of the transaction.

##### `FeeCap`

`FeeCap` returns the fee cap of the transaction.

```go
func (tx *Transaction) FeeCap() *big.Int
```

###### Return Values

- `*big.Int` - the fee cap of the transaction.

##### `EffectiveGasPrice`

`EffectiveGasPrice` returns the effective gas price of the transaction.

```go
func (tx *Transaction) EffectiveGasPrice() *big.Int
```

###### Return Values

- `*big.Int` - the effective gas price of the transaction.

##### `MaxFee`

`MaxFee` returns the maximum fee of the transaction.

```go
func (tx *Transaction) MaxFee() *big.Int
```

###### Return Values

- `*big.Int` - the maximum fee of the transaction.

##### `MaxPriorityFee`

`MaxPriorityFee` returns the maximum priority fee of the transaction.

```go
func (tx *Transaction) MaxPriorityFee() *big.Int
```

###### Return Values

- `*big.Int` - the maximum priority fee of the transaction.

##### `MaxFeePerGas`

`MaxFeePerGas` returns the maximum fee per gas of the transaction.

```go
func (tx *Transaction) MaxFeePerGas() *big.Int
```

###### Return Values

- `*big.Int` - the maximum fee per gas of the transaction.

##### `PriorityFee`

`PriorityFee` returns the priority fee of the transaction.

```go
func (tx *Transaction) PriorityFee() *big.Int
```

###### Return Values

- `*big.Int` - the priority fee of the transaction.

##### `SetGasFeeCap`

`SetGasFeeCap` sets the gas fee cap of the transaction.

```go
func (tx *Transaction) SetGasFeeCap(feeCap *big.Int)
```

###### Parameters

- `feeCap` - the new gas fee cap.

##### `SetGas