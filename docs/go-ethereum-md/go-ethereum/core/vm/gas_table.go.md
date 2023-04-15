This is a Go source code file that is part of the go-ethereum library. The file contains functions that calculate the gas cost for memory expansion and copying data from memory. The code is licensed under the GNU Lesser General Public License.

The `memoryGasCost` function calculates the quadratic gas for memory expansion. It takes a `Memory` object and the new size of the memory as input and returns the gas cost for the expansion. The function checks if the new memory size is valid and calculates the gas cost based on the size of the expansion.

The `memoryCopierGas` function creates the gas functions for copying data from memory. It takes the stack position of the operand that determines the size of the data to copy as an argument and returns a gas function. The gas function calculates the gas cost for expanding the memory and copying the data.

The `gasSStore` function calculates the gas cost for storing a value in the state database. It takes an `EVM` object, a `Contract` object, a `Stack` object, a `Memory` object, and the size of the memory as input and returns the gas cost for the operation. The function checks the current state of the contract and applies legacy rules if necessary.

Example usage:

```
mem := NewMemory()
newMemSize := uint64(1024)
gas, err := memoryGasCost(mem, newMemSize)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Gas cost for memory expansion: %d\n", gas)

stack := NewStack()
stack.Push(NewInt(1024))
gasFunc := memoryCopierGas(2)
gas, err = gasFunc(evm, contract, stack, mem, memorySize)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Gas cost for copying data from memory: %d\n", gas)

gas, err = gasSStore(evm, contract, stack, mem, memorySize)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Gas cost for storing a value in the state database: %d\n", gas)
``` This code is responsible for calculating the gas cost of a storage operation in the Ethereum Virtual Machine (EVM). The function takes in the current and new values of a storage slot, and calculates the gas cost based on the EIP-1283 and EIP-2200 specifications.

The first part of the code checks for three scenarios and calculates the gas cost accordingly. The three scenarios are:

1. From a zero-value address to a non-zero value (NEW VALUE)
2. From a non-zero value address to a zero-value address (DELETE)
3. From a non-zero to a non-zero (CHANGE)

The switch statement handles these scenarios and returns the appropriate gas cost.

The second part of the code calculates the net gas cost based on the EIP-1283 and EIP-2200 specifications. The net gas cost is based on the difference between the current and new values of the storage slot.

If the current value equals the new value, then it is a no-op and 200 gas is deducted. If the current value does not equal the new value, then the original value is checked.

If the original value equals the current value, then the storage slot has not been changed by the current execution context. If the original value is 0, then 20,000 gas is deducted (SSTORE_SET_GAS). Otherwise, 5,000 gas is deducted (SSTORE_RESET_GAS). If the new value is 0, then SSTORE_CLEARS_SCHEDULE is added to the refund counter.

If the original value does not equal the current value, then the storage slot is dirty. SLOAD_GAS gas is deducted, and both of the following clauses are applied:

1. If the original value is not 0, then:
   a. If the current value is 0, then 15,000 gas is removed from the refund counter.
   b. If the new value is 0, then SSTORE_CLEARS_SCHEDULE is added to the refund counter.
2. If the original value equals the new value, then:
   a. If the original value is 0, then SSTORE_RESET_CLEAR_GAS is added to the refund counter.
   b. Otherwise, SSTORE_RESET_GAS is added to the refund counter.

Finally, the function returns the net gas cost and any refund that needs to be added to the refund counter.

Here is an example of how to use this function:

```
import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
)

func main() {
	// Create a new EVM instance
	evm := vm.NewEVM(vm.Context{}, vm.TxContext{}, nil)

	// Set the current and new values of the storage slot
	current := common.Hash{}
	newValue := common.HexToHash("0x1234567890abcdef")

	// Calculate the gas cost of the storage operation
	gasCost, refund := evm.SstoreGas(current, newValue)

	// Print the gas cost and refund
	fmt.Printf("Gas cost: %d\nRefund: %d\n", gasCost, refund)
}
``` The code snippet provided contains three functions: `gasSStoreEIP2200`, `makeGasLog`, and `gasKeccak256`. 

`gasSStoreEIP2200` is a function that calculates the gas cost for a storage operation in the EIP2200 protocol. The function takes in an `EVM` object, a `Contract` object, a `Stack` object, a `Memory` object, and a `memorySize` parameter. The function first checks if there is enough gas available for the operation. If there is not enough gas, the function returns an error. If there is enough gas, the function retrieves the current and original values of the storage slot and compares them to the new value. Depending on the comparison, the function adds or subtracts gas from the refund counter. The function returns the gas cost of the operation.

