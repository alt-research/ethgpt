## expDecaySampleHeap Package

The `expDecaySampleHeap` package provides functionality for calculating exponential decay sample heap.

### Functions

#### `up(j int)`

This function is used to move the element at index `j` up the heap until it is in the correct position. It takes one parameter:

- `j` (int): The index of the element to move up.

#### `down(i, n int)`

This function is used to move the element at index `i` down the heap until it is in the correct position. It takes two parameters:

- `i` (int): The index of the element to move down.
- `n` (int): The number of elements in the heap.

#### `Len() int`

This function is used to return the length of the `int64Slice`. It takes no parameters.

#### `Less(i, j int) bool`

This function is used to compare the elements at index `i` and `j` of the `int64Slice`. It takes two parameters:

- `i` (int): The index of the first element to compare.
- `j` (int): The index of the second element to compare.

#### `Swap(i, j int)`

This function is used to swap the elements at index `i` and `j` of the `int64Slice`. It takes two parameters:

- `i` (int): The index of the first element to swap.
- `j` (int): The index of the second element to swap.

### Example Usage

Here's an example of how you could use the `expDecaySampleHeap` package in your Go code:

```go
import (
    "container/heap"
    "math/rand"
    "sort"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano())

    // Create a new expDecaySampleHeap
    h := &expDecaySampleHeap{
        s: make([]*entry, 0, 10),
    }

    // Add some random values to the heap
    for i := 0; i < 10; i++ {
        heap.Push(h, &entry{
            value: rand.Int63n(100),
            priority: rand.Float64(),
        })
    }

    // Sort the values in the heap
    sort.Sort(int64Slice(h.Values()))

    // Print the values in the heap
    for _, e := range h.Values() {
        fmt.Printf("%d (%f)\n", e.value, e.priority)
    }
}
```

In this example, we import the `container/heap`, `math/rand`, and `sort` packages, as well as the `time` package for seeding the random number generator. We create a new `expDecaySampleHeap` and add some random values to it using the `Push` function. We then sort the values in the heap using the `Values` function and the `sort.Sort` function. Finally, we print the values in the heap using a `for` loop and the `fmt.Printf` function.