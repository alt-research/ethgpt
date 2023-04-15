# Documentation for Export Function

The `Export` function is a part of the `go-ethereum` package and is used to export the test-genesis. The function exports the genesis block to a specified file in the specified format.

## Function

### `TestExport`

```go
func TestExport(t *testing.T)
```

The `TestExport` function is a basic test of the `geth export` command. The function exports the test-genesis and checks if the exported content is correct. The function takes a testing object as an argument and returns nothing.

## Variables

### `outfile`

```go
outfile := fmt.Sprintf("%v/testExport.out", os.TempDir())
```

The `outfile` variable is a string that specifies the path and name of the output file. The variable is set to the temporary directory of the operating system and the name of the file is `testExport.out`.

## Usage

The `Export` function is used to export the genesis block of the Ethereum blockchain. The function is called with the `geth export` command and the path and name of the output file. The exported file can be used to initialize a new blockchain or to import the genesis block into an existing blockchain. The `TestExport` function is used to test the `Export` function and to ensure that the exported content is correct.