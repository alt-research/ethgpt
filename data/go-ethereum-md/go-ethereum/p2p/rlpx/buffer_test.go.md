# RLPX Package

This package contains a single test function `TestReadBufferReset` that tests the `readBuffer` type's `read` and `reset` methods.

## TestReadBufferReset

This function tests the `readBuffer` type's `read` and `reset` methods. It creates a `bytes.Reader` from a hex-encoded string and initializes a `readBuffer` instance. It then reads from the `bytes.Reader` using the `read` method of the `readBuffer` instance and asserts that the returned byte slices match the expected values. It then calls the `reset` method of the `readBuffer` instance and reads from the `bytes.Reader` again, asserting that the returned byte slices match the expected values. Finally, it attempts to read from the `bytes.Reader` again, expecting an error due to reaching the end of the input.

The purpose of this test is to ensure that the `readBuffer` type's `read` and `reset` methods work correctly and that the `readBuffer` instance can be reused after calling `reset`.