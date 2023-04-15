## ECIES Package

The ECIES package provides an implementation of the Elliptic Curve Integrated Encryption Scheme (ECIES) in Go. The package contains functions for key generation, encryption, and decryption using the ECIES algorithm.

### TestKDF

```go
func TestKDF(t *testing.T)
```

The `TestKDF` function tests the Key Derivation Function (KDF) used in the ECIES algorithm. It takes no arguments and returns nothing. It tests the KDF function with different input lengths and expected output values.

### cmpParams

```go
func cmpParams(p1, p2 *ECIESParams) bool
```

The `cmpParams` function compares two sets of ECIES parameters. It takes two pointers to `ECIESParams` structs and returns a boolean value indicating whether the two structs are equal. It compares the hash algorithm, key length, and block size of the two structs.

### TestSharedKey

```go
func TestSharedKey(t *testing.T)
```

The `TestSharedKey` function tests the shared key generation component of the ECIES algorithm. It takes a testing object `t` and returns nothing. It generates two sets of keys, generates shared keys from each set, and compares the shared keys to ensure they are equal.

### TestSharedKeyPadding

```go
func TestSharedKeyPadding(t *testing.T)
```

The `TestSharedKeyPadding` function tests the shared key generation component of the ECIES algorithm with padding. It takes a testing object `t` and returns nothing. It generates two sets of keys, generates shared keys from each set with padding, and compares the shared keys to ensure they are equal.

### GenerateKey

```go
func GenerateKey(rand io.Reader, curve elliptic.Curve, hashFn hash.Hash) (*PrivateKey, error)
```

The `GenerateKey` function generates a new ECDSA private key using the given random number generator, elliptic curve, and hash function. It takes an `io.Reader` object `rand`, an `elliptic.Curve` object `curve`, and a `hash.Hash` object `hashFn`. It returns a pointer to a `PrivateKey` struct and an error.

### MaxSharedKeyLength

```go
func MaxSharedKeyLength(pub *PublicKey) int
```

The `MaxSharedKeyLength` function returns the maximum length of the shared key that can be generated using the given public key. It takes a pointer to a `PublicKey` struct `pub` and returns an integer value.

### PublicKey

```go
type PublicKey struct {
    elliptic.Curve
    X, Y *big.Int
}
```

The `PublicKey` struct represents an ECDSA public key. It contains fields for the elliptic curve, and the X and Y coordinates of the public key.

### PrivateKey

```go
type PrivateKey struct {
    PublicKey
    D *big.Int
}
```

The `PrivateKey` struct represents an ECDSA private key. It contains fields for the public key and the private key value `D`.

### ECIESParams

```go
type ECIESParams struct {
    hashAlgo  crypto.Hash
    KeyLen    int
    BlockSize int
}
```

The `ECIESParams` struct represents the parameters used in the ECIES algorithm. It contains fields for the hash algorithm, key length, and block size.

### Encrypt

```go
func Encrypt(pub *PublicKey, plaintext []byte, params *ECIESParams) ([]byte, error)
```

The `Encrypt` function encrypts the given plaintext using the ECIES algorithm with the given public key and parameters. It takes a pointer to a `PublicKey` struct `pub`, a byte slice `plaintext`, and a pointer to an `ECIESParams` struct `params`. It returns a byte slice containing the encrypted ciphertext and an error.

### Decrypt

```go
func Decrypt(priv *PrivateKey, ciphertext []byte, params *ECIESParams) ([]byte, error)
```

The `Decrypt` function decrypts the given ciphertext using the ECIES algorithm with the given private key and parameters. It takes a pointer to a `PrivateKey` struct `priv`, a byte slice `ciphertext`, and a pointer to an `ECIESParams` struct `params`. It returns a byte slice containing the decrypted plaintext and an error.

### concatKDF

```go
func concatKDF(hash hash.Hash, secret []byte, otherInfo []byte, keyLen int) []byte
```

