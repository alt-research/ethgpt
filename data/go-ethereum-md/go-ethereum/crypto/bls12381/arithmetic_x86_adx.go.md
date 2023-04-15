# BLS12381 Package Documentation

This package provides a BLS implementation that uses the ADX/BMI2 instruction set if available on the CPU.

## Constants

### enableADX

```go
const enableADX = true
```

enableADX is a constant that is set to true if the ADX/BMI2 instruction set was requested for the BLS implementation. The system may still fall back to plain ASM if the necessary instructions are unavailable on the CPU.

## Build Tags

### amd64

```go
//go:build amd64 && blsadx
// +build amd64,blsadx
```

This build tag specifies that the code should only be built for the amd64 architecture and when the blsadx tag is specified.

### blsadx

```go
//go:build amd64 && blsadx
// +build amd64,blsadx
```

This build tag specifies that the code should only be built when the amd64 architecture and the blsadx tag are specified.