## Keystore Wallet

The `keystoreWallet` struct implements the `accounts.Wallet` interface for the original keystore. It contains a single account and the keystore where the account originates from.

### URL

The `URL` method implements `accounts.Wallet`, returning the URL of the account within.

### Status

The `Status` method implements `accounts.Wallet`, returning whether the account held by the keystore wallet is unlocked or not.

### Open

The `Open` method implements `accounts.Wallet`, but is a noop for plain wallets since there is no connection or decryption step necessary to access the list of accounts.

### Close

The `Close` method implements `accounts.Wallet`, but is a noop for plain wallets since there is no meaningful open operation.

### Accounts

The `Accounts` method implements `accounts.Wallet`, returning an account list consisting of a single account that the plain keystore wallet contains.

### Contains

The `Contains` method implements `accounts.Wallet`, returning whether a particular account is or is not wrapped by this wallet instance.

### Derive

The `Derive` method implements `accounts.Wallet`, but is a noop for plain wallets since there is no notion of hierarchical account derivation for plain keystore accounts.

### SelfDerive

The `SelfDerive` method implements `accounts.Wallet`, but is a noop for plain wallets since there is no notion of hierarchical account derivation for plain keystore accounts.

### signHash

The `signHash` method attempts to sign the given hash with the given account. If the wallet does not wrap this particular account, an error is returned to avoid account leakage. ## Keystore Wallet

The `keystoreWallet` struct represents a wallet that is backed by a keystore. It implements the `accounts.Wallet` interface and provides methods for signing transactions and data.

### Methods

- `Contains(account accounts.Account) bool`: checks if the wallet contains the specified account.
- `SignHash(account accounts.Account, hash []byte) ([]byte, error)`: signs the specified hash with the specified account.
- `SignData(account accounts.Account, mimeType string, data []byte) ([]byte, error)`: signs the keccak256 hash of the specified data with the specified account.
- `SignDataWithPassphrase(account accounts.Account, passphrase, mimeType string, data []byte) ([]byte, error)`: signs the keccak256 hash of the specified data with the specified account using the specified passphrase for extra authentication.
- `SignText(account accounts.Account, text []byte) ([]byte, error)`: signs the hash of the specified text with the specified account.
- `SignTextWithPassphrase(account accounts.Account, passphrase string, text []byte) ([]byte, error)`: signs the hash of the specified text with the specified account using the specified passphrase for extra authentication.
- `SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs the specified transaction with the specified account.
- `SignTxWithPassphrase(account accounts.Account, passphrase string, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs the specified transaction with the specified account using the specified passphrase for extra authentication.