# Downloader Package

The `downloader` package provides a way to download blocks and headers from the Ethereum network. It handles all the cancellation, interruption, and timeout mechanisms of a data retrieval to allow blocking API calls.

## Functions

### `fetchHeadersByHash`

```go
func (d *Downloader) fetchHeadersByHash(p *peerConnection, hash common.Hash, amount int, skip int, reverse bool) ([]*types.Header, []common.Hash, error)
```

`fetchHeadersByHash` is a blocking version of `Peer.RequestHeadersByHash` which handles all the cancellation, interruption, and timeout mechanisms of a data retrieval to allow blocking API calls. It takes a `peerConnection`, a `hash`, an `amount`, a `skip`, and a `reverse` boolean as input parameters. It returns a slice of `Header`, a slice of `Hash`, and an error.

### `fetchHeadersByNumber`

```go
func (d *Downloader) fetchHeadersByNumber(p *peerConnection, number uint64, amount int, skip int, reverse bool) ([]*types.Header, []common.Hash, error)
```

`fetchHeadersByNumber` is a blocking version of `Peer.RequestHeadersByNumber` which handles all the cancellation, interruption, and timeout mechanisms of a data retrieval to allow blocking API calls. It takes a `peerConnection`, a `number`, an `amount`, a `skip`, and a `reverse` boolean as input parameters. It returns a slice of `Header`, a slice of `Hash`, and an error. ## Function: eth.BlockHeadersPacket

The `eth.BlockHeadersPacket` function is a method that returns a block headers packet from the Ethereum network. It takes in a context, a peer, a block number, and a maximum number of headers to fetch. It returns a `BlockHeadersPacket`, a slice of `common.Hash` values, and an error.

### Parameters

- `ctx` (type: `context.Context`) - The context of the function call.
- `peer` (type: `p2p.Peer`) - The peer to fetch the headers from.
- `number` (type: `uint64`) - The block number to start fetching headers from.
- `maxHeaders` (type: `uint64`) - The maximum number of headers to fetch.

### Returns

- `BlockHeadersPacket` (type: `eth.BlockHeadersPacket`) - A struct containing the headers fetched from the peer.
- `[]common.Hash` - A slice of `common.Hash` values representing the hashes of the headers fetched.
- `error` - An error, if any occurred during the function call.

### Example

```go
package main

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/eth"
	"github.com/ethereum/go-ethereum/p2p"
	"github.com/ethereum/go-ethereum/common"
)

func main() {
	// Create a new context
	ctx := context.Background()

	// Create a new peer
	peer := &p2p.Peer{}

	// Set the block number to start fetching headers from
	number := uint64(100)

	// Set the maximum number of headers to fetch
	maxHeaders := uint64(10)

	// Fetch the block headers packet
	headersPacket, headerHashes, err := eth.BlockHeadersPacket(ctx, peer, number, maxHeaders)

	// Check for errors
	if err != nil {
		fmt.Println("Error fetching block headers packet:", err)
		return
	}

	// Print the headers fetched
	for _, header := range headersPacket.Headers {
		fmt.Println("Header:", header)
	}

	// Print the header hashes
	for _, hash := range headerHashes {
		fmt.Println("Header hash:", hash)
	}
}
```