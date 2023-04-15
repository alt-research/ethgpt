## Simulations Package

The `simulations` package contains the implementation of a simulation network. The network is used to simulate the behavior of a peer-to-peer network. The package contains the following types:

### EventType

`EventType` is a string type that represents the type of event emitted by a simulation network. It has three possible values:

- `EventTypeNode`: emitted when a node is either created, started or stopped.
- `EventTypeConn`: emitted when a connection is either established or dropped between two nodes.
- `EventTypeMsg`: emitted when a p2p message is sent between two nodes.

### Event

`Event` is a struct that represents an event emitted by a simulation network. It has the following fields:

- `Type`: the type of the event, represented by an `EventType`.
- `Time`: the time the event happened.
- `Control`: a boolean that indicates whether the event is the result of a controlled action in the network.
- `Node`: a pointer to a `Node` struct, set if the type is `EventTypeNode`.
- `Conn`: a pointer to a `Conn` struct, set if the type is `EventTypeConn`.
- `Msg`: a pointer to a `Msg` struct, set if the type is `EventTypeMsg`.
- `Data`: an interface{} that optionally provides data (currently for simulation frontends only).

### NewEvent

`NewEvent` is a function that creates a new event for the given object which should be either a `Node`, `Conn` or `Msg`. The object is copied so that the event represents the state of the object when `NewEvent` is called.

### ControlEvent

`ControlEvent` is a function that creates a new control event.

### String

`String` is a method that returns the string representation of the event.

### Node

`Node` is a struct that represents a node in the simulation network. It has the following fields:

- `id`: a unique identifier for the node.
- `up`: a boolean that indicates whether the node is up or down.
- `peers`: a map of peer nodes.
- `protocols`: a map of protocols supported by the node.

### Conn

`Conn` is a struct that represents a connection between two nodes in the simulation network. It has the following fields:

- `one`: a pointer to the first node in the connection.
- `other`: a pointer to the second node in the connection.
- `up`: a boolean that indicates whether the connection is up or down.

### Msg

`Msg` is a struct that represents a p2p message sent between two nodes in the simulation network. It has the following fields:

- `one`: a pointer to the first node in the message.
- `other`: a pointer to the second node in the message.
- `protocol`: a string that represents the protocol used to send the message.
- `code`: an integer that represents the code of the message.
- `received`: a boolean that indicates whether the message was received or not.

### Example Usage

```go
package main

import (
	"fmt"
	"github.com/ethereum/go-ethereum/simulations"
)

func main() {
	node1 := simulations.NewNode()
	node2 := simulations.NewNode()
	conn := simulations.NewConn(node1, node2)
	msg := simulations.NewMsg(node1, node2, "protocol", 1, true)

	event1 := simulations.NewEvent(node1)
	event2 := simulations.NewEvent(conn)
	event3 := simulations.NewEvent(msg)

	fmt.Println(event1.String())
	fmt.Println(event2.String())
	fmt.Println(event3.String())
}
```

Output:

```
<node-event> id: 0 up: true
<conn-event> nodes: 0->1 up: true
<msg-event> nodes: 0->1 proto: protocol, code: 1, received: true
```