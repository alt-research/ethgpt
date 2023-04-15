Sure, let's go through this code and document each function. Here's an example of how we can document a function in Markdown format:

```
## Function Name

Description of what the function does.

### Parameters

- `param1`: Description of the first parameter.
- `param2`: Description of the second parameter.

### Returns

Description of what the function returns.

### Example

```go
funcName(param1, param2)
```
```

We can use this format to document each function in the codebase. Let's start with the first block of code you provided:

```
// Protocol represents a P2P subprotocol implementation.
type Protocol struct {
	// Name should contain the official protocol name,
	// often a three-letter word.
	Name string

	// Version should contain the version number of the protocol.
	Version uint

	// Length should contain the number of message codes used
	// by the protocol.
	Length uint64

	// Run is called in a new goroutine when the protocol has been
	// negotiated with a peer. It should read and write messages from
	// rw. The Payload for each message must be fully consumed.
	//
	// The peer connection is closed when Start returns. It