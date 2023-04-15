# Route53ChangeSort Function

The `Route53ChangeSort` function is a test function that checks if the `computeChanges` and `splitChanges` functions create DNS changes in the correct order. The function takes a `*testing.T` parameter and does not return anything.

## Parameters

The function takes a `*testing.T` parameter.

## Return Value

The function does not return anything.

## TestTree0 and TestTree1

`TestTree0` and `TestTree1` are two maps that represent the DNS tree. `TestTree0` has three nodes, and `TestTree1` has four nodes. Each node has a name, a TTL, and a value. The value is a string that represents an Ethereum Name Service (ENS) record.

## WantChanges

`WantChanges` is a slice of `types.Change` that represents the expected changes in the DNS tree. The changes are in the order of leaf-added -> root-changed -> leaf-deleted.

## Action

The `Action` field in `types.Change` represents the action to be taken on the DNS record. The possible values are "CREATE", "DELETE", and "UPSERT".

## ResourceRecordSet

The `ResourceRecordSet` field in `types.Change` represents the DNS record to be changed. It has the following fields:

- `Name`: The name of the DNS record.
- `ResourceRecords`: A slice of `types.ResourceRecord` that represents the value of the DNS record.
- `TTL`: The time-to-live (TTL) of the DNS record.
- `Type`: The type of the DNS record.

## ResourceRecord

The `ResourceRecord` field in `types.ResourceRecordSet` represents the value of the DNS record. It has the following fields:

- `Value`: The value of the DNS record.

## ComputeChanges Function

The `computeChanges` function takes two maps that represent the DNS tree and returns a slice of `types.Change` that represents the changes to be made to the DNS tree. The function has the following signature:

```go
func computeChanges(oldTree, newTree map[string]recordSet) []types.Change
```

### Parameters

The function takes two maps that represent the DNS tree.

### Return Value

The function returns a slice of `types.Change` that represents the changes to be made to the DNS tree.

## SplitChanges Function

The `splitChanges` function takes a slice of `types.Change` and returns three slices of `types.Change` that represent the changes in the order of leaf-added -> root-changed -> leaf-deleted. The function has the following signature:

```go
func splitChanges(changes []types.Change) (leafAdded, rootChanged, leafDeleted []types.Change)
```

### Parameters

The function takes a slice of `types.Change`.

### Return Value

The function returns three slices of `types.Change` that represent the changes in the order of leaf-added -> root-changed -> leaf-deleted. ## Route53Client

The `Route53Client` struct represents a client for the Amazon Route 53 DNS service. It provides methods for computing changes to DNS records and splitting them into batches for submission to the service.

### `computeChanges`

```go
func (c *Route53Client) computeChanges(zoneName string, newTree, oldTree map[string]interface{}) []types.Change
```

The `computeChanges` method takes the name of a DNS zone, a new tree of DNS records, and an old tree of DNS records, and returns a list of changes to be made to the DNS records in the zone. The method compares the new and old trees and generates changes to add, delete, or update records as necessary.

#### Parameters

- `zoneName` - The name of the DNS zone to update.
- `newTree` - A map of DNS record names to their values, representing the new tree of DNS records.
- `oldTree` - A map of DNS record names to their values, representing the old tree of DNS records.

#### Return Value

The method returns a list of `types.Change` objects representing the changes to be made to the DNS records in the zone.

### `splitChanges`

```go
func splitChanges(changes []types.Change, maxBatchSize int, maxBatchCount int) [][]types.Change
```

The `splitChanges` method takes a list of DNS record changes and splits them into batches for submission to the Amazon Route 53 DNS service. The method splits the changes into batches based on the maximum batch size and maximum batch count parameters.

#### Parameters

- `changes` - A list of `types.Change` objects representing the changes to be made to the DNS records.
- `maxBatchSize` - The maximum size of each batch, in bytes.
- `maxBatchCount` - The maximum number of changes to include in each batch.

#### Return Value

The method returns a list of batches, where each batch is a list of `types.Change` objects representing the changes to be made to the DNS records. # Route53 Package

The `route53` package provides a way to manage DNS records in Amazon Route 53.

## Route53Client Type

The `Route53Client` type represents a client for managing DNS records in Amazon Route 53. It has the following fields:

### session *session.Session

A session for interacting with AWS.

### zoneID string

The ID of the Route 53 hosted zone.

### ttl int64

The time-to-live (TTL) value for the DNS record.

### records map[string]string

A map of DNS record names to values.

## NewRoute53Client Function

The `NewRoute53Client` function creates a new `Route53Client` instance. It has the following signature:

```go
func NewRoute53Client(sess *session.Session, zoneID string, ttl int64, records map[string]string) *Route53Client
```

### Parameters

- `sess`: The AWS session.
- `zoneID`: The ID of the Route 53 hosted zone.
- `ttl`: The time-to-live (TTL) value for the DNS record.
- `records`: A map of DNS record names to values.

### Return Value

The function returns a new `Route53Client` instance.

## ComputeChanges Function

The `ComputeChanges` function computes the changes needed to update the DNS records in Route 53. It has the following signature:

```go
func (c *Route53Client) ComputeChanges() []*route53.Change
```

### Parameters

The function does not take any parameters.

### Return Value

The function returns a slice of `*route53.Change` instances representing the changes needed to update the DNS records in Route 53.

## Example Test

The `TestComputeChanges` function tests the `ComputeChanges` function by comparing the changes computed by the function with the expected changes. It has the following signature:

```go
func TestComputeChanges(t *testing.T)
```

### Parameters

- `t`: The testing.T instance.

### Return Value

The function does not return anything.

## sp Function

The `sp` function returns a pointer to a string. It has the following signature:

```go
func sp(s string)