# Secp256k1 Package Documentation

This package provides callbacks for converting libsecp256k1 internal faults into recoverable Go panics.

## Functions

### secp256k1GoPanicIllegal

```go
//export secp256k1GoPanicIllegal
func secp256k1GoPanicIllegal(msg *C.char, data unsafe.Pointer)
```

secp256k1GoPanicIllegal is a callback function that converts libsecp256k1 internal faults related to illegal arguments into recoverable Go panics. It