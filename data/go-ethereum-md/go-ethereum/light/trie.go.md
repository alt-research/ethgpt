## Documentation for the Light Codebase

### Function: NewState

```go
func NewState(ctx context.Context, head *types.Header, odr OdrBackend) *state.StateDB {
	state, _ := state.New(head.Root, NewStateDatabase(ctx, head, odr), nil)
	return state
}
```

The `NewState` function creates a new state database with the given context, header, and OdrBackend. It creates a new state database using the `state.New` function and returns it.

### Function: NewStateDatabase

```go
func NewStateDatabase(ctx context.Context, head *types.Header, odr OdrBackend) state.Database {
	return &odrDatabase{ctx, StateTrieID(head), odr}
}
```

The `NewStateDatabase` function creates a new state database with the given context, header, and OdrBackend. It creates a new `odrDatabase` struct with the context, trie ID, and OdrBackend and returns it.

### Type: odrDatabase

```go
type odrDatabase struct {
	ctx     context.Context
	id      *TrieID
	backend OdrBackend
}
```

The `odrDatabase` type is a struct that represents an ODR database. It contains a context, trie ID, and OdrBackend.

### Function: OpenTrie

```go
func (db *odrDatabase) OpenTrie(root common.Hash) (state.Trie, error) {
	return &odrTrie{db: db, id: db.id}, nil
}
```

The `OpenTrie` function opens a new trie with the given root hash. It creates a new `odrTrie` struct with the database and trie ID and returns it.

### Function: OpenStorageTrie

```go
func (db *odrDatabase) OpenStorageTrie(state, addrHash, root common.Hash) (state.Trie, error) {
	return &odrTrie{db: db, id: StorageTrieID(db.id, addrHash, root)}, nil
}
```

The `OpenStorageTrie` function opens a new storage trie with the given state, address hash, and root hash. It creates a new `odrTrie` struct with the database and trie ID and returns it.

### Function: CopyTrie

```go
func (db *odrDatabase) CopyTrie(t state.Trie) state.Trie {
	switch t := t.(type) {
	case *odrTrie:
		cpy := &odrTrie{db: t.db, id: t.id}
		if t.trie != nil {
			cpy.trie = t.trie.Copy()
		}
		return cpy
	default:
		panic(fmt.Errorf("unknown trie type %T", t))
	}
}
```

The `CopyTrie` function creates a copy of the given trie. It creates a new `odrTrie` struct with the same database and trie ID and returns it.

### Function: ContractCode

```go
func (db *odrDatabase) ContractCode(addrHash, codeHash common.Hash) ([]byte, error) {
	if codeHash == sha3Nil {
		return nil, nil
	}
	code := rawdb.ReadCode(db.backend.Database(), codeHash)
	if len(code) != 0 {
		return code, nil
	}
	id := *db.id
	id.AccKey = addrHash[:]
	req := &CodeRequest{Id: &id, Hash: codeHash}
	err := db.backend.Retrieve(db.ctx, req)
	return req.Data, err
}
```

The `ContractCode` function retrieves the code for a contract with the given address hash and code hash. It first checks if the code is already in the database and returns it if it is. If not, it creates a new `CodeRequest` with the trie ID and code hash and retrieves the code from the OdrBackend.

### Function: ContractCodeSize

```go
func (db *odrDatabase) ContractCodeSize(addrHash, codeHash common.Hash) (int, error) {
	code, err := db.ContractCode(addrHash, codeHash)
	return len(code), err
}
```

The `ContractCodeSize` function retrieves the size of the code for a contract with the given address hash and code hash. It calls the `ContractCode` function to retrieve the code and returns its ## Documentation for the ODR Trie Codebase

### Function: UpdateAccount

```go
func (t *odrTrie) UpdateAccount(acc *types.Account) error {
	key := crypto.Keccak256(acc.Address.Bytes())
	value, err := rlp.EncodeToBytes(acc)
	if err != nil {
		return fmt.Errorf("decoding error in account update: %w", err)
	}
	return t.do(key, func() error {
		return t.trie.TryUpdate(key, value)
	})
}
```

