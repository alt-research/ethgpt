# Documentation for gethrpc Package

The `gethrpc` package provides functions for starting and interacting with a Geth node via RPC. The package includes functions for calling RPC methods, adding peers, and resolving IPC endpoints.

## Functions

### `killAndWait`

```go
func (g *gethrpc) killAndWait()
```

The `killAndWait` function kills the Geth node and waits for it to exit.

### `callRPC`

```go
func (g *gethrpc) callRPC(result interface{}, method string, args ...interface{})
```

The `callRPC` function calls an RPC method on the Geth node. The function takes the method name and arguments as input and returns the result of the method call.

### `addPeer`

```go
func (g *gethrpc) addPeer(peer *gethrpc)
```

The `addPeer` function adds a peer to the Geth node. The function takes a `gethrpc` object as input and adds the peer's enode to the node's peer list.

### `getNodeInfo`

```go
func (g *gethrpc) getNodeInfo() *p2p.NodeInfo
```

The `getNodeInfo` function retrieves the node information for the Geth node. The function returns a `p2p.NodeInfo` object containing the node's enode and other information.

### `ipcEndpoint`

```go
func ipcEndpoint(ipcPath, datadir string) string
```

The `ipcEndpoint` function resolves an IPC endpoint based on a configured value. The function takes the IPC path and data directory as input and returns the resolved endpoint.

### `nextIPC`

```go
var nextIPC = uint32(0)
```

The `nextIPC` variable ensures that each IPC pipe gets a unique name.

### `startGethWithIpc`

```go
func startGethWithIpc(t *testing.T, name string, args ...string) *gethrpc
```

The `startGethWithIpc` function starts a Geth node with an IPC endpoint and returns a `gethrpc` object for interacting with the node. The function takes the test object, node name, and additional arguments as input. The function returns the `gethrpc` object for the started node. ## TestPriorityClient

The `TestPriorityClient` function is a test function that tests the priority of a client in a network of Ethereum nodes. The function starts a light server and two clients, one of which is a priority client. The priority client is given a higher balance on the light server, which should result in it being prioritized over the other client in the network.

### `startLightServer`

```go
func startLightServer(t *testing.T) *gethrpc
```

The `startLightServer` function initializes a new geth instance with a specified data directory and starts a light server. The function imports a private key and starts mining on the server. The function returns a `gethrpc` instance representing the started server.

### `startClient`

```go
func startClient(t *testing.T, name string) *gethrpc
```

The `startClient` function initializes a new geth instance with a specified data directory and starts a client. The function returns a `gethrpc` instance representing the started client.

### `TestPriorityClient`

```go
func TestPriorityClient(t *testing.T)
```

The `TestPriorityClient` function is a test function that tests the priority of a client in a network of Ethereum nodes. The function starts a light server and two clients, one of which is a priority client. The priority client is given a higher balance on the light server, which should result in it being prioritized over the other client in the network.

The function starts a free client and adds the light server as a peer. It then starts a priority client, increases its balance on the light server, and adds it as a peer to the light server. The function checks if the priority client is syncing and if the regular client got kicked out. Finally, the function checks if the priority client is among the light server peers.