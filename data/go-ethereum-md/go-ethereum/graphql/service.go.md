# GraphQL Handler

The `handler` struct is used to serve GraphQL queries over HTTP. It contains a pointer to a `graphql.Schema`.

## Variables

- `Schema`: a pointer to a `graphql.Schema` which is used to execute GraphQL queries.

## Functions

### ServeHTTP

`ServeHTTP` serves GraphQL queries over HTTP. It takes in an `http.ResponseWriter` and an `http.Request` as parameters.

### newHandler

`newHandler` returns a new `http.Handler` that will answer GraphQL queries. It takes in a `*node.Node`, an `ethapi.Backend`, a `*filters.FilterSystem`, a slice of CORS origins, and a slice of virtual hosts as parameters and returns a pointer to a new `handler` and an error.

# New

`New` constructs a new GraphQL service instance. It takes in a `*node.Node`, an `ethapi.Backend`, a `*filters.FilterSystem`, a slice of CORS origins, and a slice of virtual hosts as parameters and returns an error. # GraphQL Server

This code block sets up a GraphQL server using the `graphql-go` library. It creates a `Resolver` instance with a backend and a filter system, and then parses a GraphQL schema using `graphql.ParseSchema`. If there are no errors, it creates a `handler` instance with the parsed schema and registers it as a handler for the `/graphql` and `/graphql/ui` endpoints using `node.NewHTTPHandlerStack`. Finally, it returns a pointer to the `handler`.

## Variables

- `q`: a `Resolver` instance with a backend and a filter system.
- `s`: a parsed GraphQL schema.
- `h`: a `handler` instance with the parsed schema.

## Functions

### NewGraphQLServer

`NewGraphQLServer` sets up a GraphQL server using the `graphql-go` library. It takes in a backend, a filter system, a schema string, a CORS configuration, and a list of virtual hosts as parameters and returns a pointer to a `handler` and an error.