# GasPool

The `GasPool` type tracks the amount of gas available during the execution of transactions in a block. The zero value is a pool with zero gas available.

## Function `AddGas`

`AddGas` adds gas to the pool for execution.

```go
func (gp *GasPool) AddGas(amount uint64) *GasPool
```

### Parameters

- `amount` - the amount of gas to add.

### Return Values

- `*GasPool` - the updated gas pool.

### Panics

- If the gas pool is pushed above `uint64`.

## Function `SubGas`

`SubGas` deducts the given amount from the pool if enough gas is available and returns an error otherwise.

```go
func (gp *GasPool) SubGas(amount uint64) error
```

### Parameters

- `amount` - the amount of gas to deduct.

### Return Values

- `error` - an error if there is not enough gas available.

## Function `Gas`

`Gas` returns the amount of gas remaining in the pool.

```go
func (gp *GasPool) Gas() uint64
```

### Return Values

- `uint64` - the amount of gas remaining in the pool.

## Function `SetGas`

`SetGas` sets the amount of gas with the provided number.

```go
func (gp *GasPool) SetGas(gas uint64)
```

### Parameters

- `gas` - the amount of gas to set.

## Function `String`

`String` returns a string representation of the gas pool.

```go
func (gp *GasPool) String() string
```

### Return Values

- `string` - a string representation of the gas pool.