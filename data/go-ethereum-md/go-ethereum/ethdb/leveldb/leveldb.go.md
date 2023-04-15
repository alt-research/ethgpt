# Documentation for leveldb package

The `leveldb` package implements the key-value database layer based on LevelDB.

## Database struct

The `Database` struct is a persistent key-value store. Apart from basic data storage functionality, it also supports batch writes and iterating over the keyspace in binary-alphabetical order.

### fn field

```go
fn string // filename for reporting
```

The `fn` field is a string that represents the filename for reporting.

### db field

```go
db *leveldb.DB // LevelDB instance
```

The `db` field is a pointer to the LevelDB instance.

### compTimeMeter field

```go
compTimeMeter metrics.Meter // Meter for measuring the total time spent in database compaction
```

The `compTimeMeter` field is a meter for measuring the total time spent in database compaction.

### compReadMeter field

```go
compReadMeter metrics.Meter // Meter for measuring the data read during compaction
```

The `compReadMeter` field is a meter for measuring the data read during compaction.

### compWriteMeter field

```go
compWriteMeter metrics.Meter // Meter for measuring the data written during compaction
```

The `compWriteMeter` field is a meter for measuring the data written during compaction.

### writeDelayNMeter field

```go
writeDelayNMeter metrics.Meter // Meter for measuring the write delay number due to database compaction
```

The `writeDelayNMeter` field is a meter for measuring the write delay number due to database compaction.

### writeDelayMeter field

```go
writeDelayMeter metrics.Meter // Meter for measuring the write delay duration due to database compaction
```

The `writeDelayMeter` field is a meter for measuring the write delay duration due to database compaction.

### diskSizeGauge field

```go
diskSizeGauge metrics.Gauge // Gauge for tracking the size of all the levels in the database
```

The `diskSizeGauge` field is a gauge for tracking the size of all the levels in the database.

### diskReadMeter field

```go
diskReadMeter metrics.Meter // Meter for measuring the effective amount of data read
```

The `diskReadMeter` field is a meter for measuring the effective amount of data read.

### diskWriteMeter field

```go
diskWriteMeter metrics.Meter // Meter for measuring the effective amount of data written
```

The `diskWriteMeter` field is a meter for measuring the effective amount of data written.

### memCompGauge field

```go
memCompGauge metrics.Gauge // Gauge for tracking the number of memory compaction
```

The `memCompGauge` field is a gauge for tracking the number of memory compaction.

### level0CompGauge field

```go
level0CompGauge metrics.Gauge // Gauge for tracking the number of table compaction in level0
```

The `level0CompGauge` field is a gauge for tracking the number of table compaction in level0.

### nonlevel0CompGauge field

```go
nonlevel0CompGauge metrics.Gauge // Gauge for tracking the number of table compaction in non0 level
```

The `nonlevel0CompGauge` field is a gauge for tracking the number of table compaction in non0 level.

### seekCompGauge field

```go
seekCompGauge metrics.Gauge // Gauge for tracking the number of table compaction caused by read opt
```

The `seekCompGauge` field is # Documentation for leveldb package

The `leveldb` package provides a wrapped LevelDB object with metrics reporting. It allows the caller to modify the LevelDB options and provides a channel to stop the metrics collection before closing the database.

## Database struct

The `Database` struct is a wrapped LevelDB object with metrics reporting.

### New function

```go
func New(file string, cache int, handles int, namespace string, readonly bool) (*Database, error)
```

The `New` function returns a wrapped LevelDB object. The namespace is the prefix that the metrics reporting should use for surfacing internal stats. It takes a file path, cache size, number of file handles, namespace, and a boolean value indicating whether the database is read-only as arguments. It returns a new `Database` object and an error if any.

### NewCustom function

```go
func NewCustom(file string, namespace string, customize func(options *opt.Options)) (*Database, error)
```

The `NewCustom` function returns a wrapped LevelDB object. The namespace is the prefix that the metrics reporting should use for surfacing internal stats. The customize function allows the caller to modify the LevelDB options. It takes a file path, namespace, and a function that modifies the options as arguments. It returns a new `Database` object and an error if any.

### configureOptions function

```go
func configureOptions(customizeFn func(*opt.Options)) *opt.Options
```

The `configureOptions` function sets some default options, then runs the provided setter. It takes a function that modifies the options as an argument. It returns the modified options.

### Close function

```go
func (db *Database) Close() error
```

The `Close` function stops the metrics collection, flushes any pending data to disk, and closes all I/O accesses to the underlying LevelDB database. It returns an error if any.

### CompactRange function

```go
func (db *Database) CompactRange(start, limit []byte) error
```

The `CompactRange` function compacts the LevelDB database between the given start and limit keys. It returns an error if any.

### Delete function

```go
func (db *Database) Delete(key []byte, wo *opt.WriteOptions) error
```

The `Delete` function deletes the key-value pair associated with the given key from the LevelDB database. It takes a key and a write options object as arguments. It returns an error if any.

