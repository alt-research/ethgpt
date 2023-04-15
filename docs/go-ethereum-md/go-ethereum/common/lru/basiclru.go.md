# LRU Cache Implementation in Go

This is an implementation of a Least Recently Used (LRU) cache in Go. The LRU cache is a data structure that stores a limited number of items and evicts the least recently used item when the cache is full. The implementation is generic and can be used with any type of key and value.

## Package: lru

The `lru` package implements the LRU cache.

### Struct: BasicLRU

The `BasicLRU` struct is a simple LRU cache. It is not safe for concurrent use. The zero value is not valid, instances must be created using `NewCache`.

#### Fields

- `list *list[K]`: A pointer to a doubly linked list of cache items.
- `items map[K]cacheItem[K, V]`: A map of cache items.
- `cap int`: An integer representing the maximum number of items the cache can hold.

#### Methods

##### Function: NewBasicLRU

The `NewBasicLRU` function creates a new LRU cache.

###### Parameters

- `capacity int`: An integer representing the maximum number of items the cache can hold.

###### Returns

- `BasicLRU[K, V]`: A new instance of the `BasicLRU` struct.

##### Method: Add

The `Add` method adds a value to the cache. It returns true if an item was evicted to store the new item.

###### Parameters

- `key K`: A key of type `K`.
- `value V`: A value of type `V`.

###### Returns

- `bool`: A boolean indicating if an item was evicted to store the new item.

##### Method: Contains

The `Contains` method reports whether the given key exists in the cache.

###### Parameters

- `key K`: A key of type `K`.

###### Returns

- `bool`: A boolean indicating if the key exists in the cache.

##### Method: Get

The `Get` method retrieves a value from the cache. This marks the key as recently used.

###### Parameters

- `key K`: A key of type `K`.

###### Returns

- `value V`: A value of type `V`.
- `ok bool`: A boolean indicating if the key exists in the cache.

##### Method: GetOldest

The `GetOldest` method retrieves the least-recently-used item. Note that this does not update the item's recency.

###### Returns

- `key K`: A key of type `K`.
- `value V`: A value of type `V`.
- `ok bool`: A boolean indicating if the cache is not empty.

##### Method: Len

The `Len` method returns the current number of items in the cache.

###### Returns

- `int`: An integer representing the number of items in the cache.

##### Method: Peek

The `Peek` method retrieves a value from the cache, but does not mark the key as recently used.

###### Parameters

- `key K`: A key of type `K`.

###### Returns

- `value V`: A value of type `V`.
- `ok bool`: A boolean indicating if the key exists in the cache.

##### Method: Purge

The `Purge` method empties the cache.

##### Method: Remove

The `Remove` method drops an item from the cache. It returns true if the key was present in cache.

###### Parameters

- `key K`: A key of type `K`.

###### Returns

- `bool`: A boolean indicating if the key was present in cache.

##### Method: RemoveOldest

The `RemoveOldest` method drops the least recently used item.

###### Returns

- `key K`: A key of type `K`.
- `value V`: A value of type `V`.
- `ok bool`: A boolean indicating if the cache is not empty.

### Struct: cacheItem

The `cacheItem` struct represents an item in the cache.

#### Fields

- `elem *listElem[K]`: A pointer to a doubly linked list element.
- `value V`: A value of type `V`.

### Function: NewCache

The `NewCache` function creates a new LRU cache.

#### Parameters

- `capacity int`: An integer representing the maximum number of items the cache can hold.

#### Returns

- `*BasicLRU[K, V]`: A pointer to a new instance of the `BasicLRU` struct.

## Conclusion

This implementation of an LRU cache in Go provides a simple and efficient way to store a limited number of items and evict the least recently used item when the cache is full. The implementation is generic and can be used with any type of key and value. # BasicLRU Cache

The `BasicLRU` cache is a simple implementation of a Least Recently Used (LRU) cache. It is a fixed-size cache that evicts the least recently used item when the cache is full. The cache is implemented using a hash table and a doubly-linked list.

