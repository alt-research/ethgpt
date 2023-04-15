This file defines constants for the multipliers of ether denominations. 

The `Wei` constant represents the base unit of ether, which is 1 wei. The `GWei` constant represents 1 billion wei, and the `Ether` constant represents 1 quintillion wei.

These constants are used to convert between different ether denominations. For example, to get the wei value of an amount in 'gwei', you can use the following code:

```
new(big.Int).Mul(value, big.NewInt(params.GWei))
```

This will multiply the value by the `GWei` constant to get the wei value.