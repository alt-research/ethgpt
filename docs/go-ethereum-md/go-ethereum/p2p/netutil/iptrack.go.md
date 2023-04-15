The `IPTracker` struct is a type that predicts the external endpoint (IP address and port) of the local host based on statements made by other hosts. It has the following fields:

- `window`: a `time.Duration` value that configures the amount of past network events which are kept.
- `contactWindow`: a `time.Duration` value that configures the amount of time after which contact records are garbage collected.
- `minStatements`: an `int` value that enforces a minimum number of statements which must be recorded before any prediction is made.
- `clock`: a `mclock.Clock` interface that provides the current time.
- `statements`: a `map[string]ipStatement` that stores the IP statements made by other hosts.
- `contact`: a `map[string]mclock.AbsTime` that stores the time when a packet containing our endpoint information has been sent to a certain host.
- `lastStatementGC`: a `mclock.AbsTime` value that stores the time when the last statement garbage collection was performed.
- `lastContactGC`: a `mclock.AbsTime` value that stores the time when the last contact garbage collection was performed.

The `ipStatement` struct is a type that stores the endpoint and the time when the statement was made.

The `NewIPTracker` function creates a new `IPTracker` instance with the given `window`, `contactWindow`, and `minStatements` values.

The `PredictFullConeNAT` function checks whether the local host is behind full cone NAT. It predicts by checking whether any statement has been received from a node we didn't contact before the statement was made.

The `PredictEndpoint` function returns the current prediction of the external endpoint. The current strategy is simple: find the endpoint with most statements.

The `AddStatement` function records that a certain host thinks our external endpoint is the one given.

The `AddContact` function records that a packet containing our endpoint information has been sent to a certain host.

Here's an example of how to use the `IPTracker`:

```go
import (
    "time"
    "github.com/ethereum/go-ethereum/common/mclock"
    "github.com/ethereum/go-ethereum/p2p/netutil"
)

func main() {
    window := 5 * time.Minute
    contactWindow := 10 * time.Minute
    minStatements := 3
    tracker := netutil.NewIPTracker(window, contactWindow, minStatements)

    // Add statements and contacts
    tracker.AddStatement("host1", "192.168.1.1:30303")
    tracker.AddStatement("host2", "192.168.1.1:30303")
    tracker.AddStatement("host3", "192.168.1.2:30303")
    tracker.AddContact("host1")
    tracker.AddContact("host2")
    tracker.AddContact("host3")

    // Predict endpoint
    endpoint := tracker.PredictEndpoint()
    fmt.Println("Predicted endpoint:", endpoint)

    // Predict full cone NAT
    isFullConeNAT := tracker.PredictFullConeNAT()
    fmt.Println("Is behind full cone NAT:", isFullConeNAT)
}
``` The code above is a Go package that includes two methods for garbage collecting old data in an IP tracker. The "IPTracker" struct tracks the IP addresses of hosts that have made statements or been contacted within a certain time window.

The "gcStatements" method is called periodically to remove old statements from the tracker. It takes the current time as an argument and checks if the time since the last garbage collection is greater than the statement window. If it is, it sets the last statement garbage collection time to the current time and removes any statements that are older than the statement window.

The "gcContact" method is called periodically to remove old contact records from the tracker. It takes the current time as an argument and checks if the time since the last garbage collection is greater than the contact window. If it is, it sets the last contact garbage collection time to the current time and removes any contact records that are older than the contact window.

Both methods use the "mclock.AbsTime" type to represent absolute time, which is a type alias for the time.Time type. The "mclock" package provides a mockable clock for testing.

Here is an example usage of the "IPTracker" struct:

```
type MyIPTracker struct {
    statements   map[string]*Statement
    contact      map[string]mclock.AbsTime
    window       time.Duration
    contactWindow time.Duration
    lastStatementGC mclock.AbsTime
    lastContactGC mclock.AbsTime
}

func (it *MyIPTracker) gcStatements(now mclock.AbsTime) {
    // Garbage collect old statements
}

func (it *MyIPTracker) gcContact(now mclock.AbsTime) {
    // Garbage collect old contact records
}

tracker := &MyIPTracker{
    statements: make(map[string]*Statement),
    contact: make(map[string]mclock.AbsTime),
    window: 10 * time.Minute,
    contactWindow: 1 * time.Hour,
    lastStatementGC: mclock.Now(),
    lastContactGC: mclock.Now(),
}
now := mclock.Now()
tracker.gcStatements(now)
tracker.gcContact(now)
```