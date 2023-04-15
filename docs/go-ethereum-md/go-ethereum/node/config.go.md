# Go Ethereum Library - Node Package

This package contains the implementation of the Ethereum node. It provides a set of configuration values to fine-tune the P2P network layer of a protocol stack.

## Functions

### None

This package does not contain any functions.

## Constants

### datadirPrivateKey

This constant represents the path within the datadir to the node's private key.

### datadirJWTKey

This constant represents the path within the datadir to the node's JWT secret.

### datadirDefaultKeyStore

This constant represents the path within the datadir to the keystore.

### datadirStaticNodes

This constant represents the path within the datadir to the static node list.

### datadirTrustedNodes

This constant represents the path within the datadir to the trusted node list.

### datadirNodeDatabase

This constant represents the path within the datadir to store the node infos.

## Structs

### Config

This struct represents a small collection of configuration values to fine-tune the P2P network layer of a protocol stack. It contains the following fields:

- `Name`: sets the instance name of the node. It must not contain the / character and is used in the devp2p node identifier. The instance name of geth is "geth". If no value is specified, the basename of the current executable is used.
- `UserIdent`: if set, is used as an additional component in the devp2p node identifier.
- `Version`: should be set to the version number of the program. It is used in the devp2p node identifier.
- `DataDir`: is the file system folder the node should use for any data storage requirements.
- `P2P`: is the configuration of peer-to-peer networking.
- `KeyStoreDir`: is the file system folder that contains private keys. The directory can be specified as a relative path, in which case it is resolved relative to the current directory.
- `ExternalSigner`: specifies an external URI for a clef-type signer.
- `UseLightweightKDF`: lowers the memory and CPU requirements of the key store scrypt KDF at the expense of security.
- `InsecureUnlockAllowed`: allows the user to unlock accounts in an unsafe HTTP environment.

## Variables

### None

This package does not contain any variables.

## Imports

### github.com/ethereum/go-ethereum/common

This package provides common Ethereum-related types and functions.

### github.com/ethereum/go-ethereum/crypto

This package provides cryptographic functions used in Ethereum.

### github.com/ethereum/go-ethereum/log

This package provides logging functions used in Ethereum.

### github.com/ethereum/go-ethereum/p2p

This package provides the peer-to-peer networking implementation used in Ethereum.

### github.com/ethereum/go-ethereum/rpc

This package provides the remote procedure call implementation used in Ethereum.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Geth Configuration Options

This source code defines a struct that contains configuration options for the Geth Ethereum client. The struct contains fields for various network and API settings.

## Fields

### NoUSB

This field is a boolean that disables hardware wallet monitoring and connectivity. It is deprecated and has no effect, as USB monitoring is disabled by default and must be enabled explicitly.

### USB

This field is a boolean that enables hardware wallet monitoring and connectivity.

### SmartCardDaemonPath

This field is a string that specifies the path to the smartcard daemon's socket.

### IPCPath

This field is a string that specifies the requested location to place the IPC endpoint. If the path is a simple file name, it is placed inside the data directory (or on the root pipe path on Windows), whereas if it's a resolvable path name (absolute or relative), then that specific path is enforced. An empty path disables IPC.

### HTTPHost

This field is a string that specifies the host interface on which to start the HTTP RPC server. If this field is empty, no HTTP API endpoint will be started.

### HTTPPort

This field is an integer that specifies the TCP port number on which to start the HTTP RPC server. The default zero value is valid and will pick a port number randomly (useful for ephemeral nodes).

### HTTPCors

This field is a slice of strings that specifies the Cross-Origin Resource Sharing header to send to requesting clients. Please be aware that CORS is a browser enforced security, it's fully useless for custom HTTP clients.

### HTTPVirtualHosts

This field is a slice of strings that specifies the list of virtual hostnames which are allowed on incoming requests. This is by default {'localhost'}. Using this prevents attacks like DNS rebinding, which bypasses SOP by simply masquerading as being within the same origin. These attacks do not utilize CORS, since they are not cross-domain. By explicitly checking the Host-header, the server will not allow requests made against the server with a malicious host domain. Requests using ip address directly are not affected.

### HTTPModules

This field is a slice of strings that specifies a list of API modules to expose via the HTTP RPC interface. If the module list is empty, all RPC API endpoints designated public will be exposed.

### HTTPTimeouts

This field is an `rpc.HTTPTimeouts` struct that allows for customization of the timeout values used by the HTTP RPC interface.

