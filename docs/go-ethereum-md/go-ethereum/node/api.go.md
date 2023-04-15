# Go Ethereum Library - Node Package

This package contains the implementation of the Ethereum node. It provides the functionality to connect to the Ethereum network, synchronize with the blockchain, and execute transactions.

## Functions

### (n *Node) apis() []rpc.API

This function returns a collection of built-in RPC APIs. It includes the `admin`, `debug`, and `web3` namespaces, each with their corresponding API methods.

### (api *adminAPI) AddPeer(url string) (bool, error)

This function adds a new peer to the node's peer list. It takes a URL parameter, which specifies the enode URL of the peer to add. It returns a boolean value indicating whether the peer was added successfully, and an error if the URL is invalid or the server is not running.

### (api *adminAPI) RemovePeer(url string) (bool, error)

This function removes a peer from the node's peer list. It takes a URL parameter, which specifies the enode URL of the peer to remove. It returns a boolean value indicating whether the peer was removed successfully, and an error if the URL is invalid or the server is not running.

### (api *adminAPI) AddTrustedPeer(url string) (bool, error)

This function adds a new trusted peer to the node's trusted peer list. It takes a URL parameter, which specifies the enode URL of the trusted peer to add. It returns a boolean value indicating whether the trusted peer was added successfully, and an error if the URL is invalid or the server is not running.

### (api *adminAPI) RemoveTrustedPeer(url string) (bool, error)

This function removes a trusted peer from the node's trusted peer list. It takes a URL parameter, which specifies the enode URL of the trusted peer to remove. It returns a boolean value indicating whether the trusted peer was removed successfully, and an error if the URL is invalid or the server is not running.

### (api *adminAPI) PeerEvents() (*rpc.Subscription, error)

This function creates an RPC subscription that receives peer events from the node's p2p.Server. It returns a subscription object and an error if the server is not running.

### (api *adminAPI) NodeInfo() (interface{}, error)

This function returns information about the node. It includes the enode URL, the node ID, the IP address, and the listening port.

### (api *adminAPI) Peers() (interface{}, error)

This function returns a list of connected peers. It includes the enode URL, the node ID, the IP address, and the listening port for each peer.

### (api *adminAPI) StartRPC(addr string) error

This function starts the RPC server on the specified address. It takes an addr parameter, which specifies the address to listen on. It returns an error if the server fails to start.

### (api *adminAPI) StopRPC() error

This function stops the RPC server. It returns an error if the server fails to stop.

### (api *adminAPI) StartWS(addr string) error

This function starts the WebSocket server on the specified address. It takes an addr parameter, which specifies the address to listen on. It returns an error if the server fails to start.

### (api *adminAPI) StopWS() error

This function stops the WebSocket server. It returns an error if the server fails to stop.

### (api *adminAPI) StartHTTP(addr string) error

This function starts the HTTP server on the specified address. It takes an addr parameter, which specifies the address to listen on. It returns an error if the server fails to start.

### (api *adminAPI) StopHTTP() error

This function stops the HTTP server. It returns an error if the server fails to stop.

### (api *adminAPI) ImportChain(filename string) error

This function imports a blockchain from a file. It takes a filename parameter, which specifies the name of the file to import. It returns an error if the file is invalid or the server is not running.

### (api *adminAPI) ExportChain(filename string, from, to uint64) error

This function exports a blockchain to a file. It takes a filename parameter, which specifies the name of the file to export to, and from and to parameters, which specify the block range to export. It returns an error if the server is not running.

### (api *adminAPI) DumpStacks() (map[string]string, error)

This function returns a map of goroutine stacks. It includes the goroutine ID and the stack trace for each goroutine.

### (api *adminAPI) Verbosity(level int) error

This function sets the log verbosity level. It takes a level parameter, which specifies the verbosity level to set. It returns an error if the server is not running.

### (api *adminAPI) SetSolc(path string) error

This function sets the path to the Solidity compiler. It takes a path parameter, which specifies the path to the Solidity compiler. It returns an error if the server is not running.

### (api *adminAPI) StartCPUProfile(filename string) error

This function starts the CPU profiler. It takes a filename parameter, which specifies the name of the file to write the profile to. It returns an error if the server is not running.

### (api *adminAPI) StopCPUProfile() error

This function stops the CPU profiler. It returns an error if the server is not running.

### (api *adminAPI) SetBlockProfileRate(rate int) error

This function sets the block profiling rate. It takes a rate parameter, which specifies the profiling rate to set. It returns an error if the server is not running.

### (api *adminAPI) SetMemProfileRate(rate int) error

This function sets the memory profiling rate. It takes a rate parameter, which specifies the profiling rate to set. It returns an error if the server is not running.

### (api *adminAPI) SetGCPercent(percent int) error

This function sets the garbage collection percentage. It takes a percent parameter, which specifies the percentage to set. It returns an error if the server is not running.

### (api *adminAPI) SetTraceLogging(enabled bool) error

This function sets the trace logging flag. It takes an enabled parameter, which specifies whether trace logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetTxPoolLogging(enabled bool) error

This function sets the transaction pool logging flag. It takes an enabled parameter, which specifies whether transaction pool logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetBlockLogging(enabled bool) error

This function sets the block logging flag. It takes an enabled parameter, which specifies whether block logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetIPCLogging(enabled bool) error

This function sets the IPC logging flag. It takes an enabled parameter, which specifies whether IPC logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetHTTPLogging(enabled bool) error

This function sets the HTTP logging flag. It takes an enabled parameter, which specifies whether HTTP logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetWSLogging(enabled bool) error

