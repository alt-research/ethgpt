Hello! Thank you for sharing this code with me. It looks like this is a Go implementation of the Ethereum blockchain downloader. I'd be happy to help you generate professional documentation for this codebase in Markdown format.

Let's start with the code you provided. It looks like it includes some licensing information and imports the `types` package from the `github.com/ethereum/go-ethereum/core` module. Additionally, it defines three custom event types: `DoneEvent`, `StartEvent`, and `FailedEvent`.

The `DoneEvent` type includes a pointer to a `types.Header` object, which likely represents the latest block header that has been downloaded. The `StartEvent` type doesn't include any additional information, but likely represents the start of the download process. Finally, the `FailedEvent` type includes an `error` object, which likely represents an error that occurred during the download process.

Without seeing the rest of the codebase, it's difficult to provide a more detailed explanation of these event types. However, it's likely that they are used to communicate between different parts of the downloader codebase, such as the main download loop and any error handling routines.

If you have any specific questions about this code or would like me to provide more detailed documentation for specific functions, please let me know!