", ErrFreezerBatchOutOfOrder, batch.curItem, item)
	}
	// Encode the data.
	batch.encBuffer.reset()
	if err := rlp.Encode(&batch.encBuffer, data); err != nil {
		return err
	}
	// Compress the data if necessary.
	if batch.sb != nil {
		batch.sb.Reset()
		batch.sb.Write(batch.encBuffer.buf)
		batch.dataBuffer = batch.sb.Bytes(batch.dataBuffer[:0])
	} else {
		batch.dataBuffer = append(batch.dataBuffer[:0], batch.encBuffer.buf...)
	}
	// Append the data to the table.
	if err := batch.t.append(batch.indexBuffer, batch.dataBuffer); err != nil {
		return err
	}
	// Update the batch state.
	batch.curItem++
	batch.totalBytes += int64(len(batch.indexBuffer) + len(batch.dataBuffer))
	return nil
}

// AppendRaw adds data at the end of the freezer table without RLP-encoding it. The item number
// is a precautionary parameter to ensure data correctness, but the table will reject already
// existing data.
func (batch *freezerTableBatch) AppendRaw(item uint64, data []byte) error {
	if item != batch.curItem {
		return fmt.Errorf("%w: have %d want %d", ErrFreezer # Freezer Table Batch

The `freezerTableBatch` is a struct that represents a batch of items to be written to a `freezerTable`. It provides methods to append items to the batch, compress the data, and write the batched items to the backing `freezerTable`.

## Variables

### `freezerBatchBufferLimit`

`freezerBatchBufferLimit` is a constant that represents the maximum size of the buffer before the batch is committed.

## Types

### `freezerTableBatch`

`freezerTableBatch` is a struct that represents a batch of items to be written to a `freezerTable`.

#### Fields

- `t` - the `freezerTable` that the batch belongs to.
- `sb` - the `snappyBuffer` used to compress the data.
- `encBuffer` - the buffer used to encode the data.
- `dataBuffer` - the buffer used to store the data.
- `indexBuffer` - the buffer used to store the index entries.
- `totalBytes` - the total number of bytes in the batch.
- `curItem` - the current item number in the batch.

#### Methods

##### `Append`

`Append` appends an item to the batch.

```go
func (batch *freezerTableBatch) Append(item uint64, data interface{}) error
```

###### Parameters

- `item` - the item