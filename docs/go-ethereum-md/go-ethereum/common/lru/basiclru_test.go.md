# LRU Cache Implementation in Go

This is an implementation of an LRU (Least Recently Used) cache in Go. The cache is implemented using a doubly linked list and a hash table. The doubly linked list is used to keep track of the order in which items were accessed, while the hash table is used to provide fast access to the items.

## BasicLRU

The `BasicLRU` type is a basic implementation of an LRU cache. It is a generic type that can be used to store any type of key-value pairs. The `BasicLRU` type is defined as follows:

```go
type BasicLRU[K comparable, V any] struct {
    // ...
}
```

### Fields

- `maxEntries int`: The maximum number of entries that the cache can hold.
- `onEvicted func(key K, value V)`: A function that is called when an item is evicted from the cache.
- `ll *list.List`: A doubly linked list that is used to keep track of the order in which items were accessed.
- `cache map[K]*list.Element`: A hash table that is used to provide fast access to the items.

### Methods

#### Function: NewBasicLRU

The `NewBasicLRU` function creates a new instance of the `BasicLRU` type.

##### Parameters

- `maxEntries int`: The maximum number of entries that the cache can hold.
- `onEvicted func(key K, value V)`: A function that is called when an item is evicted from the cache.

##### Returns

- `*BasicLRU[K, V]`: A pointer to a new instance of the `BasicLRU` type.

##### Example

```go
cache := NewBasicLRU[int, string](100, func(key int, value string) {
    fmt.Printf("Evicted: %d=%s\n", key, value)
})
```

#### Method: Add

The `Add` method adds a new item to the cache. If the cache is full, the least recently used item is evicted.

##### Parameters

- `key K`: The key of the item to add.
- `value V`: The value of the item to add.

##### Returns

- `bool`: `true` if an item was evicted, `false` otherwise.

##### Example

```go
cache.Add(1, "one")
```

#### Method: Get

The `Get` method retrieves an item from the cache.

##### Parameters

- `key K`: The key of the item to retrieve.

##### Returns

- `V`: The value of the item, or `nil` if the item is not in the cache.
- `bool`: `true` if the item is in the cache, `false` otherwise.

##### Example

```go
value, ok := cache.Get(1)
if ok {
    fmt.Printf("Value: %s\n", value)
}
```

#### Method: Peek

The `Peek` method retrieves an item from the cache without updating its access time.

##### Parameters

- `key K`: The key of the item to retrieve.

##### Returns

- `V`: The value of the item, or `nil` if the item is not in the cache.
- `bool`: `true` if the item is in the cache, `false` otherwise.

##### Example

```go
value, ok := cache.Peek(1)
if ok {
    fmt.Printf("Value: %s\n", value)
}
```

#### Method: Contains

The `Contains` method checks if an item is in the cache without updating its access time.

##### Parameters

- `key K`: The key of the item to check.

##### Returns

- `bool`: `true` if the item is in the cache, `false` otherwise.

##### Example

```go
if cache.Contains(1) {
    fmt.Println("Item is in cache")
}
```

#### Method: Remove

The `Remove` method removes an item from the cache.

##### Parameters

- `key K`: The key of the item to remove.

##### Returns

- `bool`: `true` if the item was removed, `false` otherwise.

##### Example

```go
if cache.Remove(1) {
    fmt.Println("Item removed from cache")
}
```

#### Method: Len

The `Len` method returns the number of items in the cache.

##### Returns

- `int`: The number of items in the cache.

##### Example

```go
fmt.Printf("Cache size: %d\n", cache.Len())
```

#### Method: Purge

The `Purge` method removes all items from the cache.

##### Example

```go
cache.Purge()
```

#### Method: Keys

The `Keys` method returns a slice of the keys in the cache, in the order in which they were accessed.

##### Returns

- `[]K`: A slice of the keys in the cache.

##### Example

```go
keys := cache.Keys()
for _, key := range keys {
    fmt.Printf("Key: %d\n", key)
}
```

#### Method: GetOldest

The `GetOldest` method returns the least recently used item in the cache.

##### Returns

- `K`: The key of the least recently used item.
- `V`: The value of the least recently used item.
- `bool`: `true` if the least recently used item is in the cache, `false` otherwise.

##### Example

```go
key, value, ok := cache.GetOldest()
if ok {
    fmt.Printf("Oldest item: %d=%s\n", key, value)
}
```

#### Method: RemoveOldest

The `RemoveOldest` method removes the least recently used item from the cache.

##### Returns

