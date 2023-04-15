This is a Go source code file that contains a package named `miner`. The package provides an implementation of the Ethereum miner.

The file contains two test functions: `TestUnconfirmedInsertBounds` and `TestUnconfirmedShifts`.

The `TestUnconfirmedInsertBounds` function tests that inserting blocks into the unconfirmed set accumulates them until the desired depth is reached, after which they begin to be dropped.

The `TestUnconfirmedShifts` function tests that shifting blocks out of the unconfirmed set works both for normal cases as well as for corner cases such as empty sets, empty shifts, or full shifts.

The `noopChainRetriever` type is an implementation of `headerRetriever` that always returns nil for any