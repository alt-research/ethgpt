## Documentation for flowcontrol package

The `flowcontrol` package implements a client-side flow control mechanism. It provides a way for clients to limit the number of requests they send to a server, based on the server's capacity. The package contains two main components: `ClientManager` and `ClientNode`.

### ClientManager

`ClientManager` is the main component of the flow control system. It manages the set of connected clients The codebase contains a set of functions that implement flow control for a client-server communication system. The functions are part of a ClientNode struct and are used to manage the flow of requests from clients to servers. 

The `Unlock()` function is used to unlock the client node after a request has been processed. It updates the buffer value, which is the amount of data that can be sent from the client to the server, and then updates the client manager's buffer by calling the `updateBuffer()` function.

The `Freeze()` function is used to notify the client manager about a client freeze event, which reduces the total capacity allowance slightly. It reduces the total capacity allowance by calling the `reduceTotalCapacity()` function.

The `update()` function recalculates the buffer value at a specified time while also performing scheduled flow control parameter updates if necessary. It updates the buffer value by calling the `recalcBV()` function and updates the flow control parameters by calling the `updateParams()` function.

The `recalcBV()` function recalculates the buffer value at a specified time. It calculates the time difference between the current time and the last time the buffer value was updated and adds the minimum recharge rate multiplied by the time difference to the buffer value. If the buffer value exceeds the buffer limit, it is set to the buffer limit. If a log is available, it adds a log entry.

The `UpdateParams()` function updates the flow control parameters of a client node. It updates the flow control parameters by calling the `updateParams()` function. If the new minimum recharge rate is greater than or equal to the current minimum recharge rate, it updates the parameters immediately. Otherwise, it schedules the update for later.

The `updateParams()` function updates the flow control parameters of the node. It updates the buffer value based on the difference between the new buffer limit and the current buffer limit. If the new buffer limit is less than the current buffer value, the buffer value is set to the new buffer limit. It then updates the client manager's parameters by calling the `updateParams()` function.

The `AcceptRequest()` function returns whether a new request can be accepted and the missing buffer amount if it was rejected due to a buffer underrun. If accepted, the maximum cost is deducted from the flow control buffer. It updates the buffer value by deducting the maximum cost from the buffer value and updates the sum of costs by adding the maximum cost to the sum of costs. If a log is available, it adds a log entry. It also updates the accepted requests by adding the sum of costs to the accepted requests.

The `RequestProcessed()` function should be called when the request has been processed. It updates the buffer value by calling the `update()` function and updates the processed requests by adding the real cost to the processed requests.

Example usage:

```
// create a new client node
node := &ClientNode{}

// unlock the client node
node.Unlock()

// freeze the client node
node.Freeze()

// update the client node
now := mclock.Now()
node.update(now)

// update the flow control parameters of the client node
params := ServerParams{}
node.UpdateParams(params)

// accept a new request
reqID := uint64(1)
index := uint64(2)
maxCost := uint64(100)
accepted, bufShort, priority := node.AcceptRequest(reqID, index, maxCost)

// process the request
realCost := uint64(50)
node.RequestProcessed(reqID, index, maxCost, realCost)
``` This codebase appears to be a flow control system for managing requests sent to servers. The system includes two types of nodes: ClientNode and ServerNode. 

The ClientNode represents a client and is used in server mode only. It keeps track of the requests sent to the server and their associated costs. The ServerNode represents a server and is used in client mode only. It keeps track of the buffer value estimate and the flow control parameters of the server.

Here are the descriptions of the functions in the codebase:

```go
// AddRequest adds a request with the given ID and cost to the node's accepted requests
// Returns the buffer value after processing the request
func (node *ClientNode) AddRequest(reqID uint64, cost uint64) uint64 {}
```
This function adds a request with the given ID and cost to the node's accepted requests. It then calculates the buffer value after processing the request and returns it.

```go
// recalcBLE recalculates the lowest estimate for the client's buffer value at
// the given server at the specified time
func (node *ServerNode) recalcBLE(now mclock.AbsTime) {}
```
This function recalculates the lowest estimate for the client's buffer value at the given server at the specified time.

```go
// CanSend returns the minimum waiting time required before sending a request
// with the given maximum estimated cost. Second return value is the relative
// estimated buffer level after sending the request (divided by BufLimit).
func (node *ServerNode) CanSend(maxCost uint64) (time.Duration, float64) {}
```
This function returns the minimum waiting time required before sending a request with the given maximum estimated cost. The second return value is the relative estimated buffer level after sending the request (divided by BufLimit).

```go
// QueuedRequest should be called when the request has been assigned to the given
// server node, with the given cost and the given buffer value after sending the request
func (node *ServerNode) QueuedRequest(reqID uint64, cost uint64, bv uint64) {}
```
This function should be called when the request has been assigned to the given server node, with the given cost and the given buffer value after sending the request.

```go
// NewClientNode returns a new ClientNode
func NewClientNode(clock mclock.Clock) *ClientNode {}
```
This function returns a new ClientNode.

```go
// NewServerNode returns a new ServerNode
func NewServerNode(params ServerParams, clock mclock.Clock) *ServerNode {}
```
This function returns a new ServerNode.

```go
// UpdateParams updates the flow control parameters of the node
func (node *ServerNode) UpdateParams(params ServerParams) {}
```
This function updates the flow control parameters of the node.

```go
// AddAccepted adds the given request ID to the node's accepted requests
func (node *ClientNode) AddAccepted(reqID uint64) {}
```
This function adds the given request ID to the node's accepted requests.

```go
// RemoveAccepted removes the given request ID from the node's accepted requests
func (node *ClientNode) RemoveAccepted(reqID uint64) {}
```
This function removes the given request ID from the node's accepted requests.

```go
// GetAccepted returns the list of accepted request IDs
func (node *ClientNode) GetAccepted() []uint64 {}
```
This function returns the list of accepted request IDs.

```go
// GetPending returns the list of pending request IDs and their associated buffer values
func (node *ClientNode) GetPending() map[uint64]uint64 {}
```
This function returns the list of pending request IDs and their associated buffer values.

```go
// GetBufValue returns the current buffer value estimate
func (node *ClientNode) GetBufValue() uint64 {}
```
This function returns the current buffer value estimate.

```go
// GetBufEstimate returns the current buffer value estimate of the server
func (node *ServerNode) GetBufEstimate() uint64 {}
```
This function returns the current buffer value estimate of the server.

```go
// GetParams returns the flow control parameters of the node
func (node *ServerNode) GetParams() ServerParams {}
```
This function returns the flow control parameters of the node.

```go
// SetLogger sets the logger for the node
func (node *ServerNode) SetLogger(logger *logger) {}
```
This function sets the logger for the node.

```go
// SetKeepLogs sets the number of logs to keep in the logger
func SetKeepLogs(n int) {}
```
This function sets the number of logs to keep in the logger. ## Function Documentation

### QueuedRequest

The `QueuedRequest` function is used to queue a request to the server. It takes in two parameters, `reqID` and `maxCost`, which represent the request ID and the maximum cost of the request, respectively. The function calculates the estimated buffer value based on the current time and the sum of the maximum costs of all pending requests. If the estimated buffer value is greater than or equal to the maximum cost of the current request, the function subtracts the maximum cost from the estimated buffer value. Otherwise, it sets the estimated buffer value to zero. The function then adds the maximum cost of the current request to the sum of the maximum costs of all pending requests and stores the result in a map with the request ID as the key. Finally, the function logs the queued request if logging is enabled.

### ReceivedReply

The `ReceivedReply` function is used to adjust the estimated buffer value based on the value included in the latest request reply. It takes in two parameters