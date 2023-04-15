# Tracetest Package

The `tracetest` package provides a method to generate a callTracer test by running a prestate reassembled and a call trace run, assembling all the gathered information into a test case. It also includes a function to convert a snake-cased input string into a camel-cased output.

## makeTest

The `makeTest` function generates a callTracer test by running a prestate reassembled and a call trace run, assembling all the gathered information into a test case. It takes in a transaction hash and a boolean value indicating whether or not to rewind the state. It generates the genesis block from the block, transaction, and prestate data, then generates the call trace and produces the test input. It returns a JSON string containing the genesis block, context, input, and result.

```go
/*
// makeTest generates a callTracer test by running a prestate reassembled and a
// call trace run, assembling all the gathered information into a test case.
var makeTest = function(tx, rewind) {
  // Generate the genesis block from the block, transaction and prestate data
  var block   = eth.getBlock(eth.getTransaction(tx).blockHash);
  var genesis = eth.getBlock(block.parentHash);

  delete genesis.gasUsed;
  delete genesis.logsBloom;
  delete genesis.parentHash;
  delete genesis.receiptsRoot;
  delete genesis.sha3Uncles;
  delete genesis.size;
  delete genesis.transactions;
  delete genesis.transactionsRoot;
  delete genesis.uncles;

  genesis.gasLimit  = genesis.gasLimit.toString();
  genesis.number    = genesis.number.toString();
  genesis.timestamp = genesis.timestamp.toString();

  genesis.alloc = debug.traceTransaction(tx, {tracer: "prestateTracer", rewind: rewind});
  for (var key in genesis.alloc) {
    var nonce = genesis.alloc[key].nonce;
    if (nonce) {
      genesis.alloc[key].nonce = nonce.toString();
    }
  }
  genesis.config = admin.nodeInfo.protocols.eth.config;

  // Generate the call trace and produce the test input
  var result = debug.traceTransaction(tx, {tracer: "callTracer", rewind: rewind});
  delete result.time;

  console.log(JSON.stringify({
    genesis: genesis,
    context: {
      number:     block.number.toString(),
      difficulty: block.difficulty,
      timestamp:  block.timestamp.toString(),
      gasLimit:   block.gasLimit.toString(),
      miner:      block.miner,
    },
    input:  eth.getRawTransaction(tx),
    result: result,
  }, null, 2));
}
*/
```

## camel

The `camel` function converts a snake-cased input string into a camel-cased output. It splits the input string by underscores and capitalizes the first letter of each word except the first one, then joins the words back together.

```go
func camel(str string) string {
	pieces := strings.Split(str, "_")
	for i := 1; i < len(pieces); i++ {
		pieces[i] = string(unicode.ToUpper(rune(pieces[i][0]))) + pieces[i][1:]
	}
	return strings.Join(pieces, "")
}
```