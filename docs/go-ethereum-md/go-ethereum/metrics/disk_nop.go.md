## Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

### `ReadDiskStats()` Function

The `ReadDiskStats()` function retrieves the disk IO stats belonging to the current process. It takes one parameter:

- `stats` (*DiskStats): A pointer to a `DiskStats` struct that will be populated with the disk IO stats.

If the function is called on a non-Linux system, it will return an error indicating that it is not implemented.

### Example Usage

Here's an example of how you could use the `ReadDiskStats()` function in your Go code:

```go
package main

import (
    "fmt"

    "github.com/myusername/mymodule/metrics"
)

func main() {
    // Create a new DiskStats struct
    stats := &metrics.DiskStats{}

    // Read the disk IO stats
    err := metrics.ReadDiskStats(stats)
    if err != nil {
        fmt.Println("Error reading disk stats:", err)
        return
    }

    // Print the disk IO stats
    fmt.Println("Disk stats:", stats)
}
```

Note that if you are not running this code on a Linux system, the `ReadDiskStats()` function will return an error indicating that it is not implemented.