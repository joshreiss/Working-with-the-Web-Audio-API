# The Wonders of Audio Worklets

Here, we revisit previous examples, and show how they can be achieved using audio worklets instead.

- PulseWave: shows how pulse waves and square waves may be created without use of a Fourier series,
- Bit crusher worklet: a bit crusher designed without storing a wave shaping curve
- CompressorWorklet: a dynamic range compressor be implemented with very fast response
- StereoWidenerWorklet: a stereo enhancer that preserves signal power.
- KarplusStrong: the Karplus-Strong algorithm implemented without the limitations on the pitch range that come from the DelayNode in a feedback loop.
