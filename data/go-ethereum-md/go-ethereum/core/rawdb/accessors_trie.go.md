o write account trie node to database", "err", err)
	}
}

// DeleteAccountTrieNode deletes the account trie node with the specified node path
// from the database.
func DeleteAccountTrieNode(db ethdb.KeyValueWriter, path []byte) {
	if err := db.Delete(accountTrieNodeKey(path)); err != nil {
		log.Crit("Failed to delete account trie node from database", "err", err)
	}
}

// accountTrieNodeKey returns the database key for the account trie node with the
// specified node path.
func accountTrieNodeKey(path []byte) []byte {
	return append([]byte("a"), path...)
}

// ReadStorageTrieNode retrieves the storage trie node and the associated node
// hash with the specified node path.
func ReadStorageTrieNode(db ethdb.KeyValueReader, path []byte) ([]byte, common.Hash) {
	data, err := db.Get(storageTrieNodeKey(path))
	if err != nil {
		return nil, common.Hash{}
	}
	hasher := newNodeHasher()
	defer returnHasherToPool(hasher)
	return data, hasher.hashData(data)
}

// HasStorageTrieNode checks the storage trie node presence with the specified
// node path and the associated node hash.
func HasStorageTrieNode(db ethdb.KeyValueReader, path []byte, hash common.Hash) bool {
	data, err := db.Get(storageTrieNodeKey(path))
	if err != nil {
		return false
	}
	hasher := newNodeHasher()
	defer returnHasherToPool(hasher)
	return hasher.hashData(data) == hash Sure, I can help you with that. Here's the documentation for the source code you provided:

## Account and Storage Trie Node Functions

### `ReadAccountTrieNode(db ethdb.KeyValueReader, path []byte) ([]byte, common.Hash)`

`ReadAccountTrieNode` retrieves the account trie node and the associated node hash with the specified node path.

#### Parameters

- `db` - the database to read from.
- `path` - the path of the account trie node.

#### Return Values

- `[]byte` - the account trie node.
- `common.Hash` - the associated node hash.

### `HasAccountTrieNode(db ethdb.KeyValueReader, path []byte, hash common.Hash) bool`

`HasAccountTrieNode` checks the account trie node presence with the provided node path and the associated node hash.

#### Parameters

- `db` - the database to read from.
- `path` - the path of the account trie node.
- `hash` - the associated node hash.

#### Return Values

- `bool` - `true` if the account trie node is present, `false` otherwise.

### `WriteAccountTrieNode(db ethdb.KeyValueWriter, path []byte, node []byte)`

`WriteAccountTrieNode` writes the provided account trie node into the database.

#### Parameters

- `db` - the database to write to.
- `path` - the The code snippet provided contains three functions: `ReadTrieNode`, `WriteTrieNode`, and `DeleteTrieNode`. These functions are used to read, write, and delete trie nodes from a database based on different lookup schemes.

The `ReadTrieNode` function takes in a database instance, a hash or path, an owner (if applicable), and a scheme. It then reads the trie node from the database based on the provided scheme and returns the node data or nil if the node hash does not match the provided hash.

The `WriteTrieNode` function takes in a database instance, a hash or path, an owner (if applicable), the node data, and a scheme. It then writes the trie node into the database based on the provided scheme and associated node hash.

The `DeleteTrieNode` function takes in a database instance, a hash or path, an owner (if applicable), and a scheme. It then deletes the trie node from the database based on the provided scheme and associated node hash.

The `scheme` parameter in all three functions specifies the lookup scheme to be used. There are two possible schemes: `HashScheme` and `PathScheme`. The `HashScheme` is used to look up trie nodes based on their hash, while the `PathScheme` is used to look up trie nodes based on their owner and path.

If the `HashScheme` is used, the `ReadTrieNode`, `WriteTrieNode`, and `DeleteTrieNode` functions require only the hash parameter. If the `PathScheme` is used, the `ReadTrieNode`, `WriteTrieNode`, and `DeleteTrieNode` functions require both the owner and path parameters.

The `ReadTrieNode` function uses a switch statement to determine which type of trie node to read based on the provided scheme. If the `HashScheme` is used, it calls the `ReadLegacyTrieNode` function to read the legacy trie node from the database. If the `PathScheme` is used, it calls either the `ReadAccountTrieNode` or `ReadStorageTrieNode` function to read the account or storage trie node from the database, respectively. If the node hash does not match the provided hash, it returns nil.

The `WriteTrieNode` function uses a switch statement to determine which type of trie node to write based on the provided scheme. If the `HashScheme` is used, it calls the `WriteLegacyTrieNode` function to write the legacy trie node to the database. If the `PathScheme` is used, it calls either the `WriteAccountTrieNode` or `WriteStorageTrieNode` function to write the account or storage trie node to the database, respectively.

The `DeleteTrieNode` function uses a switch statement to determine which type of trie node to delete based on the provided scheme. If the `HashScheme` is used, it calls the `DeleteLegacyTrieNode` function to delete the legacy trie node from the database. If the `PathScheme` is used, it calls either the `DeleteAccountTrieNode` or `DeleteStorageTrieNode` function to delete the account or storage trie node from the database, respectively.

Overall, these functions provide a flexible and efficient way to read, write, and delete trie nodes from a database based on different lookup schemes.