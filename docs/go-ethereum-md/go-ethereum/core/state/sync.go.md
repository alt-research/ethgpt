## NewStateSync

The `NewStateSync` function creates a new state trie download scheduler. It takes in the following parameters:

- `root`: The root hash of the state trie.
- `database`: The database used to store the state trie.
- `onLeaf`: An optional callback function that is called when a leaf node is processed. The function takes in the keys and leaf data of the node.
- `scheme`: The trie scheme used to store the state trie.

The function returns a `*trie.Sync` object that can be used to download the state trie.

The function first registers the storage slot callback if the external callback is specified. It then registers the account callback to connect the state trie and the storage trie belongs to the contract. The account callback also calls the external callback function if it is specified. Finally, the function creates a new `*trie.Sync` object with the given parameters and returns it.

Here is an example of how you can use the `NewStateSync` function:

```go
import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethdb"
	"github.com/ethereum/go-ethereum/trie"
)

func onLeaf(keys [][]byte, leaf []byte) error {
	// Process the leaf node.
	return nil
}

func main() {
	root := common.HexToHash("0x1234567890abcdef")
	database, _ := ethdb.NewMemDatabase()
	scheme := trie.NewTrieDB(nil)
	syncer := NewStateSync(root, database, onLeaf, scheme)
	// Use the syncer to download the state trie.
}
```