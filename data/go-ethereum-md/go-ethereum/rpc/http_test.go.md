# RPC Package

The `rpc` package provides a framework for creating and handling JSON-RPC requests and responses over HTTP. It includes functions for validating incoming requests, handling errors, and sending responses.

## Functions

### confirmStatusCode

```go
func confirmStatusCode(t *testing.T, got, want int)
```

confirmStatusCode is a helper function for testing that confirms the status code of an HTTP response.

### confirmRequestValidationCode

```go
func confirmRequestValidationCode(t *testing.T, method, contentType, body string, expectedStatusCode int)
```

confirmRequestValidationCode is a helper function for testing that confirms the status code of an HTTP request after validating it.

### TestHTTPErrorResponseWithDelete

```go
func TestHTTPErrorResponseWithDelete(t *testing.T)
```

TestHTTPErrorResponseWithDelete tests that an HTTP DELETE request returns a Method Not Allowed error.

### TestHTTPErrorResponseWithPut

```go
func TestHTTPErrorResponseWithPut(t *testing.T)
```

TestHTTPErrorResponseWithPut tests that an HTTP PUT request returns a Method Not Allowed error.

### TestHTTPErrorResponseWithMaxContentLength

```go
func TestHTTPErrorResponseWithMaxContentLength(t *testing.T)
```

TestHTTPErrorResponseWithMaxContentLength tests that an HTTP request with a body larger than the maximum allowed content length returns a Request Entity Too Large error.

### TestHTTPErrorResponseWithEmptyContentType

```go
func TestHTTPErrorResponseWithEmptyContentType(t *testing.T)
```

TestHTTPErrorResponseWithEmptyContentType tests that an HTTP request with an empty content type returns an Unsupported Media Type error.

### TestHTTPErrorResponseWithValidRequest

```go
func TestHTTPErrorResponseWithValidRequest(t *testing.T)
```

TestHTTPErrorResponseWithValidRequest tests that a valid HTTP request returns a status code of 0.

### confirmHTTPRequestYieldsStatusCode

```go
func confirmHTTPRequestYieldsStatusCode(t *testing.T, method, contentType, body string, expectedStatusCode int)
```

confirmHTTPRequestYieldsStatusCode is a helper function for testing that confirms the status code of an HTTP response.

### TestHTTPResponseWithEmptyGet

```go
func TestHTTPResponseWithEmptyGet(t *testing.T)
```

TestHTTPResponseWithEmptyGet tests that an empty HTTP GET request returns a status code of 200.

### TestHTTPRespBodyUnlimited

```go
func TestHTTPRespBodyUnlimited(t *testing.T)
```

TestHTTPRespBodyUnlimited tests that the response body of an HTTP request is not limited by the maximum request content length. ## HTTP Client

This package provides an HTTP client for JSON-RPC servers. It supports both HTTP and WebSocket transports.

### DialHTTP

```go
func DialHTTP(url string) (*Client, error)
```

DialHTTP creates a new HTTP client for the given URL.

### Dial

```go
func Dial(url string) (*Client, error)
```

Dial creates a new client for the given URL. The transport is chosen based on the URL scheme.

### SetHeader

```go
func (c *Client) SetHeader(key, value string)
```

SetHeader sets an HTTP header to be sent with every request.

### Call

```go
func (c *Client) Call(result interface{}, method string, args ...interface{}) error
```

Call sends a JSON-RPC request to the server and unmarshals the response into the given result object.

### CallContext

```go
func (c *Client) CallContext(ctx context.Context, result interface{}, method string, args ...interface{}) error
```

CallContext is like Call but includes a context for cancellation.

### HTTPError

```go
type HTTPError struct {
	StatusCode int
	Status     string
	Body       []byte
}
```

HTTPError is returned when the server returns an HTTP error.

### PeerInfo

```go
type PeerInfo struct {
	RemoteAddr string
	Transport  string
	HTTP       struct {
		Version    string
		UserAgent  string
		Origin     string
	}
}
```

PeerInfo contains information about the remote peer.

### NewContextWithHeaders

```go
func NewContextWithHeaders(ctx context.Context, headers http.Header) context.Context
```

NewContextWithHeaders returns a new context with the given HTTP headers.