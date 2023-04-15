## Documentation for the Source Code

### Package: `t8ntool`

The `t8ntool` package provides tools for working with Ethereum transaction receipts.

### Function: `header.MarshalJSON`

The `header.MarshalJSON` function marshals a `header` struct into JSON format. It takes in a `header` struct and returns a byte slice and an error.

The `header.MarshalJSON` function creates a new `header` struct and assigns the values of the input `header` struct to it. It then marshals the new `header` struct into JSON format and returns the byte slice.

Example usage:

```go
h := header{
    ParentHash: common.HexToHash("0x123..."),
    Root: common.HexToHash("0x456..."),
    Number: math.HexOrDecimal256(big.NewInt(123)),
    GasLimit: math.HexOrDecimal64(1000000),
    Time: math.HexOrDecimal64(1630500000),
}
jsonBytes, err := h.MarshalJSON()
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("JSON:", string(jsonBytes))
}
```

### Function: `header.UnmarshalJSON`

The `header.UnmarshalJSON` function unmarshals a JSON byte slice into a `header` struct. It takes in a JSON byte slice and returns an error.

The `header.UnmarshalJSON` function creates a new `header` struct and unmarshals the input JSON byte slice into it. It then assigns the values of the new `header` struct to the input `header` struct.

Example usage:

```go
jsonBytes := []byte(`{"parentHash":"0x123...","stateRoot":"0x456...","number":"0x7b","gasLimit":"0xf4240","timestamp":"0x17b8d6c0"}`)
var h header
err := h.UnmarshalJSON(jsonBytes)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Header:", h)
}
``` ## Documentation for the Source Code

### Function: `UnmarshalHeaderJSON`

The `UnmarshalHeaderJSON` function takes in two parameters: `data` (a byte slice) and `h` (a pointer to a `types.Header` struct). It returns an error.

The `UnmarshalHeaderJSON` function unmarshals the JSON-encoded data into the `types.Header` struct pointed to by `h`. It sets the fields of the `types.Header` struct based on the values in the JSON data. If any required fields are missing, it returns an error.

Example usage:

```go
data := []byte(`{
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "uncleHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0x0000000000000000000000000000000000000000",
    "difficulty": "0x0",
    "number": "0x0",
    "gasLimit": "0x0",
    "gasUsed": "0x0",
    "timestamp": "0x0",
    "extraData": "0x",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000"
}`)

var header types.Header
err := UnmarshalHeaderJSON(data, &header)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Header:", header)
}
```

Note: This function is part of the `json` package and is used to unmarshal JSON-encoded Ethereum block headers.