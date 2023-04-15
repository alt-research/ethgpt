# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including transactions, blocks, receipts, and logs.

## Variables

### `legacyReceipt`

`legacyReceipt` is a variable that contains a legacy receipt, which is a receipt for a transaction that was not an EIP-1559 or access list transaction.

### `accessListReceipt`

`accessListReceipt` is a variable that contains an access list receipt, which is a receipt for an access list transaction.

### `eip1559Receipt`

`eip1559Receipt` is a variable that contains an EIP-1559 receipt, which is a receipt for an EIP-1559 transaction.

## Functions

### `TestDecodeEmptyTypedReceipt`

`TestDecodeEmptyTypedReceipt` is a test function that tests whether an empty typed receipt can be correctly decoded.

### `TestDeriveFields`

`TestDeriveFields` is a test function that tests whether receipt data can be correctly derived from the contextual information.

### `TestReceipts_RLP`

`TestReceipts_RLP` is a test function that tests whether receipts can be correctly encoded and decoded using RLP.

### `TestReceipts_JSON`

`TestReceipts_JSON` is a test function that tests whether receipts can be correctly encoded and decoded using JSON.

### `TestReceipts_JSON_Unmarshal`

`TestReceipts_JSON_Unmarshal` is a test function that tests whether receipts can be correctly unmarshaled from JSON.

### `TestReceipts_JSON_Marshal`

`TestReceipts_JSON_Marshal` is a test function that tests whether receipts can be correctly marshaled to JSON.

### `TestReceipts_JSON_MarshalIndent`

`TestReceipts_JSON_MarshalIndent` is a test function that tests whether receipts can be correctly marshaled to indented JSON.

### `TestReceipts_JSON_Unmarshal_Invalid`

`TestReceipts_JSON_Unmarshal_Invalid` is a test function that tests whether invalid JSON can be correctly handled when unmarshaling receipts.

### `TestReceipts_JSON_Marshal_Invalid`

`TestReceipts_JSON_Marshal_Invalid` is a test function that tests whether invalid receipts can be correctly handled when marshaling to JSON.

### `TestReceipts_JSON_MarshalIndent_Invalid`

`TestReceipts_JSON_MarshalIndent_Invalid` is a test function that tests whether invalid receipts can be correctly handled when marshaling to indented JSON.

### `TestReceipts_Equal`

`TestReceipts_Equal` is a test function that tests whether two receipts can be correctly compared for equality.

### `TestReceipts_Copy`

`TestReceipts_Copy` is a test function that tests whether a receipt can be correctly copied.

### `TestReceipts_Clone`

`TestReceipts_Clone` is a test function that tests whether a receipt can be correctly cloned.

### `TestReceipts_Merge`

`TestReceipts_Merge` is a test function that tests whether two receipts can be correctly merged.

### `TestReceipts_MergeWith`

`TestReceipts_MergeWith` is a test function that tests whether a receipt can be correctly merged with another receipt.

### `TestReceipts_MergeWith_Nil`

`TestReceipts_MergeWith_Nil` is a test function that tests whether a receipt can be correctly merged with a nil receipt.

### `TestReceipts_MergeWith_Empty`

`TestReceipts_MergeWith_Empty` is a test function that tests whether a receipt can be correctly merged with an empty receipt.

### `TestReceipts_MergeWith_Empty_Nil`

`TestReceipts_MergeWith_Empty_Nil` is a test function that tests whether an empty receipt can be correctly merged with a nil receipt.

### `TestReceipts_MergeWith_Empty_Empty`

`TestReceipts_MergeWith_Empty_Empty` is a test function that tests whether two empty receipts can be correctly merged.

### `TestReceipts_MergeWith_Legacy`

`TestReceipts_MergeWith_Legacy` is a test function that tests whether a receipt can be correctly merged with a legacy receipt.

### `TestReceipts_MergeWith_AccessList`

`TestReceipts_MergeWith_AccessList` is a test function that tests whether a receipt can be correctly merged with an access list receipt.

