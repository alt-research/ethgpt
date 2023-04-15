# JSONLogger Package

The `JSONLogger` package provides a tool for tracing Ethereum transactions and blocks and printing execution steps as JSON objects into a provided stream.

## Types

- `JSONLogger`: A struct that contains an encoder, configuration, and EVM environment.

## Functions

### `NewJSONLogger`

```go
func NewJSONLogger(cfg *Config, writer io.Writer) *JSONLogger
```

`NewJSONLogger` creates a new EVM tracer that prints execution steps as JSON objects into the provided stream.

- `cfg`: The configuration for the logger.
- `writer`: The writer to output the JSON objects.
- Returns a `JSONLogger` object.

### `CaptureStart`

```go
func (l *JSONLogger) CaptureStart(env *vm.EVM, from, to common.Address, create bool, input []byte, gas uint64, value *big.Int)
```

`CaptureStart` is called at the start of execution.

- `env`: The EVM environment.
- `from`: The address of the sender.
- `to`: The address of the receiver.
- `create`: Whether the transaction creates a new contract.
- `input`: The input data.
- `gas`: The gas limit.
- `value`: The value of the transaction.

### `CaptureFault`

```go
func (l *JSONLogger) CaptureFault(pc uint64, op vm.OpCode, gas uint64, cost uint64, scope *vm.ScopeContext, depth int, err error)
```

`CaptureFault` is called when an error occurs during execution.

- `pc`: The program counter.
- `op`: The opcode.
- `gas`: The gas limit.
- `cost`: The cost of the operation.
- `scope`: The scope context.
- `depth`: The depth of the call stack.
- `err`: The error that occurred.

### `CaptureState`

```go
func (l *JSONLogger) CaptureState(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, rData []byte, depth int, err error)
```

`CaptureState` outputs state information on the logger.

- `pc`: The program counter.
- `op`: The opcode.
- `gas`: The gas limit.
- `cost`: The cost of the operation.
- `scope`: The scope context.
- `rData`: The return data.
- `depth`: The depth of the call stack.
- `err`: The error that occurred.

### `CaptureEnd`

```go
func (l *JSONLogger) CaptureEnd(output []byte, gasUsed uint64, err error)
```

`CaptureEnd` is triggered at the end of execution.

- `output`: The output data.
- `gasUsed`: The amount of gas used.
- `err`: The error that occurred.

### `CaptureEnter`

```go
func (l *JSONLogger) CaptureEnter(typ vm.OpCode, from common.Address, to common.Address, input []byte, gas uint64, value *big.Int)
```

`CaptureEnter` is called when entering a new function.

- `typ`: The opcode.
- `from`: The address of the sender.
- `to`: The address of the receiver.
- `input`: The input data.
- `gas`: The gas limit.
- `value`: The value of the transaction.

### `CaptureExit`

```go
func (l *JSONLogger) CaptureExit(output []byte, gasUsed uint64, err error)
```

`CaptureExit` is called when exiting a function.

- `output`: The output data.
- `gasUsed`: The amount of gas used.
- `err`: The error that occurred.

### `CaptureTxStart`

```go
func (l *JSONLogger) CaptureTxStart(gasLimit uint64)
```

`CaptureTxStart` is called at the start of a transaction.

- `gasLimit`: The gas limit.

### `CaptureTxEnd`

```go
func (l *JSONLogger) CaptureTxEnd(restGas uint64)
```

`CaptureTxEnd` is called at the end of a transaction.

- `restGas`: The remaining gas.