The `UpdateAccount` function is a method that updates an account in the trie. It takes an account as an argument, encodes it using RLP, and updates the trie with the encoded value.

### Function: UpdateStorage

```go
func (t *odrTrie) UpdateStorage(_ common.Address, key, value []byte) error {
	key = crypto.Keccak256(key)
	return t.do(key, func() error {
		return t.trie.TryUpdate(key, value)
	})
}
```

The `UpdateStorage` function is a method that updates a storage value in the trie. It takes a key and a value as arguments, hashes the key using Keccak256, and updates the trie with the hashed key and the value.

### Function: DeleteStorage

```go
func (t *odrTrie) DeleteStorage(_ common.Address, key []byte) error {
	key = crypto.Keccak256(key)
	return t.do(key, func() error {
		return t.trie.TryDelete(key)
	})
}
```

The `DeleteStorage` function is a method that deletes a storage value from the trie. It takes a key as an argument, hashes the key using Keccak256, and deletes the hashed key from the trie.

### Function: DeleteAccount

```go
func (t *odrTrie) DeleteAccount(address common.Address) error {
	key := crypto.Keccak256(address.Bytes())
	return t.do(key, func() error {
		return t.trie.TryDelete(key)
	})
}
```

The `DeleteAccount` function is a method that deletes an account from the trie. It takes an address as an argument, hashes the address using Keccak256, and deletes the hashed address from the trie.

### Function: Commit

```go
func (t *odrTrie) Commit(collectLeaf bool) (common.Hash, *trie.NodeSet) {
	if t.trie == nil {
		return t.id.Root, nil
	}
	return t.trie.Commit(collectLeaf)
}
```

The `Commit` function is a method that commits the trie to the database. It takes a boolean value indicating whether to collect leaf nodes and returns the root hash and a set of nodes that were modified during the commit.

### Function: Hash

```go
func (t *odrTrie) Hash() common.Hash {
	if t.trie == nil {
		return t.id.Root
	}
	return t.trie.Hash()
}
```

The `Hash` function is a method that returns the hash of the trie. It takes no arguments and returns the hash of the trie.

### Function: NodeIterator

```go
func (t *odrTrie) NodeIterator(startkey []byte) trie.NodeIterator {
	return newNodeIterator(t, startkey)
}
```

The `NodeIterator` function is a method that returns a new node iterator for the trie. It takes a start key as an argument and returns a new node iterator.

### Function: GetKey

```go
func (t *odrTrie) GetKey(sha []byte) []byte {
	return nil
}
```

The `GetKey` function is a method that returns the key for a given SHA hash. It takes a SHA hash as an argument and returns nil.

### Function: Prove

```go
func (t *odrTrie) Prove(key []byte, fromLevel uint, proofDb ethdb.KeyValueWriter) error {
	return errors.New("not implemented, needs client/server interface split")
}
```

The `Prove` function is a method that proves the existence of a key in the trie. It takes ## Documentation for the Byte Conversion Code

### Function: nibbleToByte

```go
func nibbleToByte(nib []byte) []byte {
	if len(nib) > 0 && nib[len(nib)-1] == 0x10 {
		nib = nib[:len(nib)-1] // drop terminator
	}
	if len(nib)&1 == 1 {
		nib = append(nib, 0) // make even
	}
	key := make([]byte, len(nib)/2)
	for bi, ni := 0, 0; ni < len(nib); bi, ni = bi+1, ni+2 {
		key[bi] = nib[ni]<<4 | nib[ni+1]
	}
	return key
}
```

The `nibbleToByte` function converts a slice of nibbles to a slice of bytes. It takes a slice of nibbles as an argument and returns a slice of bytes. It drops the terminator byte if it is present and makes the slice even by appending a 0 byte if necessary. It then creates a new slice of bytes with half the length of the nibble slice and converts each pair of nibbles to a byte using bitwise operations.