### `TestReceipts_MergeWith_EIP1559`

`TestReceipts_MergeWith_EIP1559` is a test function that tests ## Receipts

The `Receipts` type is a slice of `*Receipt` pointers. It represents the receipts of a block, which contain information about the execution of transactions in the block.

### `DeriveFields`

`DeriveFields` derives the fields of the receipts that can be computed from the block and transaction data.

```go
func (receipts Receipts) DeriveFields(config *params.ChainConfig, blockHash common.Hash, blockNumber uint64, baseFee *big.Int, txs types.Transactions) error
```

#### Parameters

- `config` - the chain configuration.
- `blockHash` - the hash of the block.
- `blockNumber` - the number of the block.
- `baseFee` - the base fee of the block.
- `txs` - the transactions in the block.

#### Return Values

- `error` - an error, if any.

### `clearComputedFieldsOnReceipts`

`clearComputedFieldsOnReceipts` clears the fields of the receipts that are computed during the execution of the transactions.

```go
func clearComputedFieldsOnReceipts(receipts Receipts) []*Receipt
```

#### Parameters

- `receipts` - the receipts to clear.

#### Return Values

- `[]*Receipt` - the receipts with the computed fields cleared.

### Example

```go
// Create some transactions.
txs := types.Transactions{
		types.NewTransaction(0, common.BytesToAddress([]byte{0x01}), big.NewInt(1), 1, big.NewInt(1), nil),
		types.NewTransaction(1, common.BytesToAddress([]byte{0x02}), big.NewInt(2), 2, big.NewInt(2), nil),
		types.NewTx(&types.DynamicFeeTx{
			ChainID:    big.NewInt(1),
			Nonce:      2,
			GasTipCap:  big.NewInt(33),
			GasFeeCap:  big.NewInt(44),
			Gas:        3,
			To:         &common.Address{},
			Value:      big.NewInt(3),
			Data:       nil,
			AccessList: nil,
		}),
		types.NewTx(&types.DynamicFeeTx{
			ChainID:    big.NewInt(1),
			Nonce:      3,
			GasTipCap:  big.NewInt(1044),
			GasFeeCap:  big.NewInt(1055),
			Gas:        4,
			To:         &common.Address{},
			Value:      big.NewInt(4),
			Data:       nil,
			AccessList: nil,
		}),
		types.NewTx(&types.DynamicFeeTx{
			ChainID:    big.NewInt(1),
			Nonce:      4,
			GasTipCap:  big.NewInt(56),
			GasFeeCap:  big.NewInt(1055),
			Gas:        5,
			To:         &common.Address{},
			Value:      big.NewInt(5),
			Data:       nil,
			AccessList: nil,
		}),
	}

	// Create the corresponding block.
	block := &types.Block{
		Header: &types.Header{
			Number:     big.NewInt(1),
			Difficulty: big.NewInt(1),
			GasLimit:   1,
			GasUsed:    1,
			Time:       1,
			Extra:      []byte{0x01},
			ParentHash: common.BytesToHash([]byte{0x02}),
			UncleHash:  common.BytesToHash([]byte{0x03}),
			Coinbase:   common.BytesToAddress([]byte{0x04}),
			Root:       common.BytesToHash([]byte{0x05}),
			TxHash:     types.DeriveSha(txs),
			ReceiptHash: types.DeriveSha(Receipts{
				&Receipt{},
				&Receipt{},
				&Receipt{},
				&Receipt{},
				&Receipt{},
			}),
			Bloom: types.BytesToBloom([]byte{0x06}),
			BaseFee: big.NewInt(1000),
		},
		Transactions: txs,
	}

	// Create the corresponding receipts.
	receipts := Receipts{
		&Receipt{
			Status:            ReceiptStatusFailed,
			CumulativeGasUsed: 1,
			Logs: []*Log{
				{
					Address: common.BytesToAddress([]byte{0x11}),
					// derived fields:
					BlockNumber: blockNumber.Uint64(), ## Receipt Package

The `receipt` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum receipt data structure.

### `func TestReceiptsDiff(t *testing.T)`

`TestReceiptsDiff` tests the `Diff` function, which compares two receipts and returns the differences between them.

#### Parameters

- `t` - the testing object.

### `func TestTypedReceiptEncodingDecoding(t *testing.T)`

`TestTypedReceiptEncodingDecoding` tests the encoding and decoding of typed receipts.

#### Parameters

- `t` - the testing object.

### `func TestReceiptMarshalBinary(t *testing.T)`

`TestReceiptMarshalBinary` tests the `MarshalBinary` function, which marshals a receipt into binary format.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsEncodeRLP(t *testing.T)`

