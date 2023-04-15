The codebase contains a package called `ecdh`, which contains only a C file. This Go file is part of a workaround for `go mod vendor`. The `dummy` build tag is used to exclude this file from the build process. 

```
//go:build dummy
// +build dummy

// Package ecdh contains only a C file.
//
// This Go file is part of a workaround for `go mod vendor`.
// Please see the file crypto/secp256k1/dummy.go for more information.
package ecdh
```