## Documentation for the Source Code

The following is a documentation of the source code in the `core_test` package.

### Variables

#### `typesStandard`

`typesStandard` is a variable of type `apitypes.Types` that contains a set of standard types used in the tests.

Example usage:

```go
var typesStandard = apitypes.Types{
    "EIP712Domain": {
        {
            Name: "name",
            Type: "string",
        },
        {
            Name: "version",
            Type: "string",
        },
        {
            Name: "chainId",
            Type: "uint256",
        },
        {
            Name: "verifyingContract",
            Type: "address",
        },
    },
    "Person": {
        {
            Name: "name",
            Type: "string",
        },
        {
            Name: "wallet",
            Type: "address",
        },
    },
    "Mail": {
        {
            Name: "from",
            Type: "Person",
        },
        {
            Name: "to",
            Type: "Person",
        },
        {
            Name: "contents",
            Type: "string",
        },
    },
}
```

#### `jsonTypedData`

`jsonTypedData` is a variable of type `string` that contains a JSON string representing typed data.

Example usage:

```go
var jsonTypedData = `
    {
      "types": {
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ],
        "Person": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "test",
            "type": "uint8"
          },
          {
            "name": "wallet",
            "type": "address"
          }
        ],
        "Mail": [
          {
            "name": "from",
            "type": "Person"
          },
          {
            "name": "to",
            "type": "Person"
          },
          {
            "name": "contents",
            "type": "string"
          }
        ]
      },
      "primaryType": "Mail",
      "domain": {
        "name": "Ether Mail",
        "version": "1",
        "chainId": "1",
        "verifyingContract": "0xCCCcccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
      },
      "message": {
        "from": {
          "name": "Cow",
          "test": 3,
          "wallet": "0xcD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
        },
        "to": {
          "name": "Bob",
          "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
        },
        "contents": "Hello, Bob!"
      }
    }
`
```

#### `primaryType`

`primaryType` is a constant of type `string` that represents the primary type of the typed data.

Example usage:

```go
const primaryType = "Mail"
```

#### `domainStandard`

`domainStandard` is a variable of type `apitypes.TypedDataDomain` that represents the standard domain used in the tests.

Example usage:

```go
var domainStandard = apitypes.TypedDataDomain{
    Name:              "Ether Mail",
    Version:           "1",
    ChainId:           math.NewHexOrDecimal256(1),
    VerifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    Salt:              "",
}
```

#### `messageStandard`

`messageStandard` is a variable of type `map[string]interface{}` that represents the standard message used in the tests.

Example usage:

```go
var messageStandard = map[string]interface{}{
    "from": map[string]interface{}{
        "name":   "Cow",
        "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    "to": map[string]interface{}{
        "name":   "Bob",
        "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    "contents": "Hello, Bob!",
}
```

### Functions

#### `TestSignTypedData`

`TestSignTypedData` is a test function that tests the `core.SignTypedData` function.

Example usage:

```go
func TestSignTypedData(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparator`

