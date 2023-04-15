## AccessList

The `accessList` type is used to manage a list of addresses and slots that have been accessed in the state trie. It is used to optimize state trie access by keeping track of which addresses and slots have been accessed, and which have not.

### Fields

- `addresses`: A map of addresses to their index in the `slots` slice. If an address is not present in the map, it has not been accessed.
- `slots`: A slice of maps, where each map contains the slots that have been accessed for a particular address. If an address has not been accessed, its corresponding map is empty.

### ContainsAddress

```go
func (al *accessList) ContainsAddress(address common.Address) bool
```

`ContainsAddress` returns true if the address is in the access list.

### Contains

```go
func (al *accessList) Contains(address common.Address, slot common.Hash) (addressPresent bool, slotPresent bool)
```

`Contains` checks if a slot within an account is present in the access list, returning separate flags for the presence of the account and the slot respectively.

### newAccessList

```go
func newAccessList() *accessList
```

`newAccessList` creates a new `accessList`.

### Copy

```go
func (a *accessList) Copy() *accessList
```

`Copy` creates an independent copy of an `accessList`.

### AddAddress

```go
func (al *accessList) AddAddress(address common.Address) bool
```

`AddAddress` adds an address to the access list, and returns 'true' if the operation caused a change (address was not previously in the list).

### AddSlot

```go
func (al *accessList) AddSlot(address common.Address, slot common.Hash) (addrChange bool, slotChange bool)
```

`AddSlot` adds the specified (address, slot) combo to the access list. Return values are:
- `address added`
- `slot added`

For any 'true' value returned, a corresponding journal entry must be made.

### DeleteSlot

```go
func (al *accessList) DeleteSlot(address common.Address, slot common.Hash)
```

`DeleteSlot` removes an (address, slot)-tuple from the access list. This operation needs to be performed in the same order as the addition happened. This method is meant to be used by the journal, which maintains ordering of operations. ## AccessList

The `accessList` struct is used to keep track of the access list for a transaction. The access list is a list of addresses and storage slots that a transaction accesses during its execution.

### Fields

- `addresses`: A map of addresses to their index in the `slots` slice.
- `slots`: A slice of maps, where each map contains the storage slots accessed by an address.

### Methods

#### Add(address common.Address, slot common.Hash)

This method adds a storage slot to the access list for an address. It takes two parameters:

- `address`: The address that accessed the storage slot.
- `slot`: The storage slot that was accessed.

If the address is not already in the access list, it is added to the end of the `slots` slice and its index is added to the `addresses` map. If the address is already in the access list, the storage slot is added to its corresponding map in the `slots` slice.

#### Delete(address common.Address, slot common.Hash)

This method removes a storage slot from the access list for an address. It takes two parameters:

- `address`: The address that accessed the storage slot.
- `slot`: The storage slot that was accessed.

If the address is not in the access list, the method panics with an error message. If the address is in the access list, the storage slot is removed from its corresponding map in the `slots` slice. If the map is empty after the removal, it is removed from the `slots` slice and the address is removed from the `addresses` map.

#### DeleteAddress(address common.Address)

This method removes an address from the access list. It takes one parameter:

- `address`: The address to remove from the access list.

This method is meant to be used by the journal, which maintains ordering of operations. It simply removes the address from the `addresses` map.