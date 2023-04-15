# Tracers Package

The `Tracers` package provides a set of tools for tracing Ethereum transactions and blocks. It includes functions for benchmarking transaction tracing and testing memory copying.

## `BenchmarkTransactionTrace`

The `BenchmarkTransactionTrace` function benchmarks the tracing of an Ethereum transaction. It creates a new transaction with a specified gas limit, signs it with a private key, and prepares it for tracing. It then creates a new EVM environment and runs the transaction through it, tracing each step. The function repeats this process for a specified number of iterations and reports the time and memory allocations for each iteration.

## `TestMemCopying`

The `TestMemCopying` function tests the performance of memory copying in Go. It creates a new byte slice of a specified size and copies it to a new slice using the `copy` function. It then repeats this process for a specified number of iterations and reports the time and memory allocations for each iteration. ## Function: GetMemoryCopyPadded

The `GetMemoryCopyPadded` function takes in a `vm.Memory` object, an `offset` integer, and a `size` integer. It returns a copy of the memory slice starting from the given offset and with the given size. If the size is less than the memory slice size, it pads the slice with zeros up to the given size. If the size is greater than the memory slice size, it returns an error.

### Parameters
- `mem` (vm.Memory): The memory object to copy from.
- `offset` (int64): The offset to start copying from.
- `size` (int64): The size of the slice to copy.

### Return Values
- `[]byte`: A copy of the memory slice starting from the given offset and with the given size.
- `error`: An error if the size is greater than the memory slice size.

### Example Usage
```go
mem := vm.NewMemory()
mem.Resize(100)
cpy, err := GetMemoryCopyPadded(mem, 50, 75)
if err != nil {
    fmt.Println("Error:", err)
}
fmt.Println("Memory Slice:", cpy)
```