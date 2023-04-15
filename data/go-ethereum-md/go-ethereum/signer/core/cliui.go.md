## Documentation for the Source Code

### Package: `core`

The `core` package contains the core functionality of the Ethereum client.

### Type: `CommandlineUI`

The `CommandlineUI` type is a struct that represents the command-line user interface for the Ethereum client. It contains an input reader, a mutex, and a pointer to a `UIServerAPI` instance.

Example usage:

```go
type CommandlineUI struct {
    in  *bufio.Reader
    mu  sync.Mutex
    api *UIServerAPI
}

func NewCommandlineUI() *CommandlineUI {
    return &CommandlineUI{in: bufio.NewReader(os.Stdin)}
}
```

Note: This type is used to handle user input and output for the Ethereum client.

### Function: `NewCommandlineUI`

The `NewCommandlineUI` function creates a new instance of the `CommandlineUI` type.

Example usage:

```go
func NewCommandlineUI() *CommandlineUI {
    return &CommandlineUI{in: bufio.NewReader(os.Stdin)}
}
```

Note: This function is used to create a new instance of the `CommandlineUI` type.

### Function: `RegisterUIServer`

The `RegisterUIServer` function takes in one parameter: `api` (a pointer to a `UIServerAPI` instance). It sets the `api` field of the `CommandlineUI` instance.

Example usage:

```go
func (ui *CommandlineUI) RegisterUIServer(api *UIServerAPI) {
    ui.api = api
}
```

Note: This function is used to register a `UIServerAPI` instance with the `CommandlineUI` instance.

### Function: `OnInputRequired`

The `OnInputRequired` function takes in one parameter: `info` (a `UserInputRequest` struct). It prompts the user for input and returns a `UserInputResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) OnInputRequired(info UserInputRequest) (UserInputResponse, error) {
    fmt.Printf("## %s\n\n%s\n", info.Title, info.Prompt)
    defer fmt.Println("-----------------------")
    if info.IsPassword {
        text, err := prompt.Stdin.PromptPassword("> ")
        if err != nil {
            log.Error("Failed to read password", "error", err)
            return UserInputResponse{}, err
        }
        return UserInputResponse{text}, nil
    }
    text := ui.readString()
    return UserInputResponse{text}, nil
}
```

Note: This function is used to handle user input requests from the Ethereum client.

### Function: `ApproveTx`

The `ApproveTx` function takes in one parameter: `request` (a pointer to a `SignTxRequest` struct). It prompts the user for confirmation to sign a transaction and returns a `SignTxResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) ApproveTx(request *SignTxRequest) (SignTxResponse, error) {
    ui.mu.Lock()
    defer ui.mu.Unlock()
    weival := request.Transaction.Value.ToInt()
    fmt.Printf("--------- Transaction request-------------\n")
    if to := request.Transaction.To; to != nil {
        fmt.Printf("to:    %v\n", to.Original())
        if !to.ValidChecksum() {
            fmt.Printf("\nWARNING: Invalid checksum on to-address!\n\n")
        }
    } else {
        fmt.Printf("to:    <contact creation>\n")
    }
    fmt.Printf("from:               %v\n", request.Transaction.From.String())
    fmt.Printf("value:              %v wei\n", weival)
    f
```

Note: This function is used to prompt the user for confirmation to sign a transaction. ## Documentation for the Source Code

### Function: `ApproveTx`

The `ApproveTx` function takes in one parameter: `request` (a pointer to a `SignTxRequest` struct). It prompts the user for confirmation to sign a transaction and returns a `SignTxResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) ApproveTx(request *SignTxRequest) (SignTxResponse, error) {
    ui.mu.Lock()
    defer ui.mu.Unlock()

    fmt.Printf("-------- Sign transaction request--------------\n")
    fmt.Printf("Account:  %s\n", request.Address.String())
    fmt.Printf("To:       %s\n", request.Transaction.To().String())
    fmt.Printf("Value:    %v wei\n", request.Transaction.Value().ToInt())
    fmt.Printf("Data:     %v\n", hexutil.Encode(request.Transaction.Data()))
    fmt.Printf("Gas:      %v (%v)\n", request.Transaction.Gas(), uint64(request.Transaction.Gas()))
    if request.Transaction.MaxFeePerGas() != nil {
        fmt.Printf("MaxFeePerGas:          %v wei\n", request.Transaction.MaxFeePerGas().ToInt())
        fmt.Printf("MaxPriorityFeePerGas:  %v wei\n", request.Transaction.MaxPriorityFeePerGas().ToInt())
    } else {
        fmt.Printf("GasPrice: %v wei\n", request.Transaction.GasPrice().ToInt())
    }
    fmt.Printf("Nonce:    %v (%v)\n", request.Transaction.Nonce(), uint64(request.Transaction.Nonce()))
    if chainId := request.Transaction.ChainID(); chainId != nil {
        fmt.Printf("ChainID:  %v\n", chainId)
    }
    if list := request.Transaction.AccessList(); list != nil {
        fmt.Printf("Accesslist\n")
        for i, el := range *list {
            fmt.Printf(" %d. %v\n", i, el.Address)
            for j, slot := range el.StorageKeys {
                fmt.Printf("   %d. %v\n", j, slot)
            }
        }
    }
    if request.Transaction.Data() != nil {
        d := *request.Transaction.Data()
        if len(d) > 0 {
            fmt.Printf("Data:     %v\n", hexutil.Encode(d))
        }
    }
    if request.Callinfo != nil {
        fmt.Printf("\nTransaction validation:\n")
        for _, m := range request.Callinfo {
            fmt.Printf("  * %s : %s\n", m.Typ, m.Message)
        }
        fmt.Println()
    }
    fmt.Printf("\n")
    showMetadata(request.Meta)
    fmt.Printf("-------------------------------------------\n")
    if !ui.confirm() {
        return SignTxResponse{request.Transaction, false}, nil
    }
    return SignTxResponse{request.Transaction, true}, nil
```

Note: This function prompts the user for confirmation to sign a transaction and returns a `SignTxResponse` struct.

### Function: `ApproveSignData`

The `ApproveSignData` function takes in one parameter: `request` (a pointer to a `SignDataRequest` struct). It prompts the user for confirmation to sign data and returns a `SignDataResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) ApproveSignData(request *SignDataRequest) (SignDataResponse, error) {
    ui.mu.Lock()
    defer ui.mu.Unlock()

    fmt.Printf("-------- Sign data request--------------\n")
    fmt.Printf("Account:  %s\n", request.Address.String())
    if len(request.Callinfo) != 0 {
        fmt.Printf("\nValidation messages:\n")
        for _, m := range request.Callinfo {
            fmt.Printf("  * %s : %s\n", m.Typ, m.Message)
        }
        fmt.Println()
    }
    fmt.Printf("Messages:\n")
    for _, nvt := range request.Messages {
        fmt.Printf("\u00a0\u00a0%v\n", strings.TrimSpace(nvt.Pprint(1)))
    }
    fmt.Printf("Raw data:  \n\t%q\n", request.Rawdata)
    fmt.Printf("Data hash:  %v\n", request.Hash)
    fmt.Printf("-------------------------------------------\n")
    showMetadata(request.Meta)
    if !ui.confirm() {
        return SignDataResponse{false}, nil
    }
    return SignDataResponse{true}, nil
```

Note: This function prompts the user for confirmation to sign data and returns a `SignDataResponse` struct.

### Function: `ApproveListing`

The `ApproveListing` function takes in one parameter: `request` (a pointer to a `ListRequest` struct). It prompts the user for confirmation to list accounts and returns a `ListResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) ApproveListing(request *ListRequest) (ListResponse, error) {
    ui.mu.Lock()
    defer ui.mu.Unlock()

    fmt.Printf("-------- List Account request--------------\n")
    fmt.Printf("A request has been made to list all accounts. \n")
    fmt.Printf("You can select which accounts the caller can see\n")
    for _, account := range request.Accounts {
        fmt.Printf("  [x] %v\n", account.Address.Hex())
        fmt.Printf("    URL: %v\n", account.URL)
    }
    fmt.Printf("-------------------------------------------\n")
    showMetadata(request.Meta)
    if !ui.confirm() {
        return ListResponse{nil}, nil
    }
    return ListResponse{request.Accounts}, nil
```

