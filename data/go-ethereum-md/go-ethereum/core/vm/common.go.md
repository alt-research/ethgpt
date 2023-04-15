## VM Package

The `vm` package provides the Ethereum Virtual Machine (EVM) implementation.

### calcMemSize64

The `calcMemSize64` function calculates the required memory size for a given offset and length. It returns the size and whether the result overflowed uint64.

### calcMemSize64WithUint

The `calcMemSize64WithUint` function is identical to `calcMemSize64`, but length is a uint64. It calculates the required memory size for a given offset and length. It returns the size and whether the result overflowed uint64.

### getData

The `getData` function returns a slice from the data based on the start and size and pads up to size with zero's. This function is overflow safe.

### toWordSize

The `toWordSize` function returns the ceiled word size required for memory expansion.

### allZero

The `allZero` function checks if all bytes in a byte slice are zero. It returns true if all bytes are zero, false otherwise.