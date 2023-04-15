tracing tool that captures and logs the internal state of the EVM during execution. It provides a way to trace the execution of smart contracts and analyze their behavior.

The `Storage` type represents a contract's storage and provides a `Copy` method to duplicate the current storage.

The `Config` type represents the configuration options for the structured logger of the EVM. It includes options to enable/disable memory, stack, and storage capture, enable return data capture, print output during capture end, and set a maximum length of output. It also includes `Overrides` to execute a trace using future fork rules.

The `StructLog` type is emitted to the EVM each cycle and lists information about the current internal state prior to the execution of the statement. It includes the program counter (`Pc`), the opcode (`Op`), the gas (`Gas`), the gas cost (`GasCost`), the memory (`Memory`), the memory size (`MemorySize`), the stack (`Stack`), the return data (`ReturnData`), the storage (`Storage`), the depth (`Depth`), the refund counter (`RefundCounter`), and the error (`Err`). It also includes `OpName` to format the operand name in a human-readable format and `ErrorString` to format the log's error as a string.

The `StructLogger` type is an EVM state logger and tracing tool that captures and logs the internal state of the EVM during execution. It provides methods to capture and log the state of the EVM during execution, including `Capture` to capture the state of the EVM during execution, `Log` to log the state of the EVM during execution, and `Trace` to trace the execution of a smart contract and analyze its behavior.

The `Capture` method captures the state of the EVM during execution and returns a slice of `StructLog` objects.

The `Log` method logs the state of the EVM during execution to an `io.Writer`.

The `Trace` method traces the execution of a smart contract and analyzes its behavior. It takes a `vm.Context` object, a `types.Message` object, a `types.ContractRef` object, a `*big.Int` object, and a `*Config` object as input and returns a slice of `StructLog` objects and an error. # StructLogger

`StructLogger` is a struct that implements the `EVMLogger` interface. It captures state based on the given `Log` configuration and also keeps a track record of modified storage which is used in reporting snapshots of the contract their storage.

## Struct Fields

- `cfg`: A `Config` object that holds the configuration for the logger.
- `env`: An `EVM` object that holds the current EVM state.
- `storage`: A map that holds the storage for each contract.
- `logs`: A slice of `StructLog` objects that holds the structured log messages.
- `output`: A byte slice that holds the output of the logger.
- `err`: An error object that holds the error message, if any.
- `gasLimit`: A uint64 that holds the gas limit for the logger.
- `usedGas`: A uint64 that holds the amount of gas used by the logger.
- `interrupt`: An atomic boolean flag that signals execution interruption.
- `reason`: An error object that holds the textual reason for the interruption.

## Functions

### `NewStructLogger`

```go
func NewStructLogger(cfg *Config) *StructLogger
```

`NewStructLogger` returns a new logger.

- `cfg`: A pointer to a `Config` object that holds the configuration for the logger.
- Returns a pointer to a new `StructLogger` object.

### `Reset`

```go
func (l *StructLogger) Reset()
```

`Reset` clears the data held by the logger.

### `CaptureStart`

```go
func (l *StructLogger) CaptureStart(env *vm.EVM, from common.Address, to common.Address, create bool, input []byte, gas uint64, value *big.Int)
```

`CaptureStart` implements the `EVMLogger` interface to initialize the tracing operation.

- `env`: An `EVM` object that holds the current EVM state.
- `from`: A `common.Address` object that holds the address of the sender.
- `to`: A `common.Address` object that holds the address of the receiver.
- `create`: A boolean that indicates whether the transaction creates a new contract.
- `input`: A byte slice that holds the input data for the transaction.
- `gas`: A uint64 that holds the gas limit for the transaction.
- `value`: A `big.Int` object that holds the value of the transaction.

### `CaptureState`

```go
func (l *StructLogger) CaptureState(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, rData []byte, depth int, err error)
```

`CaptureState` logs a new structured log message and pushes it out to the environment. It also tracks `SLOAD`/`SSTORE` ops to track storage change.

- `pc`: A uint64 that holds the program counter.
- `op`: A `vm.OpCode` object that holds the opcode.
- `gas`: A uint64 that holds the gas limit for the operation.
- `cost`: A uint64 that holds the cost of the operation.
- `scope`: A `vm.ScopeContext` object that holds the current scope context.
- `rData`: A byte slice that holds the return data for the operation.
- `depth`: An int that holds the current depth of the call stack.
- `err`: An error object that holds the error message, if any.

