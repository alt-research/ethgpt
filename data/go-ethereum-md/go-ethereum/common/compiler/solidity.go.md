## Documentation for Source Code

### ParseCombinedJSON()

```go
func ParseCombinedJSON(combinedJSON []byte, source string, languageVersion string, compilerVersion string, compilerOptions string) (map[string]*Contract, error)
```

`ParseCombinedJSON()` takes the direct output of a `solc --combined-output` run and parses it into a map of string contract name to `Contract` structs. The function takes the following input parameters:

- `combinedJSON`: the JSON output of the `solc --combined-output` command. ## Documentation for Source Code

### parseCombinedJSONV5()

```go
func parseCombinedJSONV5(combinedJSON []byte, source string, languageVersion string, compilerVersion string, compilerOptions string) (map[string]*Contract, error)
```

`parseCombinedJSONV5()` parses the direct output of `solc --combined-output` and parses it using the rules from Solidity v0.5.x. The function takes the combined JSON output as input and returns a map of contracts and their information. The input parameters `source`, `languageVersion`, `compilerVersion`, and `compilerOptions` are used to populate the `ContractInfo` struct for each contract.

### parseCombinedJSONV8()

```go
func parseCombinedJSONV8(combinedJSON []byte, source string, languageVersion string, compilerVersion string, compilerOptions string) (map[string]*Contract, error)
```

`parseCombinedJSONV8()` parses the direct output of `solc --combined-output` and parses it using the rules from Solidity v0.8.0 and later. The function takes the combined JSON output as input and returns a map of contracts and their information. The input parameters `source`, `languageVersion`, `compilerVersion`, and `compilerOptions` are used to populate the `ContractInfo` struct for each contract.