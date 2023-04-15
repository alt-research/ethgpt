## Package downloader

The `downloader` package provides a concurrent downloader for Ethereum blocks and headers. It is responsible for fetching blocks and headers from the Ethereum network.

### bodyQueue

`bodyQueue` implements `typedQueue` and is a type adapter between the generic concurrent fetcher and the downloader.

#### waker

`waker` returns a notification channel that gets pinged in case more body fetches have been queued up, so the fetcher might assign it to idle peers.

#### pending

`pending` returns the number of bodies that are currently queued for fetching by the concurrent downloader.

#### capacity

`capacity` is responsible for calculating how many bodies a particular peer is estimated to be able to retrieve within the allotted round trip time.

#### updateCapacity

`updateCapacity` is responsible for updating how many bodies a particular peer is estimated to be able to retrieve in a unit time.

#### reserve

`reserve` is responsible for allocating a requested number of pending bodies from the download queue to the specified peer.

#### unreserve

`unreserve` is responsible for removing the current body retrieval allocation assigned to a specific peer and placing it back into the pool to allow reassigning to some other peer.

#### request

`request` is responsible for converting a generic fetch request into a body one and sending it to the remote peer for fulfillment.

#### deliver

`deliver` is responsible for taking a generic response packet from the concurrent fetcher, unpacking the body data, and delivering it to the downloader's queue. ## Function: `deliverBodies`

The `deliverBodies` function is a method of the `fetcherQueue` struct. It is responsible for delivering the bodies of transactions, uncles, and withdrawals to a specific peer. The function takes in the peer ID, the transaction hashes, uncle hashes, withdrawal hashes, and their corresponding hash sets. It returns the number of accepted bodies and an error if any.

### Parameters

- `peer.id`: The ID of the peer to deliver the bodies to.
- `txs`: A slice of transaction hashes to deliver.
- `hashsets[0]`: The hash set of the transaction hashes.
- `uncles`: A slice of uncle hashes to deliver.
- `hashsets[1]`: The hash set of the uncle hashes.
- `withdrawals`: A slice of withdrawal hashes to deliver.
- `hashsets[2]`: The hash set of the withdrawal hashes.

### Return Values

- `accepted`: The number of accepted bodies.
- `err`: An error if any.

### Code Explanation

The function first calls the `queue.DeliverBodies` method to deliver the transaction, uncle, and withdrawal bodies to the specified peer. The method returns the number of accepted bodies and an error if any.

The function then checks the returned values and logs the appropriate message based on the result. If there are no errors and no transaction bodies to deliver, it logs that the requested bodies have been delivered. If there are no errors and there are transaction bodies to deliver, it logs that a new batch of bodies has been delivered along with the count of the delivered bodies and the number of accepted bodies. If there is an error, it logs that the retrieval of the bodies has failed along with the error message. Finally, the function returns the number of accepted bodies and any error that occurred during the delivery.