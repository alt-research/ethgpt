## Package: common

The `common` package provides common functions and types used throughout the Ethereum ecosystem.

### Function: TestBytesConversion

The `TestBytesConversion` function is a test function that tests the `BytesToHash` function. It creates a byte slice with a single byte and converts it to a `Hash` struct using the `BytesToHash` function. It then compares the resulting `Hash` struct to an expected `Hash` struct with the same byte value.

### Function: TestIsHexAddress

The `TestIsHexAddress` function is a test function that tests the `IsHexAddress` function. It tests various input strings to ensure that the `IsHexAddress` function correctly identifies valid and invalid Ethereum addresses.

### Function: TestHashJsonValidation

The `TestHashJsonValidation` function is a test function that tests the validation of JSON-encoded `Hash` structs. It tests various input strings to ensure that the `json.Unmarshal` function correctly validates the length and prefix of the input string.

### Function: TestAddressUnmarshalJSON

The `TestAddressUnmarshalJSON` function is a test function that tests the unmarshaling of JSON-encoded `Address` structs. It tests various input strings to ensure that the `json.Unmarshal` function correctly unmarshals the input string into a `big.Int` representing the Ethereum address.

## Type: Hash

The `Hash` type represents a 32-byte Ethereum hash.

## Type: Address

The `Address` type represents a 20-byte Ethereum address.

### Method: Bytes

The `Bytes` method returns the byte representation of the `Address` struct.

### Method: UnmarshalJSON

The `UnmarshalJSON` method unmarshals a JSON-encoded `Address` struct. It first unmarshals the input string into a `string` variable and then converts the string to a `big.Int` representing the Ethereum address. If the input string is not a valid Ethereum address, an error is returned.

### Example

```go
address := common.HexToAddress("0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed")
bytes := address.Bytes()
fmt.Println(bytes) // [90 174 182 5 63 62 148 201 185 160 159 51 102 148 53 231 239 27 234 237]

jsonAddress := `"0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed"`
var unmarshaledAddress common.Address
err := json.Unmarshal([]byte(jsonAddress), &unmarshaledAddress)
if err != nil {
    log.Fatal(err)
}
fmt.Println(unmarshaledAddress) // 0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed
``` ## Function: m

The `m` function is a test function that tests the `HexToAddress` function by comparing its output to a set of expected outputs. It takes a testing object as a parameter and does not return anything. It iterates through a slice of test cases, each containing an input string and an expected output string. It calls the `HexToAddress` function with the input string and compares the output to the expected output. If the output does not match the expected output, it logs an error.

### Parameters

- `t *testing.T`: A testing object.

### Example

```go
func TestHexToAddress(t *testing.T) {
    var tests = []struct {
        Input  string
        Output string
    }{
        {"0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed", "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed"},
        {"0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359", "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"},
        {"0xdbf03b407c01e7cd3cbea99509d93f8dddc8c6fb", "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB"},
        {"0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb", "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb"},
        {"0xa", "0x000000000000000000000000000000000000000A"},
        {"0x0a", "0x000000000000000000000000000000000000000A"},
        {"0x00a", "0x000000000000000000000000000000000000000A"},
        {"0x000000000000000000000000000000000000000a", "0x000000000000000000000000000000000000000A"},
    }
    for i, test := range tests {
        output := HexToAddress(test.Input).Hex()
        if output != test.Output {
            t.Errorf("test #%d: failed to match when it should (%s != %s)", i, output, test.Output)
        }
    }
}
```

## Function: BenchmarkAddressHex

The `BenchmarkAddressHex` function is a benchmark function that benchmarks the `Hex` method of an `Address` object. It takes a benchmark object as a parameter and does not return anything. It creates an `Address` object from a hex string and calls its `Hex` method in a loop for the duration of the benchmark.

### Parameters

- `b *testing.B`: A benchmark object.

### Example

```go
func BenchmarkHexToAddress(b *testing.B) {
    testAddr := "0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed"
    for n := 0; n < b.N; n++ {
        HexToAddress(testAddr).Hex()
    }
}
```

## Function: TestMixedcaseAddressMarshal

The `TestMixedcaseAddressMarshal` function is a test function that tests the `MarshalJSON` method of a `MixedcaseAddress` object. It takes a testing object as a parameter and does not return anything. It creates a `MixedcaseAddress` object from a hex string and marshals it to JSON. It then unmarshals the JSON back into a string and compares it to the original input string. If the output does not match the input, it logs an error.

### Parameters

- `t *testing.T`: A testing object.

### Example

```go
func TestMixedcaseAddressMarshal(t *testing.T) {
    var (
        output string
        input  = "0xae967917c465db8578ca9024c205720b1a3651A9"
    )
    addr, err := NewMixedcaseAddressFromString(input)
    if err != nil {
        t.Fatal(err)
    }
    blob, err := json.Marshal(*addr)
    if err != nil {
        t.Fatal(err)
    }
    json.Unmarshal(blob, &output)
    if output != input {
        t.Fatal("Failed to marshal/unmarshal MixedcaseAddress object")
    }
}
```

