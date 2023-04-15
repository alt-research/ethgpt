## Documentation for the Source Code

### Type: `nameFilter`

```go
type nameFilter struct {
	fulls map[string]bool // path/to/contract.sol:Type
	files map[string]bool // path/to/contract.sol:*
	types map[string]bool // *:Type
}
```

This type represents a filter for contract names. It contains three maps that store the patterns for full contract names, file names, and contract types.

### Function: `newNameFilter`

```go
func newNameFilter(patterns ...string) (*nameFilter, error) {
	f := &nameFilter{
		fulls: make(map[string]bool),
		files: make(map[string]bool),
		types: make(map[string]bool),
	}
	for _, pattern := range patterns {
		if err := f.add(pattern); err != nil {
			return nil, err
		}
	}
	return f, nil
}
```

This function creates a new `nameFilter` object with the given patterns. It takes a variable number of string arguments as input and returns a `nameFilter` object and an error object if there is an issue creating the filter.

#### Parameters

- `patterns`: A variable number of string arguments that represent the patterns to use for the filter.

#### Return Value

- `*nameFilter`: A pointer to a `nameFilter` object.
- `error`: An error object if there is an issue creating the filter.

### Method: `add`

```go
func (f *nameFilter) add(pattern string) error {
	ft := strings.Split(pattern, ":")
	if len(ft) != 2 {
		// filenames and types must not include ':' symbol
		return fmt.Errorf("invalid pattern: %s", pattern)
	}

	file, typ := ft[0], ft[1]
	if file == "*" {
		f.types[typ] = true
		return nil
	} else if typ == "*" {
		f.files[file] = true
		return nil
	}
	f.fulls[pattern] = true
	return nil
}
```

This method adds a pattern to the `nameFilter` object. It takes a string pattern as input and returns an error object if there is an issue adding the pattern.

#### Parameters

- `pattern`: A string that represents the pattern to add to the filter.

#### Return Value

- `error`: An error object if there is an issue adding the pattern.

### Method: `Matches`

```go
func (f *nameFilter) Matches(name string) bool {
	ft := strings.Split(name, ":")
	if len(ft) != 2 {
		// If contract names are always of the fully-qualified form
		// <filePath>:<type>, then this case will never happen.
		return false
	}

	file, typ := ft[0], ft[1]
	// full paths > file paths > types
	return f.fulls[name] || f.files[file] || f.types[typ]
}
```

This method checks if a contract name matches the patterns in the `nameFilter` object. It takes a string contract name as input and returns a boolean value indicating whether the name matches the filter.

#### Parameters

- `name`: A string that represents the contract name to check.

#### Return Value

- `bool`: A boolean value indicating whether the contract name matches the filter.