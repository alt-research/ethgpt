# External Backend

The `ExternalBackend` struct is used to provide an interface to interact with an external signer (clef). It contains a slice of `accounts.Wallet` which is used to store the signer's wallets.

## Variables

- `signers`: a slice of `accounts.Wallet` which is used to store the signer's wallets.

## Functions

### Wallets

`Wallets` returns the slice of `accounts.Wallet` which is used to store the signer's wallets.

### NewExternalBackend

`NewExternalBackend` creates a new `ExternalBackend` instance. It takes in an endpoint string as a parameter and returns a pointer to a new `ExternalBackend` and an error.

### Subscribe

`Subscribe` subscribes to wallet events. It takes in a channel of `accounts.WalletEvent` as a parameter and returns an `event.Subscription`.

# External Signer

The `ExternalSigner` struct is used to provide an API to interact with an external signer (clef). It proxies request to the external signer while forwarding relevant request headers.

## Variables

- `client`: a pointer to an `rpc.Client` which is used to communicate with the external signer.
- `endpoint`: a string representing the endpoint of the external signer.
- `status`: a string representing the status of the external signer.
- `cacheMu`: a `sync.RWMutex` used to synchronize access to the cache.
- `cache`: a slice of `accounts.Account` which is used to store the signer's accounts.

## Functions

### NewExternalSigner

`NewExternalSigner` creates a new `ExternalSigner` instance. It takes in an endpoint string as a parameter and returns a pointer to a new `ExternalSigner` and an error.

### URL

`URL` returns the `accounts.URL` of the external signer.

### Status

`Status` returns the status of the external signer.

### Open

`Open` is not supported on external signers.

### Close

`Close` is not supported on external signers.

### Accounts

`Accounts` returns a slice of `accounts.Account` which is used to store the signer's accounts.

### Contains

`Contains` checks if the given account is present in the signer's accounts.

### SignTx

`SignTx` signs a transaction using the external signer. It takes in a `accounts.Account`, a `*types.Transaction`, and a `*big.Int` as parameters and returns a `*types.Transaction` and an error.

### SignData

`SignData` signs data using the external signer. It takes in a `accounts.Account`, a byte slice, and a `hexutil.Uint64` as parameters and returns a byte slice and an error.

### SignText

`SignText` signs text using the external signer. It takes in a `accounts.Account`, a string, and a `hexutil.Uint64` as parameters and returns a byte slice and an error.

### pingVersion

`pingVersion` pings the external signer and returns its version.

### listAccounts

`listAccounts` lists the accounts of the external signer. ## Documentation for ExternalSigner API

### `api.cache`

This function checks if the given account address matches the current account address and URL. If it does, it returns `true`, otherwise it returns `false`.

### `api.Derive(path accounts.DerivationPath, pin bool) (accounts.Account, error)`

This function returns an error because it is not supported on external signers.

### `api.SelfDerive(bases []accounts.DerivationPath, chain ethereum.ChainStateReader)`

This function logs an error because it is not supported on external signers.

### `api.SignData(account accounts.Account, mimeType string, data []byte) ([]byte, error)`

This function signs the keccak256 hash of the given data using the external signer. It takes in an `accounts.Account`, a `string` representing the MIME type of the data, and a `[]byte` representing the data to be signed. It returns a `[]byte` representing the signature and an error.

### `api.SignText(account accounts.Account, text []byte) ([]byte, error)`

This function signs the given text using the external signer. It takes in an `accounts.Account` and a `[]byte` representing the text to be signed. It returns a `[]byte` representing the signature and an error.

### `api.SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`

This function sends the given transaction to the external signer to be signed. It takes in an `accounts.Account`, a `*types.Transaction` representing the transaction to be signed, and a `*big.Int` representing the chain ID. If the chain ID is nil or the transaction's chain ID is zero, the external signer will assign a chain ID. For non-legacy transactions, the chain ID of the transaction overrides the chain ID parameter. It returns a `*types.Transaction` representing the signed transaction and an error.

### `signTransactionResult`

This struct represents the signing result returned by the external signer. It contains a `hexutil.Bytes` representing the raw signature and a `*types.Transaction` representing the signed transaction. ## ExternalSigner

`ExternalSigner` is a struct that represents an external signer for Ethereum transactions. It contains a `*rpc.Client` for communicating with the external signer.

### Functions

#### SignTx

`SignTx` signs a transaction using the external signer. It takes in an `accounts.Account`, a `*types.Transaction`, and a `*big.Int` as parameters and returns a `*types.Transaction` and an error.

#### SignTextWithPassphrase

`SignTextWithPassphrase` signs a text message using a passphrase. This function is not supported on external signers and will always return an error.

#### SignTxWithPassphrase

`SignTxWithPassphrase` signs a transaction using a passphrase. This function is not supported on external signers and will always return an error.

#### SignDataWithPassphrase

`SignDataWithPassphrase` signs arbitrary data using a passphrase. This function is not supported on external signers and will always return an error.

#### listAccounts

`listAccounts` lists the accounts available on the external signer. It takes no parameters and returns a slice of `common.Address` and an error.

#### pingVersion

`pingVersion` pings the external signer for its version. It takes no parameters and returns a string and an error.