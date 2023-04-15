## Package state

The `state` package provides an implementation of the Ethereum state transition function. It is responsible for managing the state of the Ethereum blockchain, including account balances, nonces, and contract code.

### testAccount

`testAccount` is a struct that represents the data associated with an account used by the state tests. It contains the account's address, balance, nonce, and code.

### makeTestState

`makeTestState` is a function that creates a sample test state to test node-wise reconstruction. It creates an empty state, fills it with some arbitrary data, and returns the generated state.

### checkStateAccounts

`checkStateAccounts` is a function that cross-references a reconstructed state with an expected account array. It checks the root availability and state contents, and compares the balance, nonce, and code of each account in the reconstructed state with the expected account array.

### checkTrieConsistency

`checkTrieConsistency` is a function that checks that all nodes in a (sub-)trie are indeed present. It takes a database and a root hash as input, and returns an error if any node is missing.

Note: The code is licensed under the GNU Lesser General Public License. This codebase is a Go implementation of the Ethereum state sync algorithm. The algorithm is used to synchronize the state of a node with the state of the Ethereum network. The codebase contains several functions and tests that are used to implement and test the state sync algorithm.

The `checkStateConsistency` function checks that all data of a state root is present. It creates and iterates a state trie rooted in a sub-node. If the state root does not exist, it returns nil. Otherwise, it returns an error if the state trie cannot be created or if there is an error iterating the trie.

The `TestEmptyStateSync` function tests that an empty state is not scheduled for syncing. It creates a new trie database and a new state sync object with an empty root hash. It then checks that no content is requested for the empty state.

The `TestIterativeStateSyncIndividual`, `TestIterativeStateSyncBatched`, `TestIterativeStateSyncIndividualFromDisk`, `TestIterativeStateSyncBatchedFromDisk`, `TestIterativeStateSyncIndividualByPath`, and `TestIterativeStateSyncBatchedByPath` functions test that given a root hash, a state can sync iteratively on a single thread, requesting retrieval tasks and returning all of them in one go. These functions create a random state to copy, a destination state, and a state sync object. They then sync the destination state with the scheduler and check that the state is synced correctly.

The `stateElement` struct represents the element in the state trie (bytecode or trie node). The `testIterativeStateSync` function is a helper function that tests the iterative state sync algorithm. It creates a random state to copy, a destination state, and a state sync object. It then retrieves missing nodes and codes from the source state and adds them to the destination state. It continues to retrieve missing nodes and codes until all nodes and codes have been added to the destination state.

Here is an example of how you can document the `checkStateConsistency` function in Markdown format:

## checkStateConsistency

This function checks that all data of a state root is present.

### Parameters

- `db`: A database object used to retrieve the state trie.
- `root`: The root hash of the state trie.

### Return Value

- `nil` if the state root does not exist.
- An error if the state trie cannot be created or if there is an error iterating the trie.

### Example

```go
func checkStateConsistency(db ethdb.Database, root common.Hash) error {
	// Create and iterate a state trie rooted in a sub-node
	if _, err := db.Get(root.Bytes()); err != nil {
		return nil // Consider a non existent state consistent.
	}
	state, err := New(root, NewDatabase(db), nil)
	if err != nil {
		return err
	}
	it := NewNodeIterator(state)
	for it.Next() {
	}
	return it.Error
}
``` ## makeTestState

This function creates a random state to copy.

### Parameters

None.

### Returns

- `state`: A random state.
- `db`: A database object.
- `root`: The root hash of the state.
- `accounts`: A list of accounts in the state.

### Example

```go
func makeTestState() (state *state.StateDB, db *ethdb.MemDatabase, root common.Hash, accounts []common.Address) {
	db = ethdb.NewMemDatabase()
	state, _ = state.New(common.Hash{}, state.NewDatabase(db))
	accounts = make([]common.Address, 10)
	for i := range accounts {
		accounts[i] = common.BytesToAddress([]byte{byte(i)})
		state.CreateAccount(accounts[i])
		state.SetNonce(accounts[i], uint64(i))
		state.SetBalance(accounts[i], big.NewInt(int64(i)))
	}
	root, _ = state.Commit(false)
	return state, db, root, accounts
}
```

