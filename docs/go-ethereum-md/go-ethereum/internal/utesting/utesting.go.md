unction test result in a format similar to go test.
func (c *consoleOutput) testResult(result Result) {
	if result.Failed {
		fmt.Fprintf(c.out, "FAIL\t%s\t%.3fs\n", result.Name, result.Duration.Seconds())
	} else {
		fmt.Fprintf(c.out, "PASS\t%s\t%.3fs\n", result.Name, result.Duration.Seconds())
	}
}

// indentWriter indents each line of output with a prefix.
type indentWriter struct {
	prefix string
	w      io.Writer
}

func newIndentWriter(prefix string, w io.Writer) *indentWriter {
	return &indentWriter{prefix, w}
}

func (w *indentWriter) Write(b []byte) (int, error) {
	var n int
	for len(b) > 0 {
		idx := bytes.IndexByte(b, '\n')
		if idx == -1 {
			// No newline found, write the rest of the buffer and exit.
			m, err := w.w.Write(b)
			n += m
			return n, err
		}
		// Write the line with the prefix and move to the next line.
		m, err := fmt.Fprintf(w.w, "%s%s\n", w.prefix, b[:idx])
		n += m
		if err != nil {
			return n, err
		}
		b = b[idx+1:]
	}
	return n, nil
}

// CountFailures returns the number of failed tests in the given results.
func CountFailures(results []Result) int {
	var count int
	for _, result := range results {
		if result.Failed {
			count++
		}
	}
	return count
}

// runTest executes a single test and returns true if it failed.
func runTest(test Test, output io.Writer) bool {
	t := &T{output: output}
	test.Fn(t)
	return t.failed
}

// T is a test context passed to test functions.
type T struct {
	output io.Writer
	failed bool
}

// Fail marks the test as failed with the given message.
func (t *T) Fail(message string) {
	fmt.Fprintln(t.output, message)
	t.failed = true
}

// Errorf formats the message and marks the test as failed.
func (t *T) Errorf(format string, args ...interface{}) {
	t.Fail(fmt.Sprintf(format, args...))
}

// Assert checks that the condition is true and marks the test as failed if not.
func (t *T) Assert(condition bool, message string) {
	if !condition {
		t.Fail(message)
	}
}

// Assertf checks that the condition is true and marks the test as failed with the formatted message if not.
func (t *T) Assertf(condition bool, format string, args ...interface{}) {
	if !condition {
		t.Fail(fmt.Sprintf(format, args...))
	}
}

// AssertEqual checks that the two values are equal and marks the test as failed if not.
func (t *T) AssertEqual(expected, actual interface{}, message string) {
	if expected != actual {
		t.Fail(fmt.Sprintf("%s\nExpected: %v\nActual: %v", message, expected, actual))
	}
}

// AssertEqualf checks that the two values are equal and marks the test as failed with the formatted message if not.
func (t *T) AssertEqualf(expected, actual interface{}, format string, args ...interface{}) {
	if expected != actual {
		t.Fail(fmt.Sprintf(format+"\nExpected: %v\nActual: %v", args..., expected, actual))
	}
}

// AssertNotEqual checks that the two values are not equal and marks the test as failed if they are.
func (t *T) AssertNotEqual(expected, actual interface{}, message string) {
	if expected == actual {
		t.Fail(fmt.Sprintf("%s\nExpected: %v\nActual: %v", message, expected, actual))
	}
}

// AssertNotEqualf checks that the two values are not equal and marks the test as failed with the formatted message if they are.
func (t *T) AssertNotEqualf(expected, actual interface{}, format string, args ...interface{}) {
	if expected == actual {
		t.Fail(fmt.Sprintf(format+"\nExpected: %v\nActual: %v", args..., expected, actual))
	}
}

// AssertNil checks that the value is nil and marks the test as failed if not.
func (t *T) AssertNil(value interface{}, message string) {
	if value != nil {
		t.Fail(fmt.Sprintf("%s\nExpected: nil\nActual: %v", message, value))
	}
}

// AssertNotNil checks that the value is not nil and marks the test as failed if it is.
func (t *T) AssertNotNil(value interface{}, message string) {
	if value == nil {
		t.Fail(fmt.Sprintf("%s\nExpected: not nil\nActual: nil", message))
	}
}

// AssertPanic checks that the function panics and marks the test as failed if it does not.
func (t *T) AssertPanic(fn func(), message string) {
	defer func() {
		if r := recover(); r == nil {
			t.Fail(message)
		}
	}()
	fn()
}

