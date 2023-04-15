## Package keystore

The `keystore` package provides functionality for managing Ethereum accounts and their associated private keys. It defines the `KeyStore` interface and the `Key` struct.

### Functions

#### importPreSaleKey

`importPreSaleKey` creates a new `Key` and stores it in the given `KeyStore` by decrypting a presale key JSON. It takes the `KeyStore`, the presale key JSON, and the password as parameters and returns the `Account`, the `Key`, and an error.

#### decryptPreSaleKey

`decryptPreSaleKey` decrypts a presale key JSON and returns the `Key`. It takes the presale key JSON and the password as parameters and returns the `Key` and an error.

#### aesCTRXOR

`aesCTRXOR` performs an XOR operation on the input text using the given key and initialization vector (IV) in counter mode (CTR). It takes the key, the input text, and the IV as parameters and returns the output text and an error.

#### aesCBCDecrypt

`aesCBCDecrypt` decrypts the input text using the given key and initialization vector (IV) in cipher block chaining (CBC) mode. It takes the key, the cipher text, and the IV as parameters and returns the plain text and an error.

### Types

#### KeyStore

The `KeyStore` interface defines the methods that a key store must implement to manage Ethereum accounts and their associated private keys. It has the following methods:

- `HasAddress(accounts.Address) bool`: returns true if the key store has the specified Ethereum address.
- `GetKey(accounts.Address, string) (*Key, error)`: returns the `Key` associated with the specified Ethereum address and password.
- `StoreKey(string, *Key, string) error`: stores the `Key` at the specified path in the key store using the specified password.
- `JoinPath(elem ...string) string`: joins the specified path elements using the key store's path separator.

#### Key

The `Key` struct represents an Ethereum account and its associated private key. It has the following fields:

- `Id uuid.UUID`: unique identifier for the key.
- `Address accounts.Address`: Ethereum address associated with the key. ## AES Decryption

The `aesDecrypt` function takes an AES cipher text, an AES key, and an initialization vector (IV) as input and returns the decrypted plain text. It uses the AES block cipher in CBC mode to decrypt the cipher text.

The function first creates a new AES cipher block using the provided key. It then creates a new decrypter using the cipher block and the IV. The function then creates a new byte slice to hold the padded plain text and calls the `CryptBlocks` method of the decrypter to decrypt the cipher text into the padded plain text slice.

The function then calls the `pkcs7Unpad` function to remove any padding from the padded plain text slice. If the `pkcs7Unpad` function returns `nil`, indicating that the padding is invalid, the function returns `nil` and an `ErrDecrypt` error. Otherwise, the function returns the unpadded plain text slice and `nil` for the error.

## PKCS7 Unpadding

The `pkcs7Unpad` function takes a byte slice as input and returns a new byte slice with any PKCS7 padding removed. If the input slice is empty, the function returns `nil`.

The function first checks the last byte of the input slice to determine the amount of padding. If the padding value is greater than the length of the input slice or greater than the AES block size, the function returns `nil`. If the padding value is zero, the function returns `nil`.

The function then iterates over the input slice from the end to the beginning, checking that each byte matches the padding value. If any byte does not match, the function returns `nil`. If all bytes match, the function returns a new byte slice containing the input slice with the padding removed.