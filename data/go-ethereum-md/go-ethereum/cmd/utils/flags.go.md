# Utils

The `utils` package contains internal helper functions for go-ethereum commands.

## Functions

### `FatalIfError(err error)`

The `FatalIfError()` function checks if an error is not nil and exits the program with a fatal error message if it is. The function takes an `error` parameter and returns nothing.

### `Fatal(err error, msg string)`

The `Fatal()` function logs a fatal error message and exits the program. The function takes an `error` parameter and a message string parameter and returns nothing.

### `FatalUsage(msg string)`

The `FatalUsage()` function logs a fatal error message and exits the program with the usage information. The function takes a message string parameter and returns nothing.

### `GetPassPhrase(prompt string, confirm bool) string`

The `GetPassPhrase()` function retrieves a passphrase from the user. The function takes a prompt string parameter and a confirm boolean parameter. If the confirm parameter is true, the function will ask the user to confirm the passphrase. The function returns the passphrase as a string.

### `GetKeystoreDir() string`

The `GetKeystoreDir()` function retrieves the keystore directory path. The function # Geth Command-Line Flags

The `geth` program is the command-line interface for running a full Ethereum node. It provides a wide range of command-line flags for configuring the node's behavior. Here are some of the most important flags:

## Data Directory Flags

- `--datadir`: The root directory for the node's data. Default is `~/.ethereum`.
- `--cache`: The amount of memory (in MB) allocated for caching the blockchain data. Default is `1024`.
- `--trie-cache-gens`: The number of trie generations to # Ethereum Configuration Flags

The Ethereum Configuration Flags are a set of command-line flags that can be used to configure the Ethereum client. These flags are used to set various parameters related to the blockchain sync mode, garbage collection mode, snapshot-database mode, transaction lookup limit, key-derivation function (KDF) strength, bloom-filter size, and other settings.

## Functions

There are no functions in this code snippet.

## Command-line Flags