The `concatKDF` function implements the Key Derivation Function (KDF) used in the ECIES algorithm. It takes a `hash.Hash` object `hash`, a byte slice `secret`, a byte slice `otherInfo`, and an integer `keyLen`. It returns a byte slice containing the derived key. # ECIES Package

The ECIES package provides an implementation of the Elliptic Curve Integrated Encryption Scheme (ECIES) using the Elliptic Curve Cryptography (ECC) library. ECIES is a hybrid encryption scheme that combines symmetric-key encryption and public-key encryption. It is designed to provide confidentiality, integrity, and authenticity of messages.

## Functions

### GenerateKey

`GenerateKey(rand io.Reader, curve elliptic.Curve, opts *ECIESOptions) (*PrivateKey, error)`

This function generates a new private key for the given elliptic curve. It takes a random number generator, an elliptic curve, and an optional ECIESOptions struct as input parameters. It returns a pointer to a PrivateKey struct and an error. If the options parameter is nil, default options are used.

### PrivateKey.GenerateShared

`GenerateShared(pub *PublicKey, keyLen int, macLen int) ([]byte, error)`

This method generates a shared secret between the private key and the given public key. It takes a pointer to a PublicKey struct, an integer keyLen, and an integer macLen as input parameters. It returns a byte slice containing the shared secret and an error.

### Encrypt

`Encrypt(rand io.Reader, pub *PublicKey, plaintext []byte, key []byte, sharedData []byte) ([]byte, error)`

This function encrypts the given plaintext using the given public key. It takes a random number generator, a pointer to a PublicKey struct, a byte slice containing the plaintext, an optional byte slice containing the encryption key, and an optional byte slice containing shared data as input parameters. It returns a byte slice containing the ciphertext and an error.

### PrivateKey.Decrypt

`Decrypt(ciphertext []byte, key []byte, sharedData []byte) ([]byte, error)`

This method decrypts the given ciphertext using the private key. It takes a byte slice containing the ciphertext, an optional byte slice containing the encryption key, and an optional byte slice containing shared data as input parameters. It returns a byte slice containing the plaintext and an error.

## Tests

### TestKeyGeneration

This test verifies that the GenerateKey function generates valid private keys for the P-256 and S-256 curves. It also verifies that the public keys generated from the private keys have the correct X and Y coordinates.

### TestTooBigSharedKey

This test verifies that the GenerateShared function returns an error when too much key data is requested.

### BenchmarkGenerateKeyP256

This benchmark measures the performance of the GenerateKey function for the P-256 curve.

### BenchmarkGenSharedKeyP256

This benchmark measures the performance of the GenerateShared method for the P-256 curve.

### BenchmarkGenSharedKeyS256

This benchmark measures the performance of the GenerateShared method for the S-256 curve.

### TestEncryptDecrypt

This test verifies that an encrypted message can be successfully decrypted using the private key.

### TestDecryptShared2

This test verifies that the shared data parameter is correctly used in the encryption and decryption process. ## ECIES

The ECIES package provides an implementation of the Elliptic Curve Integrated Encryption Scheme (ECIES) using the AES symmetric cipher in Galois Counter Mode (GCM) and the SHA-2 hash function family. ECIES is a hybrid encryption scheme that combines the security of public key cryptography with the efficiency of symmetric key cryptography.

### Functions

#### `Encrypt(rand io.Reader, pub *PublicKey, message []byte, shared []byte, params *ECIESParams) ([]byte, error)`

This function encrypts the given `message` using the public key `pub` and returns the resulting ciphertext. If `shared` is not `nil`, it is used as shared data in the encryption process. If `params` is not `nil`, it is used as the encryption parameters. If `params` is `nil`, the default parameters for the curve used by `pub` are used.

#### `(*PrivateKey) Decrypt(ciphertext []byte, shared []byte, params *ECIESParams) ([]byte, error)`

