Certainly, I can help you with that! Here's an example of how you could document the code you provided in Markdown format:

## EWMA Interface

The `EWMA` interface defines several functions that can be used to calculate an exponentially-weighted moving average based on an outside source of clock ticks.

### Functions

#### `Rate() float64`

This function is used to get the moving average rate of events per second.

#### `Snapshot() EWMA`

This function is used to get a read-only copy of the EWMA.

#### `Tick()`

This function is used to tick the clock to update the moving average.

#### `Update(int64)`

This function is used to add uncounted events.

### NewEWMA Functions

The `NewEWMA` functions are used to construct a new EWMA with the given alpha.

#### `NewEWMA(alpha float64) EWMA`

This function is used to construct a new EWMA with the given alpha.

#### `NewEWMA1() EWMA`

This function is used to construct a new EWMA for a one-minute moving average.

#### `NewEWMA5() EWMA`

This function is used to construct a new EWMA for a five-minute moving average.

#### `NewEWMA15() EWMA`

This function is used to construct a new EWMA for a fifteen-minute moving average.

### EWMASnapshot Struct

The `EWMASnapshot` struct represents a read-only copy of another EWMA.

### Fields

#### `Rate` (float64)

The rate of events per second at the time the snapshot was taken.

### NilEWMA Struct

The `NilEWMA` struct represents a no-op EWMA.

### Functions

#### `Rate() float64`

This function is a no-op.

#### `Snapshot() EWMA`

This function is a no-op.

#### `Tick()`

This function is a no-op.

#### `Update(int64)`

This function is a no-op.

### StandardEWMA Struct

The `StandardEWMA` struct is the standard implementation of an EWMA and tracks the number of uncounted events and processes them on each tick.

### Fields

#### `uncounted` (int64)

The number of uncounted events.

#### `alpha` (float64)

The alpha value used to calculate