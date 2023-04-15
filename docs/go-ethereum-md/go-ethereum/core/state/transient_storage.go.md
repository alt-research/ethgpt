## state

The `state` package provides a representation of the Ethereum state and its associated storage.

### transientStorage

The `transientStorage` type is a representation of EIP-1153 "Transient Storage". It is a map of `common.Address` to `Storage`. 

#### newTransientStorage

`newTransientStorage` creates a new instance of a `transientStorage`.

#### Set

`Set` sets the transient-storage `value` for `key` at the given `addr`.

##### Parameters

- `addr`: The address of the account.
- `key`: The key of the storage slot.
- `value`: The value to set.

#### Get

`Get` gets the transient storage for `key` at the given `addr`.

##### Parameters

- `addr`: The address of the account.
- `key`: The key of the storage slot.

##### Returns

- `common.Hash`: The value of the storage slot.

#### Copy

`Copy` does a deep copy of the `transientStorage`.

##### Returns

- `transientStorage`: A deep copy of the `transientStorage`.