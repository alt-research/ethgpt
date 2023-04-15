# Go Ethereum Library - Node Package

This package contains the implementation of the Ethereum node, which is responsible for maintaining the Ethereum blockchain and participating in the network.

## Functions

### TestCorsHandler

This function tests the handling of Cross-Origin Resource Sharing (CORS) on the HTTP server. It creates a test server with the specified CORS allowed origins and sends an HTTP request with the specified origin. It then checks if the server responds with the expected Access-Control-Allow-Origin header.

### TestVhosts

This function tests the handling of virtual hosts on the HTTP server. It creates a test server with the specified virtual hosts and sends an HTTP request with the specified host. It then checks if the server responds with the expected status code.

### TestWebsocketOrigins

This function tests the handling of WebSocket origins on the WebSocket server. It creates a test server with the specified WebSocket origins and sends a WebSocket request with the specified origin. It then checks if the server responds with the expected response.

### splitAndTrim

This function splits a string separated by commas and trims excessive white space from the substrings.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # Websocket Origin Tests

This file contains tests for the websocket origin validation function in the Go Ethereum build system. The tests are designed to ensure that the function correctly validates allowed and disallowed origins for incoming websocket connections.

## Functions

### `TestSplitAndTrim`

This function tests the `splitAndTrim` function, which is used to split a comma-separated list of origins and trim any whitespace. The function takes a test case struct that specifies the input string and the expected output slices of strings.

### `TestCheckOrigin`

This function tests the `checkOrigin` function, which is used to validate an incoming websocket connection's origin against a list of allowed origins. The function takes a test case struct that specifies the input origin string, the expected output boolean value, and the list of allowed origins.

### `TestIsWebsocket`

This function tests the `isWebsocket` function, which is used to determine whether an incoming HTTP request is a websocket upgrade request. The function takes a test case struct that specifies the input HTTP request and the expected output boolean value.

### `TestCheckPath`

This function tests the `checkPath` function, which is used to check whether an incoming HTTP request's path matches a given prefix. The function takes a test case struct that specifies the input HTTP request, the prefix to match, and the expected output boolean value.

## License

This file is part of the Go Ethereum library, which is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # HTTP Server Test Suite

This file contains a set of functions used to test the HTTP server in the Go Ethereum build system.

## Functions

### `createAndStartServer`

This function creates and starts an HTTP server for testing purposes. It takes several parameters, including a testing object, an HTTP configuration object, a boolean value indicating whether to enable WebSocket support, a WebSocket configuration object, and an HTTP timeouts object. It returns the created HTTP server.

### `wsRequest`

This function attempts to open a WebSocket connection to the given URL. It takes a testing object, a URL string, and an optional list of extra headers. It returns an error if the connection could not be established.

### `rpcRequest`

This function performs a JSON-RPC request to the given URL. It takes a testing object, a URL string, a method string, and an optional list of extra headers. It returns an HTTP response object.

### `batchRpcRequest`

This function performs a batch JSON-RPC request to the given URL. It takes a testing object, a URL string, a list of method strings, and an optional list of extra headers. It returns an HTTP response object.

### `baseRpcRequest`

This function performs a JSON-RPC request to the given URL with the given body. It takes a testing object, a URL string, a body string, and an optional list of extra headers. It returns an HTTP response object.

### `testClaim`

This type is used to represent a test claim for JWT tokens.

### `TestJWT`

This function tests the JWT token functionality of the HTTP server. It creates and starts an HTTP server, generates a JWT token, and tests the token against the server. It takes a testing object and does not return anything.

## License

This file is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # JWT Token Authentication

This source code contains tests for JWT token authentication. The tests are divided into two parts: successful authentication and failed authentication.

## Successful Authentication

The `TestJWTAuth` function tests successful authentication by generating valid JWT tokens and sending them in the `Authorization` header of WebSocket and HTTP requests. The function first generates a set of valid tokens using the `issueToken` function, which takes a secret key, a signing method, and a set of claims as input and returns a signed JWT token. The function then sends WebSocket and HTTP requests with each of the valid tokens and checks that the requests are successful.

## Failed Authentication

The `TestJWTAuth` function also tests failed authentication by generating invalid JWT tokens and sending them in the `Authorization` header of WebSocket and HTTP requests. The function generates a set of invalid tokens using the `issueToken` function with various invalid inputs, such as an expired token, a token with a wrong signing method, a token with a missing mandatory claim, and a token with a wrong secret key. The function then sends WebSocket and HTTP requests with each of the invalid tokens and checks that the requests fail with an unauthorized status code.