### `CaptureFault`

```go
func (l *StructLogger) CaptureFault(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, rData []byte, depth int, err error)
```

`CaptureFault` implements the `EVMLogger` interface to trace an execution fault while running an opcode.

- `pc`: A uint64 that holds the program counter.
- `op`: A `vm.OpCode` object that holds the opcode.
- `gas`: A uint64 that holds the gas limit for the operation.
- `cost`: A uint64 that holds the cost of the operation.
- `scope`: A `vm.ScopeContext` object that holds the current scope context.
- `rData`: A byte slice that holds the return data for the operation.
- `depth`: An int that holds the current depth of the call stack.
- `err`: An error object that holds the error message, if any. # StructLogger

The `StructLogger` type is a struct that implements the `vm.Tracer` interface. It is used to capture and log the execution of Ethereum Virtual Machine (EVM) instructions during the execution of a transaction or block.

## Functions

### `CaptureFault`

```go
func (l *StructLogger) CaptureFault(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, depth int, err error)
```

`CaptureFault` is called when an EVM instruction fails to execute.

- `pc`: The program counter of the failed instruction.
- `op`: The opcode of the failed instruction.
- `gas`: The amount of gas remaining at the time of the failure.
- `cost`: The cost of the failed instruction.
- `scope`: The scope context of the failed instruction.
- `depth`: The depth of the failed instruction.
- `err`: The error that caused the failure.

### `CaptureEnd`

```go
func (l *StructLogger) CaptureEnd(output []byte, gasUsed uint64, err error)
```

`CaptureEnd` is called after the execution of a transaction or block finishes to finalize the tracing.

- `output`: The output of the execution.
- `gasUsed`: The amount of gas used during the execution.
- `err`: The error that occurred during the execution.

### `CaptureEnter`

```go
func (l *StructLogger) CaptureEnter(typ vm.OpCode, from common.Address, to common.Address, input []byte, gas uint64, value *big.Int)
```

`CaptureEnter` is called when an EVM instruction is about to be executed.

- `typ`: The opcode of the instruction.
- `from`: The address of the account executing the instruction.
- `to`: The address of the account being called by the instruction.
- `input`: The input data for the instruction.
- `gas`: The amount of gas available for the instruction.
- `value`: The value being transferred by the instruction.

### `CaptureExit`

```go
func (l *StructLogger) CaptureExit(output []byte, gasUsed uint64, err error)
```

`CaptureExit` is called when an EVM instruction has finished executing.

- `output`: The output of the instruction.
- `gasUsed`: The amount of gas used by the instruction.
- `err`: The error that occurred during the execution of the instruction.

### `GetResult`

```go
func (l *StructLogger) GetResult() (json.RawMessage, error)
```

`GetResult` returns the result of the tracing as a JSON-encoded `ExecutionResult` object.

### `Stop`

```go
func (l *StructLogger) Stop(err error)
```

`Stop` terminates the execution of the tracer at the first opportune moment.

- `err`: The error that caused the termination.

### `CaptureTxStart`

```go
func (l *StructLogger) CaptureTxStart(gasLimit uint64)
```

`CaptureTxStart` is called when a transaction is about to be executed.

- `gasLimit`: The gas limit for the transaction.

### `CaptureTxEnd`

```go
func (l *StructLogger) CaptureTxEnd(restGas uint64)
```

`CaptureTxEnd` is called when a transaction has finished executing.

- `restGas`: The amount of gas remaining after the execution of the transaction.

### `StructLogs`

```go
func (l *StructLogger) StructLogs() []StructLog
```

`StructLogs` returns the captured log entries.

### `Error`

```go
func (l *StructLogger) Error() error
```

`Error` returns the VM error captured by the trace.

### `Output`

```go
func (l *StructLogger) Output() []byte
```

`Output` returns the VM return value captured by the trace.

## Other Functions

### `WriteTrace`

```go
func WriteTrace(writer io.Writer, logs []StructLog)
```

`WriteTrace` writes a formatted trace to the given writer.

- `writer`: The writer to write the trace to.
- `logs`: The logs to format and write.

