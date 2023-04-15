## Package web3ext

The `web3ext` package contains geth specific web3.js extensions. It contains a `Modules` variable which is a map of module names to their corresponding JavaScript code.

```go
var Modules = map[string]string{
    "admin":    AdminJs,
    "clique":   CliqueJs,
    "ethash":   EthashJs,
    "debug":    DebugJs,
    "eth":      EthJs,
    "miner":    MinerJs,
    "net":      NetJs,
    "personal": PersonalJs,
    "rpc":      RpcJs,
    "txpool":   TxpoolJs,
    "les":      LESJs,
    "vflux":    VfluxJs,
}
```

### CliqueJs

The `CliqueJs` constant is a string containing JavaScript code for the `clique` module. It extends the `web3` object with methods and properties specific to the Clique consensus algorithm.

### EthashJs

The `EthashJs` constant is a string containing JavaScript code for the `ethash` module. It extends the `web3` object with methods specific to the Ethash proof-of-work algorithm.

### AdminJs

The `AdminJs` constant is a string containing JavaScript code for the `admin` module. It extends the `web3` object with methods specific to the administration of a geth node.

## Methods

Each module has its own set of methods that are added to the `web3` object. These methods are defined in the JavaScript code for each module.

## Properties

Each module may also have its own set of properties that are added to the `web3` object. These properties are defined in the JavaScript code for each module. ## Web3.js Admin Extension

The `admin` extension of the `web3.js` library provides a set of methods and properties to interact with the Ethereum node's administrative functions. The `admin` extension is used to manage the Ethereum node, such as starting and stopping the node, managing peers, and retrieving node information.

### AdminJs

The `AdminJs` code is a JavaScript code that extends the `web3.js` library with the `admin` extension. It contains a set of methods and properties to interact with the Ethereum node's administrative functions.

#### Methods

The `admin` extension provides the following methods:

- `addPeer(enodeUrl)`: Adds a new peer to the Ethereum node.
- `removePeer(enodeUrl)`: Removes a peer from the Ethereum node.
- `startRPC(host, port, cors, apis, callback)`: Starts the RPC server for the Ethereum node.
- `stopRPC(callback)`: Stops the RPC server for the Ethereum node.
- `startHTTP(host, port, cors, apis, callback)`: Starts the HTTP server for the Ethereum node.
- `stopHTTP(callback)`: Stops the HTTP server for the Ethereum node.
- `startWS(host, port, cors, callback)`: Starts the WebSocket server for the Ethereum node.
- `stopWS(callback)`: Stops the WebSocket server for the Ethereum node.

#### Properties

The `admin` extension provides the following properties:

- `nodeInfo`: Returns information about the Ethereum node.
- `peers`: Returns a list of connected peers.
- `datadir`: Returns the data directory of the Ethereum node.

### DebugJs

The `DebugJs` code is a JavaScript code that extends the `web3.js` library with the `debug` extension. It contains a set of methods to interact with the Ethereum node's debugging functions.

#### Methods

The `debug` extension provides the following methods:

- `accountRange(fromBlock, toBlock, address, maxResults, direction, callback)`: Returns a list of accounts and their balances within a specified block range.
- `printBlock(blockNumber)`: Prints the specified block to the console.
- `getRawHeader(blockNumber)`: Returns the raw header of the specified block.
- `getRawBlock(blockNumber)`: Returns the raw block data of the specified block.
- `getRawReceipts(blockNumber)`: Returns the raw receipts of the specified block.
- `getRawTransaction(txHash)`: Returns the raw transaction data of the specified transaction.
- `setHead(blockNumber)`: Sets the head block of the Ethereum node.
- `seedHash(blockNumber)`: Returns the seed hash of the specified block.
- `dumpBlock(blockNumber)`: Dumps the specified block to the console.
- `chaindbProperty(property)`: Returns ## Overview

The `debug` module is a part of the `web3` library that provides methods for debugging and profiling Ethereum nodes. It contains a large number of methods that allow developers to trace transactions, blocks, and storage, as well as to profile the performance of their nodes.

