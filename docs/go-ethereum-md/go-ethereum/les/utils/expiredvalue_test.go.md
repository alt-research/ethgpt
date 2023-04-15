This code is a test suite for the `ExpiredValue` struct and its associated methods. The `ExpiredValue` struct represents a value that expires over time, with a base value and an exponent that determines the rate of decay. The `Value` method returns the current value of the `ExpiredValue` at a given time offset, while the `Add` method adds a given amount to the `ExpiredValue` at a given time offset. The `AddExp` method adds another `ExpiredValue` to the current `ExpiredValue`, and the `Sub` method subtracts a given amount from the `ExpiredValue` at a given time offset.

The `TestValueExpiration` function tests the `Value` method by creating several test cases with different `ExpiredValue` inputs and time offsets, and checking that the expected value is returned.

The `TestValueAddition` function tests the `Add` method by creating several test cases with different `ExpiredValue` inputs, addends, and time offsets, and checking that the expected value and net amount (the amount added minus the amount decayed) are returned.

The `TestExpiredValueAddition` function tests the `AddExp` method by creating several test cases with different `ExpiredValue` inputs and another `ExpiredValue` to add, and checking that the expected value is returned after the addition.

The `TestExpiredValueSubtraction` function tests the `Sub` method by creating several test cases with different `ExpiredValue` inputs, subtrahends, and time offsets, and checking that the expected value and net amount (the amount subtracted minus the amount decayed) are returned.

Overall, this code provides a comprehensive test suite for the `ExpiredValue` struct and its associated methods, ensuring that they function correctly and as expected. The code provided contains three test functions for two different types: `ExpiredValue` and `LinearExpiredValue`. The tests are written in Go and use the built-in testing package.

## ExpiredValue

### type ExpiredValue

```go
type ExpiredValue struct {
    Base uint64
    Exp  int32
}
```

`ExpiredValue` is a struct that represents a value that has expired. It has two fields: `Base` and `Exp`. `Base` is the base value of the expired value, and `Exp` is the exponent of the expired value.

### func (v *ExpiredValue) SubExp(another ExpiredValue)

```go
func (v *ExpiredValue) SubExp(another ExpiredValue)
```

`SubExp` is a method of `ExpiredValue` that subtracts another `ExpiredValue` from the current `ExpiredValue`. It modifies the current `ExpiredValue` in place.

### func (v *ExpiredValue) Value(timeOffset Fixed64) uint64

```go
func (v *ExpiredValue) Value(timeOffset Fixed64) uint64
```

`Value` is a method of `ExpiredValue` that calculates the value of the expired value at a given time offset. It takes a `Fixed64` time offset as input and returns a `uint64` value.

## LinearExpiredValue

### type LinearExpiredValue

```go
type LinearExpiredValue struct {
    Offset int64
    Val    uint64
    Rate   mclock.AbsTime
}
```

`LinearExpiredValue` is a struct that represents a linearly decaying value that has expired. It has three fields: `Offset`, `Val`, and `Rate`. `Offset` is the offset of the linear decay, `Val` is the initial value of the linear decay, and `Rate` is the rate of the linear decay.

### func (v *LinearExpiredValue) Value(now mclock.AbsTime) uint64

```go
func (v *LinearExpiredValue) Value(now mclock.AbsTime) uint64
```

`Value` is a method of `LinearExpiredValue` that calculates the value of the linearly decaying value at a given time. It takes a `mclock.AbsTime` time as input and returns a `uint64` value.

### func (v *LinearExpiredValue) Add(amount int64, now mclock.AbsTime) uint64

```go
func (v *LinearExpiredValue) Add(amount int64, now mclock.AbsTime) uint64
```

`Add` is a method of `LinearExpiredValue` that adds an amount to the linearly decaying value at a given time. It takes an `int64` amount and a `mclock.AbsTime` time as input and returns a `uint64` value. It modifies the current `LinearExpiredValue` in place.

## Tests

### func TestExpiredValue(t *testing.T)

```go
func TestExpiredValue(t *testing.T)
```

`TestExpiredValue` is a test function for `ExpiredValue`. It tests the `SubExp` and `Value` methods of `ExpiredValue` with different inputs and expected outputs.

### func TestLinearExpiredValue(t *testing.T)

```go
func TestLinearExpiredValue(t *testing.T)
```

`TestLinearExpiredValue` is a test function for `LinearExpiredValue`. It tests the `Value` method of `LinearExpiredValue` with different inputs and expected outputs.

### func TestLinearExpiredAddition(t *testing.T)

```go
func TestLinearExpiredAddition(t *testing.T)
```

`TestLinearExpiredAddition` is a test function for `LinearExpiredValue`. It tests the `Add` method of `LinearExpiredValue` with different inputs and expected outputs.