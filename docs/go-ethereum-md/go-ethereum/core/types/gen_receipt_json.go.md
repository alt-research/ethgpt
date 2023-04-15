## Receipt Marshaling

The `Receipt` type is a struct that represents a transaction receipt in the Ethereum blockchain. This type is used to store information about the execution of a transaction, including the status, cumulative gas used, logs, and more.

The `MarshalJSON` function is a method of the `Receipt` type that marshals the receipt as JSON. It creates a new `Receipt` struct with the fields that are required for JSON serialization, and then sets the values of those fields to the corresponding values in the original `Receipt` struct. Finally, it calls the `json.Marshal` function to serialize the new `Receipt` struct to JSON.

The `UnmarshalJSON` function is a method of the `Receipt` type that unmarshals the receipt from JSON. It creates a new `Receipt` struct with the fields that are required for JSON deserialization, and then sets the values of those fields to the corresponding values in the JSON input. Finally, it returns an error if any of the required fields are missing.

The `Receipt` struct has the following fields:

- `Type` - the type of the receipt.
- `PostState` - the root of the state trie after the transaction has been executed.
- `Status` - the status code of the transaction execution.
- `CumulativeGasUsed` - the total amount of gas used by the transaction and all its subcalls.
- `Bloom` - the Bloom filter of the transaction logs.
- `Logs` - the transaction logs.
- `TxHash` - the hash of the transaction.
- `ContractAddress` - the address of the contract created by the transaction, if any.
- `GasUsed` - the amount of gas used by the transaction.
- `EffectiveGasPrice` - the effective gas price of the transaction.
- `BlockHash` - the hash of the block containing the transaction.
- `BlockNumber` - the number of the block containing the transaction.
- `TransactionIndex` - the index of the transaction in the block.

The `hexutil` package is used to encode and decode some of the fields in the `Receipt` struct. The `hexutil.Uint64` type is used to represent unsigned 64-bit integers in hexadecimal format, and the `hexutil.Bytes` type is used to represent byte slices in hexadecimal format. The `hexutil.Big` type is used to represent big integers in hexadecimal format.

The `common` package is used to represent Ethereum addresses and hashes. The `Bloom` type is a 256-bit Bloom filter used to index transaction logs. The `Log` type represents a single log entry in the transaction receipt. ## Function Description: `New`

The `New` function creates a new `Receipt` instance from the given `JSON` input. It returns an error if the input is invalid or missing required fields.

### Parameters

- `input` - a `JSON` input string.

### Return Values

- `*Receipt` - a new `Receipt` instance.
- `error` - an error, if any.

### Example Usage

```go
input := `{
    "transactionHash": "0x1234567890abcdef",
    "transactionIndex": "0x1",
    "blockHash": "0x1234567890abcdef",
    "blockNumber": "0x2",
    "from": "0x1234567890abcdef",
    "to": "0x1234567890abcdef",
    "cumulativeGasUsed": "0x3",
    "gasUsed": "0x4",
    "contractAddress": "0x1234567890abcdef",
    "logs": [
        {
            "address": "0x1234567890abcdef",
            "topics": [
                "0x1234567890abcdef",
                "0x1234567890abcdef"
            ],
            "data": "0x1234567890abcdef"
        }
    ],
    "logsBloom": "0x1234567890abcdef",
    "status": "0x1",
    "effectiveGasPrice": "0x1234567890abcdef"
}`

receipt, err := New(input)
if err != nil {
    log.Fatal(err)
}

fmt.Println(receipt)
```

In this example, the `New` function is used to create a new `Receipt` instance from the given `JSON` input. If the input is invalid or missing required fields, an error is returned. The resulting `Receipt` instance is then printed to the console.