# LRU Cache

The LRU Cache is a data structure that stores a limited number of items and evicts the least recently used item when the cache is full. This implementation of the LRU Cache is thread-safe and uses a mutex to synchronize access to the cache.

## Struct: Cache

The `Cache` struct is a thread-safe implementation of the LRU Cache. It uses a `BasicLRU` struct to store the cache items and a `sync.Mutex` to synchronize access to the cache.

### Fields

- `cache BasicLRU[K, V]`: A `BasicLRU` struct to store the cache items.
- `mu sync.Mutex`: A `sync.Mutex` to synchronize access to the cache.

### Methods

#### Function: NewCache

The `NewCache` function creates a new `Cache` struct with the specified capacity.

##### Parameters

- `capacity int`: An integer representing the maximum number of items the cache can hold.

##### Returns

- `*Cache[K, V]`: A pointer to the new `Cache` struct.

##### Example

```go
cache := NewCache[int, string](100)
```

#### Method: Add

The `Add` method adds a key-value pair to the cache. If the cache is full, the least recently used item is evicted to make room for the new item.

##### Parameters

- `key K`: A key of type `K` to add to the cache.
- `value V`: A value of type `V` to add to the cache.

##### Returns

- `evicted bool`: A boolean indicating whether an item was evicted to store the new item.

##### Example

```go
evicted := cache.Add(1, "one")
```

#### Method: Contains

The `Contains` method checks if a key exists in the cache.

##### Parameters

- `key K`: A key of type `K` to check for in the cache.

##### Returns

- `bool`: A boolean indicating whether the key exists in the cache.

##### Example

```go
contains := cache.Contains(1)
```

#### Method: Get

The `Get` method retrieves a value from the cache and marks the key as recently used.

##### Parameters

- `key K`: A key of type `K` to retrieve from the cache.

##### Returns

- `value V`: A value of type `V` retrieved from the cache.
- `ok bool`: A boolean indicating whether the key exists in the cache.

##### Example

```go
value, ok := cache.Get(1)
```

#### Method: Len

The `Len` method returns the current number of items in the cache.

##### Returns

- `int`: An integer representing the number of items in the cache.

##### Example

```go
length := cache.Len()
```

#### Method: Peek

The `Peek` method retrieves a value from the cache without marking the key as recently used.

##### Parameters

- `key K`: A key of type `K` to retrieve from the cache.

##### Returns

- `value V`: A value of type `V` retrieved from the cache.
- `ok bool`: A boolean indicating whether the key exists in the cache.

##### Example

```go
value, ok := cache.Peek(1)
```

#### Method: Purge

The `Purge` method empties the cache.

##### Example

```go
cache.Purge()
```

#### Method: Remove

The `Remove` method removes a key-value pair from the cache.

##### Parameters

- `key K`: A key of type `K` to remove from the cache.

##### Returns

- `bool`: A boolean indicating whether the key was present in the cache.

##### Example

```go
removed := cache.Remove(1)
```

#### Method: Keys

The `Keys` method returns all keys of items currently in the LRU.

##### Returns

- `[]K`: A slice of keys of type `K` currently in the LRU.

##### Example

```go
keys := cache.Keys()
```