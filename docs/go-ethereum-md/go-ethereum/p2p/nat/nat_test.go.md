## Package nat

The `nat` package provides a way to discover and interact with NAT devices on a network. It contains functions and types for discovering the external IP address of a NAT device, creating port mappings, and removing port mappings.

### TestAutoDiscRace

The `TestAutoDiscRace` function is a test function that checks that autodisc doesn't hang and returns consistent results when multiple goroutines call its methods concurrently. It takes a testing object `t` as an argument.

#### startautodisc

The `startautodisc` function is called within `TestAutoDiscRace` and returns an `Interface` object. It takes two arguments: a string `thing` and a function that returns an `Interface`. The function passed as an argument to `startautodisc` sleeps for 500 milliseconds and returns an `ExtIP` object with IP address `33.44.55.66`.

#### Concurrent calls to ad.ExternalIP

Within `TestAutoDiscRace`, a few concurrent calls to `ad.ExternalIP` are spawned. The results of these calls are sent to a channel of type `rval`.

#### Checking results

The test checks that all concurrent calls to `ad.ExternalIP` return the correct result within a deadline of 2 seconds. If the deadline is exceeded, the test fails. If an unexpected error is returned, the test fails. If the IP address returned is not equal to `33.44.55.66`, the test fails.