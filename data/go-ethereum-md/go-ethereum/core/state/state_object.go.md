The `state` package provides functionality for managing the state of the Ethereum blockchain. The `stateObject` type represents an Ethereum account that is being modified. The usage pattern is as follows: first, you need to obtain a state object. Account values can be accessed and modified through the object. Finally, call `commitTrie` to write the modified storage trie into a database.

The `Code` type is a byte slice that represents the bytecode of a contract. The `String` method returns a string representation of the bytecode.

The `Storage` type is a map that represents the storage of an Ethereum account. The `String` method returns a string representation of the storage. The `Copy` method returns a copy of the storage.

The `newObject` function creates a new state object with the given address and state account data.

The `empty` method returns whether the account is considered empty.

The `EncodeRLP` method encodes the state object into RLP format.

The `markSuicided` method marks the state object as suicided, which means it will be deleted from the trie during the "update" phase of the state transition.

The `touch` method updates the state object's last access time. The `append` function appends a `touchChange` struct to the journal of the `s.db` object. The `touchChange` struct contains the address of the account that was touched.

If the address of the account is equal to the `ripemd` hash, the account is explicitly put in the dirty-cache. The dirty-cache is a cache of accounts that have been modified and need to be written to the database.

The `getTrie` function retrieves the associated storage trie for the state object. If the trie is not loaded previously, it will be opened. If the trie can't be loaded, an error will be returned.

The `GetState` function retrieves a value from the account storage trie. If there is a dirty value for this state entry, it returns it. Otherwise, it returns the entry's original value.

The `GetCommittedState` function retrieves a value from the committed account storage trie. If there is a pending write or clean cached, it returns that. If the object was destructed in this block, the storage has been cleared out, and it should not consult the previous database about any storage values. If no live objects are available, it attempts to use snapshots. If the snapshot is unavailable or reading from it fails, it loads from the database.

The `SetState` function updates a value in account storage. If the new value is the same as the old, it doesn't set it. If the new value is different, it updates and journals the change.

The `setState` function sets the value of a key in the dirty storage.

The `finalise` function moves all dirty storage slots into the pending area to be written to the database. The code provided contains four functions that are part of the Ethereum Virtual Machine (EVM) implementation. These functions are used to manage the state of an Ethereum account.

The `finalise` function is used to commit the changes made to the storage of an account. It takes a boolean parameter `prefetch` that indicates whether the trie nodes should be prefetched or not. The function first copies all the dirty storage slots to the pending storage area. It then checks if the `prefetch` flag is set and if there are any slots to prefetch. If both conditions are true, it calls the `prefetch` function of the database's prefetcher object. Finally, if there are any dirty storage slots, the function clears the dirty storage map.

The `updateTrie` function is used to write the cached storage modifications into the object's storage trie. It takes a database object as a parameter and returns a trie object and an error. The function first calls the `finalise` function to make sure all dirty slots are finalized into the pending storage area. If there are no pending storage updates, the function returns the current trie object. Otherwise, the function retrieves the trie object from the database and inserts all the pending updates into the trie. It also tracks the amount of time wasted on updating the storage trie. If state snapshotting is active, the function caches the data until commit. Finally, the function returns the trie object and nil if there are no errors.

The `updateRoot` function is used to set the trie root to the current root hash of an account. It takes a database object as a parameter and returns nothing. The function first calls the `updateTrie` function to get the trie object. If there are any errors, the function returns. If nothing has changed, the function returns. Otherwise, the function tracks the amount of time wasted on hashing the storage trie and sets the trie root to the current root hash.

The `commitTrie` function is used to submit the storage changes into the storage trie and re-computes the root. It returns a nodeset containing all trie changes. The function first calls the `updateTrie` function to get the trie object. If there are any errors, the function returns nil. Otherwise, the function submits the storage changes into the storage trie and re-computes the root. Finally, the function returns a nodeset containing all trie changes. ## commitTrie

This function is a method of the `stateObject` struct. It commits the changes made to the storage trie of the state object to the database. It returns a set of nodes that were modified during the commit.

### Parameters

- `db`: A `Database` object representing the database to which the changes are committed.

### Behavior

1. Calls the `updateTrie` method of the `stateObject` to update the trie with the changes made to the storage.
2. If there were no changes made to the trie, returns `nil`.
3. Commits the trie to the database and returns the set of modified nodes.

