## Package downloader

The `downloader` package provides a way to download and synchronize the Ethereum blockchain. It includes a downloader service that can be used to download blocks and headers from the network, and a chain manager that can be used to manage the downloaded blocks and headers.

### Constants

- `fullMaxForkAncestry`: Maximum number of blocks that can be downloaded in a full sync.
- `lightMaxForkAncestry`: Maximum number of blocks that can be downloaded in a light sync.
- `blockCacheMaxItems`: Maximum number of blocks that can be cached in memory.
- `fsHeaderSafetyNet`: Number of headers that can be downloaded in a fast sync.
- `fsHeaderContCheck`: Time interval for checking the continuity of headers in a fast sync.

### Variables

- `testKey`: A test private key used for generating test chains.
- `testAddress`: A test address generated from the test private key.
- `testDB`: A test database used for storing test chains.
- `testGspec`: A test genesis block specification.
- `testGenesis`: A test genesis block generated from the test genesis block specification.
- `testChainBase`: A test chain used as the base chain for generating other test chains.
- `testChainForkLightA`, `testChainForkLightB`, `testChainForkHeavy`: Test chains generated from the base chain.

### Functions

#### `init()`

The `init()` function initializes the test chains used by the downloader package. It generates the base chain and three forks on top of the base chain. It also generates other test chains used in various downloader tests.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### `newTestChain(maxItems int, genesis *core.Genesis) *testChain`

The `newTestChain()` function creates a new test chain with the specified maximum number of cached blocks and the specified genesis block.

#### ` The code provided is a Go implementation of a blockchain. The codebase contains several functions and types that are used to create and manipulate test blockchains. The code is well-documented, and each function has a clear and concise description.

The `testChain` type represents a test blockchain and contains an array of `*types.Block` pointers. The `newTestChain` function creates a new test blockchain of the given length and genesis block. The `makeFork` function creates a fork on top of the test chain. The `shorten` function creates a copy of the chain with the given length. The `copy` function creates a copy of the test chain with the given length.

The `generate` function creates a chain of n blocks starting at and including parent. The returned hash chain is ordered head->parent. In addition, every 22nd block contains a transaction, and every 5th block contains an uncle to allow testing correct block reassembly.

The `testBlockchain` type represents a blockchain database built by running the given blocks. The `newTestBlockchain` function creates a blockchain database built by running the given blocks, either actually running them or reusing a previously created one. The returned chains are *shared*, so *do not* mutate them.

The code also contains several constants and variables used to configure the blockchain. The `testBlockchains` variable is a map of `common.Hash` to `*testBlockchain`. The `testBlockchainsLock` variable is a mutex used to synchronize access to the `testBlockchains` map.

Overall, the codebase is well-organized and well-documented, making it easy to understand and modify. ## Function: `gen.Do()`

The `gen.Do()` function generates a new blockchain by creating a new `BlockChain` instance and inserting a chain of blocks into it. It returns the generated blockchain.

### Parameters

- None

### Return Value

- `*core.BlockChain`: The generated blockchain.

### Functionality

The function first checks if the blockchain has already been pre-generated. If it has, it throws a panic with the message "Requested chain generation outside of init". 

Next, it creates a new `BlockChain` instance using a memory database, a test genesis block specification, and a fake Ethash algorithm. It then inserts a chain of blocks into the blockchain using the `InsertChain()` function. If an error occurs during the insertion, the function throws a panic with the message "block {n}: {error message}".

Finally, the function sets the generated blockchain as the `chain` property of the `tbc` struct and returns it.

Note: The `pregenerated` variable is assumed to be a boolean that indicates whether the blockchain has already been pre-generated. The `blocks` variable is assumed to be a slice of `*types.Block` that represents the chain of blocks to be inserted into the blockchain.