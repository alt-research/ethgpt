# Accounts Package

The `accounts` package provides a set of interfaces and implementations for managing accounts and wallets in Ethereum.

## Variables

- `ErrUnknownAccount`: This variable is returned for any requested operation for which no backend provides the specified account.
- `ErrUnknownWallet`: This variable is returned for any requested operation for which no backend provides the specified wallet.
- `ErrNotSupported`: This variable is returned when an operation is requested from an account backend that it does not support.
- `ErrInvalidPassphrase`: This variable is returned when a decryption operation receives a bad passphrase.
- `ErrWalletAlreadyOpen`: This variable is returned if a wallet is attempted to be opened the second time.
- `ErrWalletClosed`: This variable is returned if a wallet is offline.

## Types

- `AuthNeededError`: This type is returned by backends for signing requests where the user is required to provide further authentication before signing can succeed. This usually means either that a password needs to be supplied, or perhaps a one-time PIN code displayed by some hardware device.

## Functions

- `NewAuthNeededError(needed string) error`: This function creates a new authentication error with the extra details about the needed fields set.

## Methods

None.