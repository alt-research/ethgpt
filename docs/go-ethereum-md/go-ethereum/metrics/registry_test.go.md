# Go Metrics Package

The `go-metrics` package provides a way to log various metrics periodically using a logger. This package contains several functions that can be used to register, unregister, and get metrics from a registry. It also provides a way to create a prefixed registry and a prefixed child registry.

## Functions

### TestRegistry(t *testing.T)

The `TestRegistry` function is used to test the registry. It registers a new counter with the name "foo" and checks if the counter is registered. It then unregisters the counter and checks if it is unregistered.

### TestPrefixedRegistryGet(t *testing.T)

The `TestPrefixedRegistryGet` function is used to test the `Get` function of the prefixed registry. It creates a new prefixed registry with the prefix "prefix." and registers a new counter with the name "foo". It then gets the counter with the name "foo" and checks if it is not nil.

### TestPrefixedChildRegistryGet(t *testing.T)

The `TestPrefixedChildRegistryGet` function is used to test the `Get` function of the prefixed child registry. It creates a new registry and a new prefixed child registry with the prefix "prefix." and registers a new counter with the name "foo". It then gets the counter with the name "foo" and checks if it is not nil.

### TestChildPrefixedRegistryRegister(t *testing.T)

The `TestChildPrefixedRegistryRegister` function is used to test the `Register` function of the child prefixed registry. It creates a new prefixed child registry with the prefix "prefix." and registers a new counter with the name "foo". It then checks if the counter is registered with the name "prefix.foo".

### TestChildPrefixedRegistryOfChildRegister(t *testing.T)

The `TestChildPrefixedRegistryOfChildRegister` function is used to test the `Register` function of the child prefixed registry of child registry. It creates a new registry and a new prefixed child registry with the prefix "prefix." and a new prefixed child registry with the prefix "prefix2.". It then registers a new counter with the name "foo2" in the first registry and a new counter with the name "baz" in the second registry. It then checks if the counter is registered with the name "prefix.prefix2.baz".

### TestWalkRegistries(t *testing.T)

The `TestWalkRegistries` function is used to test the `findPrefix` function. It creates a new registry and a new prefixed child registry with the prefix "prefix." and a new prefixed child registry with the prefix "prefix2.". It then registers a new counter with the name "foo2" in the first registry and a new counter with the name "baz" in the second registry. It then checks if the prefix of the second registry is "prefix.prefix2.".

## Conclusion

The `go-metrics` package provides a way to log various metrics periodically using a logger. It contains several functions that can be used to register, unregister, and get metrics from a registry. It also provides a way to create a prefixed registry and a prefixed child registry. These functions can be used to monitor the performance of a Go application and identify bottlenecks.