## Methods

### debug.verbosity

The `verbosity` method returns the current verbosity level of the debug output.

```js
web3.debug.verbosity
```

### debug.setVerbosity

The `setVerbosity` method sets the verbosity level of the debug output.

```js
web3.debug.setVerbosity(2)
```

### debug.traceTransaction

The `traceTransaction` method traces the execution of a transaction and returns a JSON object with the trace data.

```js
web3.debug.traceTransaction('0x123...')
```

### debug.traceBlock

The `traceBlock` method traces the execution of a block and returns a JSON object with the trace data.

```js
web3.debug.traceBlock('0x123...')
```

### debug.storageRangeAt

The `storageRangeAt` method returns a range of storage values for a given contract address, key, and block number.

```js
web3.debug.storageRangeAt('0x123...', '0x456...', 0, 100, function(err, result) {...})
```

### debug.getModifiedAccountsByNumber

The `getModifiedAccountsByNumber` method returns a list of modified accounts for a given block number.

```js
web3.debug.getModifiedAccountsByNumber(100, 200, function(err, result) {...})
```

### debug.getModifiedAccountsByHash

The `getModifiedAccountsByHash` method returns a list of modified accounts for a given block hash.

```js
web3.debug.getModifiedAccountsByHash('0x123...', 200, function(err, result) {...})
```

### debug.getBlockRlp

The `getBlockRlp` method returns the RLP-encoded block data for a given block number.

```js
web3.debug.getBlockRlp(100, function(err, result) {...})
```

### debug.getBlockByHash

The `getBlockByHash` method returns the block data for a given block hash.

```js
web3.debug.getBlockByHash('0x123...', function(err, result) {...})
```

### debug.getBlockByNumber

The `getBlockByNumber` method returns the block data for a given block number.

```js
web3.debug.getBlockByNumber(100, function(err, result) {...})
```

### debug.getBlockTransactionCountByHash

The `getBlockTransactionCountByHash` method returns the number of transactions in a given block hash.

```js
web3.debug.getBlockTransactionCountByHash('0x123...', function(err, result) {...})
```

### debug.getBlockTransactionCountByNumber

The `getBlockTransactionCountByNumber` method returns the number of transactions in a given block number.

```js
web3.debug.getBlockTransactionCountByNumber(100, function(err, result) {...})
```

### debug.getTransaction ## EthJs

The `EthJs` code is a JavaScript object that extends the `web3` object with additional methods and properties related to the Ethereum network. It contains an array of `Method` objects and an array of `Property` objects.

### Methods

The `Method` objects represent methods that can be called on the `eth` property of the `web3` object. Each `Method` object has a `name`, `call`, `params`, `inputFormatter`, and `outputFormatter` field.

#### chainId

The `chainId` method returns the chain ID of the current Ethereum network. It takes no arguments.

```js
new web3._extend.Method({
    name: 'chainId',
    call: 'eth_chainId',
    params: 0
})
```

#### sign

The `sign` method signs a message with the private key of an Ethereum account. It takes two arguments, an Ethereum address and a message to sign.

```js
new web3._extend.Method({
    name: 'sign',
    call: 'eth_sign',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputAddressFormatter, null]
})
```

#### resend

The `resend` method resends a transaction with a higher gas price. It takes three arguments, a transaction object, a new gas price, and a new gas limit.

```js
new web3._extend.Method({
    name: 'resend',
    call: 'eth_resend',
    params: 3,
    inputFormatter: [web3._extend.formatters.inputTransactionFormatter, web3._extend.utils.fromDecimal, web3._extend.utils.fromDecimal]
})
```

#### signTransaction

The `signTransaction` method signs a transaction with the private key of an Ethereum account. It takes one argument, a transaction object.

```js
new web3._extend.Method({
    name: 'signTransaction',
    call: 'eth_signTransaction',
    params: 1,
    inputFormatter: [web3._extend.formatters.inputTransactionFormatter]
})
```

#### estimateGas

The `estimateGas` method estimates the gas required for a transaction. It takes two arguments, a call object and a block number.

