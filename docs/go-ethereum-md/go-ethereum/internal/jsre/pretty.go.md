## Source Code Documentation

The following code is a Go package that provides a JavaScript runtime environment (JSRE) for Go applications. It includes a function for pretty-printing JavaScript values and objects, as well as a function for pretty-printing JavaScript errors.

### Constants

- `maxPrettyPrintLevel`: The maximum level of nesting to pretty-print objects.
- `indentString`: The string used for indentation.

### Variables

- `FunctionColor`: A color function for printing function names.
- `SpecialColor`: A color function for printing special values.
- `NumberColor`: A color function for printing numbers.
- `StringColor`: A color function for printing strings.
- `ErrorColor`: A color function for printing errors.
- `boringKeys`: A map of keys to hide when printing objects.

### Functions

#### `prettyPrint(vm *goja.Runtime, value goja.Value, w io.Writer)`

This function pretty-prints a JavaScript value or object to the specified writer. It takes three arguments:

- `vm`: A pointer to the Goja runtime.
- `value`: The JavaScript value or object to print.
- `w`: The writer to print to.

#### `prettyError(vm *goja.Runtime, err error, w io.Writer)`

This function pretty-prints a JavaScript error to the specified writer. It takes three arguments:

- `vm`: A pointer to the Goja runtime.
- `err`: The JavaScript error to print.
- `w`: The writer to print to.

#### `SafeGet(obj *goja.Object, key string) goja.Value`

This function attempts to get the value associated with the specified key from the specified object, catching any panics that may occur. It takes two arguments:

- `obj`: The object to get the value from.
- `key`: The key to get the value for.

#### `printValue(v goja.Value, level int, inArray bool)`

This function prints a JavaScript value to the standard output. It takes three arguments:

- `v`: The JavaScript value to print.
- `level`: The current level of nesting.
- `inArray`: Whether the value is part of an array.

#### `printObject(obj *goja.Object, level int, inArray bool)`

This function prints a JavaScript object to the standard output. It takes three arguments:

- `obj`: The JavaScript object to print.
- `level`: The current level of nesting.
- `inArray`: Whether the object is part of an array.

#### `indent(level int) string`

This function returns a string of spaces for the specified level of indentation.

#### `prettyPrintJS(call goja.FunctionCall) goja.Value`

This function is a Goja function that pretty-prints its arguments to the standard output. It takes one or more arguments. ## Source Code Documentation

The following code is written in Go and defines a pretty-printing function for Goja JavaScript objects. The function takes an object and prints it in a human-readable format.

```go
func (ctx ppctx) printValue(obj *goja.Object, level int, inArray bool) {
	switch obj.ClassName() {
	case "String":
		fmt.Fprint(ctx.w, StringColor("%q", toString(obj)))

	case "Number":
		fmt.Fprint(ctx.w, NumberColor("%s", toString(obj)))

	case "Boolean":
		fmt.Fprint(ctx.w, BoolColor("%s", toString(obj)))

	case "Array":
		len := obj.Length()
		fmt.Fprint(ctx.w, "[")
		if len > 0 {
			fmt.Fprintln(ctx.w)
			for i := 0; i < len; i++ {
				el := obj.Get(strconv.Itoa(i))
				fmt.Fprintf(ctx.w, "%s", ctx.indent(level+1))
				if el != nil {
					ctx.printValue(el, level+1, true)
				}
				if i < len-1 {
					fmt.Fprintf(ctx.w, ", ")
				}
			}
			fmt.Fprint(ctx.w, "]")
		}

	case "Object":
		// Print values from bignumber.js as regular numbers.
		if ctx.isBigNumber(obj) {
			fmt.Fprint(ctx.w, NumberColor("%s", toString(obj)))
			return
		}
		// Otherwise, print all fields indented, but stop if we're too deep.
		keys := ctx.fields(obj)
		if len(keys) == 0 {
			fmt.Fprint(ctx.w, "{}")
			return
		}
		if level > maxPrettyPrintLevel {
			fmt.Fprint(ctx.w, "{...}")
			return
		}
		fmt.Fprintln(ctx.w, "{")
		for i, k := range keys {
			v := SafeGet(obj, k)
			fmt.Fprintf(ctx.w, "%s%s: ", ctx.indent(level+1), k)
			ctx.printValue(v, level+1, false)
			if i < len(keys)-1 {
				fmt.Fprintf(ctx.w, ",")
			}
			fmt.Fprintln(ctx.w)
		}
		if inArray {
			level--
		}
		fmt.Fprintf(ctx.w, "%s}", ctx.indent(level))

	case "Function":
		robj := obj.ToString()
		desc := strings.Trim(strings.Split(robj.String(), "{")[0], " \t\n")
		desc = strings.Replace(desc, " (", "(", 1)
		fmt.Fprint(ctx.w, FunctionColor("%s", desc))

	case "RegExp":
		fmt.Fprint(ctx.w, StringColor("%s", toString(obj)))

	default:
		if level <= maxPrettyPrintLevel {
			s := obj.ToString().String()
			fmt.Fprintf(ctx.w, "<%s %s>", obj.ClassName(), s)
		} else {
			fmt.Fprintf(ctx.w, "<%s>", obj.ClassName())
		}
	}
}
```

