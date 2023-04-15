## Memory Functions

This codebase contains a set of functions that calculate the required memory size for various operations in the Ethereum Virtual Machine (EVM). These functions are used to ensure that the EVM has enough memory to execute the requested operation.

### `memoryKeccak256(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `KECCAK256` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryCallDataCopy(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `CALLDATACOPY` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryReturnDataCopy(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `RETURNDATACOPY` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryCodeCopy(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `CODECOPY` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryExtCodeCopy(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `EXTCODECOPY` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryMLoad(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `MLOAD` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryMStore8(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `MSTORE8` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryMStore(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `MSTORE` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryCreate(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `CREATE` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryCreate2(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `CREATE2` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryCall(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `CALL` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred. This function calculates the maximum required memory size between the input data and the output data.

### `memoryDelegateCall(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `DELEGATECALL` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred. This function calculates the maximum required memory size between the input data and the output data.

### `memoryStaticCall(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `STATICCALL` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred. This function calculates the maximum required memory size between the input data and the output data.

### `memoryReturn(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `RETURN` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryRevert(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `REVERT` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.

### `memoryLog(stack *Stack) (uint64, bool)`

This function calculates the required memory size for the `LOG` operation. It takes a pointer to the stack as input and returns the required memory size as an unsigned 64-bit integer and a boolean value indicating whether an overflow occurred.