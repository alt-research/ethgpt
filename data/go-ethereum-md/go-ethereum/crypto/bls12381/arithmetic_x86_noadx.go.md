# BLS12381 Package Documentation

This package provides a BLS implementation for the go-ethereum library.

## Variables

### enableADX

```go
const enableADX = false
```

enableADX is a boolean variable that is set to false. It is used to determine if the ADX/BMI2 instruction set was requested for the BLS implementation. The system may still fall back to plain ASM if the necessary instructions are unavailable on the CPU.

Note: This variable is only relevant when building for the amd64 and blsasm architecture.