# Shutdown Tracker

The `shutdowncheck` package provides a `ShutdownTracker` service that reports previous unclean shutdowns upon start. It needs to be started after a successful start-up and stopped after a successful shutdown, just before the db is closed.

## Usage

### NewShutdownTracker

```go
func NewShutdownTracker(db ethdb.Database) *ShutdownTracker
```

`NewShutdownTracker` creates a new `ShutdownTracker` instance and has no other side-effect. It takes an `ethdb.Database` as a parameter and returns a pointer to a new `ShutdownTracker` instance.

### MarkStartup

```go
func (t *ShutdownTracker) MarkStartup()
```

`MarkStartup` is to be called in the beginning when the node starts. It will push a new startup marker to the db and report previous unclean shutdowns. It takes no parameters and returns nothing.

### Start

```go
func (t *ShutdownTracker) Start()
```

`Start` runs an event loop that updates the current marker's timestamp every 5 minutes. It takes no parameters and returns nothing.

### Stop

```go
func (t *ShutdownTracker) Stop()
```

`Stop` will stop the update loop and clear the current marker. It takes no parameters and returns nothing.