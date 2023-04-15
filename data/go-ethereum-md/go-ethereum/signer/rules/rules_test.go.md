## Package Rules

The `rules` package contains the implementation of the rule engine for the signer. The rule engine is responsible for evaluating the rules and determining whether a transaction should be approved or rejected.

### Constants

- `JS`: A constant string that contains an example implementation of a Javascript rule file.

### Functions

- `mixAddr(a string) (*common.MixedcaseAddress, error)`: A function that takes a string and returns a pointer to a `MixedcaseAddress` type and an error. It converts the string to a mixed-case address.

### Types

- `alwaysDenyUI`: A struct that implements the `UI` interface. It is used to always deny transactions.

### Methods

- `OnInputRequired(info core.UserInputRequest) (core.UserInputResponse, error)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It returns a `UserInputResponse` type and an error. It is not implemented and returns an empty response.
- `RegisterUIServer(api *core.UIServerAPI)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a pointer to a `UIServerAPI` type and is not implemented.
- `OnSignerStartup(info core.StartupInfo)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a `StartupInfo` type and is not implemented.
- `ApproveTx(request *core.SignTxRequest) (core.SignTxResponse, error)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a pointer to a `SignTxRequest` type and returns a `SignTxResponse` type and an error. It always returns a response with `Approved` set to `false`.
- `ApproveSignData(request *core.SignDataRequest) (core.SignDataResponse, error)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a pointer to a `SignDataRequest` type and returns a `SignDataResponse` type and an error. It always returns a response with `Approved` set to `false`.
- `ApproveListing(request *core.ListRequest) (core.ListResponse, error)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a pointer to a `ListRequest` type and returns a `ListResponse` type and an error. It always returns a response with an empty `Accounts` field.
- `ApproveNewAccount(request *core.NewAccountRequest) (core.NewAccountResponse, error)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a pointer to a `NewAccountRequest` type and returns a `NewAccountResponse` type and an error. It always returns a response with `Approved` set to `false`.
- `ShowError(message string)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a string and is not implemented.
- `ShowInfo(message string)`: A method of the `alwaysDenyUI` struct that implements the `UI` interface. It takes a string and is not implemented. ## Function Documentation

### `func initRuleEngine(js string) (*rulesetUI, error)`

The `initRuleEngine` function takes in a JavaScript string and returns a pointer to a `rulesetUI` type and an error. It initializes a new `RuleEvaluator` with an `alwaysDenyUI` type and an `EphemeralStorage` type. If the initialization is successful, it loads the bootstrap JavaScript string into the `RuleEvaluator` and returns the `rulesetUI` type and a nil error. If there is an error during initialization or loading the bootstrap JavaScript, it returns a nil pointer to `rulesetUI` and an error.

### `func TestListRequest(t *testing.T)`

The `TestListRequest` function is a test function that tests the `ApproveListing` function of the `rulesetUI` type. It creates a slice of 5 `accounts.Account` types with unique addresses and URLs. It then initializes a new `RuleEvaluator` with a JavaScript string that returns "Approve" for any `ListRequest`. It calls the `ApproveListing` function of the `RuleEvaluator` with the created `ListRequest` and checks if the returned `ListResponse` has the same length as the created `accounts.Account` slice. If the lengths are not equal, it fails the test.

### `func TestSignTxRequest(t *testing.T)`

The `TestSignTxRequest` function is a test function that tests the `ApproveTx` function of the `rulesetUI` type. It initializes a new `RuleEvaluator` with a JavaScript string that returns "Approve" if the `from` address of the `SignTxRequest` is "0x0000000000000000000000000000000000001337" and "Reject" if the `from` address is "0x000000000000000000000000000000000000dead". It creates a `SignTxRequest` with a `SendTxArgs` that has a `from` address of "0x0000000000000000000000000000000000001337" and a `to` address of "0x000000000000000000000000000000000000dead". It then calls the `ApproveTx` function of the `RuleEvaluator` with the created `SignTxRequest` and checks if the returned `SignTxResponse` has the `Approved` field set to true. If the `Approved` field is not true, it fails the test.

### `type dummyUI struct`

The `dummyUI` type is a struct that implements the `rulesetUI` interface. It has a `calls` field that is a slice of strings that records the function calls made to the `dummyUI` type.

### `func (d *dummyUI) RegisterUIServer(api *core.UIServerAPI)`

The `RegisterUIServer` function is a method of the `dummyUI` type that takes in a pointer to a `UIServerAPI` type and does nothing.

### `func (d *dummyUI) OnInputRequired(info core.UserInputRequest) (core.UserInputResponse, error)`

The `OnInputRequired` function is a method of the `dummyUI` type that takes in a `UserInputRequest` type and returns a `UserInputResponse` type and an error. It appends the string "OnInputRequired" to the `calls` field of the `dummyUI` type and returns an empty `UserInputResponse` and a nil error.