`TestReceiptsEncodeRLP` tests the `EncodeRLP` function, which encodes a receipt into RLP format.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsDecodeRLP(t *testing.T)`

`TestReceiptsDecodeRLP` tests the `DecodeRLP` function, which decodes a receipt from RLP format.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsEncodeIndex(t *testing.T)`

`TestReceiptsEncodeIndex` tests the `EncodeIndex` function, which encodes a receipt into an index.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsDecodeIndex(t *testing.T)`

`TestReceiptsDecodeIndex` tests the `DecodeIndex` function, which decodes a receipt from an index.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHash(t *testing.T)`

`TestReceiptsHash` tests the `Hash` function, which calculates the hash of a receipt.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithPayouts(t *testing.T)`

`TestReceiptsHashWithPayouts` tests the `HashWithPayouts` function, which calculates the hash of a receipt with payouts.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithStatus(t *testing.T)`

`TestReceiptsHashWithStatus` tests the `HashWithStatus` function, which calculates the hash of a receipt with status.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithStatusAndPayouts(t *testing.T)`

`TestReceiptsHashWithStatusAndPayouts` tests the `HashWithStatusAndPayouts` function, which calculates the hash of a receipt with status and payouts.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithStatusAndPayoutsAndCumulativeGasUsed(t *testing.T)`

`TestReceiptsHashWithStatusAndPayoutsAndCumulativeGasUsed` tests the `HashWithStatusAndPayoutsAndCumulativeGasUsed` function, which calculates the hash of a receipt with status, payouts, and cumulative gas used.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithStatusAndCumulativeGasUsed(t *testing.T)`

`TestReceiptsHashWithStatusAndCumulativeGasUsed` tests the `HashWithStatusAndCumulativeGasUsed` function, which calculates the hash of a receipt with status and cumulative gas used.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithPayoutsAndCumulativeGasUsed(t *testing.T)`

`TestReceiptsHashWithPayoutsAndCumulativeGasUsed` tests the `HashWithPayoutsAndCumulativeGasUsed` function, which calculates the hash of a receipt with payouts and cumulative gas used.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithLogs(t *testing.T)`

`TestReceiptsHashWithLogs` tests the `HashWithLogs` function, which calculates the hash of a receipt with logs.

#### Parameters

- `t` - the testing object.

### `func TestReceiptsHashWithLogsAndStatus(t *testing.T)`

`TestReceiptsHashWithLogsAndStatus` ## Function Documentation

### `func (r *Receipt) MarshalBinary() ([]byte, error)`

`MarshalBinary` encodes the receipt into binary format.

#### Parameters

None.

#### Return Values

- `[]byte` - the encoded binary data.
- `error` - an error, if any.

### `func (r *Receipt) UnmarshalBinary(data []byte) error`

`UnmarshalBinary` decodes the receipt from binary format.

#### Parameters

- `data` - the binary data to decode.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) EncodeRLP(w io.Writer) error`

`EncodeRLP` encodes the receipt into RLP format.

#### Parameters

- `w` - the writer to write the encoded data to.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) DecodeRLP(s *rlp.Stream) error`

`DecodeRLP` decodes the receipt from RLP format.

#### Parameters

- `s` - the RLP stream to decode from.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) EncodeIndex(i int, w io.Writer) error`

