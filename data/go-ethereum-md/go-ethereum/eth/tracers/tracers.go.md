# Tracers Package

The `tracers` package is a manager for transaction tracing engines. It provides an interface for collecting the tracing result and allows users to invoke a named tracer through registered lookups.

## Context

The `Context` struct contains contextual information for a transaction execution that is not available from within the EVM object. It includes the hash of the block the transaction is contained within, the number of the block the transaction is contained within, the index of the transaction within a block, and the hash of the transaction being traced.

## Tracer

The `Tracer` interface extends `vm.EVMLogger` and additionally allows collecting the tracing result. It provides a `GetResult()` function that returns the tracing result as a `json.RawMessage` and an optional `Stop()` function that terminates execution of the tracer at the first opportune moment.

## Directory

The `directory` struct provides functionality to lookup a tracer by name and a function to instantiate it. It falls back to a JS code evaluator if no tracer of the given name exists. It includes a `Register()` function for registering a method as a lookup for tracers, a `RegisterJSEval()` function for registering a tracer that is able to parse dynamic user-provided JS code, and a `New()` function for returning a new instance of a tracer by iterating through the registered lookups.

## Memory Padding

The `GetMemoryCopyPadded()` function returns offset + size as a new slice. It zero-pads the slice if it extends beyond memory bounds.

## Constants

The `memoryPadLimit` constant is set to 1024 * 1024. ## MemorySlice

The `MemorySlice` function is a method of the `Memory` struct that returns a slice of bytes from the memory starting at the given offset and with the given size. If the slice is fully contained within the memory, it returns a copy of the slice. If the slice extends beyond the memory, it pads the slice with zeros up to the end of the memory and returns the padded slice.

### Parameters

- `offset int64`: The starting offset of the slice in the memory.
- `size int64`: The size of the slice to return.

### Return Values

- `[]byte`: A slice of bytes from the memory.
- `error`: An error if the offset or size is negative or if the padding needed to extend the slice beyond the memory exceeds the memory pad limit.

### Example

```go
mem := NewMemory()
mem.Set(0, []byte{0x01, 0x02, 0x03, 0x04})
slice, err := mem.Slice(1, 2)
if err != nil {
    log.Fatal(err)
}
fmt.Println(slice) // Output: [0x02, 0x03]
```