`makeGasLog` is a function that creates a gas function for logging operations. The function takes in a `uint64` parameter `n` and returns a gas function. The gas function calculates the gas cost for a logging operation based on the requested size of the log data and the number of topics. The function returns the gas cost of the operation.

`gasKeccak256` is a function that calculates the gas cost for a Keccak256 operation. The function takes in an `EVM` object, a `Contract` object, a `Stack` object, a `Memory` object, and a `memorySize` parameter. The function first calculates the gas cost for the memory usage. Then, the function calculates the gas cost for the number of words used in the operation. The function returns the gas cost of the operation.

Here is an example of how to use `gasSStoreEIP2200`:

```
evm := &EVM{}
contract := &Contract{}
stack := &Stack{}
mem := &Memory{}
memorySize := uint64(0)

gasCost, err := gasSStoreEIP2200(evm, contract, stack, mem, memorySize)
if err != nil {
    // handle error
}
// use gasCost
```

Here is an example of how to use `makeGasLog`:

```
n := uint64(2)

gasFunc := makeGasLog(n)
evm := &EVM{}
contract := &Contract{}
stack := &Stack{}
mem := &Memory{}
memorySize := uint64(0)

gasCost, err := gasFunc(evm, contract, stack, mem, memorySize)
if err != nil {
    // handle error
}
// use gasCost
```

Here is an example of how to use `gasKeccak256`:

```
evm := &EVM{}
contract := &Contract{}
stack := &Stack{}
mem := &Memory{}
memorySize := uint64(0)

gasCost, err := gasKeccak256(evm, contract, stack, mem, memorySize)
if err != nil {
    // handle error
}
// use gasCost
``` The code provided is a set of functions that calculate the gas cost for different operations in the Ethereum Virtual Machine (EVM). Each function takes as input the EVM instance, the contract being executed, the stack, the memory, and the memory size. The output is the gas cost for the operation.

Let's go through each function:

1. `pureMemoryGascost`: This function calculates the gas cost for pure memory operations. It calls the `memoryGasCost` function, which calculates the gas cost based on the memory size.

2. `gasReturn`, `gasRevert`, `gasMLoad`, `gasMStore8`, `gasMStore`, and `gasCreate`: These functions calculate the gas cost for the corresponding EVM operations. They all call the `pureMemoryGascost` function to calculate the gas cost for memory operations.

3. `gasCreate2`: This function calculates the gas cost for the `CREATE2` opcode. It first calls the `memoryGasCost` function to calculate the gas cost based on the memory size. Then, it calculates the gas cost for the `KECCAK256` opcode based on the number of words in the input. Finally, it adds the two gas costs together.

4. `gasCreateEip3860`: This function calculates the gas cost for the `CREATE` opcode in EIP-3860. It first calls the `memoryGasCost` function to calculate the gas cost based on the memory size. Then, it calculates the gas cost for the `INITCODECOPY` opcode based on the size of the input. Finally, it adds the two gas costs together.

5. `gasCreate2Eip3860`: This function calculates the gas cost for the `CREATE2` opcode in EIP-3860. It first calls the `memoryGasCost` function to calculate the gas cost based on the memory size. Then, it calculates the gas cost for the `KECCAK256` and `INITCODECOPY` opcodes based on the size of the input. Finally, it adds the three gas costs together.

6. `gasExpFrontier` and `gasExpEIP158`: These functions calculate the gas cost for the `EXP` opcode in Frontier and EIP-158, respectively. They first calculate the number of bytes required to represent the exponent. Then, they calculate the gas cost for the exponent based on the number of bytes. Finally, they add the gas cost for the exponent to a fixed gas cost.

7. `gasCall`: This function calculates the gas cost for the `CALL` opcode. It first checks if the call transfers value and if the destination address is a new account. If so, it adds a fixed gas cost for creating a new account. Then, it adds a fixed gas cost for transferring value. Finally, it calls the `memoryGasCost` function to calculate the gas cost based on the memory size and adds it to the total gas cost.

Overall, these functions provide a way to calculate the gas cost for different EVM operations. This is important for determining the cost of executing a smart contract and for preventing denial-of-service attacks. The following functions are related to gas calculation for different types of calls in the Ethereum Virtual Machine (EVM).

`gasCall` calculates the gas cost for a regular call to a contract. It takes in the EVM instance, the contract being called, the stack, memory, and memory size. It first calculates the gas cost for memory usage using the `memoryGasCost` function. It then checks if there is a value being transferred in the call and adds