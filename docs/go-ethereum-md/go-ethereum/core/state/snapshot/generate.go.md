## Snapshot

The `snapshot` package provides functionality for generating and managing snapshots of the Ethereum state.

### Variables

- `accountCheckRange`: The upper limit of the number of accounts involved in each range check.
- `storageCheckRange`: The upper limit of the number of storage slots involved in each range check.
- `errMissingTrie`: The error returned if the target trie is missing while the generation is running.

### Functions

#### generateSnapshot

```go
func generateSnapshot(diskdb ethdb.KeyValueStore, triedb *trie.Database, cache int, root common.Hash) *diskLayer
```

`generateSnapshot` regenerates a brand new snapshot based on an existing state database and head block asynchronously. The snapshot is returned immediately and generation is continued in the background until done.

#### journalProgress

```go
func journalProgress(db ethdb.KeyValueWriter, marker []byte, stats *generatorStats)
```

`journalProgress` persists the generator stats into the database to resume later. The `s.accounts` function is used to write the snapshot generator progress to the database. It takes in a `stats` parameter which contains the number of slots and storage used by the generator. It then encodes the `entry` into bytes using RLP encoding. If there is an error during encoding, it panics. The function then logs the progress of the generator and writes the `blob` to the database using `rawdb.WriteSnapshotGenerator`.

The `proofResult` struct contains the output of range proving which can be used for further processing regardless of whether it is successful or not. It has the following fields:
- `keys`: The key set of all elements being iterated, even proving is failed.
- `vals`: The val set of all elements being iterated, even proving is failed.
- `diskMore`: Set when the database has extra snapshot states since the last iteration.
- `trieMore`: Set when the trie has extra snapshot states (only meaningful for successful proving).
- `proofErr`: Indicator whether the given state range is valid or not.
- `tr`: The trie, in case the trie was resolved by the prover (may be nil).

The `valid` function returns the indicator that range proof is successful or not.

The `last` function returns the last verified element key regardless of whether the range proof is successful or not. Nil is returned if nothing is involved in the proving.

The `forEach` function iterates all the visited elements and applies the given callback on them. The iteration is aborted if the callback returns a non-nil error.

The `proveRange` function proves the snapshot segment with a particular prefix is "valid". The iteration start point will be assigned if the iterator is restored from the last interruption. Max will be assigned in order to limit the maximum amount of data involved in each iteration. The proof result will be returned if the range proving is finished, otherwise, the error will be returned to abort the entire procedure. It takes in the following parameters:
- `ctx`: The generator context.
- `trieId`: The trie ID.
- `prefix`: The prefix of the snapshot segment.
- `kind`: The kind of the snapshot segment.
- `origin`: The origin of the snapshot segment.
- `max`: The maximum amount of data involved in each iteration.
- `valueConvertFn`: The function to convert the value.

The function initializes some variables and starts iterating over the snapshot segment. It ensures that the iterated item is always equal or larger than the given origin. If the iterated item is smaller than the origin, it returns an error. It also ensures that the iterated item still falls in the specified prefix. If it does not fall in the prefix, it moves the iterator a step back since it iterates one extra element out. If it has reached the maximum size, it signals that it is not done yet and moves the iterator a step back since it iterates one extra element out. If there is an error during iteration, it returns the error. Otherwise, it returns the proof result. ## Function: generateRange

The `generateRange` function is used to generate a range of account or storage slot keys and values from the state snapshot. It takes a `kind` parameter to specify whether it should generate account or storage slot keys and values. It also takes a `prefix` parameter to specify the prefix of the keys to generate. The `origin` parameter specifies the starting key of the range, and the `limit` parameter specifies the maximum number of keys to generate. The `valueConvertFn` parameter is an optional function to convert the values from the slim format to the canonical encoding format. The function returns a `proofResult` struct containing the generated keys and values, as well as other information such as whether there are more keys to generate, and any errors that occurred during the generation.

### Parameters

- `kind`: The kind of keys and values to generate, either `snapAccount` or `snapStorage`.
- `prefix`: The prefix of the keys to generate.
- `origin`: The starting key of the range.
- `limit`: The maximum number of keys to generate.
- `valueConvertFn`: An optional function to convert the values from the slim format to the canonical encoding format.

### Return Value

- `proofResult`: A struct containing the generated keys and values, as well as other information such as whether there are more keys to generate, and any errors that occurred during the generation.

### Example

