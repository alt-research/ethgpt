## Package Rules

The `rules` package provides an implementation of the `UIClientAPI` interface that evaluates a JavaScript file for each defined UI-method.

### consoleOutput

`consoleOutput` is an override for the `console.log` and `console.error` methods to stream the output into the configured output stream instead of stdout.

### rulesetUI

`rulesetUI` provides an implementation of `UIClientAPI` that evaluates a JavaScript file for each defined UI-method.

#### NewRuleEvaluator

`NewRuleEvaluator` creates a new instance of `rulesetUI` and returns it.

#### RegisterUIServer

`RegisterUIServer` registers the UI server API.

#### Init

`Init` initializes the `rulesetUI` instance with the provided JavaScript rules.

#### execute

`execute` executes the provided JavaScript function with the given argument.

### Storage

`Storage` is an interface that defines the methods for storing and retrieving data.

### BigNumberJS

`BigNumberJS` is a JavaScript library for arbitrary-precision decimal and non-decimal arithmetic.

### RunProgram

`RunProgram` compiles and runs the provided JavaScript program.

### RunString

`RunString` compiles and runs the provided JavaScript string.

### Marshal

`Marshal` serializes the provided object into a JSON-encoded byte slice.

### Unmarshal

`Unmarshal` deserializes the provided JSON-encoded byte slice into an object. ## Function Documentation

### execute

The `execute` function is a method of the `rulesetUI` type that takes in a `jsfunc` string and a `jsarg` byte slice. It returns a `goja.Value` and an `error`. The function creates a new `goja.Runtime` and runs the provided JavaScript function with the provided argument. If the argument is not empty, it is first parsed as JSON. The function returns the result of the JavaScript function as a `goja.Value`.

### checkApproval

The `checkApproval` function is a method of the `rulesetUI` type that takes in a `jsfunc` string, a `jsarg` byte slice, and an `err` error. It returns a `bool` and an `error`. The function calls the `execute` function with the provided `jsfunc` and `jsarg`. If the execution is successful, the function checks the result of the execution. If the result is "Approve", the function returns `true` and no error. If the result is "Reject", the function returns `false` and no error. If the result is anything else, the function returns `false` and an error.

### ApproveTx

The `ApproveTx` function is a method of the `rulesetUI` type that takes in a `*core.SignTxRequest`. It returns a `core.SignTxResponse` and an `error`. The function first marshals the provided request as JSON. It then calls the `checkApproval` function with the "ApproveTx" JavaScript function and the marshaled JSON request. If the approval check is successful, the function returns a `core.SignTxResponse` with the provided transaction and `true` for `Approved`. If the approval check is unsuccessful, the function returns a `core.SignTxResponse` with `false` for `Approved` and the error from the approval check.

### ApproveSignData

The `ApproveSignData` function is a method of the `rulesetUI` type that takes in a `*core.SignDataRequest`. It returns a `core.SignDataResponse` and an `error`. The function first marshals the provided request as JSON. It then calls the `checkApproval` function with the "ApproveSignData" JavaScript function and the marshaled JSON request. If the approval check is successful, the function returns a `core.SignDataResponse` with `true` for `Approved`. If the approval check is unsuccessful, the function returns a `core.SignDataResponse` with `false` for `Approved` and the error from the approval check.

### OnInputRequired

The `OnInputRequired` function is a method of the `rulesetUI` type that takes in a `core.UserInputRequest`. It returns a `core.UserInputResponse` and an `error`. The function simply calls the `OnInputRequired` function of the next `core.SignerUI` in the chain.

### ApproveListing

The `ApproveListing` function is a method of the `rulesetUI` type that takes in a `*core.ListRequest`. It returns a `core.ListResponse` and an `error`. The function first marshals the provided request as JSON. It then calls the `checkApproval` function with the "ApproveListing" JavaScript function and the marshaled JSON request. If the approval check is successful, the function returns a `core.ListResponse` with the provided accounts. If the approval check is unsuccessful, the function returns an empty `core.ListResponse` and the error from the approval check.

### ApproveNewAccount

The `ApproveNewAccount` function is a method of the `rulesetUI` type that takes in a `*core.NewAccountRequest`. It returns a `core.NewAccountResponse` and an `error`. The function simply calls the `ApproveNewAccount` function of the next `core.SignerUI` in the chain.

### ShowError

The `ShowError` function is a method of the `rulesetUI` type that takes in a `message` string. The function logs the provided message as an error and calls the `ShowError` function of the next `core.SignerUI` in the chain.

### ShowInfo

The `ShowInfo` function is a method of the `rulesetUI` type that takes in a `message` string. The function logs the provided message as an info and calls the `ShowInfo` function of the next `core.SignerUI` in the chain.

### OnSignerStartup

The `OnSignerStartup` function is a method of the `rulesetUI` type that takes in a `core.StartupInfo`. The function first marshals the provided info as JSON. It then calls the `OnSignerStartup` function of the next `core.SignerUI` in the chain. Finally, it calls the `execute` function with the "OnSignerStartup" JavaScript function and the marshaled JSON info.

### OnApprovedTx

The `OnApprovedTx` function is a method of the `rulesetUI` type that takes in a `ethapi.SignTransactionResult`. The function first marshals the provided transaction as JSON. It then calls the `execute` function with the "OnApprovedTx" JavaScript function and the marshaled JSON transaction.