This function sets the WebSocket logging flag. It takes an enabled parameter, which specifies whether WebSocket logging is enabled. It returns an error if the server is not running.

### (api *adminAPI) SetLogFilter(filter string) error

This function sets the log filter. It takes a filter parameter, which specifies the filter to set. It returns an error if the server is not running.

### (api *adminAPI) SetVerbosityLevel(level int) error

This function sets the log verbosity level. It takes a level parameter, which specifies the verbosity level to set. It returns an error if the server is not running.

### (api *adminAPI) SetMetrics(enabled bool) error

This function sets the metrics flag. It takes an enabled parameter, which specifies whether metrics are enabled. It returns an error if the server is not running.

### (api *adminAPI) SetGasPrice(price hexutil.Big) error

This function sets the gas price. It takes a price parameter, which specifies the gas price to set. It returns an error if the server is not running.

### (api *adminAPI) SetGlobalGasCap(cap hexutil.Big) error

This function sets the global gas cap. It takes a cap parameter, which specifies the global gas cap to set. It returns an error if the server is not running.

### (api *adminAPI) SetTxPoolGasCap(cap hexutil.Big) error

This function sets the transaction pool gas cap. It takes a cap parameter, which specifies the transaction pool gas cap to set. It returns an error if the server is not running.

### (api *adminAPI) SetTxPoolPriceLimit(limit hexutil.Big) error

This function sets the transaction pool price limit. It takes a limit parameter, which specifies the transaction pool price limit to set. It returns an error if the server is not running.

### (api *adminAPI) SetTxPoolJournal(filename string) error

This function sets the transaction pool journal. It takes a filename parameter, which specifies the name of the file to write the journal to. It returns an error if the server is not running.

### (api *adminAPI) SetTxPoolRejournal(interval int) error

This function sets the transaction pool journal interval. It takes an interval parameter, which specifies the journal interval to set. It returns an error if the server is not # Go Ethereum Library - Admin API Package

This package contains the implementation of the Admin API for the Go Ethereum client. The Admin API provides a set of methods for managing the client, such as starting and stopping the HTTP and WebSocket servers.

## Functions

### PeerEvents

```go
func (api *adminAPI) PeerEvents(ctx context.Context) (*rpc.Subscription, error)
```

This function creates a subscription to receive notifications about peer events. It subscribes to the peer events emitted by the client's server and sends them to the provided context's notifier. It returns a subscription object that can be used to unsubscribe from the notifications.

### StartHTTP

```go
func (api *adminAPI) StartHTTP(host *string, port *int, cors *string, apis *string, vhosts *string) (bool, error)
```

This function starts the HTTP RPC API server. It takes several optional parameters, including the host, port, CORS allowed origins, enabled API modules, and virtual hosts. If any of the parameters are nil, it uses the default values from the client's configuration. It returns a boolean indicating whether the server was started successfully and an error if there was any.

### StartRPC

```go
func (api *adminAPI) StartRPC(host *string, port *int, cors *string, apis *string, vhosts *string) (bool, error)
```

This function is deprecated and is equivalent to `StartHTTP`. It starts the HTTP RPC API server with the same parameters as `StartHTTP`.

### StopHTTP

```go
func (api *adminAPI) StopHTTP() (bool, error)
```

This function stops the HTTP server. It returns a boolean indicating whether the server was stopped successfully and an error if there was any.

### StopRPC

```go
func (api *adminAPI) StopRPC() (bool, error)
```

This function is deprecated and is equivalent to `StopHTTP`. It stops the HTTP server with the same parameters as `StopHTTP`.

### StartWS

```go
func (api *adminAPI) StartWS(host *string, port *int, allowedOrigins *string, apis *string) (bool, error)
```

This function starts the WebSocket RPC API server. It takes several optional parameters, including the host, port, allowed origins, and enabled API modules. If any of the parameters are nil, it uses the default values from the client's configuration. It returns a boolean indicating whether the server was started successfully and an error if there was any.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Admin API Package

This package contains the implementation of the Admin API for the Go Ethereum client. The Admin API provides administrative functions for the client, such as retrieving information about the node and its peers, and managing WebSocket servers.

## Functions

### StartWS

StartWS starts a WebSocket server on the specified host and port. It takes two parameters, `host` and `port`, which specify the host and port to listen on. It also takes an optional parameter, `allowedOrigins`, which is a comma-separated list of allowed origins for WebSocket connections. If `allowedOrigins` is not provided, all origins are allowed. The function returns a boolean value indicating whether the server was started successfully, and an error if there was a problem starting the server.

### StopWS

StopWS terminates all WebSocket servers. It takes no parameters and returns a boolean value indicating whether the servers were stopped successfully, and an error if there was a problem stopping the servers.

### Peers

Peers retrieves all the information we know about each individual peer at the protocol granularity. It takes no parameters and returns a slice of `p2p.PeerInfo` structs, which contain information about each peer, such as its ID, IP address, and port.

### NodeInfo

NodeInfo retrieves all the information we know about the host node at the protocol granularity. It takes no parameters and returns a `p2p.NodeInfo` struct, which contains information about the node, such as its ID, IP address, and port.

### Datadir

Datadir retrieves the current data directory the node is using. It takes no parameters and returns a string containing the path to the data directory.

## Types

### web3API

web3API offers helper utils. It contains two methods:

#### ClientVersion

ClientVersion returns the node name. It takes no parameters and returns a string containing the name of the node.

#### Sha3

Sha3 applies the Ethereum sha3 implementation on the input. It assumes the input is hex encoded. It takes a single parameter, `input`, which is a `hexutil.Bytes` slice containing the input data. It returns a `hexutil.Bytes` slice containing the output of the sha3 function applied to the input data.