```js
new web3._extend.Method({
    name: 'estimateGas',
    call: 'eth_estimateGas',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputCallFormatter, web3._extend.formatters.inputBlockNumberFormatter],
    outputFormatter: web3._extend.utils.toDecimal
})
```

#### submitTransaction

The `submitTransaction` method submits a transaction to the Ethereum network. It takes one argument, a transaction object.

```js
new web3._extend.Method({
    name: 'submitTransaction',
    call: 'eth_submitTransaction',
    params: 1,
    inputFormatter: [web3._extend.formatters.inputTransactionFormatter]
})
```

#### fillTransaction

The `fillTransaction` method fills in missing fields of a transaction object. It takes one argument, a transaction object.

```js
new web3._extend.Method({
    name: 'fillTransaction',
    call: 'eth_fillTransaction',
    params: 1,
    inputFormatter: [web3._extend.formatters.inputTransactionFormatter]
})
```

#### getHeaderByNumber

The ` ## Source Code Documentation

The following is a documentation of the source code provided. The code is written in JavaScript and is used to extend the functionality of the web3.js library.

### eth

The `eth` object is extended with additional methods and properties.

#### Methods

##### `getBlockByNumber`

This method retrieves a block by its number.

```js
new web3._extend.Method({
    name: 'getBlockByNumber',
    call: 'eth_getBlockByNumber',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputBlockNumberFormatter, function(val) { return !!val; }]
})
```

##### `getBlockByHash`

This method retrieves a block by its hash.

```js
new web3._extend.Method({
    name: 'getBlockByHash',
    call: 'eth_getBlockByHash',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputBlockHashFormatter, function(val) { return !!val; }]
})
```

##### `getTransactionByHash`

This method retrieves a transaction by its hash.

```js
new web3._extend.Method({
    name: 'getTransactionByHash',
    call: 'eth_getTransactionByHash',
    params: 1,
    inputFormatter: [web3._extend.formatters.inputTransactionHashFormatter]
})
```

##### `getTransactionReceipt`

This method retrieves the receipt of a transaction.

```js
new web3._extend.Method({
    name: 'getTransactionReceipt',
    call: 'eth_getTransactionReceipt',
    params: 1,
    inputFormatter: [web3._extend.formatters.inputTransactionHashFormatter]
})
```

##### `getUncleByBlockHashAndIndex`

This method retrieves an uncle by its block hash and index.

```js
new web3._extend.Method({
    name: 'getUncleByBlockHashAndIndex',
    call: 'eth_getUncleByBlockHashAndIndex',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputBlockHashFormatter, web3._extend.utils.toDecimal]
})
```

##### `getUncleByBlockNumberAndIndex`

This method retrieves an uncle by its block number and index.

```js
new web3._extend.Method({
    name: 'getUncleByBlockNumberAndIndex',
    call: 'eth_getUncleByBlockNumberAndIndex',
    params: 2,
    inputFormatter: [web3._extend.formatters.inputBlockNumberFormatter, web3._extend.utils.toDecimal]
})
```

##### `getCompilers`

This method retrieves a list of available compilers.

```js
new web3._extend.Method({
    name: 'getCompilers',
    call: 'eth_getCompilers',
    params: 0
})
```

##### `compile.solidity`

This method compiles a Solidity contract.

```js
new web3._extend.Method({
    name: 'compile.solidity',
    call: 'eth_compileSolidity',
    params: 1
})
```

##### `compile.lll ## Source Code Documentation

The following code snippets define two web3 extensions, `les` and `vflux`. These extensions provide additional functionality to the web3 object.

### les

The `les` extension provides additional methods and properties for interacting with a Light Ethereum Subprotocol (LES) server.

