# Holdable Iterator

The `holdableIterator` struct is a wrapper around an underlying database iterator. It extends the basic iterator interface by adding a `Hold` method which can hold the element locally where the iterator is currently located and serve it up next time.

## Fields

- `it`: The underlying database iterator.
- `key`: The key of the current key/value pair.
- `val`: The value of the current key/value pair.
- `atHeld`: Whether the iterator is currently at the held element.

## Methods

### newHoldableIterator

```go
func newHoldableIterator(it ethdb.Iterator) *holdableIterator
```

`newHoldableIterator` initializes a new `holdableIterator` with the given iterator.

### Hold

```go
func (it *holdableIterator) Hold()
```

`Hold` holds the element locally where the iterator is currently located which can be served up next time.

### Next

```go
func (it *holdableIterator) Next() bool
```

`Next` moves the iterator to the next key/value pair. It returns whether the iterator is exhausted.

### Error

```go
func (it *holdableIterator) Error() error
```

`Error` returns any accumulated error. Exhausting all the key/value pairs is not considered to be an error.

### Release

```go
func (it *holdableIterator) Release()
```

`Release` releases associated resources. Release should always succeed and can be called multiple times without causing error.

### Key

```go
func (it *holdableIterator) Key() []byte
```

`Key` returns the key of the current key/value pair, or nil if done. The caller should not modify the contents of the returned slice, and its contents may change on the next call to Next.

### Value

```go
func (it *holdableIterator) Value() []byte
```

`Value` returns the value of the current key/value pair, or nil if done. The caller should not modify the contents of the returned slice, and its contents may change on the next call to Next.