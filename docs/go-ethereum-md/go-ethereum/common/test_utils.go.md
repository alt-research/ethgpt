## Package: common

The `common` package provides common functions and types used throughout the Ethereum codebase.

## Function: LoadJSON

The `LoadJSON` function reads the contents of a file and unmarshals it into a given value. It takes a string representing the file path and an interface representing the value to unmarshal the JSON into. It returns an error if there is an issue reading the file or unmarshaling the JSON. If there is a syntax error in the JSON, it returns an error with the line number of the error.

### Parameters

- `file string`: A string representing the file path.
- `val interface{}`: An interface representing the value to unmarshal the JSON into.

### Returns

- `error`: An error if there is an issue reading the file or unmarshaling the JSON.

### Example

```go
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

var person Person
err := LoadJSON("person.json", &person)
if err != nil {
    log.Fatal(err)
}
```

## Function: findLine

The `findLine` function takes a byte slice representing the contents of a file and an integer representing an offset into the file. It returns an integer representing the line number of the offset.

### Parameters

- `data []byte`: A byte slice representing the contents of a file.
- `offset int64`: An integer representing an offset into the file.

### Returns

- `int`: An integer representing the line number of the offset.

### Example

```go
line := findLine([]byte("Hello\nWorld\n"), 7)
fmt.Println(line) // 2
```