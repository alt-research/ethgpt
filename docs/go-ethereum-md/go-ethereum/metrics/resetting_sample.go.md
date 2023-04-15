Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### ResettingSample Function

The `ResettingSample` function converts an ordinary sample into one that resets whenever its snapshot is retrieved. This is useful for ensuring that low-frequency events don't skew the charts indefinitely. It takes one parameter:

- `sample` (Sample): The sample to convert.

### resettingSample Type

The `resettingSample` type is a simple wrapper around a sample that resets it upon the snapshot retrieval.

#### Snapshot Function

The `Snapshot` function returns a read-only copy of the sample with the original reset.

### Example Usage

Here's an example of how you could use the `ResettingSample` function in your Go code:

```go
import (
    "github.com/rcrowley/go-metrics"
)

func main() {
    // Create a new sample
    sample := metrics.NewUniformSample(1024)

    // Convert the sample to a resetting sample
    resettingSample := metrics.ResettingSample(sample)

    // Add some values to the sample
    resettingSample.Update(1)
    resettingSample.Update(2)
    resettingSample.Update(3)

    // Get a snapshot of the sample
    snapshot := resettingSample.Snapshot()

    // The sample should now be reset
    resettingSample.Update(4)

    // Print the values in the snapshot
    for _, value := range snapshot.Values() {
        fmt.Println(value)
    }
}
```

In this example, we create a new sample using the `NewUniformSample` function provided by the `metrics` package. We then convert the sample to a resetting sample using the `ResettingSample` function and add some values to it. We get a snapshot of the sample using the `Snapshot` function and print the values in the snapshot. Finally, we add another value to the sample to demonstrate that it has been reset.