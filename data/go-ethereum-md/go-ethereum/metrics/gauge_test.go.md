# Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics in Go programs.

## Functions

### `BenchmarkGauge(b *testing.B)`

This function is used to benchmark the `Gauge` type. It creates a new `Gauge` and updates it `b.N` times.

### `TestGauge(t *testing.T)`

This function is used to test the `Gauge` type's `Value` method. It creates a new `Gauge`, updates it with a value of 47, and then checks that its value is equal to 47.

### `TestGaugeSnapshot(t *testing.T)`

This function is used to test the `Gauge` type's `Snapshot` method. It creates a new `Gauge`, updates it with a value of 47, takes a snapshot of the `Gauge`, updates the `Gauge` with a value of 0, and then checks that the snapshot's value is still equal to 47.

### `TestGetOrRegisterGauge(t *testing.T)`

This function is used to test the `GetOrRegisterGauge` function. It creates a new `Registry`, registers a new `Gauge` with the name "foo" and a value of 47, retrieves the `Gauge` using `GetOrRegisterGauge`, and then checks that its value is equal to 47.

### `TestFunctionalGauge(t *testing.T)`

This function is used to test the `FunctionalGauge` type. It creates a new `FunctionalGauge` with a function that increments a counter, calls the `Value` method twice, and then checks that the counter is equal to 2.

### `TestGetOrRegisterFunctionalGauge(t *testing.T)`

This function is used to test the `GetOrRegisterFunctionalGauge` function. It creates a new `Registry`, registers a new `FunctionalGauge` with the name "foo" and a function that returns 47, retrieves the `Gauge` using `GetOrRegisterGauge`, and then checks that its value is equal to 47.

### `ExampleGetOrRegisterGauge()`

This function is an example of how you could use the `GetOrRegisterGauge` function in your Go code. It creates a new `Gauge` with the name "server.bytes_sent" using `GetOrRegisterGauge`, updates it with a value of 47, and then prints its value using the `Value` method.

```go
package main

import (
    "fmt"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new gauge with the name "server.bytes_sent"
    g := metrics.GetOrRegisterGauge("server.bytes_sent", nil)

    // Update the gauge with a value of 47
    g.Update(47)

    // Print the value of the gauge
    fmt.Println(g.Value()) // Output: 47
}
```

In this example, we create a new `Gauge` with the name "server.bytes_sent" using the `GetOrRegisterGauge` function. We then update the gauge with a value of 47 and print its value using the `Value` method.