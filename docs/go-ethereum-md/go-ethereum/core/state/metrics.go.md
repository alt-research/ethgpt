This file contains metric variables that are used to track the performance of the `state` package. The `state` package is used to manage the state of the Ethereum blockchain, including account balances and contract storage.

The metric variables are created using the `metrics` package from the `go-ethereum` library. They are used to track the number of account and storage updates and deletions, as well as the number of account and storage trie updates and deletions.

Here is an example of how you can document the metric variables in Markdown format:

## Metric Variables

These variables are used to track the performance of the `state` package.

### `accountUpdatedMeter`

A meter that tracks the number of account updates.

### `storageUpdatedMeter`

A meter that tracks the number of storage updates.

### `accountDeletedMeter`

A meter that tracks the number of account deletions.

### `storageDeletedMeter`

A meter that tracks the number of storage deletions.

### `accountTrieUpdatedMeter`

A meter that tracks the number of account trie updates.

### `storageTriesUpdatedMeter`

A meter that tracks the number of storage trie updates.

### `accountTrieDeletedMeter`

A meter that tracks the number of account trie deletions.

### `storageTriesDeletedMeter`

A meter that tracks the number of storage trie deletions.