# Documentation for downloader.go

This file contains the implementation of the Ethereum downloader, which is responsible for downloading and verifying blocks and transactions from the Ethereum network.

## License

This file is part of the go-ethereum library, which is licensed under the GNU Lesser General Public License version 3 or later.

## Functions

### makeChain

```go
func makeChain(n int, seed byte, parent *types.Block, empty bool) ([]*types.Block, []types.Receipts)
```

The `makeChain` function creates a chain of `n` blocks starting at and including `parent`. The returned hash chain is ordered `head->parent`. In addition, every 3rd block contains a transaction and every 5th an uncle to allow testing correct block reassembly.

### TestBasics

```go
func TestBasics(t *testing.T)
```

The `TestBasics` function tests the basic functionality of the downloader. It creates a new queue, schedules a batch of headers, and verifies that the queue is not idle and that the correct number of blocks and receipts are pending. It then tells the queue that a certain peer will deliver the items and verifies that the queue is idle and that the correct number of results are returned.

## Variables

### chain

```go
var chain *chainData
```

The `chain` variable is a pointer to a `chainData` struct that contains a chain of blocks to import.

### emptyChain

```go
var emptyChain *chainData
```

The `emptyChain` variable is a pointer to a `chainData` struct that contains a chain of empty blocks to import.

### testDB

```go
var testDB = rawdb.NewMemoryDatabase()
```

The `testDB` variable is a memory database used for testing.

### testGenesis

```go
var testGenesis = &types.Block{
    Header: &types.Header{
        Number:     big.NewInt(0),
        Difficulty: big.NewInt(1),
        Time:       new(big.Int),
        Coinbase:   common.Address{},
        GasLimit:   params.GenesisGasLimit,
    },
    Uncles: []*types.Header{},
    Transactions: types.Transactions{
        types.NewContractCreation(0, big.NewInt(1), params.GenesisExtraData, 0, nil, nil),
    },
}
```

The `testGenesis` variable is a block representing the genesis block of the Ethereum blockchain.

### testKey

```go
var testKey = crypto.MustGenerateKey()
```

The `testKey` variable is a private key used for testing.

### testAddress

```go
var testAddress = crypto.PubkeyToAddress(testKey.PublicKey)
```

The `testAddress` variable is the public key derived from `testKey`.

### logger

```go
var logger = log.New()
```

The `logger` variable is a logger used for logging downloader events.

### testPeer

```go
var testPeer = dummyPeer("test")
```

The `testPeer` variable is a dummy peer used for testing.

### testPeer2

```go
var testPeer2 = dummyPeer("test2")
```

The `testPeer2` variable is a second dummy peer used for testing.

### testPeer3

```go
var testPeer3 = dummyPeer("test3")
```

The `testPeer3` variable is a third dummy peer used for testing.

### testPeer4

```go
var testPeer4 = dummyPeer("test4")
```

The `testPeer4` variable is a fourth dummy peer used for testing.

### testPeer5

```go
var testPeer5 = dummyPeer("test5")
```

The `testPeer5` variable is a fifth dummy peer used for testing.

### testPeer6

```go
var testPeer6 = dummyPeer("test6")
```

The `testPeer6` variable is a sixth dummy peer used for testing.

### testPeer7

```go
var testPeer7 = dummyPeer("test7")
```

The `testPeer7` variable is a seventh dummy peer used for testing.

### testPeer8

```go
var testPeer8 = dummyPeer("test8")
```

The `testPeer8` variable is an eighth dummy peer used for testing.

### testPeer9

```go
var testPeer9 = dummyPeer("test9")
```

The `testPeer9` variable is a ninth dummy peer used for testing.

### testPeer10

```go
var testPeer10 = dummyPeer("test10")
```

The `testPeer10` variable is a tenth dummy peer used for testing.

### testPeer11

```go
var testPeer11 = dummyPeer("test11")
```

The `testPeer11` variable is an eleventh dummy peer used for testing.

### testPeer12

```go
var testPeer12 = dummyPeer("test12")
```

