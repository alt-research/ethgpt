# Documentation for the Source Code

## Package `core`

The `core` package contains the implementation of the Ethereum core protocol.

## Type `UIServerAPI`

The `UIServerAPI` type implements methods that Clef provides for a UI to query in the bidirectional communication channel. This API is considered secure since a request can only ever arrive from the UI, and the UI is capable of approving any action. Thus, we can consider these requests pre-approved. It is important to note that these methods should not be exposed on the external service registry.

### Function `NewUIServerAPI`

The `NewUIServerAPI` function creates a new `UIServerAPI` instance.

Example usage:

```go
extapi := NewSignerAPI()
uiserverapi := NewUIServerAPI(extapi)
```

### Function `ListAccounts`

The `ListAccounts` function lists available accounts. As opposed to the external API definition, this method delivers the full `Account` object and not only the address.

Example call:

```json
{
    "jsonrpc": "2.0",
    "method": "clef_listAccounts",
    "params": [],
    "id": 4
}
```

### Function `ListWallets`

The `ListWallets` function returns a list of wallets that Clef manages.

Example call:

```json
{
    "jsonrpc": "2.0",
    "method": "clef_listWallets",
    "params": [],
    "id": 5
}
```

### Function `DeriveAccount`

The `DeriveAccount` function requests an HD wallet to derive a new account, optionally pinning it for later reuse.

Example call:

```json
{
    "jsonrpc": "2.0",
    "method": "clef_deriveAccount",
    "params": ["ledger://", "m/44'/60'/0'", false],
    "id": 6
}
```

## Type `rawWallet`

The `rawWallet` type is a JSON representation of an `accounts.Wallet` interface, with its data contents extracted into plain fields.

## Function `NewUIServerAPI`

The `NewUIServerAPI` function creates a new `UIServerAPI` instance.

Example usage:

```go
extapi := NewSignerAPI()
uiserverapi := NewUIServerAPI(extapi)
``` ## Documentation for the Source Code

### Function: `fetchKeystore`

The `fetchKeystore` function takes in one parameter: `am` (an accounts manager). It retrieves the encrypted keystore from the account manager.

Example usage:

```go
func fetchKeystore(am *accounts.Manager) *keystore.KeyStore {
    ks := am.Backends(keystore.KeyStoreType)
    if len(ks) == 0 {
        return nil
    }
    return ks[0].(*keystore.KeyStore)
}
```

Note: This function is used to retrieve the encrypted keystore from the account manager.

### Function: `ImportRawKey`

The `ImportRawKey` function takes in two parameters: `privkey` (a string) and `password` (a string). It stores the given hex encoded ECDSA key into the key directory, encrypting it with the passphrase.

Example usage:

```go
func (s *UIServerAPI) ImportRawKey(privkey string, password string) (accounts.Account, error) {
    key, err := crypto.HexToECDSA(privkey)
    if err != nil {
        return accounts.Account{}, err
    }
    if err := ValidatePasswordFormat(password); err != nil {
        return accounts.Account{}, fmt.Errorf("password requirements not met: %v", err)
    }
    // No error
    return fetchKeystore(s.am).ImportECDSA(key, password)
}
```

Note: This function is used to store the given hex encoded ECDSA key into the key directory, encrypting it with the passphrase.

### Function: `OpenWallet`

The `OpenWallet` function takes in two parameters: `url` (a string) and `passphrase` (a pointer to a string). It initiates a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via the provided passphrase. Note, the method may return an extra challenge requiring a second open (e.g. the Trezor PIN matrix challenge).

Example usage:

```go
func (s *UIServerAPI) OpenWallet(url string, passphrase *string) error {
    wallet, err := s.am.Wallet(url)
    if err != nil {
        return err
    }
    pass := ""
    if passphrase != nil {
        pass = *passphrase
    }
    return wallet.Open(pass)
}
```

Note: This function is used to initiate a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via the provided passphrase.

### Function: `ChainId`

