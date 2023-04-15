# GraphQL

The `graphql` package provides a GraphQL interface to Ethereum node data.

## Variables

- `errBlockInvariant`: an error indicating that block objects must be instantiated with at least one of num or hash.

## Long

The `Long` type is used to represent a 64-bit integer in GraphQL.

### ImplementsGraphQLType

`ImplementsGraphQLType` returns true if `Long` implements the provided GraphQL type.

### UnmarshalGraphQL

`UnmarshalGraphQL` unmarshals the provided GraphQL query data.

## Account

The `Account` struct is used to represent an Ethereum account at a particular block.

### Variables

- `r`: a pointer to a `Resolver`.
- `address`: a `common.Address` representing the account's address.
- `blockNrOrHash`: a `rpc.BlockNumberOrHash` representing the block number or hash.

### Functions

#### getState

`getState` fetches the `StateDB` object for an account.

#### Address

`Address` returns the account's address.

#### Balance

`Balance` returns the account's balance.

#### TransactionCount

`TransactionCount` returns the number of transactions for the account.

## Resolver

The `Resolver` struct is used to resolve GraphQL queries.

### Variables

- `backend`: a pointer to an `ethapi.Backend` which is used to interact with the Ethereum node.
- `filterBackend`: a pointer to a `filters.Backend` which is used to interact with the Ethereum node's filter manager.
- `txPool`: a pointer to an `ethapi.TxPool` which is used to interact with the Ethereum node's transaction pool.

### Functions

#### NewResolver

`NewResolver` creates a new `Resolver` instance. It takes in a pointer to an `ethapi.Backend`, a pointer to a `filters.Backend`, and a pointer to an `ethapi.TxPool` as parameters and returns a pointer to a new `Resolver`.

#### Block

`Block` returns a `Block` object # Account

The `Account` struct is used to represent an Ethereum account. It contains the address of the account and the block number or hash.

## Variables

- `r`: a pointer to a `Resolver` which is used to resolve the account.
- `address`: a `common.Address` representing the address of the account.
- `blockNrOrHash`: a `*rpc.BlockNumberOrHash` representing the block number or hash.

## Functions

### Balance

`Balance` returns the balance of the account. It takes in a context as a parameter and returns a `hexutil.Big` and an error.

### Nonce

`Nonce` returns the nonce of the account. It takes in a context as a parameter and returns a `hexutil.Uint64` and an error.

### Code

`Code` returns the code of the account. It takes in a context as a parameter and returns a `hexutil.Bytes` and an error.

### Storage

`Storage` returns the storage value of the account at the given slot. It takes in a context and a `struct{ Slot common.Hash }` as parameters and returns a `common.Hash` and an error.

# Log

The `Log` struct is used to represent an individual log message.

## Variables

- `r`: a pointer to a `Resolver` which is used to resolve the log.
- `transaction`: a pointer to a `Transaction` which represents the transaction that generated the log.
- `log`: a pointer to a `types.Log` which represents the log.

## Functions

### Transaction

`Transaction` returns the `Transaction` that generated the log. It takes in a context as a parameter and returns a pointer to a `Transaction`.

### Account

`Account` returns the `Account` that generated the log # Transaction

The `Transaction` struct is used to represent an Ethereum transaction. It contains a reference to the `ethclient.Client` and the transaction hash.

## Functions

### GasPrice

`GasPrice` returns the gas price of the transaction. It takes in a context as a parameter and returns a `*hexutil.Big` and an error.

### EffectiveGasPrice

`EffectiveGasPrice` returns the effective gas price of the transaction. It takes in a context as a parameter and returns a `*hexutil.Big` and an error.

### MaxFeePerGas

`MaxFeePerGas` returns the maximum fee per gas of the transaction. It takes in a context as a parameter and returns a `*hexutil.Big` and an error.

### MaxPriorityFeePerGas

