# LRU Cache

The LRU (Least Recently Used) cache is a data structure that stores a limited number of items and evicts the least recently used item when the cache is full. This implementation of the LRU cache is a size-constrained cache that evicts the least recently used item when the total size of the items in the cache exceeds a given limit.

## Package: lru

The `lru` package provides an implementation of the LRU cache.

### Function: NewSizeConstrainedCache

The `NewSizeConstrainedCache` function creates a new size-constrained cache with the given size limit.

##### Parameters

- `size uint64`: An unsigned integer representing the size limit of the cache.

##### Returns

- `*Cache`: A pointer to a new size-constrained cache.

##### Example

```go
lru := NewSizeConstrainedCache[testKey, []byte](100)
```

### Type: testKey

The `testKey` type is an 8-byte array used as a key in the cache.

### Function: mkKey

The `mkKey` function creates a new `testKey` with the given integer value.

##### Parameters

- `i int`: An integer representing the value of the key.

##### Returns

- `testKey`: A new `testKey` with the given value.

##### Example

```go
k := mkKey(i)
```

### Function: TestSizeConstrainedCache

The `TestSizeConstrainedCache` function tests the size-constrained cache by adding 11 items of 10 bytes each and verifying that the first item is evicted and the remaining 10 items are present.

##### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

##### Example

```go
func TestSizeConstrainedCache(t *testing.T) {
    // ...
}
```

### Function: TestSizeConstrainedCacheOverflow

The `TestSizeConstrainedCacheOverflow` function tests the size-constrained cache by adding 10 items of 10 bytes each, filling the cache, and then adding a single large item that exceeds the cache size. The function verifies that all 10 small items are evicted and the large item is present.

##### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

##### Example

```go
func TestSizeConstrainedCacheOverflow(t *testing.T) {
    // ...
}
```

### Function: TestSizeConstrainedCacheSameItem

The `TestSizeConstrainedCacheSameItem` function tests the size-constrained cache by adding the same key-value pair multiple times and verifying that the cache size is accurate.

##### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

##### Example

```go
func TestSizeConstrainedCacheSameItem(t *testing.T) {
    // ...
}
```

### Function: TestSizeConstrainedCacheEmpties

The `TestSizeConstrainedCacheEmpties` function tests the size-constrained cache by adding empty and nil values and verifying that the cache size is accurate.

##### Parameters

- `t *testing.T`: A pointer to a `testing.T` instance.

##### Example

```go
func TestSizeConstrainedCacheEmpties(t *testing.T) {
    // ...
}
``` ## Function: TestLRU

The `TestLRU` function tests the LRU cache implementation. It creates an LRU cache with a maximum size of 100 bytes and adds 10 values to it. It then checks that the size of the cache is 0, which is expected since the cache is intentionally overloaded with different-keyed 0-length values. It then retrieves 10 values from the cache, checking that the expected values are present and that the unexpected values are not present.

### Parameters

- `t *testing.T`: A `*testing.T` instance.

### Example

```go
func TestLRU(t *testing.T) {
	lru := NewLRU(100)

	for i := 0; i < 10; i++ {
		lru.Add(testKey{byte(i)}, []byte{byte(i)})
	}

	// The size of the cache should be 0, since we are not counting the keys
	// count, only the values count. So this could be a DoS
	// since it basically has no cap, and it is intentionally overloaded with
	// different-keyed 0-length values.
	if have, want := lru.size, uint64(0); have != want {
		t.Fatalf("size wrong, have %d want %d", have, want)
	}

	for i := 0; i < 10; i++ {
		if v, ok := lru.Get(testKey{byte(i)}); !ok {
			t.Fatalf("test %d: expected presence", i)
		} else if v == nil {
			t.Fatalf("test %d, v is nil", i)
		}

		if v, ok := lru.Get(testKey{byte(255 - i)}); !ok {
			t.Fatalf("test %d: expected presence", i)
		} else if v != nil {
			t.Fatalf("test %d, v is not nil", i)
		}
	}
}
```