`EncodeIndex` encodes the receipt into RLP format with an index.

#### Parameters

- `i` - the index to encode.
- `w` - the writer to write the encoded data to.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) DecodeIndex(i int, s *rlp.Stream) error`

`DecodeIndex` decodes the receipt from RLP format with an index.

#### Parameters

- `i` - the index to decode.
- `s` - the RLP stream to decode from.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) Copy() *Receipt`

`Copy` creates a copy of the receipt.

#### Parameters

None.

#### Return Values

- `*Receipt` - the copy of the receipt.

### `func (r *Receipt) AddLog(log *Log)`

`AddLog` adds a log to the receipt.

#### Parameters

- `log` - the log to add.

#### Return Values

None.

### `func (r *Receipt) AddBloom(bloom Bloom)`

`AddBloom` adds a bloom filter to the receipt.

#### Parameters

- `bloom` - the bloom filter to add.

#### Return Values

None.

### `func (r *Receipt) AddContractAddress(addr common.Address)`

`AddContractAddress` adds a contract address to the receipt.

#### Parameters

- `addr` - the contract address to add.

#### Return Values

None.

### `func (r *Receipt) AddGasUsed(gasUsed uint64)`

`AddGasUsed` adds the amount of gas used to the receipt.

#### Parameters

- `gasUsed` - the amount of gas used to add.

#### Return Values

None.

### `func (r *Receipt) AddTxFee(tx *types.Transaction, config *params.ChainConfig)`

`AddTxFee` adds the transaction fee to the receipt.

#### Parameters

- `tx` - the transaction to add the fee from.
- `config` - the chain configuration.

#### Return Values

None.

### `func (r *Receipt) AddAccessList(al *types.AccessList)`

`AddAccessList` adds an access list to the receipt.

#### Parameters

- `al` - the access list to add.

#### Return Values

None.

### `func (r *Receipt) AddEIP1559Data(eip1559Data *types.Transaction_EIP1559Fee)`

`AddEIP1559Data` adds EIP-1559 data to the receipt.

#### Parameters

- `eip1559Data` - the EIP-1559 data to add.

#### Return Values

None.

### `func (r *Receipt) AddEIP1559FeeCap(feeCap *big.Int)`

`AddEIP1559FeeCap` adds the EIP-1559 fee cap to the receipt.

#### Parameters

- `feeCap` - the EIP-1559 fee cap to add.

#### Return Values

None.

### `func (r * ## Receipt Package

The `receipt` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum transaction receipt.

### `func (r *Receipt) UnmarshalBinary(data []byte) error`

`UnmarshalBinary` unmarshals a binary-encoded receipt.

#### Parameters

- `data` - the binary-encoded receipt.

#### Return Values

- `error` - an error, if any.

### `func (r *Receipt) MarshalBinary() ([]byte, error)`

`MarshalBinary` marshals a receipt into binary format.

#### Return Values

- `[]byte` - the binary-encoded receipt.
- `error` - an error, if any.

### `func (r *Receipt) AddLog(log *types.Log)`

`AddLog` adds a log to the receipt.

#### Parameters

- `log` - the log to add.

### `func (r *Receipt) AddBloom(bloom ethtypes.Bloom)`

`AddBloom` adds a bloom filter to the receipt.

#### Parameters

- `bloom` - the bloom filter to add.

### `func (r *Receipt) AddGasUsed(gasUsed uint64)`

`AddGasUsed` adds the amount of gas used to the receipt.

#### Parameters

- `gasUsed` - the amount of gas used.

### `func (r *Receipt) AddContractAddress(addr common.Address)`

`AddContractAddress` adds the contract address to the receipt.

#### Parameters

- `addr` - the contract address.

### `func (r *Receipt) AddStatus(status uint64)`

`AddStatus` adds the status to the receipt.

#### Parameters

- `status` - the status.

### `func (r *Receipt) AddCumulativeGasUsed(cumulativeGasUsed uint64)`

