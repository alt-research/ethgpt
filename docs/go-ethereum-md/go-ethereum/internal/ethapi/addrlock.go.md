# AddrLocker

The `AddrLocker` type is a mutex locker for Ethereum addresses. It provides methods for locking and unlocking mutexes for specific addresses.

## Functions

### lock

```go
func (l *AddrLocker) lock(address common.Address) *sync.Mutex
```

`lock` returns the lock of the given address.

### LockAddr

```go
func (l *AddrLocker) LockAddr(address common.Address)
```

`LockAddr` locks an account's mutex. This is used to prevent another transaction from getting the same nonce until the lock is released. The mutex prevents the (an identical nonce) from being read again during the time that the first transaction is being signed.

### UnlockAddr

```go
func (l *AddrLocker) UnlockAddr(address common.Address)
```

`UnlockAddr` unlocks the mutex of the given account.