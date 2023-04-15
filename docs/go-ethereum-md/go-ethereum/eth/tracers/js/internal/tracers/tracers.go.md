# Tracers Package

The `tracers` package contains the actual JavaScript tracer assets. It provides a way to load the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source.

## Load

The `Load` function reads the built-in JS tracer files embedded in the binary and returns a mapping of tracer name to source. It uses the `embed` package to embed the JS files in the binary. The function walks through the directory and reads each file, then converts the file name to camel case and adds it to the map.

```go
func Load() (map[string]string, error) {
	var assetTracers = make(map[string]string)
	err := fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}
		b, err := fs.ReadFile(files, path)
		if err != nil {
			return err
		}
		name := camel(strings.TrimSuffix(path, ".js"))
		assetTracers[name] = string(b)
		return nil
	})
	return assetTracers, err
}
```

## camel

The `camel` function converts a snake-cased input string into a camel-cased output. It splits the input string by underscores and capitalizes the first letter of each word except the first one, then joins the words back together.

```go
func camel(str string) string {
	pieces := strings.Split(str, "_")
	for i := 1; i < len(pieces); i++ {
		pieces[i] = string(unicode.ToUpper(rune(pieces[i][0]))) + pieces[i][1:]
	}
	return strings.Join(pieces, "")
}
```