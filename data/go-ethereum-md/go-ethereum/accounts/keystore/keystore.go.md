## Package Description

The `keystore` package provides encrypted storage of secp256k1 private keys. It implements the Web3 Secret Storage specification for storing keys as encrypted JSON files. The package also manages a key storage directory on disk.

## KeyStore

The `KeyStore` struct manages a key storage directory on disk. It has the following fields:

- `storage keyStore`: storage backend, might be cleartext or encrypted.
- `cache *accountCache`: in-memory account cache over the filesystem storage.
- `changes chan struct{}`: channel receiving change notifications from the cache.
- `unlocked map[common.Address]*unlocked`: currently unlocked account (decrypted private keys).
- `wallets []accounts.Wallet`: wallet wrappers around the individual key files.
- `updateFeed event.Feed`: event feed to notify wallet additions/removals.
- `updateScope event.SubscriptionScope`: subscription scope tracking current live listeners.
- `updating bool`: whether the event notification loop is running.
- `mu sync.RWMutex`: read-write mutex to protect the keystore.
- `importMu sync.Mutex`: import mutex locks the import to prevent two insertions from racing.

The `KeyStore` struct has the following methods:

- `NewKeyStore(keydir string, scryptN, scryptP int) *KeyStore`: creates a keystore for the given directory with the specified scryptN and scryptP parameters.
- `NewPlaintextKeyStore(keydir string) *KeyStore`: creates a keystore for the given directory with plaintext storage. Deprecated, use `NewKeyStore` instead.
- `init(keydir string)`: initializes the keystore with the given directory.
- `HasAddress(address common.Address) bool`: returns whether the keystore has an account with the given address.
- `Accounts() []accounts.Account`: returns a list of all accounts in the keystore.
- `URLDir() accounts.URL`: returns the URL of the keystore directory.
- `Subscribe(sink chan<- accounts.WalletEvent) event.Subscription`: subscribes to wallet events.
- `Open(account accounts.Account, password string) error`: unlocks the account with the given password.
- `Close(account accounts.Account) error`: locks the account.
- `SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs a transaction with the given account.
- `SignData(account accounts.Account, data []byte) ([]byte, error)`: signs data with the given account.
- `SignText(account accounts.Account, text []byte) ([]byte, error)`: signs text with the given account.
- `Export(account accounts.Account, newPassword string) ([]byte, error)`: exports the account with the given password.
- `Import(keyJSON []byte, newPassword string) (accounts.Account, error)`: imports an account with the given password.
- `Delete(account accounts.Account, password string) error`: deletes the account with the given password.
- `Update(account ## KeyStore

The `KeyStore` struct represents a collection of encrypted private keys stored on disk. It implements the `accounts.Backend` interface, which allows it to be used as a backend for the Ethereum accounts system.

- `mu sync.RWMutex`: a mutex to synchronize access to the keystore.
- `cache *accountCache`: an account cache that stores the encrypted private keys.
- `changes chan accounts.WalletEvent`: a channel that receives events when the account cache changes.
- `wallets []accounts.Wallet`: a list of single-key wallets derived from the account cache.
- `updateFeed event.Feed`: a feed that broadcasts wallet addition/removal events to subscribers.
- `updateScope event.SubscriptionScope`: a subscription scope that tracks subscribers to the update feed.
- `updating bool`: a flag indicating whether the wallet list is being updated.

### NewKeyStore

The `NewKeyStore` function creates a new `KeyStore` instance with the specified key directory and passphrase. It initializes the account cache and the list of wallets.

### Wallets

The `Wallets` method returns all single-key wallets derived from the account cache. It first calls `refreshWallets` to ensure that the list of wallets is up-to-date, then returns a copy of the list.

### refreshWallets

The `refreshWallets` method retrieves the current list of accounts from the account cache and updates the list of wallets accordingly. It fires wallet addition/removal events to subscribers via the update feed.

### Subscribe

The `Subscribe` method creates an async subscription to receive notifications on the addition or removal of keystore wallets. It subscribes the caller to the update feed and starts the notification loop if it is not already running.

### updater

The `updater` method is responsible for maintaining an up-to-date list of wallets stored in the keystore and firing wallet addition/removal events. It listens for account change events from the underlying account cache and periodically forces a manual refresh. It runs in a separate goroutine and is started by the `Subscribe` method. ## KeyStore

The `KeyStore` struct represents a collection of encrypted key files stored on disk. It provides methods for managing these keys, including adding, deleting, and unlocking them.

### updater()

The `updater()` method is a goroutine that periodically refreshes the wallets in the keystore. It waits for either an account update or a refresh timeout, then runs the `refreshWallets()` method. If there are no subscribers left, the updater stops.

### HasAddress()

The `HasAddress()` method reports whether a key with the given address is present in the keystore.

### Accounts()

The `Accounts()` method returns all key files present in the keystore directory.

### Delete()

The `Delete()` method deletes the key matched by account if the passphrase is correct. If the account contains no filename, the address must match a unique key. The key is dropped from the cache after the file is gone so that a reload happening in between won't insert it into the cache again.

### SignHash()

The `SignHash()` method calculates an ECDSA signature for the given hash using the private key of the requested account. The produced signature is in the [R || S || V] format where V is 0 or 1.

### SignTx()

The `SignTx()` method signs the given transaction with the requested account. Depending on the presence of the chain ID, it signs with 2718 or homestead.

### SignHashWithPassphrase()

The `SignHashWithPassphrase()` method signs the hash if the private key matching the given address can be decrypted with the given passphrase. The produced signature is in the [R || S || V] format where V is 0 or 1.

### SignTxWithPassphrase()

The `SignTxWithPassphrase()` method signs the transaction if the private key matching the given address can be decrypted with the given passphrase. Depending on the presence of the chain ID, it signs with or without replay protection.

### Unlock()

The `Unlock()` method unlocks the given account indefinitely. ## KeyStore

The `KeyStore` struct represents a collection of encrypted private keys. It provides methods for managing these keys, including unlocking and locking them, finding them, generating new keys, and exporting and importing them.

- `Unlock` unlocks the private key with the given address using the provided passphrase.
- `Lock` removes the private key with the given address from memory.
- `TimedUnlock` unlocks the given account with the passphrase for a specified duration. If the account is already unlocked, the timeout is extended or shortened as necessary.
- `Find` resolves the given account into a unique entry in the keystore.
- `getDecryptedKey` retrieves the decrypted key for the given account and passphrase.
- `expire` removes the unlocked key from memory after a specified timeout.
- `NewAccount` generates a new key and stores it into the key directory, encrypting it with the passphrase.
- `Export` exports the encrypted JSON key for the given account, encrypted with a new passphrase.
- `Import` stores the given encrypted JSON key into the key directory.

## unlocked

The `unlocked` struct represents an unlocked private key. It contains the private key and an abort channel used to terminate the `expire` goroutine.

## Key

The `Key` struct represents an encrypted private key. It contains the private key and the corresponding public key. ## KeyStore

The `KeyStore` struct represents a collection of encrypted keys stored on disk. It provides methods for importing, exporting, and managing accounts.

- `ImportKey` imports a key into the keystore and encrypts it with the given passphrase. It returns the imported account or an error if the account already exists or if there was an error storing the key.
- `ImportECDSA` imports an ECDSA private key into the keystore and encrypts it with the given passphrase. It returns the imported account or an error if the account already exists or if there was an error storing the key.
- `Update` changes the passphrase of an existing account. It returns an error if the account does not exist or if there was an error storing the updated key.
- `ImportPreSaleKey` decrypts an Ethereum presale wallet and stores a key file in the keystore. The key file is encrypted with the same passphrase. It returns the imported account or an error if there was an error importing the key.
- `isUpdating` returns whether the event notification loop is running. This method is mainly meant for tests.
- `zeroKey` zeroes a private key in memory.

## importKey

The `importKey` function imports a key into the keystore and encrypts it with the given passphrase. It returns the imported account or an error if the account already exists or if there was an error storing the key.

## zeroKey

The `zeroKey` function zeroes a private key in memory. It takes an `ecdsa.PrivateKey` pointer as input and sets all the bits of the private key to zero. This is a security measure to prevent the private key from being leaked from memory.