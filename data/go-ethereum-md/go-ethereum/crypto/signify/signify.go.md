## Signify Package

The Signify package provides a function for signing the contents of a file using the Ed25519 digital signature algorithm. The package contains functions for parsing private keys and creating signatures.

### parsePrivateKey

```go
func parsePrivateKey(key string) (k ed25519.PrivateKey, header []byte, keyNum []byte, err error)
```

The `parsePrivateKey` function parses a base64-encoded private key string in the format created by the `signify` tool. It takes a string `key` and returns an `ed25519.PrivateKey` object `k`, a byte slice `header`, a byte slice `keyNum`, and an error.

### SignFile

```go
func SignFile(input string, output string, key string, untrustedComment string, trustedComment string) error
```

The `SignFile` function signs the contents of the input file using the Ed25519 digital signature algorithm and writes the signature to the output file. It takes a string `input` containing the path to the input file, a string `output` containing the path to the output file, a string `key` containing the base64-encoded private key, a string `untrustedComment` containing the untrusted comment to include in the signature, and a string `trustedComment` containing the trusted comment to include in the signature. It returns an error if any errors occur during