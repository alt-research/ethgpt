# EthereumAPI

The `EthereumAPI` type provides an API to access Ethereum related information.

## Functions

### NewEthereumAPI

```go
func NewEthereumAPI(b Backend) *EthereumAPI
```

`NewEthereumAPI` creates a new Ethereum protocol API and returns a pointer to it. It takes a `Backend` object.

### GasPrice

```go
func (s *EthereumAPI) GasPrice(ctx context.Context) (*hexutil.Big, error)
```

`GasPrice` returns a suggestion for a gas price for legacy transactions.

### MaxPriorityFeePerGas

```go
func (s *EthereumAPI) MaxPriorityFeePerGas(ctx context.Context) (*hexutil.Big, error)
```

`MaxPriorityFeePerGas` returns a suggestion for a gas tip cap for dynamic fee transactions.

### FeeHistory

```go
func (s *EthereumAPI) FeeHistory(ctx context.Context, blockCount math.HexOrDecimal64, lastBlock rpc.BlockNumber, rewardPercentiles []float64) (*feeHistoryResult, error)
```

`FeeHistory` returns the fee market history.

## Types

### feeHistoryResult

`feeHistoryResult` is a struct that contains the result of the `FeeHistory` function.

## Fields

### OldestBlock

```go
OldestBlock  *hexutil.Big     `json:"oldestBlock"`
```

`OldestBlock` is the oldest block for which fee market data is available.

### Reward

```go
Reward       [][]*hexutil.Big `json:"reward,omitempty"`
```

`Reward` is a slice of slices of `hexutil.Big` values representing the reward for each percentile.

### BaseFee

```go
BaseFee      []*hexutil.Big   `json:"baseFeePerGas,omitempty"`
```

`BaseFee` is a slice of `hexutil.Big` values representing the base fee for each block.

### GasUsedRatio

```go
GasUsedRatio # EthereumAPI

The `EthereumAPI` type is a collection of methods that provide access to Ethereum-related information.

## Functions

### ProtocolVersion

```go
func (s *EthereumAPI) ProtocolVersion() hexutil.Uint
```

`ProtocolVersion` returns the current Ethereum protocol version.

### ChainId

```go
func (s *EthereumAPI) ChainId() hexutil.Uint64
```

`ChainId` returns the current chain ID.

### BlockNumber

```go
func (s *EthereumAPI) BlockNumber() (hexutil.Uint64, error)
```

`BlockNumber` returns the current block number.

### GetBalance

```go
func (s *EthereumAPI) GetBalance(address common.Address, blockNumber rpc.BlockNumber) (*hexutil.Big, error)
```

`GetBalance` returns the balance of the given address at the given block number.

### GetStorageAt

```go
func (s *EthereumAPI) GetStorageAt(address common.Address, key common.Hash, blockNumber rpc.BlockNumber) (common.Hash, error)
```

`GetStorageAt` returns the value of the given key in the storage of the given address at the given block number.

### GetTransactionCount

```go
func (s *EthereumAPI) GetTransactionCount(address common.Address, blockNumber rpc.BlockNumber) (hexutil.Uint64, error)
```

`GetTransactionCount` returns the number of transactions sent from the given address at the given block number.

### GetBlockTransactionCountByHash

```go
func (s *EthereumAPI) GetBlockTransactionCountByHash(blockHash common.Hash) *hexutil.Uint
```

`GetBlockTransactionCountByHash` returns the number of transactions in the block with the given hash.

### GetBlockTransactionCountByNumber

```go
func (s *EthereumAPI) GetBlockTransactionCountByNumber(blockNumber rpc.BlockNumber) *hexutil.Uint
```

`GetBlockTransactionCountByNumber` returns the number of transactions in the block with the given # TxPoolAPI

The `TxPoolAPI` type provides an API for accessing the transaction pool of a node. It offers methods for retrieving the content of the pool, as well as the number of pending and queued transactions.

## Functions

### NewTxPoolAPI

```go
func NewTxPoolAPI(b Backend) *TxPoolAPI
```

`NewTxPoolAPI` creates a new `TxPoolAPI` and returns a pointer to it. It takes a `Backend` object.

### Content

```go
func (s *TxPoolAPI) Content() map[string]interface{}
```

`Content` retrieves the content of the transaction pool and returns it as a map. The map contains two keys, "pending" and "queued", each of which maps to a map of transactions.

### Status

```go
func (s *TxPoolAPI) Status() map[string]hexutil.Uint
```

`Status` returns the number of pending and queued transactions in the pool.

### Inspect

```go
func (s *TxPoolAPI) Inspect() map[string]map[string]map[string]string
```

`Inspect` retrieves the content of the transaction pool and flattens it into an easily inspectable list.

## Types

### EthereumAccountAPI

The `EthereumAccountAPI` type provides an API for accessing accounts managed by the node. It offers a method for retrieving the collection of accounts.

### PersonalAccountAPI

The `PersonalAccountAPI` type provides an API for accessing accounts managed by the node. It offers methods for creating, (un)locking, and listing accounts. It also provides a method for retrieving a list of wallets. # PersonalAccountAPI

The `PersonalAccountAPI` type provides an API for managing accounts, including listing wallets, opening wallets, deriving accounts, creating new accounts, importing raw keys, and unlocking accounts.

## Functions

### ListWallets

```go
func (s *PersonalAccountAPI) ListWallets() []rawWallet
```

`ListWallets` returns a list of all wallets managed by the account manager.

### OpenWallet

```go
func (s *PersonalAccountAPI) OpenWallet(url string, passphrase *string) error
```

`OpenWallet` initiates a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via the provided passphrase. Note, the method may return an extra challenge requiring a second open (e.g. the Trezor PIN matrix challenge).

### DeriveAccount

```go
func (s *PersonalAccountAPI) DeriveAccount(url string, path string, pin *bool) (accounts.Account, error)
```

`DeriveAccount` requests a HD wallet to derive a new account, optionally pinning it for later reuse.

### NewAccount

```go
func (s *PersonalAccountAPI) NewAccount(password string) (common.Address, error)
```

`NewAccount` creates a new account and returns the address for the new account.

### fetchKeystore

```go
func fetchKeystore(am *accounts.Manager) (*keystore.KeyStore, error)
```

`fetchKeystore` retrieves the encrypted keystore from the account manager.

### ImportRawKey

```go
func (s *PersonalAccountAPI) ImportRawKey(privkey string, password string) (common.Address, error)
```

`ImportRawKey` stores the given hex encoded ECDSA key into the key directory, encrypting it with the passphrase.

### UnlockAccount

```go
func (s *PersonalAccountAPI) UnlockAccount(ctx context.Context, addr common.Address, password string, duration *uint64) (bool, error)
```

`UnlockAccount` unlocks the account associated with the given address with the given password for duration seconds. If duration is nil it will use a default of 300 seconds. It returns an indication if the account was unlocked.

## Types

### rawWallet

` # PersonalAccountAPI

