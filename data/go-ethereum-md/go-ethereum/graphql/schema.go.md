# GraphQL Schema

The `schema` constant is a string that defines the GraphQL schema for the Ethereum blockchain. It defines the types and fields that can be queried and mutated.

## Scalars

- `Bytes32`: a 32 byte binary string, represented as 0x-prefixed hexadecimal.
- `Address`: a 20 byte Ethereum address, represented as 0x-prefixed hexadecimal.
- `Bytes`: an arbitrary length binary string, represented as 0x-prefixed hexadecimal. An empty byte string is represented as '0x'. Byte strings must have an even number of hexadecimal nybbles.
- `BigInt`: a large integer. Input is accepted as either a JSON number or as a string. Strings may be either decimal or 0x-prefixed hexadecimal. Output values are all 0x-prefixed hexadecimal.
- `Long`: a 64 bit unsigned integer.

## Query

### Account

`Account` is an Ethereum account at a particular block. It has the following fields:

- `address`: the address owning the account.
- `balance`: the balance of the account, in wei.
- `transactionCount`: the number of transactions sent from this account, or in the case of a contract, the number of contracts created. Otherwise known as the nonce.
- `code`: the smart contract code for this account, if the account is a (non-self-destructed) contract.
- `storage`: provides access to the storage of a contract account, indexed by its 32 byte slot identifier.

### Log

`Log` is an Ethereum event log. It has the following fields:

- `index`: the index of this log in the block.
- `account`: the account which generated this log - this will always be a contract account.
- `topics`: a list of 0-4 indexed topics for the log.
- `data`: unindexed data for this log.
- `transaction`: the transaction that generated this log entry.

### AccessTuple

`AccessTuple` is a tuple of an address and a list of storage keys. It has the following fields:

- `address`: the address of the contract.
- `storageKeys`: a list of storage keys.

### Transaction

`Transaction` is an Ethereum transaction. It has the following fields:

- `hash`: the hash of this transaction.
- `nonce`: the nonce of the account this transaction was generated with.
- `index`: the index of this transaction in the parent block. This will be null if the transaction has not yet been mined.
- `from # Transaction

The `Transaction` object represents a transaction on the Ethereum blockchain. It contains information about the sender, recipient, value, gas, and other transaction details.

## Fields

- `hash`: a string representing the hash of the transaction.
- `nonce`: a number representing the nonce of the transaction.
- `from`: a string representing the address of the sender.
- `to`: a string representing the address of the recipient. This can be null for contract creation transactions.
- `value`: a `BigInt` representing the value, in wei, sent along with this transaction.
- `gasPrice`: a `BigInt` representing the price offered to miners for gas, in wei per unit.
- `maxFeePerGas`: a `BigInt` representing the maximum fee per gas offered to include a transaction, in wei.
- `maxPriorityFeePerGas`: a `BigInt` representing the maximum miner tip per gas offered to include a transaction, in wei.
- `effectiveTip`: a `BigInt` representing the actual amount of reward going to miner after considering the max fee cap.
- `gas`: a number representing the maximum amount of gas this transaction can consume.
- `inputData`: a byte array representing the data supplied to the target of the transaction.
- `block`: a `Block` object representing the block this transaction was mined in. This will be null if the transaction has not yet been mined.
- `status`: a number representing the return status of the transaction. This will be 1 if the transaction succeeded, or 0 if it failed (due to a revert, or due to running out of gas). If the transaction has not yet been mined, this field will be null.
- `gasUsed`: a number representing the amount of gas that was used processing this transaction. If the transaction has not yet been mined, this field will be null.
- `cumulativeGasUsed`: a number representing the total gas used in the block up to and including this transaction. If the transaction has not yet been mined, this field will be null.
- `effectiveGasPrice`: a `BigInt` representing actual value per gas deducted from the sender's account. Before EIP-1559, this is equal to the transaction's gas price. After EIP-1559, it is baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). Legacy transactions and EIP-2930 transactions are coerced into the EIP-1559 format by setting both maxFeePerGas and max # GraphQL Schema

The GraphQL schema defines the types and fields that can be queried on the Ethereum blockchain.

## Types

### Account

The `Account` type represents an Ethereum account.

#### Fields

- `address`: the address of the account.
- `balance`: the balance of the account.
- `code`: the code of the account.
- `nonce`: the nonce of the account.
- `storage`: the storage of the account.

### Block

The `Block` type represents an Ethereum block.

#### Fields

- `number`: the number of the block.
- `hash`: the hash of the block.
- `parent`: the parent block of the block.
- `nonce`: the nonce of the block.
- `transactionsRoot`: the root of the trie of transactions in the block.
- `transactionCount`: the number of transactions in the block.
- `stateRoot`: the root of the state trie after the block was processed.
- `receiptsRoot`: the root of the trie of transaction receipts in the block.
- `miner`: the account that mined the block.
- `extraData`: the arbitrary data field supplied by the miner.
- `gasLimit`: the maximum amount of gas that was available to transactions in the block.
- `gasUsed`: the amount of gas that was used executing transactions in the block.
- `baseFeePerGas`: the fee per unit of gas burned by the protocol in the block.
- `nextBaseFeePerGas`: the fee per unit of gas which needs to be burned in the next block.
- `timestamp`: the unix timestamp at which the block was mined.
- `logsBloom`: the bloom filter that can be used to check if a block may contain log entries matching a filter.
- `mixHash`: the hash that was used as an input to the PoW process.
- `difficulty`: the difficulty of mining the block.
- `totalDifficulty`: the sum of all difficulty values up to and including the block.
- `ommerCount`: the number of ommers (AKA uncles) associated with the block.
- `ommers`: the list of ommer (AKA uncle) blocks associated with the block.
- `ommerAt`: the ommer (AKA uncle) at the specified index.
- `ommerHash # GraphQL Schema

