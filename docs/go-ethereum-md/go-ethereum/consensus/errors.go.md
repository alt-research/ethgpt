## Package Documentation

The `consensus` package contains the consensus rules and validation functions for the Ethereum blockchain.

## Variable Documentation

### `var ErrUnknownAncestor = errors.New("unknown ancestor")`

The `ErrUnknownAncestor` variable is an error that is returned when validating a block requires an ancestor that is unknown.

### `var ErrPrunedAncestor = errors.New("pruned ancestor")`

The `ErrPrunedAncestor` variable is an error that is returned when validating a block requires an ancestor that is known, but the state of which is not available.

### `var ErrFutureBlock = errors.New("block in the future")`

The `ErrFutureBlock` variable is an error that is returned when a block's timestamp is in the future according to the current node.

### `var ErrInvalidNumber = errors.New("invalid block number")`

The `ErrInvalidNumber` variable is an error that is returned if a block's number doesn't equal its parent's plus one.

### `var ErrInvalidTerminalBlock = errors.New("invalid terminal block")`

The `ErrInvalidTerminalBlock` variable is an error that is returned if a block is invalid with respect to the terminal total difficulty.