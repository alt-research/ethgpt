# Geth Console

The `geth console` command starts an interactive JavaScript environment that exposes a node admin interface as well as the Ðapp JavaScript API. The command can be used to start a new geth node and attach a JavaScript console to it at the same time, or to open a console on a running geth node.

## Commands

### `console`

```go
var consoleCommand = &cli.Command{
    Action: localConsole,
    Name:   "console",
    Usage:  "Start an interactive JavaScript environment",
    Flags:  flags.Merge(nodeFlags, rpcFlags, consoleFlags),
    Description: `
The Geth console is an interactive shell for the JavaScript runtime environment
which exposes a node admin interface as well as the Ðapp JavaScript API.
See https://geth.ethereum.org/docs/interacting-with-geth/javascript-console.`,
}
```

The `console` command starts a new geth node, attaching a JavaScript console to it at the same time. The command creates and starts the node based on the CLI flags, attaches to the newly started node, and creates the JavaScript console. If only a short execution was requested, the command evaluates and returns.

### `attach`

```go
var attachCommand = &cli.Command{
    Action:    remoteConsole,
    Name:      "attach",
    Usage:     "Start an interactive JavaScript environment (connect to node)",
    ArgsUsage: "[endpoint]",
    Flags:     flags.Merge([]cli.Flag{utils.DataDirFlag, utils.HttpHeaderFlag}, consoleFlags),
    Description: `
The Geth console is an interactive shell for the JavaScript runtime environment
which exposes a node admin interface as well as the Ðapp JavaScript API.
See https://geth.ethereum.org/docs/interacting-with-geth/javascript-console.
This command allows to open a console on a running geth node.`,
}
```

The `attach` command opens a console on a running geth node. The command connects to the node specified by the endpoint argument, and creates the JavaScript console.

### `js`

```go
var javascriptCommand = &cli.Command{
    Action:    ephemeralConsole,
    Name:      "js",
    Usage:     "(DEPRECATED) Execute the specified JavaScript files",
    ArgsUsage: "<jsfile> [jsfile...]",
    Flags:     flags.Merge(nodeFlags, consoleFlags),
    Description: `
The JavaScript VM exposes a node admin interface as well as the Ðapp
JavaScript API. See https://geth.ethereum.org/docs/interacting-with-geth/javascript-console`,
}
```

The `js` command executes the specified JavaScript files. The command is deprecated and should not be used.

## Functions

### `localConsole`

```go
func localConsole(ctx *cli.Context) error
```

The `localConsole` function starts a new geth node, attaching a JavaScript console to it at the same time. The function creates and starts the node based on the CLI flags, attaches to the newly started node, and creates the JavaScript console. If only a short execution was requested, the function evaluates and returns.

### `remoteConsole`

```go
func remoteConsole(ctx *cli.Context) error
```

The `remoteConsole` function opens a console on a running geth node. The function connects to the node specified by the endpoint argument, and creates the JavaScript console.

### `ephemeralConsole`

```go
func ephemeralConsole(ctx *cli.Context) error
```

The `ephemeralConsole` function executes the specified JavaScript files. The function is deprecated and should not be used. ## Documentation for Geth Console Package

The `console` package provides functions for starting and interacting with a JavaScript console in a Geth node. The package includes functions for starting an interactive console, connecting to a remote Geth instance, and starting an ephemeral console.

### `interactiveConsole`

```go
func interactiveConsole(ctx *cli.Context) error
```

The `interactiveConsole` function starts an interactive JavaScript console in a Geth node. The function retrieves the data directory and JavaScript path from the command-line arguments and creates a new console configuration. The function then starts the console and enters interactive mode.

### `remoteConsole`

```go
func remoteConsole(ctx *cli.Context) error
```

The `remoteConsole` function connects to a remote Geth instance and attaches a JavaScript console to it. The function retrieves the endpoint from the command-line arguments and creates a new RPC client. The function then creates a new console configuration and starts the console. If a script is provided, the function evaluates the script and returns. Otherwise, the function prints the welcome screen and enters interactive mode.

### `ephemeralConsole`

```go
func ephemeralConsole(ctx *cli.Context) error
```

The `ephemeralConsole` function starts a new Geth node, attaches an ephemeral JavaScript console to it, executes each of the files specified as arguments, and tears everything down. The function retrieves the file names from the command-line arguments and generates a script that loads each file. The function then prints a deprecation message and returns.

The `console` package provides a convenient way to interact with a Geth node using JavaScript. The `interactiveConsole` function starts an interactive console in the current node, while the `remoteConsole` function connects to a remote node and attaches a console to it. The `ephemeralConsole` function is deprecated and should be replaced with the `geth --exec` command.