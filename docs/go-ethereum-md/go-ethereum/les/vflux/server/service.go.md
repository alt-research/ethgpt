## Documentation for the go-ethereum vflux Server

This is the documentation for the `Server` package in the go-ethereum vflux module. The `Server` package serves vflux requests and is identified by a string id. It is licensed under the GNU Lesser General Public License.

### Types

#### Server

The `Server` struct serves vflux requests. It contains the following fields:

- `limiter`: a `utils.Limiter` that limits the number of requests that can be served concurrently.
- `lock`: a `sync.Mutex` that protects the `services` map from concurrent access.
- `services`: a map of `serviceEntry` structs, indexed by the service id.
- `delayPerRequest`: a `time.Duration` that specifies the delay between requests.

The `Server` struct has the following methods:

##### NewServer

```go
func NewServer(delayPerRequest time.Duration) *Server
```

`NewServer` creates a new `Server` with the specified delay per request.

##### Register

```go
func (s *Server) Register(b Service, id, desc string)
```

`Register` registers a `Service` with the specified id and description.

##### Serve

```go
func (s *Server) Serve(id enode.ID, address string, requests vflux.Requests) vflux.Replies
```

`Serve` serves a vflux request batch. It takes an `enode.ID`, an address string, and a slice of `vflux.Requests` as input, and returns a slice of `vflux.Replies`. Requests are served by the `Handle` functions of the registered services. `Serve` may be called concurrently, but the `Handle` functions are called sequentially, so thread safety is guaranteed.

##### ServeEncoded

```go
func (s *Server) ServeEncoded(id enode.ID, addr *net.UDPAddr, req []byte) []byte
```

`ServeEncoded` serves an encoded vflux request batch and returns the encoded replies. It takes an `enode.ID`, a `net.UDPAddr`, and a byte slice as input, and returns a byte slice. It decodes the requests, serves them using `Serve`, and encodes the replies.

##### Stop

```go
func (s *Server) Stop()
```

`Stop` shuts down the server.

#### Service

The `Service` interface is a service registered at the `Server` and identified by a string id. It has the following method:

##### Handle

```go
Handle(id enode.ID, address string, name string, data []byte) []byte
```

`Handle` handles a vflux request. It takes an `enode.ID`, an address string, a name string, and a byte slice as input, and returns a byte slice. It is never called concurrently.

#### serviceEntry

The `serviceEntry` struct is a service registered at the `Server`. It contains the following fields:

- `id`: a string that identifies the service.
- `desc`: a string that describes the service.
- `backend`: a `Service` that handles the requests.

### Example Usage

```go
package main

import (
	"github.com/ethereum/go-ethereum/les/vflux"
	"github.com/ethereum/go-ethereum/p2p/enode"
	"github.com/ethereum/go-ethereum/server"
)

type MyService struct{}

func (s *MyService) Handle(id enode.ID, address string, name string, data []byte) []byte {
	// handle the request
	return []byte("response")
}

func main() {
	srv := server.NewServer(10 * time.Millisecond)
	srv.Register(&MyService{}, "my-service", "My Service")
	requests := vflux.Requests{
		{Service: "my-service", Name: "my-method", Params: []byte("data")},
	}
	replies := srv.Serve(enode.ID{}, "127.0.0.1:1234", requests)
}
```

In this example, a new `Server` is created with a delay of 10 milliseconds per request. A `MyService` struct is registered with the id "my-service" and the description "My Service". A `vflux.Requests` slice is created with one request for the "my-service" service and the "my-method" method with the data "data". The requests are served using `Serve`, and the replies are returned in a `vflux.Replies` slice. The code provided contains a `Stop` method for a `Server` struct.

## type Server

```go
type Server struct {
    limiter *rate.Limiter
}
```

`Server` is a struct that represents a server. It has one field: `limiter`, which is a pointer to a `rate.Limiter` struct.

### func (s *Server) Stop()

```go
func (s *Server) Stop()
```

`Stop` is a method of `Server` that stops the server's limiter. It does not take any arguments and does not return anything. The limiter is used to limit the rate of incoming requests to the server. Calling `Stop` on the limiter will stop the rate limiting.