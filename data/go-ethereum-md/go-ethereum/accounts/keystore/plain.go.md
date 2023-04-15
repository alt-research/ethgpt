## KeyStorePlain

The `keyStorePlain` struct implements the `KeyStore` interface for a plain-text key store. It has a single field:

- `keysDirPath string`: the path to the directory where the key files are stored.

### GetKey

The `GetKey` method retrieves a key from the plain-text key store. It takes the following parameters:

- `addr common.Address`: the address of the key to retrieve.
- `filename string`: the name of the file containing the key.
- `auth string`: the passphrase used to decrypt the key.

It returns a pointer to a `Key` struct and an error. If the key is successfully retrieved, the `Key` struct contains the key data. If the key is not found or there is an error retrieving it, an error is returned.

### StoreKey

The `StoreKey` method stores a key in the plain-text key store. It takes the following parameters:

- `filename string`: the name of the file to store the key in.
- `key *Key`: a pointer to the `Key` struct containing the key data.
- `auth string`: the passphrase used to encrypt the key.

It returns an error if there is a problem storing the key.

### JoinPath

The `JoinPath` method joins a filename with the path to the directory where the key files are stored. It takes a single parameter:

- `filename string`: the name of the file to join with the directory path.

It returns the full path to the file. If the filename is already an absolute path, it is returned unchanged. Otherwise, the directory path is prepended to the filename to create an absolute path.