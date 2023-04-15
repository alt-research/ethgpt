## Documentation for the Source Code

### Package: `apitypes`

The `apitypes` package contains types and functions related to the Ethereum API.

### Type: `ValidationInfo`

The `ValidationInfo` type represents information about a validation error. It has two fields: `Typ` and `Message`. `Typ` is a string that represents the type of the validation error, and `Message` is a string that contains the error message.

### Type: `ValidationMessages`

The `ValidationMessages` type represents a collection of `ValidationInfo` objects. It has a field called `Messages`, which is a slice of `ValidationInfo` objects. It also has three methods: `Crit`, `Warn`, and `Info`, which add a `ValidationInfo` object to the `Messages` slice with the corresponding type.

### Function: `GetWarnings`

The `GetWarnings` function returns an error with all messages of type `WARN` or above, or `nil` if no warnings were present. It takes a pointer to a `ValidationMessages` object as input.

### Type: `SendTxArgs`

The `SendTxArgs` type represents the arguments to submit a transaction. It is identical to `ethapi.TransactionArgs`, except for the usage of `common.MixedcaseAddress` in `From` and `To`. It has several fields, including `From`, `To`, `Gas`, `GasPrice`, `MaxFeePerGas`, `MaxPriorityFeePerGas`, `Value`, `Nonce`, `Data`, `Input`, `AccessList`, and `ChainID`.

### Function: `String` ## Documentation for the Source Code

### Function: `NewTxFromArgs`

The `NewTxFromArgs` function takes in a `core.GnosisSafeTx` struct and returns a `types.Tx` struct. It first checks if the `args.To` field is not nil, and if it is not, it converts it to a `common.Address` struct and assigns it to the `to` variable. It then checks if the `args.Input` field is not nil, and if it is not, it assigns it to the `input` variable. If the `args.Input` field is nil, it checks if the `args.Data` field is not nil, and if it is not, it assigns it to the `input` variable. 

It then creates a `types.TxData` struct based on the presence of the `args.MaxFeePerGas` and `args.AccessList` fields. If `args.MaxFeePerGas` is not nil, it creates a `types.DynamicFeeTx` struct with the appropriate fields. If `args.AccessList` is not nil, ## Documentation for the Source Code

### Function: `TypedDataAndHash`

The `TypedDataAndHash` function takes in a JSON string as input, unmarshals it into a `core.GnosisSafeTx` struct, and then generates a keccak256 hash of the encoding of the provided data. It returns the hash as a hexutil.Bytes type, the raw data as a string, and an error if any.

Example usage:

```go
func main() {
    jsonData := `{"data":{"to":"0x0000000000000000000000000000000000000000","value":"0","data":"0x","operation":0,"gasLimit":"0","gasPrice":"0","nonce":0,"safeTxGas":0,"baseGas":0,"gasTokenData":"0x","refundReceiver":"0x0000000000000000000000000000000000000000","contractTransactionHash":"0x0000000000000000000000000000000000000000000000000000000000000000","transactionHash":"0x0000000000000000000000000000000000000000000000000000000000000000","message":"0x","messageId":0,"signature":"0x000000000000 ## Documentation for the Source Code

### Function: `TypedDataAndHash`

The `TypedDataAndHash` function takes in a `core.GnosisSafeTx` struct and returns the hash of the typed data. It first creates a `TypedData` struct using the `CreateTypedData` function and then encodes the typed data using the `EncodeData` function. Finally, it returns the hash of the encoded data using the `crypto.Keccak256` function.

Example usage:

```go
func GetTypedDataHash(tx *core.GnosisSafeTx) ([]byte, error) {
    typedData := CreateTypedData(tx)
    encodedData, err := typedData.EncodeData("GnosisSafe", tx, 0)
    if err != nil {
        return nil, err
    }
    return crypto.Keccak256(encodedData), nil ## Documentation for the Source Code

### Function: `TypedDataAndHash`

The `TypedDataAndHash` function takes in a `TypedData` struct and returns the hash of the struct. The hash is calculated according to the EIP-712 standard. The function first validates the `TypedData` struct by calling the `validate` function. If the validation is successful, the function generates a map version of the `TypedData` struct by calling the `Map` function. The function then formats the `TypedData` struct by calling the `Format` function. Finally, the function calculates the hash of the formatted `TypedData` struct using the `crypto.Keccak256` function.

Example usage:

```go
typedData := &TypedData{
    Types:       types,
    Domain:      domain,
    PrimaryType: "Mail",
    Message:     message,
}
hash, err := TypedDataAndHash(typedData)
if err != nil {
    log.Fatal(err)
}
fmt.Printf(" ## Documentation for the Source Code

### Function: `formatData`

The `formatData` function takes in a `string` `typeName` and a `map[string]interface{}` `data` as input and returns a slice of `Item` and an error. It formats the data according to the type specified in `typeName` and returns the formatted data as a slice of `Item`. If the type is not found in the `Types` object, it returns an error.

Example usage:

```go
func formatData(typeName string, data map[string]interface{}) ([]Item, error) {
	output := make([]Item, 0)
	if parsedType, ok := typedData.Types[typeName]; ok {
		for _, field := range parsedType { ## Documentation for the Source Code

### Function: `isPrimitiveType`

The `isPrimitiveType` function checks whether a given string is a primitive type or not. It takes in a string as input and checks whether it matches any of the primitive types defined in the function. If it matches, it returns `true`, otherwise it returns `false`.

Example usage:

```go
if isPrimitiveType("uint256") {
    // do something
}
```

### Function: `TypedDataAndHash`

The `TypedDataAndHash` function takes in a `core.GnosisSafeTx` struct as input and returns the typed data and hash for the struct. It first generates the typed data for the struct using the `TypedData` function, and then generates the hash for the typed data using the `keccak256` function.

Example usage:

```go
tx := core.GnosisSafeTx{
    To: "0x0000000000000000000000000000000000000000",
    Value: "0",
    Data: "0x",
    Operation: 0,
    GasLimit: "0",
    GasPrice: "0",
    Nonce: 0,
    SafeTxGas: 0,
    BaseGas: 0,
    GasTokenData: "0x",
    RefundReceiver: "0x0000000000000000000000000000000000000000",
    ContractTransactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    TransactionHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    Message: "0x",
    MessageId: 0,
    Signature: "0x0000000000000000000000000000000000000000000000000000000000000000",
    SignedMessages: []core.SignedMessage{},
    Sender: "0x0000000000000000000000000000000000000000",
    Executor: "0x0000000000000000000000000000000000000000",
    IsExecuted: false,
    IsSuccessful: false,
    EthGasStationPrice: 0,
    EthGasStationPriceWait: 0,
    EthGasStationPriceSafeLow: 0,
    EthGasStationPriceAverage: 0,
    EthGasStationPriceFast: 0,
    EthGasStationPriceFastest: 0,
    RefundParams: nil,
    RefundParamsHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RefundReceiverAddress: nil,
    RefundReceiverAddressHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RefundReceiverAddressEncoded: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RefundReceiverAddressDecoded: nil,
    RefundReceiverAddressDecodedHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RefundReceiverAddressDecodedEncoded: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RefundReceiverAddressDecoded