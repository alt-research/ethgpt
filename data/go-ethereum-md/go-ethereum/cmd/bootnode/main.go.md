# Bootnode

The `bootnode` program runs a bootstrap node for the Ethereum Discovery Protocol.

## Functions

### `main()`

The `main()` function is the entry point of the program. It initializes the command-line flags, sets up the logger, and starts the bootnode. The function first initializes the command-line flags using the `flag.Parse()` function. It then sets up the logger using the `log.NewGlogHandler()` function and sets the verbosity and vmodule using the `glogger.Verbosity()` and `glogger.Vmodule()` functions. The function then parses the NAT description using the `nat.Parse()` function and checks for errors. The function then generates or loads the node key using the `crypto.GenerateKey()`, `crypto.SaveECDSA()`, `crypto.LoadECDSA()`, and `crypto.HexToECDSA()` functions. The function then checks if the `writeAddr` flag is set and prints the node's public key if it is. The function then parses the network restrictions using the `netutil.ParseNetlist()` function and checks for errors. The function then resolves the listen address using the `net.ResolveUDPAddr()` function and listens for UDP packets using the `net.ListenUDP()` function. The function then gets the local UDP address using the `conn.LocalAddr()` function and sets up the NAT port mapping using the `natm.MapPort()` function if necessary. The function then sets up the node configuration using the `discover.NewConfig()` function and starts the bootnode using the `discover.ListenUDP()` and `discover.NewNode()` functions.

## Command-line Flags

- `-addr`: The listen address of the bootnode. Default is `:30301`.
- `-genkey`: Generate a new node key and save it to the specified file.
- `-writeaddress`: Write out the node's public key and quit.
- `-nodekey`: The filename of the node's private key.
- `-nodekeyhex`: The node's private key as a hexadecimal string.
- `-nat`: The port mapping mechanism. Can be `any`, `none`, `upnp`, `pmp`, `pmp:<IP>`, or `extip:<IP>`. Default is `none`.
- `-netrestrict`: Restrict network communication to the given IP networks (CIDR masks).
- `-v5`: Run a v5 topic discovery bootnode.
- `-verbosity`: The log verbosity level. Can be `0` (silent) to `5` (debug). Default is `3` (info).
- `-vmodule`: The log verbosity pattern. ## Bootnode Source Code Documentation

The following is a documentation of the source code for the bootnode application. The bootnode application is a developer tool that is used to create a bootstrap node for Ethereum discovery. The source code is written in Go programming language.

### Function: P.IsLoopback()

The `P.IsLoopback()` function checks if the IP address of the node is a loopback address. If the IP address is a loopback address, the function maps the port using the `nat.Map()` function. The `nat.Map()` function maps the port to the external IP address of the node. If the external IP address is retrieved successfully, the function sets the `realaddr` variable to the external IP address and port. 

### Function: printNotice(nodeKey *ecdsa.PublicKey, addr net.UDPAddr)

The `printNotice()` function prints a notice to the console. The function takes the node's public key and UDP address as parameters. If the IP address is unspecified, the function sets the IP address to `127.0.0.1`. The function then creates a new V4 enode using the `enode.NewV4()` function and prints the URL of the enode to the console. The function then prints a notice to the console that the user is using the `cmd/bootnode` developer tool and recommends using a regular node as a bootstrap node for production deployments.

### Function: main()

The `main()` function is the entry point of the bootnode application. The function initializes the node's key using the `enode.NewNodeKey()` function. The function then creates a new UDP connection using the `net.ListenUDP()` function. The function then checks if the node's IP address is a loopback address using the `P.IsLoopback()` function. The function then prints a notice to the console using the `printNotice()` function. The function then opens a new database using the `enode.OpenDB()` function and creates a new local node using the `enode.NewLocalNode()` function. The function then creates a new `discover.Config` object with the node's private key and network restrictions. The function then checks if the `runv5` flag is set to true. If it is, the function listens for V5 discovery packets using the `discover.ListenV5()` function. If it is not, the function listens for UDP discovery packets using the `discover.ListenUDP()` function. Finally, the function enters an infinite loop using the `select {}` statement.