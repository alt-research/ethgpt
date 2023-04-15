# TransactionArgs

The `TransactionArgs` type represents the arguments to construct a new transaction or a message call.

## Fields

### From

```go
From *common.Address `json:"from"`
```

`From` is the address of the account that will send the transaction.

### To

```go
To *common.Address `json:"to"`
```

`To` is the address of the account that will receive the transaction.

### Gas

```go
Gas *hexutil.Uint64 `json:"gas"`
```

`Gas` is the maximum amount of gas that can be used by the transaction.

### GasPrice

```go
GasPrice *hexutil.Big `json:"gasPrice"`
```

`GasPrice` is the price of gas in wei.

### MaxFeePerGas

```go
MaxFeePerGas *hexutil.Big `json:"maxFeePerGas"`
```

`MaxFeePerGas` is the maximum fee per gas that can be paid by the transaction.

### MaxPriorityFeePerGas

```go
MaxPriorityFeePerGas *hexutil.Big `json:"maxPriorityFeePerGas"`
```

`MaxPriorityFeePerGas` is the maximum priority fee per gas that can be paid by the transaction.

### Value

```go
Value *hexutil.Big `json:"value"`
```

`Value` is the amount of ether to send with the transaction.

### Nonce

```go
Nonce *hexutil.Uint64 `json:"nonce"`
```

`Nonce` is the nonce of the transaction.

### Data

```go
Data *hexutil.Bytes `json:"data"`
```

`Data` is the calldata for the transaction.

### Input

```go
Input *hexutil.Bytes `json:"input"`
```

`Input` is the calldata for the transaction. This field is preferred over `Data`.

### AccessList

```go
AccessList *types.AccessList `json:"accessList,omitempty"`
```

`AccessList` is the access list for the transaction.

### ChainID

```go
ChainID *hexutil.Big `json:"chainId,omitempty"`
```

`ChainID` is the chain ID of the transaction.

## Functions

### from

```go
func (args *TransactionArgs) from() common.Address
```

`from` retrieves the transaction sender address.

### # TransactionArgs

The `TransactionArgs` type is a struct that represents the arguments for a transaction. It contains fields for the sender, recipient, value, gas limit, gas price, and EIP-1559 fee parameters.

## Functions

### setDefaults

```go
func (args *TransactionArgs) setDefaults(ctx context.Context, b Backend) error
```

`setDefaults` fills in default values for unspecified transaction fields. It sets the gas limit, gas price, and EIP-1559 fee parameters if they are not specified. If the chain is not yet synced past London, it sets the gas price. If the chain is synced past London, it sets the EIP-1559 fee parameters.

### setFeeDefaults

```go
func (args *TransactionArgs) setFeeDefaults(ctx context.Context, b Backend) error
```

`setFeeDefaults` fills in default fee values for unspecified transaction fields. It sets the EIP-1559 fee parameters if they are not specified. If the gas price and at least one of the EIP-1559 fee parameters are specified, it returns an error. If the transaction has completely specified a fee mechanism, no default is needed. If the chain is synced past London, it sets the EIP-1559 fee parameters. If the chain is not yet synced past London, it sets the gas price.

### setLondonFeeDefaults

```go
func (args *TransactionArgs) setLondonFeeDefaults(ctx context.Context, head *types.Header, b Backend) error
```

`setLondonFeeDefaults` fills in reasonable default fee values for unspecified fields for transactions on chains synced past London. It sets the `MaxPriorityFeePerGas` and `MaxFeePerGas` fields if they are missing # TransactionArgs

The `TransactionArgs` type is a helper for constructing transactions. It provides methods for setting the various fields of a transaction, and for converting the arguments to the `Message` and `Transaction` types used by the core EVM.

## Functions

### SetDefaults

```go
func (args *TransactionArgs) SetDefaults(chainID *big.Int, from common.Address, nonce uint64)
```

`SetDefaults` sets default values for the transaction arguments. It takes the chain ID, the sender address, and the nonce.

### from

```go
func (args *TransactionArgs) from() common.Address
```

`from` returns the sender address or uses the zero address if none is specified.

### data

```go
func (args *TransactionArgs) data() []byte
```

`data` returns the transaction data or an empty byte slice if none is specified.

### Validate

```go
func (args *TransactionArgs) Validate() error
```

`Validate` validates the transaction arguments. It returns an error if any of the arguments are invalid.

### ToMessage

```go
func (args *TransactionArgs) ToMessage(globalGasCap uint64, baseFee *big.Int) (*core.Message, error)
```

`ToMessage` converts the transaction arguments to the `Message` type used by the core EVM. This method is used in calls and traces that do # TransactionArgs

The `TransactionArgs` type is a helper for creating transactions. It provides methods for setting default values and converting the arguments to a transaction.

## Functions

### setDefaults

```go
func (args *TransactionArgs) setDefaults()
```

`setDefaults` sets default values for the transaction arguments.

### data

```go
func (args *TransactionArgs) data() []byte
```

`data` returns the transaction data.

### toTransaction

```go
func (args *TransactionArgs) toTransaction() *types.Transaction
```

`toTransaction` converts the arguments to a transaction. This assumes that `setDefaults` has been called.

### ToLegacyTx

```go
func (args *TransactionArgs) ToLegacyTx() *types.LegacyTx
```

`ToLegacyTx` converts the arguments to a legacy transaction. This assumes that `setDefaults` has been called.

### ToTransaction

```go
func (args *TransactionArgs) ToTransaction() *types.Transaction
```

`ToTransaction` converts the arguments to a transaction. This assumes that `setDefaults` has been called.