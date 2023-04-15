Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### BenchmarkGaugeFloat64 Function

The `BenchmarkGaugeFloat64` function is a benchmark test for the `GaugeFloat64` type. It updates the gauge with a float64 value for `b.N` iterations.

### BenchmarkGaugeFloat64Parallel Function

The `BenchmarkGaugeFloat64Parallel` function is a benchmark test for the `GaugeFloat64` type that runs in parallel. It updates the gauge with a float64 value for `b.N` iterations across 10 goroutines.

### TestGaugeFloat64 Function

The `TestGaugeFloat64` function is a unit test for the `GaugeFloat64` type. It creates a new `GaugeFloat64`, updates it with a value, and checks that the value is correct.

### TestGaugeFloat64Snapshot Function

The `TestGaugeFloat64Snapshot` function is a unit test for the `GaugeFloat64` type. It creates a new `GaugeFloat64`, updates it with a value, takes a snapshot of the gauge, updates the gauge with a different value, and checks that the snapshot value is still the original value.

### TestGetOrRegisterGaugeFloat64 Function

The `TestGetOrRegisterGaugeFloat64` function is a unit test for the `GetOrRegisterGaugeFloat64` function. It creates a new registry, registers a new `GaugeFloat64` with a specific name and value, retrieves the gauge using `GetOrRegisterGaugeFloat64`, and checks that the value is correct.

### TestFunctionalGaugeFloat64 Function

The `TestFunctionalGaugeFloat64` function is a unit test for the `FunctionalGaugeFloat64` type. It creates a new `FunctionalGaugeFloat64` with a function that increments a counter, calls the `Value` function twice, and checks that the counter has been incremented twice.

### TestGetOrRegisterFunctionalGaugeFloat64 Function

The `TestGetOrRegisterFunctionalGaugeFloat64` function is a unit test for the `GetOrRegisterFunctionalGaugeFloat64` function. It creates a new registry, registers a new `FunctionalGaugeFloat64` with a specific name and value, retrieves the gauge using `GetOrRegisterGaugeFloat64`, and checks that the value is correct.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new gauge
    gauge := metrics.NewGaugeFloat64()

    // Update the gauge with a value
    gauge.Update(47.0)

    // Get the value of the gauge
    value := gauge.Value()

    // Print the value of the gauge
    fmt.Println("Gauge value:", value)
}
```

In this example, we create a new `GaugeFloat64` using the `NewGaugeFloat64` function provided by the `metrics` package. We then update the gauge with a value using the `Update` function and get the value of the gauge using the `Value` function. Finally, we print the value of the gauge to the console.