This codebase contains a DNS discovery client that discovers nodes by querying DNS servers. The client is implemented in the `Client` struct, which has the following fields:

1. `cfg Config`: a `Config` struct that holds configuration options for the client.
2. `clock mclock.Clock`: a clock used for timing.
3. `entries *lru.Cache[string, entry]`: an LRU cache that stores DNS records.
4. `ratelimit *rate.Limiter`: a rate limiter that limits the number of DNS requests per second.
5. `singleflight singleflight.Group`: a `singleflight.Group` that ensures that only one DNS request is made for each domain name.

The `Config` struct holds the following configuration options:

1. `Timeout time.Duration`: the timeout used for DNS lookups (default 5s).
2. `RecheckInterval time.Duration`: the time between tree root update checks (default 30min).
3. `CacheLimit int`: the maximum number of cached records (default 1000).
4. `RateLimit float64`: the maximum DNS requests per second (default 3).
5. `ValidSchemes enr.IdentityScheme`: the acceptable ENR identity schemes (default `enode.ValidSchemes`).
6. `Resolver Resolver`: the DNS resolver to use (defaults to system DNS).
7. `Logger log.Logger`: the destination of client log messages (defaults to root logger).

The `Resolver` interface is a DNS resolver that can query TXT records.

The `NewClient` function creates a new DNS discovery client with the given configuration options. It returns a pointer to a `Client` struct.

The `SyncTree` method downloads the entire node tree at the given URL. It takes a string `url` that represents the URL of the node tree. It first parses the URL using `parseLink()`. If there is an error, it returns an error. Otherwise, it creates a new `clientTree` with the parsed link and syncs all the entries in the tree to a new `Tree` struct. It returns a pointer to the `Tree` struct and an error.

The `NewIterator` method creates an iterator that visits all nodes in the given node tree. It takes a pointer to a `Tree` struct and returns a new `Iterator` struct.

The `Iterator` struct is used to iterate over all nodes in a node tree. It has the following fields:

1. `tree *Tree`: a pointer to the node tree being iterated over.
2. `visited map[string]bool`: a map that tracks visited nodes.
3. `stack []*enode.Node`: a stack of nodes to visit.

The `Next` method returns the next node in the node tree. It first checks if there are any nodes left to visit in the stack. If there are, it pops the next node from the stack and returns it. Otherwise, it finds the next unvisited node in the node tree and adds it to the stack. If there are no unvisited nodes left, it returns nil.

The `AddEntry` method adds a DNS record to the cache. It takes a string `name` that represents the domain name of the record and a `Record` struct that represents the DNS record. It first checks if the cache already contains the record. If it does, it updates the record This codebase contains a set of functions and a struct that deal with retrieving and iterating over nodes in a distributed network. The functions are:

1. `func (c *Client) NewIterator(urls ...string) (enode.Iterator, error)`: This function creates a new iterator that traverses all nodes at the given tree URLs. It first creates a new random iterator using `c.newRandomIterator()`. It then adds each tree URL to the iterator using `it.addTree(url)`. If there is an error adding a tree, the function returns an error. Otherwise, it returns the iterator.

2. `func (c *Client) resolveRoot(ctx context.Context, loc *linkEntry) (rootEntry, error)`: This function retrieves a root entry via DNS. It takes a context and a linkEntry, which contains the domain and public key for the root entry. It uses a singleflight to ensure that only one request is made for each domain. It first looks up the TXT records for the domain using `c.cfg.Resolver.LookupTXT()`. It then searches for a TXT record that starts with a predefined root prefix. If it finds one, it parses and verifies the root entry using `parseAndVerifyRoot()`. If the signature is invalid, the function returns an entryError. Otherwise, it returns the root entry.

3. `func parseAndVerifyRoot(txt string, loc *linkEntry) (rootEntry, error)`: This function parses and verifies a root entry from a TXT record. It takes a string containing the TXT record and a linkEntry containing the public key for the root entry. It first parses the root entry using `parseRoot()`. If there is an error parsing the entry, the function returns the error. Otherwise, it verifies the signature using `verifySignature()`. If the signature is invalid, the function returns an entryError. Otherwise, it returns the root entry.

4. `func (c *Client) resolveEntry(ctx context.Context, domain, hash string) (entry, error)`: This function retrieves an entry from the cache or fetches it from the network if it isn't cached. It takes a context, a domain, and a hash. It first waits for the rate limit using `c.ratelimit.Wait()`. It then checks if the entry is in the cache using `c.entries.Get()`. If it is, it returns the entry. Otherwise, it uses a singleflight to ensure that only one request is made for each hash. It fetches the entry using `doResolveEntry()`, adds it to the cache using `c.entries.Add()`, and returns it.

5. `func (c *Client) doResolveEntry(ctx context.Context, domain, hash string) (entry, error)`: This function fetches an entry via DNS. It takes a context, a domain, and a hash. It first decodes the hash from base This codebase contains a set of functions and a struct that deal with DNS random node selection. The functions are:

1. `func (it *randomIterator) addTree(url string) error`: This function takes an enrtree:// URL and adds it to the iterator. It first parses the URL using `parseLink()`. If there is an error, it returns an error. Otherwise, it adds the URL to the iterator's link cache using `addLink()`.

2. `func (it *randomIterator) nextNode() *enode.Node`: This function syncs random tree entries until it finds a node. It first picks a random tree using `pickTree()`. If there are no trees left, it returns nil. Otherwise, it calls the tree's `syncRandom()` method to sync random entries. If there is an error, it logs the error and continues to the next tree. If the sync is successful and a node is returned, the function returns the node.

3. `func (it *randomIterator) pickTree() *clientTree`: This function returns a random tree to sync from. It first locks the iterator's mutex. It then checks if the iterator was closed or if any links have changed. If the iterator was closed, it returns nil. If any links have changed, it rebuilds the trees map using `rebuildTrees()`. It then checks if there are any trees that can be synced randomly using `syncableTrees()`. If there are, it picks a random tree and returns it. If there are no trees that can be synced randomly, it waits for the closest scheduled root check time on the disabled trees using `waitForRootUpdates()`. If the iterator was closed while waiting, it returns nil. Otherwise, it repeats the process.

4. `func (it *randomIterator) syncableTrees() (canSync bool, trees []*clientTree)`: This function finds trees on which any meaningful sync action can be performed. It first clears the syncable and disabled tree lists. It then partitions the trees into the two lists based on whether they can be synced randomly or not. If there are any trees that can be synced randomly, it returns true and the syncable tree list. Otherwise, it returns false and the disabled tree list.

5. `func (it *randomIterator) waitForRootUpdates(trees []*clientTree) bool`: This function waits for the closest scheduled root check time on the given trees. It first finds the tree with the closest scheduled root check time. It then calculates the time until the next check and waits for that amount of time using a timer. If the timer expires, it returns true. If the iterator was closed while waiting, it returns false.

6. `func (it *randomIterator) rebuildTrees()`: This function rebuilds the `trees` map. It first deletes any trees that have been removed from the link cache. It then adds any new trees that have been added to the link cache. The `trees` map is a map of domain names to `clientTree` structs.

The struct is:

1. `type randomIterator struct`: This struct represents an iterator for selecting random nodes from DNS trees. It has the following fields:
   - `c *Client`: a pointer to the DNS client.
   - `ctx context.Context`: the context for the iterator.
   - `lc *linkCache`: a pointer to the link cache.
   - `mu sync.Mutex`: