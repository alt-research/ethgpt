The code provided contains Go code for the vflux package. The package contains types and functions for encoding and decoding vflux requests and replies.

## Types

### type Request

```go
type Request struct {
    Service, Name string
    Params        []byte
}
```

`Request` is a struct that represents a single vflux request inside a batch. It has three fields: `Service`, `Name`, and `Params`. `Service` and `Name` are strings that identify the service and request type, respectively. `Params` is a byte slice that contains the RLP encoded parameters of the request.

### type Requests

```go
type Requests []Request
```

`Requests` is a slice of `Request` structs. It represents a batch of vflux requests.

### type Replies

```go
type Replies [][]byte
```

`Replies` is a slice of byte slices. It represents the replies to a batch of vflux requests.

### type CapacityQueryReq

```go
type CapacityQueryReq struct {
    Bias      uint64 // seconds
    AddTokens []IntOrInf
}
```

`CapacityQueryReq` is a struct that represents the encoding format of the capacity query. It has two fields: `Bias` and `AddTokens`. `Bias` is a `uint64` value that represents the bias in seconds. `AddTokens` is a slice of `IntOrInf` structs that represent the additional tokens.

### type CapacityQueryReply

```go
type CapacityQueryReply []uint64
```

`CapacityQueryReply` is a slice of `uint64` values. It represents the encoding format of the response to the capacity query.

### type IntOrInf

```go
type IntOrInf struct {
    Type  uint8
    Value big.Int
}
```

`IntOrInf` is a struct that represents the encoding format for arbitrary length signed integers that can also hold the values of +Inf or -Inf. It has two fields: `Type` and `Value`. `Type` is a `uint8` value that represents the type of the integer. `Value` is a `big.Int` value that represents the value of the integer.

## Functions

### func (r *Requests) Add(service, name string, val interface{}) (int, error)

```go
func (r *Requests) Add(service, name string, val interface{}) (int, error)
```

`Add` is a function that encodes and adds a new request to the batch. It takes three arguments: `service`, `name`, and `val`. `service` and `name` are strings that identify the service and request type, respectively. `val` is an interface that represents the parameters of the request. It returns the index of the added request and an error.

### func (r Replies) Get(i int, val interface{}) error

```go
func (r Replies) Get(i int, val interface{}) error
```

`Get` is a function that decodes the reply to the i-th request in the batch. It takes two arguments: `i` and `val`. `i` is an integer that represents the index of the request in the batch. `val` is an interface that represents the decoded reply. It returns an error if the index is out of range.

### func (i *IntOrInf) BigInt() *big.Int

```go
func (i *IntOrInf) BigInt() *big.Int
```

`BigInt` is a function that returns the value of `IntOrInf` as a `big.Int`. It returns a `big.Int` value or panics if the value is infinity.

### func (i *IntOrInf) Inf() int

```go
func (i *IntOrInf) Inf() int
```

`Inf` is a function that returns 1 if the value of `IntOrInf` is +Inf, -1 if it is -Inf, and 0 otherwise.

### func (i *IntOrInf) Int64() int64

```go
func (i *IntOrInf) Int64() int64
```

`Int64` is a function that limits the value of `IntOrInf` between `math.MinInt64` and `math.MaxInt64` (even if it is +-Inf) and returns an `int64` type.

### func (i *IntOrInf) SetBigInt(val *big.Int)

```go
func (i *IntOrInf) SetBigInt(val *big.Int)
```

`SetBigInt` is a function that sets the value of `IntOrInf` to the given `big.Int`. The code provided contains three functions that are part of a larger codebase. The functions are written in Go and are used to set the value of an `IntOrInf` struct.

## BigInt

### func BigInt(v *big.Int)

```go
func BigInt(v *big.Int)
```

`BigInt` is a function that takes a pointer to a `big.Int` and sets the value of an `IntOrInf` struct based on the sign of the `big.Int`. If the `big.Int` is non-negative, the `IntOrInf` struct is set to `IntNonNegative` and the value of the `big.Int` is copied to the `IntOrInf` struct. If the `big.Int` is negative, the `IntOrInf` struct is set to `IntNegative` and the absolute value of the `big.Int` is copied to the `IntOrInf` struct.

## SetInt64

### func (i *IntOrInf) SetInt64(v int64)

```go
func (i *IntOrInf) SetInt64(v int64)
```

`SetInt64` is a method of `IntOrInf` that sets the value of the `IntOrInf` struct to the given `int64`. If the `int64` is non-negative, the `IntOrInf` struct is set to `IntNonNegative` and the value of the `int64` is copied to the `IntOrInf` struct. If the `int64` is negative, the `IntOrInf` struct is set to `IntNegative` and the absolute value of the `int64` is copied to the `IntOrInf` struct. If the `int64` is equal to `math.MaxInt64`, the `IntOrInf` struct is set to `IntPlusInf`. If the `int64` is equal to `math.MinInt64`, the `IntOrInf` struct is set to `IntMinusInf`.

## SetInf

### func (i *IntOrInf) SetInf(sign int)

```go
func (i *IntOrInf) SetInf(sign int)
```

`SetInf` is a method of `IntOrInf` that sets the value of the `IntOrInf` struct to positive or negative infinity based on the sign parameter. If the sign parameter is equal to `1`, the `IntOrInf` struct is set to `IntPlusInf`. If the sign parameter is equal to `-1`, the `IntOrInf` struct is set to `IntMinusInf`.