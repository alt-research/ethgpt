# Downloader Package

The `downloader` package provides a way to download the blockchain history from the Ethereum network. It includes a `SyncMode` type that represents the synchronization mode of the downloader, and functions to marshal and unmarshal the `SyncMode` type to and from text.

## Types

### `SyncMode`

`SyncMode` is a uint32 that represents the synchronization mode of the downloader. It has three possible values: `FullSync`, `SnapSync`, and `LightSync`.

```go
type SyncMode uint32

const (
    FullSync  SyncMode = iota // Synchronise the entire blockchain history from full blocks
    SnapSync                  // Download the chain and the state via compact snapshots
    LightSync                 // Download only the headers and terminate afterwards
)
```

### `IsValid`

`IsValid` is a function that checks if a `SyncMode` value is valid.

```go
func (mode SyncMode) IsValid() bool
```

### `String`

`String` is a function that returns a string representation of a `SyncMode` value.

```go
func (mode SyncMode) String() string
```

### `MarshalText`

`MarshalText` is a function that marshals a `SyncMode` value to text.

```go
func (mode SyncMode) MarshalText() ([]byte, error)
```

### `UnmarshalText`

`UnmarshalText` is a function that unmarshals a `SyncMode` value from text.

```go
func (mode *SyncMode) UnmarshalText(text []byte) error
```