## AddBalance

This function is a method of the `stateObject` struct. It adds the specified amount to the balance of the state object. It is used to add funds to the destination account of a transfer.

### Parameters

- `amount`: A `*big.Int` representing the amount to be added to the balance.

### Behavior

1. If the amount to be added is zero, checks if the state object is empty and touches it if it is.
2. Otherwise, adds the specified amount to the balance of the state object.

## SubBalance

This function is a method of the `stateObject` struct. It subtracts the specified amount from the balance of the state object. It is used to remove funds from the origin account of a transfer.

### Parameters

- `amount`: A `*big.Int` representing the amount to be subtracted from the balance.

### Behavior

1. If the amount to be subtracted is zero, returns.
2. Otherwise, subtracts the specified amount from the balance of the state object.

## SetBalance

This function is a method of the `stateObject` struct. It sets the balance of the state object to the specified amount.

### Parameters

- `amount`: A `*big.Int` representing the amount to which the balance is to be set.

### Behavior

1. Appends a `balanceChange` struct to the journal of the state object, representing the change in balance.
2. Sets the balance of the state object to the specified amount.

## deepCopy

This function is a method of the `stateObject` struct. It creates a deep copy of the state object.

### Parameters

- `db`: A `*StateDB` object representing the state database.

### Behavior

1. Creates a new `stateObject` with the same address and data as the original state object.
2. Copies the trie, code, and storage of the original state object to the new state object.
3. Copies the dirty storage, origin storage, and pending storage of the original state object to the new state object.
4. Copies the `suicided`, `dirtyCode`, and `deleted` flags of the original state object to the new state object.
5. Returns the new state object.

## Address

This function is a method of the `stateObject` struct. It returns the address of the contract/account associated with the state object.

### Behavior

1. Returns the address of the state object.

## Code

This function is a method of the `stateObject` struct. It returns the code associated with the state object.

### Parameters

- `db`: A `Database` object representing the database from which the code is retrieved.

### Behavior

1. If the code is already cached in the state object, returns the cached code.
2. If the code hash is equal to the empty code hash, returns `nil`.
3. Otherwise, retrieves the code from the database using the code hash and caches it in the state object.
4. If there was an error retrieving the code, sets an error in the state object and returns `nil`.
5. Returns the retrieved code.

## CodeSize

This function is a method of the `stateObject` struct. It returns the size of the code associated with the state object.

### Parameters

- `db`: A `Database` object representing the database from which the code size is retrieved.

### Behavior

1. If the code is already cached in the state object, returns the size of the cached code.
2. If the code hash is equal to the empty code hash, returns `0`.
3. Otherwise, retrieves the code size from the database using the code hash and caches it in the state object.
4. If there was an error retrieving the code size, sets an error in the state object and returns `0`.
5. Returns the retrieved code size.

## SetCode

This function is a method of the `stateObject` struct. It sets the code associated with the state object to the specified code.

### Parameters

- `codeHash`: A `common.Hash` representing the hash of the code.
- `code`: A `[]byte` representing the code.

### Behavior

1. Appends a `codeChange` struct to the journal of the state object, representing the change in code.
2. Sets the code hash and code of the state object to the specified values.

## SetNonce

This function is a method of the `stateObject` struct. It sets the nonce of the state object to the specified value.

### Parameters

- `nonce`: A ## CodeHash

The `CodeHash` function is a method of the `stateObject` struct. It returns the code hash of the state object.

### Return Value

- `[]byte`: The code hash of the state object.

### Example

```go
so := &stateObject{data: &stateObjectData{CodeHash: []byte("hash")}}
codeHash := so.CodeHash() // codeHash == []byte("hash")
```

## Balance

The `Balance` function is a method of the `stateObject` struct. It returns the balance of the state object.

### Return Value

- `*big.Int`: The balance of the state object.

### Example

```go
so := &stateObject{data: &stateObjectData{Balance: big.NewInt(100)}}
balance := so.Balance() // balance == big.NewInt(100)
```

## Nonce

The `Nonce` function is a method of the `stateObject` struct. It returns the nonce of the state object.

### Return Value

- `uint64`: The nonce of the state object.

### Example

```go
so := &stateObject{data: &stateObjectData{Nonce: 1}}
nonce := so.Nonce() // nonce == 1
```