The `PersonalAccountAPI` type provides methods for managing accounts and signing transactions.

## Functions

### NewPersonalAccountAPI

```go
func NewPersonalAccountAPI(am accounts.Manager, b Backend) *PersonalAccountAPI
```

`NewPersonalAccountAPI` creates a new `PersonalAccountAPI` and returns a pointer to it. It takes an `accounts.Manager` and a `Backend`.

### UnlockAccount

```go
func (s *PersonalAccountAPI) UnlockAccount(addr common.Address, password string, duration *uint64) (bool, error)
```

`UnlockAccount` unlocks the account associated with the given address using the given password. If the account is already unlocked, `UnlockAccount` does nothing. If the account cannot be unlocked with the given password, `UnlockAccount` returns an error. If a duration is specified, the account will automatically re-lock after the given number of seconds.

### LockAccount

```go
func (s *PersonalAccountAPI) LockAccount(addr common.Address) bool
```

`LockAccount` locks the account associated with the given address when it's unlocked.

### signTransaction

```go
func (s *PersonalAccountAPI) signTransaction(ctx context.Context, args *TransactionArgs, passwd string) (*types.Transaction, error)
```

`signTransaction` sets defaults and signs the given transaction. The caller needs to ensure that the nonceLock is held, if applicable, and release it after the transaction has been submitted to the tx pool.

### SendTransaction

```go
func (s *PersonalAccountAPI) SendTransaction(ctx context.Context, args TransactionArgs, passwd string) (common.Hash, error)
```

`SendTransaction` creates a transaction from the given arguments and tries to sign it with the key associated with `args.From`. If the given password isn't able to decrypt the key it fails.

### SignTransaction

```go
func (s *PersonalAccountAPI) SignTransaction(ctx context.Context, args TransactionArgs, passwd string) (*SignTransactionResult, error)
```

`SignTransaction` creates a transaction from the given arguments and tries to sign it with the key associated with `args.From`. If the given password isn't able to decrypt the key it fails. The transaction is returned in RLP-form, not broadcast to other nodes # PersonalAccountAPI

