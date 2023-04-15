Consensus Package Documentation

The `consensus` package implements different Ethereum consensus engines. It defines a set of interfaces that provide access to the local blockchain during header and/or uncle verification. It also defines an algorithm agnostic consensus engine interface.

ChainHeaderReader Interface

The `ChainHeaderReader` interface defines a small collection of methods needed to access the local blockchain during header verification. It includes the following methods:

- `Config() *params.ChainConfig`: retrieves the blockchain's chain configuration.
- `CurrentHeader() *types.Header`: retrieves the current header from the local chain.
- `GetHeader(hash common.Hash, number uint64) *types.Header`: retrieves a block header from the database by hash and number.
- `GetHeaderByNumber(number uint64) *types.Header`: retrieves a block header from the database by number.
- `GetHeaderByHash(hash common.Hash) *types.Header`: retrieves a block header from the database by its hash.
- `GetTd(hash common.Hash, number uint64) *big.Int`: retrieves the total difficulty from the database by hash and number.

ChainReader Interface

The `ChainReader` interface defines a small collection of methods needed to access the local blockchain during header and/or uncle verification. It extends the `ChainHeaderReader` interface and includes the following additional method:

- `GetBlock(hash common.Hash, number uint64) *types.Block`: retrieves a block from the database by hash and number.

Engine Interface

The `Engine` interface is an algorithm agnostic consensus engine. It defines a set of methods that must be implemented by any consensus engine. It includes the following methods:

- `Author(header *types.Header) (common.Address, error)`: retrieves the Ethereum address of the account that minted the given block, which may be different from the header's coinbase if a consensus engine is based on signatures.
- `VerifyHeader(chain ChainHeaderReader, header *types.Header, seal bool) error`: checks whether a header conforms to the consensus rules of a given engine. Verifying the seal may be done optionally here, or explicitly via the VerifySeal method.
- `VerifyHeaders(chain ChainHeaderReader, headers []*types.Header, seals []bool) (chan<- struct{}, <-chan error)`: verifies a batch of headers concurrently. The method returns a quit channel to abort the operations and a results channel to retrieve the async verifications (the order is that of the input slice).
- `VerifyUncles(chain ChainReader, block *types.Block) error`: verifies that the given block's uncles conform to the consensus rules of a given engine.
- `Prepare(chain ChainHeaderReader, header *types.Header) error`: initializes the consensus fields of a block header according to the rules of a particular engine. The changes are executed inline.
- `Finalize(chain ChainHeaderReader, header *types.Header, state *state.StateDB, txs []*types.Transaction, receipts []*types.Receipt) error`: runs any post-transaction state modifications (e.g. block rewards) according to the rules of a particular engine. The changes are executed inline.

License

The `consensus` package is part of the go-ethereum library, which is free software released under the GNU Lesser General Public License version 3 or any later version. For more details, please refer to the license file in the go-ethereum repository. ## Interface Documentation

### `type Engine interface`

The `Engine` interface defines the methods that a consensus engine must implement. It has the following methods:

#### `func Init(chain ChainHeaderReader, engineCtx *EngineContext) error`

The `Init` function is a method of the `Engine` interface that takes in a `ChainHeaderReader` type and an `EngineContext` type and returns an error. It initializes the consensus engine with the given `ChainHeaderReader` and `EngineContext`.

#### `func Author(header *types.Header) (common.Address, error)`

The `Author` function is a method of the `Engine` interface that takes in a `Header` type and returns a `common.Address` type and an error. It returns the address of the block author for the given `Header`.

#### `func VerifyHeader(chain ChainHeaderReader, header *types.Header, uncle *types.Header) error`

The `VerifyHeader` function is a method of the `Engine` interface that takes in a `ChainHeaderReader` type, a `Header` type, and an uncle `Header` type and returns an error. It verifies the given `Header` and uncle `Header` against the consensus rules of the consensus engine.

#### `func VerifyHeaders(chain ChainHeaderReader, headers []*