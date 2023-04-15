# RLP Encoding and Decoding

This codebase provides functions for encoding and decoding data using the Recursive Length Prefix (RLP) encoding scheme. RLP is a serialization format used in Ethereum to encode data structures such as transactions, blocks, and state trees.

## `TestRoundtrip`

This function tests the roundtrip encoding and decoding of RLP-encoded data. It takes a list of RLP-encoded strings and checks that encoding and then decoding the string results in the original string. The function uses the `rlpToText` and `textToRlp` functions to perform the encoding and decoding.

### Arguments

- `t`: A testing object used to report test failures.

### Example

```go
func TestRoundtrip(t *testing.T) {
	for i, want := range []string{
		"0xf880806482520894d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0a1010000000000000000000000000000000000000000000000000000000000000001801ba0c16787a8e25e941d67691954642876c08f00996163ae7dfadbbfd6cd436f549da06180e5626cae31590f40641fe8f63734316c4bfeb4cdfab6714198c1044d2e28",
		"0xd5c0d3cb84746573742a2a808213378667617a6f6e6b",
		"0xc780c0c1c0825208",
	} {
		var out strings.Builder
		err := rlpToText(bytes.NewReader(common.FromHex(want)), &out)
		if err != nil {
			t.Fatal(err)
		}
		text := out.String()
		rlpBytes, err := textToRlp(strings.NewReader(text))
		if err != nil {
			t.Errorf("test %d: error %v", i, err)
			continue
		}
		have := fmt.Sprintf("%#x", rlpBytes)
		if have != want {
			t.Errorf("test %d: have\n%v\nwant:\n%v\n", i, have, want)
		}
	}
}
```

## `TestTextToRlp`

This function tests the `textToRlp` function, which converts a text representation of an RLP-encoded data structure to the binary RLP encoding. The function takes a list of test cases, each consisting of a text representation of an RLP-encoded data structure and the expected binary RLP encoding.

### Arguments

- `t`: A testing object used to report test failures.

### Example

```go
func TestTextToRlp(t *testing.T) {
	type tc struct {
		text string
		want string
	}
	cases := []tc{
		{
			text: `[
  "",
  [],
[     
 [],
    ],
  5208,
]`,
			want: "0xc780c0c1c0825208",
		},
	}
	for i, tc := range cases {
		have, err := textToRlp(strings.NewReader(tc.text))
		if err != nil {
			t.Errorf("test %d: error %v", i, err)
			continue
		}
		if hexutil.Encode(have) != tc.want {
			t.Errorf("test %d:\nhave %v\nwant %v", i, hexutil.Encode(have), tc.want)
		}
	}
}
```