# Tracetest Package

The `tracetest` package provides tests for the call tracer against input-output datasets in the tracer test harness. It defines a `callContext` struct, a `callLog` struct, a `callTrace` struct, and a `callTracerTest` struct to represent the context, log, trace, and test case, respectively.

## callContext

The `callContext` struct represents the context of a call trace. It contains the block number, difficulty, timestamp, gas limit, and miner address.

## callLog

The `callLog` struct represents the result of a LOG opcode. It contains the address, topics, and data.

## callTrace

The `callTrace` struct represents the result of a callTracer run. It contains the from address, gas, gas used, to address, input data, output data, error message, revert reason, sub-calls, logs, and value.

## callTracerTest

The `callTracerTest` struct defines a single test case to check the call tracer against. It contains the genesis block, call context, input data, tracer configuration, and expected result.

## TestCallTracerLegacy

The `TestCallTracerLegacy` function iterates over all the input-output datasets in the tracer test harness and runs the JavaScript tracers against them. It tests the legacy call tracer.

## TestCallTracerNative

The `TestCallTracerNative` function iterates over all the input-output datasets in the tracer test harness and runs the JavaScript tracers against them. It tests the native call tracer.

## TestCallTracerNativeWithLog

The `TestCallTracerNativeWithLog` function iterates over all the input-output datasets in the tracer test harness and runs the JavaScript tracers against them. It tests the native call tracer with logs.

## testCallTracer

The `testCallTracer` function is a helper function that tests the call tracer against the input-output datasets in the tracer test harness. It takes in the tracer name, directory path, and testing object as parameters. It reads each JSON file in the directory and runs the JavaScript tracers against them. If the result does not match the expected result, the test fails. # Tracers Package

The `tracers` package provides a way to load the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source. It also contains functions for testing and benchmarking the tracers.

## Load

The `Load` function reads the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source. It uses the `embed` package to embed the JS files in the binary. The function walks through the directory and reads each file, then converts the file name to camel case and adds it to the map.

```go
func Load() (map[string]string, error) {
	var assetTracers = make(map[string]string)
	err := fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		b, err := fs.ReadFile(files, path)
		if err != nil {
			return err
		}
		name := camel(strings.TrimSuffix(path, ".js"))
		assetTracers[name] = string(b)
		return nil
	})
	return assetTracers, err
}
```

## TestTracers

The `TestTracers` function tests the tracers by executing each tracer test case and comparing the trace result against the expected result. It reads each test case from a JSON file and executes it using the EVM. It then retrieves the trace result and compares it against the expected result.

```go
func TestTracers(t *testing.T, tracerName string, isLegacy bool) {
	files, err := os.ReadDir(filepath.Join("testdata", "call_tracer"))
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

			var (
				test = new(callTracerTest)
				tx   = new(types.Transaction)
			)
			// Call tracer test # Test Tracers Package

The `tracers` package provides a way to load the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source. It also contains a function to convert a snake-cased string to a camel-cased string.

## Load

The `Load` function reads the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source. It uses the `embed` package to embed the JS files in the binary. The function walks through the directory and reads each file, then converts the file name to camel case and adds it to the map.

```go
func Load() (map[string]string, error) {
	var assetTracers = make(map[string]string)
	err := fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		b, err := fs.ReadFile(files, path)
		if err != nil {
			return err
		}
		name := camel(strings.TrimSuffix(path, ".js"))
		assetTracers[name] = string(b)
		return nil
	})
	return assetTracers, err
}
```

## camel

The `camel` function converts a snake-cased input string into a camel-cased output. It splits the input string by underscores and capitalizes the first letter of each word except the first one, then joins the words back together.

```go
func camel(str string) string {
	pieces := strings.Split(str, "_")
	for i := 1; i < len(p # Tracer Package

The `tracer` package provides a way to trace the execution of Ethereum Virtual Machine (EVM) transactions. It contains functions for creating and managing tracers, as well as for retrieving the results of the tracing.

## mkTracer

The `mkTracer` function creates a new tracer with the given name and options. It returns a `vm.Tracer` object that can be passed to the EVM.

```go
func mkTracer(name string, opts json.RawMessage) vm.Tracer {
	switch name {
	case "callTracer":
		return vm.NewCallTracer(opts)
	case "prestateTracer":
		return vm.NewPreStateTracer(opts)
	default:
		return nil
	}
}
```

## TestTracers

The `TestTracers` function tests the tracers by executing a series of EVM transactions with different opcodes and tracing options. It creates a new EVM with the given tracer and executes a transaction with the given code. It then retrieves the trace result and compares it against the expected result.

```go
func TestTracers(t *testing.T) {
	context := core.NewEVMContext(core.GenesisHeader(), nil)
	txContext := core.NewEVMTxContext(&core.Message{})

	origin := common.HexToAddress("0x000000000000000000000000000000000000feed")
	to := common.HexToAddress("0x000000