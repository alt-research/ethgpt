## Source Code Documentation

The following code defines a Go package called `deps` that contains the console JavaScript dependencies embedded in Go. The package includes two JavaScript files: `web3.js` and `bignumber.js`.

### Web3JS

The `Web3JS` variable contains the contents of the `web3.js` file. The `web3.js` file is a JavaScript library that provides a set of functions for interacting with the Ethereum blockchain.

```js
//go:embed web3.js
var Web3JS string
```

### BigNumberJS

The `BigNumberJS` variable contains the contents of the `bignumber.js` file. The `bignumber.js` file is a JavaScript library that provides a set of functions for working with large numbers in JavaScript.

```js
//go:embed bignumber.js
var BigNumberJS string
```