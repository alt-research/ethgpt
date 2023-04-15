# ECIES Package Documentation

This package contains parameters for ECIES encryption, specifying the symmetric encryption and HMAC parameters. The package provides standard ECIES parameters for AES128, AES192, and AES256 encryption with HMAC-SHA-256-16, HMAC-SHA-384-48, and HMAC-SHA-512-64.

## Functions

### ECIESParams

`ECIESParams` is a struct that represents the parameters for ECIES encryption. It contains the following fields:

- `Hash`: a function that returns a hash.Hash object for the hash function used in HMAC.
- `hashAlgo`: a crypto.Hash object for the hash algorithm used in HMAC.
- `Cipher`: a function that takes a byte slice and returns a cipher.Block object for the symmetric encryption algorithm.
- `BlockSize`: an integer representing the block size of the symmetric encryption algorithm.
- `KeyLen`: an integer representing the length of the symmetric encryption key.

### ECIES_AES128_SHA256

`ECIES_AES128_SHA256` is a standard ECIES parameter for AES128 encryption with HMAC-SHA-256-16.

### ECIES_AES192_SHA384

`ECIES_AES192_SHA384` is a standard ECIES parameter for AES192 encryption with HMAC-SHA-384-48.

### ECIES_AES256_SHA256

`ECIES_AES256_SHA256` is a standard ECIES parameter for AES256 encryption with HMAC-SHA-256-32.

### ECIES_AES256_SHA384

`ECIES_AES256_SHA384` is a standard ECIES parameter for AES256 encryption with HMAC-SHA-384-48.

### ECIES_AES256_SHA512

`ECIES_AES256_SHA512` is a standard ECIES parameter for AES256 encryption with HMAC-SHA-512-64.

## Variables

### DefaultCurve

`DefaultCurve` is a variable that represents the default elliptic curve used in ECIES encryption. It is set to `ethcrypto.S256()`.

### ErrUnsupportedECDHAlgorithm

`ErrUnsupportedECDHAlgorithm` is an error that is returned when an unsupported ECDH algorithm is used in ECIES encryption.

### ErrUnsupportedECIESParameters

`ErrUnsupportedECIESParameters` is an error that is returned when unsupported ECIES parameters are used in ECIES encryption.

### ErrInvalidKeyLen

`ErrInvalidKeyLen` is an error that is returned when an invalid key size is used in ECIESParams.

## Constants

### maxKeyLen

`maxKeyLen` is a constant that limits the key length to prevent overflow of the counter in `concatKDF`. While the theoretical limit is much higher, no known cipher uses keys larger than 512 bytes.

## Example Usage

```go
import (
    "github.com/ethereum/go-ethereum/crypto"
    "github.com/ethereum/go-ethereum/crypto/ecies"
)

func main() {
    // Generate a new private key
    privateKey, _ := crypto.GenerateKey()

    // Create a new ECIES encrypter with AES256 and HMAC-SHA-256-32
    eciesEncrypter := ecies.NewEncrypter(ecies.ECIES_AES256_SHA256)

    // Encrypt a message with the public key
    message := []byte("Hello, world!")
    encryptedMessage, _ := eciesEncrypter.Encrypt(&privateKey.PublicKey, message, nil, nil)

    // Create a new ECIES decrypter with AES256 and HMAC-SHA-256-32
    eciesDecrypter := ecies.NewDecrypter(ecies.ECIES_AES256_SHA256)

    // Decrypt the message with the private key
    decryptedMessage, _ := eciesDecrypter.Decrypt(privateKey, encryptedMessage, nil, nil)

    fmt.Println(string(decryptedMessage)) // Output: Hello, world!
}
``` ## ECIES Encryption

The code snippet provided implements the Elliptic Curve Integrated Encryption Scheme (ECIES) for encrypting data using elliptic curve cryptography. ECIES is a hybrid encryption scheme that combines symmetric and asymmetric encryption. It uses an elliptic curve Diffie-Hellman key exchange to establish a shared secret between the sender and receiver, which is then used to encrypt the data using a symmetric encryption algorithm.

The code defines a set of parameters for ECIES encryption using different elliptic curves and symmetric encryption algorithms. The `ECIESParams` struct defines the parameters for a specific set of encryption parameters, including the elliptic curve, the hash function, the symmetric encryption algorithm, and the key length. The `paramsFromCurve` map defines the default parameters for each supported elliptic curve.

The `AddParamsForCurve` function allows adding custom parameters for a specific elliptic curve. The `ParamsFromCurve` function returns the default parameters for a given elliptic curve. The `pubkeyParams` function returns the encryption parameters for a given public key, either using the key's specified parameters or the default parameters for the key's elliptic curve.

Overall, this code provides a simple and flexible interface for performing ECIES encryption using different elliptic curves and symmetric encryption algorithms.