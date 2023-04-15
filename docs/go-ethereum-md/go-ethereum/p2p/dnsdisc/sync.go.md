This codebase contains a set of functions and structs that deal with DNS-based discovery of Ethereum nodes. The functions are:

1. `func newClientTree(c *Client, lc *linkCache, loc *linkEntry) *clientTree`: This function creates a new clientTree struct with the given Client, linkCache, and linkEntry.

2. `func (ct *clientTree) syncAll(dest map[string]entry) error`: This function retrieves all entries of the tree and stores them in the given map. It first updates the root of the tree using `ct.updateRoot()`. Then, it resolves all links using `ct.links.resolveAll()`, followed by resolving all ENRs using `ct.enrs.resolveAll()`.

3. `func (ct *clientTree) syncRandom(ctx context.Context) (n *enode.Node, err error)`: This function retrieves a single random entry of the tree. It first checks if the root of the tree needs to be updated using `ct.rootUpdateDue()`. If it does, it updates the root using `ct.updateRoot()`. Then, it checks if the link tree sync is not done using `!ct.links.done()`. If it is not done, it syncs the next link using `ct.syncNextLink()`. Otherwise, it garbage collects outdated links using `ct.gcLinks()`. Finally, it checks if the ENR tree sync is done using `ct.enrs.done()`. If it is done, it creates a new subtreeSync using the root of the tree and sets the `ct.enrs` field to it. Then, it syncs the next random ENR using `ct.syncNextRandomENR()`.

4. `func (ct *clientTree) canSyncRandom() bool`: This function checks if any meaningful action can be performed by `ct.syncRandom()`. It returns true if the root of the tree needs to be updated, the link tree sync is not done, the ENR tree sync is not done, or there are leaves in the ENR tree that have not been visited.

5. `func (ct *clientTree) gcLinks()`: This function removes outdated links from the global link cache. It runs once when the link sync finishes.

6. `func (ct *clientTree) syncNextLink(ctx context.Context) error`: This function syncs the next missing link in the link tree. It first gets the hash of the next missing link from `ct.links.missing[0]`. Then, it gets the linkEntry for the hash from the global link cache using `ct.lc.getLink()`. If the linkEntry is not nil, it adds it to the current links of the tree using `ct.curLinks[linkEntry.str] = struct{}{}`. Otherwise, it resolves the link using `ct.c.resolveLink()`. If the link is resolved successfully, it adds it to the current links of the tree and the global link cache using `ct.lc.addLink()`. Otherwise, it increments the fail count for the leaf request using `ct.leafFailCount++`.

7. `func (ct *clientTree) syncNextRandomENR(ctx context.Context) (n *enode This codebase contains a set of functions and a struct that deal with syncing and resolving ENR and link subtrees. The functions are:

1. `func (ct *clientTree) syncNextRandomENR(ctx context.Context) (*enode.Node, error)`: This function selects a random missing ENR hash from the `ct.enrs.missing` slice, resolves it using `ct.enrs.resolveNext()`, and removes the hash from the slice. If the resolved entry is an `enrEntry`, it returns the corresponding `enode.Node`. Otherwise, it returns nil.

2. `func removeHash(h []string, index int) []string`: This function removes the element at the given index from the given string slice `h`. It returns the resulting slice.

3. `func (ct *clientTree) updateRoot(ctx context.Context) error`: This function ensures that the given `clientTree` has an up-to-date root. It first checks if a root update is due using `ct.rootUpdateDue()`. If it is not due, the function returns nil. Otherwise, it resolves the root using `ct.c.resolveRoot()`, updates the `ct.root` field, and resets the `ct.rootFailCount` and `ct.leafFailCount` fields. If the link or ENR subtrees have changed, the function creates new `subtreeSync` objects for them. The function returns an error if the root resolution fails.

4. `func (ct *clientTree) rootUpdateDue() bool`: This function returns true if a root update is needed for the given `clientTree`. A root update is needed if the `ct.root` field is nil, if there have been too many leaf failures (`ct.leafFailCount > rootRecheckFailCount`), or if the next scheduled root check time has passed (`ct.c.clock.Now() >= ct.nextScheduledRootCheck()`).

5. `func (ct *clientTree) nextScheduledRootCheck() mclock.AbsTime`: This function returns the next scheduled root check time for the given `clientTree`. The next scheduled root check time is calculated as `ct.lastRootCheck.Add(ct.c.cfg.RecheckInterval)`.

6. `func (ct *clientTree) slowdownRootUpdate(ctx context.Context) bool`: This function applies a delay to root resolution if it is tried too frequently. The delay is based on the number of root failures (`ct.rootFailCount`). The function returns true if the delay has passed, false if the sync was canceled.

The struct is:

1. `type subtreeSync struct`: This struct represents the sync of an ENR or link subtree. It has the following fields:
   - `c *Client`: a pointer to the `Client` object.
   - `loc *linkEntry`: a This codebase contains two structs and their associated methods. The structs are:

1. `type treeState struct`: This struct represents the state of a tree during a traversal. It has the following fields:
   - `link bool`: a boolean indicating whether the tree is a link tree.
   - `leaves int`: an integer indicating the number of leaves encountered during the traversal.
   - `missing []string`: a slice of strings representing the missing children of a branch node.

   The struct has the following methods:
   - `func (ts *treeState) enter(e entry) (entry, error)`: This method takes an entry `e` and updates the state of the tree accordingly. It returns the entry and an error. If the entry is an `enrEntry` and the tree is a link tree, the method returns an error `errENRInLinkTree`. If the entry is a `linkEntry` and the tree is not a link tree, the method returns an error `errLinkInENRTree`. If the entry is a `branchEntry`, the method appends its missing children to the `missing` field of the tree state. Otherwise, the method increments the `leaves` field of the tree state. The method returns the entry and nil.

2. `type linkCache struct`: This struct tracks links between trees. It has the following fields:
   - `backrefs map[string]map[string]struct{}`: a map of maps representing the links between trees. The keys of the outer map are the target trees, and the keys of the inner maps are the source trees.
   - `changed bool`: a boolean indicating whether the link cache has been changed.

   The struct has the following methods:
   - `func (lc *linkCache) isReferenced(r string) bool`: This method takes a string `r` representing a tree and checks if it is referenced by any other tree in the link cache. It returns true if the tree is referenced, false otherwise.
   - `func (lc *linkCache) addLink(from, to string)`: This method adds a link from a source tree `from` to a target tree `to` in the link cache. If the link already exists, the method does nothing.
   - `func (lc *linkCache) resetLinks(from string, keep map[string]struct{})`: This method clears all links of the given tree `from` in the link cache, except for the ones in the `keep` map. The method uses a stack-based algorithm to traverse the link cache and remove the links. If any links are removed, the `changed` field of the link cache is set to true. 

The codebase also contains several error variables that are used in the `treeState` struct methods. These variables are:
- `errENRInLinkTree`: an error indicating that an ENR entry was encountered in a link tree.
- `errLinkInENRTree`: an error indicating that a link entry was encountered in an ENR tree.