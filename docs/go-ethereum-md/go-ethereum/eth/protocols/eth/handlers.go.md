## Introduction

This document provides documentation for the source code of an Ethereum blockchain node in a Go codebase. The codebase is written in Go programming language.

## handleGetBlockHeaders66 Function

The `handleGetBlockHeaders66` function is the eth/66 version of the `handleGetBlockHeaders` function. The function decodes the complex header query and calls the `ServiceGetBlockHeadersQuery` function to assemble the response to a header query. The function returns an error if the message decoding fails.

```go
func handleGetBlockHeaders66(backend Backend, msg Decoder, peer *Peer) error {
    // Decode the complex header query
    var query GetBlockHeadersPacket66
    if err := msg.Decode(&query); err != nil {
        return fmt.Errorf("%w: message %v: %v", errDecode, msg, err)
    }
    response := ServiceGetBlockHeadersQuery(backend.Chain(), query.GetBlock ## Introduction

This document provides documentation for the source code of a Go codebase. The codebase contains several functions that are responsible for handling block header and body retrieval requests in the Ethereum network. The codebase is written in Go programming language.

## GetBlockHeaders Function

The `GetBlockHeaders` function is responsible for handling block header retrieval requests in the Ethereum network. The function takes two parameters: a ## Introduction

This document provides documentation for the source code of a Go codebase. The codebase contains several functions that are responsible for handling various network messages in the Ethereum protocol. The functions are written in Go programming language.

## Functions

### ServiceGetBlockHeadersQuery Function

The `ServiceGetBlockHeadersQuery` function assembles the response to a block header query. It is exposed to allow external packages to test protocol behavior. The function takes two parameters: a `chain` parameter of type `*core.BlockChain` and a `query` parameter of type `GetBlockHeadersPacket`. The function gathers block header data until the fetch or network limits are reached. It returns a ## Introduction

This document provides documentation for the source code of a Go codebase. The codebase contains several functions that handle different types of messages related to blockchain synchronization. The functions are written in Go programming language.

## handleBlockAnnounce Function

The `handleBlockAnnounce` function is responsible for handling a block announcement message received from a peer. The function takes three parameters: a `backend` ## Introduction

This document provides documentation for the source code of a Go codebase. The codebase contains several functions that handle transactions and transaction announcements in a blockchain network. The functions are written in Go programming language.

## handleNewPooledTransactionHashes66 Function

The `handleNewPooledTransactionHashes66` function handles new transaction announcements in a blockchain network. The function takes three parameters: a `Backend` interface, a `Decoder` interface, and a `Peer` struct. The function checks if the backend accepts transactions and decodes the message using the `Decode` method of the `Decoder ## Introduction

This document provides documentation for the source code of a function in a Go codebase. The function is responsible for handling pooled transactions received from a peer in a blockchain network. The codebase is written in Go programming language.

## HandlePooledTransactions Function

The `HandlePooledTransactions` function is responsible for handling pooled transactions received from a peer in a blockchain network. The function takes two parameters: a `peer` parameter which is a pointer to a Peer struct representing the peer that sent the transactions, and a `txs` parameter which is a PooledTransactionsPacket struct representing the pooled transactions received from the peer. The function returns an error if there is an issue decoding the transactions.

The function first checks if the transactions are empty and returns without doing anything if they are. Otherwise, the function decodes each transaction and adds it to the transaction pool. The function then marks each transaction as received by the peer and fulfills the request tracker. Finally, the function calls the Handle function of the backend to handle the pooled transactions.

```go
func (s *Server) HandlePooledTransactions(peer *Peer, txs PooledTransactionsPacket) error {
	if len(txs.Transactions) == 0 {
		return nil
	}

	var txList types.Transactions
	for i, txData := range txs.Transactions {
		tx, err := rlp.Decode(bytes.NewReader(txData), new(types.Transaction))
		if err != nil {
			return fmt.Errorf("%v: %v", errDecode, err)
		}
		txList = append(txList, tx.(*types.Transaction))
		if i == 0 {
			peer.markTransaction(tx.Hash())
		}
	}
	s.txPool.AddRemotes(txList, peer.id)

	for _, tx := range txList {
		peer.markTransaction(tx.Hash())
	}
	requestTracker.Fulfil(peer.id, peer.version, PooledTransactionsMsg, txs.RequestId)

	return backend.Handle(peer, &txs.PooledTransactionsPacket)
}
```