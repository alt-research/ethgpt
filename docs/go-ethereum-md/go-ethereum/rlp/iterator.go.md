# RLP Package Documentation

The RLP package provides an implementation of the Recursive Length Prefix (RLP) encoding and decoding algorithm. This algorithm is used to encode and decode arbitrary data structures in a compact and efficient way.

## ListIterator

The `listIterator` type is a struct that represents an iterator for a list of RLP-encoded data. It has three fields:

- `data`: a byte slice that contains the RLP-encoded data for the list.
- `next`: a byte slice that contains the RLP-encoded data for the next item in the list.
- `err`: an error that is set if there was an error decoding the next item in the list.

### NewListIterator

The `NewListIterator` function creates a new `listIterator` instance for the RLP-encoded data passed as a `RawValue` parameter. This function returns a pointer to the new `listIterator` instance and an error if there was an error decoding the RLP-encoded data.

### Next

The `Next` method of the `listIterator` type forwards the iterator one step and returns a boolean value indicating whether the iterator was at the end of the list or not. If the iterator was not at the end of the list, the `next` field of the `listIterator` instance is set to the RLP-encoded data for the next item in the list.

### Value

The `Value` method of the `listIterator` type returns the RLP-encoded data for the current item in the list. This method should only be called after a successful call to the `Next` method.

### Err

The `Err` method of the `listIterator` type returns an error if there was an error decoding the next item in the list. This method should only be called after a failed call to the `Next` method.

## License

This code is licensed under the GNU Lesser General Public License version 3 or later. For more information, see <http://www.gnu.org/licenses/>.