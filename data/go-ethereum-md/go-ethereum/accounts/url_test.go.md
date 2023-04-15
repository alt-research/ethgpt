# URL Parsing

The `parseURL` function takes a string URL and returns a `URL` struct. It checks if the URL is valid and returns an error if it is not. The function is tested using the `TestURLParsing` function.

# URL String

The `String` function returns a string representation of the `URL` struct. It concatenates the scheme and path fields with a colon separator. The function is tested using the `TestURLString` function.

# URL MarshalJSON

The `MarshalJSON` function encodes the `URL` struct into a JSON string. It uses the `encoding/json` package to marshal the struct into a byte slice and then converts the byte slice to a string. The function is tested using the `TestURLMarshalJSON` function.

# URL UnmarshalJSON

The `UnmarshalJSON` function decodes a JSON string into a `URL` struct. It uses the `encoding/json` package to unmarshal the byte slice into the struct. The function is tested using the `TestURLUnmarshalJSON` function.

# URL Comparison

The `Cmp` function compares two `URL` structs and returns an integer value indicating their relationship. If the two structs are equal, it returns 0. If the first struct is less than the second, it returns -1. If the first struct is greater than the second, it returns 1. The function is tested using the `TestURLComparison` function.