The `PersonalAccountAPI` type provides an API for managing Ethereum accounts. It includes methods for signing data, recovering the address of a signer, initializing a new wallet, and unpairing a wallet.

## Functions

### Sign

```go
func (s *PersonalAccountAPI) Sign(ctx context.Context, data hexutil.Bytes, addr common.Address, passwd string) (hexutil.Bytes, error)
```

`Sign` signs the given data with the private key associated with the given address. The produced signature conforms to the secp256k1 curve R, S and V values, where the V value will be 27 or 28 for legacy reasons. The key used to calculate the signature is decrypted with the given password.

### EcRecover

```go
func (s *PersonalAccountAPI) EcRecover(ctx context.Context, data, sig hexutil.Bytes) (common.Address, error)
```

`EcRecover` returns the address for the account that was used to create the signature. The signature must conform to the secp256k1 curve R, S and V values, where the V value must be 27 or 28 for legacy reasons.

### InitializeWallet

```go
func (s *PersonalAccountAPI) InitializeWallet(ctx context.Context, url string) (string, error)
```

`InitializeWallet` initializes a new wallet at the provided URL, by generating and returning a new private key.

### Unpair

```go
func (s *PersonalAccountAPI) Unpair(ctx context.Context, url string, pin string) error
```

`Unpair` deletes a pairing between wallet and geth.

## Types

### BlockChainAPI

`BlockChainAPI` provides an API to access Ethereum blockchain data.

### NewBlockChainAPI

```go
func NewBlockChainAPI(b Backend) *BlockChainAPI
```

`NewBlockChainAPI` creates a new Ethereum blockchain API and returns a pointer to it. It takes a `Backend` object as an argument. # BlockChainAPI

The `BlockChainAPI` type provides methods for interacting with the blockchain. It includes methods for getting the chain ID, the block number of the chain head, and the balance of an address at a given block number. It also includes a method for getting the Merkle-proof for a given account and optionally some storage keys.

## Functions

### ChainId

```go
func (api *BlockChainAPI) ChainId() *hexutil.Big
```

`ChainId` returns the chain ID of the blockchain.

### BlockNumber

```go
func (s *BlockChainAPI) BlockNumber() hexutil.Uint64
```

`BlockNumber` returns the block number of the chain head.

### GetBalance

```go
func (s *BlockChainAPI) GetBalance(ctx context.Context, address common.Address, blockNrOrHash rpc.BlockNumberOrHash) (*hexutil.Big, error)
```

`GetBalance` returns the amount of wei for the given address in the state of the given block number. The `rpc.LatestBlockNumber` and `rpc.PendingBlockNumber` meta block numbers are also allowed.

### GetProof

```go
func (s *BlockChainAPI) GetProof(ctx context.Context, address common.Address, storageKeys []string, blockNrOrHash rpc.BlockNumberOrHash) (*AccountResult, error)
```

`GetProof` returns the Merkle-proof for a given account and optionally some storage keys.

## Types

### AccountResult

`AccountResult` is a result struct for `GetProof`. It includes the address, the Merkle-proof for the account, the balance, the code hash, the nonce, the storage hash, and the Merkle-proof for the storage keys.

### StorageResult

`StorageResult` is a result struct for `GetProof`. It includes the key, the value, and the Merkle-proof for the storage key.

## Helper Functions

### decodeHash

```go
func decodeHash(hexKey string) (common.Hash, error)
```

`decodeHash` parses a hex-encoded 32-byte hash. The input may optionally be prefixed by ` # BlockChainAPI

The `BlockChainAPI` type is an API for interacting with the Ethereum blockchain. It provides methods for retrieving block headers and blocks, as well as uncles.

## Functions

### decodeHash

```go
func decodeHash(s string) (common.Hash, error)
```

`decodeHash` decodes a hex string into a `common.Hash`. It returns an error if the hex string is invalid or too long.

### GetHeaderByNumber

```go
func (s *BlockChainAPI) GetHeaderByNumber(ctx context.Context, number rpc.BlockNumber) (map[string]interface{}, error)
```

`GetHeaderByNumber` returns the requested canonical block header. When `number` is -1, the chain head is returned. When `number` is -2, the pending chain head is returned.

### GetHeaderByHash

```go
func (s *BlockChainAPI) GetHeaderByHash(ctx context.Context, hash common.Hash) map[string]interface{}
```

`GetHeaderByHash` returns the requested header by hash.

### GetBlockByNumber

```go
func (s *BlockChainAPI) GetBlockByNumber(ctx context.Context, number rpc.BlockNumber, fullTx bool) (map[string]interface{}, error)
```

`GetBlockByNumber` returns the requested canonical block. When `number` is -1, the chain head is returned. When `number` is -2, the pending chain head is returned. When `fullTx` is true, all transactions in the block are returned, otherwise only the transaction hash is returned.

### GetBlockByHash

```go
func (s *BlockChainAPI) GetBlockByHash(ctx context.Context, hash common.Hash, fullTx bool) (map[string]interface{}, error)
```

`GetBlockByHash` returns the requested block. When `fullTx` is true, all transactions in the block are returned in full detail, otherwise only the transaction hash is returned.

### # BlockChainAPI

The `BlockChainAPI` type is an implementation of the Ethereum JSON-RPC API for interacting with the blockchain. It provides methods for querying information about blocks, transactions, and accounts.

## Functions

### NewBlockChainAPI

```go
func NewBlockChainAPI(b Backend) *BlockChainAPI
```

`NewBlockChainAPI` creates a new `BlockChainAPI` and returns a pointer to it. It takes a `Backend` object, which provides access to the blockchain.

### GetBlockByNumber

```go
func (s *BlockChainAPI) GetBlockByNumber(ctx context.Context, blockNr rpc.BlockNumber, fullTx bool) (interface{}, error)
```

`GetBlockByNumber` returns the block with the given number. If `fullTx` is true, it returns the full transaction objects instead of just the transaction hashes.

### GetBlockByHash

```go
func (s *BlockChainAPI) GetBlockByHash(ctx context.Context, blockHash common.Hash, fullTx bool) (interface{}, error)
```

`GetBlockByHash` returns the block with the given hash. If `fullTx` is true, it returns the full transaction objects instead of just the transaction hashes.

### GetUncleByBlockNumberAndIndex

```go
func (s *BlockChainAPI) GetUncleByBlockNumberAndIndex(ctx context.Context, blockNr rpc.BlockNumber, index hexutil.Uint) (interface{}, error)
```

`GetUncleByBlockNumberAndIndex` returns the uncle block with the given number and index.

### GetUncleCountByBlockNumber

```go
func (s *BlockChainAPI) GetUncleCountByBlockNumber(ctx context.Context, blockNr rpc.BlockNumber) *hexutil.Uint
```

`GetUncleCountByBlockNumber` returns the number of uncles in the block for the given block number.

### GetUncleCountByBlockHash

```go
func (s *BlockChainAPI) GetUncleCountByBlockHash(ctx context.Context, blockHash common.Hash) *hexutil.Uint
```

`GetUncleCountByBlock # evm

The `evm` package provides functions for executing Ethereum Virtual Machine (EVM) calls.

## Functions

### DoCall

```go
func DoCall(ctx context.Context, b Backend, args TransactionArgs, blockNrOrHash rpc.BlockNumberOrHash, overrides *StateOverride, timeout time.Duration, globalGasCap uint64) (*core.ExecutionResult, error)
```

`DoCall` executes an EVM call. It takes a context, a backend, transaction arguments, a block number or hash, state overrides, a timeout, and a global gas cap. It returns the execution result and an error.

### newRevertError

```go
func newRevertError(result *core.ExecutionResult) *revertError
```

`newRevertError` creates a new `revertError` from an execution result.

## Types

### BlockOverrides

`BlockOverrides` is a set of header fields to override.

### Apply

```go
func (diff *BlockOverrides) Apply(blockCtx *vm.BlockContext)
```

`Apply` overrides the given header fields into the given block context.

### revertError

`revertError` is an API error that encompasses an EVM revertal with JSON error code and a binary data blob.

### ErrorCode

```go
func (e *revertError) ErrorCode
```

`ErrorCode` returns the JSON error code for a revertal. # BlockChainAPI

The `BlockChainAPI` type is an implementation of the Ethereum JSON-RPC API. It provides methods for executing transactions and estimating gas costs.

## Functions

### Call

```go
func (s *BlockChainAPI) Call(ctx context.Context, args TransactionArgs, blockNrOrHash rpc.BlockNumberOrHash, overrides *StateOverride) (hexutil.Bytes, error)
```

`Call` executes the given transaction on the state for the given block number. Additionally, the caller can specify a batch of contract for fields overriding. Note, this function doesn't make and changes in the state/blockchain and is useful to execute and retrieve values.

