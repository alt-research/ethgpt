# Downloader Package

The `downloader` package provides an API that gives information about the current synchronization status. It offers only methods that operate on data that can be available to anyone without security risks.

## Structs

### `DownloaderAPI`

The `DownloaderAPI` struct provides an API for the downloader. It has an internal event loop that listens for events from the downloader through the global event mux. In case it receives one of these events, it broadcasts it to all syncing subscriptions that are installed through the `installSyncSubscription` channel.

#### Fields

- `d`: A pointer to the downloader.
- `mux`: A pointer to the event type mux.
- `installSyncSubscription`: A channel that installs new sync subscriptions.
- `uninstallSyncSubscription`: A channel that uninstalls sync subscriptions.

#### Methods

##### `NewDownloaderAPI`

```go
func NewDownloaderAPI(d *Downloader, m *event.TypeMux) *DownloaderAPI
```

`NewDownloaderAPI` creates a new `DownloaderAPI`.

##### `eventLoop`

```go
func (api *DownloaderAPI) eventLoop()
```

`eventLoop` runs a loop until the event mux closes. It will install and uninstall new sync subscriptions and broadcasts sync status updates to the installed sync subscriptions.

##### `Syncing`

```go
func (api *DownloaderAPI) Syncing(ctx context.Context) (*rpc.Subscription, error)
```

`Syncing` provides information when this node starts synchronizing with the Ethereum network and when it's finished.

## Functions

### `NewDownloader`

```go
func NewDownloader(chain ChainReader, engine eth.Engine, stateDb eth.StateDB, txPool TxPool, config *Config) *Downloader
```

`NewDownloader` creates a new downloader.

#### Parameters

- `chain`: A chain reader.
- `engine`: An Ethereum engine.
- `stateDb`: An Ethereum state database.
- `txPool`: A transaction pool.
- `config`: A downloader configuration.

#### Returns

A new downloader.

### `NewDownloaderAPI`

```go
func NewDownloaderAPI(d *Downloader, m *event.TypeMux) *DownloaderAPI
```

`NewDownloaderAPI` creates a new `DownloaderAPI`.

#### Parameters

- `d`: A pointer to the downloader.
- `m`: A pointer to the event type mux.

#### Returns

A new `DownloaderAPI`.

### `NewFastSyncDownloader`

```go
func NewFastSyncDownloader(chain ChainReader, engine eth.Engine, stateDb eth.StateDB, txPool TxPool, config *Config) *Downloader
```

`NewFastSyncDownloader` creates a new fast sync downloader.

#### Parameters

- `chain`: A chain reader.
- `engine`: An Ethereum engine.
- `stateDb`: An Ethereum state database.
- `txPool`: A transaction pool.
- `config`: A downloader configuration.

#### Returns

A new fast sync downloader.

### `NewLightSyncDownloader`

```go
func NewLightSyncDownloader(chain ChainReader, engine eth.Engine, stateDb eth.StateDB, txPool TxPool, config *Config) *Downloader
```

`NewLightSyncDownloader` creates a new light sync downloader.

#### Parameters

- `chain`: A chain reader.
- `engine`: An Ethereum engine.
- `stateDb`: An Ethereum state database.
- `txPool`: A transaction pool.
- `config`: A downloader configuration.

#### Returns

A new light sync downloader. ## DownloaderAPI Package

The `DownloaderAPI` package provides an API for downloading and syncing Ethereum blocks and headers. It includes functions for subscribing to syncing updates and for unsubscribing from those updates.

### `NewDownloaderAPI`

```go
func NewDownloaderAPI(config *Config, chain consensus.ChainReader, engine eth.Engine, headers eth.HeaderChainReader, bodies eth.BodyChainReader, state trie.Database, txpool core.TxPool, txpoolAPI TxPoolAPI, networkID uint64, syncer *syncer.Syncer, txLookup *eth.TxLookupEntry, txLookupLimit int, txLookupTimeout time.Duration, txLookupTicker time.Duration, txLookupBackoff time.Duration, txLookupBackoffFactor float64, txLookupBackoffJitter float64, txLookupBackoffLimit time.Duration, txLookupBackoffLimitFactor float64, txLookupBackoffLimitJitter float64, txLookupBackoffLimitMax time.Duration, txLookupBackoffLimitMaxFactor float64, txLookupBackoffLimitMaxJitter float64, txLookupBackoffLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxLimit time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxLimitFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxLimitJitter float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxLimitMax time.Duration, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxMaxLimitMaxFactor float64, txLookupBackoffLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMaxLimitMax