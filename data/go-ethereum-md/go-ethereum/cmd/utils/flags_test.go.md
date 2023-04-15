# Utils

The `utils` package contains internal helper functions for go-ethereum commands.

## Functions

### `SplitTagsFlag(args string) map[string]string`

The `SplitTagsFlag()` function takes a string argument and returns a map of key-value pairs. The function is used to split a string of comma-separated key-value pairs into a map. The function first initializes an empty map. It then splits the string into key-value pairs using the `strings.Split()` function and iterates over the pairs. For each pair, the function splits it into key and value using the `strings.Split()` function and adds it to the map. If the pair is not a valid key-value pair, the function skips it. Finally, the function returns the map.

## Tests

The `utils_test.go` file contains tests for the `SplitTagsFlag()` function. The tests use the `testing` package and the `reflect.DeepEqual()` function to compare the expected and actual results. The tests cover various cases, including valid and invalid key-value pairs, empty strings, and garbage input.