- `limit`: The maximum number of elements (0 = no limit).
- `syncmode`: The blockchain sync mode ("snap", "full" or "light").
- `gcmode`: The blockchain garbage collection mode ("full", "archive").
- `snapshot`: Enables snapshot-database mode (default = enable).
- `txlookuplimit`: The number of recent blocks to maintain transactions index for (default = about one # Command-line Flags

The `flags` package defines the command-line flags used by the `geth` program. The flags are organized into categories based on their functionality.

## General Flags

### `VersionFlag`

The `VersionFlag` is a boolean flag that prints the version of `geth` and exits.

### `HelpFlag`

The `HelpFlag` is a boolean flag that prints the help message and exits.

### `DatadirFlag`

The `DatadirFlag` is a directory flag that specifies the data directory for `geth`.

### `KeystoreFlag`

The `KeystoreFlag` is a directory flag that specifies the keystore directory for `geth`.

### ` # Command-Line Flags

The `flags` package defines various command-line flags that can be used to configure the Ethereum client. These flags are organized into categories such as `NetworkCategory`, `TxPoolCategory`, `PerfCategory`, and `MinerCategory`.

## Network Settings

### `NetworkIdFlag`

The `NetworkIdFlag` flag specifies the network ID of the Ethereum network. The default value is `1` for the mainnet.

### `GenesisFlag`

The `GenesisFlag` flag specifies the path to the genesis JSON file for the Ethereum network.

### `BootnodesFlag`

The `BootnodesFlag` flag specifies the list of bootnodes for the Ethereum network.

### `MaxPeersFlag`

The `MaxPeersFlag` flag specifies the maximum number of peers that the Ethereum client can connect to.

### `NoDiscoveryFlag`

The `NoDiscovery # Command-Line Flags

The `geth` command-line tool provides a variety of flags that can be used to configure the Ethereum node. These flags are organized into categories, such as `Network`, `Miner`, `Account`, `VM`, and `API`. Each flag has a name, usage message, default value, and category.

## Network Flags

- `--networkid`: The network identifier. Default is `1`.
- `--nodiscover`: Disable the peer discovery mechanism.
- `--maxpeers`: The maximum number of peers to connect to. Default is `25`.
- `--nat`: The NAT traversal method. Can be `none`, `upnp`, `pmp`, or `extip:<IP>`. Default is `upnp`.
- `--port # Command-Line Flags

The `flags` package provides a set of command-line flags for the Ethereum node. These flags are used to configure various aspects of the node, such as networking, logging, and RPC.

## Networking Flags

- `--bootnodes`: A comma-separated list of bootstrap nodes to connect to.
- `--maxpeers`: The maximum number of peers to connect to.
- `--nat`: The NAT traversal method to use. Can be `any`, `none`, `upnp`, `pmp`, `pmp:<IP>`, or `extip:<IP>`.
- `--port`: The TCP/UDP port to listen on.
- `--nodekey`: The filename of the node's private key.
- `--nodekeyhex`: The node's private key as a hexadecimal string.
- `--nodekey`: The # Command-Line Flags

The `flags` package defines the command-line flags used by the `geth` program. The flags are organized into categories, such as `APICategory` and `NetworkingCategory`, to make them easier to find and understand.

## API Settings

- `--rpc`: Enable the JSON-RPC server.
- `--rpcaddr`: JSON-RPC server listening interface.
- `--rpcport`: JSON-RPC server listening port.
- `--rpcapi`: API's offered over the JSON-RPC interface.
- `--rpccorsdomain`: Comma separated list of domains from which to # Command-line Flags

This file contains the definition of various command-line flags used in the Geth client. These flags are used to configure various aspects of the client, such as networking, console, gas price oracle settings, and metrics.

## DiscoveryPortFlag

The `DiscoveryPortFlag` is an `IntFlag` that specifies the custom UDP port to be used for P2P discovery. The default value is `30303`.

## Console Flags

The `JSpathFlag` is a `DirectoryFlag` that specifies the JavaScript root path for `loadScript`. The default value is `.`.

The `HttpHeaderFlag` is a `StringSliceFlag` that passes custom headers to the RPC server when using `--remote` or the Geth attach console. This flag can be given multiple times.

## Gas Price Oracle Settings Flags

The `GpoBlocksFlag` is an `IntFlag` that specifies the number of recent blocks to check for gas prices. The default value is `ethconfig.Defaults.GPO.Blocks`.

The `GpoPercentileFlag` is an `IntFlag` that specifies the # Command-Line Flags

The `flags` package defines various command-line flags used by the `geth` program.

## Metrics Flags

- `metrics`: Enable metrics collection and reporting.
- `metrics.influxdb`: Enable metrics export/push to an external InfluxDB database.
- `metrics.influxdb.host`: The hostname or IP address of the InfluxDB server.
- `metrics.influxdb.port`: The port number of the InfluxDB server.
- `metrics.influxdb.database`: The name of the InfluxDB database to push reported metrics to.
- `metrics.influxdb.username`: The username to authorize access to the database.
- `metrics.influxdb.password`: The password to authorize access to the database.
- `metrics.influxdb.tags`: Comma-separated InfluxDB tags (key/values) attached to all measurements.
- `metrics.influxdbv2`: Enable metrics export/push to an external InfluxDB v2 database.
- `metrics.influxdb.token # Command-line Flags

- `--identity`: The node identity.
- `--nodekey`: The filename of the node's private key.
- `--nodekeyhex`: The node's private key as a hexadecimal string.
- `--bootnodes`: A comma-separated list of bootstrap nodes.
- `--sepolia`: Use the pre-configured Sepolia bootnodes.
- `--rinkeby`: Use the pre-configured Rinkeby bootnodes.
- `--goerli`: Use the pre-configured Goerli bootnodes.
- `--v5`: Use the v5 topic discovery bootnodes.
- `--listen`: The TCP/UDP listening port.
- `--discport`: The UDP discovery port.
- `--nat`: The port mapping mechanism.
- `--http`: Enable # Command-Line Flags

The following functions are responsible for setting up the command-line flags for the Geth client.

## Functions

### `setHTTP()`

The `setHTTP()` function sets up the HTTP listener interface string from the command-line flags. It takes a `cli.Context` parameter and a `node.Config` parameter. The function first checks if the `AuthVirtualHostsFlag` is set and sets the `HTTPAuthVirtualHosts` field of the `node.Config` parameter. The function then checks if the `HTTPCORSDomainFlag` is set and sets the `HTTPCors` field of the `node.Config` parameter. The function then checks if the `HTTPApiFlag` is set and sets the `HTTPModules` field of the `node.Config` parameter. The function then checks if the `HTTPVirtualHostsFlag` is set and sets the `HTTPVirtualHosts` field of the `node.Config` parameter. Finally, the function checks if the ` # Geth Utility Functions

This codebase contains several utility functions that are used throughout the Geth codebase. These functions are described below.

## `MakeDatabaseHandles(max int) int`

The `MakeDatabaseHandles` function takes an integer `max` and returns half of the allowance to assign to the database. The function first retrieves the maximum file descriptor allowance using the `fdlimit.Maximum()` function and checks for errors. The function then checks if the `max` parameter is zero and uses the system limits if it is. If the `max` parameter is less than 128, the function logs an error message. If the `max` parameter is greater than the system limit, the function logs a warning message. Otherwise, the function sets the file descriptor limit to the `max` parameter using the `fdlimit.Raise()` function and returns half of the raised limit.

## `MakeAddress(ks *keystore.KeyStore, account string) (accounts.Account, error)`

The `MakeAddress` function takes a `keystore.KeyStore` and a string `account` and returns an `accounts.Account` and an error. The function first checks if the `account` parameter is a valid hexadecimal address using the `common.IsHexAddress()` function. If it is, the function returns an `accounts.Account` with the specified address. Otherwise, the function tries to interpret the `account` # Node Configuration

The `SetNodeConfig()` function applies node-related command-line flags to the configuration. The function first calls the `SetP2PConfig()` function to set the P2P-related flags. It then calls the `setIPC()`, `setHTTP()`, `setGraphQL()`, `setWS()`, and `setNodeUserIdent()` functions to set the IPC, HTTP, GraphQL, WebSocket, and user identity flags. The function then calls the `SetDataDir()` function to set the data directory flag. The function then # Setters

The `Setters` module contains functions that set various configuration options for the Ethereum client.

## Functions

### `SetCardDaemonPath(path string)`

The `SetCardDaemonPath()` function sets the path to the card daemon.

### `SetDataDir(ctx *cli.Context, cfg *node.Config)`

The `SetDataDir()` function sets the data directory for the Ethereum client. The function first checks if the `DataDirFlag` is set in the command-line context. If it is, the function sets the data directory # Command-Line Flags

The program uses several command-line flags to configure its behavior. These flags include:

- `--datadir`: The data directory for the program.
- `--ipcdisable`: Disable the IPC-RPC server.
- `--ipcpath`: The path for the IPC-RPC server socket.
- `--rpc`: Enable the HTTP-RPC server.
- `--rpcaddr`: The listen address for the HTTP-RPC server.
- `--rpcapi`: The APIs offered over the HTTP-RPC server.
- `--rpcport`: The listen port for the HTTP-RPC server.
- `--rpccorsdomain`: The domain for the HTTP-RPC server CORS header.
- `--ws`: Enable the WebSocket-RPC server.
- `--wsaddr`: The listen address for the WebSocket-RPC server.
- `--wsapi`: # Geth

The `geth` program is the command-line interface for running the Geth Ethereum client.

## Functions

### `main()`

The `main()` function is the entry point of the program. It initializes the command-line flags, sets up the logger, and starts the Geth client. The function first initializes the command-line flags using the `flag.Parse()` function. It then sets up the logger using the `log.NewGlogHandler()` function and sets the verbosity and # Command Line Flags

The `cmdutils` package provides a set of common command-line flags for Ethereum tools. The package defines the following flags:

- `DataDirFlag`: The data directory for the Ethereum node.
- `IPCPathFlag`: The IPC path for the Ethereum node.
- `HTTPHostFlag`: The HTTP host for the Ethereum node.
- `HTTPPortFlag`: The HTTP port for the Ethereum node.
- `HTTPVirtualHostsFlag`: The HTTP virtual hosts for the Ethereum node.
- `HTTPModulesFlag`: The HTTP modules for the Ethereum node.
- `HTTPCorsFlag`: The HTTP CORS for the Ethereum node.
- `HTTPTimeoutFlag`: The HTTP timeout for the Ethereum node.
- `HTTPMaxBodyFlag`: The HTTP max body size for the Ethereum node.
- `HTTPVirtualHostsFlag`: The HTTP virtual hosts for the Ethereum node.
- `HTTPVirtualHostsFlag`: The HTTP virtual hosts for the Ethereum node.
- ` # Ethereum Node

This codebase is responsible for setting up and running an Ethereum node. It includes functions for registering the Ethereum client, configuring the Ethereum Stats daemon, and adding the GraphQL API to the node.

## Functions

### `RegisterEthService(stack *node.Node, cfg *ethconfig.Config) (ethapi.Backend, *eth.Ethereum)`

The `RegisterEthService()` function adds an Ethereum client to the node stack. The function takes a `*node.Node` and `*ethconfig.Config` parameter and returns an `ethapi.Backend` and `*eth.Ethereum` instance. The function first checks if the sync mode is set to light sync. If it is, the function creates a new LES backend using the `les.New()` function and registers the LES APIs using the `stack.RegisterAPIs()` function. If the sync mode is not set to light sync, the function creates a new Ethereum backend using the `eth.New()` function and registers the Ethereum APIs using the `stack.RegisterAPIs()` function. The function then returns the backend and Ethereum instances. # Geth

Geth is the command-line interface for running a full Ethereum node implemented in Go.

## Functions

### `RegisterFilterAPI(stack *node.Node, backend ethapi.Backend, ethcfg *ethconfig.Config) *filters.FilterSystem`

The `RegisterFilterAPI` function adds the Ethereum log filtering RPC API to the node. The function takes a `stack *node.Node`, `backend ethapi.Backend`, and `ethcfg *ethconfig.Config` parameters and returns a `*filters.FilterSystem`. The function first creates a new filter system using the `filters.NewFilterSystem()` function and sets the log cache size using the `ethcfg.FilterLogCacheSize` parameter. The function then registers the filter API using the `stack.RegisterAPIs()` function and returns the filter system.

### `RegisterFullSyncTester(stack *node.Node, eth *eth.Ethereum, path string)`

The `RegisterFullSyncTester` function adds the full-sync tester service into the node. The function takes a `stack *node.Node`, `eth *eth.Ethereum`, and ` # Ethereum Client

The Ethereum Client is a command-line interface for interacting with the Ethereum network. It provides various functions for managing the blockchain, running nodes, and executing transactions.

## Functions

### `ParseTags(tags []string) map[string]string`

The `ParseTags()` function takes a slice of strings and returns a map of key-value pairs. The function is used to parse the tags passed to the client.

### `MakeChainDatabase(ctx *cli.Context, stack *node.Node, readonly bool) ethdb.Database`

The `MakeChainDatabase()` function opens a LevelDB using the flags passed to the client and will hard crash if it fails. The function takes a `cli.Context`, a `node.Node`, and a boolean value indicating whether the database is read-only. The function returns an `ethdb.Database`.

### `IsNetworkPreset(ctx *cli.Context) # Config

The `config` package provides functions for configuring the Ethereum node.

## Functions

### `NewChainDb(ctx *cli.Context) (*badger.DB, error)`

The `NewChainDb()` function takes a `cli.Context` parameter and returns a `badger.DB` and an error. The function is responsible for creating a new chain database for the Ethereum node. The function first initializes the chain database using the `badger.Open()` function and checks for errors. The function then returns the chain database and `nil` for the error.

### `NewBlockChain(ctx *cli.Context, engine consensus.Engine, gspec *core.Genesis, readonly bool) (*core.BlockChain, *badger.DB)`

The `NewBlockChain()` function takes a `cli.Context`, a `consensus.Engine`, a `core.Genesis`, and a `bool` parameter and returns a `core.BlockChain` and a `badger.DB`. The function is responsible for creating a new blockchain for the Ethereum node. The function first initializes the chain database using the `NewChainDb()` function. The function then initializes the cache using the `core.NewCache()` function and sets the snapshot limit and preimages flag based on the command-line flags. The function then sets the trie clean and dirty limits based on the command-line flags. The function then initializes the VM configuration using the `vm.Config` struct and sets the preimage recording flag based on the command-line flags. The function then creates a new blockchain using the `core.NewBlockChain()` function and checks for errors. The function then returns the blockchain and chain database.

### `MakeConsolePreloads(ctx *cli.Context) []string`

The `MakeConsolePreloads()` function takes a `cli.Context` parameter and returns a slice of strings. The function is responsible for retrieving the absolute paths for the console JavaScript scripts to preload before starting. The function first checks if there are any scripts to preload. If there are none, the function returns `nil`. Otherwise, the function retrieves the file paths from the command-line flag and appends them to the `preloads` slice. The function then returns the `preloads` slice.