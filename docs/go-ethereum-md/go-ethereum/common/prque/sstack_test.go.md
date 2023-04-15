## CookieJar - A Contestant's Algorithm Toolbox

The `CookieJar` package is a toolbox for contestants in algorithmic competitions. It is dual licensed under a BSD license and a signed written agreement between the user and the author(s).

### Package `prque`

The `prque` package provides a priority queue implementation. It imports the `math/rand` and `sort` packages for testing purposes.

#### Function `TestSstack`

```go
func TestSstack(t *testing.T)
```

The `TestSstack` function tests the `Sstack` type, which is a stack implementation that supports sorting. It creates some initial data, pushes all the data into the stack, and pops out every second element. It then verifies that the contents of the resulting slices are correct.

#### Function `TestSstackSort`

```go
func TestSstackSort(t *testing.T)
```

The `TestSstackSort` function tests the sorting functionality of the `Sstack` type. It creates some initial data, pushes all the data into the stack, sorts the stack, and pops out the contents of the stack in reverse order. It then verifies that the contents of the resulting slices are correct.

#### Function `TestSstackReset`

```go
func TestSstackReset(t *testing.T)
```

The `TestSstackReset` function tests the reset functionality of the `Sstack` type. It creates some initial data, pushes all the data into the stack, and pops out every second element. It then resets the stack and verifies that the stack is empty. Finally, it verifies that the contents of the pulled elements are correct.