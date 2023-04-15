Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## CPUStats Struct

The `CPUStats` struct defines the system and process CPU stats. All values are in seconds.

### Fields

#### `GlobalTime` (float64)

This field represents the time spent by the CPU working on all processes.

#### `GlobalWait` (float64)

This field represents the time spent by waiting on disk for all processes.

#### `LocalTime` (float64)

This field represents the time spent by the CPU working on this process.

### Example Usage

Here's an example of how you could use the `CPUStats` struct in your Go code:

```go
import (
    "fmt"
    "github.com/ethereum/go-ethereum/metrics"
)

func main() {
    // Get the CPU stats
    stats := metrics.CPUStats{
        GlobalTime: 10.5,
        GlobalWait: 2.3,
        LocalTime:  1.2,
    }

    // Print the CPU stats
    fmt.Println("Global time:", stats.GlobalTime)
    fmt.Println("Global wait:", stats.GlobalWait)
    fmt.Println("Local time:", stats.LocalTime)
}
```

In this example, we create a new `CPUStats` struct and set its fields to some example values. We then print the values of the fields using `fmt.Println()`.