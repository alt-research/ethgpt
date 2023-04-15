## Documentation for the Source Code

### Package: `main`

This package contains the main function for the Ethereum ABI wrapper code generator. It imports several packages including `github.com/ethereum/go-ethereum/accounts/abi/bind`, `github.com/ethereum/go-ethereum/cmd/utils`, `github.com/ethereum/go-ethereum/common/compiler`, `github.com/ethereum/go-ethereum/crypto`, `github.com/ethereum/go-ethereum/internal/flags`, and `github.com/urfave/cli/v2`.

### Function: `init`

```go
func init() {
	app.Name = "abigen"
	app.Flags = []cli.Flag{
		abiFlag,
		binFlag,
		typeFlag,
		jsonFlag,
		excFlag,
		pkgFlag,
		outFlag,
		langFlag,
		aliasFlag,
	}
	app.Action = abigen
}
```

This function initializes the `app` object with the name "abigen" and sets the flags for the command line arguments. It also sets the `app.Action` to the `abigen` function.

### Function: `abigen`

```go
func abigen(c *cli.Context) error {
	utils.CheckExclusive(c, abiFlag, jsonFlag) // Only one source can be selected.

	if c.String(pkgFlag.Name) == "" {
		utils.Fatalf("No destination package specified (--pkg)")
	}
	var lang bind.Lang
	switch c.String(langFlag.Name) {
	case "go":
		lang = bind.LangGo
	default:
		utils.Fatalf("Unsupported destination language \"%s\" (--lang)", c.String(langFlag.Name))
	}
	// If the entire solidity code was specified, build and bind based on that
	var (
		abis    []string
		bins ## Documentation for the Source Code

### Function: `generateABI`

```go
func generateABI(c *cli.Context) error {
	var (
		abis   []string
		bins   []string
		sigs   []map[string]string
		types  []string
		libs   = make(map[string]string)
		aliases = make(map[string]string)
	)

	// Determine the language to generate the binding for
	lang := c.String(langFlag.Name)
	if lang == "" {
		lang = "go"
	}

	// Determine the type of input
	if c.IsSet(fileFlag.Name) {
		// Read the Solidity source code from the file
		filePath := c.String(fileFlag.Name)
		source, err := ioutil.ReadFile(filePath)
		if err != nil {
			utils.Fatalf("Failed to read Solidity source file: %v", err)
		}

		// Compile the Solidity source code
		compiled, err := compiler.CompileSolidityString("", string(source))
		if err != nil {
			utils.Fatalf("Failed to compile Solidity source code: %v", err)
		}

		// Extract the ABI and bytecode from the compiled contract
		abi, err := json.Marshal(compiled["<stdin>:"+c.String(typeFlag.Name)].Info.AbiDefinition)
		if err != nil {
			utils.Fatalf("Failed to parse ABI from compiler output: %v", err)
		}
		abis = append(abis, string(abi))

		bin, err := hex.DecodeString(compiled["<stdin>:"+c.String(typeFlag.Name)].Code)
		if err != nil {
			utils.Fatalf("Failed to decode bytecode: %v", err)
		}
		if len(bin) == 0 {
			utils.Fatalf("Failed to retrieve bytecode: %v", err)
		}
		if strings.Contains(string(bin), "//") {
			utils.Fatalf("Contract has additional library references, please use other mode(e.g. --combined-json) to catch library