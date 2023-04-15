# Ethereum Wallet and Account Management

This Go package provides functionality for managing Ethereum wallets and accounts. It includes commands for importing presale wallets, creating new accounts, and listing existing accounts. The package uses the `go-ethereum` library and requires a running Ethereum node.

## Wallet Command

The `wallet` command manages Ethereum presale wallets. It includes a subcommand for importing a presale wallet.

### `importWallet`

```go
func importWallet(ctx *cli.Context) error
```

The `importWallet` function imports an Ethereum presale wallet. The function prompts the user for their password and imports the wallet. It can also be used non-interactively with the `--password` option, which takes a password file as an argument containing the wallet password in plaintext.

## Account Command

The `account` command manages Ethereum accounts. It includes subcommands for listing existing accounts and creating new accounts.

### `accountList`

```go
func accountList(ctx *cli.Context) error
```

The `accountList` function prints a summary of all existing accounts.

### `accountCreate`

```go
func accountCreate(ctx *cli.Context) error
```

The `accountCreate` function creates a new Ethereum account. The function prompts the user for a password and saves the account in encrypted format. The user must remember this password to unlock the account in the future. For non-interactive use, the password can be supplied via the `--password` option, which takes a password file as an argument containing the password in plaintext.

## Dependencies

This package depends on the following Go packages:

- `github.com/ethereum/go-ethereum/accounts`
- `github.com/ethereum/go-ethereum/accounts/keystore`
- `github.com/ethereum/go-ethereum/cmd/utils`
- `github.com/ethereum/go-ethereum/crypto`
- `github.com/ethereum/go-ethereum/log`
- `github.com/urfave/cli/v2`

## License

This package is licensed under the GNU General Public License, version 3 or later. # Geth Account Management

The `geth account` command provides a set of subcommands for managing Ethereum accounts. These subcommands allow users to create, list, update, and import accounts.

## Subcommands

### `list`

```go
func accountList(ctx *cli.Context) error
```

The `list` subcommand lists all accounts in the keystore. The function retrieves the accounts from the keystore and prints their addresses and URLs.

### `unlockAccount`

```go
func unlockAccount(ks *keystore.KeyStore, address string, i int, passwords []string) (accounts.Account, string)
```

The `unlockAccount` function tries to unlock the specified account a few times. The function retrieves the account from the keystore and prompts the user for the password. If the password is correct, the function returns the account and the password.

### `ambiguousAddrRecovery`

```go
func ambiguousAddrRecovery(ks *keystore.KeyStore, err *keystore.AmbiguousAddrError, auth string) accounts.Account
```

The `ambiguousAddrRecovery` function recovers an account when multiple key files exist for the same address. The function prompts the user to select the correct key file and returns the account.

### `create`

```go
func accountCreate(ctx *cli.Context) error
```

The `create` subcommand creates a new account. The function prompts the user for a password and saves the account in the keystore.

### `update`

```go
func accountUpdate(ctx *cli.Context) error
```

The `update` subcommand updates an existing account. The function prompts the user for the old and new passwords and saves the updated account in the keystore.

### `import`

```go
func accountImport(ctx *cli.Context) error
```

The `import` subcommand imports a private key into a new account. The function prompts the user for a password and saves the account in the keystore.

## Flags

The `geth account` command supports the following flags:

### `--datadir`

Specifies the data directory for the node.

### `--keystore`

Specifies the keystore directory for the node.

### `--password`

Specifies the password file for non-interactive use.

### `--lightkdf`

Specifies the use of a light KDF for key derivation. ## Account Management Functions

### `accountList`

The `accountList` function lists all accounts in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function then iterates over all accounts in the keystore and prints their addresses to the console.

### `accountNew`

The `accountNew` function creates a new account in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter a password for the new account and then calls the `StoreKey` method of the `KeyStore` instance to create the new account. The function prints the address and path of the new account to the console.

### `accountUpdate`

The `accountUpdate` function updates an existing account in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the address of the account to update and the old password for the account. It then prompts the user to enter a new password for the account and calls the `Update` method of the `KeyStore` instance to update the account. The function prints a success message to the console.

### `accountImport`

The `accountImport` function imports an existing account into the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the path to the keyfile to import and the password for the keyfile. It then calls the `ImportPreSaleKey` method of the `KeyStore` instance to import the keyfile. The function prints the address and path of the imported account to the console.

