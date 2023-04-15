# Accounts Package

The `accounts` package provides high-level Ethereum account management. It contains the `Account` and `Wallet` types, which represent an Ethereum account and a software or hardware wallet that might contain one or more accounts, respectively.

## Account Type

The `Account` type represents an Ethereum account located at a specific location defined by the optional URL field. It has two fields:

- `Address`: Ethereum account address derived from the key.
- `URL`: Optional resource locator within a backend.

## Wallet Type

The `Wallet` type represents a software or hardware wallet that might contain one or more accounts (derived from the same seed). It has the following methods:

- `URL() URL`: Retrieves the canonical path under which this wallet is reachable.
- `Status() (string, error)`: Returns a textual status to aid the user in the current state of the wallet. It also returns an error indicating any failure the wallet might have encountered.
- `Open(passphrase string) error`: Initializes access to a wallet instance. It is not meant to unlock or decrypt account keys, rather simply to establish a connection to hardware wallets and/or to access derivation seeds. The passphrase parameter may or may not be used by the implementation of a particular wallet instance. The reason there is no passwordless open method is to strive towards a uniform wallet handling, oblivious to the different backend providers. Please note, if you open a wallet, you must close it to release any allocated resources (especially important when working with hardware wallets).
- `Close() error`: Releases any resources held by an open wallet instance.
- `Accounts() []Account`: Retrieves the list of signing accounts the wallet is currently aware of. For hierarchical deterministic wallets, the list will not be exhaustive, rather only contain the accounts explicitly pinned during account derivation.
- `Contains(account Account) bool`: Returns whether an account is part of this particular wallet or not.
- `Derive(path DerivationPath, pin bool) (Account, error)`: Attempts to explicitly derive a hierarchical deterministic account at the specified derivation path. If requested, the derived account will be added to the wallet's tracked account list.
- `SelfDerive(base DerivationPath, pin bool) error`: Sets a base account derivation path from which the wallet attempts to discover non-zero accounts and automatically add them to the list of tracked accounts.

## Constants

The `accounts` package also defines several constants:

- `MimetypeDataWithValidator`: The mimetype for data with a validator.
- `MimetypeTypedData`: The mimetype for typed data.
- `MimetypeClique`: The mimetype for Clique.
- `MimetypeTextPlain`: The mimetype for plain text. The following is a documentation for the functions in the source code:

`SelfDerive(bases []DerivationPath, chain ethereum.ChainStateReader)`: This function is used to derive accounts. It takes an array of derivation paths and a chain state reader as parameters. The function derives accounts starting from non-zero components. It supports providing multiple bases to discover old user accounts too. Only the last base will be used to derive the next empty account. You can disable automatic account discovery by calling SelfDerive with a nil chain state reader.

`SignData(account Account, mimeType string, data []byte) ([]byte, error)`: This function requests the wallet to sign the hash of the given data. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. If the wallet requires additional authentication to sign the request (e.g. a password to decrypt the account, or a PIN code to verify the transaction), an AuthNeededError instance will be returned, containing infos for the user about which fields or actions are needed. The user may retry by providing the needed details via SignDataWithPassphrase, or by other means (e.g. unlock the account in a keystore).

`SignDataWithPassphrase(account Account, passphrase, mimeType string, data []byte) ([]byte, error)`: This function is identical to SignData, but also takes a password. There's a chance that an erroneous call might mistake the two strings, and supply password in the mimetype field, or vice versa. Thus, an implementation should never echo the mimetype or return the mimetype in the error-response.

`SignText(account Account, text []byte) ([]byte, error)`: This function requests the wallet to sign the hash of a given piece of data, prefixed by the Ethereum prefix scheme. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. If the wallet requires additional authentication to sign the request (e.g. a password to decrypt the account, or a PIN code to verify the transaction), an AuthNeededError instance will be returned, containing infos for the user about which fields or actions are needed. The user may retry by providing the needed details via SignTextWithPassphrase, or by other means (e.g. unlock the account in a keystore). This method should return the signature in 'canonical' format, with v 0 or 1.

`SignTextWithPassphrase(account Account, passphrase string, hash []byte) ([]byte, error)`: This function is identical to SignText, but also takes a password.

`SignTx(account Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: This function requests the wallet to sign the given transaction. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. If the wallet requires additional authentication to sign the request (e.g. a password to decrypt the account, or a PIN code to verify the transaction), an AuthNeededError instance will be returned, containing infos for the user about which fields or actions are needed. The user may retry by providing the needed details via SignTxWithPassphrase, or by other means (e.g. unlock the account in a keystore).

`SignTxWithPassphrase(account Account, passphrase string, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: This function is identical to SignTx, but also takes a password. ## Function: SignTx(account Account, passphrase string, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)

This function takes in an `account` of type `Account`, a `passphrase` of type `string`, a `tx` of type `*types.Transaction`, and a `chainID` of type `*big.Int`. It returns a signed transaction of type `*types.Transaction` and an error of type `error`.

The function signs the transaction using the provided account and passphrase. It then sets the chain ID of the transaction and returns the signed transaction.

## Interface: Backend

The `Backend` interface represents a "wallet provider" that contains a batch of accounts that can sign transactions upon request. It has the following methods:

### Wallets() []Wallet

This method retrieves the list of wallets that the backend is currently aware of. The returned wallets are not opened by default. For software HD wallets, this means that no base seeds are decrypted, and for hardware wallets, no actual connection is established. The resulting wallet list will be sorted alphabetically based on its internal URL assigned by the backend. Since wallets (especially hardware) may come and go, the same wallet might appear at a different position in the list during subsequent retrievals.

### Subscribe(sink chan<- WalletEvent) event.Subscription

This method creates an asynchronous subscription to receive notifications when the backend detects the arrival or departure of a wallet.

## Function: TextHash(data []byte) []byte

This function takes in a `data` of type `[]byte`. It returns a hash of type `[]byte` that can be safely used to calculate a signature from.

The hash is calculated as `keccak256("\x19Ethereum Signed Message:\n"${message length}${message}).` This gives context to the signed message and prevents signing of transactions.

## Function: TextAndHash(data []byte) ([]byte, string)

This function takes in a `data` of type `[]byte`. It returns a hash of type `[]byte` and a message of type `string` that can be safely used to calculate a signature from.

The hash is calculated as `keccak256("\x19Ethereum Signed Message:\n"${message length}${message}).` This gives context to the signed message and prevents signing of transactions.

## Type: WalletEventType

The `WalletEventType` type represents the different event types that can be fired by the wallet subscription subsystem. It has the following constants:

### WalletArrived

`WalletArrived` is fired when a new wallet is detected either via USB or via a filesystem event in the keystore.

### WalletOpened

`WalletOpened` is fired when a wallet is successfully opened with the purpose of starting any background processes such as automatic key derivation.

### WalletDropped

`WalletDropped` is fired when a wallet is dropped from the backend.

## Type: WalletEvent

The `WalletEvent` type is an event fired by an account backend when a wallet arrival or departure is detected. It has the following fields:

### Wallet

`Wallet` is a wallet instance that arrived or departed.

### Kind

`Kind` is an event type that happened in the system. It is of type `WalletEventType`.