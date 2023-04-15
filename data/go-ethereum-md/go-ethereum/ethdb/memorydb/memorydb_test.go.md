## Documentation for MemoryDB

### TestMemoryDB function

The `TestMemoryDB` function is a test function that runs a suite of tests for the `MemoryDB` implementation of the `ethdb.KeyValueStore` interface. It takes a `*testing.T` instance as an argument and returns nothing.

### New function

The `New` function creates a new instance of the `MemoryDB` struct. It returns a pointer to the new instance.

### MemoryDB struct

The `MemoryDB` struct is an in-memory implementation of the `ethdb.KeyValueStore` interface.

#### Put function

The `Put` function inserts the given value into the database for later retrieval. It takes a key and