`AddCumulativeGasUsed` adds the cumulative gas used to the receipt.

#### Parameters

- `cumulativeGasUsed` - the cumulative gas used.

### `func (r *Receipt) AddTxIndex(txIndex uint64)`

`AddTxIndex` adds the transaction index to the receipt.

#### Parameters

- `txIndex` - the transaction index.

### `func (r *Receipt) AddBlockNumber(blockNumber uint64)`

`AddBlockNumber` adds the block number to the receipt.

#### Parameters

- `blockNumber` - the block number.

### `func (r *Receipt) AddBlockHash(blockHash common.Hash)`

`AddBlockHash` adds the block hash to the receipt.

#### Parameters

- `blockHash` - the block hash.

### `func (r *Receipt) AddContractAddressAndBloom(addr common.Address, bloom ethtypes.Bloom)`

`AddContractAddressAndBloom` adds the contract address and bloom filter to the receipt.

#### Parameters

- `addr` - the contract address.
- `bloom` - the bloom filter.

### `func (r *Receipt) AddPostState(postState []byte)`

`AddPostState` adds the post-state to the receipt.

#### Parameters

- `postState` - the post-state.

### `func (r *Receipt) AddRevertReason(revertReason []byte)`

`AddRevertReason` adds the revert reason to the receipt.

#### Parameters

- `revertReason` - the revert reason.

### `func (r *Receipt) AddGasUsedAndRevertReason(gasUsed uint64, revertReason []byte)`

`AddGasUsedAndRevertReason` adds the amount of gas used and the revert reason to the receipt.

#### Parameters

- `gasUsed` - the amount of gas used.
- `revertReason` - the revert reason.

### `func (r *Receipt) AddAccessList(accessList ethtypes.AccessList)`

`AddAccessList` adds the access list to the receipt.

#### Parameters

- `accessList` - the access list.

### `func (r *Receipt) AddType(txType uint8)`

`AddType` adds the transaction type to the receipt.

#### Parameters

- `txType` - the transaction type.

### `func (r *Receipt) AddMaxFeePerGas(maxFeePerGas *big.Int)`

`AddMaxFeePerGas` adds the maximum fee per gas to the receipt.

#### Parameters

- `maxFeePerGas` - the maximum ## Documentation for Source Code

### Function: `TestReceipt_UnmarshalBinary`

This function is a test function that tests the `UnmarshalBinary` method of the `Receipt` struct. It takes a binary string as input, unmarshals it into a `Receipt` struct, and compares it with an expected `Receipt` struct. If the two structs are not equal, the test fails.

### Function: `clearComputedFieldsOnReceipts`

This function takes a slice of `Receipt` structs as input and returns a new slice of `Receipt` structs with all computed fields cleared. The computed fields that are cleared include `TxHash`, `BlockHash`, `BlockNumber`, `TransactionIndex`, `ContractAddress`, `GasUsed`, and `Logs`. The function creates a new slice of `Receipt` structs to avoid modifying the original slice.

### Function: `clearComputedFieldsOnReceipt`

This function takes a `Receipt` struct as input and returns a new `Receipt` struct with all computed fields cleared. The computed fields that are cleared include `TxHash`, `BlockHash`, `BlockNumber`, `TransactionIndex`, `ContractAddress`, `GasUsed`, and `Logs`. The function creates a new `Receipt` struct to avoid modifying the original struct.

### Function: `clearComputedFieldsOnLogs`

This function takes a slice of `Log` structs as input and returns a new slice of `Log` structs with all computed fields cleared. The computed fields that are cleared include `BlockNumber`, `BlockHash`, `TxHash`, `TxIndex`, and `Index`. The function creates a new slice of `Log` structs to avoid modifying the original slice.

## Conclusion

In summary, the source code contains three functions that are used to clear computed fields on `Receipt` and `Log` structs. These functions are used to create new structs with the computed fields cleared, which can be useful in certain situations. Additionally, there is a test function that tests the `UnmarshalBinary` method of the `Receipt` struct.