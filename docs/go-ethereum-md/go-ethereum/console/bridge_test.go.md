## Console Package

The `console` package contains functions that allow interaction with the Ethereum console. The package includes two test functions, `TestUndefinedAsParam` and `TestNullAsParam`, which test the ability of personal functions to receive `undefined` and `null` as parameters.

### TestUndefinedAsParam

The `TestUndefinedAsParam` function tests the ability of personal functions to receive `undefined` as a parameter. The function creates a `bridge` object and a `jsre.Call` object, and sets the `Arguments` field of the `Call` object to `goja.Undefined()`. The `UnlockAccount`, `Sign`, and `Sleep` functions of the `bridge` object are then called with the `Call` object as a parameter.

```go
func TestUndefinedAsParam(t *testing.T) {
    b := bridge{}
    call := jsre.Call{}
    call.Arguments = []goja.Value{goja.Undefined()}

    b.UnlockAccount(call)
    b.Sign(call)
    b.Sleep(call)
}
```

### TestNullAsParam

The `TestNullAsParam` function tests the ability of personal functions to receive `null` as a parameter. The function creates a `bridge` object and a `jsre.Call` object, and sets the `Arguments` field of the `Call` object to `goja.Null()`. The `UnlockAccount`, `Sign`, and `Sleep` functions of the `bridge` object are then called with the `Call` object as a parameter.

```go
func TestNullAsParam(t *testing.T) {
    b := bridge{}
    call := jsre.Call{}
    call.Arguments = []goja.Value{goja.Null()}

    b.UnlockAccount(call)
    b.Sign(call)
    b.Sleep(call)
}
```