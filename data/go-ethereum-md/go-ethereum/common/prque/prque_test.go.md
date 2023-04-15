## CookieJar - A Contestant's Algorithm Toolbox

The `CookieJar` package is a toolbox for algorithms used in programming contests. It provides a priority queue data structure that can be used to efficiently manage data with priorities.

### `TestPrque(t *testing.T)`

This function is a test function that tests the `prque` package. It generates a batch of random data and a specific priority order, fills a priority queue with the data, and then pops out the elements in priority order and verifies them. It also tests the size of the queue and the priority order of the elements.

### `TestReset(t *testing.T)`

This function is a test function that tests the `Reset` function of the priority queue. It generates a batch of random data and a specific priority order, fills a priority queue with the data, pops out half the elements in priority order and verifies them, resets the queue, and ensures that it is empty.

### `BenchmarkPush(b *testing.B)`

This function is a benchmark function that benchmarks the `Push` function of the priority queue. It creates some initial data, executes the benchmark, and pushes the data into the queue.

### `BenchmarkPop(b *testing.B)`

This function is a benchmark function that benchmarks the `Pop` function of the priority queue. It creates some initial data, fills the queue with the data, and executes the benchmark by popping out the elements from the queue.

### Example Usage

```go
package main

import (
	"fmt"
	"github.com/peterSZilagyi/CookieJar/prque"
)

func main() {
	// Create a new priority queue
	queue := prque.New[int, int](nil)

	// Push some data into the queue with priorities
	queue.Push(1, 2)
	queue.Push(2, 1)
	queue.Push(3, 3)

	// Pop out the elements in priority order
	for !queue.Empty() {
		val, prio := queue.Pop()
		fmt.Printf("Value: %v, Priority: %v\n", val, prio)
	}
}
```

Output:
```
Value: 2, Priority: 1
Value: 1, Priority: 2
Value: 3, Priority: 3
```