### DoEstimateGas

```go
func DoEstimateGas(ctx context.Context, b Backend, args TransactionArgs, blockNrOrHash rpc.BlockNumberOrHash, gasCap uint64) (hexutil.Uint64, error)
```

`DoEstimateGas` estimates the gas cost of executing the given transaction on the state for the given block number. It uses a binary search to find the minimum gas required to execute the transaction. It also checks if the account has enough funds to pay for the gas.

## Types

### revertError

`revertError` is an error type that represents a transaction that has reverted. It contains the hex encoded revert reason.

### TransactionArgs

`TransactionArgs` is a struct that contains the arguments for a transaction.

### StateOverride

`StateOverride` is a struct that contains a batch of contract fields for overriding.

### Backend

`Backend` is an interface that defines the methods required for a blockchain backend.

### hexutil

`hexutil` is a package that provides encoding and decoding # BlockChainAPI

The `BlockChainAPI` type is an implementation of the Ethereum JSON-RPC API for interacting with the blockchain. It provides methods for querying information about blocks, transactions, and accounts.

## Functions

### NewBlockChainAPI

```go
func NewBlockChainAPI(b *core.BlockChain) *BlockChainAPI
```

`NewBlockChainAPI` creates a new `BlockChainAPI` and returns a pointer to it. It takes a `*core.BlockChain` object.

### BlockNumber

```go
func (s *BlockChainAPI) BlockNumber() hexutil.Uint64
```

`BlockNumber` returns the current block number.

### GetBlockByHash

```go
func (s *BlockChainAPI) GetBlockByHash(ctx context.Context, hash common.Hash, fullTx bool) (map[string]interface{}, error)
```

`GetBlockByHash` returns the block with the given hash. If `fullTx` is true, the returned block contains full transaction details, otherwise it will only contain transaction hashes.

### GetBlockByNumber

```go
func (s *BlockChainAPI) GetBlockByNumber(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash, fullTx bool) (map[string]interface{}, error)
```

`GetBlockByNumber` returns the block with the given number or hash. If `fullTx` is true, the returned block contains full transaction details, otherwise it will only contain transaction hashes.

### GetTransactionByHash

```go
func (s *BlockChainAPI) GetTransactionByHash(ctx context.Context, hash common.Hash) (map[string]interface{}, error)
```

`GetTransactionByHash` returns the transaction with the given hash.

### GetTransactionReceipt