Note: This function prompts the user for confirmation to list accounts and returns a `ListResponse` struct.

### Function: `ApproveNewAccount`

The `ApproveNewAccount` function takes in one parameter: `request` (a pointer to a `NewAccountRequest` struct). It prompts the user for confirmation to create a new account and returns a `NewAccountResponse` struct.

Example usage:

```go
func (ui *CommandlineUI) ApproveNewAccount(request *NewAccountRequest) (NewAccountResponse, error) {
    ui.mu.Lock()
    defer ui.mu.Unlock()

    fmt.Printf("-------- New Account request--------------\n\n")
    fmt.Printf("A request has been made to create a new account. \n")
    fmt.Printf("Approving this operation means that a new account is created,\n")
    fmt.Printf("and the address is returned to the external caller\n\n")
    showMetadata(request.Meta)
    if !ui.confirm() {
        return NewAccountResponse{false}, nil
    }
    return NewAccountResponse{true}, nil
```

Note: This function prompts the user for confirmation to create a new account and returns a `NewAccountResponse` struct. ## Documentation for the Source Code

### Function: `NewAccountResponse`

The `NewAccountResponse` function takes in one parameter: `success` (a boolean). It returns a `NewAccountResponse` struct with a `Success` field set to the value of the `success` parameter.

Example usage:

```go
func createNewAccount() {
    response, err := api.NewAccount(context.Background())
    if err != nil {
        ui.ShowError(fmt.Sprintf("Error creating new account: %v", err))
        return
    }
    if !response.Success {
        ui.ShowError("Failed to create new account")
        return
    }
    ui.ShowInfo(fmt.Sprintf("New account created: %s", response.Address))
}
```

Note: This function is used to create a new account and returns a `NewAccountResponse` struct with a `Success` field set to `true` if the account was created successfully, and `false` otherwise.

### Function: `ShowError`

The `ShowError` function takes in one parameter: `message` (a string). It displays an error message to the user.

Example usage:

```go
func handleError(err error) {
    ui.ShowError(fmt.Sprintf("Error: %v", err))
}
```

Note: This function is used to display an error message to the user.

### Function: `ShowInfo`

The `ShowInfo` function takes in one parameter: `message` (a string). It displays an info message to the user.

Example usage:

```go
func showBalance(address string) {
    balance, err := api.GetBalance(context.Background(), address)
    if err != nil {
        ui.ShowError(fmt.Sprintf("Error getting balance: %v", err))
        return
    }
    ui.ShowInfo(fmt.Sprintf("Balance for %s: %s", address, balance))
}
```

Note: This function is used to display an info message to the user.

### Function: `OnApprovedTx`

The `OnApprovedTx` function takes in one parameter: `tx` (a `ethapi.SignTransactionResult` struct). It displays the signed transaction to the user.

Example usage:

```go
func signTransaction(tx *types.Transaction) {
    result, err := api.SignTransaction(context.Background(), tx)
    if err != nil {
        ui.ShowError(fmt.Sprintf("Error signing transaction: %v", err))
        return
    }
    ui.OnApprovedTx(result)
}
```

Note: This function is used to display the signed transaction to the user.

### Function: `showAccounts`

The `showAccounts` function lists the available accounts.

Example usage:

```go
func listAccounts() {
    ui.showAccounts()
}
```

Note: This function is used to list the available accounts.

### Function: `OnSignerStartup`

The `OnSignerStartup` function takes in one parameter: `info` (a `StartupInfo` struct). It displays the signer info to the user.

Example usage:

```go
func handleSignerStartup(info *signer.StartupInfo) {
    ui.OnSignerStartup(*info)
}
```

Note: This function is used to display the signer info to the user.