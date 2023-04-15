The `fourbyte` package contains the 4byte database. The package has the following fields:

- `embedded`: a map of `string` to `string` representing the embedded 4byte database.
- `custom`: a map of `string` to `string` representing the custom 4byte database.
- `customPath`: a string representing the path to the custom 4byte database.

The package has the following methods:

- `New() (*Database, error)`: a constructor function that loads the standard signature database embedded in the package. It returns a pointer to a `Database` type and an `error`.
- `NewFromFile(path string) (*Database, error)`: a constructor function that loads the signature database from a file and errors if the file is not valid JSON. The constructor does no other validation of contents. This method does not load the embedded 4byte database. The provided path will be used to write new values into if they are submitted via the API. It takes in a `path` string and returns a pointer to a `Database` type and an `error`.
- `NewWithFile(path string) (*Database, error)`: a constructor function that loads both the standard signature database (embedded resource file) as well as a custom database. The latter will be used to write new values into if they are submitted via the API. It takes in a `path` string and returns a pointer to a `Database` type and an `error`.
- `Size() (int, int)`: a method that returns the number of 4byte entries in the embedded and custom datasets. It returns two `int`s.
- `Selector(id []byte) (string, error)`: a method that checks the given 4byte ID against the known ABI methods. This method does not validate the match, it's assumed the caller will do. It takes in a `[]byte` and returns a `string` and an `error`.
- `Add The `AddSelector` method is a method of the `Database` type. It adds a custom selector to the database and persists it if needed. The method takes in a `selector` string and a `data` byte slice and returns an `error`.

The method first checks if the length of the `data` byte slice is less than 4. If it is, it returns `nil`. If the selector is already known, it also returns `nil`.

If the selector is not known, the method injects the custom selector into the database and persists it if needed. It adds the custom selector to the `db.custom` map with the key being the first 4 bytes of the `data` byte slice encoded in hexadecimal. If the `db.customPath` field is empty, the method returns `nil`.

If the `db.customPath` field is not empty, the method marshals the `db.custom` map into a JSON blob and writes it to the file specified by `db.customPath` with file permissions set to `0600`. If there is an error during the marshaling or writing process, the method returns the error.

```go
// AddSelector adds a custom selector to the database and persists it if needed.
// Note that this method does _not_ validate the correctness of the data. It assumes
// the caller has already done so.
func (db *Database) AddSelector(selector string, data []byte) error {
    // If the selector is already known, skip duplicating it
    if len(data) < 4 {
        return nil
    }
    if _, err := db.Selector(data[:4]); err == nil {
        return nil
    }
    // Inject the custom selector into the database and persist if needed
    db.custom[hex.EncodeToString(data[:4])] = selector
    if db.customPath == "" {
        return nil
    }
    blob, err := json.Marshal(db.custom)
    if err != nil {
        return err
    }
    if err := os.WriteFile(db.customPath, blob, 0600); err != nil {
        return err
    }
    return nil
}
```