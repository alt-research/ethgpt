Sure, I'd be happy to help you with that. Let's start by going through the code and documenting the `TestExpHeap` function. Here's an example of how we can document a function in Markdown format:

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

We can use this format to document the `TestExpHeap` function in the codebase. Here's the documentation for the `TestExpHeap` function:

```
## TestExpHeap

Tests the expHeap data structure.

### Parameters

- `t`: A pointer to the testing.T struct.

### Returns

None.

### Example

```go
func TestExpHeap(t *testing.T) {
	var h expHeap

	var (
		basetime = mclock.AbsTime(10)
		exptimeA = basetime.Add(2 * time.Second)
		exptimeB = basetime.Add(3 * time.Second)
		exptimeC = basetime.Add(4 * time.Second)
	)
	h.add("b", exptimeB)
	h.add("a", exptimeA)
	h.add("c", exptimeC)

	if h.nextExpiry() != exptimeA {
		t.Fatal("wrong nextExpiry")
	}
	if !h.contains("a") || !h.contains("b") || !h.contains("c") {
		t.Fatal("heap doesn't contain all live items")
	}

	h.expire(exptimeA.Add(1), nil)
	if h.nextExpiry() != exptimeB {
		t.Fatal("wrong nextExpiry")
	}
	if h.contains("a") {
		t.Fatal("heap contains a even though it has already expired")
	}
	if !h.contains("b") || !h.contains("c") {
		t.Fatal("heap doesn't contain all live items")
	}
}
```

Let me know if you have any questions or if you'd like me to continue with the rest of the codebase.