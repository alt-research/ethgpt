## Package build

The `build` package provides functions for building and signing Ethereum binaries.

### PGPSignFile

```go
func PGPSignFile(input string, output string, pgpkey string) error
```

`PGPSignFile` reads the contents of an input file and signs it (in armored format) with the key provided, placing the signature into the output file.

#### Parameters

- `input` (string): The path to the input file to be signed.
- `output` (string): The path to the output file where the signature will be placed.
- `pgpkey` (string): The PGP private key in armored format.

#### Return Value

- `error`: An error if the function fails to sign the file.

### PGPKeyID

```go
func PGPKeyID(pgpkey string) (string, error)
```

`PGPKeyID` parses an armored key and returns the key ID.

#### Parameters

- `pgpkey` (string): The PGP private key in armored format.

#### Return Value

- `string`: The key ID of the PGP private key.
- `error`: An error if the function fails to parse the key or if there is more than one key in the keyring.