### `WriteLogs`

```go
func WriteLogs(writer io.Writer, logs []*types.Log)
```

`WriteLogs` writes VM logs in a readable format to the given writer.

- `writer`: The writer to write the logs to.
- `logs`: The logs to format and write.

### `NewMarkdownLogger`

```go
func NewMarkdownLogger(cfg *Config, writer io.Writer) *mdLogger
```

`NewMarkdownLogger` creates a logger which outputs information in a format adapted for human readability, and is also a valid markdown table.

- `cfg`: The configuration for the logger.
- `writer`: The writer to write the logs to.
- Returns a new `mdLogger` object. ## Package Description

The `logger` package provides a set of tools for logging Ethereum transactions and blocks. It includes functions for capturing the state of a transaction, tracking storage changes, and producing structured logs.

## Functions

### `NewLogger`

```go
func NewLogger(out io.Writer, cfg *Config) *Logger
```

`NewLogger` creates a new logger instance.

- `out`: The output writer for the logger.
- `cfg`: The configuration for the logger.
- Returns a `Logger` object.

### `NewMdLogger`

```go
func NewMdLogger(out io.Writer, cfg *Config) *mdLogger
```

`NewMdLogger` creates a new markdown logger instance.

- `out`: The output writer for the logger.
- `cfg`: The configuration for the logger.
- Returns a `mdLogger` object.

### `CaptureState`

```go
func (t *mdLogger) CaptureState(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, rData []byte, depth int, err error)
```

`CaptureState` captures the state of a transaction and tracks storage changes.

- `pc`: The program counter.
- `op`: The opcode.
- `gas`: The amount of gas.
- `cost`: The cost of the operation.
- `scope`: The scope context.
- `rData`: The return data.
- `depth`: The depth of the call stack.
- `err`: The error, if any.

### `CaptureFault`

```go
func (t *mdLogger) CaptureFault(pc uint64, op vm.OpCode, gas, cost uint64, scope *vm.ScopeContext, depth int, err error)
```

`CaptureFault` captures a fault in the transaction.

- `pc`: The program counter.
- `op`: The opcode.
- `gas`: The amount of gas.
- `cost`: The cost of the operation.
- `scope`: The scope context.
- `depth`: The depth of the call stack.
- `err`: The error.

### `CaptureEnd`

```go
func (t *mdLogger) CaptureEnd(output []byte, gasUsed uint64, err error)
```

`CaptureEnd` captures the end of a transaction.

- `output`: The output data.
- `gasUsed`: The amount of gas used.
- `err`: The error, if any.

### `CaptureEnter`

```go
func (t *mdLogger) CaptureEnter(typ vm.OpCode, from common.Address, to common.Address, input []byte, gas uint64, value *big.Int)
```

`CaptureEnter` captures the start of a transaction.

- `typ`: The opcode.
- `from`: The sender address.
- `to`: The recipient address.
- `input`: The input data.
- `gas`: The amount of gas.
- `value`: The value.

### `CaptureExit`

```go
func (t *mdLogger) CaptureExit(output []byte, gasUsed uint64, err error)
```

`CaptureExit` captures the exit of a transaction.

- `output`: The output data.
- `gasUsed`: The amount of gas used.
- `err`: The error, if any.

### `CaptureTxStart`

```go
func (*mdLogger) CaptureTxStart(gasLimit uint64)
```

`CaptureTxStart` captures the start of a transaction.

- `gasLimit`: The gas limit.

### `CaptureTxEnd`

```go
func (*mdLogger) CaptureTxEnd(restGas uint64)
```

`CaptureTxEnd` captures the end of a transaction.

- `restGas`: The remaining gas.

### `ExecutionResult`

```go
type ExecutionResult struct {
	Gas         uint64         `json:"gas"`
	Failed      bool           `json:"failed"`
	ReturnValue string         `json:"returnValue"`
	StructLogs  []StructLogRes `json:"structLogs"`
}
```

`ExecutionResult` groups all structured logs emitted by the EVM while replaying a transaction in debug mode as well as transaction execution status, the amount of gas used and the return value.

### `StructLogRes`