### Get function

```go
func (db *Database) Get(key []byte, ro *opt.ReadOptions) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the LevelDB database. It takes a key and a read options object as arguments. It returns the value as a byte slice and an error if any.

### Has function

```go
func (db *Database) Has(key []byte, ro *opt.ReadOptions) (bool, error)
```

The `Has` function checks if the given key exists in the LevelDB database. It takes a key and a read options object as arguments. It returns a boolean value indicating whether the key exists or not, and an error if any.

### NewBatch function

```go
func (db *Database) NewBatch() *leveldb.Batch
```

The `NewBatch` function creates a new batch for the LevelDB database. It returns a new batch.

### Put function

```go
func (db *Database) Put(key []byte, value []byte, wo *opt.WriteOptions # Documentation for leveldb.Database

The `leveldb.Database` is a key-value store that provides a persistent storage solution for Ethereum nodes. This package provides an implementation of the `ethdb.Database` interface using the LevelDB key-value store.

## Database struct

The `Database` struct is a key-value store that provides a persistent storage solution for Ethereum nodes.

### Close function

```go
func (db *Database) Close() error
```

The `Close` function closes the database and releases any resources associated with it. It returns an error if any.

### Has function

```go
func (db *Database) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the database. It returns a boolean value indicating whether the key exists or not, and an error if any.

### Get function

```go
func (db *Database) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the database. It returns the value as a byte slice and an error if any.

### Put function

```go
func (db *Database) Put(key []byte, value []byte) error
```

The `Put` function adds a key-value pair to the database. It returns an error if any.

### Delete function

```go
func (db *Database) Delete(key []byte) error
```

The `Delete` function deletes the key-value pair associated with the given key from the database. It returns an error if any.

### NewBatch function

```go
func (db *Database) NewBatch() ethdb.Batch
```

The `NewBatch` function creates a write-only key-value store that buffers changes to its host database until a final write is called. It returns a new batch.

### NewBatchWithSize function

```go
func (db *Database) NewBatchWithSize(size int) ethdb.Batch
```

The `NewBatchWithSize` function creates a write-only database batch with pre-allocated buffer. It returns a new batch.

### NewIterator function

```go
func (db *Database) NewIterator(prefix []byte, start []byte) ethdb.Iterator
```

The `NewIterator` function creates a binary-alphabetical iterator over a subset of database content with a particular key prefix, starting at a particular initial key (or after, if it does not exist). It returns a new iterator.

### NewSnapshot function

```go
func (db *Database) NewSnapshot() (ethdb.Snapshot, error)
```

The `NewSnapshot` function creates a database snapshot based on the current state. The created snapshot will not be affected by all following mutations happened on the database. Note don't forget to release the snapshot once it's used up, otherwise the stale data will never be cleaned up by the underlying compactor. It returns a new snapshot and an error if any.

### Stat function

```go
func (db *Database) Stat(property string) (string, error)
```

The ` # Documentation for meter function

The `meter` function collects and updates various statistics related to the database. It takes a duration as an argument, which determines how often the statistics are updated.

## Compaction statistics

The function retrieves the database stats and finds the compaction table. It then iterates over all the leveldbTable rows and accumulates the entries. The function updates the disk size gauge, compaction time meter, compaction read meter, and compaction write meter with the accumulated values.

## Write delay statistics

The function retrieves the write delay statistic and parses it to retrieve the delayN, delayDuration, and paused values. It then updates the write delay N meter and write delay meter with the difference between the current and previous delayN and delayDuration values.

If a warning that the database is performing compaction has been displayed, any subsequent warnings will be withheld for one minute not to overwhelm the user.

## IO statistics

The function retrieves the IO statistics and updates the read and write IO meters with the accumulated values.

## Error handling

If any error occurs while retrieving or parsing the statistics, the function logs an error and continues to the next iteration. If the error persists, the function returns the error. # Documentation for leveldb package

The `leveldb` package provides a LevelDB implementation of the `ethdb.KeyValueStore` interface.

## Database struct

The `Database` struct is a LevelDB implementation of the `ethdb.KeyValueStore` interface.

### NewDatabase function

```go
func NewDatabase(file string, cache int, handles int, writeBufferSize int, openFiles int, blockSize int, blockCache int, bloomFilter int, compression int) (*Database, error)
```

The `NewDatabase` function creates a new LevelDB database with the given parameters. It takes a file path, cache size, number of handles, write buffer size, number of open files, block size, block cache size, bloom filter size, and compression level as arguments. It returns a new database and an error if any.

### Close function

```go
func (db *Database) Close() error
```

The `Close` function closes the database.

### Put function

```go
func (db *Database) Put(key []byte, value []byte) error
```

The `Put` function inserts the given value into the database with the given key. It returns an error if any.

### Get function

```go
func (db *Database) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the database. It returns the value as a byte slice and an error if any.

### Has function

```go
func (db *Database) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the database. It returns a boolean value indicating whether the key exists or not, and an error if any.

### Delete function

```go
func (db *Database) Delete(key []byte) error
```

The `Delete` function deletes the key-value pair associated with the given key from the database. It returns an error if any.

### NewBatch function

```go
func (db *Database) NewBatch() ethdb.Batch
```

The `NewBatch` function creates a new batch for the database. It returns a new batch.

### NewIterator function

```go
func (db *Database) NewIterator(prefix []byte, start []byte) ethdb.Iterator
```

The `NewIterator` function creates a new iterator for the database. It takes a prefix and a start key # Documentation for leveldb package

The `leveldb` package provides a key-value data store implementation based on LevelDB.

## DB struct

The `DB` struct represents a LevelDB database.

### NewIterator function

```go
func (db *DB) NewIterator(slice *util.Range, ro *opt.ReadOptions) iterator.Iterator
```

The `NewIterator` function creates a new iterator for the database. It takes a range and read options as arguments and returns a new iterator.

### Get function

```go
func (db *DB) Get(key []byte, ro *opt.ReadOptions) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the database. It takes a key and read options as arguments and returns the value as a byte slice and an error if any.

### Has function

```go
func (db *DB) Has(key []byte, ro *opt.ReadOptions) (bool, error)
```

The `Has` function checks if the given key exists in the database. It takes a key and read options as arguments and returns a boolean value indicating whether the key exists or not, and an error if any.

### Put function

```go
func (db *DB) Put(key, value []byte, wo *opt.WriteOptions) error
```

The `Put` function adds a key-value pair to the database. It takes a key, value, and write options as arguments and returns an error if any.

### Delete function

```go
func (db *DB) Delete(key []byte, wo *opt.WriteOptions) error
```

The `Delete` function deletes the key-value pair associated with the given key from the database. It takes a key and write options as arguments and returns an error if any.

### NewSnapshot function

```go
func (db *DB) NewSnapshot() Snapshot
```

The `NewSnapshot` function creates a new snapshot for the database. It returns a new snapshot.

### NewBatch function

```go
func (db *DB) NewBatch() Batch
```

The `NewBatch` function creates a new batch for the database. It returns a new batch.

### Write function

```go
func (db *DB) Write(batch Batch, wo *opt.WriteOptions) error
```

The `Write` function writes the given batch to the database. It takes a batch and write options as arguments and returns an error if any.

### Close function

```go
func (db *DB) Close() error
```

The `Close` function closes the database. It returns an error if any.

## Batch struct

The `Batch` struct represents a batch of operations to be written to the database.

### Put function

```go
func (b *Batch) Put(key, value []byte)
```

The `Put` function adds a key-value pair to the batch. It takes a key and value as arguments.

### Delete function

```go
func (b *Batch) Delete(key []byte)
```

The `Delete` function deletes the key-value pair associated with the given key from the batch. It takes a key as an argument.

### Write function

```go
func (b *Batch) Write(db *DB, wo *opt.WriteOptions) error
```

The `Write` function writes the batch to the given database. It takes a database and write options as arguments and returns an error if any.

### Reset function

```go
func (b *Batch) Reset()
```

The `Reset` function resets the batch.

## Snapshot interface

The `Snapshot` interface represents a snapshot of a key-value data store.

### Has function

```go
func (snap *snapshot) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the snapshot. It takes a key as an argument and returns a boolean value indicating whether the key exists or not, and an error if any.

### Get function

```go
func (snap *snapshot) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the value associated with the given key from the snapshot. It takes a key as an argument and returns the value as a byte slice and an error if any.

### Release function

```go
func (snap *snapshot) Release()
```

The `Release` function releases associated resources.

## Internal functions

### delete function

```go
func (r *batchReplay) delete(key []byte)
```

The `delete` function deletes the key-value pair associated with the given key from the database. It takes a key as an argument.

### bytesPrefixRange function

```go
func bytesPrefixRange(prefix, start []byte) *util.Range
```

The `bytesPrefixRange` function returns a key range that satisfies the given prefix and seek position. It takes a prefix and start key as arguments and returns a range.

### snapshot struct

```go
type snapshot struct {
	db *leveldb.Snapshot
}
```

The `snapshot` struct wraps a LevelDB snapshot for implementing the Snapshot interface.

### Has function

```go
func (snap *snapshot) Has(key []byte) (bool, error)
```

The `Has` function checks if the given key exists in the snapshot backing by a key-value data store. It takes a key as an argument and returns a boolean value indicating whether the key exists or not, and an error if any.

### Get function

```go
func (snap *snapshot) Get(key []byte) ([]byte, error)
```

The `Get` function retrieves the given key if it's present in the snapshot backing by key-value data store. It takes a key as an argument and returns the value as a byte slice and an error if any.

### Release function

```go
func (snap *snapshot) Release()
```

The `Release` function releases associated resources. Release should always succeed and can be called multiple times without causing an error.