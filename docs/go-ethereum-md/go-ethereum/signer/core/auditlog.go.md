# Documentation for the Source Code

## Package `core`

The `core` package contains the implementation of the `AuditLogger` struct and its methods.

## Struct `AuditLogger`

The `AuditLogger` struct is used to log the requests and responses of the external API methods. It contains a `log` field of type `log.Logger` and an `api` field of type `ExternalAPI`.

### Method `List`

The `List` method takes in a `context.Context` parameter and returns a slice of `common.Address` and an error. It logs the request and response of the `api.List` method.

Example usage:

```go
func (l *AuditLogger) List(ctx context.Context) ([]common.Address, error) {
    l.log.Info("List", "type", "request", "metadata", MetadataFromContext(ctx).String())
    res, e := l.api.List(ctx)
    l.log.Info("List", "type", "response", "data", res)

    return res, e
}
```

### Method `New`

The `New` method takes in a `context.Context` parameter and returns a `common.Address` and an error. It logs the request and response of the `api.New` method.

Example usage:

```go
func (l *AuditLogger) New(ctx context.Context) (common.Address, error) {
    return l.api.New(ctx)
}
```

### Method `SignTransaction`

The `SignTransaction` method takes in a `context.Context` parameter, a `SendTxArgs` parameter, a `*string` parameter, and returns a `*ethapi.SignTransactionResult` and an error. It logs the request and response of the `api.SignTransaction` method.

Example usage:

```go
func (l *AuditLogger) SignTransaction(ctx context.Context, args apitypes.SendTxArgs, methodSelector *string) (*ethapi.SignTransactionResult, error) {
    sel := "<nil>"
    if methodSelector != nil {
        sel = *methodSelector
    }
    l.log.Info("SignTransaction", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "tx", args.String(),
        "methodSelector", sel)

    res, e := l.api.SignTransaction(ctx, args, methodSelector)
    if res != nil {
        l.log.Info("SignTransaction", "type", "response", "data", common.Bytes2Hex(res.Raw), "error", e)
    } else {
        l.log.Info("SignTransaction", "type", "response", "data", res, "error", e)
    }
    return res, e
}
```

### Method `SignData`

The `SignData` method takes in a `context.Context` parameter, a `string` parameter, a `common.MixedcaseAddress` parameter, and an interface{} parameter. It returns a `hexutil.Bytes` and an error. It logs the request and response of the `api.SignData` method.

Example usage:

```go
func (l *AuditLogger) SignData(ctx context.Context, contentType string, addr common.MixedcaseAddress, data interface{}) (hexutil.Bytes, error) {
    marshalledData, _ := json.Marshal(data) // can ignore error, marshalling what we just unmarshalled
    l.log.Info("SignData", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "addr", addr.String(), "data", marshalledData, "content-type", contentType)
    b, e := l.api.SignData(ctx, contentType, addr, data)
    l.log.Info("SignData", "type", "response", "data", common.Bytes2Hex(b), "error", e)
    return b, e
}
```

### Method `SignGnosisSafeTx`

The `SignGnosisSafeTx` method takes in a `context.Context` parameter, a `common.MixedcaseAddress` parameter, a `GnosisSafeTx` parameter, and a `*string` parameter. It returns a `*GnosisSafeTx` and an error. It logs the request and response of the `api.SignGnosisSafeTx` method.

Example usage:

```go
func (l *AuditLogger) SignGnosisSafeTx(ctx context.Context, addr common.MixedcaseAddress, gnosisTx GnosisSafeTx, methodSelector *string) (*GnosisSafeTx, error) {
    sel := "<nil>"
    if methodSelector != nil {
        sel = *methodSelector
    }
    data, _ := json.Marshal(gnosisTx) // can ignore error, marshalling what we just unmarshalled
    l.log.Info("SignGnosisSafeTx", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "addr", addr.String(), "data", string(data), "selector", sel)
    res, e := l.api.SignGnosisSafeTx(ctx, addr, gnosisTx, methodSelector)
    if res != nil {
        data, _ := json.Marshal(res) // can ignore error, marshalling what we just unmarshalled
        l.log.Info("SignGnosisSafeTx", "type", "response", "data", string(data), "error", e)
    } else {
        l.log.Info("SignGnosisSafeTx", "type", "response", "data", res, "error", e)
    }
    return res, e
}
```

