# Types Package

The `types` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the data types used in the Ethereum blockchain, including the `Withdrawal` type.

## Withdrawal Type

The `Withdrawal` type represents a validator withdrawal from the consensus layer. It contains the following fields:

- `Index` - a monotonically increasing identifier issued by the consensus layer.
- `Validator` - the index of the validator associated with the withdrawal.
- `Address` - the target address for withdrawn ether.
- `Amount` - the value of withdrawal in Gwei.

## Withdrawals Type

The `Withdrawals` type is a slice of `Withdrawal` pointers and implements `DerivableList` for withdrawals. It contains the following functions:

### `Len`

`Len` returns the length of the slice.

```go
func (s Withdrawals) Len() int
```

#### Parameters

- `s` - the slice of `Withdrawal` pointers.

#### Return Values

- `int` - the length of the slice.

### `EncodeIndex`

`EncodeIndex` encodes the i'th withdrawal to w. Note that this does not check for errors because we assume that *Withdrawal will only ever contain valid withdrawals that were either constructed by decoding or via public API in this package.

```go
func (s Withdrawals) EncodeIndex(i int, w *bytes.Buffer)
```

#### Parameters

- `s` - the slice of `Withdrawal` pointers.
- `i` - the index of the withdrawal to encode.
- `w` - the buffer to write the encoded withdrawal to.