### `func (d *dummyUI) ApproveTx(request *core.SignTxRequest) (core.SignTxResponse, error)`

The `ApproveTx` function is a method of the `dummyUI` type that takes in a `SignTxRequest` type and returns a `SignTxResponse` type and an error. It appends the string "ApproveTx" to the `calls` field of the `dummyUI` type and returns an empty `SignTxResponse` and the `ErrRequestDenied` error.

### `func (d *dummyUI) ApproveSignData(request *core.SignDataRequest) (core.SignDataResponse, error)`

The `ApproveSignData` function is a method of the `dummyUI` type that takes in a `SignDataRequest` type and returns a `SignDataResponse` type and an error. It appends the string "ApproveSignData" to the `calls` field of the `dummyUI` type and returns an empty `SignDataResponse` and the `ErrRequestDenied` error.

### `func (d *dummyUI) ApproveListing(request *core.ListRequest) (core.ListResponse, error)`

The `ApproveListing` function is a method of the `dummyUI` type that takes in a `ListRequest` type and returns a `ListResponse` type and an error. It appends the string "ApproveListing" to the `calls` field of the `dummyUI` type and returns an empty `ListResponse` and the `ErrRequestDenied` error.

### `func (d *dummyUI) ApproveNewAccount(request *core.NewAccountRequest) (core.NewAccountResponse, error)`

The `ApproveNewAccount` function is a method of the `dummyUI` type that takes in a `NewAccountRequest` type and returns a `NewAccountResponse` type and an error. It appends the string "ApproveNewAccount" to the `calls` field of the `dummyUI` type and returns an empty `NewAccountResponse` and the `ErrRequestDenied` error.

### `func (d *dummyUI) ShowError(message string)`

The `ShowError` function is a method of the `dummyUI` type that takes in a string and does nothing.

### `func (d *dummyUI) ShowInfo(message string)`

The `ShowInfo` function is a method of the `dummyUI` type that takes in a string and does nothing.

### `func (d *dummyUI) OnApprovedTx(tx ethapi.SignTransactionResult)`

The `OnApprovedTx` function is a method of the `dummyUI` type that takes in a `SignTransactionResult` type and does nothing. ## Function Documentation

### func (d *dummyUI) ApproveNewAccount(result interface{})
`ApproveNewAccount` is a method of the `dummyUI` type that appends the string "ApproveNewAccount" to the `calls` slice of the `dummyUI` instance.

### func (d *dummyUI) ApproveSignData(result interface{})
`ApproveSignData` is a method of the `dummyUI` type that appends the string "ApproveSignData" to the `calls` slice of the `dummyUI` instance.

### func (d *dummyUI) ApproveTx(result ethapi.SignTransactionResult)
`ApproveTx` is a method of the `dummyUI` type that appends the string "ApproveTx" to the `calls` slice of the `dummyUI` instance.

### func (d *dummyUI) OnApprovedTx(result ethapi.SignTransactionResult)
`OnApprovedTx` is a method of the `dummyUI` type that appends the string "OnApprovedTx" to the `calls` slice of the `dummyUI` instance.

### func (d *dummyUI) OnSignerStartup(info core.StartupInfo)
`OnSignerStartup` is a method of the `dummyUI` type that takes in a `core.StartupInfo` type and does nothing.

### func TestForwarding(t *testing.T)
`TestForwarding` is a test function that tests that the rule-engine correctly dispatches requests to the next caller. It creates a `dummyUI` instance, a `jsBackend` instance, and a `RuleEvaluator` instance. It then initializes the `RuleEvaluator` instance with a bootstrap js file. It then calls the `ApproveSignData`, `ApproveTx`, `ApproveNewAccount`, `ApproveListing`, `ShowError`, and `ShowInfo` methods of the `RuleEvaluator` instance. It then calls the `OnApprovedTx` method of the `RuleEvaluator` instance with an empty `ethapi.SignTransactionResult` type. Finally, it checks that the `calls` slice of the `dummyUI` instance has a length of 6.

### func TestMissingFunc(t *testing.T)
`TestMissingFunc` is a test function that tests that a missing function yields an error. It creates a `RuleEvaluator` instance and initializes it with a js file. It then calls the `execute` method of the `RuleEvaluator` instance with a missing method name and a string argument. It checks that an error is returned. It then calls the `checkApproval` method of the `RuleEvaluator` instance with a missing method name, a nil `ethapi.SignTransactionResult` type, and a nil `ethapi.SignDataResult` type. It checks that an error is returned and that the method does not approve.

### func TestStorage(t *testing.T)
`TestStorage` is a test function that tests the storage functionality of the rule-engine. It initializes a `RuleEvaluator` instance with a js file that tests the storage functionality. It then calls the `execute` method of the `RuleEvaluator` instance with the name of the test function and a nil argument. It checks that the returned value matches the expected value.

