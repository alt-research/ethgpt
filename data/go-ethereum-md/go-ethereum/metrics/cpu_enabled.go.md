# Metrics Package

The `metrics` package provides functionality for collecting and reporting metrics.

## `ReadCPUStats(stats *CPUStats)`

The `ReadCPUStats` function retrieves the current CPU stats and updates the given `CPUStats` struct. It takes one parameter:

- `stats` (*CPUStats): A pointer to the `CPUStats` struct to update.

## Example Usage

Here's an example of how you could use the `metrics` package in your Go code:

```go
package main

import (
    "fmt"

    "github.com/myusername/mymodule/metrics"
)

func main() {
    // Create a new CPUStats struct
    stats := &metrics.CPUStats{}

    // Read the current CPU stats
    metrics.ReadCPUStats(stats)

    // Print the CPU stats
    fmt.Printf("GlobalTime: %f\n", stats.GlobalTime)
    fmt.Printf("GlobalWait: %f\n", stats.GlobalWait)
    fmt.Printf("LocalTime: %f\n", stats.LocalTime)
}
```

Note that the `ReadCPUStats` function requires the `github.com/ethereum/go-ethereum/log` and `github.com/shirou/gopsutil/cpu` packages to be imported.