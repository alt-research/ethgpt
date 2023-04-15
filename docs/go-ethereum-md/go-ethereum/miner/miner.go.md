This is a Go source code file that contains a package named `miner`. The package implements Ethereum block creation and mining.

The `Backend` interface defines the methods required for mining. Only a full node is capable of offering all the functions here. The interface has two methods:

- `BlockChain() *core.BlockChain`: returns the blockchain.
- `TxPool() *txpool.TxPool`: returns the transaction pool.

The `Config` struct defines the configuration parameters of mining. The struct has the following fields:

- `Etherbase`: a `common.Address` object that represents the public address for This is a Go source code file that contains a `Miner` struct and several methods that operate on it. The `Miner` struct represents a miner that can mine blocks on the Ethereum blockchain.

The `Miner` struct has the following fields:

- `config`: a `*params.ChainConfig` object that represents the configuration of the blockchain.
- `engine`: This is a Go source code file that contains a `Miner` struct with several methods.

The `Miner` struct has a `worker` field of type `*worker` which is a private struct that handles the actual mining work.

The `EnablePreseal` method enables the preseal mining feature by calling the `enablePreseal` method of the `worker` field.

The `DisablePreseal` method turns off the preseal mining feature by calling the `disablePreseal` method of the `worker` field. This method is not intended to be exposed to the API and is only for outside projects that use this library.

The `SubscribePendingLogs` method starts delivering logs from pending transactions to the given channel by subscribing to the `pendingLogsFeed` of the `worker` field.

The `BuildPayload` method builds the payload according to the provided parameters by calling the `buildPayload` method of the `worker` field.

Here is an example of how to use the `Miner` struct:

```
package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/miner"
)

func main() {
	// Create a new miner
	m := miner.New(nil)

	// Enable preseal mining
	m.EnablePreseal()

	// Disable preseal mining
	m.DisablePreseal()

	// Subscribe to pending logs
	logsCh := make(chan []*types.Log)
	sub := m.SubscribePendingLogs(logsCh)

	// Build a payload
	args := &miner.BuildPayloadArgs{
		Coinbase:  "0x1234567890123456789012345678901234567890",
		Timestamp: 1234567890,
	}
	payload, err := m.BuildPayload(args)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Payload:", payload)

	// Unsubscribe from pending logs
	sub.Unsubscribe()
}
```