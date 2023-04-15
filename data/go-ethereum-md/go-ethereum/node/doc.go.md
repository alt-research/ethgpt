# Go Ethereum Library - Node Package

This package provides a framework for setting up multi-protocol Ethereum nodes. A node is a collection of services that use shared resources to provide RPC APIs. Services can also offer devp2p protocols, which are wired up to the devp2p network when the node instance is started.

## Node Lifecycle

The Node object has a lifecycle consisting of three basic states: INITIALIZING, RUNNING, and CLOSED. Creating a Node allocates basic resources such as the data directory and returns the node in its INITIALIZING state. Lifecycle objects, RPC APIs, and peer-to-peer networking protocols can be registered in this state. Once everything is registered, the node can be started, which moves it into the RUNNING state. Starting the node starts all registered Lifecycle objects and enables RPC and peer-to-peer networking. Note that no additional Lifecycles, APIs, or p2p protocols can be registered while the node is running. Closing the node releases all held resources. The actions performed by Close depend on the state it was in. When closing a node in INITIALIZING state, resources related to the data directory are released. If the node was RUNNING, closing it also stops all Lifecycle objects and shuts down RPC and peer-to-peer networking. You must always call Close on Node, even if the node was not started.

## Resources Managed By Node

All file-system resources used by a node instance are located in a directory called the data directory. The location of each resource can be overridden through additional node configuration. The data directory is optional. If it is not set and the location of a resource is otherwise unspecified, package node will create the resource in memory.

To access the devp2p network, Node configures and starts p2p.Server. Each host on the devp2p network has a unique identifier, the node key. The Node instance persists this key across restarts. Node also loads static and trusted node lists and ensures that knowledge about other hosts is persisted.

JSON-RPC servers which run HTTP, WebSocket or IPC can be started on a Node. RPC modules offered by registered services will be offered on those endpoints. Users can restrict any endpoint to a subset of RPC modules. Node itself offers the "debug", "admin" and "web3" modules.

Service implementations can open LevelDB databases through the service context. Package node chooses the file system location of each database. If the node is configured to run without a data directory, databases are opened in memory instead.

Node also creates the shared store of encrypted private keys. The store is encrypted with a passphrase provided by the user. The passphrase is used to derive a key which is used to encrypt the private keys. The encrypted store is persisted to disk.

## Functions

### New

```go
func New(ctx *node.ServiceContext, config *Config) (*Node, error)
```

New creates a new Node instance with the given ServiceContext and Config.

### Start

```go
func (n *Node) Start() error
```

Start starts the Node instance and all registered services.

### Close

```go
func (n *Node) Close() error
```

Close stops the Node instance and releases all held resources.

### AddLifecycle

```go
func (n *Node) AddLifecycle(lifecycle Lifecycle)
```

AddLifecycle registers a Lifecycle object with the Node instance.

### AddService

```go
func (n *Node) AddService(service *node.Service)
```

AddService registers a Service object with the Node instance.

### AddProtocol

```go
func (n *Node) AddProtocol(p2p.Protocol)
```

AddProtocol registers a devp2p protocol with the Node instance.

### AddHTTPHandler

```go
func (n *Node) AddHTTPHandler(endpoint string, handler http.Handler)
```

AddHTTPHandler registers an HTTP handler with the Node instance.

### AddWebSocketHandler

```go
func (n *Node) AddWebSocketHandler(endpoint string, handler websocket.Handler)
```

AddWebSocketHandler registers a WebSocket handler with the Node instance.

### AddIPCService

```go
func (n *Node) AddIPCService(endpoint string, service *node.Service)
```

AddIPCService registers an IPC service with the Node instance.

### AddTrustedPeer

```go
func (n *Node) AddTrustedPeer(peer *p2p.Peer)
```

AddTrustedPeer adds a trusted peer to the Node instance.

### AddStaticNodes

```go
func (n *Node) AddStaticNodes(nodes []*discover.Node)
```

AddStaticNodes adds a list of static nodes to the Node instance.

### AddNode

```go
func (n *Node) AddNode(node *discover.Node)
```

AddNode adds a node to the Node instance.

### RemoveNode

```go
func (n *Node) RemoveNode(node *discover.Node)
```

RemoveNode removes a node from the Node instance.

### NodeInfo

```go
func (n *Node) NodeInfo() *discover.Node
```

NodeInfo returns the Node's own discover.Node.

### SetHTTPModules

```go
func (n *Node) SetHTTPModules(modules []string)
```

SetHTTPModules sets the list of RPC modules offered on the HTTP endpoint.

### SetWebSocketModules

```go
func (n *Node) SetWebSocketModules(modules []string)
```

SetWebSocketModules sets the list of RPC modules offered on the WebSocket endpoint.

### SetIPCModules

```go
func (n *Node) SetIPCModules(modules []string)
```

SetIPCModules sets the list of RPC modules offered on the IPC endpoint.

### SetHTTPCors

```go
func (n *Node) SetHTTPCors(cors []string)
```

SetHTTPCors sets the list of allowed CORS domains for the HTTP endpoint.

### SetHTTPVirtualHosts

```go
func (n *Node) SetHTTPVirtualHosts(vhosts []string)
```

SetHTTPVirtualHosts sets the list of virtual hosts for the HTTP endpoint.

### SetHTTPTimeouts

```go
func (n *Node) SetHTTPTimeouts(read, write time.Duration)
```

SetHTTPTimeouts sets the read and write timeouts for the HTTP endpoint.

### SetHTTPMaxContentLength