// AssertPanicf checks that the function panics and marks the test as failed with the formatted message if it does not.
func (t *T) AssertPanicf(fn func(), format string, args ...interface{}) {
	defer func() {
		if r := recover(); r == nil {
			t.Fail(fmt.Sprintf(format, args...))
		}
	}()
	fn()
}

// AssertNoPanic checks that the function does not panic and marks the test as failed if it does.
func (t *T) AssertNoPanic(fn func(), message string) {
	defer func() {
		if r := recover(); r != nil {
			t.Fail(fmt.Sprintf("%s\nPanic: %v", message, r))
		}
	}()
	fn()
}

// AssertNoPanicf checks that the function does not panic and marks the test as failed with the formatted message if it does.
func (t *T) AssertNoPanicf(fn func(), format string, args ...interface{}) {
	defer func() {
		if r := recover(); r != nil {
			t.Fail(fmt.Sprintf(format+"\nPanic: %v", args..., r))
		}
	}()
	fn()
}

// AssertTrue checks that the value is true and marks the test as failed if it is not.
func (t *T) AssertTrue(value bool, message string) {
	if !value {
		t.Fail(message)
	}
}

// AssertFalse checks that the value is false and marks the test as failed if it is not.
func (t *T) AssertFalse(value bool, message string) {
	if value {
		t.Fail(message)
	}
}

// AssertSame checks that the two values are the same object and marks the test as failed if they are not.
func (t *T) AssertSame(expected, actual interface{}, message string) {
	if &expected != &actual {
		t.Fail(fmt.Sprintf("%s\nExpected: %v\nActual: %v", message, expected, actual))
	}
}

// AssertNotSame checks that the two values are not the same object and marks the test as failed if they are.
func (t *T) AssertNotSame(expected, actual interface{}, message string) {
	if &expected == &actual {
		t.Fail(fmt.Sprintf("%s\nExpected: not %v\nActual: %v", message, expected, actual))
	}
}

// AssertDeepEqual checks that the two values are deeply equal and marks the test as failed if they are not.
func (t *T) AssertDeepEqual(expected, actual interface{}, message string) {
	if !deepEqual(expected, actual) {
		t.Fail(fmt.Sprintf("%s\nExpected: %v\nActual: %v", message, expected, actual))
	}
}

// AssertDeepEqualf checks that the two values are deeply equal and marks the test as failed with the formatted message if they are not.
func (t *T) AssertDeepEqualf(expected, actual interface{}, format string, args ...interface{}) {
	if !deepEqual(expected, actual) {
		t.Fail(fmt.Sprintf(format+"\nExpected: %v\nActual: %v", args..., expected, actual))
	}
}

// deepEqual checks if two values are deeply equal.
func deepEqual(expected, actual interface{}) bool {
	if expected == nil || actual == nil {
		return expected == actual
	}
	if expectedType := runtime.TypeOf(expected); expectedType != runtime.TypeOf(actual) {
		return false
	}
	switch expected.(type) {
	case int, int8, int16, int32, int64,
		uint, uint8, uint16, uint32, uint64,
		float32, float64, complex64, complex128,
		bool, string:
		return expected == actual
	case []interface{}:
		expectedSlice := expected.([]interface{})
		actualSlice := actual.([]interface{})
		if len(expectedSlice) != len(actualSlice) {
			return false
		}
		for i := range expectedSlice {
			if !deepEqual(expectedSlice[i], actualSlice[i]) {
				return false
			}
		}
		return true
	case map[interface{}]interface{}:
		expectedMap := expected.(map[interface{}]interface{})
		actualMap := actual.(map[interface{}]interface{})
		if len(expectedMap) != len(actualMap) {
			return false
		}
		for k, v := range expectedMap {
			if !deepEqual(v, actualMap[k]) {
				return false
			}
		}
		return true
	default:
		return false
	}
} The codebase consists of several functions and types that are used to execute and report the results of tests. Here is a brief description of each function and type:

`func (c *consoleOutput) testResult(r Result)`: This function is a method of the `consoleOutput` type. It takes a `Result` object as input and prints the test result to the console. If the test failed, it prints "-- FAIL" followed by the test name and duration. Otherwise, it prints "-- OK" followed by the test name and duration.

`type tapOutput struct`: This type represents the Test Anything Protocol (TAP) output format. It has an `out` field that specifies the output destination, an `indented` field that is used to indent the output, and a `counter` field that keeps track of the number of tests executed. It has three methods:

