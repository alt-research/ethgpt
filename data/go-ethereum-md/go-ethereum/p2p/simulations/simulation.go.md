This codebase is a part of the go-ethereum library, which is a free software that can be redistributed and/or modified under the terms of the GNU Lesser General Public License. The Simulation struct provides a framework for running actions in a simulated network and then waiting for expectations to be met. 

The NewSimulation function returns a new simulation which runs in the given network. The Run function performs a step of the simulation by performing the step's action and then waiting for the step's expectation to be met. It takes a context and a step as input and returns a StepResult. 

The watchNetwork function watches network events for the duration of the step. It takes a StepResult as input and returns a function that stops watching network events. 

The Step struct contains an Action, a Trigger, and an Expectation. The Action is the action to perform for this step. The Trigger is a channel which receives node ids and triggers an expectation check for that node. The Expectation is the expectation to wait for when performing this step. 

The Expectation struct contains a list of nodes to check and a Check function that checks whether a given node meets the expectation. 

The newStepResult function returns a new StepResult with an empty Passes map. The StepResult struct contains an Error, a StartedAt time, a FinishedAt time, and a Passes map. The Error is the error encountered whilst running the step. The StartedAt is the time the step started. The FinishedAt is the time the step finished. The Passes map contains the nodes that passed the expectation and the time they passed it. The `Step` type represents a single step in a network test. A `Step` contains information about the start and end times of the step, the successful node expectations, and the network events that occurred during the step.

The `Step` type has the following fields:

- `Name` is a string that represents the name of the step.

- `StartedAt` is a `time.Time` that represents the time the step started.

- `FinishedAt` is a `time.Time` that represents the time the step finished.

- `Passes` is a map of `enode.ID` to `time.Time` that represents the timestamps of the successful node expectations. The `enode.ID` is the identifier of the node that passed the expectation, and the `time.Time` is the time the expectation was passed.

- `NetworkEvents` is a slice of `Event` that