## Keystore Package

The `keystore` package provides a secure storage mechanism for cryptographic keys. It is used by the Ethereum client to store private keys and other sensitive information.

## Watcher

The `watcher` struct represents a directory watcher that monitors changes to the keystore directory. This implementation is used as a fallback on unsupported platforms.

- `running bool`: indicates whether the watcher is currently running.
- `runEnded bool`: indicates whether the watcher has finished running.

### newWatcher

The `newWatcher` function creates a new `watcher` instance. It takes an `accountCache` parameter, but it is not used in this implementation.

### start

The `start` method starts the watcher. It does nothing in this implementation.

### close

The `close` method stops the watcher. It does nothing in this implementation.

### enabled

The `enabled` method returns `false` on systems not supported by the watcher. This implementation is used as a fallback on unsupported platforms.