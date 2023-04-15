The `msgrate` package provides functionality for estimating the message throughput of peers to achieve more balanced syncs. The package includes a `Tracker` type that tracks the message rate of peers and a `Capacity` type that estimates the capacity of peers based on their message rate.

The `Tracker` type tracks the message rate of peers by keeping a sliding window of the last `n` messages received from each peer. The message rate is estimated by dividing the number of messages in the window by the time elapsed since the first message in the window. The `Tracker` also includes functionality for estimating the round trip time (RTT) of peers based on the time it takes to receive a response to a ping message.

The `Capacity` type estimates the capacity of peers based on their message rate and RTT. The capacity is estimated by dividing the message rate by the RTT and applying a smoothing factor to the result. The `Capacity` type also includes functionality for estimating the timeout for network requests based on the RTT and the estimated capacity.

Here is a brief description of the constants used in the package:

- `measurementImpact`: the impact a single measurement has on a peer's final capacity value.

- `capacityOverestimation`: the ratio of items to over-estimate when retrieving a peer's capacity to avoid locking into a lower value due to never attempting to fetch more than some local stable value.

- `rttMinEstimate`: the minimal round trip time to target requests for.

- `rttMaxEstimate`: the maximal round trip time to target requests for.

- `rttPushdownFactor`: a multiplier to attempt forcing quicker requests than what the message rate tracker estimates.

- `rttMinConfidence`: the minimum value the roundtrip confidence factor may drop to.

- `ttlScaling`: the multiplier that converts the estimated roundtrip time to a timeout cap for network requests.

- `ttlLimit`: the maximum timeout allowance to prevent reaching crazy numbers if some unforeseen network events happen.

The `Tracker` type has the following methods:

- `NewTracker(windowSize int, pingInterval time.Duration) *Tracker`: creates a new `Tracker` instance with the given window size and ping interval.

- `Add(peer string, msgTime time.Time)`: adds a message received from the given peer at the given time to the tracker.

- `Ping(peer string) (time.Duration, error)`: sends a ping message to the given peer and returns the round trip time.

- `MessageRate(peer string) float64`: returns the estimated message rate of the given peer.

- `RTT(peer string) (time.Duration, float64)`: returns the estimated round trip time and confidence factor of the given peer.

The `Capacity` type has the following methods:

- `NewCapacity(): creates a new `Capacity` instance.

- `Add(peer string, rate float64, rtt time.Duration)`: adds a message rate and round trip time measurement for the given peer.

- `Get(peer string) (float64, error)`: returns the estimated capacity of the given peer.

- `Timeout(peer string) time.Duration`: returns the estimated timeout for network requests to the given peer.

Here is an example usage of the `Tracker` and `Capacity` types:

```go
package main

import (
	"time"

	"github.com/ethereum/go-ethereum/msgrate"
)

func main() {
	// Create a new Tracker instance
	tracker := msgrate.NewTracker(100, 10*time.Second)

	// Add some messages to the tracker
	tracker.Add("peer-1", time.Now())
	tracker.Add("peer-1", time.Now().Add(-5*time.Second))
	tracker.Add("peer-1", time.Now().Add(-10*time.Second))

	// Get the message rate of the peer
	rate := tracker.MessageRate("peer-1")
	println("Message rate:", rate)

	// Ping the peer and get the round trip time
	rtt, err := tracker.Ping("peer-1")
	if err != nil {
		println("Ping error:", err.Error())
	} else {
		println("Round trip time:", rtt)
	}

	// Create a new Capacity instance
	capacity := msgrate.NewCapacity()

	// Add some message rate and round trip time measurements
	capacity.Add("peer-1", 100, 2*time.Second)
	capacity.Add("peer-1", 200, 3*time.Second)
	capacity.Add("peer-1", 300, 4*time.Second)

	// Get the estimated capacity of the peer
	cap, err := capacity.Get("peer-1")
	if err != nil {
		println("Capacity error:", err.Error())
	} else {
		println("Capacity:", cap)
	}

	// Get the estimated timeout for network requests to the peer
	timeout := capacity.Timeout("peer-1")
	println("Timeout:", timeout)
}
```

The output of the example program might look like this:

```
Message rate: 0.3
Round trip time: 1.234567s
Capacity: 75
Timeout: 12s
``` The `Tracker` type is used to estimate the throughput capacity of a peer with regard to each data type it can deliver. The goal is to dynamically adjust request sizes to maximize network throughput without overloading either the peer or the local node. The `Tracker` achieves this by tracking in real-time the latencies and bandwidths peers exhibit for each packet type.

The `Tracker` type has the following fields:

- `capacity map[uint64]float64`: a map that stores the number of items retrievable per second of a given type. It is analogous to bandwidth, but uses items instead of bytes as the unit.

- `roundtrip time.Duration`: the latency a peer in general responds to data requests. This number is not used inside the tracker, but is exposed to compare peers to each other and filter out slow ones.

The `Tracker` type has the following methods:

- `NewTracker(caps map[uint64]float64, rtt time.Duration) *Tracker`: creates a new `Tracker` instance for a specific peer. An initial round-trip time (RTT) is needed to avoid a peer getting marked as an outlier compared to others right after joining. It's suggested to use the median RTT across all peers to initialize a new peer tracker.

- `Capacity(itemType uint64) float64`: calculates the number of items the peer is estimated to be able to retrieve within the allotted time slot. The method will round up any division errors and will add an additional overestimation ratio on top. The `itemType` parameter is the type of item to retrieve.

- `Update(itemType uint64, count int, duration time.Duration)`: updates the tracker with the number of items retrieved and the duration it took to retrieve them. The `itemType` parameter is the type of item retrieved, `count` is the number of items retrieved, and `duration` is the duration it took to retrieve them.

- `Tune(itemType uint64, target float64)`: tunes the capacity estimate for a specific item type to a new target value. The `itemType` parameter is the type of item to tune, and `target` is the new target capacity.

- `RTT() time.Duration`: returns the round-trip time of the peer.

Here is an example usage of the `Tracker`:

```go
package main