```go
func (dl *Downloader) generateRange(kind snapKind, prefix, origin []byte, limit int, valueConvertFn func([]byte) ([]byte, error)) (*proofResult, error) {
	// Initialize the proof result
	result := &proofResult{
		keys: make([][]byte, 0, limit),
		vals: make([][]byte, 0, limit),
	}
	// Initialize the proof
	proof := make([][]byte, 0, limit)
	// Initialize the keys and values
	keys := make([][]byte, 0, limit)
	vals := make([][]byte, 0, limit)
	// Initialize the diskMore flag
	diskMore := false
	// Initialize the iterator
	iter := dl.triedb.NewIterator(prefix)
	defer iter.Release()
	// Iterate over the keys and values
	for iter.Next() && len(keys) < limit {
		key := iter.Key()
		if bytes.Compare(key, origin) < 0 {
			continue
		}
		if bytes.HasPrefix(key, prefix) {
			if len(keys) > 0 && bytes.Compare(key, keys[len(keys)-1]) <= 0 {
				continue
			}
			if len(keys) > 0 && bytes.Compare(key, keys[len(keys)-1]) > 0 {
				proof = append(proof, common.CopyBytes(keys[len(keys)-1]))
			}
			if len(keys) == 0 {
				proof = append(proof, common.CopyBytes(origin))
			}
			if len(keys) == limit-1 {
				proof = append(proof, common.CopyBytes(key))
				diskMore = true
				break
			}
			keys = append(keys, common.CopyBytes(key))
			if valueConvertFn == nil {
				vals = append(vals, common.CopyBytes(iter.Value()))
			} else {
				val, err := valueConvertFn(iter.Value())
				if err != nil {
					// Special case, the state data is corrupted (invalid slim-format account),
					// don't abort the entire procedure directly. Instead, let the fallback
					// generation to heal the invalid data.
					//
					// Here append the original value to ensure that the number of key and
					// value are aligned.
					vals = append(vals, common.CopyBytes(iter.Value()))
					log.Error("Failed to convert account state data", "err", err)
				} else {
					vals = append(vals, val)
				}
			}
		}
	}
	// Update metrics for database iteration and merkle proving
	if kind == snapStorage {
		snapStorageSnapReadCounter.Inc(time.Since(start).Nanoseconds())
	} else {
		snapAccountSnapReadCounter.Inc(time.Since(start).Nanoseconds())
	}
	defer func(start time.Time) {
		if kind == snapStorage {
			snapStorageProveCounter.Inc(time.Since(start).Nanoseconds())
		} else {
			snapAccountProveCounter.Inc(time.Since(start).Nanoseconds())
		}
	}(time.Now())

	// The snap state is exhausted, pass the entire key/val set for verification
	root := trieId.Root
	if origin == nil && !diskMore {
		stackTr := trie.NewStackTrie(nil)
		for i, key := range keys {
			stackTr.TryUpdate(key, vals[i])
		}
		if gotRoot := stackTr.Hash(); gotRoot != root {
			return &proofResult{
				keys:     keys,
				vals:     vals,
				proofErr: fmt.Errorf("wrong root: have %#x want %#x", gotRoot, root),
			}, nil
		}
		return &proofResult{keys: keys, vals: vals}, nil
	}
	// Snap state is chunked, generate edge proofs for verification.
	tr, err := trie.New(trieId, dl.triedb)
	if err != nil {
		ctx.stats.Log("Trie missing, state snapshotting paused", dl.root, dl.genMarker)
		return nil, errMissingTrie
	}
	// Firstly find out the key of last iterated element.
	var last []byte
	if len(keys) > 0 {
		last = keys[len(keys)-1]
	}
	// Generate the Merkle proofs for the first and last element
	if origin == nil {
		origin = common.Hash{}.Bytes()
	}
	if err := tr.Prove(origin, 0, proof); err != nil {
		log.Debug("Failed to prove range", "kind", kind, "origin", origin, "err", err)
		return &proofResult{
			keys:     keys,
			vals:     vals,
			diskMore: diskMore,
			proofErr: err,
			tr:       tr,
		}, nil
	}
	if last != nil {
		if err := tr.Prove(last, 0, proof); err != nil {
			log.Debug("Failed to prove range", "kind", kind, "last", last, "err", err)
			return &proofResult{
				keys:     keys,
				vals:     vals,
				diskMore: diskMore,
				proofErr: err,
				tr:       tr,
			}, nil
		}
	}
	// Verify the snapshot segment with range prover, ensure that all flat states
	// in this range correspond to merkle trie.
	cont, err := trie.VerifyRangeProof(root, origin, last, keys, vals, proof)
	return &proofResult{
			keys:     keys,
			vals:     vals,
			diskMore: diskMore,
			trieMore: cont,
			proofErr: err,
			tr:       tr},
		nil
}
``` ## DiskLayer

