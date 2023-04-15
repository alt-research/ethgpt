# Genesis Block

The `genesis` block is the first block in a blockchain. It is hardcoded into the source code and contains the initial state of the blockchain. This file contains three different `genesis` blocks for nodes that either don't care about the DAO fork, actively oppose it, or actively support it.

# TestDAOForkBlockNewChain

The `TestDAOForkBlockNewChain` function tests that the DAO hard-fork number and the nodes support/opposition is correctly set in the database after various initialization procedures and invocations.

# testDAOForkBlockNewChain

The `testDAOForkBlockNewChain` function creates a temporary data directory to use and inspect later. It initializes a new blockchain with the given `genesis` block and checks that the DAO hard-fork number and the nodes support/opposition is correctly set in the database. The function then closes the database and removes the temporary data directory.

# daoOldGenesis

The `daoOldGenesis` variable contains the `genesis` block for nodes that don't care about the DAO fork.

# daoNoForkGenesis

The `daoNoForkGenesis` variable contains the `genesis` block for nodes that actively oppose the DAO fork.

# daoProForkGenesis

The `daoProForkGenesis` variable contains the `genesis` block for nodes that actively support the DAO fork.

# daoGenesisHash

The `daoGenesisHash` variable contains the hash of the `genesis` block.

# daoGenesisForkBlock

The `daoGenesisForkBlock` variable contains the DAO hard-fork number. The code above is a Go test function that initializes a Geth instance with the requested flags set and immediately terminates it. The function takes in a `genesis` string, which is the genesis block of the blockchain, and a `test` integer, which is the test number. The function creates a temporary directory for the data directory of the Geth instance using the `TempDir()` function from the `testing` package.

If the `genesis` string is not empty, the function writes the `genesis` string to a file named `genesis.json` in the data directory and initializes the Geth instance with the `init` command. Otherwise, the function initializes the Geth instance with the `console` command and the `--exec` flag set to `2+2`.

The function then retrieves the DAO config flag from the database by opening the LevelDB database located in the `chaindata` subdirectory of the data directory. If the DAO config flag is not found, the function returns an error.

The function then validates the DAO hard-fork block number against the expected value. If the DAO hard-fork block number is not found, the function checks if the expected value is nil. If the DAO hard-fork block number is found, the function checks if it matches the expected value. The function then checks if the DAO hard-fork support matches the expected value. If any of the checks fail, the function returns an error.