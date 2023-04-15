# Ethereum ABI (Application Binary Interface)

The `abi` package implements the Ethereum ABI (Application Binary Interface). The Ethereum ABI is a strongly typed, static, and known at compile time interface. This package handles basic type casting, such as unsigned to signed and vice versa. However, it does not handle slice casting, such as unsigned slice to signed slice. Bit size type casting is also handled. Integers with a bit size of 32 will be properly cast to int256, and so on.

## Functions

### func NewType(name string, kind reflect.Kind, size int) *Type

`NewType` creates a new ABI type with the given name, kind, and size. The `name` parameter is the name of the type, `kind` is the reflect kind of the type, and `size` is the size of the type in bits.

### func NewTupleType(types ...*Type) *Type

`NewTupleType` creates a new ABI tuple type with the given types. The `types` parameter is a variadic list of `*Type` representing the types of the tuple.

### func NewFunction(name string, inputs []*Argument, outputs []*Argument) Function

`NewFunction` creates a new ABI function with the given name, inputs, and outputs. The `name` parameter is the name of the function, `inputs` is a slice of `*Argument` representing the input arguments of the function, and `outputs` is a slice of `*Argument` representing the output arguments of the function.

### func NewMethod(name string, inputs []*Argument, outputs []*Argument, constant bool) Method

`NewMethod` creates a new ABI method with the given name, inputs, outputs, and constant flag. The `name` parameter is the name of the method, `inputs` is a slice of `*Argument` representing the input arguments of the method, `outputs` is a slice of `*Argument` representing the output arguments of the method, and `constant` is a boolean flag indicating whether the method is constant.

### func NewEvent(name string, anonymous bool, inputs []*Argument) Event

`NewEvent` creates a new ABI event with the given name, anonymous flag, and inputs. The `name` parameter is the name of the event, `anonymous` is a boolean flag indicating whether the event is anonymous, and `inputs` is a slice of `*Argument` representing the input arguments of the event.

### type Type

`Type` represents an ABI type. It has the following fields:

- `Name string`: the name of the type.
- `Kind reflect.Kind`: the reflect kind of the type.
- `Size int`: the size of the type in bits.

### type Argument

`Argument` represents an ABI argument. It has the following fields:

- `Name string`: the name of the argument.
- `Type *Type`: the type of the argument.

### type Function

`Function` represents an ABI function. It has the following fields:

- `Name string`: the name of the function.
- `Inputs []*Argument`: the input arguments of the function.
- `Outputs []*Argument`: the output arguments of the function.

### type Method

`Method` represents an ABI method. It has the following fields:

- `Name string`: the name of the method.
- `Inputs []*Argument`: the input arguments of the method.
- `Outputs []*Argument`: the output arguments of the method.
- `Constant bool`: a boolean flag indicating whether the method is constant.

### type Event

`Event` represents an ABI event. It has the following fields:

- `Name string`: the name of the event.
- `Anonymous bool`: a boolean flag indicating whether the event is anonymous.
- `Inputs []*Argument`: the input arguments of the event.