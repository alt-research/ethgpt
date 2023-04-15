Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## GaugeFloat64 Interface

The `GaugeFloat64` interface defines several functions that can be used to interact with a float64 value that can be set arbitrarily.

### Functions

#### `Snapshot() GaugeFloat64`

This function is used to get a read-only copy of the gauge.

#### `Update(float64)`

This function is used to update the gauge's value. It takes one parameter:

- `v` (float64): The new value of the gauge.

#### `Value() float64`

This function is used to get the gauge's current value.

### GetOrRegisterGaugeFloat64 Function

The `GetOrRegisterGaugeFloat64` function returns an existing `GaugeFloat64` or constructs and registers a new `StandardGaugeFloat64`.

### NewGaugeFloat64 Function

The `NewGaugeFloat64` function constructs a new `StandardGaugeFloat64`.

### NewRegisteredGaugeFloat64 Function

The `NewRegisteredGaugeFloat64` function constructs and registers a new `StandardGaugeFloat64`.

### NewFunctionalGaugeFloat64 Function

The `NewFunctionalGaugeFloat64` function constructs a new `FunctionalGaugeFloat64`.

### NewRegisteredFunctionalGaugeFloat64 Function

The `NewRegisteredFunctionalGaugeFloat64` function constructs and registers a new `FunctionalGaugeFloat64`.

### GaugeFloat64Snapshot Type

The `GaugeFloat64Snapshot` type is a read-only copy of another `GaugeFloat64`.

### NilGaugeFloat64 Type

The `NilGaugeFloat64` type is a no-op `GaugeFloat64`.

### StandardGaugeFloat64 Type

The `StandardGaugeFloat64` type is the standard implementation of a `GaugeFloat64` and uses atomic to manage a single float64 value.

### FunctionalGaugeFloat64 Type

The `FunctionalGaugeFloat64` type returns a value from a given function.

### Example Usage

Here's an example of how you could use the `GaugeFloat64` interface in your Go code:

```go
import (
    "fmt"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new gauge
    gauge := metrics.NewGaugeFloat64()

    // Update the gauge's value
    gauge.Update(42.0)

    // Get the gauge's current value
    value := gauge.Value()
    fmt.Println("Gauge value:", value)

    // Create a new functional gauge
    f := func() float64 {
        return 3.14
    }
    functionalGauge := metrics.NewFunctionalGaugeFloat64(f)

    // Get the functional gauge's current value
    functionalValue := functionalGauge.Value()
    fmt.Println("Functional gauge value:", functionalValue)
}
```

In this example, we create a new `GaugeFloat64` using the `NewGaugeFloat64` function and update its value using the `Update` function. We then get the gauge's current value using the `Value` function. We also create a new `FunctionalGaugeFloat64` using the `NewFunctionalGaugeFloat64` function and get its current value using the `Value` function.