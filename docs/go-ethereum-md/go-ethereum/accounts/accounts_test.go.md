# TextHash Function

The `TextHash` function is a utility function that takes a byte slice as input and returns a hash of the input using the SHA3-256 algorithm. The function is used to generate a hash of a string that can be used as an identifier in the Ethereum blockchain.

## Parameters

- `data []byte`: The input byte slice to be hashed.

## Return Value

- `[]byte`: The resulting hash of the input byte slice.

## Example

```go
hash := TextHash([]byte("Hello Joe"))
```

This will generate a hash of the input byte slice "Hello Joe" using the SHA3-256 algorithm and return the resulting hash as a byte slice. The resulting hash can be used as an identifier in the Ethereum blockchain.