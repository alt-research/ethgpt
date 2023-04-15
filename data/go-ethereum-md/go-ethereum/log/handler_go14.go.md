## Documentation for `swapHandler` struct

The `swapHandler` struct is a wrapper for another handler that can be swapped out dynamically at runtime in a thread-safe manner. It has three methods:

### `Log(r *Record) error`

This method takes a `*Record` pointer as an argument and returns an error. It calls the `Log` method of the handler that is currently stored in the `handler` field of the `swapHandler` struct. It does this by loading the current handler using the `Load` method of the `atomic.Value` type, asserting that it is a `*Handler` pointer, and then calling the `Log` method of that handler with the `*Record` pointer passed as an argument.

### `Swap(newHandler Handler)`

This method takes a `Handler` value as an argument and does not return anything. It replaces the current handler stored in the `handler` field of the `swapHandler` struct with the new handler passed as an argument. It does this by calling the `Store` method of the `atomic.Value` type with a pointer to the new handler.

### `Get() Handler`

This method returns the current handler stored in the `handler` field of the `swapHandler` struct. It does this by loading the current handler using the `Load` method of the `atomic.Value` type, asserting that it is a `*Handler` pointer, and then dereferencing that pointer to return the `Handler` value.

## Example usage

```go
package main

import (
	"log"
	"os"
)

func main() {
	// Create a new swapHandler with a default handler
	sh := &swapHandler{handler: atomic.Value{}}
	sh.handler.Store(&Handler{out: os.Stdout})

	// Log some messages using the swapHandler
	sh.Log(&Record{msg: "Hello, world!", level: Info})
	sh.Log(&Record{msg: "This is a warning.", level: Warning})
	sh.Log(&Record{msg: "Something went wrong!", level: Error})

	// Swap out the handler for a new one
	sh.Swap(&Handler{out: os.Stderr})

	// Log some more messages using the new handler
	sh.Log(&Record{msg: "Uh oh, this is bad!", level: Error})
	sh.Log(&Record{msg: "This is a debug message.", level: Debug})

	// Get the current handler and log a message using it directly
	h := sh.Get()
	h.Log(&Record{msg: "Direct log message.", level: Info})
}
```

In this example, we create a new `swapHandler` with a default `Handler` that logs to `os.Stdout`. We then log some messages using the `Log` method of the `swapHandler`. We then swap out the handler for a new one that logs to `os.Stderr` and log some more messages using the `Log` method of the `swapHandler`. Finally, we get the current handler using the `Get` method of the `swapHandler` and log a message using it directly.