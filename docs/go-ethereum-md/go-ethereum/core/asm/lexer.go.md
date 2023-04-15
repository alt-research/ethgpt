## Package `asm`

The `asm` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum Assembly language lexer.

### Variables

#### `Numbers`

`Numbers` is a constant string that represents all decimal numbers.

#### `HexadecimalNumbers`

`HexadecimalNumbers` is a constant string that represents all hexadecimal numbers.

#### `Alpha`

`Alpha` is a constant string that represents all alphanumeric characters.

### Types

#### `stateFn`

`stateFn` is a function type that is used through the lifetime of the lexer to parse the different values at the current state.

#### `token`

`token` is a struct that represents a token emitted when the lexer has discovered a new parsable token.

##### Fields

- `typ` - the type of the token.
- `lineno` - the line number of the token.
- `text` - the text of the token.

#### `tokenType`

`tokenType` is an integer type that represents the different types the lexer is able to parse and return.

##### Constants

- `eof` - end of file.
- `lineStart` - emitted when a line starts.
- `lineEnd` - emitted when a line ends.
- `invalidStatement` - any invalid statement.
- `element` - any element during element parsing.
- `label` - label is emitted when a label is found.
- `labelDef` - label definition is emitted when a new label is found.
- `number` - number is emitted when a number is found.
- `stringValue` - stringValue is emitted when a string has been found.

#### `lexer`

`lexer` is a struct that represents the basic construct for parsing source code and turning them into tokens.

##### Fields

- `input` - the input source code of the program.
- `tokens` - the channel used to deliver tokens to the listener.
- `state` - the current state function.
- `lineno` - the current line number in the source file.
- `start` - the position for lexing and returning value.
- `pos` - the position for lexing and returning value.
- `width` - the position for lexing and returning value.
- `debug` - the flag for triggering debug output.

##### Methods

###### `Lex`

`Lex` lexes the program by name with the given source. It returns a channel on which the tokens are delivered.

```go
func Lex(source []byte, debug bool) <-chan token
```

###### Parameters

- `source` - the source code of the program.
- `debug` - the flag for triggering debug output.

###### Return Values

- `<-chan token` - the channel on which the tokens are delivered. # Lexer Package

The `lexer` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of a lexer, which is used to tokenize input text into a stream of tokens.

## Variables

### `eof`

`eof` is a constant that represents the end of the input.

### `lineStart`

`lineStart` is a constant that represents the start of a new line.

### `lineEnd`

`lineEnd` is a constant that represents the end of a line.

### `label`

`label` is a constant that represents a label.

### `labelDef`

`labelDef` is a constant that represents a label definition.

### `element`

`element` is a constant that represents an element.

### `number`

`number` is a constant that represents a number.

### `stringValue`

`stringValue` is a constant that represents a string value.

## Types

### `lexer`

`lexer` is a struct that represents a lexer.

#### Fields

- `input` - the input text to be tokenized.
- `pos` - the current position in the input text.
- `start` - the start position of the current token.
- `width` - the width of the last rune read.
- `tokens` - the channel to send tokens to.
- `lineno` - the current line number.
- `debug` - a flag to enable debug output.

#### Methods

##### `lex`

`lex` starts the lexer and returns a channel of tokens.

```go
func lex(input string, debug bool) chan token
```

###### Parameters

- `input` - the input text to be tokenized.
- `debug` - a flag to enable debug output.

###### Return Values

- `chan token` - a channel of tokens.

##### `next`

`next` returns the next rune in the input text.

```go
func (l *lexer) next() (rune rune)
```

###### Return Values

- `rune` - the next rune in the input text.

##### `backup`

`backup` backs up the last parsed element (multi-character).

```go
func (l *lexer) backup()
```

##### `peek`

`peek` returns the next rune but does not advance the seeker.

```go
func (l *lexer) peek() rune
```

###### Return Values

- `rune` - the next rune in the input text.

##### `ignore`

`ignore` advances the seeker and ignores the value.

```go
func (l *lexer) ignore()
```

##### `accept`

`accept` checks whether the given input matches the next rune.

```go
func (l *lexer) accept(valid string) bool
```

###### Parameters

- `valid` - the valid input to match.

###### Return Values

- `bool` - true if the input matches the next rune, false otherwise.

##### `acceptRun`

`acceptRun` will continue to advance the seeker until valid can no longer be met.

```go
func (l *lexer) acceptRun(valid string)
```

###### Parameters

- `valid` - the valid input to match.

##### `acceptRunUntil`

`acceptRunUntil` is the inverse of acceptRun and will continue to advance the seeker until the rune has been found.

```go
func (l *lexer) acceptRunUntil(until rune) bool
```

###### Parameters

- `until` - the rune to search for.

###### Return Values

- `bool` - true if the rune is found, false otherwise.

##### `blob`

`blob` returns the current value.

```go
func (l *lexer) blob() string
```

###### Return Values

- `string` - the current value.

##### `emit`

`emit` emits a new token on to token channel for processing.

```go
func (l *lexer) emit(t tokenType)
```

###### Parameters

- `t` - the type of token to emit.

##### `lexLine`

`lexLine` is a state function for lexing lines.

```go
func lexLine(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `lexComment`

`lexComment` parses the current position until the end of the line and discards the text.

```go
func lexComment(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `lexLabel`

`lexLabel` parses the current label, emits and returns the lex text state function to advance the parsing process.

```go
func lexLabel(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `lexInsideString`

`lexInsideString` lexes the inside of a string until the state function finds the closing quote. It returns the lex text state function.

```go
func lexInsideString(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `lexNumber`

`lexNumber` lexes a number.

```go
func lexNumber(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `lexElement`

`lexElement` lexes an element.

```go
func lexElement(l *lexer) stateFn
```

###### Parameters

- `l` - the lexer.

###### Return Values

- `stateFn` - the next state function.

##### `isLetter`

`isLetter` checks whether the given rune is a letter.

```go
func isLetter(t rune) bool
```

###### Parameters

- `t` - the rune to check.

###### Return Values

- `bool` - true if the rune is a letter, false otherwise.

##### `isSpace`

`isSpace` checks whether the given rune is a space.

```go
func isSpace(t rune) bool
```

###### Parameters

- `t` - the rune to check.

###### Return Values

- `bool` - true if the rune is a space, false otherwise.

##### `isNumber`

`isNumber` checks whether the given rune is a number.

```go
func isNumber(t rune) bool
```

###### Parameters

- `t` - the rune to check.

###### Return Values

- `bool` - true if the rune is a number, false otherwise.