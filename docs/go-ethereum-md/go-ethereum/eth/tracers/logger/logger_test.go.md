# StructLogger Package

The `StructLogger` package provides a logger for capturing and storing EVM execution traces. It includes functions for capturing and storing traces, as well as for marshaling the traces into JSON format.

## Types

- `StructLog`: A struct representing an EVM execution trace.
- `StructLogger`: A struct representing a logger for capturing and storing EVM execution traces.

## Functions

### `NewStructLogger`

```go
func NewStructLogger(config *Config) *StructLogger
```

`NewStructLogger` creates a new `StructLogger` object.

- `config`: The configuration for the logger.
- Returns a new `StructLogger` object.

### `CaptureStart`

```go
func (l *StructLogger) CaptureStart(env vm.EVM, contract common.Address, addr common.Address, isCreate bool, input []byte, gas uint64, value *big.Int)
```

`CaptureStart` starts capturing an EVM execution trace.

- `env`: The EVM environment.
- `contract`: The contract being executed.
- `addr`: The address of the contract being executed.
- `isCreate`: Whether the execution is a contract creation.
- `input`: The input data for the execution.
- `gas`: The gas limit for the execution.
- `value`: The value being transferred in the execution.

### `CaptureEnd`

```go
func (l *StructLogger) CaptureEnd(output []byte, gasUsed uint64, err error)
```

`CaptureEnd` ends capturing an EVM execution trace.

- `output`: The output data from the execution.
- `gasUsed`: The amount of gas used in the execution.
- `err`: Any error that occurred during the execution.

### `JSON`

```go
func (l *StructLog) JSON() ([]byte, error)
```

`JSON` marshals an EVM execution trace into JSON format.

- Returns the JSON representation of the trace and an error.

### `NewStructLogger`

```go
func NewStructLogger(config *Config) *StructLogger
```

`NewStructLogger` creates a new `StructLogger` object.

- `config`: The configuration for the logger.
- Returns a new `StructLogger` object.

### `CaptureStart`

```go
func (l *StructLogger) CaptureStart(env vm.EVM, contract common.Address, addr common.Address, isCreate bool, input []byte, gas uint64, value *big.Int)
```

`CaptureStart` starts capturing an EVM execution trace.

- `env`: The EVM environment.
- `contract`: The contract being executed.
- `addr`: The address of the contract being executed.
- `isCreate`: Whether the execution is a contract creation.
- `input`: The input data for the execution.
- `gas`: The gas limit for the execution.
- `value`: The value being transferred in the execution.

### `CaptureEnd`

```go
func (l *StructLogger) CaptureEnd(output []byte, gasUsed uint64, err error)
```

`CaptureEnd` ends capturing an EVM execution trace.

- `output`: The output data from the execution.
- `gasUsed`: The amount of gas used in the execution.
- `err`: Any error that occurred during the execution.

### `JSON`

```go
func (l *StructLog) JSON() ([]byte, error)
```

`JSON` marshals an EVM execution trace into JSON format.

- Returns the JSON representation of the trace and an error. ## Function: TestStructLog_MarshalJSON

The `TestStructLog_MarshalJSON` function is a unit test that tests the `MarshalJSON` method of the `StructLog` struct. This method marshals the `StructLog` struct into a JSON-encoded byte array.

The function defines a set of test cases, each consisting of a `StructLog` object, a string representation of the expected JSON-encoded byte array, and a name for the test case. The function then iterates over the test cases, calling the `MarshalJSON` method on each `StructLog` object and comparing the resulting JSON-encoded byte array to the expected value.

If the resulting JSON-encoded byte array does not match the expected value, the test fails with a detailed error message.

## Parameters

The `TestStructLog_MarshalJSON` function does not take any parameters.

## Return Values

The `TestStructLog_MarshalJSON` function does not return any values.

## Example Usage

```go
func TestStructLog_MarshalJSON(t *testing.T) {
	tests := []struct {
		name string
		log  *StructLog
		want string
	}{
		{"with memory", &StructLog{Memory: []byte{0x00, 0x00}, MemSize: 2},
			`{"pc":0,"op":0,"gas":"0x0","gasCost":"0x0","memory":"0x0000","memSize":2,"stack":null,"depth":0,"refund":0,"opName":"STOP"}`},
		{"with 0-size mem", &StructLog{Memory: make([]byte, 0)},
			`{"pc":0,"op":0,"gas":"0x0","gasCost":"0x0","memSize":0,"stack":null,"depth":0,"refund":0,"opName":"STOP"}`},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			blob, err := json.Marshal(tt.log)
			if err != nil {
				t.Fatal(err)
			}
			if have, want := string(blob), tt.want; have != want {
				t.Fatalf("mismatched results\n\thave: %v\n\twant: %v", have, want)
			}
		})
	}
}
```