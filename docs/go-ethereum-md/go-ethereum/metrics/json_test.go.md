Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for working with metrics in Go.

### Functions

#### `TestRegistryMarshallJSON(t *testing.T)`

This function is used to test the `NewRegistry` function by marshalling the registry to JSON and checking the output. It takes one parameter:

- `t` (*testing.T): The testing object.

#### `TestRegistryWriteJSONOnce(t *testing.T)`

This function is used to test the `WriteJSONOnce` function by writing the registry to JSON and checking the output. It takes one parameter:

- `t` (*testing.T): The testing object.

### Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"

    "github.com/your-username/metrics"
)

func main() {
    // Create a new registry
    r := metrics.NewRegistry()

    // Register a new counter
    c := metrics.NewCounter()
    r.Register("my_counter", c)

    // Increment the counter
    c.Inc(1)

    // Write the registry to JSON
    b := &bytes.Buffer{}
    metrics.WriteJSONOnce(r, b)

    // Print the JSON output
    var out bytes.Buffer
    json.Indent(&out, b.Bytes(), "", "  ")
    fmt.Println(out.String())
}
```

In this example, we create a new registry and register a new counter. We then increment the counter and write the registry to JSON using the `WriteJSONOnce` function provided by the `metrics` package. Finally, we print the JSON output to the console.