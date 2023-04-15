# Noncer

The `noncer` struct is a virtual state database that manages the executable nonces of accounts in the transaction pool. It falls back to reading from a real state database if an account is unknown.

## newNoncer

`newNoncer` creates a new virtual state database to track the pool nonces.

### Parameters

- `statedb`: A pointer to a `state.StateDB` object.

### Returns

A pointer to a new `noncer` object.

## get

`get` returns the current nonce of an account, falling back to a real state database if the account is unknown.

### Parameters

- `addr`: The address of the account.

### Returns

The current nonce of the account.

## set

`set` inserts a new virtual nonce into the virtual state database to be returned whenever the pool requests it instead of reaching into the real state database.

### Parameters

- `addr`: The address of the account.
- `nonce`: The new nonce to be set.

## setIfLower

`setIfLower` updates a new virtual nonce into the virtual state database if the new one is lower.

### Parameters

- `addr`: The address of the account.
- `nonce`: The new nonce to be set.

## setAll

`setAll` sets the nonces for all accounts to the given map.

### Parameters

- `all`: A map of account addresses to their nonces.