The `testPeer12` variable is a twelfth dummy peer used for testing.

### testPeer13

```go
var testPeer13 = dummyPeer("test13")
```

The `testPeer13` variable is a thirteenth dummy peer used for testing.

### testPeer14

```go
var testPeer14 = dummyPeer("test14")
```

The `testPeer14` variable is a fourteenth dummy peer used for testing.

### testPeer15

```go
var testPeer15 = dummyPeer("test15")
```

The `testPeer15` variable is a fifteenth dummy peer used for testing.

### testPeer16

```go
var testPeer16 = dummyPeer("test16")
```

The `testPeer16` variable is a sixteenth dummy peer used for testing.

### testPeer17

```go
var testPeer17 = dummyPeer("test17")
```

The `testPeer17` variable is a seventeenth dummy peer used for testing.

### testPeer18

```go
var testPeer18 = dummyPeer("test18")
```

The `testPeer18` variable is an eighteenth dummy peer used for testing.

### testPeer19

```go
var testPeer19 = dummyPeer("test19")
```

The `testPeer19` variable is a nineteenth dummy peer used for testing.

### testPeer20

```go
var testPeer20 = dummyPeer("test20")
```

The `testPeer20` variable is a twentieth dummy peer used for testing.

### testPeer21

```go
var testPeer21 = dummyPeer("test21")
```

The `testPeer21` variable is a twenty-first dummy peer used for testing.

### testPeer22

```go
var testPeer22 = dummyPeer("test22")
```

The `testPeer22` variable is a twenty-second dummy peer used for testing.

### testPeer23

```go
var testPeer23 = dummyPeer("test23")
```

The `testPeer23` variable is a twenty-third dummy peer used for testing.

### testPeer24

```go
var testPeer24 = dummyPeer("test24")
```

The `testPeer24` variable is a twenty-fourth dummy peer used for testing.

### testPeer25

```go
var testPeer25 = dummyPeer("test25")
```

The `testPeer25` variable is a twenty-fifth dummy peer used for testing.

### testPeer26

```go
var testPeer26 = dummyPeer("test26")
```

The `testPeer26` variable is a twenty-sixth dummy peer used for testing.

### testPeer27

```go
var testPeer27 = dummyPeer("test27")
```

The `testPeer27` variable is a twenty-seventh dummy peer used for testing.

### testPeer28

```go
var testPeer28 = dummyPeer("test28")
```

The `testPeer28` variable is a twenty-eighth dummy peer used for testing.

### testPeer29

```go
var testPeer29 = dummyPeer("test29")
```

The `testPeer29` variable is a twenty-ninth dummy peer used for testing.

### testPeer30

