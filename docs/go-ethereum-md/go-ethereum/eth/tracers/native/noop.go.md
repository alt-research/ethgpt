## Native Package Documentation

This package contains the implementation of the `noopTracer` struct, which is a go implementation of the Tracer interface that performs no action. It is mostly useful for testing purposes.

### Functions

#### init()

The `init()` function registers the `noopTracer` with the `DefaultDirectory` of the `tracers` package.

#### newNoopTracer()

The `newNoopTracer()` function returns a new instance of the `noopTracer` struct.

#### (*noopTracer) CaptureStart()

The `CaptureStart()` function initializes the tracing operation by implementing the `EVMLogger` interface.

#### (*noopTracer) CaptureEnd()

The `CaptureEnd()` function is called after the call finishes to finalize the tracing.

#### (*noopTracer) CaptureState()

The `CaptureState()` function traces a single step of VM execution by implementing the `EVMLogger` interface.

#### (*noopTracer) CaptureFault()

The `CaptureFault()` function traces an execution fault by implementing the `EVMLogger` interface.

#### (*noopTracer) CaptureEnter()

The `CaptureEnter()` function is called when EVM enters a new scope (via call, create or selfdestruct).

#### (*noopTracer) CaptureExit()

The `CaptureExit()` function is called when EVM exits a scope, even if the scope didn't execute any code.

#### (*noopTracer) CaptureTxStart()

The `CaptureTxStart()` function is called when a new transaction is started.

#### (*noopTracer) CaptureTxEnd()

The `CaptureTxEnd()` function is called when a transaction ends.

#### (*noopTracer) GetResult()

The `GetResult()` function returns an empty json object.

#### (*noopTracer) Stop()

The `Stop()` function terminates execution of the tracer at the first opportune moment.