## Struct: BasicLRU

The `BasicLRU` struct represents the LRU cache. It provides methods for adding, getting, and removing items from the cache, as well as getting all keys in the cache.

### Fields

- `size int`: An integer representing the maximum number of items the cache can hold.
- `items map[K]*listElem[he[K, V]]`: A hash table holding the items in the cache.
- `list *list[he[K, V]]`: A doubly-linked list holding the items in the cache.

### Methods

#### Method: NewBasicLRU

The `NewBasicLRU` method creates a new `BasicLRU` cache with the specified size.

##### Parameters

- `size int`: An integer representing the maximum number of items the cache can hold.

##### Returns

- `*BasicLRU[K, V]`: A pointer to the new `BasicLRU` cache.

##### Example

```go
cache := NewBasicLRU(100)
```

#### Method: Add

The `Add` method adds an item to the cache. If the cache is full, the least recently used item is evicted.

##### Parameters

- `key K`: The key of the item to add.
- `value V`: The value of the item to add.

##### Returns

- `bool`: A boolean indicating if the item was added to the cache or not.

##### Example

```go
cache.Add("key", "value")
```

#### Method: Get

The `Get` method gets the value of an item from the cache.

##### Parameters

- `key K`: The key of the item to get.

##### Returns

- `V`: The value of the item.
- `bool`: A boolean indicating if the item was found in the cache or not.

##### Example

```go
value, found := cache.Get("key")
```

#### Method: Remove

The `Remove` method removes an item from the cache.

##### Parameters

- `key K`: The key of the item to remove.

##### Returns

- `K`: The key of the removed item.
- `V`: The value of the removed item.
- `bool`: A boolean indicating if the item was removed from the cache or not.

##### Example

```go
key, value, removed := cache.Remove("key")
```

#### Method: Keys

The `Keys` method gets all keys in the cache.

##### Returns

- `[]K`: A slice of all keys in the cache.

##### Example

```go
keys := cache.Keys()
```

## Struct: list

The `list` struct is a doubly-linked list holding items of type `he`.

### Fields

- `root listElem[T]`: A `listElem` struct representing the root of the list.

### Methods

#### Function: newList

The `newList` function creates a new `list`.

##### Returns

- `*list[T]`: A pointer to the new `list`.

##### Example

```go
l := newList[he[string, int]]()
```

#### Method: init

The `init` method reinitializes the list, making it empty.

##### Example

```go
l.init()
```

#### Method: pushElem

The `pushElem` method adds an element to the front of the list.

##### Parameters

- `e *listElem[T]`: A pointer to the `listElem` struct to add.

##### Example

```go
l.pushElem(&listElem{v: "value"})
```

#### Method: moveToFront

The `moveToFront` method makes a node the head of the list.

##### Parameters

- `e *listElem[T]`: A pointer to the `listElem` struct to move to the front.

##### Example

```go
l.moveToFront(elem)
```

#### Method: remove

The `remove` method removes an element from the list.

##### Parameters

- `e *listElem[T]`: A pointer to the `listElem` struct to remove.

##### Example

```go
l.remove(elem)
```

#### Method: removeLast

The `removeLast` method removes the last element of the list.

##### Returns

- `*listElem[T]`: A pointer to the `listElem` struct that was removed, or `nil` if the list is empty.

##### Example

```go
last := l.removeLast()
```

#### Method: last

The `last` method gets the last element of the list.

##### Returns

- `*listElem[T]`: A pointer to the `listElem` struct that is the last element of the list, or `nil` if the list is empty.

##### Example

```go
last := l.last()
```

#### Method: appendTo

The `appendTo` method appends all list elements to a slice.

##### Parameters

- `slice []T`: A slice to append the list elements to.

##### Returns

- `[]T`: A slice containing all list elements.

##### Example

```go
slice := l.appendTo([]string{})
```