The GraphQL schema defines the types and fields that can be queried by clients. The schema is used to validate queries and to generate documentation.

## Types

### Block

The `Block` type represents an Ethereum block.

#### Fields

- `number`: the block number.
- `hash`: the block hash.
- `parentHash`: the hash of the parent block.
- `nonce`: the nonce used to mine the block.
- `sha3Uncles`: the SHA3 hash of the uncles data in the block.
- `logsBloom`: the Bloom filter for the logs in the block.
- `transactionsRoot`: the root of the transaction trie of the block.
- `stateRoot`: the root of the state trie of the block.
- `receiptsRoot`: the root of the receipts trie of the block.
- `miner`: the address of the miner who mined the block.
- `difficulty`: the difficulty of the block.
- `totalDifficulty`: the total difficulty of the chain up to and including this block.
- `extraData`: the extra data field of the block.
- `size`: the size of the block in bytes.
- `gasLimit`: the gas limit of the block.
- `gasUsed`: the total gas used by all transactions in the block.
- `timestamp`: the timestamp of the block.
- `transactions`: a list of transactions in the block.
- `transactionAt`: returns the transaction at the specified index.
- `logs`: a filtered set of logs from this block.
- `account`: fetches an Ethereum account at the current block's state.
- `call`: executes a local call operation at the current block's state.
- `estimateGas`: estimates the amount of gas that will be required for successful execution of a transaction at the current block's state.
- `rawHeader`: the RLP encoding of the block's header.
- `raw`: the RLP encoding of the block.

### CallData

The `CallData` type represents the data associated with a local contract call.

#### Fields

- `from`: the address making the call.
- `to`: the address the call is sent to.
- `gas`: the amount of gas sent with the call.
- `gasPrice`: the price, in wei, offered for each unit of gas.
- `maxFeePerGas`: the maximum fee per gas offered, in wei.
- `maxPriorityFeePerGas`: the # GraphQL Schema

The GraphQL schema defines the types and operations that can be performed on the Ethereum network.

## Types

### Address

`Address` represents an Ethereum address.

### Bytes

`Bytes` represents a byte array.

### Bytes32

`Bytes32` represents a 32-byte array.

### BigInt

`BigInt` represents a large integer.

### Block

`Block` represents an Ethereum block.

### Transaction

`Transaction` represents an Ethereum transaction.

### Log

`Log` represents an Ethereum log.

### CallData

`CallData` represents data used in a local call operation.

### CallResult

`CallResult` represents the result of a local call operation.

### FilterCriteria

`FilterCriteria` represents criteria used to filter log entries.

### Account

`Account` represents an Ethereum account.

### SyncState

`SyncState` represents the current synchronization state.

### Pending

`Pending` represents the current pending state.

## Query

### block

`block` fetches an Ethereum block by number or by hash. If neither is supplied, the most recent known block is returned. It takes in a `Long` and a `Bytes32` as parameters and returns a `Block`.

### blocks

`blocks` returns all the blocks between two numbers, inclusive. If to is not supplied, it defaults to the most recent known block. It takes in two `Long` values as parameters and returns a slice of `Block`.

### pending

`pending` returns the current pending state. It returns a `Pending`.

### transaction

`transaction` returns a transaction specified by its hash. It takes in a `Bytes32` as a parameter and returns a `Transaction`.

### logs

`logs` returns log entries matching the provided filter. It takes in a `FilterCriteria` as a parameter and returns a slice of `Log`.

### gasPrice

`gasPrice` returns the node's estimate of a gas price sufficient to ensure a transaction is mined in a timely fashion. It returns a `BigInt`.

### maxPriorityFeePerGas

`maxPriorityFeePerGas` returns the node's estimate of a gas tip sufficient to ensure a transaction is mined in a timely fashion. It returns a `BigInt`.

### syncing

`syncing` returns information on the current synchronization state. It returns a `SyncState`.

### chainID

`chainID` returns the current chain ID for transaction replay protection. It returns a `BigInt`.

## Mutation

### sendRawTransaction

`sendRawTransaction` sends an RLP-encoded transaction to the network. It takes in a `Bytes` as a parameter and returns a `Bytes32`.