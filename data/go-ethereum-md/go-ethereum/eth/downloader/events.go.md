# Downloader Package

The `downloader` package is responsible for downloading and synchronizing the Ethereum blockchain. It provides a way to download blocks and headers from the network and store them in the local database.

## Constants

There are no constants defined in this package.

## Variables

- `DoneEvent`: A struct that represents the event when the synchronization is complete. It contains the latest header of the blockchain.
- `StartEvent`: A struct that represents the event when the synchronization starts.
- `FailedEvent`: A struct that represents the event when the synchronization fails. It contains the error that caused the failure.

## Functions

There are no functions defined in this package.

## Types

### `DoneEvent`

```go
type DoneEvent struct {
    Latest *types.Header
}
```

`DoneEvent` is a struct that represents the event when the synchronization is complete. It contains the latest header of the blockchain.

### `StartEvent`

```go
type StartEvent struct{}
```

`StartEvent` is a struct that represents the event when the synchronization starts.

### `FailedEvent`

```go
type FailedEvent struct {
    Err error
}
```

`FailedEvent` is a struct that represents the event when the synchronization fails. It contains the error that caused the failure.