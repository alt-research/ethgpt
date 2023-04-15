# Downloader Metrics

The `downloader` package contains the metrics collected by the downloader. These metrics are used to track the performance of the downloader and to identify any issues that may arise during the download process.

## Variables

- `headerInMeter`: A metrics meter that tracks the number of incoming headers.
- `headerReqTimer`: A metrics timer that tracks the time it takes to request a header.
- `headerDropMeter`: A metrics meter that tracks the number of dropped headers.
- `headerTimeoutMeter`: A metrics meter that tracks the number of timed-out headers.

- `bodyInMeter`: A metrics meter that tracks the number of incoming bodies.
- `bodyReqTimer`: A metrics timer that tracks the time it takes to request a body.
- `bodyDropMeter`: A metrics meter that tracks the number of dropped bodies.
- `bodyTimeoutMeter`: A metrics meter that tracks the number of timed-out bodies.

- `receiptInMeter`: A metrics meter that tracks the number of incoming receipts.
- `receiptReqTimer`: A metrics timer that tracks the time it takes to request a receipt.
- `receiptDropMeter`: A metrics meter that tracks the number of dropped receipts.
- `receiptTimeoutMeter`: A metrics meter that tracks the number of timed-out receipts.

- `throttleCounter`: A metrics counter that tracks the number of times the downloader has been throttled.