```go
func (n *Node) SetHTTPMaxContentLength(length int64)
```

SetHTTPMaxContentLength sets the maximum content length for the HTTP endpoint.

### SetHTTPHosts

```go
func (n *Node) SetHTTPHosts(hosts []string)
```

SetHTTPHosts sets the list of allowed hosts for the HTTP endpoint.

### SetWebSocketOrigins

```go
func (n *Node) SetWebSocketOrigins(origins []string)
```

SetWebSocketOrigins sets the list of allowed WebSocket origins.

### SetIPCPermissions

```go
func (n *Node) SetIPCPermissions(permissions os.FileMode)
```

SetIPCPermissions sets the file permissions for the IPC endpoint.

### SetIPCMaxConns

```go
func (n *Node) SetIPCMaxConns(maxconns int)
```

SetIPCMaxConns sets the maximum number of IPC connections.

### SetIPCMaxMsgSize

```go
func (n *Node) SetIPCMaxMsgSize(size int64)
```

SetIPCMaxMsgSize sets the maximum message size for the IPC endpoint.

### SetIPCMaxRequests

```go
func (n *Node) SetIPCMaxRequests(maxreqs int)
```

SetIPCMaxRequests sets the maximum number of IPC requests.

### SetIPCMaxBatch

```go
func (n *Node) SetIPCMaxBatch(maxbatch int)
```

SetIPCMaxBatch sets the maximum number of IPC requests in a batch.

### SetIPCReadTimeout

```go
func (n *Node) SetIPCReadTimeout(timeout time.Duration)
```

SetIPCReadTimeout sets the read timeout for the IPC endpoint.

### SetIPCWriteTimeout

```go
func (n *Node) SetIPCWriteTimeout(timeout time.Duration)
```

SetIPCWriteTimeout sets the write timeout for the IPC endpoint.

### SetIPCHeartbeatInterval

```go
func (n *Node) SetIPCHeartbeatInterval(interval time.Duration)
```

SetIPCHeartbeatInterval sets the heartbeat interval for the IPC endpoint.

### SetIPCHeartbeatTimeout

```go
func (n *Node) SetIPCHeartbeatTimeout(timeout time.Duration)
```

SetIPCHeartbeatTimeout sets the heartbeat timeout for the IPC endpoint.

### SetIPCHeartbeatMisses

```go
func (n *Node) SetIPCHeartbeatMisses(misses int)
```

SetIPCHeartbeatMisses sets the number of missed heartbeats before a connection is closed.

### SetLogLevel

```go
func (n *Node) SetLogLevel(level log.Lvl)
```

SetLogLevel sets the log level for the Node instance.

### SetLogWriter

```go
func (n *Node) SetLogWriter(writer io.Writer)
```

SetLogWriter sets the log writer for the Node instance.

### SetConfig

```go
func (n *Node) SetConfig(config *Config)
```

SetConfig sets the configuration for the Node instance.

### SetDataDir

```go
func (n *Node) SetDataDir(datadir string)
```

SetDataDir sets the data directory for the Node instance.

### SetKeyStoreDir

```go
func (n *Node) SetKeyStoreDir(keystore string)
```

SetKeyStoreDir sets the keystore directory for the Node instance.

### SetNodeKey

```go
func (n *Node) SetNodeKey(key *ecdsa.PrivateKey)
```

SetNodeKey sets the node key for the Node instance.

### SetPassphrase

```go
func (n *Node) SetPassphrase(passphrase string)
```

SetPassphrase sets the passphrase for the Node instance.

### SetHTTPHost

```go
func (n *Node) SetHTTPHost(host string)
```

SetHTTPHost sets the host for the HTTP endpoint.

### SetHTTPPort

```go
func (n *Node) SetHTTPPort(port int)
```

SetHTTPPort sets the port for the HTTP endpoint.

### SetHTTPVirtualHost

```go
func (n *Node) SetHTTPVirtualHost(vhost string)
```

SetHTTPVirtualHost sets the virtual host for the HTTP endpoint.

### SetWebSocketHost

```go
func (n # Go Ethereum Library - Node Package

This package contains the implementation of the Ethereum node. The node is responsible for managing the Ethereum blockchain, processing transactions, and executing smart contracts.

## Functions

### New

```go
func New(ctx *ServiceContext, config *Config) (*Node, error)
```

The `New` function creates a new Ethereum node instance. It takes a `ServiceContext` and a `Config` as parameters and returns a `Node` instance and an error. The `ServiceContext` provides access to the account manager and other services, while the `Config` specifies the configuration options for the node.

### Start

```go
func (n *Node) Start() error
```

The `Start` function starts the Ethereum node. It initializes the node's services, starts the peer-to-peer network, and begins processing transactions and executing smart contracts.

### Stop

```go
func (n *Node) Stop() error
```

The `Stop` function stops the Ethereum node. It shuts down the node's services, stops the peer-to-peer network, and stops processing transactions and executing smart contracts.

## Data Directory Sharing

The Ethereum node supports sharing a data directory among multiple instances. Each instance can have a distinct name, specified through the `Name` configuration option. The sharing behavior depends on the type of resource.

Devp2p-related resources, such as the node key, static/trusted node lists, and known hosts database, are stored in a directory with the same name as the instance. Thus, multiple node instances using the same data directory will store this information in different subdirectories of the data directory.

LevelDB databases are also stored within the instance subdirectory. If multiple node instances use the same data directory, opening the databases with identical names will create one database for each instance.

The account key store is shared among all node instances using the same data directory unless its location is changed through the `KeyStoreDir` configuration option.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.