import (
	"time"

	"github.com/ethereum/go-ethereum/p2p/tracker"
)

func main() {
	// Create a new Tracker instance
	t := tracker.NewTracker(nil, 10*time.Millisecond)

	// Update the tracker with some data retrieval
	t.Update(123, 100, 50*time.Millisecond)

	// Calculate the capacity for item type 123
	capacity := t.Capacity(123)

	// Tune the capacity estimate for item type 123
	t.Tune(123, 200)

	// Get the round-trip time of the peer
	rtt := t.RTT()
}
```

Note that the `Tracker` is designed to be used in conjunction with other subsystems that track the same peer. The throughput will simply be distributed across the two trackers if both are highly active. The `Trackers` type is a set of message rate trackers across a number of peers with the goal of aggregating certain measurements across the entire set for outlier filtering and newly joining initialization. The `Trackers` type is implemented using a map to store `Tracker` instances for each peer.

The `Trackers` type has the following methods:

- `NewTrackers() *Trackers`: creates a new empty set of `Trackers`.

- `Add(peer string, protocol string, timeout time.Duration)`: adds a new `Tracker` for the given peer with the specified protocol capability identifier and timeout duration.

- `Remove(peer string)`: removes the `Tracker` for the given peer.

- `Capacity(kind uint64, targetRTT time.Duration) int`: calculates the capacity for a specific data type and target round-trip time. The capacity is an overestimation to force the peer out of a stuck minima.

- `Update(kind uint64, elapsed time.Duration, items int)`: modifies the peer's capacity values for a specific data type with a new measurement. If the delivery is zero, the peer is assumed to have either timed out or to not have the requested data, resulting in a slash to 0 capacity.

- `RoundTrip() time.Duration`: returns the current best guess as to what is a stable round trip time across the entire collection of connected peers.

- `Confidence() float64`: returns the probability that the estimated round trip value is the real one across all peers.

- `Tune()`: recalculates the cached round trip value and confidence values.

- `SetLogger(logger log.Logger)`: sets the logger for the `Trackers`.

Here is an example usage of the `Trackers`:

```go
package main

import (
	"time"

	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/p2p/tracker"
)

func main() {
	// Create a new set of Trackers
	trackers := tracker.NewTrackers()

	// Add a new Tracker for a peer
	trackers.Add("peer-1", "my-protocol", 10*time.Second)

	// Update the capacity for a specific data type with a new measurement
	trackers.Update(123, 5*time.Millisecond, 10)

	// Remove the Tracker for a peer
	trackers.Remove("peer-1")

	// Print the current best guess as to what is a stable round trip time
	println("Round trip:", trackers.RoundTrip())

	// Print the probability that the estimated round trip value is the real one across all peers
	println("Confidence:", trackers.Confidence())

	// Recalculate the cached round trip value and confidence values
	trackers.Tune()

	// Set the logger for the Trackers
	trackers.SetLogger(log.New())
}
```

Note that the `Trackers` type is designed to be used in conjunction with the `Tracker` type, and the `Capacity`, `Update`, `RoundTrip`, and `Confidence` methods of the `Trackers` type rely on the corresponding methods of the `Tracker` type. The `Trackers` type is a set of `Tracker` instances that are used to track the performance of peers in the network. The `Trackers` type has the following methods:

- `NewTrackers(log log.Logger) *Trackers`: creates a new `Trackers` instance with an empty set of trackers. The `log` parameter is a logger instance used for logging.

- `Track(id string, tracker *Tracker) error`: inserts a new `Tracker` into the set with the given `id`. If a tracker with the same `id` already exists in the set, an error is returned.

- `Untrack(id string) error`: stops tracking a previously added peer with the given `id`. If no tracker with the given `id` exists in the set, an error is returned.

- `MedianRoundTrip() time.Duration`: returns the median round trip time (RTT) across all known trackers. The purpose of the median RTT is to initialize a new peer with sane statistics that it will hopefully outperform. If it seriously underperforms, there's a risk of dropping the peer, but that is ok as we're aiming for a strong median.

- `MeanCapacities() map[uint64]float64`: returns the capacities averaged across all the added trackers. The purpose of the mean capacities are to initialize a new peer with some sane starting values that it will hopefully outperform. If the mean overshoots, the peer will be cut back to minimal capacity and given another chance.

- `TargetRoundTrip() time.Duration`: returns the current target round trip time for a request to complete in. The returned RTT is slightly under the estimated RTT. The reason is that message rate estimation is a 2 dimensional problem which is solvable for any RTT. The goal is to gravitate towards smaller RTTs instead of large messages, to result in a stabler download stream.

- `TargetTimeout() time.Duration`: returns the timeout allowance for a single request to finish under. The timeout is proportional to the estimated RTT and the confidence level.

- `Metrics() []metrics.Metric`: returns a slice of metrics that can be used to monitor the performance of the `Trackers`. The metrics include the number of trackers, the median RTT, the mean capacities, and the target RTT and timeout.

Here is an example usage of the `Trackers`:

```go
package main