## TestIterativeStateSync

This function tests that the trie scheduler can correctly reconstruct the state.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a random state to copy.
2. Creates a destination state and syncs with the scheduler.
3. Schedules missing nodes and codes.
4. Processes half of the scheduled nodes and codes.
5. Commits the processed data to the destination database.
6. Schedules missing nodes and codes again.
7. Processes the remaining scheduled nodes and codes.
8. Commits the processed data to the destination database.
9. Checks that the two states are in sync.

### Example

```go
func TestIterativeStateSync(t *testing.T) {
	// Create a random state to copy
	_, srcDb, srcRoot, srcAccounts := makeTestState()

	// Create a destination state and sync with the scheduler
	dstDb := rawdb.NewMemoryDatabase()
	sched := NewStateSync(srcRoot, dstDb, nil, srcDb.TrieDB().Scheme())

	var (
		nodeElements []stateElement
		codeElements []stateElement
	)
	paths, nodes, codes := sched.Missing(0)
	for i := 0; i < len(paths); i++ {
		nodeElements = append(nodeElements, stateElement{
			path:     paths[i],
			hash:     nodes[i],
			syncPath: trie.NewSyncPath([]byte(paths[i])),
		})
	}
	for i := 0; i < len(codes); i++ {
		codeElements = append(codeElements, stateElement{
			code: codes[i],
		})
	}
	for len(nodeElements)+len(codeElements) > 0 {
		// Sync only half of the scheduled nodes
		var nodeProcessed int
		var codeProcessed int
		if len(codeElements) > 0 {
			codeResults := make([]trie.CodeSyncResult, len(codeElements)/2+1)
			for i, element := range codeElements[:len(codeResults)] {
				data, err := srcDb.ContractCode(common.Hash{}, element.code)
				if err != nil {
					t.Fatalf("failed to retrieve contract bytecode for %x", element.code)
				}
				codeResults[i] = trie.CodeSyncResult{Hash: element.code, Data: data}
			}
			for _, result := range codeResults {
				if err := sched.ProcessCode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
			codeProcessed = len(codeResults)
		}
		if len(nodeElements) > 0 {
			nodeResults := make([]trie.NodeSyncResult, len(nodeElements)/2+1)
			for i, element := range nodeElements[:len(nodeResults)] {
				data, err := srcDb.TrieDB().Node(element.hash)
				if err != nil {
					t.Fatalf("failed to retrieve node data for key %v", []byte(element.path))
				}
				nodeResults[i] = trie.NodeSyncResult{Path: element.syncPath, Data: data}
			}
			for _, result := range nodeResults {
				if err := sched.ProcessNode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
			nodeProcessed = len(nodeResults)
		}
		nodeElements = nodeElements[nodeProcessed:]
		codeElements = codeElements[codeProcessed:]
		batch := dstDb.NewBatch()
		if err := sched.Commit(batch); err != nil {
			t.Fatalf("failed to commit data: %v", err)
		}
		batch.Write()

		paths, nodes, codes = sched.Missing(0)
		nodeElements = append(nodeElements, makeStateElements(paths, nodes)...)
		codeElements = append(codeElements, makeStateElements(nil, codes)...)
	}
	// Cross check that the two states are The code is a test suite for the `StateSync` package. The `StateSync` package is used to synchronize the state of two Ethereum nodes. The test suite tests the functionality of the `StateSync` package with different types of states.

The `TestIterativeRandomStateSyncIndividual` and `TestIterativeRandomStateSyncBatched` functions test the `StateSync` package. They create a random state to copy and a destination state. They then synchronize the two states using the `StateSync` package with different synchronization methods. The functions test the functionality of the `StateSync` package by checking that the two states are in sync.

Here is an example of how you can document the `TestIterativeRandomStateSyncIndividual` function in Markdown format:

## TestIterativeRandomStateSyncIndividual

This function tests the `StateSync` package with an iterative random state synchronization method.

### Parameters

- `t`: A testing object used for reporting test failures.
- `count`: An integer representing the number of missing nodes to retrieve and process in each iteration.

### Behavior

1. Creates a random state to copy.
2. Creates a destination state.
3. Synchronizes the two states using the `StateSync` package with an iterative random state synchronization method.
4. Checks that the two states are in sync.

### Example

```go
func TestIterativeRandomStateSyncIndividual(t *testing.T) {
    // Create a random state to copy
    _, srcDb, srcRoot, srcAccounts := makeTestState()

    // Create a destination state and sync with the scheduler
    dstDb := rawdb.NewMemoryDatabase()
    sched := NewStateSync(srcRoot, dstDb, nil, srcDb.TrieDB().Scheme())

    nodeQueue := make(map[string]stateElement)
    codeQueue := make(map[common.Hash]struct{})
    paths, nodes, codes := sched.Missing(count)
    for i, path := range paths {
        nodeQueue[path] = stateElement{
            path:     path,
            hash:     nodes[i],
            syncPath: trie.NewSyncPath([]byte(path)),
        }
    }
    for _, hash := range codes {
        codeQueue[hash] = struct{}{}
    }
    for len(nodeQueue)+len(codeQueue) > 0 {
        // Fetch all the queued nodes in a random order
        if len(codeQueue) > 0 {
            results := make([]trie.CodeSyncResult, 0, len(codeQueue))
            for hash := range codeQueue {
                data, err := srcDb.ContractCode(common.Hash{}, hash)
                if err != nil {
                    t.Fatalf("failed to retrieve node data for %x", hash)
                }
                results = append(results, trie.CodeSyncResult{Hash: hash, Data: data})
            }
            for _, result := range results {
                if err := sched.ProcessCode(result); err != nil {
                    t.Fatalf("failed to process result %v", err)
                }
            }
        }
        if len(nodeQueue) > 0 {
            results := make([]trie.NodeSyncResult, 0, len(nodeQueue))
            for path, element := range nodeQueue {
                data, err := srcDb.TrieDB().Node(element.hash)
                if err != nil {
                    t.Fatalf("failed to retrieve node data for %x %v %v", element.hash, []byte(element.path), element.path)
                }
                results = append(results, trie.NodeSyncResult{Path: path, Data: data})
            }
            for _, result := range results {
                if err := sched.ProcessNode(result); err != nil {
                    t.Fatalf("failed to process result %v", err)
                }
            }
        }
        // Feed the retrieved results back and queue new tasks
        batch := dstDb.NewBatch()
        if err := sched.Commit(batch); err != nil {
            t.Fatalf("failed to commit data: %v", err)
        }
        batch.Write()

        nodeQueue = make(map[string]stateElement)
        codeQueue = make(map[common.Hash]struct{})
        paths, nodes, codes := sched.Missing(count)
        for i, path := range paths {
            nodeQueue[path] = stateElement{
                path:     path,
                hash:     nodes[i],
                syncPath: trie.NewSyncPath([]byte(path)),
            }
        }
        for _, hash := range codes {
            codeQueue[hash] = struct{}{}
        }
    }
    // Cross check that the two states are in sync
    checkStateAccounts(t, dstDb, srcRoot, srcAccounts)
}
``` This codebase is a set of tests for the `StateSync` package. The `StateSync` package is used to synchronize the state of two Ethereum nodes. The tests ensure that the `StateSync` package can correctly reconstruct the state of the source node on the destination node.

The `TestIterativeRandomDelayedStateSync` function tests the `StateSync` package's ability to reconstruct the state even if only partial results are returned. The function creates a random state to copy and a destination state. It then syncs the two states using the `StateSync` package. The function tests that the `StateSync` package can correctly reconstruct the state even if only partial results are returned, even those sent only later.

The `TestIncompleteStateSync` function tests that at any point in time during a sync, only complete sub-tries are in the database. The function creates a random state to copy and a destination state. It then syncs the two states using the `StateSync` package. The function tests that at any point in time during a sync, only complete sub-tries are in the database.

Here is an example of how you can document the `TestIterativeRandomDelayedStateSync` function in Markdown format:

## TestIterativeRandomDelayedStateSync

This function tests the `StateSync` package's ability to reconstruct the state even if only partial results are returned.

### Parameters

- `t`: A testing object used for reporting test failures.

### Behavior

1. Creates a random state to copy and a destination state.
2. Syncs the two states using the `StateSync` package.
3. Tests that the `StateSync` package can correctly reconstruct the state even if only partial results are returned, even those sent only later.

### Example

```go
func TestIterativeRandomDelayedStateSync(t *testing.T) {
	// Create a random state to copy
	_, srcDb, srcRoot, srcAccounts := makeTestState()

	// Create a destination state and sync with the scheduler
	dstDb := rawdb.NewMemoryDatabase()
	sched := NewStateSync(srcRoot, dstDb, nil, srcDb.TrieDB().Scheme())

	nodeQueue := make(map[string]stateElement)
	codeQueue := make(map[common.Hash]struct{})
	paths, nodes, codes := sched.Missing(0)
	for i, path := range paths {
		nodeQueue[path] = stateElement{
			path:     path,
			hash:     nodes[i],
			syncPath: trie.NewSyncPath([]byte(path)),
		}
	}
	for _, hash := range codes {
		codeQueue[hash] = struct{}{}
	}
	for len(nodeQueue)+len(codeQueue) > 0 {
		// Sync only half of the scheduled nodes, even those in random order
		if len(codeQueue) > 0 {
			results := make([]trie.CodeSyncResult, 0, len(codeQueue)/2+1)
			for hash := range codeQueue {
				delete(codeQueue, hash)

				data, err := srcDb.ContractCode(common.Hash{}, hash)
				if err != nil {
					t.Fatalf("failed to retrieve node data for %x", hash)
				}
				results = append(results, trie.CodeSyncResult{Hash: hash, Data: data})

				if len(results) >= cap(results) {
					break
				}
			}
			for _, result := range results {
				if err := sched.ProcessCode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
		}
		if len(nodeQueue) > 0 {
			results := make([]trie.NodeSyncResult, 0, len(nodeQueue)/2+1)
			for path, element := range nodeQueue {
				delete(nodeQueue, path)

				data, err := srcDb.TrieDB().Node(element.hash)
				if err != nil {
					t.Fatalf("failed to retrieve node data for %x", element.hash)
				}
				results = append(results, trie.NodeSyncResult{Path: path, Data: data})

				if len(results) >= cap(results) {
					break
				}
			}
			// Feed the retrieved results back and queue new tasks
			for _, result := range results {
				if err := sched.ProcessNode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
		}
		batch := dstDb.NewBatch()
		if err := sched.Commit(batch); err != nil {
			t.Fatalf("failed to commit data: %v", err)
		}
		batch.Write()

		paths, nodes, codes := sched.Missing(0)
		for i, path := range paths {
			nodeQueue[path] = stateElement{
				path:     path,
				hash:     nodes[i],
				syncPath: trie.NewSyncPath([]byte(path)),
			}
		}
		for _, hash := range codes {
			codeQueue[hash] = struct{}{}
		} The `h` function is a helper function used to copy a state trie from one database to another. It takes two parameters, `srcDb` and `dstDb`, which are the source and destination databases, respectively. The function copies the state trie from `srcDb` to `dstDb` by iterating over the missing nodes in the trie and fetching them from `srcDb`. It then processes each node and code using the `sched` scheduler and commits the changes to `dstDb`. Finally, it performs a sanity check to ensure that removing any node from the database is detected.

Here is an example of how you can document the `h` function in Markdown format:

## h

This function is a helper function used to copy a state trie from one database to another.

### Parameters

- `srcDb`: The source database.
- `dstDb`: The destination database.

### Behavior

1. Iterates over the missing nodes in the trie and fetches them from `srcDb`.
2. Processes each node and code using the `sched` scheduler.
3. Commits the changes to `dstDb`.
4. Performs a sanity check to ensure that removing any node from the database is detected.

### Example

```go
func h(srcDb, dstDb ethdb.Database, sched *trie.SyncPool, srcRoot common.Hash, t *testing.T) {
	// Create a map of missing nodes and codes
	addedPaths := make([]string, 0)
	addedHashes := make([]common.Hash, 0)
	addedCodes := make([]common.Hash, 0)
	nodeQueue := make(map[string]stateElement)
	codeQueue := make(map[common.Hash]struct{})

	// Add missing nodes and codes to the queues
	paths, nodes, codes := sched.Missing(1)
	for i, path := range paths {
		nodeQueue[path] = stateElement{
			path:     path,
			hash:     nodes[i],
			syncPath: trie.NewSyncPath([]byte(path)),
		}
	}
	for _, hash := range codes {
		codeQueue[hash] = struct{}{}
	}

	// Process the queues until they are empty
	for len(nodeQueue)+len(codeQueue) > 0 {
		// Fetch a batch of state nodes
		if len(codeQueue) > 0 {
			results := make([]trie.CodeSyncResult, 0, len(codeQueue))
			for hash := range codeQueue {
				data, err := srcDb.ContractCode(common.Hash{}, hash)
				if err != nil {
					t.Fatalf("failed to retrieve node data for %x", hash)
				}
				results = append(results, trie.CodeSyncResult{Hash: hash, Data: data})
				addedCodes = append(addedCodes, hash)
			}
			// Process each of the state nodes
			for _, result := range results {
				if err := sched.ProcessCode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
		}
		var nodehashes []common.Hash
		if len(nodeQueue) > 0 {
			results := make([]trie.NodeSyncResult, 0, len(nodeQueue))
			for path, element := range nodeQueue {
				data, err := srcDb.TrieDB().Node(element.hash)
				if err != nil {
					t.Fatalf("failed to retrieve node data for %x", element.hash)
				}
				results = append(results, trie.NodeSyncResult{Path: path, Data: data})

				if element.hash != srcRoot {
					addedPaths = append(addedPaths, element.path)
					addedHashes = append(addedHashes, element.hash)
				}
				nodehashes = append(nodehashes, element.hash)
			}
			// Process each of the state nodes
			for _, result := range results {
				if err := sched.ProcessNode(result); err != nil {
					t.Fatalf("failed to process result %v", err)
				}
			}
		}
		batch := dstDb.NewBatch()
		if err := sched.Commit(batch); err != nil {
			t.Fatalf("failed to commit data: %v", err)
		}
		batch.Write()

		for _, root := range nodehashes {
			// Can't use checkStateConsistency here because subtrie keys may have odd
			// length and crash in LeafKey.
			if err := checkTrieConsistency(dstDb, root); err != nil {
				t.Fatalf("state inconsistent: %v", err)
			}
		}
		// Fetch the next batch to retrieve
		nodeQueue = make(map[string]stateElement)
		codeQueue = make(map[common.Hash]struct{})
		paths, nodes, codes := sched.Missing(1)
		for i, path := range paths {
			nodeQueue[path] = stateElement{
				path:     path,
				hash:     nodes[i],
				syncPath: trie.NewSyncPath([]byte(path)),
			}
		}
		for _, hash := range codes {
			codeQueue[hash] = struct{}{}
		}
	}
	// Sanity check that removing any node from the database is