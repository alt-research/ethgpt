# RawDB Package

The `rawdb` package is a part of the `go-ethereum` library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. This package contains the implementation of the raw database layer for Ethereum.

## Constants

### Chain Freezer Table Names

The following constants represent the names of the tables in the chain freezer:

- `ChainFreezerHeaderTable` - the name of the freezer header table.
- `ChainFreezerHashTable` - the name of the freezer canonical hash table.
- `ChainFreezerBodiesTable` - the name of the freezer block body table.
- `ChainFreezerReceiptTable` - the name of the freezer receipts table.
- `ChainFreezerDifficultyTable` - the name of the freezer total difficulty table.

## Variables

### Chain Freezer Configuration

The following variable configures whether compression is disabled for the ancient-tables:

- `chainFreezerNoSnappy` - a map that maps table names to boolean values indicating whether compression is disabled.

### Ancient Store Identifiers

The following variable represents the folder name of the chain segment ancient store:

- `chainFreezerName` - the folder name of chain segment ancient store.

### Freezers

The following variable is a list of identifiers of all builtin freezers:

- `freezers` - the collections of all builtin freezers.