import (
	"time"

	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/p2p/tracker"
)

func main() {
	// Create a new logger instance
	logger := log.New()

	// Create a new Trackers instance
	trackers := tracker.NewTrackers(logger)

	// Create a new Tracker instance
	tracker1 := tracker.New("my-protocol", 10*time.Second)

	// Add the Tracker to the Trackers set
	err := trackers.Track("peer-1", tracker1)
	if err != nil {
		logger.Error("Failed to track peer", "error", err)
	}

	// Wait for some time
	time.Sleep(5 * time.Second)

	// Remove the Tracker from the Trackers set
	err = trackers.Untrack("peer-1")
	if err != nil {
		logger.Error("Failed to untrack peer", "error", err)
	}

	// Print the median RTT
	medianRTT := trackers.MedianRoundTrip()
	logger.Info("Median RTT", "rtt", medianRTT)

	// Print the mean capacities
	meanCapacities := trackers.MeanCapacities()
	for key, val := range meanCapacities {
		logger.Info("Mean capacity", "key", key, "value", val)
	}

	// Print the target RTT and timeout
	targetRTT := trackers.TargetRoundTrip()
	targetTimeout := trackers.TargetTimeout()
	logger.Info("Target RTT and timeout", "rtt", targetRTT, "timeout", targetTimeout)

	// Print the metrics
	for _, m := range trackers.Metrics() {
		logger.Info("Metric", "name", m.Name, "value", m.Value)
	}
}
```

The output of the example program might look like this:

```
INFO [2021-10-01|12:34:56.789] Median RTT                           rtt=5s
INFO [2021-10-01|12:34:56.789] Mean capacity                       key=123 value=0.5
INFO [2021-10-01|12:34:56.789] Mean capacity                       key=456 value=0.75
INFO [2021-10-01|12:34:56.789] Target RTT and timeout              rtt=4.5s timeout=9s
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-tracker count=1
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-median-rtt value=5s
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-mean-capacity/123 value=0.5
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-mean-capacity/456 value=0.75
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-target-rtt value=4.5s
INFO [2021-10-01|12:34:56.789] Metric                              name=peer-target-timeout value=9s
``` The `Trackers` type is used to track the performance of multiple network peers and estimate the roundtrip time for network requests. The `Trackers` type is implemented using a map to store individual `Tracker` instances for each peer.

The `Trackers` type has the following methods:

- `NewTrackers(log log.Logger) *Trackers`: creates a new `Trackers` instance with the given logger.

- `Add(id string, tracker *Tracker)`: adds a new `Tracker` instance for the given peer identifier.

- `Remove(id string)`: removes the `Tracker` instance for the given peer identifier.

- `TargetTimeout() time.Duration`: returns the estimated target timeout for network requests based on the roundtrip time and confidence of the `Trackers`.

- `Capacity(id string, kind uint64, targetRTT time.Duration) int`: returns the estimated capacity of the `Tracker` instance for the given peer identifier, protocol message code, and target roundtrip time.

- `Update(id string, kind uint64, elapsed time.Duration, items int)`: updates the `Tracker` instance for the given peer identifier with the elapsed time and number of items for the given protocol message code.

- `tune()`: gathers the individual `Tracker` statistics and updates the estimated request round trip time.

- `detune()`: reduces the `Tracker` confidence in order to make fresh measurements have a larger impact on the estimates.

The `Trackers` type is used to monitor the performance of multiple network peers and estimate the roundtrip time for network requests. The `Add` method is used to add a new `Tracker` instance for each peer, and the `Remove` method is used to remove a `Tracker` instance for a peer that is no longer available.

The `TargetTimeout` method returns the estimated target timeout for network requests based on the roundtrip time and confidence of the `Trackers`. The `Capacity` method returns the estimated capacity of a `Tracker` instance for a given peer identifier, protocol message code, and target roundtrip time. The `Update` method is used to update the `Tracker` instance for a given peer identifier with the elapsed time and number of items for a given protocol message code.

The `tune` method gathers the individual `Tracker` statistics and updates the estimated request round trip time. The `detune` method reduces the `Tracker` confidence in order to make fresh measurements have a larger impact on the estimates.