```go
func # RPC

The `RPC` package provides functions for marshaling Ethereum data types to their RPC representations.

## Functions

### RPCMarshalHeader

```go
func RPCMarshalHeader(header *types.Header) map[string]interface{}
```

`RPCMarshalHeader` marshals a `types.Header` to its RPC representation.

### RPCMarshalBlock

```go
func RPCMarshalBlock(block *types.Block, inclTx bool, fullTx bool, chainConfig *params.ChainConfig) (map[string]interface{}, error)
```

`RPCMarshalBlock` marshals a `types.Block` to its RPC representation. It takes a boolean flag `inclTx` to indicate whether to include transactions in the output, and a boolean flag `fullTx` to indicate whether to include all transaction details in the output.

### (BlockChainAPI) rpcMarshalHeader

```go
func (s *BlockChainAPI) rpcMarshalHeader(ctx context.Context, header *types.Header) map[string]interface{}
```

`rpcMarshalHeader` uses the generalized output filler, then adds the total difficulty field, which requires a `BlockchainAPI`.

### (BlockChainAPI) rpcMarshalBlock

```go
func (s *BlockChainAPI) rpcMarshalBlock(ctx context.Context, b *types.Block, inclTx bool, fullTx bool) (map[string]interface{}, error)
```

`rpcMarshalBlock` uses the generalized output filler, then adds the total difficulty field, which requires a `BlockchainAPI`.

### newRPCTransaction

```go
func newRPCTransaction(tx *types.Transaction, blockHash common.Hash, blockNumber uint64, index uint64, baseFee *big.Int, config *params.ChainConfig) *RPCTransaction
```

`newRPCTransaction` returns a transaction that will serialize to the RPC representation, with the given location metadata set (if available).

## Types

### RPCTransaction

`RPCTransaction` represents a transaction that will serialize to the RPC representation of a transaction. It includes fields for the block hash, block number, # RPCTransaction

The `RPCTransaction` type is a struct that represents a transaction in the RPC format. It contains fields for the transaction's hash, nonce, gas limit, gas price, to address, value, input data, access list, chain ID, gas fee cap, and gas tip cap.

## Functions

### newRPCTransaction

```go
func newRPCTransaction(tx *types.Transaction, blockHash common.Hash, blockNumber uint64, index uint64, baseFee *big.Int, config *params.ChainConfig) *RPCTransaction
```

`newRPCTransaction` creates a new `RPCTransaction` and returns a pointer to it. It takes a `*types.Transaction`, the hash of the block containing the transaction, the block number, the transaction index, the base fee of the block, and the chain configuration.

### NewRPCPendingTransaction

```go
func NewRPCPendingTransaction(tx *types.Transaction, current *types.Header, config *params.ChainConfig) *RPCTransaction
```

`NewRPCPendingTransaction` returns a pending transaction that will serialize to the RPC representation. It takes a `*types.Transaction`, the current header, and the chain configuration.

### newRPCTransactionFromBlockIndex

```go
func newRPCTransactionFromBlockIndex(b *types.Block, index uint64, config *params.ChainConfig) *RPCTransaction
```

`newRPCTransactionFromBlockIndex` returns a transaction that will serialize to the RPC representation. It takes a `*types.Block`, the transaction index, and the chain configuration.

### newRPCRawTransactionFromBlockIndex

```go
func newRPCRawTransactionFromBlockIndex(b *types.Block, index uint64) hexutil.Bytes
```

`newRPCRawTransactionFromBlockIndex` returns the bytes of a transaction given a block and a transaction index. It takes a `*types.Block` and the transaction index.

### newRPCTransactionFromBlock # TransactionPool

The `TransactionPool` type is a pool of pending transactions. It provides methods for adding, removing, and querying transactions.

## Functions

### NewTransactionPool

```go
func NewTransactionPool(config *params.ChainConfig, txFeed event.Feed, scope event.SubscriptionScope) *TransactionPool
```

`NewTransactionPool` creates a new `TransactionPool` and returns a pointer to it. It takes a `*params.ChainConfig` object, an `event.Feed` object, and an `event.SubscriptionScope` object.

### Add

```go
func (pool *TransactionPool) Add(tx *types.Transaction) error
```

`Add` adds the given transaction to the pool.

### Remove

```go
func (pool *TransactionPool) Remove(tx *types.Transaction)
```

`Remove` removes the given transaction from the pool.

### Pending

```go
func (pool *TransactionPool) Pending() []*types.Transaction
```

`Pending` returns a slice of all pending transactions in the pool.

### Get

```go
func (pool *TransactionPool) Get(hash common.Hash) *types.Transaction
```

`Get` returns the transaction with the given hash, or `nil` if it is not in the pool.

### GetNonce

```go
func (pool *TransactionPool) GetNonce(addr common.Address) uint64
```

`GetNonce` returns the next nonce for the given address.

### GetTransactions

```go
func (pool *TransactionPool) GetTransactions(count int) []*types.Transaction
```

`GetTransactions` returns a slice of up to `count` transactions from the pool.

### GetTransactionsByHashes

```go
func (pool *TransactionPool) GetTransactionsByHashes(hashes []common.Hash) []*types.Transaction
```

`GetTransactionsByHashes` returns a slice of transactions with the given hashes.

### GetTransactionsByAddress

```go
func (pool *TransactionPool) GetTransactionsByAddress(addr common.Address # TransactionAPI

The `TransactionAPI` type provides methods for retrieving transaction information from the blockchain.

## Functions

### GetTransactionByBlockHashAndIndex

```go
func (s *TransactionAPI) GetTransactionByBlockHashAndIndex(ctx context.Context, blockHash common.Hash, index hexutil.Uint) *RPCTransaction
```

`GetTransactionByBlockHashAndIndex` returns the transaction for the given block hash and index.

### GetRawTransactionByBlockNumberAndIndex

```go
func (s *TransactionAPI) GetRawTransactionByBlockNumberAndIndex(ctx context.Context, blockNr rpc.BlockNumber, index hexutil.Uint) hexutil.Bytes
```

`GetRawTransactionByBlockNumberAndIndex` returns the bytes of the transaction for the given block number and index.

### GetRawTransactionByBlockHashAndIndex

```go
func (s *TransactionAPI) GetRawTransactionByBlockHashAndIndex(ctx context.Context, blockHash common.Hash, index hexutil.Uint) hexutil.Bytes
```

`GetRawTransactionByBlockHashAndIndex` returns the bytes of the transaction for the given block hash and index.

### GetTransactionCount

```go
func (s *TransactionAPI) GetTransactionCount(ctx context.Context, address common.Address, blockNrOrHash rpc.BlockNumberOrHash) (*hexutil.Uint64, error)
```

`GetTransactionCount` returns the number of transactions the given address has sent for the given block number.

### GetTransactionByHash

```go
func (s *TransactionAPI) GetTransactionByHash(ctx context.Context, hash common.Hash) (*RPCTransaction, error)
```

`GetTransactionByHash` returns the transaction for the given hash.

### GetRawTransactionByHash

```go
func (s *TransactionAPI) GetRawTransactionByHash(ctx context.Context, hash common.Hash) (hexutil.Bytes, error)
```

`GetRawTransactionByHash` returns the bytes of the transaction for the given hash.

### GetTransactionReceipt

```go
func (s *TransactionAPI) GetTransactionReceipt(ctx context.Context, hash common.Hash) (map[string]interface{}, error)
```

`GetTransactionReceipt` returns the transaction receipt for the given transaction hash. # TransactionAPI

The `TransactionAPI` type is a struct that provides methods for interacting with transactions in the Ethereum blockchain.

## Functions

### GetTransactionReceipt

```go
func (s *TransactionAPI) GetTransactionReceipt(ctx context.Context, hash common.Hash) (map[string]interface{}, error)
```

`GetTransactionReceipt` retrieves the receipt of a transaction with the given hash. If the receipt does not exist, the RPC method should return JSON null as per specification.

### sign

```go
func (s *TransactionAPI) sign(addr common.Address, tx *types.Transaction) (*types.Transaction, error)
```

`sign` is a helper function that signs a transaction with the private key of the given address.

### SubmitTransaction

```go
func SubmitTransaction(ctx context.Context, b Backend, tx *types.Transaction) (common.Hash, error)
```

`SubmitTransaction` is a helper function that submits a transaction to the transaction pool and logs a message.

### SendTransaction

```go
func (s *TransactionAPI) SendTransaction(ctx context.Context, args TransactionArgs) (common.Hash, error)
```

`SendTransaction` creates a transaction for the given argument, signs it, and submits it to the transaction pool.

## Types

### TransactionArgs

`TransactionArgs` is a struct that holds the arguments for creating a transaction.

```go
type TransactionArgs struct {
	From     common.Address `json:"from"`
	To       *common.Address `json:"to"`
	Gas      *hexutil.Uint64 `json:"gas"`
	GasPrice *hexutil.Big    `json:"gasPrice"`
	Value    *hexutil.Big    `json:"value"`
	Data     hexutil.Bytes  `json:"data"`
	Nonce    *hexutil.Uint64 `json:"nonce"`
}
```

### TransactionAPI

`TransactionAPI` is a struct that provides methods for interacting with transactions in the Ethereum blockchain.

```go
type TransactionAPI struct {
	b Backend
}
``` # TransactionAPI

The `TransactionAPI` type provides methods for creating, signing, and sending transactions.

## Functions

### SendTransaction

```go
func (s *TransactionAPI) SendTransaction(ctx context.Context, args TransactionArgs) (common.Hash, error)
```

`SendTransaction` creates and sends a transaction. It takes a `TransactionArgs` object and returns the transaction hash and an error. If the `Nonce` field of the `TransactionArgs` object is nil, it holds the mutex around signing to prevent concurrent assignment of the same nonce to multiple accounts.

### FillTransaction

```go
func (s *TransactionAPI) FillTransaction(ctx context.Context, args TransactionArgs) (*SignTransactionResult, error)
```

`FillTransaction` fills the defaults (nonce, gas, gasPrice or 1559 fields) on a given unsigned transaction, and returns it to the caller for further processing (signing + broadcast).

### SendRawTransaction

```go
func (s *TransactionAPI) SendRawTransaction(ctx context.Context, input hexutil.Bytes) (common.Hash, error)
```

`SendRawTransaction` adds the signed transaction to the transaction pool. The sender is responsible for signing the transaction and using the correct nonce.

### Sign

```go
func (s *TransactionAPI) Sign(addr common.Address, data hexutil.Bytes) (hexutil.Bytes, error)
```

`Sign` calculates an ECDSA signature for: keccak256("\x19Ethereum Signed Message:\n" + len(message) + message). The account associated with `addr` must be unlocked.

### SignTransaction

```go
func (s *TransactionAPI) SignTransaction(ctx context.Context, args TransactionArgs) (*SignTransactionResult, error)
```

`SignTransaction` signs the given transaction with the `from` account. The node needs to have the private key of the account corresponding with the given `from` address and it needs to be unlocked.

## Types

### SignTransactionResult

`SignTransactionResult` represents a RLP encoded signed transaction. # TransactionAPI

The `TransactionAPI` type is a collection of Ethereum APIs exposed over the transaction namespace. It provides methods for sending transactions, getting pending transactions, and resending transactions with new gas prices and limits.

## Functions

### NewTransactionAPI

```go
func NewTransactionAPI(b Backend, signer types.Signer) *TransactionAPI
```

`NewTransactionAPI` creates a new `TransactionAPI` and returns a pointer to it. It takes a `Backend` object and a `types.Signer` object.

### SendTransaction

```go
func (s *TransactionAPI) SendTransaction(ctx context.Context, args TransactionArgs) (*SignTransactionResult, error)
```

`SendTransaction` sends a transaction with the given arguments. It returns a `SignTransactionResult` object containing the signed transaction data and the signed transaction object.

### PendingTransactions

```go
func (s *TransactionAPI) PendingTransactions() ([]*RPCTransaction, error)
```

`PendingTransactions` returns the transactions that are in the transaction pool and have a from address that is one of the accounts this node manages.

### Resend

```go
func (s *TransactionAPI) Resend(ctx context.Context, sendArgs TransactionArgs, gasPrice *hexutil.Big, gasLimit *hexutil.Uint64) (common.Hash, error)
```

`Resend` accepts an existing transaction and a new gas price and limit. It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

## Types

### SignTransactionResult

`SignTransactionResult` is a struct containing the signed transaction data and the signed transaction object.

### RPCTransaction

`RPCTransaction` is a struct containing the transaction data in a format suitable for RPC.

### TransactionArgs

`TransactionArgs` is a struct containing the arguments for sending a transaction.

### DebugAPI

The `DebugAPI` type # DebugAPI

The `DebugAPI` type provides methods for debugging the blockchain.

## Functions

### GetRawBlock

```go
func (api *DebugAPI) GetRawBlock(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) (hexutil.Bytes, error)
```

`GetRawBlock` retrieves the RLP encoded for a single block.

### GetRawReceipts

```go
func (api *DebugAPI) GetRawReceipts(ctx context.Context, blockNrOrHash rpc.BlockNumberOrHash) ([]hexutil.Bytes, error)
```

`GetRawReceipts` retrieves the binary-encoded receipts of a single block.

### GetRawTransaction

```go
func (s *DebugAPI) GetRawTransaction(ctx context.Context, hash common.Hash) (hexutil.Bytes, error)
```

`GetRawTransaction` returns the bytes of the transaction for the given hash.

### PrintBlock

```go
func (api *DebugAPI) PrintBlock(ctx context.Context, number uint64) (string, error)
```

`PrintBlock` retrieves a block and returns its pretty printed form.

### SeedHash

```go
func (api *DebugAPI) SeedHash(ctx context.Context, number uint64) (string, error)
```

`SeedHash` retrieves the seed hash of a block.

### ChaindbProperty

```go
func (api *DebugAPI) ChaindbProperty(property string) (string, error)
```

`ChaindbProperty` returns leveldb properties of the key-value database.

### ChaindbCompact

```go
func (api *DebugAPI) ChaindbCompact() error
```

`ChaindbCompact` flattens the entire key-value database into a single level, removing all unused slots and merging all keys.

### SetHead

```go
func # NetAPI

The `NetAPI` type is a struct that provides methods for interacting with the Ethereum network.

## Functions

### Listening

```go
func (s *NetAPI) Listening() bool
```

`Listening` returns true, indicating that the node is always listening.

### PeerCount

```go
func (s *NetAPI) PeerCount() hexutil.Uint
```

`PeerCount` returns the number of connected peers.

### Version

```go
func (s *NetAPI) Version() string
```

`Version` returns the current Ethereum protocol version.

### checkTxFee

```go
func checkTxFee(gasPrice *big.Int, gas uint64, cap float64) error
```

`checkTxFee` is an internal function used to check whether the fee of the given transaction is reasonable (under the cap). It takes the gas price, gas limit, and fee cap as arguments. If the fee exceeds the cap, `checkTxFee` returns an error.

### toHexSlice

```go
func toHexSlice(b [][]byte) []string
```

`toHexSlice` creates a slice of hex-strings based on a slice of byte slices. It takes a slice of byte slices as an argument and returns a slice of hex-strings.