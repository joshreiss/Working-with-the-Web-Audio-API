# Working with AudioWorklets

The Web Audio API provides an AudioWorkletNode,  which lets developers create their own custom audio nodes for almost any audio processing or synthesis task.
All the main aspects of audio worklets are explained here. Source code examples are given for;
- Noise worklet: a 'hello world' audio worklet generating a noise source
- async await format: the Noise worklet, but now implemented using async await instead of a promise then.
- Mul,tiple inputs: showing how one can have audio worklet nodes with multiple inputs, demonstrated with an audio worklet that finds the sample with maximum amplitude from all channels of all inputs .
- PanX: an audio worklet that pans audio between any number of loudspeakers. This demonstrates use of inputs, outputs and options for an audio worklet.
- Gain worklet: A simple gain node implemented as an audio worklet, to show how audio worklets handle audio parameters.
- Smoothing Filter worklet: to show how an audio worklet stores internal variables, we implemented a smoothing filter. The audio worklet keeps track of the previous sample even though it reads in audio block by block.
 - First order filter options: first order high pass and low pass filters. They are implemented in a single audio worklet, with processorOptions specified to set the filter type.
 - First order filter options: first order high pass and low pass filters. They are implemented in a single audio worklet, with the message port used to set or change the filter type.
