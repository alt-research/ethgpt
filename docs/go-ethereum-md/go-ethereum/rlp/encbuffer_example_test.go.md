# RLP EncoderBuffer Function

The `ExampleEncoderBuffer` function is a demonstration of how to use the `EncoderBuffer` function from the `rlp` package. This function encodes a nested list of integers into a byte slice using the RLP (Recursive Length Prefix) encoding algorithm.

## Functionality

The `ExampleEncoderBuffer` function creates a new `bytes.Buffer` instance and passes it to the `rlp.NewEncoderBuffer` function to create a new `EncoderBuffer` instance. It then uses the `EncoderBuffer` instance to encode a nested list of integers `[4, [5, 6]]` into the buffer. The encoded byte slice is then printed to the console in hexadecimal format.

## Parameters

This function takes no parameters.

## Return Value

This function does not return any values.

## Example Usage

```go
func main() {
    ExampleEncoderBuffer()
}
```

## Output

The output of this function is a hexadecimal representation of the encoded byte slice:

```
C404C20506
```