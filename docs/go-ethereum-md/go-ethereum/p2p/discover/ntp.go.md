This codebase contains the implementation of the Simple Network Time Protocol (SNTP) for detecting clock drifts in the system clock. The SNTP protocol is used to synchronize the time of a computer system with a reference time source, such as an NTP server.

The `discover` package contains the `checkClockDrift` function, which queries an NTP server for clock drifts and warns the user if one large enough is detected. The function uses the `sntpDrift` function to perform the time resolution against the NTP server.

The `sntpDrift` function does a naive time resolution against an NTP server and returns the measured drift. It constructs a time request and sends it to the NTP server, retrieves the reply, and calculates the elapsed time. It then reconstructs the time from the reply data and calculates the drift. The function executes `measurements` number of measurements and discards the two extremes as outliers.

The `durationSlice` type is a slice of `time.Duration` values that attaches the methods of `sort.Interface` to sort the slice in increasing order.

The `checkClockDrift` function calls the `sntpDrift` function with `ntpChecks` number of measurements and checks if the drift is larger than the `driftThreshold` constant. If the drift is larger than the threshold, it warns the user that the system clock is off and suggests enabling network time synchronization in system settings.

Overall, the `discover` package provides a simple and effective implementation of the SNTP protocol for detecting clock drifts in the system clock. This code calculates the clock drift between two machines by measuring the round-trip time (RTT) of a network request and assuming that the answer time is half of the RTT. The function takes in a `time.Time` object representing the current time, a `string` representing the network address of the remote machine, and an `int` representing the number of measurements to take.

The function first creates a slice to store the drifts between the local and remote clocks. It then loops `measurements` times, sending a network request to the remote machine and measuring the time it takes to receive a response. It calculates the elapsed time by subtracting the time the request was sent from the time the response was received. It then calculates the drift by subtracting the elapsed time divided by two from the difference between the local time and the remote time. The drift is added to the `drifts` slice.

After all measurements have been taken, the `drifts` slice is sorted in ascending order. The function then calculates the average drift by summing all the drifts except for the first and last (to avoid outliers) and dividing by the number of measurements. The average drift is returned as a `time.Duration` object.

Overall, this function provides a simple and effective way to measure clock drift between two machines using network requests.