# Smart Card Wallet

The `scwallet` package provides a Go implementation of a smart card wallet. It allows users to store their Ethereum private keys on a smart card and use them to sign transactions. The package uses the `go-libpcsclite` library to communicate with the smart card.

## Variables

- `ErrPairingPasswordNeeded`: an error variable that is returned if opening the smart card requires pairing with a pairing password.
- `ErrPINNeeded`: an error variable that is returned if opening the smart card requires a PIN code.
- `ErrPINUnblockNeeded`: an error variable that is returned if opening the smart card requires a PIN code, but all PIN attempts have already been exhausted.
- `ErrAlreadyOpen`: an error variable that is returned if the smart card is attempted to be opened, but there is already a paired and unlocked session.
- `ErrPubkeyMismatch`: an error variable that is returned if the public key recovered from a signature does not match the one expected by the user.
- `appletAID`: a byte slice representing the Application Identifier (AID) of the smart card applet.

## Constants

- `claISO7816`: the Class byte for ISO 7816-4 commands.
- `claSCWallet`: the Class byte for SCWallet-specific commands.
- `insSelect`: the INS byte for the SELECT command.
- `insGetResponse`: the INS byte for the GET RESPONSE command.
- `sw1GetResponse`: the SW1 byte for the GET RESPONSE command.
- `sw1Ok`: the SW1 byte for a successful command execution.
- `insVerifyPin`: the INS byte for the VERIFY PIN command.
- `insUnblockPin`: the INS byte for the UNBLOCK PIN command.
- `insExportKey`: the INS byte for the EXPORT KEY command.
- `insSign`: the INS byte for the SIGN command.
- `insLoadKey`: the INS byte for the LOAD KEY command.
- `insDeriveKey`: the INS byte for the DERIVE KEY command.
- `insStatus`: the INS byte for the STATUS command.
- `P1DeriveKeyFromMaster`: the P1 byte for the DERIVE KEY command when deriving a key from the master key.
- `P1DeriveKeyFromParent`: the P1 byte for the DERIVE KEY command when deriving a key from a parent key.
- `P1DeriveKeyFromCurrent`: the P1 byte for the DERIVE KEY command when deriving a key from the current key.
- `statusP1WalletStatus`: the P1 byte for the STATUS command when requesting the wallet status.
- `statusP1Path`: the P1 byte for the STATUS command when requesting the current derivation path.
- `signP1PrecomputedHash`: the P1 byte for the SIGN command when using a precomputed hash.
- `signP2OnlyBlock`: the P2 byte for the SIGN command when signing only the block hash.
- `exportP1Any`: the P1 byte for the EXPORT KEY command when exporting any key.
- `exportP2Pubkey`: the P2 byte for the EXPORT KEY command when exporting the public key.

## Functions

### NewSmartCardWallet

`NewSmartCardWallet` creates a new instance of a smart card wallet. It takes in a `pcsc.Context` and a `string` as parameters and returns a pointer to a new `SmartCardWallet`. The `string` parameter is the name of the smart card reader to use.

### Open

`Open` opens a session with the smart card. It takes in a `context.Context` as a parameter and returns an error.

### Close

`Close` closes the session with the smart card. It takes in a `context.Context` as a parameter and returns an error.

### IsOpen

`IsOpen` returns a boolean indicating whether a session with the smart card is currently open.

### Pair

`Pair` pairs the smart card with a pairing password. It takes in a `context.Context` and a `string` as parameters and returns an error. The `string` parameter is the pairing password.

### VerifyPIN

`VerifyPIN` verifies the PIN code of the smart card. It takes in a `context.Context` and a `string` as parameters and returns an error. The `string` parameter is the PIN code.

### UnblockPIN

`UnblockPIN` unblocks the PIN code of the smart card. It takes in a `context.Context`, a `string`, and a `string` as parameters and returns an error. The first `string` parameter is the PUK code, and the second `string` parameter is the new PIN code.