`TestSignTypedDataWithDomainSeparator` is a test function that tests the `core.SignTypedDataWithDomainSeparator` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparator(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersion`

`TestSignTypedDataWithDomainSeparatorAndVersion` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersion` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersion(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainId`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainId` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainId` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainId(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSalt`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSalt` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSalt` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSalt(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSigner`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSigner` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSigner` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSigner(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKey`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKey` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKey` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKey(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomType`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomType` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomType` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomType(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndData`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndData` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndData` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndData(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchema`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchema` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchema` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchema(t *testing.T) {
    // ...
}
```

#### `TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchemaAndHash`

`TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchemaAndHash` is a test function that tests the `core.SignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchemaAndHash` function.

Example usage:

```go
func TestSignTypedDataWithDomainSeparatorAndVersionAndChainIdAndSaltAndSignerAndPrivateKeyAndCustomTypeAndDataAndSchemaAndHash(t *testing.T) {
    // ...
}
``` ## Documentation for the Source Code

### Function: `TestSignData`

The `TestSignData` function is a test function that tests the `SignData` and `SignTypedData` functions of the API. It creates two accounts, approves them, and then tests the signing of data with different scenarios. It checks if the signature is nil or not, and if the error is as expected or not.

Example usage:

```go
func TestSignData(t *testing.T) {
	api, control := setup(t)
	//Create two accounts
	createAccount(control, api, t)
	createAccount(control, api, t)
	control.approveCh <- "1"
	list, err := api.List(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	a := common.NewMixedcaseAddress(list[0])

	control.approveCh <- "Y"
	control.inputCh <- "wrongpassword"
	signature, err := api.SignData(context.Background(), apitypes.TextPlain.Mime, a, hexutil.Encode([]byte("EHLO world")))
	if signature != nil {
		t.Errorf("Expected nil-data, got %x", signature)
	}
	if err != keystore.ErrDecrypt {
		t.Errorf("Expected ErrLocked! '%v'", err)
	}
	control.approveCh <- "No way"
	signature, err = api.SignData(context.Background(), apitypes.TextPlain.Mime, a, hexutil.Encode([]byte("EHLO world")))
	if signature != nil {
		t.Errorf("Expected nil-data, got %x", signature)
	}
	if err != core.ErrRequestDenied {
		t.Errorf("Expected ErrRequestDenied! '%v'", err)
	}
	// text/plain
	control.approveCh <- "Y"
	control.inputCh <- "a_long_password"
	signature, err = api.SignData(context.Background(), apitypes.TextPlain.Mime, a, hexutil.Encode([]byte("EHLO world")))
	if err != nil {
		t.Fatal(err)
	}
	if signature == nil || len(signature) != 65 {
		t.Errorf("Expected 65 byte signature (got %d bytes)", len(signature))
	}
	// data/typed via SignTypeData
	control.approveCh <- "Y"
	control.inputCh <- "a_long_password"
	var want []byte
	if signature, err = api.SignTypedData(context.Background(), a, typedData); err != nil {
		t.Fatal(err)
	} else if signature == nil || len(signature) != 65 {
		t.Errorf("Expected 65 byte signature (got %d bytes)", len(signature))
	} else {
		want = signature
	}

	// data/typed via SignData / mimetype typed data
	control.approveCh <- "Y"
	control.inputCh <- "a_long_password"
	if typedDataJson, err := json.Marshal(typedData); err != nil {
		t.Fatal(err)
	} else if signature, err = api.SignData(context.Background(), apitypes.DataTyped.Mime, a, hexutil.Encode(typedDataJson)); err != nil {
		t.Fatal(err)
	} else if signature == nil || len(signature) != 65 {
		t.Errorf("Expected 65 byte signature (got %d bytes)", len(signature))
	} else if have := signature; !bytes.Equal(have, want) {
		t.Fatalf("want %x, have %x", want, have)
	}
}
```

Note: This function is used to test the `SignData` and `SignTypedData` functions of the API.

### Function: `TestDomainChainId`

The `TestDomainChainId` function is a test function that tests the `HashStruct` function of the `TypedData` struct. It checks if the `chainId` key is present in the domain map or not, and if the encoding of the `TypedData` struct is successful or not.

Example usage:

```go
func TestDomainChainId(t *testing.T) {
	withoutChainID := apitypes.TypedData{
		Types: apitypes.Types{
			"EIP712Domain": []apitypes.Type{
				{Name: "name", Type: "string"},
			},
		},
		Domain: apitypes.TypedDataDomain{
			Name: "test",
		},
	}

	if _, ok := withoutChainID.Domain.Map()["chainId"]; ok {
		t.Errorf("Expected the chainId key to not be present in the domain map")
	}
	// should encode successfully
	if _, err := withoutChainID.HashStruct("EIP712Domain", withoutChainID.Domain.Map()); err != nil {
		t.Errorf("Expected the typedData to encode the domain successfully, got %v", err)
	}
	withChainID := apitypes.TypedData{
		Types: apitypes.Types{
			"EIP712Domain": []apitypes.Type{
				{Name: "name", Type: "string"},
				{Name: "chainId", Type: "uint256"},
			},
		},
		Domain: apitypes.TypedDataDomain{
			Name:    "test",
			ChainId: math.NewHexOrDecimal256(1),
		},
	}

	if _, ok := withChainID.Domain.Map()["chainId"]; !ok {
		t.Errorf("Expected the chainId key be present in the domain map")
	}
	// should encode successfully
	if _, err := withChainID.HashStruct("EIP712Domain", withChainID.Domain.Map()); err != nil {
		t.Errorf("Expected the typedData to encode the domain successfully, got %v", err)
	}
}
```

Note: This function is used to test the `HashStruct` function of the `TypedData` struct. ## Documentation for the Source Code

### Function: `TestEncodeDomain`

The `TestEncodeDomain` function tests the encoding of the domain data. It creates a new `TypedData` object and sets the domain data. It then calls the `EncodeDomain` function to encode the domain data and checks if there is an error. If there is an error, it fails the test.

Example usage:

```go
func TestEncodeDomain(t *testing.T) {
    typedData := apitypes.TypedData{
        Domain: apitypes.TypedDataDomain{
            Name:              "Mail",
            Version:           "1",
            ChainId:           big.NewInt(1),
            VerifyingContract: common.HexToAddress("0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"),
        },
    }
    _, err := typedData.EncodeDomain()
    if err != nil {
        t.Errorf("Expected the typedData to encode the domain successfully, got %v", err)
    }
}
```

Note: This function is used to test the encoding of the domain data.

### Function: `TestHashStruct`

The `TestHashStruct` function tests the hashing of the `TypedData` object. It creates a new `TypedData` object and sets the primary type and message data. It then calls the `HashStruct` function to hash the `TypedData` object and checks if the hash matches the expected hash. If the hash does not match the expected hash, it fails the test.

Example usage:

```go
func TestHashStruct(t *testing.T) {
    hash, err := typedData.HashStruct(typedData.PrimaryType, typedData.Message)
    if err != nil {
        t.Fatal(err)
    }
    mainHash := fmt.Sprintf("0x%s", common.Bytes2Hex(hash))
    if mainHash != "0xc52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e" {
        t.Errorf("Expected different hashStruct result (got %s)", mainHash)
    }

    hash, err = typedData.HashStruct("EIP712Domain", typedData.Domain.Map())
    if err != nil {
        t.Error(err)
    }
    domainHash := fmt.Sprintf("0x%s", common.Bytes2Hex(hash))
    if domainHash != "0xf2cee375fa42b42143804025fc449deafd50cc031ca257e0b194a650a912090f" {
        t.Errorf("Expected different domain hashStruct result (got %s)", domainHash)
    }
}
```

Note: This function is used to test the hashing of the `TypedData` object.

### Function: `TestEncodeType`

The `TestEncodeType` function tests the encoding of the type data. It creates a new `TypedData` object and sets the primary type and message data. It then calls the `EncodeType` function to encode the type data and checks if the encoding matches the expected encoding. If the encoding does not match the expected encoding, it fails the test.

Example usage:

```go
func TestEncodeType(t *testing.T) {
    domainTypeEncoding := string(typedData.EncodeType("EIP712Domain"))
    if domainTypeEncoding != "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)" {
        t.Errorf("Expected different encodeType result (got %s)", domainTypeEncoding)
    }

    mailTypeEncoding := string(typedData.EncodeType(typedData.PrimaryType))
    if mailTypeEncoding != "Mail(Person from,Person to,string contents)Person(string name,address wallet)" {
        t.Errorf("Expected different encodeType result (got %s)", mailTypeEncoding)
    }
}
```

Note: This function is used to test the encoding of the type data.

### Function: `TestTypeHash`

The `TestTypeHash` function tests the hashing of the type data. It creates a new `TypedData` object and sets the primary type and message data. It then calls the `TypeHash` function to hash the type data and checks if the hash matches the expected hash. If the hash does not match the expected hash, it fails the test.

Example usage:

```go
func TestTypeHash(t *testing.T) {
    mailTypeHash := fmt.Sprintf("0x%s", common.Bytes2Hex(typedData.TypeHash(typedData.PrimaryType)))
    if mailTypeHash != "0xa0cedeb2dc280ba39b857546d74f5549c3a1d7bdc2dd96bf881f76108e23dac2" {
        t.Errorf("Expected different typeHash result (got %s)", mailTypeHash)
    }
}
```

Note: This function is used to test the hashing of the type data.

### Function: `TestEncodeData`

The `TestEncodeData` function tests the encoding of the message data. It creates a new `TypedData` object and sets the primary type and message data. It then calls the `EncodeData` function to encode the message data and checks if the encoding matches the expected encoding. If the encoding does not match the expected encoding, it fails the test.

Example usage:

```go
func TestEncodeData(t *testing.T) {
    hash, err := typedData.EncodeData(typedData.PrimaryType, typedData.Message, 0)
    if err != nil {
        t.Fatal(err)
    }
    dataEncoding := fmt.Sprintf("0x%s", common.Bytes2Hex(hash))
    if dataEncoding != "0xa0cedeb2dc280ba39b857546d74f5549c3a1d7bdc2dd96bf881f76108e23dac2fc71e5fa27ff56c350aa531bc129ebdf613b772b6604664f5d8dbe21b85eb0c8cd54f074a4af31b4411ff6a60c9719dbd559c221c8ac3492d9d872b041d703d1b5aadf3154a261abdd9086fc627b61efca26ae5702701d05cd2305f7c52a2fc8" {
        t.Errorf("Expected different encodeData result (got %s)", dataEncoding)
    }
}
```

Note: This function is used to test the encoding of the message data.

### Function: `TestFormatter`

The `TestFormatter` function tests the formatting of the `TypedData` object. It creates a new `TypedData` object and unmarshals the JSON data into it. It then calls the `Format` function to format the `TypedData` object and prints the formatted output.

Example usage:

```go
func TestFormatter(t *testing.T) {
    var d apitypes.TypedData
    err := json.Unmarshal([]byte(jsonTypedData), &d)
    if err != nil {
        t.Fatalf("unmarshalling failed '%v'", err)
    }
    formatted, _ := d.Format()
    for _, item := range formatted {
        t.Logf("'%v'\n", item.Pprint(0))
    }

    j, _ := json.Marshal(formatted)
    t.Logf("'%v'\n", string(j))
}
```

Note: This function is used to test the formatting of the `TypedData` object.

### Function: `sign`

The `sign` function signs the `TypedData` object. It takes in one parameter: `typedData` (a `TypedData` object). It first hashes the domain data and the message data using the `HashStruct` function. It then creates a raw data byte slice and hashes it using the `Keccak256` function from the `crypto` package. It returns the hashed message data and the hashed raw data byte slice.

Example usage:

```go
func sign(typedData apitypes.TypedData) ([]byte, []byte, error) {
    domainSeparator, err := typedData.HashStruct("EIP712Domain", typedData.Domain.Map())
    if err != nil {
        return nil, nil, err
    }
    typedDataHash, err := typedData.HashStruct(typedData.PrimaryType, typedData.Message)
    if err != nil {
        return nil, nil, err
    }
    rawData := []byte(fmt.Sprintf("\x19\x01%s%s", string(domainSeparator), string(typedDataHash)))
    sighash := crypto.Keccak256(rawData)
    return typedDataHash, sighash, nil
}
```

Note: This function is used to sign the `TypedData` object.

### Function: `TestJsonFiles`

The `TestJsonFiles` function tests the JSON files in the `testdata` directory. It reads the files in the `testdata` directory and unmarshals the JSON data into a `TypedData` object. It then checks if the file name starts with "expfail". If it does, it expects the unmarshalling to fail. If it does not, it expects the unmarshalling to succeed.

Example usage:

```go
func TestJsonFiles(t *testing.T) {
    testfiles, err := os.ReadDir("testdata/")
    if err != nil {
        t.Fatalf("failed reading files: %v", err)
    }
    for i, fInfo := range testfiles {
        if !strings.HasSuffix(fInfo.Name(), "json") {
            continue
        }
        expectedFailure := strings.HasPrefix(fInfo.Name(), "expfail")
        data, err := os.ReadFile(path.Join("testdata", fInfo.Name()))
        if err != nil {
            t.Errorf("Failed to read file %v: %v", fInfo.Name(), err)
            continue
        }
        var typedData apitypes.TypedData
        err = json.Unmarshal(data, &typedData)
        if err != nil {
            t.Errorf("Test %d, file %v, json unmarshalling failed: %v", i, fInfo.Name(), err)
            if !expectedFailure {
                continue
            }
        } else {
            if expectedFailure {
                t.Errorf("Test %d, file %v, expected failure but succeeded", i, fInfo.Name())
                continue
            }
        }
    }
}
```

Note: This function is used to test the JSON files in the `testdata` directory. ## Documentation for the Source Code

### Function: `TestSign`

The `TestSign` function tests the `sign` function by passing in a set of typed data and expected signature values. It loops through the set of typed data and compares the expected signature values with the actual signature values returned by the `sign` function. If the expected and actual signature values do not match, the test fails.

Example usage:

```go
func TestSign(t *testing.T) {
    for i, td := range testdata {
        sig, err := sign(td.typedData)
        if err != nil {
            t.Errorf("Test %d failed: %v", i, err)
        }
        if !bytes.Equal(sig, td.expectedSig) {
            t.Errorf("Test %d failed: expected signature %x, got %x", i, td.expectedSig, sig)
        }
    }
}
```

Note: This function is used to test the `sign` function.

### Function: `TestFuzzerFiles`

The `TestFuzzerFiles` function tests some files that have been found by fuzzing to cause crashes or hangs. It reads in a set of test files from a directory and loops through them. For each file, it unmarshals the JSON data into a `TypedData` struct and encodes the data using the `EncodeData` function. If verbose mode is enabled, it logs any errors encountered during encoding. 

Example usage:

```go
func TestFuzzerFiles(t *testing.T) {
    corpusdir := path.Join("testdata", "fuzzing")
    testfiles, err := os.ReadDir(corpusdir)
    if err != nil {
        t.Fatalf("failed reading files: %v", err)
    }
    verbose := false
    for i, fInfo := range testfiles {
        data, err := os.ReadFile(path.Join(corpusdir, fInfo.Name()))
        if err != nil {
            t.Errorf("Failed to read file %v: %v", fInfo.Name(), err)
            continue
        }
        var typedData apitypes.TypedData
        err = json.Unmarshal(data, &typedData)
        if err != nil {
            t.Errorf("Test %d, file %v, json unmarshalling failed: %v", i, fInfo.Name(), err)
            continue
        }
        _, err = typedData.EncodeData("EIP712Domain", typedData.Domain.Map(), 1)
        if verbose && err != nil {
            t.Logf("%d, EncodeData[1] err: %v\n", i, err)
        }
        _, err = typedData.EncodeData(typedData.PrimaryType, typedData.Message, 1)
        if verbose && err != nil {
            t.Logf("%d, EncodeData[2] err: %v\n", i, err)
        }
        typedData.Format()
    }
}
```

Note: This function is used to test files that have been found by fuzzing to cause crashes or hangs.

### Variables: `gnosisTypedData` and `gnosisTx`

The `gnosisTypedData` and `gnosisTx` variables contain JSON data representing a set of typed data and a transaction, respectively. These variables are used in the `TestSign` function to test the `sign` function.

Example usage:

```go
var gnosisTypedData = `
{
    "types": {
        "EIP712Domain": [
            { "type": "address", "name": "verifyingContract" }
        ],
        "SafeTx": [
            { "type": "address", "name": "to" },
            { "type": "uint256", "name": "value" },
            { "type": "bytes", "name": "data" },
            { "type": "uint8", "name": "operation" },
            { "type": "uint256", "name": "safeTxGas" },
            { "type": "uint256", "name": "baseGas" },
            { "type": "uint256", "name": "gasPrice" },
            { "type": "address", "name": "gasToken" },
            { "type": "address", "name": "refundReceiver" },
            { "type": "uint256", "name": "nonce" }
        ]
    },
    "domain": {
        "verifyingContract": "0x25a6c4BBd32B2424A9c99aEB0584Ad12045382B3"
    },
    "primaryType": "SafeTx",
    "message": {
        "to": "0x9eE457023bB3De16D51A003a247BaEaD7fce313D",
        "value": "20000000000000000",
        "data": "0x",
        "operation": 0,
        "safeTxGas": 27845,
        "baseGas": 0,
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": 3
    }
}`

var gnosisTx = `
{
    "safe": "0x25a6c4BBd32B2424A9c99aEB0584Ad12045382B3",
    "to": "0x9eE457023bB3De16D51A003a247BaEaD7fce313D",
    "value": "20000000000000000",
    "data": null,
    "operation": 0,
    "gasToken": "0x0000000000000000000000000000000000000000",
    "safeTxGas": 27845,
    "baseGas": 0,
    "gasPrice": "0",
    "refundReceiver": "0x0000000000000000000000000000000000000000",
    "nonce": 3,
    "executionDate": null,
    "submissionDate": "2020-09-15T21:59:23.815748Z",
    "modified": "2020-09-15T21:59:23.815748Z",
    "blockNumber": null,
    "transactionHash": null,
    "safeTxHash": "0x28bae2bd58d894a1d9b69e5e9fde3570c4b98a6fc5499aefb54fb830137e831f",
    "executor": null,
    "isExecuted": false,
    "isSuccessful": null,
    "ethGasPrice": null,
    "gasUsed": null,
    "fee": null,
    "origin": null,
    "dataDecoded": null,
    "confirmationsRequired": null,
    "confirmations": [
        {
            "owner": "0xAd2e180019FCa9e55CADe76E4487F126Fd08DA34",
            "submissionDate": "2020-09-15T21:59:28.281243Z",
            "transactionHash": null,
            "confirmationType": "CONFIRMATION",
            "signature": "0x5e562065a0cb15d766dac0cd49eb6d196a41183af302c4ecad45f1a81958d7797753f04424a9b0aa1c"
        }
    ]
}`
```

Note: These variables are used to test the `sign` function. ## Documentation for the Source Code

### Function: `sign`

The `sign` function takes in one parameter: `td` (a `TypedData` struct). It signs the `TypedData` using the private key and returns the signature and the hash of the message.

Example usage:

```go
func sign(td apitypes.TypedData) (string, []byte, error) {
    privateKey, err := crypto.HexToECDSA(privateKeyHex)
    if err != nil {
        return "", nil, err
    }
    typedDataHash, err := EIP712Hash(td)
    if err != nil {
        return "", nil, err
    }
    signature, err := crypto.Sign(typedDataHash, privateKey)
    if err != nil {
        return "", nil, err
    }
    return hexutil.Encode(signature), typedDataHash, nil
}
```

Note: This function is used to sign the `TypedData` using the private key and returns the signature and the hash of the message.

### Function: `EIP712Hash`

The `EIP712Hash` function takes in one parameter: `typedData` (a `TypedData` struct). It returns the hash of the `TypedData` according to the EIP-712 specification.

Example usage:

```go
func EIP712Hash(typedData apitypes.TypedData) ([]byte, error) {
    domainSeparator, err := EIP712DomainSeparator(typedData.Domain)
    if err != nil {
        return nil, err
    }
    typedDataHash := crypto.Keccak256Hash(
        append(domainSeparator[:], EIP712HashStruct(typedData.PrimaryType, typedData.Message)[:]...),
    )
    return typedDataHash.Bytes(), nil
}
```

Note: This function is used to return the hash of the `TypedData` according to the EIP-712 specification.

### Function: `EIP712DomainSeparator`

The `EIP712DomainSeparator` function takes in one parameter: `domain` (a `Domain` struct). It returns the domain separator according to the EIP-712 specification.

Example usage:

```go
func EIP712DomainSeparator(domain apitypes.Domain) ([32]byte, error) {
    domainType := reflect.TypeOf(domain)
    domainData := make([]interface{}, 0, domainType.NumField()*2)
    for i := 0; i < domainType.NumField(); i++ {
        field := domainType.Field(i)
        value := reflect.ValueOf(domain).FieldByName(field.Name).Interface()
        domainData = append(domainData, field.Name, value)
    }
    domainSeparator := crypto.Keccak256Hash(
        append([]byte(EIP712DomainType), EIP712HashStruct(EIP712DomainType, domainData)[:]...),
    )
    var domainSeparatorBytes [32]byte
    copy(domainSeparatorBytes[:], domainSeparator[:])
    return domainSeparatorBytes, nil
}
```

Note: This function is used to return the domain separator according to the EIP-712 specification.

### Function: `EIP712HashStruct`

The `EIP712HashStruct` function takes in two parameters: `primaryType` (a string) and `data` (an interface{}). It returns the hash of the struct according to the EIP-712 specification.

Example usage:

```go
func EIP712HashStruct(primaryType string, data interface{}) [32]byte {
    enc, err := abi.Encode(primaryType, data)
    if err != nil {
        panic(err)
    }
    return crypto.Keccak256Hash(enc)
}
```

Note: This function is used to return the hash of the struct according to the EIP-712 specification.

### Function: `TestGnosisTypedData`

The `TestGnosisTypedData` function tests the scenario where a user submits a full EIP-712 struct without using the gnosis-specific endpoint.

Example usage:

```go
func TestGnosisTypedData(t *testing.T) {
    var td apitypes.TypedData
    err := json.Unmarshal([]byte(gnosisTypedData), &td)
    if err != nil {
        t.Fatalf("unmarshalling failed '%v'", err)
    }
    _, sighash, err := sign(td)
    if err != nil {
        t.Fatal(err)
    }
    expSigHash := common.FromHex("0x28bae2bd58d894a1d9b69e5e9fde3570c4b98a6fc5499aefb54fb830137e831f")
    if !bytes.Equal(expSigHash, sighash) {
        t.Fatalf("Error, got %x, wanted %x", sighash, expSigHash)
    }
}
```

Note: This function is used to test the scenario where a user submits a full EIP-712 struct without using the gnosis-specific endpoint.

### Function: `TestGnosisCustomData`

The `TestGnosisCustomData` function tests the scenario where a user submits only the gnosis-safe specific data, and we fill the `TypedData` struct on our side.

Example usage:

```go
func TestGnosisCustomData(t *testing.T) {
    var tx core.GnosisSafeTx
    err := json.Unmarshal([]byte(gnosisTx), &tx)
    if err != nil {
        t.Fatal(err)
    }
    var td = tx.ToTypedData()
    _, sighash, err := sign(td)
    if err != nil {
        t.Fatal(err)
    }
    expSigHash := common.FromHex("0x28bae2bd58d894a1d9b69e5e9fde3570c4b98a6fc5499aefb54fb830137e831f")
    if !bytes.Equal(expSigHash, sighash) {
        t.Fatalf("Error, got %x, wanted %x", sighash, expSigHash)
    }
}
```

Note: This function is used to test the scenario where a user submits only the gnosis-safe specific data, and we fill the `TypedData` struct on our side. # Documentation for the Source Code

## Introduction

This codebase provides functions for signing Ethereum transactions using the EIP-712 standard. The EIP-712 standard defines a way to sign structured data, which can be used to sign transactions, messages, and other data types.

## Functions

### `sign`

The `sign` function takes in one parameter: `data` (a `TypedData` struct). It returns three values: the signature, the signature hash, and an error (if any).

Example usage:

```go
func sign(data apitypes.TypedData) ([]byte, []byte, error) {
    // ...
}
```

Note: This function signs the given `TypedData` struct using the EIP-712 standard.

### `signWithKey`

The `signWithKey` function takes in two parameters: `data` (a `TypedData` struct) and `key` (a private key). It returns three values: the signature, the signature hash, and an error (if any).

Example usage:

```go
func signWithKey(data apitypes.TypedData, key *ecdsa.PrivateKey) ([]byte, []byte, error) {
    // ...
}
```

Note: This function signs the given `TypedData` struct using the EIP-712 standard and the provided private key.

### `signWithPassphrase`

The `signWithPassphrase` function takes in three parameters: `data` (a `TypedData` struct), `passphrase` (a passphrase), and `account` (an Ethereum account). It returns three values: the signature, the signature hash, and an error (if any).

Example usage:

```go
func signWithPassphrase(data apitypes.TypedData, passphrase string, account accounts.Account) ([]byte, []byte, error) {
    // ...
}
```

Note: This function signs the given `TypedData` struct using the EIP-712 standard and the provided passphrase and account.

### `signWithGnosisSafe`

The `signWithGnosisSafe` function takes in two parameters: `data` (a `TypedData` struct) and `tx` (a `GnosisSafeTx` struct). It returns three values: the signature, the signature hash, and an error (if any).

Example usage:

```go
func signWithGnosisSafe(data apitypes.TypedData, tx core.GnosisSafeTx) ([]byte, []byte, error) {
    // ...
}
```

Note: This function signs the given `TypedData` struct using the EIP-712 standard and the provided `GnosisSafeTx` struct.

### `TestGnosisTypedDataWithChainId`

The `TestGnosisTypedDataWithChainId` function tests the `sign` function with a `TypedData` struct that includes a chain ID.

Example usage:

```go
func TestGnosisTypedDataWithChainId(t *testing.T) {
    // ...
}
```

Note: This function tests the `sign` function with a `TypedData` struct that includes a chain ID.

### `TestGnosisCustomDataWithChainId`

The `TestGnosisCustomDataWithChainId` function tests the `signWithGnosisSafe` function with a `GnosisSafeTx` struct.

Example usage:

```go
func TestGnosisCustomDataWithChainId(t *testing.T) {
    // ...
}
```

Note: This function tests the `signWithGnosisSafe` function with a `GnosisSafeTx` struct.

### `complexTypedData`

The `complexTypedData` variable is a JSON string that defines a complex `TypedData` struct.

Example usage:

```go
var complexTypedData = `
{
    "types": {
        // ...
    },
    "domain": {
        // ...
    },
    "primaryType": "Transaction",
    "message": {
        // ...
    }
}
`
```

Note: This variable defines a complex `TypedData` struct for testing purposes. ## Documentation for the Source Code

### Function: `sign`

The `sign` function takes in one parameter: `typedData` (a struct containing the typed data to be signed). It signs the typed data using the private key and returns the signature.

Example usage:

```go
func sign(typedData apitypes.TypedData) (*ecdsa.PrivateKey, []byte, error) {
    privateKey, err := crypto.HexToECDSA(privateKeyHex)
    if err != nil {
        return nil, nil, err
    }
    typedDataHash, err := types.HashTypedData(&typedData)
    if err != nil {
        return nil, nil, err
    }
    signature, err := crypto.Sign(typedDataHash.Bytes(), privateKey)
    if err != nil {
        return nil, nil, err
    }
    return privateKey, signature, nil
}
```

Note: This function is used to sign the typed data using the private key and returns the signature.

### Function: `TestComplexTypedData`

The `TestComplexTypedData` function tests the `sign` function with a complex typed data JSON string.

Example usage:

```go
func TestComplexTypedData(t *testing.T) {
    var td apitypes.TypedData
    err := json.Unmarshal([]byte(complexTypedData), &td)
    if err != nil {
        t.Fatalf("unmarshalling failed '%v'", err)
    }
    _, sighash, err := sign(td)
    if err != nil {
        t.Fatal(err)
    }
    expSigHash := common.FromHex("0x42b1aca82bb6900ff75e90a136de550a58f1a220a071704088eabd5e6ce20446")
    if !bytes.Equal(expSigHash, sighash) {
        t.Fatalf("Error, got %x, wanted %x", sighash, expSigHash)
    }
}
```

Note: This function is used to test the `sign` function with a complex typed data JSON string.

### Function: `TestGnosisSafe`

The `TestGnosisSafe` function tests the `sign` function with a Gnosis Safe JSON string.

Example usage:

```go
func TestGnosisSafe(t *testing.T) {
    // json missing chain id
    js := "{\n  \"safe\": \"0x899FcB1437DE65DC6315f5a69C017dd3F2837557\",\n  \"to\": \"0x899FcB1437DE65DC6315f5a69C017dd3F2837557\",\n  \"value\": \"0\",\n  \"data\": \"0x0d582f13000000000000000000000000d3ed2b8756b942c98c851722f3bd507a17b4745f0000000000000000000000000000000000000000000000000000000000000005\",\n  \"operation\": 0,\n  \"gasToken\": \"0x0000000000000000000000000000000000000000\",\n  \"safeTxGas\": 0,\n  \"baseGas\": 0,\n  \"gasPrice\": \"0\",\n  \"refundReceiver\": \"0x0000000000000000000000000000000000000000\",\n  \"nonce\": 0,\n  \"executionDate\": null,\n  \"submissionDate\": \"2022-02-23T14:09:00.018475Z\",\n  \"modified\": \"2022-12-01T15:52:21.214357Z\",\n  \"blockNumber\": null,\n  \"transactionHash\": null,\n  \"safeTxHash\": \"0x6f0f5cffee69087c9d2471e477a63cab2ae171cf433e754315d558d8836274f4\",\n  \"executor\": null,\n  \"isExecuted\": false,\n  \"isSuccessful\": null,\n  \"ethGasPrice\": null,\n  \"maxFeePerGas\": null,\n  \"maxPriorityFeePerGas\": null,\n  \"gasUsed\": null,\n  \"fee\": null,\n  \"origin\": \"https://gnosis-safe.io\",\n  \"dataDecoded\": {\n    \"method\": \"addOwnerWithThreshold\",\n    \"parameters\": [\n      {\n        \"name\": \"owner\",\n        \"type\": \"address\",\n        \"value\": \"0xD3Ed2b8756B942c98c851722f3bd507A17B4745F\"\n      },\n      {\n        \"name\": \"threshold\",\n        \"type\": \"uint256\",\n        \"value\": \"5\"\n      }\n    ]\n  }\n}"
    var td apitypes.TypedData
    err := json.Unmarshal([]byte(js), &td)
    if err != nil {
        t.Fatalf("unmarshalling failed '%v'", err)
    }
    _, sighash, err := sign(td)
    if err != nil {
        t.Fatal(err)
    }
    expSigHash := common.FromHex("0x7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7")
    if !bytes.Equal(expSigHash, sighash) {
        t.Fatalf("Error, got %x, wanted %x", sighash, expSigHash)
    }
}
```

Note: This function is used to test the `sign` function with a Gnosis Safe JSON string. ## Documentation for the Source Code

### Function: `testTypedDataAndHash`

The `testTypedDataAndHash` function is a test function that checks whether the `TypedDataAndHash` function returns the expected result for a given input. It takes in a JSON string as input, unmarshals it into a `core.GnosisSafeTx` struct, and then checks whether the `TypedDataAndHash` function returns the expected result for the struct.

Example usage:

```go
func TestTypedDataAndHash(t *testing.T) {
	js := "{\"data\":{\"to\":\"0x0000000000000000000000000000000000000000\",\"value\":\"0\",\"data\":\"0x\",\"operation\":0,\"gasLimit\":\"0\",\"gasPrice\":\"0\",\"nonce\":0,\"safeTxGas\":0,\"baseGas\":0,\"gasTokenData\":\"0x\",\"refundReceiver\":\"0x0000000000000000000000000000000000000000\",\"contractTransactionHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"transactionHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"message\":\"0x\",\"messageId\":0,\"signature\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"signedMessages\":[],\"sender\":\"0x0000000000000000000000000000000000000000\",\"executor\":\"0x0000000000000000000000000000000000000000\",\"isExecuted\":false,\"isSuccessful\":false,\"ethGasStationPrice\":0,\"ethGasStationPriceWait\":0,\"ethGasStationPriceSafeLow\":0,\"ethGasStationPriceAverage\":0,\"ethGasStationPriceFast\":0,\"ethGasStationPriceFastest\":0,\"refundParams\":null,\"refundParamsHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddress\":null,\"refundReceiverAddressHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecoded\":null,\"refundReceiverAddressDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedEncoded\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecoded\":null,\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedDecodedHash\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"refundReceiverAddressDecodedDecodedDecodedDecodedDecodedDecodedDecodedDec ## Documentation for the Source Code

### Function: `TestComplexTypedDataWithLowercaseReftype`

The `TestComplexTypedDataWithLowercaseReftype` function is a test function that tests the `sign` function with a complex typed data that has a lowercase reference type. It unmarshals the complex typed data from a JSON string, signs it using the `sign` function, and compares the resulting signature hash with the expected signature hash.

Example usage:

```go
func TestComplexTypedDataWithLowercaseReftype(t *testing.T) {
    var td apitypes.TypedData
    err := json.Unmarshal([]byte(complexTypedDataLCRefType), &td)
    if err != nil {
        t.Fatalf("unmarshalling failed '%v'", err)
    }
    _, sighash, err := sign(td)
    if err != nil {
        t.Fatal(err)
    }
    expSigHash := common.FromHex("0x49191f910874f0148597204d9076af128d4694a7c4b714f1ccff330b87207bff")
    if !bytes.Equal(expSigHash, sighash) {
        t.Fatalf("Error, got %x, wanted %x", sighash, expSigHash)
    }
}
```

Note: This function is used to test the `sign` function with a complex typed data that has a lowercase reference type.

### Variable: `complexTypedDataLCRefType`

The `complexTypedDataLCRefType` variable is a JSON string that represents a complex typed data with a lowercase reference type.

Example usage:

```go
var complexTypedDataLCRefType = `
{
    "types": {
        "EIP712Domain": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "version",
                "type": "string"
            },
            {
                "name": "chainId",
                "type": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address"
            }
        ],
        "Person": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "wallet",
                "type": "address"
            }
        ],
        "Mail": [
            {
                "name": "from",
                "type": "Person"
            },
            {
                "name": "to",
                "type": "Person"
            },
            {
                "name": "contents",
                "type": "string"
            }
        ]
    },
    "primaryType": "Mail",
    "domain": {
        "name": "Ether Mail",
        "version": "1",
        "chainId": 1,
        "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
    },
    "message": {
        "from": {
            "name": "Cow",
            "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
        },
        "to": {
            "name": "Bob",
            "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
        },
        "contents": "Hello, Bob!"
    }
}
`
```

Note: This variable is used to store a JSON string that represents a complex typed data with a lowercase reference type.