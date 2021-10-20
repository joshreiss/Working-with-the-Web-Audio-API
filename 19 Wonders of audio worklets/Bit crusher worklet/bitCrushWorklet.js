registerProcessor('bitcrusher', class extends AudioWorkletProcessor {
  static get parameterDescriptors () {
    return [{name: 'bitDepth',defaultValue: 12,minValue: 1,maxValue: 16}]
  }
  process (inputs, outputs, parameters) {
    const input = inputs[0],output = outputs[0]
    const bitDepth = parameters.bitDepth
    const frequencyReduction = parameters.frequencyReduction
    if (bitDepth.length > 1) {
      // The bitDepth parameter array has 128 sample values.
      for (let channel = 0; channel < output.length; ++channel) {
        for (let i = 0; i < output[channel].length; ++i) {
          let step = Math.pow(0.5, bitDepth[i])
          output[channel][i] = step * Math.floor(input[channel][i] / step + 0.5)
        }
      }
    } else {
      // bitDepth is constant, so put computation of step outside the loop
      const step = Math.pow(0.5, bitDepth[0])
      for (let channel = 0; channel < output.length; ++channel) {
        for (let i = 0; i < output[channel].length; ++i) {
          output[channel][i] = step * Math.floor(input[channel][i] / step + 0.5)
        }
      }
    }
    return true
  }
})