### ExportPublicKey ## Wallet

`Wallet` is a struct that represents a smartcard wallet instance. It contains fields for the wallet's public key, a handle to the Hub that instantiated the wallet, a lock to gate access to struct fields and communication with the card, a handle to the smartcard interface for the wallet, a secure communication session with the card, a contextual logger to tag the base with its id, next derivation paths for account auto-discovery (multiple bases supported), next derived account addresses for auto-discovery (multiple bases supported), a blockchain state reader to discover used account with, a channel to request a self-derivation on, and a channel to terminate the self-deriver with.

### Variables

- `ling`: a constant variable that represents one second.

### Functions

#### NewWallet

`NewWallet` constructs and returns a new Wallet instance. It takes in a `*Hub` and a `*pcsc.Card` as parameters and returns a pointer to a new `Wallet`.

#### transmit

`transmit` sends an APDU to the smartcard and receives and decodes the response. It automatically handles requests by the card to fetch the return data separately, and returns an error if the response status code is not success. It takes in a `*pcsc.Card` and a `*commandAPDU` as parameters and returns a pointer to a new `responseAPDU` and an error.

#### connect

`connect` connects to the wallet application and establishes a secure channel with it. It must be called before any other interaction with the wallet. It takes no parameters and returns an error.

#### doselect

`doselect` is an internal (unlocked) function to send a SELECT APDU to the card. It takes no parameters and returns a pointer to a new `applicationInfo` and an error.

#### ping

`ping` checks the card's status and returns an error if unsuccessful. It takes no parameters and returns an error. ## Wallet

`Wallet` is a struct that represents a hardware wallet. It implements the `accounts.Wallet` interface and provides methods for pairing, unpairing, and opening a connection to the wallet.

### Variables

- `ErrAlreadyOpen`: an error variable that is returned when attempting to open an already open wallet.

### Functions

#### Ping

`Ping` pings the wallet to check if it is still available. It takes no parameters and returns an error.

#### Release

`Release` releases any resources held by an open wallet instance. It takes no parameters and returns an error.

#### Pair

`Pair` establishes a new pairing with the wallet. It takes in a byte slice representing the pairing key and returns an error.

#### Unpair

`Unpair` deletes an existing wallet pairing. It takes in a byte slice representing the PIN code and returns an error.

#### URL

`URL` retrieves the canonical path under which this wallet is reachable. It is used by upper layers to define a sorting order over all wallets from multiple backends. It takes no parameters and returns an `accounts.URL`.

#### Status

`Status` returns a textual status to aid the user in the current state of the wallet. It also returns an error indicating any failure the wallet might have encountered. It takes no parameters and returns a string and an error.

#### Open

`Open` initializes access to a wallet instance. It is not meant to unlock or decrypt account keys, rather simply to establish a connection to hardware wallets and/or to access derivation seeds. The passphrase parameter may or may not be used by the implementation of a particular wallet instance. The reason there is no passwordless open method is to strive towards a uniform wallet handling, oblivious to the different backend providers. Please note, if you open a wallet, you must close it to release any allocated resources (especially important when working with hardware wallets). It takes in a string representing the passphrase and returns an error. ## Wallet

`Wallet` is a struct that represents a smart card wallet. It implements the `accounts.Wallet` interface and provides methods for pairing, unlocking, and deriving accounts from a smart card.

### Variables

- `ErrPairingPasswordNeeded`: an error variable that is returned when a pairing password is needed.
- `ErrPINNeeded`: an error variable that is returned when a PIN is needed.
- `ErrPINUnblockNeeded`: an error variable that is returned when a PIN needs to be unblocked.

### Functions

#### NewWallet

`NewWallet` creates a new smart card wallet. It takes in a `hub *Hub`, a `path accounts.DerivationPath`, and a `chain *core.BlockChain` as parameters and returns a pointer to a new `Wallet`.

