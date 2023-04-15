## Package keystore

The `keystore` package provides functionality for managing encrypted private keys on disk. It implements the `KeyStore` interface, which defines methods for storing and retrieving encrypted keys.

### Constants

- `keyHeaderKDF`: the key derivation function used to encrypt the private key.
- `StandardScryptN`: the N parameter of the Scrypt encryption algorithm, using 256MB memory and taking approximately 1s CPU time on a modern processor.
- `StandardScryptP`: the P parameter of the Scrypt encryption algorithm, using 256MB memory and taking approximately 1s CPU time on a modern processor.
- `LightScryptN`: the N parameter of the Scrypt encryption algorithm, using 4MB memory and taking approximately 100ms CPU time on a modern processor.
- `LightScryptP`: the P parameter of the Scrypt encryption algorithm, using 4MB memory and taking approximately 100ms CPU time on a modern processor.
- `scryptR`: the R parameter of the Scrypt encryption algorithm.
- `scryptDKLen`: the length of the derived key in bytes.

### Types

- `keyStorePassphrase`: a struct that implements the `KeyStore` interface. It stores the path to the directory where keys are stored, as well as the Scrypt parameters used for encryption.

### Functions

- `StoreKey(dir, auth string, scryptN, scryptP int) (accounts.Account, error)`: generates a new key, encrypts it with the given passphrase, and stores it in the specified directory. Returns the account associated with the new key.
- `(ks keyStorePassphrase) StoreKey(filename string, key *Key, auth string) error`: encrypts the given key with the specified passphrase and writes it to the specified file.
- `(ks keyStorePassphrase) GetKey(addr common.Address, filename, auth string) (*Key, error)`: retrieves the key stored in the specified file, decrypts it with the given passphrase, and returns it. ## KeyStorePassphrase

The `KeyStorePassphrase` struct represents a key store with a passphrase. It has the following fields:

- `keysDirPath string`: the path to the directory where the key store files are stored.
- `scryptN int`: the scrypt parameter N used for key derivation.
- `scryptP int`: the scrypt parameter P used for key derivation.
- `scryptR int`: the scrypt parameter R used for key derivation.
- `lightScryptN int`: the scrypt parameter N used for light key derivation.
- `lightScryptP int`: the scrypt parameter P used for light key derivation.
- `lightScryptR int`: the scrypt parameter R used for light key derivation.

The `NewKeyStorePassphrase` function creates a new key store with a passphrase. It takes the following parameters:

- `keysDirPath string`: the path to the directory where the key store files are stored.
- `scryptN int`: the scrypt parameter N used for key derivation.
- `scryptP int`: the scrypt parameter P used for key derivation.
- `scryptR int`: the scrypt parameter R used for key derivation.
- `lightScryptN int`: the scrypt parameter N used for light key derivation.
- `lightScryptP int`: the scrypt parameter P used for light key derivation.
- `lightScryptR int`: the scrypt parameter R used for light key derivation.

The `JoinPath` function joins the given filename with the key store directory path. It takes the following parameter:

- `filename string`: the filename to join with the key store directory path.

The `EncryptDataV3` function encrypts the given data with the given password using the scrypt algorithm. It takes the following parameters:

- `data []byte`: the data to encrypt.
- `auth []byte`: ## Key Decryption Functions

The `DecryptDataV3` function decrypts the encrypted data of a version 3 key using the provided authentication string. It first checks if the cipher used is supported, then decodes the MAC, initialization vector (IV), and cipher text from the `CryptoJSON` object. It then derives the key using the `getKDFKey` function and checks if the calculated MAC matches the decoded MAC. Finally, it decrypts the cipher text using the derived key and IV and returns the plain text.

The `decryptKeyV3` function decrypts the encrypted data of a version 3 key using the provided authentication string and returns the plain text key bytes and key ID. It first checks if the version of the key is supported and parses the key ID. It then calls the `DecryptDataV3` function to decrypt the key and returns the plain text key bytes and key ID.

The `decryptKeyV1` function decrypts the encrypted data of a version 1 key using the provided authentication string and returns the plain text key bytes and key ID. It parses the key ID and decodes the MAC, IV, and cipher text from the `CryptoJSON` object. It then derives the key using the `getKDFKey` function and checks if the calculated MAC matches the decoded MAC. Finally, it decrypts the cipher text using the derived key and IV and returns the plain text key bytes and key ID.

The `getKDFKey` function derives the key using the key derivation function (KDF) specified in the `CryptoJSON` object and the provided authentication string. It first decodes the salt from the `KDFParams` field and ensures that the `dklen` field is an integer. If the KDF is `scrypt`, it decodes the `n`, `r`, and `p` parameters and returns the derived key using the `scrypt.Key` function. If the KDF is `pbkdf2`, it decodes the `c` parameter and checks