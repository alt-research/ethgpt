## Documentation for `swapHandler` struct

The `swapHandler` struct is a wrapper for another handler that can be swapped out dynamically at runtime in a thread-safe manner. It has three methods:

### `Log(r *Record) error`

This method takes a `*Record` as input and returns an error. It calls the `Get()` method to retrieve the current handler and then calls the `Log()` method on that handler, passing in the `*Record` as input.

### `Get() Handler`

This method returns the current handler. It uses the `atomic.LoadPointer()` function to atomically load the value of the `handler` field and then casts it to a `Handler` type.

### `Swap(newHandler Handler)`

This method takes a `Handler` as input and swaps out the current handler with the new one. It uses the `atomic.StorePointer()` function to atomically store the address of the new handler in the `handler` field.

## Explanation for `swapHandler` struct

The `swapHandler` struct is used to implement dynamic swapping of handlers in the logging package. It is designed to be thread-safe, so that multiple goroutines can safely access and modify the `handler` field.

The `Log()` method is the primary method for logging messages. It calls the `Get()` method to retrieve the current handler and then calls the `Log()` method on that handler, passing in the `*Record` as input. This allows the `swapHandler` struct to act as a proxy for the current handler.

The `Get()` method is used to retrieve the current handler. It uses the `atomic.LoadPointer()` function to atomically load the value of the `handler` field and then casts it to a `Handler` type. This ensures that the value is read atomically and that the correct type is returned.

The `Swap()` method is used to swap out the current handler with a new one. It takes a `Handler` as input and uses the `atomic.StorePointer()` function to atomically store the address of the new handler in the `handler` field. This ensures that the swap is performed atomically and that all goroutines see the new handler at the same time.

Overall, the `swapHandler` struct provides a simple and thread-safe way to dynamically swap out handlers in the logging package.