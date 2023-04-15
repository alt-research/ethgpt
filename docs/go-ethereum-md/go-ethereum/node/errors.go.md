# Go Ethereum Library - Node Package

This package contains the implementation of the Node type, which represents a single node in the Ethereum network. It also contains several error types and utility functions used by the Node type.

## Functions

### convertFileLockError

```go
func convertFileLockError(err error) error
```

This function is used to convert a file lock error returned by the operating system into a more specific error type. If the error is a file lock error with a known error number, it is converted into an `ErrDatadirUsed` error. Otherwise, the original error is returned.

### None

This package does not contain any other functions.

## Types

### StopError

```go
type StopError struct {
    Server   error
    Services map[reflect.Type]error
}
```

This type represents an error that occurs when a Node fails to stop either any of its registered services or itself. It contains two fields: `Server`, which is the error returned by the Node's `Stop` method, and `Services`, which is a map of errors returned by the `Stop` methods of the Node's registered services.

### Errors

```go
var (
    ErrDatadirUsed    = errors.New("datadir already used by another process")
    ErrNodeStopped    = errors.New("node not started")
    ErrNodeRunning    = errors.New("node already running")
    ErrServiceUnknown = errors.New("unknown service")

    datadirInUseErrnos = map[uint]bool{11: true, 32: true, 35: true}
)
```

This section defines several error types used by the Node type:

- `ErrDatadirUsed`: This error is returned when the Node's data directory is already being used by another process.
- `ErrNodeStopped`: This error is returned when the Node is not currently running.
- `ErrNodeRunning`: This error is returned when the Node is already running.
- `ErrServiceUnknown`: This error is returned when the Node is asked to stop a service that is not registered with it.

It also defines a map `datadirInUseErrnos` that maps known error numbers for file lock errors to `true`.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.