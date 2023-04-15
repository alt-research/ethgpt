The `jsre` package provides an execution environment for JavaScript. It embeds the `goja` interpreter and provides helper functions to load code from files, run code snippets, and bind native Go objects to JS. The runtime runs all code on a dedicated event loop and does not expose the underlying `goja` runtime directly. To use the runtime, call `JSRE.Do`. When binding a Go function, use the `Call` type to gain access to the runtime.

The `JSRE` struct represents a JS runtime environment. It has the following fields:

- `assetPath`: a string representing the path to the asset directory.
- `output`: an `io.Writer` to which output is written.
- `evalQueue`: a channel of `evalReq` structs representing serialized vm execution requests processed by `runEventLoop`.
- `stopEventLoop`: a channel of bools used to stop the event loop.
- `closed`: a channel of empty structs used to signal that the event loop has stopped.
- `vm`: a pointer to a `goja.Runtime` instance.

The `Call` struct represents the argument type of Go functions which are callable from JS. It has the following fields:

- `FunctionCall`: a `goja.FunctionCall` struct representing the function call.
- `VM`: a pointer to the `goja.Runtime` instance.

The `jsTimer` struct represents a single timer instance with a callback function. It has the following fields:

- `timer`: a pointer to a `time.Timer` instance.
- `duration`: a `time.Duration` representing the duration of the timer.
- `interval`: a bool indicating whether the timer is an interval timer.
- `call`: a `goja.FunctionCall` representing the callback function.

The `evalReq` struct represents a serialized vm execution request processed by `runEventLoop`. It has the following fields:

- `fn`: a function that takes a `goja.Runtime` instance as an argument.
- `done`: a channel of bools used to signal that the request has been processed.

The `New` function creates a new `JSRE` instance. It takes two arguments:

- `assetPath`: a string representing the path to the asset directory.
- `output`: an `io.Writer` to which output is written.

The `randomSource` function returns a pseudo-random value generator.

The `runEventLoop` function runs the main event loop from a goroutine that is started when `JSRE` is created. Use `Stop` before exiting to properly stop it. The event loop processes vm access requests from the `evalQueue` in a serialized way and calls timer callback functions at the appropriate time.

The `loadScript` function loads a script from a file and evaluates it in the VM.

The `prettyPrintJS` function pretty-prints a JS value.

The `Set` function binds a Go object to a JS object.

The `Do` function evaluates a JS expression in the VM.

Example usage:

```go
package main

import (
	"fmt"
	"os"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	"github.com/ethereum/go-ethereum/jsre"
)

func main() {
	re := jsre.New("./assets", os.Stdout)
	re.Set("log", jsre.MakeCallback(re.vm, func(call jsre.Call) goja.Value {
		fmt.Fprintln(re.output, call.ArgumentList[0].String())
		return nil
	}))
	re.Set("toAddress", jsre.MakeCallback(re.vm, func(call jsre.Call) goja.Value {
		addr := common.BytesToAddress(call.ArgumentList[0].ToBytes())
		return re.vm.ToValue(addr.Hex())
	}))
	re.Do("log('Hello, world!')")
	re.Do("log(toAddress('0x1234567890123456789012345678901234567890'))")
}
``` ## Source Code Documentation

The following code snippets define a JavaScript runtime environment (JSRE) that allows for the execution of JavaScript code on a Go server. The JSRE includes a timer implementation that allows for the scheduling of callbacks at specified intervals.

### setTimeout

The `setTimeout` function schedules a callback to be executed after a specified delay. The function takes two arguments: a callback function and a delay in milliseconds. If the delay is less than or equal to zero, it is set to one millisecond.

```js
setTimeout := func(call goja.FunctionCall) goja.Value {
		_, value := newTimer(call, false)
		return value
	}
```

### setInterval

The `setInterval` function schedules a callback to be executed at specified intervals. The function takes two arguments: a callback function and an interval in milliseconds. If the interval is less than or equal to zero, it is set to one millisecond.

```js
setInterval := func(call goja.FunctionCall) goja.Value {
		_, value := newTimer(call, true)
		return value
	}
```

### clearTimeout

The `clearTimeout` function cancels a previously scheduled timeout. The function takes one argument: the timer object returned by `setTimeout`.

```js
clearTimeout := func(call goja.FunctionCall) goja.Value {
		timer := call.Argument(0).Export()
		if timer, ok := timer.(*jsTimer); ok {
			timer.timer.Stop()
			delete(registry, timer)
		}
		return goja.Undefined()
	}
```