#### Open

`Open` opens the smart card wallet and pairs it with the user's PIN or PUK. It takes in a `context.Context` and a `string` as parameters and returns an error.

#### Close

`Close` stops and closes the wallet, freeing any resources. It takes no parameters and returns an error.

#### selfDerive

`selfDerive` is an account derivation loop that upon request attempts to find new non-zero accounts. It takes no parameters and returns nothing.

#### derive

`derive` derives the next batch of accounts from the smart card. It takes in a `context.Context` as a parameter and returns a slice of `accounts.Account` and an error.

#### SignData

`SignData` signs the given data with the private key associated with the given address. It takes in a `context.Context`, an `common.Address`, and a byte slice as parameters and returns a byte slice and an error.

#### SignText

`SignText` signs the given text with the private key associated with the given address. It takes in a `context.Context`, an `common.Address`, and a string as parameters and returns a byte slice and an error.

#### SignTx

`SignTx` signs the given transaction with the private key associated with the given address. It takes in a `context.Context`, an `common.Address`, and a `*types.Transaction` as parameters and returns a `*types.Transaction` and an error.

#### Accounts

`Accounts` returns a slice of all accounts derived from the smart card. It takes in a `context.Context` as a parameter and returns a slice of `accounts.Account` and an error.

#### Contains

`Contains` returns whether the given address is derived from the smart card. It takes in an `common.Address` as a parameter and returns a boolean.

#### Derive

`Derive` derives the next batch of accounts from the smart card. It takes in a `context.Context` and an `uint32` as parameters and returns a slice of `accounts.Account` and an error.

#### DerivationPath

`DerivationPath` returns the derivation path of the smart card. It takes no parameters and returns an `accounts.DerivationPath`.

#### SignDataWithPassphrase

`SignDataWithPassphrase` signs the given data with the private key associated with the given address and passphrase. It takes in a `context.Context`, an `common.Address`, a byte slice, and a string as parameters and returns a byte slice and an error.

#### SignTextWithPassphrase

`SignTextWithPassphrase` signs the given text with the private key associated with the given address and passphrase. It takes in a `context.Context`, an `common.Address`, a string, and a string as parameters and returns a byte slice and an error.

#### SignTxWithPassphrase

`SignTxWithPassphrase` signs the given transaction with the private key associated with the given address and passphrase. It takes in a `context.Context`, an `common.Address`, a `*types.Transaction`, and a string as parameters and returns a `*types.Transaction` and an error. ## Function: Derive

The `Derive` function is used to derive new accounts from a smartcard wallet. It takes in a `context.Context` and a `bool` as parameters and returns an error. The `bool` parameter is used to indicate whether or not to force a self-derivation of new accounts.

The function first checks if self-derivation is already running, and if so, it waits for it to complete. It then acquires a lock on the wallet and retrieves the current pairing information from the hub. It then derives the next set of accounts from the smartcard using the `derive` function of the session. It then checks the status of each derived account against the current chain state, and if the account is empty, it stops self-derivation for that account. If the account is not empty, it adds it to the list of derived accounts and logs a message to the user. If there are new accounts, it writes them out to the hub. Finally, it releases the lock on the wallet and notifies the user of termination.

If there is an error during the derivation process, the function waits for termination and returns the error.

## Function: Accounts

The `Accounts` function retrieves the list of signing accounts that the wallet is currently aware of. For hierarchical deterministic wallets, the list will not be exhaustive, rather only contain the accounts explicitly pinned during account derivation. It takes no parameters and returns a slice of `accounts.Account`.

The function first attempts self-derivation if it is running. It then acquires a lock on the wallet and retrieves the current pairing information from the hub. It then creates a slice of `accounts.Account` from the pairing information and sorts it by URL. Finally, it releases the lock on the wallet and returns the slice of `accounts.Account`. If there is no pairing information, it returns `nil`. ## Wallet

