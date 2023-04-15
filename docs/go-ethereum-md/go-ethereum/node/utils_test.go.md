# Go Ethereum Library - Node Package

This package contains a set of utility type declarations used by the tests in the Go Ethereum build system. The types are used to check various features of the node.

## Functions

### NewNoop

```go
func NewNoop() *Noop
```

NewNoop returns a new instance of the Noop type.

### NewFullService

```go
func NewFullService(stack *Node) (*FullService, error)
```

NewFullService returns a new instance of the FullService type. It registers the protocols, APIs, and lifecycle of the FullService with the provided Node stack.

## Types

### NoopLifecycle

```go
type NoopLifecycle struct{}
```

NoopLifecycle is a trivial implementation of the Service interface. It has no effect on the node lifecycle.

### Noop

```go
type Noop struct{ NoopLifecycle }
```

Noop is a set of services that all wrap the base NoopLifecycle. They have the same method signatures but different outer types.

### InstrumentedService

```go
type InstrumentedService struct {
    start     error
    stop      error
    startHook func()
    stopHook  func()
}
```

InstrumentedService is an implementation of Lifecycle for which all interface methods can be instrumented both return value as well as event hook wise.

### FullService

```go
type FullService struct{}
```

FullService is a set of protocols and APIs that can be registered with a Node stack. It implements the Lifecycle interface but has no effect on the node lifecycle.

## Imports

### github.com/ethereum/go-ethereum/p2p

This package provides the P2P networking protocol used by the Go Ethereum node.

### github.com/ethereum/go-ethereum/rpc

This package provides the RPC API used by the Go Ethereum node.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.