`MaxPriorityFeePerGas` returns the maximum priority fee per gas of the transaction. It takes in a context as a parameter and returns a `*hexutil.Big` and an error.

### EffectiveTip

`EffectiveTip` returns the effective tip of the transaction. It takes in a context as a parameter and returns a `*hexutil.Big` and an error.

### Value

`Value` returns the value of the transaction. It takes in a context as a parameter and returns a `hexutil # Transaction

The `Transaction` struct is used to represent a transaction on the Ethereum blockchain. It contains information about the transaction such as its hash, sender, recipient, value, gas limit, and gas price.

## Variables

- `r`: a pointer to a `Client` which is used to communicate with the Ethereum network.
- `hash`: a `common.Hash` representing the hash of the transaction.
- `from`: a `common.Address` representing the sender of the transaction.
- `to`: a `*common.Address` representing the recipient of the transaction.
- `value`: a `*big.Int` representing the value of the transaction.
- `gas`: a `hexutil.Uint64` representing the gas limit of the transaction.
- `gasPrice`: a `*big.Int` representing the gas price of the transaction.
- `nonce`: a `hexutil.Uint64` representing the nonce of the transaction.
- `data`: a `hexutil.Bytes` representing the data of the transaction.
- `index`: a `uint` representing the index of the transaction in the block.

## Functions

### getReceipt

`getReceipt` retrieves the receipt of the transaction. It takes in a `context.Context` as a parameter and returns a `*types.Receipt` and an error.

### resolve

`resolve # Block

The `Block` struct represents an Ethereum block. It contains a pointer to a `Resolver`, a pointer to a `rpc.BlockNumberOrHash`, a `sync.Mutex`, a `common.Hash`, a pointer to a `types.Header`, a pointer to a `types.Block`, and a slice of `types.Receipt`.

## Variables

- `r`: a pointer to a `Resolver`.
- `numberOrHash`: a pointer to a `rpc.BlockNumberOrHash`.
- `mu`: a `sync.Mutex` used to synchronize access to the block's resources.
- `hash`: a `common.Hash` representing the block's hash.
- `header`: a pointer to a `types.Header` representing the block's header.
- `block`: a pointer to a `types.Block` representing the block.
- `receipts`: a slice of `types.Receipt` representing the block's receipts.

## Functions

### resolve

`resolve` returns the internal `types.Block` object representing this block, fetching it if necessary. It takes in a `context.Context` as a parameter and returns a `*types.Block` and an error.

### resolveHeader

`resolveHeader` returns the internal `types.Header` object for this block, fetching it if necessary. Call this function instead of `resolve` unless you need the additional data (transactions and uncles). It takes in a `context.Context` as a parameter and returns a `*types.Header` and an error.

### resolveReceipts

`resolveReceipts` returns the list of receipts for this block, fetching them if necessary. It takes in a `context.Context` as a parameter and returns # Block

The `Block` struct is used to provide an interface to interact with a block on the Ethereum blockchain. It contains a `*ethclient.Client` instance, a `*rpc.BlockNumberOrHash` instance, a `*types.Header` instance, and a `common.Hash` instance.

## Variables

- `r`: a pointer to an `ethclient.Client` instance which is used to communicate with the Ethereum blockchain.
- `numberOrHash`: a pointer to a `rpc.BlockNumberOrHash` instance which is used to identify the block.
- `header`: a pointer to a `types.Header` instance which is used to store the block header.
- `hash`: a `common.Hash` instance which is used to store the block hash.

## Functions

### Hash

`Hash` returns the hash of the block.

### Number

`Number` returns the number of the block.

### resolveHeader

`resolveHeader` resolves the block header.

### resolve

`resolve` resolves the block.

### ParentHash

`ParentHash` returns the parent hash of the block.

### Difficulty

`Difficulty` returns the difficulty of the block.

### Timestamp

`Timestamp` returns the timestamp of the block.

### Nonce