`Wallet` is a struct that represents a collection of accounts and provides methods for managing them. It implements the `accounts.Wallet` interface.

### Variables

- `lock`: a mutex used to synchronize access to the wallet.
- `session`: a `Session` instance used to manage the wallet's accounts.
- `Hub`: a `accounts.Wallet` instance used to manage the wallet's pairing information.
- `deriveNextPaths`: a slice of `accounts.DerivationPath` instances used to store the next paths to derive accounts from.
- `deriveNextAddrs`: a slice of `common.Address` instances used to store the next addresses to derive accounts from.
- `deriveChain`: an `ethereum.ChainStateReader` instance used to read the current state of the blockchain.

### Functions

#### NewWallet

`NewWallet` creates a new wallet instance with the given session and hub instances. It takes in a `Session` and a `accounts.Wallet` as parameters and returns a pointer to a new `Wallet`.

#### Accounts

`Accounts` returns a list of all accounts in the wallet. It takes in a `context.Context` as a parameter and returns a slice of `accounts.Account` instances and an error.

#### Find

`Find` returns the account with the given address. It takes in a `context.Context` and an `common.Address` as parameters and returns an `accounts.Account` instance and a boolean indicating whether the account was found or not.

#### SignDataWithPassphrase

`SignDataWithPassphrase` requests the wallet to sign the hash of the given data with the given passphrase. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. It takes in a `context.Context`, an `accounts.Account`, a `string`, and a byte slice as parameters and returns a byte slice and an error.

#### SignTxWithPassphrase

`SignTxWithPassphrase` requests the wallet to sign the given transaction with the given passphrase. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. It takes in a `context.Context`, an `accounts.Account`, a `*types.Transaction`, and a `string` as parameters and returns a `*types.Transaction` and an error.

#### SignData

`SignData` requests the wallet to sign the hash of the given data. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. If the wallet requires additional authentication to sign the request, an `AuthNeededError` instance will be returned. It takes in an `accounts.Account`, a `string`, and a byte slice as parameters and returns a byte slice and an error.

#### SignTx

`SignTx` requests the wallet to sign the given transaction. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. If the wallet requires additional authentication to sign the request, an `AuthNeededError` instance will be returned. It takes in an `accounts.Account` and a `*types.Transaction` as parameters and returns a `*types.Transaction` and an error.

#### Contains

`Contains` returns whether an account is part of this particular wallet or not. It takes in an `accounts.Account` as a parameter and returns a boolean.

#### Initialize

`Initialize` installs a keypair generated from the provided key into the wallet. It takes in a byte slice as a parameter and returns an error.

#### Derive

`Derive` attempts to explicitly derive a hierarchical deterministic account at the specified derivation path. If requested, the derived account will be added to the wallet's tracked account list. It takes in an `accounts.DerivationPath` and a boolean as parameters and returns an `accounts.Account` instance and an error.

#### SelfDerive

`SelfDerive` sets a base account derivation path from which the wallet attempts to discover non-zero accounts and automatically add them to the list of tracked accounts. It takes in a slice of `accounts.DerivationPath` instances and an `ethereum.ChainStateReader` as parameters.

#### signHash

`signHash` requests the wallet to sign the given hash. It looks up the account specified either solely via its address contained within, or optionally with the aid of any location metadata from the embedded URL field. It takes in an `accounts.Account` and a byte slice as parameters and returns a byte slice and an error. ## Wallet

`Wallet` is a struct that represents an Ethereum account wallet. It implements the `accounts.Wallet` interface and provides methods for managing accounts, signing transactions, and signing data.

### Variables

- `ErrUnknownAccount`: an error variable that is returned when attempting to access an account that does not exist in the wallet.

### Functions

#### NewWallet

`NewWallet` creates a new wallet instance with the given keystore directory and passphrase callback function. It takes in a `string` and a `func() ([]byte, error)` as parameters and returns a pointer to a new `Wallet`.

