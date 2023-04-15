## Documentation for Source Code

### Contract

```go
type Contract struct {
	Code        string            `json:"code"`
	RuntimeCode string            `json:"runtime-code"`
	Info        ContractInfo      `json:"info"`
	Hashes      map[string]string `json:"hashes"`
}
```

`Contract` is a struct that contains information about a compiled contract, including its code, runtime code, contract info, and hashes.

### ContractInfo

```go
type ContractInfo struct {
	Source          string      `json:"source"`
	Language        string      `json:"language"`
	LanguageVersion string      `json:"languageVersion"`
	CompilerVersion string      `json:"compilerVersion"`
	CompilerOptions string      `json:"compilerOptions"`
	SrcMap          interface{} `json:"srcMap"`
	SrcMapRuntime   string      `json:"srcMapRuntime"`
	AbiDefinition   interface{} `json:"abiDefinition"`
	UserDoc         interface{} `json:"userDoc"`
	DeveloperDoc    interface{} `json:"developerDoc"`
	Metadata        string      `json:"metadata"`
}
```

`ContractInfo` is a struct that contains information about a compiled contract, including access to the ABI definition, source mapping, user and developer docs, and metadata. The struct provides information about how the contract was compiled, including the source, language version, compiler version, and compiler options. The fields `SrcMap`, `AbiDefinition`, `UserDoc`, and `DeveloperDoc` are of type `interface{}` and can contain any JSON-serializable data.