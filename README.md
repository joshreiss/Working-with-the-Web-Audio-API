# Working with the Web Audio API

Various simple Web Audio API examples

They demonstrate almost all audio nodes and other interfaces of the Web Audio API with short, working examples. The aim of these tutorials is to give very short but still fully functional examples for those trying to learn the API but not spend a long amount of time dissecting larger code samples, or understanding code snippets without their context. The examples are roughly ordered sequentially to cover the simplest Hello World to nodes that use more audio cor Web Audio programming concepts.

Code examples are organised into 19 sections, corresponding to the 19 chapters in the book 'Working with the Web Audio API'.
 
1. [Introducing the Web Audio API](https://github.com/joshreiss/Working-with-the-Web-Audio-API/tree/master/01%20Introducing%20the%20Web%20Audio%20API) - A simple Hello World, generating sound with the Web Audio API, and building up to show more functionality
2. Oscillators - demonstrating the OscillatorNode and PeriodicWave
3. Audio Buffer sources - showing the AudioBufferSourceNode and BufferSource, with examples on creating buffered noise, pausing playback, playing audio backwards...
4. The Constant Source Node - all about the ConstantSourceNode, with examples for grouping multitrack audio, DC offsets and another way to generate square waves
5. Scheduling and setting parameters - showcasing all the parameter scheduling methods (SetValueAtTime, SetValueCure ...) with examples on crossfading, beep sounds, sinusoidal modeling of bell sounds and more
6. Connecting Audio Parameters and Modulation - explaining how to connect to audio parameters, and other types of connections, illustrated with AM and FM synthesis examples
7. Analysis and Visualization - in-depth discussion of the Analyser node, with an example analysing and visualizing a PeriodicWave in time and frequency
8. Loading, playing and recording - all the other types of sources and destinations, including MediaElementAudioSourceNode, MediaStreamAudioDestinationNode and MediaElementAudioSourceNode. It also covers decodeAudioData. Examples include a level meter and two approaches to recording the output of an audio node
9. OfflineAudioContext - three examples of offline audio processing, both with and without use of an online audio context.
10. Delay - all about the DelayNode, with examples of comb filtering, vibrato, feedback delay and the Karplus-Strong algorithm
11. Filtering - covers the BiquadFilterNode and the IIRFilterNode, as well as examples of how the filters can go unstable
12. Waveshaper - covers the WaveshaperNode, with examples of clipping and bit crushing
13. Dynamic range compression - covers the DynamicsCompressorNode with examples focused on the compressor's Attack and Release, and on use of all compressor parameters
14. Reverberation - on use of the ConvolverNode, with an example on general use with a simulated impulse response, and an example on use of normalization with an impulse response loaded from a file
15. Mixing audio - use of the ChannelMergerNode and ChannelSplitterNode. Examples include flipping channels in a stereo audio stream, and ping pong delay.
16. Stereo panning - on the StereoPannerNode, with examples on basic use and a stereo enhancer effect
17. Spatialized sound - use of the panner node. Examples are given for use of all of the node's parameters, either with a moving listener in 2D  or moving source in 3D.
18. Working with AudioWorklets - 8 examples of audio worklets, each one introducing different aspects. Examples also show generating noise, panning with many loudspeakers and the exponential moving average smoothing filter
19. The wonders of audio worklets - revisits examples from previous chapters, but now improved by using audio worklets; stereo enhancer, bit crusher, compressor, pulse wave generator and Karplus-Strong algorithm



Feel free to contact me at joshua.reiss@qmul.ac.uk
