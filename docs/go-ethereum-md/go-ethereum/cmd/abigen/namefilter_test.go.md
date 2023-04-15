## Documentation for the Source Code

### Function: `TestNameFilter`

```go
func TestNameFilter(t *testing.T) {
	_, err := newNameFilter("Foo")
	require.Error(t, err)
	_, err = newNameFilter("too/many:colons:Foo")
	require.Error(t, err)

	f, err := newNameFilter("a/path:A", "*:B", "c/path:*")
	require.NoError(t, err)

	for _, tt := range []struct {
		name  string
		match bool
	}{
		{"a/path:A", true},
		{"unknown/path:A", false},
		{"a/path:X", false},
		{"unknown/path:X", false},
		{"any/path:B", true},
		{"c/path:X", true},
		{"c/path:foo:B", false},
	} {
		match := f.Matches(tt.name)
		if tt.match {
			assert.True(t, match, "expected match")
		} else {
			assert.False(t, match, "expected no match")
		}
	}
}
```

This function tests the `newNameFilter` function by creating a new name filter with various input strings and checking if the filter matches certain names. It takes a `testing.T` object as input and does not return anything.

#### Parameters

- `t`: A `testing.T` object that represents the testing context.

#### Return Value

- None.

### Function: `newNameFilter`

```go
func newNameFilter(names ...string) (*nameFilter, error) {
	f := &nameFilter{patterns: make(map[string]string)}
	for _, name := range names {
		parts := strings.SplitN(name, ":", 2)
		if len(parts) != 2 {
			return nil, fmt.Errorf("invalid name filter: %s", name)
		}
		if _, ok := f.patterns[parts[0]]; ok {
			return nil, fmt.Errorf("duplicate pattern: %s", parts[0])
		}
		f.patterns[parts[0]] = parts[1]
	}
	return f, nil
}
```

This function creates a new name filter from a variable number of input strings. It takes a variable number of string arguments as input and returns a `*nameFilter` object and an error object if there is an issue creating the filter.

#### Parameters

- `names`: A variable number of string arguments that represent the filter patterns.

#### Return Value

- `*nameFilter`: A pointer to a `nameFilter` object that represents the filter.
- `error`: An error object if there is an issue creating the filter.

### Type: `nameFilter`

```go
type nameFilter struct {
	patterns map[string]string
}
```

This type represents a name filter that can match names based on patterns.

#### Fields

- `patterns`: A map of string keys to string values that represent the filter patterns.

### Method: `Matches`

```go
func (f *nameFilter) Matches(name string) bool {
	parts := strings.SplitN(name, ":", 2)
	if len(parts) != 2 {
		return false
	}
	if pattern, ok := f.patterns[parts[0]]; ok {
		if pattern == "*" || pattern == parts[1] {
			return true
		}
	}
	return false
}
```

This method checks if a name matches the filter. It takes a string argument as input and returns a boolean value.

#### Parameters

- `name`: A string that represents the name to check.

#### Return Value

- `bool`: A boolean value that represents whether the name matches the filter or not.