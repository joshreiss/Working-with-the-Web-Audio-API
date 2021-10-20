# Delay

Here, we look at the DelayNode in the Web Audio API. We  give three examples;

- simple summing of a source and a delayed copy to produce comb filtering,
- implementation of a Vibrato effect, by modulating a delay line with a low frequency oscillator,
- feedback delay based on routing the output of the delay node back to the input,
- the Karplus-Strong algorithm for producing the sound of a plucked string. This also demonstrates a limitation of the DelayNode when used in a feedback loop.
