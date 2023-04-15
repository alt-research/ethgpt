# Pruner

The `pruner` is a struct responsible for pruning historical light chain data. It has the following fields:

- `db`: an instance of `ethdb.Database` used to store the chain data.
- `indexers`: a slice of `*core.ChainIndexer` used to index the chain data.
- `closeCh`: a channel used to signal the background goroutines to exit.
- `wg`: a `sync.WaitGroup` used to wait for all background goroutines to exit.

## Functions

### newPruner

```go
func newPruner(db ethdb.Database, indexers ...*core.ChainIndexer) *pruner
```

`newPruner` is a function that returns a new instance of `pruner`. It takes an instance of `ethdb.Database` and a variable number of `*core.ChainIndexer` as arguments.

### close

```go
func (p *pruner) close()
```

`close` is a method of `pruner` that notifies all background goroutines belonging to `pruner` to exit.

### loop

```go
func (p *pruner) loop()
```

`loop` is a method of `pruner` that periodically queries the status of chain indexers and prunes useless historical chain data. It uses a ticker to trigger a history clean 2 times a day. Whenever Geth restarts, it will iterate all historical sections even they don't exist at all(below checkpoint) so that light client can prune cached chain data that was ODRed after pruning that section.