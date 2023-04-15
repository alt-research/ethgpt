# go-ethereum Library

This file is part of the go-ethereum library. The go-ethereum library is free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

## metrics Package

The `metrics` package provides a set of functions for collecting and reporting metrics.

### Functions

#### `getProcessCPUTime() float64`

The `getProcessCPUTime` function retrieves the process' CPU time since program startup. It returns a float64 value representing the CPU time in seconds.

### Example Usage

Here's an example of how you could use the `getProcessCPUTime` function in your Go code:

```go
import (
    "github.com/ethereum/go-ethereum/metrics"
)

func main() {
    cpuTime := metrics.getProcessCPUTime()
    fmt.Printf("Process CPU time: %f seconds\n", cpuTime)
}
``` 

## Build Constraints

This file is only built for non-Windows and non-JavaScript platforms. The build constraint is specified as follows:

```go
//go:build !windows && !js
// +build !windows,!js
``` 

## Dependencies

This file imports the following packages:

- `golang.org/x/sys/unix`
- `github.com/ethereum/go-ethereum/log`

## License

This file is licensed under the GNU Lesser General Public License. For more information, see <http://www.gnu.org/licenses/>.