### `printValue`

The `printValue` function is the main function of the code. It takes an object and prints it in a human-readable format. The function uses a switch statement to determine the type of the object and then prints it accordingly.

#### `String`

If the object is a string, the function prints it in quotes.

#### `Number`

If the object is a number, the function prints it in the specified color.

#### `Boolean`

If the object is a boolean, the function prints it in the specified color.

#### `Array`

If the object is an array, the function prints it in square brackets. If the array is not empty, the function prints each element on a new line, indented by the specified level.

#### `Object`

If the object is an object, the function prints it in curly braces. If the object is a BigNumber object, the function prints it as a regular number. If the object has fields, the function prints each field on a new line, indented by the specified level. If the level is greater than the maximum pretty-print level, the function prints `{...}` instead.

#### `Function`

If the object is a function, the function prints its description.

#### `RegExp`

If the object is a regular expression, the function prints it in the specified color.

#### Default

If the object is of any other type, the function prints its class name and its string representation. If the level is greater than the maximum pretty-print level, the function prints only the class name. Sure, I'd be happy to help you with that! Here's a brief explanation of each function in the codebase:

### `isPrototypeOf(prototype *goja.Object, obj *goja.Object) (bool, error)`

This function checks if the given `prototype` object is in the prototype chain of the given `obj` object. It returns a boolean value indicating whether the `prototype` object is in the prototype chain of the `obj` object or not. If there is an error during the execution of the function, it returns an error.

### `prototypeIsCallable(pe *goja.Program, prototype *goja.Object) bool`

This function checks if the given `prototype` object is callable or not. It uses the `pe.Get()` function to get the `isPrototypeOf` property of the `prototype` object. If the `isPrototypeOf` property is not callable, it returns `false`. Otherwise, it calls the `isPrototypeOf()` function with the `prototype` object and a new `goja.Object` instance as arguments. If the `isPrototypeOf()` function returns an error, it returns `false`. Otherwise, it returns the boolean value returned by the `isPrototypeOf()` function.

### `toString(obj *goja.Object) string`

This function converts the given `obj` object to a string and returns it. It uses the `ToString()` method of the `obj` object to convert it to a string.

### `constructorPrototype(vm *goja.Runtime, obj *goja.Object) *goja.Object`

This function returns the prototype object of the constructor function of the given `obj` object. It first gets the `constructor` property of the `obj` object and then gets the `prototype` property of the constructor object. If either of these properties is `nil`, it returns `nil`. Otherwise, it returns the `prototype` object as a `*goja.Object` instance.

I hope this helps! Let me know if you have any further questions or if you need more detailed documentation.