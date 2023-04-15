The `enr` package implements Ethereum Node Records as defined in EIP-778. A node record holds arbitrary information about a node on the peer-to-peer network. Node information is stored in key/value pairs. To store and retrieve key/values in a record, use the `Entry` interface.

The package supports the "secp256k1-keccak" identity scheme. Records must be signed before transmitting them to another node. Decoding a record doesn't check its signature. Code working with records from an untrusted source must always verify two things: that the record uses an identity scheme deemed secure, and that the signature is valid according to the declared scheme.

When creating a record, set the entries you want and use a signing function provided by the identity scheme to add the signature. Modifying a record invalidates the signature.

The `Record` struct represents a node record. The zero value is an empty record. It has the following fields:
- `seq`: sequence number
- `signature`: the signature
- `raw`: RLP encoded record
- `pairs`: sorted list of all key/value pairs

The `pair` struct represents a key/value pair in a record. It has the following fields:
- `k`: string key
- `v`: RLP encoded value

The `IdentityScheme` interface is capable of verifying record signatures and deriving node addresses. The `SchemeMap` is a registry of named identity schemes.

The package also defines several errors:
- `ErrInvalidSig`: invalid signature on node record
- `errNotSorted`: record key/value pairs are not sorted by key
- `errDuplicateKey`: record contains duplicate key
- `errIncompletePair`: record contains incomplete k/v pair
- `errIncompleteList`: record contains less than two list elements
- `errTooBig`: record bigger than `SizeLimit` bytes
- `errEncodeUnsigned`: can't encode unsigned record
- `errNotFound`: no such key in record

The `SizeLimit` constant is the maximum encoded size of a node record in bytes.

The `computeSize` function computes the encoded size of the record. The `Size` method returns the encoded size of the record. The `Verify` method of the `SchemeMap` verifies record signatures and the `NodeAddr` method derives node addresses. This codebase appears to be written in Go and contains a Record struct with several methods. Here is a brief description of each method:

- `ListSize` takes an integer `size` and returns an RLP-encoded list of that size.
- `Seq` returns the sequence number of the record.
- `SetSeq` updates the sequence number of the record to the given value `s`. This method also invalidates any signature on the record.
- `Load` retrieves the value of a key/value pair from the record. The given `Entry` must be a pointer and will be set to the value of the entry in the record. Errors returned by `Load` are wrapped in `KeyError`. You can distinguish decoding errors from missing keys using the `IsNotFound` function.
- `Set` adds or updates the given entry in the record. It panics if the value can't be encoded. If the record is signed, `Set` increments the sequence number and invalidates the signature.
- `invalidate` invalidates the signature and sequence number of the record.
- `Signature` returns the signature of the record.
- `EncodeRLP` implements `rlp.Encoder`. Encoding fails if the record is unsigned.
- `DecodeRLP` implements `rlp.Decoder`. Decoding doesn't verify the signature.

Here is an example of how to use the `Load` and `Set` methods:

```
// create a new record
r := &Record{}

// create a new entry
e := &MyEntry{Key: "mykey", Value: "myvalue"}

// set the entry in the record
r.Set(e)

// retrieve the entry from the record
var e2 MyEntry
err := r.Load(&e2)
if err != nil {
    if IsNotFound(err) {
        // handle missing key error
    } else {
        // handle decoding error
    }
}
``` ## Function: decodeList

This function decodes a list of key-value pairs from the given RLP stream. It returns a `decoder` struct containing the decoded pairs, the remaining raw bytes, and an error if any. If the list is not sorted by key, it returns an error `errNotSorted`. If there are duplicate keys, it returns an error `errDuplicateKey`.

## Function: IdentityScheme

This function returns the name of the identity scheme used in the record.

## Function: VerifySignature

This function checks whether the record is signed using the given identity scheme. It returns an error if the signature is invalid.

## Function: SetSig

This function sets the record signature. It returns an error if the encoded record is larger than the size limit or if the signature is invalid according to the passed scheme. You can also use SetSig to remove the signature explicitly by passing a nil scheme and signature. It panics when either the scheme or the signature (but not both) are nil.

## Function: AppendElements

This function appends the sequence number and entries to the given slice.

## Function: encode

This function encodes the record and signature into a raw byte slice. It returns the raw bytes and an error if any. If the encoded record is larger than the size limit, it returns an error `errTooBig`.