#### Accounts

`Accounts` returns a list of all accounts in the wallet. It takes in a `context.Context` as a parameter and returns a slice of `accounts.Account` and an error.

#### Contains

`Contains` checks if the wallet contains the specified account. It takes in an `accounts.Account` as a parameter and returns a `bool`.

#### SignTx

`SignTx` signs a transaction with the specified account and chain ID. It takes in an `accounts.Account`, a `*types.Transaction`, and a `*big.Int` as parameters and returns a `*types.Transaction` and an error.

#### SignDataWithPassphrase

`SignDataWithPassphrase` signs the given hash with the given passphrase as extra authentication information. It takes in an `accounts.Account`, a `string`, a `string`, and a byte slice as parameters and returns a byte slice and an error.

#### signHashWithPassphrase

`signHashWithPassphrase` signs the given hash with the given passphrase as extra authentication information. It takes in an `accounts.Account`, a `string`, and a byte slice as parameters and returns a byte slice and an error.

#### SignText

`SignText` signs the hash of a given piece of data, prefixed by the Ethereum prefix scheme. It takes in an `accounts.Account` and a byte slice as parameters and returns a byte slice and an error.

#### SignTextWithPassphrase

`SignTextWithPassphrase` signs the given hash with the given account using passphrase as extra authentication. It takes in an `accounts.Account`, a `string`, and a byte slice as parameters and returns a byte slice and an error.

#### SignTxWithPassphrase

`SignTxWithPassphrase` signs the given transaction with the given passphrase as extra authentication information. It takes in an `accounts.Account`, a `string`, a `*types.Transaction`, and a `*big.Int` as parameters and returns a `*types.Transaction` and an error.

#### findAccountPath

`findAccountPath` returns the derivation path for the provided account. It first checks for the address in the list of pinned accounts, and if it is not found, attempts to parse the derivation path from the account's URL. It takes in an `accounts.Account` as a parameter and returns an `accounts.DerivationPath` and an error. ## Wallet

`Wallet` is a struct that represents a smartcard wallet. It contains a `card` field of type `pcsc.Card`, a `PublicKey` field of type `[]byte`, and a `Hub` field of type `*Hub`.

### Functions

#### NewWallet

`NewWallet` creates a new smartcard wallet with the given `pcsc.Card` and `*Hub`. It takes in a `pcsc.Card` and a `*Hub` as parameters and returns a pointer to a new `Wallet`.

#### OpenSession

`OpenSession` opens a new secured communication session with the wallet. It takes in a `[]byte` as a parameter and returns a pointer to a new `Session` and an error.

#### Close

`Close` closes the connection to the smartcard wallet. It takes in no parameters and returns an error.

#### Status

`Status` fetches the wallet's status from the card. It takes in no parameters and returns a pointer to a new `walletStatus` and an error.

#### DerivationPath

`DerivationPath` fetches the wallet's current derivation path from the card. It takes in no parameters and returns an `accounts.DerivationPath` and an error.

## Session

`Session` is a struct that represents a secured communication session with a smartcard wallet. It contains a `Wallet` field of type `*Wallet`, a `Channel` field of type `*SecureChannelSession`, and a `verified` field of type `bool`.

### Functions

#### pair

`pair` establishes a new pairing over this channel, using the provided secret. It takes in a `[]byte` as a parameter and returns a `smartcardPairing` and an error.

#### unpair

`unpair` deletes an existing pairing. It takes in no parameters and returns an error.

#### verifyPin

`verifyPin` unlocks a wallet with the provided pin. It takes in a `[]byte` as a parameter and returns an error.

#### unblockPin

`unblockPin` unblocks a wallet with the provided puk and resets the pin to the new one specified. It takes in a `[]byte` as a parameter and returns an error.

#### release

`release` releases resources associated with the channel. It takes in no parameters and returns an error.

#### paired

`paired` returns true if a valid pairing exists. It takes in no parameters and returns a `bool`.

