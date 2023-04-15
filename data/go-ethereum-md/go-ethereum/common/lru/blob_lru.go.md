# SizeConstrainedCache

The `SizeConstrainedCache` struct is a cache where capacity is in bytes (instead of item count). When the cache is at capacity, and a new item is added, older items are evicted until the size constraint is met. This cache assumes that items are content-addressed: keys are unique per content. In other words, two `Add(..)` with the same key `K`, will always have the same value `V`.

## Fields

- `size uint64`: An unsigned integer representing the current size of the cache in bytes.
- `maxSize uint64`: An unsigned integer representing the maximum size of the cache in bytes.
- `lru BasicLRU[K, V]`: A `BasicLRU` instance representing the underlying LRU cache.
- `lock sync.Mutex`: A `sync.Mutex` instance for locking the cache during read and write operations.

## Methods

### Function: NewSizeConstrainedCache

The `NewSizeConstrainedCache` function creates a new size-constrained LRU cache.

#### Parameters

- `maxSize uint64`: An unsigned integer representing the maximum size of the cache in bytes.

#### Returns

- `*SizeConstrainedCache[K, V]`: A pointer to a new `SizeConstrainedCache` instance.

#### Example

```go
cache := NewSizeConstrainedCache[string, []byte](1024)
```

### Method: Add

The `Add` method adds a value to the cache. It returns true if an eviction occurred. The value is _not_ copied on Add, so the caller must not modify it afterwards.

#### Parameters

- `key K`: A key of type `K` representing the content address.
- `value V`: A value of type `V` representing the content.

#### Returns

- `evicted bool`: A boolean indicating if an eviction occurred.

#### Example

```go
evicted := cache.Add("key", []byte("value"))
```

### Method: Get

The `Get` method looks up a key's value from the cache.

#### Parameters

- `key K`: A key of type `K` representing the content address.

#### Returns

- `value V`: A value of type `V` representing the content.
- `ok bool`: A boolean indicating if the key was found in the cache.

#### Example

```go
value, ok := cache.Get("key")
```