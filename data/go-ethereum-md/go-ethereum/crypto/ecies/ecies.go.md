## ECIES Package

The ECIES package provides an implementation of the Elliptic Curve Integrated Encryption Scheme (ECIES) using the Go programming language. The package contains functions for generating and importing elliptic curve public and private keys, as well as functions for encrypting and decrypting data using ECIES.

### Public Key

The `PublicKey` struct represents an elliptic curve public key. It contains the `X` and `Y` coordinates of the public key point, the elliptic curve `Curve`, and the `Params` used to generate the key.

#### `ExportECDSA()`

This method exports an ECIES public key as an ECDSA public key.

#### `ImportECDSAPublic(pub *ecdsa.PublicKey)`

This function imports an ECDSA public key as an ECIES public key.

### Private Key

The `PrivateKey` struct represents an elliptic curve private key. It contains the `PublicKey` struct, which contains the `X` and `Y` coordinates of the public key point, the elliptic curve `Curve`, and the `Params` used to generate the key. It also contains the private key `D`.

#### `ExportECDSA()`

This method exports an ECIES private key as an ECDSA private key.

#### `ImportECDSA(prv *ecdsa.PrivateKey)`

This function imports an ECDSA private key as an ECIES private key.

### Key Generation

#### `GenerateKey(rand io.Reader, curve elliptic.Curve, params *ECIESParams)`

This function generates an elliptic curve public/private key pair. If `params` is `nil`, the recommended default parameters for the key will be chosen.

### Encryption and Decryption

#### `Encrypt(rand io.Reader, pub *PublicKey, plaintext []byte, params *ECIESParams) ([]byte, error)`

This function encrypts the given plaintext using the given public key and ECIES parameters.

#### `Decrypt(prv *PrivateKey, ciphertext []byte, params *ECIESParams) ([]byte, error)`

This function decrypts the given ciphertext using the given private key and ECIES parameters.

### Errors

The following errors may be returned by the ECIES package:

- `ErrImport`: Failed to import key.
- `ErrInvalidCurve`: Invalid elliptic curve.
- `ErrInvalidPublicKey`: Invalid public key.
- `ErrSharedKeyIsPointAtInfinity`: Shared key is point at infinity.
- `ErrSharedKeyTooBig`: Shared key params are too big.

### Dependencies

The ECIES package depends on the following Go packages:

- `crypto/cipher`
- `crypto/ecdsa`
- `crypto/elliptic`
- `crypto/hmac`
- `crypto/subtle`
- `encoding/binary`
- `fmt`
- `hash`
- `io`
- `math/big` ## ECIES Package Documentation

This package implements the Elliptic Curve Integrated Encryption Scheme (ECIES) as specified in SEC 1, 5.1. It provides functions for key generation, encryption, and decryption using the ECIES algorithm.

### Functions

#### `GenerateKey(rand io.Reader, curve elliptic.Curve, params *ECIESParams) (*PrivateKey, error)`

This function generates a new private key for the given elliptic curve and ECIES parameters. It returns a pointer to a `PrivateKey` struct and an error. If the `params` argument is `nil`, it uses the default parameters for the given curve.

#### `MaxSharedKeyLength(pub *PublicKey) int`

This function returns the maximum length of the shared key that can be produced by the given public key.

#### `(prv *PrivateKey) GenerateShared(pub *PublicKey, skLen, macLen int) (sk []byte, err error)`

This method generates a shared key between the private key and the given public key. It returns a byte slice containing the shared key and an error. The `skLen` argument specifies the length of the shared key, and the `macLen` argument specifies the length of the MAC.

#### `concatKDF(hash hash.Hash, z, s1 []byte, kdLen int) []byte`

This function implements the NIST SP 800-56 Concatenation Key Derivation Function (see section 5.8.1). It takes a hash function, a byte slice `z`, a byte slice `s1`, and an integer `kdLen`. It returns a byte slice containing the derived key.

#### `roundup(size, blocksize int) int`

This function rounds the `size` argument up to the next multiple of `blocksize`.

#### `deriveKeys(hash hash.Hash, z, s1 []byte, keyLen int) (Ke, Km []byte)`

