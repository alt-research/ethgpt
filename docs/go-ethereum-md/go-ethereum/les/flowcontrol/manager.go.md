# ClientManager

The `ClientManager` struct controls the capacity assigned to the clients of a server. It calculates a corrugated buffer value and usually allows a higher remaining buffer value to be returned with each reply. 

## Fields

- `clock`: A `mclock.Clock` object representing the clock used by the client manager.
- `lock`: A `sync.Mutex` object used to lock the client manager's fields.
- `stop`: A channel used to signal the client manager to stop.

- `curve`: A `PieceWiseLinear` object representing the recharge curve.
- `sumRecharge`: An unsigned integer representing the sum of all recharge values.
- `totalRecharge`: An unsigned integer representing the total recharge value.
- `totalConnected`: An unsigned integer representing the total number of connected clients.
- `logTotalCap`: A float # Client Manager

The `ClientManager` struct is used to manage the flow control of incoming requests from client nodes. It enhances flow control performance by allowing client buffers to recharge quicker than the minimum guaranteed recharge rate if possible. The `ClientManager` struct contains various fields and methods for managing the flow control of client nodes.

## Fields

- `clock`: A `mclock.Clock` object The codebase contains a struct called `ClientManager` which has several methods. Here is a brief description of each method:

`disconnect`: This method is used to disconnect a client node from the server. It takes a `ClientNode` as an argument and updates the total connected clients, total capacity, and raise limit.

`accepted`: This method is called when a request with a given maximum cost is accepted. It returns a priority indicator for the request which is used to determine placement in the serving queue. Older requests have higher priority by default. If the client is almost out of buffer, request priority is reduced. It takes a `ClientNode`, `maxCost`, and `now` as arguments and returns a priority value.

`processed`: This method updates the client buffer according to the actual request cost after serving has been finished. It takes a `ClientNode`, `maxCost`, `realCost`, and `now` as arguments.

`updateBuffer`: This method recalculates the corrected buffer value, adds the given value to it, and updates the node's actual buffer value if possible. It takes a `ClientNode`, `add`, and `now` as arguments.

`updateParams`: This method updates the flow control parameters of a client node. It takes a `ClientNode`, `params`, and `now` as arguments.

`updateRaiseLimit`: This method recalculates the limiting value until which `logTotalCap` can be raised when no client freeze events occur.

`updateRecharge`: This method updates the recharge integrator and checks the recharge queue for nodes with recently filled buffers. It takes `now` as an argument.

Here is an example of how to use the `accepted` method:

```
// create a new client node
node := &ClientNode{
    params: ServerParams{
        MinRecharge: 10,
        BufLimit: 100,
    },
    corrBufValue: 50,
}

// create a new client manager
cm := &ClientManager{}

// call the accepted method
priority := cm.accepted(node, 20, 100)

// print the priority value
fmt.Println(priority)
```

This will output the priority value for the request. This codebase seems to be written in Go programming language. It contains a struct called `ClientManager` which manages a set of clients. The `ClientManager` struct has several methods that perform various operations on the clients.

The `addToQueue` method adds a client node to the recharge queue. The recharge queue is a priority queue that is sorted based on the recharge value of the client nodes. The recharge value is calculated based on the current bonus ratio and the time elapsed since the last recharge. If the recharge queue overflows, the method recreates the queue with a new priority offset to avoid overflow.

The `updateNodeRc` method updates a client node's recharge value and adds an external correction value. It also adds or removes the client node from the recharge queue and updates the server parameters and sum recharge if necessary.

The `reduceTotalCapacity` method reduces the total capacity allowance in case of a client freeze event. It updates the total capacity factor, which allows the total capacity of the system to go over the allowed total recharge value if clients go to frozen state sufficiently rarely.

The `updateTotalCapacity` method updates the total capacity factor. The capacity factor allows the total capacity of the system to go over the allowed total recharge value if clients go to frozen state sufficiently rarely. It is dropped instantly by a small amount if a client is frozen and raised slowly (with a large time constant) if the total connected capacity is close to the total allowed amount and no clients are frozen.

Here is an example of how to use the `addToQueue` method:

```
cm := ClientManager{}
node := &ClientNode{}
cm.addToQueue(node)
```

Here is an example of how to use the `updateNodeRc` method:

```
cm := ClientManager{}
node := &ClientNode{}
bvc := int64(100)
params := &ServerParams{}
now := mclock.AbsTime{}
cm.updateNodeRc(node, bvc, params, now)
```

Here is an example of how to use the `reduceTotalCapacity` method:

```
cm := ClientManager{}
frozenCap := uint64(100)
cm.reduceTotalCapacity(frozenCap)
```

Here is an example of how to use the `updateTotalCapacity` method:

```
cm := ClientManager{}
now := mclock.AbsTime{}
refresh := true
cm.updateTotalCapacity(now, refresh)
``` ## Function: TC * float64(dt)

This function takes in a time duration `dt` as a float64 value and returns the product of the time duration and a constant value `TC`. The result is also a float64 value.

## Function: (cm *ClientManager) refreshCapacity()

This function recalculates the total capacity value and sends an update to the subscription channel if the relative change of the value since the last update is more than 0.1 percent. It first calculates the total capacity value by taking the exponential of the `logTotalCap` field of the `ClientManager` struct. If the total capacity value is within 0.1% of the previous value, the function returns without sending an update. Otherwise, it updates the `totalCapacity` field of the `ClientManager` struct and sends an update to the subscription channel if it exists.

## Function: (cm *ClientManager) SubscribeTotalCapacity(ch chan uint64) uint64

This function returns all future updates to the total capacity value through a channel and also returns the current value. It takes in a channel `ch` of type `chan uint64` as a parameter and sets it as the subscription channel for the `ClientManager` struct. It then returns the current value of the `totalCapacity` field of the `ClientManager` struct as a uint64 value.

## Type: PieceWiseLinear

This type is used to describe recharge curves. It is a slice of structs, where each struct contains two uint64 fields `X` and `Y`. The `X` field represents the x-coordinate of a point on the curve, and the `Y` field represents the y-coordinate of the same point.

## Function: (pwl PieceWiseLinear) ValueAt(x uint64) float64

This function takes in a uint64 value `x