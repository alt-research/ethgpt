Sure, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides a way to register and manage metrics in a registry.

### DuplicateMetric

`DuplicateMetric` is the error returned by `Registry.Register` when a metric already exists. If you mean to register that metric you must first unregister the existing metric.

### Registry Interface

`Registry` is an interface that holds references to a set of metrics by name and can iterate over them, calling callback functions provided by the user.

#### `Each(func(string, interface{}))`

`Each` calls the given function for each registered metric.

#### `Get(string) interface{}`

`Get` gets the metric by the given name or nil if none is registered.

#### `GetAll() map[string]map[string]interface{}`

`GetAll` gets all metrics in the registry.

#### `GetOrRegister(string, interface{}) interface{}`

`GetOrRegister` gets an existing metric or registers the given one. The interface can be the metric to register if not found in registry, or a function returning the metric for lazy instantiation.

#### `Register(string, interface{}) error`

`Register` registers the given metric under the given name. Returns a `DuplicateMetric` if a metric by the given name is already registered.

#### `RunHealthchecks()`

`RunHealthchecks` runs all registered healthchecks.

#### `Unregister(string)`

`Unregister` unregisters the metric with the given name.

#### `UnregisterAll()`

`UnregisterAll` unregisters all metrics. Mostly for testing.

### StandardRegistry

`StandardRegistry` is the standard implementation of a `Registry`, which is a mutex-protected map of names to metrics.

#### `NewRegistry() Registry`

`NewRegistry` creates a new registry.

#### `Each(func(string, interface{}))`

`Each` calls the given function for each registered metric.

#### `Get(string) interface{}`

`Get` gets the metric by the given name or nil if none is registered.

#### `GetOrRegister(string, interface{}) interface{}`

`GetOrRegister` gets an existing metric or creates and registers a new one. Threadsafe alternative to calling `Get` and `Register` on failure. The interface can be the metric to register if not found in registry, or a function returning the metric for lazy instantiation.

#### `Register(string, interface{}) error`

`Register` registers the given metric under the given name. Returns a `DuplicateMetric` if a metric by the given name is already registered.

#### `RunHealthchecks()`

`RunHealthchecks` runs all registered healthchecks.

#### `GetAll() map[string]map[string]interface{}`

`GetAll` gets all metrics in the registry.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
import (
    "fmt"
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Register a counter metric
    counter := metrics.NewCounter()
    registry.Register("my_counter", counter)

    // Increment the counter
    counter.Inc(1)

    // Get the counter from the registry
    myCounter := registry.Get("my_counter").(metrics.Counter)

    // Print the count of the counter
    fmt.Println("Count:", myCounter.Count())

    // Unregister the counter
    registry.Unregister("my_counter")
}
```

In this example, we create a new registry using `metrics.NewRegistry()`. We then register a counter metric using `registry.Register("my_counter", counter)`, increment the counter using `counter.Inc(1)`, and get the counter from the registry using `registry.Get("my_counter").(metrics.Counter)`. We print the count of the counter using `myCounter.Count()` and unregister the counter using `registry.Unregister("my_counter")`. Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Registry Interface

The `Metrics Registry` interface defines several functions that can be used to register, unregister, and get metrics.

### Functions

#### `NewRegistry() Registry`

This function is used to create a new metrics registry.

#### `NewPrefixedRegistry(prefix string) Registry`

This function is used to create a new metrics registry with a given prefix.

#### `NewPrefixedChildRegistry(parent Registry, prefix string) Registry`

This function is used to create a new child metrics registry with a given parent and prefix.

#### `Each(fn func(string, interface{}))`

This function is used to call the given function for each registered metric. It takes one parameter:

- `fn` (func(string, interface{})): The function to call for each registered metric.

#### `Get(name string) interface{}`

This function is used to get the metric by the given name or nil if none is registered. It takes one parameter:

- `name` (string): The name of the metric to get.

#### `GetOrRegister(name string, i interface{}) interface{}`

This function is used to get an existing metric or registers the given one. It takes two parameters:

- `name` (string): The name of the metric to get or register.
- `i` (interface{}): The metric to register if it does not already exist.

#### `Register(name string, i interface{}) error`

This function is used to register a metric with the given name. It takes two parameters:

- `name` (string): The name of the metric to register.
- `i` (interface{}): The metric to register.

#### `Unregister(name string)`

This function is used to unregister the metric with the given name. It takes one parameter:

- `name` (string): The name of the metric to unregister.

#### `UnregisterAll()`

This function is used to unregister all metrics. It is mostly used for testing.

### Example Usage

Here's an example of how you could use the `Metrics Registry` interface in your Go code:

```go
import (
    "fmt"
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new registry
    registry := metrics.NewRegistry()

    // Register a counter metric
    counter := metrics.NewCounter()
    metrics.Register("my_counter", counter)

    // Increment the counter
    counter.Inc(1)

    // Get the counter metric
    myCounter := metrics.Get("my_counter").(metrics.Counter)
    fmt.Println("Counter value:", myCounter.Count())

    // Unregister the counter metric
    metrics.Unregister("my_counter")
}
```

In this example, we create a new registry and register a counter metric with the name "my_counter". We then increment the counter and get its value using the `Get` function. Finally, we unregister the counter metric using the `Unregister` function. Sure, I'd be happy to help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Registry Interface

The `Registry` interface defines several functions that can be used to interact with a registry of metrics.

### Functions

#### `Get(name string) interface{}`

This function is used to get the metric with the given name. It takes one parameter:

- `name` (string): The name of the metric to get.

#### `GetOrRegister(name string, metric interface{}) interface{}`

This function is used to get the metric with the given name, or register it if it doesn't exist. It takes two parameters:

- `name` (string): The name of the metric to get or register.
- `metric` (interface{}): The metric to register if it doesn't exist.

#### `Register(name string, metric interface{}) error`

This function is used to register the given metric under the given name. It takes two parameters:

- `name` (string): The name of the metric to register.
- `metric` (interface{}): The metric to register.

#### `RunHealthchecks()`

This function is used to run all registered healthchecks.

#### `Unregister(name string)`

This function is used to unregister the metric with the given name. It takes one parameter:

- `name` (string): The name of the metric to unregister.

### Example Usage

Here's an example of how you could use the `Registry` interface in your Go code:

```go
import (
    "fmt"

    "github.com/rcrowley/go-metrics"
)

func main() {
    // Register a counter metric
    counter := metrics.NewCounter()
    metrics.Register("mycounter", counter)

    // Increment the counter
    counter.Inc(1)

    // Get the counter metric
    metric := metrics.Get("mycounter")
    if counter, ok := metric.(metrics.Counter); ok {
        fmt.Println("Counter value:", counter.Count())
    }

    // Unregister the counter metric
    metrics.Unregister("mycounter")
}
```

In this example, we create a new counter metric and register it using the `Register` function. We then increment the counter and get the metric using the `Get` function. We check that the metric is actually a counter using a type assertion, and print its value. Finally, we unregister the counter metric using the `Unregister` function.