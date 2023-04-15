# Trezor Driver

The `usbwallet` package provides an implementation for interacting with the Trezor hardware wallets. The `trezorDriver` struct is the main component of the package, and it is responsible for communicating with the Trezor device.

## trezorDriver

The `trezorDriver` struct is the main component of the package. It is responsible for communicating with the Trezor device. The `trezorDriver` struct has the following fields:

- `device io.ReadWriter`: the USB device connection to communicate through.
- `version [3]uint32`: the current version of the Trezor firmware.
- `label string`: the current textual label of the Trezor device.
- `pinwait bool`: flags whether the device is waiting for PIN entry.
- `passphrasewait bool`: flags whether the device is waiting for passphrase entry.
- `failure error`: any failure that would make the device unusable.
- `log log.Logger`: a contextual logger to tag the trezor with its id.

The `trezorDriver` struct has the following methods:

- `newTrezorDriver(logger log.Logger) driver`: creates a new instance of a Trezor USB protocol driver.
- `Status() (string, error)`: returns the status of the Trezor device.
- `Open() error`: attempts to initialize the connection to the Trezor hardware wallet.
- `Close() error`: closes the connection to the Trezor hardware wallet.
- `GetAddress(path accounts.DerivationPath) (common.Address, error)`: retrieves the address for the given derivation path from the Trezor device.
- `SignTx(tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs the given transaction with the Trezor device.

The `newTrezorDriver` function creates a new instance of a Trezor # Trezor Driver

The `trezorDriver` struct is a driver for the Trezor hardware wallet. It implements the `usbwallet.driver` interface, which defines the methods that a driver must implement to be used by the account manager.

## trezorDriver

The `trezorDriver` struct is the main component of the package. It is responsible for managing the connection to the Trezor device and performing various operations on it. The `trezorDriver` struct has the following fields:

- `device io.ReadWriter`: the connection to the Trezor device.
- `failure error`: the last error that occurred during an operation.
- `trezorExchange func(req trezor.Message, res ...trezor.Message) (int, error)`: a function for exchanging messages with the Trezor device.
- `version [3]uint32`: the version of the Trezor device.
- `label string`: the label of the Trezor device.
- `pinwait bool`: a flag indicating whether the driver is waiting for a PIN entry.
- `passphrasewait bool`: a flag indicating whether the driver is waiting for a passphrase entry.

The `trezorDriver` struct has the following methods:

- `Open(device io.ReadWriter, passphrase string) error`: opens a connection to the Trezor device and reads # Trezor Driver

The `trezorDriver` struct is a driver for the Trezor hardware wallet. It implements the `accounts.Wallet` interface and provides methods for signing transactions and deriving addresses.

## SignTypedMessage

The `SignTypedMessage` method is not supported by the Trezor driver and always returns an `accounts.ErrNotSupported` error.

## trezorDerive

The `trezorDerive` method sends a derivation request to the Trezor device and returns the Ethereum address located on that path. It takes a `derivationPath` parameter, which is an array of integers representing the derivation path.

## trezorSign

The `trezorSign` method sends the transaction to the Trezor wallet and waits for the user to confirm or deny the transaction. It takes a `derivationPath` parameter, which is an array of integers representing the derivation path, a `tx` parameter, which is the transaction to sign, and a `chainID` parameter, which is the chain ID of the transaction.

The method creates the transaction initiation message and sends it to the Trezor wallet. It then streams the content until a signature is returned. The method extracts the Ethereum signature and does a sanity validation. It creates the correct signer and signature transform based on the chain ID and injects the final signature into the transaction. It then sanity checks the sender and returns the sender, signed transaction, and an error (if any).

## tre # Trezor Driver

The `trezorDriver` struct is a driver for communicating with a Trezor hardware wallet. It has the following fields:

- `device io.ReadWriteCloser`: the device used for communication with the Trezor wallet.
- `log log.Logger`: a logger for logging messages.

The `trezorDriver` struct has the following methods:

- `trezorExchange(req proto.Message, results ...proto.Message) (int, error)`: exchanges a message with the Trezor wallet and retrieves the response.

The `trezorExchange` method is responsible for exchanging a message with the Trezor wallet and retrieving the response. It takes a request message `req` and a list of possible response messages `results`. If multiple responses are possible, the method will also return the index of the destination object used.

The method first constructs the original message payload to chunk up. It then streams all the chunks to the device. The method constructs the new message to stream, padding with zeroes if needed. It sends the message over to the device.

The method then streams the reply back from the wallet in 64 byte chunks. It reads the next chunk from the Trezor wallet and makes sure the transport header matches. If it's the first chunk, the method retrieves the reply message type and total message length. It appends to the reply and stops when filled up.

The method tries to parse the reply into the requested reply message. If Trezor returned a failure, the method extracts and returns the message. If Trezor is waiting for user confirmation, the method acks and waits for the next message. If the expected reply types do not match the received reply type, the method returns an error.