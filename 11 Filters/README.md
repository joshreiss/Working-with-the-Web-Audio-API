# filters

These examples cover design, use and visualisation of filters in the Web Audio API. They focus on two audio nodes, the BiquadFilterNode and IIRFilterNode.

- BiquadFilterNode: Visualises all the filter types for the BiquadFilterNode, as well as how changing filter parameters affects the filter's magnitude response.
- IIRFilterNode: Visualise and listen to audio with a third order lowpass filter applied.
- Instability: contains two examples showing how IIR filters can go unstable, and in unusual conditions, the biquad filter can become unstable.
  - IIRInstability: a simple first order filter that goes unstable as the feedback term is increased (pole moves outside the unit circle)
  - BiquadInstability: showing how changing filter parameters very, very rapidly can lead to instability in a BiquadFilterDesign