### HTTPPathPrefix

This field is a string that specifies a path prefix on which http-rpc is to be served.

### AuthAddr

This field is a string that specifies the listening address on which authenticated APIs are provided.

### AuthPort

This field is an integer that specifies the port number on which authenticated APIs are provided.

### AuthVirtualHosts

This field is a slice of strings that specifies the list of virtual hostnames which are allowed on incoming requests for the authenticated API. This is by default {'localhost'}.

### WSHost

This field is a string that specifies the host interface on which to start the websocket RPC server. If this field is empty, no websocket API endpoint will be started.

### WSPort

This field is an integer that specifies the TCP port number on which to start the websocket RPC server. The default zero value is valid and will pick a port number randomly (useful for ephemeral nodes).

### WSPathPrefix

This field is a string that specifies a path prefix on which ws-rpc is to be served.

### WSOrigins

This field is a slice of strings that specifies the list of domains to accept websocket requests from. Please be aware that the server can only act upon the HTTP request the client sends and cannot verify the validity of the request header.

### WSModules

This field is a slice of strings that specifies a list of API modules to expose via the websocket RPC interface. If the module list is empty, all RPC API endpoints designated public will be exposed. # Go Ethereum Library - Config Package

This package contains the configuration settings for the Go Ethereum node. It includes functions for resolving IPC, HTTP, and WebSocket endpoints based on the configured host interface and port parameters.

## Structs

### Config

This struct contains the configuration settings for the Go Ethereum node. It includes the following fields:

- `DataDir`: The path to the data directory.
- `IPCPath`: The path to the IPC endpoint.
- `HTTPHost`: The host interface for the HTTP endpoint.
- `HTTPPort`: The port for the HTTP endpoint.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts for HTTP requests.
- `HTTPVirtualHosts`: The list of virtual hostnames which are allowed on incoming HTTP requests.
- `HTTPModules`: The list of API modules to expose via the HTTP RPC interface.
- `HTTPCors`: The Cross-Origin Resource Sharing header to send to requesting HTTP clients.
- `HTTPTimeouts`: The timeouts # Go Ethereum Library - Config Package

This package contains the configuration settings for the Go Ethereum client. It provides functions for resolving paths, generating node keys, and retrieving node information.

## Functions

### `DefaultWSEndpoint() string`

This function returns the default websocket endpoint used by the client.

### `(c *Config) ExtRPCEnabled() bool`

This function returns a boolean indicating whether the client enables external RPC (HTTP, WebSocket, or GraphQL).

### `(c *Config) NodeName() string`

This function returns the devp2p node identifier for the client. It generates a name based on the client's configuration settings, including the user identity, version, operating system, architecture, and runtime version.

### `(c *Config) ResolvePath(path string) string`

This function resolves a path in the instance directory. If the path is absolute, it returns the path unchanged. Otherwise, it joins the path with the instance directory and returns the result. If the path is a legacy resource file, it checks for the file in the "geth" subdirectory of the datadir and issues a warning if found.

### `(c *Config) NodeKey() *ecdsa.PrivateKey`

This function retrieves the currently configured private key of the node. It first checks for any manually set key, falling back to the one found in the configured data folder. If no key can be found, a new one is generated.

### `(c *Config) CheckLegacyFiles()`

This function inspects the datadir for signs of legacy static-nodes and trusted-nodes files. If they are found, it issues a warning to move the files to the "geth" subdirectory of the datadir.

## Variables

### `datadirPrivateKey`

This variable is a string constant representing the filename of the node's private key in the datadir.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Go Ethereum Library - Config Package

This package contains the configuration settings for the Go Ethereum client. It provides functions for checking legacy files, determining the key directory configuration, and retrieving the key store directory.

## Functions

### checkLegacyFiles

This function checks for the existence of legacy files and raises an error if they exist. It takes no parameters and returns nothing.

### checkLegacyFile

This function checks for the existence of a file at the given path and raises an error if it exists. It takes a path parameter, which specifies the path to the file to check.

### KeyDirConfig

This function determines the settings for the key directory. It takes no parameters and returns a string and an error. The string is the key directory path, and the error is any error encountered during the process.

### getKeyStoreDir

This function retrieves the key store directory and creates an ephemeral one if necessary. It takes a Config parameter and returns a string, a boolean, and an error. The string is the key store directory path, the boolean indicates whether the directory is ephemeral, and the error is any error encountered during the process.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.