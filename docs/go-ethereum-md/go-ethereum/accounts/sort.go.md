# Accounts and Wallets Sorting

This Go source code file implements sorting for slices of `Account` and `Wallet` structs based on their `URL` field. The `AccountsByURL` and `WalletsByURL` types are defined as slices of `Account` and `Wallet` respectively.

## AccountsByURL

`AccountsByURL` implements the `sort.Interface` interface for `[]Account` based on the `URL` field. It has the following methods:

- `Len() int`: returns the length of the slice.
- `Swap(i, j int)`: swaps the elements at indices `i` and `j` in the slice.
- `Less(i, j int) bool`: returns `true` if the `URL` of the element at index `i` is less than the `URL` of the element at index `j`, and `false` otherwise.

## WalletsByURL

`WalletsByURL` implements the `sort.Interface` interface for `[]Wallet` based on the `URL` field. It has the following methods:

- `Len() int`: returns the length of the slice.
- `Swap(i, j int)`: swaps the elements at indices `i` and `j` in the slice.
- `Less(i, j int) bool`: returns `true` if the `URL` of the element at index `i` is less than the `URL` of the element at index `j`, and `false` otherwise.