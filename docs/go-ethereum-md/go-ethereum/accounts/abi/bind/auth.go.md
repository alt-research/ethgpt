# Bind Package

The `bind` package provides a set of utility functions to interact with Ethereum smart contracts. It includes methods to create transaction signers, deploy contracts, and call contract functions.

## Functions

### NewTransactor

```go
func NewTransactor(keyin io.Reader, passphrase string) (*TransactOpts, error)
```

`NewTransactor` creates a new transaction signer from an encrypted JSON key stream and the associated passphrase.

- `keyin io.Reader`: the reader containing the encrypted JSON key.
- `passphrase string`: the passphrase to decrypt the key.

### NewKeyStoreTransactor

```go
func NewKeyStoreTransactor(keystore *keystore.KeyStore, account accounts.Account) (*TransactOpts, error)
```

`NewKeyStoreTransactor` creates a new transaction signer from a decrypted key from a keystore.

- `keystore *keystore.KeyStore`: the keystore containing the decrypted key.
- `account accounts.Account`: the account to use for signing transactions.

### NewKeyedTransactor

```go
func NewKeyedTransactor(key *ecdsa.PrivateKey) *TransactOpts
```

`NewKeyedTransactor` creates a new transaction signer from a single private key.

- `key *ecdsa.PrivateKey`: the private key to use for signing transactions.

## Variables

### ErrNoChainID

```go
var ErrNoChainID = errors.New("no chain id specified")
```

`ErrNoChainID` is returned whenever the user failed to specify a chain id.

### ErrNotAuthorized

```go
var ErrNotAuthorized = errors.New("not authorized to sign this account")
```

`ErrNotAuthorized` is returned when an account is not properly unlocked.

## Deprecated Functions

The following functions are deprecated and should not be used:

- `NewTransactor`
- `NewKeyStoreTransactor`
- `NewKeyedTransactor`

Use the following functions instead:

- `NewTransactorWithChainID`
- `NewKeyStoreTransactorWithChainID`
- `NewKeyedTransactorWithChainID`

## Notes

This package is part of the go-ethereum library and is licensed under the GNU Lesser General Public License. This codebase provides utility methods to easily create transaction signers for Ethereum transactions. The code is written in Go and uses the Ethereum client library, `go-ethereum`.

## `NewTransactorWithChainID`

This function creates a transaction signer from an encrypted JSON key stream and the associated passphrase. It takes in three parameters:

- `keyin` (type: `io.Reader`): an input stream containing the encrypted JSON key.
- `passphrase` (type: `string`): the passphrase used to encrypt the JSON key.
- `chainID` (type: `*big.Int`): the chain ID of the Ethereum network.

It returns a `*TransactOpts` object and an error. The `*TransactOpts` object contains the transaction signer and the context for the transaction.

```go
func NewTransactorWithChainID(keyin io.Reader, passphrase string, chainID *big.Int) (*TransactOpts, error) {
	json, err := io.ReadAll(keyin)
	if err != nil {
		return nil, err
	}
	key, err := keystore.DecryptKey(json, passphrase)
	if err != nil {
		return nil, err
	}
	return NewKeyedTransactorWithChainID(key.PrivateKey, chainID)
}
```

## `NewKeyStoreTransactorWithChainID`

This function creates a transaction signer from a decrypted key from a keystore. It takes in three parameters:

- `keystore` (type: `*keystore.KeyStore`): the keystore containing the decrypted key.
- `account` (type: `accounts.Account`): the account associated with the decrypted key.
- `chainID` (type: `*big.Int`): the chain ID of the Ethereum network.

It returns a `*TransactOpts` object and an error. The `*TransactOpts` object contains the transaction signer and the context for the transaction.

```go
func NewKeyStoreTransactorWithChainID(keystore *keystore.KeyStore, account accounts.Account, chainID *big.Int) (*TransactOpts, error) {
	if chainID == nil {
		return nil, ErrNoChainID
	}
	signer := types.LatestSignerForChainID(chainID)
	return &TransactOpts{
		From: account.Address,
		Signer: func(address common.Address, tx *types.Transaction) (*types.Transaction, error) {
			if address != account.Address {
				return nil, ErrNotAuthorized
			}
			signature, err := keystore.SignHash(account, signer.Hash(tx).Bytes())
			if err != nil {
				return nil, err
			}
			return tx.WithSignature(signer, signature)
		},
		Context: context.Background(),
	}, nil
}
```

## `NewKeyedTransactorWithChainID`

This function creates a transaction signer from a single private key. It takes in two parameters:

- `key` (type: `*ecdsa.PrivateKey`): the private key associated with the account.
- `chainID` (type: `*big.Int`): the chain ID of the Ethereum network.

It returns a `*TransactOpts` object and an error. The `*TransactOpts` object contains the transaction signer and the context for the transaction.

```go
func NewKeyedTransactorWithChainID(key *ecdsa.PrivateKey, chainID *big.Int) (*TransactOpts, error) {
	keyAddr := crypto.PubkeyToAddress(key.PublicKey)
	if chainID == nil {
		return nil, ErrNoChainID
	}
	signer := types.LatestSignerForChainID(chainID)
	return &TransactOpts{
		From: keyAddr,
		Signer: func(address common.Address, tx *types.Transaction) (*types.Transaction, error) {
			if address != keyAddr {
				return nil, ErrNotAuthorized
			}
			signature, err := crypto.Sign(signer.Hash(tx).Bytes(), key)
			if err != nil {
				return nil, err
			}
			return tx.WithSignature(signer, signature)
		},
		Context: context.Background(),
	}, nil
}
```

## `NewClefTransactor`

This function creates a transaction signer with a clef backend. It takes in two parameters:

- `clef` (type: `*external.ExternalSigner`): the clef backend.
- `account` (type: `accounts.Account`): the account associated with the clef backend.

It returns a `*TransactOpts` object. The `*TransactOpts` object contains the transaction signer and the context for the transaction.

```go
func NewClefTransactor(clef *external.ExternalSigner, account accounts.Account) *TransactOpts {
	return &TransactOpts{
		From: account.Address,
		Signer: func(address common.Address, transaction *types.Transaction) (*types.Transaction, error) {
			if address != account.Address {
				return nil, ErrNotAuthorized
			}
			return clef.SignTx(account, transaction, nil) // Clef enforces its own chain id
		},
		Context: context.Background(),
	}
}
```