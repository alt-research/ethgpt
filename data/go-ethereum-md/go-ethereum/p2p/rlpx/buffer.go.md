# RLPX Package

The RLPX package contains functions that are used for cryptographic operations in a Go program. The package includes two types of buffers, `readBuffer` and `writeBuffer`, which are used for network reads and writes, respectively. The package also includes two utility functions, `readUint24` and `putUint24`, which are used to read and write 24-bit unsigned integers.

## readBuffer

The `readBuffer` type implements buffering for network reads. It is similar to `bufio.Reader`, but with two crucial differences: the buffer slice is exposed, and the buffer keeps all read data available until reset.

### reset

`reset` removes all processed data which was read since the last call to `reset`. After `reset`, `len(b.data)` is zero.

### read

`read` reads at least `n` bytes from `r`, returning the bytes. The returned slice is valid until the next call to `reset`.

### grow

`grow` ensures the buffer has at least `n` bytes of unused space.

## writeBuffer

The `writeBuffer` type implements buffering for network writes. It is essentially a convenience wrapper around a byte slice.

### reset

`reset` resets the buffer to an empty state.

### appendZero

`appendZero` appends `n` zero bytes to the buffer and returns a slice of the appended bytes.

### Write

`Write` writes `data` to the buffer and returns the number of bytes written.

## readUint24 and putUint24

`readUint24` reads a 24-bit unsigned integer from a byte slice.

`putUint24` writes a 24-bit unsigned integer to a byte slice.

## Constants

`maxUint24` is the maximum value of a 24-bit unsigned integer.