This method decrypts the given `ciphertext` using the private key `prv` and returns the resulting plaintext. If `shared` is not `nil`, it is used as shared data in the decryption process. If `params` is not `nil`, it is used as the decryption parameters. If `params` is `nil`, the default parameters for the curve used by `prv` are used.

#### `ParamsFromCurve(curve elliptic.Curve) *ECIESParams`

This function returns the default encryption parameters for the given `curve`. If `curve` is not one of the supported curves (P-256, P-384, or P-521), it returns `nil`.

#### `GenerateKey(rand io.Reader, curve elliptic.Curve, params *ECIESParams) (*PrivateKey, error)`

This function generates a new private key for the given `curve` using the given `params`. If `params` is `nil`, the default parameters for the curve are used.

#### `(*PrivateKey) Public() *PublicKey`

This method returns the public key corresponding to the private key `prv`.

#### `(*PublicKey) Serialize() []byte`

This method serializes the public key `pub` into a byte slice.

#### `DeserializePublicKey(serialized []byte) (*PublicKey, error)`

This function deserializes a public key from the given `serialized` byte slice and returns it. If the byte slice is not a valid serialized public key, it returns an error.

#### `(*PrivateKey) Serialize() []byte`

This method serializes the private key `prv` into a byte slice.

#### `DeserializePrivateKey(serialized []byte) (*PrivateKey, error)`

This function deserializes a private key from the given `serialized` byte slice and returns it. If the byte slice is not a valid serialized private key, it returns an error.

### Tests

#### `TestEncryptDecrypt`

This test encrypts a message using a public key and then decrypts it using the corresponding private key. It checks that the decrypted plaintext matches the original message.

#### `TestEncryptDecryptWithSharedData`

This test encrypts a message using a public key and shared data, and then decrypts it using the corresponding private key and the same shared data. It checks that the decrypted plaintext matches the original message.

#### `TestParamSelection`

This test checks that the default encryption parameters for each supported curve are correct.

#### `TestBasicKeyValidation`

This test checks that the basic public key validation in the decryption operation works.

#### `TestBox`

This test encrypts a message using a public key and then decrypts it using the corresponding private key. It checks that the decrypted plaintext matches the original message and that the encryption fails when using a different private key.

#### `TestSharedKeyStatic`

This test verifies the `GenerateShared` function against static values. ## Documentation for Source Code

### Function: `hexKey(prv string) *PrivateKey`

This function takes a string `prv` representing a private key in hexadecimal format. It uses the `crypto.HexToECDSA` function to decode the private key and returns a pointer to a `PrivateKey` struct.

### Function: `decode(s string) []byte`

This function takes a string `s` representing a hexadecimal encoded byte array. It uses the `hex.DecodeString` function to decode the byte array and returns the resulting byte slice.

### Function: `TestGenerateShared(t *testing.T)`

This function is a test function that tests the `GenerateShared` function of the `PrivateKey` struct. It generates two private keys `prv1` and `prv2` using the `hexKey` function. It then computes the shared secret between the two private keys using the `GenerateShared` function and checks that the shared secrets computed by both private keys are equal. Finally, it checks that the computed shared secret matches the expected shared secret.

## Explanation of Source Code

The source code contains three functions and a test function. The `hexKey` function takes a string representing a private key in hexadecimal format and returns a pointer to a `PrivateKey` struct. The `decode` function takes a string representing a hexadecimal encoded byte array and returns the resulting byte slice. The `TestGenerateShared` function tests the `GenerateShared` function of the `PrivateKey` struct.

The `GenerateShared` function computes the shared secret between two private keys. It takes pointers to the private keys, the length of the shared secret for each private key, and returns the shared secret as a byte slice. The function uses the Elliptic Curve Diffie-Hellman (ECDH) key exchange algorithm to compute the shared secret.

The `TestGenerateShared` function generates two private keys using the `hexKey` function and computes the shared secret between them using the `GenerateShared` function. It checks that the shared secrets computed by both private keys are equal and that the computed shared secret matches the expected shared secret.