```js
web3._extend({
	property: 'les',
	methods:
	[
		new web3._extend.Method({
			name: 'getHeader',
			call: 'les_getBlockHeaders',
			params: 2
		}),
		new web3._extend.Method({
			name: 'getBlockBodies',
			call: 'les_getBlockBodies',
			params: 1
		}),
		new web3._extend.Method({
			name: 'getReceipts',
			call: 'les_getReceipts',
			params: 1
		}),
		new web3._extend.Method({
			name: 'getProof',
			call: 'les_getProof',
			params: 3
		}),
		new web3._extend.Method({
			name: 'getChainProof',
			call: 'les_getChainProof',
			params: 3
		}),
		new web3._extend.Method({
			name: 'getAccountProof',
			call: 'les_getAccountProof',
			params: 2
		}),
		new web3._extend.Method({
			name: 'getStorageProof',
			call: 'les_getStorageProof',
			params: 3
		}),
		new web3._extend.Method({
			name: 'getContractCodes',
			call: 'les_getContractCodes',
			params: 1
		}),
		new web3._extend.Method({
			name: 'getCheckpoint',
			call: 'les_getCheckpoint',
			params: 1
		}),
		new web3._extend.Method({
			name: 'clientInfo',
			call: 'les_clientInfo',
			params: 1
		}),
		new web3._extend.Method({
			name: 'priorityClientInfo',
			call: 'les_priorityClientInfo',
			params: 3
		}),
		new web3._extend.Method({
			name: 'setClientParams',
			call: 'les_setClientParams',
			params: 2
		}),
		new web3._extend.Method({
			name: 'setDefaultParams',
			call: 'les_setDefaultParams',
			params: 1
		}),
		new web3._extend.Method({
			name: 'addBalance',
			call: 'les_addBalance',
			params: 2
		}),
	],
	properties:
	[
		new web3._extend.Property({
			name: 'latestCheckpoint',
			getter: 'les_latestCheckpoint'
		}),
		new web3._extend.Property({
			name: 'checkpointContractAddress',
			getter: 'les_getCheckpointContractAddress'
		}),
		new web3._extend.Property({
			name: 'serverInfo',
			getter: 'les_serverInfo'
		}),
	]
});
```

#### Methods

The `les` extension provides the following methods:

- `getHeader`: Returns the block headers for the specified block range.
- `getBlockBodies`: Returns the block bodies for the specified block range.
- `getReceipts`: Returns the receipts for the specified block range.
- `getProof`: Returns a proof for the specified account and storage key.
- `getChainProof`: Returns a proof for the specified block range.
- `getAccountProof`: Returns a proof for the specified account.
- `getStorageProof`: Returns a proof for the specified storage key.
- `getContractCodes`: Returns the contract codes for the specified block range.
- `getCheckpoint`: Returns the checkpoint for the specified block number.
- `clientInfo`: Returns information about the LES client.
- `priorityClientInfo`: Returns information about the priority of the LES client.
- `setClientParams`: Sets the parameters for the LES client.
- `setDefaultParams`: Sets the default parameters for the LES client.
- `addBalance`: Adds balance to the LES client.

#### Properties

The `les` extension provides the following properties:

- `latestCheckpoint`: Returns the latest checkpoint.
- `checkpointContractAddress`: Returns the checkpoint contract address.
- `serverInfo`: Returns information about the LES server.

### vflux

The `vflux` extension provides additional methods and properties for interacting with a Vflux server.

```js
const VfluxJs = `
web3._extend({
	property: 'vflux',
	methods:
	[
		new web3._extend.Method({
			name: 'distribution',
			call: 'vflux_distribution',
			params: 2
		}),
		new web3._extend.Method({
			name: 'timeout',
			call: 'vflux_timeout',
			params: 2
		}),
		new web3._extend.Method({
			name: 'value',
			call: 'vflux_value',
			params: 2
		}),
	],
	properties:
	[
		new web3._extend.Property({
			name: 'requestStats',
			getter: 'vflux_requestStats'
		}),
	]
});
```

#### Methods

The `vflux` extension provides the following methods:

- `distribution`: Returns the distribution of values for the specified range.
- `timeout`: Returns the timeout for the specified range.
- `value`: Returns the value for the specified range.

#### Properties

The `vflux` extension provides the following properties:

- `requestStats`: Returns statistics about the Vflux server requests.