### const ExampleTxWindow = `...`
`ExampleTxWindow` is a constant string that contains a js script that defines a time window and a limit for transactions. It also defines a function that checks if a transaction exceeds the weekly limit. ## Documentation for the Source Code

### Function: `isLimitOk`

The `isLimitOk` function takes in a transaction and returns a boolean value indicating whether the transaction is within the allowed limit. The function checks if the transaction value is less than or equal to the limit set in the rule engine.

### Function: `ApproveTx`

The `ApproveTx` function is a method of the `RuleEngine` type that takes in an unsigned transaction and returns a `SignTxResponse` type and an error. The function checks if the transaction is valid according to the rules set in the rule engine. If the transaction is valid, the function returns a `SignTxResponse` with the `Approved` field set to `true`. If the transaction is invalid, the function returns a `SignTxResponse` with the `Approved` field set to `false` and a list of validation messages.

### Function: `OnApprovedTx`

The `OnApprovedTx` function is a callback function that is called when a transaction has been approved and signed. The function takes in a response string that contains the return value that will be sent to the external caller. The function updates the stored transactions with the new transaction.

### Function: `dummyTx`

The `dummyTx` function takes in a value of type `hexutil.Big` and returns a `SignTxRequest` type. The function creates a dummy transaction with the given value, nonce, gas, gas price, and call info.

### Function: `dummyTxWithV`

The `dummyTxWithV` function takes in a value of type `uint64` and returns a `SignTxRequest` type. The function creates a dummy transaction with the given value, nonce, gas, gas price, and call info.

### Function: `dummySigned`

The `dummySigned` function takes in a value of type `*big.Int` and returns a `Transaction` type. The function creates a dummy signed transaction with the given value, to address, gas, gas price, and data.

### Function: `TestLimitWindow`

The `TestLimitWindow` function is a test function that tests the `isLimitOk` function and the `ApproveTx` function. The function creates a rule engine with a transaction window rule and tests if the rule engine approves or rejects transactions based on the transaction window.

### Struct: `dontCallMe`

The `dontCallMe` struct is used as a next-handler that does not want to be called. The struct implements the `OnInputRequired`, `RegisterUIServer`, and `OnSignerStartup` methods of the `NextHandler` interface. ## Function Documentation

### func (d *dontCallMe) ApproveSignData(request *core.SignDataRequest) (core.SignDataResponse, error)

`ApproveSignData` is a method of the `dontCallMe` type that is used to deny any requests to approve signing data. It takes in a `request` pointer to a `core.SignDataRequest` type and returns a `core.SignDataResponse` type and an `error`. The function always fails and returns an error message.

### func (d *dontCallMe) ApproveListing(request *core.ListRequest) (core.ListResponse, error)

`ApproveListing` is a method of the `dontCallMe` type that is used to deny any requests to approve listing. It takes in a `request` pointer to a `core.ListRequest` type and returns a `core.ListResponse` type and an `error`. The function always fails and returns an error message.

### func (d *dontCallMe) ApproveNewAccount(request *core.NewAccountRequest) (core.NewAccountResponse, error)

`ApproveNewAccount` is a method of the `dontCallMe` type that is used to deny any requests to approve creating a new account. It takes in a `request` pointer to a `core.NewAccountRequest` type and returns a `core.NewAccountResponse` type and an `error`. The function always fails and returns an error message.

### func (d *dontCallMe) ShowError(message string)

`ShowError` is a method of the `dontCallMe` type that is used to deny any requests to show an error message. It takes in a `message` string and does not return anything. The function always fails and returns an error message.

### func (d *dontCallMe) ShowInfo(message string)

`ShowInfo` is a method of the `dontCallMe` type that is used to deny any requests to show an info message. It takes in a `message` string and does not return anything. The function always fails and returns an error message.

### func (d *dontCallMe) OnApprovedTx(tx ethapi.SignTransactionResult)

`OnApprovedTx` is a method of the `dontCallMe` type that is used to deny any requests to approve a transaction. It takes in a `tx` of type `ethapi.SignTransactionResult` and does not return anything. The function always fails and returns an error message.

### func TestContextIsCleared(t *testing.T)

`TestContextIsCleared` is a test function that tests if the rule-engine does not retain variables over several requests. The function creates a JavaScript engine and loads a script that sets a variable `foobar` to "Approve" or "Reject" depending on its current value. The function then calls the `ApproveTx` method of the rule-engine twice and checks if the returned values are the same. If they are not, it means that the execution context was not cleared between executions.

### func TestSignData(t *testing.T)

`TestSignData` is a test function that tests the `ApproveSignData` method of the rule-engine. The function creates a JavaScript engine and loads a script that approves signing data if the address is "0x694267f14675d7e1b9494fd8d72fefe1755710fa" and the message contains the string "bazonk". The function then creates a `core.SignDataRequest` with a message that contains the string "baz bazonk foo" and calls the `ApproveSignData` method of the rule-engine. The function checks if the returned value is approved. If it is not, it means that the request was denied.