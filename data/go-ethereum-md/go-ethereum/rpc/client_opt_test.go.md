# RPC Package - Go Ethereum Library

The `rpc` package provides a framework for creating and configuring HTTP-based RPC clients and servers. It is a part of the Go Ethereum Library and is used to interact with Ethereum nodes via remote procedure calls.

## Functions

### DialOptions

```go
func DialOptions(ctx context.Context, endpoint string, options ...DialOption) (*rpc.Client, error)
```

DialOptions creates a new RPC client with the given endpoint and options. The endpoint should be a valid HTTP URL. The options parameter is a variadic list of DialOption functions that can be used to configure the client. The function returns a pointer to a new RPC client and an error if the client could not be created.

### WithHTTPClient

```go
func WithHTTPClient(client *http.Client) DialOption
```

WithHTTPClient is a DialOption function that sets the HTTP client used by the RPC client. The client parameter should be a pointer to an http.Client struct. This function returns a DialOption function that can be passed to DialOptions.

### WithHeader

```go
func WithHeader(key, value string) DialOption
```

WithHeader is a DialOption function that adds a custom HTTP header to all requests made by the RPC client. The key and value parameters should be strings representing the header key and value, respectively. This function returns a DialOption function that can be passed to DialOptions.

## Example

The following example demonstrates how to create a new RPC client with custom options:

```go
tokenHeader := rpc.WithHeader("x-token", "foo")
httpClient := rpc.WithHTTPClient(&http.Client{
    Timeout: 10 * time.Second,
})

ctx := context.Background()
c, err := rpc.DialOptions(ctx, "http://rpc.example.com", httpClient, tokenHeader)
if err != nil {
    panic(err)
}
defer c.Close()
```

In this example, we create a new RPC client with a custom HTTP client that has a 10-second timeout and a custom HTTP header with the key "x-token" and value "foo". We then use the client to make RPC calls to the endpoint "http://rpc.example.com". Finally, we close the client using the `Close` method to release any resources held by the client.