- `K`: The key of the least recently used item.
- `V`: The value of the least recently used item.
- `bool`: `true` if the least recently used item was removed, `false` otherwise.

##### Example

```go
key, value, ok := cache.RemoveOldest()
if ok {
    fmt.Printf("Removed oldest item: %d=%s\n", key, value)
}
```

## Testing

The `TestBasicLRU` function tests the basic functionality of the `BasicLRU` type. It adds 256 items to the cache, checks that the cache has the correct length, and checks that the least recently used items have been evicted.

The `TestBasicLRUAddExistingKey` function tests that adding an item with an existing key updates the value of the existing item.

The `TestBasicLRUGetOldest` function tests the `GetOldest` and `RemoveOldest` methods.

The `TestBasicLRUAddReturnValue` function tests that the `Add` method returns `true` if an item was evicted, and `false` otherwise.

The `TestBasicLRUContains` function tests that the `Contains` method does not change the order of items in the cache.

## Conclusion

This implementation of an LRU cache in Go provides a simple and efficient way to cache frequently accessed data. The `BasicLRU` type ## Package: lru

The `lru` package provides an implementation of a Least Recently Used (LRU) cache. The cache is implemented using a doubly linked list and a hash map. The package provides two implementations of the LRU cache: `BasicLRU` and `SyncLRU`.

### Struct: BasicLRU

The `BasicLRU` struct represents a basic implementation of the LRU cache. It provides methods for adding, getting, and removing items from the cache.

#### Method: NewBasicLRU

The `NewBasicLRU` method creates a new instance of the `BasicLRU` struct with the specified capacity.

##### Parameters

- `capacity int`: An integer representing the maximum number of items the cache can hold.

##### Returns

- `*BasicLRU`: A pointer to a new instance of the `BasicLRU` struct.

##### Example

```go
cache := NewBasicLRU[int, int](100)
```

#### Method: Add

The `Add` method adds a new item to the cache. If the cache is full, the least recently used item is removed.

##### Parameters

- `key K`: A key of type `K` representing the item to be added to the cache.
- `value V`: A value of type `V` representing the value of the item to be added to the cache.

##### Example

```go
cache.Add(1, "value")
```

#### Method: Get

The `Get` method gets the value of an item from the cache. If the item is not in the cache, the second return value is `false`.

##### Parameters

- `key K`: A key of type `K` representing the item to be retrieved from the cache.

##### Returns

- `V`: A value of type `V` representing the value of the item in the cache.
- `bool`: A boolean indicating whether the item was found in the cache.

##### Example

```go
value, ok := cache.Get(1)
```

#### Method: Remove

The `Remove` method removes an item from the cache.

##### Parameters

- `key K`: A key of type `K` representing the item to be removed from the cache.

##### Example

```go
cache.Remove(1)
```

### Struct: SyncLRU

The `SyncLRU` struct represents a synchronized implementation of the LRU cache. It provides methods for adding, getting, and removing items from the cache, and is safe for concurrent use.

#### Method: NewSyncLRU

The `NewSyncLRU` method creates a new instance of the `SyncLRU` struct with the specified capacity.

##### Parameters

- `capacity int`: An integer representing the maximum number of items the cache can hold.

##### Returns

- `*SyncLRU`: A pointer to a new instance of the `SyncLRU` struct.

##### Example

```go
cache := NewSyncLRU[int, int](100)
```

#### Method: Add

The `Add` method adds a new item to the cache. If the cache is full, the least recently used item is removed.

##### Parameters

- `key K`: A key of type `K` representing the item to be added to the cache.
- `value V`: A value of type `V` representing the value of the item to be added to the cache.

##### Example

```go
cache.Add(1, "value")
```

#### Method: Get

The `Get` method gets the value of an item from the cache. If the item is not in the cache, the second return value is `false`.

##### Parameters

- `key K`: A key of type `K` representing the item to be retrieved from the cache.

##### Returns

- `V`: A value of type `V` representing the value of the item in the cache.
- `bool`: A boolean indicating whether the item was found in the cache.

##### Example

```go
value, ok := cache.Get(1)
```

#### Method: Remove

The `Remove` method removes an item from the cache.

##### Parameters

- `key K`: A key of type `K` representing the item to be removed from the cache.

##### Example

```go
cache.Remove(1)
```

### Function: BenchmarkLRU

The `BenchmarkLRU` function benchmarks the `BasicLRU` and `SyncLRU` implementations of the LRU cache. It measures the time it takes to add and get items from the cache.

##### Example

```go
BenchmarkLRU(b *testing.B)
```