# Signify Package Documentation

This package provides functions to sign files using a given key and verify the signature using a golang library.

## Functions

### SignFile

```go
func SignFile(inputFile string, outputFile string, secKey string, trustedComment string, untrustedComment string) error
```

SignFile reads the contents of an input file and signs it (in armored format) with the key provided, placing the signature into the output file. It takes the following parameters:

- `inputFile`: the path to the input file to be signed.
- `outputFile`: the path to the output file where the signature will be placed.
- `secKey`: the secret key used to sign the file.
- `trustedComment`: a trusted comment to be included in the signature.
- `untrustedComment`: an untrusted comment to be included in the signature.

### TestSignify

```go
func TestSignify(t *testing.T)
```

TestSignify is a test function that tests the SignFile function. It generates a random file, signs it using the SignFile function, and verifies the signature using a golang library.

### TestSignifyTrustedCommentTooManyLines

```go
func TestSignifyTrustedCommentTooManyLines(t *testing.T)
```

TestSignifyTrustedCommentTooManyLines is a test function that tests the SignFile function when a trusted comment with too many lines is provided. It generates a random file, tries to sign it using the SignFile function with a multi-line trusted comment, and expects an error to be returned.

### TestSignifyTrustedCommentTooManyLinesLF

```go
func TestSignifyTrustedCommentTooManyLinesLF(t *testing.T)
```

TestSignifyTrustedCommentTooManyLinesLF is a test function that tests the SignFile function when a trusted comment with too many lines is provided using LF instead of CRLF. It generates a random file, signs it using the SignFile function with a multi-line trusted comment using LF, and expects the signature to be generated successfully.

### TestSignifyTrustedCommentEmpty

```go
func TestSignifyTrustedCommentEmpty(t *testing.T)
```

TestSignifyTrustedCommentEmpty is a test function that tests the SignFile function when an empty trusted comment is provided. It generates a random file, signs it using the SignFile function with an empty trusted comment, and expects the signature to be generated successfully.

## Variables

### testSecKey

```go
var testSecKey = "RWRCSwAAAABVN5lr2JViGBN8DhX3/Qb/0g0wBdsNAR/APRW2qy9Fjsfr12sK2cd3URUFis1jgzQzaoayK8x4syT4G3Gvlt9RwGIwUYIQW/0mTeI+ECHu1lv5U4Wa2YHEPIesVPyRm5M="
```

testSecKey is a test variable that contains a secret key used to sign files.

### testPubKey

```go
var testPubKey = "RWTAPRW2qy9FjsBiMFGCEFv9Jk3iPhAh7tZb+VOFmtmBxDyHrFT8kZuT"
```

testPubKey is a test variable that contains a public key used to verify signatures.