The `DiskLayer` struct is used to generate the state segment with a particular prefix. It can either verify the correctness of the existing state through range-proof and skip generation or iterate the trie to regenerate the state on demand.

### Fields

- `triedb`: The trie database used to store the state.
- `prover`: The range prover used to check the validity of the flat state in the range.
- `root`: The root hash of the state.
- `genMarker`: The generation marker of the state.

### Methods

#### generateRange

```go
func (dl *diskLayer) generateRange(ctx *generatorContext, trieId *trie.ID, prefix []byte, kind string, origin []byte, max int, onState onStateCallback, valueConvertFn func([]byte) ([]byte, error)) (bool, []byte, error)
```

`generateRange` generates the state segment with a particular prefix. It can either verify the correctness of the existing state through range-proof and skip generation or iterate the trie to regenerate the state on demand.

#### proveRange

```go
func (dl *diskLayer) proveRange(ctx *generatorContext, trieId *trie.ID, prefix []byte, kind string, origin []byte, max int, valueConvertFn func([]byte) ([]byte, error)) (*rangeProofResult, error)
```

`proveRange` checks the validity of the flat state in the range.

#### resolve

```go
func (dl *diskLayer) resolve(owner common.Hash, path []byte, hash common.Hash) []byte
```

`resolve` resolves the trie node.

#### snapshot

```go
func (dl *diskLayer) snapshot(ctx *generatorContext, trieId *trie.ID, prefix []byte, kind string, origin []byte, max int, onState onStateCallback, valueConvertFn func([]byte) ([]byte, error)) (bool, []byte, error)
```

`snapshot` generates the state snapshot. ## State Snapshot Generation

The `generateState` function is responsible for generating a snapshot of the state. It takes a `diskLayer` instance, a `resolver` function, a `kind` parameter, and a `last` parameter. The `resolver` function is used to resolve state objects, and the `kind` parameter specifies whether to generate a snapshot of the account or storage. The `last` parameter is used to specify the last key processed in the previous iteration.

The function starts by initializing some variables, including a `nodeIterator` instance, which is used to iterate over the state trie. It then adds the `resolver` function to the iterator's resolver list. The function then iterates over the state trie using the `nodeIterator`, processing each key-value pair. If the key is greater than the `last` key, the function sets a flag indicating that there are more keys in the trie. If the key is in the snapshot, the function checks if the value has changed since the snapshot was taken. If the value has changed, the function increments a counter for updated values. If the value has not changed, the function increments a counter for untouched values. If the key is not in the snapshot, the function increments a counter for created values. If the key is in the snapshot but not in the trie, the function increments a counter for deleted values. The function then calls the `onState` function with the key and value, indicating whether to write the value to the database and whether to delete the value from the database. After iterating over all key-value pairs, the function deletes any remaining keys in the snapshot that were not processed. Finally, the function updates some metrics and returns a flag indicating whether there are more keys in the trie or snapshot.

The `checkAndFlush` function is called by `generateState` to check if an interruption signal has been received or if the batch size has exceeded the allowance. If either of these conditions is true, the function flushes the batch to the database and updates the `genMarker` variable to the current key. If an interruption signal has been received, the function returns an error to indicate that the snapshot generation should be aborted.

The `generateStorages` function is called by `generateState` to generate the missing storage slots of a specific contract. It takes a `generatorContext` instance, a `diskLayer` instance, a state root hash, an account hash, a storage root hash, and a `storeMarker` parameter. The function iterates over the storage trie using the `generatorContext` instance, processing each key-value pair. If the key is greater than the `storeMarker` key, the function sets a flag indicating that there are more keys in the storage trie. The function then calls the `onStorage` function with the key and value, indicating whether to write the value to the database and whether to delete the value from the database. After iterating over all key-value pairs, the function updates some metrics and returns a flag indicating whether there are more keys in the storage trie. The `generateStorage` function is used to generate the missing storage slots for a given account. It takes in a `generatorContext` and a `diskLayer` as arguments, along with the account address, the storage root hash, and a boolean flag indicating whether the storage slot should be deleted. 

