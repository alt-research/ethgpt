## Package snapshot

The `snapshot` package provides functionality for creating and manipulating snapshot accounts. A snapshot account is a modified version of a state account, where the root is replaced with a byte slice. This format can be used to represent full-consensus format or slim-snapshot format which replaces the empty root and code hash as nil byte slice.

### Types

#### Account

`Account` is a struct that represents a snapshot account. It has the following fields:

- `Nonce`: The nonce of the account.
- `Balance`: The balance of the account.
- `Root`: The root of the account.
- `CodeHash`: The code hash of the account.

#### SlimAccount

```go
func SlimAccount(nonce uint64, balance *big.Int, root common.Hash, codehash []byte) Account
```

`SlimAccount` converts a state account content into a slim snapshot account.

#### SlimAccountRLP

```go
func SlimAccountRLP(nonce uint64, balance *big.Int, root common.Hash, codehash []byte) []byte
```

`SlimAccountRLP` converts a state account content into a slim snapshot version RLP encoded.

#### FullAccount

```go
func FullAccount(data []byte) (Account, error)
```

`FullAccount` decodes the data on the 'slim RLP' format and returns the consensus format account.

#### FullAccountRLP

```go
func FullAccountRLP(data []byte) ([]byte, error)
```

`FullAccountRLP` converts data on the 'slim RLP' format into the full RLP-format.