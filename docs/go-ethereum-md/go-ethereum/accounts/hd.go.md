# Ethereum Accounts Package

The Ethereum Accounts Package is a Go implementation of a hierarchical deterministic wallet account derivation path. It provides a way to manage accounts and their associated private keys.

## DerivationPath

The `DerivationPath` type represents the computer-friendly version of a hierarchical deterministic wallet account derivation path. It is defined as an array of unsigned 32-bit integers.

The BIP-32 spec defines derivation paths to be of the form:

```
m / purpose' / coin_type' / account' / change / address_index
```

The BIP-44 spec defines that the `purpose` be 44' (or 0x8000002C) for cryptocurrencies, and SLIP-44 assigns the `coin_type` 60' (or 0x8000003C) to Ethereum.

The root path for Ethereum is `m/44'/60'/0'/0` according to the specification from https://github.com/ethereum/EIPs/issues/84, albeit it's not set in stone yet whether accounts should increment the last component or the children of that. We will go with the simpler approach of incrementing the last component.

The `ParseDerivationPath` function converts a user-specified derivation path string to the internal binary representation. Full derivation paths need to start with the `m/` prefix, relative derivation paths (which will get appended to the default root path) must not have prefixes in front of the first element. Whitespace is ignored.

## Account

The `Account` type represents an Ethereum account. It contains the account's address, balance, and associated private key.

The `NewAccount` function generates a new account with a random private key. The `NewAccountFromKey` function generates a new account from a given private key.

The `SignHash` method signs a given hash with the account's private key. The `SignTx` method signs a given transaction with the account's private key.

## KeyStore

The `KeyStore` type represents a collection of encrypted Ethereum accounts. It provides methods for managing accounts, encrypting and decrypting them, and exporting and importing them.

The `NewKeyStore` function creates a new KeyStore with a given directory and scrypt parameters. The `OpenKeyStore` function opens an existing KeyStore from a given directory.

The `NewAccount` method generates a new account and adds it to the KeyStore. The `Find` method finds an account by its address. The `Accounts` method returns a list of all accounts in the KeyStore.

The `Export` method exports a KeyStore to a JSON-encoded byte slice. The `Import` method imports a KeyStore from a JSON-encoded byte slice.

## Utils

The Ethereum Accounts Package also provides some utility functions for working with Ethereum addresses and amounts.

The `IsValidAddress` function checks if a given string is a valid Ethereum address. The `HexToAddress` function converts a hexadecimal string to an Ethereum address. The `FormatEther` function formats a given amount of wei as an ether value. The `ParseEther` function parses an ether value as a number of wei. ## Derivation Path

The `DerivationPath` type represents a BIP-32 derivation path, which is a sequence of integers separated by forward slashes. It is used to derive child keys from a parent key in a hierarchical deterministic wallet.

### ParseDerivationPath

The `ParseDerivationPath` function parses a string representation of a derivation path and returns a slice of integers representing the path. The function expects the path to be in the format "m/0'/1/2'/3/4'".

### String

The `String` method of the `DerivationPath` type returns a string representation of the path in the canonical format "m/0'/1/2'/3/4'".

### MarshalJSON

The `MarshalJSON` method of the `DerivationPath` type returns a JSON-serialized string representation of the path.

### UnmarshalJSON

The `UnmarshalJSON` method of the `DerivationPath` type parses a JSON-serialized string representation of the path and sets the value of the `DerivationPath` variable to the parsed value.

### DefaultIterator

The `DefaultIterator` function creates a BIP-32 path iterator, which progresses by increasing the last component. For example, if the base path is "m/44'/60'/0'/0", the iterator will generate the following paths: "m/44'/60'/0'/0/0", "m/44'/60'/0'/0/1", "m/44'/60'/0'/0/2", and so on.

### LedgerLiveIterator

The `LedgerLiveIterator` function creates a BIP-44 path iterator for Ledger Live. Ledger Live increments the third component rather than the fifth component. For example, if the base path is "m/44'/60'/0'/0", the iterator will generate the following paths: "m/44'/60'/0'/0/0", "m/44'/60'/1'/0/0", "m/44'/60'/2'/0/0", and so on.