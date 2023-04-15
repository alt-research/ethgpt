# FullSyncTester Documentation

The `FullSyncTester` is an auxiliary service that allows Geth to perform full sync alone without consensus-layer attached. Users must specify a valid block as the sync target. This tester can be applied to different networks, no matter it's pre-merge or post-merge, but only for full-sync.

## Function: RegisterFullSyncTester

The `RegisterFullSyncTester` function registers the full-sync tester service into the node stack for launching and stopping the service controlled by node. It takes in a `*node.Node`, an `*eth.Ethereum`, and a `*types.Block` and returns a `*FullSyncTester` and an error. 

```go
func RegisterFullSyncTester(stack *node.Node, backend *eth.Ethereum, block *types.Block) (*FullSyncTester, error) {
	cl := &FullSyncTester{
		api:    NewConsensusAPI(backend),
		block:  block,
		closed: make(chan struct{}),
	}
	stack.RegisterLifecycle(cl)
	return cl, nil
}
```

## Function: Start

The `Start` function launches the beacon sync with the provided sync target. It takes no arguments and returns an error.

```go
func (tester *FullSyncTester) Start() error {
	tester.wg.Add(1)
	go func() {
		defer tester.wg.Done()

		ticker := time.NewTicker(time.Second * 5)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				// Don't bother downloader in case it's already syncing.
				if tester.api.eth.Downloader().Synchronising() {
					continue
				}
				// Short circuit in case the target block is already stored
				// locally. TODO(somehow terminate the node stack if target
				// is reached).
				if tester.api.eth.BlockChain().HasBlock(tester.block.Hash(), tester.block.NumberU64()) {
					log.Info("Full-sync target reached", "number", tester.block.NumberU64(), "hash", tester.block.Hash())
					return
				}
				// Trigger beacon sync with the provided block header as
				// trusted chain head.
				err := tester.api.eth.Downloader().BeaconSync(downloader.FullSync, tester.block.Header(), nil)
				if err != nil {
					log.Info("Failed to beacon sync", "err", err)
				}

			case <-tester.closed:
				return
			}
		}
	}()
	return nil
}
```

## Function: Stop

The `Stop` function stops the full-sync tester to stop all background activities