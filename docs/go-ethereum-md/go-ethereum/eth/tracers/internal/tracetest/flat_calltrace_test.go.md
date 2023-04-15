# Tracetest Package

The `tracetest` package provides a test runner for the call tracer. It defines a `flatCallTrace` struct, a `flatCallTraceAction` struct, a `flatCallTraceResult` struct, and a `flatCallTracerTest` struct to represent the test data. It also defines a `flatCallTracerTestRunner` function to run the tests.

## flatCallTrace

The `flatCallTrace` struct represents the result of a callTracerParity run. It contains information about the action, block hash, block number, error, result, subtraces, trace address, transaction hash, transaction position, type, and time.

```go
type flatCallTrace struct {
	Action              flatCallTraceAction `json:"action"`
	BlockHash           common.Hash         `json:"-"`
	BlockNumber         uint64              `json:"-"`
	Error               string              `json:"error,omitempty"`
	Result              flatCallTraceResult `json:"result,omitempty"`
	Subtraces           int                 `json:"subtraces"`
	TraceAddress        []int               `json:"traceAddress"`
	TransactionHash     common.Hash         `json:"-"`
	TransactionPosition uint64              `json:"-"`
	Type                string              `json:"type"`
	Time                string              `json:"-"`
}
```

## flatCallTraceAction

The `flatCallTraceAction` struct represents the action of a call trace. It contains information about the author, reward type, self-destructed address, balance, call type, creation method, from address, gas, init, input, refund address, to address, and value.

```go
type flatCallTraceAction struct {
	Author         common.Address `json:"author,omitempty"`
	RewardType     string         `json:"rewardType,omitempty"`
	SelfDestructed common.Address `json:"address,omitempty"`
	Balance        hexutil.Big    `json:"balance,omitempty"`
	CallType       string         `json:"callType,omitempty"`
	CreationMethod string         `json:"creationMethod,omitempty"`
	From           common.Address `json:"from,omitempty"`
	Gas            hexutil.Uint64 `json:"gas,omitempty"`
	Init           hexutil.Bytes  `json:"init,omitempty"`
	Input          hexutil.Bytes  `json:"input,omitempty"`
	RefundAddress  common.Address `json:"refundAddress,omitempty"`
	To             common.Address `json:"to,omitempty"`
	Value          hexutil.Big    `json:"value,omitempty"`
}
```

## flatCallTraceResult

The `flatCallTraceResult` struct represents the result of a call trace. It contains information about the address, code, gas used, and output.

```go
type flatCallTraceResult struct {
	Address common.Address `json:"address,omitempty"`
	Code    hexutil.Bytes  `json:"code,omitempty"`
	GasUsed hexutil.Uint64 `json:"gasUsed,omitempty"`
	Output  hexutil.Bytes  `json:"output,omitempty"`
}
```

## flatCallTracerTest

The `flatCallTracerTest` struct defines a single test to check the call tracer against. # TestFlatCallTracerNative

The `TestFlatCallTracerNative` function iterates over all the input-output datasets in the tracer parity test harness and runs the Native tracer against them. It calls the `testFlatCallTracer` function with the `tracerName`, `dirPath`, and `t` parameters.

```go
func TestFlatCallTracerNative(t *testing.T) {
	testFlatCallTracer("flatCallTracer", "call_tracer_flat", t)
}
```

# testFlatCallTracer

The `testFlatCallTracer` function reads the tracer test suite and runs the Native tracer against each input-output dataset. It calls the `flatCallTracerTestRunner` function with the `tracerName`, `file.Name()`, `dirPath`, and `t` parameters.

```go
func testFlatCallTracer(tracerName string, dirPath string, t *testing.T) {
	files, err := os.ReadDir(filepath.Join("testdata", dirPath))
	if err != nil {
		t.Fatalf("failed to retrieve tracer test suite: %v", err)
	}
	for _, file := range files {
		if !strings.HasSuffix(file.Name(), ".json") {
			continue
		}
		file := file // capture range variable
		t.Run(camel(strings.TrimSuffix(file.Name(), ".json")), func(t *testing.T) {
			t.Parallel()

			err := flatCallTracerTestRunner(tracerName, file.Name(), dirPath, t)
			if err != nil {
				t.Fatal(err)
			}
		})
	}
}
```

# flatCallTracerTestRunner

The `flatCallTracerTestRunner` function runs the Native tracer against an input-output dataset. It creates a new EVM environment and runs the transaction through it. It then retrieves the trace result and compares it against the expected result. If the results do not match, the function returns an error.

```go
func flatCallTracerTestRunner(tracerName string, filename string, dirPath string, t *testing.T) error {
	test, err := loadFlatCallTracerTest(filepath.Join("testdata", dirPath, filename))
	if err != nil {
		return fmt.Errorf("failed to load test case: %v", err)
	}

	// Create