#### authenticate

`authenticate` uses an existing pairing to establish a secure channel. It takes in a `smartcardPairing` as a parameter and returns an error.

#### walletStatus

`walletStatus` fetches the wallet's status from the card. It takes in no parameters and returns a pointer to a new `walletStatus` and an error.

#### derivationPath

`derivationPath` fetches the wallet's current derivation path from the card. It takes in no parameters and returns an `accounts.DerivationPath` and an error.

## walletStatus

`walletStatus` is a struct that describes a smartcard wallet's status information. It contains a `PinRetryCount` field of type `int`, a `PukRetryCount` field of type `int`, and an `Initialized` field of type `bool`.

## smartcardPairing

`smartcardPairing` is a struct that represents a pairing between a smartcard wallet and a device. It contains a `PublicKey` field of type `[]byte`, a `PairingIndex` field of type `byte`, a `PairingKey` field of type `[]byte`, and an `Accounts` field of type `map[common.Address]accounts.DerivationPath]`. ## Smartcard Wallet

The `smartcard` package provides an implementation of a smartcard wallet for use with Ethereum. It contains functions for initializing the card with new key data, deriving a new HD key path on the card, and exporting the public key for the current derivation path.

### Variables

- `claSCWallet`: the class byte for the smartcard wallet.
- `insLoadKey`: the instruction byte for loading a key onto the smartcard.
- `insDeriveKey`: the instruction byte for deriving a new HD key path on the smartcard.
- `insSign`: the instruction byte for signing data with the smartcard.
- `insExportKey`: the instruction byte for exporting a key from the smartcard.
- `P1DeriveKeyFromMaster`: the P1 byte for deriving a key from the master key.
- `P1DeriveKeyFromParent`: the P1 byte for deriving a key from the parent key.
- `P1DeriveKeyFromCurrent`: the P1 byte for deriving a key from the current key.
- `exportP1Any`: the P1 byte for exporting any key.
- `exportP2Pubkey`: the P2 byte for exporting the public key.

### Functions

#### initialize

`initialize` initializes the card with new key data. It takes in a `seed` byte slice as a parameter and returns an error.

#### derive

`derive` derives a new HD key path on the card. It takes in an `accounts.DerivationPath` as a parameter and returns an `accounts.Account` and an error.

#### publicKey

`publicKey` returns the public key for the current derivation path. It takes no parameters and returns a byte slice and an error.

### Structs

#### initializeData

`initializeData` contains data needed to initialize the smartcard wallet. It has three fields: `PublicKey`, `PrivateKey`, and `ChainCode`.

#### keyExport

`keyExport` contains information on an exported keypair. It has two fields: `PublicKey` and `PrivateKey`. ## Smartcard

The `Smartcard` package provides a way to interact with a smartcard for cryptographic operations. It contains functions for deriving keys, signing messages, and verifying signatures.

### Functions

#### derive

`derive` derives a key from the smartcard using the given derivation path. It takes in a `Session` and an `accounts.DerivationPath` as parameters and returns a `*ecdsa.PublicKey` and an error.

#### getPublicKey

`getPublicKey` retrieves the public key associated with the given derivation path from the smartcard. It takes in a `Session` and an `accounts.DerivationPath` as parameters and returns a `*ecdsa.PublicKey` and an error.

#### sign

`sign` asks the smartcard to sign a message and returns a valid signature after recovering the v value. It takes in a `Session`, an `accounts.DerivationPath`, and a byte slice as parameters and returns a byte slice and an error.

#### confirmPublicKey

`confirmPublicKey` confirms that the given signature belongs to the specified key. It takes in a byte slice and a byte slice as parameters and returns an error.

#### makeRecoverableSignature

`makeRecoverableSignature` uses a signature and an expected public key to recover the v value and produce a recoverable signature. It takes in three byte slices as parameters and returns a byte slice and an error.