# USB Hardware Wallet

The `usbwallet` package implements support for USB hardware wallets. It defines the `driver` and `wallet` interfaces and types.

## Driver

The `driver` interface defines the vendor-specific functionality that hardware wallets instances must implement to allow using them with the wallet lifecycle management. It has the following methods:

- `Status() (string, error)`: returns a textual status to aid the user in the current state of the wallet. It also returns an error indicating any failure the wallet might have encountered.
- `Open(device io.ReadWriter, passphrase string) error`: initializes access to a wallet instance. The `passphrase` parameter may or may not be used by the implementation of a particular wallet instance.
- `Close() error`: releases any resources held by an open wallet instance.
- `Heartbeat() error`: performs a sanity check against the hardware wallet to see if it is still online and healthy.
- `Derive(path accounts.DerivationPath) (common.Address, error)`: sends a derivation request to the USB device and returns the Ethereum address located on that path.
- `SignTx(path accounts.DerivationPath, tx *types.Transaction, chainID *big.Int) (common.Address, *types.Transaction, error)`: sends the transaction to the USB device and waits for the user to confirm or deny the transaction.
- `SignTypedMessage(path accounts.DerivationPath, messageHash []byte, domainHash []byte) ([]byte, error)`: sends the typed message to the USB device and waits for the user to confirm or deny the message.

## Wallet

The `wallet` struct represents the common functionality shared by all USB hardware wallets to prevent reimplementing the same complex maintenance mechanisms for different vendors. It has the following fields:

- `hub *Hub`: USB hub scanning.
- `driver driver`: hardware implementation of the low-level device operations.
- `url *accounts.URL`: textual URL uniquely identifying this wallet.
- `info usb.DeviceInfo`: known USB device infos about the wallet.
- `device usb.Device`: USB device advertising itself as a hardware wallet.
- `accounts []accounts.Account`: list of derive accounts pinned on the hardware wallet.
- `paths map[common.Address]accounts.DerivationPath`: known derivation paths for signing operations.
- `deriveNextPaths []accounts.DerivationPath`: next derivation paths for account auto-discovery (multiple bases supported).
- `deriveNextAddrs []common.Address # Hardware Wallet

The `Hardware Wallet` package provides a USB hardware wallet implementation of the `accounts.Wallet` interface. The `wallet` struct is the main component of the package, and it is responsible for managing the hardware wallet.

## Wallet

The `wallet` struct is the main component of the package. It is responsible for managing the hardware wallet. The `wallet` struct has the following fields:

- `info *DeviceInfo`: the device information of the hardware wallet.
- `driver Driver`: the driver of the hardware wallet.
- `url *accounts.URL`: the URL of the USB hardware device.
- `device Device`: the USB device of the hardware wallet.
- `paths map[common.Address]accounts.DerivationPath`: the next derived account addresses for auto-discovery (multiple bases supported).
- `deriveChain ethereum.ChainStateReader`: the blockchain state reader to discover used account with.
- `deriveReq chan chan struct{}`: the channel to request a self-derivation on.
- `deriveQuit chan chan error`: the channel to terminate the self-deriver with.
- `healthQuit chan chan error`: the channel to terminate the heartbeat with.
- `commsLock chan struct{}`: the mutex (buf=1) for the USB comms without keeping the state locked.
- `stateLock sync.RWMutex`: the read-write mutex for synchronizing access to the wallet struct fields.
- `log log.Logger`: the contextual logger to tag the base with its id.

The `wallet` struct has the following methods:

- `URL() accounts.URL`: implements `accounts.Wallet`, returning the URL of the USB hardware device.
- `Status() (string, error)`: implements `accounts.Wallet`, returning a custom status message from the underlying vendor-specific hardware wallet implementation.
- `Open(passphrase string) error`: implements `accounts.Wallet`, attempting to open a USB connection to the hardware wallet.
- `Close() error`: implements `accounts.Wallet`, closing the USB connection to the hardware wallet.
- `Accounts() []accounts.Account`: implements `accounts.Wallet`, returning a list of accounts managed by the # USB Wallet

The `usbwallet` package provides a USB hardware wallet implementation of the `accounts.Wallet` interface. The `wallet` struct is the main component of the package, and it is responsible for managing the USB connection and the accounts.

## Wallet

The `wallet` struct is the main component of the package. It is responsible for managing the USB connection and the accounts. The `wallet` struct has the following fields:

- `driver *usb.Driver`: the USB driver for the wallet.
- `device usb.Device`: the USB device for the wallet.
- `accounts []accounts.Account`: the list of accounts pinned to the USB hardware wallet.
- `paths map[common.Address]usb.Path`: the map of account addresses to their corresponding USB paths.
- `healthQuit chan chan error`: a channel for terminating the health check loop.
- `deriveQuit chan chan error`: a channel for terminating the self-derivation loop.
- `deriveReq chan chan struct{}`: a channel for requesting self-derivation.
- `commsLock chan struct{}`: a channel for synchronizing access to the USB device.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the wallet's fields.
- `log log.Logger`: a logger for the wallet.

The `wallet` struct has the following methods:

- `Open(passphrase string) error`: opens the USB connection to the device and initializes the wallet.
- `heartbeat()`: a health check loop for the USB wallets to periodically verify whether they are still # USB Wallet

The `USB wallet` package provides a USB hardware wallet implementation for the `go-ethereum` library. The `USBWallet` struct is the main component of the package, and it is responsible for managing the USB hardware wallet.

## USBWallet

The `USBWallet` struct is the main component of the package. It is responsible for managing the USB hardware wallet. The `USBWallet` struct has the following fields:

- `url accounts.URL`: the URL of the wallet.
- `driver *usb.Driver`: the USB driver for the wallet.
- `log log.Logger`: the logger for the wallet.
- `commsLock chan struct{}`: a channel for locking communication with the wallet.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the wallet's state.
- `accounts []accounts.Account`: a list of accounts managed by the wallet.
- `paths map[common.Address]accounts.DerivationPath`: a map of account addresses to their derivation paths.
- `deriveChain *ethclient.Client`: the Ethereum client for the wallet.
- `deriveQuit chan chan error`: a channel for terminating the derivation loop.
- `deriveReq # Hardware Wallet

