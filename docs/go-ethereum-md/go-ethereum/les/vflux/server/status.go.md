# Documentation for server.go

The `server.go` file contains the implementation of the `serverSetup` struct and the `newServerSetup` function. This file is part of the `go-ethereum` library, which is free software distributed under the terms of the GNU Lesser General Public License.

## peerWrapper

The `peerWrapper` struct is a wrapper around the `clientPeer` struct. It is used by the `NodeStateMachine` type system.

## serverSetup

The `serverSetup` struct is a wrapper around the `nodestate.Setup` struct. It contains all the created flags and fields used in the vflux server side.

### Fields

- `setup`: A pointer to the `nodestate.Setup` struct.
- `clientField`: A `nodestate.Field` that contains the client peer handler.
- `priorityFlag`: A `nodestate.Flags` that is set if the node has a positive balance.
- `updateFlag`: A `nodestate.Flags` that is set whenever the node balance is changed (priority changed).
- `balanceField`: A `nodestate.Field` that contains the client balance for priority calculation.
- `activeFlag`: A `nodestate.Flags` that is set if the node is active.
- `inactiveFlag`: A `nodestate.Flags` that is set if the node is inactive.
- `capacityField`: A `nodestate.Field` that contains the capacity of the node.
- `queueField`: A `nodestate.Field` that contains the information in the priority queue.

### Methods

#### newServerSetup

The `newServerSetup` function initializes the setup for the state machine and returns the flags/fields group.

```go
func newServerSetup() *serverSetup
```

Example usage:

```go
setup := newServerSetup()
```

## License

This file is part of the `go-ethereum` library, which is free software distributed under the terms of the GNU Lesser General Public License. For more information, see <http://www.gnu.org/licenses/>.