`Nonce` returns the nonce of the block.

### MixHash

`MixHash` returns the mix hash of the block.

### TransactionsRoot

`TransactionsRoot` returns the transactions root of the # BlockNumberArgs

The `BlockNumberArgs` struct is used to accessors that specify a block number. It contains a `*hexutil.Uint64` which is used to store the block number.

## Variables

- `Block`: a pointer to a `hexutil.Uint64` which is used to store the block number.

## Functions

### NumberOr

`NumberOr` returns the provided block number argument, or the "current" block number or hash if none was provided. It takes in a `rpc.BlockNumberOrHash` as a parameter and returns a `rpc.BlockNumberOrHash`.

### NumberOrLatest

`NumberOrLatest` returns the provided block number argument, or the "latest" block number if none was provided. It takes no parameters and returns a `rpc.BlockNumberOrHash`.

# Block

The `Block` struct is used to represent a block in the Ethereum blockchain.

## Variables

- `r`: a pointer to an `EthereumResolver` which is used to resolve the block.
- `numberOrHash`: a pointer to a `rpc.BlockNumberOrHash` which is used to store the block number or hash.
- `header`: a pointer to a `types.Header` which is used to store the block header.
- `hash`: a `common.Hash` which is used to store the block hash.

## Functions

### Miner

`Miner` returns the miner of the block. It takes in a `BlockNumberArgs` as a parameter and returns an `*Account` and an error.

### TransactionCount

`TransactionCount` returns the number of transactions in the block. It takes no parameters and returns an `*int32` and an error.

### Transactions

`Transactions` # Block

The `Block` struct is used to represent a block in the Ethereum blockchain. It contains a pointer to a `Resolver`, a `*big.Int` representing the block number, a `common.Hash` representing the block hash, and a `*common.Hash` representing the block number or hash.

## Variables

- `r`: a pointer to a `Resolver`.
- `number`: a `*big.Int` representing the block number.
- `hash`: a `common.Hash` representing the block hash.
- `numberOrHash`: a `*common.Hash` representing the block number or hash.

## Functions

### Hash

`Hash` returns the block hash.

### Logs

`Logs` returns all the logs in the block that match the given filter criteria. It takes in a `context.Context` and a `BlockFilterCriteria` as parameters and returns a slice of `*Log` and an error.

### Account

`Account` returns the account at the given address in the block. It takes in a `context.Context` and an `Address` as parameters and returns a pointer to an `Account` and an error.

### Call

`Call` executes a message call transaction. It takes in a `context.Context` and a `TransactionArgs` as parameters and returns a pointer to a `CallResult` and an error.

### EstimateGas

`EstimateGas` estimates the gas required for a message call transaction. It takes in a `context.Context` and a `TransactionArgs` as parameters and returns a `Long` and an error.

# CallData

The `CallData` struct is used to encapsulate arguments to `call` or # Resolver

The `Resolver` struct is the top-level object in the GraphQL hierarchy. It contains an `ethapi.Backend` and a `*filters.FilterSystem`.

## Variables

- `backend`: an `ethapi.Backend` which is used to interact with the Ethereum blockchain.
- `filterSystem`: a `*filters.FilterSystem` which is used to filter events.

## Functions

### Block

`Block` returns a `Block` object for the given block number or hash. It takes in a `*Long` and a `*common.Hash` as parameters and returns a pointer to a new `Block` and an error.

### Blocks

`Blocks` returns a slice of `Block` objects for the given range of block numbers. It takes in a `*Long` and a `*Long` as parameters and returns a slice of pointers to new `Block` objects and an error.

### Pending

`Pending` returns a `Pending` object which is used to interact with pending transactions.

### Transaction

`Transaction` returns a `Transaction` object for the given transaction hash. It takes in a `common.Hash` as a parameter and returns a pointer to a new `Transaction` and an error.

### SendRawTransaction

