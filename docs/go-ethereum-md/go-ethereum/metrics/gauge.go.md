Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Gauge Interface

The `Gauge` interface defines several functions that can be used to interact with a gauge, which holds an `int64` value that can be set arbitrarily.

### Functions

#### `Snapshot() Gauge`

This function returns a read-only copy of the gauge.

#### `Update(int64)`

This function updates the gauge's value.

#### `Dec(int64)`

This function decrements the gauge's current value by the given amount.

#### `Inc(int64)`

This function increments the gauge's current value by the given amount.

#### `Value() int64`

This function returns the gauge's current value.

### GetOrRegisterGauge Function

The `GetOrRegisterGauge` function returns an existing gauge or constructs and registers a new `StandardGauge`.

#### `GetOrRegisterGauge(name string, r Registry) Gauge`

This function returns an existing gauge or constructs and registers a new `StandardGauge`. It takes two parameters:

- `name` (string): The name of the gauge.
- `r` (Registry): The registry to use for the gauge.

### NewGauge Function

The `NewGauge` function constructs a new `StandardGauge`.

#### `NewGauge() Gauge`

This function constructs a new `StandardGauge`.

### NewRegisteredGauge Function

The `NewRegisteredGauge` function constructs and registers a new `StandardGauge`.

#### `NewRegisteredGauge(name string, r Registry) Gauge`

This function constructs and registers a new `StandardGauge`. It takes two parameters:

- `name` (string): The name of the gauge.
- `r` (Registry): The registry to use for the gauge.

### NewFunctionalGauge Function

The `NewFunctionalGauge` function constructs a new `FunctionalGauge`.

#### `NewFunctionalGauge(f func() int64) Gauge`

This function constructs a new `FunctionalGauge`. It takes one parameter:

- `f` (func() int64): The function to use for the gauge's value.

### NewRegisteredFunctionalGauge Function

The `NewRegisteredFunctionalGauge` function constructs and registers a new `FunctionalGauge`.

#### `NewRegisteredFunctionalGauge(name string, r Registry, f func() int64) Gauge`

This function constructs and registers a new `FunctionalGauge`. It takes three parameters:

- `name` (string): The name of the gauge.
- `r` (Registry): The registry to use for the gauge.
- `f` (func() int64): The function to use for the gauge's value.

### GaugeSnapshot Type

The `GaugeSnapshot` type is a read-only copy of another gauge.

#### `type GaugeSnapshot int64`

This type is a read-only copy of another gauge.

### NilGauge Type

The `NilGauge` type is a no-op gauge.

#### `type NilGauge struct{}`

This type is a no-op gauge.

### StandardGauge Type

The `StandardGauge` type is the standard implementation of a gauge and uses the `sync/atomic` package to manage a single `int64` value.

#### `type StandardGauge struct{ value int64 }`

This type is the standard implementation of a gauge and uses the `sync/atomic` package to manage a single `int64` value.

### FunctionalGauge Type

The `FunctionalGauge` type returns a value from a given function.

#### `type FunctionalGauge struct{ value func() int64 }`

This type returns a value from a given function.

### Example Usage

Here's an example of how you could use the `Gauge` interface in your Go code:

```go
import (
    "fmt"
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new gauge
    gauge := metrics.NewRegisteredGauge("my_gauge", nil)

    // Update the gauge's value
    gauge.Update(42)

    // Get the gauge's current value
    value := gauge.Value()
    fmt.Println("Gauge value:", value)

    // Decrement the gauge's current value
    gauge.Dec(10)

    // Get the gauge's current value
    value = gauge.Value()
    fmt.Println("Gauge value:", value)

    // Increment the gauge's current value
    gauge.Inc(5)

    // Get the gauge's current value
    value = gauge.Value()
    fmt.Println("Gauge value:", value)

    // Create a new functional gauge