The `hardwarewallet` package provides a hardware wallet implementation of the `accounts.Wallet` interface. The `wallet` struct is the main component of the package, and it is responsible for managing the hardware wallet.

## wallet

The `wallet` struct is the main component of the package. It is responsible for managing the hardware wallet. The `wallet` struct has the following fields:

- `url accounts.URL`: the URL of the wallet.
- `driver Driver`: the driver for the hardware wallet.
- `log log.Logger`: the logger for the wallet.
- `commsLock chan struct{}`: a channel for synchronizing access to the hardware wallet.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the wallet's state.
- `accounts []accounts.Account`: a list of accounts managed by the wallet.
- `paths map[common.Address]accounts.DerivationPath`: a map of account addresses to their derivation paths.
- `device Device`: the device for the hardware wallet.
- `deriveNextPaths []accounts.DerivationPath`: a list of base account derivation paths from which the wallet attempts to discover non-zero accounts.
- `deriveNextAddrs []common.Address`: a list of addresses of the next accounts to be derived.
- `deriveChain ethereum.ChainStateReader`: the chain state reader for the wallet.
- `deriveQuit chan chan error`: a channel for terminating the self-derivation loop.

The `wallet` struct has the following methods:

- `Contains(account accounts.Account) bool`: implements `accounts.Wallet`, returning whether a particular account is or is not pinned into this wallet instance.
- `Derive(path accounts.DerivationPath, pin bool) (accounts.Account, error)`: implements `accounts.Wallet`, deriving a new account at the specific derivation path. If pin is set to true, the account will be added to the list of tracked accounts.
- `SelfDer # Ledger Wallet

The `ledger` package provides a wallet implementation for the Ledger hardware wallet. The `wallet` struct is the main component of the package, and it is responsible for managing the communication with the Ledger device.

## Wallet

The `wallet` struct is the main component of the package. It is responsible for managing the communication with the Ledger device. The `wallet` struct has the following fields:

- `hub *hub`: the hub that manages the communication with the Ledger device.
- `driver *driver`: the driver that communicates with the Ledger device.
- `paths map[common.Address]ledgerPath`: a map of the paths for each account.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the wallet's state fields.
- `commsLock chan struct{}`: a channel for synchronizing access to the wallet's communication with the Ledger device.

The `wallet` struct has the following methods:

- `SignData(account accounts.Account, mimeType string, data []byte) ([]byte, error)`: signs the given data with the given account.
- `SignDataWithPassphrase(account accounts.Account, passphrase, mimeType string, data []byte) ([]byte, error)`: attempts to sign the given data with the given account using passphrase as extra authentication.
- `SignText(account accounts.Account, text []byte) ([]byte, error)`: signs the given text with the given account.
- `SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: sends the transaction over to the Ledger wallet to request a confirmation from the user.
- `SignTextWithPassphrase(account accounts.Account, passphrase string, text []byte) ([] # Wallet

The `wallet` struct is an implementation of the `accounts.Wallet` interface. It is responsible for managing accounts and signing transactions.

## wallet

The `wallet` struct has the following fields:

- `backend *backend`: the backend that manages the wallet.
- `accounts []accounts.Account`: the accounts managed by the wallet.
- `url accounts.URL`: the URL of the wallet.

The `wallet` struct has the following methods:

- `Accounts() []accounts.Account`: returns a list of accounts managed by the wallet.
- `Contains(account accounts.Account) bool`: returns true if the wallet contains the given account.
- `Derive(path accounts.DerivationPath, pin bool) (accounts.Account, error)`: derives a new account from the given derivation path.
- `SignData(account accounts.Account, contentType, data []byte) ([]byte, error)`: signs the given data with the given account.
- `SignText(account accounts.Account, text []byte) ([]byte, error)`: signs the given text with the given account.
- `SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs the given transaction with the given account.
- `SignTxWithPassphrase(account accounts.Account, passphrase string, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: attempts to sign the given transaction with the given account using passphrase as extra authentication.

The `Accounts` method returns a list of accounts managed by the wallet.

The `Contains` method returns true if the wallet contains the given account.

The `Derive` method derives a new account from the given derivation path.

The `SignData` method signs the given data with the given account.

The `SignText` method signs the given text with the given account.

The `SignTx` method signs the given transaction with the given account.

The `SignTxWithPassphrase` method attempts to sign the given transaction with the given account using passphrase as extra authentication. Since USB wallets don't rely on passphrases, these are silently ignored.