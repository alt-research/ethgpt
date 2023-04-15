# Dummy Package Documentation

This package is a workaround for `go mod vendor` which won't vendor C files if there's no Go file in the same directory. This would prevent the crypto/secp256k1/libsecp256k1/include/secp256k1.h file to be vendored.

This Go file imports the c directory where there is another dummy.go file which is the second part of this workaround. These