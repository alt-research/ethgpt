Sure, let's go through this code and document each function. Here's an example of how we can document a function in Markdown format:

```
## Function Name

Description of what the function does.

### Parameters

- `param1`: Description of the first parameter.
- `param2`: Description of the second parameter.

### Returns

Description of what the function returns.

### Example

```go
funcName(param1, param2)
```
```

We can use this format to document each function in the codebase. Let's start with the first block of code you provided:

```
// expHeap tracks strings and their expiry time.
type expHeap []expItem

// expItem is an entry in addrHistory.
type expItem struct {
	item string
	exp  mclock.AbsTime
}

// nextExpiry returns the next expiry time.
func (h *expHeap) nextExpiry() mclock.AbsTime {
	return (*h)[0].exp
}

// add adds an item and sets its expiry time.
func (h *expHeap) add(item string, exp mclock.AbsTime) {
	heap.Push(h, expItem{item, exp})
}

// contains checks whether an item is present.
func (h expHeap) contains(item string) bool {
	for _, v := range h {
		if v.item == item {
			return true
		}
	}
	return false
}

// expire removes items with expiry time before 'now'.
func (h *expHeap) expire(now mclock.AbsTime, onExp func(string)) {
	for h.Len() > 0 && h.nextExpiry() < now {
		item := heap.Pop(h)
		if onExp != nil {
			onExp(item.(expItem).item)
		}
	}
}

// heap.Interface boiler