# Ethereum Virtual Machine (EVM)

The `vm` package implements the Ethereum Virtual Machine (EVM), which is a byte code VM. The EVM loops over a set of bytes and executes them according to the set of rules defined in the Ethereum yellow paper.

## Architecture

The EVM is a stack-based machine that operates on a set of bytes. It has a 256-bit word size and a 2^256 address space. The EVM has a set of instructions that can be executed on the byte code. The instructions are divided into several categories, including arithmetic, memory, control flow, and stack manipulation.

## Usage

The `vm` package provides a `NewEVM` function that creates a new EVM instance. The EVM instance can be used to execute byte code by calling the `Call` method. The `Call` method takes a `Message` struct as an argument, which contains the input data, gas limit, sender address, and recipient address.

## Functions

### NewEVM

```go
func NewEVM(ctx context.Context, contract *Contract, stateDB *state.StateDB, evmConfig *Config) *EVM
```

`NewEVM` creates a new EVM instance.

- `ctx` - The context of the EVM instance.
- `contract` - The contract to execute.
- `stateDB` - The state database.
- `evmConfig` - The EVM configuration.

### Call

```go
func (evm *EVM) Call(msg Message) ([]byte, error)
```

`Call` executes the byte code of the contract.

- `msg` - The message to execute.

### NewContract

```go
func NewContract(address common.Address, code []byte, gas uint64) *Contract
```

`NewContract` creates a new contract.

- `address` - The address of the contract.
- `code` - The byte code of the contract.
- `gas` - The gas limit for the contract.

### NewMessage

```go
func NewMessage(from, to common.Address, nonce uint64, value *big.Int, gasLimit uint64, gasPrice *big.Int, data []byte, accessList types.AccessList) Message
```

`NewMessage` creates a new message.

- `from` - The sender address.
- `to` - The recipient address.
- `nonce` - The nonce of the sender.
- `value` - The value to transfer.
- `gasLimit` - The gas limit for the message.
- `gasPrice` - The gas price for the message.
- `data` - The input data for the message.
- `accessList` - The access list for the message.

### NewEVMConfig

```go
func NewEVMConfig() *Config
```

`NewEVMConfig` creates a new EVM configuration.

## License

The `vm` package is licensed under the GNU Lesser General Public License.