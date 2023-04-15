# Ledger Driver

The `usbwallet` package provides an implementation for interacting with the Ledger hardware wallets. The `ledgerDriver` struct is the main component of the package, and it is responsible for communicating with the Ledger device.

## ledgerOpcode

The `ledgerOpcode` type is an enumeration encoding the supported Ledger opcodes. It has the following values:

- `ledgerOpRetrieveAddress`: returns the public key and Ethereum address for a given BIP 32 path.
- `ledgerOpSignTransaction`: signs an Ethereum transaction after having the user validate the parameters.
- `ledgerOpGetConfiguration`: returns specific wallet application configuration.
- `ledgerOpSignTypedMessage`: signs an Ethereum message following the EIP 712 specification.

## ledgerParam1

The `ledgerParam1` type is an enumeration encoding the supported Ledger parameters for specific opcodes. The same parameter values may be reused between opcodes. It has the following values:

- `ledgerP1DirectlyFetchAddress`: return address directly from the wallet.
- `ledgerP1InitTypedMessageData`: first chunk of Typed Message data.
- `ledgerP1InitTransactionData`: first transaction data block for signing.
- `ledgerP1ContTransactionData`: subsequent transaction data block for signing.

## ledgerParam2

The `ledgerParam2` type is an enumeration encoding the supported Ledger parameters for specific opcodes. The same parameter values may be reused between opcodes. It has the following values:

- `ledgerP2DiscardAddressChainCode`: do not return the chain code along with the address.

## ledgerDriver

The `ledgerDriver` struct is the main component of the package. It is responsible for communicating with the Ledger device. The `ledgerDriver` struct has the following fields:

- `device io.ReadWriter`: USB device connection to communicate through.
- `version [3]byte`: current version of the Ledger firmware (zero if unknown).

The `ledgerDriver` struct has the following methods:

- `newLedgerDriver(device io.ReadWriter) (*ledgerDriver, error)`: creates a new `ledgerDriver` instance with the given `device`.
- `Version() ([3]byte, error)`: retrieves the version of the Ledger firmware.
- `RetrieveAddress(path accounts.DerivationPath) # Ledger Driver

The `ledgerDriver` struct is a USB protocol driver for the Ledger hardware wallet. It implements the `driver` interface defined in the `usbwallet` package. The `ledgerDriver` struct has the following fields:

- `device io.ReadWriter`: the device used to communicate with the Ledger.
- `version [3]byte`: the version of the Ethereum app running on the Ledger.
- `browser bool`: a flag indicating whether the Ledger is in browser mode.
- `failure error`: any failure that would make the device unusable.
- `log log.Logger`: a contextual logger to tag the ledger with its id.

The `ledgerDriver` struct has the following methods:

- `newLedgerDriver(logger log.Logger) driver`: creates a new instance of a Ledger USB protocol driver.
- `Status() (string, error)`: returns various states the Ledger can currently be in.
- `offline() bool`: returns whether the wallet and the Ethereum app is offline or not.
- `Open(device io.ReadWriter, passphrase string) error`: attempts to initialize the connection to the Ledger hardware wallet.
- `Close() error`: cleans up and metadata maintained within the Ledger driver.
- `Heartbeat() error`: performs a sanity check against the Ledger to see if it's still online.
- `Derive(path accounts.DerivationPath) (common.Address, error)`: sends a derivation request to the Ledger and returns the Ethereum address located on that derivation path.
- `SignTx(path accounts.DerivationPath, tx *types.Transaction, chainID *big.Int) (common.Address, *types.Transaction, error)`: sends the transaction to the Ledger and waits for the user to confirm or deny the transaction.

The # Ledger Driver

The `ledgerDriver` struct is a driver for communicating with a Ledger hardware wallet. It implements the `usbwallet.driver` interface, which defines the methods for signing transactions and messages.

## SignTransaction

The `SignTransaction` method sends a transaction to the Ledger and waits for the user to sign or deny the transaction. It has the following parameters:

- `path accounts.DerivationPath`: the derivation path of the account to sign the transaction with.
- `tx *types.Transaction`: the transaction to sign.
- `chainID *big.Int`: the chain ID of the transaction.

## SignTypedMessage

The `SignTypedMessage` method sends a message to the Ledger and waits for the user to sign or deny the transaction. It has the following parameters:

- `path accounts.DerivationPath`: the derivation path of the account to sign the message with.
- `domainHash []byte`: the hash of the EIP-712 domain.
- `messageHash []byte`: the hash of the EIP-712 message.

## ledgerVersion

The `ledgerVersion` method retrieves the current version of the Ethereum wallet app running on the Ledger wallet. It has no parameters and returns the version as a `[3]byte` array.

## ledgerDerive

The `ledgerDerive` method retrieves the currently active Ethereum address from a Ledger wallet at the specified derivation path. It has the following parameter:

- `derivationPath []uint32`: the derivation path of the account to retrieve the address for.

It returns the Ethereum address as a `common.Address` and an error.

## Conclusion

The `ledgerDriver` struct is a driver for communicating with a Ledger hardware wallet. It implements the `usbwallet.driver` interface, which defines the methods for signing transactions and messages. The `Sign # Ledger Driver