## Function: TestMixedcaseAccount_Address

The `TestMixedcaseAccount ## Function: TestHash_Scan

The `TestHash_Scan` function is a test function that tests the `Scan` method of the `Hash` struct. It takes a slice of test cases, each containing a name, arguments, and an expected error value. For each test case, it creates a new `Hash` struct and calls the `Scan` method with the provided arguments. If the error value returned by the `Scan` method does not match the expected error value, the test fails. If the expected error value is false, it checks if the `Hash` struct was scanned correctly by comparing each byte of the `Hash` struct to the corresponding byte in the input slice.

### Parameters

- `t *testing.T`: A pointer to the testing struct.
- `args struct{src []byte}`: A struct containing a slice of bytes to scan.
- `wantErr bool`: A boolean indicating if an error is expected.

### Example

```go
func TestHash_Scan(t *testing.T) {
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "working scan",
			args: args{src: []byte{
				0xb2, 0x6f, 0x2b, 0x34, 0x2a, 0xab, 0x24, 0xbc, 0xf6, 0x3e,
				0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15,
				0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15,
				0x10, 0x00,
			}},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h := &Hash{}
			if err := h.Scan(tt.args.src); (err != nil) != tt.wantErr {
				t.Errorf("Hash.Scan() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !tt.wantErr {
				for i := range h {
					if h[i] != tt.args.src.([]byte)[i] {
						t.Errorf(
							"Hash.Scan() didn't scan the %d src correctly (have %X, want %X)",
							i, h[i], tt.args.src.([]byte)[i],
						)
					}
				}
			}
		})
	}
}
```

## Function: TestHash_Value

The `TestHash_Value` function is a test function that tests the `Value` method of the ` ## Function: TestAddress_Value

The `TestAddress_Value` function is a test function that tests the `Value` method of the `Address` type. It creates a new `Address` instance and sets its bytes to a test value. It then creates a new `sql.Scanner` instance and calls the `Value` method with a `nil` argument. It checks if the returned value is of the correct type and if it matches the expected value. It also tests the `Value` method with a non-`nil` argument and checks if it returns an error.

### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

### Example

```go
func TestAddress_Value(t *testing.T) {
    b := []byte{
        0xb2, 0x6f, 0x2b, 0x34, 0x2a, 0xab, 0x24, 0xbc, 0xf6, 0x3e,
        0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15,
    }
    var addr Address
    addr.SetBytes(b)

    scanner := &Address{}
    value, err := scanner.Value()
    if err != nil {
        t.Errorf("Address.Value() returned an error: %v", err)
    }
    if reflect.TypeOf(value) != reflect.TypeOf([]byte{}) {
        t.Errorf("Address.Value() returned a value of the wrong type: %T", value)
    }
    if !reflect.DeepEqual(value, b) {
        t.Errorf("Address.Value() returned an incorrect value: %v", value)
    }

    value, err = scanner.Value("invalid argument")
    if err == nil {
        t.Errorf("Address.Value() did not return an error with a non-nil argument")
    }
}
```

## Function: TestAddress_Format

The `TestAddress_Format` function is a test function that tests the `Format` method of the `Address` type. It creates a new `Address` instance and sets its bytes to a test value. It then tests the `Format` method with various format strings and checks if the output matches the expected value.

### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

### Example

```go
func TestAddress_Format(t *testing.T) {
    b := []byte{
        0xb2, 0x6f, 0x2b, 0x34, 0x2a, 0xab, 0x24, 0xbc, 0xf6, 0x3e,
        0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15,
    }
    var addr Address ## Function: TestFormatBytes

The `TestFormatBytes` function tests the `FormatBytes` function by creating a slice of `formatTest` structs and running a series of tests on each struct. Each test checks if the output of the `FormatBytes` function matches the expected output for a specific format character.

### Parameters

- None.

### Returns

- None.

### Example

```go
func TestFormatBytes(t *testing.T) {
    hash := []byte{0xb1, 0x6f, 0x2b, 0x34, 0x2a, 0xab, 0x24, 0xbc, 0xf6, 0x3e, 0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15, 0xa2, 0x18, 0xc6, 0xa9, 0x27, 0x4d, 0x30, 0xab, 0x9a, 0x15, 0x10, 0x00}

    tests := []formatTest{
        // The original default formatter for byte slice
        {
            name: "printf-d",
            out:  fmt.Sprintf("%d", hash),
            want: "[178 111 43 52 42 171 36 188 246 62 162 24 198 169 39 77 48 171 154 21 162 24 198 169 39 77 48 171 154 21 16 0]",
        },
        // Invalid format char.
        {
            name: "printf-t",
            out:  fmt.Sprintf("%t", hash),
            want: "%!t(hash=b26f2b342aab24bcf63ea218c6a9274d30ab9a15a218c6a9274d30ab9a151000)",
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if tt.out != tt.want {
                t.Errorf("%s does not render as expected:\n got %s\nwant %s", tt.name, tt.out, tt.want)
            }
        })
    }
}
```