If the `delete` flag is set to true, the function deletes the storage snapshot for the given account and key. If the `write` flag is set to true, the function writes the storage snapshot to the database. Otherwise, the function assumes that the storage snapshot already exists in the database and does not write anything.

The function then updates the statistics for the number of storage slots and the amount of storage used. If the batch allowance has been exceeded or termination has been requested, the function flushes the changes to disk.

The function then enters a loop to regenerate any missing storage slots. It generates the storage trie ID for the given state root, account, and storage root, and then calls the `generateRange` function to generate the missing storage slots. If the entire contract storage has been generated, the function breaks out of the loop. If the last key is equal to `0xffffffff...fff`, the function also breaks out of the loop.

The `generateAccounts` function is used to generate the missing snapshot accounts as well as their storage slots in the main trie. It takes in a `generatorContext` and a `diskLayer` as arguments, along with a marker indicating the origin position to restart the generation from.

The function then defines an `onAccount` function that is called for each account in the trie. If the `delete` flag is set to true, the function deletes the account snapshot for the given account. Otherwise, the function retrieves the current account and flattens it into the internal format. If the account is not yet in-progress, the function writes it out to the database.

The function then updates the statistics for the number of accounts and the amount of storage used. If the batch allowance has been exceeded or termination has been requested, the function flushes the changes to disk.

Finally, the function enters a loop to generate any missing snapshot accounts. It calls the `generateRange` function to generate the missing accounts and their storage slots in the main trie. If the snapshot generation was interrupted, the function sets the marker to the last generated account and storage hash. ## Function: generate

The `generate` function is a background thread that iterates over the state and storage tries, constructing the state snapshot. All the arguments are purely for statistics gathering and logging, since the method surfs the blocks as they arrive, often being restarted.

### Parameters

- `stats`: A pointer to a `generatorStats` struct that is used to gather statistics about the snapshot generation.

### Return Value

This function does not return anything.

### Code Explanation

The function starts by initializing some variables, including `accMarker` and `abort`. If `dl.genMarker` is not empty, `accMarker` is set to the first 32 bytes of `dl.genMarker`. Then, a new `generatorContext` is created with the `stats`, `dl.diskdb`, `accMarker`, and `dl.genMarker`. The `generatorContext` is closed at the end of the function.

Next, the function calls `generateAccounts` with the `ctx`, `dl`, and `accMarker` as arguments. If an error occurs, the function checks if the error is an `abortErr`. If it is, `abort` is set to the `abort` channel of the `abortErr`. If not, `abort` is set to the next value received from `dl.genAbort`. The `abort` channel is then sent the `stats` and the function returns.

If `generateAccounts` completes successfully, the snapshot is fully generated and the `genMarker` is set to `nil`. The `journalProgress` function is called with `ctx.batch`, `nil`, and `stats` as arguments. If an error occurs during the write, the `abort` channel is set to the next value received from `dl.genAbort` and the `abort` channel is sent the `stats`. Otherwise, the `batch` is reset.

Finally, the function logs the statistics gathered during the snapshot generation and sets `dl.genMarker` to `nil`. The `genPending` channel is closed and the `abort` channel is set to the next value received from `dl.genAbort`. The `abort` channel is then sent `nil` and the function returns. ## increaseKey

The `increaseKey` function takes a byte slice `key` and increments it by one bit. It returns the resulting byte slice if the addition operation does not overflow, otherwise it returns `nil`.

### Parameters

- `key`: A byte slice representing the key to be incremented.

### Return Value

- A byte slice representing the incremented key, or `nil` if the addition operation overflows.

### Example

```go
key := []byte{0x00, 0x01, 0x02}
newKey := increaseKey(key)
fmt.Println(newKey) // Output: [0x00 0x01 0x03]
```

## abortErr

The `abortErr` type is an error that represents an interruption signal received to indicate that the generation process has been aborted by external processes.

### Fields

- `abort`: A channel of `generatorStats` used to communicate the statistics of the generator process.

### Methods

#### newAbortErr

```go
func newAbortErr(abort chan *generatorStats) error
```

`newAbortErr` creates a new `abortErr` instance with the given `abort` channel.

#### Error

```go
func (err *abortErr) Error() string
```

`Error` returns the string representation of the `abortErr`, which is simply `"aborted"`.