### Method `SignTypedData`

The `SignTypedData` method takes in a `context.Context` parameter, a `common.MixedcaseAddress` parameter, and an `apitypes.TypedData` parameter. It returns a `hexutil.Bytes` and an error. It logs the request and response of the `api.SignTypedData` method.

Example usage:

```go
func (l *AuditLogger) SignTypedData(ctx context.Context, addr common.MixedcaseAddress, data apitypes.TypedData) (hexutil.Bytes, error) {
    marshalledData, _ := json.Marshal(data) // can ignore error, marshalling what we just unmarshalled
    l.log.Info("SignTypedData", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "addr", addr.String(), "data", marshalledData)
    b, e := l.api.SignTypedData(ctx, addr, data)
    l.log.Info("SignTypedData", "type", "response", "data", common.Bytes2Hex(b), "error", e)
    return b, e
}
``` ## Documentation for the Source Code

### Function: `SignTypedData`

The `SignTypedData` function takes in three parameters: `ctx` (a context), `addr` (a common address), and `data` (a hexutil byte slice). It logs the request and response of the `api.SignTypedData` function and returns the signed data and error.

Example usage:

```go
func (l *AuditLogger) SignTypedData(ctx context.Context, addr common.Address, data hexutil.Bytes) (common.Bytes, error) {
    l.log.Info("SignTypedData", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "addr", addr.String(), "data", data)
    b, e := l.api.SignTypedData(ctx, addr, data)
    l.log.Info("SignTypedData", "type", "response", "data", common.Bytes2Hex(b), "error", e)
    return b, e
}
```

Note: This function logs the request and response of the `api.SignTypedData` function and returns the signed data and error.

### Function: `EcRecover`

The `EcRecover` function takes in three parameters: `ctx` (a context), `data` (a hexutil byte slice), and `sig` (a hexutil byte slice). It logs the request and response of the `api.EcRecover` function and returns the recovered address and error.

Example usage:

```go
func (l *AuditLogger) EcRecover(ctx context.Context, data hexutil.Bytes, sig hexutil.Bytes) (common.Address, error) {
    l.log.Info("EcRecover", "type", "request", "metadata", MetadataFromContext(ctx).String(),
        "data", common.Bytes2Hex(data), "sig", common.Bytes2Hex(sig))
    b, e := l.api.EcRecover(ctx, data, sig)
    l.log.Info("EcRecover", "type", "response", "address", b.String(), "error", e)
    return b, e
}
```

Note: This function logs the request and response of the `api.EcRecover` function and returns the recovered address and error.

### Function: `Version`

The `Version` function takes in one parameter: `ctx` (a context). It logs the request and response of the `api.Version` function and returns the version and error.

Example usage:

```go
func (l *AuditLogger) Version(ctx context.Context) (string, error) {
    l.log.Info("Version", "type", "request", "metadata", MetadataFromContext(ctx).String())
    data, err := l.api.Version(ctx)
    l.log.Info("Version", "type", "response", "data", data, "error", err)
    return data, err
}
```

Note: This function logs the request and response of the `api.Version` function and returns the version and error.

### Function: `NewAuditLogger`

The `NewAuditLogger` function takes in two parameters: `path` (a string) and `api` (an ExternalAPI). It creates a new logger and sets the handler to a file handler with the given path. It logs the configuration and returns the new `AuditLogger` and error.

Example usage:

```go
func NewAuditLogger(path string, api ExternalAPI) (*AuditLogger, error) {
    l := log.New("api", "signer")
    handler, err := log.FileHandler(path, log.LogfmtFormat())
    if err != nil {
        return nil, err
    }
    l.SetHandler(handler)
    l.Info("Configured", "audit log", path)
    return &AuditLogger{l, api}, nil
}
```

Note: This function creates a new logger and sets the handler to a file handler with the given path. It logs the configuration and returns the new `AuditLogger` and error.