## Gzip Handler

The `TestGzipHandler` function tests the `GzipHandler` middleware, which compresses the response body using gzip encoding. The function creates a set of test cases, each with a different response handler and a set of expected response properties, such as the response status code, the `Content-Encoding` header, and the response body. The function then sends HTTP requests with each of the test cases and checks that the responses match the expected properties.

## License

This source code is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>. # HTTP Gzip Handler

This Go source code file contains a test suite for the `newGzipHandler` function, which creates an HTTP handler that compresses the response body using Gzip encoding. The test suite includes several test cases that verify the behavior of the handler in different scenarios.

## Functions

### newGzipHandler

This function creates an HTTP handler that compresses the response body using Gzip encoding. It takes an `http.Handler` parameter, which is the handler to wrap with Gzip compression. It returns a new `http.Handler` that compresses the response body using Gzip encoding.

### TestNewGzipHandler

This function is a test suite for the `newGzipHandler` function. It includes several test cases that verify the behavior of the handler in different scenarios.

#### Test Cases

##### Gzip

This test case verifies that the response body is compressed using Gzip encoding when the `isGzip` flag is set to `true`. It creates an HTTP handler that sets a custom header and writes a response body, and then wraps the handler with the `newGzipHandler` function. It sends an HTTP request to the wrapped handler and verifies that the response body is compressed using Gzip encoding.

##### WriteHeader

This test case verifies that the response status code is set correctly when the `WriteHeader` function is called on the response writer. It creates an HTTP handler that sets a custom header, writes a response body, and then calls the `WriteHeader` function with a custom status code, and then wraps the handler with the `newGzipHandler` function. It sends an HTTP request to the wrapped handler and verifies that the response status code is set correctly.

##### WriteContentLength

This test case verifies that the `content-length` header is set correctly when the response body is written. It creates an HTTP handler that sets the `content-length` header and writes a response body, and then wraps the handler with the `newGzipHandler` function. It sends an HTTP request to the wrapped handler and verifies that the `content-length` header is set correctly.

##### Flush

This test case verifies that the response body is flushed correctly when the `Flush` function is called on the response writer. It creates an HTTP handler that writes a partial response body, flushes the response writer, and then writes the rest of the response body, and then wraps the handler with the `newGzipHandler` function. It sends an HTTP request to the wrapped handler and verifies that the response body is flushed correctly.

##### Disable

This test case verifies that Gzip compression is disabled when the `isGzip` flag is set to `false`. It creates an HTTP handler that sets a custom header and writes a response body, and then wraps the handler with the `newGzipHandler` function with the `isGzip` flag set to `false`. It sends an HTTP request to the wrapped handler and verifies that the response body is not compressed using Gzip encoding.

##### Disable-WriteHeader

This test case verifies that the response status code is set correctly when the `WriteHeader` function is called on the response writer and Gzip compression is disabled. It creates an HTTP handler that sets a custom header, writes a response body, and then calls the `WriteHeader` function with a custom status code, and then wraps the handler with the `newGzipHandler` function with the `isGzip` flag set to `false`. It sends an HTTP request to the wrapped handler and verifies that the response status code is set correctly.

### TestHTTPWriteTimeout

This function is a test suite for the HTTP write timeout feature. It includes two test cases that verify the behavior of the server when a request takes longer than the configured write timeout.

#### Test Cases

##### Message

This test case verifies that the server returns an error response when a request takes longer than the configured write timeout. It creates an HTTP server with a custom handler that sleeps for 1.5 seconds, and then sends an HTTP request to the server. It verifies that the server returns an error response with a JSON-RPC error code and message.

##### Batch

This test case verifies that the server returns an error response for each request in a batch that takes longer than the configured write timeout. It creates an HTTP server with a custom handler that sleeps for 1.5 seconds, and then sends a batch of three JSON-RPC requests to the server. It verifies that the server returns an error response for each request that takes longer than the configured write timeout.

### apis

This function returns a slice of `rpc.API` objects that define the JSON-RPC API for the test service.

### testService

This struct defines the implementation of the test service for the JSON-RPC API. It includes two methods: `Greet`, which returns a greeting message, and `Sleep`, which sleeps for 1.5 seconds.