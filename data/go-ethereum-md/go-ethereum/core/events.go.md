# Ethereum Core Package

This package contains the core functionality of the Ethereum blockchain. It includes the implementation of the transaction pool, block import, and chain reorganization.

## Type `NewTxsEvent`

`NewTxsEvent` is a struct that is posted when a batch of transactions enter the transaction pool.

```go
type NewTxsEvent struct{ Txs []*types.Transaction }
```

### Field

- `Txs` - a slice of `*types.Transaction` representing the transactions that have entered the transaction pool.

## Type `NewMinedBlockEvent`

`NewMinedBlockEvent` is a struct that is posted when a block has been imported.

```go
type NewMinedBlockEvent struct{ Block *types.Block }
```

### Field

- `Block` - a `*types.Block` representing the block that has been imported.

## Type `RemovedLogsEvent`

`RemovedLogsEvent` is a struct that is posted when a chain reorganization happens.

```go
type RemovedLogsEvent struct{ Logs []*types.Log }
```

### Field

- `Logs` - a slice of `*types.Log` representing the logs that have been removed during the chain reorganization.

## Type `ChainEvent`

`ChainEvent` is a struct that is posted when a block has been imported or removed during a chain reorganization.

```go
type ChainEvent struct {
	Block *types.Block
	Hash  common.Hash
	Logs  []*types.Log
}
```

### Fields

- `Block` - a `*types.Block` representing the block that has been imported or removed.
- `Hash` - a `common.Hash` representing the hash of the block that has been imported or removed.
- `Logs` - a slice of `*types.Log` representing the logs that have been imported or removed during the chain reorganization.

## Type `ChainSideEvent`

`ChainSideEvent` is a struct that is posted when a block has been imported on a side chain.

```go
type ChainSideEvent struct {
	Block *types.Block
}
```

### Field

- `Block` - a `*types.Block` representing the block that has been imported on a side chain.

## Type `ChainHeadEvent`

`ChainHeadEvent` is a struct that is posted when a new block has been added to the main chain.

```go
type ChainHeadEvent struct{ Block *types.Block }
```

### Field

- `Block` - a `*types.Block` representing the new block that has been added to the main chain.