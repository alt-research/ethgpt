# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the raw database interface for Ethereum.

## Functions

### `TestResetFreezer`

`TestResetFreezer` is a test function that tests the `Reset` method of the `ResettableFreezer` type.

#### Parameters

- `t` - the testing object.

### `TestFreezerCleanup`

`TestFreezerCleanup` is a test function that tests the cleanup operation of the `ResettableFreezer` type.

#### Parameters

- `t` - the testing object.

## Types

### `ResettableFreezer`

`ResettableFreezer` is a type that represents a resettable freezer.

#### Fields

- `db` - the underlying database.
- `ancients` - the ancient database.
- `table` - the table definition.
- `ancientTable` - the ancient table definition.
- `ancientTableSize` - the size of the ancient table.
- `ancientTableLimit` - the limit of the ancient table.
- `ancientTableCleanup` - the cleanup function for the ancient table.
- `ancientTableCleanupInterval` - the cleanup interval for the ancient table.
- `ancientTableCleanupThreshold` - the cleanup threshold for the ancient table.
- `ancientTableCleanupBatchSize` - the cleanup batch size for the ancient table.
- `ancientTableCleanupBatchTimeout` - the cleanup batch timeout for the ancient table.
- `ancientTableCleanupBatchLimit` - the cleanup batch limit for the ancient table.
- `ancientTableCleanupBatchSleep` - the cleanup batch sleep for the ancient table.
- `ancientTableCleanupBatchRetry` - the cleanup batch retry for the ancient table.
- `anc