The `ledgerDriver` struct is a driver for the Ledger hardware wallet. It implements the `Signer` interface and provides methods for signing transactions and retrieving account addresses.

## Signer

The `Signer` interface defines the methods that a signer must implement to sign transactions. It has the following methods:

- `SignTx(account accounts.Account, tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs a transaction with the given account and chain ID.
- `SignText(account accounts.Account, text []byte) ([]byte, error)`: signs a text message with the given account.
- `SignData(account accounts.Account, data []byte) ([]byte, error)`: signs arbitrary data with the given account.
- `Addresses() []common.Address`: returns a list of addresses managed by the signer.

## ledgerExchange

The `ledgerExchange` function sends a request to the Ledger wallet and waits for the response. It has the following parameters:

- `op byte`: the operation code for the request.
- `p1 byte`: the first parameter for the request.
- `p2 byte`: the second parameter for the request.
- `data []byte`: the data to send with the request.

## ledgerRetrieveAddress

The `ledgerRetrieveAddress` function retrieves the Ethereum address for the given derivation path from the Ledger wallet. It has the following parameters:

- `path []uint32`: the derivation path for the address.

## ledgerSign

The # Ledger Driver

The `ledgerDriver` struct is a driver for the Ledger hardware wallet. It implements the `Signer` interface and provides methods for signing transactions and messages.

## Signer

The `Signer` interface defines the methods that a signer must implement to be used by the Ethereum transaction signer. It has the following methods:

- `SignTx(tx *types.Transaction, chainID *big.Int) (*types.Transaction, error)`: signs a transaction with the given chain ID.
- `SignTypedData(domainHash common.Hash, message interface{}, derivationPath []uint32) ([]byte, error)`: signs a typed data message with the given domain hash, message, and derivation path.

## ledgerDriver

The `ledgerDriver` struct is a driver for the Ledger hardware wallet. It implements the `Signer` interface and provides methods for signing transactions and messages. The `ledgerDriver` struct has the following fields:

- `device *hid.Device`: the HID device used to communicate with the Ledger wallet.
- `timeout time.Duration`: the timeout for communication with the Ledger wallet.

The `ledgerDriver` struct has the following methods:

- `ledgerExchange(ins byte, p1 byte, p2 byte, payload []byte) ([]byte, error)`: performs a data exchange with the Ledger wallet, sending it a message and retrieving the response.
- `ledgerSignTransaction(tx *types.Transaction, chainID *big.Int, derivationPath []uint32) (common.Address, *types.Transaction, error)`: sends the transaction to the Ledger wallet, and waits for the user to confirm or deny the transaction.
- `ledgerSignTypedMessage(derivationPath []uint32, domainHash []byte, messageHash []byte) ([]byte, error)`: sends the message to the Ledger wallet, and waits for the user to confirm or deny the message.

The `ledgerExchange` method performs a data exchange with the Ledger wallet, sending it a message and retrieving the response. It sends # Ledger Driver

The `ledgerDriver` struct is a driver for communicating with a Ledger hardware wallet. The `ledgerExchange` method is the main method of the driver, and it is responsible for exchanging data with the wallet.

## ledgerExchange

The `ledgerExchange` method exchanges data with the Ledger wallet. It constructs the message payload, possibly split into multiple chunks, and streams all the chunks to the device. It then streams the reply back from the wallet in 64-byte chunks.

The `ledgerExchange` method has the following parameters:

- `opcode ledgerOpcode`: the opcode of the command to send to the wallet.
- `p1 ledgerParam1`: the first parameter of the command to send to the wallet.
- `p2 ledgerParam2`: the second parameter of the command to send to the wallet.
- `data []byte`: the data payload of the command to send to the wallet.

The `ledgerExchange` method returns the reply from the wallet and an error if any.

The APDU command payloads are encoded as follows:

| Description | Length |
| --- | --- |
| APDU length (big endian) | 2 bytes |
| APDU CLA | 1 byte |
| APDU INS | 1 byte |
| APDU P1 | 1 byte |
| APDU P2 | 1 byte |
| APDU length | 1 byte |
| Optional APDU data | arbitrary |

The `ledgerExchange` method constructs the message payload by appending the APDU command payload to a header. The header contains the channel ID and command tag. The message payload is then split into multiple chunks and streamed to the device.

The reply from the wallet is streamed back in 64-byte chunks. The transport header of each chunk is checked to make sure it matches the expected values. The total message length is retrieved from the first chunk, and the payload is appended to the reply until it is filled up.

## Conclusion

The `ledgerDriver` struct is a driver for communicating with a Ledger hardware wallet. The `ledgerExchange` method is the main method of the driver, and it is responsible for exchanging data with the wallet. The method constructs the message payload, possibly split into multiple chunks, and streams all the chunks to the device. It then streams the reply back from the wallet in 64-byte chunks.