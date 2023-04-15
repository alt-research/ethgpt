# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including the implementation of the Bloom filter.

## Variables

### `BloomByteLength`

`BloomByteLength` represents the number of bytes used in a header log bloom.

### `BloomBitLength`

`BloomBitLength` represents the number of bits used in a header log bloom.

## Types

### `Bloom`

`Bloom` represents a 2048 bit bloom filter.

#### Functions

##### `BytesToBloom`

`BytesToBloom` converts a byte slice to a bloom filter.

```go
func BytesToBloom(b []byte) Bloom
```

###### Parameters

- `b` - the byte slice to convert.

###### Return Values

- `Bloom` - the bloom filter.

##### `SetBytes`

`SetBytes` sets the content of `b` to the given bytes.

```go
func (b *Bloom) SetBytes(d []byte)
```

###### Parameters

- `d` - the bytes to set.

##### `Add`

`Add` adds `d` to the filter. Future calls of `Test(d)` will return true.

```go
func (b *Bloom) Add(d []byte)
```

###### Parameters

- `d` - the bytes to add.

##### `Big`

`Big` converts `b` to a big integer.

```go
func (b Bloom) Big() *big.Int
```

###### Return Values

- `*big.Int` - the big integer.

##### `Bytes`

`Bytes` returns the backing byte slice of the bloom.

```go
func (b Bloom) Bytes() []byte
```

###### Return Values

- `[]byte` - the backing byte slice.

##### `Test`

`Test` checks if the given topic is present in the bloom filter.

```go
func (b Bloom) Test(topic []byte) bool
```

###### Parameters

- `topic` - the topic to check.

###### Return Values

- `bool` - true if the topic is present, false otherwise.

##### `MarshalText`

`MarshalText` encodes `b` as a hex string with 0x prefix.

```go
func (b Bloom) MarshalText() ([]byte, error)
```

###### Return Values

- `[]byte` - the encoded hex string.
- `error` - an error, if any.

##### `UnmarshalText`

`UnmarshalText` decodes `b` from a hex string with 0x prefix.

```go
func (b *Bloom) UnmarshalText(input []byte) error
```

###### Parameters

- `input` - the hex string to decode.

###### Return Values

- `error` - an error, if any.

#### Constants

##### `BloomByteLength`

`BloomByteLength` represents the number of bytes used in a header log bloom.

##### `BloomBitLength`

`BloomBitLength` represents the number of bits used in a header log bloom.

#### Functions

##### `CreateBloom`

`CreateBloom` creates a bloom filter out of the given receipts (+logs).

```go
func CreateBloom(receipts Receipts) Bloom
```

###### Parameters

- `receipts` - the receipts to create the bloom filter from.

###### Return Values

- `Bloom` - the bloom filter.

##### `LogsBloom`

`LogsBloom` returns the bloom bytes for the given logs.

```go
func LogsBloom(logs []*Log) []byte
```

###### Parameters

- `logs` - the logs to create the bloom filter from.

###### Return Values

- `[]byte` - the bloom bytes. ## Bloom9

The `Bloom9` function takes a byte slice as input and returns a byte slice representing the Bloom filter of the input data. It creates a new `Bloom` instance, sets the bytes of the input data to the Bloom filter, and returns the bytes of the Bloom filter.

## bloomValues

The `bloomValues` function takes a byte slice and a byte slice as input and returns six values as output. It calculates the hash of the input data using the Keccak256 algorithm, reads the hash into the `hashbuf` byte slice, and calculates the bits to flip and the indices for the bytes to OR in. It returns the indices and values as six separate values.

## BloomLookup

The `BloomLookup` function is a convenience method that takes a `Bloom` instance and a `bytesBacked` instance as input and returns a boolean value. It tests whether the bytes of the `bytesBacked` instance are present in the `Bloom` filter and returns `true` if they are, `false` otherwise.