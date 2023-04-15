## Package Native

This package contains functions for encoding and decoding Ethereum transactions.

### Function: MarshalJSON()

This function marshals a flatCallAction struct into JSON format. The flatCallAction struct contains the following fields:

- Author: A pointer to a common.Address struct.
- RewardType: A string representing the reward type.
- SelfDestructed: A pointer to a common.Address struct.
- Balance: A pointer to a hexutil.Big struct.
- CallType: A string representing the call type.
- CreationMethod: A string representing the creation method.
- From: A pointer to a common.Address struct.
- Gas: A pointer to a hexutil.Uint64 struct.
- Init: A pointer to a hexutil.Bytes struct.
- Input: A pointer to a hexutil.Bytes struct.
- RefundAddress: A pointer to a common.Address struct.
- To: A pointer to a common.Address struct.
- Value: A pointer to a hexutil.Big struct.

The function returns a byte slice containing the JSON representation of the flatCallAction struct.

### Function: UnmarshalJSON()

This function unmarshals a JSON byte slice into a flatCallAction struct. The flatCallAction struct contains the following fields:

- Author: A pointer to a common.Address struct.
- RewardType: A pointer to a string representing the reward type.
- SelfDestructed: A pointer to a common.Address struct.
- Balance: A pointer to a hexutil.Big struct.
- CallType: A pointer to a string representing the call type.
- CreationMethod: A pointer to a string representing the creation method.
- From: A pointer to a common.Address struct.
- Gas: A pointer to a hexutil.Uint64 struct.
- Init: A pointer to a hexutil.Bytes struct.
- Input: A pointer to a hexutil.Bytes struct.
- RefundAddress: A pointer to a common.Address struct.
- To: A pointer to a common.Address struct.
- Value: A pointer to a hexutil.Big struct.

The function returns an error if the unmarshaling process fails.