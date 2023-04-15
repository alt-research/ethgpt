# Flags

The `flags` package provides constants and initialization functions for the `urfave/cli/v2` package.

## Constants

### EthCategory

```go
const EthCategory = "ETHEREUM"
```

`EthCategory` is a constant string that represents the category for Ethereum-related flags.

### LightCategory

```go
const LightCategory = "LIGHT CLIENT"
```

`LightCategory` is a constant string that represents the category for light client-related flags.

### DevCategory

```go
const DevCategory = "DEVELOPER CHAIN"
```

`DevCategory` is a constant string that represents the category for developer chain-related flags.

### EthashCategory

```go
const EthashCategory = "ETHASH"
```

`EthashCategory` is a constant string that represents the category for Ethash-related flags.

### TxPoolCategory

```go
const TxPoolCategory = "TRANSACTION POOL"
```

`TxPoolCategory` is a constant string that represents the category for transaction pool-related flags.

### PerfCategory

```go
const PerfCategory = "PERFORMANCE TUNING"
```

`PerfCategory` is a constant string that represents the category for performance tuning-related flags.

### AccountCategory

```go
const AccountCategory = "ACCOUNT"
```

`AccountCategory` is a constant string that represents the category for account-related flags.

### APICategory

```go
const APICategory = "API AND CONSOLE"
```

`APICategory` is a constant string that represents the category for API and console-related flags.

### NetworkingCategory

```go
const NetworkingCategory = "NETWORKING"
```

`NetworkingCategory` is a constant string that represents the category for networking-related flags.

### MinerCategory

```go
const MinerCategory = "MINER"
```

`MinerCategory` is a constant string that represents the category for miner-related flags.

### GasPriceCategory

```go
const GasPriceCategory = "GAS PRICE ORACLE"
```

`GasPriceCategory` is a constant string that represents the category for gas price oracle-related flags.

### VMCategory

```go
const VMCategory = "VIRTUAL MACHINE"
```

`VMCategory` is a constant string that represents the category for virtual machine-related flags.

### LoggingCategory

```go
const LoggingCategory = "LOGGING AND DEBUGGING"
```

`LoggingCategory` is a constant string that represents the category for logging and debugging-related flags.

### MetricsCategory

```go
const MetricsCategory = "METRICS AND STATS"
```

`MetricsCategory` is a constant string that represents the category for metrics and stats-related flags.

### MiscCategory

```go
const MiscCategory = "MISC"
```

`MiscCategory` is a constant string that represents the category for miscellaneous flags.

### DeprecatedCategory

```go
const DeprecatedCategory = "ALIASED (deprecated)"
```

`DeprecatedCategory` is a constant string that represents the category for deprecated flags.

## Functions

### init

```go
func init()
```

`init` is a function that initializes the categories for the `HelpFlag` and `VersionFlag` of the `urfave/cli/v2` package. It takes no parameters and returns nothing.