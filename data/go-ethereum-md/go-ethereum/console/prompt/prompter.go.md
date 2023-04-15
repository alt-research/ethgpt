This is a Go source code file that contains a package named `prompt`. The package provides a `UserPrompter` interface that defines methods for prompting the user for various types of inputs. The `terminalPrompter` struct implements the `UserPrompter` interface using the `liner` package. 

The `Stdin` variable is a global variable that holds the stdin line reader (also using stdout for printing prompts). Only this reader may be used for input because it keeps an internal buffer.

The `UserPrompter` interface defines the following methods:

- `PromptInput(prompt string) (string, error)`: displays the given prompt to the user and requests some textual data to be entered, returning the input of the user.
- `PromptPassword(prompt string) (string, error)`: displays the given prompt to the user and requests some textual data to be entered, but one which must not be echoed out into the terminal. The method returns the input provided by the user.
- `PromptConfirm(prompt string) (bool, error)`: displays the given prompt to the user and requests a boolean choice to be made, returning that choice.
- `SetHistory(history []string)`: sets the input scrollback history that the prompter will allow the user to scroll back to.
- `AppendHistory(command string)`: appends an entry to the scrollback history. It should be called if and only if the prompt to append was a valid command.
- `ClearHistory()`: clears the entire history
- `SetWordCompleter(completer WordCompleter)`: sets the completion function that the prompter will call to fetch completion candidates when the user presses tab.

The `WordCompleter` type is a function that takes the currently edited line with the cursor position and returns the completion candidates for the partial word to be completed.

The `terminalPrompter` struct implements the `UserPrompter` interface using the `liner` package. It has the following fields:

- `State`: a `liner.State` object that represents the current state of the prompter.
- `warned`: a boolean flag that indicates whether the user has been warned about the terminal not being supported.
- `supported`: a boolean flag that indicates whether the terminal is supported.
- `normalMode`: a `liner.ModeApplier` object that represents the normal mode of the terminal.
- `rawMode`: a `liner.ModeApplier` object that represents the raw mode of the terminal.

Here is an example of how to use the `UserPrompter` interface:

```
package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/console/prompt"
)

func main() {
	// Set the history
	prompt.Stdin.SetHistory([]string{"command1", "command2", "command3"})

	// Prompt for input
	input, err := prompt.Stdin.PromptInput("Enter some text: ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Input:", input)

	// Prompt for password
	password, err := prompt.Stdin.PromptPassword("Enter a password: ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Password:", password)

	// Prompt for confirmation
	confirm, err := prompt.Stdin.PromptConfirm("Are you sure? ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Confirm:", confirm)
}
``` # Terminal Prompter

The `terminalPrompter` is a struct that provides methods for prompting the user for input in a terminal environment. It is used to display prompts, request textual data, and handle password input.

## Functions

### NewTerminalPrompter(rawMode bool) *terminalPrompter

This function creates a new instance of the `terminalPrompter` struct. It takes a boolean argument `rawMode` which specifies whether the prompter should be in raw mode or not. If `rawMode` is true, the prompter will be in raw mode, otherwise it will be in normal mode.

### PromptInput(prompt string) (string, error)

This function displays the given prompt to the user and requests some textual data to be entered, returning the input of the user.

### PromptPassword(prompt string) (string, error)

This function displays the given prompt to the user and requests some textual data to be entered, but one which must not be echoed out into the terminal. The method returns the input provided by the user.

### PromptConfirm(prompt string) (bool, error)

This function displays the given prompt to the user and requests a boolean choice to be made, returning that choice.

### SetHistory(history []string)

This function sets the input scrollback history that the prompter will allow the user to scroll back to.

### AppendHistory