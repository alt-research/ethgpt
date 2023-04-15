This codebase contains a package called `dnsdisc` that provides a client for synchronizing with an Ethereum Name Service (ENS) discovery tree. The package contains the following functions:

1. `func NewClient(cfg Config) *Client`: This function creates a new `Client` with the given configuration. The `Config` struct contains the following fields:
   - `Resolver`: a map of domain names to ENR records.
   - `Logger`: a logger for logging messages.

2. `type Client struct`: This struct represents a client for synchronizing with an ENS discovery tree. It has the following methods:
   - `func (c *Client) SyncTree(root string) (* This codebase contains a set of tests for the `enrclient` package. The tests cover various scenarios and functions of the package.

1. `TestSyncTreeError`: This test checks that `SyncTree()` returns an error when the root ENR is invalid. It creates a map resolver with a root ENR that has an invalid signature. It then creates a new client with the resolver and calls `SyncTree()` with a valid URL. The test expects `SyncTree()` to return a `nameError` with the name of the invalid ENR and an `entryError` with the type "enr" and an `errInvalidENR` error.

2. `TestIterator`: This test checks that `NewIterator()` returns a valid iterator and that the iterator returns all the entries in the tree. It creates a test tree with 30 nodes and a map resolver with the tree's TXT record. It then creates a new client with the resolver and calls `NewIterator()` with the root URL. The test expects the iterator to return all the nodes in the tree.

3. `TestIteratorCloseWithoutNext`: This test checks that calling `Close()` on an iterator without calling `Next()` does not cause a panic. It creates a test tree with no nodes and a map resolver with the tree's TXT record. It then creates a new client with the resolver and calls `NewIterator()` with the root URL. The test calls `Close()` on the iterator and expects `Next()` to return false.

4. `TestIteratorClose`: This test checks that calling `Close()` on an iterator while it is iterating does not cause a race condition. It creates a test tree with 500 nodes and a map resolver with the tree's TXT record. It then creates a new client with the resolver and calls `NewIterator()` with the root URL. This codebase contains a set of tests for the `Iterator` functionality of the `Client` struct. The tests are:

1. `func TestIteratorNodeUpdates(t *testing.T)`: This test checks that the tree root is rechecked when a node in the tree is updated. It creates a `Client` with a simulated clock, a resolver, and a configuration. It then creates a test tree with 25 nodes and a URL, and creates a new iterator with the URL. The test syncs the original tree using the resolver and checks that the iterator returns the correct nodes. It then updates some of the nodes in the tree, creates a new tree with the updated nodes, updates the resolver with the new tree, and checks that the iterator returns the updated nodes after the tree is updated.

2. `func TestIteratorRootRecheckOnFail(t *testing.T)`: This test checks that the tree root is rechecked when a couple of leaf requests have failed. It is similar to `TestIteratorNodeUpdates`, but without advancing the clock by `RecheckInterval` after the tree update.

3. `func TestIteratorEmptyTree(t *testing.T)`: This test checks that the iterator works correctly when the tree is initially empty. It creates a `Client` with a simulated clock, a resolver, and a configuration. It then creates two test trees, one with no nodes and one with one node, and adds the first tree to the resolver. The test creates a new iterator with the URL of the first tree, starts the iterator, and waits for it to get stuck in `waitForRootUpdates()`. It then updates the resolver with the second tree, waits for the iterator to pick up the root change, and checks that the iterator returns the correct node.

4. `func TestIteratorLinkUpdates(t *testing.T)`: This test verifies that `randomIterator` re-checks the root of the tree to catch updates to links. It creates a `Client` with a simulated clock, a resolver, and a configuration. It then creates three test trees with 10 nodes each and URLs, and adds them to the resolver. The test creates a new iterator with the URL of the first tree, syncs the tree using `RandomNode()`, and checks that the iterator returns the correct nodes. It then updates the link between the first and second trees, creates a new tree with the updated link, updates the resolver with the new tree, and checks that the iterator returns the correct nodes after the link is updated. This codebase contains a set of functions and types that are used for testing the `enode` package. The functions are:

1. `func TestRandomIterator(t *testing.T)`: This function tests the `randomIterator` type, which is an implementation of the `enode.Iterator` interface. The function creates three `Tree` objects, adds them to a `resolver`, and creates a `randomIterator` with the `resolver`. It then checks that the iterator returns all the nodes in the trees in a random order. Finally, it checks that the linked trees are garbage collected when they are no longer referenced.

2. `func checkIterator(t *testing.T, it enode.Iterator, wantNodes []*enode.Node)`: This function checks that the given iterator returns all the nodes in `wantNodes`. It calls the `Next()` method of the iterator until it has returned all the nodes or until it has been called a maximum number of times. If the iterator doesn't return all the nodes, the function reports an error.

3. `func makeTestTree(domain string, nodes []*enode.Node, links []string) (*Tree, string)`: This function creates a `Tree` object with the given nodes and links, and signs it with a private key. It returns the `Tree` object and the signed URL.

4. `func testKeys(n int) []*ecdsa.PrivateKey`: This function generates `n` deterministic private keys for testing.

5. `func testNodes(keys []*ecdsa.PrivateKey) []*enode.Node`: This function creates `enode.Node` objects with the given private keys.

6. `func parseNodes(rec []string) []*enode.Node`: This function parses a slice of `enode.Node` records in string format and returns a slice of `enode.Node` objects.

The types are:

1. `type mapResolver map[string]string`: This type is a map that implements the `enode.Resolver` interface. It maps domain names to TXT records.

2. `type randomIterator struct`: This type is an implementation of the `enode.Iterator` interface. It iterates over the nodes in a random order. It has the following fields:
   - `trees []*Tree`: a slice of `Tree` objects.
   - `nodes []*enode.Node`: a slice of all the nodes in the trees.
   - `rand *rand.Rand`: a random number generator.
   - `index int`: the index of the next node to return.

   The type has the following methods:
   - `func (it *randomIterator) Next() bool`: This method advances the iterator to the next node and returns true if there is a next node, false otherwise.
   - `func (it *randomIterator) Node() *enode.Node`: This method returns the current node.

3. `type Tree struct`: This type represents a signed tree of `enode.Node` objects. It has the following fields:
   - `seq uint64`: the sequence number of the tree.
   - `nodes []*enode.Node`: a slice of `enode.Node` objects in the tree.
   - `links []string`: a slice of signed URLs of other trees that this tree links to.
   - `signature []byte`: the signature of the tree.
   - `root enode.ID`: the root hash of the tree.

   The type has the following methods:
   - `func MakeTree(seq uint64, nodes []*enode.Node, links []string) (*Tree, error)`: This method creates a `Tree` object with the given sequence number, nodes, and links. It returns the `Tree` object and an error if there is a problem creating the