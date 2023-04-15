## Package keystore

The `keystore` package provides a way to manage Ethereum accounts stored on disk. This file contains the implementation of a file system watcher that monitors changes to the keystore folder and reloads the accounts cache accordingly.

## Type Watcher

The `watcher` type represents a file system watcher that monitors changes to the keystore folder and reloads the accounts cache accordingly. It has the following fields:

- `ac *accountCache`: the account cache to reload when changes are detected.
- `running bool`: a flag indicating whether the watcher is currently running.
- `runEnded bool`: a flag indicating whether the watcher has finished running.
- `starting bool`: a flag indicating whether the watcher is currently starting.
- `quit chan struct{}`: a channel used to signal the watcher to stop.

## Function newWatcher

The `newWatcher` function creates a new watcher instance and returns a pointer to it. It takes an `*accountCache` parameter that specifies the account cache to reload when changes are detected.

## Method enabled

The `enabled` method returns a boolean value indicating whether the watcher is enabled on the current system. It always returns `true`.

## Method start

The `start` method starts the watcher loop in the background. It takes no parameters and is called on a `watcher` instance. The caller must hold the `ac.mu` lock.

## Method close

The `close` method closes the watcher. It takes no parameters and is called on a `watcher` instance.

## Method loop

The `loop` method is the main loop of the watcher. It takes no parameters and is called on a `watcher` instance. It monitors changes to the keystore folder and reloads the accounts cache accordingly. It also handles errors and signals to stop the watcher.