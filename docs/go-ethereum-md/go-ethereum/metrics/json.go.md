Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for working with metrics in Go.

### Functions

#### `MarshalJSON() ([]byte, error)`

The `MarshalJSON` function returns a byte slice containing a JSON representation of all the metrics in the `StandardRegistry`.

#### `WriteJSON(r Registry, d time.Duration, w io.Writer)`

The `WriteJSON` function writes metrics from the given registry periodically to the specified `io.Writer` as JSON. It takes in three parameters:

- `r`: The registry to write metrics from.
- `d`: The duration between writes.
- `w`: The `io.Writer` to write the JSON to.

#### `WriteJSONOnce(r Registry, w io.Writer)`

The `WriteJSONOnce` function writes metrics from the given registry to the specified `io.Writer` as JSON. It takes in two parameters:

- `r`: The registry to write metrics from.
- `w`: The `io.Writer` to write the JSON to.

#### `MarshalJSON() ([]byte, error)`

The `MarshalJSON` function returns a byte slice containing a JSON representation of all the metrics in the `PrefixedRegistry`.

### Example Usage

Here's an example of how you could use the `WriteJSON` function in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
    "os"
    "time"
)

func main() {
    r := metrics.NewRegistry()
    c := metrics.NewCounter()
    r.Register("mycounter", c)

    go metrics.WriteJSON(r, time.Second*10, os.Stdout)

    for {
        c.Inc(1)
        time.Sleep(time.Second)
    }
}
```

This code creates a new registry, registers a counter with it, and then starts writing the metrics to standard output every 10 seconds using the `WriteJSON` function. The counter is incremented every second in an infinite loop.