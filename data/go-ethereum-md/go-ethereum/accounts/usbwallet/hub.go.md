# Hardware Wallet Manager

The `usbwallet` package provides a hardware wallet manager that can find and handle generic USB hardware wallets. The `Hub` struct is the main component of the package, and it is responsible for managing the hardware wallets.

## Hub

The `Hub` struct is the main component of the package. It is responsible for managing the hardware wallets. The `Hub` struct has the following fields:

- `scheme string`: the protocol scheme prefixing account and wallet URLs.
- `vendorID uint16`: the USB vendor identifier used for device discovery.
- `productIDs []uint16`: the USB product identifiers used for device discovery.
- `usageID uint16`: the USB usage page identifier used for macOS device discovery.
- `endpointID int`: the USB endpoint identifier used for non-macOS device discovery.
- `makeDriver func(log.Logger) driver`: a factory method to construct a vendor-specific driver.
- `refreshed time.Time`: the time instance when the list of wallets was last refreshed.
- `wallets []accounts.Wallet`: a list of USB wallet devices currently tracking.
- `updateFeed event.Feed`: an event feed to notify wallet additions/removals.
- `updateScope event.SubscriptionScope`: a subscription scope tracking current live listeners.
- `updating bool`: whether the event notification loop is running.
- `quit chan chan error`: a channel for terminating the event notification loop.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the hub's fields.
- `commsPend int`: the number of operations blocking enumeration.
- `commsLock sync.Mutex`: a lock protecting the pending counter and enumeration.
- `enumFails uint32`: the number of times enumeration has failed.

The `Hub` struct has the following methods:

- `NewLedgerHub() (*Hub, error)`: creates a new hardware wallet manager for Ledger devices.
- `NewTrezorHub() (*Hub, error)`: creates a # Hardware Wallet Manager

The `usbwallet` package provides a hardware wallet manager for generic USB devices. The `Hub` struct is the main component of the package, and it is responsible for managing the USB devices and wallets.

## Hub

The `Hub` struct is the main component of the package. It is responsible for managing the USB devices and wallets. The `Hub` struct has the following fields:

- `scheme string`: the scheme of the hardware wallet manager.
- `vendorID uint16`: the vendor ID of the USB devices.
- `productIDs []uint16`: the product IDs of the USB devices.
- `usageID uint16`: the usage ID of the USB devices.
- `endpointID int`: the endpoint ID of the USB devices.
- `makeDriver func(log.Logger) driver`: a function that creates a new driver instance.
- `quit chan chan error`: a channel for terminating the update loop.
- `stateLock sync.RWMutex`: a read-write mutex for synchronizing access to the hub's state.
- `wallets []accounts.Wallet`: a list of wallets managed by the hub # USB Hub

The `usbwallet` package provides a USB hub for managing USB wallets. The `Hub` struct is the main component of the package, and it is responsible for maintaining an up-to-date list of wallets managed by the USB hub and for firing wallet addition/removal events.

## Hub

The `Hub` struct is the main component of the package. It is responsible for maintaining an up-to-date list of wallets managed by the USB hub and for firing wallet addition/removal events. The `Hub` struct has the following fields:

- `scheme string`: the URL scheme for the wallets.
- `driverMaker DriverMaker`: a function for creating a new driver.
- `refreshed time.Time`: the time when the wallets were last refreshed.
- `wallets []accounts.Wallet`: a list of wallets managed by the USB hub.
- `updateFeed event.Feed`: a feed for wallet addition/removal events.
- `updateScope event.SubscriptionScope`: a subscription scope for the feed.
- `updating bool`: a flag indicating whether the updater is running.
- `stateLock sync.Mutex`: a mutex for synchronizing access to the hub's state.

The `Hub` struct has the following methods:

- `NewHub(scheme string, driverMaker DriverMaker) *Hub`: creates a new `Hub` instance with the given `scheme` and `driverMaker`.
- `refreshWallets()`: refreshes the list of wallets managed by the USB hub and fires wallet addition/removal events.
- `Subscribe(sink chan<- accounts.WalletEvent) event.Subscription`: creates an async subscription to receive notifications on the addition or removal of USB wallets.
- `updater()`: maintains an up-to-date list of wallets managed by the USB hub and fires wallet addition/removal events.

The `NewHub` function creates a new `Hub` instance with the given `scheme` and `driverMaker`. It initializes the `wallets` field with an empty list and the `updateFeed` field with a new `event.Feed` instance.

The `refreshWallets` method refreshes the list of wallets managed by the USB hub and fires wallet addition/removal events