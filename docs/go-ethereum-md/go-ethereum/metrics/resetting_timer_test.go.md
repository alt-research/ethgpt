# Metrics Package

The `metrics` package provides a set of functions for collecting and reporting metrics in Go programs.

## TestResettingTimer Function

The `TestResettingTimer` function is a test function that tests the `ResettingTimer` type. It takes an array of test cases, each of which contains a set of values, start and end times, and expected percentiles, mean, minimum, and maximum values. The function iterates over each test case, creates a new `ResettingTimer`, updates it with the test case's values, and then checks that the timer's snapshot matches the expected percentiles, mean, minimum, and maximum values.

### Functions

#### `TestResettingTimer(t *testing.T)`

This function takes a testing object `t` and runs a series of tests on the `ResettingTimer` type.

### Example Usage

Here's an example of how you could use the `TestResettingTimer` function in your Go code:

```go
import (
    "testing"
    "time"
)

func TestMyResettingTimer(t *testing.T) {
    tests := []struct {
        values   []int64
        start    int
        end      int
        wantP50  int64
        wantP95  int64
        wantP99  int64
        wantMean float64
        wantMin  int64
        wantMax  int64
    }{
        // Test cases go here
    }

    for _, tt := range tests {
        // Run the test case
    }
}
```

## TestResettingTimerWithFivePercentiles Function

The `TestResettingTimerWithFivePercentiles` function is similar to the `TestResettingTimer` function, but it tests the `ResettingTimer` type with five percentiles instead of three. It takes an array of test cases, each of which contains a set of values, start and end times, and expected percentiles, mean, minimum, and maximum values. The function iterates over each test case, creates a new `ResettingTimer`, updates it with the test case's values, and then checks that the timer's snapshot matches the expected percentiles, mean, minimum, and maximum values.

### Functions

#### `TestResettingTimerWithFivePercentiles(t *testing.T)`

This function takes a testing object `t` and runs a series of tests on the `ResettingTimer` type with five percentiles.

### Example Usage

Here's an example of how you could use the `TestResettingTimerWithFivePercentiles` function in your Go code:

```go
import (
    "testing"
    "time"
)

func TestMyResettingTimerWithFivePercentiles(t *testing.T) {
    tests := []struct {
        values   []int64
        start    int
        end      int
        wantP05  int64
        wantP20  int64
        wantP50  int64
        wantP95  int64
        wantP99  int64
        wantMean float64
        wantMin  int64
        wantMax  int64
    }{
        // Test cases go here
    }

    for _, tt := range tests {
        // Run the test case
    }
}
``` ## Test Function

The `TestFunction` function is a test function that checks if the values returned by the `snap.Values()` and `snap.Mean()` functions match the expected values provided in the test table.

### Functions

#### `TestFunction(t *testing.T)`

This function takes a `*testing.T` parameter and runs a series of tests to check if the values returned by the `snap.Values()` and `snap.Mean()` functions match the expected values provided in the test table. If any of the tests fail, the function will call `t.Fatalf()` to log an error message and stop the test.

### Example Usage

Here's an example of how you could use the `TestFunction` function in your Go code:

```go
import (
    "testing"
    "github.com/rcrowley/go-metrics"
)

func TestMyFunction(t *testing.T) {
    // Define a test table with expected values
    tests := []struct {
        values   []int64
        wantMin  int64
        wantMax  int64
        wantMean float64
        wantP05  int64
        wantP20  int64
        wantP50  int64
        wantP95  int64
        wantP99  int64
    }{
        {[]int64{1, 2, 3, 4, 5}, 1, 5, 3, 1, 1, 3, 5, 5},
        {[]int64{10, 20, 30, 40, 50}, 10, 50, 30, 10, 10, 30, 50, 50},
    }

    // Run the tests
    for i, tt := range tests {
        // Create a new snapshot
        snap := metrics.NewSnapshot()

        // Add values to the snapshot
        for _, v := range tt.values {
            snap.Update(v)
        }

        // Calculate percentiles
        ps := snap.Percentiles([]float64{0.05, 0.20, 0.50, 0.95, 0.99})

        // Check if the values match the expected values
        val := snap.Values()

        if len(val) > 0 {
            if tt.wantMin != val[0] {
                t.Fatalf("%d: min: got %d, want %d", i, val[0], tt.wantMin)
            }

            if tt.wantMax != val[len(val)-1] {
                t.Fatalf("%d: max: got %d, want %d", i, val[len(val)-1], tt.wantMax)
            }
        }

        if tt.wantMean != snap.Mean() {
            t.Fatalf("%d: mean: got %.2f, want %.2f", i, snap.Mean(), tt.wantMean)
        }

        if tt.wantP05 != ps[0] {
            t.Fatalf("%d: p05: got %d, want %d", i, ps[0], tt.wantP05)
        }

        if tt.wantP20 != ps[1] {
            t.Fatalf("%d: p20: got %d, want %d", i, ps[1], tt.wantP20)
        }

        if tt.wantP50 != ps[2] {
            t.Fatalf("%d: p50: got %d, want %d", i, ps[2], tt.wantP50)
        }

        if tt.wantP95 != ps[3] {
            t.Fatalf("%d: p95: got %d, want %d", i, ps[3], tt.wantP95)
        }

        if tt.wantP99 != ps[4] {
            t.Fatalf("%d: p99: got %d, want %d", i, ps[4], tt.wantP99)
        }
    }
}
```