# Audio Buffer Sources

Sound samples, or audio assets, are represented in the Web Audio as an array of floats in AudioBuffers. These buffers may be created by copying an array of data, setting each value in the buffer directly, or loading data from an audio file. The Web Audio API makes a clear distinction between such assets and their playback state at a particular point in the audio graph. This separation is needed since applications could involve multiple versions of the same buffer playing simultaneously. Hence, the audio buffer is not a source node. For that we have the AudioBufferSourceNode.
This Chapter looks at how to work with audio buffers; creating them, loading audio into them, using them in source nodes, and changing the playback state of the node. It starts by introducing the essential Web Audio API functionality, with examples of creating buffer sources and varying the properties of buffer source nodes. Careful attention is paid to the precise timing that can be achieved with their start, duration and looping times. Further examples are then given for constructing a square wave using looped buffer sources, for pausing playback, and for playing an audio asset backwards.

The source code examples here are;

- Playback: showing the full functionality of the BufferSourceNode using a Chirp signal
- BufferedNoise: creating noise using a buffer source, and playing it back using a BufferSourceNode
- BufferedSquareWave: creating a square wave using many BufferSourceNodes, each one playing the same buffer source at different playback rates
- Pause: pausing playback of a BufferSourceNode by setting playbackRate to zero
- Backwards: playing audio forwards and backwards by using two BufferSourceNodes and keeping track of the playback position
