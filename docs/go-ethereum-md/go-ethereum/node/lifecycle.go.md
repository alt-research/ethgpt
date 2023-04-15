# Go Ethereum Library - Node Package

This package contains the `Lifecycle` interface, which defines the behavior of services that can be started and stopped on the node.

## Functions

### None

This package does not contain any functions.

## Interfaces

### Lifecycle

The `Lifecycle` interface defines the behavior of services that can be started and stopped on the node. It is the responsibility of the service-specific package to configure and register the service on the node using the `RegisterLifecycle` method.

#### Start

The `Start` method is called after all services have been constructed and the networking layer was also initialized to spawn any goroutines required by the service. It returns an error if the service fails to start.

#### Stop

The `Stop` method terminates all goroutines belonging to the service, blocking until they are all terminated. It returns an error if the service fails to stop.

## License

This package is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.