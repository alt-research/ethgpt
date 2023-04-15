# Downloader Package

The `downloader` package provides a way to download and synchronize the Ethereum blockchain. It manages the active state sync and accepts requests on its behalf.

## Functions

### `syncState`

```go
func (d *Downloader) syncState(root common.Hash) *stateSync
```

`syncState` starts downloading state with the given root hash. It creates a new state sync and returns it.

### `stateFetcher`

```go
func (d *Downloader) stateFetcher()
```

`stateFetcher` manages the active state sync and accepts requests on its behalf. It listens for new state sync requests and runs them.

### `runStateSync`

```go
func (d *Downloader) runStateSync(s *stateSync) *stateSync
```

`runStateSync` runs a state synchronisation until it completes or another root hash is requested to be switched over to. It starts the state sync and listens for new state sync requests.

### `newStateSync`

```go
func newStateSync(d *Downloader, root common.Hash) *stateSync
```

`newStateSync` creates a new state trie download scheduler. It returns a new state sync.

### `run`

```go
func (s *stateSync) run()
```

`run` starts the task assignment and response processing loop, blocking until it finishes, and finally notifying any goroutines waiting for the loop to finish.

### `Wait`

```go
func (s *stateSync) Wait() error
```

`Wait` blocks until the sync is done or canceled. It returns any error hit during sync.

### `Cancel`

```go
func (s *stateSync) Cancel() error
```

`Cancel` cancels the sync and waits until it has shut down. It returns any error hit during sync.