The `ChainId` function returns the chainid in use for Eip-155 replay protection.

Example usage:

```go
func (s *UIServerAPI) ChainId() math.HexOrDecimal64 {
    return (math.HexOrDecimal64)(s.extApi.chainID.Uint64())
}
```

Note: This function is used to return the chainid in use for Eip-155 replay protection.

### Function: `SetChainId`

The `SetChainId` function takes in one parameter: `id` (a math.HexOrDecimal64). It sets the chain id to use when signing transactions.

Example usage:

```go
func (s *UIServerAPI) SetChainId(id math.HexOrDecimal64) math.HexOrDecimal64 {
    s.extApi.chainID = new(big.Int).SetUint64(uint64(id))
    return s.ChainId()
}
```

Note: This function is used to set the chain id to use when signing transactions.

### Function: `Export`

The `Export` function takes in two parameters: `ctx` (a context) and `addr` (a common.Address). It returns encrypted private key associated with the given address in web3 keystore format.

Example usage:

```go
func (s *UIServerAPI) Export(ctx context.Context, addr common.Address) (json.RawMessage, error) {
    // Look up the wallet containing the requested signer
    wallet, err := s.am.Find(accounts.Account{Address: addr})
    if err != nil {
        return nil, err
    }
    if wallet.URL().Scheme != keystore.KeyStoreScheme {
        return nil, fmt.Errorf("account is not a keystore-account")
    }
    return os.ReadFile(wallet.URL().Path)
}
```

Note: This function is used to return encrypted private key associated with the given address in web3 keystore format.

### Function: `Import`

The `Import` function takes in one parameter: `keyJSON` (a JSON object). It tries to import the given keyJSON in the local keystore. The keyJSON data is expected to be in web3 keystore format. It will decrypt the keyJSON with the given passphrase and on successful decryption it will encrypt the key with the given newPassphrase and store it in the keystore.

Example usage:

```go
func (s *UIServerAPI) Import(keyJSON accounts.JSON, oldPassphrase, newPassphrase string) (accounts.Account, error) {
    return fetchKeystore(s.am).Import(keyJSON, oldPassphrase, newPassphrase)
}
```

Note: This function is used to import the given keyJSON in the local keystore. The keyJSON data is expected to be in web3 keystore format. It will decrypt the keyJSON with the given passphrase and on successful decryption it will encrypt the key with the given newPassphrase and store it in the keystore. ## Documentation for the Source Code

### Function: `Import`

The `Import` function takes in four parameters: `ctx` (a context), `keyJSON` (a `json.RawMessage`), `oldPassphrase` (a string), and `newPassphrase` (a string). It imports a password-protected account using the given JSON key file and returns the imported account and an error (if any).

Example usage:

```go
func (api *UIServerAPI) Import(ctx context.Context, keyJSON json.RawMessage, oldPassphrase, newPassphrase string) (accounts.Account, error) {
    be := api.am.Backends(keystore.KeyStoreType)

    if len(be) == 0 {
        return accounts.Account{}, errors.New("password based accounts not supported")
    }
    if err := ValidatePasswordFormat(newPassphrase); err != nil {
        return accounts.Account{}, fmt.Errorf("password requirements not met: %v", err)
    }
    return be[0].(*keystore.KeyStore).Import(keyJSON, oldPassphrase, newPassphrase)
}
```

Note: This function imports a password-protected account using the given JSON key file and returns the imported account and an error (if any).

### Function: `New`

The `New` function takes in one parameter: `ctx` (a context). It creates a new password-protected account and returns the account address and an error (if any).

Example usage:

```go
func (api *UIServerAPI) New(ctx context.Context) (common.Address, error) {
    return api.extApi.newAccount()
}
```

Note: This function creates a new password-protected account and returns the account address and an error (if any).

### Future Implementations

The following methods are planned to be added in the future:

- Ruleset interaction: add rules, attest rulefiles
- Store metadata about accounts, e.g. naming of accounts

Note: These methods are not yet implemented.