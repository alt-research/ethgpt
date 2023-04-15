## Package keystore

The `keystore` package provides functionality for managing Ethereum accounts stored in JSON key files. It defines the `DecryptKey` and `EncryptKey` functions for decrypting and encrypting JSON key files, respectively.

### `DecryptKey(keyjson []byte, auth string) (*Key, error)`

The `DecryptKey` function decrypts a JSON key file using the specified authentication string. It returns a pointer to a `Key` struct and an error if the decryption fails. The `keyjson` parameter is a byte slice containing the JSON key file to decrypt. The `auth` parameter is the authentication string used to decrypt the key file.

### `EncryptKey(key *Key, auth string, n, p int) ([]byte, error)`

The `EncryptKey` function encrypts a `Key` struct using the specified authentication string and scrypt parameters. It returns a byte slice containing the encrypted JSON key file and an error if the encryption fails. The `key` parameter is a pointer to the `Key` struct to encrypt. The `auth` parameter is the authentication string used to encrypt the key file. The `n` and `p` parameters are the scrypt parameters used to encrypt the key file.

### `TestKeyEncryptDecrypt(t *testing.T)`

The `TestKeyEncryptDecrypt` function is a test function that tests the `DecryptKey` and `EncryptKey` functions. It reads a JSON key file from the `testdata` directory and performs multiple rounds of decryption and encryption using different passwords. It checks that the key file can be decrypted with the correct password and that the decrypted key file has the correct address. It also checks that the key file can be encrypted with a new password.