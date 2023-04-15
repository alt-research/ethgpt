The code is a part of the go-ethereum project and is licensed under the GNU General Public License. It defines a crawler struct that is responsible for crawling the Ethereum network and discovering new nodes. The crawler uses a resolver interface to request ENR (Ethereum Node Record) from nodes and validate them.

The crawler struct has the following fields:
- input: a nodeSet containing the initial set of nodes to crawl.
- output: a nodeSet containing the set of crawled nodes.
- disc: a resolver interface used to request ENR from nodes.
- iters: a slice of enode.Iterator used to iterate over nodes.
- inputIter: an enode.Iterator used to iterate over the input set of nodes.
- ch: a channel used to receive nodes from the iterators.
- closed: a channel used to signal the closure of the crawler.
- revalidateInterval: a time.Duration representing the interval at which nodes are revalidated.
- mu: a sync.RWMutex used to synchronize access to the crawler's fields.

The crawler struct has the following methods:
- newCrawler: a constructor function that initializes a new crawler with the given input set of nodes, resolver, and iterators.
- run: a method that starts the crawling process and returns the set of crawled nodes. The method takes a timeout duration and the number of threads to use for crawling as arguments.

The crawler uses a nodeSet type to represent a set of nodes. The nodeSet type is defined in a separate file and is not included in this code snippet.

The crawler uses the following constants:
- nodeRemoved: an integer constant representing a node that has been removed from the output set.
- nodeSkipRecent: an integer constant representing a node that has been skipped because it is too recent.
- nodeSkipIncompat: an integer constant representing a node that has been skipped because it is incompatible.
- nodeAdded: an integer constant representing a node that has been added to the output set.
- nodeUpdated: an integer constant representing a node that has been updated in the output set.

The crawler uses a resolver interface to request ENR from nodes. The resolver interface has a single method, RequestENR, that takes a node as an argument and returns the node's ENR or an error.

The crawler uses a sync.WaitGroup to synchronize the crawling threads. The WaitGroup is initialized with the number of threads to use for crawling.

The crawler uses atomic operations to update the counters for added, updated, removed, skipped, and recent nodes. The counters are used to display the progress of the crawling process.

The crawler uses a timeoutTimer to limit the duration of the crawling process. The timeoutTimer is initialized with the timeout duration passed to the run method.

The crawler uses a statusTicker to display the progress of the crawling process at regular intervals. The statusTicker is initialized with a duration of 8 seconds.

The crawler uses a goroutine to handle incoming nodes from the iterators. The goroutine updates the output set of nodes based on the validation result of the nodes.

The crawler uses a goroutine for each crawling thread. The goroutine receives nodes from the channel and updates the output set of nodes based on the validation result of the nodes.

The crawler uses a loop to wait for the crawling process to complete. The loop waits for the crawling threads to finish, the timeoutTimer to expire, or the statusTicker to trigger.

The crawler returns the set of crawled nodes from the run method. # Crawler Package

The `crawler` package provides a crawler for discovering and validating Ethereum nodes.

## The `crawler` Struct

The `crawler` struct represents a crawler for discovering and validating Ethereum nodes. It has the following fields:

### ch chan<- *enode.Node

A channel for sending discovered nodes.

### closed chan struct{}

A channel for signaling that the crawler has been closed.

### disc discoverer

A discoverer for discovering Ethereum nodes.

### output map[enode.ID]nodeInfo

A map of discovered nodes.

### mu sync.RWMutex

A mutex for synchronizing access to the `output` map.

### revalidateInterval time.Duration

The interval for revalidating recently-seen nodes.

## The `Crawl` Function

The `Crawl` function starts the crawler and returns a channel for receiving discovered nodes. It has the following signature:

```go
func Crawl(disc discoverer, bootnodes []*enode.Node, maxNodes int, revalidateInterval time.Duration) <-chan *enode.Node
```

### Parameters

- `disc`: The discoverer for discovering Ethereum nodes.
- `bootnodes`: The bootnodes for bootstrapping the crawler.
- `maxNodes`: The maximum number of nodes to discover.
- `revalidateInterval`: The interval for revalidating recently-seen nodes.

### Return Value

The function returns a channel for receiving discovered nodes.

## The `crawler