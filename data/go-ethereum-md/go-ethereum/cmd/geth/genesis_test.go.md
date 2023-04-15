# Custom Genesis Tests

The `customGenesisTests` variable is a slice of structs that contains test cases for initializing Geth with a custom genesis block and chain definitions. Each struct contains a `genesis` field, which is a string representation of the custom genesis block, a `query` field, which is a string representation of the query to execute, and a `result` field, which is the expected result of the query.

# TestCustomGenesis

The `TestCustomGenesis` function tests that initializing Geth with a custom genesis block and chain definitions works properly. The function creates a temporary data directory, initializes the data directory with the custom genesis block, and queries the custom genesis block. The function uses the `runGeth` function to execute the Geth command with the specified arguments and expects the result to match the expected result.

# TestCustomBackend

The `TestCustomBackend` function tests that the backend selection and detection (leveldb vs pebble) works properly. The function tests pebble, but only on 64-bit platforms. The function creates a custom genesis block, initializes the data directory with the custom genesis block, and queries the custom genesis block. The function uses the `runGeth` function to execute the Geth command with the specified arguments and expects the result to match the expected result. If the platform is not 64-bit, the function skips the test. ## Documentation for Backend Test

The `Backend Test` is a test suite for the Ethereum protocol's backend. The test suite includes tests for initializing the data directory with a custom genesis block, executing and querying the blockchain, and testing the different database backends.

### `backendTest`

```go
type backendTest struct {
	initArgs   []string
	initExpect string
	execArgs   []string
	execExpect string
}
```

The `backendTest` struct defines the arguments and expected output for each test case. The `initArgs` field specifies the arguments to pass to the `init` command, the `initExpect` field specifies the expected output from the `init` command, the `execArgs` field specifies the arguments to pass to the `exec` command, and the `execExpect` field specifies the expected output from the `exec` command.

### `testfunc`

```go
func testfunc(t *testing.T, tt backendTest) error
```

The `testfunc` function is the main test function that runs each test case. The function creates a temporary data directory to use for the test, initializes the data directory with the custom genesis block, and executes and queries the blockchain. The function returns an error if any of the test cases fail.

### `init`

```go
args := append(tt.initArgs, "--datadir", datadir, "init", json)
geth := runGeth(t, args...)
geth.ExpectRegexp(tt.initExpect)
geth.ExpectExit()
```

The `init` function initializes the data directory with the custom genesis block. The function appends the `initArgs` to the command line arguments, sets the data directory to the temporary directory, and runs the `init` command. The function expects the output to match the `initExpect` field and exits.

### `exec + query`

```go
args := append(tt.execArgs, "--networkid", "1337", "--syncmode=full", "--cache", "16",
	"--datadir", datadir, "--maxpeers", "0", "--port", "0", "--authrpc.port", "0",
	"--nodiscover", "--nat", "none", "--ipcdisable",
	"--exec", "eth.getBlock(0).nonce", "console")
geth := runGeth(t, args...)
geth.ExpectRegexp(tt.execExpect)
geth.ExpectExit()
```

The `exec + query` function executes and queries the blockchain. The function appends the `execArgs` to the command line arguments, sets the data directory to the temporary directory, and runs the `exec` command. The function expects the output to match the `execExpect` field and exits.

### `for loop`

```go
for i, tt := range []backendTest{
	{ // When not specified, it should default to leveldb
		execArgs:   []string{"--db.engine", "leveldb"},
		execExpect: "0x0000000000001338",
	},
	{ // Explicit leveldb
		initArgs:   []string{"--db.engine", "leveldb"},
		execArgs:   []string{"--db.engine", "leveldb"},
		execExpect: "0x0000000000001338",
	},
	{ // Explicit leveldb first, then autodiscover
		initArgs:   []string{"--db.engine", "leveldb"},
		execExpect: "0x0000000000001338",
	},
	{ // Explicit pebble
		initArgs:   []string{"--db.engine", "pebble"},
		execArgs:   []string{"--db.engine", "pebble"},
		execExpect: "0x0000000000001338",
	},
	{ // Explicit pebble, then auto-discover
		initArgs:   []string{"--db.engine", "pebble"},
		execExpect: "0x0000000000001338",
	},
	{ // Can't start pebble on top of leveldb
		initArgs:   []string{"--db.engine", "leveldb"},
		execArgs:   []string{"--db.engine", "pebble"},
		execExpect: `Fatal: Failed to register the Ethereum service: db.engine choice was pebble but found pre-existing leveldb database in specified data directory`,
	},
	{ // Can't start leveldb on top of pebble
		initArgs:   []string{"--db.engine", "pebble"},
		execArgs:   []string{"--db.engine", "leveldb"},
		execExpect: `Fatal: Failed to register the Ethereum service: db.engine choice was leveldb but found pre-existing pebble database in specified data directory`,
	},
	{ // Reject invalid backend choice
		initArgs:   []string{"--db.engine", "mssql"},
		initExpect: `Fatal: Invalid choice for db.engine 'mssql', allowed 'leveldb' or 'pebble'`,
		// Since the init fails, this will return the (default) mainnet genesis
		// block nonce
		execExpect: `0x0000000000000042`,
	},
} {
	if err := testfunc(t, tt); err != nil {
		t.Fatalf("test %d-leveldb: %v", i, err)
	}
}
```

The `for loop` runs each test case in the `backendTest` struct. The loop initializes the data directory with the custom genesis block, executes and queries the blockchain, and tests the different database backends. The loop returns an error if any of the test cases fail.