## Package `asm`

The `asm` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the Ethereum Assembly language.

### Functions

#### `lexAll`

`lexAll` is a function that takes a string as input and returns a slice of tokens. It is used to tokenize the input string.

```go
func lexAll(src string) []token
```

##### Parameters

- `src` - the input string to tokenize.

##### Return Values

- `[]token` - a slice of tokens.

#### `TestLexer`

`TestLexer` is a function that tests the `lexAll` function by comparing its output to a set of expected tokens.

```go
func TestLexer(t *testing.T)
```

##### Parameters

- `t` - the testing object.

##### Tests

- `input: ";; this is a comment", tokens: [{typ: lineStart}, {typ: eof}]`
- `input: "0x12345678", tokens: [{typ: lineStart}, {typ: number, text: "0x12345678"}, {typ: eof}]`
- `input: "0x123ggg", tokens: [{typ: lineStart}, {typ: number, text: "0x123"}, {typ: element, text: "ggg"}, {typ: eof}]`
- `input: "12345678", tokens: [{typ: lineStart}, {typ: number, text: "12345678"}, {typ: eof}]`
- `input: "123abc", tokens: [{typ: lineStart}, {typ: number, text: "123"}, {typ: element, text: "abc"}, {typ: eof}]`
- `input: "0123abc", tokens: [{typ: lineStart}, {typ: number, text: "0123"}, {typ: element, text: "abc"}, {typ: eof}]`
- `input: "00123abc", tokens: [{typ: lineStart}, {typ: number, text: "00123"}, {typ: element, text: "abc"}, {typ: eof}]`
- `input: "@foo", tokens: [{typ: lineStart}, {typ: label, text: "foo"}, {typ: eof}]`
- `input: "@label123", tokens: [{typ: lineStart}, {typ: label, text: "label123"}, {typ: eof}]`