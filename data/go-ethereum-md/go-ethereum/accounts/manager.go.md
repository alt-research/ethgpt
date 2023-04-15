# Account Manager

The `accounts` package provides an overarching account manager that can communicate with various backends for signing transactions. The `Manager` struct is the main component of the package, and it is responsible for managing the backends and wallets.

## Config

The `Config` struct contains the settings of the global account manager. It has a single field, `InsecureUnlockAllowed`, which determines whether account unlocking in an insecure environment is allowed.

## Manager

The `Manager` struct is the main component of the package. It is responsible for managing the backends and wallets. The `Manager` struct has the following fields:

- `config *Config`: the global account manager configurations.
- `backends map[reflect.Type][]Backend`: an index of backends currently registered.
- `updaters []event.Subscription`: wallet update subscriptions for all backends.
- `updates chan WalletEvent`: subscription sink for backend wallet changes.
- `newBackends chan newBackendEvent`: incoming backends to be tracked by the manager.
- `wallets []Wallet`: a cache of all wallets from all registered backends.
- `feed event.Feed`: a wallet feed notifying of arrivals/departures.
- `quit chan chan error`: a channel for terminating the update loop.
- `term chan struct{}`: a channel that is closed upon termination of the update loop.
- `lock sync.RWMutex`: a read-write mutex for synchronizing access to the manager's fields.

The `Manager` struct has the following methods:

- `NewManager(config *Config, backends ...Backend) *Manager`: creates a generic account manager to sign transactions via various supported backends.
- `Close() error`: terminates the account manager's internal notification processes.

The `NewManager` function creates a new `Manager` instance with the given `config` and `backends`. It subscribes to wallet notifications from all backends and merges the initial list of wallets from the backends and sorts them by URL.

The `Close` method terminates the account manager's internal notification processes.

## Backend

The `Backend` interface defines the methods that a backend must implement to be used by the account manager. It has the following methods:

- `Wallets() []Wallet`: returns a list of wallets managed by the backend.
- `Subscribe(sink chan<- WalletEvent) event.Subscription`: subscribes to wallet notifications from the backend.

## Wallet

The `Wallet` interface defines the methods that a wallet must implement to be used by the account manager. It has the following methods:

- `Accounts() []Account`: returns a list of accounts managed by the wallet.
- `URL() accounts.URL`: returns the URL of the wallet.

## WalletEvent

The `WalletEvent` struct represents a wallet event. It has the following fields:

- `Wallet Wallet`: the wallet that generated the event.
- `Account Account`: the account that generated the event.
- `Kind WalletEventType`: the type of the event.

## WalletEventType

The `WalletEventType` type represents the type of a wallet event. It is an enumeration with the following values:

- `WalletArrived`: a wallet has arrived.
- `WalletDeparted`: a wallet has departed.
- `AccountArrived`: an account has arrived.
- `AccountChanged`: an account has changed.
- `AccountDeparted`: an account has departed.

## Conclusion

The `accounts` package provides a generic account manager that can communicate with various backends for signing transactions. The `Manager` struct is the main component of the package, and it is responsible for managing the backends and wallets. The package also defines the `Backend`, `Wallet`, `WalletEvent`, and `WalletEventType` types and interfaces. the backends it is tracking. The subscription returns a channel that will receive
`WalletEvent` structs.
func (am *Manager) Subscribe() event.Subscription {
	return am.feed.Subscribe()
}

// Close terminates the account manager and all its backends.
func (am *Manager) Close() error {
	am.lock.Lock()
	defer am.lock.Unlock()

	// Terminate the event loop
	errc := make(chan error)
	am.quit <- errc
	err := <-errc

	// Close all backends
	for _, backends := range am.backends {
		for _, backend := range backends {
			backend.Close()
		}
	}

	return err
}

// merge returns a new slice containing all wallets in both input slices.
func merge(a, b []Wallet) []Wallet {
	// Create a map of wallets to avoid duplicates
	wallets := make(map[common.Address]Wallet)
	for _, wallet := range a {
		wallets[wallet.Address()] = wallet
	}
	for _, wallet := range b {
		wallets[wallet.Address()] = wallet
	}

	// Convert the map back to a slice
	result := make([]Wallet, 0, len(wallets))
	for _, wallet := range wallets {
		result = append(result, wallet)
	}
	return result
}

// drop returns a new slice containing all wallets in the input slice except the
// one with the given address.
func drop(wallets []Wallet, drop Wallet) []Wallet {
	result := make([]Wallet, 0, len(wallets))
	for _, wallet := range wallets {
		if wallet.Address() != drop.Address() {
			result = append(result, wallet)
		}
	}
	return result
}

// parseURL parses a URL string into a URL struct.
func parseURL(url string) (WalletURL, error) {
	parsed, err := urlpkg.Parse(url)
	if err != nil {
		return WalletURL{}, err
	}
	return WalletURL{
		Scheme: parsed.Scheme,
		Path:   parsed.Path,
	}, nil
}

// newBackendEvent is a struct used to signal the addition of a new backend.
type newBackendEvent struct {
	backend   Backend
	processed chan struct{}
} ## Manager.Subscribe

The `Subscribe` function is a method of the `Manager` struct. It takes a channel of `WalletEvent` as an argument and returns an `event.Subscription`. This function subscribes the given channel to the event feed of the `Manager`. Whenever a new `WalletEvent` is generated, it will be sent to the subscribed channel.

## merge

The `merge` function takes a slice of `Wallet` and a variable number of `Wallet` arguments. It returns a new slice of `Wallet` that contains all the wallets from the original slice and the new wallets, sorted by URL. The function assumes that the original slice is already sorted by URL.

The function iterates over the new wallets and uses the `sort.Search` function to find the correct position to insert the wallet in the new slice. If the wallet is not found in the original slice, it is appended to the end of the new slice. Otherwise, it is inserted at the correct position using the `append` function.

## drop

The `drop` function is the counterpart of `merge`. It takes a slice of `Wallet` and a variable number of `Wallet` arguments. It returns a new slice of `Wallet` that contains all the wallets from the original slice except the ones specified in the arguments. The function assumes that the original slice is already sorted by URL.

The function iterates over the wallets to be dropped and uses the `sort.Search` function to find the correct position of the wallet in the original slice. If the wallet is not found, it is skipped. Otherwise, it is removed from the original slice using the `append` function.