## Documentation for the Light Package

### Type: NodeSet

```go
type NodeSet struct {
	nodes map[string][]byte
	order []string

	dataSize int
	lock     sync.RWMutex
}
```

The `NodeSet` type is a struct that stores a set of trie nodes. It implements the `trie.Database` interface and can also act as a cache for another `trie.Database`. It has a map of nodes, an order slice, a data size, and a lock.

### Function: NewNodeSet

```go
func NewNodeSet() *NodeSet {
	return &NodeSet{
		nodes: make(map[string][]byte),
	}
}
```

The `NewNodeSet` function creates an empty node set.

### Function: Put

```go
func (db *NodeSet) Put(key []byte, value []byte) error {
	db.lock.Lock()
	defer db.lock.Unlock()

	if _, ok := db.nodes[string(key)]; ok {
		return nil
	}
	keystr := string(key)

	db.nodes[keystr] = common.CopyBytes(value)
	db.order = append(db.order, keystr)
	db.dataSize += len(value)

	return nil
}
```

The `Put` function stores a new node in the set. It takes a key and a value as arguments. If the key already exists in the set, it returns nil. Otherwise, it adds the key and value to the map, appends the key to the order slice, and updates the data size.

### Function: Delete

```go
func (db *NodeSet) Delete(key []byte) error {
	db.lock.Lock()
	defer db.lock.Unlock()

	delete(db.nodes, string(key))
	return nil
}
```

The `Delete` function removes a node from the set. It takes a key as an argument and deletes the corresponding entry from the map.

### Function: Get

```go
func (db *NodeSet) Get(key []byte) ([]byte, error) {
	db.lock.RLock()
	defer db.lock.RUnlock()

	if entry, ok := db.nodes[string(key)]; ok {
		return entry, nil
	}
	return nil, errors.New("not found")
}
```

The `Get` function returns a stored node. It takes a key as an argument and returns the corresponding value if it exists in the map. Otherwise, it returns an error.

### Function: Has

```go
func (db *NodeSet) Has(key []byte) (bool, error) {
	_, err := db.Get(key)
	return err == nil, nil
}
```

The `Has` function returns true if the node set contains the given key. It takes a key as an argument and returns true if the corresponding value exists in the map. Otherwise, it returns false.

### Function: KeyCount

```go
func (db *NodeSet) KeyCount() int {
	db.lock.RLock()
	defer db.lock.RUnlock()

	return len(db.nodes)
}
```

The `KeyCount` function returns the number of nodes in the set. It returns the length of the map.

### Function: DataSize

```go
func (db *NodeSet) DataSize() int {
	db.lock.RLock()
	defer db.lock.RUnlock()

	return db.dataSize
}
```

The `DataSize` function returns the aggregated data size of nodes in the set. It returns the data size of the set.

### Function: NodeList

```go
func (db *NodeSet) NodeList() NodeList {
	db.lock.RLock()
	defer db.lock.RUnlock()

	var values NodeList
	for _, key := range db.order {
		values = append(values, db.nodes[key])
	}
	return values
}
```

The `NodeList` function converts the node set to a `NodeList`. It returns a `NodeList` containing the values of the map in the order specified by the order slice.

### Function: Store

```go
func (db *NodeSet) Store(target ethdb.KeyValueWriter) {
	db.lock.RLock()
	defer db.lock.RUnlock()

	for key, value := range db.nodes {
		target.Put([]byte(key), value)
	}
}
```

The `Store` function writes the contents of the set to the given database. It takes a `KeyValueWriter` as an argument and writes each key-value pair in the map to the database.

### Type: NodeList

```go
type NodeList []rlp.RawValue
```

The `NodeList` type is a slice of `rlp.RawValue` that stores an ordered list of trie nodes. It implements `ethdb.KeyValueWriter`.

### Function: Store

```go
func (n NodeList) Store(db ethdb.KeyValueWriter) {
	for _, node := range n {
		db.Put(crypto.Keccak256(node), node)
	}
}
```

The `Store` function writes the contents of the list to the given database. It takes a `KeyValueWriter` as an argument and writes each node in the list to the database using its hash as ## Documentation for the NodeList Codebase

### Function: Delete

```go
func (n *NodeList) Delete(key []byte) error {
	panic("not supported")
}
```

The `Delete` function is a method that deletes a node with a given key from the list. It takes a key as an argument and panics with a "not supported" message because this function is not implemented.

### Function: DataSize

```go
func (n NodeList) DataSize() int {
	var size int
	for _, node := range n {
		size += len(node)
	}
	return size
}
```

The `DataSize` function is a method that returns the aggregated data size of nodes in the list. It iterates over the nodes in the list and adds up their lengths to calculate the total data size. It returns the total data size as an integer.