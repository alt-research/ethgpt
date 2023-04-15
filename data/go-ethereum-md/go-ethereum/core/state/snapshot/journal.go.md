## Package snapshot

The `snapshot` package provides functionality for creating and loading snapshots of the Ethereum state.

### Constants

#### journalVersion

```go
const journalVersion uint64 = 0
```

`journalVersion` is the version of the snapshot journal.

### Types

#### journalGenerator

```go
type journalGenerator struct {
    Wiping   bool
    Done     bool
    Marker   []byte
    Accounts uint64
    Slots    uint64
    Storage  uint64
}
```

`journalGenerator` is a disk layer entry containing the generator progress marker.

#### journalDestruct

```go
type journalDestruct struct {
    Hash common.Hash
}
```

`journalDestruct` is an account deletion entry in a diffLayer's disk journal.

#### journalAccount

```go
type journalAccount struct {
    Hash common.Hash
    Blob []byte
}
```

`journalAccount` is an account entry in a diffLayer's disk journal.

#### journalStorage

```go
type journalStorage struct {
    Hash common.Hash
    Keys []common.Hash
    Vals [][]byte
}
```

`journalStorage` is an account's storage map in a diffLayer's disk journal.

### Functions

#### ParseGeneratorStatus

```go
func ParseGeneratorStatus(generatorBlob []byte) string
```

`ParseGeneratorStatus` parses the generator status from the given generator blob.

#### loadAndParseJournal

```go
func loadAndParseJournal(db ethdb.KeyValueStore, base *diskLayer) (snapshot, journalGenerator, error)
```

`loadAndParseJournal` loads and parses the snapshot journal in the latest format. It returns the snapshot, the journal generator, and an error if any. ## Function: loadAndParseJournal

The `loadAndParseJournal` function loads and parses the state journal from the database. It returns the current state snapshot, the generator, and an error if any.

### Parameters

- `diskdb`: The key-value store used to store the state.
- `base`: The disk layer containing the root hash of the snapshot.
- `cache`: The size of the cache in MB.
- `recovery`: A boolean indicating whether the state is in recovery mode.
- `noBuild`: A boolean indicating whether background generation is allowed.

### Return Values

- `snapshot`: The current state snapshot.
- `generator`: The generator used to generate the snapshot.
- `err`: An error if any.

### Code Explanation

The function first checks if snapshotting is disabled. If it is, it returns an empty snapshot and a boolean indicating that snapshotting is disabled.

If snapshotting is enabled, the function retrieves the root hash of the snapshot from the database. If the root hash is missing or corrupted, it returns an error.

The function then creates a new disk layer with the retrieved root hash and a cache of the specified size. It calls the `loadAndParseJournal` function to load the state journal from the database and parse it into a snapshot.

If there is no journal or the journal is invalid, the function discards all diffs and tries to recover them later.

If the journal is successfully loaded, the function checks if the head of the snapshot matches the root hash. If it doesn't match and recovery mode is not enabled, the function returns an error. If recovery mode is enabled, the function logs a warning message.

If the generator is not complete, the function loads the disk layer status from the generator. If background generation is allowed, the function resumes any suspended operations.

Finally, the function returns the current state snapshot, the generator, and an error if any. ## Documentation for `Commit` function

The `Commit` function is a method of the `StateDB` struct that commits the state changes to the database. It takes a boolean parameter `deleteEmptyObjects` which specifies whether to delete empty objects or not. The function returns the root hash of the state and an error if any.

The function first checks if the snapshot is currently being generated and aborts it if it is. It then ensures that the layer did not get stale. If the layer is stale, it returns an error. The function then writes the generator stats even if none was ran this cycle. Finally, it logs the disk layer and returns the root hash of the state.

## Documentation for `Journal` function

The `Journal` function is a method of the `diffLayer` struct that writes the memory layer contents into a buffer to be stored in the database as the snapshot journal. It takes a buffer pointer and returns the root hash of the state and an error if any.

The function first journals the parent and returns an error if any. It then ensures that the layer did not get stale. If the layer is stale, it returns an error. The function then encodes the root, destructs, accounts, and storage data into the buffer. Finally, it logs the diff layer and returns the root hash of the state.

## Documentation for `iterateJournal` function

The `iterateJournal` function iterates through the journalled diff layers, loading them from the database, and invoking the callback for each loaded layer. The order is incremental; starting with the bottom-most diff layer, going towards the most recent layer. This function takes a database and a callback function as parameters and returns an error if any.

The function first reads the snapshot journal from the database and returns nil if the journal is empty. It then resolves the journal version and returns an error if it fails to resolve the version or if the version is wrong. The function then resolves the disk layer and invokes the callback for each loaded layer. Finally, it returns an error if there was some error reading from disk or if the callback returns an error when invoked. The `loadJournal` function is used to load the snapshot journal from disk and apply the diffs to the state. It takes a database, a snapshot root, and a callback function as input parameters. The callback function is called for each diff entry in the journal and is used to apply the changes to the state.

The function starts by checking if the snapshot root matches the root of the disk layer. If they don't match, it returns an error. Then, it enters a loop where it reads the next diff journal entry from the snapshot journal. The entry consists of a root hash, a list of destructed state objects, a list of modified accounts, and a list of modified storage slots.

The function then processes the destructed state objects, modified accounts, and modified storage slots by decoding them from RLP and storing them in maps. It also creates a set of destructed state object hashes for easy lookup.

Finally, the function calls the callback function with the parent root, the current root, the set of destructed state object hashes, the map of modified account data, and the map of modified storage data. If the callback function returns an error, the function returns that error. Otherwise, it updates the parent root to the current root and continues to the next diff journal entry.

If the end of the journal is reached, the function returns nil. If an error occurs while reading the journal, the function returns an error with a descriptive message.