### `accountExport`

The `accountExport` function exports an existing account from the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the address of the account to export and the password for the account. It then calls the `Export` method of the `KeyStore` instance to export the account. The function prints the exported account to the console.

### `accountRemove`

The `accountRemove` function removes an existing account from the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the address of the account to remove and the password for the account. It then calls the `Delete` method of the `KeyStore` instance to remove the account. The function prints a success message to the console.

### `accountListDuplicates`

The `accountListDuplicates` function lists all duplicate accounts in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function calls the `ListDuplicates` method of the `KeyStore` instance to retrieve a list of duplicate accounts. The function then prints the list of duplicate accounts to the console.

### `accountUnlock`

The `accountUnlock` function unlocks an account in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the address of the account to unlock and the password for the account. It then calls the `Unlock` method of the `KeyStore` instance to unlock the account. If the account cannot be unlocked, the function prints an error message to the console.

### `accountCreate`

The `accountCreate` function creates a new account in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter a password for the new account and then calls the `StoreKey` method of the `KeyStore` instance to create the new account. The function prints the address and path of the new account to the console.

### `accountUpdate`

The `accountUpdate` function updates an existing account in the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the address of the account to update and the old password for the account. It then prompts the user to enter a new password for the account and calls the `Update` method of the `KeyStore` instance to update the account. The function prints a success message to the console.

### `importWallet`

The `importWallet` function imports an existing wallet into the keystore defined by the CLI flags. It retrieves the keystore directory from the node configuration and uses it to create a new `KeyStore` instance. The function prompts the user to enter the path to the keyfile to import and the password for the keyfile. It then calls the `ImportPreSaleKey` method of the `KeyStore` instance to import the keyfile. The function prints the address and path of the imported account to the console. # Documentation for Account Package

The `Account` package provides functions for managing Ethereum accounts. The package includes functions for creating new accounts, importing existing accounts, and managing account keys.

## Functions

### `accountNew`

```go
func accountNew(ctx *cli.Context) error
```

The `accountNew` function creates a new Ethereum account. The function prompts the user for a password to encrypt the account key and saves the key to the keystore. The function returns the address of the new account.

### `accountImport`

```go
func accountImport(ctx *cli.Context) error
```

The `accountImport` function imports an existing Ethereum account. The function loads the private key from the specified keyfile and prompts the user for a password to encrypt the account key. The function saves the key to the keystore and returns the address of the imported account.

### `makeConfigNode`

```go
func makeConfigNode(ctx *cli.Context) (*node.Node, *node.ServiceContext)
```

The `makeConfigNode` function creates a new Ethereum node with the specified configuration. The function returns the node and the service context.

### `GetPassPhraseWithList`

```go
func GetPassPhraseWithList(prompt string, confirm bool, maxAttempts int, passwordList []string) string
```

The `GetPassPhraseWithList` function prompts the user for a password and validates it against a list of allowed passwords. The function returns the password if it is valid, or prompts the user again if it is not.

### `LoadECDSA`

```go
func LoadECDSA(keyfile string) (*ecdsa.PrivateKey, error)
```

The `LoadECDSA` function loads an ECDSA private key from the specified keyfile. The function returns the private key or an error if the keyfile cannot be loaded.

### `Backends`

```go
func (am *Manager) Backends(typ string) []Backend
```

The `Backends` function returns a list of backends for the specified keystore type. The function returns an empty list if no backends are available.

### `ImportECDSA`

```go
func (ks *KeyStore) ImportECDSA(key *ecdsa.PrivateKey, passphrase string) (accounts.Account, error)
```

The `ImportECDSA` function imports an ECDSA private key into the keystore. The function encrypts the key with the specified passphrase and returns the new account or an error if the key cannot be imported.

### `Address`

```go
type Address [20]byte
```

The `Address` type represents an Ethereum account address. The type is a fixed-length byte array with a length of 20 bytes.

### `KeyStore`

```go
type KeyStore struct {
	// contains filtered or unexported fields
}
```

The `KeyStore` type represents a keystore for Ethereum accounts. The type provides functions for managing account keys, including importing and exporting keys, and encrypting and decrypting keys with passphrases.

### `Account`

```go
type Account struct {
	Address Address `json:"address"`
	URL     URL     `json:"url"`
}
```

The `Account` type represents an Ethereum account. The type includes the account address and the URL of the account.