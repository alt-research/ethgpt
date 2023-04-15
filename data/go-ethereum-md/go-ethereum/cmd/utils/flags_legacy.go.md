# Utils

The `utils` package provides utility functions and commands for the Ethereum client.

## Functions

### `showDeprecated()`

The `showDeprecated()` function displays deprecated flags that will be soon removed from the codebase. The function takes a `cli.Context` parameter and returns an error. The function first prints a header message to the console. The function then iterates through the `DeprecatedFlags` array and prints each flag's string representation to the console. Finally, the function prints a footer message to the console and returns `nil`.

## Commands

### `ShowDeprecated`

The `ShowDeprecated` command shows flags that have been deprecated. The command has an `Action` field that points to the `showDeprecated()` function. The command has a `Name` field set to `"show-deprecated-flags"`, a `Usage` field set to `"Show flags that have been deprecated"`, an `ArgsUsage` field set to `" "`, and a `Description` field set to `"Show flags that have been deprecated and will soon be removed"`. The command does not have any flags.

## Flags

### `NoUSBFlag`

The `NoUSBFlag` flag disables monitoring for and managing USB hardware wallets. The flag is deprecated and will be removed in the future. The flag is of type `cli.BoolFlag` and has a `Name` field set to `"nousb"`, a `Usage` field set to `"Disables monitoring for and managing USB hardware wallets (deprecated)"`, and a `Category` field set to `flags.DeprecatedCategory`.