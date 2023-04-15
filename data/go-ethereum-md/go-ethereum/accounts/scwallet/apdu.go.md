# Smart Card Wallet

The `scwallet` package provides functionality for interacting with smart cards. It includes two types, `commandAPDU` and `responseAPDU`, which represent application data units sent to and received from a smart card, respectively.

## commandAPDU

`commandAPDU` represents an application data unit sent to a smart card. It has the following fields:

- `Cla`: the class of the command.
- `Ins`: the instruction code of the command.
- `P1`: the first parameter of the command.
- `P2`: the second parameter of the command.
- `Data`: the command data.
- `Le`: the expected length of the response data.

### serialize

`serialize` serializes a `commandAPDU` into a byte slice.

## responseAPDU

`responseAPDU` represents an application data unit received from a smart card. It has the following fields:

- `Data`: the response data.
- `Sw1`: the first status word.
- `Sw2`: the second status word.

### deserialize

`deserialize` deserializes a byte slice into a `responseAPDU`. It returns an error if the byte slice is too short to contain the status words.