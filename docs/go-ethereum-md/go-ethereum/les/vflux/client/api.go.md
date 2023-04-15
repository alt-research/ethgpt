# Documentation for PrivateClientAPI

This file contains the implementation of the `PrivateClientAPI` struct, which is responsible for providing the client-side API for the vflux service. The API provides functions for retrieving statistics and calculating timeouts for the service.

## PrivateClientAPI struct

The `PrivateClientAPI` struct contains a single field:

- `vt`: a pointer to a `ValueTracker` struct, which is used to track the service value provided by the vflux service.

## NewPrivateClientAPI function

The `NewPrivateClientAPI` function creates a new instance of the `PrivateClientAPI` struct. It takes a single argument:

- `vt`: a pointer to a `ValueTracker` struct, which is used to track the service value provided by the vflux service.

## parseNodeStr function

The `parseNodeStr` function is a helper function that converts either an enode address or a plain hex node id to an `enode.ID`. It takes a single argument:

- `nodeStr`: a string representing either an enode address or a plain hex node id.

If the `nodeStr` argument is a valid enode address or hex node id, the function returns the corresponding `enode.ID`. Otherwise, it returns an error.

## RequestStats method

The `RequestStats` method returns the current contents of the reference request basket, with request values meaning average per request rather than total. It takes no arguments.

The method returns a slice of `RequestStatsItem` structs, which contain information about the requests made to the vflux service.

## Distribution method

The `Distribution` method returns a distribution as a series of (X, Y) chart coordinates, where the X axis is the response time in seconds while the Y axis is the amount of service value received with a response time close to the X coordinate. The distribution is optionally normalized to a sum of 1.

The method takes two arguments:

- `nodeStr`: a string representing the enode address or hex node id of the server node to retrieve the distribution for. If this argument is an empty string, the global distribution is returned.
- `normalized`: a boolean indicating whether the distribution should be normalized to a sum of 1.

The method returns an `RtDistribution` struct, which contains the X and Y coordinates of the distribution.

## Timeout method

The `Timeout` method suggests a timeout value based on either the global distribution or the distribution of the specified node. The parameter is the desired rate of timeouts assuming a similar distribution in the future. Note that the actual timeout should have a sensible minimum bound so that operating under ideal working conditions for a long time (for example, using a local server with very low response times) will not make it very hard for the system to accommodate longer response times in the future.

The method takes two arguments:

- `nodeStr`: a string representing the enode address or hex node id of the server node to calculate the timeout for. If this argument is an empty string, the global timeout is returned.
- `failRate`: a float64 representing the desired rate of timeouts assuming a similar distribution in the future.

The method returns a float64 representing the suggested timeout value in seconds. ## PrivateClientAPI.Value

The `Value` function is a method of the `PrivateClientAPI` struct that retrieves the value of the runtime statistics of a specified server node or of the entire system. The function takes two parameters: `nodeStr` and `timeout`.

The `nodeStr` parameter is a string that represents the ID of the server node whose runtime statistics value is to be retrieved. If the `nodeStr` parameter is an empty string, the function retrieves the value of the runtime statistics of the entire system.

The `timeout` parameter is a float64 value that represents the timeout duration in seconds. The function uses this timeout value to calculate a weight function based on the given timeout.

The function first calculates the weight function using the `TimeoutWeights` function, which takes a duration as a parameter and returns a weight function based on the duration. The duration is calculated by multiplying the `timeout` parameter by the `time.Second` constant.

The function then calculates an exponential factor using the `StatsExpirer` method of the `vt` field of the `PrivateClientAPI` struct. The `StatsExpirer` method returns a `StatsExpirer` instance that is used to expire runtime statistics based on their age. The `LogOffset` method of the `StatsExpirer` instance returns the logarithm of the offset of the current time from the start time of the statistics expirer. The `mclock.Now()` function is used to get the current time.

If the `nodeStr` parameter is an empty string, the function retrieves the value of the runtime statistics of the entire system using the `RtStats` method of the `vt` field of the `PrivateClientAPI` struct. The `RtStats` method returns a `RtStats` instance that is used to retrieve the runtime statistics of the entire system. The `Value` method of the `RtStats` instance is called with the weight function and exponential factor as parameters to retrieve the value of the runtime statistics of the entire system.

If the `nodeStr` parameter is not an empty string, the function parses the `nodeStr` parameter using the `parseNodeStr` function to get the ID of the server node. If the `parseNodeStr` function returns an error, the function returns 0 and the error. If the `parseNodeStr` function returns the ID of the server node, the function retrieves the `RtStats` instance of the server node using the `GetNode` method of the `vt` field of the `PrivateClientAPI` struct. The `GetNode` method returns a `Node` instance that represents the server node. The `RtStats` method of the `Node` instance is called with the weight function and exponential factor as parameters to retrieve the value of the runtime statistics of the server node. The function returns the value of the runtime statistics and nil as the error.