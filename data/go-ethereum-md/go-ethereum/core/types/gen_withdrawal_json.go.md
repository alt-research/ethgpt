## Package `types`

The `types` package contains the data types used in the Ethereum blockchain. This package is used to define the data structures that are used to represent various objects in the Ethereum blockchain, such as blocks, transactions, and receipts.

### Function `MarshalJSON`

The `MarshalJSON` function is used to marshal a `Withdrawal` object into a JSON byte array. This function takes a `Withdrawal` object as input and returns a byte array and an error. The `Withdrawal` object is defined as follows:

```go
type Withdrawal struct {
    Index     uint64         // Index of the withdrawal
    Validator uint64         // Index of the validator
    Address   common.Address // Address of the withdrawal recipient
    Amount    uint64         // Amount of the withdrawal
}
```

The `MarshalJSON` function creates a new `Withdrawal` object with the same values as the input object, but with `hexutil.Uint64` types for the `Index`, `Validator`, and `Amount` fields. It then marshals this new object into a JSON byte array using the `json.Marshal` function.

### Function `UnmarshalJSON`

The `UnmarshalJSON` function is used to unmarshal a JSON byte array into a `Withdrawal` object. This function takes a byte array as input and returns an error. The `Withdrawal` object is defined as follows:

```go
type Withdrawal struct {
    Index     uint64         // Index of the withdrawal
    Validator uint64         // Index of the validator
    Address   common.Address // Address of the withdrawal recipient
    Amount    uint64         // Amount of the withdrawal
}
```

The `UnmarshalJSON` function creates a new `Withdrawal` object with `hexutil.Uint64` types for the `Index`, `Validator`, and `Amount` fields. It then unmarshals the input byte array into a new `Withdrawal` object using the `json.Unmarshal` function. Finally, it sets the values of the input `Withdrawal` object to the values of the new `Withdrawal` object.