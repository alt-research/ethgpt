# Trezor Hardware Wallet

The `trezor` package contains the implementation for interacting with the Trezor hardware wallets. The wire protocol specification can be found on the SatoshiLabs website.

## Important Note

Before modifying the protocol files, it is important to be aware of a breaking change that occurred between firmware versions 1.7.3->1.8.0 (Model One) and 2.0.10->2.1.0 (Model T). The Ethereum address representation was changed from the 20 byte binary blob to a 42 byte hex string. The upstream protocol buffer files only support the new format, so blindly pulling in a new spec will break old devices!

The Trezor developers added the string version as a new message code instead of replacing the binary one. This means that the proto file can actually define both the old and the new versions as optional. Please ensure that you add back the old addresses everywhere (to avoid name clash. use the addressBin and addressHex names).

If in doubt, reach out to @karalabe.

## Protocol Files Regeneration

To regenerate the protocol files in this package, follow these steps:

- Download the latest protoc from https://github.com/protocolbuffers/protobuf/releases
- Build with the usual `./configure && make` and ensure it's on your $PATH
- Delete all the .proto and .pb.go files, pull in fresh ones from Trezor
- Grab the latest Go plugin `go get -u github.com/golang/protobuf/protoc-gen-go`
- Vendor in the latest Go plugin `govendor fetch github.com/golang/protobuf/...`

## Functions

### Type

`Type(msg proto.Message) uint16`: returns the protocol buffer type number of a specific message. If the message is nil, this method panics!

### Name

`Name(kind uint16) string`: returns the friendly message type name of a specific protocol buffer type number.