This function derives the encryption and MAC keys using `concatKDF`. It takes a hash function, a byte slice `z`, a byte slice `s1`, and an integer `keyLen`. It returns two byte slices, `Ke` and `Km`, containing the encryption and MAC keys, respectively.

#### `messageTag(hash func() hash.Hash, km, msg, shared []byte) []byte`

This function computes the MAC of a message (called the tag) as per SEC 1, 3.5. It takes a hash function, a byte slice `km` containing the MAC key, a byte slice `msg` containing the message, and a byte slice `shared` containing shared information. It returns a byte slice containing the MAC.

#### `generateIV(params *ECIESParams, rand io.Reader) (iv []byte, err error)`

This function generates an initialization vector (IV) for CTR mode. It takes an `ECIESParams` struct and a random number generator. It returns a byte slice containing the IV and an error.

#### `symEncrypt(rand io.Reader, params *ECIESParams, key, m []byte) (ct []byte, err error)`

This function carries out CTR encryption using the block cipher specified in the `ECIESParams` struct. It takes a random number generator, an `ECIESParams` struct, a byte slice `key` containing the encryption key, and a byte slice `m` containing the message to be encrypted. It returns a byte slice containing the ciphertext and an error.

#### `symDecrypt(params *ECIESParams, key, ct []byte) (m []byte, err error)`

This function carries out CTR decryption using the block cipher specified in the `ECIESParams` struct. It takes an `ECIESParams` struct, a byte slice `key` containing the encryption key, and a byte slice `ct` containing the ciphertext to be decrypted. It returns a byte slice containing the decrypted message and an error.

#### `Encrypt(rand io.Reader, pub *PublicKey, m, s1, s2 []byte) (ct []byte, err error)`

This function encrypts a message using ECIES as specified in SEC 1, 5.1. It takes a random number generator, a public key, a byte slice `m` containing the message to be encrypted, and two byte slices `s1` and `s2` containing shared information. If the shared information parameters aren't being used, they should be `nil`. It returns a byte slice containing the ciphertext and an error. ## ECIES Encryption and Decryption Functions

### `Encrypt(pub *PublicKey, rand io.Reader, m, s1, s2 []byte) (ct []byte, err error)`

This function encrypts a message `m` using the Elliptic Curve Integrated Encryption Scheme (ECIES) with the given public key `pub`, random source `rand`, and shared secrets `s1` and `s2`. It returns the ciphertext `ct` and an error if any.

### `Decrypt(c, s1, s2 []byte) (m []byte, err error)`

This function decrypts an ECIES ciphertext `c` using the private key of the recipient, shared secrets `s1` and `s2`. It returns the decrypted message `m` and an error if any.

### `deriveKeys(hash hash.Hash, z, s1 []byte, keyLen int) (Ke, Km []byte)`

This function derives two keys `Ke` and `Km` from the shared secret `z`, shared secret `s1`, and the given hash function `hash`. It returns the derived keys `Ke` and `Km`.

### `messageTag(hash hash.Hash, Km, m, s2 []byte) []byte`

This function computes the message tag using the given hash function `hash`, derived key `Km`, message `m`, and shared secret `s2`. It returns the message tag.

### `symEncrypt(rand io.Reader, params *PublicKeyParams, Ke, m []byte) ([]byte, error)`

This function encrypts the message `m` using the symmetric encryption algorithm specified in the given `params` and the derived key `Ke`. It returns the encrypted message `em` and an error if any.

### `symDecrypt(params *PublicKeyParams, Ke, em []byte) ([]byte, error)`

This function decrypts the encrypted message `em` using the symmetric encryption algorithm specified in the given `params` and the derived key `Ke`. It returns the decrypted message `m` and an error if any.

### `pubkeyParams(pub *PublicKey) (*PublicKeyParams, error)`

This function returns the public key parameters for the given public key `pub`. It returns the public key parameters and an error if any.

### `GenerateShared(pub *PublicKey, privLen, pubLen int) ([]byte, error)`

This function generates a shared secret `z` between the given public key `pub` and the private key of the recipient. It returns the shared secret `z` and an error if any.