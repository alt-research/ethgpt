The `fourbyte` package provides functionality for handling 4-byte function selectors used in Ethereum transactions. The package has the following functions:

- `New() (*Database, error)`: a constructor function that creates a new `Database` instance with the embedded 4-byte database. It returns a pointer to the `Database` instance and an `error`.
- `NewWithFile(filename string) (*Database, error)`: a constructor function that creates a new `Database` instance with a custom 4-byte database loaded from the specified file. It takes in a `filename` string and returns a pointer to the `Database` instance and an `error`.
- `NewFromFile(filename string) (*Database, error)`: a constructor function that creates a new `Database` instance with a custom 4-byte database loaded from the specified file. It takes in a `filename` string and returns a pointer to the `Database` instance and an `error`. This function is equivalent to `NewWithFile`.
- `(*Database) Selector(calldata []byte) (string, error)`: a method that returns the 4-byte function selector for the given calldata. It takes in a `calldata` byte slice and returns a `string` and an `error`.
- `(*Database) AddSelector(signature string, calldata []byte) error`: a method that adds a new 4-byte function selector to the database. It takes in a `signature` string and a `calldata` byte slice and returns an `error`.

The package also has two test functions:

- `TestEmbeddedDatabase(t *testing.T)`: a test function that tests that all the selectors contained in the embedded 4-byte database are valid. It takes in a `testing.T` instance.
- `TestCustomDatabase(t *testing.T)`: a test function that tests that custom 4-byte datasets can be handled too. It takes in a `testing.T` instance.

```go
// package fourbyte provides functionality for handling 4-byte function selectors used in Ethereum transactions.
package fourbyte

import (
    "fmt"
    "strings"
    "testing"

    "github.com/ethereum/go-ethereum/accounts/abi"
    "github.com/ethereum/go-ethereum/common"
)

// Tests that all the selectors contained in the 4byte database are valid.
func TestEmbeddedDatabase(t *testing.T) {
    db, err := New()
    if err != nil {
        t.Fatal(err)
    }
    for id, selector := range db.embedded {
        abistring, err := parseSelector(selector)
        if err != nil {
            t.Errorf("Failed to convert selector to ABI: %v", err)
            continue
        }
        abistruct, err := abi.JSON(strings.NewReader(string(abistring)))
        if err != nil {
            t.Errorf("Failed to parse ABI: