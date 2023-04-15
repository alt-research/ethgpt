## Introduction

This document provides documentation for the source code of a Request and Response struct in a Go codebase. The Request and Response structs are responsible for tracking and delivering requests and responses between peers in a blockchain network. The codebase is written in Go programming language.

## Request Struct

The Request struct is defined as follows:

```go
type Request struct {
    peer *Peer  // Peer to which this request belogs for untracking
    id   uint64 // Request ID to match up replies to

    sink   chan *Response // Channel to deliver the response on
    cancel chan struct{}  // Channel to cancel requests ahead of time

    code uint64      // Message code of the request packet
    want uint64      // Message code of the response packet
    data interface{} // Data content of the request packet

    Peer string    // Demultiplexer if cross-peer requests are batched together
    Sent time.Time // Timestamp when the request was sent
}
```

### Close Function

The `Close` function aborts an in-flight request. Although there's no way to notify the remote peer about the cancellation, this method notifies the dispatcher to discard any late responses. The function returns an error if the request was already closed or the peer was disconnected.

```go
func (r *Request) Close() error {
    if r.peer == nil { // Tests mock out the dispatcher, skip internal cancellation
        return nil
    } ## Introduction

This document provides documentation for the source code of a Peer struct in a Go codebase. The Peer struct is responsible for handling network communication between nodes in a blockchain network. The codebase is written in Go programming language.

## Peer Struct

The Peer struct is defined as follows:

```go
type Peer struct {
    // fields
}
```

### request Struct

The `request` struct is a wrapper around a remote Request that has an error channel to signal on if processing the request failed. The struct has three fields: `req` which is a pointer to a Request type representing the request, `fail` which is a channel of error type to signal if processing the request failed, and `cancel` which is a channel of struct type to cancel the request.

```go
type request struct {
    req    *Request
    fail   chan error
    cancel chan struct{}
}
```

### response Struct

The `response` struct is ## Introduction

This document provides documentation for the source code of a response dispatcher in a Go codebase. The response dispatcher is responsible for dispatching responses to their corresponding requests. The codebase is written in Go programming language.

## Response Dispatcher

The response dispatcher is defined as follows:

```go
func (p *peer) dispatchResponseLoop() {
    // fields
}
```

### dispatchResponseLoop Function

The `dispatchResponseLoop` function is responsible for dispatching responses to their corresponding requests. The function runs in a loop until the `term` channel is closed. The function listens for incoming responses on the `p.resp` channel and dispatches them to their corresponding requests. If the response is not valid, the function sends an error to the `fail` channel of the corresponding response operation. If the response is valid, the function signals the delivery routine that it can wait for a handler response and dispatches the data. Finally, the function stops tracking the request and deletes it from the `pending` map.

```go
func (p *peer) dispatchResponseLoop() {
    pending := make(map[uint64]*responseOp)
    for {
        select {
        case res := <-p.resp:
            resOp, ok := pending[res.id]
            if !ok {
                // Response arrived, but there's no matching request. This can
                // happen if the request timed out or was cancelled.
                continue
            }

            switch {
            case res.err != nil:
                // Response arrived, but it's an error. Fail the operation.
               	resOp.fail <- res.err

            case res.Req == nil:
                // Response arrived, but it's a dangling response. Fail the
                // operation.
                errDanglingResponse := errors.New("dangling response")
                resOp.fail <- errDanglingResponse

            case res.Req.want != res.code:
                // Response arrived, but it's a different packet type than the
                // one expected by the requester. Either the local code is bad,
                // or the remote peer send junk. In neither cases can we handle
                // the packet.
                errMismatchingResponseType := errors.New("mismatching response type")
                resOp.fail <- fmt.Errorf("%w: have %d, want %d", errMismatchingResponseType, res.code, res.Req.want)

            default:
                // All dispatcher checks passed and the response was initialized
                // with the matching request. Signal to the delivery routine that
                // it can wait for a handler response and dispatch the data.
                res.Time = res.recv.Sub(res.Req.Sent)
                resOp.fail <- nil

                // Stop tracking the request, the response dispatcher will deliver
                delete(pending, res.id)
            }

        case <-p.term:
            return
        }
    }
}
```