### newTimer

The `newTimer` function creates a new timer object and schedules a callback to be executed after a specified delay or at specified intervals. The function takes three arguments: a callback function, a delay or interval in milliseconds, and a boolean value indicating whether the timer is an interval timer.

```js
newTimer := func(call goja.FunctionCall, interval bool) (*jsTimer, goja.Value) {
		delay := call.Argument(1).ToInteger()
		if 0 >= delay {
			delay = 1
		}
		timer := &jsTimer{
			duration: time.Duration(delay) * time.Millisecond,
			call:     call,
			interval: interval,
		}
		registry[timer] = timer

		timer.timer = time.AfterFunc(timer.duration, func() {
			ready <- timer
		})

		return timer, re.vm.ToValue(timer)
	}
```

### jsTimer

The `jsTimer` struct represents a timer object. It contains the duration of the timer, the callback function to be executed, a boolean value indicating whether the timer is an interval timer, and a `time.Timer` object used to schedule the timer.

```js
type jsTimer struct {
	duration time.Duration
	call     goja.FunctionCall
	interval bool
	timer    *time.Timer
}
```

### JSRE

The `JSRE` struct represents a JavaScript runtime environment. It contains a Goja runtime object, a channel for evaluating JavaScript code, a channel for stopping the event loop, and a boolean value indicating whether the runtime has been closed.

```js
type JSRE struct {
	vm           *goja.Runtime
	evalQueue    chan *evalReq
	stopEventLoop chan bool
	closed       chan bool
	assetPath    string
}
```

### Do

The `Do` function executes a given function on the JS event loop. If the runtime is stopped, the function will not execute. The function takes one argument: a function to be executed on the event loop.

```js
func (re *JSRE) Do(fn func(*goja.Runtime)) {
	done := make(chan bool)
	req := &evalReq{fn, done}
	select {
	case re.evalQueue <- req:
		<-done
	case <-re.closed:
	}
}
```

### Stop

The `Stop` function terminates the event loop, optionally waiting for all timers to expire. The function takes one argument: a boolean value indicating whether to wait for all timers to expire.

```js
func (re *JSRE) Stop(waitForCallbacks bool) {
	timeout := time.NewTimer(10 * time.Millisecond)
	defer timeout.Stop()

	for {
		select {
		case <-re.closed:
			return
		case re.stopEventLoop <- waitForCallbacks:
			<-re.closed
			return
		case <-timeout.C:
			// JS is blocked, interrupt and try again.
			re.vm.Interrupt(errors.New("JS runtime stopped"))
		}
	}
}
```

### Exec

The `Exec` function loads and runs the contents of a file. If a relative path is given, the JSRE's assetPath is used. The function takes one argument: the path to the file to be executed.

```js
func (re *JSRE) Exec(file string) error {
	code, err := os.ReadFile(common.AbsolutePath(re.assetPath, file))
	if err != nil {
		return err
	}
``` This codebase is written in Go and uses the Goja library to execute JavaScript code. The codebase provides a set of functions to compile, run, and evaluate JavaScript code, as well as load and execute JavaScript files.

The `JSRE` struct represents a JavaScript runtime environment and provides the following methods:

- `Do` is a helper function that executes a function within a Goja runtime environment. It takes a function that takes a `*goja.Runtime` as an argument and returns nothing. This function is executed within the `JSRE`'s runtime environment.
- `Compile` compiles and runs a piece of JavaScript code. It takes a filename and the source code as arguments and returns an error if there was a problem compiling or running the code.
- `Run` runs a piece of JavaScript code. It takes a string of JavaScript code as an argument and returns a `goja.Value` and an error.
- `Set` assigns a value to a variable in the JavaScript environment. It takes a namespace and a value as arguments and returns an error.
- `Evaluate` executes code and pretty prints the result to the specified output stream. It takes a string of JavaScript code and an `io.Writer` as arguments and returns nothing.
- `Interrupt` stops the current JavaScript evaluation. It takes an interface{} as an argument and returns nothing.

The `MakeCallback` function takes a `*goja.Runtime` and a function that takes a `Call` as an argument and returns a `goja.Value` and an error. It returns a `goja.Value` that can be called from JavaScript.

The `loadScript` function is a helper function that loads and executes a JavaScript file. It takes a `Call` as an argument and returns a `goja.Value` and an error.

The `compileAndRun` function compiles and runs a piece of JavaScript code. It takes a `*goja.Runtime`, a filename, and the source code as arguments and returns a `goja.Value` and an error.