- `func newTAP(out io.Writer, numTests int) *tapOutput`: This function creates a new `tapOutput` object and writes the TAP header to the output destination.
- `func (t *tapOutput) testStart(name string)`: This function is called at the start of each test and increments the `counter` field.
- `func (t *tapOutput) testResult(r Result)`: This function takes a `Result` object as input and prints the test result in TAP format. If the test failed, it prints "not ok" followed by the test number and name. Otherwise, it prints "ok" followed by the test number and name. It also indents and prints the test output.

`type indentWriter struct`: This type is used to indent all written text. It has an `out` field that specifies the output destination, an `indent` field that specifies the indentation string, and an `inLine` field that keeps track of whether the current line is indented or not. It has two methods:

- `func newIndentWriter(indent string, out io.Writer) *indentWriter`: This function creates a new `indentWriter` object with the specified indentation string and output destination.
- `func (w *indentWriter) Write(b []byte) (n int, err error)`: This function writes the input byte slice to the output destination and indents each line with the specified indentation string.

`func CountFailures(rr []Result) int`: This function takes a slice of `Result` objects as input and returns the number of failed tests.

`func Run(test Test) (bool, string)`: This function takes a `Test` object as input and executes it. It returns a boolean value indicating whether the test failed and a string containing the test output.

`func runTest(test Test, output io.Writer) bool`: This function takes a `Test` object and an output destination as input and executes the test. It returns a boolean value indicating whether the test failed.

`type T struct`: This type is the value given to the test function. It has a `mu` field that is used to synchronize access to the `failed` field, a `failed` field that indicates whether the test has failed, and an `output` field that specifies the output destination. It has several methods:

- `func (t *T) Helper()`: This function exists for compatibility with the `testing.T` type.
- `func (t *T) FailNow()`: This function marks the test as having failed and stops its execution by calling `runtime.Goexit`.
- `func (t *T) Fail()`: This function marks the test as having failed but continues execution.
- `func (t *T) Failed() bool`: This function returns a boolean value indicating whether the test has failed.
- `func (t *T) Log(vs ...interface{})`: This function formats its arguments using default formatting and records the text in the error log.
- `func (t *T) Logf(format string, vs ...interface{})`: This function formats its arguments according to the format and records the text in the error log.

Here is an example of how to use these functions and types:

```
package main

import (
	"fmt"
	"testing"
)

func TestAddition(t *testing.T) {
	result := 2 + 2
	if result != 4 {
		t.Errorf("Expected 2 + 2 to equal 4, but got %d", result)
	}
}

func TestSubtraction(t *testing.T) {
	result := 5 - 3
	if result != 2 {
		t.Errorf("Expected 5 - 3 to equal 2, but got %d", result)
	}
}

func main() {
	tests := []Test{
		{Name: "Addition", Fn: TestAddition},
		{Name: "Subtraction", Fn: TestSubtraction},
	}
	output := new(consoleOutput)
	RunTests(tests, output)
}

func RunTests(tests []Test, output TestOutput) {
	for _, test := range tests {
		output.testStart(test.Name)
		failed, testOutput := Run(test)
		result := Result{Name: test.Name, Failed: failed, Output: testOutput}
		output.testResult(result)
	}
	fmt.Printf("%d tests, %d failures\n", len(tests), CountFailures(output.Results()))
}
```

In this example, we define two test functions (`TestAddition` and `TestSubtraction`) and add them to a slice of `Test` objects. We then create a `consoleOutput` object and call `RunTests` with the slice of tests and the output object. `RunTests` executes each test and reports the results to the output object. Finally, we print the total number of tests and failures. # Testing

The `testing` package provides support for automated testing of Go packages.

## T

`T` is a type passed to `Test` functions to manage test state and support formatted test logs.

### Methods

#### Log

```go
func (t *T) Log(vs ...interface{})
```

`Log` formats its arguments using default formatting, analogous to `Println`, and records the text in the error log.

#### Logf

```go
func (t *T) Logf(format string, vs ...interface{})
```

`Logf` formats its arguments according to the format, analogous to `Printf`, and records the text in the error log.

#### Error

```go
func (t *T) Error(vs ...interface{})
```

`Error` is equivalent to `Log` followed by `Fail`.

#### Errorf

```go
func (t *T) Errorf(format string, vs ...interface{})
```

`Errorf` is equivalent to `Logf` followed by `Fail`.

#### Fatal

```go
func (t *T) Fatal(vs ...interface{})
```

`Fatal` is equivalent to `Log` followed by `FailNow`.

#### Fatalf

```go
func (t *T) Fatalf(format string, vs ...interface{})
```

`Fatalf` is equivalent to `Logf` followed by `FailNow`.