`SendRawTransaction` sends a raw transaction to the Ethereum blockchain. It takes in a `hexutil.Bytes` as a parameter and returns a `common.Hash` and an error.

# Pending

The `Pending` struct is used to interact with pending transactions.

## Variables

- `r`: # Resolver

The `Resolver` struct is used to provide a GraphQL API for interacting with the Ethereum blockchain. It contains functions for handling various GraphQL queries.

## Functions

### SubmitTransaction

`SubmitTransaction` submits a transaction to the Ethereum blockchain. It takes in a `context.Context`, a byte slice, and a `*types.Transaction` as parameters and returns a `common.Hash` and an error.

### FilterCriteria

`FilterCriteria` encapsulates the arguments to `logs` on the root resolver object. It contains the following fields:

- `FromBlock`: the beginning of the queried range, nil means genesis block.
- `ToBlock`: the end of the range, nil means latest block.
- `Addresses`: restricts matches to events created by specific contracts.
- `Topics`: restricts matches to particular event topics.

### Logs

`Logs` returns a slice of `Log` which contains the logs that match the given filter criteria. It takes in a `context.Context` and a `FilterCriteria` as parameters and returns a slice of `*Log` and an error.

### GasPrice

`GasPrice` returns the current gas price. It takes in a `context.Context` as a parameter and returns a `hexutil.Big` and an error.

### MaxPriorityFeePerGas

`MaxPriorityFeePerGas` returns the current maximum priority fee per gas. It takes in a `context.Context` as a parameter and returns a `hexutil.Big` and an error.

### ChainID

`ChainID` returns the current chain ID. It takes in a `context.Context` as a parameter and returns a `hexutil.Big` and an error.

### SyncState

`SyncState` represents the synchronization status returned from the `syncing` accessor. It contains the following fields:

- `progress`: the synchronization progress.

### StartingBlock

`StartingBlock` returns the starting block of the synchronization # SyncState

The `SyncState` struct is used to represent the current synchronization state of the node.

## Variables

- `progress`: a `eth.SyncProgress` struct which contains information about the current synchronization progress.

## Functions

### StartingBlock

`StartingBlock` returns the block number this node started to synchronize from.

### CurrentBlock

`CurrentBlock` returns the block number this node is currently importing.

### HighestBlock

`HighestBlock` returns the block number of the highest block header this node has received from peers.

### SyncedAccounts

`SyncedAccounts` returns the number of accounts downloaded.

### SyncedAccountBytes

`SyncedAccountBytes` returns the number of account trie bytes persisted to disk.

### SyncedBytecodes

`SyncedBytecodes` returns the number of bytecodes downloaded.

### SyncedBytecodeBytes

`SyncedBytecodeBytes` returns the number of bytecode bytes downloaded.

### SyncedStorage

`SyncedStorage` returns the number of storage slots downloaded.

### SyncedStorageBytes

`SyncedStorageBytes` returns the number of storage trie bytes persisted to disk.

### HealedTrienodes

`HealedTrienodes` returns the number of state trie nodes downloaded.

### HealedTrienodeBytes

`HealedTrienodeBytes` returns the number of state trie bytes persisted to disk.

### HealedBytecodes

`HealedBytecodes` returns the number of bytecodes downloaded.

### HealedBytecodeBytes

`HealedBytecodeBytes` returns the number of bytecodes persisted to disk.

### HealingTrienodes

`HealingTrienodes` returns the number of state trie nodes pending.

### HealingBytecode

`HealingBytecode` returns the number of bytecodes pending.

# Resolver

The `Resolver` struct is used to provide an interface to interact with the Ethereum network.

## Variables

- `backend`: a `eth.Backend` struct which is used to communicate with the Ethereum network.

## Functions

### Syncing

`Syncing` returns the current synchronization state of the node. It returns a pointer to a `SyncState` struct and an error. If the node is not currently syncing with the network, it returns `nil` and no error.