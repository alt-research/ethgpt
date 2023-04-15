# CookieJar - A Contestant's Algorithm Toolbox

CookieJar is a toolbox for algorithms that is dual licensed. It can be used under the terms of a BSD license found in the LICENSE file or in accordance with the terms and conditions of a signed written agreement between the user and the author(s).

## Prque Package

This package is a slightly modified version of "gopkg.in/karalabe/cookiejar.v2/collections/prque". It contains an internal sortable stack data structure that implements the Push and Pop operations for the stack (heap) functionality and the Len, Less, and Swap methods for the sortability requirements of the heaps.

### Constants

#### blockSize

The size of a block of data. It is set to 4096.

### Types

#### item

A prioritized item in the sorted stack. It has two fields:

- `value`: the value of the item
- `priority`: the priority of the item

#### SetIndexCallback

`SetIndexCallback` is called when the element is moved to a new index. Providing `SetIndexCallback` is optional, it is needed only if the application needs to delete elements other than the top one. It has one parameter:

- `data`: the data to be moved
- `index`: the new index of the data

#### sstack

`sstack` is the internal sortable stack data structure. It has the following fields:

- `setIndex`: a `SetIndexCallback` function
- `size`: the size of the stack
- `capacity`: the capacity of the stack
- `offset`: the offset of the stack
- `blocks`: a slice of slices of `*item[P, V]`
- `active`: a slice of `*item[P, V]`

`sstack` has the following methods:

#### newSstack

`newSstack` creates a new, empty stack. It has one parameter:

- `setIndex`: a `SetIndexCallback` function

#### Push

`Push` pushes a value onto the stack, expanding it if necessary. It is required by heap.Interface. It has one parameter:

- `data`: the data to be pushed onto the stack

#### Pop

`Pop` pops a value off the stack and returns it. Currently, no shrinking is done. It is required by heap.Interface.

#### Len

`Len` returns the length of the stack. It is required by sort.Interface.

#### Less

`Less` compares the priority of two elements of the stack (higher is first). It is required by sort.Interface.

#### Swap

`Swap` swaps two elements in the stack. It is required by sort.Interface.

#### Reset

`Reset` resets the stack, effectively clearing its contents.

## Example Usage

```go
package main

import (
    "fmt"
    "github.com/example/prque"
)

func main() {
    // Create a new stack
    stack := prque.NewSstack(nil)

    // Push some items onto the stack
    stack.Push(&prque.Item{value: "foo", priority: 1})
    stack.Push(&prque.Item{value: "bar", priority: 2})
    stack.Push(&prque.Item{value: "baz", priority: 3})

    // Pop the top item off the stack
    item := stack.Pop().(*prque.Item)
    fmt.Println(item.value) // Output: baz

    // Reset the stack
    stack.Reset()
}
```