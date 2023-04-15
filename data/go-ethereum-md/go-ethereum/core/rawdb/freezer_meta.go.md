The `rawdb` package provides low-level database access for Ethereum nodes. This package contains functions for managing the metadata of the freezer table, which is a table that stores deleted items in the database.

The `freezerTableMeta` struct is a wrapper for all the metadata of the freezer table. It contains the versioning descriptor of the freezer table and the number of items that have been marked as deleted.

The `newMetadata` function initializes the metadata object with the given virtual tail.

The `readMetadata` function reads the metadata of the freezer table from the given metadata file. It seeks to the beginning of the file and decodes the metadata using RLP.

The `writeMetadata` function writes the metadata of the freezer table into the given metadata file. It seeks to the beginning of the file and encodes the metadata using RLP.

The `loadMetadata` function loads the metadata from the given metadata file. It initializes the metadata file with the given "actual tail" if it's empty. If the file is non-existent or empty, it writes the metadata with the actual tail as the virtual tail. If the file exists and is non-empty, it reads the metadata from the file and updates the virtual tail with the given actual tail if it's even lower than it. It prints a warning if this happens.

The `freezerVersion` constant is the initial version tag of freezer table metadata.