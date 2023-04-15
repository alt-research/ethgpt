The `vm` package provides an implementation of the Ethereum Virtual Machine (EVM) used to execute smart contracts on the Ethereum blockchain. The package is licensed under the GNU Lesser General Public License.

The `EVMLogger` interface is used to collect execution traces from an EVM transaction execution. The `CaptureTxStart` and `CaptureTxEnd` functions are called for the start and end of a transaction, respectively. The `CaptureStart` and `CaptureEnd` functions are called for the start and end of the top call frame, respectively. The `CaptureEnter` and `CaptureExit` functions are called for the start and end of the rest of the call frames, respectively. The `CaptureState` function is called for each step of the VM with the current VM state. The `CaptureFault` function is called when a fault occurs during execution.

Here is the code with documentation in Markdown format:

```go
// Copyright 2015 The go-ethereum Authors
// This file is part of the go-ethereum library.
//
// The go-ethereum library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The go-ethereum library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the go-ethereum library. If not, see <http://www.gnu.org/licenses/>.

package vm

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
)

// EVMLogger is used to collect execution traces from an EVM transaction
// execution. CaptureState is called for each step of the VM with the
// current VM state.
// Note that reference types