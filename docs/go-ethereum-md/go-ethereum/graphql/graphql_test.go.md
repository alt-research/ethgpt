# GraphQL

The `graphql` package provides a GraphQL API for interacting with an Ethereum node.

## Functions

### TestBuildSchema

`TestBuildSchema` tests that the GraphQL schema can be parsed and matched up to the object model.

### TestGraphQLBlockSerialization

`TestGraphQLBlockSerialization` tests that a GraphQL request is successfully handled when GraphQL is enabled on the specified endpoint.

### createNode

`createNode` creates a new Ethereum node for testing purposes.

### newGQLService

`newGQLService` creates a new GraphQL service for testing purposes.

### TestGraphQLFilterSerialization

`TestGraphQLFilterSerialization` tests that a GraphQL request is successfully handled when filtering is enabled on the specified endpoint.

### TestGraphQLTransactionSerialization

`TestGraphQLTransactionSerialization` tests that a GraphQL request is successfully handled when querying transactions on the specified endpoint.

### TestGraphQLTransactionReceiptSerialization

`TestGraphQLTransactionReceiptSerialization` tests that a GraphQL request is successfully handled when querying transaction receipts on the specified endpoint.

### TestGraphQLContractSerialization

`TestGraphQLContractSerialization` tests that a GraphQL request is successfully handled when querying contracts on the specified endpoint.

### TestGraphQLAccountSerialization

`TestGraphQLAccountSerialization` tests that a GraphQL request is successfully handled when querying accounts on the specified endpoint.

### TestGraphQLChainSerialization

`TestGraphQLChainSerialization` tests that a GraphQL request is successfully handled when querying chain information on the specified endpoint.

### TestGraphQLNetworkSerialization

`TestGraphQLNetworkSerialization` # GraphQL

The `TestGraphQL` function tests the GraphQL API by sending various queries and checking the responses. It takes in a `*testing.T` as a parameter.

## Test Cases

The function tests the following test cases:

- A valid query for a block with number 1337.
- An invalid query for a block with an invalid number.
- An invalid query for a block with a hex string as the number.
- An invalid query for a block with a non-numeric # GraphQL Service

The `GraphQL Service` is used to provide a GraphQL API to interact with the Ethereum blockchain.

## Functions

### newGQLService

`newGQLService` creates a new `GraphQL Service` instance. It takes in a testing `*testing.T`, a `*Node`, a `*core.Genesis`, an `int`, and a function as parameters and returns a `*graphql.Handler` and a `*core.BlockChain`.

### TestGraphQLHTTPOnSamePort_GQLRequest_Successful

`TestGraphQLHTTPOnSamePort_GQLRequest_Successful` tests that a GraphQL request is handled successfully when GraphQL is enabled on the specified endpoint.

### TestGraphQL # GraphQL Handler

The `GraphQLHandler` struct is used to handle GraphQL queries. It contains a `*graphql.Schema` which is used to execute the queries.

## Variables

- `Schema`: a pointer to a `graphql.Schema` which is used to execute the queries.

## Functions

### NewGraphQLHandler

`NewGraphQLHandler` creates a new `GraphQLHandler` instance. It takes in a `*node.Node` and a `*core.Genesis` as parameters and returns a pointer to a new `GraphQLHandler`.

### ServeHTTP

`ServeHTTP` handles HTTP requests and executes GraphQL queries.

### executeQuery

`executeQuery` executes a GraphQL query. It takes in a `string` representing the query, a `string` representing the operation name, a `map[string]interface{}` representing the variables, and a `*graphql.Schema` as parameters and returns a `*graphql.Result` and an error.

# Test

The `TestGraphQLHandler` function is used to test the `GraphQLHandler`.

## Functions

### Test # Create Handler and Blocks

The `createHandlerAndBlocks` function is used to create a new `handler` and a slice of `*types.Block`. It takes in an integer `i`, a `*core.BlockGen`, and a `*genesis.Genesis` as parameters.

## Variables

- `ethConf`: a pointer to an `ethconfig.Config` which is used to configure the Ethereum backend.
- `ethBackend`: a pointer to an `eth.Ethereum` which is used as the Ethereum backend.
- `chain`: a slice of `*types.Block` which is used to store the generated blocks.
- `filterSystem`: a `filters.FilterSystem` which is used to filter events.
- `handler`: a pointer to a `handler` which is used to handle GraphQL requests.

## Functions

### GenerateChain

`GenerateChain` generates a chain of blocks. It takes in a slice of `params.ChainConfig` representing the protocol changes, a `*types.Block` representing the genesis block, a `*ethash.Fake` representing the ethash engine, a `*ethdb.LDBDatabase` representing the database, an integer representing the number of blocks to generate, and a `core.GenesisAlloc` representing the genesis allocation. It returns a slice of `*types.Block` and an error.

### InsertChain

`InsertChain` inserts a chain of blocks into the blockchain. It takes in a slice of `*types.Block` and returns a `*types.Block` and an error.

### NewFilterSystem

`NewFilterSystem` creates a new `filters.FilterSystem`. It takes in an `*ethapi.Backend` and a `filters.Config` as parameters and returns a `filters.FilterSystem`.

### newHandler

`newHandler` creates a new `handler`. It takes in a `*stack` representing the stack, an `*ethapi.Backend` representing the Ethereum backend, a `filters.FilterSystem` representing the filter system, a slice of strings representing the modules to enable, and a slice of strings representing the modules to disable. It returns a pointer to a new `handler` and an error.

### createHandlerAndBlocks

`createHandlerAndBlocks` creates a new `handler` and a slice of `*types.Block`. It takes in an integer `i`, a `*core.BlockGen`, and a `*genesis.Genesis` as parameters and returns a pointer to a new `handler` and a slice of `*types.Block`.