```go
type StructLogRes struct {
	Pc            uint64             `json:"pc"`
	Op            string             `json:"op"`
	Gas           uint64             `json:"gas"`
	GasCost       uint64             `json:"gasCost"`
	Depth         int                `json:"depth"`
	Error         string             `json:"error,omitempty"`
	Stack         *[]string          `json:"stack,omitempty"`
	Memory        *[]string          `json:"memory,omitempty"`
	Storage       *map[string]string `json:"storage,omitempty"`
	RefundCounter uint64             `json:"refund,omitempty"`
}
```

`StructLogRes` stores a structured log emitted by the EVM while replaying a transaction in debug mode.

### `formatLogs`

```go
func formatLogs(logs []StructLog) []StructLogRes
```

`formatLogs` formats EVM returned structured logs for JSON output. ## Function: `formatTrace`

The `formatTrace` function takes in a slice of `types.ExecutionResult` objects and returns a formatted slice of `FormattedExecutionResult` objects. The purpose of this function is to convert the raw execution results into a more readable format for display or analysis.

### Parameters

- `traceResults []types.ExecutionResult`: A slice of `types.ExecutionResult` objects representing the raw execution results.

### Return Value

- `[]FormattedExecutionResult`: A slice of `FormattedExecutionResult` objects representing the formatted execution results.

### Description

The `formatTrace` function iterates through each `types.ExecutionResult` object in the input slice and creates a corresponding `FormattedExecutionResult` object with the same values for the `Gas`, `GasUsed`, `Output`, and `Time` fields. If the `Memory` field is not `nil`, the function creates a new slice of strings representing the memory values in hexadecimal format and assigns it to the `Memory` field of the `FormattedExecutionResult` object. If the `Storage` field is not `nil`, the function creates a new map of strings representing the storage values in hexadecimal format and assigns it to the `Storage` field of the `FormattedExecutionResult` object.

The function then appends the `FormattedExecutionResult` object to a new slice of `FormattedExecutionResult` objects and repeats the process for each `types.ExecutionResult` object in the input slice.

Finally, the function returns the formatted slice of `FormattedExecutionResult` objects.

### Example

```go
import (
	"fmt"
	"github.com/ethereum/go-ethereum/core/types"
)

type FormattedExecutionResult struct {
	Gas     uint64
	GasUsed uint64
	Output  []byte
	Time    time.Duration
	Memory  *[]string
	Storage *map[string]string
}

func formatTrace(traceResults []types.ExecutionResult) []FormattedExecutionResult {
	formatted := make([]FormattedExecutionResult, len(traceResults))
	for index, trace := range traceResults {
		formatted[index] = FormattedExecutionResult{
			Gas:     trace.Gas,
			GasUsed: trace.GasUsed,
			Output:  trace.Output,
			Time:    trace.Time,
		}
		if trace.Memory != nil {
			memory := make([]string, 0, len(trace.Memory)/32)
			for i := 0; i+32 <= len(trace.Memory); i += 32 {
				memory = append(memory, fmt.Sprintf("%x", trace.Memory[i:i+32]))
			}
			formatted[index].Memory = &memory
		}
		if trace.Storage != nil {
			storage := make(map[string]string)
			for i, storageValue := range trace.Storage {
				storage[fmt.Sprintf("%x", i)] = fmt.Sprintf("%x", storageValue)
			}
			formatted[index].Storage = &storage
		}
	}
	return formatted
}
```

In this example, the `formatTrace` function is defined with a single parameter `traceResults` of type `[]types.ExecutionResult`. The function creates a new slice of `FormattedExecutionResult` objects with the same length as the input slice.

The function then iterates through each `types.ExecutionResult` object in the input slice and creates a corresponding `FormattedExecutionResult` object with the same values for the `Gas`, `GasUsed`, `Output`, and `Time` fields. If the `Memory` field is not `nil`, the function creates a new slice of strings representing the memory values in hexadecimal format and assigns it to the `Memory` field of the `FormattedExecutionResult` object. If the `Storage` field is not `nil`, the function creates a new map of strings representing the storage values in hexadecimal format and assigns it to the `Storage` field of the `FormattedExecutionResult` object.

The function then appends the `FormattedExecutionResult` object to a new slice of `FormattedExecutionResult` objects and repeats the process for each `types.ExecutionResult` object in the input slice.

Finally, the function returns the formatted slice of `FormattedExecutionResult` objects.