```go
var testPeer This code is a part of a Go program that tests the behavior of a queue in handling block and receipt reservations and throttling. The code contains two functions, TestThrottleBodies and TestEmptyBlocks.

The TestThrottleBodies function tests the queue's ability to throttle body reservations when the queue size is exceeded. The function creates a queue with a size of 10 and prepares it for fast sync. The function then schedules a batch of headers and checks that the queue is not idle and that the pending block count is correct. The function then reserves blocks for a dummy peer and checks that the queue throttles the reservation and returns the correct number of requests. The function then checks that the second peer is also throttled and that the receipt delivering peer is not affected. The function then checks that the block and receipt task queues are the correct size and that the result cache count is zero.

Here is an example of how to use the TestThrottleBodies function:

```
func TestMyThrottleBodies(t *testing.T) {
    numOfBlocks := len(chain.blocks)
    numOfReceipts := len(chain.receipts)

    q := newQueue(10, 10)

    q.Prepare(1, FastSync)
    // Schedule a batch of headers
    q.Schedule(chain.headers(), 1)
    if q.Idle() {
        t.Errorf("queue should not be idle")
    }
    if got, exp := q.PendingBlocks(), len(chain.blocks); got != exp {
        t.Errorf("wrong pending block count, got %d, exp %d", got, exp)
    }
    if got, exp := q.PendingReceipts(), 0; got != exp {
        t.Errorf("wrong pending receipt count, got %d, exp %d", got, exp)
    }
    // They won't be processable, because the fetchresults haven't been
    // created yet
    if got, exp := q.resultCache.countCompleted(), 0; got != exp {
        t.Errorf("wrong processable count, got %d, exp %d", got, exp)
    }

    // Items are now queued for downloading, next step is that we tell the
    // queue that a certain peer will deliver them for us
    // That should trigger all of them to suddenly become 'done'
    {
        // Reserve blocks
        peer := dummyPeer("peer-1")
        fetchReq, _, _ := q.ReserveBodies(peer, 50)

        // there should be nothing to fetch, blocks are empty
        if fetchReq != nil {
            t.Fatal("there should be no body fetch tasks remaining")
        }
    }
    if q.blockTaskQueue.Size() != numOfBlocks-10 {
        t.Errorf("expected block task queue to be %d, got %d", q.blockTaskQueue.Size(), numOfBlocks-10)
    }
    if q.receiptTaskQueue.Size() != numOfReceipts {
        t.Errorf("expected receipt task queue to be %d, got %d", q.receiptTaskQueue.Size(), numOfReceipts)
    }
    {
        peer := dummyPeer("peer-2")
        fetchReq, _, throttle := q.ReserveBodies(peer, 50)

        // The second peer should hit throttling
        if !throttle {
            t.Fatalf("should throttle")
        }
        // And not get any fetches at all, since it was throttled to begin with
        if fetchReq != nil {
            t.Fatalf("should have no fetches, got %d", len(fetchReq.Headers))
        }
    }
    if q.blockTaskQueue.Size() != numOfBlocks-10 {
        t.Errorf("expected block task queue to be %d, got %d", q.blockTaskQueue.Size(), numOfBlocks-10)
    }
    if q.receiptTaskQueue.Size() != numOfReceipts {
        t.Errorf("expected receipt task queue to be %d, got %d", q.receiptTaskQueue.Size(), numOfReceipts)
    }
    {
        // The receipt delivering peer should not be affected
        // by the throttling of body deliveries
        peer := dummyPeer("peer-3")
        fetchReq, _, throttle := q.ReserveReceipts(peer, 50)
        if !throttle {
            // queue size is only 10, so throttling should occur
            t.Fatal("should throttle")
        }
        // But we should still get the first things to fetch
        if got, exp := len(fetchReq.Headers), 5; got != exp {
            t.Fatalf("expected %d requests, got %d", exp, got)
        }
        if got, exp := fetchReq.Headers[0].Number.Uint64(), uint64(1); got != exp {
            t.Fatalf("expected header %d, got %d", exp, got)
        }
    }
    if q.blockTaskQueue.Size() != numOfBlocks-10 {
        t.Errorf("expected block task queue to be %d, got %d", q.blockTaskQueue.Size(), numOfBlocks-10)
    }
    if q.receiptTaskQueue.Size() != numOfReceipts-5 {
        t.Errorf("expected receipt task queue to be %d, got %d", q.receiptTaskQueue.Size(), numOfReceipts-5)
    }
    if got, exp := q.resultCache.countCompleted(), 0; got != exp {
        t.Errorf("wrong processable count, got %d, exp %d", got, exp)
    }
}
```

The TestEmptyBlocks function tests the queue's ability to handle empty blocks. The function creates a queue with a size of 10 and prepares it for fast sync. The function then schedules a batch of headers and checks that the queue is not idle and that the pending block count is correct. The function then reserves blocks for a dummy peer and checks that there are no fetch tasks remaining. The function then checks that the block and receipt task queues are the correct size and that the result cache count is zero.

Here is an example of how to use the TestEmptyBlocks function:

```
func TestMyEmptyBlocks(t *testing.T) {
    numOfBlocks := len(emptyChain.blocks)

    q := newQueue(10, 10)

    q.Prepare(1, FastSync)
    // Schedule a batch of headers
    q.Schedule(emptyChain.headers(), 1)
    if q.Idle() {
        t.Errorf("queue should not be idle")
    }
    if got, exp := q.PendingBlocks(), len(emptyChain.blocks); got != exp {
        t.Errorf("wrong pending block count, got %d, exp %d", got, exp)
    }
    if got, exp := q.PendingReceipts(), 0; got != exp {
        t.Errorf("wrong pending receipt count, got %d, exp %d", got, exp)
    }
    // They won't be processable, because the fetchresults haven't been
    // created yet
    if got, exp := q.resultCache.countCompleted(), 0; got != exp {
        t.Errorf("wrong processable count, got %d, exp %d", got, exp)
    }

    // Items are now queued for downloading, next step is that we tell the
    // queue that a certain peer will deliver them for us
    // That should trigger all of them to suddenly become 'done'
    {
        // Reserve blocks
        peer := dummyPeer("peer-1")
        fetchReq, _, _ := q.ReserveBodies(peer, 50)

        // there should be nothing to fetch, ## Documentation for the Source Code

### Function: TestQueue_ReserveReceipts

This function tests the ReserveReceipts function of the Queue struct. It checks if the function returns the expected number of receipt fetch tasks remaining after reserving some of them. It also checks if the block task queue and receipt task queue are empty after reserving all the receipt fetch tasks. Finally, it checks if the processable count is correct.

### Function: XTestDelivery

This function is an extensive test of events that happen, blocks that become known, and peers that make reservations and deliveries. It is disabled since it's not really a unit-test, but can be executed to test some more advanced scenarios. 

The function creates a network with blocks and receipts, and a queue with a capacity of 10 blocks and 10 receipts. It then prepares the queue for fast sync and starts three goroutines to deliver headers, collect results, and reserve body fetch. It also starts a goroutine to reserve receipt fetch and another goroutine to progress the network. 

The function tests the following functionalities:
- Scheduling headers
- Collecting results
- Reserving body fetch
- Reserving receipt fetch
- Progressing the network

## Conclusion

The provided source code contains two functions that test the ReserveReceipts function of the Queue struct and an extensive test of events that happen, blocks that become known, and peers that make reservations and deliveries. The functions are well documented and provide a clear understanding of the functionalities they test. This codebase is written in Go and consists of a network struct and several methods that operate on it. The network struct represents a blockchain network and contains an offset, a chain of blocks, a list of receipts, a lock, and a condition variable.

The `newNetwork()` function returns a new instance of the network struct with a new condition variable and an offset of 1.

The `getTransactions()` method takes a block number as input and returns the transactions for that block. It calculates the index of the block in the chain based on the offset and returns the transactions for that block.

The `getReceipts()` method takes a block number as input and returns the receipts for that block. It calculates the index of the block in the chain based on the offset and returns the receipts for that block. If the block number does not match the expected block number, it prints an error message and panics.

The `forget()` method takes a block number as input and removes all blocks and receipts before that block number from the chain. It calculates the index of the block in the chain based on the offset and removes all blocks and receipts before that index. It then updates the offset to the block number.

The `progress()` method takes a number of blocks as input and adds them to the chain. It creates a new chain of blocks and receipts using the `makeChain()` function, which is not included in this code snippet. It then appends the new chain to the existing chain and broadcasts a signal to the condition variable to wake up any waiting threads.

The `headers()` method takes a starting block number as input and returns a list of headers for the next 128 blocks. It calculates the index of the starting block in the chain based on the offset and waits for progress if the starting block is not in the chain yet. It then reads the headers for the next 128 blocks from the chain and returns them.

Here is an example of how to use these methods:

```
net := newNetwork()
net.progress(10)
headers := net.headers(1)
transactions := net.getTransactions(5)
receipts := net.getReceipts(5)
net.forget(5)
``` 

This creates a new network, adds 10 blocks to the chain, gets the headers for the first 128 blocks, gets the transactions and receipts for block 5, removes all blocks and receipts before block 5 from the chain.