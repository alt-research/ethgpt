# Utils

The `utils` package contains internal helper functions for go-ethereum commands.

## Functions

### `GetPassPhrase(text string, confirmation bool) string`

The `GetPassPhrase()` function displays the given text(prompt) to the user and requests some textual data to be entered, but one which must not be echoed out into the terminal. The function returns the input provided by the user. If the `confirmation` parameter is set to true, the function prompts the user to confirm the password by entering it again.

### `GetPassPhraseWithList(text string, confirmation bool, index int, passwords []string) string`

The `GetPassPhraseWithList()` function retrieves the password associated with an account, either fetched from a list of preloaded passphrases, or requested interactively from the user. If a list of passwords is supplied, the function retrieves the password from the list based on the `index` parameter. If the `index` parameter is out of range, the function retrieves the last password in the list. If no list of passwords is supplied, the function prompts the user for the password using the `GetPassPhrase()` function. The function returns the password.