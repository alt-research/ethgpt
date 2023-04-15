# RPC Client Subscription

This code demonstrates how to use the `rpc` package to create a client that tracks the latest block number known to the server. The server supports two methods: `eth_getBlockByNumber("latest", {})` and `eth_subscribe("newHeads")`. The former returns the latest block object, while the latter creates a subscription that fires block objects when new blocks arrive.

## Block Struct

The `Block` struct represents a block object and has a single field `Number` of type `*hexutil.Big`. `hexutil.Big` is a type that represents a big integer in hexadecimal format.

## ExampleClientSubscription Function

The `ExampleClientSubscription` function demonstrates how to use the `rpc` package to create a client that tracks the latest block number known to the server. It connects the client to the server, creates a channel `subch` to receive block objects, and ensures that `subch` receives the latest block. It then prints events from the subscription as they arrive.

## subscribeBlocks Function

The `subscribeBlocks` function runs in its own goroutine and maintains a subscription for new blocks. It subscribes to new blocks using `client.EthSubscribe`, which returns a subscription object `sub`. It then updates the channel with the current block using `client.CallContext` and sends the block to `subch`. Finally, it waits for the subscription to end for any reason and loops around to re-establish the connection.

## Functions

### ExampleClientSubscription

```go
func ExampleClientSubscription()
```

ExampleClientSubscription demonstrates how to use the `rpc` package to create a client that tracks the latest block number known to the server.

### subscribeBlocks

```go
func subscribeBlocks(client *rpc.Client, subch chan Block)
```

subscribeBlocks runs in its own goroutine and maintains a subscription for new blocks. It subscribes to new blocks using `client.EthSubscribe`, which returns a subscription object `sub`. It then updates the channel with the current block using `client.CallContext` and sends the block to `subch`. Finally, it waits for the subscription to end for any reason and loops around to re-establish the connection.