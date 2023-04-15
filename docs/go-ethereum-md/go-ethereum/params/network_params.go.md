This file contains network parameters that need to be constant between clients, but aren't necessarily consensus related.

`BloomBitsBlocks` is the number of blocks a single bloom bit section vector contains on the server side.

`BloomBitsBlocksClient` is the number of blocks a single bloom bit section vector contains on the light client side.

`BloomConfirms` is the number of confirmation blocks before a bloom section is considered probably final and its rotated bits are calculated.

`CHTFrequency` is the block frequency for creating CHTs.

`BloomTrieFrequency` is the block frequency for creating BloomTrie on both server/client sides.

`HelperTrieConfirmations` is the number of confirmations before a client is expected to have the given HelperTrie available.

`HelperTrieProcessConfirmations` is the number of confirmations before a HelperTrie is generated.

`CheckpointFrequency` is the block frequency for creating checkpoint.

`CheckpointProcessConfirmations` is the number before a checkpoint is generated.

`FullImmutabilityThreshold` is the number of blocks after which a chain segment is considered immutable (i.e. soft finality). It is used by the downloader as a hard limit against deep ancestors, by the blockchain against deep reorgs, by the freezer as the cutoff threshold and by clique as the snapshot trust limit.

`LightImmutabilityThreshold` is the number of blocks after which a header chain segment is considered immutable for light client(i.e. soft finality). It is used by the downloader as a hard limit against deep ancestors, by the blockchain against deep reorgs, by the light pruner as the pruning validity guarantee.