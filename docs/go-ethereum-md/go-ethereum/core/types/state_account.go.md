# StateAccount

The `StateAccount` type is a representation of Ethereum accounts in the consensus layer. These objects are stored in the main account trie. 

## Variables

None.

## Functions

None.

## Structs

### `StateAccount`

`StateAccount` is a struct that represents an Ethereum account in the consensus layer.

#### Fields

- `Nonce` - the account's nonce, which is the number of transactions sent from this account.
- `Balance` - the account's balance, which is the amount of ether held by this account.
- `Root` - the merkle root of the storage trie for this account.
- `CodeHash` - the hash of the account's code.

#### Example

```go
account := StateAccount{
    Nonce:    0,
    Balance:  big.NewInt(100),
    Root:     common.HexToHash("0x1234567890abcdef"),
    CodeHash: []byte{0x01, 0x02, 0x03},
}
```