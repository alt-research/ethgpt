The `rlpstruct` package provides struct processing for RLP encoding/decoding. It handles all rules around field filtering, struct tags, and nil value determination. The package consists of the following types and functions:

### Types

#### Field

`Field` represents a struct field. It has the following fields:

- `Name`: the name of the field.
- `Index`: the index of the field in the struct.
- `Exported`: whether the field is exported.
- `Type`: the type of the field.
- `Tag`: the struct tag of the field.

#### Type

`Type` represents the attributes of a Go type. It has the following fields:

- `Name`: the name of the type.
- `Kind`: the kind of the type.
- `IsEncoder`: whether the type implements `rlp.Encoder`.
- `IsDecoder`: whether the type implements `rlp.Decoder`.
- `Elem`: the element type of the type, if it is a pointer, slice, or array.

#### NilKind

`NilKind` is the RLP value encoded in place of nil pointers. It has the following values:

- `NilKindString`: an empty string.
- `NilKindList`: an empty list.

#### Tags

`Tags` represents struct tags. It has the following fields:

- `NilKind`: the kind of empty value allowed for the field.
- `NilOK`: whether empty input results in a nil pointer.
- `Optional`: whether the field is optional.
- `Tail`: whether this field swallows additional list elements. It can only be set for the last field, which must be of slice type.
- `Ignored`: whether the field is ignored.

#### TagError

`TagError` is raised for invalid struct tags. It has the following fields:

- `StructType`: the name of the struct.
- `Field`: the name of the field.
- `Tag`: the invalid struct tag.
- `Err`: the error message.

### Functions

#### DefaultNilValue

`DefaultNilValue` determines whether a nil pointer to `t` encodes/decodes as an empty string or empty list. It takes a `Type` as input and returns a `NilKind`.

#### ProcessFields

`ProcessFields` filters the given struct fields, returning only fields that should be considered for encoding/decoding. It takes a slice of `Field`s as input and returns two slices: one containing the filtered `Field`s and one containing the corresponding `Tags`. It also returns an error if any of the struct tags are invalid. ## Function: Name

The `Name` function takes a slice of `Field` structs and returns a slice of `Field` structs and a slice of `Tags` structs. It checks if any of the fields are optional or tail fields and sets the appropriate flags in the `Tags` struct. If a field is optional, it checks if it is the first optional field encountered and sets the `firstOptionalName` variable. If a field is a tail field, it checks if it is the last field in the struct and sets the appropriate flag in the `Tags` struct. If a field is both optional and tail, it returns an error. If a non-optional field follows an optional field, it returns an error.

### Parameters

- `fields []Field`: A slice of `Field` structs.

### Returns

- `[]Field`: A slice of `Field` structs.
- `[]Tags`: A slice of `Tags` structs.
- `error`: An error if there is an issue with the tags.

### Example

```go
type Person struct {
    Name    string `rlp:"optional"`
    Age     int
    Address string `rlp:"optional"`
}

fields, tags, err := Name(getFields(Person{}))
if err != nil {
    log.Fatal(err)
}
```

## Function: parseTag

The `parseTag` function takes a `Field` struct and an integer representing the index of the last public field in the struct and returns a `Tags` struct and an error. It parses the `rlp` tag of the field and sets the appropriate flags in the `Tags` struct. If the tag is empty, it is ignored. If the tag is `-`, the field is ignored. If the tag is `nil`, `nilString`, or `nilList`, the `NilOK` flag is set and the `NilKind` field is set to the appropriate value. If the tag is `optional`, the `Optional` flag is set. If the tag is `tail`, the `Tail` flag is set and the function checks if the field is the last public field in the struct and if the field is a slice. If the tag is unknown, an error is returned.

### Parameters

- `field Field`: A `Field` struct.
- `lastPublic int`: An integer representing the index of the last public field in the struct.

### Returns

- `Tags`: A `Tags` struct.
- `error`: An error if there is an issue with the tag.

### Example

```go
type Person struct {
    Name    string `rlp:"optional"`
    Age     int
    Address string `rlp:"tail"`
}

tags, err := parseTag(getField(Person{}, "Address"), lastPublicField(getFields(Person{})))
if err != nil {
    log.Fatal(err)
}
```

## Function: lastPublicField

The `lastPublicField` function takes a slice of `Field` structs and returns an integer representing the index of the last public field in the struct. It iterates through the slice of `Field` structs and sets the `last` variable to the index of the last public field encountered.

### Parameters

- `fields []Field`: A slice of `Field` structs.

### Returns

- `int`: An integer representing the index of the last public field in the struct.

### Example

```go
type Person struct {
    Name    string `rlp:"optional"`
    Age     int
    Address string `rlp:"tail"`
}

lastPublic := lastPublicField(getFields(Person{}))
```

## Function: isUint

The `isUint` function takes a `reflect.Kind` and returns a boolean indicating if the kind is a uint.

### Parameters

- `k reflect.Kind`: A `reflect.Kind`.

### Returns

- `bool`: A boolean indicating if the kind is a uint.

### Example

```go
isUint(reflect.Uint) // true
```

## Function: isByte

The `isByte` function takes a `Type` struct and returns a boolean indicating if the type is a byte.

### Parameters

- `typ Type`: A `Type` struct.

### Returns

- `bool`: A boolean indicating if the type is a byte.

### Example

```go
isByte(getType(reflect.TypeOf(byte(0)))) // true
```

## Function: isByteArray

The `isByteArray` function takes a `Type` struct and returns a boolean indicating if the type is a byte array.

### Parameters

- `typ Type`: A `Type` struct.

### Returns

- `bool`: A boolean indicating if the type is a byte array.

### Example

```go
isByteArray(getType(reflect.TypeOf([]byte{}))) // true
```